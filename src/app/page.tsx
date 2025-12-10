

export default function Home() {


  async function apiCall() {


    const response = await fetch(
      'https://lexicala1.p.rapidapi.com/search-entries?language=nl&text=appel',
      {
        headers: {
          'X-RapidAPI-Key': process.env.LEXICALA_API_KEY!,
          'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
        }
      }
    );

    const data = await response.json();
    console.log('hdid')
    console.log(data)
    return
  }


 // apiCall()

  return (
    <div >

    </div>
  );
}
let obj = {
  "n_results": 2,
  "page_number": 1,
  "results_per_page": 10,
  "n_pages": 1,
  "available_n_pages": 1,
  "results": [
    {
      "id": "NL_DEa5c15de722a4",
      "source": "global",
      "language": "nl",
      "version": 1,
      "frequency": "163030",
      "headword": {
        "text": "appel",
        "pronunciation": {
          "value": "ɑˈpɛl"
        },
        "pos": "noun",
        "gender": "neuter",
        "homograph_number": 2,
        "inflections": [
          {
            "text": "appel|s",
            "pronunciation": {
              "value": "ɑˈpɛls"
            },
            "number": "plural"
          }
        ]
      },
      "senses": [
        {
          "id": "NL_SEc6aa46b4cc24",
          "definition": "bijeenkomst om te zien of iedereen er is",
          "semantic_category": "law",
          "semantic_subcategory": "beroep",
          "translations": {
            "de": [
              {
                "text": "Appell",
                "gender": "masculine"
              },
              {
                "text": "Anwesenheitskontrollle",
                "gender": "feminine"
              }
            ],
            "en": {
              "text": "(roll) call"
            },
            "es": {
              "text": "lista",
              "gender": "feminine"
            },
            "fr": {
              "text": "appel",
              "pronunciation": {
                "value": "apɛl"
              },
              "gender": "masculine"
            },
            "ru": [
              {
                "text": "собра́ние",
                "gender": "neuter"
              },
              {
                "text": "заседа́ние",
                "gender": "neuter"
              }
            ]
          },
          "compositional_phrases": [
            {
              "text": "appel houden/blazen",
              "definition": "iedereen bij elkaar roepen",
              "translations": {
                "de": {
                  "text": "Appell abhalten/zum Appell blasen",
                  "gender": "-"
                },
                "en": {
                  "text": "to take/sound the roll call"
                },
                "es": {
                  "text": "pasar lista"
                },
                "fr": {
                  "text": "faire/sonner l'appel"
                },
                "ru": {
                  "text": "собра́ть всех вме́сте"
                }
              }
            },
            {
              "text": "een appel doen op iemand",
              "definition": "iemand om hulp vragen",
              "translations": {
                "de": {
                  "text": "an jemanden appellieren (z. B. zu helfen)",
                  "gender": "-"
                },
                "en": {
                  "text": "to appeal to someone"
                },
                "es": {
                  "text": "pedir ayuda a alguien"
                },
                "fr": {
                  "text": "faire appel à quelqu'un"
                }
              },
              "examples": [
                {
                  "text": "De politie doet nogmaals een dringend appel op mensen die iets gezien hebben of weten.",
                  "translations": {
                    "de": {
                      "text": "Die Polizei appelliert noch einmal eindringlich an Personen, die etwas gesehen haben oder wissen, mitzuhelfen."
                    },
                    "en": {
                      "text": "Police have issued an urgent appeal for potential witnesses to come forward."
                    },
                    "es": {
                      "text": "La policía hace de nuevo un llamamiento urgente a las personas que hayan visto o sepan algo."
                    },
                    "fr": {
                      "text": "La police lance à nouveau un appel urgent à ceux qui ont vu ou qui savent quelque chose."
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "NL_DEf4cd19843cea",
      "source": "global",
      "language": "nl",
      "version": 1,
      "frequency": "163030",
      "headword": {
        "text": "appel",
        "pronunciation": {
          "value": "ˈɑpəl"
        },
        "pos": "noun",
        "gender": "masculine",
        "homograph_number": 1,
        "inflections": [
          {
            "text": "appel|en, appel|s",
            "pronunciation": {
              "value": "ˈɑpələn, ˈɑpəls"
            },
            "number": "plural"
          }
        ]
      },
      "senses": [
        {
          "id": "NL_SEbd365c363886",
          "definition": "ronde, harde, zoetzure vrucht met een klokhuis waarin donkere pitjes zitten",
          "semantic_category": "culinary",
          "translations": {
            "de": {
              "text": "Apfel",
              "gender": "masculine"
            },
            "en": {
              "text": "apple"
            },
            "es": {
              "text": "manzana",
              "gender": "feminine"
            },
            "fr": {
              "text": "pomme",
              "pronunciation": {
                "value": "pɔm"
              },
              "gender": "feminine"
            },
            "ru": {
              "text": "я́блоко",
              "gender": "neuter"
            }
          },
          "examples": [
            {
              "text": "rodekool met appeltjes",
              "translations": {
                "de": {
                  "text": "Rotkohl mit Äpfeln"
                },
                "en": {
                  "text": "red cabbage with apples"
                },
                "es": {
                  "text": "lombarda con manzanas"
                },
                "fr": {
                  "text": "du chou rouge aux pommes"
                }
              }
            }
          ],
          "compositional_phrases": [
            {
              "text": "De appel valt niet ver van de boom.",
              "definition": "kinderen hebben vaak hetzelfde karakter als hun ouders",
              "translations": {
                "de": {
                  "text": "Der Apfel fällt nicht weit vom Stamm.",
                  "gender": "-"
                },
                "en": {
                  "text": "The apple never falls far from the apple tree."
                },
                "es": {
                  "text": "De tal palo, tal astilla."
                },
                "fr": {
                  "text": "Tel père, tel fils."
                },
                "ru": {
                  "text": "Я́блоко от я́блони недалеко́ па́дает."
                }
              }
            },
            {
              "text": "een appeltje voor de dorst bewaren",
              "definition": "iets als reserve voor moeilijke tijden bewaren",
              "translations": {
                "de": {
                  "text": "einen Notgroschen behalten",
                  "gender": "-"
                },
                "en": {
                  "text": "to save for the rainy day"
                },
                "es": {
                  "text": "guardarse algo para cuando haga falta"
                },
                "fr": {
                  "text": "garder une poire pour la soif"
                },
                "ru": {
                  "text": "сохрани́ть что́-то про запа́с"
                }
              }
            },
            {
              "text": "voor een appel en een ei",
              "definition": "heel goedkoop",
              "translations": {
                "de": {
                  "text": "für ´nen Appel und ´n Ei",
                  "gender": "-"
                },
                "en": {
                  "text": "for a penny"
                },
                "es": {
                  "text": "por cuatro gordas"
                },
                "fr": {
                  "text": "pour une bouchée de pain"
                },
                "ru": {
                  "text": "о́чень дёшево"
                }
              }
            },
            {
              "text": "door de zure appel bijten",
              "definition": "iets vervelends verdragen",
              "translations": {
                "de": {
                  "text": "in den sauren Apfel beißen",
                  "gender": "-"
                },
                "en": [
                  {
                    "text": "to swallow a bitter pill"
                  },
                  {
                    "text": "to bite the bullet"
                  }
                ],
                "es": {
                  "text": "pasar un mal trago"
                },
                "fr": {
                  "text": "passer un mauvais moment"
                },
                "ru": {
                  "text": "пережи́ть что-то неприя́тное"
                }
              }
            },
            {
              "text": "appels met peren vergelijken",
              "definition": "verschillende dingen met elkaar vergelijken terwijl dat eigenlijk niet kan",
              "translations": {
                "de": {
                  "text": "Äpfel mit Birnen vergleichen",
                  "gender": "-"
                },
                "en": {
                  "text": "to compare apples and oranges"
                },
                "es": {
                  "text": "comparar peras con manzanas"
                },
                "fr": {
                  "text": "comparer des pommes et des poires"
                },
                "ru": {
                  "text": "сра́внивать ме́жду собо́й соверше́нно ра́зные ве́щи"
                }
              }
            },
            {
              "text": "appelen voor citroenen verkopen",
              "definition": "(iemand) foppen",
              "synonyms": [
                "beetnemen"
              ],
              "translations": {
                "de": {
                  "text": "Äpfel für Zitronen verkaufen",
                  "gender": "-"
                },
                "en": [
                  {
                    "text": "Appearances can be deceiving."
                  },
                  {
                    "text": "Smoke and mirrors."
                  }
                ],
                "es": {
                  "text": "darle gato por fiebre (a alguien)"
                },
                "fr": {
                  "text": "faire prendre des vessies pour des lanternes"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}