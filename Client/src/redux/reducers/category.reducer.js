import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  serviceGetAllCategories,
  serviceGetCategory,
  serviceCreateCategory,
  serviceUpdateCategory,
  serviceDeleteCategory,
} from '@/services';
import {
  categoryApiListToCategoryList,
  categoryToCategoryApi,
  categoryApiToCategory,
} from '@/adapters';

export const getAllCategoriesAsync = createAsyncThunk(
  'categories/getAll',
  async () => {
    const categoryApiList = await serviceGetAllCategories();
    // adapter
    const categoryList = categoryApiListToCategoryList(categoryApiList);
    return categoryList;
  }
);

export const getCategoryAsync = createAsyncThunk(
  'categories/getOne',
  async id => {
    const response = await serviceGetCategory(id);
    // adapter
    const category = categoryApiToCategory(response);
    return category;
  }
);

export const createCategoryAsync = createAsyncThunk(
  'categories/create',
  async newCategory => {
    // adapter
    const categoryApi = categoryToCategoryApi(newCategory);
    const response = await serviceCreateCategory(categoryApi);
    // adapter
    const category = categoryApiToCategory(response);
    return category;
  }
);

export const updateCategoryAsync = createAsyncThunk(
  'categories/update',
  async modifiedCategory => {
    // adapter
    const categoryApi = categoryToCategoryApi(modifiedCategory);
    const response = await serviceUpdateCategory(categoryApi);
    // adapter
    const category = categoryApiToCategory(response);
    return category;
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'categories/delete',
  async id => {
    const response = await serviceDeleteCategory(id);
    return response;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
  },
  reducers: {
    getAllCategories: state => state,
  },
  extraReducers: builder => {
    builder.addCase(getAllCategoriesAsync.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    // --------------------------------
    builder.addCase(getCategoryAsync.pending, state => {
      state.loading = true;
    });
    builder.addCase(getCategoryAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    // --------------------------------
    builder.addCase(createCategoryAsync.pending, state => {
      state.loading = true;
    });
    builder.addCase(createCategoryAsync.fulfilled, (state, action) => {
      state.loading = false;
      const category = action.payload;
      state.categories.push(category);
    });
    // --------------------------------
    builder.addCase(deleteCategoryAsync.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      state.loading = false;
      const categoryId = action.payload;
      const index = state.categories.findIndex(
        category => category.id === categoryId
      );
      // eliminamos el elementos del arr
      state.categories.splice(index, 1);
    });
  },
});
export const { getAllCategories } = categorySlice.actions;
export const categoriesReducer = categorySlice.reducer;
