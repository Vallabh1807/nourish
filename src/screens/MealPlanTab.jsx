import { Card, Btn, Spinner } from '../components/UI'
import PlanMealCard from '../components/PlanMealCard'
import { C } from '../utils/constants'
import { generateMealPlan } from '../utils/gemini'
import { safeSet, todayKey } from '../utils/helpers'
import { useState } from 'react'

const MealPlanTab = ({ profile, targets, mealPlan, setMealPlan }) => {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const generate = async () => {
    setLoading(true)
    setError('')
    try {
      const plan = await generateMealPlan(profile, targets)
      setMealPlan(plan)
      await safeSet(`nourish-plan-${todayKey()}`, JSON.stringify(plan))
    } catch {
      setError('Failed to generate meal plan. Please check your API key and try again.')
    }
    setLoading(false)
  }

  // ── Empty state ────────────────────────────────────────────────────────────
  if (!mealPlan) {
    return (
      <div style={{ animation: 'fadeUp .45s ease', textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🍛</div>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, marginBottom: 8 }}>
          Ready for your meal plan?
        </h3>
        <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>
          AI will create a personalised Indian meal plan based on your profile
        </p>
        <Btn variant="gold" onClick={generate} disabled={loading}>
          {loading ? (
            <>
              <Spinner size={18} color="#fff" /> Generating...
            </>
          ) : (
            '✨ Generate Meal Plan'
          )}
        </Btn>
        {error && <p style={{ color: C.err, fontSize: 13, marginTop: 12 }}>{error}</p>}
      </div>
    )
  }

  // ── Plan ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ animation: 'fadeUp .45s ease' }}>
      {mealPlan.meals?.map((meal, i) => (
        <PlanMealCard key={i} meal={meal} index={i} />
      ))}

      {mealPlan.dailyTip && (
        <Card style={{ background: C.ink, color: '#fff' }}>
          <div style={{ fontSize: 13, color: C.gold, fontWeight: 600, marginBottom: 4 }}>💡 Daily Tip</div>
          <p style={{ fontSize: 14, lineHeight: 1.5 }}>{mealPlan.dailyTip}</p>
        </Card>
      )}

      <Btn variant="soft" full onClick={generate} disabled={loading} style={{ marginTop: 8 }}>
        {loading ? (
          <>
            <Spinner size={16} /> Regenerating...
          </>
        ) : (
          '🔄 Regenerate Plan'
        )}
      </Btn>

      {error && <p style={{ color: C.err, fontSize: 13, marginTop: 8 }}>{error}</p>}
    </div>
  )
}

export default MealPlanTab
