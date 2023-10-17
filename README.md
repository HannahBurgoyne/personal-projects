# Welcome to Flashcards! 
This project allows a user to create and use their own custom flashcards. I originally built this in HTML, CSS, and JavaScript in week 6 of Foundations at Dev Academy Aotearoa, and then recreated the entire project as a fullstack application in week 7 of Bootcamp. 

:sparkles: This project is now deployed! [View it here](https://flashcards-app-oir7.onrender.com/). 

--------
### Tech stack:
- Node.js
- React
- ReactQuery
- TypeScript
- CSS
- Knex
- SQLite3
- Express
- Superagent
- Vite

-----
### Status: 
Currently, a user can: 
- Add a new deck of custom flashcards (using a dynamic form of any length)
- Test their knowledge by using existing decks of flashcards in the deck library
- Edit and delete existing flashcards
- Delete an entire deck and all its flashcards 

------

### Learnings (so far!): 
- How to incorporate JavaScript logic (particularly getElementById and onClick) into React and ReactQuery
- Prop drilling state management in React
- Creating many-to-many relationships between databases
- Querying many-to-many relational databases
- How to add a dynamic form in React (and submit dynamic data!)
- Refactoring previous work
- Improving UX 
- Working with the framer-motion animation library 
- Migrating a SQLite3 db to Postgres. Because Postgres doesn't provide a way for the user to wipe the sequence data, I was getting a duplication error when trying to add a new deck, flashcards, and their relationship to each other. I fixed this by refactoring the seed data so that the ids are dynamic instead of hard-coded in. This means that Postgres can use whichever ids it wants for the seed data. 

