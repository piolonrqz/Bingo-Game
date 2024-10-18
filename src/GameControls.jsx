import React from 'react';

const GameControls = ({
  bingoCode,
  setBingoCode,
  handleCodeSubmission,
  gameInProgress,
  setGameInProgress,
  isGameActive,
  retrieveBingoCard,
  initiateNewGame
}) => {
  return (
    <>
      <form onSubmit={handleCodeSubmission} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={bingoCode}
          onChange={(e) => setBingoCode(e.target.value)}
          placeholder="Enter Game Code"
          style={{
            padding: '10px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '200px',
            fontSize: '16px',
          }}
          disabled={gameInProgress}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#355b44',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '16px',
          }}
          disabled={gameInProgress}
        >
          Join Game
        </button>
      </form>

      {isGameActive && !gameInProgress && (
        <button
          onClick={() => setGameInProgress(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#355b44',
            color: 'black',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '20px',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        >
          Start Playing
        </button>
      )}

      <button
        onClick={() => retrieveBingoCard(bingoCode)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#355b44',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
          borderRadius: '4px',
          fontSize: '16px',
        }}
        disabled={!bingoCode || gameInProgress}
      >
        Add Another Card
      </button>

      <button
        onClick={initiateNewGame}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#355b44',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px',
          fontSize: '16px',
        }}
      >
        New Game
      </button>
    </>
  );
};

export default GameControls;