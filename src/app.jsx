import { useEffect, useMemo, useState } from 'react'

const API_URL = 'http://127.0.0.1:8000/api/servicios'

const FALLBACK_SERVICIOS = [
  {
    id: 1,
    nombre: 'Lavado por kilo',
    descripcion: 'Ropa general',
    categoria: 'Lavado',
    precio: 2500,
    disponible: true,
    imagen: 'https://placehold.co/400x300?text=Lavado+por+kilo',
  },
  {
    id: 2,
    nombre: 'Lavado en seco',
    descripcion: 'Prendas delicadas',
    categoria: 'Premium',
    precio: 5990,
    disponible: true,
    imagen: 'https://placehold.co/400x300?text=Lavado+en+seco',
  },
  {
    id: 3,
    nombre: 'Planchado',
    descripcion: 'Camisas y pantalones',
    categoria: 'Adicional',
    precio: 1500,
    disponible: true,
    imagen: 'https://placehold.co/400x300?text=Planchado',
  },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function App() {
  const [servicios, setServicios] = useState(FALLBACK_SERVICIOS)
  const [seleccionados, setSeleccionados] = useState([])
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    fecha: '',
    notas: '',
    metodo: 'Retiro en tienda',
  })
  const [reservas, setReservas] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const datosGuardados = localStorage.getItem('reservas-lavanderia')
    if (datosGuardados) {
      try {
        setReservas(JSON.parse(datosGuardados))
      } catch {
        localStorage.removeItem('reservas-lavanderia')
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('reservas-lavanderia', JSON.stringify(reservas))
  }, [reservas])

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo cargar la API')
        return response.json()
      })
      .then((data) => {
        if (data?.servicios?.length) {
          setServicios(data.servicios)
        }
      })
      .catch(() => {
        setMensaje('La API no responde, se muestran los servicios de respaldo.')
      })
  }, [])

  const total = useMemo(() => {
    return seleccionados.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  }, [seleccionados])

  function toggleServicio(servicio) {
    if (!servicio.disponible) return

    setSeleccionados((prev) => {
      const existente = prev.find((item) => item.id === servicio.id)
      if (!existente) {
        return [...prev, { ...servicio, cantidad: 1 }]
      }
      return prev.filter((item) => item.id !== servicio.id)
    })
    setError('')
  }

  function cambiarCantidad(id, delta) {
    setSeleccionados((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  function actualizarForm(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function crearReserva(event) {
    event.preventDefault()

    if (!form.nombre || !form.telefono || !form.fecha || seleccionados.length === 0) {
      setError('Completa tus datos y selecciona al menos un servicio.')
      return
    }

    const nuevaReserva = {
      id: Date.now(),
      cliente: form.nombre,
      telefono: form.telefono,
      fecha: form.fecha,
      metodo: form.metodo,
      notas: form.notas,
      servicios: seleccionados,
      total,
      estado: 'Pendiente',
    }

    setReservas((prev) => [nuevaReserva, ...prev])
    setSeleccionados([])
    setForm({ nombre: '', telefono: '', fecha: '', notas: '', metodo: 'Retiro en tienda' })
    setMensaje('Reserva creada con éxito. Recibirás una confirmación por WhatsApp.')
    setError('')
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Evaluación 03 · React + Vite</p>
          <h1>Lavandería Express</h1>
          <p>Gestiona reservas y pedidos de tus servicios favoritos en minutos.</p>
        </div>

        <div className="hero-card">
          <h2>Resumen rápido</h2>
          <p>{seleccionados.length} servicio(s) seleccionado(s)</p>
          <strong>{formatCurrency(total)}</strong>
        </div>
      </header>

      {mensaje && <div className="alert success">{mensaje}</div>}
      {error && <div className="alert error">{error}</div>}

      <main className="layout">
        <section>
          <h2>Servicios disponibles</h2>
          <div className="cards-grid">
            {servicios.map((servicio) => (
              <article key={servicio.id} className={`service-card ${!servicio.disponible ? 'disabled' : ''}`}>
                <img src={servicio.imagen} alt={servicio.nombre} />
                <div className="service-body">
                  <div className="service-top">
                    <h3>{servicio.nombre}</h3>
                    <span>{servicio.categoria}</span>
                  </div>
                  <p>{servicio.descripcion}</p>
                  <div className="service-footer">
                    <strong>{formatCurrency(servicio.precio)}</strong>
                    <button type="button" onClick={() => toggleServicio(servicio)} disabled={!servicio.disponible}>
                      {seleccionados.some((item) => item.id === servicio.id) ? 'Quitar' : 'Agregar'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="sidebar">
          <section className="panel">
            <h2>Tu pedido</h2>
            {seleccionados.length === 0 ? (
              <p className="empty">Aún no has agregado servicios.</p>
            ) : (
              <ul className="pedido-list">
                {seleccionados.map((item) => (
                  <li key={item.id}>
                    <div>
                      <strong>{item.nombre}</strong>
                      <p>{formatCurrency(item.precio)} c/u</p>
                    </div>
                    <div className="qty-controls">
                      <button type="button" onClick={() => cambiarCantidad(item.id, -1)}>-</button>
                      <span>{item.cantidad}</span>
                      <button type="button" onClick={() => cambiarCantidad(item.id, 1)}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="total-box">
              <span>Total estimado</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </section>

          <section className="panel">
            <h2>Reservar</h2>
            <form onSubmit={crearReserva} className="form-grid">
              <label>
                Nombre
                <input name="nombre" value={form.nombre} onChange={actualizarForm} placeholder="Tu nombre" />
              </label>

              <label>
                Teléfono
                <input name="telefono" value={form.telefono} onChange={actualizarForm} placeholder="912345678" />
              </label>

              <label>
                Fecha de retiro
                <input name="fecha" type="date" value={form.fecha} onChange={actualizarForm} />
              </label>

              <label>
                Método
                <select name="metodo" value={form.metodo} onChange={actualizarForm}>
                  <option value="Retiro en tienda">Retiro en tienda</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Recoger en horario">Recoger en horario</option>
                </select>
              </label>

              <label className="full">
                Notas
                <textarea name="notas" value={form.notas} onChange={actualizarForm} placeholder="Detalles adicionales" rows="3" />
              </label>

              <button type="submit" className="full">Confirmar reserva</button>
            </form>
          </section>

          <section className="panel">
            <h2>Reservas recientes</h2>
            {reservas.length === 0 ? (
              <p className="empty">No hay reservas aún.</p>
            ) : (
              <ul className="reservation-list">
                {reservas.slice(0, 3).map((reserva) => (
                  <li key={reserva.id}>
                    <strong>{reserva.cliente}</strong>
                    <p>{reserva.fecha} · {reserva.metodo}</p>
                    <span>{formatCurrency(reserva.total)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </main>
    </div>
  )
}