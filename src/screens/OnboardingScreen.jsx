import { useState } from 'react'
import { Input, Select, Btn, Label, OptionCard } from '../components/UI'
import { C, ACTIVITY_OPTIONS, BODY_TYPE_OPTIONS, DIET_OPTIONS, GOAL_OPTIONS } from '../utils/constants'
import { ss } from '../utils/styles'

// ── Progress Dots (module-level for stable identity) ─────────────────────────
const ProgressDots = ({ step }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        style={{
          width: i === step ? 24 : 8,
          height: 8,
          borderRadius: 4,
          background: i === step ? C.gold : i < step ? `${C.gold}80` : C.soft,
          transition: 'all .3s',
        }}
      />
    ))}
  </div>
)

// ── Nav Buttons (module-level for stable identity) ───────────────────────────
const Nav = ({ step, setStep, onComplete, canContinue }) => (
  <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
    {step > 0 && (
      <Btn variant="ghost" onClick={() => setStep((s) => s - 1)} style={{ flex: 1 }}>
        ← Back
      </Btn>
    )}
    <Btn
      variant="gold"
      full={step === 0}
      onClick={() => {
        if (step < 3) setStep((s) => s + 1)
        else onComplete()
      }}
      disabled={!canContinue}
      style={{ flex: 1 }}
    >
      {step === 3 ? 'See My Results' : 'Continue →'}
    </Btn>
  </div>
)

// ── Step 0: Basic Info (module-level for stable identity) ────────────────────
const Step0 = ({ profile, up }) => (
  <div style={{ animation: 'fadeUp .45s ease' }}>
    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, marginBottom: 4 }}>
      Tell us about yourself
    </h2>
    <p style={{ color: C.muted, marginBottom: 24, fontSize: 14 }}>
      We'll use this to calculate your ideal nutrition
    </p>

    <Label>Your Name</Label>
    <Input
      placeholder="Enter your name"
      value={profile.name}
      onChange={(e) => up('name', e.target.value)}
      style={{ marginBottom: 16 }}
    />

    <Label>Gender</Label>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
      {[['male', '🙋‍♂️', 'Male'], ['female', '🙋‍♀️', 'Female']].map(([v, e, l]) => (
        <OptionCard key={v} selected={profile.gender === v} onClick={() => up('gender', v)}>
          <div style={{ textAlign: 'center', fontSize: 32 }}>{e}</div>
          <div style={{ textAlign: 'center', fontWeight: 600, marginTop: 4 }}>{l}</div>
        </OptionCard>
      ))}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
      <div>
        <Label>Age</Label>
        <Input type="number" placeholder="25" value={profile.age} onChange={(e) => up('age', e.target.value)} />
      </div>
      <div>
        <Label>Weight (kg)</Label>
        <Input type="number" placeholder="70" value={profile.weight} onChange={(e) => up('weight', e.target.value)} />
      </div>
      <div>
        <Label>Height (cm)</Label>
        <Input type="number" placeholder="170" value={profile.height} onChange={(e) => up('height', e.target.value)} />
      </div>
    </div>
  </div>
)

// ── Step 1: Diet Type (module-level for stable identity) ─────────────────────
const Step1 = ({ profile, up }) => (
  <div style={{ animation: 'fadeUp .45s ease' }}>
    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, marginBottom: 4 }}>
      Your Diet Preference
    </h2>
    <p style={{ color: C.muted, marginBottom: 24, fontSize: 14 }}>This helps us suggest the right foods</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {DIET_OPTIONS.map(({ value, emoji, label, desc }) => (
        <OptionCard key={value} selected={profile.diet === value} onClick={() => up('diet', value)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 28 }}>{emoji}</span>
            <div>
              <div style={{ fontWeight: 600 }}>{label}</div>
              <div style={{ fontSize: 13, color: C.muted }}>{desc}</div>
            </div>
          </div>
        </OptionCard>
      ))}
    </div>
  </div>
)

// ── Step 2: Body Type & Activity (module-level for stable identity) ──────────
const Step2 = ({ profile, up }) => (
  <div style={{ animation: 'fadeUp .45s ease' }}>
    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, marginBottom: 4 }}>
      Body & Activity
    </h2>
    <p style={{ color: C.muted, marginBottom: 24, fontSize: 14 }}>Help us understand your lifestyle</p>

    <Label>Body Type</Label>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
      {BODY_TYPE_OPTIONS.map(({ value, emoji, label }) => (
        <OptionCard key={value} selected={profile.bodyType === value} onClick={() => up('bodyType', value)}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 28 }}>{emoji}</span>
            <div style={{ fontWeight: 500, fontSize: 14, marginTop: 4 }}>{label}</div>
          </div>
        </OptionCard>
      ))}
    </div>

    <Label>Activity Level</Label>
    <Select
      value={profile.activity}
      onChange={(e) => up('activity', e.target.value)}
      options={ACTIVITY_OPTIONS}
    />
  </div>
)

// ── Step 3: Body Goal (module-level for stable identity) ─────────────────────
const Step3 = ({ profile, up }) => (
  <div style={{ animation: 'fadeUp .45s ease' }}>
    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, marginBottom: 4 }}>
      What's your goal?
    </h2>
    <p style={{ color: C.muted, marginBottom: 24, fontSize: 14 }}>We'll adjust your calories accordingly</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {GOAL_OPTIONS.map(({ value, emoji, label, desc }) => (
        <OptionCard key={value} selected={profile.goal === value} onClick={() => up('goal', value)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 28 }}>{emoji}</span>
            <div>
              <div style={{ fontWeight: 600 }}>{label}</div>
              <div style={{ fontSize: 13, color: C.muted }}>{desc}</div>
            </div>
          </div>
        </OptionCard>
      ))}
    </div>
  </div>
)

// ── Main Onboarding Screen ───────────────────────────────────────────────────
const OnboardingScreen = ({ profile, setProfile, onComplete }) => {
  const [step, setStep] = useState(0)

  const up = (k, v) => setProfile((p) => ({ ...p, [k]: v }))

  const canContinue = (() => {
    if (step === 0) return profile.name && profile.gender && profile.age && profile.weight && profile.height
    if (step === 1) return !!profile.diet
    if (step === 2) return !!profile.bodyType && !!profile.activity
    if (step === 3) return !!profile.goal
    return false
  })()

  const stepProps = { profile, up }

  return (
    <div style={{ ...ss.container, padding: '40px 24px' }}>
      <ProgressDots step={step} />
      {step === 0 && <Step0 {...stepProps} />}
      {step === 1 && <Step1 {...stepProps} />}
      {step === 2 && <Step2 {...stepProps} />}
      {step === 3 && <Step3 {...stepProps} />}
      <Nav step={step} setStep={setStep} onComplete={onComplete} canContinue={canContinue} />
    </div>
  )
}

export default OnboardingScreen
