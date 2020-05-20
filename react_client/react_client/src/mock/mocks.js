import {gql} from "apollo-boost";
import map from "lodash/map";
import range from "lodash/range";
import {getCurrentUser} from "../common/session";


export const ALL_PRODUCTS_QUERY = gql`
  {
  allProducts(first:20) {
    edges {
      node {
        id
        name
        description
        currentPrice
        illustrativeMediaUrl
        createdAt
        tags
        brand
      }
    }
  }
}
`;

export const allProductsResponse = {
    "data": {
        "allProducts": {
            "edges": [
                {
                    "node": {
                        "id": 1,
                        "name": "sandwich",
                        "description": "Commercial fall social. His camera special hundred always. Yet economy produce resource animal line ok.\nFormer town security pick own music feel. Thing team although daughter rule likely despite.",
                        "currentPrice": "62.41000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/209/200/300.jpg",
                            "https://i.picsum.photos/id/70/200/300.jpg",
                            "https://i.picsum.photos/id/1/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.145402",
                        "tags": [
                            "LLC",
                            "Inc",
                            "and Sons",
                            "LLC",
                            "and Sons"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 2,
                        "name": "yeast",
                        "description": "Thousand yet whose defense happy card theory. Organization figure ten week production subject for establish.",
                        "currentPrice": "58.96000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/87/200/300.jpg",
                            "https://i.picsum.photos/id/103/200/300.jpg",
                            "https://i.picsum.photos/id/158/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.146402",
                        "tags": [
                            "Group",
                            "Ltd",
                            "PLC",
                            "Group",
                            "and Sons"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 3,
                        "name": "wheat",
                        "description": "Reason series here near number play hard join. Common its glass hair tell relationship whatever dinner.",
                        "currentPrice": "9.50000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/19/200/300.jpg",
                            "https://i.picsum.photos/id/54/200/300.jpg",
                            "https://i.picsum.photos/id/185/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.146402",
                        "tags": [
                            "Group",
                            "Inc",
                            "Inc",
                            "LLC",
                            "Inc"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 4,
                        "name": "drink",
                        "description": "Present star any memory get. Listen land significant. Throughout they describe arm something majority.\nStudy include throughout specific situation term station. Condition on mission.",
                        "currentPrice": "18.20000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/108/200/300.jpg",
                            "https://i.picsum.photos/id/5/200/300.jpg",
                            "https://i.picsum.photos/id/283/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.147401",
                        "tags": [
                            "and Sons",
                            "and Sons",
                            "Group",
                            "LLC",
                            "PLC"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 5,
                        "name": "croissant",
                        "description": "Too compare mission fight than relationship soon. Culture sing dream. Money tend process manage.",
                        "currentPrice": "65.55000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/107/200/300.jpg",
                            "https://i.picsum.photos/id/149/200/300.jpg",
                            "https://i.picsum.photos/id/108/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.147401",
                        "tags": [
                            "and Sons",
                            "Group",
                            "and Sons",
                            "and Sons",
                            "LLC"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 6,
                        "name": "olive",
                        "description": "Day red culture break laugh force. East control security manager rock interesting run.",
                        "currentPrice": "98.09000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/295/200/300.jpg",
                            "https://i.picsum.photos/id/79/200/300.jpg",
                            "https://i.picsum.photos/id/207/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.147401",
                        "tags": [
                            "Ltd",
                            "LLC",
                            "and Sons",
                            "PLC",
                            "LLC"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 7,
                        "name": "plate",
                        "description": "Meet former financial day interview let find system. Natural car analysis. Contain rest day the new relationship. Hair here area natural anything right election.",
                        "currentPrice": "23.68000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/281/200/300.jpg",
                            "https://i.picsum.photos/id/65/200/300.jpg",
                            "https://i.picsum.photos/id/110/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.148401",
                        "tags": [
                            "LLC",
                            "and Sons",
                            "Ltd",
                            "Ltd",
                            "Ltd"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 8,
                        "name": "hamburger",
                        "description": "Risk campaign moment tax parent.\nBill miss may result huge walk visit. Poor win six meeting no.",
                        "currentPrice": "72.13000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/236/200/300.jpg",
                            "https://i.picsum.photos/id/156/200/300.jpg",
                            "https://i.picsum.photos/id/157/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.148401",
                        "tags": [
                            "and Sons",
                            "and Sons",
                            "and Sons",
                            "Inc",
                            "PLC"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 9,
                        "name": "grill",
                        "description": "Past main think skill common.\nHelp majority site. Station if stay cut spring. Trial fill establish indicate condition bad.",
                        "currentPrice": "18.82000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/30/200/300.jpg",
                            "https://i.picsum.photos/id/273/200/300.jpg",
                            "https://i.picsum.photos/id/211/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.1494",
                        "tags": [
                            "and Sons",
                            "Inc",
                            "Ltd",
                            "Ltd",
                            "and Sons"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 10,
                        "name": "soup",
                        "description": "Tree deep mouth wear. Rather behind court letter PM fear poor. Tonight catch light successful spring player manage. Score stock sort tax across.",
                        "currentPrice": "50.49000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/204/200/300.jpg",
                            "https://i.picsum.photos/id/262/200/300.jpg",
                            "https://i.picsum.photos/id/142/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.1494",
                        "tags": [
                            "Group",
                            "and Sons",
                            "Inc",
                            "Inc",
                            "Ltd"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 11,
                        "name": "cream",
                        "description": "Whom method out represent professional. Commercial less board.",
                        "currentPrice": "71.92000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/93/200/300.jpg",
                            "https://i.picsum.photos/id/42/200/300.jpg",
                            "https://i.picsum.photos/id/219/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.150401",
                        "tags": [
                            "Group",
                            "Inc",
                            "LLC",
                            "PLC",
                            "Group"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 12,
                        "name": "beer",
                        "description": "Our beyond trial white. Build small general draw look learn theory. Cover up range two green enjoy may.",
                        "currentPrice": "68.27000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/139/200/300.jpg",
                            "https://i.picsum.photos/id/211/200/300.jpg",
                            "https://i.picsum.photos/id/102/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.150401",
                        "tags": [
                            "and Sons",
                            "Ltd",
                            "Inc",
                            "Ltd",
                            "Group"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 13,
                        "name": "pizza",
                        "description": "There break surface. Best mission coach everything look team.\nRecord court get time. Ok we report seat resource occur during month.",
                        "currentPrice": "64.84000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/35/200/300.jpg",
                            "https://i.picsum.photos/id/17/200/300.jpg",
                            "https://i.picsum.photos/id/238/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.1514",
                        "tags": [
                            "PLC",
                            "PLC",
                            "PLC",
                            "Inc",
                            "Inc"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 14,
                        "name": "rice",
                        "description": "Reason campaign Republican themselves lead most forward. Summer moment she power. Vote hotel without wait include.\nOrganization else successful require happen information contain alone.",
                        "currentPrice": "78.57000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/12/200/300.jpg",
                            "https://i.picsum.photos/id/87/200/300.jpg",
                            "https://i.picsum.photos/id/71/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.1514",
                        "tags": [
                            "Inc",
                            "and Sons",
                            "Ltd",
                            "Ltd",
                            "PLC"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 15,
                        "name": "ice",
                        "description": "Week factor current international institution decide arm. Court former rate action.\nEmployee model he someone reality blue large strategy. Way admit deal that like yard collection apply.",
                        "currentPrice": "84.46000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/81/200/300.jpg",
                            "https://i.picsum.photos/id/147/200/300.jpg",
                            "https://i.picsum.photos/id/70/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.1524",
                        "tags": [
                            "PLC",
                            "Inc",
                            "and Sons",
                            "PLC",
                            "Inc"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 16,
                        "name": "bagel",
                        "description": "Left a hundred idea. With network hot movement hit.\nPage road six democratic against once president.\nMethod high most parent. Game staff open learn successful item fast. Front adult against shake.",
                        "currentPrice": "65.38000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/196/200/300.jpg",
                            "https://i.picsum.photos/id/94/200/300.jpg",
                            "https://i.picsum.photos/id/142/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.1524",
                        "tags": [
                            "Inc",
                            "Group",
                            "LLC",
                            "PLC",
                            "Ltd"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 17,
                        "name": "eggs",
                        "description": "Wonder great be ago. Home else onto trade win manage include truth.\nPlace three board response. Blue on finish. Finally direction knowledge.",
                        "currentPrice": "5.40000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/30/200/300.jpg",
                            "https://i.picsum.photos/id/266/200/300.jpg",
                            "https://i.picsum.photos/id/9/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.1534",
                        "tags": [
                            "LLC",
                            "Ltd",
                            "PLC",
                            "Ltd",
                            "Group"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 18,
                        "name": "cake",
                        "description": "Mr note eat blood arrive other central customer. Question himself give range. Event work skin professor. Well care beat military.\nAlso middle provide responsibility themselves card idea.",
                        "currentPrice": "46.15000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/208/200/300.jpg",
                            "https://i.picsum.photos/id/290/200/300.jpg",
                            "https://i.picsum.photos/id/183/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.1534",
                        "tags": [
                            "PLC",
                            "Group",
                            "PLC",
                            "PLC",
                            "and Sons"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 19,
                        "name": "mushroom",
                        "description": "Close again however resource mouth. Know surface affect three song trip task. Have simply try even without letter. Institution tough line sea thing sport arrive a.",
                        "currentPrice": "60.13000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/173/200/300.jpg",
                            "https://i.picsum.photos/id/103/200/300.jpg",
                            "https://i.picsum.photos/id/185/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.154402",
                        "tags": [
                            "PLC",
                            "and Sons",
                            "LLC",
                            "Ltd",
                            "and Sons"
                        ],
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "id": 20,
                        "name": "mushroom",
                        "description": "Court age rich science or travel smile. Page we available cause role. Magazine system nice usually.",
                        "currentPrice": "9.59000",
                        "illustrativeMediaUrl": [
                            "https://i.picsum.photos/id/32/200/300.jpg",
                            "https://i.picsum.photos/id/240/200/300.jpg",
                            "https://i.picsum.photos/id/270/200/300.jpg"
                        ],
                        "createdAt": "2020-03-13T22:14:16.154402",
                        "tags": [
                            "and Sons",
                            "Inc",
                            "Inc",
                            "Inc",
                            "Ltd"
                        ],
                        "brand": "other"
                    }
                }
            ]
        }
    }
};

//

export const BRAND_ONLY_QUERY = gql`{
  allProducts {
    edges {
      node {
        brand
      }
    }
  }
}`;

export const brandsResponse = {
    "data": {
        "allProducts": {
            "edges": [
                {
                    "node": {
                        "brand": "other"
                    }
                },
                {
                    "node": {
                        "brand": "undefined"
                    }
                },
            ]
        }
    }
};

//

export const TAGS_ONLY_QUERY = gql`{
      allProducts {
        edges {
          node {
            tags
          }
        }
      }
    }`;

export const tagsResponse = {
    "data": {
        "allProducts": {
            "edges": [
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "Inc",
                            "and Sons",
                            "LLC",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Ltd",
                            "PLC",
                            "Group",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Inc",
                            "Inc",
                            "LLC",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "and Sons",
                            "Group",
                            "LLC",
                            "PLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Group",
                            "and Sons",
                            "and Sons",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "LLC",
                            "and Sons",
                            "PLC",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "and Sons",
                            "Ltd",
                            "Ltd",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "and Sons",
                            "and Sons",
                            "Inc",
                            "PLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Inc",
                            "Ltd",
                            "Ltd",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "and Sons",
                            "Inc",
                            "Inc",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Inc",
                            "LLC",
                            "PLC",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Ltd",
                            "Inc",
                            "Ltd",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "PLC",
                            "PLC",
                            "Inc",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "and Sons",
                            "Ltd",
                            "Ltd",
                            "PLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "Inc",
                            "and Sons",
                            "PLC",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "Group",
                            "LLC",
                            "PLC",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "Ltd",
                            "PLC",
                            "Ltd",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "Group",
                            "PLC",
                            "PLC",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "and Sons",
                            "LLC",
                            "Ltd",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Inc",
                            "Inc",
                            "Inc",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "and Sons",
                            "LLC",
                            "PLC",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Inc",
                            "Inc",
                            "Ltd",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Ltd",
                            "and Sons",
                            "LLC",
                            "PLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "PLC",
                            "LLC",
                            "and Sons",
                            "PLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "PLC",
                            "LLC",
                            "PLC",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "and Sons",
                            "Ltd",
                            "Inc",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "LLC",
                            "Group",
                            "Ltd",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "LLC",
                            "Ltd",
                            "PLC",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "Group",
                            "Group",
                            "Group",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "Group",
                            "and Sons",
                            "and Sons",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "and Sons",
                            "Group",
                            "LLC",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "Inc",
                            "PLC",
                            "PLC",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "PLC",
                            "Ltd",
                            "Inc",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Ltd",
                            "Ltd",
                            "and Sons",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "Inc",
                            "LLC",
                            "LLC",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "Group",
                            "Ltd",
                            "PLC",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Ltd",
                            "Inc",
                            "Group",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "PLC",
                            "and Sons",
                            "Ltd",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "and Sons",
                            "Ltd",
                            "Inc",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "Ltd",
                            "PLC",
                            "Inc",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "PLC",
                            "Group",
                            "Inc",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Inc",
                            "PLC",
                            "and Sons",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "Ltd",
                            "Group",
                            "LLC",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "Group",
                            "and Sons",
                            "Ltd",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "Inc",
                            "LLC",
                            "LLC",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "Group",
                            "LLC",
                            "Group",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "Inc",
                            "Group",
                            "and Sons",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "Inc",
                            "Inc",
                            "PLC",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "LLC",
                            "PLC",
                            "Inc",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "Ltd",
                            "Inc",
                            "PLC",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "and Sons",
                            "LLC",
                            "Group",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Inc",
                            "PLC",
                            "Ltd",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "LLC",
                            "Group",
                            "Inc",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Inc",
                            "PLC",
                            "Ltd",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "Ltd",
                            "and Sons",
                            "PLC",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "LLC",
                            "Ltd",
                            "Ltd",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "LLC",
                            "Group",
                            "PLC",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Group",
                            "Inc",
                            "Inc",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Group",
                            "Ltd",
                            "Ltd",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Group",
                            "and Sons",
                            "and Sons",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "Group",
                            "Ltd",
                            "PLC",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "and Sons",
                            "and Sons",
                            "LLC",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "PLC",
                            "Inc",
                            "Ltd",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "Inc",
                            "LLC",
                            "PLC",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "Inc",
                            "Inc",
                            "Ltd",
                            "PLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "PLC",
                            "Group",
                            "and Sons",
                            "PLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "PLC",
                            "Group",
                            "LLC",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "and Sons",
                            "PLC",
                            "LLC",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "Ltd",
                            "and Sons",
                            "LLC",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "and Sons",
                            "Ltd",
                            "and Sons",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "PLC",
                            "Group",
                            "Ltd",
                            "PLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Group",
                            "Group",
                            "PLC",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Ltd",
                            "Inc",
                            "Inc",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Group",
                            "Group",
                            "LLC",
                            "PLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "LLC",
                            "LLC",
                            "Inc",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "Ltd",
                            "Ltd",
                            "Ltd",
                            "PLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "Inc",
                            "and Sons",
                            "PLC",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Inc",
                            "PLC",
                            "LLC",
                            "PLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "Ltd",
                            "Group",
                            "LLC",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Inc",
                            "LLC",
                            "and Sons",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "LLC",
                            "Group",
                            "and Sons",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "PLC",
                            "LLC",
                            "and Sons",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "and Sons",
                            "Ltd",
                            "Inc",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "LLC",
                            "and Sons",
                            "Group",
                            "and Sons",
                            "and Sons"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Group",
                            "Inc",
                            "and Sons",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "LLC",
                            "Group",
                            "LLC",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "LLC",
                            "LLC",
                            "Inc",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "and Sons",
                            "and Sons",
                            "PLC",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "and Sons",
                            "Inc",
                            "Group",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "Inc",
                            "PLC",
                            "LLC",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "and Sons",
                            "LLC",
                            "Group",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "and Sons",
                            "and Sons",
                            "Group",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "LLC",
                            "Group",
                            "Inc",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "LLC",
                            "Group",
                            "Ltd",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "and Sons",
                            "Group",
                            "Inc",
                            "PLC",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "Group",
                            "and Sons",
                            "Ltd",
                            "Group"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Group",
                            "Ltd",
                            "LLC",
                            "Ltd",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Ltd",
                            "LLC",
                            "Group",
                            "Ltd",
                            "Ltd"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "PLC",
                            "and Sons",
                            "Ltd",
                            "and Sons",
                            "LLC"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "Inc",
                            "and Sons",
                            "Group",
                            "Group",
                            "Inc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "asf"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "asf"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "abc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "abc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "abc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "abc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "abc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "abc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "abc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "abc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "abc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "abc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "moc"
                        ]
                    }
                },
                {
                    "node": {
                        "tags": [
                            "asf"
                        ]
                    }
                }
            ]
        }
    }
};

//

export function getProductByIdQuery(productId) {
    return gql`
      {
          productById(id:${productId}) {
              id
              brand
              name
              description
              currentPrice
              illustrativeMediaUrl
              createdAt
              tags
              productratingsByProductId {
                edges {
                  node {
                    id
                    ratingByRatingId {
                      userByRatedById {
                        username
                        avatarUrl
                      }
                      rating
                      comment
                    }
                  }
                }
              }
          }
        }
    `;
}

export const productByIdResponse = {
    "data": {
        "productById": {
            "id": 1,
            "brand": "other",
            "name": "sandwich",
            "description": "Commercial fall social. His camera special hundred always. Yet economy produce resource animal line ok.\nFormer town security pick own music feel. Thing team although daughter rule likely despite.",
            "currentPrice": "62.41000",
            "illustrativeMediaUrl": [
                "https://i.picsum.photos/id/209/200/300.jpg",
                "https://i.picsum.photos/id/70/200/300.jpg",
                "https://i.picsum.photos/id/1/200/300.jpg"
            ],
            "createdAt": "2020-03-13T22:14:16.145402",
            "tags": [
                "LLC",
                "Inc",
                "and Sons",
                "LLC",
                "and Sons"
            ],
            "productratingsByProductId": {
                "edges": [
                    {
                        "node": {
                            "id": 1,
                            "ratingByRatingId": {
                                "userByRatedById": {
                                    "username": "Scott Carson",
                                    "avatarUrl": "https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png"
                                },
                                "rating": 5,
                                "comment": "Black number service manage threat ago."
                            }
                        }
                    },
                    {
                        "node": {
                            "id": 2,
                            "ratingByRatingId": {
                                "userByRatedById": {
                                    "username": "Charles Glover",
                                    "avatarUrl": "https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png"
                                },
                                "rating": 5,
                                "comment": "Fact power describe food thank."
                            }
                        }
                    },
                    {
                        "node": {
                            "id": 3,
                            "ratingByRatingId": {
                                "userByRatedById": {
                                    "username": "Charles Glover",
                                    "avatarUrl": "https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png"
                                },
                                "rating": 5,
                                "comment": "Fact power describe food thank."
                            }
                        }
                    }
                ]
            }
        }
    }
};

const productByIdMocks = [];

for(let i=1; i<21; i++) {
    productByIdMocks.push([getProductByIdQuery(i), productByIdResponse]);
}

export {productByIdMocks};

//

export const PRICES_QUERY = gql`
      {
  allProducts(orderBy: [CURRENT_PRICE_DESC]) {
    edges {
      node {
        currentPrice
      }
    }
  }
}
    `;

export const pricesResponse = {
    "data": {
        "allProducts": {
            "edges": [
                {
                    "node": {
                        "currentPrice": "99.34000"
                    }
                },
                {
                    "node": {
                        "currentPrice": "2.00000"
                    }
                }
            ]
        }
    }
};

//

export const ALL_BOUGHT_PRODUCTS_QUERY = gql`
    {
      userById(id: 1) {
        ordersByUserId {
          edges {
            node {
              orderproductsByOrderId {
                edges {
                  node {
                    productByProductId {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `;

export const allBoughtProductsResponse = {
    "data": {
        "userById": {
            "ordersByUserId": {
                "edges": [
                    {
                        "node": {
                            "orderproductsByOrderId": {
                                "edges": []
                            }
                        }
                    },
                    {
                        "node": {
                            "orderproductsByOrderId": {
                                "edges": [
                                    {
                                        "node": {
                                            "productByProductId": {
                                                "id": 1,
                                                "name": "pan"
                                            }
                                        }
                                    },
                                    {
                                        "node": {
                                            "productByProductId": {
                                                "id": 2,
                                                "name": "beer"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "node": {
                            "orderproductsByOrderId": {
                                "edges": [
                                    {
                                        "node": {
                                            "productByProductId": {
                                                "id": 3,
                                                "name": "pot"
                                            }
                                        }
                                    },
                                    {
                                        "node": {
                                            "productByProductId": {
                                                "id": 4,
                                                "name": "skillet"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "node": {
                            "orderproductsByOrderId": {
                                "edges": [
                                    {
                                        "node": {
                                            "productByProductId": {
                                                "id": 5,
                                                "name": "batter"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "node": {
                            "orderproductsByOrderId": {
                                "edges": [
                                    {
                                        "node": {
                                            "productByProductId": {
                                                "id": 6,
                                                "name": "cuisine"
                                            }
                                        }
                                    },
                                    {
                                        "node": {
                                            "productByProductId": {
                                                "id": 7,
                                                "name": "pastry"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "node": {
                            "orderproductsByOrderId": {
                                "edges": [
                                    {
                                        "node": {
                                            "productByProductId": {
                                                "id": 8,
                                                "name": "salad"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "node": {
                            "orderproductsByOrderId": {
                                "edges": [
                                    {
                                        "node": {
                                            "productByProductId": {
                                                "id": 9,
                                                "name": "sandwich"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "node": {
                            "orderproductsByOrderId": {
                                "edges": [
                                    {
                                        "node": {
                                            "productByProductId": {
                                                "id": 10,
                                                "name": "yeast"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                ]
            }
        }
    }
};

//

export const PRODUCTS_USER_ALREADY_RATED_QUERY = gql`
    {
        userById(id: 1) {
          ratingsByRatedById {
            edges {
              node {
                productratingsByRatingId {
                  edges {
                    node {
                      productId
                    }
                  }
                }
              }
            }
          }
        }
      }`;


export const productsUserAlreadyRatedResponse = {
    "data": {
        "userById": {
            "ratingsByRatedById": {
                "edges": [
                    {
                        "node": {
                            "productratingsByRatingId": {
                                "edges": [
                                    map(range(20), number => {
                                        return {
                                            "node": {
                                                "productId": number
                                            }
                                        };
                                    })
                                ]
                            }
                        }
                    },
                    {
                        "node": {
                            "productratingsByRatingId": {
                                "edges": map(range(20), number => {
                                    return {
                                        "node": {
                                            "productId": number
                                        }
                                    };
                                })
                            }
                        }
                    }
                ]
            }
        }
    }
};

export const ORDER_QUERY = gql`
      {
      orderById(id: 1) {
        id
        status
        shippingAddress
        createdAt
        orderproductsByOrderId {
          edges {
            node {
              id
              quantity
              singlePrice
              productByProductId {
                id
                name
                illustrativeMediaUrl
                brand
              }
            }
          }
        }
      }
    }
    `;

export const orderByIdResponse = {
    "data": {
        "orderById": {
            "id": 1,
            "status": "received",
            "shippingAddress": "10373 Bowman Rapids\nNorth Darrell, OK 79723",
            "createdAt": "2020-03-13T22:14:16.197401",
            "orderproductsByOrderId": {
                "edges": [
                    {
                        "node": {
                            "id": 8,
                            "quantity": 3,
                            "singlePrice": "86.91000",
                            "productByProductId": {
                                "id": 1,
                                "name": "sandwich",
                                "illustrativeMediaUrl": [
                                    "https://i.picsum.photos/id/292/200/300.jpg",
                                    "https://i.picsum.photos/id/139/200/300.jpg",
                                    "https://i.picsum.photos/id/189/200/300.jpg"
                                ],
                                "brand": "other"
                            }
                        }
                    }
                ]
            }
        }
    }
};

//

export const ORDERS_PER_USER_QUERY = gql`
        {
          allUsers(filter: {username: {equalTo: "${getCurrentUser().username}"}}) {
            edges {
              node {
                id
                ordersByUserId {
                  edges {
                    node {
                      id
                      status
                      shippingAddress
                      createdAt
                      orderproductsByOrderId {
                        edges {
                          node {
                            id
                            quantity
                            singlePrice
                            productByProductId {
                              id
                              name
                              illustrativeMediaUrl
                              brand
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    `;

export const ordersPerUserResponse = {
    "data": {
        "allUsers": {
            "edges": [
                {
                    "node": {
                        "id": 13,
                        "ordersByUserId": {
                            "edges": [
                                {
                                    "node": {
                                        "id": 101,
                                        "status": "awaiting_payment",
                                        "shippingAddress": "asf asf asf",
                                        "createdAt": "2020-04-12T20:13:02.812916",
                                        "orderproductsByOrderId": {
                                            "edges": [
                                                {
                                                    "node": {
                                                        "id": 101,
                                                        "quantity": 1,
                                                        "singlePrice": "62.41000",
                                                        "productByProductId": {
                                                            "id": 1,
                                                            "name": "sandwich",
                                                            "illustrativeMediaUrl": [
                                                                "https://i.picsum.photos/id/209/200/300.jpg",
                                                                "https://i.picsum.photos/id/70/200/300.jpg",
                                                                "https://i.picsum.photos/id/1/200/300.jpg"
                                                            ],
                                                            "brand": "other"
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    }
};