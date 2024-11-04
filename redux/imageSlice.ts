// src/redux/imageSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ImageState {
  images: any[];
  bookmarks: number[];
  page: number;
  hasMore: boolean;
  loading: boolean;
}

const initialState: ImageState = {
  images: [],
  bookmarks: [],
  page: 1,
  hasMore: true,
  loading: false,
};

export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async ({ page, searchTerm }: { page: number; searchTerm: string }) => {
    const response = await axios.get(
      `https://pixabay.com/api/?key=46858360-a36fe29c51c3ca3acededd86a&q=${searchTerm}&page=${page}&per_page=20`
    );
    return response.data;
  }
);

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const id = action.payload;
      if (state.bookmarks.includes(id)) {
        state.bookmarks = state.bookmarks.filter(
          (bookmarkId) => bookmarkId !== id
        );
      } else {
        state.bookmarks.push(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = state.images.concat(action.payload.hits);
        state.hasMore = action.payload.hits.length > 0;
        state.page += 1;
      })
      .addCase(fetchImages.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleBookmark } = imageSlice.actions;

export default imageSlice.reducer;
