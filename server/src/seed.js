import dotenv from 'dotenv'; dotenv.config();
import mongoose from 'mongoose'
import User from './models/User.js'
import Product from './models/Product.js'
import Offer from './models/Offer.js'
import Sale from './models/Sale.js'
import fs from 'fs'; import path from 'path'

const uploads = path.join(process.cwd(),'server','src','uploads')
if(!fs.existsSync(uploads)) fs.mkdirSync(uploads,{recursive:true})

const svg=(text,color)=>`<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='${color}'/><stop offset='100%' stop-color='#0b0f19'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-weight='700' font-size='42' fill='white'>${text}</text></svg>`
const ensure=(name,txt)=>{ const f=path.join(uploads,name); if(!fs.existsSync(f)) fs.writeFileSync(f,txt,'utf-8') }
ensure('oferta-rasta.svg', svg('2 x $2000 en Rasta','#0ea5e9'))
ensure('oferta-bubalu.svg', svg('3x2 en Bubalu','#22c55e'))
ensure('oferta-combo.svg', svg('Coca + Pancho $3000','#f97316'))

await mongoose.connect(process.env.MONGO_URI)
await Promise.all([User.deleteMany({}), Product.deleteMany({}), Offer.deleteMany({}), Sale.deleteMany({})])

const admin = await User.create({ nombre:'Tomás', apellido:'Delfino', fechaNacimiento:new Date('2005-10-01'), email:'tomas.ez3010@gmail.com', password:'Kiosco-net2025', rol:'admin', direccion:'—', avatar:'' })

const base=[['Agua Mineral 500ml','Bebidas','Aguas'],['Agua Saborizada','Bebidas','Aguas'],['Gaseosa Cola 1.5L','Bebidas','Gaseosas'],['Gaseosa Naranja 1.5L','Bebidas','Gaseosas'],['Chocolate Amargo','Golosinas','Chocolates'],['Chocolate con Leche','Golosinas','Chocolates'],['Gomitas Frutales','Golosinas','Gomitas'],['Caramelos de Menta','Golosinas','Caramelos'],['Chicle Clásico','Golosinas','Chicles'],['Papas Clásicas','Snacks','Papitas'],['Papas Onduladas','Snacks','Papitas'],['Nachos Picantes','Snacks','Nachos'],['Maní Salado','Snacks','Maní'],['Detergente Limón','Limpieza','Detergente'],['Desinfectante','Limpieza','Desinfectantes'],['Jugo de Naranja','Bebidas','Jugos']]
const colors=['#0ea5e9','#f97316','#22c55e','#a855f7','#e11d48','#14b8a6','#eab308','#3b82f6']
const prods=[]
base.forEach((t,i)=>{ const name=t[0], c=colors[i%colors.length], slug='p'+i+'.svg'; ensure(slug, svg(name,c)); prods.push({ name, category:t[1], subcategory:t[2], price:Math.round(500+Math.random()*3500), imageUrl:'/uploads/'+slug, stock:100 }) })
await Product.insertMany(prods)
await Offer.insertMany([{title:'2x$2000 Rasta',tag:'promo',imageUrl:'/uploads/oferta-rasta.svg',active:true},{title:'3x2 Bubalu',tag:'promo',imageUrl:'/uploads/oferta-bubalu.svg',active:true},{title:'Combo Coca + Pancho',tag:'combo',imageUrl:'/uploads/oferta-combo.svg',active:true}])
await Sale.create({ userId:admin._id, comprador:admin.email, productos:[{nombre:prods[0].name,cantidad:1,precio:prods[0].price}], total:prods[0].price })
console.log('Seed OK'); await mongoose.disconnect()
