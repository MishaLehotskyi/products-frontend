import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { client } from '../../utils/fetchClient';
import { UniversalInputType } from '../../types/UniversalInputType';

interface ProductState {
    products: Product[];
    currentProduct: Product | null;
}

const initialState: ProductState = { products: [], currentProduct: null };

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  () => {
    return client.get<Product[]>('/products');
  },
);

export const fetchProduct = createAsyncThunk(
  'products/fetch-one',
  (id: string | undefined) => {
    return client.get<Product>(`/products/${id}`);
  },
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  (id: number | string) => {
    return client.delete(`/products/${id}`);
  },
);

export const updateProduct = createAsyncThunk(
  'products/update',
  ({ id, productDTO }: { id: string | undefined, productDTO: UniversalInputType}) => {
    return client.patch<Product>(`/products/${id}`, productDTO);
  },
);

export const addProduct = createAsyncThunk(
  'products/add',
  (productDTO: UniversalInputType) => {
    return client.post<Product>('/products', productDTO);
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products = [...state.products, { ...action.payload, comments: [] }];
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.currentProduct = action.payload;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.currentProduct = action.payload;
    });
  }
});

export const {} = productSlice.actions;
export default productSlice.reducer;
