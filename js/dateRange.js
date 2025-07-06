// NOTE: You do not need to edit this file.

// NASA's APOD API only has images from June 16, 1995 onwards
const earliestDate = '1995-06-16';

// Get today's date in YYYY-MM-DD format (required by date inputs)
const today = new Date().toISOString().split('T')[0];

function setupDateInputs(startInput, endInput) {
  // Restrict date selection range from NASA's first image to today
  startInput.min = earliestDate;
  startInput.max = today;
  endInput.min = earliestDate;
  endInput.max = today;

  // Default: Show the most recent 9 days of space images
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 8); // minus 8 because it includes today
  startInput.value = lastWeek.toISOString().split('T')[0];
  endInput.value = today;

  // Automatically adjust end date to show exactly 9 days of images
  startInput.addEventListener('change', () => {
    const startDate = new Date(startInput.value);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 8);
    endInput.value = endDate > new Date(today) ? today : endDate.toISOString().split('T')[0];
  });
}

// Get date input elements
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');

// Set default date range (current date and 7 days before)
const currentDate = new Date();
const sevenDaysAgo = new Date(currentDate);
sevenDaysAgo.setDate(currentDate.getDate() - 7);

// Format dates for input fields (YYYY-MM-DD)
startDateInput.value = sevenDaysAgo.toISOString().split('T')[0];
endDateInput.value = currentDate.toISOString().split('T')[0];

// Set max date to today (can't select future dates)
const maxDate = currentDate.toISOString().split('T')[0];
startDateInput.setAttribute('max', maxDate);
endDateInput.setAttribute('max', maxDate);

// Add event listeners for date validation
startDateInput.addEventListener('change', validateDates);
endDateInput.addEventListener('change', validateDates);

// Function to validate date range
function validateDates() {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    // Ensure end date is not before start date
    if (endDate < startDate) {
        endDateInput.value = startDateInput.value;
    }

    // Ensure date range is not more than 7 days
    const daysDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
    if (daysDifference > 7) {
        const newStartDate = new Date(endDate);
        newStartDate.setDate(endDate.getDate() - 7);
        startDateInput.value = newStartDate.toISOString().split('T')[0];
    }
}
