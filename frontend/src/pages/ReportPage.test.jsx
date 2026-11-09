import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReportPage from './ReportPage';

describe('ReportPage Epic 1 Requirements', () => {
  it('renders the report form and submit button', () => {
    render(<ReportPage />);
    expect(screen.getByRole('button', { name: /Continue to confirmation/i })).toBeInTheDocument();
  });
});