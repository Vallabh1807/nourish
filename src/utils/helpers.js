import { ACT_MULT, GOAL_ADJ } from './constants'

// ── Date Helpers ─────────────────────────────────────────────────────────────
export const todayKey = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export const headerDate = () =>
  new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

// ── JSON Helpers ─────────────────────────────────────────────────────────────
export const stripFences = (t) =>
  t.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()

// ── Storage Helpers ──────────────────────────────────────────────────────────
export const safeGet = async (k) => {
  try {
    // Support both window.storage (artifact env) and localStorage fallback
    if (window.storage?.get) {
      const res = await window.storage.get(k)
      return res?.value ?? null
    }
    return localStorage.getItem(k)
  } catch {
    return null
  }
}

export const safeSet = async (k, v) => {
  try {
    if (window.storage?.set) {
      if (v === null) {
        await window.storage.delete?.(k)
      } else {
        await window.storage.set(k, v)
      }
      return
    }
    if (v === null) {
      localStorage.removeItem(k)
    } else {
      localStorage.setItem(k, v)
    }
  } catch {
    // silent fail
  }
}

// ── BMR / TDEE Calculator (Mifflin-St Jeor) ─────────────────────────────────
export const calcTargets = (p) => {
  const w = +p.weight
  const h = +p.height
  const a = +p.age
  const bmr = 10 * w + 6.25 * h - 5 * a + (p.gender === 'male' ? 5 : -161)
  const tdee = bmr * (ACT_MULT[p.activity] || 1.55)
  const cal  = Math.round(tdee + (GOAL_ADJ[p.goal] || 0))

  // Macro splits based on goal
  let pp, cp, fp
  if (p.goal === 'loseWeight' || p.goal === 'loseFast') {
    pp = 0.35; cp = 0.35; fp = 0.30
  } else if (p.goal === 'gainMuscle' || p.goal === 'gainFast') {
    pp = 0.30; cp = 0.45; fp = 0.25
  } else {
    pp = 0.25; cp = 0.50; fp = 0.25
  }

  return {
    calories: cal,
    protein:  Math.round((cal * pp) / 4),
    carbs:    Math.round((cal * cp) / 4),
    fat:      Math.round((cal * fp) / 9),
    fiber:    p.gender === 'male' ? 38 : 25,
  }
}
