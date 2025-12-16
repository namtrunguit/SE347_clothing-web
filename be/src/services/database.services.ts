import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
config({ quiet: true }) // tuỳ version dotenv

// Connection URL
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@bao.twztptb.mongodb.net/?appName=bao`
const dbName = process.env.DB_NAME || 'test'

class DatabaseService {
  // You can add database related methods here
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(url)
  }
  async connect() {
    try {
      await this.client.connect()
      console.log('Connected successfully to database')
      const db = this.client.db(dbName)
      return db
    } catch (error) {
      console.error('Error connecting to database:', error)
      throw error
    } finally {
      await this.client.close()
    }
  }
}
export default new DatabaseService()
