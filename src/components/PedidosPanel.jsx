

function PedidoPanel({ seleccionados, total, onCambiarCantidad, formatCurrency }) {
  return (
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
                <button type="button" onClick={() => onCambiarCantidad(item.id, -1)}>-</button>
                <span>{item.cantidad}</span>
                <button type="button" onClick={() => onCambiarCantidad(item.id, 1)}>+</button>
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
  )
};

export default PedidoPanel