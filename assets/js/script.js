let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.querySelectorAll('.slide');
    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

// Automatically change slides every 3 seconds
setInterval(function() {
    plusSlides(1);
}, 3000);

// Open the modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const projectList = document.getElementById("project-list");

    
    fetch('http://localhost:3000/projects')
        .then(response => response.json())
        .then(projects => {
            // Loop through each project and create an <a> tag
            projects.forEach(project => {
                const projectLink = document.createElement('a');
                projectLink.href = `/projects.html?id=${project.id}`;  // Link to a project detail page
                projectLink.textContent = project.title;  // Set the project title as the link text
                projectList.appendChild(projectLink);  // Add to dropdown content
            });
        })
        .catch(error => console.error('Error fetching project data:', error));
});

