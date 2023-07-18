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
let activeCard = document.getElementById('active-flashcard')
// Flashcards shown in random order to user

function randomizeCards(deck) {
  let shuffledDeck = deck.sort(function () {
    return Math.random() - 0.5
  })

  return shuffledDeck
}

//console.log(randomizeCards(dogTricks))

// loop through array of flashcards, one by one
function cycleThroughDeck(deck) {
  deck = randomizeCards(frenchVocab)

  for (i = 0; i < deck.length; i++) {
    activeCard[i].ondblclick = nextCard

    function nextCard(deck) {
      deck = randomizeCards(frenchVocab)
      if (counter < deck.length) {
        counter += 1
        activeCard.innerHTML = deck[counter - 1]
        if (counter >= 4) {
          counter = 0
        }
      }
    }

    // loop through cards one by one

    for (const card of deck) {
      // show back of card with question
      let cardContent = document.getElementById('card-content')
      cardContent.innerHTML = card.q
      // flip card on click to show face of card with answer

      activeCard.addEventListener('click', flipCard)

      function flipCard() {
        //activeCard.classList.toggle('flip-card')
        cardContent.innerHTML = card.a
      }
    }
  }
}

// on click, flip from q to a
// on rightclick, move to next card (disable context menu)

cycleThroughDeck(frenchVocab)

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
