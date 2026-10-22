
import { useState, useEffect } from 'react'
import './App.css'

const AGES = ['Kid', 'Teen', 'Adult']
const MOODS = ['Funny', 'Exciting', 'Heartwarming']

// level: 0 = fine for kids, 1 = teens and up, 2 = adults only
const MOVIES = [
  { title: 'Toy Story', level: 0, moods: ['Funny', 'Heartwarming'] },
  { title: 'Moana', level: 0, moods: ['Exciting', 'Heartwarming'] },
  { title: 'Shrek', level: 0, moods: ['Funny'] },
  { title: 'Paddington 2', level: 0, moods: ['Funny', 'Heartwarming'] },
  { title: 'Inside Out', level: 0, moods: ['Heartwarming', 'Funny'] },
  { title: 'Kung Fu Panda', level: 0, moods: ['Funny', 'Exciting'] },
  { title: 'The Incredibles', level: 0, moods: ['Exciting', 'Funny'] },
  { title: 'Jumanji: Welcome to the Jungle', level: 1, moods: ['Funny', 'Exciting'] },
  { title: 'The Princess Bride', level: 1, moods: ['Funny', 'Exciting', 'Heartwarming'] },
  { title: 'Spider-Man: Into the Spider-Verse', level: 1, moods: ['Exciting', 'Funny'] },
  { title: 'Avengers: Endgame', level: 1, moods: ['Exciting'] },
  { title: 'The Hangover', level: 2, moods: ['Funny'] },
]

function recommend(members) {
  const maxLevel = Math.min(...members.map((m) => AGES.indexOf(m.age)))
  return MOVIES.filter((mv) => mv.level <= maxLevel)
    .map((mv) => ({
      ...mv,
      score: members.filter((p) => mv.moods.includes(p.mood)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [members, setMembers] = useState([
    { age: 'Adult', mood: 'Funny' },
    { age: 'Kid', mood: 'Heartwarming' },
  ])

  // Focus the first button whenever the screen changes
  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelector('[data-focus]')?.focus()
    }, 50)
    return () => clearTimeout(t)
  }, [screen])

  // Remote control: arrows move focus, Back/Escape goes back
  useEffect(() => {
    const onKey = (e) => {
      const items = [...document.querySelectorAll('[data-focus]')]
      const i = items.indexOf(document.activeElement)
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        items[(i + 1) % items.length]?.focus()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        items[(i - 1 + items.length) % items.length]?.focus()
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault()
        setScreen((s) => (s === 'results' ? 'profiles' : 'home'))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const cycle = (list, value) => list[(list.indexOf(value) + 1) % list.length]

  const updateMember = (idx, key, list) =>
    setMembers((ms) =>
      ms.map((m, i) => (i === idx ? { ...m, [key]: cycle(list, m[key]) } : m))
    )

  const addMember = () =>
    setMembers((ms) => (ms.length < 4 ? [...ms, { age: 'Teen', mood: 'Exciting' }] : ms))

  const removeMember = () =>
    setMembers((ms) => (ms.length > 1 ? ms.slice(0, -1) : ms))

  if (screen === 'home') {
    return (
      <div className="screen center">
        <h1 className="title">🎬 Family Movie Night</h1>
        <p className="subtitle">One pick everyone will enjoy</p>
        <button data-focus className="btn big" onClick={() => setScreen('profiles')}>
          Start Movie Night
        </button>
      </div>
    )
  }

  if (screen === 'profiles') {
    return (
      <div className="screen">
        <h2>Who's watching?</h2>
        <p className="hint">Press Enter on a button to change it</p>
        {members.map((m, i) => (
          <div className="row" key={i}>
            <span className="who">Person {i + 1}</span>
            <button data-focus className="btn" onClick={() => updateMember(i, 'age', AGES)}>
              {m.age}
            </button>
            <button data-focus className="btn" onClick={() => updateMember(i, 'mood', MOODS)}>
              {m.mood}
            </button>
          </div>
        ))}
        <div className="row">
          <button data-focus className="btn" onClick={addMember}>+ Add person</button>
          <button data-focus className="btn" onClick={removeMember}>− Remove person</button>
          <button data-focus className="btn primary" onClick={() => setScreen('results')}>
            Find a movie →
          </button>
        </div>
      </div>
    )
  }

  const picks = recommend(members)
  return (
    <div className="screen">
      <h2>Tonight's picks</h2>
      <div className="cards">
        {picks.map((p, i) => (
          <button data-focus className="card" key={p.title}>
            <div className="rank">#{i + 1}</div>
            <div className="movie">{p.title}</div>
            <div className="reason">
              Fits the mood of {p.score} of {members.length} people and is
              suitable for everyone.
            </div>
          </button>
        ))}
      </div>
      <div className="row">
        <button data-focus className="btn" onClick={() => setScreen('profiles')}>
          ← Back
        </button>
      </div>
    </div>
  )
}