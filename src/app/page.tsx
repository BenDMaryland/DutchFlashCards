'use client';

import { useEffect, useState } from 'react';
import { getTotalWordCount, getDefinitionStats, getWordDefinition } from '@/lib/wordService';
import { setCachedWord, getAllCachedWords } from '@/lib/wordCache';
import Card from "../compontents/card"
import { dutchWordList } from '../data/dutch-words'


import type { WordWithDefinition } from '@/types';

export default function HomePage() {
  const [fetching, setFetching] = useState(false);
  const [words, setWords] = useState<WordWithDefinition[]>([]);

  useEffect(() => {
    async function fetchWords() {
      setFetching(true);
      try {
        // Fetch from YOUR API route (server-side)
        const response = await fetch('/api/words?start=0&end=10');
        const data = await response.json();
        setWords(data);

        // Cache each word in localStorage (client-side)
        data.forEach((word: WordWithDefinition) => {
          setCachedWord({
            word: word.word,
            definitions: word.definitions,
            pronunciation: word.pronunciation,
            gender: word.gender,
            rank: word.rank,
            fetched: true,
            fetchedAt: new Date().toISOString(),
          });
        });
      } catch (error) {
        console.error('Error fetching words:', error);
      } finally {
        setFetching(false);
      }
    }

    fetchWords();
  }, []);



  useEffect(() => {
    async function testWords() {
      const testWord = await getWordDefinition('mel');
      console.log('Test result for "mel":', testWord);
    }
    testWords();


  }, []);
  return(
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
          <p>Fetched {words.length} : words</p>
        )}
        {words ? (<div>
          {words.map((word, i) => {

            if (word.rank) return (<Card key={word.rank + (i * 90000)} word={word} />)
          })}
        </div>) : (<div>
        </div>)}
      </div>


    </div>
  );
}

