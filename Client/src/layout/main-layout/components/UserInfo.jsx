import { DarkModeSwitch } from '@/components/darkmode-switch-cmp/DarkModeSwitch';
import { Link } from 'react-router-dom';
import { useAuth, useModal } from '@/hooks';
import { Avatar } from './Avatar';
import { ConfigUser } from './ConfigUser';
import { MercadoPago } from './MercadoPago';

export function UserInfo() {
  const { authState, onLogout } = useAuth();
  const { openModal } = useModal();

  const handlerLogout = () => {
    onLogout();
    window.location.href = '/';
  };

  return (
    <div className=' dropdown dropdown-end'>
      <label tabIndex={0}>
        <div className='h-[50px] w-[50px]'>
          <Avatar username={authState?.user?.name}></Avatar>
        </div>
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content z-[30] menu p-2 m-1 shadow bg-base-200 rounded-box w-64 border-2 border-primary`}
      >
        <li>
          <div className='flex flex-row'>
            <div className='h-[50px] w-[50px]'>
              <Avatar></Avatar>
            </div>
            <div>
              <h1 className='font-bold capitalize text-md text-primary'>
                {authState?.user?.name} {authState?.user?.surname}
              </h1>
              <span className='text-xs text-neutral'>Usuario</span>
            </div>
          </div>
        </li>
        <li className=''>
          <Link className='text-secondary' to={'/notification'}>
            <div className='badge badge-primary badge-xs'></div>
            Notificación
          </Link>
        </li>
        <li className='border-t-2'>
          <DarkModeSwitch />
        </li>
        <li
          className='border-t-2'
          onClick={() =>
            openModal(<ConfigUser />, {
              title: 'Perfil',
              className: 'modal-user',
            })
          }
        >
          <h3>Configuración</h3>
        </li>

        <li className='border-t-2'>
          <Link className='text-secondary' to={'/service-policy'}>
            Ver condiciones de servicio
          </Link>
        </li>
        {/* <li className='border-t-2'
        onClick={() => openModal(<MercadoPago />, {
          title: 'Mercado Pago',
          className: 'modal-user',
        })}
        >
            <h3>Mercado Pago</h3>
        </li> */}
        <li className='border-t-2'>
          <button onClick={handlerLogout}>Cerrar sesion</button>
        </li>
      </ul>
    </div>
  );
}
