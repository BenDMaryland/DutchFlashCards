// src/app/api/words/route.ts

import { NextRequest } from 'next/server';
import { getWordsForStudy, getWordDefinition } from '@/lib/wordService';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const start = parseInt(searchParams.get('start') || '0');
        const end = parseInt(searchParams.get('end') || '10');
        const word = searchParams.get('word');

        // If requesting a single word
        if (word) {
            const result = await getWordDefinition(word);
            return Response.json(result);
        }

        // If requesting a range of words
        const words = await getWordsForStudy(start, end);
        return Response.json(words);
    } catch (error) {
        console.error('API route error:', error);
        return Response.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}