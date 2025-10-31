import mongoose from 'mongoose'
const s=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},comprador:String,productos:[{nombre:String,cantidad:Number,precio:Number}],total:Number},{timestamps:true});export default mongoose.model('Sale',s)
