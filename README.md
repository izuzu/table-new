# table-new

This contains 2 tables

Table 1 with paginated data, 2 data/page since there were only 10 data from the API
Table 2 shows the search results

## Requested feature implementations:

1. Parent-child communication

Main table container to table 1 and table 2.

2. Child Parent Communication

Table 1 emits data to main table when the pagination is done.

3. Child Child Communication

Used mitt to emit events from one table to another. Since, I was using Vue3 and to support eventBus in this version I would have to resort to hackey ways, so used mitt instead since it's recommended to use with Vue3.

4. Vuex

Since I am using Vue3, I used Pinia instead of Vuex. Pinia was used to store search results in the store.

## Versions Used

Node v18.12.1

NPM 8.19.2

Vite 3.2.4

Vue 3.2.45


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
