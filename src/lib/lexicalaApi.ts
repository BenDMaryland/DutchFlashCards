

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const word = searchParams.get('word');

    const response = await fetch(
        'https://lexicala1.p.rapidapi.com/search-entries?language=nl&text=appel',
        {
            headers: {
                'X-RapidAPI-Key': process.env.LEXICALA_API_KEY!,
                'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
            }
        }
    );

    return Response.json(await response.json());
}