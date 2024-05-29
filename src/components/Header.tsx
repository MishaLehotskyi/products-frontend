import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'nav-link hover:text-green-500', { 'text-green-500': isActive },
);

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold">Products app</NavLink>
        <nav className="flex flex-row items-center space-x-4">
          <NavLink to="/products" className={getLinkClass}>Products</NavLink>
        </nav>
      </div>
    </header>
  );
};
