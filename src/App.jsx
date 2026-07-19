import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ServiciosList from './components/ServiciosList'
import PedidoPanel from './components/PedidoPanel'
import ReservaForm from './components/ReservaForm'
import ReservasRecientes from './components/ReservasRecientes'

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
  return `$${value.toLocaleString('es-CL')}`
}

function createEmptyForm() {
  return {
    id: null,
    nombre: '',
    telefono: '',
    fecha: '',
    notas: '',
    metodo: 'Retiro en tienda',
  }
}

function App() {
  const [servicios, setServicios] = useState(FALLBACK_SERVICIOS)
  const [seleccionados, setSeleccionados] = useState([])
  const [form, setForm] = useState(createEmptyForm())
  const [reservas, setReservas] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false)

  useEffect(() => {
    const datosGuardados = localStorage.getItem('reservas-lavanderia')
    if (datosGuardados) {
      try {
        setReservas(JSON.parse(datosGuardados))
      } catch {
        localStorage.removeItem('reservas-lavanderia')
      }
    }
    setHasLoadedFromStorage(true)
  }, [])

  useEffect(() => {
    if (!hasLoadedFromStorage) return
    localStorage.setItem('reservas-lavanderia', JSON.stringify(reservas))
  }, [reservas, hasLoadedFromStorage])

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

  function resetForm() {
    setForm(createEmptyForm())
    setIsEditing(false)
  }

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

  function startEditReserva(reserva) {
    setForm({
      id: reserva.id,
      nombre: reserva.cliente,
      telefono: reserva.telefono,
      fecha: reserva.fecha,
      notas: reserva.notas,
      metodo: reserva.metodo,
    })
    setIsEditing(true)
    setError('')
  }

  function eliminarReserva(id) {
    setReservas((prev) => prev.filter((reserva) => reserva.id !== id))
    if (form.id === id) {
      resetForm()
    }
    setMensaje('Reserva eliminada correctamente.')
  }

  function crearReserva(event) {
    event.preventDefault()

    if (!form.nombre || !form.telefono || !form.fecha) {
      setError('Completa tus datos para guardar la reserva.')
      return
    }

    if (!form.id && seleccionados.length === 0) {
      setError('Selecciona al menos un servicio para crear una reserva.')
      return
    }

    const reservaActual = reservas.find((reserva) => reserva.id === form.id)
    const serviciosParaGuardar = reservaActual?.servicios ?? seleccionados
    const totalParaGuardar = reservaActual?.total ?? total

    if (form.id) {
      setReservas((prev) =>
        prev.map((reserva) =>
          reserva.id === form.id
            ? {
                ...reserva,
                cliente: form.nombre,
                telefono: form.telefono,
                fecha: form.fecha,
                metodo: form.metodo,
                notas: form.notas,
                servicios: serviciosParaGuardar,
                total: totalParaGuardar,
              }
            : reserva
        )
      )
      setMensaje('Reserva actualizada correctamente.')
    } else {
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
      setMensaje('Reserva creada con éxito. Recibirás una confirmación por WhatsApp.')
    }

    setSeleccionados([])
    resetForm()
    setError('')
  }

  return (
    <div className="app-shell">
      <Header seleccionados={seleccionados} total={total} formatCurrency={formatCurrency} />

      <main className="layout">
        <ServiciosList
          servicios={servicios}
          seleccionados={seleccionados}
          onToggleServicio={toggleServicio}
          formatCurrency={formatCurrency}
        />

        <aside className="sidebar">
          <PedidoPanel
            seleccionados={seleccionados}
            total={total}
            onCambiarCantidad={cambiarCantidad}
            formatCurrency={formatCurrency}
          />

          <ReservaForm
            form={form}
            isEditing={isEditing}
            onChange={actualizarForm}
            onSubmit={crearReserva}
            onCancel={resetForm}
          />

          {mensaje && <div className="alert success">{mensaje}</div>}
          {error && <div className="alert error">{error}</div>}

          <ReservasRecientes
            reservas={reservas}
            formatCurrency={formatCurrency}
            onEdit={startEditReserva}
            onDelete={eliminarReserva}
          />
        </aside>
      </main>
    </div>
  )
}

export default App