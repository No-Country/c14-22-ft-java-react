import PropTypes from 'prop-types';
import { TrashIcon, PencilAltIcon } from '@/assets/svg';
import { useCategories, useModal } from '@/hooks/';
import { TableSkeleton } from '@/components';
import { UpdateCategory } from './UpdateCategory';
import swal from 'sweetalert';

export function Table({ data }) {
  const { loading, deleteCategory } = useCategories();
  const { openModal } = useModal();
  const headers = ['Categoría', 'Acciones'];

  const deleteCategoryAlert = id => {
    swal({
      title: 'Desea eliminar la categoria',
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
        deleteCategory(id);
        swal({
          title: 'La categoria fue eliminada',
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
            {data.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td className='flex gap-2'>
                  <button
                    className='btn btn-circle'
                    onClick={() => deleteCategoryAlert(product.id)}
                  >
                    <TrashIcon />
                  </button>
                  <button
                    className='btn btn-circle'
                    onClick={() =>
                      openModal(<UpdateCategory product={product} />,{
                        title: 'Editar Categoria',
                      })
                    }
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
