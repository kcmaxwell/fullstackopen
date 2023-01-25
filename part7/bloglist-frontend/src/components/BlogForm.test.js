import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

const addBlog = jest.fn();

test('when create button is clicked, call event handler with correct props', async () => {
  const { container } = render(<BlogForm addBlog={addBlog}/>);

  const user = userEvent.setup();

  const titleInput = container.querySelector('#title-input');
  const authorInput = container.querySelector('#author-input');
  const urlInput = container.querySelector('#url-input');
  await user.type(titleInput, 'New title');
  await user.type(authorInput, 'New author');
  await user.type(urlInput, 'New url');

  const button = screen.getByText('Create');
  await user.click(button);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('New title');
  expect(addBlog.mock.calls[0][0].author).toBe('New author');
  expect(addBlog.mock.calls[0][0].url).toBe('New url');
});
