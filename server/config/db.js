const mongoose = require('mongoose');

const connectDB=async()=>{
    const connect=await mongoose.connect(process.env.MONGO_DB_URI)
    console.log(`MongoDB connected: ${connect.connection.host}`.cyan.underline.bold)
}

module.exports=connectDB;