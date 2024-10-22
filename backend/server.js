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

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});