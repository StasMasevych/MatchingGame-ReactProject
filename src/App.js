import { useState, useEffect } from 'react'

import SingleCard from './components/SingleCard'
import './App.css'

const cardImages = [
  { "src": "/img/1.png", matched: false },
  { "src": "/img/2.png", matched: false },
  { "src": "/img/3.png", matched: false },
  { "src": "/img/4.png", matched: false },
  { "src": "/img/5.png", matched: false },
  { "src": "/img/6.png", matched: false },
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    
  }

  //compare 2 selected cards

  useEffect(() => {
   
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        /* console.log('match') */
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else {
        /* console.log('dont match') */
        setTimeout(() => resetTurn(), 1000)
      }
    }
  },[choiceOne,choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

 //start new game automatically
 useEffect(() => {
  shuffleCards()
 },[])


  return (
    <div className="App">
      <h1>Marvel Heroes Match</h1>
      <h4>Start the game by clicking the card!</h4>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App