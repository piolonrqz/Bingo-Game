import React, { useState } from 'react';
import GameControls from './GameControls';
import BingoCard from './BingoCard';

const BingoApp = () => {
  const [bingoCards, setBingoCards] = useState([]);
  const [cardTokens, setCardTokens] = useState([]);
  const [cardMessages, setCardMessages] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [bingoCode, setBingoCode] = useState('');
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [victoriousCards, setVictoriousCards] = useState([]);
  const [notification, setNotification] = useState('');

  const retrieveBingoCard = (code) => {
    fetch(`http://www.hyeumine.com/getcard.php?bcode=${code}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.card) {
          setBingoCards((prevCards) => [...prevCards, data.card]);
          setCardTokens((prevTokens) => [...prevTokens, data.playcard_token]);
          setCardMessages((prevMessages) => [...prevMessages, null]);
          setSelectedCells((prevSelected) => [...prevSelected, Array(5).fill().map(() => Array(5).fill(false))]);
          setNotification('');
        } else {
          setNotification('Invalid code. Please check the game code.');
        }
      })
      .catch((error) => {
        setNotification('Error loading card. Try again.');
        console.error('Error fetching Bingo card:', error);
      });
  };

  const handleCodeSubmission = (e) => {
    e.preventDefault();
    if (bingoCode) {
      retrieveBingoCard(bingoCode);
      setIsGameActive(true);
    }
  };

  const initiateNewGame = () => {
    setBingoCards([]);
    setCardTokens([]);
    setCardMessages([]);
    setSelectedCells([]);
    setBingoCode('');
    setIsGameActive(false);
    setGameInProgress(false);
    setVictoriousCards([]);
    setNotification('');
  };

  const toggleCell = (cardIndex, row, col) => {
    if (victoriousCards.includes(cardIndex)) return;

    setSelectedCells((prevCells) => {
      const updatedCells = [...prevCells];
      updatedCells[cardIndex] = updatedCells[cardIndex].map((r, rowIdx) =>
        rowIdx === row ? r.map((marked, colIdx) => (colIdx === col ? !marked : marked)) : r
      );
      return updatedCells;
    });
  };

  const checkVictory = (index) => {
    const playToken = cardTokens[index];
    if (!playToken) {
      setCardMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[index] = 'Error: No token found.';
        return updatedMessages;
      });
      return;
    }

    fetch(`http://www.hyeumine.com/checkwin.php?playcard_token=${playToken}`)
      .then((response) => response.json())
      .then((data) => {
        setCardMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          if (data === 1) {
            updatedMessages[index] = 'You win!';
            setVictoriousCards((prevWinners) => [...prevWinners, index]);
          } else {
            updatedMessages[index] = 'Not a winning card.';
          }
          return updatedMessages;
        });
      })
      .catch((error) => console.error('Error verifying win:', error));
  };

  return (
    <div style={{
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#b8c6bc',
      minHeight: '100vh',
      width: '1200px',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ color: '#000000', width: '100%' }}>Play Bingo!</h1>
      <GameControls
        bingoCode={bingoCode}
        setBingoCode={setBingoCode}
        handleCodeSubmission={handleCodeSubmission}
        gameInProgress={gameInProgress}
        setGameInProgress={setGameInProgress}
        isGameActive={isGameActive}
        retrieveBingoCard={retrieveBingoCard}
        initiateNewGame={initiateNewGame}
      />
      {notification && <p style={{ color: 'red', width: '100%' }}>{notification}</p>}
      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {bingoCards.length > 0 ? (
          bingoCards.map((card, idx) => (
            <BingoCard
              key={idx}
              card={card}
              index={idx}
              token={cardTokens[idx]}
              message={cardMessages[idx]}
              selectedCells={selectedCells[idx]}
              toggleCell={toggleCell}
              checkVictory={checkVictory}
              isWinner={victoriousCards.includes(idx)}
            />
          ))
        ) : (
          <p style={{ fontStyle: 'italic', width: '100%' }}>Enter a game code to load a Bingo card.</p>
        )}
      </div>
    </div>
  );
};

export default BingoApp;