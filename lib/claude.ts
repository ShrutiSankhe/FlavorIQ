import Anthropic from '@anthropic-ai/sdk'
import type { FlavorProfile, PairingResult } from './types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function parseJSON(text: string) {
  const cleaned = text.replace(/```json\n?|```\n?/g, '').trim()
  // Find JSON object boundaries in case there's any surrounding text
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('No JSON found in response')
  return JSON.parse(cleaned.slice(start, end + 1))
}

export async function getFlavorProfile(ingredient: string): Promise<FlavorProfile> {
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `You are a culinary expert and food scientist with deep knowledge of flavor chemistry and global cuisine.

For the ingredient "${ingredient}", return ONLY a valid JSON object — no markdown, no explanation:

{
  "name": "canonical display name",
  "region": "primary culinary region of origin",
  "category": "e.g. warm spice / herb / allium / citrus / fermented / umami / etc.",
  "flavor_tags": ["5 to 7 single-word or short descriptors"],
  "heat_profile": "warming OR cooling OR neutral",
  "sensory": {
    "heat": <0-10>,
    "intensity": <0-10>,
    "sweetness": <0-10>,
    "bitterness": <0-10>
  },
  "summary": "2 evocative but accurate sentences describing the flavor",
  "traditional_pairings": [
    { "name": "ingredient", "reason": "short phrase" }
  ],
  "contemporary_pairings": [
    { "name": "ingredient", "reason": "short phrase" }
  ]
}

traditional_pairings: 4–5 items. contemporary_pairings: 2–3 unexpected but compelling items.`,
    }],
  })

  const text = msg.content[0].type === 'text' ? msg.content[0].text : ''
  return parseJSON(text) as FlavorProfile
}

export async function getPairingResult(a: string, b: string): Promise<PairingResult> {
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `You are a culinary expert and flavor scientist.

Analyze whether "${a}" and "${b}" pair well together.

Return ONLY a valid JSON object — no markdown, no explanation:

{
  "verdict": "excellent OR good OR neutral OR challenging OR avoid",
  "score": <0-100>,
  "why": "2–3 sentences on the flavor chemistry or culinary tradition",
  "how_to_use": "if good/excellent/neutral: suggest a specific dish or method. If challenging/avoid: explain the clash.",
  "shared_compounds": ["2–4 shared flavor characteristics"],
  "alternatives": ["if challenging or avoid: 2–3 better alternatives to ${b} that pair with ${a}"]
}`,
    }],
  })

  const text = msg.content[0].type === 'text' ? msg.content[0].text : ''
  return parseJSON(text) as PairingResult
}
