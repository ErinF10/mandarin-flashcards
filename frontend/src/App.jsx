import { useEffect, useState } from 'react'
import './App.css'

function App() {
  let unsortedCardPairs = [
    {'Monday': '星期一'},
    {'Tuesday': '星期二'},
    {'Wednesday': '星期三'},
    {'Thursday' : '星期四'},
    {'Friday': '星期五'}
  ];

  let count = unsortedCardPairs.length;

  const [cardPairs, setCardPairs] = useState([...unsortedCardPairs])
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);

  //instead of choosing a random, shuffle the deck and return a new array
  const shuffleCards = () => {
    //sort based on the return value of Math.random() - 0.5, which has a 50/50 chance
    //of being negative, creating a 50/50 chance of each element being put in a certain spot
    const shuffled = [...unsortedCardPairs].sort(() => Math.random() - 0.5);
    setCardPairs(shuffled);
    setCurrentCardIndex(0);
  }
  const handleClick = () => {
    setIsFront(!isFront)
  }
  const handleNext = () => {
    if (currentCardIndex === cardPairs.length - 1) {
      // If we've reached the end, shuffle and start over
      shuffleCards();
    } else {
      setCurrentCardIndex(prevIndex => prevIndex + 1);
    }
    if (!isFront) {
      setIsFront(true)
    }
  }

  let currentCard = cardPairs[currentCardIndex];
  let front = Object.keys(currentCard)[0];
  let back = currentCard[front];

  useEffect(() => {
    shuffleCards();
  }, []);


  return (
    <>
      <div className='header'>
        <h1>Chinese Mandarin Flashcards</h1>
        <h3>Test out or refresh your mandarin skills here!</h3>
        <p>Total flashcards: {count}</p>
      </div>
      <div className='flashcard-container'>
        <div className='flashcard' onClick={handleClick}>
          {
            isFront ? <p className='front'>{front}</p> : 
              <p className='back'>{back}</p>
          }
        </div>
      </div>
      <div className='button-container'>
        <button onClick={handleNext}>Next</button>
      </div>
      
    </>
  )
}

export default App
