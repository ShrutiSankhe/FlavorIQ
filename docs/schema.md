# Data Schema ? FlavorIQ (v1)

## Goals
This schema supports:
- Ingredient flavor cards (single ingredient lookup)
- Pairing evaluation (ingredient A + ingredient B)
- Explainable compatibility reasoning
- A hybrid approach: curated data as source of truth + LLM as reasoning layer

---

## 1) Ingredient (Core Entity)

### Ingredient
**Purpose:** Canonical record for an ingredient.

**Fields**
- id (string) ? stable unique ID (e.g., "garlic", "sumac")
- name (string)
- aliases (string[]) ? optional (e.g., ["scallion", "green onion"])
- aroma_tags (string[]) ? 2?4 values from taxonomy
- basic_tastes (string[]) ? subset of [sweet, salty, sour, bitter, umami]
- intensity (int) ? 1?5
- perceived_temperature (string) ? cooling | neutral | warming
- mouthfeel_tags (string[]) ? optional (e.g., ["creamy", "astringent"])
- regions (string[]) ? broad regions (taxonomy list)
- technique_sensitivity (string[]) ? optional flags (e.g., ["raw_vs_cooked", "dry_vs_moist"])
- classic_pairings (PairingReference[])
- contemporary_pairings (PairingReference[])
- techniques (string[]) ? suggested techniques (e.g., ["roast", "saute", "pickle"])
- substitutions (string[]) ? optional
- watchouts (string[]) ? optional (e.g., "burns easily; can turn bitter")
- source (SourceInfo) ? provenance + confidence

### PairingReference
**Purpose:** Store a pairing suggestion tied to an ingredient.
- ingredient_id (string)
- why (string) ? short rationale (1?2 sentences)
- confidence (string) ? low | medium | high
- context (string[]) ? optional (e.g., ["sauce", "stew", "raw"])

### SourceInfo
**Purpose:** Track where the record came from.
- provenance (string) ? curated | llm_draft | imported
- confidence (string) ? low | medium | high
- last_reviewed_at (string, ISO date) ? optional

---

## 2) Pairing Evaluation (Generated Entity)

### PairingEvaluation
**Purpose:** The structured output when a user checks ingredient A + ingredient B.

**Fields**
- ingredient_a_id (string)
- ingredient_b_id (string)
- outcome (string) ? compatible | conditional | incompatible
- score (int) ? 0?100
- reasons (Reason[])
- suggested_uses (SuggestedUse[])
- watchouts (string[]) ? risks / clashes / how to mitigate
- technique_notes (string[]) ? how technique changes the result
- evidence (Evidence) ? what data was used
- generated_at (string, ISO datetime)

### Reason
**Purpose:** Explainability as structured data.
- heuristic (string) ? one of:
  - shared_aroma
  - complementary_contrast
  - bridge
  - intensity_balance
  - technique_dependency
  - cultural_precedent
  - clash
- direction (string) ? positive | negative
- explanation (string) ? 1?2 sentences, user-friendly

### SuggestedUse
**Purpose:** Concrete ?how? guidance without becoming a recipe generator.
- format (string) ? e.g., "stir-fry", "salad", "soup", "spread", "marinade"
- technique (string) ? e.g., "roast", "saute", "raw", "ferment"
- tip (string) ? short usage note (e.g., "add acid to brighten; keep miso off high heat")

### Evidence
**Purpose:** Keep the system honest and debuggable.
- ingredient_a_source (SourceInfo)
- ingredient_b_source (SourceInfo)
- used_classic_pairings (boolean)
- used_contemporary_pairings (boolean)
- llm_used (boolean)
- llm_prompt_version (string) ? optional

### PairingEvaluation example

{
  "ingredient_a_id": "eggplant",
  "ingredient_b_id": "miso",
  "outcome": "compatible",
  "score": 82,
  "reasons": [
    {"heuristic": "bridge", "direction": "positive", "explanation": "Roasting eggplant adds smoky depth that matches miso’s savory, fermented profile."},
    {"heuristic": "intensity_balance", "direction": "positive", "explanation": "Eggplant is mild and absorbs miso well without being overwhelmed."}
  ],
  "suggested_uses": [
    {"format": "glaze", "technique": "roast", "tip": "Mix miso with a sweetener + acid; apply near the end to avoid burning."}
  ],
  "watchouts": ["Miso can scorch over high heat—add late or dilute with oil/water."],
  "technique_notes": ["Works best with dry heat (roast/grill) to deepen eggplant and round miso."],
  "evidence": {
    "ingredient_a_source": {"provenance": "curated", "confidence": "medium"},
    "ingredient_b_source": {"provenance": "curated", "confidence": "high"},
    "used_classic_pairings": true,
    "used_contemporary_pairings": false,
    "llm_used": true,
    "llm_prompt_version": "pairing-v1"
  },
  "generated_at": "2026-02-09T00:00:00Z"
}

---

## 3) Minimal JSON Examples

### Ingredient example
```json
{
  "id": "garlic",
  "name": "Garlic",
  "aliases": [],
  "aroma_tags": ["pungent", "savory"],
  "basic_tastes": ["umami"],
  "intensity": 4,
  "perceived_temperature": "warming",
  "mouthfeel_tags": [],
  "regions": ["Mediterranean", "East Asia", "South Asia"],
  "technique_sensitivity": ["raw_vs_cooked"],
  "classic_pairings": [
    {"ingredient_id": "olive_oil", "why": "Fat carries aroma and softens harsh sulfur notes.", "confidence": "high", "context": ["saute", "sauce"]}
  ],
  "contemporary_pairings": [],
  "techniques": ["saute", "roast", "raw"],
  "substitutions": ["shallot"],
  "watchouts": ["Burns easily; can turn bitter when overcooked."],
  "source": {"provenance": "curated", "confidence": "high"}
}


erDiagram
  INGREDIENT ||--o{ PAIRING_REFERENCE : has
  INGREDIENT ||--o{ PAIRING_REFERENCE : pairs_with
  INGREDIENT ||--o{ PAIRING_EVALUATION : evaluated_in

  INGREDIENT {
    string id PK
    string name
    string[] aliases
    string[] aroma_tags
    string[] basic_tastes
    int intensity
    string perceived_temperature
    string[] mouthfeel_tags
    string[] regions
    string[] technique_sensitivity
    string[] techniques
    string[] substitutions
    string[] watchouts
    string source_provenance
    string source_confidence
  }

  PAIRING_REFERENCE {
    string ingredient_id FK
    string paired_ingredient_id FK
    string why
    string confidence
    string[] context
  }

  PAIRING_EVALUATION {
    string ingredient_a_id FK
    string ingredient_b_id FK
    string outcome
    int score
    string[] watchouts
    string[] technique_notes
    string generated_at
  }

