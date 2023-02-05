import { useEffect } from 'react'
import { useState } from 'react'
import './style.css'

function TicTacToe() {
  const [sequence, setSequence] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('x')
  const [turnNumber, setTurnNumber] = useState(0)
  const [winner, setWinner] = useState()
  const winningCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ]

  const handleClick = n => {
    const copySequence = [...sequence]
    if (copySequence[n] || winner) return
    copySequence[n] = turn

    setSequence(copySequence)
    setTurn(turn === 'x' ? 'o' : 'x')
    setTurnNumber(turnNumber + 1)
  }

  useEffect(() => {
    if (turnNumber >= 5) {
      for (const c of winningCombos) {
        if (
          sequence[c[0]] &&
          sequence[c[0]] === sequence[c[1]] &&
          sequence[c[1]] === sequence[c[2]]
        ) {
          setWinner(`WINNER IS ${sequence[c[0]]}`)
          break
        }
      }
    }
  }, sequence)

  const resetGame = () => {
    setTurn('x')
    setTurnNumber(0)
    setSequence(Array(9).fill(null))
    setWinner(null)
  }

  return (
    <div className='container'>
      <div>{winner}</div>
      {winner && <button onClick={resetGame}>Reset Game</button>}
      <div className='gameContainer'>
        {sequence.map((s, i) => (
          <div key={i} onClick={() => handleClick(i)} className='square'>
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TicTacToe
