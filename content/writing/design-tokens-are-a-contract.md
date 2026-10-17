---
title: "Design Tokens Are a Contract, Not a Palette"
description: "Lorem ipsum dolor sit amet — tokens as an agreement between design and code, and what breaks when either side forgets."
date: 2025-03-21
kind: "Opinion"
topic: "systems"
postcard:
  word: "Token\nBay"
  ground: "tiles"
placeholder: true
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Aenean lacinia bibendum nulla sed consectetur.

Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

## Primitives and semantics

Maecenas faucibus mollis interdum. Components consume `--rv-color-accent`, never `--rv-palette-oxblood-600`. Sed posuere consectetur est at lobortis.

```css [semantic.scss]
:root {
  --rv-color-accent: var(--rv-palette-oxblood-600);
}

:root[data-theme='night'] {
  --rv-color-accent: var(--rv-palette-coral-400);
}
```

> A token name is a promise about intent. The value is just today’s answer.
>
> — R. Verdin

Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam.

::prose-figure{caption="Fig. 1 — Lorem ipsum, primitives to semantics" credit="[Credit]"}
::

### Takeaways

- Lorem ipsum dolor sit amet.
- Integer posuere erat a ante.
- Vestibulum id ligula porta felis.
