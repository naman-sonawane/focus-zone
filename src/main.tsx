import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { spawn } from 'child_process'; // Import spawn from child_process
import './index.css';

// Start the main Python backend process (main.py)
const mainBackendProcess = spawn('python', ['./../backend/server.py']);

// Handle if there's an error in starting the main Python process
mainBackendProcess.on('error', (err) => {
  console.error('Error starting main Python backend:', err);
});

// Handle if main Python process closes unexpectedly
mainBackendProcess.on('close', (code) => {
  console.log(`Main Python backend process exited with code ${code}`);
});

// Start the secondary Python backend process (server.py)
const serverBackendProcess = spawn('python', ['./../backend/main.py']);

// Handle if there's an error in starting the secondary Python process
serverBackendProcess.on('error', (err) => {
  console.error('Error starting secondary Python backend:', err);
});

// Handle if secondary Python process closes unexpectedly
serverBackendProcess.on('close', (code) => {
  console.log(`Secondary Python backend process exited with code ${code}`);
});

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
