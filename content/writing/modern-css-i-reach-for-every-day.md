---
title: "Modern CSS I Reach For Every Day"
description: "Lorem ipsum dolor sit amet — container queries, cascade layers, and the small selectors that quietly replaced a lot of JavaScript."
date: 2025-04-30
kind: "Field notes"
topic: "css"
postcard:
  word: "CSS"
  ground: "sun"
placeholder: true
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Vestibulum id ligula porta felis euismod semper, and the drop cap sets the first line apart.

Maecenas faucibus mollis interdum. Donec sed odio dui. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes.

## Container queries

Etiam porta sem malesuada magna mollis euismod. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Use `@container` when a component should respond to its slot, not the viewport.

```css [postcard.css]
.dispatch-postcard {
  container: dispatch-postcard / inline-size;
}

@container dispatch-postcard (max-width: 440px) {
  .dispatch-postcard__address { display: none; }
}
```

> The best line of JavaScript is the one a selector made unnecessary.
>
> — R. Verdin

Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.

::prose-figure{caption="Fig. 1 — Lorem ipsum, a grid at three widths" credit="[Credit]"}
::

### Takeaways

- Lorem ipsum dolor sit amet.
- Consectetur adipiscing elit.
- Sed posuere consectetur est at lobortis.
