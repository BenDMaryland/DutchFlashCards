// src/lib/lexicalaApi.ts

import type {
    LexicalaResponse,
    LexicalaEntry,
    LexicalaSense,
    LexicalaTranslation,
    WordWithDefinition,
    ApiError,
} from '@/types';

const LEXICALA_BASE_URL = 'https://lexicala1.p.rapidapi.com';
const LEXICALA_API_KEY = process.env.LEXICALA_API_KEY;

/**
 * Search for a Dutch word using Lexicala API
 * Uses /search-entries to get full data in one call
 */
export async function searchWord(word: string): Promise<LexicalaResponse> {
    if (!LEXICALA_API_KEY) {
        throw new Error('LEXICALA_API_KEY is not configured');
    }

    const url = `${LEXICALA_BASE_URL}/search-entries?language=nl&text=${encodeURIComponent(word)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': LEXICALA_API_KEY,
                'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com',
            },
        });

        if (!response.ok) {
            const error: ApiError = {
                message: `API request failed: ${response.statusText}`,
                statusCode: response.status,
            };

            // Handle specific error codes
            if (response.status === 429) {
                error.message = 'Rate limit exceeded. Try again later.';
                error.code = 'RATE_LIMIT';
            } else if (response.status === 401) {
                error.message = 'Invalid API key';
                error.code = 'AUTH_ERROR';
            }

            throw error;
        }

        const data: LexicalaResponse = await response.json();
        return data;
    } catch (error) {
        if (error && typeof error === 'object' && 'message' in error) {
            throw error; // Re-throw ApiError
        }

        // Network or other errors
        const apiError: ApiError = {
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            code: 'NETWORK_ERROR',
        };
        throw apiError;
    }
}

/**
 * Extract the English translation from a translation object
 * Handles both single translation and array of translations
 */
function extractEnglishTranslation(
    translations: LexicalaTranslation | LexicalaTranslation[] | undefined
): string | null {
    if (!translations) {
        return null;
    }

    // If it's an array, take the first one
    if (Array.isArray(translations)) {
        return translations[0]?.text || null;
    }

    // Single translation object
    return translations.text || null;
}

/**
 * Extract example sentences from a sense
 */
function extractExamples(sense: LexicalaSense): string[] {
    if (!sense.examples || sense.examples.length === 0) {
        return [];
    }

    return sense.examples
        .map((ex) => ex.text)
        .filter(Boolean)
        .slice(0, 3); // Limit to 3 examples
}

/**
 * Extract the primary definition from Lexicala response
 * Now extracts ALL senses from the primary entry (most common homograph)
 */
export function extractPrimaryDefinition(
    response: LexicalaResponse,
    rank?: number
): WordWithDefinition | null {
    if (!response.results || response.results.length === 0) {
        return null;
    }

    // Sort by homograph_number (lower = more common)
    const sortedResults = [...response.results].sort((a, b) => {
        const aNum = a.headword.homograph_number || 999;
        const bNum = b.headword.homograph_number || 999;
        return aNum - bNum;
    });

    // Get the most common entry
    const primaryEntry: LexicalaEntry = sortedResults[0];

    if (!primaryEntry.senses || primaryEntry.senses.length === 0) {
        return null;
    }

    // Extract ALL senses (not just the first one)
    const definitions: Array<{
        text: string;
        semanticCategory?: string;
        semanticSubcategory?: string;
    }> = [];

    const allExamples: string[] = [];

    primaryEntry.senses.forEach((sense: LexicalaSense) => {
        const englishTranslation = extractEnglishTranslation(sense.translations?.en);

        if (englishTranslation) {
            definitions.push({
                text: englishTranslation,
                semanticCategory: sense.semantic_category,
                semanticSubcategory: sense.semantic_subcategory,
            });
        }

        // Collect examples from all senses
        const senseExamples = extractExamples(sense);
        allExamples.push(...senseExamples);
    });

    if (definitions.length === 0) {
        return null;
    }

    // Build the result
    const result: WordWithDefinition = {
        word: primaryEntry.headword.text,
        rank: rank || 0,
        definitions,
        pronunciation: primaryEntry.headword.pronunciation?.value || null,
        gender: primaryEntry.headword.gender || null,
        examples: allExamples.length > 0 ? allExamples.slice(0, 5) : undefined, // Limit to 5 total examples
        fetched: true,
    };

    return result;
}

/**
 * Fetch and extract definition for a word in one call
 * This is the main function you'll use
 */
export async function fetchWordDefinition(
    word: string,
    rank?: number
): Promise<WordWithDefinition | null> {
    try {
        const response = await searchWord(word);
        const definition = extractPrimaryDefinition(response, rank);
        return definition;
    } catch (error) {
        console.error(`Error fetching definition for "${word}":`, error);
        throw error;
    }
}

/**
 * Batch fetch multiple words (useful for pre-populating)
 * Note: Respects rate limits by adding delays
 */
export async function batchFetchWords(
    words: string[],
    onProgress?: (current: number, total: number) => void
): Promise<WordWithDefinition[]> {
    const results: WordWithDefinition[] = [];
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < words.length; i++) {
        try {
            const definition = await fetchWordDefinition(words[i], i);
            if (definition) {
                results.push(definition);
            }

            // Progress callback
            if (onProgress) {
                onProgress(i + 1, words.length);
            }

            // Add delay to avoid rate limiting (50 requests/day, space them out)
            // Wait 2 seconds between requests to be safe
            if (i < words.length - 1) {
                await delay(2000);
            }
        } catch (error) {
            console.error(`Failed to fetch word "${words[i]}":`, error);
            // Continue with next word even if one fails
        }
    }

    return results;
}