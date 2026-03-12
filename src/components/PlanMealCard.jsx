import { useState } from 'react'
import { Card, NutPill } from './UI'
import { C, NC, MEAL_ICONS } from '../utils/constants'

const PlanMealCard = ({ meal, index }) => {
  const [open, setOpen] = useState(index === 0)

  return (
    <Card
      style={{
        animation: 'fadeUp .45s ease',
        animationDelay: `${index * 0.07}s`,
        animationFillMode: 'both',
      }}
    >
      {/* Header row */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>{MEAL_ICONS[meal.type] || '🍽'}</span>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{meal.type}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: C.gold, fontWeight: 600 }}>
            {meal.totals?.calories || 0} kcal
          </span>
          <span style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'rotate(0)', fontSize: 12 }}>
            ▼
          </span>
        </div>
      </div>

      {/* Expanded content */}
      {open && (
        <div style={{ marginTop: 16, animation: 'scaleIn .3s ease' }}>
          {/* Macro pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            <NutPill label="Cal"  value={meal.totals?.calories || 0} unit="kcal" color={NC.cal} />
            <NutPill label="P"    value={meal.totals?.protein  || 0} color={NC.pro} />
            <NutPill label="C"    value={meal.totals?.carbs    || 0} color={NC.carb} />
            <NutPill label="F"    value={meal.totals?.fat      || 0} color={NC.fat} />
            <NutPill label="Fib"  value={meal.totals?.fiber    || 0} color={NC.fib} />
          </div>

          {/* Item list */}
          {(meal.items || []).map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: i < meal.items.length - 1 ? `1px solid ${C.soft}` : 'none',
              }}
            >
              <span style={{ fontSize: 14, flex: 1 }}>{item.name}</span>
              <div style={{ display: 'flex', gap: 8, fontSize: 12, color: C.muted }}>
                <span>{item.calories}kcal</span>
                <span style={{ color: NC.pro }}>P{item.protein}</span>
                <span style={{ color: NC.carb }}>C{item.carbs}</span>
                <span style={{ color: NC.fat }}>F{item.fat}</span>
              </div>
            </div>
          ))}

          {/* Tip */}
          {meal.tip && (
            <div
              style={{
                marginTop: 14,
                padding: '10px 14px',
                background: `${C.gold}15`,
                borderRadius: 10,
                fontSize: 13,
                color: C.gold,
              }}
            >
              💡 {meal.tip}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

export default PlanMealCard
