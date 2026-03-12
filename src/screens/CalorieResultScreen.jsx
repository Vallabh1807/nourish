import { useState, useEffect } from 'react'
import { Card, Btn, NutPill } from '../components/UI'
import { C, NC, GOAL_LABELS, DIET_LABELS } from '../utils/constants'
import { ss } from '../utils/styles'

const CalorieResultScreen = ({ profile, targets, onContinue }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ ...ss.container, padding: '40px 24px', animation: 'fadeUp .45s ease' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, marginBottom: 4 }}>
          Your Daily Targets
        </h2>
        <p style={{ fontSize: 14, color: C.muted }}>Calculated using the Mifflin-St Jeor equation</p>
      </div>

      {/* Big calorie card */}
      <Card style={{ textAlign: 'center', padding: 32 }}>
        <div
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 56,
            fontWeight: 700,
            color: C.gold,
            animation: show ? 'countUp .6s ease' : 'none',
          }}
        >
          {targets.calories}
        </div>
        <p style={{ fontSize: 14, color: C.muted, marginTop: 4 }}>calories per day</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 20 }}>
          <NutPill label="Protein" value={targets.protein} color={NC.pro} />
          <NutPill label="Carbs"   value={targets.carbs}   color={NC.carb} />
          <NutPill label="Fat"     value={targets.fat}     color={NC.fat} />
          <NutPill label="Fiber"   value={targets.fiber}   color={NC.fib} />
        </div>
      </Card>

      {/* Profile summary */}
      <Card style={{ marginTop: 8 }}>
        <p style={{ fontSize: 14, color: C.muted, textAlign: 'center' }}>
          <strong style={{ color: C.ink }}>{profile.name}</strong>, {profile.age}y · {profile.weight}kg ·{' '}
          {profile.height}cm · {DIET_LABELS[profile.diet]} · {GOAL_LABELS[profile.goal]}
        </p>
      </Card>

      <Btn variant="gold" full onClick={onContinue} style={{ marginTop: 20, padding: '16px 24px', fontSize: 16 }}>
        Generate My Meal Plan →
      </Btn>
    </div>
  )
}

export default CalorieResultScreen
