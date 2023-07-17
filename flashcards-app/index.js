console.log('Welcome to Flashcards!')

// ---- Sprint goals ---- //
//

// Pre-determined set of flashcard topics (start with 1)
// Starting decks //
let frenchVocab = [
  { q: 'dog', a: 'un chien' },
  { q: 'cat', a: 'un chat' },
  { q: 'rabbit', a: 'un lapin' },
  { q: 'mouse', a: 'une souris' },
  { q: 'horse', a: 'un cheval' },
]

let dogTricks = [
  { q: 'paw', a: 'dog offers each paw to owner' },
  { q: 'spin', a: 'dog spins clockwise and counter-clockwise' },
  { q: 'rollover', a: 'dog rolls over both ways' },
  { q: 'shake', a: 'dog offers each paw and lets each be shaken' },
  { q: 'weave', a: "dog weaves through owner's legs" },
]

// Flashcards shown in random order to user

function randomizeCards(deck) {
  let shuffledDeck = deck.sort(function () {
    return Math.random() - 0.5
  })

  return shuffledDeck
}

console.log(randomizeCards(dogTricks))

// loop through array of flashcards, one by one
function cycleThroughDeck(deck) {
  deck = randomizeCards(frenchVocab)

  // loop through cards one by one

  deck.forEach((card) => {
    // grab flashcard html div and add text content from array data
  })
  // on click, flip from q to a
  // on rightclick, move to next card (disable context menu)
}

// Do images or text content
// On user click, flip flashcard around (animate module?)

// Progress bar along bottom of screen
// User can tick yes or no on each card to rate their progress
// Score shown at end to user

// ---- Stretch/Bootcamp goals ---- //
//
// User can make their own custom cards
// Collections of cards can be stored in databases and selected
// Algorithm which shows user their lower rated cards more often
