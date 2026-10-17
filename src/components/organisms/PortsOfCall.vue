<script setup lang="ts">
import type { PortStamp } from '~/types/content'

// "Ports of call": a loose row of large stamps, alternately tilted, ending
// with the dashed "Next port" placeholder.
defineProps<{
  kicker: string
  ports: PortStamp[]
}>()
</script>

<template>
  <div class="ports-of-call">
    <SectionHead
      :kicker="kicker"
      aside="Where I’ve been"
    />
    <div class="ports-of-call__stamps">
      <Stamp
        v-for="(port, index) in ports"
        :key="index"
        class="ports-of-call__stamp"
        size="lg"
        :color="port.color"
        :icon="port.icon"
        :label="port.label"
        :title="port.place"
        :placeholder="port.placeholder"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ports-of-call {
  &__stamps {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--rv-space-28);
    margin-top: var(--rv-space-36);
  }

  &__stamp {
    &:nth-child(odd) {
      transform: rotate(-3deg);
    }

    &:nth-child(even) {
      transform: rotate(2.5deg);
    }
  }
}

@include page-below(xs) {
  .ports-of-call__stamps {
    gap: var(--rv-space-18);
  }
}
</style>
