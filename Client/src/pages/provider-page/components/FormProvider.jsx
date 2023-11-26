import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from '@/components';
import { useProviders, useModal } from '@/hooks';

export function FormProduct() {
  const { loading, createProvider } = useProviders();
  const { closeModal } = useModal();
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
        closeModal();
        successProviderAlert();
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

  const successProviderAlert = () => {
    swal({
      title: 'El proveedor fue guardado',
      icon: 'success',
      timer: 1500,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label='Nombre'
        placeholder='Ingresa nombre completo'
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
