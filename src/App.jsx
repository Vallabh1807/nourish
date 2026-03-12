import { C } from './utils/constants'
import { ss } from './utils/styles'
import useAppState from './hooks/useAppState'

// Screens
import OnboardingScreen   from './screens/OnboardingScreen'
import CalorieResultScreen from './screens/CalorieResultScreen'
import MealPlanTab        from './screens/MealPlanTab'
import LogMealsTab        from './screens/LogMealsTab'
import SummaryTab         from './screens/SummaryTab'

// Shared layout
import { Header, TabBar } from './components/Header'
import { Spinner }        from './components/UI'

export default function App() {
  const {
    screen,
    profile, setProfile,
    targets,
    mealPlan, setMealPlan,
    mealLog, setMealLog,
    activeTab, setActiveTab,
    handleOnboardingComplete,
    handleCalorieResultContinue,
    handleReset,
  } = useAppState()

  // ── Loading splash ──────────────────────────────────────────────────────
  if (screen === 'loading') {
    return (
      <div
        style={{
          ...ss.container,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 42,
              color: C.ink,
              marginBottom: 8,
            }}
          >
            Nourish
          </h1>
          <Spinner size={28} />
        </div>
      </div>
    )
  }



  if (screen === 'onboarding') {
    return (
      <OnboardingScreen
        profile={profile}
        setProfile={setProfile}
        onComplete={handleOnboardingComplete}
      />
    )
  }

  if (screen === 'calorieResult') {
    return (
      <CalorieResultScreen
        profile={profile}
        targets={targets}
        onContinue={handleCalorieResultContinue}
      />
    )
  }

  // ── Main app ─────────────────────────────────────────────────────────────
  return (
    <div style={{ ...ss.container, padding: '0 20px 24px' }}>
      <Header profile={profile} targets={targets} onReset={handleReset} />
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 0 && (
        <MealPlanTab
          profile={profile}
          targets={targets}
          mealPlan={mealPlan}
          setMealPlan={setMealPlan}
        />
      )}
      {activeTab === 1 && (
        <LogMealsTab
          targets={targets}
          mealLog={mealLog}
          setMealLog={setMealLog}
          setActiveTab={setActiveTab}
        />
      )}
      {activeTab === 2 && (
        <SummaryTab
          targets={targets}
          mealLog={mealLog}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  )
}
