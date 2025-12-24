
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("FATAL: Could not find root element '#root'");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("SwiftMarket initialized successfully.");
  } catch (error) {
    console.error("Critical initialization error:", error);
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: system-ui, -apple-system, sans-serif; background: #fff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="background: #fff1f2; padding: 30px; border-radius: 20px; border: 1px solid #fecdd3; max-width: 500px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
          <h1 style="color: #e11d48; margin-top: 0; font-weight: 800;">Oops! Something went wrong</h1>
          <p style="color: #4b5563; line-height: 1.6;">The application failed to start. This is usually due to a connection issue or a missing configuration.</p>
          <div style="text-align: left; background: #1e293b; color: #cbd5e1; padding: 15px; border-radius: 12px; overflow-x: auto; margin-top: 20px; font-size: 12px; font-family: monospace;">
            ${error instanceof Error ? error.message : String(error)}
          </div>
          <button onclick="window.location.reload()" style="margin-top: 25px; padding: 12px 24px; background: #0f172a; color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; width: 100%;">
            Try Refreshing the Page
          </button>
        </div>
      </div>
    `;
  }
}
