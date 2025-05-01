import React, { Component } from 'react';
import Card from './Card';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    const cardValues = ['😺', '🐶', '🐸', '🦁', '🐼', '🐵', '🦊', '🐰', '🐻', '🐷', '🐴', '🦄'];
    const cards = this.shuffleCards(
      cardValues
        .concat(cardValues)
        .map((value, index) => ({ id: index + 1, value }))
    );

    this.state = {
      cards,
      flipped: [],
      matched: [],
      moves: 0,
      maxMoves: 40,
      timeLeft: 120,
      gameOver: false,
      gameWon: false,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timeLeft <= 0) {
          clearInterval(this.timer);
          return { gameOver: true };
        }
        return { timeLeft: prevState.timeLeft - 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  shuffleCards = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  handleCardClick = (id) => {
    const { flipped, cards, matched, moves, maxMoves, timeLeft } = this.state;

    if (
      flipped.length < 2 &&
      !flipped.includes(id) &&
      !matched.includes(id) &&
      moves < maxMoves &&
      timeLeft > 0 &&
      !this.state.gameOver &&
      !this.state.gameWon
    ) {
      const newFlipped = [...flipped, id];
      this.setState({ flipped: newFlipped, moves: moves + 1 });

      if (newFlipped.length === 2) {
        const [firstId, secondId] = newFlipped;
        const firstCard = cards.find((card) => card.id === firstId);
        const secondCard = cards.find((card) => card.id === secondId);

        if (firstCard.value === secondCard.value) {
          const newMatched = [...matched, firstId, secondId];
          this.setState({
            matched: newMatched,
            flipped: [],
          });
          if (newMatched.length === cards.length) {
            this.setState({ gameWon: true });
            clearInterval(this.timer);
          }
        } else {
          setTimeout(() => this.setState({ flipped: [] }), 1000);
        }
      }

      if (moves + 1 >= maxMoves) {
        this.setState({ gameOver: true });
        clearInterval(this.timer);
      }
    }
  };

  resetGame = () => {
    const cardValues = ['😺', '🐶', '🐸', '🦁', '🐼', '🐵', '🦊', '🐰', '🐻', '🐷6', '🐴', '🦄'];
    const cards = this.shuffleCards(
      cardValues
        .concat(cardValues)
        .map((value, index) => ({ id: index + 1, value }))
    );

    this.setState({
      cards,
      flipped: [],
      matched: [],
      moves: 0,
      timeLeft: 120,
      gameOver: false,
      gameWon: false,
    });

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timeLeft <= 0) {
          clearInterval(this.timer);
          return { gameOver: true };
        }
        return { timeLeft: prevState.timeLeft - 1 };
      });
    }, 1000);
  };

  render() {
    const { cards, flipped, matched, moves, maxMoves, timeLeft, gameOver, gameWon } = this.state;

    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          <p className="text-lg font-semibold">Moves: {moves}/{maxMoves}</p>
          <p className="text-lg font-semibold">Time Left: {timeLeft}s</p>
        </div>
        {(gameWon || gameOver) && (
          <div className="text-center">
            <p className={`text-2xl font-bold ${gameWon ? 'text-green-500' : 'text-red-500'}`}>
              {gameWon ? 'You Won!' : 'Game Over!'}
            </p>
            <p className="text-lg">Score: {matched.length / 2} matches</p>
          </div>
        )}
        <button
          onClick={this.resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Reset Game
        </button>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              value={card.value}
              isFlipped={flipped.includes(card.id)}
              isMatched={matched.includes(card.id)}
              onClick={this.handleCardClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default GameBoard;