let missing = [
  {
    "word": "de",
    "rank": 0,
    "definitions": [
      {
        "text": "the"
      }
    ],
    "pronunciation": "də",
    "gender": null,
    "examples": [
      "De vork en het mes."
    ],
    "fetched": true
  },
  {
    "word": "van",
    "rank": 1,
    "definitions": [
      {
        "text": "of",
        "semanticSubcategory": "afkomstig van"
      },
      {
        "text": "by",
        "semanticSubcategory": "m.b.t. eigendom"
      },
      {
        "text": "from",
        "semanticSubcategory": "gemaakt van"
      },
      {
        "text": "of",
        "semanticSubcategory": "m.b.t. kenmerk"
      }
    ],
    "pronunciation": "vɑn",
    "gender": null,
    "examples": [
      "van Amsterdam",
      "Ik hoorde het van mijn collega.",
      "de jas van mijn zus",
      "de moeder van mijn buurvrouw",
      "een tafel van hout"
    ],
    "fetched": true
  },
  {
    "word": "een",
    "rank": 2,
    "definitions": [
      {
        "text": "one"
      }
    ],
    "pronunciation": "en",
    "gender": null,
    "examples": [
      "een zijn met de natuur"
    ],
    "fetched": true
  },
  {
    "word": "het",
    "rank": 3,
    "definitions": [
      {
        "text": "the",
        "semanticSubcategory": "lidwoord"
      }
    ],
    "pronunciation": "hɛt/ət",
    "gender": null,
    "examples": [
      "het huis met de tuin",
      "Dit is het beste dat ik krijgen kon."
    ],
    "fetched": true
  },
  {
    "word": "en",
    "rank": 4,
    "definitions": [
      {
        "text": "and",
        "semanticCategory": "linguistics"
      },
      {
        "text": "and",
        "semanticCategory": "mathematics"
      }
    ],
    "pronunciation": "ɛn",
    "gender": null,
    "examples": [
      "Eerst gaan we naar Amsterdam en dan naar Rotterdam.",
      "vader en moeder",
      "Twee en twee is vier."
    ],
    "fetched": true
  },
  {
    "word": "in",
    "rank": 5,
    "definitions": [
      {
        "text": "in",
        "semanticSubcategory": "binnen"
      },
      {
        "text": "in"
      },
      {
        "text": "inside",
        "semanticCategory": "sport"
      }
    ],
    "pronunciation": "ɪn",
    "gender": null,
    "examples": [
      "De pianist komt de zaal in.",
      "Een kaalgeschoren hoofd bij mannen is in.",
      "De bal is in."
    ],
    "fetched": true
  },
  {
    "word": "dat",
    "rank": 7,
    "definitions": [
      {
        "text": "that",
        "semanticSubcategory": "dichtbij"
      },
      {
        "text": "that",
        "semanticSubcategory": "ver"
      },
      {
        "text": "that",
        "semanticSubcategory": "eerder"
      },
      {
        "text": "who",
        "semanticSubcategory": "toelichtend"
      }
    ],
    "pronunciation": "dɑt",
    "gender": null,
    "examples": [
      "Ik vind dit schilderij mooier dan dat schilderij.",
      "In dat witte huis aan het eind van de straat woont mijn opa.",
      "Heb je een griepje? Dat is niet zo erg.",
      "Het paard dat daar in de wei staat, is van mij."
    ],
    "fetched": true
  },
  {
    "word": "op",
    "rank": 8,
    "definitions": [
      {
        "text": "on"
      },
      {
        "text": "at",
        "semanticSubcategory": "m.b.t. plaats"
      },
      {
        "text": "at",
        "semanticSubcategory": "m.b.t. tijd"
      }
    ],
    "pronunciation": "ɔp",
    "gender": null,
    "examples": [
      "een appel op de fruitschaal",
      "Je sleutelbos ligt op de koelkast.",
      "Ik kom wat later; ik zit nu nog op kantoor.",
      "We waren vorige week op Terschelling.",
      "op werkdagen van negen tot vijf"
    ],
    "fetched": true
  },
  {
    "word": "te",
    "rank": 9,
    "definitions": [
      {
        "text": "(way) too"
      }
    ],
    "pronunciation": "tə",
    "gender": null,
    "examples": [
      "te vroeg arriveren",
      "Die broek is te groot.",
      "Dat parfum is te duur"
    ],
    "fetched": true
  },
  {
    "word": "zijn",
    "rank": 11,
    "definitions": [
      {
        "text": "be"
      },
      {
        "text": "be",
        "semanticSubcategory": "op een plaats"
      },
      {
        "text": "be",
        "semanticSubcategory": "in een toestand"
      },
      {
        "text": "be",
        "semanticSubcategory": "hulpwerkwoord"
      }
    ],
    "pronunciation": "zɛin",
    "gender": null,
    "examples": [
      "Er is een boomsoort die meer dan honderd meter hoog kan worden.",
      "Waar zijn jullie?",
      "Ik ben weer thuis.",
      "ziek zijn",
      "blij zijn"
    ],
    "fetched": true
  },
  {
    "word": "voor",
    "rank": 12,
    "definitions": [
      {
        "text": "in front of"
      },
      {
        "text": "for"
      }
    ],
    "pronunciation": "vor",
    "gender": null,
    "examples": [
      "Voor in het boek staat een dankwoord.",
      "De auto staat voor.",
      "Zij is voor in de vijftig.",
      "Wie is voor? Steek je hand op.",
      "Acht mensen stemden voor."
    ],
    "fetched": true
  },
  {
    "word": "met",
    "rank": 13,
    "definitions": [
      {
        "text": "with"
      }
    ],
    "pronunciation": "mɛt",
    "gender": null,
    "examples": [
      "Met jou wil ik oud worden.",
      "twee friet met mayonaise",
      "met vriendelijke groet"
    ],
    "fetched": true
  },
  {
    "word": "die",
    "rank": 14,
    "definitions": [
      {
        "text": "that",
        "semanticSubcategory": "aanwijzen"
      },
      {
        "text": "that",
        "semanticSubcategory": "ver"
      },
      {
        "text": "it",
        "semanticSubcategory": "eerder"
      },
      {
        "text": "that",
        "semanticSubcategory": "toelichtend"
      }
    ],
    "pronunciation": "di",
    "gender": null,
    "examples": [
      "Ik vind deze hond leuker dan die hond.",
      "Ik woon in die flat aan het eind van de straat.",
      "Ik wil de krant lezen. Waarom heb je die nog niet gekocht?",
      "De vrouwen die daar op het plein staan zijn mijn vriendinnen."
    ],
    "fetched": true
  },
  {
    "word": "niet",
    "rank": 15,
    "definitions": [
      {
        "text": "no"
      }
    ],
    "pronunciation": "nit",
    "gender": null,
    "examples": [
      "niet lang nadenken, maar meteen beslissen",
      "niet genoeg"
    ],
    "fetched": true
  },
  {
    "word": "aan",
    "rank": 16,
    "definitions": [
      {
        "text": "on"
      }
    ],
    "pronunciation": "an",
    "gender": null,
    "examples": [
      "De radio staat aan."
    ],
    "fetched": true
  },
  {
    "word": "er",
    "rank": 17,
    "definitions": [
      {
        "text": "there",
        "semanticSubcategory": "plaats"
      },
      {
        "text": "there",
        "semanticSubcategory": "zonder betekenis"
      }
    ],
    "pronunciation": "ɛr",
    "gender": null,
    "examples": [
      "Er zijn veel mensen op straat.",
      "er later aankomen dan verwacht",
      "Ik heb nog tien knikkers, hoeveel heb jij er nog?",
      "Wat is er gebeurd?",
      "Er wordt gebeld, doe jij even open?"
    ],
    "fetched": true
  },
  {
    "word": "om",
    "rank": 18,
    "definitions": [
      {
        "text": "around",
        "semanticSubcategory": "richting"
      }
    ],
    "pronunciation": "ɔm",
    "gender": null,
    "examples": [
      "ombuigen"
    ],
    "fetched": true
  },
  {
    "word": "ook",
    "rank": 20,
    "definitions": [
      {
        "text": "also"
      }
    ],
    "pronunciation": "ok",
    "gender": null,
    "examples": [
      "De buren aan de overkant doen ook mee.",
      "Een eend kan alles: zwemmen, vliegen en ook nog een beetje lopen."
    ],
    "fetched": true
  },
  {
    "word": "als",
    "rank": 21,
    "definitions": [
      {
        "text": "as",
        "semanticSubcategory": "bij vergelijking"
      },
      {
        "text": "if"
      },
      {
        "text": "if"
      },
      {
        "text": "acting as",
        "semanticSubcategory": "hoedanigheid"
      }
    ],
    "pronunciation": "ɑls",
    "gender": null,
    "examples": [
      "zo blij als een kind",
      "pas naar huis gaan als je klaar bent met je werk",
      "Als je lief bent, mag je mee, anders niet.",
      "Persoonlijk vind ik vrije schooluren een goed idee, maar als directeur van de school kan ik er niet aan beginnen."
    ],
    "fetched": true
  },
  {
    "word": "dan",
    "rank": 22,
    "definitions": [
      {
        "text": "than",
        "semanticSubcategory": "vergelijking"
      }
    ],
    "pronunciation": "dɑn",
    "gender": null,
    "examples": [
      "Hij is groter dan ik.",
      "Je ziet er anders uit dan ik dacht."
    ],
    "fetched": true
  },
  {
    "word": "maar",
    "rank": 23,
    "definitions": [
      {
        "text": "only"
      },
      {
        "text": "just",
        "semanticSubcategory": "betekenisloos"
      }
    ],
    "pronunciation": "mar",
    "gender": null,
    "examples": [
      "Het is maar een paar minuten lopen.",
      "Het gaat maar door.",
      "Omdat ik niet precies weet hoe het moet, doe ik maar wat.",
      "Als de winkel maar niet dicht is!"
    ],
    "fetched": true
  },
  {
    "word": "bij",
    "rank": 24,
    "definitions": [
      {
        "text": "honeybee",
        "semanticSubcategory": "insect"
      }
    ],
    "pronunciation": "bɛi",
    "gender": "feminine-masculine",
    "examples": [
      "bijenkorf",
      "bijensteek"
    ],
    "fetched": true
  },
  {
    "word": "of",
    "rank": 25,
    "definitions": [
      {
        "text": "either"
      }
    ],
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
    "definitions": [
      {
        "text": "finished",
        "semanticSubcategory": "afgelopen"
      },
      {
        "text": "off",
        "semanticSubcategory": "van kleding"
      },
      {
        "text": "out-dated",
        "semanticSubcategory": "ouderwets"
      },
      {
        "text": "out",
        "semanticSubcategory": "naar buiten"
      },
      {
        "text": "completely",
        "semanticSubcategory": "vanalles"
      }
    ],
    "pronunciation": "œyt",
    "gender": null,
    "examples": [
      "Doe jij de radio uit?",
      "Het vuur is uit.",
      "Heb jij je jas al uit?",
      "Die muziek was een jaar geleden erg populair maar is nu helemaal uit.",
      "voor je uit staren"
    ],
    "fetched": true
  },
  {
    "word": "nog",
    "rank": 27,
    "definitions": [
      {
        "text": "still"
      },
      {
        "text": "more",
        "semanticSubcategory": "opnieuw"
      },
      {
        "text": "even",
        "semanticSubcategory": "als versterking"
      }
    ],
    "pronunciation": "nɔx",
    "gender": null,
    "examples": [
      "Ben je nog niet naar school?",
      "nog altijd niet getrouwd",
      "nog een keer in het reuzenrad",
      "nog duurder dan vorig jaar"
    ],
    "fetched": true
  },
  {
    "word": "worden",
    "rank": 28,
    "definitions": [
      {
        "text": "be",
        "semanticSubcategory": "koppelwerkwoord"
      },
      {
        "text": "be",
        "semanticSubcategory": "hulpwerkwoord"
      }
    ],
    "pronunciation": "ˈwɔrdə(n)",
    "gender": null,
    "examples": [
      "Ik word ziek.",
      "Hij wil later piloot worden.",
      "door de zon lekker bruin worden",
      "Er wordt veel gelachen tijdens de voorstelling.",
      "Tijdens de oorlog werden veel burgers gedood."
    ],
    "fetched": true
  },
  {
    "word": "door",
    "rank": 29,
    "definitions": [
      {
        "text": "through",
        "semanticSubcategory": "doorheen"
      },
      {
        "text": "through",
        "semanticSubcategory": "gedurende"
      }
    ],
    "pronunciation": "dor",
    "gender": null,
    "examples": [
      "Ik kan de straat niet door als dat hek er staat.",
      "de hele dag door sigaretten roken"
    ],
    "fetched": true
  },
  {
    "word": "naar",
    "rank": 30,
    "definitions": [
      {
        "text": "bleak"
      }
    ],
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
    "definitions": [
      {
        "text": "(up) to",
        "semanticSubcategory": "afstand"
      },
      {
        "text": "until",
        "semanticSubcategory": "tijd"
      },
      {
        "text": "to",
        "semanticSubcategory": "naar"
      },
      {
        "text": "as",
        "semanticSubcategory": "niet langer dan"
      }
    ],
    "pronunciation": "tɔt",
    "gender": null,
    "examples": [
      "tot de deur",
      "tot de zomervakantie",
      "een baan van negen tot vijf",
      "zich richten tot iemand"
    ],
    "fetched": true
  },
  {
    "word": "ze",
    "rank": 33,
    "definitions": [
      {
        "text": "she",
        "semanticSubcategory": "vrouw"
      },
      {
        "text": "they",
        "semanticSubcategory": "personen"
      }
    ],
    "pronunciation": "zɛ",
    "gender": null,
    "examples": [
      "Ze zag me niet.",
      "Ze hebben geen fiets, ze komen altijd in een auto."
    ],
    "fetched": true
  },
  {
    "word": "over",
    "rank": 35,
    "definitions": [
      {
        "text": "over",
        "semanticSubcategory": "overheen"
      },
      {
        "text": "left over"
      },
      {
        "text": "finished"
      }
    ],
    "pronunciation": "ˈovər",
    "gender": null,
    "examples": [
      "Ze liepen het plein over.",
      "Hoeveel is er nog over van die zak snoepjes?",
      "Na het bombardement was er niet veel van de binnenstad over.",
      "Gisteren deed het nog pijn, maar nu is het over."
    ],
    "fetched": true
  },
  {
    "word": "hij",
    "rank": 36,
    "definitions": [
      {
        "text": "he"
      }
    ],
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
    "word": "meer",
    "rank": 38,
    "definitions": [
      {
        "text": "lake",
        "semanticSubcategory": "water"
      }
    ],
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
    "definitions": [
      {
        "text": "year",
        "semanticSubcategory": "12 maanden"
      },
      {
        "text": "(calendar) year"
      }
    ],
    "pronunciation": "jar",
    "gender": "neuter",
    "examples": [
      "We gaan in april voor een jaar naar het buitenland.",
      "dertig jaar lang met iemand getrouwd geweest zijn",
      "We gaan dit jaar met vakantie naar Spanje."
    ],
    "fetched": true
  },
  {
    "word": "was",
    "rank": 40,
    "definitions": [
      {
        "text": "wash",
        "semanticSubcategory": "het wassen"
      },
      {
        "text": "wash"
      }
    ],
    "pronunciation": "wɑs",
    "gender": "masculine",
    "examples": [
      "de was doen",
      "Ik moet nog een was draaien.",
      "handwas",
      "wasmand",
      "wasrek"
    ],
    "fetched": true
  },
  {
    "word": "ik",
    "rank": 41,
    "definitions": [
      {
        "text": "I"
      }
    ],
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
    "definitions": [
      {
        "text": "jug"
      }
    ],
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
    "definitions": [
      {
        "text": "you"
      },
      {
        "text": "you"
      },
      {
        "text": "your"
      },
      {
        "text": "you"
      }
    ],
    "pronunciation": "jə",
    "gender": null,
    "examples": [
      "Ga je morgen ook weg?",
      "Ik heb je dat boek al gegeven.",
      "Ik kom je ophalen.",
      "Hier is je jas.",
      "Zoiets doe je niet."
    ],
    "fetched": true
  },
  {
    "word": "zich",
    "rank": 44,
    "definitions": [
      {
        "text": "himself"
      }
    ],
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
    "definitions": [
      {
        "text": "already",
        "semanticSubcategory": "reeds"
      },
      {
        "text": "yet",
        "semanticSubcategory": "versterkend"
      }
    ],
    "pronunciation": "ɑl",
    "gender": null,
    "examples": [
      "Ben je er al?",
      "al te duidelijk je mening zeggen"
    ],
    "fetched": true
  },
  {
    "word": "hebben",
    "rank": 46,
    "definitions": [
      {
        "text": "have",
        "semanticSubcategory": "bezitten"
      },
      {
        "text": "have",
        "semanticSubcategory": "lijden aan"
      },
      {
        "text": "auxilliary (verb)",
        "semanticSubcategory": "hulpwerkwoord"
      }
    ],
    "pronunciation": "ˈhɛbə(n)",
    "gender": null,
    "examples": [
      "een mooi gebit hebben",
      "de Nederlandse nationaliteit hebben",
      "morgen tijd hebben om naar de film te gaan",
      "longontsteking hebben",
      "het aan je hart hebben"
    ],
    "fetched": true
  },
  {
    "word": "geen",
    "rank": 47,
    "definitions": [
      {
        "text": "no"
      },
      {
        "text": "no"
      }
    ],
    "pronunciation": "xen",
    "gender": null,
    "examples": [
      "Ik wil geen melk maar karnemelk.",
      "geen twintig maar dertig",
      "geen bruine bonen lusten"
    ],
    "fetched": true
  },
  {
    "word": "hun",
    "rank": 48,
    "definitions": [
      {
        "text": "their",
        "semanticSubcategory": "bez.vnw."
      },
      {
        "text": "them",
        "semanticSubcategory": "pers.vnw."
      }
    ],
    "pronunciation": "hʏn",
    "gender": null,
    "examples": [
      "De buren hebben hun huis verkocht.",
      "Ik heb hun mijn huisadres gegeven."
    ],
    "fetched": true
  },
  {
    "word": "we",
    "rank": 49,
    "definitions": [
      {
        "text": "we"
      }
    ],
    "pronunciation": "wə",
    "gender": null,
    "examples": [
      "Ze vraagt of we morgen kunnen komen."
    ],
    "fetched": true
  }
]

let old = `let dutchArray = dutchWordList.split('\n')
let wordSet: any[] = [];
let dupl: string[] = []




let results = dutchArray.map((currentWord, i) => {

  if (wordSet.find((element) => element.toLowerCase() === currentWord.toLowerCase())) {
    console.warn("duplicate")
    dupl = [...dupl, currentWord]

  }
  else {

    wordSet = [...wordSet, currentWord]

  }
})

console.log(wordSet.length, dutchArray.length)
wordSet = wordSet.map(((currentWord, i) => {

  return {
    "word": currentWord,
    "rank": i,
    "definitions": [
      { "text": null, "semanticCategory": null },
    ],
    "pronunciation": null,
    "gender": null,
    "fetched": false
  }


}))

console.log(JSON.stringify(wordSet))
`