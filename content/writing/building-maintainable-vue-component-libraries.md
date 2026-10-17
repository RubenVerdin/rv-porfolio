---
title: "Building Maintainable Vue Component Libraries"
description: "Lessons learned shipping a token-driven component library that scales across projects without turning into a maintenance burden."
date: 2025-04-30
kind: "Opinion"
featured: true
topic: "vue"
postcard:
  word: "Vue\nLibraries"
  ground: "ruled"
address:
  - "To: whoever builds the next one"
  - "Frontend teams, everywhere"
placeholder: true
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet. Curabitur blandit tempus porttitor, and the first line pulls the reader in before they notice they have started.

Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum.

## Start with fewer components than you think

Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Sed posuere consectetur est at lobortis. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.

> A component library is a promise you keep every release, not a folder you fill once.
>
> — R. Verdin

Nulla vitae elit libero, a pharetra augue. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Use a `defineProps` contract and keep the [public surface](https://vuejs.org) small.

```vue [BaseCard.vue]
<script setup lang="ts">
defineProps<{ title: string, tone?: 'paper' | 'ink' }>()
</script>

<template>
  <article class="base-card">
    <h3 class="base-card__title">{{ title }}</h3>
    <slot />
  </article>
</template>
```

Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus.

::prose-figure{caption="Fig. 1 — Lorem ipsum dolor sit amet" credit="[Credit]"}
::

## Name things for what they do

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Etiam porta sem malesuada magna mollis euismod.

Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

### Takeaways

- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Vestibulum id ligula porta felis euismod semper.
- Cras mattis consectetur purus sit amet fermentum.
