const mongoose = require('mongoose')

const DatabaseCon = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    if(connection){
      console.log('Database connected successfully')
    }else{
      console.log('Failed to connect database')
    }
  } catch (error) {
    throw error
  }
}
module.exports =  DatabaseCon