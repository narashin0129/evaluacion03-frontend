"""
API: Servicios de la lavandería
Alumno: Na Ra Shin Lim  ·  Sección: C1  ·  Tema 20: Lavandería
Proyecto EV3 (UA3) — API asignada por el docente.

Ejecutar:
    pip install -r requirements.txt
    uvicorn main:app --host 0.0.0.0 --port 8000

Endpoint principal:  GET /api/servicios
Documentación:       http://127.0.0.1:8000/docs
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Servicios de la lavandería")

# CORS abierto para que el frontend (React/Vite) pueda consumir la API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# "Base de datos" en memoria (arreglo de objetos).
DATOS = [{'id': 1,
  'nombre': 'Lavado por kilo',
  'descripcion': 'Ropa general',
  'categoria': 'Lavado',
  'precio': 2500,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Lavado+por+kilo'},
 {'id': 2,
  'nombre': 'Lavado en seco',
  'descripcion': 'Prendas delicadas',
  'categoria': 'Premium',
  'precio': 5990,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Lavado+en+seco'},
 {'id': 3,
  'nombre': 'Planchado',
  'descripcion': 'Camisas y pantalones',
  'categoria': 'Adicional',
  'precio': 1500,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Planchado'},
 {'id': 4,
  'nombre': 'Lavado de plumón',
  'descripcion': 'Edredones grandes',
  'categoria': 'Especial',
  'precio': 8990,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Lavado+de+plumón'},
 {'id': 5,
  'nombre': 'Tintorería',
  'descripcion': 'Teñido de prendas',
  'categoria': 'Premium',
  'precio': 6990,
  'disponible': False,
  'imagen': 'https://placehold.co/400x300?text=Tintorería'}]


@app.get("/")
def inicio():
    return {
        "mensaje": "API Servicios de la lavandería",
        "endpoint": "GET /api/servicios",
        "docs": "/docs",
    }


@app.get("/api/servicios")
def listar():
    """Devuelve el JSON con todos los registros."""
    return {"total": len(DATOS), "servicios": DATOS}


@app.get("/api/servicios/{item_id}")
def obtener(item_id: int):
    """Devuelve un registro por su id (404 si no existe)."""
    for item in DATOS:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="No encontrado")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
