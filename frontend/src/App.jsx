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
  const [guess, setGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState('');

  //Shuffle the deck in place to recieve the array in semi-random order
  const shuffleCards = () => {
    //sort based on the return value of Math.random() - 0.5, which has a 50/50 chance
    //of being negative, creating a 50/50 chance of each element being put in a certain spot
    const shuffled = [...unsortedCardPairs].sort(() => Math.random() - 0.5);
    setCardPairs(shuffled);
    setCurrentCardIndex(0);
  }
  //Flips sides
  const handleClick = () => {
    setIsFront(!isFront)
  }

  //Check if the guess is correct
  const handleSubmit = (userInput) => {
    event.preventDefault(); // Prevent form submission
    if (guess === back) {
      setIsCorrect('correct')
    } else {
      setIsCorrect('incorrect')
    }
    setGuess('')
  }

  //Move forward in the array when next button is clicked
  const handleNext = () => {
    if (currentCardIndex === cardPairs.length - 1) {
      
      // If we've reached the end, shuffle and start over
      shuffleCards();
    } else {
      setCurrentCardIndex(prevIndex => prevIndex + 1);
    }
    //Flip new cards back to the front
    if (!isFront) {
      setIsFront(true)
    }
    setIsCorrect('')
  }

  const handleBack = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prevIndex => prevIndex - 1);
    }
    //Flip new cards back to the front
    if (!isFront) {
      setIsFront(true)
    }
    setIsCorrect('')
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
      <form onSubmit={handleSubmit} className='guess-container'>
        <input
          placeholder="Place your guess here"
          value={guess}
          onChange={(answer) => setGuess(answer.target.value)}
          className={`guess-input ${isCorrect}`}
        />
        <button type='submit'>
          Submit Guess
        </button>
      </form>
      <div className='button-container'>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
      
    </>
  )
}

export default App
