// Get all shape elements
const tooltip = document.getElementById('tooltip');

// Function to show the tooltip at the cursor position
function showTooltip(event, shapeName) {
  tooltip.textContent = shapeName; // Set the tooltip text to the shape name
  tooltip.style.display = 'block'; // Make the tooltip visible
  tooltip.style.left = `${event.pageX + 10}px`; // Position it next to the cursor
  tooltip.style.top = `${event.pageY + 10}px`;
}

// Function to hide the tooltip
function hideTooltip() {
  tooltip.style.display = 'none';
}

// Select all shapes including `pgshape`
const shapes = document.querySelectorAll('.shape, .pgshape');

// Add event listeners for mouseover and mouseout
shapes.forEach(shape => {
  const shapeName = shape.getAttribute('data-tooltip'); // Get shape name from data-tooltip
  shape.addEventListener('mouseover', (event) => showTooltip(event, shapeName));
  shape.addEventListener('mouseout', hideTooltip);
});

// Display the corresponding card when a shape is clicked
shapes.forEach(function(shape) {
  shape.addEventListener('click', function() {
    // Get the shape ID from the data attribute
    const shapeId = shape.getAttribute('data-shape-id');
    
    // Reset all shapes (remove active and inactive classes)
    shapes.forEach(function(s) {
      s.classList.remove('active');
      s.classList.add('inactive');
    });
    
    // Show the clicked shape as active
    shape.classList.add('active');
    shape.classList.remove('inactive');
    
    // Hide all cards
    document.querySelectorAll('.card').forEach(function(card) {
      card.classList.remove('active');
    });
    
    // Show the card corresponding to the clicked shape
    document.getElementById('card-' + shapeId).classList.add('active');
  });
});

// Reset to normal mode when clicking outside of the shapes
document.addEventListener('click', function(event) {
  // Check if the click is outside any shape and not inside a card
  const isClickInsideShapes = event.target.closest('.shape, .pgshape');
  const isClickInsideCard = event.target.closest('.card');

  // If the click is outside the shapes and not inside a card, reset to normal mode
  if (!isClickInsideShapes && !isClickInsideCard) {
    // Reset all shapes (remove active and inactive classes)
    shapes.forEach(function(s) {
      s.classList.remove('active');
      s.classList.remove('inactive');
    });

    // Hide all cards
    document.querySelectorAll('.card').forEach(function(card) {
      card.classList.remove('active');
    });
  }
});

