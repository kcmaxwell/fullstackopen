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
        blog.id === action.payload.id ? action.payload : blog
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
      dispatch(setNotification("Cannot delete another user's blog", true, 5));
    }
  } catch (error) {
    dispatch(setNotification("Cannot delete another user's blog", true, 5));
  }
};

export const addLike = (blog) => async (dispatch) => {
  const updatedBlog = await blogService.increaseLikes(blog);
  dispatch(replaceBlog(updatedBlog));
  dispatch(setNotification('Liked blog', false, 5));
};

export const addComment = (blog, comment) => async (dispatch) => {
  const updatedBlog = await blogService.addComment(blog, comment);
  dispatch(replaceBlog(updatedBlog));
};

export default blogSlice.reducer;
