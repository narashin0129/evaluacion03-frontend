function ReservaForm({ form, isEditing, onChange, onSubmit, onCancel, errores = {} }) {
  return (
    <section className="panel">
      <h2>{isEditing ? 'Editar reserva' : 'Reservar'}</h2>
      <form onSubmit={onSubmit} className="form-grid" noValidate>
        <label>
          Nombre
          <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Tu nombre" />
          {errores.nombre && <span className="field-error">{errores.nombre}</span>}
        </label>

        <label>
          Teléfono
          <input name="telefono" value={form.telefono} onChange={onChange} placeholder="912345678" />
          {errores.telefono && <span className="field-error">{errores.telefono}</span>}
        </label>

        <label>
          Correo
          <input name="correo" type="email" value={form.correo} onChange={onChange} placeholder="tu@correo.com" />
          {errores.correo && <span className="field-error">{errores.correo}</span>}
        </label>

        <label>
          Fecha de retiro
          <input name="fecha" type="date" value={form.fecha} onChange={onChange} />
          {errores.fecha && <span className="field-error">{errores.fecha}</span>}
        </label>

        <label className="full">
          Notas
          <textarea name="notas" value={form.notas} onChange={onChange} placeholder="Detalles adicionales" rows="3" />
        </label>

        <button type="submit" className="full">
          {isEditing ? 'Guardar cambios' : 'Confirmar reserva'}
        </button>

        {isEditing && (
          <button type="button" className="full" onClick={onCancel}>
            Cancelar edición
          </button>
        )}
      </form>
    </section>
  )
}

export default ReservaForm

{/*
  Agregué noValidate al <form> — esto desactiva la validación nativa del navegador 
  (esa que a veces muestra globitos con su propio estilo) para que solo se vea tu 
  validación personalizada y no se mezclen los dos sistemas.
  errores = {} como valor por defecto en los parámetros — así, si por algún motivo 
  ReservaForm se usa sin pasarle errores, no explota al intentar leer errores.nombre 
  de undefined.
  */}