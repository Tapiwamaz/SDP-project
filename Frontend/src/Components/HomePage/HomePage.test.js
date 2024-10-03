import React from 'react';
import { render, screen ,waitFor,fireEvent} from '@testing-library/react';
import HomePage from './HomePage';

// Mock the components that you don't want to test
jest.mock('../Header/Header', () => () => <div>Mocked Header</div>);
jest.mock('../AsideDesktop/AsideDesktop', () => () => <div>Mocked AsideDesktop</div>);
jest.mock('../Tags/Tags', () => () => <div>Mocked Tags</div>);
jest.mock('../EventDisplay/EventDisplay', () => () => <div>Mocked EventDisplay</div>);



// jest.mock('../EventsSlider/EventSlider', () => () => <div>Mocked EventSlider</div>);
// jest.mock('../EventsSlider/EventSlider', () => ({ events }) => (
//   <div>
//     {events.map((event) => (
//       <div key={event.id} data-testid="event-item">
//         {event.name}
//       </div>
//     ))}
//   </div>
// ));

jest.mock('../EventsSlider/EventSlider', () => () => <div>Mocked EventSlider</div>);


jest.mock('../EventsCalendar/EventsCalendar', () => () => <div>Mocked Calendar</div>);
jest.mock('../Summary/Summary', () => () => <div>Mocked Summary</div>);




const mockEvents = [
    { id: 1, name: 'Event 1', type: 'Education', approved: true, date: '2023-09-25' },
    { id: 2, name: 'Event 2', type: 'Sports', approved: true, date: '2023-10-10' },
    { id: 3, name: 'Event 3', type: 'IT', approved: false, date: '2023-11-05' },
  ];
  
  beforeEach(() => {
    // Mock global fetch function for every test
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEvents),
      })
    );
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

describe('HomePage Component', () => {
    test('renders without crashing and fetches events', async () => {
        render(<HomePage />);
    
        expect(global.fetch).toHaveBeenCalledWith('/api/Basic', expect.anything());

      });

      test('renders without crashing and other componets present', async () => {
        render(<HomePage />);
        
        // You can check if the HomePage elements are rendered correctly
        expect(screen.getByText('Mocked Header')).toBeInTheDocument();
        expect(screen.getByText('Mocked AsideDesktop')).toBeInTheDocument();
        const eventSliders = screen.getAllByText('Mocked EventSlider');
        expect(eventSliders).toHaveLength(2); // Check if there are exactly 2 instances
        // Wait for the events to be rendered
        await waitFor(() =>{ expect(screen.getByText('Trending Events')).toBeInTheDocument()});
        await waitFor(() =>{ expect(screen.getByText('Upcoming Events')).toBeInTheDocument()});


      });


    test('shows no results when there are no matching events', async () => {
        render(<HomePage />);
    
        await waitFor(() =>{ screen.getByText('Trending Events')});
    
        // Simulate typing a search value that doesn't exist
        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'Nonexistent Event' } });
    
        // Check for "No Results" message
        await waitFor(() => {
          expect(screen.getByText('No Results found')).toBeInTheDocument();
        });
      });

      // test('displays event summary when summary is clicked', async () => {
      //   render(<HomePage />);
      
      //   // Simulate displaying an event
      //   await waitFor(() => {
      //     const eventDisplay = screen.getByText('Mocked EventDisplay');
      //     expect(eventDisplay).toBeInTheDocument();
      //   });
      
      //   // Simulate clicking the summary to display it
      //   fireEvent.click(screen.getByText('Mocked EventDisplay'));
      
      //   // Check that the summary is displayed
      //   await waitFor(() => {
      //     expect(screen.getByText('Mocked Summary')).toBeInTheDocument();
      //   });
      // });

  
});
// import React from 'react';
// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import HomePage from './HomePage';

// // Mock the components that you don't want to test
// jest.mock('../Header/Header', () => () => <div>Mocked Header</div>);
// jest.mock('../AsideDesktop/AsideDesktop', () => () => <div>Mocked AsideDesktop</div>);
// jest.mock('../Tags/Tags', () => ({ name, filter, isActive }) => (
//   <button data-testid={`tag-${name}`} onClick={filter}>
//     {name}
//   </button>
// ));jest.mock('../EventDisplay/EventDisplay', () => () => <div>Mocked EventDisplay</div>);

// jest.mock('../EventsSlider/EventSlider', () => ({ events=mockEvents }) => (
//   <div>
//     {events.map((event) => (
//       <div key={event.id} data-testid="event-item">
//         {event.name}
//       </div>
//     ))}
//   </div>
// ));

// jest.mock('../EventsCalendar/EventsCalendar', () => () => <div>Mocked Calendar</div>);
// jest.mock('../Summary/Summary', () => () => <div>Mocked Summary</div>);

// const mockEvents = [
//   { id: 1, name: 'Event 1', type: 'Education', approved: true, date: '2023-09-25' },
//   { id: 2, name: 'Event 2', type: 'Sports', approved: true, date: '2023-10-10' },
//   { id: 3, name: 'Event 3', type: 'IT', approved: false, date: '2023-11-05' },
// ];

// beforeEach(() => {
//   // Mock global fetch function for every test
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       ok: true,
//       json: () => Promise.resolve(mockEvents),
//     })
//   );
// });

// afterEach(() => {
//   jest.clearAllMocks();
// });

// describe('HomePage Component', () => {
//   test('renders without crashing and fetches events', async () => {
//     render(<HomePage />);

//     expect(global.fetch).toHaveBeenCalledWith('/api/Basic', expect.anything());
//   });

//   test('renders other components correctly', async () => {
//     render(<HomePage />);

//     // You can check if the HomePage elements are rendered correctly
//     expect(screen.getByText('Mocked Header')).toBeInTheDocument();
//     expect(screen.getByText('Mocked AsideDesktop')).toBeInTheDocument();

//     // Wait for the events to be rendered
//     await waitFor(() => {
//       expect(screen.getByText('Trending Events')).toBeInTheDocument();
//       // expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
//     });

//     // Check if the event items are rendered correctly from mockEvents
//    const events= screen.getAllByText('Event 1')

//    expect(events.length).toBe(2);
  

//   });

//   test('shows no results when there are no matching events', async () => {
//     render(<HomePage />);

//     await waitFor(() =>{ screen.getByText('Trending Events')});

//     // Simulate typing a search value that doesn't exist
//     const searchInput = screen.getByPlaceholderText('Search');
//     fireEvent.change(searchInput, { target: { value: 'Nonexistent Event' } });

//     // Check for "No Results" message
//     await waitFor(() => {
//       expect(screen.getByText('No Results found')).toBeInTheDocument();
//     });
//   });

//   test('filters events by tag when a tag is clicked', async () => {
//     render(<HomePage />);

//     // Wait for the events to load
//     await waitFor(() => {screen.getByText('Trending Events')});

//     // Simulate clicking on the 'Education' tag
//     fireEvent.click(screen.getByTestId('tag-Education'));

//     // Wait for the filtered events to be displayed
//     await waitFor(() => {
//       const eventItems = screen.getAllByTestId('event-item');
//       expect(eventItems).toHaveLength(1); // Only one event of type 'Education'
//       // expect(eventItems[0]).toHaveTextContent('Event 1'); // Verify the event is correct
//     });
//   });

// });
