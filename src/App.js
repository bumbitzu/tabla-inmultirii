import React, { useState } from 'react';
import './App.css';

function App()
{
  const [ userResults, setUserResults ] = useState(Array(100).fill(''));
  const correctResults = Array.from({ length: 10 }, (_, i) =>
    Array.from({ length: 10 }, (_, j) => (i + 1) * (j + 1))
  );

  const handleInputChange = (index, event) =>
  {
    const newUserResults = [ ...userResults ];
    newUserResults[ index ] = event.target.value;
    setUserResults(newUserResults);
  };

  const handleSubmit = (event, rowIndex, colIndex) =>
  {
    event.preventDefault();

    const userResult = parseInt(userResults[ rowIndex * 10 + colIndex ]);
    const correctResult = correctResults[ rowIndex ][ colIndex ];

    const newMessages = [ ...messages ];
    const newMessageColors = [ ...messageColors ];

    if (userResult === correctResult)
    {
      newMessages[ rowIndex * 10 + colIndex ] = 'Răspuns corect!';
      newMessageColors[ rowIndex * 10 + colIndex ] = 'green';
    } else
    {
      newMessages[ rowIndex * 10 + colIndex ] = 'Răspuns greșit!';
      newMessageColors[ rowIndex * 10 + colIndex ] = 'red';
    }

    setMessages(newMessages);
    setMessageColors(newMessageColors);
  };

  const [ messages, setMessages ] = useState(Array(100).fill(''));
  const [ messageColors, setMessageColors ] = useState(Array(100).fill(''));

  return (
    <div className="App">
      <h1>Tabla Înmulțiri</h1>
      <div className="forms-container">
        {correctResults.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((_, colIndex) => (
              <form
                key={colIndex}
                onSubmit={(event) => handleSubmit(event, rowIndex, colIndex)}
              >
                <label>
                  {`${rowIndex + 1} x ${colIndex + 1} = `}
                  <input
                    type="number"
                    value={userResults[ rowIndex * 10 + colIndex ]}
                    onChange={(event) =>
                      handleInputChange(rowIndex * 10 + colIndex, event)
                    }
                  />
                  
                </label>
                <button type="submit">Verifică</button>
                <p style={{ color: messageColors[ rowIndex * 10 + colIndex ] }}>
                  {messages[ rowIndex * 10 + colIndex ]}
                </p>
              </form>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
