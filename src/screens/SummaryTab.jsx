import { Card, Btn, NutrientBar } from '../components/UI'
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { C, NC } from '../utils/constants'

const SummaryTab = ({ targets, mealLog, setActiveTab }) => {
  // Aggregate all logged meals
  const logged = Object.entries(mealLog).filter(([, v]) => v.result)

  const dayTotals = logged.reduce(
    (acc, [, m]) => {
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

  // SVG donut ring values
  const calPct    = Math.min(dayTotals.calories / targets.calories, 1)
  const remaining = targets.calories - dayTotals.calories
  const radius    = 70
  const circ      = 2 * Math.PI * radius
  const offset    = circ * (1 - calPct)

  // Bar chart data per meal
  const mealCals  = {}
  logged.forEach(([k, v]) => { mealCals[k] = v.result.totals.calories })
  const barData = [
    { name: 'Brea', cal: mealCals.breakfast || 0 },
    { name: 'Lun',  cal: mealCals.lunch      || 0 },
    { name: 'Din',  cal: mealCals.dinner     || 0 },
    { name: 'Sna',  cal: mealCals.snacks     || 0 },
  ]

  // Macro pie data
  const pieData = [
    { name: 'Protein', value: dayTotals.protein, color: NC.pro  },
    { name: 'Carbs',   value: dayTotals.carbs,   color: NC.carb },
    { name: 'Fat',     value: dayTotals.fat,      color: NC.fat  },
  ]

  // ── Empty state ──────────────────────────────────────────────────────────
  if (logged.length === 0) {
    return (
      <div style={{ animation: 'fadeUp .45s ease' }}>
        <Card style={{ textAlign: 'center', padding: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
          <p style={{ color: C.muted, marginBottom: 16 }}>No meals logged yet today</p>
          <Btn variant="gold" onClick={() => setActiveTab(1)}>
            Log My Meals →
          </Btn>
        </Card>
      </div>
    )
  }

  return (
    <div style={{ animation: 'fadeUp .45s ease' }}>
      {/* ── Donut + Progress Bars ──────────────────────────────────────────── */}
      <Card>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, marginBottom: 16 }}>
          Daily Overview
        </h3>

        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          style={{ margin: '0 auto', display: 'block' }}
        >
          <circle cx="90" cy="90" r={radius} fill="none" stroke={C.soft} strokeWidth="12" />
          <circle
            cx="90" cy="90" r={radius}
            fill="none"
            stroke={remaining >= 0 ? C.gold : C.err}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(.22,.68,0,1.2)',
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
          <text
            x="90" y="82"
            textAnchor="middle"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 700, fill: C.ink }}
          >
            {dayTotals.calories}
          </text>
          <text
            x="90" y="104"
            textAnchor="middle"
            style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fill: C.muted }}
          >
            / {targets.calories} kcal
          </text>
        </svg>

        <p style={{ textAlign: 'center', fontSize: 14, marginTop: 8, color: remaining >= 0 ? C.ok : C.err, fontWeight: 500 }}>
          {remaining >= 0
            ? `✓ ${remaining} kcal remaining`
            : `⚠ ${Math.abs(remaining)} kcal over`}
        </p>

        <div style={{ marginTop: 20 }}>
          <NutrientBar label="Calories" value={dayTotals.calories} goal={targets.calories} color={NC.cal} />
          <NutrientBar label="Protein"  value={dayTotals.protein}  goal={targets.protein}  color={NC.pro} />
          <NutrientBar label="Carbs"    value={dayTotals.carbs}    goal={targets.carbs}    color={NC.carb} />
          <NutrientBar label="Fat"      value={dayTotals.fat}      goal={targets.fat}      color={NC.fat} />
          <NutrientBar label="Fiber"    value={dayTotals.fiber}    goal={targets.fiber}    color={NC.fib} />
        </div>
      </Card>

      {/* ── Macro Pie ─────────────────────────────────────────────────────── */}
      <Card>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, marginBottom: 12 }}>
          Macro Distribution
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
            >
              {pieData.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
          {pieData.map((d) => (
            <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color }} />
              {d.name}
            </div>
          ))}
        </div>
      </Card>

      {/* ── Calories per Meal Bar Chart ────────────────────────────────────── */}
      <Card>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, marginBottom: 12 }}>
          Calories Per Meal
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: C.muted }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="cal" fill={C.gold} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

export default SummaryTab
