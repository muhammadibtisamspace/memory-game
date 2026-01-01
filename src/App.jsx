import { useEffect, useState } from "react";
import Card from "./components/Card";
import GameHeader from "./components/GameHeader";

const CardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const initializeGame = () => {
    // SHUFFLE THE CARSDS AND SET THE STATE

    setCards(
      CardValues.map((value, index) => ({
        id: index,
        value: value,
        isFlipped: false,
        isMatched: false,
      }))
    );
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (Clickedcards) => {
    // DON'T CLICK IF THE CARD IS ALREADY FLIPPED OR MATCHED
    if (Clickedcards.isFlipped || Clickedcards.isMatched) {
      return;
    }

    // UPDATE CARD FLIPPED STATE

    const newCards = cards.map((c) => {
      if (c.id === Clickedcards.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });

    setCards(newCards);

    const newFlippedCard = [...flippedCards, Clickedcards.id];
    setFlippedCards(newFlippedCard);

    // CHECK IF THE TWO CARDS ARE FLIPPED

    if (flippedCards.length == 1) {
      const firstCard = cards[flippedCards[0]];



      if (firstCard.value === Clickedcards.value) 

        setTimeout(() => {
          
          setMatchedCards((prev) => [...prev, firstCard.id, Clickedcards.id]);
            const newMatchedCards = cards.map((c) => {
      if (c.id === Clickedcards.id || c.id === firstCard.id) {
        return { ...c, isMatched: true };
      } else {
        return c;
      }
    });

    setCards(newMatchedCards);
    flippedCards([]);
        }, 300);

      }else {
      // FLIPPING BACK THE CARD 1 AND 2

      setTimeout(() => {
        
        const flippedBack = newCards.flatMap((c) => { 
          if (newFlippedCard.includes(c.id || c.id === Clickedcards.id )) {
            return { ...c, isFlipped: false };
          } else {
            return c;
          }
        })
        setCards(flippedBack);

        setFlippedCards([]); 

      }, 1000);

    }
  };

  return (
    <div className="app">
      <GameHeader score={3} moves={10} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} key={card.id} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
