import { useState } from 'react'
import { Card, Textarea, Btn, NutPill, Spinner } from './UI'
import { C, NC, MEAL_ICONS } from '../utils/constants'
import { analyzeMeal } from '../utils/gemini'

const QUALITY_COLOR = { good: C.ok, okay: C.gold, poor: C.err }

const LogMealCard = ({ type, data, onUpdate, targets }) => {
  const [open,    setOpen]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleAnalyze = async () => {
    if (!data.text?.trim()) return
    setLoading(true)
    setError('')
    try {
      const result = await analyzeMeal(type, data.text, targets)
      onUpdate({ ...data, result })
    } catch {
      setError('Analysis failed. Check your API key and try again.')
    }
    setLoading(false)
  }

  const r = data.result

  return (
    <Card style={{ animation: 'fadeUp .45s ease' }}>
      {/* Header */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>{MEAL_ICONS[type] || '🍽'}</span>
          <span style={{ fontWeight: 600 }}>{type}</span>
          {r && (
            <span
              style={{
                fontSize: 11,
                padding: '2px 10px',
                borderRadius: 10,
                background: `${QUALITY_COLOR[r.quality] || C.gold}20`,
                color: QUALITY_COLOR[r.quality] || C.gold,
                fontWeight: 600,
              }}
            >
              {r.quality}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {r && (
            <span style={{ fontSize: 13, color: C.gold, fontWeight: 600 }}>
              {r.totals.calories} kcal
            </span>
          )}
          <span
            style={{
              transition: 'transform .2s',
              transform: open ? 'rotate(180deg)' : 'rotate(0)',
              fontSize: 12,
            }}
          >
            ▼
          </span>
        </div>
      </div>

      {/* Expanded body */}
      {open && (
        <div style={{ marginTop: 16, animation: 'scaleIn .3s ease' }}>
          <Textarea
            placeholder={`What did you have for ${type}?\n\nExamples:\n- 2 rotis with aloo sabzi and dal\n- 1 cup rice, rajma, salad\n- Poha with chai`}
            value={data.text || ''}
            onChange={(e) => onUpdate({ ...data, text: e.target.value })}
            style={{ marginBottom: 12 }}
          />

          <Btn
            variant={r ? 'soft' : 'gold'}
            onClick={handleAnalyze}
            disabled={!data.text?.trim() || loading}
            full
          >
            {loading ? (
              <>
                <Spinner size={16} color={r ? C.gold : '#fff'} /> Analyzing...
              </>
            ) : r ? (
              '🔄 Re-analyze'
            ) : (
              '✨ Analyze Nutrition'
            )}
          </Btn>

          {error && <p style={{ color: C.err, fontSize: 13, marginTop: 8 }}>{error}</p>}

          {/* Results */}
          {r && (
            <div style={{ marginTop: 16, animation: 'scaleIn .3s ease' }}>
              {/* Macro pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                <NutPill label="Cal"  value={r.totals.calories} unit="kcal" color={NC.cal} />
                <NutPill label="P"    value={r.totals.protein}  color={NC.pro} />
                <NutPill label="C"    value={r.totals.carbs}    color={NC.carb} />
                <NutPill label="F"    value={r.totals.fat}      color={NC.fat} />
                <NutPill label="Fib"  value={r.totals.fiber}    color={NC.fib} />
              </div>

              {/* Item breakdown */}
              {r.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: i < r.items.length - 1 ? `1px solid ${C.soft}` : 'none',
                    fontSize: 14,
                  }}
                >
                  <span style={{ flex: 1 }}>{item.name}</span>
                  <div style={{ display: 'flex', gap: 8, fontSize: 12, color: C.muted }}>
                    <span>{item.calories}kcal</span>
                    <span style={{ color: NC.pro  }}>P{item.protein}</span>
                    <span style={{ color: NC.carb }}>C{item.carbs}</span>
                    <span style={{ color: NC.fat  }}>F{item.fat}</span>
                  </div>
                </div>
              ))}

              {/* Summary */}
              {r.summary && (
                <div
                  style={{
                    marginTop: 12,
                    padding: '10px 14px',
                    background: C.soft,
                    borderRadius: 10,
                    fontSize: 13,
                    fontStyle: 'italic',
                    color: C.muted,
                  }}
                >
                  {r.summary}
                </div>
              )}

              {/* Suggestion */}
              {r.suggestion && (
                <div
                  style={{
                    marginTop: 8,
                    padding: '10px 14px',
                    background: `${C.ok}12`,
                    borderRadius: 10,
                    fontSize: 13,
                    color: '#4a7a4a',
                  }}
                >
                  💡 {r.suggestion}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

export default LogMealCard
