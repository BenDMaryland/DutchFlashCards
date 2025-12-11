import { getTotalWordCount, getDefinitionStats, getWordsForStudy, getWordDefinition } from '../lib/wordService';

export default async function HomePage() {
  const totalWords = getTotalWordCount();
  const stats = getDefinitionStats();

  // Test fetch one word
  //const testWord = await getWordDefinition('de');
  const testWord = await getWordDefinition('de');
  const testWords = await getWordsForStudy(0, 1);

  console.log(testWord)
  console.log(testWords)
  function getMyData() {


  }

  return (
    <div>
      <h1>Dutch Learning App</h1>

      <div>
        <p>Total words: {totalWords}</p>
        <p>With definitions: {stats.withDefinitions} ({stats.percentage}%)</p>
      </div>

      <div>

      </div>
    </div>
  );
}
let exampler = [
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
    "word": "in",
    "rank": 5,
    "definition": "in",
    "pronunciation": "ɪn",
    "gender": null,
    "fetched": true
  }
]