import type { HttpContext } from '@adonisjs/core/http'
import { v2 as cloudinary } from 'cloudinary'
import cloudinaryConfig from '#config/cloudinary'
import Photo from '#models/photo'
cloudinary.config(cloudinaryConfig)

export default class PhotosController {
  async upload({ request, response }: HttpContext) {
    const photoFile = request.file('photo', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    const { userId, name } = request.only(['userId', 'name'])
    if (userId === undefined || name === undefined) {
      return response.badRequest('Please provide userId and name')
    }
    if (!photoFile || !photoFile.isValid) {
      return response.badRequest('Please upload a valid image file')
    } else {
      try {
        const result = await cloudinary.uploader.upload(photoFile.tmpPath as string)
        // Save the photo details to the database if needed
        const photo = new Photo()
        photo.imageName = name
        photo.imageURL = result.secure_url
        photo.userId = userId // Replace with actual user ID
        await photo.save()
        return response.json({
          name,
          url: result.secure_url,
        })
      } catch (error) {
        console.log(error)
        return response.internalServerError('Error uploading image to Cloudinary')
      }
    }
  }
  async viewAllPhotos() {
    const photos = await Photo.query()
      .preload('user', (query) => {
        query.select('id', 'fullName', 'email')
      })
      .orderBy('updated_at', 'desc')
    return photos
  }
  async viewOwnPhotos({ response, params }: HttpContext) {
    try {
      const { userId } = params
      if (userId === undefined) {
        return response.badRequest('Please provide userId')
      }
      const photos = await Photo.query().where('userId', userId).orderBy('updated_at', 'desc')
      return photos
    } catch (error) {
      return response.internalServerError('Internal Server Error')
    }
  }

  async editPhoto({ request, params, response }: HttpContext) {
    try {
      const { photoId } = params
      const { name } = request.only(['name'])

      if (photoId === undefined) {
        return response.badRequest('Please provide photoId')
      }
      if (name === undefined) {
        return response.badRequest('Please provide the new name for the photo')
      }
      const photo = await Photo.findBy('id', photoId)
      if (photo) {
        photo.imageName = name
        await photo.save()
        return photo
      } else {
        return response.notFound('Photo not found')
      }
    } catch (error) {
      return response.internalServerError('Internal Server Error')
    }
  }
  async deletePhoto({ params, response }: HttpContext) {
    try {
      const { photoId } = params
      if (photoId === undefined) {
        return response.badRequest('Please provide photoId')
      }
      const photo = await Photo.findBy('id', photoId)
      if (photo) {
        const photoPublicId = photo.imageURL.split('/').pop()?.split('.')[0]
        await photo.delete()
        await cloudinary.uploader.destroy(photoPublicId as string)
        return response.send({ Message: 'Photo deleted successfully' })
      } else {
        return response.notFound('Photo not found')
      }
    } catch (error) {
      return response.internalServerError('Internal Server Error')
    }
  }
}
