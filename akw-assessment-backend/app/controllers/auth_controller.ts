import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Admin from '#models/admin'
export default class AuthController {
  async registerUser({ request }: HttpContext) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])
    const userDetails = { fullName, email, password }
    const user = new User()
    user.fullName = userDetails.fullName
    user.email = userDetails.email
    user.password = userDetails.password
    await user.save()
    // const token = await auth.use
    return userDetails
  }
  async loginUser({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      // console.log(request.body())
      const user = await User.verifyCredentials(email, password)
      if (!user) {
        return response.badRequest('Invalid Credentials')
      }
      const token = await auth.use('web').login(user)
      return { message: 'Login successful', user: user, token }
    } catch (error) {
      console.log(error)
      return response.internalServerError(error)
    }
  }
  async registerAdmin({ request }: HttpContext) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])
    const userDetails = { fullName, email, password }
    const user = new Admin()
    user.fullName = userDetails.fullName
    user.email = userDetails.email
    user.password = userDetails.password
    await user.save()
    // const token = await auth.use
    return userDetails
  }
  async loginAdmin({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const admin = await Admin.verifyCredentials(email, password)
      if (!admin) {
        return response.badRequest('Invalid Credentials')
      }
      const token = await auth.use('admin').login(admin)
      return { message: 'Login successful', admin: admin, token, isAdmin: true }
    } catch (error) {
      console.log(error)
      return response.internalServerError(error)
    }
  }

  async editPermissions({ request, response, auth }: HttpContext) {
    try {
      const {
        userId,
        canEdit = true,
        canDelete = true,
        canViewAll = false,
      } = request.only(['userId', 'canEdit', 'canDelete', 'canViewAll'])
      const user = await User.findOrFail(userId)
      user.canEdit = canEdit
      user.canDelete = canDelete
      user.canViewAll = canViewAll
      await user.save()
      return response.json({
        message: 'User permissions updated successfully',
      })
    } catch (error) {
      return response.internalServerError(error)
    }
  }
}
