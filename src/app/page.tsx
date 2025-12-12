'use client';

import { useEffect, useState } from 'react';
import { getTotalWordCount, getDefinitionStats } from '@/lib/wordService';
import { setCachedWord } from '@/lib/wordCache';

import type { WordWithDefinition } from '@/types';

export default function HomePage() {
  const [fetching, setFetching] = useState(false);
  const [words, setWords] = useState<WordWithDefinition[]>([]);

  // useEffect(() => {
  //   async function fetchWords() {
  //     setFetching(true);
  //     try {
  //       // Fetch from YOUR API route (server-side)
  //       const response = await fetch('/api/words?start=0&end=40');
  //       const data = await response.json();
  //       setWords(data);

  //       // Cache each word in localStorage (client-side)
  //       data.forEach((word: WordWithDefinition) => {
  //         setCachedWord({
  //           word: word.word,
  //           definition: word.definition,
  //           pronunciation: word.pronunciation,
  //           gender: word.gender,
  //           rank: word.rank,
  //           fetched: true,
  //           fetchedAt: new Date().toISOString(),
  //         });
  //       });
  //     } catch (error) {
  //       console.error('Error fetching words:', error);
  //     } finally {
  //       setFetching(false);
  //     }
  //   }

  //   fetchWords();

  // }, []);


  useEffect(() => {
  console.log(words)
  }, [words])
  
  return (
    <div>
      <h1>Dutch Learning App</h1>

      <div>
        <p>Total words: {getTotalWordCount()}</p>
        <p>With definitions: {getDefinitionStats().withDefinitions} ({getDefinitionStats().percentage}%)</p>
      </div>

      <div>
        {fetching ? (
          <p>Fetching...</p>
        ) : (
          <p>Fetched {words.length} words</p>
        )}
      </div>

    
    </div>
  );
}
let example = [
  {
    "word": "de",
    "rank": 0,
    "definition": "the",
    "pronunciation": "də",
    "gender": null,
    "fetched": true
  },
  {
    "word": "van",
    "rank": 1,
    "definition": "of",
    "pronunciation": "vɑn",
    "gender": null,
    "fetched": true
  },
  {
    "word": "een",
    "rank": 2,
    "definition": "one",
    "pronunciation": "en",
    "gender": null,
    "fetched": true
  },
  {
    "word": "het",
    "rank": 3,
    "definition": "the",
    "pronunciation": "hɛt/ət",
    "gender": null,
    "fetched": true
  },
  {
    "word": "en",
    "rank": 4,
    "definition": "and",
    "pronunciation": "ɛn",
    "gender": null,
    "fetched": true
  },
  {
    "word": "in",
    "rank": 5,
    "definition": "in",
    "pronunciation": "ɪn",
    "gender": null,
    "fetched": true
  },
  {
    "word": "dat",
    "rank": 7,
    "definition": "that",
    "pronunciation": "dɑt",
    "gender": null,
    "fetched": true
  },
  {
    "word": "op",
    "rank": 8,
    "definition": "on",
    "pronunciation": "ɔp",
    "gender": null,
    "fetched": true
  },
  {
    "word": "te",
    "rank": 9,
    "definition": "(way) too",
    "pronunciation": "tə",
    "gender": null,
    "fetched": true
  },
  {
    "word": "zijn",
    "rank": 11,
    "definition": "be",
    "pronunciation": "zɛin",
    "gender": null,
    "fetched": true
  },
  {
    "word": "voor",
    "rank": 12,
    "definition": "in front of",
    "pronunciation": "vor",
    "gender": null,
    "fetched": true
  },
  {
    "word": "met",
    "rank": 13,
    "definition": "with",
    "pronunciation": "mɛt",
    "gender": null,
    "fetched": true
  },
  {
    "word": "die",
    "rank": 14,
    "definition": "that",
    "pronunciation": "di",
    "gender": null,
    "fetched": true
  },
  {
    "word": "niet",
    "rank": 15,
    "definition": "no",
    "pronunciation": "nit",
    "gender": null,
    "fetched": true
  },
  {
    "word": "aan",
    "rank": 16,
    "definition": "on",
    "pronunciation": "an",
    "gender": null,
    "fetched": true
  },
  {
    "word": "er",
    "rank": 17,
    "definition": "there",
    "pronunciation": "ɛr",
    "gender": null,
    "fetched": true
  },
  {
    "word": "om",
    "rank": 18,
    "definition": "around",
    "pronunciation": "ɔm",
    "gender": null,
    "fetched": true
  },
  {
    "word": "ook",
    "rank": 20,
    "definition": "also",
    "pronunciation": "ok",
    "gender": null,
    "fetched": true
  },
  {
    "word": "als",
    "rank": 21,
    "definition": "as",
    "pronunciation": "ɑls",
    "gender": null,
    "fetched": true
  },
  {
    "word": "dan",
    "rank": 22,
    "definition": "than",
    "pronunciation": "dɑn",
    "gender": null,
    "fetched": true
  },
  {
    "word": "maar",
    "rank": 23,
    "definition": "only",
    "pronunciation": "mar",
    "gender": null,
    "fetched": true
  },
  {
    "word": "bij",
    "rank": 24,
    "definition": "honeybee",
    "pronunciation": "bɛi",
    "gender": "feminine-masculine",
    "fetched": true
  },
  {
    "word": "of",
    "rank": 25,
    "definition": "either",
    "pronunciation": "ɔf",
    "gender": null,
    "examples": [
      "met de auto of met de fiets gaan",
      "Wilt u koffie, of iets fris?"
    ],
    "fetched": true
  },
  {
    "word": "uit",
    "rank": 26,
    "definition": "finished",
    "pronunciation": "œyt",
    "gender": null,
    "examples": [
      "Doe jij de radio uit?",
      "Het vuur is uit."
    ],
    "fetched": true
  },
  {
    "word": "nog",
    "rank": 27,
    "definition": "still",
    "pronunciation": "nɔx",
    "gender": null,
    "examples": [
      "Ben je nog niet naar school?",
      "nog altijd niet getrouwd"
    ],
    "fetched": true
  },
  {
    "word": "worden",
    "rank": 28,
    "definition": "be",
    "pronunciation": "ˈwɔrdə(n)",
    "gender": null,
    "examples": [
      "Ik word ziek.",
      "Hij wil later piloot worden.",
      "door de zon lekker bruin worden"
    ],
    "fetched": true
  },
  {
    "word": "door",
    "rank": 29,
    "definition": "through",
    "pronunciation": "dor",
    "gender": null,
    "examples": [
      "Ik kan de straat niet door als dat hek er staat."
    ],
    "fetched": true
  },
  {
    "word": "naar",
    "rank": 30,
    "definition": "bleak",
    "pronunciation": "nar",
    "gender": null,
    "examples": [
      "een nare smaak in je mond"
    ],
    "fetched": true
  },
  {
    "word": "tot",
    "rank": 32,
    "definition": "(up) to",
    "pronunciation": "tɔt",
    "gender": null,
    "examples": [
      "tot de deur"
    ],
    "fetched": true
  },
  {
    "word": "ze",
    "rank": 33,
    "definition": "she",
    "pronunciation": "zɛ",
    "gender": null,
    "examples": [
      "Ze zag me niet."
    ],
    "fetched": true
  },
  {
    "word": "over",
    "rank": 35,
    "definition": "over",
    "pronunciation": "ˈovər",
    "gender": null,
    "examples": [
      "Ze liepen het plein over."
    ],
    "fetched": true
  },
  {
    "word": "hij",
    "rank": 36,
    "definition": "he",
    "pronunciation": "hɛi",
    "gender": null,
    "examples": [
      "Mijn vader is vroeg opgestaan. Hij gaat vissen.",
      "De auto staat al tijden voor de deur. Hij is kapot.",
      "Hij had best willen komen, maar zijn vriendin wilde niet."
    ],
    "fetched": true
  },
  {
    "word": "in",
    "rank": 5,
    "definition": "in",
    "pronunciation": "ɪn",
    "gender": null,
    "fetched": true
  },
  {
    "word": "meer",
    "rank": 38,
    "definition": "lake",
    "pronunciation": "mer",
    "gender": "neuter",
    "examples": [
      "een zeiltocht op het meer",
      "stuwmeer"
    ],
    "fetched": true
  },
  {
    "word": "jaar",
    "rank": 39,
    "definition": "year",
    "pronunciation": "jar",
    "gender": "neuter",
    "examples": [
      "We gaan in april voor een jaar naar het buitenland.",
      "dertig jaar lang met iemand getrouwd geweest zijn"
    ],
    "fetched": true
  },
  {
    "word": "was",
    "rank": 40,
    "definition": "wash",
    "pronunciation": "wɑs",
    "gender": "masculine",
    "examples": [
      "de was doen",
      "Ik moet nog een was draaien.",
      "handwas"
    ],
    "fetched": true
  },
  {
    "word": "ik",
    "rank": 41,
    "definition": "I",
    "pronunciation": "ɪk",
    "gender": null,
    "examples": [
      "Ik kom zo!"
    ],
    "fetched": true
  },
  {
    "word": "kan",
    "rank": 42,
    "definition": "jug",
    "pronunciation": "kɑn",
    "gender": "masculine-feminine",
    "examples": [
      "bij het eten een kan water op tafel zetten",
      "koffiekan"
    ],
    "fetched": true
  },
  {
    "word": "je",
    "rank": 43,
    "definition": "you",
    "pronunciation": "jə",
    "gender": null,
    "examples": [
      "Ga je morgen ook weg?"
    ],
    "fetched": true
  },
  {
    "word": "zich",
    "rank": 44,
    "definition": "himself",
    "pronunciation": "zɪx",
    "gender": null,
    "examples": [
      "Hij heeft zich vergist.",
      "Mensen laten zich het gemakkelijkst overtuigen door oudere, blanke mannen met een bril."
    ],
    "fetched": true
  },
  {
    "word": "al",
    "rank": 45,
    "definition": "already",
    "pronunciation": "ɑl",
    "gender": null,
    "examples": [
      "Ben je er al?"
    ],
    "fetched": true
  },
  {
    "word": "hebben",
    "rank": 46,
    "definition": "have",
    "pronunciation": "ˈhɛbə(n)",
    "gender": null,
    "examples": [
      "een mooi gebit hebben",
      "de Nederlandse nationaliteit hebben",
      "morgen tijd hebben om naar de film te gaan"
    ],
    "fetched": true
  },
  {
    "word": "geen",
    "rank": 47,
    "definition": "no",
    "pronunciation": "xen",
    "gender": null,
    "fetched": true
  },
  {
    "word": "hun",
    "rank": 48,
    "definition": "their",
    "pronunciation": "hʏn",
    "gender": null,
    "examples": [
      "De buren hebben hun huis verkocht."
    ],
    "fetched": true
  },
  {
    "word": "we",
    "rank": 49,
    "definition": "we",
    "pronunciation": "wə",
    "gender": null,
    "examples": [
      "Ze vraagt of we morgen kunnen komen."
    ],
    "fetched": true
  }
]