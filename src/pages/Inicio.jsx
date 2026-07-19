import ServiciosList from '../components/ServiciosList'

function Inicio({ servicios, seleccionados, onToggleServicio, formatCurrency }) {
  return (
    <section>
      <h1>Catálogo de servicios</h1>
      <p>Elige los servicios que quieres reservar. Podrás confirmarlos en "Gestión".</p>
      <ServiciosList
        servicios={servicios}
        seleccionados={seleccionados}
        onToggleServicio={onToggleServicio}
        formatCurrency={formatCurrency}
      />
    </section>
  )
}

export default Inicio