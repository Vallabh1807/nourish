import { useState, useEffect } from 'react'
import { DEFAULT_PROFILE } from '../utils/constants'
import { calcTargets, safeGet, safeSet, todayKey } from '../utils/helpers'

/**
 * Central hook that manages all app state and handles
 * persistence (load on mount, save on change).
 */
const useAppState = () => {
  const [screen,   setScreen]   = useState('loading')
  const [profile,  setProfile]  = useState(DEFAULT_PROFILE)
  const [targets,  setTargets]  = useState(null)
  const [mealPlan, setMealPlan] = useState(null)
  const [mealLog,  setMealLog]  = useState({})
  const [activeTab, setActiveTab] = useState(0)

  // ── Load persisted state on mount ─────────────────────────────────────────
  useEffect(() => {
    ;(async () => {
      try {
        const ps = await safeGet('nourish-profile')
        if (!ps) { setScreen('onboarding'); return }
        const p = JSON.parse(ps)
        setProfile(p)
        setTargets(calcTargets(p))

        const today = todayKey()

        const planStr = await safeGet(`nourish-plan-${today}`)
        if (planStr) {
          try { setMealPlan(JSON.parse(planStr)) } catch { /* bad JSON */ }
        }

        const logStr = await safeGet(`nourish-log-${today}`)
        if (logStr) {
          try { setMealLog(JSON.parse(logStr)) } catch { /* bad JSON */ }
        }

        setScreen('mainApp')
      } catch (e) {
        console.error(e)
        setScreen('onboarding')
      }
    })()
  }, [])

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleOnboardingComplete = async () => {
    const t = calcTargets(profile)
    setTargets(t)
    await safeSet('nourish-profile', JSON.stringify(profile))
    setScreen('calorieResult')
  }

  const handleCalorieResultContinue = () => {
    setScreen('mainApp')
  }

  const handleReset = async () => {
    const today = todayKey()
    await safeSet('nourish-profile',         null)
    await safeSet(`nourish-plan-${today}`,   null)
    await safeSet(`nourish-log-${today}`,    null)


    setProfile(DEFAULT_PROFILE)
    setTargets(null)
    setMealPlan(null)
    setMealLog({})
    setActiveTab(0)
    setScreen('onboarding')
  }

  return {
    screen, setScreen,
    profile, setProfile,
    targets,
    mealPlan, setMealPlan,
    mealLog, setMealLog,
    activeTab, setActiveTab,
    handleOnboardingComplete,
    handleCalorieResultContinue,
    handleReset,
  }
}

export default useAppState
