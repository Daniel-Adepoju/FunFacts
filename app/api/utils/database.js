import mongoose, { Mongoose } from "mongoose";

let isConnected = false
export const connecToDB = async () => {
    // mongoose.set('strictQuery', true)


if (isConnected) {
    console.log('MongoDB is already connected')
    return
}

try {
 await mongoose.connect(process.env.MOGODB_URI,{
    dbName:'share_fun_facts',
 })
 isConnected = true
 console.log('MongoDB connected')
} catch(err) {
 console.log(err)
}

}