import { stripFences } from './helpers'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY

const MODELS = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'gemma2-9b-it']

// ── Raw Groq API Call with automatic model fallback ──────────────────────────
export const callAI = async (prompt, maxTokens = 2048) => {
  if (!GROQ_KEY) throw new Error('Missing VITE_GROQ_API_KEY in .env')

  let lastError

  for (const model of MODELS) {
    try {
      const res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: maxTokens,
          temperature: 0.7,
        }),
      })

      // Rate-limited or model not found — try next
      if (res.status === 429 || res.status === 404) {
        lastError = new Error(`${model}: ${res.status}`)
        console.warn(`⚠ ${model} returned ${res.status}, trying next model…`)
        continue
      }

      if (!res.ok) throw new Error(`API error (${model}): ${res.status}`)

      const data = await res.json()
      const text = data.choices?.[0]?.message?.content
      if (!text) throw new Error(`No response from ${model}`)
      return text
    } catch (err) {
      lastError = err
      if (err.message?.includes('API error') || err.message?.includes('No response')) {
        console.warn(`⚠ ${model} failed: ${err.message}, trying next…`)
        continue
      }
      throw err
    }
  }

  throw lastError || new Error('All AI models failed')
}

// ── Generate Full Day Meal Plan ──────────────────────────────────────────────
export const generateMealPlan = async (profile, targets) => {
  const prompt = `You are an Indian nutritionist for middle-class Indian families. Generate a full day meal plan.

Profile:
- Diet: ${profile.diet}
- Daily calories: ${targets.calories} kcal
- Protein: ${targets.protein}g, Carbs: ${targets.carbs}g, Fat: ${targets.fat}g
- Goal: ${profile.goal}
- Body type: ${profile.bodyType}

CRITICAL RULES:
1. Only use common Indian foods available in any middle-class Indian household or local kirana shop
2. ALLOWED foods: roti, chapati, rice, dal, sabzi, paneer, egg, chicken (if non-veg), rajma, chhole, poha, upma, idli, dosa, paratha, lassi, curd, milk, banana, apple, moong, masoor dal, aloo, palak, bhindi, gobi, besan, sattu, peanuts, sprouts, seasonal vegetables, etc.
3. NEVER suggest: quinoa, kale, avocado, greek yogurt, protein powder, granola, smoked salmon, exotic sauces, overnight oats, acai bowls, etc.
4. Keep it simple, home-cooked, affordable for a middle-class Indian family

Return ONLY valid JSON (no markdown):
{"meals":[{"type":"Breakfast","items":[{"name":"food with quantity","calories":0,"protein":0,"carbs":0,"fat":0,"fiber":0}],"totals":{"calories":0,"protein":0,"carbs":0,"fat":0,"fiber":0},"tip":"one short practical tip"}],"dailyTip":"One overall diet tip for this person's goal"}

Generate for: Breakfast, Lunch, Dinner, Snacks. Values in grams except calories (kcal).`

  const raw = await callAI(prompt, 2048)
  return JSON.parse(stripFences(raw))
}

// ── Analyze a Logged Meal ────────────────────────────────────────────────────
export const analyzeMeal = async (mealType, foodText, targets) => {
  const prompt = `You are an Indian nutritionist. Analyze the nutritional content of this ${mealType}:

"${foodText}"

This is a typical Indian household meal. Estimate realistic portions if not specified.
Daily goals for context: ${targets.calories} kcal, ${targets.protein}g protein, ${targets.carbs}g carbs, ${targets.fat}g fat.

Return ONLY valid JSON:
{"items":[{"name":"food with portion","calories":0,"protein":0,"carbs":0,"fat":0,"fiber":0}],"totals":{"calories":0,"protein":0,"carbs":0,"fat":0,"fiber":0},"quality":"good|okay|poor","summary":"One sentence about this meal's nutrition","suggestion":"One practical improvement suggestion using Indian foods"}`

  const raw = await callAI(prompt, 1024)
  return JSON.parse(stripFences(raw))
}
