# 🐿 cloudberry: the all-in-one course catalog

## Contributing

`node` version: 18.12.1; we use `npm` instead of `yarn`.

When you first clone the repository, you have to install all the dependencies.
```
npm install
```

And then, to start the website, do
```
npm run dev
```

Commit messages follow the [conventional commits standard](https://www.conventionalcommits.org/en/v1.0.0/). [Helpful info](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13).

## Tech Stack

Main libraries: React, Next.js, Firebase, TailwindCSS

- Styling is done with the best CSS library [TailwindCSS](https://tailwindcss.com).
- We use the [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks) library to simplify working with Firebase in React.
- React Query for general fetching data

## Project Hierarchy

```
/webscraper: Webscrapers for eCalendar, VSB, etc.
/utils: General utility functions for the front-end
/typing: TypeScript types
```

## Good Courses to Test On
- Math-314, Math-133, Math-140, Acct-699, Cprl-610, Dent-101J2, Comp-204, Biol-112, Wcom-333, Phil-375, Biol-102, CENG-221D1
