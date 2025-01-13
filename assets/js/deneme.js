let currentImageIndex = -1;  // Store the index of the current image being shown
let images = [];  // Store all the image sources

// Function to initialize image sources when the page loads
function initializeImages() {
    // Find all images with class "popup-image" and store their src attributes
    images = Array.from(document.querySelectorAll('.popup-image')).map(img => img.src);
}

// Function to show the popup with the clicked image
function showPopup(imageSrc) {
    currentImageIndex = images.indexOf(imageSrc); // Set the current image index
    const popup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    popupImage.src = imageSrc;  // Set the image source
    popup.style.display = 'flex'; // Show the popup
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('imagePopup');
    popup.style.display = 'none';  // Hide the popup
}

// Function to handle image click inside the popup
function handleImageClick() {
    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        document.getElementById('popupImage').src = images[currentImageIndex];  // Show the next image
    } else {
        closePopup();  // If no more images, close the popup
    }
}

// Function to close the popup if clicked outside the image
function closePopupOnOutsideClick(event) {
    const popupImage = document.getElementById('popupImage');
    if (event.target !== popupImage) {
        closePopup();  // Close the popup if clicked outside the image
    }
}

// Initialize the images and add event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    initializeImages();

    // Add event listeners to each image to trigger the popup when clicked
    const imageElements = document.querySelectorAll('.popup-image');
    imageElements.forEach(img => {
        img.addEventListener('click', (event) => {
            showPopup(img.src);
            event.stopPropagation(); // Prevent the click from propagating to the parent (i.e., close the popup)
        });
    });

    // Add event listener for image click inside the popup
    const popupImage = document.getElementById('popupImage');
    popupImage.addEventListener('click', handleImageClick);

    // Add event listener to the popup container to close the popup when clicking outside the image
    const popupContainer = document.getElementById('imagePopup');
    popupContainer.addEventListener('click', closePopupOnOutsideClick);
});
