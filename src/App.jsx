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
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

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
    setMoves(0)
    setScore(0)
  };

  useEffect(() => {
    initializeGame();
  }, []);

const handleCardClick = (clickedCard) => {
  if (clickedCard.isFlipped || clickedCard.isMatched) return;

  const newCards = cards.map((c) =>
    c.id === clickedCard.id ? { ...c, isFlipped: true } : c
  );
  setCards(newCards);

  const newFlippedCards = [...flippedCards, clickedCard];
  setFlippedCards(newFlippedCards);

  if (newFlippedCards.length === 2) {
    const [firstCard, secondCard] = newFlippedCards;

    if (firstCard.value === secondCard.value) {
      // MATCHED
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isMatched: true }
              : c
          )
        );
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
        setScore((prev) => prev + 1);
        setFlippedCards([]);
      }, 50);
    } else {
      // NOT MATCHED, flip back
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isFlipped: false }
              : c
          )
        );
        setFlippedCards([]);
      }, 100);
    }
        setMoves((prev) => prev + 1)

  }
};

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame}/>

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} key={card.id} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
