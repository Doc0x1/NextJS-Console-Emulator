import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Terminal from 'src/components/Terminal';

test('renders terminal input', () => {
  render(<Terminal initialCommand="hello" />);
  const inputElement = screen.getByDisplayValue(/hello/i);
  expect(inputElement).toBeInTheDocument();
});

test('changes input value on change', () => {
  render(<Terminal />);
  const inputElement = screen.getByRole('textbox');
  fireEvent.change(inputElement, { target: { value: 'test' } });
  expect(inputElement).toHaveValue('test');
});
