export function validarReserva(form) {
  const errores = {}

  if (!form.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.'
  } else if (form.nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 letras.'
  }

  const telefonoLimpio = form.telefono.replace(/\s|-/g, '')
  if (!telefonoLimpio) {
    errores.telefono = 'El teléfono es obligatorio.'
  } else if (!/^\+?56?9\d{8}$/.test(telefonoLimpio) && !/^9\d{8}$/.test(telefonoLimpio)) {
    errores.telefono = 'Ingresa un teléfono válido (ej. 912345678).'
  }

  if (!form.correo.trim()) {
    errores.correo = 'El correo es obligatorio.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.trim())) {
    errores.correo = 'Ingresa un correo válido (ej. nombre@correo.com).'
  }

  if (!form.fecha) {
    errores.fecha = 'Selecciona una fecha de retiro.'
  } else {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const fechaElegida = new Date(form.fecha + 'T00:00:00')
    if (fechaElegida < hoy) {
      errores.fecha = 'La fecha no puede ser en el pasado.'
    }
  }

  return errores
}

{/*
    Qué hace cada validación:

nombre: no vacío y al menos 3 caracteres.
telefono: le saca espacios/guiones y usa una expresión regular para aceptar formatos tipo 912345678 o +56912345678.
correo: no vacío y con formato básico algo@algo.algo (una expresión regular simple, no exhaustiva, pero suficiente para el nivel de este curso).
fecha: no vacía, y no puede ser anterior a hoy.

Si el objeto errores queda vacío ({}), significa que todo pasó.
    */}