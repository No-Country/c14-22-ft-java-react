import { Avatar } from '@/assets/images';
import { DarkModeSwitch } from '@/components/darkmode-switch-cmp/DarkModeSwitch';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import ConfigModal from './right-menu-cmp/ConfigModal';

export function UserInfo() {
  const { logoutUser } = useAuth();

  const handlerLogout = () => {
    logoutUser();

    window.location.href = '/';
  };

  return (
    <div className=' dropdown dropdown-end'>
      <label tabIndex={0}>
        <div className=' avatar'>
          <div className='rounded-full shadow-lg '>
            <img src={Avatar} />
          </div>
        </div>
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content z-[30] menu p-2 m-1 shadow bg-base-200 rounded-box w-64 border-2 border-primary`}
      >
        <li>
          <div className='flex flex-row'>
            <div className='avatar'>
              <div className='rounded-full '>
                <img src={Avatar} />
              </div>
            </div>
            <div>
              <h1>Luis Angel Salcedo</h1>
              <h1>Usuario</h1>
            </div>
          </div>
        </li>
        <li className=''>
          <Link className='text-secondary' to={''}>
            <div className='badge badge-primary badge-xs'></div>
            Notificación
          </Link>
        </li>
        <li className='border-t-2'>
          <DarkModeSwitch />
        </li>
        <li className='border-t-2'>
          <ConfigModal/>
        </li>

        <li className='border-t-2'>
          <Link className='text-secondary' to={''}>
            Ver política de privacidad
          </Link>
        </li>
        <li className='border-t-2'>
          <Link className='text-secondary' to={'/service-policy'}>
            Ver condiciones de servicio
          </Link>
        </li>
        <li className='border-t-2'>
          <button onClick={handlerLogout}>Cerrar sesion</button>
        </li>
      </ul>
    </div>
  );
}
