// src/types/index.ts

/**
 * Basic word structure from the JSON file
 */
export interface Word {
    word: string;
    rank: number;
    definitions?: Definition[] | null;
    pronunciation?: string | null;
    gender?: string | null;
    fetched: boolean;
}

/**
 * Individual definition with semantic context
 */
export interface Definition {
    text: string;
    semanticCategory?: string;
    semanticSubcategory?: string;
}

/**
 * Word with complete definition data (after fetching from API or cache)
 */
export interface WordWithDefinition {
    word: string;
    rank?: number;
    definitions: Definition[];
    pronunciation: string | null;
    gender: string | null;
    examples?: string[];
    fetched: boolean;
}

/**
 * Lexicala API Response Types
 */

export interface LexicalaResponse {
    n_results: number;
    page_number: number;
    results_per_page: number;
    n_pages: number;
    available_n_pages: number;
    results: LexicalaEntry[];
}

export interface LexicalaEntry {
    id: string;
    source: string;
    language: string;
    version: number;
    frequency?: string;
    headword: LexicalaHeadword;
    senses: LexicalaSense[];
}

export interface LexicalaHeadword {
    text: string;
    pronunciation?: {
        value: string;
    };
    pos: string; // part of speech (noun, verb, etc)
    gender?: string;
    homograph_number?: number;
    inflections?: Array<{
        text: string;
        pronunciation?: {
            value: string;
        };
        number?: string;
    }>;
}

export interface LexicalaSense {
    id: string;
    definition: string;
    semantic_category?: string;
    semantic_subcategory?: string;
    translations?: LexicalaTranslations;
    examples?: Array<{
        text: string;
        translations?: LexicalaTranslations;
    }>;
    compositional_phrases?: Array<{
        text: string;
        definition: string;
        translations?: LexicalaTranslations;
    }>;
}

export interface LexicalaTranslations {
    en?: LexicalaTranslation | LexicalaTranslation[];
    de?: LexicalaTranslation | LexicalaTranslation[];
    es?: LexicalaTranslation | LexicalaTranslation[];
    fr?: LexicalaTranslation | LexicalaTranslation[];
    [key: string]: LexicalaTranslation | LexicalaTranslation[] | undefined;
}

export interface LexicalaTranslation {
    text: string;
    gender?: string;
    pronunciation?: {
        value: string;
    };
}

/**
 * Study session types
 */

export interface StudySession {
    words: WordWithDefinition[];
    currentIndex: number;
    startRange: number;
    endRange: number;
    completedWords: string[];
}

export interface FlashcardState {
    isFlipped: boolean;
    showingDefinition: boolean;
}

/**
 * Word range selection
 */

export interface WordRange {
    start: number;
    end: number;
    label?: string;
}

/**
 * Common presets for word ranges
 */
export const WORD_RANGE_PRESETS: WordRange[] = [
    { start: 0, end: 100, label: 'Top 100' },
    { start: 0, end: 500, label: 'Top 500' },
    { start: 0, end: 1000, label: 'Top 1000' },
    { start: 100, end: 200, label: '100-200' },
    { start: 500, end: 1000, label: '500-1000' },
];

/**
 * API Error types
 */

export interface ApiError {
    message: string;
    code?: string;
    statusCode?: number;
}

/**
 * Cache statistics
 */

export interface CacheStats {
    count: number;
    sizeKB: number;
}