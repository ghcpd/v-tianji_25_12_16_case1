import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from 'vitest';
import { SearchBar } from '../components/SearchBar';

test('calls onChange when typing', () => {
  const onChange = vi.fn();
  render(<SearchBar value="" onChange={onChange} placeholder="Search" />);

  const input = screen.getByLabelText('search-bar');
  fireEvent.change(input, { target: { value: 'test' } });

  expect(onChange).toHaveBeenCalledWith('test');
});
