import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Courses from './Courses';
import { MemoryRouter } from 'react-router-dom';

describe('Courses component', () => {
  const mockCourses = [
    { id: 1, title: 'Course 1', description: 'Description 1' },
    { id: 2, title: 'Course 2', description: 'Description 2' },
    { id: 3, title: 'Course 3', description: 'Description 3' },
    { id: 4, title: 'Course 4', description: 'Description 4' },
    { id: 5, title: 'Course 5', description: 'Description 5' },
  ];

  test('renders courses list', () => {
    render(
        <MemoryRouter>
            <Courses courses={mockCourses} isLoading={false} />
        </MemoryRouter>
    );
    expect(screen.getByTestId('courses-list')).toBeInTheDocument();
  });

  test('renders pagination', () => {
    render(
        <MemoryRouter>
            <Courses courses={mockCourses} isLoading={false} />
        </MemoryRouter>
    );
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('renders loader when isLoading prop is true', () => {
    render(
        <MemoryRouter>
            <Courses courses={mockCourses} isLoading={true} />
        </MemoryRouter>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
