import PropTypes from 'prop-types';

export default function ProductDetail({ product }) {
  return (
    <>
      <div className='w-full h-[20rem] rounded-3xl my-3'>
        <img
          className='object-contain w-full h-full'
          src={product.imagen}
          alt='Imagen'
        />
      </div>
      <div className='flex flex-col w-full h-full gap-3 pt-3 mt-2 border-t-2'>
        <div>
          <h1 className='text-xl font-semibold'>{product.nombre}</h1>
          <h1 className='font-semibold tracking-wide uppercase text-md text-primary'>
            {product.categoria.nombre}
          </h1>
        </div>

        <h2>
          Proveedor:
          <span className='font-semibold'>{product.proveedor.nombre}</span>
        </h2>
        <h2>
          Marca: <span className='font-semibold'>{product.marca.nombre}</span>
        </h2>
        <h2>
          Fecha de vencimiento:
          <span className='font-semibold'>{product.fechaVencimiento}</span>
        </h2>

        <h2>Almacenado: ???</h2>

        <div className='flex flex-row justify-between mt-5'>
          <button className='btn'>Agregar</button>
          <button className='btn'>Actualizar</button>
          <button className='btn'>Eliminar</button>
        </div>
      </div>
    </>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.any,
};
