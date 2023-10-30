import PropTypes from 'prop-types';
import ProductDetail from './ProductDetail';
import { useModal } from '@/hooks';

export function Grid({ data }) {
  const { openModal } = useModal();

  return (
    <section className='flex flex-row flex-wrap justify-center gap-5'>
      {data.map(item => (
        <div
          key={item.id}
          className=' w-full h-[153px] bg-base-200 rounded-3xl shadow flex flex-row min-[400px]:max-w-[342px] cursor-pointer'
          onClick={() =>
            openModal(<ProductDetail product={item} />, {
              title: item.nombre,
            })
          }
        >
          <img
            className=' object-cover rounded-3xl w-[146px] max-w-4xl h-full'
            src={item.imagen}
            alt={item.nombre}
          />
          <div className='flex flex-col justify-between w-full p-4'>
            <div>
              <p className='block mt-1 text-lg font-medium leading-tight text-secondary'>
                {item.nombre}
              </p>
              <p className='text-sm tracking-wide uppercase text-primary'>
                {item.categoria.nombre}
              </p>
            </div>

            <div className='flex justify-between w-full'>
              <p className='mt-2 text-secondary'>{item.marca.nombre}</p>
              <p className='mt-2 text-secondary'>{item.costo}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
Grid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};
