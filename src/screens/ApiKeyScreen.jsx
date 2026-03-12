import { useState } from 'react'
import { Input, Btn, Label, Spinner } from '../components/UI'
import { C } from '../utils/constants'
import { safeSet } from '../utils/helpers'
import { ss } from '../utils/styles'

const ApiKeyScreen = ({ onSave }) => {
  const [key,    setKey]    = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!key.trim()) return
    setSaving(true)
    await safeSet('nourish-key', key.trim())
    onSave(key.trim())
  }

  return (
    <div
      style={{
        ...ss.container,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        animation: 'fadeUp .45s ease',
      }}
    >
      {/* Branding */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 52,
            fontWeight: 700,
            color: C.ink,
            marginBottom: 8,
          }}
        >
          Nourish
        </h1>
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 18,
            fontStyle: 'italic',
            color: C.gold,
          }}
        >
          Your Indian Diet Tracker
        </p>
      </div>

      {/* Form */}
      <div style={{ width: '100%', maxWidth: 360 }}>
        <Label>Gemini API Key</Label>
        <Input
          type="password"
          placeholder="Paste your Gemini API key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 13, color: C.gold, textDecoration: 'none', display: 'block', marginBottom: 20 }}
        >
          🔑 Get your free API key →
        </a>
        <Btn variant="gold" full onClick={handleSave} disabled={!key.trim() || saving}>
          {saving ? <Spinner size={18} color="#fff" /> : 'Continue'}
        </Btn>
        <p style={{ fontSize: 12, color: C.muted, textAlign: 'center', marginTop: 16 }}>
          🔒 Key stored only in your browser
        </p>
      </div>
    </div>
  )
}

export default ApiKeyScreen
