import mongoose from 'mongoose'

let connected = false

const connectDB = async () => {
  mongoose.set('strictQuery', true)

  //if the database is already connected, dont connect again
  if (connected) {
    console.log('MogoDB is already connected')
    return
  }

  //connect to the database
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    connected = true
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
