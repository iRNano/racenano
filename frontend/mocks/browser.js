// mocks/browser.js
import { setupWorker } from "msw/browser"; // Ensure correct import
import { handlers } from "./handlers"; // Import handlers correctly

// Set up the mock service worker with the handlers
export const worker = setupWorker(...handlers);
