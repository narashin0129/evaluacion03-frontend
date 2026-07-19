

function ServiceCard({ servicio, isSelected, onToggleServicio, formatCurrency }) {
  return (
    <article className={`service-card ${!servicio.disponible ? 'disabled' : ''}`}>
      <img src={servicio.imagen} alt={servicio.nombre} />
      <div className="service-body">
        <div className="service-top">
          <h3>{servicio.nombre}</h3>
          <span>{servicio.categoria}</span>
        </div>
        <p>{servicio.descripcion}</p>
        <div className="service-footer">
          <strong>{formatCurrency(servicio.precio)}</strong>
          <button type="button" onClick={() => onToggleServicio(servicio)} disabled={!servicio.disponible}>
            {isSelected ? 'Quitar' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  )
};

export default ServiceCard