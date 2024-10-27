const express = require('express');
const app = express();
const PORT = 3000;

// Sample project data
const projects = [
    { id: 1, title: 'Project 1', description: 'Description of Project 1' },
    { id: 2, title: 'Project 2', description: 'Description of Project 2' },
    { id: 3, title: 'Project 3', description: 'Description of Project 3' }
];

// API route to get all projects
app.get('/projects', (req, res) => {
    res.json(projects);
});

const footerContent = {
    address: { 
        street: '4161 Fieldhouse Dr #1109d', 
        city: 'College Park, MD 20742' 
    },
    contact: {
        name: 'Andrew Fellows',
        email: 'afellows@umd.edu'
    },
    pages: [
        { name: 'Home', url: 'index.html' },
        { name: 'About Us', url: 'about.html' },
        { name: 'Projects', url: 'projects.html' },
        { name: 'Contact Us', url: 'contact.html' }
    ]
};

// API route to get footer content
app.get('/footer-content', (req, res) => {
    res.json(footerContent);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});