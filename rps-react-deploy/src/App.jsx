import { useState } from 'react'

const CHOICES = [
  { name: 'rock', emoji: '🪨' },
  { name: 'paper', emoji: '📄' },
  { name: 'scissors', emoji: '✂️' },
]

function getComputerChoice() {
  const index = Math.floor(Math.random() * CHOICES.length)
  return CHOICES[index]
}

function decideWinner(player, computer) {
  if (player.name === computer.name) return 'draw'

  const beats = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  }

  return beats[player.name] === computer.name ? 'player' : 'computer'
}

export default function App() {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState({ player: 0, computer: 0, draws: 0 })

  const handlePlay = (choice) => {
    const computer = getComputerChoice()
    const outcome = decideWinner(choice, computer)

    setPlayerChoice(choice)
    setComputerChoice(computer)
    setResult(outcome)

    setScore((prev) => {
      if (outcome === 'player') return { ...prev, player: prev.player + 1 }
      if (outcome === 'computer') return { ...prev, computer: prev.computer + 1 }
      return { ...prev, draws: prev.draws + 1 }
    })
  }

  const handleReset = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setScore({ player: 0, computer: 0, draws: 0 })
  }

  const resultText = {
    player: 'You win! 🎉',
    computer: 'Computer wins! 💻',
    draw: "It's a draw! 🤝",
  }

  return (
    <div className="app">
      <h1>Rock Paper Scissors</h1>

      <div className="scoreboard">
        <div className="score-item">
          <span className="score-label">You</span>
          <span className="score-value">{score.player}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Draws</span>
          <span className="score-value">{score.draws}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Computer</span>
          <span className="score-value">{score.computer}</span>
        </div>
      </div>

      <div className="choices">
        {CHOICES.map((choice) => (
          <button
            key={choice.name}
            className="choice-btn"
            onClick={() => handlePlay(choice)}
          >
            <span className="choice-emoji">{choice.emoji}</span>
            <span className="choice-name">{choice.name}</span>
          </button>
        ))}
      </div>

      {playerChoice && computerChoice && (
        <div className="result-panel">
          <div className="picks">
            <div className="pick">
              <span className="pick-label">You picked</span>
              <span className="pick-emoji">{playerChoice.emoji}</span>
            </div>
            <span className="vs">VS</span>
            <div className="pick">
              <span className="pick-label">Computer picked</span>
              <span className="pick-emoji">{computerChoice.emoji}</span>
            </div>
          </div>
          <p className={`result-text result-${result}`}>{resultText[result]}</p>
        </div>
      )}

      <button className="reset-btn" onClick={handleReset}>
        Reset Score
      </button>
    </div>
  )
}
