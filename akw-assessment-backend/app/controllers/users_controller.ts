import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
export default class UsersController {
  async index() {
    const user = await User.all()
    return user
  }
}
