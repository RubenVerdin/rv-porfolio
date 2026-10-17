---
title: "Building a Component Library That Doesn't Fall Apart in Six Months"
description: "Lessons from building rv-design: the naming, variant, and token decisions that keep a component library maintainable instead of turning into a pile of one-off exceptions."
date: 2026-08-18
kind: "Field notes"
topic: "vue"
postcard:
  word: "Six\nMonths"
  ground: lanes
---

Note: this is a test post used to check the blog pipeline on this site (routing, metadata, rendering). The content itself reflects real decisions made while building rv-design.

Every component library looks clean on day one. The real test is month six, when three different people have added buttons, a deadline pushed someone to hardcode a color "just this once," and nobody's totally sure anymore which spacing values are actually allowed. Here's what's kept rv-design from sliding into that mess so far.

## Start with fewer components than you think you need

It's tempting to scaffold a big list of components up front: Button, Card, Modal, Tooltip, Tabs, Accordion, and so on. Resist it. Build the two or three components you actually need for the page in front of you, and let the rest get added when there's a real use case. A component built against an imagined future requirement almost always needs to be redone once the real requirement shows up.

## Controls should hug their content, not fix a size

One decision that paid off more than expected: sizing controls like buttons by minimum height plus internal padding, rather than a fixed width and height. A medium button has a `min-height` of 40px, but its width comes from the label inside it. This sounds like a small detail, but it avoids a whole category of bugs where a longer translation or a slightly bigger label suddenly clips or overflows.

## Keep structure and theming separate

This is worth repeating because it's easy to blur in practice: a component's structure, how many parts it has, how they're arranged, should live in props and variants. Its appearance, colors, spacing, type, should come entirely from tokens. If you find yourself hardcoding a color inside a component to handle "just this one case," that's usually a sign you're missing a token, not that the component needs an exception.

## Name things for what they do, not what they look like

Early on it's tempting to name a color token `Teal` or `Coral`. Don't. Name it for its role: `Color/accent`, `Color/danger`, `Color/surface`. Visual names age badly, the day someone rebrands and teal becomes blue, every `Teal` reference in the codebase is now a lie. Role-based names stay accurate no matter what the underlying value becomes.

## Audit for drift before it becomes a redesign

A library without some kind of check for unbound values, off-scale numbers, or components bypassing the token layer will drift, quietly, and you often won't notice until a redesign forces you to confront how many exceptions piled up. Even a simple script that flags hardcoded hex values or pixel numbers in component files catches a surprising amount before it becomes a bigger cleanup later.

## Document the boundary between library and app

One distinction worth being explicit about: what lives in the shared library versus what's specific to one app or page. A button belongs in the library. A landing page hero built from three library components stacked a certain way probably belongs in the app, not the library, even if it looks reusable at first glance. Blurring this line is one of the fastest ways a library balloons into something nobody wants to maintain.

## What this actually buys you

None of this is exciting work in the moment. But six months in, adding a new page becomes an afternoon of composing existing components instead of a week of untangling inconsistent spacing and one-off color values. That's really the whole goal: make the easy path also the consistent path, so nobody has to choose between shipping fast and keeping things clean.

## Wrapping up

A component library that lasts isn't the one with the most components or the fanciest documentation site. It's the one where reaching for an existing piece is genuinely easier than building a new one from scratch. Get the naming, sizing, and token discipline right early, and that becomes true almost by default.

*This post is part of a small batch of test content used to verify the blog section of this site is working correctly end to end.*
