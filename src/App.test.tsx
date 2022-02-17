import { render } from '@testing-library/react';
import App from './App';

test('snapshot test', () => {
  const { container } =render(<App />);

  expect(container).toBeInTheDocument();
});
