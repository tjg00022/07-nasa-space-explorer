// NASA API Key
const API_KEY = 'oJ6B1YVWOsdlR6ShV1zbaufW0Y19EYS3qhybmdDE';

// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const getImagesButton = document.querySelector('.filters button');
const gallery = document.getElementById('gallery');

// Modal elements
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');
const closeButton = document.querySelector('.close-button');

// Close modal when clicking the close button or outside the modal
closeButton.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Add click event listener to the button
getImagesButton.addEventListener('click', fetchSpaceImages);

// Function to open modal with image details
function openModal(item) {
    modalImage.src = item.url;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalDate.textContent = new Date(item.date).toLocaleDateString();
    modalExplanation.textContent = item.explanation;
    modal.style.display = 'block';
}

// Function to fetch images from NASA APOD API
async function fetchSpaceImages() {
    // Clear existing gallery content
    gallery.innerHTML = '';

    // Get selected dates
    const startDate = startInput.value;
    const endDate = endInput.value;

    // Show loading message
    gallery.innerHTML = '<div class="placeholder"><div class="placeholder-icon">🚀</div><p>Loading space images...</p></div>';

    try {
        // Fetch data from NASA API
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`
        );
        const data = await response.json();

        // Clear gallery before adding new images
        gallery.innerHTML = '';

        // Display each image
        data.forEach(item => {
            const imageCard = document.createElement('div');
            imageCard.className = 'image-card';
            
            // Create HTML for the image card
            imageCard.innerHTML = `
                <img src="${item.url}" alt="${item.title}" class="space-image" />
                <div class="image-info">
                    <h3>${item.title}</h3>
                    <p class="date">${new Date(item.date).toLocaleDateString()}</p>
                    <p class="description">${item.explanation}</p>
                </div>
            `;
            
            // Add click event to open modal
            imageCard.addEventListener('click', () => openModal(item));
            
            gallery.appendChild(imageCard);
        });
    } catch (error) {
        gallery.innerHTML = `
            <div class="placeholder">
                <div class="placeholder-icon">❌</div>
                <p>Oops! Something went wrong. Please try again.</p>
            </div>
        `;
        console.error('Error fetching space images:', error);
    }
}
