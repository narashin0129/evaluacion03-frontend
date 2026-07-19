
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
          Fecha de retiro
          <input name="fecha" type="date" value={form.fecha} onChange={onChange} />
        </label>

        <label>
          Método
          <select name="metodo" value={form.metodo} onChange={onChange}>
            <option value="Retiro en tienda">Retiro en tienda</option>
            <option value="Delivery">Delivery</option>
            <option value="Recoger en horario">Recoger en horario</option>
          </select>
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