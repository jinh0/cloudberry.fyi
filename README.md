# 🐿 cloudberry: the all-in-one course catalog

## Contributing

When you first clone the repository, you have to install all the dependencies. We use `npm` because `yarn` sucks.
```
npm install
```

And then, to start the website, do
```
npm run dev
```

Commit messages follow the [conventional commits standard](https://www.conventionalcommits.org/en/v1.0.0/). [Helpful info](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13).

## Libraries Used

Tech stack: React, Next.js, TailwindCSS, Firebase

- Search is powered by [fuse.js](https://fusejs.io).
- Styling is done with the best CSS library [TailwindCSS](https://tailwindcss.com).

## Course API:

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
