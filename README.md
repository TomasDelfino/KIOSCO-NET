# Kiosco‑NET v9 (local) — client/ + server/

## Requisitos
- Node.js 18+ (recomendado 20/22)
- MongoDB local corriendo (`mongodb://localhost:27017`)

## 1) Backend (server/)
```powershell
cd server
if not exist .env copy .env.example .env
notepad .env   # PORT=4000, MONGO_URI=mongodb://localhost:27017/kiosco_net_v9, CORS_ORIGIN=http://localhost:5173
npm install
npm run seed
npm run dev
# Probar: http://localhost:4000/api/health
```

**Admin de seed** → Email: `tomas.ez3010@gmail.com` — Password: `Kiosco-net2025`  
Imágenes estáticas: `server/src/uploads/`  (el seed genera banners y “fotos” SVG).  
Subidas nuevas: `POST /api/upload` (multipart/form-data `image`) → `{ url: '/uploads/<file>' }`

## 2) Frontend (client/)
```powershell
cd client
if not exist .env copy .env.example .env   # VITE_API_URL=http://localhost:4000
npm install
npm run dev
# Abrir http://localhost:5173
```

## 3) Posibles errores y solución
- **Login falla / “Usuario o contraseña incorrectos”**  
  - Usar el admin del seed (arriba). El backend normaliza email a **minúsculas** y compara con **bcrypt**.  
  - Si no corriste `npm run seed`, ejecútalo con Mongo en marcha.

- **No se ven imágenes**  
  - Backend debe estar arriba y sirviendo `/uploads`.  
  - `client/.env` debe tener `VITE_API_URL=http://localhost:4000` y reiniciar `npm run dev`.  
  - En productos, `imageUrl` debe ser `"/uploads/archivo.ext"` (el front lo resuelve contra la API).

- **CORS**  
  - Ajusta `CORS_ORIGIN` (por defecto `http://localhost:5173`) y reinicia el backend.

- **Puerto 4000 ocupado (EADDRINUSE)**  
  - Cierra la otra instancia o cambia `PORT` y también `VITE_API_URL` a ese puerto.
