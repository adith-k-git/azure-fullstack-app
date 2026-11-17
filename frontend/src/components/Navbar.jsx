import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <header className="border-b border-slate-200 bg-white shadow-sm">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div>
        <NavLink to="/" className="text-xl font-semibold text-slate-900">
          Task Manager
        </NavLink>
        <p className="text-sm text-slate-500">Clean task tracking with filters and sorting.</p>
      </div>
      <nav className="flex items-center gap-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`
          }
        >
          Add Task
        </NavLink>
      </nav>
    </div>
  </header>
);

export default Navbar;
