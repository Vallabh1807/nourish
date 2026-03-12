import { C } from '../utils/constants'
import { ss } from '../utils/styles'

// ── Spinner ──────────────────────────────────────────────────────────────────
export const Spinner = ({ size = 24, color = C.gold }) => (
  <div
    style={{
      width: size,
      height: size,
      border: `3px solid ${C.soft}`,
      borderTopColor: color,
      borderRadius: '50%',
      animation: 'spin .7s linear infinite',
      display: 'inline-block',
    }}
  />
)

// ── Input ────────────────────────────────────────────────────────────────────
export const Input = ({ type = 'text', placeholder, value, onChange, style }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={{ ...ss.input, ...style }}
  />
)

// ── Select ───────────────────────────────────────────────────────────────────
export const Select = ({ options = [], value, onChange, placeholder, style }) => (
  <select style={{ ...ss.select, ...style }} value={value} onChange={onChange}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
)

// ── Textarea ─────────────────────────────────────────────────────────────────
export const Textarea = ({ placeholder, value, onChange, style }) => (
  <textarea
    style={{ ...ss.textarea, ...style }}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
)

// ── Card ─────────────────────────────────────────────────────────────────────
export const Card = ({ children, style, onClick }) => (
  <div style={{ ...ss.card, ...style }} onClick={onClick}>
    {children}
  </div>
)

// ── Label ─────────────────────────────────────────────────────────────────────
export const Label = ({ children }) => (
  <label style={ss.label}>{children}</label>
)

// ── Button ───────────────────────────────────────────────────────────────────
const BTN_VARIANTS = {
  primary: { background: C.ink,  color: '#fff' },
  gold:    { background: C.gold, color: '#fff' },
  ghost:   { background: 'transparent', border: `1.5px solid ${C.ink}`, color: C.ink },
  soft:    { background: C.soft, color: C.ink },
  green:   { background: C.ok,   color: '#fff' },
}

export const Btn = ({ children, variant = 'primary', onClick, disabled, style, full }) => {
  const base = {
    padding: '12px 24px',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    fontFamily: 'Outfit, sans-serif',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    transition: 'all .2s',
    opacity: disabled ? 0.5 : 1,
    width: full ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  }
  return (
    <button
      style={{ ...base, ...(BTN_VARIANTS[variant] || BTN_VARIANTS.primary), ...style }}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  )
}

// ── Option Card (selectable) ─────────────────────────────────────────────────
export const OptionCard = ({ children, selected, onClick, style }) => (
  <div
    onClick={onClick}
    style={{
      ...ss.card,
      cursor: 'pointer',
      border: selected ? `2px solid ${C.gold}` : '2px solid transparent',
      padding: 16,
      transition: 'all .2s',
      transform: selected ? 'scale(1.02)' : 'scale(1)',
      marginBottom: 0,
      ...style,
    }}
  >
    {children}
  </div>
)

// ── Nutrient Pill ────────────────────────────────────────────────────────────
export const NutPill = ({ label, value, unit = 'g', color }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: `${color}18`,
      padding: '6px 14px',
      borderRadius: 20,
      fontSize: 13,
      fontWeight: 500,
    }}
  >
    <div style={{ width: 8, height: 8, borderRadius: 4, background: color }} />
    <span style={{ color: C.muted }}>{label}</span>
    <span style={{ fontWeight: 700, color: C.ink }}>
      {value}
      {unit}
    </span>
  </div>
)

// ── Nutrient Progress Bar ─────────────────────────────────────────────────────
export const NutrientBar = ({ label, value, goal, color }) => {
  const pct  = Math.min((value / goal) * 100, 150)
  const over = value > goal
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
        <span style={{ fontWeight: 500 }}>{label}</span>
        <span style={{ color: over ? C.err : C.muted }}>
          {value}/{goal}
        </span>
      </div>
      <div style={{ height: 8, background: C.soft, borderRadius: 4, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.min(pct, 100)}%`,
            background: over ? C.err : color,
            borderRadius: 4,
            transition: 'width 1s cubic-bezier(.22,.68,0,1.2)',
          }}
        />
      </div>
    </div>
  )
}
