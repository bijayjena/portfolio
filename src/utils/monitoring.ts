// Performance monitoring utilities

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};

  constructor() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.observeMetrics();
    }
  }

  private observeMetrics() {
    // Observe paint metrics (FCP, LCP)
    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            console.log('FCP:', entry.startTime.toFixed(2), 'ms');
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('Paint observer not supported');
    }

    // Observe LCP
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        console.log('LCP:', this.metrics.lcp.toFixed(2), 'ms');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observer not supported');
    }

    // Observe FID
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.fid = (entry as any).processingStart - entry.startTime;
          console.log('FID:', this.metrics.fid.toFixed(2), 'ms');
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID observer not supported');
    }

    // Observe CLS
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            this.metrics.cls = clsValue;
            console.log('CLS:', clsValue.toFixed(4));
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS observer not supported');
    }

    // Get TTFB from Navigation Timing
    if ('performance' in window && 'timing' in performance) {
      window.addEventListener('load', () => {
        const navTiming = performance.timing;
        this.metrics.ttfb = navTiming.responseStart - navTiming.requestStart;
        console.log('TTFB:', this.metrics.ttfb.toFixed(2), 'ms');
      });
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  logMetrics() {
    console.table(this.metrics);
  }

  // Check if metrics meet Core Web Vitals thresholds
  checkThresholds(): {
    fcp: 'good' | 'needs-improvement' | 'poor' | 'unknown';
    lcp: 'good' | 'needs-improvement' | 'poor' | 'unknown';
    fid: 'good' | 'needs-improvement' | 'poor' | 'unknown';
    cls: 'good' | 'needs-improvement' | 'poor' | 'unknown';
  } {
    return {
      fcp: this.metrics.fcp
        ? this.metrics.fcp <= 1800
          ? 'good'
          : this.metrics.fcp <= 3000
          ? 'needs-improvement'
          : 'poor'
        : 'unknown',
      lcp: this.metrics.lcp
        ? this.metrics.lcp <= 2500
          ? 'good'
          : this.metrics.lcp <= 4000
          ? 'needs-improvement'
          : 'poor'
        : 'unknown',
      fid: this.metrics.fid
        ? this.metrics.fid <= 100
          ? 'good'
          : this.metrics.fid <= 300
          ? 'needs-improvement'
          : 'poor'
        : 'unknown',
      cls: this.metrics.cls !== undefined
        ? this.metrics.cls <= 0.1
          ? 'good'
          : this.metrics.cls <= 0.25
          ? 'needs-improvement'
          : 'poor'
        : 'unknown',
    };
  }
}

// Singleton instance
let monitor: PerformanceMonitor | null = null;

export function initPerformanceMonitoring() {
  if (!monitor && typeof window !== 'undefined') {
    monitor = new PerformanceMonitor();
  }
  return monitor;
}

export function getPerformanceMetrics() {
  return monitor?.getMetrics() || {};
}

export function logPerformanceMetrics() {
  monitor?.logMetrics();
}

export function checkPerformanceThresholds() {
  return monitor?.checkThresholds();
}

// Measure component render time
export function measureRender(componentName: string) {
  const start = performance.now();
  
  return () => {
    const end = performance.now();
    const duration = end - start;
    console.log(`${componentName} render time:`, duration.toFixed(2), 'ms');
  };
}

// Measure async operation time
export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    const end = performance.now();
    console.log(`${name} completed in:`, (end - start).toFixed(2), 'ms');
    return result;
  } catch (error) {
    const end = performance.now();
    console.error(`${name} failed after:`, (end - start).toFixed(2), 'ms');
    throw error;
  }
}

// Report long tasks (> 50ms)
export function reportLongTasks() {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn('Long task detected:', {
            duration: entry.duration.toFixed(2) + 'ms',
            startTime: entry.startTime.toFixed(2) + 'ms',
          });
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Long task observer not supported');
    }
  }
}
