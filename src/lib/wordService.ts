// src/lib/wordService.ts

import type { Word, WordWithDefinition } from '../types';
import { getCachedWord, setCachedWord } from './wordCache';
import { fetchWordDefinition } from './lexicalaApi';
import dutchWords from '../data/dutch-words.json';

/**
 * Get a word's definition using the hybrid approach:
 * 1. Check JSON file first (if fetched = true)
 * 2. Check localStorage cache
 * 3. Fetch from Lexicala API as last resort
 */
export async function getWordDefinition(
    word: string
): Promise<WordWithDefinition | null> {
    // Step 1: Check JSON file
    const wordFromJson = findWordInJson(word);

    if (wordFromJson && wordFromJson.fetched && wordFromJson.definition) {
        // We have it in the JSON file with definition
        return {
            word: wordFromJson.word,
            rank: wordFromJson.rank,
            definition: wordFromJson.definition,
            pronunciation: wordFromJson.pronunciation || null,
            gender: wordFromJson.gender || null,
            fetched: true,
        };
    }

    // Step 2: Check localStorage cache
    const cachedWord = getCachedWord(word);
    if (cachedWord) {
        return cachedWord;
    }

    // Step 3: Fetch from API
    try {
        console.log("fetching")
        const rank = wordFromJson?.rank || 0;
        const fetchedWord = await fetchWordDefinition(word, rank);

        if (fetchedWord) {
            // Save to cache for next time
            // setCachedWord will add fetchedAt and fetched automatically
            setCachedWord({
                word: fetchedWord.word,
                definition: fetchedWord.definition,
                pronunciation: fetchedWord.pronunciation,
                gender: fetchedWord.gender,
                rank: fetchedWord.rank,
                fetched: true,
                fetchedAt: new Date().toISOString(),
            });
            return fetchedWord;
        }

        return null;
    } catch (error) {
        console.error(`Failed to get definition for "${word}":`, error);
        return null;
    }
}

/**
 * Find a word in the JSON file
 */
function findWordInJson(word: string): Word | undefined {
    const words = dutchWords as Word[];
    return words.find((w) => w.word.toLowerCase() === word.toLowerCase());
}

/**
 * Get words by rank range
 * Example: getWordsByRange(0, 100) returns top 100 words
 */
export function getWordsByRange(start: number, end: number): Word[] {
    const words = dutchWords as Word[];
    return words.filter((word) => word.rank >= start && word.rank < end);
}

/**
 * Get multiple word definitions for a study session
 * Prioritizes words that already have definitions (from JSON or cache)
 * Only fetches from API if needed
 */
export async function getWordsForStudy(
    start: number,
    end: number
): Promise<WordWithDefinition[]> {
    const words = getWordsByRange(start, end);
    const results: WordWithDefinition[] = [];

    for (const word of words) {
        try {
            const definition = await getWordDefinition(word.word);
            if (definition) {
                results.push(definition);
            }
        } catch (error) {
            console.error(`Failed to get word "${word.word}":`, error);
            // Continue with next word
        }
    }

    return results;
}

/**
 * Get a single word by rank
 */
export function getWordByRank(rank: number): Word | undefined {
    const words = dutchWords as Word[];
    return words.find((w) => w.rank === rank);
}

/**
 * Get total word count
 */
export function getTotalWordCount(): number {
    const words = dutchWords as Word[];
    return words.length;
}

/**
 * Get statistics about how many words have definitions
 */
export function getDefinitionStats(): {
    total: number;
    withDefinitions: number;
    percentage: number;
} {
    const words = dutchWords as Word[];
    const withDefinitions = words.filter((w) => w.fetched && w.definition).length;

    return {
        total: words.length,
        withDefinitions,
        percentage: Math.round((withDefinitions / words.length) * 100),
    };
}

/**
 * Shuffle an array of words (useful for random study order)
 */
export function shuffleWords<T>(words: T[]): T[] {
    const shuffled = [...words];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Check if we have enough API calls left today
 * Based on localStorage tracking (simple implementation)
 */
export function canMakeApiCall(): { allowed: boolean; remaining: number } {
    if (typeof window === 'undefined') {
        return { allowed: true, remaining: 50 };
    }

    const today = new Date().toDateString();
    const key = `api-calls-${today}`;
    const callsToday = parseInt(localStorage.getItem(key) || '0', 10);

    const limit = 50; // Free tier limit
    const remaining = Math.max(0, limit - callsToday);

    return {
        allowed: callsToday < limit,
        remaining,
    };
}

/**
 * Increment API call counter
 */
export function incrementApiCallCount(): void {
    if (typeof window === 'undefined') {
        return;
    }

    const today = new Date().toDateString();
    const key = `api-calls-${today}`;
    const callsToday = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, (callsToday + 1).toString());
}

/**
 * Get API usage for today
 */
export function getApiUsage(): { used: number; limit: number; remaining: number } {
    if (typeof window === 'undefined') {
        return { used: 0, limit: 50, remaining: 50 };
    }

    const today = new Date().toDateString();
    const key = `api-calls-${today}`;
    const used = parseInt(localStorage.getItem(key) || '0', 10);
    const limit = 50;

    return {
        used,
        limit,
        remaining: Math.max(0, limit - used),
    };
}