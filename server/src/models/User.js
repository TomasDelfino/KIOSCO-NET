import mongoose from 'mongoose'; import bcrypt from 'bcryptjs'
const s=new mongoose.Schema({nombre:String,apellido:String,fechaNacimiento:Date,email:{type:String,unique:true},password:String,direccion:String,avatar:String,rol:{type:String,enum:['user','admin'],default:'user'}},{timestamps:true})
s.pre('save', async function(n){ if(!this.isModified('password')) return n(); this.password=await bcrypt.hash(this.password,10); n(); })
s.methods.matchPassword = async function(e){ return await bcrypt.compare(e,this.password) }
export default mongoose.model('User',s)
