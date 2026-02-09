# Product Requirements Document ? FlavorIQ

## Overview
FlavorIQ is a flavor-intelligence product that helps users understand ingredient flavor profiles and evaluate ingredient pairings so they can cook more creatively with what they already have.

Rather than providing recipes, FlavorIQ focuses on explaining *why* flavors work together using a structured sensory framework and explicit pairing logic.

## Problem Statement
Home cooks often know individual ingredients but lack a shared language for reasoning about flavor. As a result, they struggle to:
- Substitute ingredients confidently
- Combine pantry items creatively
- Understand why certain pairings work or fail

Existing solutions focus on recipes, not flavor understanding, which limits adaptability and learning.

## Target User
Primary user:
- Curious home cooks who want to improvise rather than follow recipes exactly

Secondary users:
- Food enthusiasts experimenting across cuisines
- Cooks working with constraints (limited pantry, dietary restrictions)

## Goals
- Help users understand the sensory profile of an ingredient quickly
- Enable confident pairing decisions using explainable logic
- Reduce reliance on rigid recipes

## Non-Goals (v1)
- Full recipe generation
- Nutrition or dietary tracking
- User accounts or personalization
- Social or community features

## Key User Stories
1. As a user, I can enter a single ingredient and understand its flavor profile, intensity, and common uses.
2. As a user, I can add a second ingredient and learn whether the two pair well, and why.
3. As a user, I can see both traditional and contemporary pairings to inspire experimentation.

## MVP Scope
Included:
- Ingredient flavor cards with structured attributes
- Pairing compatibility evaluation between two ingredients
- Explainable ?why it works / why it doesn?t? reasoning
- Technique-aware suggestions (e.g., raw vs cooked)

Excluded:
- Recipes
- User-generated content
- Saving or sharing

## Product Principles
- Explainability over novelty
- Structured data over free-form generation
- Learning-oriented, not prescriptive

## Success Metrics (Qualitative for v1)
- Users report increased confidence making substitutions
- Users can articulate *why* a pairing works after using the product
- Time to insight: <20 seconds to understand an ingredient or pairing

## Risks & Open Questions
- Can a limited flavor taxonomy capture enough nuance without oversimplifying?
- How much cultural context is required to avoid misleading pairings?
- How do users interpret ?compatibility? (binary vs spectrum)?

## Future Considerations
- Pantry-aware suggestions
- Technique-based filtering
- Confidence scoring based on cultural precedent vs experimentation
