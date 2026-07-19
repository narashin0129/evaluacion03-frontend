import ReservaItem from './ReservaItem'

function ReservasRecientes({ reservas, formatCurrency, onEdit, onDelete }) {
  return (
    <section className="panel">
      <h2>Reservas recientes</h2>
      {reservas.length === 0 ? (
        <p className="empty">No hay reservas aún.</p>
      ) : (
        <ul className="reservation-list">
          {reservas.slice(0, 3).map((reserva) => (
            <ReservaItem
              key={reserva.id}
              reserva={reserva}
              formatCurrency={formatCurrency}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default ReservasRecientes