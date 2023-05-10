import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageNotFound from './PageNotFound';

describe('PageNotFound', () => {
  describe('PageNotFound should be rendered', () => {
    it('Should have PageNotFound', () => {
      render(<PageNotFound />);
      expect(screen.getByText(/Page not found/)).toBeInTheDocument();
    });
  });
});
