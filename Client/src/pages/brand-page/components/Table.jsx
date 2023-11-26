import PropTypes from 'prop-types';
import { TrashIcon, PencilAltIcon } from '@/assets/svg';
import { useBrands, useModal } from '@/hooks/';
import { TableSkeleton } from '@/components';
import { UpdateBrand } from './UpdateBrand';

export function Table({ data }) {
  const { loading, deleteBrand } = useBrands();
  const { openModal } = useModal();
  const headers = ['Marca', 'Acciones'];

  const deleteBrandAlert = id => {
    swal({
      title: 'Desea eliminar la marca',
      icon: 'warning',
      buttons: {
        catch: {
          text: 'Cancelar',
          value: null,
          className: 'btn btn-accent',
        },
        default: {
          text: 'Eliminar',
          value: true,
          className: 'btn btn-primary',
        },
      },
    }).then(valueButtoms => {
      if (valueButtoms) {
        deleteBrand(id)
        swal({
          title: 'La marca fue eliminada',
          icon: 'success',
        });
      }
    });
  };

  return (
    <>
      {loading ? (
        <TableSkeleton rows={5} headers={headers} />
      ) : (
        <table className='table bg-base-200'>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(brand => (
              <tr key={brand.id}>
                <td>{brand.name}</td>
                <td className='flex gap-2'>
                  <button
                    className='btn btn-circle'
                    onClick={() => deleteBrandAlert(brand.id)}
                  >
                    <TrashIcon />
                  </button>
                  <button
                    className='btn btn-circle'
                    onClick={() => openModal(<UpdateBrand brand={brand} />,{
                      title: 'Editar Marca',
                    })}
                  >
                    <PencilAltIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};
