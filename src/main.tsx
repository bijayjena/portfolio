import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize performance monitoring in development
if (import.meta.env.DEV) {
  import('./utils/monitoring').then(({ initPerformanceMonitoring, reportLongTasks }) => {
    initPerformanceMonitoring();
    reportLongTasks();
    
    // Log metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        import('./utils/monitoring').then(({ logPerformanceMetrics, checkPerformanceThresholds }) => {
          console.log('=== Performance Metrics ===');
          logPerformanceMetrics();
          console.log('=== Core Web Vitals Status ===');
          console.table(checkPerformanceThresholds());
        });
      }, 3000);
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
