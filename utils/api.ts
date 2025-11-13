// utils/api.ts
export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retries = 3,
  delay = 1000
): Promise<T> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const raw = await res.json();
      console.log(`[API] Raw response from ${url}:`, raw);
      return raw as T;
    } catch (err) {
      console.error(`[API] Attempt ${attempt + 1} failed:`, err);

      if (attempt < retries - 1) {
        await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), delay);
        });
      } else {
        throw err;
      }
    }
  }
  throw new Error("All retries failed");
}
