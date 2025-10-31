import User from '../models/User.js'; import bcrypt from 'bcryptjs'
export const me=async(req,res)=>{ const u=await User.findById(req.user.id).select('-password'); res.json(u) }
export const updateMe=async(req,res)=>{ const {direccion,avatar}=req.body; const u=await User.findByIdAndUpdate(req.user.id,{direccion,avatar},{new:true}).select('-password'); res.json(u) }
export const changePassword=async(req,res)=>{ const {actual,nueva}=req.body; const u=await User.findById(req.user.id); const ok=await u.matchPassword(actual); if(!ok) return res.status(400).json({msg:'Contraseña actual incorrecta'}); u.password=await bcrypt.hash(nueva,10); await u.save(); res.json({ok:true}) }
