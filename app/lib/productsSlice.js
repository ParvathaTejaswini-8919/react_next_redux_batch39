import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { getApiError } from "./productsApi";

export const fetchProducts = createAsyncThunk("products/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

export const fetchProduct = createAsyncThunk("products/fetchOne", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/products/${encodeURIComponent(id)}`);
    return data;
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

export const createProduct = createAsyncThunk("products/create", async (product, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/products", product);
    return data;
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

export const updateProduct = createAsyncThunk("products/update", async ({ id, ...product }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/products/${encodeURIComponent(id)}`, product);
    return data;
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

export const deleteProduct = createAsyncThunk("products/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/products/${encodeURIComponent(id)}`);
    return id;
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    selectedProduct: null,
    detailStatus: "idle",
    detailError: null,
    mutationStatus: "idle",
    mutationError: null,
  },
  reducers: {
    clearMutation(state) {
      state.mutationStatus = "idle";
      state.mutationError = null;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
      state.detailStatus = "idle";
      state.detailError = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload || action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload || action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        state.items = state.items.map((item) => (
          String(item.id) === String(action.payload.id) ? action.payload : item
        ));
        state.selectedProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload || action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        state.items = state.items.filter((item) => String(item.id) !== String(action.payload));
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload || action.error.message;
      });
  },
});

export const { clearMutation, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;