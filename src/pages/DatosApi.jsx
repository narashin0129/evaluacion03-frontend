function DatosApi({ servicios, estadoApi, onReintentar }) {
  return (
    <section>
      <h1>Datos desde la API</h1>
      <p>
        Esta sección consume el catálogo de servicios directamente desde el
        backend (FastAPI) usando <code>fetch</code>, en{' '}
        <code>http://127.0.0.1:8000/api/servicios</code>.
      </p>

      {estadoApi === 'cargando' && (
        <div className="api-status api-status--cargando">
          ⏳ Cargando datos desde la API...
        </div>
      )}

      {estadoApi === 'error' && (
        <div className="api-status api-status--error">
          <p>
            ❌ No se pudo obtener datos de la API. ¿Está corriendo el backend
            en <code>http://127.0.0.1:8000</code>?
          </p>
          <button type="button" onClick={onReintentar}>
            Reintentar
          </button>
        </div>
      )}

      {estadoApi === 'ok' && (
        <div className="api-status api-status--ok">
          <p>✅ Datos obtenidos correctamente ({servicios.length} servicio(s)).</p>
          <ul className="api-data-list">
            {servicios.map((s) => (
              <li key={s.id}>
                <strong>{s.nombre}</strong> — {s.categoria} — $
                {s.precio.toLocaleString('es-CL')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default DatosApi