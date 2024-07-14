import env from '#start/env'

const cloudinaryConfig = {
  cloud_name: env.get('CLOUDINARY_CLOUD_NAME'),
  api_key: env.get('CLOUDINARY_API_KEY'),
  api_secret: env.get('CLOUDINARY_API_SECRET'),
}
export default cloudinaryConfig
