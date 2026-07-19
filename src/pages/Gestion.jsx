import PedidoPanel from '../components/PedidoPanel'
import ReservaForm from '../components/ReservaForm'
import ReservasRecientes from '../components/ReservasRecientes'

function Gestion({
  seleccionados,
  total,
  onCambiarCantidad,
  formatCurrency,
  form,
  isEditing,
  onChangeForm,
  onSubmitForm,
  onCancelForm,
  errores,
  reservas,
  onEdit,
  onDelete,
}) {
  return (
    <section>
      <h1>Gestión de reservas</h1>
      <div className="layout">
        <div className="sidebar">
          <PedidoPanel
            seleccionados={seleccionados}
            total={total}
            onCambiarCantidad={onCambiarCantidad}
            formatCurrency={formatCurrency}
          />
          <ReservaForm
            form={form}
            isEditing={isEditing}
            onChange={onChangeForm}
            onSubmit={onSubmitForm}
            onCancel={onCancelForm}
            errores={errores}
          />
        </div>
        <ReservasRecientes
          reservas={reservas}
          formatCurrency={formatCurrency}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </section>
  )
}

export default Gestion