// pages/api/stocks/screener.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { criteria } = req.body;

  if (!criteria) {
    return res.status(400).json({ message: 'Criteria is required' });
  }

  // API payloads for different screener types
  const getPayloadForCriteria = (criteria) => {
    const payloads = {
      'Volume Buzzers': {
        "columns": [
          "name",
          "description",
          "close",
          "change",
          "volume",
          "relative_volume",
          "SMA20",
          "market_cap_basic",
          "sector"
        ],
        "filter": [
          {
            "left": "close",
            "operation": "egreater",
            "right": 30
          },
          {
            "left": "country",
            "operation": "in_range",
            "right": ["India"]
          },
          {
            "left": "exchange",
            "operation": "in_range",
            "right": ["NSE"]
          },
          {
            "left": "average_volume_60d_calc",
            "operation": "greater",
            "right": 100000
          },
          {
            "left": "change",
            "operation": "greater",
            "right": 3
          },
          {
            "left": "relative_volume_10d_calc",
            "operation": "greater",
            "right": 3
          },
          {
            "left": "market_cap_basic",
            "operation": "egreater",
            "right": 8000000000
          }
        ],
        "ignore_unknown_fields": false,
        "options": {
          "lang": "en"
        },
        "range": [0, 100],
        "sort": {
          "sortBy": "market_cap_basic",
          "sortOrder": "desc"
        },
        "symbols": {},
        "markets": ["india"],
        "filter2": {
          "operator": "and",
          "operands": [
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["preferred"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "dr"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "fund"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has_none_of",
                            "right": ["etf"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      '52 week High': {
        "columns": [
          "name",
          "description",
          "close",
          "change",
          "volume",
          "relative_volume",
          "SMA20",
          "market_cap_basic",
          "sector"
        ],
        "filter": [
          {
            "left": "country",
            "operation": "in_range",
            "right": ["India"]
          },
          {
            "left": "close",
            "operation": "egreater",
            "right": 30
          },
          {
            "left": "exchange",
            "operation": "in_range",
            "right": ["NSE"]
          },
          {
            "left": "average_volume_60d_calc",
            "operation": "greater",
            "right": 100000
          },
          {
            "left": "price_52_week_high",
            "operation": "eless",
            "right": "high"
          },
          {
            "left": "market_cap_basic",
            "operation": "egreater",
            "right": 8000000000
          },
          {
            "left": "is_primary",
            "operation": "equal",
            "right": true
          }
        ],
        "ignore_unknown_fields": false,
        "options": {
          "lang": "en"
        },
        "range": [0, 100],
        "sort": {
          "sortBy": "market_cap_basic",
          "sortOrder": "desc"
        },
        "symbols": {},
        "markets": ["india"],
        "filter2": {
          "operator": "and",
          "operands": [
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["preferred"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "dr"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "fund"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has_none_of",
                            "right": ["etf"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      '1 Month High': {
        "columns": [
          "name",
          "description",
          "close",
          "change",
          "volume",
          "relative_volume",
          "SMA20",
          "market_cap_basic",
          "sector"
        ],
        "filter": [
          {
            "left": "country",
            "operation": "in_range",
            "right": ["India"]
          },
          {
            "left": "exchange",
            "operation": "in_range",
            "right": ["NSE"]
          },
          {
            "left": "close",
            "operation": "egreater",
            "right": 30
          },
          {
            "left": "average_volume_60d_calc",
            "operation": "greater",
            "right": 100000
          },
          {
            "left": "High.1M",
            "operation": "eless",
            "right": "high"
          },
          {
            "left": "market_cap_basic",
            "operation": "egreater",
            "right": 8000000000
          }
        ],
        "ignore_unknown_fields": false,
        "options": {
          "lang": "en"
        },
        "range": [0, 100],
        "sort": {
          "sortBy": "market_cap_basic",
          "sortOrder": "desc"
        },
        "symbols": {},
        "markets": ["india"],
        "filter2": {
          "operator": "and",
          "operands": [
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["preferred"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "dr"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "fund"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has_none_of",
                            "right": ["etf"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      '100% up in a Year': {
        "columns": [
          "name",
          "description",
          "close",
          "change",
          "volume",
          "relative_volume",
          "SMA20",
          "market_cap_basic",
          "sector"
        ],
        "filter": [
          {
            "left": "country",
            "operation": "in_range",
            "right": ["India"]
          },
          {
            "left": "exchange",
            "operation": "in_range",
            "right": ["NSE"]
          },
          {
            "left": "close",
            "operation": "egreater",
            "right": 30
          },
          {
            "left": "average_volume_60d_calc",
            "operation": "greater",
            "right": 100000
          },
          {
            "left": "market_cap_basic",
            "operation": "egreater",
            "right": 8000000000
          },
          {
            "left": "Perf.Y",
            "operation": "greater",
            "right": 100
          }
        ],
        "ignore_unknown_fields": false,
        "options": {
          "lang": "en"
        },
        "range": [0, 100],
        "sort": {
          "sortBy": "market_cap_basic",
          "sortOrder": "desc"
        },
        "symbols": {},
        "markets": ["india"],
        "filter2": {
          "operator": "and",
          "operands": [
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["preferred"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "dr"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "fund"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has_none_of",
                            "right": ["etf"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    };
    return payloads[criteria] || payloads['Volume Buzzers'];
  };

  try {
    const payload = getPayloadForCriteria(criteria);
    
    const response = await fetch('https://scanner.tradingview.com/india/scan?label-product=popup-screener-stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Origin': 'https://www.tradingview.com',
        'Referer': 'https://www.tradingview.com/',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Process the TradingView API response
    let processedStocks = [];
    if (data && data.data) {
      processedStocks = data.data.map((stock, index) => {
        const stockData = stock.d || [];
        return {
          symbol: stockData[0] || 'N/A',
          description: stockData[1] || '',
          price: stockData[2] || 0,
          change: stockData[3] || 0,
          volume: stockData[4] || 0,
          rvol: stockData[5] ? parseFloat(stockData[5]).toFixed(2) : '-',
          sma20: stockData[6] ? parseFloat(stockData[6]).toFixed(2) : '-',
          marketCap: stockData[7] || 0,
          sector: stockData[8] || 'Finance',
          smaDistance: stockData[6] && stockData[2] ? 
            ((stockData[2] - stockData[6]) / stockData[6] * 100) : 0
        };
      });
    }

    res.status(200).json({
      success: true,
      data: processedStocks,
      count: processedStocks.length,
      criteria: criteria,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch stock data',
      data: [],
      count: 0
    });
  }
}