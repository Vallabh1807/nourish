// ── Color Palette ────────────────────────────────────────────────────────────
export const C = {
  bg:   '#F5F0E8',
  ink:  '#1C1C1C',
  gold: '#C8A96E',
  soft: '#EDE8DC',
  muted:'#9A8E7E',
  ok:   '#7DAF7A',
  err:  '#E07070',
}

// ── Nutrient Colors ──────────────────────────────────────────────────────────
export const NC = {
  cal:  '#C8A96E',
  pro:  '#7AABCF',
  carb: '#B4D48A',
  fat:  '#E0A86E',
  fib:  '#A890C8',
}

// ── Calorie Calculation Maps ─────────────────────────────────────────────────
export const ACT_MULT = {
  sedentary:  1.2,
  light:      1.375,
  moderate:   1.55,
  active:     1.725,
  veryActive: 1.9,
}

export const GOAL_ADJ = {
  loseWeight: -500,
  loseFast:   -750,
  maintain:    0,
  gainMuscle:  300,
  gainFast:    500,
}

// ── Display Labels ───────────────────────────────────────────────────────────
export const GOAL_LABELS = {
  loseWeight: 'Lose Weight',
  loseFast:   'Lose Fast',
  maintain:   'Stay Fit',
  gainMuscle: 'Build Muscle',
  gainFast:   'Bulk Up',
}

export const DIET_LABELS = {
  vegetarian:      'Vegetarian',
  eggetarian:      'Eggetarian',
  'non-vegetarian':'Non-Vegetarian',
}

export const MEAL_ICONS = {
  Breakfast: '🌅',
  Lunch:     '☀️',
  Dinner:    '🌙',
  Snacks:    '🍎',
}

export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']

// ── Onboarding Options ───────────────────────────────────────────────────────
export const ACTIVITY_OPTIONS = [
  { value: 'sedentary',  label: 'Sedentary — Little or no exercise' },
  { value: 'light',      label: 'Light — Exercise 1-3 days/week' },
  { value: 'moderate',   label: 'Moderate — Exercise 3-5 days/week' },
  { value: 'active',     label: 'Active — Exercise 6-7 days/week' },
  { value: 'veryActive', label: 'Very Active — Intense daily exercise' },
]

export const BODY_TYPE_OPTIONS = [
  { value: 'slim',     emoji: '🧍', label: 'Slim / Lean' },
  { value: 'average',  emoji: '🙂', label: 'Average' },
  { value: 'athletic', emoji: '🏃', label: 'Athletic' },
  { value: 'heavy',    emoji: '🫶', label: 'Heavy' },
]

export const DIET_OPTIONS = [
  { value: 'vegetarian',     emoji: '🥗', label: 'Vegetarian',     desc: 'No meat, no egg, no fish' },
  { value: 'eggetarian',     emoji: '🥚', label: 'Eggetarian',     desc: 'Veg + eggs' },
  { value: 'non-vegetarian', emoji: '🍗', label: 'Non-Vegetarian', desc: 'All foods' },
]

export const GOAL_OPTIONS = [
  { value: 'loseWeight', emoji: '📉', label: 'Lose Weight',   desc: '−500 kcal/day deficit' },
  { value: 'loseFast',   emoji: '🔥', label: 'Lose Fast',     desc: '−750 kcal/day deficit' },
  { value: 'maintain',   emoji: '⚖️', label: 'Stay Fit',      desc: 'Maintain current weight' },
  { value: 'gainMuscle', emoji: '💪', label: 'Build Muscle',  desc: '+300 kcal/day surplus' },
  { value: 'gainFast',   emoji: '🏋️', label: 'Bulk Up',       desc: '+500 kcal/day surplus' },
]

// ── Default Profile ──────────────────────────────────────────────────────────
export const DEFAULT_PROFILE = {
  name:     '',
  gender:   '',
  age:      '',
  weight:   '',
  height:   '',
  diet:     '',
  bodyType: '',
  activity: 'moderate',
  goal:     '',
}
