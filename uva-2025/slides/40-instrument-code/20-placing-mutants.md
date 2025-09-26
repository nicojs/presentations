<!-- .slide: class="is-fancy2" -->

## Placing mutants

![placing-mutants.jpg](/img/placing-mutants.jpg)

---

### Process

Let's zoom in on the instrumentation itself.

[![mutation-testing-process-focus-2.svg](img/mutation-testing-process-focus-2.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZ3JhcGggTFJcbiAgICBBKChTdGFydCkpIC0tPiBCKDEuIFByZXBhcmUpXG4gICAgQiAtLT4gQygyLiBDb2RlIGluc3RydW1lbnRhdGlvbilcbiAgICBDIC0tPiBEKDMuIERyeSBydW4pXG4gICAgRCAtLT4gRXtTdWNjZXNzP31cbiAgICBFIC0tPnxZZXN8IEYoNC4gTXV0YXRpb24gdGVzdGluZylcbiAgICBFIC0tPnxOb3wgSCgoZW5kKSlcbiAgICBGIC0tPiBIXG4gICAgc3R5bGUgRiBmaWxsOiNmZjBcblxuIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0) <!-- .element target="_blank" -->

---

### A simple example

Given this code

```js
function add(a, b) {
  return a + b;
}
```

It generates 2 mutants

<!-- .element class="fragment" data-fragment-index="0" -->

<div>
<div class="row text-sm">

```json
{
  "id": "0",
  "location": {
    "start": { "column": 19, "line": 0 },
    "end": { "column": 1, "line": 2 }
  },
  "mutatorName": "BlockStatement",
  "replacement": "{}"
}
```

```json
{
  "id": "1",
  "location": {
    "start": { "column": 9, "line": 1 },
    "end": { "column": 14, "line": 1 }
  },
  "mutatorName": "ArithmeticOperator",
  "replacement": "a - b"
}
```

</div>
</div>

<!-- .element class="fragment" data-fragment-index="0" -->

---

### A simple example (2)

```js [0-300|2-4|6]
function add(a, b) {
  if (stryMutAct_9fa48("0")) {
    {
    }
  } else {
    return stryMutAct_9fa48("1") ? a - b : a + b;
  }
}
```

---

### Helper functions (simplified)

<div class="text-sm">

```js
function stryMutAct_9fa48(id) {
  return global.__stryker__.activeMutant === id;
}
```

</div>

---

### The placing algorithm

[![placing-algorithm](/img/placing-algorithm.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IFRCXG4gICAgXG4gICAgc3ViZ3JhcGggZmlsZXMgW0ZvciBlYWNoIGZpbGVdXG4gICAgZGlyZWN0aW9uIExSXG5cbiAgICBBKChzdGFydCkpLS0-QihQYXJzZSlcbiAgICBCIC0tIEFTVCBOb2RlIC0tPiBUcmFuc2Zvcm1cbiAgICBUcmFuc2Zvcm0gLS0-IEQoUHJpbnQgdG8gZmlsZSlcblxuICAgICAgICBzdWJncmFwaCBUcmFuc2Zvcm0gW0ZvciBlYWNoIEFTVCBub2RlXVxuXG4gICAgICAgIEMxKE5vZGUpIC0tIEdlbmVyYXRlIG11dGFudHMgLS0-IEMyKE11dGFudHMpXG4gICAgICAgIEMyIC0tRmluZCBwbGFjZW1lbnQgbm9kZSAtLT4gQzMoUGxhY2VtZW50IG5vZGUpXG4gICAgICAgIEMzIC0tQXBwbHkgbXV0YW50cy0tPkM0KEFwcGxpZWQgbXV0YW50cylcbiAgICAgICAgQzQgLS1QbGFjZSBtdXRhbnRzLS0-QzUoTXV0YXRlZCBub2RlKVxuXG4gICAgICAgIGVuZFxuXG4gICAgZW5kXG5cbiAgICBZKChzdGFydCkpIC0tIEZpbGVzIC0tPiBmaWxlc1xuICAgIGZpbGVzIC0tIEZpbGVzIC0tPiBaKChlbmQpKSIsIm1lcm1haWQiOiJ7XG4gIFwidGhlbWVcIjogXCJkZWZhdWx0XCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)

<!-- .element target="_blank" -->

---

### Algorithm simple example

<stryker-instrumenter-explainer>

<div class="code" style="display: none">

```js
function add(a, b) {
  return a + b;
}
```

</div>

<div class="mutants"  style="display: none">

```json
[
  {
    "fileName": "example.js",
    "id": "0",
    "location": {
      "start": {
        "column": 20,
        "line": 1
      },
      "end": {
        "column": 1,
        "line": 3
      }
    },
    "mutatorName": "BlockStatement",
    "replacement": "{}"
  },
  {
    "fileName": "example.js",
    "id": "1",
    "location": {
      "start": {
        "column": 9,
        "line": 2
      },
      "end": {
        "column": 14,
        "line": 2
      }
    },
    "mutatorName": "ArithmeticOperator",
    "replacement": "a - b"
  }
]
```

</div>

<div class="placementActions"  style="display: none">

```json
[
  {
    "placer": "expressionMutantPlacer",
    "type": "BinaryExpression",
    "location": {
      "start": {
        "line": 2,
        "column": 9
      },
      "end": {
        "line": 2,
        "column": 14
      }
    },
    "replacement": {
      "type": "ConditionalExpression",
      "test": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "stryMutAct_9fa48"
        },
        "arguments": [
          {
            "type": "StringLiteral",
            "value": "1"
          }
        ]
      },
      "consequent": {
        "type": "BinaryExpression",
        "operator": "-",
        "left": {
          "type": "Identifier",
          "start": 31,
          "end": 32,
          "loc": {
            "start": {
              "line": 2,
              "column": 9
            },
            "end": {
              "line": 2,
              "column": 10
            },
            "identifierName": "a"
          },
          "name": "a"
        },
        "right": {
          "type": "Identifier",
          "start": 35,
          "end": 36,
          "loc": {
            "start": {
              "line": 2,
              "column": 13
            },
            "end": {
              "line": 2,
              "column": 14
            },
            "identifierName": "b"
          },
          "name": "b"
        },
        "loc": {
          "start": {
            "line": 2,
            "column": 9
          },
          "end": {
            "line": 2,
            "column": 14
          }
        }
      },
      "alternate": {
        "type": "SequenceExpression",
        "expressions": [
          {
            "type": "CallExpression",
            "callee": {
              "type": "Identifier",
              "name": "stryCov_9fa48"
            },
            "arguments": [
              {
                "type": "StringLiteral",
                "value": "1"
              }
            ]
          },
          {
            "type": "BinaryExpression",
            "start": 31,
            "end": 36,
            "loc": {
              "start": {
                "line": 2,
                "column": 9
              },
              "end": {
                "line": 2,
                "column": 14
              }
            },
            "left": {
              "type": "Identifier",
              "start": 31,
              "end": 32,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 9
                },
                "end": {
                  "line": 2,
                  "column": 10
                },
                "identifierName": "a"
              },
              "name": "a"
            },
            "operator": "+",
            "right": {
              "type": "Identifier",
              "start": 35,
              "end": 36,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 13
                },
                "end": {
                  "line": 2,
                  "column": 14
                },
                "identifierName": "b"
              },
              "name": "b"
            }
          }
        ]
      }
    }
  },
  {
    "placer": "statementMutantPlacer",
    "type": "BlockStatement",
    "location": {
      "start": {
        "line": 1,
        "column": 20
      },
      "end": {
        "line": 3,
        "column": 1
      }
    },
    "replacement": {
      "type": "BlockStatement",
      "body": [
        {
          "type": "IfStatement",
          "test": {
            "type": "CallExpression",
            "callee": {
              "type": "Identifier",
              "name": "stryMutAct_9fa48"
            },
            "arguments": [
              {
                "type": "StringLiteral",
                "value": "0"
              }
            ]
          },
          "consequent": {
            "type": "BlockStatement",
            "body": [
              {
                "type": "BlockStatement",
                "body": [],
                "directives": []
              }
            ],
            "directives": []
          },
          "alternate": {
            "type": "BlockStatement",
            "body": [
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "SequenceExpression",
                  "expressions": [
                    {
                      "type": "CallExpression",
                      "callee": {
                        "type": "Identifier",
                        "name": "stryCov_9fa48"
                      },
                      "arguments": [
                        {
                          "type": "StringLiteral",
                          "value": "0"
                        }
                      ]
                    }
                  ]
                }
              },
              {
                "type": "ReturnStatement",
                "start": 24,
                "end": 36,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 2
                  },
                  "end": {
                    "line": 2,
                    "column": 14
                  }
                },
                "argument": {
                  "type": "ConditionalExpression",
                  "test": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "Identifier",
                      "name": "stryMutAct_9fa48"
                    },
                    "arguments": [
                      {
                        "type": "StringLiteral",
                        "value": "1"
                      }
                    ]
                  },
                  "consequent": {
                    "type": "BinaryExpression",
                    "operator": "-",
                    "left": {
                      "type": "Identifier",
                      "start": 31,
                      "end": 32,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 9
                        },
                        "end": {
                          "line": 2,
                          "column": 10
                        },
                        "identifierName": "a"
                      },
                      "name": "a"
                    },
                    "right": {
                      "type": "Identifier",
                      "start": 35,
                      "end": 36,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 13
                        },
                        "end": {
                          "line": 2,
                          "column": 14
                        },
                        "identifierName": "b"
                      },
                      "name": "b"
                    },
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 9
                      },
                      "end": {
                        "line": 2,
                        "column": 14
                      }
                    }
                  },
                  "alternate": {
                    "type": "SequenceExpression",
                    "expressions": [
                      {
                        "type": "CallExpression",
                        "callee": {
                          "type": "Identifier",
                          "name": "stryCov_9fa48"
                        },
                        "arguments": [
                          {
                            "type": "StringLiteral",
                            "value": "1"
                          }
                        ]
                      },
                      {
                        "type": "BinaryExpression",
                        "start": 31,
                        "end": 36,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 9
                          },
                          "end": {
                            "line": 2,
                            "column": 14
                          }
                        },
                        "left": {
                          "type": "Identifier",
                          "start": 31,
                          "end": 32,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 9
                            },
                            "end": {
                              "line": 2,
                              "column": 10
                            },
                            "identifierName": "a"
                          },
                          "name": "a"
                        },
                        "operator": "+",
                        "right": {
                          "type": "Identifier",
                          "start": 35,
                          "end": 36,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 13
                            },
                            "end": {
                              "line": 2,
                              "column": 14
                            },
                            "identifierName": "b"
                          },
                          "name": "b"
                        },
                        "leadingComments": null,
                        "trailingComments": null,
                        "innerComments": null
                      }
                    ]
                  },
                  "trailingComments": [],
                  "leadingComments": [],
                  "innerComments": []
                }
              }
            ],
            "directives": []
          }
        }
      ],
      "directives": []
    }
  }
]
```

</div>

</stryker-instrumenter-explainer>

---


### Algorithm another example

<stryker-instrumenter-explainer style="height: 1000px">

<div class="code" style="display: none">

```js
console.log(person?.address.street);
```

</div>
<div class="mutants"  style="display: none">

```json
[
  {
    "fileName": "example.js",
    "id": "0",
    "location": {
      "start": {
        "column": 12,
        "line": 1
      },
      "end": {
        "column": 27,
        "line": 1
      }
    },
    "mutatorName": "OptionalChaining",
    "replacement": "person.address"
  }
]
```

</div>
<div class="placementActions"  style="display: none">

```json
[
  {
    "placer": "expressionMutantPlacer",
    "type": "OptionalMemberExpression",
    "location": {
      "start": {
        "line": 1,
        "column": 12
      },
      "end": {
        "line": 1,
        "column": 34
      }
    },
    "replacement": {
      "type": "ConditionalExpression",
      "test": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "stryMutAct_9fa48"
        },
        "arguments": [
          {
            "type": "StringLiteral",
            "value": "0"
          }
        ]
      },
      "consequent": {
        "type": "OptionalMemberExpression",
        "object": {
          "type": "OptionalMemberExpression",
          "object": {
            "type": "Identifier",
            "name": "person",
            "loc": {
              "start": {
                "line": 1,
                "column": 12
              },
              "end": {
                "line": 1,
                "column": 18
              },
              "identifierName": "person"
            }
          },
          "property": {
            "type": "Identifier",
            "name": "address",
            "loc": {
              "start": {
                "line": 1,
                "column": 20
              },
              "end": {
                "line": 1,
                "column": 27
              },
              "identifierName": "address"
            }
          },
          "computed": false,
          "optional": false,
          "trailingComments": [],
          "leadingComments": [],
          "innerComments": []
        },
        "property": {
          "type": "Identifier",
          "name": "street",
          "loc": {
            "start": {
              "line": 1,
              "column": 28
            },
            "end": {
              "line": 1,
              "column": 34
            },
            "identifierName": "street"
          }
        },
        "computed": false,
        "optional": false,
        "loc": {
          "start": {
            "line": 1,
            "column": 12
          },
          "end": {
            "line": 1,
            "column": 34
          }
        }
      },
      "alternate": {
        "type": "SequenceExpression",
        "expressions": [
          {
            "type": "CallExpression",
            "callee": {
              "type": "Identifier",
              "name": "stryCov_9fa48"
            },
            "arguments": [
              {
                "type": "StringLiteral",
                "value": "0"
              }
            ]
          },
          {
            "type": "OptionalMemberExpression",
            "start": 12,
            "end": 34,
            "loc": {
              "start": {
                "line": 1,
                "column": 12
              },
              "end": {
                "line": 1,
                "column": 34
              }
            },
            "object": {
              "type": "OptionalMemberExpression",
              "start": 12,
              "end": 27,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 12
                },
                "end": {
                  "line": 1,
                  "column": 27
                }
              },
              "object": {
                "type": "Identifier",
                "start": 12,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 12
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  },
                  "identifierName": "person"
                },
                "name": "person"
              },
              "computed": false,
              "property": {
                "type": "Identifier",
                "start": 20,
                "end": 27,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 20
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  },
                  "identifierName": "address"
                },
                "name": "address"
              },
              "optional": true
            },
            "computed": false,
            "property": {
              "type": "Identifier",
              "start": 28,
              "end": 34,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 28
                },
                "end": {
                  "line": 1,
                  "column": 34
                },
                "identifierName": "street"
              },
              "name": "street"
            },
            "optional": false
          }
        ]
      }
    }
  }
]
```

</div>

</stryker-instrumenter-explainer>

---

### Abstractions

```ts
interface NodeMutator {
  mutate(path: NodePath): Iterable<types.Node>;
  readonly name: string;
}

interface MutantPlacer<TNode extends types.Node = types.Node> {
  name: string;
  canPlace(path: NodePath): boolean;
  place(path: NodePath<TNode>, appliedMutants: Map<Mutant, TNode>): void;
}
```

- Single responsibility principal
  - `NodeMutator`s mutate nodes
  - `MutantPlacer`s place mutants in the AST

<!-- .element class="fragment" -->

---

### Remarks on placing algorithm

<emoji-list class="sm">

- 🐠 The Babel AST is a _mutatable_ AST
- 🧳 Visitor design pattern
  - `OnEnter`
  - `OnLeave`
- 👇 Immutable on the way down (OnEnter)
- 👆 Replace nodes on way up (OnLeave)
  - Node placement can be done higher up the AST.

</emoji-list>
