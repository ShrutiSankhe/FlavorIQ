# Flavor Taxonomy ? FlavorIQ (v1)

## Purpose
This taxonomy defines a controlled vocabulary for describing ingredient flavor profiles in a consistent, explainable, and scalable way.

The goal is not to capture every nuance of taste, but to create a shared language that enables:
- Ingredient comparison
- Pairing evaluation
- Clear reasoning about why flavors work together

This taxonomy is intentionally limited to reduce ambiguity and improve consistency across ingredients.

---

## Core Dimensions

Each ingredient in FlavorIQ is described using the following dimensions:

1. Aroma / Flavor Notes
2. Basic Tastes
3. Intensity
4. Perceived Temperature
5. Mouthfeel (optional)
6. Regional Context
7. Technique Sensitivity

---

## 1. Aroma / Flavor Notes

Aroma notes describe the dominant sensory impressions of an ingredient.  
Each ingredient should typically have **2?4 tags**.

### Green / Fresh
- green
- grassy
- herbal
- vegetal

### Warm / Sweet
- sweet
- caramelized
- honeyed
- vanilla-like

### Spice / Heat
- spicy
- pungent
- peppery
- numbing

### Earth / Wood
- earthy
- woody
- mushroomy
- mineral

### Smoke / Roast
- smoky
- toasted
- roasted
- charred

### Bright / Sharp
- citrus
- acidic
- sour
- tangy

### Rich / Deep
- umami
- savory
- fermented
- meaty

### Floral / Aromatic
- floral
- perfumed
- resinous

**Guidelines:**
- Avoid near-duplicate tags
- Prefer widely understandable terms over poetic descriptors
- Tags should remain stable across cuisines and techniques

---

## 2. Basic Tastes

Basic tastes describe how an ingredient registers on the palate.

Allowed values:
- sweet
- salty
- sour
- bitter
- umami

Multiple values may apply.

---

## 3. Intensity

Intensity reflects how strongly an ingredient asserts itself in a dish.

Scale:
- 1 ? very mild
- 2 ? mild
- 3 ? medium
- 4 ? strong
- 5 ? dominant

Intensity may change by preparation method, but the value reflects the *typical* case.

---

## 4. Perceived Temperature

Perceived temperature describes the warming or cooling sensation associated with an ingredient.

Allowed values:
- cooling
- neutral
- warming

This is based on sensory perception (e.g., capsaicin, menthol, gingerol), not serving temperature.

---

## 5. Mouthfeel (Optional)

Mouthfeel captures textural contributions that influence pairing decisions.

Examples:
- creamy
- fatty
- astringent
- chewy
- crisp
- oily

This field is optional and used only when texture materially affects compatibility.

---

## 6. Regional Context

Regional context anchors ingredients in culinary traditions without restricting experimentation.

Guidelines:
- Use broad regions rather than specific dishes
- Regions indicate precedent, not exclusivity

Examples:
- Mediterranean
- East Asia
- South Asia
- Southeast Asia
- Middle East
- Latin America
- West Africa
- Global / Cross-cultural

---

## 7. Technique Sensitivity

Some ingredients change dramatically depending on preparation.

Common technique flags:
- raw vs cooked
- dry heat vs moist heat
- fermented
- aged

Technique sensitivity informs pairing logic and compatibility outcomes.

---

## Design Principles

- Consistency over completeness
- Explainability over precision
- Structure over free-form description

This taxonomy is designed to evolve, but changes should prioritize backward compatibility and clarity.
