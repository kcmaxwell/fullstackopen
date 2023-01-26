import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog !== action.payload);
    },
    replaceBlog(state, action) {
      return state.map((blog) =>
        blog === action.payload ? action.payload : blog
      );
    },
  },
});

export const { setBlogs, deleteBlog, replaceBlog } = blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const removeBlog = (blog) => async (dispatch) => {
  try {
    const response = await blogService.deleteBlog(blog);
    if (response.status === 204) {
      dispatch(deleteBlog(blog));
    } else {
      dispatch(setNotification("Cannot delete another user's blog"));
    }
  } catch (error) {
    dispatch(setNotification("Cannot delete another user's blog"));
  }
};

export const addLike = (blog) => async (dispatch) => {
  const updatedBlog = await blogService.increaseLikes(blog);
  dispatch(replaceBlog(updatedBlog));
};

export default blogSlice.reducer;
