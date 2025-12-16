// src/lib/wordCache.ts

const CACHE_PREFIX = 'dutch-word-';

export interface Definition {
    text: string;
    semanticCategory?: string;
    semanticSubcategory?: string;
}

export interface CachedWord {
    word: string;
    definitions: Definition[];
    pronunciation: string | null;
    gender: string | null;
    rank?: number;
    fetched: boolean;
    fetchedAt: string;
}

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

/**
 * Generate cache key for a word
 */
function getCacheKey(word: string): string {
    return `${CACHE_PREFIX}${word.toLowerCase()}`;
}

/**
 * Get a word from localStorage cache
 */
export function getCachedWord(word: string): CachedWord | null {
    if (!isBrowser()) {
        return null;
    }

    try {
        const key = getCacheKey(word);
        const cached = localStorage.getItem(key);

        if (!cached) {
            return null;
        }

        const parsed: CachedWord = JSON.parse(cached);
        return parsed;
    } catch (error) {
        console.error('Error reading from cache:', error);
        return null;
    }
}

/**
 * Save a word to localStorage cache
 */
export function setCachedWord(data: CachedWord): void {
    if (!isBrowser()) {
        return;
    }

    try {
        const key = getCacheKey(data.word);
        const dataWithTimestamp = {
            ...data,
            fetched: true,
            fetchedAt: new Date().toISOString()
        };
        localStorage.setItem(key, JSON.stringify(dataWithTimestamp));
    } catch (error) {
        console.error('Error writing to cache:', error);
        // If localStorage is full, we could implement cleanup here
    }
}

/**
 * Check if a word exists in cache
 */
export function hasCachedWord(word: string): boolean {
    return getCachedWord(word) !== null;
}

/**
 * Clear all cached Dutch words
 */
export function clearCache(): void {
    if (!isBrowser()) {
        return;
    }

    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(CACHE_PREFIX)) {
                localStorage.removeItem(key);
            }
        });
        console.log('Cache cleared successfully');
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
}

/**
 * Get all cached words (useful for debugging or batch operations)
 */
export function getAllCachedWords(): CachedWord[] {
    if (!isBrowser()) {
        return [];
    }

    try {
        const keys = Object.keys(localStorage);
        const cachedWords: CachedWord[] = [];

        keys.forEach(key => {
            if (key.startsWith(CACHE_PREFIX)) {
                const cached = localStorage.getItem(key);
                if (cached) {
                    try {
                        cachedWords.push(JSON.parse(cached));
                    } catch (e) {
                        // Skip invalid entries
                    }
                }
            }
        });

        return cachedWords;
    } catch (error) {
        console.error('Error getting all cached words:', error);
        return [];
    }
}

/**
 * Get cache statistics (useful for UI)
 */
export function getCacheStats(): { count: number; sizeKB: number } {
    if (!isBrowser()) {
        return { count: 0, sizeKB: 0 };
    }

    try {
        const keys = Object.keys(localStorage);
        let totalSize = 0;
        let count = 0;

        keys.forEach(key => {
            if (key.startsWith(CACHE_PREFIX)) {
                const item = localStorage.getItem(key);
                if (item) {
                    totalSize += item.length;
                    count++;
                }
            }
        });

        return {
            count,
            sizeKB: Math.round(totalSize / 1024 * 100) / 100
        };
    } catch (error) {
        console.error('Error getting cache stats:', error);
        return { count: 0, sizeKB: 0 };
    }
}