import { Notification } from './Notification';
import { UserInfo } from './UserInfo';

export function RightMenu() {
  return (
    <div className='rightmenu-component flex items-center gap-3'>
      <Notification />
      <UserInfo />
    </div>
  );
}
