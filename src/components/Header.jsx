

function Header({ seleccionados, total, formatCurrency }) {
  return (
    <header className="hero">
      <div>
        <p className="eyebrow">Evaluación 03 · React + Vite</p>
        <h1>Lavandería Express</h1>
        <p>Gestiona reservas y pedidos de tus servicios favoritos en minutos.</p>
      </div>

      <div className="hero-card">
        <h2>Resumen rápido</h2>
        <p>{seleccionados.length} servicio(s) seleccionado(s)</p>
        <strong>{formatCurrency(total)}</strong>
      </div>
    </header>
  )
};

export default Header