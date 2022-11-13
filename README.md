# 🐿 cloudberry: the all-in-one schedule builder

WIP: Nothing to see here.


### Course API:

Every course should look like this:
```json
{
    "code": "COMP 330",
    "name": "Theory of Computation",
    "description": "This course covers the theory of computation, including finite automata, regular expressions, context-free grammars, pushdown automata, and Turing machines.",
    "prerequisites": [
      "COMP 251"
    ],
    "extra": ["Extra information goes here"],
    "terms": [
      {
        "term": "fall",
        "instructors": ["Prakash Panangaden"]
      },
      {
        "term": "winter",
        "instructors": ["Claude Crepeau"]
      }
    ]
  }
```
