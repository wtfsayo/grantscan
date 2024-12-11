import fs from 'fs';
import path from 'path';
import { DATALAKE_URI } from '@/lib/consts';

const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

function getCacheFilename(endpoint: string) {
  return path.join(CACHE_DIR, `${endpoint.replace(/\//g, '_')}.json`);
}

export async function getCachedData(endpoint: string = '') {
  try {
    // Create cache directory if it doesn't exist
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR);
    }

    const cacheFile = getCacheFilename(endpoint);

    // Check if cache exists and is valid
    if (fs.existsSync(cacheFile)) {
      const stats = fs.statSync(cacheFile);
      const age = Date.now() - stats.mtimeMs;
      
      if (age < CACHE_DURATION) {
        const cachedData = fs.readFileSync(cacheFile, 'utf-8');
        return JSON.parse(cachedData);
      }
    }

    // Fetch fresh data
    const url = `${DATALAKE_URI}${endpoint}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Save to cache
    fs.writeFileSync(cacheFile, JSON.stringify(data));
    
    return data;
  } catch (error) {
    console.error('Cache manager error:', error);
    throw error;
  }
}
