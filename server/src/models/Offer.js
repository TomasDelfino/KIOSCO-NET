import mongoose from 'mongoose'
const s=new mongoose.Schema({title:String,tag:String,imageUrl:String,active:{type:Boolean,default:true}},{timestamps:true});export default mongoose.model('Offer',s)
