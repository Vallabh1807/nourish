import { Card, Btn, NutPill } from '../components/UI'
import LogMealCard from '../components/LogMealCard'
import { C, NC, MEAL_TYPES } from '../utils/constants'
import { safeSet, todayKey } from '../utils/helpers'

const LogMealsTab = ({ targets, mealLog, setMealLog, setActiveTab }) => {
  const updateMeal = (type, data) => {
    const key = type.toLowerCase()
    const updated = { ...mealLog, [key]: data }
    setMealLog(updated)

    // Persist — only save entries that have content
    const toSave = {}
    Object.entries(updated).forEach(([k, v]) => {
      if (v.text || v.result) toSave[k] = { text: v.text, result: v.result }
    })
    safeSet(`nourish-log-${todayKey()}`, JSON.stringify(toSave))
  }

  // Aggregate totals of logged meals
  const logged    = Object.values(mealLog).filter((m) => m.result)
  const dayTotals = logged.reduce(
    (acc, m) => {
      const t = m.result.totals
      return {
        calories: acc.calories + t.calories,
        protein:  acc.protein  + t.protein,
        carbs:    acc.carbs    + t.carbs,
        fat:      acc.fat      + t.fat,
        fiber:    acc.fiber    + (t.fiber || 0),
      }
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  )

  return (
    <div style={{ animation: 'fadeUp .45s ease' }}>
      {MEAL_TYPES.map((type) => (
        <LogMealCard
          key={type}
          type={type}
          targets={targets}
          data={mealLog[type.toLowerCase()] || { text: '', result: null }}
          onUpdate={(d) => updateMeal(type, d)}
        />
      ))}

      {/* Day total strip */}
      {logged.length > 0 && (
        <Card style={{ background: C.ink, color: '#fff', marginTop: 8 }}>
          <div style={{ fontSize: 13, color: C.gold, fontWeight: 600, marginBottom: 10 }}>
            📊 Today's Total
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            <NutPill label="Cal"  value={dayTotals.calories} unit="kcal" color={NC.cal} />
            <NutPill label="P"    value={dayTotals.protein}  color={NC.pro} />
            <NutPill label="C"    value={dayTotals.carbs}    color={NC.carb} />
            <NutPill label="F"    value={dayTotals.fat}      color={NC.fat} />
          </div>
          <Btn variant="gold" full onClick={() => setActiveTab(2)}>
            Full Summary →
          </Btn>
        </Card>
      )}
    </div>
  )
}

export default LogMealsTab
