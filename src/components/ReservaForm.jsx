
function ReservaForm({ form, isEditing, onChange, onSubmit, onCancel }) {
  return (
    <section className="panel">
      <h2>{isEditing ? 'Editar reserva' : 'Reservar'}</h2>
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Nombre
          <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Tu nombre" />
        </label>

        <label>
          Teléfono
          <input name="telefono" value={form.telefono} onChange={onChange} placeholder="912345678" />
        </label>

        <label>
          Correo
          <input name="correo" type="email" value={form.correo} onChange={onChange} placeholder="tu@correo.com" />
        </label>

        <label>
          Fecha de retiro
          <input name="fecha" type="date" value={form.fecha} onChange={onChange} />
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