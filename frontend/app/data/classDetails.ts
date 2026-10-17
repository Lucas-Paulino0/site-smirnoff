// Gerado por scripts/gerar-classes.py a partir das configurações do servidor
// (RPGClasses, RPGCore, RPGItems e classes_info.yml). Não edite à mão: rode o
// script de novo quando as classes mudarem no jogo.

import type { ClassDetails } from "./classes";

export const CLASS_DETAILS: Record<string, ClassDetails> = {
  "archer": {
    "level": 1,
    "description": "Ataca de longe com arco e flechas. Rola para fugir, dispara saraivadas e chuvas de flechas e termina com um tiro devastador.",
    "stats": [
      {
        "name": "Destreza",
        "value": 10
      },
      {
        "name": "Agilidade",
        "value": 3
      },
      {
        "name": "Estamina",
        "value": 2
      }
    ],
    "skills": {
      "base": {
        "name": "Combo Explosivo",
        "text": "Do 1º ao 3º golpe: rola na direção em que anda e dispara uma flecha à frente. 4º golpe: salta e dispara uma flecha carregada que abre um tremor onde cai. Emboscada: o primeiro acerto em cada inimigo causa +50% de dano.",
        "details": [
          "Dano base 4 por flecha · tremor 6 (raio 5, até 10 alvos)"
        ]
      },
      "corePassives": [],
      "bar": [
        {
          "name": "Tiro Evasivo",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Salta para trás e dispara 2 flechas que se abrem, 3 vezes seguidas.",
          "details": [
            "Dano base 4 por flecha · 6 flechas · 1 alvo por flecha"
          ],
          "upgrades": [
            {
              "name": "Estilhaços",
              "points": 1,
              "text": "Cada flecha estilhaça e fere quem está perto do impacto.",
              "details": [
                "Alvos por flecha 1 → 3 (raio 3)"
              ]
            },
            {
              "name": "Ponta Afiada",
              "points": 2,
              "text": "As flechas do salto acertam com mais força.",
              "details": [
                "Dano base 4 → 6,5 por flecha"
              ]
            }
          ]
        },
        {
          "name": "Saraivada de Flechas",
          "slot": 2,
          "cooldown": 13,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Dispara um leque de flechas à frente, empurrando os inimigos. Depois carrega uma rajada mais forte que abre uma ruptura em leque: os inimigos são empurrados e atordoados.",
          "details": [
            "Leque: dano base 4 (raio 4, até 10 alvos)",
            "Rajada: 5 flechas, dano base 6 (raio 3), atordoa 2 s"
          ],
          "upgrades": [
            {
              "name": "Ruptura Ampla",
              "points": 1,
              "text": "A ruptura da rajada alcança mais inimigos.",
              "details": [
                "Raio de acerto da rajada 3 → 4 blocos"
              ]
            },
            {
              "name": "Rajada Forte",
              "points": 2,
              "text": "O leque e a rajada ficam mais fortes.",
              "details": [
                "Dano base do leque 4 → 6,5 · da rajada 6 → 9,75"
              ]
            }
          ]
        },
        {
          "name": "Chuva Perfurante",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Dispara várias flechas para o céu. Uma chuva de flechas cai em linha reta à frente, perfurando todos os inimigos no caminho.",
          "details": [
            "Dano base 4 por acerto · raio 5 · até 10 alvos"
          ],
          "upgrades": [
            {
              "name": "Chão Cravado",
              "points": 1,
              "text": "As flechas cravam os inimigos no chão.",
              "details": [
                "Lentidão I por 3 s em cada inimigo atingido"
              ]
            },
            {
              "name": "Chuva Pesada",
              "points": 2,
              "text": "A chuva de flechas cai com mais força.",
              "details": [
                "Dano base 4 → 6,5 por acerto"
              ]
            }
          ]
        },
        {
          "name": "Flechas Rápidas",
          "slot": 4,
          "cooldown": 9,
          "cost": {
            "resource": "estamina",
            "amount": 44
          },
          "points": 1,
          "text": "Dispara 5 flechas seguidas. Após uma breve pausa, dispara rapidamente 3 flechas fortes que perfuram os inimigos.",
          "details": [
            "Dano base 5 ×5 · perfurantes 7,5 ×3 · 1 alvo por flecha"
          ],
          "upgrades": [
            {
              "name": "Transpassar",
              "points": 1,
              "text": "As flechas perfurantes atravessam mais inimigos.",
              "details": [
                "Alvos por flecha perfurante 1 → 3 (raio 3)"
              ]
            },
            {
              "name": "Tiro Firme",
              "points": 2,
              "text": "Todas as flechas da sequência acertam mais forte.",
              "details": [
                "Dano base 5 → 8 · perfurantes 7,5 → 12"
              ]
            }
          ]
        },
        {
          "name": "Tiro da Destruição",
          "slot": 5,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Concentra energia na ponta da flecha e dispara uma flecha destrutiva à frente, arrasando tudo no caminho.",
          "details": [
            "Dano base 75 · raio 6 · até 5 alvos"
          ],
          "upgrades": [
            {
              "name": "Devastação",
              "points": 1,
              "text": "A flecha destrutiva arrasa mais inimigos.",
              "details": [
                "Alvos 5 → 8"
              ]
            },
            {
              "name": "Aniquilação",
              "points": 2,
              "text": "A energia concentrada fica ainda mais destrutiva.",
              "details": [
                "Dano base 75 → 120"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Recuo Ágil",
          "points": 2,
          "text": "Ao agachar, você ganha impulso para reposicionar.",
          "details": [
            "Velocidade II por 3 s ao agachar · Recarga 8 s"
          ],
          "parent": "Tiro Evasivo"
        },
        {
          "name": "Marca do Caçador",
          "points": 2,
          "text": "Quem a rajada acerta fica marcado e enfraquecido.",
          "details": [
            "Brilho e Fraqueza I por 5 s nos alvos da rajada"
          ],
          "parent": "Saraivada de Flechas"
        },
        {
          "name": "Fôlego do Caçador",
          "points": 2,
          "text": "Cada abate renova o fôlego do caçador.",
          "details": [
            "Cura 10 de vida por abate · Recarga 1 s"
          ],
          "parent": "Chuva Perfurante"
        },
        {
          "name": "Flechas Pesadas",
          "points": 2,
          "text": "As flechas perfurantes seguram os inimigos no lugar.",
          "details": [
            "Lentidão II por 2 s em quem as flechas perfurantes acertam"
          ],
          "parent": "Flechas Rápidas"
        }
      ],
      "paths": [
        {
          "name": "Flecha Desperta",
          "points": 3,
          "text": "A cada 5 s, sua próxima flecha desperta e fere de novo.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto de flecha, 1 a cada 5 s"
          ]
        },
        {
          "name": "Guarda do Vendaval",
          "points": 3,
          "text": "Ao sofrer dano, o vento te envolve e te protege.",
          "details": [
            "Imune a dano por 1 s e cura 6 de vida · Recarga 10 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Arco",
      "damage": "de projétil",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "warrior": {
    "level": 1,
    "description": "Lutador corpo a corpo que aguenta pancada. Salta sobre os inimigos, gira em redemoinhos e desfere golpes de fúria.",
    "stats": [
      {
        "name": "Força",
        "value": 10
      },
      {
        "name": "Vida",
        "value": 3
      },
      {
        "name": "Estamina",
        "value": 2
      }
    ],
    "skills": {
      "base": {
        "name": "Combo Brutal",
        "text": "Uma cadeia brutal de golpes: 1º e 2º, cortes largos à frente; 3º, um avanço curto com estocada; 4º, um giro vertical que lança os inimigos ao ar; 5º, um golpe final esmagando o chão.",
        "details": [
          "Dano base 4 por golpe · raio 3 · até 6 alvos"
        ]
      },
      "corePassives": [
        {
          "name": "Instinto de Baluarte",
          "points": 0,
          "text": "Ao sofrer dano, você se fortifica.",
          "details": [
            "Resistência III por 5 s · Recarga 10 s"
          ]
        },
        {
          "name": "Barreira de Sangue",
          "points": 1,
          "text": "Segure agachar para erguer uma barreira de sangue que bloqueia até 5 golpes. A cada golpe bloqueado, um pulso de sangue fere os inimigos próximos.",
          "details": [
            "Duração 8 s · pulso de dano base 4 (raio 5,5, até 8 alvos) · Recarga 9 s"
          ]
        }
      ],
      "bar": [
        {
          "name": "Salto do Berserker",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Varre o chão com a espada, abrindo uma linha de ruptura. Depois salta e esmaga a área para onde você olha.",
          "details": [
            "Linha: dano base 4 (raio 2,5) · Impacto: dano base 4 (raio 3) · até 6 alvos"
          ],
          "upgrades": [
            {
              "name": "Impacto Amplo",
              "points": 1,
              "text": "A queda esmaga uma área maior.",
              "details": [
                "Raio do impacto 3 → 4 blocos"
              ]
            },
            {
              "name": "Queda Brutal",
              "points": 3,
              "text": "A linha e a queda acertam com mais força.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Redemoinho Implacável",
          "slot": 2,
          "cooldown": 19,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Gira num redemoinho de cortes por um tempo. Depois recua e avança com duas estocadas de longo alcance.",
          "details": [
            "Giro: dano base 4 ×5 (raio 5,5, até 8) · Estocadas: 4 ×2 (raio 3)"
          ],
          "upgrades": [
            {
              "name": "Estocada Longa",
              "points": 1,
              "text": "As estocadas finais alcançam mais inimigos.",
              "details": [
                "Raio das estocadas 3 → 4 blocos"
              ]
            },
            {
              "name": "Giro Furioso",
              "points": 3,
              "text": "O giro e as estocadas cortam mais fundo.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Golpe Cruel",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Fica parado reunindo fúria e a libera num corte ascendente que traça uma longa linha de ruptura destrutiva à frente.",
          "details": [
            "Dano base 6 · raio 2,5 · até 9 alvos"
          ],
          "upgrades": [
            {
              "name": "Ruptura Larga",
              "points": 1,
              "text": "A linha de ruptura atinge mais longe dos lados.",
              "details": [
                "Raio de acerto 2,5 → 3 blocos"
              ]
            },
            {
              "name": "Ódio Profundo",
              "points": 3,
              "text": "Toda a fúria acumulada sai num só golpe.",
              "details": [
                "Dano base 6 → 9,5"
              ]
            }
          ]
        },
        {
          "name": "Golpe da Fúria",
          "slot": 4,
          "cooldown": 26,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Sua espada espiritual cresce e corta 4 vezes à frente. Você salta, esmaga o chão abrindo uma fenda e volta à posição inicial; a fenda explode e atordoa os inimigos na área.",
          "details": [
            "Cortes: dano base 8 ×4 · fenda 8 · explosão 16 e atordoa 4 s (raio 4)"
          ],
          "upgrades": [
            {
              "name": "Explosão Ampla",
              "points": 1,
              "text": "A explosão da fenda alcança mais inimigos.",
              "details": [
                "Raio da explosão 4 → 5 blocos"
              ]
            },
            {
              "name": "Fúria Total",
              "points": 3,
              "text": "Cada golpe da fúria fica mais devastador.",
              "details": [
                "Dano base 8 → 13 (explosão 16 → 26)"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Sede de Sangue",
          "points": 2,
          "text": "Cada abate alimenta sua sede de sangue.",
          "details": [
            "Cura 10 de vida por abate · Recarga 1 s"
          ],
          "parent": "Salto do Berserker"
        },
        {
          "name": "Lâminas Pesadas",
          "points": 2,
          "text": "Os cortes do redemoinho deixam os inimigos enfraquecidos.",
          "details": [
            "Fraqueza I por 3 s em quem o redemoinho acerta"
          ],
          "parent": "Redemoinho Implacável"
        },
        {
          "name": "Golpe Vampírico",
          "points": 2,
          "text": "O Golpe Cruel drena a vida de quem ele atinge.",
          "details": [
            "Cura 3 de vida por golpe que acerta"
          ],
          "parent": "Golpe Cruel"
        }
      ],
      "paths": [
        {
          "name": "Caminho do Berserker",
          "points": 3,
          "text": "A cada 5 s, seu próximo golpe é tomado pela fúria.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho do Baluarte",
          "points": 3,
          "text": "Ao sofrer dano, você revida na hora.",
          "details": [
            "Contra-ataque de dano base 8 no agressor e cura 4 · Recarga 8 s"
          ]
        }
      ],
      "totalCost": 33,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Espada",
      "damage": "físico",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "rogue": {
    "level": 1,
    "description": "Ágil e mortal de perto. Retalha com lâminas, morde e arremessa adagas, e avança em investidas explosivas.",
    "stats": [
      {
        "name": "Destreza",
        "value": 10
      },
      {
        "name": "Agilidade",
        "value": 3
      },
      {
        "name": "Estamina",
        "value": 2
      }
    ],
    "skills": {
      "base": {
        "name": "Fatiar e Retalhar",
        "text": "Uma cadeia rápida de golpes de lâmina. 1º e 2º golpes: um corte rápido à frente e um corte giratório que acerta duas vezes. 3º golpe: um avanço curto com uma estocada, seguida de um corte para cima e um corte para baixo.",
        "details": [
          "Dano base 4 por acerto · raio 3 · até 6 alvos"
        ]
      },
      "corePassives": [
        {
          "name": "Percepção Espacial",
          "points": 0,
          "text": "Detecta os inimigos próximos e os destaca.",
          "details": [
            "Brilho nos inimigos a até 15 blocos · renova a cada 0,5 s"
          ]
        }
      ],
      "bar": [
        {
          "name": "Devorar",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "No chão, libera dois cortes horizontais simultâneos para fora, rasgando com força selvagem, e cura você.",
          "details": [
            "Dano base 5 · raio 3 · até 6 alvos · cura 5 de vida"
          ],
          "upgrades": [
            {
              "name": "Fauces Amplas",
              "points": 1,
              "text": "Os cortes de Devorar alcançam mais inimigos.",
              "details": [
                "Alvos 6 → 9"
              ]
            },
            {
              "name": "Voracidade",
              "points": 2,
              "text": "Os cortes de Devorar rasgam mais fundo.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Mordida Cravada",
          "slot": 2,
          "cooldown": 14,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "No chão, avança sobre os inimigos e desfere um corte horizontal com as duas lâminas, cravando-as nos alvos. Depois salta para trás, puxando as lâminas e rasgando os inimigos, que sangram.",
          "details": [
            "Dano base 4 ×2 · raio 3 · até 6 alvos",
            "Sangramento: 6 golpes de dano base 1 em 4 s"
          ],
          "upgrades": [
            {
              "name": "Presas Múltiplas",
              "points": 1,
              "text": "As lâminas se cravam em mais inimigos de uma vez.",
              "details": [
                "Alvos 6 → 9"
              ]
            },
            {
              "name": "Mordida Feroz",
              "points": 2,
              "text": "O corte e o puxão das lâminas atingem com mais força.",
              "details": [
                "Dano base 4 → 6,5 (os dois golpes)"
              ]
            }
          ]
        },
        {
          "name": "Arremesso Súbito",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Arremessa as duas lâminas girando contra um inimigo. As lâminas voltam até você depois de um tempo.",
          "details": [
            "Dano base 4 na ida e na volta · raio 3 · até 6 alvos · alcance 20"
          ],
          "upgrades": [
            {
              "name": "Giro Amplo",
              "points": 1,
              "text": "As lâminas giram mais largo e atingem uma área maior.",
              "details": [
                "Raio 3 → 4 (na ida e na volta)"
              ]
            },
            {
              "name": "Lâminas Pesadas",
              "points": 2,
              "text": "As lâminas arremessadas acertam com mais peso.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Corte Frenético",
          "slot": 4,
          "cooldown": 21,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Salta e corta tudo ao redor ainda no ar, e repete os cortes ao descer até o chão, sem sofrer dano de queda.",
          "details": [
            "Dano base 5 · 3 cortes na subida e 3 na descida · raio 6 · até 8 alvos"
          ],
          "upgrades": [
            {
              "name": "Tempestade de Lâminas",
              "points": 1,
              "text": "O frenesi de cortes alcança mais inimigos.",
              "details": [
                "Alvos 8 → 12 (na subida e na descida)"
              ]
            },
            {
              "name": "Cortes Selvagens",
              "points": 2,
              "text": "Cada corte atinge com mais força.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Investida Explosiva",
          "slot": 5,
          "cooldown": 31,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Inspira energia e libera uma onda de choque a seus pés, investindo em velocidade absurda e ignorando todo ataque recebido. Quem toca a investida é cortado e sangra. No fim, avança 3 vezes seguidas, cortando todos no caminho e deixando-os sangrar.",
          "details": [
            "Investida: dano base 7 ×12 (raio 4, até 8) · avanços: 7 ×3 (raio 4, até 6)",
            "Sangramento: 5 golpes de dano base 1 · imune a dano por 4,75 s"
          ],
          "upgrades": [
            {
              "name": "Investida Ampla",
              "points": 1,
              "text": "A investida corta inimigos mais distantes.",
              "details": [
                "Raio da investida 4 → 5"
              ]
            },
            {
              "name": "Fúria Bestial",
              "points": 2,
              "text": "Os cortes da investida e dos avanços ficam mais fortes.",
              "details": [
                "Dano base 7 → 11"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Banquete",
          "points": 2,
          "text": "Cada abate alimenta o caçador.",
          "details": [
            "Cura 10 de vida por abate · Recarga 1 s"
          ],
          "parent": "Devorar"
        },
        {
          "name": "Feridas Profundas",
          "points": 2,
          "text": "Quem é rasgado pelas lâminas fica enfraquecido.",
          "details": [
            "Fraqueza I por 4 s em quem o puxão acerta"
          ],
          "parent": "Mordida Cravada"
        },
        {
          "name": "Tendão Cortado",
          "points": 2,
          "text": "As lâminas cortam os tendões de quem atingem.",
          "details": [
            "Lentidão II por 2 s em quem as lâminas acertam"
          ],
          "parent": "Arremesso Súbito"
        },
        {
          "name": "Frenesi",
          "points": 2,
          "text": "Cada corte que acerta revigora você.",
          "details": [
            "Cura 2 de vida por golpe que acerta (até 6 golpes por uso)"
          ],
          "parent": "Corte Frenético"
        }
      ],
      "paths": [
        {
          "name": "Caminho da Fera",
          "points": 3,
          "text": "A cada 5 s, o próximo corte do combo libera a fera.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto de Fatiar e Retalhar, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho do Caçador",
          "points": 3,
          "text": "Ao sofrer dano, seus instintos de caçador o tiram do perigo.",
          "details": [
            "Imune a dano por 1 s e Velocidade II por 3 s · Recarga 8 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Adaga",
      "damage": "físico",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "mage": {
    "level": 1,
    "description": "Mestre das magias de gelo, vazio e fogo. Congela com nevascas, prende com correntes e faz chover meteoros.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 10
      },
      {
        "name": "Vida",
        "value": 3
      },
      {
        "name": "Mana",
        "value": 2
      }
    ],
    "skills": {
      "base": {
        "name": "Corte Arcano",
        "text": "Dispara um corte mágico que atravessa os inimigos.",
        "details": [
          "Dano base 3 em quem estiver a até 2,5 blocos de cada acerto"
        ]
      },
      "corePassives": [
        {
          "name": "Escudo Arcano",
          "points": 1,
          "text": "Você forma 2 escudos de mana; cada um anula por completo um golpe recebido e se regenera depois de um tempo.",
          "details": [
            "2 escudos · cada um bloqueia 1 golpe e volta 7 s depois de quebrar"
          ]
        }
      ],
      "bar": [
        {
          "name": "Nevasca",
          "slot": 1,
          "cooldown": 9,
          "cost": {
            "resource": "mana",
            "amount": 44
          },
          "points": 1,
          "text": "Invoca pingentes de gelo que caem sobre a área, criando uma aura gélida que deixa os inimigos lentos.",
          "details": [
            "Dano base 3 por pingente (raio 4) · até 11 pingentes em 2,5 s · Lentidão III 4 s"
          ],
          "upgrades": [
            {
              "name": "Nevasca Ampla",
              "points": 1,
              "text": "Cada pingente atinge uma área maior.",
              "details": [
                "Raio de cada impacto 4 → 5 blocos"
              ]
            },
            {
              "name": "Gelo Cortante",
              "points": 2,
              "text": "Os pingentes atingem com mais força.",
              "details": [
                "Dano base 3 → 5 por pingente"
              ]
            }
          ],
          "aimRange": 35
        },
        {
          "name": "Correntes do Vazio",
          "slot": 2,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Abre um portal do vazio no chão e invoca correntes que golpeiam o solo à sua frente 2 vezes; cada golpe abre uma fenda do vazio que puxa os inimigos.",
          "details": [
            "Dano base 4 · golpes a 5 e a 9 blocos, raio 3 · cada inimigo é atingido 1 vez"
          ],
          "upgrades": [
            {
              "name": "Fenda Ampla",
              "points": 1,
              "text": "As fendas do vazio alcançam mais inimigos ao redor.",
              "details": [
                "Raio dos golpes 3 → 4 blocos"
              ]
            },
            {
              "name": "Vazio Voraz",
              "points": 2,
              "text": "As correntes golpeiam com mais força.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Manto de Hastur",
          "slot": 3,
          "cooldown": 11,
          "cost": {
            "resource": "mana",
            "amount": 52
          },
          "points": 1,
          "text": "Invoca uma criatura sombria encapuzada que surge devagar do chão e espalha uma aura de medo e cegueira sobre os inimigos próximos.",
          "details": [
            "Dano base 4 · 5 ondas em leque · Cegueira 2 s · medo (empurrão) 2 s"
          ],
          "upgrades": [
            {
              "name": "Pavor Prolongado",
              "points": 1,
              "text": "A cegueira do medo dura mais.",
              "details": [
                "Cegueira 2 → 3 s"
              ]
            },
            {
              "name": "Horror Abissal",
              "points": 2,
              "text": "As ondas de medo ferem mais fundo.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Tempestade de Meteoros",
          "slot": 4,
          "cooldown": 14,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca vários meteoros lançados contra o chão, causando explosões mortais. Você fica no círculo mágico por 4 s.",
          "details": [
            "Dano base 6 por explosão · raio 6 · até 8 meteoros"
          ],
          "upgrades": [
            {
              "name": "Impacto Amplo",
              "points": 1,
              "text": "As explosões alcançam mais longe.",
              "details": [
                "Raio das explosões 6 → 8 blocos"
              ]
            },
            {
              "name": "Fúria Ígnea",
              "points": 2,
              "text": "Os meteoros caem com mais força.",
              "details": [
                "Dano base 6 → 9,5 por explosão"
              ]
            }
          ]
        },
        {
          "name": "Devastação Arcana",
          "slot": 5,
          "cooldown": 39,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Levita no ar e forma uma área de destruição onde invoca raios que atordoam os inimigos. Depois você mergulha até o chão e invoca trovões maiores e mais duradouros em anel, que atordoam quem atingem.",
          "details": [
            "Raios: dano base 4 · raio 2 · 42 raios em 4 s · atordoa 0,75 s",
            "Trovões: dano base 4 · raio 3,5 · 5 trovões × 4 pulsos · atordoa 3 s"
          ],
          "upgrades": [
            {
              "name": "Raios Amplos",
              "points": 1,
              "text": "Raios e trovões atingem uma área maior.",
              "details": [
                "Raio dos raios 2 → 2,5 blocos · dos trovões 3,5 → 4,5 blocos"
              ]
            },
            {
              "name": "Cataclismo Arcano",
              "points": 2,
              "text": "Raios e trovões atingem com mais força.",
              "details": [
                "Dano base 4 → 6,5 (raios e trovões)"
              ]
            }
          ],
          "aimRange": 35
        }
      ],
      "passives": [
        {
          "name": "Frio Debilitante",
          "points": 2,
          "text": "O frio da nevasca enfraquece quem ela atinge.",
          "details": [
            "Fraqueza I por 3 s em quem os pingentes acertam"
          ],
          "parent": "Nevasca"
        },
        {
          "name": "Vazio Faminto",
          "points": 2,
          "text": "O vazio devolve a você a mana de quem ele agarra.",
          "details": [
            "Recupera 5 de mana por golpe que acerta (até 2 por uso)"
          ],
          "parent": "Correntes do Vazio"
        },
        {
          "name": "Véu de Hastur",
          "points": 2,
          "text": "Ao sofrer dano, o véu de Hastur esconde você.",
          "details": [
            "Imune a dano por 1 s, invisível por 2 s e cega o agressor por 2 s · Recarga 12 s"
          ],
          "parent": "Manto de Hastur"
        },
        {
          "name": "Círculo Protetor",
          "points": 2,
          "text": "O círculo mágico protege você enquanto conjura.",
          "details": [
            "Resistência II por 4 s ao conjurar a Tempestade de Meteoros"
          ],
          "parent": "Tempestade de Meteoros"
        }
      ],
      "paths": [
        {
          "name": "Caminho Arcano",
          "points": 3,
          "text": "A cada 5 s, seu próximo Corte Arcano libera uma explosão arcana.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto do Corte Arcano, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho do Vazio",
          "points": 3,
          "text": "Cada abate alimenta você com a energia do vazio.",
          "details": [
            "Cura 10 de vida e recupera 10 de mana por abate · Recarga 5 s"
          ]
        }
      ],
      "totalCost": 35,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Cajado",
      "damage": "mágico",
      "twoItems": false
    },
    "resource": "mana"
  },
  "phoenix_hunter": {
    "level": 50,
    "description": "Caçador que atira penas de fênix em chamas. Ergue totens de fogo, solta barragens de lava e pode renascer das cinzas.",
    "stats": [
      {
        "name": "Destreza",
        "value": 14
      },
      {
        "name": "Agilidade",
        "value": 4
      },
      {
        "name": "Estamina",
        "value": 3
      }
    ],
    "skills": {
      "base": {
        "name": "Penas Flamejantes",
        "text": "Dispara uma pena de fênix. A cada 4º disparo, lança uma bola de fogo que cria uma explosão horizontal.",
        "details": [
          "Pena: dano base 3 · explosão: dano base 3 (raio 3, até 3 alvos)"
        ]
      },
      "corePassives": [
        {
          "name": "Nascido das Chamas",
          "points": 1,
          "text": "Inimigos atingidos pelas suas habilidades queimam. Você resiste a fogo e lava.",
          "details": [
            "Queima: dano base 1 por segundo, por 3 a 7 s · Resistência ao Fogo"
          ]
        }
      ],
      "bar": [
        {
          "name": "Dança das Cinzas",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Recua num salto e lança cinzas flamejantes que perseguem o inimigo mais próximo.",
          "details": [
            "6 cinzas · dano base 3 cada · alvo a até 20 blocos"
          ],
          "upgrades": [
            {
              "name": "Cinzas Dispersas",
              "points": 1,
              "text": "Cada cinza atinge também os inimigos ao redor do alvo.",
              "details": [
                "Alvos por cinza 1 → 3 (raio 3)"
              ]
            },
            {
              "name": "Cinzas Ardentes",
              "points": 2,
              "text": "As cinzas e a onda de fogo da forma de fênix ferem mais.",
              "details": [
                "Dano base 3 → 5 (onda de fogo: 5 → 8)"
              ]
            }
          ]
        },
        {
          "name": "Convergência de Chamas",
          "slot": 2,
          "cooldown": 10,
          "cost": {
            "resource": "estamina",
            "amount": 48
          },
          "points": 1,
          "text": "Dispara 3 penas que se abrem em 3 direções e se encontram no fim, criando uma forte explosão que arremessa os inimigos.",
          "details": [
            "Penas: dano base 3 · explosão: dano base 7 (raio 5, até 7 alvos)"
          ],
          "upgrades": [
            {
              "name": "Explosão Ampla",
              "points": 1,
              "text": "A explosão final alcança mais longe.",
              "details": [
                "Raio da explosão 5 → 6,5 blocos"
              ]
            },
            {
              "name": "Chamas Intensas",
              "points": 2,
              "text": "As penas e a explosão ferem mais.",
              "details": [
                "Dano base 3 → 5 (explosão: 7 → 11)"
              ]
            }
          ]
        },
        {
          "name": "Totem da Fênix",
          "slot": 3,
          "cooldown": 18,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca um totem da fênix por 10 s. Acertar o totem com suas habilidades solta uma onda de chamas ao redor dele; no 5º acerto, ele explode em anel e arremessa os inimigos.",
          "details": [
            "Onda: dano base 3 (raio 6, até 5 alvos) · explosão: 7 (raio 9)"
          ],
          "upgrades": [
            {
              "name": "Onda Voraz",
              "points": 1,
              "text": "A onda de chamas do totem atinge mais inimigos.",
              "details": [
                "Alvos da onda 5 → 8"
              ]
            },
            {
              "name": "Totem Ardente",
              "points": 2,
              "text": "A onda e a explosão do totem ferem mais.",
              "details": [
                "Dano base 3 → 5 (explosão: 7 → 11)"
              ]
            }
          ],
          "aimRange": 25
        },
        {
          "name": "Barragem Piroclástica",
          "slot": 4,
          "cooldown": 15,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Espalha penas de fênix ao seu redor e salta para trás. Dispara todas para onde você olha e mergulha, criando uma onda de chamas que queima e empurra os inimigos.",
          "details": [
            "Até 7 penas · dano base 3 cada · onda: dano base 3 (raio 7)"
          ],
          "upgrades": [
            {
              "name": "Penas Estilhaçadas",
              "points": 1,
              "text": "Cada pena atinge também os inimigos ao redor do alvo.",
              "details": [
                "Alvos por pena 1 → 3 (raio 2,5)"
              ]
            },
            {
              "name": "Barragem Feroz",
              "points": 2,
              "text": "As penas e a onda de chamas ferem mais.",
              "details": [
                "Dano base 3 → 5 (onda: 3 → 5)"
              ]
            }
          ]
        },
        {
          "name": "Renascimento da Fênix",
          "slot": 5,
          "cooldown": 24,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Abre as asas e entra na forma de fênix por 10 s, ferindo e empurrando os inimigos próximos. Na forma você ganha Salto II e queda lenta, Penas Flamejantes dispara 3 penas que explodem (a cada 4º disparo, uma explosão em X) e Dança das Cinzas carrega e solta uma onda de fogo que arremessa os inimigos.",
          "details": [
            "Onda: dano base 3 (raio 8) · penas 4 · explosão em X 6 · onda de fogo 5"
          ],
          "upgrades": [
            {
              "name": "Labareda Ampla",
              "points": 1,
              "text": "A explosão ao entrar na forma de fênix alcança mais longe.",
              "details": [
                "Raio 8 → 10 blocos"
              ]
            },
            {
              "name": "Fênix Ardente",
              "points": 2,
              "text": "A explosão e as penas da forma de fênix ferem mais.",
              "details": [
                "Dano base 3 → 5 · penas 4 → 6,5 · explosão em X 6 → 9,5"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Cinzas Sufocantes",
          "points": 2,
          "text": "As cinzas sufocam quem elas atingem.",
          "details": [
            "Lentidão II por 2 s em quem a Dança das Cinzas acerta"
          ],
          "parent": "Dança das Cinzas"
        },
        {
          "name": "Explosão Abrasadora",
          "points": 2,
          "text": "A explosão final enfraquece quem ela atinge.",
          "details": [
            "Fraqueza I por 4 s em quem a explosão acerta"
          ],
          "parent": "Convergência de Chamas"
        },
        {
          "name": "Chama Guardiã",
          "points": 2,
          "text": "As chamas do totem renovam a sua vida.",
          "details": [
            "Cura 3 de vida por onda ou explosão do totem que acerta"
          ],
          "parent": "Totem da Fênix"
        },
        {
          "name": "Pouso Ígneo",
          "points": 2,
          "text": "O mergulho final queima ainda mais.",
          "details": [
            "1 golpe extra (dano base 4) na onda de chamas do pouso"
          ],
          "parent": "Barragem Piroclástica"
        }
      ],
      "paths": [
        {
          "name": "Caminho do Caçador",
          "points": 3,
          "text": "A cada 5 s, sua próxima pena acerta em cheio.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto de uma pena, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho da Fênix",
          "points": 3,
          "text": "Ao sofrer dano, você renasce das chamas.",
          "details": [
            "Cura 12 de vida e fica imune a dano por 1 s · Recarga 12 s"
          ]
        }
      ],
      "totalCost": 35,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Arco",
      "damage": "de projétil",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "barbarian": {
    "level": 50,
    "description": "Brutamontes de machado que faz sangrar. Grita para se fortalecer, salta sobre os inimigos e entra numa fúria sem fim.",
    "stats": [
      {
        "name": "Força",
        "value": 14
      },
      {
        "name": "Vida",
        "value": 4
      },
      {
        "name": "Estamina",
        "value": 3
      }
    ],
    "skills": {
      "base": {
        "name": "Lâmina da Ira",
        "text": "Golpeia o inimigo com o machado, com 10% de chance de causar sangramento.",
        "details": [
          "Dano base 3 · raio 2,5 · sangramento 1 ×3 em 3 s (10%)"
        ]
      },
      "corePassives": [
        {
          "name": "Sede de Sangue",
          "points": 1,
          "text": "Cada golpe que acerta pode curar você.",
          "details": [
            "Cura 5 de vida · 20% de chance por golpe",
            "(50% durante a Fúria Eterna)"
          ]
        }
      ],
      "bar": [
        {
          "name": "Machado Primal",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Arremessa o machado para a frente, atingindo todos os inimigos no caminho. O machado se crava ao tocar um bloco.",
          "details": [
            "Dano base 4 · raio 3 por acerto"
          ],
          "upgrades": [
            {
              "name": "Impacto Largo",
              "points": 1,
              "text": "Cada acerto do machado atinge uma área maior.",
              "details": [
                "Raio do acerto 3 → 4 blocos"
              ]
            },
            {
              "name": "Machado Bruto",
              "points": 2,
              "text": "O machado fere mais fundo.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Grito de Guerra",
          "slot": 2,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Solta um poderoso grito de guerra que aumenta sua resistência e força e provoca os inimigos próximos, puxando-os até você.",
          "details": [
            "Resistência III e Força III por 6 s",
            "Provoca e causa Lentidão I por 4 s (raio 15)"
          ],
          "upgrades": [
            {
              "name": "Brado Opressor",
              "points": 1,
              "text": "Os inimigos provocados ficam mais lentos.",
              "details": [
                "Lentidão I → II nos inimigos provocados"
              ]
            },
            {
              "name": "Intimidação",
              "points": 2,
              "text": "Os inimigos provocados ficam enfraquecidos.",
              "details": [
                "Fraqueza I por 4 s nos inimigos provocados"
              ]
            }
          ]
        },
        {
          "name": "Salto Implacável",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Salta para a frente e golpeia o chão com o machado, abrindo uma fenda em cone que puxa os inimigos próximos.",
          "details": [
            "Dano base 4 · raio 5 · só no chão"
          ],
          "upgrades": [
            {
              "name": "Fenda Ampla",
              "points": 1,
              "text": "A fenda atinge e puxa inimigos mais distantes.",
              "details": [
                "Raio 5 → 6 blocos"
              ]
            },
            {
              "name": "Queda Brutal",
              "points": 2,
              "text": "A queda esmaga com mais força.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Dois Gumes",
          "slot": 4,
          "cooldown": 16,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Desfere um amplo corte duplo que fere e faz sangrar os inimigos. O golpe é tão poderoso que você sofre o mesmo dano e sangramento.",
          "details": [
            "Dano base 6 · sangramento 1 ×5 em 5 s · raio 8",
            "Você perde 6 + 1 ×5 de vida"
          ],
          "upgrades": [
            {
              "name": "Gume Longo",
              "points": 1,
              "text": "O corte duplo conecta de mais longe.",
              "details": [
                "Alcance do golpe 2 → 2,5 blocos"
              ]
            },
            {
              "name": "Gume Cruel",
              "points": 2,
              "text": "O corte e o sangramento ferem mais.",
              "details": [
                "Dano base 6 → 9,5 · sangramento 1 → 1,5"
              ]
            }
          ]
        },
        {
          "name": "Fúria Eterna",
          "slot": 5,
          "cooldown": 26,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Libera toda a sua fúria e ganha resistência, velocidade e regeneração. Sua Lâmina da Ira fica mais forte e mais ampla, e a chance de sangramento sobe para 50%.",
          "details": [
            "Explosão: dano base 5 (raio 10)",
            "10 s de Lâmina da Ira: dano 6, raio 4, sangramento 2 ×5"
          ],
          "upgrades": [
            {
              "name": "Fúria Ampla",
              "points": 1,
              "text": "Na fúria, a Lâmina da Ira alcança mais longe.",
              "details": [
                "Raio da Lâmina da Ira na fúria 4 → 5 blocos"
              ]
            },
            {
              "name": "Onda Rubra",
              "points": 2,
              "text": "A explosão de fúria fere mais.",
              "details": [
                "Dano base da explosão 5 → 8"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Arremesso Mutilador",
          "points": 2,
          "text": "O machado aleija quem ele atinge.",
          "details": [
            "Lentidão II por 2 s nos inimigos atingidos"
          ],
          "parent": "Machado Primal"
        },
        {
          "name": "Sangue de Guerra",
          "points": 2,
          "text": "Enquanto o grito dura, a dor alimenta você.",
          "details": [
            "Cura 3 ao sofrer dano nos 6 s do grito · Recarga 1 s"
          ],
          "parent": "Grito de Guerra"
        },
        {
          "name": "Ímpeto",
          "points": 2,
          "text": "Acertar o salto renova o seu fôlego.",
          "details": [
            "Recupera 10 de estamina quando o salto acerta"
          ],
          "parent": "Salto Implacável"
        },
        {
          "name": "Banho de Sangue",
          "points": 2,
          "text": "O sangue dos inimigos fecha as suas feridas.",
          "details": [
            "Cura 4 de vida por golpe que acerta"
          ],
          "parent": "Dois Gumes"
        }
      ],
      "paths": [
        {
          "name": "Caminho da Carnificina",
          "points": 3,
          "text": "A cada 5 s, seu próximo golpe vem com toda a força.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto da",
            "Lâmina da Ira, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho Indomável",
          "points": 3,
          "text": "Ao sofrer dano, você se recusa a cair.",
          "details": [
            "Imune a dano por 1 s e cura 10 de vida · Recarga 10 s"
          ]
        }
      ],
      "totalCost": 35,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Machado",
      "damage": "físico",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "assassin": {
    "level": 50,
    "description": "Matador veloz de golpes encadeados. Investe sobre o alvo, abre flores de lâminas e encerra a luta com a última dança.",
    "stats": [
      {
        "name": "Destreza",
        "value": 14
      },
      {
        "name": "Agilidade",
        "value": 4
      },
      {
        "name": "Estamina",
        "value": 3
      }
    ],
    "skills": {
      "base": {
        "name": "Combo Letal",
        "text": "Uma cadeia implacável de golpes: 1º, um corte rápido; 2º, um corte e um giro que acerta duas vezes; 3º, recua, avança numa estocada e salta para trás; 4º, arremessa uma adaga e desce num corte duplo que racha o chão.",
        "details": [
          "Dano base 3 por golpe (4º: 4) · raio 3,5 · até 4 alvos"
        ]
      },
      "corePassives": [
        {
          "name": "Calma Mortal",
          "points": 0,
          "text": "Fique parado por 3 s para entrar em Calma Mortal: o próximo golpe de habilidade causa dano dobrado.",
          "details": [
            "Dano ×2 no próximo acerto · Recarga 5 s"
          ]
        },
        {
          "name": "Tremor Sombrio",
          "points": 1,
          "text": "Segure agachar para ficar invisível e veloz. Seu próximo ataque básico encerra o efeito e libera um tremor e um corte em X à frente, atordoando os inimigos.",
          "details": [
            "Invisibilidade e Velocidade IV por 9 s · tremor dano base 4 (raio 6,",
            "até 7 alvos, atordoa 3 s) · corte em X dano base 4 · Recarga 3 s"
          ]
        }
      ],
      "bar": [
        {
          "name": "Investida Devastadora",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Carrega a lâmina com sombras e avança uma longa distância, cortando várias vezes os inimigos no caminho. Durante a Última Dança, teleporta você para onde estiver olhando.",
          "details": [
            "Dano base 3 por corte · raio 3,5 · até 4 alvos"
          ],
          "upgrades": [
            {
              "name": "Rastro Largo",
              "points": 1,
              "text": "Cada corte da investida alcança mais inimigos.",
              "details": [
                "Alvos por corte 4 → 6"
              ]
            },
            {
              "name": "Lâmina Voraz",
              "points": 3,
              "text": "Os cortes da investida ferem mais fundo.",
              "details": [
                "Dano base 3 → 5"
              ]
            }
          ]
        },
        {
          "name": "Flor da Morte",
          "slot": 2,
          "cooldown": 26,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Puxa os inimigos com um vórtice sombrio e some. Após um instante, desfere uma rajada de cortes em área.",
          "details": [
            "Puxão: raio 5, até 8 · cortes: dano base 4 ×8 (raio 6, até 6 alvos)"
          ],
          "upgrades": [
            {
              "name": "Colheita",
              "points": 1,
              "text": "A rajada de cortes alcança mais inimigos.",
              "details": [
                "Alvos dos cortes 6 → 8"
              ]
            },
            {
              "name": "Cortes Profundos",
              "points": 3,
              "text": "Cada corte da flor fere mais fundo.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Arco Carmesim",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Recua e arremessa 3 shurikens sombrias em arco. Elas voltam até você, perfurando todos os inimigos no caminho.",
          "details": [
            "Dano base 2 na ida e na volta · raio 3 · até 4 alvos por acerto"
          ],
          "upgrades": [
            {
              "name": "Arco Largo",
              "points": 1,
              "text": "Cada shuriken acerta mais inimigos.",
              "details": [
                "Alvos por acerto 4 → 6"
              ]
            },
            {
              "name": "Shuriken Afiada",
              "points": 3,
              "text": "As shurikens cortam mais fundo.",
              "details": [
                "Dano base 2 → 3"
              ]
            }
          ]
        },
        {
          "name": "Última Dança",
          "slot": 4,
          "cooldown": 60,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca lâminas que giram e são lançadas em todas as direções. Depois ergue os inimigos próximos com cortes, figuras sombrias os retalham e você atravessa todos num último avanço; quem ainda estiver no ar explode em sangue. Durante a dança, a Investida Devastadora teleporta você.",
          "details": [
            "Dano base 2 por golpe (giro: raio 5, até 7) · explosão dano base 10"
          ],
          "upgrades": [
            {
              "name": "Valsa Ampla",
              "points": 1,
              "text": "O giro final ergue mais inimigos.",
              "details": [
                "Alvos do giro 7 → 10"
              ]
            },
            {
              "name": "Dança Rubra",
              "points": 3,
              "text": "Toda a dança corta mais fundo.",
              "details": [
                "Dano base 2 → 3 · explosão 10 → 15"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Fuga Sombria",
          "points": 2,
          "text": "Cada abate te envolve em sombras.",
          "details": [
            "Cura 8 de vida e Velocidade II por 3 s por abate · Recarga 1 s"
          ],
          "parent": "Investida Devastadora"
        },
        {
          "name": "Raízes Sombrias",
          "points": 2,
          "text": "Os cortes da Flor da Morte prendem os inimigos.",
          "details": [
            "Lentidão II por 2 s em quem os cortes acertam"
          ],
          "parent": "Flor da Morte"
        },
        {
          "name": "Reflexo Sombrio",
          "points": 2,
          "text": "Ao sofrer dano, você se esquiva nas sombras.",
          "details": [
            "Ignora o dano por 1 s e ganha Velocidade II por 2 s · Recarga 12 s"
          ],
          "parent": "Arco Carmesim"
        }
      ],
      "paths": [
        {
          "name": "Caminho da Lâmina",
          "points": 3,
          "text": "A cada 5 s, seu próximo golpe do combo corta de novo.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto do Combo Letal, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho das Sombras",
          "points": 3,
          "text": "Cada abate te leva à Calma Mortal na hora.",
          "details": [
            "Próximo golpe de habilidade com dano ×2 após um abate · Recarga 8 s"
          ]
        }
      ],
      "totalCost": 33,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Adaga",
      "damage": "físico",
      "twoItems": true
    },
    "resource": "estamina"
  },
  "ninja": {
    "level": 50,
    "description": "Guerreiro das sombras com lâminas e shurikens. Faz sangrar, some na fumaça e domina artes proibidas.",
    "stats": [
      {
        "name": "Destreza",
        "value": 14
      },
      {
        "name": "Agilidade",
        "value": 4
      },
      {
        "name": "Estamina",
        "value": 3
      }
    ],
    "skills": {
      "base": {
        "name": "Corte Sangrento",
        "text": "Um corte sangrento. A cada terceiro golpe, você executa um ataque perfurante triplo.",
        "details": [
          "Dano base 3 · perfuração 2 ×3 · Recarga 0,5 s · Sem custo"
        ]
      },
      "corePassives": [
        {
          "name": "Estado de Fluxo",
          "points": 1,
          "text": "Cada Corte Sangrento concede velocidade acumulativa. Sofrer dano zera o contador.",
          "details": [
            "Velocidade I → II → III (3 acúmulos)"
          ]
        }
      ],
      "bar": [
        {
          "name": "Laceração",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Atravessa o inimigo num avanço instantâneo, causando dano mortal momentos depois.",
          "details": [
            "Dano base 3 ×5 · 1 alvo · Recarga 8 s · Custa 40 estamina"
          ],
          "upgrades": [
            {
              "name": "Corte Múltiplo",
              "points": 1,
              "text": "O avanço corta mais inimigos ao seu redor.",
              "details": [
                "Alvos 1 → 3 (raio 4)"
              ]
            },
            {
              "name": "Corte Profundo",
              "points": 2,
              "text": "Os cortes sangrentos ficam mais fortes.",
              "details": [
                "Dano base 3 → 5 por corte"
              ]
            }
          ]
        },
        {
          "name": "Shuriken Perfurante",
          "slot": 2,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Recua com um salto e arremessa uma shuriken que ricocheteia entre inimigos até 3 vezes, deixando uma marca de shuriken.",
          "details": [
            "Dano base 3 por acerto · 4 alvos · Recarga 8 s · Custa 40 estamina"
          ],
          "upgrades": [
            {
              "name": "Ricochete Extra",
              "points": 1,
              "text": "A shuriken salta para mais um inimigo.",
              "details": [
                "Ricochetes 3 → 4 (alvos 4 → 5)"
              ]
            },
            {
              "name": "Lâmina Afiada",
              "points": 2,
              "text": "Cada acerto da shuriken fere mais fundo.",
              "details": [
                "Dano base 3 → 5 por acerto"
              ]
            }
          ]
        },
        {
          "name": "Bomba de Fumaça",
          "slot": 3,
          "cooldown": 9,
          "cost": {
            "resource": "estamina",
            "amount": 44
          },
          "points": 1,
          "text": "Arremessa uma bomba que cria uma aura de fumaça. Ela concede salto e invisibilidade a você, e cegueira e lentidão aos inimigos.",
          "details": [
            "Raio 5 · Duração 6 s · Lentidão II · Recarga 9 s · Custa 44 estamina"
          ],
          "upgrades": [
            {
              "name": "Névoa Pesada",
              "points": 1,
              "text": "A fumaça deixa os inimigos ainda mais lentos.",
              "details": [
                "Lentidão II → III"
              ]
            },
            {
              "name": "Refúgio Sombrio",
              "points": 2,
              "text": "A fumaça cura você enquanto estiver dentro dela.",
              "details": [
                "Cura 0 → 2 de vida a cada 1,25 s na fumaça"
              ]
            }
          ]
        },
        {
          "name": "Avanço Mortal",
          "slot": 4,
          "cooldown": 44,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Avança contra inimigos marcados girando sua lâmina até 4 vezes.",
          "details": [
            "Dano base 5 · Raio 5 · Recarga 44 s · Custa 60 estamina"
          ],
          "upgrades": [
            {
              "name": "Giro Amplo",
              "points": 1,
              "text": "Os giros da lâmina alcançam mais longe.",
              "details": [
                "Raio 5 → 6 blocos"
              ]
            },
            {
              "name": "Investida Letal",
              "points": 2,
              "text": "Cada giro corta com mais força.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Arte Proibida",
          "slot": 5,
          "cooldown": 37,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Entra no modo sombra e avança, perfurando os inimigos 5 vezes. Um corte giratório os lança ao ar e os corta várias vezes; o golpe final os derruba, com dano residual momentos depois.",
          "details": [
            "Dano base 3 / 4 / 3 / 5 / 2 · Recarga 37 s · Custa 60 estamina"
          ],
          "upgrades": [
            {
              "name": "Alcance Sombrio",
              "points": 1,
              "text": "Perfurações e cortes aéreos alcançam mais longe.",
              "details": [
                "Área de acerto das perfurações e dos cortes aéreos 2 → 2,5 blocos"
              ]
            },
            {
              "name": "Fúria Sombria",
              "points": 2,
              "text": "Todos os golpes da arte proibida ficam mais fortes.",
              "details": [
                "Dano base 3 / 4 / 3 / 5 / 2 → 5 / 6,5 / 5 / 8 / 3"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Hemorragia",
          "points": 2,
          "text": "Seus cortes e shurikens fazem o alvo sangrar.",
          "details": [
            "Cada alvo da Laceração e o primeiro alvo da shuriken sofrem",
            "1 golpe extra de sangramento (dano base 1) 1 s depois"
          ],
          "parent": "Laceração"
        },
        {
          "name": "Substituição",
          "points": 2,
          "text": "Ao sofrer dano, você some numa nuvem de fumaça.",
          "details": [
            "Imune a dano por 1 s, invisível e Velocidade II por 2 s · Recarga 12 s"
          ],
          "parent": "Shuriken Perfurante"
        },
        {
          "name": "Emboscada",
          "points": 2,
          "text": "Saindo da sua fumaça, o Avanço Mortal golpeia de surpresa.",
          "details": [
            "Primeiro golpe do Avanço Mortal até 3 s após a fumaça: +6 de dano base em todos os alvos"
          ],
          "parent": "Bomba de Fumaça"
        },
        {
          "name": "Colheita Sombria",
          "points": 2,
          "text": "Consumir marcas e golpes finais restaura sua vida.",
          "details": [
            "Cura 3 cada vez que o Avanço Mortal consome marcas;",
            "cura 4 quando o golpe final da Arte Proibida acerta inimigos"
          ],
          "parent": "Avanço Mortal"
        }
      ],
      "paths": [
        {
          "name": "Caminho Shinobi",
          "points": 3,
          "text": "A cada 5 s, seu próximo golpe preciso é letal.",
          "details": [
            "Próxima Laceração (todos os alvos) ou acerto de shuriken: +8 de dano base (1 a cada 5 s)"
          ]
        },
        {
          "name": "Caminho Samurai",
          "points": 3,
          "text": "Ao sofrer dano, você revida com um corte imediato.",
          "details": [
            "Contra-ataque de dano base 8 no agressor e imunidade 0,5 s · Recarga 6 s"
          ]
        }
      ],
      "totalCost": 35,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Adaga",
      "damage": "físico",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "archmage": {
    "level": 50,
    "description": "Mago que combina fogo, gelo e teleporte. Aprisiona inimigos no gelo, lança granizo e invoca um meteoro de ruína.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 14
      },
      {
        "name": "Vida",
        "value": 4
      },
      {
        "name": "Mana",
        "value": 3
      }
    ],
    "skills": {
      "base": {
        "name": "Combo Arcano",
        "text": "Uma cadeia de feitiços: 1º e 2º, uma bola de fogo que explode e queima; 3º, espinhos glaciais em leque que causam lentidão; 4º, um raio que cai onde você está olhando.",
        "details": [
          "Dano base 4 por acerto · queimadura 1 por s por 4 s · lentidão 4 s"
        ]
      },
      "corePassives": [
        {
          "name": "Barreira de Mana",
          "points": 0,
          "text": "Gera um escudo de mana que bloqueia um ataque recebido.",
          "details": [
            "Bloqueia 1 golpe · Recarga 7 s"
          ]
        }
      ],
      "bar": [
        {
          "name": "Golpe Teleporte",
          "slot": 1,
          "cooldown": 12,
          "cost": {
            "resource": "mana",
            "amount": 56
          },
          "points": 1,
          "text": "Teleporta você à frente envolto em energia trovejante. No fim, libera uma explosão de trovão que atordoa os inimigos.",
          "details": [
            "Dano base 4 · raio 5 · até 7 alvos · atordoa 2 s"
          ],
          "upgrades": [
            {
              "name": "Trovão Amplo",
              "points": 1,
              "text": "A explosão de trovão alcança mais inimigos.",
              "details": [
                "Alvos 7 → 10"
              ]
            },
            {
              "name": "Raio Potente",
              "points": 2,
              "text": "A explosão de trovão atinge com mais força.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Barragem Flamejante",
          "slot": 2,
          "cooldown": 24,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca 6 círculos de fogo atrás de você, cada um disparando uma bola de fogo que explode e queima. Depois carrega uma grande bola de fogo e a lança à frente em leque.",
          "details": [
            "Bolas de fogo: dano base 4 ×6 (raio 3, até 3) · rajada: 4 (raio 4, até 7)",
            "Queimadura 1 por s por 4 s"
          ],
          "upgrades": [
            {
              "name": "Chamas Largas",
              "points": 1,
              "text": "Cada bola de fogo atinge mais inimigos.",
              "details": [
                "Alvos por bola de fogo 3 → 5"
              ]
            },
            {
              "name": "Inferno",
              "points": 2,
              "text": "As bolas de fogo e a rajada queimam mais forte.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Prisão Criogênica",
          "slot": 3,
          "cooldown": 35,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Cria uma aura de gelo no chão que explode num prisma gigante. Os inimigos na área ficam presos num cristal de gelo, que se estilhaça depois de um tempo e causa dano extra. Ferir um inimigo congelado quebra o cristal mais cedo.",
          "details": [
            "Dano base 5 · raio 7 · até 15 alvos · congela 6 s · estilhaço 5"
          ],
          "upgrades": [
            {
              "name": "Prisão Ampla",
              "points": 1,
              "text": "A prisão aprisiona mais inimigos de uma vez.",
              "details": [
                "Alvos 15 → 20"
              ]
            },
            {
              "name": "Frio Cortante",
              "points": 2,
              "text": "A explosão do prisma atinge com mais força.",
              "details": [
                "Dano base da explosão 5 → 8"
              ]
            }
          ],
          "aimRange": 25
        },
        {
          "name": "Lança de Granizo",
          "slot": 4,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Puxa uma aura de gelo à sua frente, atraindo os inimigos por 1,5 s. Depois ergue 3 enormes espinhos de gelo à frente, que ferem e causam lentidão.",
          "details": [
            "Dano base 5 por espinho · raio 6 · até 5 alvos · lentidão 5 s"
          ],
          "upgrades": [
            {
              "name": "Pico Amplo",
              "points": 1,
              "text": "Cada espinho atinge mais inimigos.",
              "details": [
                "Alvos por espinho 5 → 7"
              ]
            },
            {
              "name": "Granizo Feroz",
              "points": 2,
              "text": "Os espinhos perfuram mais fundo.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Meteoro da Ruína",
          "slot": 5,
          "cooldown": 26,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Levita devagar enquanto forma um enorme meteoro acima de você e o lança contra o chão, abrindo uma ruptura em cruz de fogo ardente. Quem toca o fogo da ruptura é queimado.",
          "details": [
            "Dano base 20 · raio 10 · até 10 alvos · queimadura 3 por s por 7 s"
          ],
          "upgrades": [
            {
              "name": "Cratera",
              "points": 1,
              "text": "O impacto do meteoro atinge mais inimigos.",
              "details": [
                "Alvos 10 → 14"
              ]
            },
            {
              "name": "Cataclismo",
              "points": 2,
              "text": "O meteoro cai com força devastadora.",
              "details": [
                "Dano base 20 → 32"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Sifão Arcano",
          "points": 2,
          "text": "Cada abate drena energia vital para você.",
          "details": [
            "Cura 8 de vida por abate · Recarga 1 s"
          ],
          "parent": "Golpe Teleporte"
        },
        {
          "name": "Chamas Abrasadoras",
          "points": 2,
          "text": "As bolas de fogo enfraquecem quem atingem.",
          "details": [
            "Fraqueza I por 3 s em quem as bolas de fogo acertam"
          ],
          "parent": "Barragem Flamejante"
        },
        {
          "name": "Geada",
          "points": 2,
          "text": "O frio da prisão continua depois que o cristal some.",
          "details": [
            "Lentidão II por 8 s em quem a prisão acerta"
          ],
          "parent": "Prisão Criogênica"
        },
        {
          "name": "Égide Arcana",
          "points": 2,
          "text": "Ao sofrer dano, uma égide arcana protege você.",
          "details": [
            "Resistência I por 3 s · Recarga 12 s"
          ],
          "parent": "Lança de Granizo"
        }
      ],
      "paths": [
        {
          "name": "Caminho do Arquimago",
          "points": 3,
          "text": "A cada 5 s, sua próxima bola de fogo do combo explode de novo.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto de bola de fogo, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho Elemental",
          "points": 3,
          "text": "Ao sofrer dano, você revida com gelo arcano.",
          "details": [
            "Dano base 8 no agressor e Lentidão II por 2 s · Recarga 8 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Cajado",
      "damage": "mágico",
      "twoItems": false
    },
    "resource": "mana"
  },
  "gunslinger": {
    "level": 100,
    "description": "Pistoleiro de tiros rápidos e precisos. Marca os alvos, superaquece as armas e executa os inimigos com rajadas certeiras.",
    "stats": [
      {
        "name": "Destreza",
        "value": 18
      },
      {
        "name": "Agilidade",
        "value": 5
      },
      {
        "name": "Estamina",
        "value": 4
      }
    ],
    "skills": {
      "base": {
        "name": "Combo Perfurante",
        "text": "Uma sequência de tiros que cresce a cada golpe: 1º, um tiro preciso; 2º, dois tiros rápidos; 3º, seis tiros seguidos; 4º, carrega e dispara uma bala de choque que perfura os inimigos e te empurra para trás. Superaquecido, vira o Canhão de Chamas: uma rajada explosiva em linha reta que incendeia o caminho.",
        "details": [
          "Dano base 3 / 3 / 2 por tiro, 1 alvo · 4º golpe 5, até 3 alvos",
          "Canhão de Chamas: dano base 5, até 3 alvos · queimadura 1/s por 4 s"
        ]
      },
      "corePassives": [
        {
          "name": "Credo do Atirador",
          "points": 1,
          "text": "Suas balas causam mais dano conforme a distância percorrida: quanto mais longe o tiro, mais mortal o impacto.",
          "details": [
            "Dano das balas ×0,8 até 3 blocos, +0,1 a cada 3 blocos, ×1,3 além de 15",
            "Sem o Credo: ×0,8 em qualquer distância"
          ]
        }
      ],
      "bar": [
        {
          "name": "Rajada Infernal",
          "slot": 1,
          "cooldown": 13,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Carrega e libera uma rajada de escopeta larga e de longo alcance. Atinge os inimigos em leque, os incendeia e os arremessa para longe, e o coice te empurra para trás. Só no chão.",
          "details": [
            "Dano base 6 · 5 chumbos em leque · raio 3 por acerto, até 7 alvos",
            "Queimadura: dano base 1 por segundo, 4 s"
          ],
          "upgrades": [
            {
              "name": "Leque Amplo",
              "points": 1,
              "text": "Cada chumbo espalha o impacto por uma área maior.",
              "details": [
                "Raio de acerto por chumbo 3 → 4 blocos"
              ]
            },
            {
              "name": "Pólvora Extra",
              "points": 2,
              "text": "Mais pólvora em cada cartucho.",
              "details": [
                "Dano base 6 → 9,5"
              ]
            }
          ]
        },
        {
          "name": "Marca da Morte",
          "slot": 2,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Marca até 9 inimigos a até 30 blocos. Após um breve atraso, balas de execução atingem cada alvo marcado. Só no chão.",
          "details": [
            "Dano base 5 por alvo marcado · até 9 alvos (raio 30)"
          ],
          "upgrades": [
            {
              "name": "Mira Dupla",
              "points": 1,
              "text": "Cada marcação mira dois inimigos de uma vez.",
              "details": [
                "Alvos marcados até 9 → 18"
              ]
            },
            {
              "name": "Tiro Letal",
              "points": 2,
              "text": "As balas de execução acertam com mais força.",
              "details": [
                "Dano base 5 → 8 por alvo marcado"
              ]
            }
          ]
        },
        {
          "name": "Superaquecimento",
          "slot": 3,
          "cooldown": 18,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Sua arma superaquece por 10 segundos. Você fica com Lentidão II e o Combo Perfurante vira o Canhão de Chamas.",
          "details": [
            "Duração 10 s · Canhão de Chamas: dano base 5, até 3 alvos por acerto",
            "Queimadura do canhão: dano base 1 por segundo, 4 s"
          ],
          "upgrades": [
            {
              "name": "Refrigeração",
              "points": 1,
              "text": "O calor da arma pesa menos nos seus passos.",
              "details": [
                "Lentidão II → I durante o Superaquecimento"
              ]
            },
            {
              "name": "Brasa Vital",
              "points": 2,
              "text": "O Canhão de Chamas devolve vida a cada acerto.",
              "details": [
                "Cura 3 de vida por golpe que acerta do Canhão de Chamas"
              ]
            }
          ]
        },
        {
          "name": "Barragem Celeste",
          "slot": 4,
          "cooldown": 30,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Atira para o alto e chama 7 mísseis sobre inimigos aleatórios próximos. Cada míssil explode e incendeia os alvos no impacto.",
          "details": [
            "Dano base 5 por míssil · raio 4, até 10 alvos · alcance 20",
            "Queimadura: dano base 1 por segundo, 4 s"
          ],
          "upgrades": [
            {
              "name": "Salva Dupla",
              "points": 1,
              "text": "Cada disparo chama mísseis sobre dois inimigos diferentes.",
              "details": [
                "Mísseis por disparo 1 → 2 (até 7 → 14 mísseis)"
              ]
            },
            {
              "name": "Carga Explosiva",
              "points": 2,
              "text": "Cada míssil leva mais explosivo.",
              "details": [
                "Dano base 5 → 8 por míssil"
              ]
            }
          ]
        },
        {
          "name": "Execução Escarlate",
          "slot": 5,
          "cooldown": 38,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Cria uma grande zona de ataque onde o tiro acerta. Uma chuva de balas castiga os inimigos dentro dela por 4 s e termina com 8 mísseis enormes que explodem e incendeiam toda a zona.",
          "details": [
            "47 balas: dano base 4, raio 3, até 3 alvos · zona de 22 × 22 blocos",
            "8 mísseis: dano base 12, raio 6,5, até 15 alvos · queimadura 1/s por 7 s"
          ],
          "upgrades": [
            {
              "name": "Balas Dispersas",
              "points": 1,
              "text": "Cada bala da chuva atinge mais inimigos.",
              "details": [
                "Alvos por bala 3 → 5"
              ]
            },
            {
              "name": "Juízo Final",
              "points": 2,
              "text": "A zona inteira desaba com mais força.",
              "details": [
                "Dano base das balas 4 → 6,5 · dos mísseis 12 → 19"
              ]
            }
          ],
          "aimRange": 20
        }
      ],
      "passives": [
        {
          "name": "Chumbo Pesado",
          "points": 2,
          "text": "Quem a rajada acerta fica pesado demais para voltar rápido.",
          "details": [
            "Lentidão II por 2 s em cada inimigo atingido"
          ],
          "parent": "Rajada Infernal"
        },
        {
          "name": "Recompensa",
          "points": 2,
          "text": "Cada abate paga a sua recompensa.",
          "details": [
            "Cura 10 de vida por abate · Recarga 1 s"
          ],
          "parent": "Marca da Morte"
        },
        {
          "name": "Couraça Térmica",
          "points": 2,
          "text": "Superaquecido, o calor da arma endurece a sua guarda.",
          "details": [
            "Ao sofrer dano superaquecido: Resistência I por 2 s · Recarga 1 s"
          ],
          "parent": "Superaquecimento"
        },
        {
          "name": "Sinalizador",
          "points": 2,
          "text": "Os mísseis deixam marcado e enfraquecido quem atingem.",
          "details": [
            "Brilho e Fraqueza I por 4 s nos alvos dos mísseis"
          ],
          "parent": "Barragem Celeste"
        }
      ],
      "paths": [
        {
          "name": "Caminho do Executor",
          "points": 3,
          "text": "A cada 5 s, a sua próxima bala que acerta golpeia de novo.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto de bala, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho do Duelista",
          "points": 3,
          "text": "Ao sofrer dano, você saca e revida com um tiro no agressor.",
          "details": [
            "Dano base 8 no agressor e imune a dano por 0,5 s · Recarga 8 s"
          ]
        }
      ],
      "totalCost": 35,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Arma de fogo",
      "damage": "de projétil",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "paladin": {
    "level": 100,
    "description": "Guerreiro sagrado de martelo. Prende e arremessa os inimigos, se protege com escudos celestiais e resiste até o fim.",
    "stats": [
      {
        "name": "Força",
        "value": 18
      },
      {
        "name": "Vida",
        "value": 5
      },
      {
        "name": "Estamina",
        "value": 4
      }
    ],
    "skills": {
      "base": {
        "name": "Golpe Sagrado",
        "text": "Desfere um corte sagrado com o martelo. A cada 3º golpe, arremessa os inimigos para o alto.",
        "details": [
          "Dano base 3 (3º golpe: 4 e arremessa) · área de 3 blocos à frente"
        ]
      },
      "corePassives": [
        {
          "name": "Aura Radiante",
          "points": 1,
          "text": "Cada habilidade usada acumula um anel sagrado ao seu redor. No 4º acúmulo, uma aura radiante cura você e os aliados próximos.",
          "details": [
            "Cura 3 em você e nos aliados num raio de 6 · depois, 5 s sem acúmulos"
          ]
        }
      ],
      "bar": [
        {
          "name": "Vontade Inquebrável",
          "slot": 1,
          "cooldown": 10,
          "cost": {
            "resource": "estamina",
            "amount": 48
          },
          "points": 1,
          "text": "Invoca um escudo sagrado à sua frente, avança e empurra os inimigos, atordoando-os. Você fica imune a dano no avanço.",
          "details": [
            "Dano base 4 · área de 2 blocos · atordoa 2 s"
          ],
          "upgrades": [
            {
              "name": "Investida Ampla",
              "points": 1,
              "text": "O golpe do escudo atinge uma área maior.",
              "details": [
                "Área do golpe 2 → 2,5 blocos"
              ]
            },
            {
              "name": "Escudo Pesado",
              "points": 2,
              "text": "O golpe do escudo fere mais.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Selo Aprisionador",
          "slot": 2,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Prende um inimigo com correntes e invoca uma lança sagrada que perfura e marca os inimigos presos.",
          "details": [
            "Prende 1 alvo por 3 s (alcance 15) · lança: dano base 4, raio 3 · marca 5 s"
          ],
          "upgrades": [
            {
              "name": "Correntes Múltiplas",
              "points": 1,
              "text": "As correntes prendem mais inimigos.",
              "details": [
                "Alvos presos 1 → 3"
              ]
            },
            {
              "name": "Lança Penetrante",
              "points": 2,
              "text": "A lança sagrada fere mais.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Martelo da Justiça",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Invoca um martelo sagrado e golpeia o chão, criando erupções de luz na direção em que você olha.",
          "details": [
            "Erupções em linha por 30 blocos · dano base 5 por erupção, raio 4"
          ],
          "upgrades": [
            {
              "name": "Peso do Juízo",
              "points": 1,
              "text": "As erupções deixam os inimigos lentos.",
              "details": [
                "Lentidão II por 2 s em quem a erupção acerta"
              ]
            },
            {
              "name": "Veredito",
              "points": 2,
              "text": "As erupções ferem mais.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Escudo Celestial",
          "slot": 4,
          "cooldown": 20,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Concede um escudo celestial a você e aos aliados próximos. Com o escudo, vocês não sofrem dano.",
          "details": [
            "Imune a dano por 4 s · aliados num raio de 8"
          ],
          "upgrades": [
            {
              "name": "Graça Divina",
              "points": 1,
              "text": "O escudo também cura quem o recebe.",
              "details": [
                "Cura 4 em você e nos aliados num raio de 8"
              ]
            },
            {
              "name": "Égide Veloz",
              "points": 2,
              "text": "O escudo acelera quem o recebe.",
              "details": [
                "Velocidade I por 4 s em você e nos aliados num raio de 8"
              ]
            }
          ]
        },
        {
          "name": "Última Resistência",
          "slot": 5,
          "cooldown": 21,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Um corte circular que puxa os inimigos próximos. Abre as asas sagradas, recua e esmaga o chão com o martelo, lançando-os ao ar. Inimigos marcados deixam uma aura que cura os aliados.",
          "details": [
            "Corte: dano base 4 · impacto: 10 · raio 8 · aura: cura 3 a cada 0,5 s por 4 s"
          ],
          "upgrades": [
            {
              "name": "Fôlego Sagrado",
              "points": 1,
              "text": "O impacto renova o seu fôlego.",
              "details": [
                "+10 de estamina quando o impacto acerta um inimigo"
              ]
            },
            {
              "name": "Ira Justa",
              "points": 2,
              "text": "O corte e o impacto ferem mais.",
              "details": [
                "Dano base do corte 4 → 6,5 · do impacto 10 → 16"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Guarda Firme",
          "points": 2,
          "text": "Ao sofrer dano, sua vontade te protege por um instante.",
          "details": [
            "Imune a dano por 1 s · Recarga 12 s"
          ],
          "parent": "Vontade Inquebrável"
        },
        {
          "name": "Grilhões da Fé",
          "points": 2,
          "text": "Quem é preso pelas correntes fica enfraquecido.",
          "details": [
            "Fraqueza I por 5 s nos alvos presos"
          ],
          "parent": "Selo Aprisionador"
        },
        {
          "name": "Luz Restauradora",
          "points": 2,
          "text": "Cada erupção que acerta inimigos restaura a sua vida.",
          "details": [
            "Cura 2 por erupção que acerta"
          ],
          "parent": "Martelo da Justiça"
        },
        {
          "name": "Absolvição",
          "points": 2,
          "text": "A luz celestial recompensa cada inimigo derrotado.",
          "details": [
            "Cura 10 por abate · Recarga 1 s"
          ],
          "parent": "Escudo Celestial"
        }
      ],
      "paths": [
        {
          "name": "Caminho do Cruzado",
          "points": 3,
          "text": "A cada 5 s, seu próximo Golpe Sagrado traz a ira dos céus.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto do Golpe Sagrado, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho do Guardião",
          "points": 3,
          "text": "Ao sofrer dano, você revida com o escudo e recupera as forças.",
          "details": [
            "Dano base 8 no agressor e cura 4 · Recarga 6 s"
          ]
        }
      ],
      "totalCost": 35,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Espada",
      "damage": "físico",
      "twoItems": true,
      "offhand": "Escudo"
    },
    "resource": "estamina"
  },
  "flame_warrior": {
    "level": 100,
    "description": "Espadachim imbuído de chamas. Corta com fogo, ergue sóis escaldantes e invoca um tigre de chamas para devastar a área.",
    "stats": [
      {
        "name": "Força",
        "value": 18
      },
      {
        "name": "Vida",
        "value": 5
      },
      {
        "name": "Estamina",
        "value": 4
      }
    ],
    "skills": {
      "base": {
        "name": "Corte Flamejante",
        "text": "Uma cadeia de cortes imbuídos de energia flamejante: 1º e 2º, um corte horizontal; 3º, um avanço com um corte em X; 4º, um corte descendente que esmaga o chão e derruba os inimigos.",
        "details": [
          "Dano base 4 por golpe (3º golpe: 6) · raio 3 · até 6 alvos",
          "15% de chance de queimar: 1 de dano por s por 4 s"
        ]
      },
      "corePassives": [
        {
          "name": "Espírito Ardente",
          "points": 1,
          "text": "Suas habilidades têm 15% de chance de queimar os inimigos e causam mais dano a quem está em chamas. Você fica imune a fogo e lava.",
          "details": [
            "Dano contra inimigos em chamas: +35% (Ondulação +50%, investida do Tigre ×2,07)",
            "Resistência a Fogo contínua enquanto usa a arma da classe"
          ],
          "notes": [
            "Queimadura e bônus já fazem parte de todas as habilidades da classe"
          ]
        }
      ],
      "bar": [
        {
          "name": "Fogo Imperceptível",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Uma investida flamejante em alta velocidade para a frente, que fere os inimigos no caminho. Só pode ser usada no chão.",
          "details": [
            "Dano base 5 · raio 3 · até 6 alvos",
            "15% de chance de queimar: 1 de dano por s por 4 s"
          ],
          "upgrades": [
            {
              "name": "Investida Ampla",
              "points": 1,
              "text": "A investida queima inimigos mais longe do caminho.",
              "details": [
                "Raio de acerto 3 → 4 blocos"
              ]
            },
            {
              "name": "Chama Voraz",
              "points": 2,
              "text": "A investida queima com mais força.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Sol Nascente Escaldante",
          "slot": 2,
          "cooldown": 11,
          "cost": {
            "resource": "estamina",
            "amount": 52
          },
          "points": 1,
          "text": "Um corte vertical que lança os inimigos ao ar. Eles ficam suspensos por um instante e queimam com um golpe posterior. Só pode ser usada no chão.",
          "details": [
            "Dano base 5 · raio 3 · até 6 alvos · queima 1 de dano por s por 4 s"
          ],
          "upgrades": [
            {
              "name": "Clarão Amplo",
              "points": 1,
              "text": "O corte vertical alcança mais inimigos ao redor.",
              "details": [
                "Raio de acerto 3 → 4 blocos"
              ]
            },
            {
              "name": "Zênite",
              "points": 2,
              "text": "O sol no seu auge: o corte acerta mais forte.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Ondulação da Chama Florescente",
          "slot": 3,
          "cooldown": 15,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Um corte defensivo em espiral que desvia ou bloqueia ataques com um movimento circular. Você fica parado e imune a dano por um instante, e os projéteis são desviados.",
          "details": [
            "Dano base 4 ×4 · raio 6 · até 8 alvos · imune por 1,3 s",
            "15% de chance de queimar por golpe: 1 de dano por s por 4 s"
          ],
          "upgrades": [
            {
              "name": "Flor Envolvente",
              "points": 1,
              "text": "A espiral envolve mais inimigos.",
              "details": [
                "Alvos 8 → 12"
              ]
            },
            {
              "name": "Pétalas Ígneas",
              "points": 2,
              "text": "Cada volta da espiral corta mais fundo.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Universo em Chamas",
          "slot": 4,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Recua, avança e golpeia para baixo com a espada, esmagando os inimigos e fazendo o chão tremer.",
          "details": [
            "Dano base 7 · raio 3 · até 6 alvos",
            "15% de chance de queimar: 1 de dano por s por 5 s"
          ],
          "upgrades": [
            {
              "name": "Tremor Amplo",
              "points": 1,
              "text": "O impacto atinge uma área maior.",
              "details": [
                "Raio de acerto 3 → 4 blocos"
              ]
            },
            {
              "name": "Colapso Estelar",
              "points": 2,
              "text": "O golpe desaba sobre os inimigos com mais força.",
              "details": [
                "Dano base 7 → 11"
              ]
            }
          ]
        },
        {
          "name": "Tigre de Chamas",
          "slot": 5,
          "cooldown": 60,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Concentra energia flamejante e invoca o espírito de um tigre em chamas que avança cortando tudo ao seu redor. Quem ele acerta queima por muito tempo e é arremessado; no fim da investida o tigre golpeia o chão e lança os inimigos ao ar.",
          "details": [
            "Investida: dano base 15 (raio 8) · impacto final: 22,5 (raio 10)",
            "Até 20 alvos · queima 1 de dano por s por 8 s"
          ],
          "upgrades": [
            {
              "name": "Bote Amplo",
              "points": 1,
              "text": "O bote final do tigre atinge uma área maior.",
              "details": [
                "Raio do impacto final 10 → 13 blocos"
              ]
            },
            {
              "name": "Fúria Felina",
              "points": 2,
              "text": "O tigre investe com fúria redobrada.",
              "details": [
                "Dano base 15 → 24 (impacto final 22,5 → 36)"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Rastro Escaldante",
          "points": 2,
          "text": "Quem é atingido pela investida fica com os pés em brasa.",
          "details": [
            "Lentidão II por 2 s em quem a investida acerta"
          ],
          "parent": "Fogo Imperceptível"
        },
        {
          "name": "Brasa Viva",
          "points": 2,
          "text": "O calor do sol nascente revigora você.",
          "details": [
            "Cura 3 de vida por golpe que acerta"
          ],
          "parent": "Sol Nascente Escaldante"
        },
        {
          "name": "Chama Debilitante",
          "points": 2,
          "text": "As chamas da espiral enfraquecem quem elas tocam.",
          "details": [
            "Fraqueza I por 3 s em quem a espiral acerta"
          ],
          "parent": "Ondulação da Chama Florescente"
        },
        {
          "name": "Impacto Vital",
          "points": 2,
          "text": "O impacto devolve a você a força das chamas.",
          "details": [
            "Cura 3 de vida por golpe que acerta"
          ],
          "parent": "Universo em Chamas"
        }
      ],
      "paths": [
        {
          "name": "Caminho do Inferno",
          "points": 3,
          "text": "A cada 5 s, seu próximo corte arde com fúria infernal.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto do Corte Flamejante, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho da Fênix",
          "points": 3,
          "text": "Cada abate faz você renascer das cinzas numa explosão de chamas.",
          "details": [
            "Cura 12 de vida · 1 golpe extra (dano base 6) em até 5 inimigos a até 4 blocos",
            "Recarga 5 s"
          ]
        }
      ],
      "totalCost": 35,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Machado",
      "damage": "físico",
      "twoItems": true
    },
    "resource": "estamina"
  },
  "gale_swordsman": {
    "level": 100,
    "description": "Espadachim do vento que puxa e perfura os inimigos. Salta alto, dança com a lâmina e libera a fúria dos ventos.",
    "stats": [
      {
        "name": "Força",
        "value": 18
      },
      {
        "name": "Agilidade",
        "value": 5
      },
      {
        "name": "Estamina",
        "value": 4
      }
    ],
    "skills": {
      "base": {
        "name": "Corte do Vendaval",
        "text": "Um corte para baixo, um para cima e uma estocada que puxa os inimigos. Em queda lenta, avança perfurando os inimigos (Golpe Zéfiro) e perde 1 nível de queda lenta.",
        "details": [
          "Dano base 4 (estocada e Golpe Zéfiro: 5) · raio 4 · até 5 alvos"
        ]
      },
      "corePassives": [
        {
          "name": "Lâmina Rúnica",
          "points": 1,
          "text": "Concede salto ampliado. Seus golpes fazem os alvos levitar.",
          "details": [
            "Salto I contínuo · levitação de 0,4 s ao acertar"
          ]
        },
        {
          "name": "Torrente",
          "points": 1,
          "text": "Segure agachar para girar a glaive sobre a cabeça, puxando os inimigos. Solte para desferir um corte enorme que os arremessa.",
          "details": [
            "Dano base 5 · raio 6 · Recarga 2 s"
          ]
        }
      ],
      "bar": [
        {
          "name": "Salto de Vara",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Salta alto no ar e ganha queda lenta nível 3, que permite encadear Golpes Zéfiro.",
          "details": [
            "Queda lenta nível 3 (3 Golpes Zéfiro)"
          ],
          "upgrades": [
            {
              "name": "Impulso Alto",
              "points": 1,
              "text": "O salto concede mais queda lenta.",
              "details": [
                "Queda lenta nível 3 → 4 (1 Golpe Zéfiro a mais)"
              ]
            },
            {
              "name": "Fôlego",
              "points": 3,
              "text": "O salto renova o seu fôlego.",
              "details": [
                "Cura 4 de vida a cada salto"
              ]
            }
          ]
        },
        {
          "name": "Lâmina Dançante",
          "slot": 2,
          "cooldown": 12,
          "cost": {
            "resource": "estamina",
            "amount": 56
          },
          "points": 1,
          "text": "Um avanço forte. Se acertar um inimigo, para e lança você e ele ao ar, ganhando 1 nível de queda lenta.",
          "details": [
            "Dano base 5 · raio 4 · até 3 alvos"
          ],
          "upgrades": [
            {
              "name": "Dança Ampla",
              "points": 1,
              "text": "O avanço arrasta mais inimigos para o ar.",
              "details": [
                "Alvos 3 → 5"
              ]
            },
            {
              "name": "Lâmina Afiada",
              "points": 3,
              "text": "O avanço corta mais fundo.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Fura-Nuvens",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Arremessa uma lança perfurante que causa lentidão. Ao cair num bloco, cria um tornado que puxa e fere os inimigos.",
          "details": [
            "Lança: dano base 5 (raio 3) · tornado: 5 por pulso (raio 5)"
          ],
          "upgrades": [
            {
              "name": "Rajada Larga",
              "points": 1,
              "text": "O impacto da lança atinge uma área maior.",
              "details": [
                "Raio do impacto 3 → 4 blocos"
              ]
            },
            {
              "name": "Lança Feroz",
              "points": 3,
              "text": "A lança e o tornado ferem mais.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Fúria dos Ventos",
          "slot": 4,
          "cooldown": 51,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Fica invencível e levita com os inimigos próximos, puxando-os devagar. Depois os derruba com um corte giratório e esmaga o chão, atordoando-os.",
          "details": [
            "Corte: dano base 5 (raio 7) · impacto: 5 (raio 10) · atordoa 3 s"
          ],
          "upgrades": [
            {
              "name": "Ciclone",
              "points": 1,
              "text": "O corte giratório alcança mais longe.",
              "details": [
                "Raio do corte 7 → 9 blocos"
              ]
            },
            {
              "name": "Tempestade",
              "points": 3,
              "text": "O corte e o impacto ferem mais.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Vento de Cauda",
          "points": 2,
          "text": "Ao pular, o vento te empurra.",
          "details": [
            "Velocidade II por 3 s ao pular · Recarga 8 s"
          ],
          "parent": "Salto de Vara"
        },
        {
          "name": "Vento Cortante",
          "points": 2,
          "text": "Quem é lançado ao ar fica enfraquecido.",
          "details": [
            "Fraqueza I por 3 s em quem a Lâmina Dançante acerta"
          ],
          "parent": "Lâmina Dançante"
        },
        {
          "name": "Segundo Fôlego",
          "points": 2,
          "text": "Cada abate renova o seu fôlego.",
          "details": [
            "Cura 10 de vida por abate · Recarga 1 s"
          ],
          "parent": "Fura-Nuvens"
        }
      ],
      "paths": [
        {
          "name": "Caminho da Tormenta",
          "points": 3,
          "text": "A cada 5 s, seu próximo corte traz a tormenta.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto do corte, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho do Zéfiro",
          "points": 3,
          "text": "Ao sofrer dano, uma rajada de vento revida.",
          "details": [
            "Dano base 8 no agressor e o faz levitar · Recarga 8 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Espada",
      "damage": "físico",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "reaper": {
    "level": 100,
    "description": "Ceifador de almas com uma foice. Lança os inimigos ao ar, rasga com garras e se transforma no deus da morte.",
    "stats": [
      {
        "name": "Força",
        "value": 18
      },
      {
        "name": "Agilidade",
        "value": 5
      },
      {
        "name": "Estamina",
        "value": 4
      }
    ],
    "skills": {
      "base": {
        "name": "Corte da Alma",
        "text": "Desfere uma série de 4 golpes: o terceiro lança os inimigos próximos ao ar e o quarto os derruba, liberando uma onda de almas.",
        "details": [
          "Dano base 3 por golpe · onda de almas 4 (raio 3,5)"
        ]
      },
      "corePassives": [
        {
          "name": "Coletor de Almas",
          "points": 1,
          "text": "Cada golpe ou habilidade coleta uma alma. A 7ª alma cria uma aura que fortalece o próximo golpe ou habilidade e zera o contador.",
          "details": [
            "7 almas → aura de 5 s · +20% de dano no próximo acerto"
          ]
        }
      ],
      "bar": [
        {
          "name": "Giro da Morte",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Avança girando a foice e desfere cortes giratórios.",
          "details": [
            "Dano base 4 ×2 · raio 5"
          ],
          "upgrades": [
            {
              "name": "Giro Vasto",
              "points": 1,
              "text": "Os cortes giratórios alcançam mais longe.",
              "details": [
                "Raio 5 → 6 blocos"
              ]
            },
            {
              "name": "Giro Brutal",
              "points": 2,
              "text": "Cada corte giratório fere mais fundo.",
              "details": [
                "Dano base 4 → 6,5 por corte"
              ]
            }
          ]
        },
        {
          "name": "Garra Ceifadora",
          "slot": 2,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Invoca uma garra ceifadora que puxa os inimigos até você. Você fica imóvel enquanto a garra age.",
          "details": [
            "Dano base 3 · puxa num raio de 3 · alcance 6 blocos"
          ],
          "upgrades": [
            {
              "name": "Garra Ampla",
              "points": 1,
              "text": "A garra agarra inimigos mais distantes.",
              "details": [
                "Raio do puxão 3 → 4 blocos"
              ]
            },
            {
              "name": "Garra Voraz",
              "points": 2,
              "text": "A garra rasga com mais força.",
              "details": [
                "Dano base 3 → 5"
              ]
            }
          ]
        },
        {
          "name": "Ímpeto",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Entra em modo fantasma e avança contra o inimigo, desferindo um corte em cruz que empurra os inimigos.",
          "details": [
            "Dano base 4 · área 2,5 · invisível e imune a dano por 1,25 s"
          ],
          "upgrades": [
            {
              "name": "Cruz Ampla",
              "points": 1,
              "text": "O corte em cruz cobre uma área maior.",
              "details": [
                "Área de acerto 2,5 → 3 blocos"
              ]
            },
            {
              "name": "Cruz Letal",
              "points": 2,
              "text": "O corte em cruz fica mais forte.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Foice das Almas",
          "slot": 4,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Invoca uma foice de almas e corta os inimigos, drenando suas almas para curar você.",
          "details": [
            "Dano base 5 · área 3 · cura 3 por golpe que acerta"
          ],
          "upgrades": [
            {
              "name": "Foice Longa",
              "points": 1,
              "text": "A foice varre uma área maior.",
              "details": [
                "Área de acerto 3 → 3,5 blocos"
              ]
            },
            {
              "name": "Foice Afiada",
              "points": 2,
              "text": "O corte da foice fica mais forte.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Deus da Morte",
          "slot": 5,
          "cooldown": 33,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Transforma-se no Deus da Morte por 12 s. O Corte da Alma vira uma série de 3 golpes: o segundo lança os inimigos ao ar e o terceiro libera uma onda de almas que aterroriza os inimigos. As outras habilidades ficam indisponíveis durante a forma.",
          "details": [
            "Dano base 5 por golpe · onda de raio 10 · Duração 12 s"
          ],
          "upgrades": [
            {
              "name": "Alcance Divino",
              "points": 1,
              "text": "Os dois primeiros golpes da forma alcançam mais longe.",
              "details": [
                "Área de acerto do 1º e do 2º golpe 3 → 4 blocos"
              ]
            },
            {
              "name": "Ira da Morte",
              "points": 2,
              "text": "Os três golpes da forma ficam mais fortes.",
              "details": [
                "Dano base 5 → 8 por golpe"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Ceifa Vital",
          "points": 2,
          "text": "Seus cortes giratórios e a garra roubam vida.",
          "details": [
            "Cura 2 por golpe que acerta do Giro da Morte (até 2 por uso)",
            "e da Garra Ceifadora (1 por uso)"
          ],
          "parent": "Giro da Morte"
        },
        {
          "name": "Correntes Sombrias",
          "points": 2,
          "text": "Quem é puxado pela garra ou cortado pelo Ímpeto fica lento.",
          "details": [
            "Lentidão II por 2 s nos alvos"
          ],
          "parent": "Garra Ceifadora"
        },
        {
          "name": "Fôlego Fantasma",
          "points": 2,
          "text": "O corte em cruz devolve o fôlego gasto no avanço.",
          "details": [
            "Recupera 10 de estamina quando o Ímpeto acerta (1 vez por uso)"
          ],
          "parent": "Ímpeto"
        },
        {
          "name": "Sede de Almas",
          "points": 2,
          "text": "Cada alma ceifada restaura sua vida.",
          "details": [
            "Cura 12 a cada abate · Recarga 1 s"
          ],
          "parent": "Foice das Almas"
        }
      ],
      "paths": [
        {
          "name": "Caminho da Ceifa",
          "points": 3,
          "text": "A cada 5 s, sua próxima habilidade ceifa com força extra.",
          "details": [
            "1 golpe extra (dano base 8) nos alvos do próximo acerto, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho do Pavor",
          "points": 3,
          "text": "Ao sofrer dano, você libera uma onda de pavor.",
          "details": [
            "Imune a dano 1 s e cura 8 · Fraqueza I e Lentidão I por 3 s",
            "em até 5 inimigos a 5 blocos · Recarga 10 s"
          ]
        }
      ],
      "totalCost": 35,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Foice",
      "damage": "físico",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "cleric": {
    "level": 100,
    "description": "Sacerdote de maça que luta com magia sagrada. Abençoa com orbes de luz, julga os inimigos e ergue uma catedral divina.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 18
      },
      {
        "name": "Vida",
        "value": 5
      },
      {
        "name": "Mana",
        "value": 4
      }
    ],
    "skills": {
      "base": {
        "name": "Combo Sagrado",
        "text": "Uma sequência de golpes sagrados de maça: 1º e 2º, golpes em diagonal que empurram os inimigos para os lados; 3º, avança e golpeia; 4º, esmaga o chão com um pulso sagrado que fere os inimigos e cura os aliados. Só funciona com a Revelação Divina.",
        "details": [
          "Dano base 4 por golpe (4º: 6) · raio 3 (4º: 4) · até 6 alvos · cura 5"
        ]
      },
      "corePassives": [
        {
          "name": "Revelação Divina",
          "points": 1,
          "text": "Você brilha enquanto a vontade divina desce sobre você. Com a revelação pronta, o próximo ataque básico vira uma onda de luz que atordoa os inimigos; ela volta 10 s depois de usada.",
          "details": [
            "Dano base 4 · raio 3 · até 6 alvos · atordoa 1,5 s · Recarga 10 s"
          ]
        }
      ],
      "bar": [
        {
          "name": "Julgamento Cruciforme",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Lança uma enorme onda sagrada em X que avança bem devagar e atinge várias vezes quem estiver nela. No fim, a onda explode em luz divina e atordoa os inimigos atingidos.",
          "details": [
            "Onda: dano base 4 a cada 0,5 s · raio 3 · até 6 alvos",
            "Explosão: dano base 4 · raio 5 · até 6 alvos · atordoa 1 s"
          ],
          "upgrades": [
            {
              "name": "Cruz Abrangente",
              "points": 1,
              "text": "A onda e a explosão alcançam mais inimigos.",
              "details": [
                "Alvos 6 → 9"
              ]
            },
            {
              "name": "Cruz Implacável",
              "points": 2,
              "text": "A cruz sagrada pune com mais força.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Orbes da Bênção",
          "slot": 2,
          "cooldown": 10,
          "cost": {
            "resource": "mana",
            "amount": 48
          },
          "points": 1,
          "text": "Orbes espirituais luminosos descem devagar do céu ao seu redor. Você e seus aliados podem pegá-los para recuperar vida; a luz se desfaz ao toque.",
          "details": [
            "5 orbes num raio de 9 · cada um cura 7 o aliado mais próximo · duram 10 s"
          ],
          "upgrades": [
            {
              "name": "Partilha Sagrada",
              "points": 1,
              "text": "Cada orbe cura mais aliados próximos de uma vez.",
              "details": [
                "Aliados curados por orbe 1 → 3 (raio 4)"
              ]
            },
            {
              "name": "Cura Abundante",
              "points": 2,
              "text": "Os orbes restauram mais vida.",
              "details": [
                "Cura por orbe 7 → 11"
              ]
            }
          ]
        },
        {
          "name": "Sino da Absolvição",
          "slot": 3,
          "cooldown": 30,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca à frente um enorme sino sagrado, que você toca até três vezes com seus ataques. 1º toque: uma onda sonora cura os aliados. 2º: ondas purificadoras limpam os efeitos negativos dos aliados e deixam os inimigos lentos. 3º: partículas radiantes dão a cada aliado invencibilidade divina.",
          "details": [
            "Cura 6 · Lentidão II por 5 s · invencível por 5 s · raio 10 · sino dura 15 s"
          ],
          "upgrades": [
            {
              "name": "Eco Prolongado",
              "points": 1,
              "text": "O segundo toque deixa os inimigos lentos por mais tempo.",
              "details": [
                "Lentidão II 5 s → 7,5 s"
              ]
            },
            {
              "name": "Badalada Curativa",
              "points": 2,
              "text": "O primeiro toque cura mais.",
              "details": [
                "Cura 6 → 9,5"
              ]
            }
          ],
          "aimRange": 20
        },
        {
          "name": "Feixe do Santuário",
          "slot": 4,
          "cooldown": 52,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Um feixe vertical de luz sagrada desce no ponto mirado. No impacto se forma um anel sagrado que cura e dá resistência aos aliados, enquanto fere e deixa lentos os inimigos dentro dele.",
          "details": [
            "A cada 0,75 s por 7 s: cura 3 · dano base 2 · raio 10 · até 15 alvos",
            "Lentidão II por 4 s nos inimigos"
          ],
          "upgrades": [
            {
              "name": "Luz Restauradora",
              "points": 1,
              "text": "O anel cura mais a cada pulso.",
              "details": [
                "Cura por pulso 3 → 5"
              ]
            },
            {
              "name": "Luz Punitiva",
              "points": 2,
              "text": "O anel fere os inimigos com mais força.",
              "details": [
                "Dano base por pulso 2 → 3"
              ]
            }
          ],
          "aimRange": 20
        },
        {
          "name": "Catedral Divina",
          "slot": 5,
          "cooldown": 60,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Abre asas radiantes e sobe em forma espiritual, voando livre por 10 s. Correntes de luz curam sem parar os aliados próximos. Uma enorme cruz sagrada surge no chão: sigilos divinos deixam os inimigos lentos e fracos, e os aliados nela ganham velocidade e força.",
          "details": [
            "Cura 5 a cada 0,2 s por 10 s (aliados a até 15 blocos)",
            "Cruz: raio 20 por 17 s · Lentidão III e Fraqueza II nos inimigos"
          ],
          "upgrades": [
            {
              "name": "Sigilo Opressor",
              "points": 1,
              "text": "Os sigilos da cruz prendem ainda mais os inimigos.",
              "details": [
                "Lentidão III → IV nos inimigos da cruz"
              ]
            },
            {
              "name": "Fluxo Celestial",
              "points": 2,
              "text": "As correntes de luz curam mais.",
              "details": [
                "Cura por corrente 5 → 8"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Veredito",
          "points": 2,
          "text": "A explosão da cruz enfraquece quem ela atinge.",
          "details": [
            "Fraqueza I por 4 s nos inimigos atingidos pela explosão"
          ],
          "parent": "Julgamento Cruciforme"
        },
        {
          "name": "Colheita Abençoada",
          "points": 2,
          "text": "Cada abate devolve vida a você.",
          "details": [
            "Cura 10 de vida por abate · Recarga 1 s"
          ],
          "parent": "Orbes da Bênção"
        },
        {
          "name": "Égide Sagrada",
          "points": 2,
          "text": "Ao sofrer dano, uma égide sagrada protege você por um instante.",
          "details": [
            "Imune a dano por 1,5 s · Recarga 15 s"
          ],
          "parent": "Sino da Absolvição"
        },
        {
          "name": "Consagração",
          "points": 2,
          "text": "Os aliados no anel sagrado ficam mais rápidos.",
          "details": [
            "Velocidade I por 2 s a cada pulso em quem o anel cura"
          ],
          "parent": "Feixe do Santuário"
        }
      ],
      "paths": [
        {
          "name": "Caminho do Juízo",
          "points": 3,
          "text": "A cada 5 s, o próximo acerto da onda em X traz um juízo extra.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto da onda, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho da Graça",
          "points": 3,
          "text": "A cada 5 s, o próximo esmagamento do combo cura muito mais.",
          "details": [
            "Cura extra de 10 em quem o 4º golpe cura, 1 vez a cada 5 s"
          ]
        }
      ],
      "totalCost": 35,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Grimório",
      "damage": "mágico",
      "twoItems": false
    },
    "resource": "mana"
  },
  "pyromancer": {
    "level": 100,
    "description": "Feiticeiro do fogo vulcânico. Lança mísseis de cinza, avança em magma e cobre a área com explosões infernais.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 18
      },
      {
        "name": "Vida",
        "value": 5
      },
      {
        "name": "Mana",
        "value": 4
      }
    ],
    "skills": {
      "base": {
        "name": "Combo Incendiário",
        "text": "Uma sequência fluida de ataques de fogo. 1º e 2º golpes: mísseis de cinza teleguiados; 3º: uma onda de choque flamejante em cone curto; 4º: um meteoro cai na diagonal à frente, explode e deixa uma ruptura ardente no chão. Cada acerto queima o inimigo.",
        "details": [
          "Mísseis: dano base 2 (3 por alvo, até 2 alvos) · onda: 4 (raio 3) · meteoro: 5 (raio 4)",
          "Queimadura: dano base 0,5 por s por 3 s (meteoro: 4 s)"
        ]
      },
      "corePassives": [
        {
          "name": "Domínio do Calor",
          "points": 1,
          "text": "Cada ataque básico concede 1 acúmulo de Calor. Com 3, você entra em Ignição: sua próxima habilidade (exceto Julgamento Infernal) sai numa versão mais forte, de chamas carmesim, e consome a Ignição.",
          "details": [
            "1 acúmulo por Combo Incendiário · 3 acúmulos = Ignição · duram 20 s"
          ]
        },
        {
          "name": "Saraivada Ígnea",
          "points": 1,
          "text": "Fique agachado por 1 s: bolas de fogo sobem em espiral e formam uma esfera de chamas acima de você, que se parte em bolas de fogo teleguiadas sobre os inimigos próximos. Cada bola queima quem acerta. Ignição: as bolas ficam vermelho-escuras e a primeira explode.",
          "details": [
            "Dano base 3 por bola · 3 bolas por alvo, até 10 alvos (raio 30) · Recarga 4 s",
            "Ignição: dano 6 · 4 bolas, a 1ª explode (raio 4, até 10 alvos)",
            "Queimadura: dano base 0,5 por s por 3 s (Ignição 5 s)"
          ]
        }
      ],
      "bar": [
        {
          "name": "Lança Vulcânica",
          "slot": 1,
          "cooldown": 12,
          "cost": {
            "resource": "mana",
            "amount": 56
          },
          "points": 1,
          "text": "Invoca uma lança flamejante e executa um combo rápido. 1º uso: estocada e corte flamejante. 2º uso: corte para cima, golpe para baixo e estocada final. Cada golpe queima os inimigos. Ignição: a lança escurece em vermelho, fere mais e alcança mais.",
          "details": [
            "Dano base 3 por golpe (Ignição 6) · raio 4 · até 10 alvos",
            "Queimadura: dano base 0,5 por s por 3 s (Ignição 5 s)"
          ],
          "upgrades": [
            {
              "name": "Lança Ampla",
              "points": 1,
              "text": "Cada golpe da lança atinge uma área maior.",
              "details": [
                "Raio 4 → 5 blocos"
              ]
            },
            {
              "name": "Lança Rubra",
              "points": 3,
              "text": "A lança arde mais quente e fere mais fundo.",
              "details": [
                "Dano base 3 → 5 (Ignição 6 → 9,5)"
              ]
            }
          ]
        },
        {
          "name": "Explosão Infernal",
          "slot": 2,
          "cooldown": 39,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Concentra energia flamejante à sua frente e então libera um feixe de fogo contínuo por 4 s, que queima tudo no caminho. Só no chão. Ignição: o feixe fica mais longo e carmesim, fere mais e empurra os inimigos para trás.",
          "details": [
            "Dano base 2 por pulso, 16 pulsos (Ignição 4) · raio 3 · até 10 alvos",
            "Alcance 14 blocos (Ignição 19)",
            "Queimadura: dano base 0,5 por s por 3 s (Ignição 5 s)"
          ],
          "upgrades": [
            {
              "name": "Feixe Largo",
              "points": 1,
              "text": "Cada pulso do feixe queima uma área maior ao acertar.",
              "details": [
                "Raio 3 → 4 blocos"
              ]
            },
            {
              "name": "Chama Intensa",
              "points": 3,
              "text": "O feixe queima com mais intensidade.",
              "details": [
                "Dano base 2 → 3 por pulso (Ignição 4 → 6,5)"
              ]
            }
          ]
        },
        {
          "name": "Investida de Magma",
          "slot": 3,
          "cooldown": 45,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Avança rasgando o chão e deixa atrás de você um rastro de lava. Quem toca o rastro sofre dano e queima. Ignição: o rastro escurece e, depois de 4 s, explode em sequência.",
          "details": [
            "Dano base 2 a cada 0,5 s no rastro por 4 s · raio 3 · até 10 alvos",
            "Ignição: dano 4 · cada trecho explode no fim (dano base 12, raio 4)",
            "Queimadura: dano base 0,5 por s por 4 s (Ignição 6 s)"
          ],
          "upgrades": [
            {
              "name": "Rastro Largo",
              "points": 1,
              "text": "O rastro de lava alcança inimigos mais distantes.",
              "details": [
                "Raio 3 → 4 blocos"
              ]
            },
            {
              "name": "Magma Fervente",
              "points": 3,
              "text": "O magma ferve e queima com mais força.",
              "details": [
                "Dano base 2 → 3 (Ignição 4 → 6,5 · explosão 12 → 19,5)"
              ]
            }
          ]
        },
        {
          "name": "Julgamento Infernal",
          "slot": 4,
          "cooldown": 49,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "As chamas se concentram e você salta, incendiando o chão abaixo. No ar, círculos mágicos de fogo surgem dos dois lados e disparam lanças flamejantes para onde você mira, que explodem ao acertar. Por fim, uma lança gigante se forma acima de você: você desce com ela na diagonal e abre uma enorme ruptura de lava e obsidiana, que lança os inimigos ao ar e os queima com força.",
          "details": [
            "Lanças: dano base 6 ×10 (raio 3, até 10 alvos) · impacto final: 15 (raio 10, até 30)",
            "Queimadura: dano base 1 por s por 8 s"
          ],
          "upgrades": [
            {
              "name": "Estilhaços",
              "points": 1,
              "text": "As explosões das lanças espalham fogo por uma área maior.",
              "details": [
                "Raio das lanças 3 → 4 blocos"
              ]
            },
            {
              "name": "Juízo Final",
              "points": 3,
              "text": "O julgamento cai com força devastadora.",
              "details": [
                "Dano base das lanças 6 → 9,5 · impacto final 15 → 23,75"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Fervor",
          "points": 2,
          "text": "O calor da lança revigora você a cada golpe.",
          "details": [
            "Cura 2 de vida por golpe da Lança Vulcânica que acerta"
          ],
          "parent": "Lança Vulcânica"
        },
        {
          "name": "Calor Sufocante",
          "points": 2,
          "text": "O calor do feixe sufoca e enfraquece quem ele atinge.",
          "details": [
            "Fraqueza I por 3 s em quem a Explosão Infernal acerta"
          ],
          "parent": "Explosão Infernal"
        },
        {
          "name": "Solo Derretido",
          "points": 2,
          "text": "O chão derretido prende os pés de quem o pisa.",
          "details": [
            "Lentidão II por 2 s em quem o rastro de lava acerta"
          ],
          "parent": "Investida de Magma"
        }
      ],
      "paths": [
        {
          "name": "Caminho da Ignição",
          "points": 3,
          "text": "A cada 5 s, seu próximo acerto do combo explode em chamas de novo.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto do Combo Incendiário, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho da Fênix",
          "points": 3,
          "text": "Ao sofrer dano, o calor dentro de você explode e o renova.",
          "details": [
            "Dano base 8 no agressor e cura 8 de vida · Recarga 10 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Cajado",
      "damage": "mágico",
      "twoItems": false
    },
    "resource": "mana"
  },
  "monk": {
    "level": 1,
    "description": "Lutador de punhos velozes e chi. Golpeia em rajadas, contra-ataca e libera os punhos do dragão.",
    "stats": [
      {
        "name": "Força",
        "value": 23
      },
      {
        "name": "Estamina",
        "value": 6
      },
      {
        "name": "Agilidade",
        "value": 6
      }
    ],
    "skills": {
      "base": {
        "name": "Golpes Velozes",
        "text": "Desfere 3 socos seguidos, atingindo todos os inimigos à sua frente.",
        "details": [
          "Dano base 3 por soco · 3 socos · raio 3"
        ]
      },
      "corePassives": [
        {
          "name": "Foco do Chi",
          "points": 0,
          "text": "Cura você e os aliados próximos sempre que você sofre dano.",
          "details": [
            "Cura 3 de vida em quem estiver a até 5,5 blocos · no máximo 1 vez por segundo"
          ]
        }
      ],
      "bar": [
        {
          "name": "Rajada de Chi",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Dispara uma rajada de chi que marca o inimigo atingido. Em seguida, você voa até o inimigo marcado e o golpeia.",
          "details": [
            "Rajada: dano base 4 · Lentidão II por 4 s · chute: dano base 4"
          ],
          "upgrades": [
            {
              "name": "Mira Interior",
              "points": 1,
              "text": "A rajada marca o inimigo mais próximo numa área maior.",
              "details": [
                "Raio de captura 2,5 → 3,3"
              ]
            },
            {
              "name": "Chi Concentrado",
              "points": 2,
              "text": "A rajada e o chute carregam mais chi.",
              "details": [
                "Dano base 4 → 6,5 (rajada e chute)"
              ]
            }
          ]
        },
        {
          "name": "Arremesso Zen",
          "slot": 2,
          "cooldown": 15,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Agarra o inimigo à sua frente, arremessa-o para trás e o esmaga contra o chão. Quem estiver perto da queda também é atordoado.",
          "details": [
            "Queda: dano base 4 · raio 4,5 · atordoa por 3 s · 1 inimigo agarrado"
          ],
          "upgrades": [
            {
              "name": "Mãos Firmes",
              "points": 1,
              "text": "Agarra mais de um inimigo de uma vez.",
              "details": [
                "Inimigos agarrados 1 → 2"
              ]
            },
            {
              "name": "Queda Esmagadora",
              "points": 2,
              "text": "A queda atinge com mais força.",
              "details": [
                "Dano base da queda 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Contas do Carma",
          "slot": 3,
          "cooldown": 14,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca contas espirituais e espalha uma aura de carma que empurra os inimigos, cura e remove efeitos negativos de você e dos aliados próximos. Você fica parado enquanto medita.",
          "details": [
            "Dano base 3 ×3 pulsos · raio 7 · cura 6 de vida por pulso"
          ],
          "upgrades": [
            {
              "name": "Carma Amplo",
              "points": 1,
              "text": "Os pulsos de carma empurram inimigos mais distantes.",
              "details": [
                "Raio do dano 7 → 9"
              ]
            },
            {
              "name": "Contas Pesadas",
              "points": 2,
              "text": "Cada pulso atinge com mais força.",
              "details": [
                "Dano base 3 → 5"
              ]
            }
          ]
        },
        {
          "name": "Contra-Ataque",
          "slot": 4,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Cria um escudo espiritual por 3 s que absorve todo ataque recebido e acumula força. Ao fim, o escudo dispara uma onda de chi tão forte quanto os golpes absorvidos.",
          "details": [
            "0-1 golpes: dano base 3, raio 2,5 · 2-5: dano base 5, raio 4",
            "6 ou mais: dano base 7, raio 6"
          ],
          "upgrades": [
            {
              "name": "Escudo Paciente",
              "points": 1,
              "text": "O escudo dura mais antes de disparar a onda.",
              "details": [
                "Duração do escudo 3 s → 4,5 s"
              ]
            },
            {
              "name": "Onda Furiosa",
              "points": 2,
              "text": "A onda de chi devolve os golpes com mais força.",
              "details": [
                "Dano base 3 / 5 / 7 → 5 / 8 / 11"
              ]
            }
          ]
        },
        {
          "name": "Punhos do Dragão",
          "slot": 5,
          "cooldown": 32,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca punhos espirituais e executa um combo supremo: palma, soco, soco, palma, gancho, golpe para baixo e impacto no chão. O impacto atordoa e libera uma aura de chi que cura os aliados.",
          "details": [
            "Dano base 3 ×6 e 5 no impacto · raio 5 · atordoa por 4 s",
            "Cura 10 de vida em você e nos jogadores a até 10 blocos"
          ],
          "upgrades": [
            {
              "name": "Alcance do Dragão",
              "points": 1,
              "text": "Os punhos espirituais alcançam inimigos mais distantes.",
              "details": [
                "Raio 5 → 6 (todos os golpes)"
              ]
            },
            {
              "name": "Fúria do Dragão",
              "points": 2,
              "text": "Cada golpe do combo atinge com mais força.",
              "details": [
                "Dano base 3 → 5 · impacto 5 → 8"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Ímpeto",
          "points": 2,
          "text": "Acertar o chute renova o seu fôlego.",
          "details": [
            "Recupera 10 de estamina quando o chute acerta"
          ],
          "parent": "Rajada de Chi"
        },
        {
          "name": "Arremesso Sereno",
          "points": 2,
          "text": "Cada arremesso restaura o seu equilíbrio.",
          "details": [
            "Cura 4 de vida por inimigo agarrado"
          ],
          "parent": "Arremesso Zen"
        },
        {
          "name": "Carma Pesado",
          "points": 2,
          "text": "Quem é empurrado pelo carma perde o passo.",
          "details": [
            "Lentidão II por 2 s em quem os pulsos acertam"
          ],
          "parent": "Contas do Carma"
        },
        {
          "name": "Retribuição",
          "points": 2,
          "text": "A onda de chi devolve a vida que os inimigos tentaram tirar.",
          "details": [
            "Cura 3 de vida por golpe da onda que acerta"
          ],
          "parent": "Contra-Ataque"
        }
      ],
      "paths": [
        {
          "name": "Caminho do Punho",
          "points": 3,
          "text": "A cada 5 s, o próximo soco concentra todo o seu chi.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto de Golpes Velozes, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho da Serenidade",
          "points": 3,
          "text": "Ao sofrer dano, você encontra a calma e se recompõe.",
          "details": [
            "Cura 12 de vida · Recarga 10 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Luva",
      "damage": "físico",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "earth_mage": {
    "level": 1,
    "description": "Mago que molda a terra e a rocha para esmagar os inimigos e proteger os aliados. As habilidades chegam em breve.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 23
      },
      {
        "name": "Vida",
        "value": 6
      },
      {
        "name": "Mana",
        "value": 6
      }
    ],
    "skills": null,
    "weapon": {
      "name": "Cajado",
      "damage": "mágico",
      "twoItems": false
    }
  },
  "death_knight": {
    "level": 1,
    "description": "Cavaleiro da morte de foice e correntes espectrais. Prende os inimigos, se protege com almas e dita a sentença final.",
    "stats": [
      {
        "name": "Força",
        "value": 46
      },
      {
        "name": "Vida",
        "value": 12
      },
      {
        "name": "Estamina",
        "value": 11
      }
    ],
    "skills": {
      "base": {
        "name": "Golpe da Morte",
        "text": "Combo de 4 passos. Dois cortes à frente que empurram os inimigos. No terceiro, lança correntes da morte que prendem num bloco ou inimigo e puxam você até lá. No quarto, recua e golpeia o chão, soltando uma onda de choque necrótica.",
        "details": [
          "Dano base 4 (corrente 2, golpe no chão e onda 6) · raio 4, até 5 alvos"
        ]
      },
      "corePassives": [
        {
          "name": "Selo Amaldiçoado",
          "points": 0,
          "text": "Seus golpes marcam os inimigos com um selo amaldiçoado que cresce a cada ataque, até 4 cargas. Com o selo cheio, o inimigo fica com Fraqueza e a Sentença de Morte o atinge com um golpe pesado.",
          "details": [
            "Selo cheio: Fraqueza I por 10 s · golpe pesado de dano base 3x o da Sentença"
          ],
          "notes": [
            "Desbloqueie primeiro: sem ela os selos não aparecem"
          ]
        }
      ],
      "bar": [
        {
          "name": "Investida Fantasma",
          "slot": 1,
          "cooldown": 9,
          "cost": {
            "resource": "estamina",
            "amount": 44
          },
          "points": 1,
          "text": "Inspira partículas necróticas e abre as asas da morte. Avança com força avassaladora, arrastando os inimigos pelo caminho.",
          "details": [
            "Dano base 3 por golpe · raio 4,5, até 8 alvos · 4 golpes"
          ],
          "upgrades": [
            {
              "name": "Investida Ampla",
              "points": 1,
              "text": "A investida atinge inimigos mais longe do seu caminho.",
              "details": [
                "Raio 4,5 → 5,5"
              ]
            },
            {
              "name": "Investida Brutal",
              "points": 2,
              "text": "Cada golpe da investida bate mais forte.",
              "details": [
                "Dano base 3 → 5"
              ]
            }
          ]
        },
        {
          "name": "Correntes Espectrais",
          "slot": 2,
          "cooldown": 13,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Lança correntes da morte à frente que prendem os inimigos e os arrastam até você. Mãos necróticas surgem do chão, agarram os alvos e os atordoam.",
          "details": [
            "Dano base 4 + 2 no agarrão · raio 3, até 4 alvos por corrente",
            "Atordoa por 3 s"
          ],
          "upgrades": [
            {
              "name": "Correntes Vorazes",
              "points": 1,
              "text": "Cada corrente prende mais inimigos.",
              "details": [
                "Alvos por corrente 4 → 6"
              ]
            },
            {
              "name": "Correntes Cruéis",
              "points": 2,
              "text": "As correntes e as mãos ferem mais fundo.",
              "details": [
                "Dano base 4 → 6,5 · agarrão 2 → 3,25"
              ]
            }
          ]
        },
        {
          "name": "Barreira de Almas",
          "slot": 3,
          "cooldown": 21,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Conjura uma barreira de energia necrótica que deixa você invulnerável por alguns segundos. Todo dano recebido nesse tempo é absorvido e convertido em cura.",
          "details": [
            "Invulnerável por 9 s · cura igual ao dano bloqueado"
          ],
          "upgrades": [
            {
              "name": "Barreira Voraz",
              "points": 1,
              "text": "A barreira converte mais dano em cura.",
              "details": [
                "Cura 100% → 150% do dano bloqueado"
              ]
            },
            {
              "name": "Alma Renovada",
              "points": 2,
              "text": "Cada golpe bloqueado também devolve fôlego.",
              "details": [
                "8 de estamina por golpe bloqueado"
              ]
            }
          ]
        },
        {
          "name": "Redemoinho Necrótico",
          "slot": 4,
          "cooldown": 33,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Gira a Necroslayer num vórtice mortal que ergue os inimigos ao tocar. No fim, garras necróticas cortam os inimigos próximos, que são empurrados e ficam lentos, e você se cura conforme o número de inimigos atingidos.",
          "details": [
            "Dano base 2 por giro (11 giros) · garras 4 · raio 5,5, até 8 alvos",
            "Garras: Lentidão II por 3 s · cura 2 por inimigo atingido"
          ],
          "upgrades": [
            {
              "name": "Garras Pesadas",
              "points": 1,
              "text": "As garras deixam os inimigos ainda mais lentos.",
              "details": [
                "Lentidão II → III por 3 s"
              ]
            },
            {
              "name": "Redemoinho Brutal",
              "points": 2,
              "text": "O vórtice e as garras cortam mais fundo.",
              "details": [
                "Dano base por giro 2 → 3 · garras 4 → 6"
              ]
            }
          ]
        },
        {
          "name": "Sentença de Morte",
          "slot": 5,
          "cooldown": 12,
          "cost": {
            "resource": "estamina",
            "amount": 56
          },
          "points": 1,
          "text": "Abre as asas da morte e sobe aos céus, invocando aos poucos sua lâmina de almas e marcando a zona alvo. Mergulha no ponto escolhido com força aterradora, cortando todos os inimigos com a lâmina de almas. Inimigos com o selo amaldiçoado cheio levam um golpe pesado.",
          "details": [
            "Dano base 5 · raio 7 · selo cheio: +1 golpe de dano base 15"
          ],
          "upgrades": [
            {
              "name": "Sentença Paralisante",
              "points": 1,
              "text": "O impacto deixa os sobreviventes lentos.",
              "details": [
                "Inimigos atingidos: Lentidão II por 3 s"
              ]
            },
            {
              "name": "Sentença Final",
              "points": 2,
              "text": "A lâmina de almas cai com força total.",
              "details": [
                "Dano base 5 → 8 · golpe pesado do selo 15 → 24"
              ]
            }
          ],
          "aimRange": 60
        }
      ],
      "passives": [
        {
          "name": "Passo Fantasma",
          "points": 2,
          "text": "A investida devolve fôlego a cada inimigo atingido.",
          "details": [
            "5 de estamina por golpe que acerta"
          ],
          "parent": "Investida Fantasma"
        },
        {
          "name": "Elo de Almas",
          "points": 2,
          "text": "As mãos necróticas drenam a vida de quem agarram.",
          "details": [
            "Cura 3 por golpe do agarrão que acerta"
          ],
          "parent": "Correntes Espectrais"
        },
        {
          "name": "Colheita de Almas",
          "points": 2,
          "text": "Cada alma que você ceifa restaura sua vida.",
          "details": [
            "Abater um inimigo: cura 10 · recarga 1 s"
          ],
          "parent": "Barreira de Almas"
        },
        {
          "name": "Sifão de Almas",
          "points": 2,
          "text": "O vórtice suga a vida de quem gira nele.",
          "details": [
            "Cura 2 por giro que acerta"
          ],
          "parent": "Redemoinho Necrótico"
        }
      ],
      "paths": [
        {
          "name": "Marca do Ceifador",
          "points": 3,
          "text": "A cada 5 s sua lâmina se carrega de morte, e o próximo Golpe da Morte que acerta descarrega a marca.",
          "details": [
            "1 golpe extra (dano base 8) a cada 5 s"
          ]
        },
        {
          "name": "Pacto Sombrio",
          "points": 3,
          "text": "Quando você é ferido, as almas o protegem por um instante e fecham suas feridas.",
          "details": [
            "Ao receber dano: imune por 1 s e cura 10 · recarga 10 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Foice",
      "damage": "físico",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "elementalist": {
    "level": 1,
    "description": "Mestre dos quatro elementos. Arremessa pedras, chicoteia com água, sopra ventos extremos e invoca feras do submundo.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 36
      },
      {
        "name": "Vida",
        "value": 9
      },
      {
        "name": "Mana",
        "value": 9
      }
    ],
    "skills": {
      "base": {
        "name": "Arremesso de Terra",
        "text": "Dispara um pedregulho contra o inimigo, empurrando-o levemente.",
        "details": [
          "Dano base 3 · 1 alvo"
        ]
      },
      "corePassives": [
        {
          "name": "Explosão de Ar",
          "points": 0,
          "text": "Ao correr, você carrega uma bolha de ar que explode depois de um instante, empurrando os inimigos próximos.",
          "details": [
            "Raio 7 · no máximo uma vez a cada 10 s"
          ]
        }
      ],
      "bar": [
        {
          "name": "Chicote Aquático",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Invoca um tentáculo aquático e chicoteia os inimigos, empurrando-os para trás.",
          "details": [
            "Dano base 5 · área de 4,5 blocos à frente"
          ],
          "upgrades": [
            {
              "name": "Chicote Amplo",
              "points": 1,
              "text": "O chicote alcança inimigos mais afastados.",
              "details": [
                "Área 4,5 → 5,5"
              ]
            },
            {
              "name": "Chicote Torrencial",
              "points": 2,
              "text": "O tentáculo golpeia com a força de uma torrente.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Fera do Submundo",
          "slot": 2,
          "cooldown": 16,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca uma fera do submundo que emerge do chão onde você mira, triturando os inimigos na área, queimando-os e lançando-os ao ar.",
          "details": [
            "Dano base 2 por golpe · 5 golpes · raio 5 · queima 5 s"
          ],
          "upgrades": [
            {
              "name": "Fera Colossal",
              "points": 1,
              "text": "A mordida da fera alcança mais longe.",
              "details": [
                "Raio 5 → 6"
              ]
            },
            {
              "name": "Mordida Ardente",
              "points": 2,
              "text": "As chamas da fera queimam mais fundo.",
              "details": [
                "Dano base por golpe 2 → 3"
              ]
            }
          ]
        },
        {
          "name": "Vento Extremo",
          "slot": 3,
          "cooldown": 18,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Chama um falcão que cria um redemoinho onde você mira. Inimigos dentro do redemoinho são lançados ao ar e feridos sem parar.",
          "details": [
            "Dano base 2 por golpe · raio 2 · dura 5 s"
          ],
          "upgrades": [
            {
              "name": "Vento Amplo",
              "points": 1,
              "text": "O redemoinho puxa inimigos de mais longe.",
              "details": [
                "Raio 2 → 2,5"
              ]
            },
            {
              "name": "Vento Cortante",
              "points": 2,
              "text": "O vento corta como lâminas.",
              "details": [
                "Dano base por golpe 2 → 3"
              ]
            }
          ]
        },
        {
          "name": "Barricada de Terra",
          "slot": 4,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Invoca um golem de terra que emerge do chão e golpeia a superfície, erguendo uma muralha. O golem empurra a muralha, que derruba todos os inimigos que toca.",
          "details": [
            "Dano base 4 · raio 5 ao redor de cada inimigo tocado"
          ],
          "upgrades": [
            {
              "name": "Barricada Ampla",
              "points": 1,
              "text": "O impacto da muralha se espalha mais.",
              "details": [
                "Raio 5 → 6"
              ]
            },
            {
              "name": "Barricada Esmagadora",
              "points": 2,
              "text": "A muralha esmaga quem fica no caminho.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Superaquecimento",
          "slot": 5,
          "cooldown": 30,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca uma fera do submundo que dispara um feixe infernal contínuo na direção em que você olha. Inimigos no feixe são feridos e queimados.",
          "details": [
            "15 rajadas · cada acerto: dano base 2, 7 golpes · raio 3",
            "Queima 7 s"
          ],
          "upgrades": [
            {
              "name": "Feixe Amplo",
              "points": 1,
              "text": "Cada rajada do feixe explode numa área maior.",
              "details": [
                "Raio 3 → 4"
              ]
            },
            {
              "name": "Feixe Abrasador",
              "points": 2,
              "text": "O feixe arde ainda mais.",
              "details": [
                "Dano base por golpe 2 → 3"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Maré Restauradora",
          "points": 2,
          "text": "A água do chicote volta para você e cura suas feridas.",
          "details": [
            "Cura 3 por golpe que acerta"
          ],
          "parent": "Chicote Aquático"
        },
        {
          "name": "Banquete Infernal",
          "points": 2,
          "text": "A fera devolve parte da energia que consome.",
          "details": [
            "8 de mana por golpe que acerta"
          ],
          "parent": "Fera do Submundo"
        },
        {
          "name": "Rajada Debilitante",
          "points": 2,
          "text": "O redemoinho tira as forças de quem ele apanha.",
          "details": [
            "Inimigos atingidos: Fraqueza I por 3 s"
          ],
          "parent": "Vento Extremo"
        },
        {
          "name": "Tremor Persistente",
          "points": 2,
          "text": "O chão continua tremendo sob os inimigos derrubados.",
          "details": [
            "Inimigos atingidos: Lentidão II por 3 s"
          ],
          "parent": "Barricada de Terra"
        }
      ],
      "paths": [
        {
          "name": "Fúria Elemental",
          "points": 3,
          "text": "Os elementos se acumulam no seu prisma. A cada 5 s, o próximo Arremesso de Terra que acerta libera a fúria.",
          "details": [
            "1 golpe extra (dano base 8) a cada 5 s"
          ]
        },
        {
          "name": "Bastião de Pedra",
          "points": 3,
          "text": "Ao ser atingido, sua pele vira pedra por um instante.",
          "details": [
            "Imune a dano por 1 s e cura 10 · recarga 10 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Cajado",
      "damage": "mágico",
      "twoItems": false
    },
    "resource": "mana"
  },
  "shaman": {
    "level": 1,
    "description": "Xamã que troca de postura entre trovão e terra. Ergue totens, invoca mãos ancestrais e se move como um eco.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 29
      },
      {
        "name": "Vida",
        "value": 7
      },
      {
        "name": "Mana",
        "value": 7
      }
    ],
    "skills": {
      "base": {
        "name": "Combo Primal",
        "text": "Muda com a postura. Trovão: 1º e 2º golpes disparam um raio à frente; o 3º dispara um raio contínuo por 2 s; o 4º faz cair um raio onde você mira. Terra: a mesma sequência com feixes de cura.",
        "details": [
          "Trovão: dano base 3 por acerto, até 5 inimigos (o 4º: raio 5, até 7) · 3º golpe: 8 acertos",
          "Terra: cura 3 por acerto, no mesmo alcance (cura qualquer ser atingido)"
        ]
      },
      "corePassives": [
        {
          "name": "Elo Espiritual",
          "points": 0,
          "text": "Cria um elo espiritual com o ser mais próximo e define a postura inicial (Trovão). Sem ela, as habilidades de postura não agem até a primeira Troca de Postura.",
          "details": [
            "Trovão: Força I no alvo (efeito vanilla, não muda o dano do RPGCore)",
            "Terra: cura 2 por segundo no alvo · alcance 10"
          ]
        }
      ],
      "bar": [
        {
          "name": "Passo do Eco",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Entra em forma espiritual e avança rapidamente na direção em que anda, imune a dano enquanto dura.",
          "details": [
            "Avanço de 2 s · imune a dano e invisível por 2 s · só no chão"
          ],
          "upgrades": [
            {
              "name": "Rastro Veloz",
              "points": 1,
              "text": "Ao sair da forma espiritual, você continua veloz.",
              "details": [
                "Velocidade I por 3 s ao fim do avanço"
              ]
            },
            {
              "name": "Essência Restauradora",
              "points": 2,
              "text": "A forma espiritual restaura o seu corpo ao terminar.",
              "details": [
                "Cura 10 ao fim do avanço"
              ]
            }
          ]
        },
        {
          "name": "Totem Ritual",
          "slot": 2,
          "cooldown": 29,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca um totem onde você mira. Trovão: o Totem Caçador lança fogos-fátuos contra inimigos próximos. Terra: o Totem Guardião cria uma área que repele inimigos e cura quem está dentro.",
          "details": [
            "Trovão: 9 rajadas de 3 fogos-fátuos (1 por segundo), dano base 3 cada · alcance 25",
            "Terra: cura 3 por segundo por 10 s, raio 12 · mire num bloco até 20"
          ],
          "upgrades": [
            {
              "name": "Espíritos Caçadores",
              "points": 1,
              "text": "Cada fogo-fátuo do Totem Caçador atinge mais inimigos.",
              "details": [
                "Inimigos por fogo-fátuo 1 → 3 (Postura do Trovão)"
              ]
            },
            {
              "name": "Totem Ancestral",
              "points": 2,
              "text": "Os totens canalizam mais poder ancestral.",
              "details": [
                "Trovão: dano base 3 → 5 · Terra: cura 3 → 5"
              ]
            }
          ],
          "aimRange": 20
        },
        {
          "name": "Troca de Postura",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Alterna entre a Postura do Trovão e a Postura da Terra, que mudam o Combo Primal, o Totem Ritual, as Mãos Ancestrais e o Elo Espiritual.",
          "details": [
            "Trovão: dano · Terra: cura"
          ],
          "upgrades": [
            {
              "name": "Fôlego Elemental",
              "points": 1,
              "text": "Trocar de postura renova a sua energia espiritual.",
              "details": [
                "Recupera 10 de mana a cada troca"
              ]
            },
            {
              "name": "Bênção da Postura",
              "points": 2,
              "text": "Cada postura o abençoa ao ser assumida.",
              "details": [
                "Trovão: Velocidade II por 3 s · Terra: cura 8"
              ]
            }
          ]
        },
        {
          "name": "Abraço da Terra",
          "slot": 4,
          "cooldown": 13,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Raízes de madeira emergem do chão sob até 5 seres próximos, prendendo-os no lugar.",
          "details": [
            "Prende por 3 s · até 5 alvos a 10 blocos"
          ],
          "upgrades": [
            {
              "name": "Raízes Profundas",
              "points": 1,
              "text": "As raízes seguram os alvos por mais tempo.",
              "details": [
                "Duração da prisão 3 s → 4,5 s"
              ]
            },
            {
              "name": "Raízes Debilitantes",
              "points": 2,
              "text": "As raízes drenam a força de quem prendem.",
              "details": [
                "Fraqueza I por 6 s nos alvos presos"
              ]
            }
          ]
        },
        {
          "name": "Mãos Ancestrais",
          "slot": 5,
          "cooldown": 60,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Trovão: três mãos espirituais golpeiam onde você mira; a 1ª e a 2ª lançam os inimigos para o alto e a 3ª os esmaga no chão. Terra: duas palmas surgem do chão e protegem quem está entre elas.",
          "details": [
            "Trovão: dano base 7 por mão, 3 mãos, raio 5",
            "Terra: cura 2 a cada 0,25 s e imunidade a dano por 5,75 s, raio 4 · mire num bloco até 20"
          ],
          "upgrades": [
            {
              "name": "Mãos Colossais",
              "points": 1,
              "text": "As mãos do trovão alcançam inimigos mais afastados.",
              "details": [
                "Raio dos golpes 5 → 6 (Postura do Trovão)"
              ]
            },
            {
              "name": "Fúria Ancestral",
              "points": 2,
              "text": "Os ancestrais respondem com mais força.",
              "details": [
                "Trovão: dano base 7 → 11 · Terra: cura 2 → 3"
              ]
            }
          ],
          "aimRange": 20
        }
      ],
      "passives": [
        {
          "name": "Véu Espiritual",
          "points": 2,
          "text": "Ao sofrer dano, um véu espiritual o protege por um instante.",
          "details": [
            "Imune a dano por 1 s e Velocidade II por 2 s · no máximo a cada 15 s"
          ],
          "parent": "Passo do Eco"
        },
        {
          "name": "Sifão Espiritual",
          "points": 2,
          "text": "Os fogos-fátuos do Totem Caçador devolvem vida a você.",
          "details": [
            "Cura 2 por golpe que acerta"
          ],
          "parent": "Totem Ritual"
        },
        {
          "name": "Ressonância Elemental",
          "points": 2,
          "text": "A troca de postura libera uma onda que entorpece quem está perto.",
          "details": [
            "Lentidão II por 2 s em até 5 seres a 5 blocos"
          ],
          "parent": "Troca de Postura"
        },
        {
          "name": "Raízes Vitais",
          "points": 2,
          "text": "As raízes devolvem a você a vida que arrancam da terra.",
          "details": [
            "Cura 8 quando as raízes prendem algum alvo"
          ],
          "parent": "Abraço da Terra"
        }
      ],
      "paths": [
        {
          "name": "Caminho do Trovão",
          "points": 3,
          "text": "A cada 5 s, o próximo raio do Combo Primal que acerta descarrega um trovão extra.",
          "details": [
            "1 golpe extra (dano base 8) · no máximo a cada 5 s"
          ]
        },
        {
          "name": "Caminho da Terra",
          "points": 3,
          "text": "A cada 5 s, o próximo feixe de cura do Combo Primal que acerta cura muito mais.",
          "details": [
            "Cura extra 12 · no máximo a cada 5 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Grimório",
      "damage": "mágico",
      "twoItems": false
    },
    "resource": "mana"
  },
  "summoner": {
    "level": 1,
    "description": "Invocador que chama criaturas para lutar ao seu lado. As habilidades chegam em breve.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 36
      },
      {
        "name": "Vida",
        "value": 9
      },
      {
        "name": "Mana",
        "value": 9
      }
    ],
    "skills": null,
    "weapon": {
      "name": "Grimório",
      "damage": "mágico",
      "twoItems": false
    }
  },
  "bard": {
    "level": 1,
    "description": "Músico que luta com ondas sonoras. Desacelera os inimigos, toca rapsódias e serenatas e encerra com uma sinfonia de destruição.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 29
      },
      {
        "name": "Vida",
        "value": 7
      },
      {
        "name": "Mana",
        "value": 7
      }
    ],
    "skills": {
      "base": {
        "name": "Onda Sonora",
        "text": "Dispara uma onda sonora que desacelera o alvo. Durante a Rapsódia, vira Memento Mori: até 3 cordas sombrias perseguem inimigos próximos e os cegam.",
        "details": [
          "Onda: dano base 3 · Lentidão II por 2 s · alcance 30",
          "Memento Mori: dano base 5 · até 3 alvos a até 15 blocos · Cegueira por 3 s"
        ]
      },
      "corePassives": [
        {
          "name": "Escudo da Harmonia",
          "points": 1,
          "text": "Notas musicais protetoras giram ao seu redor e dão Resistência a você e aos aliados próximos.",
          "details": [
            "Resistência II por 2 s a até 4 blocos · renova a cada 1,5 s"
          ],
          "notes": [
            "A Resistência vanilla não reduz o dano do RPGCore."
          ]
        }
      ],
      "bar": [
        {
          "name": "Golpe Vibratório",
          "slot": 1,
          "cooldown": 9,
          "cost": {
            "resource": "mana",
            "amount": 44
          },
          "points": 1,
          "text": "Cria uma vibração poderosa em 3 ondas que atordoa os alvos. Cada inimigo é atingido por uma onda a cada uso.",
          "details": [
            "Dano base 3 · raio 4 · atordoa por 2 s · alcance 10"
          ],
          "upgrades": [
            {
              "name": "Vibração Longa",
              "points": 1,
              "text": "A vibração prende os inimigos por mais tempo.",
              "details": [
                "Atordoamento 2 s → 3 s"
              ]
            },
            {
              "name": "Acorde Potente",
              "points": 3,
              "text": "As ondas atingem com mais força.",
              "details": [
                "Dano base 3 → 5"
              ]
            }
          ]
        },
        {
          "name": "Rapsódia",
          "slot": 2,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Acelera o compasso com a ajuda dos pássaros, dando Velocidade a você e aos aliados próximos. Enquanto dura, a Onda Sonora vira Memento Mori.",
          "details": [
            "Velocidade III por 4 s · aliados a até 5 blocos"
          ],
          "upgrades": [
            {
              "name": "Allegro",
              "points": 1,
              "text": "O compasso fica ainda mais rápido.",
              "details": [
                "Velocidade III → IV"
              ]
            },
            {
              "name": "Melodia Vital",
              "points": 3,
              "text": "A melodia também cura quem acompanha o ritmo.",
              "details": [
                "Cura 2 de vida a cada 0,5 s por 4,5 s em você e nos aliados a até 5 blocos"
              ]
            }
          ]
        },
        {
          "name": "Serenata Angelical",
          "slot": 3,
          "cooldown": 16,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca um anjo que cria uma aura de cura sob ele, curando os aliados dentro da área.",
          "details": [
            "Cura 2 de vida a cada 0,5 s por 6 s · raio 4,5 · começa após 2 s"
          ],
          "upgrades": [
            {
              "name": "Prece Imediata",
              "points": 1,
              "text": "A chegada do anjo já cura quem está por perto.",
              "details": [
                "Cura 6 de vida ao conjurar, em você e nos aliados a até 4,5 blocos"
              ]
            },
            {
              "name": "Inspiração",
              "points": 3,
              "text": "O canto do anjo renova a sua inspiração.",
              "details": [
                "Recupera 15 de mana ao conjurar"
              ]
            }
          ]
        },
        {
          "name": "Sinfonia da Destruição",
          "slot": 4,
          "cooldown": 27,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca um círculo de melodias que desacelera todos dentro da área. Depois de um tempo, a clave no centro explode e faz os alvos levitarem.",
          "details": [
            "Lentidão III por 5 s · explosão após 4 s: dano base 10 · raio 7",
            "Levitação por 4 s"
          ],
          "upgrades": [
            {
              "name": "Compasso Pesado",
              "points": 1,
              "text": "O círculo de melodias pesa ainda mais.",
              "details": [
                "Lentidão III → IV"
              ]
            },
            {
              "name": "Clímax",
              "points": 3,
              "text": "A explosão final é o clímax da sinfonia.",
              "details": [
                "Dano base 10 → 16"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Ressonância",
          "points": 2,
          "text": "Cada onda que acerta ecoa de volta em energia.",
          "details": [
            "Recupera 5 de mana por onda que acerta (até 3 por uso)"
          ],
          "parent": "Golpe Vibratório"
        },
        {
          "name": "Réquiem Vital",
          "points": 2,
          "text": "As cordas do Memento Mori roubam a vida de quem atingem.",
          "details": [
            "Cura 2 de vida por golpe de Memento Mori que acerta"
          ],
          "parent": "Rapsódia"
        },
        {
          "name": "Hino da Vitória",
          "points": 2,
          "text": "Cada vitória vira um hino que restaura o bardo.",
          "details": [
            "Cura 10 de vida por abate · Recarga 1 s"
          ],
          "parent": "Serenata Angelical"
        }
      ],
      "paths": [
        {
          "name": "Caminho do Maestro",
          "points": 3,
          "text": "A cada 5 s, a próxima onda sonora é regida com maestria.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto da Onda Sonora, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho do Trovador",
          "points": 3,
          "text": "Ao sofrer dano, o trovador muda o ritmo e escapa.",
          "details": [
            "Cura 10 de vida e Velocidade II por 3 s · Recarga 12 s"
          ]
        }
      ],
      "totalCost": 33,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Instrumento",
      "damage": "mágico",
      "twoItems": false
    },
    "resource": "mana"
  },
  "shadowmancer": {
    "level": 1,
    "description": "Monarca das sombras que ergue um exército. Invoca arqueiros, cavaleiros e um dragão sombrio, e se teleporta pela escuridão.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 36
      },
      {
        "name": "Vida",
        "value": 9
      },
      {
        "name": "Mana",
        "value": 9
      }
    ],
    "skills": {
      "base": {
        "name": "Explosão Sombria",
        "text": "Cria uma pequena explosão de sombras no chão onde você mira.",
        "details": [
          "Dano base 3 · raio 2,5"
        ]
      },
      "corePassives": [
        {
          "name": "Retorno Sombrio",
          "points": 0,
          "text": "Agache até 3 s depois do Teleporte Sombrio para voltar à sombra que você deixou para trás.",
          "details": [
            "Janela de 3 s após o teleporte"
          ]
        },
        {
          "name": "Monarca Sombrio",
          "points": 0,
          "text": "Um espírito sombrio orbita ao seu redor. Ao receber dano, ele amaldiçoa os inimigos próximos e os afasta.",
          "details": [
            "Raio 4 · no máximo uma vez a cada 8 s"
          ]
        }
      ],
      "bar": [
        {
          "name": "Teleporte Sombrio",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Deixa sua sombra para trás e se teleporta para a frente. Agache em até 3 s para voltar a ela (Retorno Sombrio).",
          "details": [
            "Alcance 9 blocos"
          ],
          "upgrades": [
            {
              "name": "Passo Longo",
              "points": 1,
              "text": "O teleporte leva você mais longe.",
              "details": [
                "Alcance 9 → 12 blocos"
              ]
            },
            {
              "name": "Sombra Veloz",
              "points": 2,
              "text": "Ao chegar, as sombras aceleram seus passos.",
              "details": [
                "Velocidade II por 3 s ao chegar"
              ]
            }
          ]
        },
        {
          "name": "Arqueiro Sombrio",
          "slot": 2,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Invoca um arqueiro sombrio que dispara 3 flechas; ao tocar o chão, elas criam ondas de sombra que lentificam.",
          "details": [
            "Dano base 4 por flecha que atravessa · 5 no impacto",
            "Raio 4 no impacto · Lentidão II por 2 s"
          ],
          "upgrades": [
            {
              "name": "Flechas Vorazes",
              "points": 1,
              "text": "Cada flecha atravessa e fere mais inimigos.",
              "details": [
                "Alvos por flecha 1 → 3"
              ]
            },
            {
              "name": "Impacto Profano",
              "points": 2,
              "text": "As ondas de sombra das flechas atingem com mais força.",
              "details": [
                "Dano base no impacto 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Cavaleiro Sombrio",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Invoca um cavaleiro sombrio que avança com duas estocadas e um giro final, lançando os inimigos ao ar.",
          "details": [
            "Dano base 4, 4, 5 e 5 · 4 golpes à frente"
          ],
          "upgrades": [
            {
              "name": "Lança Ampla",
              "points": 1,
              "text": "Os golpes do cavaleiro cobrem uma área maior.",
              "details": [
                "Área 2 → 2,5 e 3 → 4"
              ]
            },
            {
              "name": "Golpe Implacável",
              "points": 2,
              "text": "O cavaleiro golpeia com toda a sua fúria.",
              "details": [
                "Dano base 4 → 6,5 e 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Lâminas Sombrias",
          "slot": 4,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Invoca 5 lâminas sombrias que caem ao seu redor, criando ondas de sombra que lentificam os inimigos.",
          "details": [
            "Dano base 5 · raio 4 em cada lâmina · Lentidão II por 2 s"
          ],
          "upgrades": [
            {
              "name": "Lâminas Amplas",
              "points": 1,
              "text": "As ondas de sombra das lâminas se espalham mais.",
              "details": [
                "Raio 4 → 5"
              ]
            },
            {
              "name": "Lâminas Afiadas",
              "points": 2,
              "text": "As lâminas cortam mais fundo.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Dragão Sombrio",
          "slot": 5,
          "cooldown": 21,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Invoca e monta um dragão sombrio que cospe chamas de sombra à frente. Montado, você não usa outras habilidades.",
          "details": [
            "Dano base 2 por golpe · raio 4 · dura 7 s"
          ],
          "upgrades": [
            {
              "name": "Sopro Amplo",
              "points": 1,
              "text": "As chamas do dragão se espalham mais.",
              "details": [
                "Raio 4 → 5"
              ]
            },
            {
              "name": "Chama Sombria",
              "points": 2,
              "text": "As chamas do dragão queimam com mais força.",
              "details": [
                "Dano base por golpe 2 → 3"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Véu Sombrio",
          "points": 2,
          "text": "Você chega envolto em sombras que bloqueiam os golpes.",
          "details": [
            "Imune a dano por 1 s ao chegar"
          ],
          "parent": "Teleporte Sombrio"
        },
        {
          "name": "Sifão Sombrio",
          "points": 2,
          "text": "Cada impacto das flechas drena energia para você.",
          "details": [
            "8 de mana por impacto que acerta"
          ],
          "parent": "Arqueiro Sombrio"
        },
        {
          "name": "Lança do Pavor",
          "points": 2,
          "text": "Cada golpe do cavaleiro devolve vida a você.",
          "details": [
            "Cura 3 por golpe que acerta"
          ],
          "parent": "Cavaleiro Sombrio"
        },
        {
          "name": "Lâminas Debilitantes",
          "points": 2,
          "text": "As lâminas deixam os inimigos atingidos enfraquecidos.",
          "details": [
            "Fraqueza I por 3 s nos inimigos atingidos"
          ],
          "parent": "Lâminas Sombrias"
        }
      ],
      "paths": [
        {
          "name": "Ira do Monarca",
          "points": 3,
          "text": "O espírito do monarca acumula sua ira. A cada 5 s, a próxima Explosão Sombria que acerta a libera.",
          "details": [
            "1 golpe extra (dano base 8) a cada 5 s"
          ]
        },
        {
          "name": "Pacto Sombrio",
          "points": 3,
          "text": "Cada inimigo que você abate alimenta suas sombras.",
          "details": [
            "Ao abater: cura 10 e 10 de mana · recarga 5 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Grimório",
      "damage": "mágico",
      "twoItems": false
    },
    "resource": "mana"
  },
  "martial_artist": {
    "level": 1,
    "description": "Mestre das artes marciais. Encadeia socos e ganchos, solta ondas de choque e finaliza com o golpe do dragão.",
    "stats": [
      {
        "name": "Força",
        "value": 46
      },
      {
        "name": "Agilidade",
        "value": 12
      },
      {
        "name": "Estamina",
        "value": 11
      }
    ],
    "skills": {
      "base": {
        "name": "Combo Marcial",
        "text": "Desfere uma sequência de golpes: 1º um soco à esquerda; 2º um soco à direita seguido de um gancho que ergue os inimigos; 3º um golpe para baixo que derruba os inimigos, seguido de um soco duplo; 4º carrega por 0,5 s e avança num soco que atordoa.",
        "details": [
          "Dano base 4 por golpe · 6 golpes no combo · raio 3 (4 no último) · atordoa por 0,5 s"
        ]
      },
      "corePassives": [
        {
          "name": "Golpeador Ágil",
          "points": 0,
          "text": "Enquanto corre, agache para executar um longo avanço rápido para frente.",
          "details": [
            "Avanço de cerca de 7 blocos · só no chão · no máximo 1 vez a cada 0,75 s"
          ]
        }
      ],
      "bar": [
        {
          "name": "Golpe Terrestre",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "Corre para frente agarrando os inimigos no caminho. No fim da corrida, salta e golpeia os inimigos contra o chão, atordoando-os.",
          "details": [
            "Dano base 5 · raio 4 · atordoa por 1 s · agarra até 3 inimigos · só no chão"
          ],
          "upgrades": [
            {
              "name": "Arrasto Amplo",
              "points": 1,
              "text": "A corrida arrasta mais inimigos consigo.",
              "details": [
                "Inimigos agarrados 3 → 5"
              ]
            },
            {
              "name": "Impacto Brutal",
              "points": 2,
              "text": "O golpe contra o chão atinge com mais força.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Gancho Múltiplo",
          "slot": 2,
          "cooldown": 15,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Golpeia à frente 6 vezes rapidamente e executa um gancho com salto, lançando os inimigos para o alto.",
          "details": [
            "Dano base 4 ×6 golpes e 4 no gancho · raio 3 · só no chão"
          ],
          "upgrades": [
            {
              "name": "Punhos Amplos",
              "points": 1,
              "text": "Os golpes alcançam inimigos mais afastados.",
              "details": [
                "Raio dos golpes e do gancho 3 → 4"
              ]
            },
            {
              "name": "Gancho Pesado",
              "points": 2,
              "text": "Cada golpe atinge com mais força.",
              "details": [
                "Dano base 4 → 6,5 (golpes e gancho)"
              ]
            }
          ]
        },
        {
          "name": "Onda de Choque Pesada",
          "slot": 3,
          "cooldown": 14,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Desfere um soco forte que empurra os inimigos. Depois carrega uma aura por 1 s e golpeia à frente, criando uma longa onda de choque que empurra e atordoa os inimigos.",
          "details": [
            "Soco: dano base 4, raio 4 · Onda: dano base 4, alcance 13, raio 5, atordoa por 2 s"
          ],
          "upgrades": [
            {
              "name": "Onda Larga",
              "points": 1,
              "text": "O soco e a onda atingem uma área maior.",
              "details": [
                "Raio do soco 4 → 5 · raio da onda 5 → 6,5"
              ]
            },
            {
              "name": "Choque Devastador",
              "points": 2,
              "text": "O soco e a onda atingem com mais força.",
              "details": [
                "Dano base 4 → 6,5 (soco e onda)"
              ]
            }
          ]
        },
        {
          "name": "Golpe Giratório",
          "slot": 4,
          "cooldown": 16,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Executa um chute giratório para a esquerda e outro para a direita, cada um atingindo os inimigos próximos 2 vezes. Por fim, chuta para baixo: no chão, golpeia a superfície e lança os inimigos para o alto; no ar, derruba os inimigos no chão.",
          "details": [
            "Dano base 5 ×4 nos giros e 5 no chute final · raio 5,5 · até 6 inimigos"
          ],
          "upgrades": [
            {
              "name": "Giro Abrangente",
              "points": 1,
              "text": "Os chutes atingem mais inimigos de uma vez.",
              "details": [
                "Inimigos atingidos 6 → 8"
              ]
            },
            {
              "name": "Chute Demolidor",
              "points": 2,
              "text": "Cada chute atinge com mais força.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Golpe do Dragão",
          "slot": 5,
          "cooldown": 60,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Avança golpeando 5 vezes seguidas e pisa no chão, lançando os inimigos próximos ao ar em câmera lenta. Teleporta-se até 3 inimigos diferentes, golpeando cada área 3, 2 e 3 vezes, volta à posição original no ar e derruba todos contra o chão, atordoando-os. Por fim, salta, invoca dragões espirituais e esmaga a superfície.",
          "details": [
            "Dano base 3 por golpe · 5 golpes, pisão, 8 golpes e golpe descendente (atordoa 1 s)",
            "Esmagamento final: dano base 15 · raio 10"
          ],
          "upgrades": [
            {
              "name": "Golpes Dispersos",
              "points": 1,
              "text": "Os golpes após cada teleporte atingem mais inimigos.",
              "details": [
                "Inimigos por golpe 6 → 9 (os 8 golpes após os teleportes)"
              ]
            },
            {
              "name": "Dragão Desperto",
              "points": 2,
              "text": "Todo o ataque atinge com mais força.",
              "details": [
                "Dano base 3 → 5 · esmagamento final 15 → 25"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Abalo Sísmico",
          "points": 2,
          "text": "O impacto abala o chão sob os inimigos atingidos.",
          "details": [
            "Lentidão II por 3 s nos inimigos atingidos pelo impacto"
          ],
          "parent": "Golpe Terrestre"
        },
        {
          "name": "Fluxo Interior",
          "points": 2,
          "text": "Cada golpe que acerta devolve parte do seu vigor.",
          "details": [
            "Cura 2 de vida por golpe que acerta"
          ],
          "parent": "Gancho Múltiplo"
        },
        {
          "name": "Respiração Profunda",
          "points": 2,
          "text": "Acertar a onda de choque renova o seu fôlego.",
          "details": [
            "Recupera 8 de estamina por golpe da onda que acerta"
          ],
          "parent": "Onda de Choque Pesada"
        },
        {
          "name": "Passo do Redemoinho",
          "points": 2,
          "text": "Acertar o chute final deixa você mais leve.",
          "details": [
            "Velocidade II por 3 s quando o chute final acerta"
          ],
          "parent": "Golpe Giratório"
        }
      ],
      "paths": [
        {
          "name": "Caminho do Tigre",
          "points": 3,
          "text": "A cada 5 s, o próximo golpe do combo concentra a força do tigre.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto do Combo Marcial, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho do Mestre",
          "points": 3,
          "text": "Cada inimigo derrotado reacende o seu espírito de luta.",
          "details": [
            "Ao derrotar um inimigo: cura 12 de vida e recupera 10 de estamina · Recarga 5 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Luva",
      "damage": "físico",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "thunder_ronin": {
    "level": 1,
    "description": "Ronin de lâmina carregada de trovão. Corta como um raio, devolve tempestades e desperta o deus do trovão flamejante.",
    "stats": [
      {
        "name": "Força",
        "value": 46
      },
      {
        "name": "Agilidade",
        "value": 12
      },
      {
        "name": "Estamina",
        "value": 11
      }
    ],
    "skills": {
      "base": {
        "name": "Corte do Trovão",
        "text": "Um corte carregado de energia do trovão. A cada terceiro golpe, salta e desce com um impacto que atinge o chão com um raio, com 20% de chance de paralisar os atingidos.",
        "details": [
          "Dano base 3 · 3º golpe 4,5 · raio 4 (5 no 3º) · até 4 alvos · paralisa 2 s",
          "Na forma de Deus do Trovão: 4 golpes de dano base 5; o 4º recua e",
          "invoca uma sequência de raios à frente (30% de chance de paralisar)"
        ]
      },
      "corePassives": [
        {
          "name": "Reflexo Relâmpago",
          "points": 0,
          "text": "Esquiva de ataques com 5% de chance e ganha um impulso de velocidade a cada esquiva.",
          "details": [
            "Ao sofrer dano: 5% de chance de anular o próximo golpe em até 10 s",
            "Velocidade III por 2 s após a esquiva"
          ]
        },
        {
          "name": "Queda Crepitante",
          "points": 1,
          "text": "Segure agachar para saltar no ar acumulando energia do trovão e desferir um mergulho que cai como um raio vindo do céu.",
          "details": [
            "Dano base 5 · raio 9 · até 15 alvos · empurra · recarga 3 s"
          ]
        }
      ],
      "bar": [
        {
          "name": "Trovão e Lampejo",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "estamina",
            "amount": 40
          },
          "points": 1,
          "text": "No chão, dispara num avanço ultrarrápido e saca a espada da bainha num golpe devastador, antes que o inimigo reaja.",
          "details": [
            "Dano base 5 · raio 4 · até 4 alvos · avanço de 12 blocos",
            "Na forma de Deus do Trovão vira Sêxtuplo: 6 avanços em zigue-zague,",
            "dano base 10 por golpe · raio 4,5 · até 7 alvos · atordoa 0,75 s"
          ],
          "upgrades": [
            {
              "name": "Lampejo Amplo",
              "points": 1,
              "text": "O saque atinge mais inimigos no caminho.",
              "details": [
                "Alvos 4 → 6"
              ]
            },
            {
              "name": "Saque Fulminante",
              "points": 3,
              "text": "O saque da espada atinge com mais força.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Revés da Tempestade",
          "slot": 2,
          "cooldown": 12,
          "cost": {
            "resource": "estamina",
            "amount": 56
          },
          "points": 1,
          "text": "No chão, recua num salto e corta duas vezes num arco largo, contra-atacando e paralisando os inimigos.",
          "details": [
            "Dano base 4 ×2 · raio 4 · até 4 alvos · paralisa 2 s"
          ],
          "upgrades": [
            {
              "name": "Arco Largo",
              "points": 1,
              "text": "O arco dos cortes alcança mais inimigos.",
              "details": [
                "Alvos 4 → 6"
              ]
            },
            {
              "name": "Revés Brutal",
              "points": 3,
              "text": "Os dois cortes atingem com mais força.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Barragem Trovejante",
          "slot": 3,
          "cooldown": 29,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Concentra-se e perfura à frente várias vezes em altíssima velocidade. Enquanto isso, você fica mais lento.",
          "details": [
            "Dano base 5 · 20 estocadas em 2 s · raio 4 · até 5 alvos"
          ],
          "upgrades": [
            {
              "name": "Estocadas Amplas",
              "points": 1,
              "text": "Cada estocada atinge mais inimigos.",
              "details": [
                "Alvos 5 → 7"
              ]
            },
            {
              "name": "Perfuração Trovejante",
              "points": 3,
              "text": "As estocadas perfuram com mais força.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Deus do Trovão Flamejante",
          "slot": 4,
          "cooldown": 20,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Transforma-se num deus do trovão, com um dragão do trovão invocado às suas costas. Seus golpes mudam nessa forma: o Corte do Trovão vira Corte do Trovão Flamejante e o Trovão e Lampejo vira Sêxtuplo.",
          "details": [
            "Duração 10 s"
          ],
          "upgrades": [
            {
              "name": "Dragão Faminto",
              "points": 1,
              "text": "Os cortes flamejantes alcançam mais inimigos.",
              "details": [
                "Alvos dos cortes e dos raios da forma 4 → 6"
              ]
            },
            {
              "name": "Chama Divina",
              "points": 3,
              "text": "A chama divina fortalece os golpes da forma.",
              "details": [
                "Dano base dos cortes flamejantes 5 → 8 · Sêxtuplo 10 → 16"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Lâmina Carregada",
          "points": 2,
          "text": "Cada inimigo cortado recarrega a sua lâmina.",
          "details": [
            "Recupera 5 de estamina por golpe do saque que acerta"
          ],
          "parent": "Trovão e Lampejo"
        },
        {
          "name": "Revés Vital",
          "points": 2,
          "text": "O contra-ataque devolve o fôlego ao ronin.",
          "details": [
            "Cura 3 de vida por golpe que acerta"
          ],
          "parent": "Revés da Tempestade"
        },
        {
          "name": "Estática",
          "points": 2,
          "text": "A eletricidade das estocadas trava os músculos dos inimigos.",
          "details": [
            "Lentidão II por 2 s em quem as estocadas acertam"
          ],
          "parent": "Barragem Trovejante"
        }
      ],
      "paths": [
        {
          "name": "Caminho da Tempestade",
          "points": 3,
          "text": "A cada 5 s, o próximo corte descarrega toda a tempestade.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto do Corte do Trovão, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho do Relâmpago",
          "points": 3,
          "text": "Ao sofrer dano, o ronin vira um lampejo e sai do alcance.",
          "details": [
            "Imune a dano por 1 s e Velocidade II por 3 s · Recarga 8 s"
          ]
        }
      ],
      "totalCost": 33,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Espada",
      "damage": "físico",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "water_samurai": {
    "level": 1,
    "description": "Samurai que corta com a força da água. Gira como uma roda d'água, dança com fluidez e afoga os inimigos na maré.",
    "stats": [
      {
        "name": "Força",
        "value": 46
      },
      {
        "name": "Agilidade",
        "value": 12
      },
      {
        "name": "Estamina",
        "value": 11
      }
    ],
    "skills": {
      "base": {
        "name": "Corte da Superfície",
        "text": "Um corte horizontal carregado de energia da água. A cada terceiro golpe, executa dois cortes horizontais seguidos.",
        "details": [
          "Dano base 4 · raio 4 · até 4 alvos"
        ]
      },
      "corePassives": [
        {
          "name": "Correnteza Turbulenta",
          "points": 0,
          "text": "Uma técnica de movimento fluida que permite navegar rápido e sem obstáculos. Você corre mais rápido.",
          "details": [
            "Velocidade I enquanto corre · renova a cada 0,5 s"
          ]
        },
        {
          "name": "Redemoinho",
          "points": 1,
          "text": "Segure agachar para criar um vórtice de água que puxa os inimigos, seguido de giros cortantes.",
          "details": [
            "Puxão: 11 golpes de dano base 0,8 · giros: dano base 4 ×2",
            "Raio 7,5 · até 8 alvos · recarga 6 s"
          ]
        }
      ],
      "bar": [
        {
          "name": "Roda d'Água",
          "slot": 1,
          "cooldown": 9,
          "cost": {
            "resource": "estamina",
            "amount": 44
          },
          "points": 1,
          "text": "No chão, desfere um corte para cima, levando os inimigos com você, e executa um corte vertical giratório no ar.",
          "details": [
            "Subida: dano base 4 · raio 3,5 · até 4 alvos · atordoa 0,5 s",
            "Giro: dano base 4 ×5 · raio 4 · até 4 alvos"
          ],
          "upgrades": [
            {
              "name": "Roda Larga",
              "points": 1,
              "text": "A roda arrasta mais inimigos.",
              "details": [
                "Alvos 4 → 6 (subida e giro)"
              ]
            },
            {
              "name": "Roda Impetuosa",
              "points": 3,
              "text": "Os cortes da roda atingem com mais força.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Dança Fluida",
          "slot": 2,
          "cooldown": 20,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "No chão, executa um combo contínuo e elegante de golpes enquanto avança através dos inimigos. Quem é atingido levita por um tempo.",
          "details": [
            "Dano base 5 ×5 · raio 5 · até 5 alvos · Levitação por 2 s"
          ],
          "upgrades": [
            {
              "name": "Dança Envolvente",
              "points": 1,
              "text": "A dança envolve mais inimigos.",
              "details": [
                "Alvos 5 → 7"
              ]
            },
            {
              "name": "Dança Cortante",
              "points": 3,
              "text": "Cada passo da dança corta mais fundo.",
              "details": [
                "Dano base 5 → 8"
              ]
            }
          ]
        },
        {
          "name": "Maré Avassaladora",
          "slot": 3,
          "cooldown": 22,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Desfere uma série rápida de cortes poderosos como o bater das ondas. O golpe final para baixo cria uma linha de jorros de água que arremessam os inimigos para cima.",
          "details": [
            "Dano base 4 ×6 · raio 5 · até 4 alvos · jorros: dano base 4, raio 4"
          ],
          "upgrades": [
            {
              "name": "Maré Cheia",
              "points": 1,
              "text": "A maré alcança mais inimigos.",
              "details": [
                "Alvos 4 → 6 (cortes e jorros)"
              ]
            },
            {
              "name": "Maré Brava",
              "points": 3,
              "text": "As ondas batem com mais força.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Fluxo Constante",
          "slot": 4,
          "cooldown": 40,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Ganha muita velocidade enquanto executa um giro contínuo e poderoso que acumula força. No fim, libera a energia da água acumulada e faz todos os atingidos levitarem.",
          "details": [
            "Giro: dano base 7 · 20 golpes em 3 s · raio 5 · até 7 alvos",
            "Liberação: dano base 10,5 · raio 12 · até 15 alvos · Levitação por 4 s"
          ],
          "upgrades": [
            {
              "name": "Vórtice Amplo",
              "points": 1,
              "text": "O giro arrasta mais inimigos.",
              "details": [
                "Alvos do giro 7 → 10"
              ]
            },
            {
              "name": "Fluxo Implacável",
              "points": 3,
              "text": "O fluxo ganha ainda mais força.",
              "details": [
                "Dano base 7 → 11 (giro) · liberação 10,5 → 16,5"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Corrente Revigorante",
          "points": 2,
          "text": "A água que gira com você também o restaura.",
          "details": [
            "Cura 2 de vida por golpe da roda que acerta"
          ],
          "parent": "Roda d'Água"
        },
        {
          "name": "Ritmo da Correnteza",
          "points": 2,
          "text": "O ritmo da dança renova o seu fôlego.",
          "details": [
            "Recupera 3 de estamina por golpe da dança que acerta"
          ],
          "parent": "Dança Fluida"
        },
        {
          "name": "Ressaca",
          "points": 2,
          "text": "Os jorros puxam os inimigos como uma ressaca.",
          "details": [
            "Lentidão II por 2 s em quem os jorros acertam"
          ],
          "parent": "Maré Avassaladora"
        }
      ],
      "paths": [
        {
          "name": "Caminho da Correnteza",
          "points": 3,
          "text": "A cada 5 s, o próximo corte carrega toda a correnteza.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto do Corte da Superfície, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho da Água Serena",
          "points": 3,
          "text": "Ao sofrer dano, o samurai flui como a água e se recompõe.",
          "details": [
            "Cura 12 de vida e Velocidade I por 3 s · Recarga 10 s"
          ]
        }
      ],
      "totalCost": 33,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Espada",
      "damage": "físico",
      "twoItems": false
    },
    "resource": "estamina"
  },
  "bloodmoon_vampire": {
    "level": 1,
    "description": "Vampiro que molda o próprio sangue em armas. Troca entre lâminas, agulhas, grimório e foice para drenar os inimigos.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 46
      },
      {
        "name": "Agilidade",
        "value": 12
      },
      {
        "name": "Mana",
        "value": 11
      }
    ],
    "skills": {
      "base": {
        "name": "Combo da Lua de Sangue",
        "text": "O ataque muda com a forma da arma de sangue: Corte Carmesim (Lâminas): combo de 3 passos. Corte em X, estocada rápida, recuo e avanço com estocada e corte lateral. Arcano das Estacas (Grimório): combo de 3 passos. Duas fileiras de estacas de sangue e um meteoro de sangue onde você mira. Espinhos Escarlates (Agulhas): dispara agulhas de sangue que se acumulam no inimigo (máx. 5). Espiral do Ceifador (Foice): combo de 4 passos. Avanços girando que empurram, lançam para cima e derrubam os inimigos.",
        "details": [
          "Dano base 4 por golpe · Lâminas raio 4, até 3 alvos",
          "Grimório raio 2-3 (meteoro 6, até 5 alvos) · Foice raio 5, até 6 alvos"
        ]
      },
      "corePassives": [
        {
          "name": "Dobra de Sangue",
          "points": 0,
          "text": "Molda o sangue em 4 formas de arma: Lâminas, Grimório, Agulhas e Foice. A arma da forma atual flutua ao seu lado e o sangue drenado pelo Ímpeto Vampírico cura você.",
          "details": [
            "Lâminas: Velocidade I · Foice: Lentidão I · começa nas Lâminas"
          ],
          "notes": [
            "Desbloqueie primeiro: sem ela as formas não funcionam"
          ]
        }
      ],
      "bar": [
        {
          "name": "Ímpeto Vampírico",
          "slot": 1,
          "cooldown": 13,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Muda com a forma da arma de sangue: Avanço Vampírico (Lâminas): avanço explosivo no chão que corta e drena todos no caminho. Enxame de Morcegos (Grimório): morcegos de sangue que drenam a vida de quem acertam. Explosão de Sangue (Agulhas): explode as agulhas acumuladas nos inimigos próximos; mais agulhas, mais dano e dreno. Ceifador de Almas (Foice): arremessa a foice girando, que empurra, volta e puxa os inimigos, drenando a vida deles.",
          "details": [
            "Dano base 4 (Explosão 2 por agulha) · cura 1 a 3 por alvo drenado"
          ],
          "upgrades": [
            {
              "name": "Dreno Amplo",
              "points": 1,
              "text": "O ímpeto drena mais inimigos de uma vez.",
              "details": [
                "Alvos: Avanço 3 → 5 · Morcegos 2 → 3 · Ceifador 6 → 8"
              ]
            },
            {
              "name": "Ímpeto Voraz",
              "points": 2,
              "text": "A fome de sangue torna cada forma mais letal.",
              "details": [
                "Dano base 4 → 6,5 · Explosão 2 → 3 por agulha (5 agulhas 10 → 16)"
              ]
            }
          ]
        },
        {
          "name": "Lâminas de Sangue",
          "slot": 2,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Molda o sangue na forma de Lâminas: armas rápidas, de vários golpes e alcance curto. Você ganha Velocidade I nessa forma.",
          "details": [
            "Muda o Combo e o Ímpeto para a forma de Lâminas"
          ],
          "upgrades": [
            {
              "name": "Lâminas Largas",
              "points": 1,
              "text": "Os golpes do Corte Carmesim alcançam mais inimigos.",
              "details": [
                "Alvos por golpe 3 → 5"
              ]
            },
            {
              "name": "Corte Profundo",
              "points": 2,
              "text": "As lâminas cortam mais fundo.",
              "details": [
                "Dano base do Corte Carmesim 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Agulhas de Sangue",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Molda o sangue na forma de Agulhas: armas rápidas e de longo alcance.",
          "details": [
            "Muda o Combo e o Ímpeto para a forma de Agulhas"
          ],
          "upgrades": [
            {
              "name": "Agulha Perfurante",
              "points": 1,
              "text": "Cada agulha atravessa e crava em mais um inimigo.",
              "details": [
                "Alvos por agulha 1 → 2"
              ]
            },
            {
              "name": "Agulhas Afiadas",
              "points": 2,
              "text": "As agulhas ficam mais afiadas.",
              "details": [
                "Dano base dos Espinhos Escarlates 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Grimório de Sangue",
          "slot": 4,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Molda o sangue na forma de Grimório: arma de velocidade normal, longo alcance e focada em área.",
          "details": [
            "Muda o Combo e o Ímpeto para a forma de Grimório"
          ],
          "upgrades": [
            {
              "name": "Ritual Amplo",
              "points": 1,
              "text": "As estacas e o meteoro atingem mais inimigos.",
              "details": [
                "Alvos: estacas 3 → 5 · meteoro 5 → 7"
              ]
            },
            {
              "name": "Grimório Profano",
              "points": 2,
              "text": "Magia proibida reforça o Arcano das Estacas.",
              "details": [
                "Dano base das estacas e do meteoro 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Foice de Sangue",
          "slot": 5,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Molda o sangue na forma de Foice: arma lenta, pesada e de grande alcance. Você fica com Lentidão I nessa forma.",
          "details": [
            "Muda o Combo e o Ímpeto para a forma de Foice"
          ],
          "upgrades": [
            {
              "name": "Ceifa Ampla",
              "points": 1,
              "text": "Os giros da Espiral do Ceifador alcançam mais inimigos.",
              "details": [
                "Alvos por giro 6 → 8"
              ]
            },
            {
              "name": "Foice Cruel",
              "points": 2,
              "text": "A foice ceifa com mais força.",
              "details": [
                "Dano base da Espiral do Ceifador 4 → 6,5"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Sede Insaciável",
          "points": 2,
          "text": "O sangue drenado devolve o fôlego ao vampiro.",
          "details": [
            "Recupera 5 de mana por golpe do Ímpeto que acerta"
          ],
          "parent": "Ímpeto Vampírico"
        },
        {
          "name": "Frenesi Carmesim",
          "points": 2,
          "text": "Cada corte das lâminas alimenta o vampiro.",
          "details": [
            "Cura 2 de vida por golpe do Corte Carmesim que acerta"
          ],
          "parent": "Lâminas de Sangue"
        },
        {
          "name": "Hemorragia",
          "points": 2,
          "text": "As agulhas abrem feridas que fazem o inimigo sangrar.",
          "details": [
            "Lentidão I por 2 s em quem os Espinhos Escarlates acertam"
          ],
          "parent": "Agulhas de Sangue"
        },
        {
          "name": "Banquete de Sangue",
          "points": 2,
          "text": "Cada vida ceifada alimenta o vampiro.",
          "details": [
            "Ao abater um inimigo: cura 10 de vida · Recarga 1 s"
          ],
          "parent": "Grimório de Sangue"
        }
      ],
      "paths": [
        {
          "name": "Lua de Sangue",
          "points": 3,
          "text": "A cada 5 s, a lua de sangue fortalece o próximo ataque.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto do Combo, 1 a cada 5 s"
          ]
        },
        {
          "name": "Forma de Névoa",
          "points": 3,
          "text": "Ao sofrer dano, o vampiro se desfaz em névoa por um instante.",
          "details": [
            "Imune a dano por 1 s e cura 10 de vida · Recarga 10 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Grimório",
      "damage": "mágico",
      "twoItems": false
    },
    "resource": "mana"
  },
  "dragon_warrior": {
    "level": 1,
    "description": "Guerreiro com o poder dos dragões. Encadeia golpes dracônicos, perfura os céus e libera o rugido e a ira do dragão.",
    "stats": [
      {
        "name": "Força",
        "value": 46
      },
      {
        "name": "Vida",
        "value": 12
      },
      {
        "name": "Estamina",
        "value": 11
      }
    ],
    "skills": {
      "base": {
        "name": "Combo do Dragão",
        "text": "Uma cadeia de golpes dracônicos: corte diagonal, corte e estocada, giro contínuo, estocada com dois cortes e, no quinto golpe, um salto com mergulho que crava a lança no chão.",
        "details": [
          "Dano base 4 / 4 / 2 / 3 / 7 · raio 3 · até 6 alvos",
          "Mergulho: raio 6 · até 8 alvos · lança os inimigos para cima"
        ]
      },
      "corePassives": [
        {
          "name": "Chama Dracônica",
          "points": 0,
          "text": "Seus golpes podem infligir Chama Dracônica, uma queimadura roxa que causa dano bem mais rápido que a queimadura comum.",
          "details": [
            "Dano base 1 a cada 0,75 s · 3 a 6 s · 40% de chance por golpe",
            "(garantida no mergulho do combo, no Perfura-Céus e na Ira do Dragão)"
          ]
        }
      ],
      "bar": [
        {
          "name": "Presa do Dragão",
          "slot": 1,
          "cooldown": 12,
          "cost": {
            "resource": "estamina",
            "amount": 56
          },
          "points": 1,
          "text": "No chão, uma sequência de estocadas dracônicas. Primeiro uso: estocadas rápidas à frente. Segundo uso, em até 15 s: uma estocada poderosa que empurra os inimigos para longe.",
          "details": [
            "Estocadas: dano base 2 ×4 · final: dano base 6 · raio 3 · até 6 alvos"
          ],
          "upgrades": [
            {
              "name": "Presa Ampla",
              "points": 1,
              "text": "As estocadas alcançam mais inimigos.",
              "details": [
                "Alvos 6 → 9 (estocadas e estocada final)"
              ]
            },
            {
              "name": "Presa Afiada",
              "points": 2,
              "text": "As presas do dragão perfuram mais fundo.",
              "details": [
                "Dano base 2 → 3 (estocadas) · 6 → 9,5 (estocada final)"
              ]
            }
          ]
        },
        {
          "name": "Espiral Dracônica",
          "slot": 2,
          "cooldown": 27,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "No chão, golpeia o solo e lança os inimigos ao ar, salta atrás deles girando a lança em espiral e termina com um golpe para baixo que causa dano em área no impacto.",
          "details": [
            "Impacto: dano base 4 · raio 6 · até 8 alvos · lança para cima",
            "Giros: dano base 2 ×5 · queda: dano base 4 ×2 · raio 3 · até 6 alvos"
          ],
          "upgrades": [
            {
              "name": "Espiral Ampla",
              "points": 1,
              "text": "A espiral arrasta mais inimigos.",
              "details": [
                "Alvos 8 → 11 (impacto) · 6 → 8 (giros e queda)"
              ]
            },
            {
              "name": "Espiral Feroz",
              "points": 2,
              "text": "Cada volta da lança corta mais fundo.",
              "details": [
                "Dano base 4 → 6,5 (impacto e queda) · giros 2 → 3,25"
              ]
            }
          ]
        },
        {
          "name": "Perfura-Céus",
          "slot": 3,
          "cooldown": 22,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Salta alto e forma uma longa lança de energia dracônica. Depois de carregar, arremessa a lança para onde você olha; ao atingir o chão, ela explode e inflige Chama Dracônica.",
          "details": [
            "Explosão: dano base 7 · raio 7 · até 10 alvos · mire em um bloco"
          ],
          "upgrades": [
            {
              "name": "Impacto Amplo",
              "points": 1,
              "text": "A explosão da lança atinge mais inimigos.",
              "details": [
                "Alvos 10 → 14"
              ]
            },
            {
              "name": "Lança Celeste",
              "points": 2,
              "text": "A lança concentra ainda mais energia dracônica.",
              "details": [
                "Dano base 7 → 11"
              ]
            }
          ],
          "aimRange": 70
        },
        {
          "name": "Rugido do Dragão",
          "slot": 4,
          "cooldown": 34,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Libera 5 ondas de energia cortante que explodem ao acertar. Depois invoca a cabeça de um espírito de dragão que ruge e avança, arrastando os inimigos, e termina numa grande explosão dracônica.",
          "details": [
            "Ondas: dano base 4 ×5 · raio 5 · até 5 alvos",
            "Explosão final: dano base 8 · raio 8 · até 15 alvos · arremessa"
          ],
          "upgrades": [
            {
              "name": "Ondas Largas",
              "points": 1,
              "text": "Cada onda explode sobre mais inimigos.",
              "details": [
                "Alvos por onda 5 → 7"
              ]
            },
            {
              "name": "Rugido Feroz",
              "points": 2,
              "text": "O rugido do dragão ganha mais força.",
              "details": [
                "Dano base 4 → 6,5 (ondas) · 8 → 13 (explosão final)"
              ]
            }
          ]
        },
        {
          "name": "Ira do Dragão",
          "slot": 5,
          "cooldown": 60,
          "cost": {
            "resource": "estamina",
            "amount": 60
          },
          "points": 1,
          "text": "Uma estocada devastadora, 7 cortes e 10 estocadas rápidas. Depois recua e invoca o espírito do dragão de asas abertas, que avança soltando explosões dracônicas a cada 0,25 s.",
          "details": [
            "Cortes: dano base 6 ×8 · estocadas: dano base 2,1 ×10 · até 10 alvos",
            "Explosões: dano base 12 · raio 6,5 · até 10 alvos · arremessa"
          ],
          "upgrades": [
            {
              "name": "Devastação Ampla",
              "points": 1,
              "text": "As explosões do espírito alcançam mais inimigos.",
              "details": [
                "Alvos por explosão 10 → 14"
              ]
            },
            {
              "name": "Ira Implacável",
              "points": 2,
              "text": "A ira do dragão não conhece limites.",
              "details": [
                "Dano base 6 → 9,5 (cortes) · 2,1 → 3,3 (estocadas) · 12 → 19 (explosões)"
              ]
            }
          ]
        }
      ],
      "passives": [
        {
          "name": "Sangue Dracônico",
          "points": 2,
          "text": "O sangue de dragão fecha as suas feridas a cada estocada.",
          "details": [
            "Cura 2 de vida por golpe da Presa do Dragão que acerta"
          ],
          "parent": "Presa do Dragão"
        },
        {
          "name": "Queda Esmagadora",
          "points": 2,
          "text": "O impacto final da espiral deixa os inimigos cambaleantes.",
          "details": [
            "Lentidão II por 3 s em quem o impacto final acerta"
          ],
          "parent": "Espiral Dracônica"
        },
        {
          "name": "Fôlego Celeste",
          "points": 2,
          "text": "Acertar a lança renova o seu fôlego.",
          "details": [
            "Recupera 10 de estamina quando a explosão da lança acerta"
          ],
          "parent": "Perfura-Céus"
        },
        {
          "name": "Pavor Dracônico",
          "points": 2,
          "text": "A explosão final enfraquece quem sobrevive a ela.",
          "details": [
            "Fraqueza I por 4 s em quem a explosão final acerta"
          ],
          "parent": "Rugido do Dragão"
        }
      ],
      "paths": [
        {
          "name": "Caminho da Chama",
          "points": 3,
          "text": "A cada 5 s, o próximo golpe do combo carrega a chama do dragão.",
          "details": [
            "1 golpe extra (dano base 8) no próximo acerto dos golpes 1 a 4 do combo, 1 a cada 5 s"
          ]
        },
        {
          "name": "Caminho das Escamas",
          "points": 3,
          "text": "Ao sofrer dano, as escamas do dragão se fecham sobre você.",
          "details": [
            "Cura 12 de vida e bloqueia todo dano por 1 s · Recarga 10 s"
          ]
        }
      ],
      "totalCost": 34,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Espada",
      "damage": "físico",
      "twoItems": true
    },
    "resource": "estamina"
  },
  "necromancer": {
    "level": 100,
    "description": "Senhor dos mortos com uma foice necrótica. Coleta almas para erguer esqueletos guerreiros, magos e um necrocavaleiro.",
    "stats": [
      {
        "name": "Inteligência",
        "value": 46
      },
      {
        "name": "Vida",
        "value": 12
      },
      {
        "name": "Mana",
        "value": 11
      }
    ],
    "skills": {
      "base": {
        "name": "Combo Necrótico",
        "text": "Uma sequência de quatro golpes de foice necrótica; o terceiro gira a foice várias vezes e o último ergue os inimigos e racha o chão à sua frente.",
        "details": [
          "Dano base 4 · 4 · 2 (4 giros) · 5 · até 5 alvos"
        ]
      },
      "corePassives": [
        {
          "name": "Almas Condenadas",
          "points": 1,
          "text": "Inimigos que morrem perto de você deixam uma alma; passe perto dela para guardá-la. Uma foice espectral flutua sobre você enquanto empunha a arma da classe. Necessária para invocar lacaios.",
          "details": [
            "Até 5 almas · raio 30 · cada invocação consome 1 alma"
          ]
        }
      ],
      "bar": [
        {
          "name": "Caveiras Espectrais",
          "slot": 1,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Dispara uma caveira espectral para onde você olha; ela explode ao tocar um inimigo ou um bloco, atingindo quem estiver por perto.",
          "details": [
            "Dano base 4 · raio 3 · alcance 30"
          ],
          "upgrades": [
            {
              "name": "Estouro Amplo",
              "points": 1,
              "text": "A explosão das caveiras alcança mais inimigos ao redor.",
              "details": [
                "Raio da explosão 3 → 4"
              ]
            },
            {
              "name": "Caveiras Vorazes",
              "points": 2,
              "text": "As caveiras explodem com mais força.",
              "details": [
                "Dano base 4 → 6,5"
              ]
            }
          ]
        },
        {
          "name": "Guerreiro Esqueleto",
          "slot": 2,
          "cooldown": 21,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Consome 1 alma e ergue um guerreiro esqueleto onde você mira. Ele combate ao seu lado por 30 s, golpeando de perto.",
          "details": [
            "Dano base 4 por golpe · cerca de 1 golpe por segundo"
          ],
          "upgrades": [
            {
              "name": "Ossos Afiados",
              "points": 1,
              "text": "O guerreiro golpeia com lâminas de osso mais afiadas.",
              "details": [
                "Dano base por golpe 4 → 6,5"
              ]
            },
            {
              "name": "Golpe Drenante",
              "points": 2,
              "text": "Cada golpe do guerreiro drena vida para você.",
              "details": [
                "Cura 2 por golpe que acerta"
              ]
            }
          ],
          "aimRange": 30
        },
        {
          "name": "Comando do Necromante",
          "slot": 3,
          "cooldown": 8,
          "cost": {
            "resource": "mana",
            "amount": 40
          },
          "points": 1,
          "text": "Ordena aos seus lacaios: Foco (atacam o alvo que você acertou), Livre (atacam tudo ao redor) ou Descanso (voltam para perto de você). Cada uso passa para a próxima ordem.",
          "details": [
            "Sem dano · alterna a ordem dos lacaios"
          ],
          "upgrades": [
            {
              "name": "Comando Veloz",
              "points": 1,
              "text": "Dar uma ordem acelera seus passos.",
              "details": [
                "Velocidade I por 3 s a cada troca"
              ]
            },
            {
              "name": "Comando Restaurador",
              "points": 2,
              "text": "Dar uma ordem devolve parte da sua mana.",
              "details": [
                "10 de mana a cada troca"
              ]
            }
          ]
        },
        {
          "name": "Mago Esqueleto",
          "slot": 4,
          "cooldown": 32,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Consome 1 alma e ergue um mago esqueleto onde você mira. Por 30 s ele dispara esferas necróticas de longe, que queimam o alvo.",
          "details": [
            "Dano base 4 por esfera · queima 4 s · alcance 37"
          ],
          "upgrades": [
            {
              "name": "Fogo Sepulcral",
              "points": 1,
              "text": "As esferas do mago queimam com fogo do sepulcro.",
              "details": [
                "Dano base por esfera 4 → 6,5"
              ]
            },
            {
              "name": "Toque Gélido",
              "points": 2,
              "text": "As esferas do mago gelam quem atingem.",
              "details": [
                "Lentidão I por 2 s por esfera que acerta"
              ]
            }
          ],
          "aimRange": 30
        },
        {
          "name": "Necrocavaleiro",
          "slot": 5,
          "cooldown": 60,
          "cost": {
            "resource": "mana",
            "amount": 60
          },
          "points": 1,
          "text": "Consome 1 alma e ergue um necrocavaleiro onde você mira. Por 30 s ele perfura grupos com a lança e às vezes avança contra os inimigos com uma sequência de golpes.",
          "details": [
            "Dano base 7 por estocada · investida 4,9 por golpe · no máximo 2"
          ],
          "upgrades": [
            {
              "name": "Investida Brutal",
              "points": 1,
              "text": "A investida do cavaleiro atinge com mais peso.",
              "details": [
                "Dano base por golpe da investida 4,9 → 7,7"
              ]
            },
            {
              "name": "Fúria do Cavaleiro",
              "points": 2,
              "text": "O cavaleiro luta com fúria redobrada.",
              "details": [
                "Dano base 7 → 11 (investida 4,9 → 7,7)"
              ]
            }
          ],
          "aimRange": 30
        }
      ],
      "passives": [
        {
          "name": "Colheita Vital",
          "points": 2,
          "text": "A explosão das caveiras rouba a vida dos atingidos.",
          "details": [
            "Cura 3 por golpe que acerta"
          ],
          "parent": "Caveiras Espectrais"
        },
        {
          "name": "Guarda de Ossos",
          "points": 2,
          "text": "Quando você é atingido, uma barreira de ossos absorve o golpe.",
          "details": [
            "1 s de imunidade · recarga 15 s"
          ],
          "parent": "Guerreiro Esqueleto"
        },
        {
          "name": "Dízimo das Almas",
          "points": 2,
          "text": "Cada inimigo que você abate paga um dízimo de mana.",
          "details": [
            "10 de mana por abate"
          ],
          "parent": "Comando do Necromante"
        },
        {
          "name": "Maldição Debilitante",
          "points": 2,
          "text": "As esferas do mago enfraquecem quem atingem.",
          "details": [
            "Fraqueza I por 3 s por esfera que acerta"
          ],
          "parent": "Mago Esqueleto"
        }
      ],
      "paths": [
        {
          "name": "Ceifa Sombria",
          "points": 3,
          "text": "A cada 5 s sua foice se carrega de morte: o próximo golpe do Combo Necrótico que acerta causa um golpe extra.",
          "details": [
            "1 golpe extra (dano base 8) · no máximo a cada 5 s"
          ]
        },
        {
          "name": "Pacto da Morte",
          "points": 3,
          "text": "Cada vida que você ceifa renova a sua.",
          "details": [
            "Cura 15 ao abater um inimigo · recarga 5 s"
          ]
        }
      ],
      "totalCost": 35,
      "requiresSpent": 12
    },
    "weapon": {
      "name": "Cajado",
      "damage": "mágico",
      "twoItems": false
    },
    "resource": "mana"
  }
};
