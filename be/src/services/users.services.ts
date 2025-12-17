import User from '~/models/schemas/Users.schema'
import databaseServices from './database.services'
import { RegisterRequestBody } from '~/models/requests/users.requests'
import { hashPassword } from '~/utils/crypto'
class UsersService {
  // Service methods here
  async register(payload: RegisterRequestBody) {
    // Registration logic
    const result = await databaseServices.users.insertOne(
      new User({ ...payload, date_of_birth: new Date(payload.date_of_birth), password: hashPassword(payload.password) })
    )
    return result
  }

  async checkEmailExists(email: string) {
    const user = await databaseServices.users.findOne({ email })
    return !!user
  }
}

export default new UsersService()
