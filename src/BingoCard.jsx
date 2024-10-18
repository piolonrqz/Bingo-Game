import React from 'react';

const BingoCard = ({
  card,
  index,
  token,
  message,
  selectedCells,
  toggleCell,
  checkVictory,
  isWinner
}) => {
  return (
    <div
      style={{
        margin: '20px',
        textAlign: 'center',
        border: isWinner ? '5px solid #4CAF50' : 'none',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
        padding: '20px',
        transition: '0.3s',
      }}
    >
      <h2 style={{ color: '#333' }}>Card #{index + 1}</h2>
      <p style={{ fontWeight: 'bold' }}><strong>Token:</strong> {token}</p>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['B', 'I', 'N', 'G', 'O'].map((letter) => (
              <th key={letter} style={{ padding: '10px', border: '1px solid #333', backgroundColor: '#e7e7e7' }}>{letter}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3, 4].map((rowIdx) => (
            <tr key={rowIdx}>
              {['B', 'I', 'N', 'G', 'O'].map((col, colIdx) => (
                <td
                  key={col}
                  onClick={() => toggleCell(index, rowIdx, colIdx)}
                  style={{
                    border: '1px solid #333',
                    padding: '10px',
                    width: '50px',
                    height: '50px',
                    backgroundColor: selectedCells[rowIdx][colIdx] ? '#ffff00' : '#ffffff',
                    cursor: isWinner ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s',
                    fontSize: '18px',
                    fontWeight: selectedCells[rowIdx][colIdx] ? 'bold' : 'normal',
                  }}
                >
                  {card[col][rowIdx]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!isWinner && (
        <button
          onClick={() => checkVictory(index)}
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
          Check Win
        </button>
      )}
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default BingoCard;