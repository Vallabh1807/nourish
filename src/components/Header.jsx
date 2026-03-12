import { C } from '../utils/constants'
import { headerDate } from '../utils/helpers'

// ── App Header ────────────────────────────────────────────────────────────────
export const Header = ({ profile, targets, onReset }) => (
  <div style={{ padding: '16px 0', marginBottom: 8 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600 }}>
          Namaste, {profile.name} 🙏
        </h2>
        <p style={{ fontSize: 13, color: C.muted }}>{headerDate()}</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <span
          style={{
            display: 'inline-block',
            background: `${C.gold}18`,
            color: C.gold,
            padding: '4px 12px',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {targets.calories} kcal/day
        </span>
        <div>
          <span
            onClick={onReset}
            style={{ fontSize: 11, color: C.muted, cursor: 'pointer', marginTop: 4, display: 'inline-block' }}
          >
            ⚙ Reset
          </span>
        </div>
      </div>
    </div>
  </div>
)

// ── Tab Bar ───────────────────────────────────────────────────────────────────
const TABS = [
  { icon: '🍽', label: 'Meal Plan' },
  { icon: '✏️', label: 'Log Meals' },
  { icon: '📊', label: 'Summary'  },
]

export const TabBar = ({ activeTab, setActiveTab }) => (
  <div
    style={{
      display: 'flex',
      background: '#fff',
      borderRadius: 14,
      padding: 4,
      marginTop: 16,
      marginBottom: 20,
      boxShadow: '0 2px 8px rgba(0,0,0,.04)',
    }}
  >
    {TABS.map(({ icon, label }, i) => (
      <div
        key={i}
        onClick={() => setActiveTab(i)}
        style={{
          flex: 1,
          textAlign: 'center',
          padding: '10px 4px',
          borderRadius: 10,
          cursor: 'pointer',
          transition: 'all .2s',
          background: activeTab === i ? C.ink : 'transparent',
          color: activeTab === i ? '#fff' : C.muted,
          fontSize: 13,
          fontWeight: activeTab === i ? 600 : 400,
        }}
      >
        <span style={{ display: 'block', fontSize: 16 }}>{icon}</span>
        <span style={{ fontSize: 11 }}>{label}</span>
      </div>
    ))}
  </div>
)
