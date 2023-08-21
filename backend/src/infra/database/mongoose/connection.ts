import mongoose from 'mongoose'
import 'dotenv/config'

const MONGO_DB_URL = 'mongodb://localhost:27017/routine_organizer'

const connectToDatabase = async (
  mongoDatabaseURI = process.env.MONGO_URI ??
    MONGO_DB_URL
): Promise<typeof mongoose> => await mongoose.connect(mongoDatabaseURI)

export default connectToDatabase
