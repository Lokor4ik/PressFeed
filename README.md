# PressFeed (Nuxt.js)

## Description
Application with three pages and one dynamic.

1-st page: displays all articles that have been generated with their information.

2-nd page: a list of editions in which more than one authors has worked on articles more often than "usual". For "usually" is considered the average taken for all editions

3-rd page: list of top 3 authors, in the interval of months transferred by the number of articles

## Build Setup
For migrations and seeds you must have postgreSQL.

```bash
# install dependencies
$ npm install

# add migrations or reset
$ npm run migrate
$ npm run migrate:undo:all

# make a seed or reset
$ npm run seed:all --authors=100 --articles=300 --editions=20
$ npm run seed:undo:all

# started api
$ npm run server

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).