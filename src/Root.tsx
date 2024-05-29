import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { ProductListPage } from './pages/ProductListPage';
import { HomePage } from './pages/HomePage';
import {Provider} from 'react-redux';
import store from './store/store';
import {ProductPage} from './pages/ProductPage';

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={(
              <App />
            )}
          >
            <Route index element={<HomePage />} />
            <Route path="products">
              <Route
                index
                element={<ProductListPage />}
              />
              <Route
                path=":productId"
                element={<ProductPage />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};
