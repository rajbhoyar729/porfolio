class RateLimiter {
    private requests: Map<string, number[]> = new Map();
    private limit: number;
    private windowMs: number;
  
    constructor(limit: number = 10, windowMs: number = 60000) {
      this.limit = limit;
      this.windowMs = windowMs;
    }
  
    isRateLimited(key: string): boolean {
      const now = Date.now();
      const windowStart = now - this.windowMs;
  
      // Initialize or clean old requests
      const clientRequests = this.requests.get(key) || [];
      const recentRequests = clientRequests.filter((timestamp: number) => timestamp > windowStart);
  
      // Check if limit is exceeded
      if (recentRequests.length >= this.limit) {
        console.log(`Rate limit exceeded for client: ${key}`);
        return true;
      }
  
      // Add new request
      this.requests.set(key, [...recentRequests, now]);
  
      // Clean up old entries periodically
      if (Math.random() < 0.1) {
        // Clean up 10% of the time to avoid performance overhead
        this.cleanup();
      }
  
      return false;
    }
  
    private cleanup() {
      const now = Date.now();
      const windowStart = now - this.windowMs;
  
      for (const [key, timestamps] of this.requests.entries()) {
        const recentRequests = timestamps.filter((timestamp: number) => timestamp > windowStart);
        if (recentRequests.length === 0) {
          this.requests.delete(key); // Remove empty entries
        } else {
          this.requests.set(key, recentRequests); // Update with recent requests
        }
      }
    }
  }
  
  export const rateLimiter = new RateLimiter(5, 60000); // 5 requests per minute