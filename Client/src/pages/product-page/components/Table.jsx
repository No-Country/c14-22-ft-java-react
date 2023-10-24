import PropTypes from 'prop-types';

export function Table({ data }) {
  return (
    <table className='table bg-base-200 '>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Categoria</th>
          <th>Marcas</th>
          <th>Vencimiento</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.nombre}</td>
            <td>
              <div className='w-12 h-12 mask mask-squircle'>
                <img src={item.imagen} alt='Imagen' />
              </div>
            </td>
            <td>{item.categoria}</td>
            <td>{item.marcas}</td>
            <td>{item.fechaVencimiento}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};
