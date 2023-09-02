// This is where you loop through the flashcards deck
// Sits inside layout


interface Props {
  id: number
}


function Flashcards(props: Props) {


//--- function to randomise deck ---//
  function randomizeCards(deck) {
    let shuffledDeck = deck.sort(function () {
      return Math.random() - 0.5
    })
    return shuffledDeck
  }




  return <p>This is the page where you can use the flashcards</p>
  //--- variables ---//
  // let counter = 0
  // let activeCard = document.getElementById('active-flashcard')
  // let cardContent = document.getElementById('card-content')
  // let shuffledDeck = randomizeCards(frenchVocab)
  
  // // computer takes the shuffled deck, and iterates through it
  // shuffledDeck.forEach((card) => {
  //   cardContent.textContent = shuffledDeck[counter].q
  //   activeCard.addEventListener('click', flipCard)
  // })
  // //--- function to flip the card ---//
  // function flipCard() {
  //   cardContent.textContent = shuffledDeck[counter].a
  // }
  // //--- function to go to next card ---//
  // function nextCard() {
  //   counter += 1
  //   if (counter >= 5) {
  //     counter = 0
  //   }
  //   cardContent.textContent = shuffledDeck[counter].q
  // }
  // //--- event listeners ---//
  // document.addEventListener('keydown', function (evt) {
  //   if (evt.key == 'ArrowRight') {
  //     nextCard()
  //   } else if (evt.key == 'ArrowLeft') {
  //     nextCard()
  //   }
  // })
}

export default Flashcards
