import { NavLink } from 'react-router-dom'

function Header({ seleccionados, total, formatCurrency }) {
  return (
    <header className="hero">
      <div>
        <p className="eyebrow">Evaluación 03 · React + Vite</p>
        <h1>Lavandería Express</h1>
        <p>Gestiona reservas y pedidos de tus servicios favoritos en minutos.</p>

        <nav className="main-nav">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/gestion">Gestión</NavLink>
          <NavLink to="/api">Datos API</NavLink>
        </nav>
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