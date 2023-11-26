import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from '@/components';
import { useBrands, useModal } from '@/hooks';

export function FormBrand() {
  const { createBrand, loading } = useBrands();
  const { closeModal } = useModal();
  const { handleSubmit, touched, errors, getFieldProps, resetForm } = useFormik(
    {
      initialValues: {
        name: '',
      },
      onSubmit: (values, { resetForm }) => {
        createBrand(values);
        resetForm();
        closeModal();
        successBrandAlert();
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .required('Este dato es requerido')
          .min(2, 'Debe tener más de 1 caracteres'),
      }),
    }
  );

  const successBrandAlert = () => {
    swal({
      title: 'La marca fue guardada',
      icon: 'success',
      timer: 1500,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label='Nombre de la marca'
        placeholder='Ingresa una marca'
        {...getFieldProps('name')}
        errorMessage={touched.name && errors.name}
      />

      {/* BUTTONS */}
      <div className='flex flex-col gap-3 min-[500px]:flex-row min-[500px]:justify-between'>
        <Button
          type='button'
          onClick={() => closeModal()}
          disabled={loading}
          className='w-full btn btn-outline btn-primary min-[500px]:w-[11rem]'
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          disabled={loading}
          className='w-full btn btn-primary min-[500px]:w-[11rem]'
        >
          {loading ? 'Enviando...' : 'Crear'}
        </Button>
      </div>
    </form>
  );
}
