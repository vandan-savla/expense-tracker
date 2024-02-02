const mongoose= require('mongoose')

const db = async ()=>{
 try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('DB Connected')
} catch (error) {
     console.log('DB Failed to Connected')
    
 }   
}
module.exports = {db}