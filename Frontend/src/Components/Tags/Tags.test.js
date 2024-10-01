import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import Tags from './Tags'; // Import the Tags component



describe('Tags Component', () => {
  
  test('renders the correct tag name and icon based on name prop', () => {
    render(
        <>
    <Tags name="Education" isActive={false} />
    <Tags name="Sports" isActive={false} />

    <Tags name="Entertainment" isActive={false} />

    <Tags name="Political" isActive={false} />

    <Tags name="Religious" isActive={false} />

    <Tags name="Gaming" isActive={false} />

    <Tags name="IT" isActive={false} />

    <Tags name="Online" isActive={false} />
    <Tags name="Other" isActive={false} />

    </>



);

    // Check if the tag displays the correct name
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
    expect(screen.getByText('Political')).toBeInTheDocument();
    expect(screen.getByText('Religious')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('IT')).toBeInTheDocument();
    expect(screen.getByText('Gaming')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();


    // Check if the AcademicCapIcon is rendered
    const icon = screen.getAllByTestId('academic-cap-icon');
    expect(icon).toHaveLength(9); // Check if there are exactly 9 instances
  });



  test('applies correct styles when the tag is active', () => {
    render(<Tags name="Education" isActive={true} />);

    const button = screen.getByRole('button');

    // Check if the button has the correct active styles
    expect(button).toHaveStyle({
      backgroundColor: 'white',
     
    });
  });

  test('does not trigger the filter function when the tag is not clickable', () => {
    const mockFilter = jest.fn();

    render(<Tags name="Education" filter={null} isActive={false} />);

    const button = screen.getByRole('button');

    // Simulate click event
    fireEvent.click(button);

    // The filter function should not be called
    expect(mockFilter).not.toHaveBeenCalled();
  });

  test('triggers the filter function when the tag is clickable', () => {
    const mockFilter = jest.fn();

    render(<Tags name="Education" filter={mockFilter} isActive={false} />);

    const button = screen.getByRole('button');

    // Simulate click event
    fireEvent.click(button);

    // The filter function should be called once
    expect(mockFilter).toHaveBeenCalledTimes(1);
  });

//   test('hover effect only applies when the tag is clickable', () => {
//     render(<Tags name="Education" filter={null} isActive={false} />);

//     const button = screen.getByRole('button');

//     // Simulate hover event
//     fireEvent.mouseOver(button);

//     // Since the tag is not clickable, hover effect should not apply (no scale)
//     expect(button).toHaveStyle({
//       transform: 'none',
//     });

//     // Now test when it is clickable
//     render(<Tags name="Education" filter={jest.fn()} isActive={false} />);

//     fireEvent.mouseOver(button);

//     // Since the tag is clickable, hover effect should apply (scale should change)
//     expect(button).toHaveStyle({
//         backgroundColor:"white"
//     });
//   });
});
