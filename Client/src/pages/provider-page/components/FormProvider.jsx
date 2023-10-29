import { Input, Button } from '@/components';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useProviders } from '../../../hooks/useProviders';
import { closeAllModal } from '@/utils';

export function FormProduct() {
  const { loading, createProvider } = useProviders();

  const { handleSubmit, touched, errors, getFieldProps, resetForm } = useFormik(
    {
      initialValues: {
        name: '',
        company: '',
        email: '',
        phone: '',
      },
      onSubmit: (values, { resetForm }) => {
        createProvider(values);
        resetForm();
        closeAllModal();
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .required('Este dato es requerido')
          .min(3, 'Debe tener más de 3 caracteres'),
        company: Yup.string()
          .required('Este dato es requerido')
          .min(2, 'Debe tener más de 2 caracteres'),
        email: Yup.string()
          .required('Este dato es requerido')
          .email('Correo electrónico no válido'),
        phone: Yup.string()
          .required('Este dato es requerido')
          .min(7, 'Debe tener más de 7 caracteres'),
      }),
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label='Nombre'
        placeholder='Ingresa nombre'
        {...getFieldProps('name')}
        errorMessage={touched.nombre && errors.nombre}
      />
      <Input
        label='Empresa'
        placeholder='Ingresa empresa'
        {...getFieldProps('company')}
        errorMessage={touched.empresa && errors.empresa}
      />
      <Input
        label='Email'
        placeholder='Ingresa email'
        {...getFieldProps('email')}
        errorMessage={touched.email && errors.email}
      />
      <Input
        label='Telefono'
        placeholder='Ingresa telefono'
        {...getFieldProps('phone')}
        errorMessage={touched.telefono && errors.telefono}
      />
      {/* BUTTONS */}
      <div className='flex flex-col gap-3 min-[500px]:flex-row min-[500px]:justify-between'>
        <Button
          type='button'
          onClick={resetForm}
          disabled={loading}
          className='w-full btn btn-outline btn-primary min-[500px]:w-[13rem]'
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          disabled={loading}
          className='w-full btn btn-primary min-[500px]:w-[13rem]'
        >
          {loading ? 'Enviando...' : 'Crear'}
        </Button>
      </div>
    </form>
  );
}
