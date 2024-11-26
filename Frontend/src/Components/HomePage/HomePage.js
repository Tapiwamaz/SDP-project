const getBookingID = async (venueId, bookingDate, startTime, endTime) => {
  try {
    const response = await fetch(
      `https://wits-infrastructure-management.web.app/api/bookings/findByField?venueID=${venueId}&bookingDate=${bookingDate}&bookingStartTime=${startTime}&bookingEndTime=${endTime}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': secretKey,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error fetching booking details');
    }

    const data = await response.json();

    if (data.length > 0) {
      // Assuming bookingID is available in the API response.
      return data[0].id;
    } else {
      throw new Error('No booking found for the given details');
    }
  } catch (error) {
    console.error('Error retrieving booking ID:', error);
    return null;
  }
};


const deleteBooking = async (bookingID) => {
  try {
    const response = await fetch(
      `https://wits-infrastructure-management.web.app/api/bookings/${bookingID}`, 
      {
        method: 'DELETE',
        headers: {
          'X-API-KEY': secretKey,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error deleting booking');
    }

    return await response.json(); // Return response or handle it accordingly
  } catch (error) {
    console.error('Error deleting booking:', error);
    return null; // Handle error accordingly
  }
};