import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
