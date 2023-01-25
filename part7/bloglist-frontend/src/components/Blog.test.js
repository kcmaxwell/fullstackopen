import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
  title: 'Test title',
  author: 'Test author',
  url: 'Test url',
  likes: 15,
  user: {
    name: 'Test user',
  },
};

const addLike = jest.fn();
const deleteBlog = jest.fn();

let container;

beforeEach(() => {
  container = render(<Blog blog={blog} addLike={addLike} deleteBlog={deleteBlog} />)
    .container;
});

test('renders title and author, no url or likes by default', () => {
  const titleElement = screen.getByText(blog.title, { exact: false });
  expect(titleElement).toBeVisible();

  const authorElement = screen.getByText(blog.author, { exact: false });
  expect(authorElement).toBeVisible();

  const urlElement = screen.getByText(blog.url, { exact: false });
  expect(urlElement).not.toBeVisible();

  const likesElement = screen.getByText(blog.likes, { exact: false });
  expect(likesElement).not.toBeVisible();
});

test('url and likes are visible after clicking the view button', async () => {
  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const div = container.querySelector('.hidden-content');
  expect(div).not.toHaveStyle('display: none');
  expect(div).toBeVisible();
});

test('if the like button is clicked twice, the event handler is called twice', async () => {
  const user = userEvent.setup();
  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likeButton = screen.getByText('Like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(addLike.mock.calls).toHaveLength(2);
});
