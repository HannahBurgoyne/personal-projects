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

//--- variables ---//
let counter = 0
let activeCard = document.getElementById('active-flashcard')
let cardContent = document.getElementById('card-content')
// let deck = frenchVocab
let shuffledDeck = randomizeCards(frenchVocab)

// what needs to happen:

//--- function to randomise deck ---//
// computer randomises the deck, and returns it shuffled
function randomizeCards(deck) {
  let shuffledDeck = deck.sort(function () {
    return Math.random() - 0.5
  })

  return shuffledDeck
}

// computer takes the shuffled deck, and iterates through it
shuffledDeck.forEach((card) => {
  cardContent.textContent = shuffledDeck[counter].q
  activeCard.addEventListener('click', flipCard)
})

// for each card, inner content is set to side q
// for each card, add an event listener which triggers flipCard onclick

//--- function to flip the card ---//
// set the inner content of the card to show side a
function flipCard() {
  cardContent.textContent = shuffledDeck[counter].a
}

//--- function to go to next card ---//
// set innerHTML to be the content of the current object index's value
// increase counter by 1
// if counter is greater than or equal to 5, counter goes back to 0

function nextCard() {
  counter += 1
  if (counter >= 5) {
    counter = 0
  }
  cardContent.textContent = shuffledDeck[counter].q
}

//--- event listeners ---//
// if the event key is arrow right, call nextCard function
// if the event key is arrow left, call nextCard function

document.addEventListener('keydown', function (evt) {
  if (evt.key == 'ArrowRight') {
    nextCard()
  } else if (evt.key == 'ArrowLeft') {
    nextCard()
  }
})

// ---- Stretch/Bootcamp goals ---- //
//
// User can make their own custom cards
// Collections of cards can be stored in databases and selected
// Algorithm which shows user their lower rated cards more often
