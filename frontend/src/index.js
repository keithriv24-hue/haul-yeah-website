import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

const container = document.getElementById("root");
const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If the container already has server/prerendered markup, hydrate instead
// of blowing it away with createRoot — otherwise React discards the SSG
// HTML and re-renders from scratch, causing a visible flash on load.
if (container && container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, tree);
} else {
  ReactDOM.createRoot(container).render(tree);
}
