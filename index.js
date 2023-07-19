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

let counter = 0
//console.log(counter)
let activeCard = document.getElementById('active-flashcard')
let cardContent = document.getElementById('card-content')
// Flashcards shown in random order to user

//console.log(randomizeCards(dogTricks))

// loop through array of flashcards, one by one
// function cycleThroughDeck(shuffledDeck) {
console.log((shuffledDeck = randomizeCards(frenchVocab)))

for (i = 0; i < shuffledDeck.length; i++) {
  activeCard.addEventListener('dblclick', (e) => {
    nextCard(e)
  })

  activeCard.addEventListener('click', flipCard)
  //shuffledDeck[i].ondblclick = console.log('click') //nextCard()
}

// loop through cards one by one
function nextCard(e) {
  //deck = randomizeCards(frenchVocab)
  let card = e.target
  if (counter < shuffledDeck.length) {
    counter += 1
    console.log((card.innerHTML = shuffledDeck[counter - 1].q))

    if (counter >= 5) {
      counter = 0
    }
  }
}

function randomizeCards(deck) {
  let shuffledDeck = deck.sort(function () {
    return Math.random() - 0.5
  })

  return shuffledDeck
}

//for (const card of shuffledDeck) {
// show back of card with question
// cardContent.innerHTML = card.q
// flip card on click to show face of card with answer

//activeCard.addEventListener('click', flipCard)

function flipCard() {
  //activeCard.classList.toggle('flip-card')
  cardContent.innerHTML = shuffledDeck[counter].a
}
//}
// }

// on click, flip from q to a
// on rightclick, move to next card (disable context menu)

//cycleThroughDeck(frenchVocab)

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
