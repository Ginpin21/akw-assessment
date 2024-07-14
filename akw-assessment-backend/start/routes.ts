/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import env from './env.js'
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
const PhotosController = () => import('#controllers/photos_controller')
router.get('/', async () => {
  return {
    port: env.get('PORT'),
    serverStatus: 'The server is up and running',
  }
})
router.get('/users', [UsersController, 'index'])
router
  .group(() => {
    router.post('/register', [AuthController, 'registerUser'])
    router.post('/login', [AuthController, 'loginUser'])
    router.post('/admin/register', [AuthController, 'registerAdmin'])
    router.post('/admin/login', [AuthController, 'loginAdmin'])
    router.patch('/admin/edit-permissions', [AuthController, 'editPermissions'])
  })
  .prefix('/auth')
router
  .group(() => {
    router.get('/all', [PhotosController, 'viewAllPhotos'])
    router.get('/:userId', [PhotosController, 'viewOwnPhotos']).where('userId', /^[0-9]+$/)
    router.post('', [PhotosController, 'upload'])
    router.patch('/:photoId', [PhotosController, 'editPhoto']).where('photoId', /^[0-9]+$/)
    router.delete('/:photoId', [PhotosController, 'deletePhoto']).where('photoId', /^[0-9]+$/)
  })
  .prefix('/photos')
