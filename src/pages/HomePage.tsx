import { Link } from 'react-router-dom';

export const HomePage = () => (
  <div className="h-full flex justify-center items-center text-white">
    <div className="max-w-md bg-gray-800 p-8 rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold mb-4 primary-color">
          Welcome to our Products Application
      </h1>
      <p className="mb-6">
          Explore products
      </p>
      <Link to="/products"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg inline-block transition duration-300"
      >
        Go to Products
      </Link>
    </div>
  </div>
);
