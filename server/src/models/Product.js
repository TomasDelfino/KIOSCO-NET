import mongoose from 'mongoose'
const s=new mongoose.Schema({name:String,price:Number,category:String,subcategory:String,imageUrl:String,stock:{type:Number,default:100}},{timestamps:true});export default mongoose.model('Product',s)
