---
title: "Design Tokens 101: The Bridge Between Figma and Code"
description: "A plain-language walkthrough of what design tokens actually are, why primitives and semantics are different layers, and how they travel from Figma into a real codebase."
date: 2026-08-20
kind: "Guide"
topic: "css"
postcard:
  word: "Tokens\n101"
  ground: sun
---

Note: this is a test post for the rv-portfolio blog pipeline. It's here to confirm routing, frontmatter, and SEO tags render correctly before real content goes live, but the explanation below is genuine.

"Design tokens" is one of those terms that gets thrown around a lot without much explanation. So let's slow down and actually define it, then look at how tokens move from a Figma file into a component your users click on.

## What a token actually is

At the simplest level, a design token is a named value. Instead of writing `#5dcaa5` in your CSS, you write `var(--color-accent)`. The name is the token. The value behind it can change without you touching a single component.

That's it. That's the whole idea. Everything else is about organizing tokens well enough that they stay useful as a project grows.

## Two layers: primitives and semantics

This is the part that trips people up the most, so it's worth being precise about it.

Primitives are raw values. Think `size-16`, `blue-500`, `space-4`. They don't say anything about how they're used, just what they are.

Semantic tokens alias primitives and describe intent. `Space/md` might point at `size-16`. `Color/accent` might point at `blue-500` in light mode and a different blue in dark mode. Components should only ever consume semantic tokens, never primitives directly.

Why bother with two layers instead of one flat list? Because it lets you change meaning without changing values, and change values without changing meaning. If you decide your accent color needs to shift, you update one alias and every semantic consumer follows. If you decide `Space/md` should now render as 14px instead of 16px, that's a design decision made once, in one place, instead of a hunt through every component that used the number 16.

## Modes carry scale, variants carry structure

A useful rule of thumb once you're working across breakpoints or themes: modes should carry scale, and variants should carry structure.

A dark mode toggle or a desktop-to-mobile breakpoint is a mode. It changes values, type shrinks, spacing tightens, colors invert, but the underlying structure of the component stays the same.

A card that restacks from a row to a column, or a button that goes from icon-only to icon-plus-label, that's a structural change. It belongs in a variant or a component prop, not baked into a token mode.

Mixing these up is a common trap. If you try to make responsive layout changes purely through token modes, you end up with awkward workarounds. If you try to make color theming a component variant, you end up duplicating components that should have stayed identical.

## How this actually travels from Figma to code

In a typical setup, color, type, and size each get their own primitive and semantic collections in Figma. Semantic collections carry the modes, light and dark for color, desktop and mobile for size and type. Everything in the file, spacing, padding, radius, stroke weight, gets bound to a semantic variable rather than a typed-in number.

On the code side, those semantic tokens get exported and mapped to CSS custom properties, something like `--rv-space-md` or `--rv-color-accent`. Components in the library consume only those custom properties. When someone updates a value in Figma, the export changes, the CSS variables update, and every component downstream stays in sync without anyone touching component code.

One detail worth flagging if you're setting this up yourself: line height and letter spacing usually shouldn't be raw pixel variables. Storing line height as a percentage keeps the ratio intact across different type sizes. Storing it as a fixed pixel value bakes in a relationship that breaks the moment the font size changes.

## A few things worth watching for

Keep primitives hidden from the components layer entirely, nothing should bind to a primitive directly. Watch for orphaned bindings after you delete or rename a collection, they don't always clean up on their own. And resist the urge to add a new token just because a value is "close enough" to an existing one, that's usually a sign you should reuse what's already there.

## Wrapping up

Tokens sound abstract until you see them do their job: one rename in Figma reflows an entire site without a single line of component code changing. That's the whole point. Get the primitive and semantic layers right early, and the rest of the design system gets a lot easier to build on top of.

*This post is part of a small batch of test content used to verify the blog section of this site is rendering correctly end to end.*
