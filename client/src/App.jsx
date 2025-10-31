import React,{useEffect,useMemo,useState} from 'react'
import { api, API_URL } from './api'
import Header from './components/Header.jsx'
import Login from './components/Login.jsx'
import ProductCard from './components/ProductCard.jsx'
import Offers from './components/Offers.jsx'
import AdminPanel from './components/AdminPanel.jsx'

export default function App(){
  const [dark,setDark]=useState(false), [query,setQuery]=useState(''), [products,setProducts]=useState([]), [offers,setOffers]=useState([]), [err,setErr]=useState('')
  const [user,setUser]=useState(()=>JSON.parse(localStorage.getItem('user')||'null'))
  useEffect(()=>{ document.documentElement.classList.toggle('dark',dark) },[dark])
  const load=async()=>{ try{ setErr(''); const [p,o]=await Promise.all([api.get('/api/products'), api.get('/api/offers')]); setProducts(p.data||[]); setOffers(o.data||[]) }catch(e){ setErr('No se pudieron cargar datos. Verifica backend y VITE_API_URL.') } }
  useEffect(()=>{ load() },[])
  const filtered=useMemo(()=>{ const q=query.trim().toLowerCase(); if(!q) return products; return products.filter(p=>(p.name||'').toLowerCase().includes(q)||(p.category||'').toLowerCase().includes(q)||(p.subcategory||'').toLowerCase().includes(q)) },[query,products])
  const logout=()=>{ localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null) }
  return(<div className='min-h-screen'><Header query={query} setQuery={setQuery} dark={dark} toggle={()=>setDark(v=>!v)} logged={!!user} onLogout={logout}/><div className='container'>{err&&<div className='mt-4 text-red-600'>{err}</div>}{!user&&<Login onSuccess={setUser}/>} {user?.rol==='admin'&&<AdminPanel onCreated={load}/>}</div><Offers items={offers}/><div className='container'>{filtered.length===0?(<p className='mt-6 text-zinc-500'>No hay coincidencias con “{query}”.</p>):(<div className='grid-prod my-6'>{filtered.map(p=><ProductCard key={p._id||p.id} p={p}/>)}</div>)}<p className='text-xs text-zinc-500'>API: {API_URL}</p></div><footer>© {new Date().getFullYear()} Kiosco‑NET v9</footer></div>) }
