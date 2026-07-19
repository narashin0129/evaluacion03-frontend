import ServiceCard from './ServiceCard'

function ServiciosList({ servicios, seleccionados, onToggleServicio, formatCurrency }) {
  return (
    <section>
      <h2>Servicios disponibles</h2>
      <div className="cards-grid">
        {servicios.map((servicio) => (
          <ServiceCard
            key={servicio.id}
            servicio={servicio}
            isSelected={seleccionados.some((item) => item.id === servicio.id)}
            onToggleServicio={onToggleServicio}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
    </section>
  )
};

export default ServiciosList