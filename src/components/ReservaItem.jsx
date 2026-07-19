
function ReservaItem({ reserva, formatCurrency, onEdit, onDelete }) {
  return (
    <li>
      <div>
        <strong>{reserva.cliente}</strong>
        <p>{reserva.fecha} · {reserva.correo}</p>
        <span>{formatCurrency(reserva.total)}</span>
      </div>
      <div className="qty-controls">
        <button type="button" onClick={() => onEdit(reserva)}>
          Editar
        </button>
        <button type="button" onClick={() => onDelete(reserva.id)}>
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default ReservaItem