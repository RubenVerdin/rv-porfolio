<script setup lang="ts">
import type { TerritoryId, TerritoryState } from '~/composables/useVoyageChart'

// The sea chart artwork, verbatim from the design (Main.dc.html) with BEM
// classes. Decorative — the real controls are the TerritoryButtons that
// VoyageChart lays over it — so it is aria-hidden; clicks on land are a
// pointer convenience only.
const props = defineProps<{
  stateOf: (id: TerritoryId) => TerritoryState
}>()

const emit = defineEmits<{
  select: [id: TerritoryId]
}>()

const svg = ref<SVGSVGElement | null>(null)
const { reducedMotion } = useVoyageTimeline(svg)

function modifier(element: 'territory' | 'bearing' | 'pulse', id: TerritoryId) {
  const state = props.stateOf(id)
  return state === 'idle' ? undefined : `voyage-chart-map__${element}--${state}`
}
</script>

<template>
  <svg
    ref="svg"
    class="voyage-chart-map"
    viewBox="0 0 1200 660"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="hatch"
        width="6"
        height="6"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      ><line
        class="voyage-chart-map__hatch-line"
        x1="0"
        y1="0"
        x2="0"
        y2="6"
      /></pattern>
      <pattern
        id="hatchOn"
        width="5"
        height="5"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-45)"
      ><line
        class="voyage-chart-map__hatch-on"
        x1="0"
        y1="0"
        x2="0"
        y2="5"
      /></pattern>
      <mask
        id="routeReveal"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="1200"
        height="660"
      ><path
        class="voyage-chart-map__route-mask"
        pathLength="1000"
        d="M330,428 C300,350 330,262 405,228 C520,140 740,140 860,180 C990,240 1000,360 900,404"
      /></mask>
      <path
        id="routePath"
        d="M330,428 C300,350 330,262 405,228 C520,140 740,140 860,180 C990,240 1000,360 900,404"
      />
    </defs>
    <g>
      <line
        class="voyage-chart-map__graticule"
        x1="0"
        y1="110"
        x2="1200"
        y2="110"
      /><line
        class="voyage-chart-map__graticule"
        x1="0"
        y1="220"
        x2="1200"
        y2="220"
      /><line
        class="voyage-chart-map__graticule"
        x1="0"
        y1="330"
        x2="1200"
        y2="330"
      /><line
        class="voyage-chart-map__graticule"
        x1="0"
        y1="440"
        x2="1200"
        y2="440"
      /><line
        class="voyage-chart-map__graticule"
        x1="0"
        y1="550"
        x2="1200"
        y2="550"
      />
      <line
        class="voyage-chart-map__graticule"
        x1="150"
        y1="0"
        x2="150"
        y2="660"
      /><line
        class="voyage-chart-map__graticule"
        x1="300"
        y1="0"
        x2="300"
        y2="660"
      /><line
        class="voyage-chart-map__graticule"
        x1="450"
        y1="0"
        x2="450"
        y2="660"
      /><line
        class="voyage-chart-map__graticule"
        x1="600"
        y1="0"
        x2="600"
        y2="660"
      /><line
        class="voyage-chart-map__graticule"
        x1="750"
        y1="0"
        x2="750"
        y2="660"
      /><line
        class="voyage-chart-map__graticule"
        x1="900"
        y1="0"
        x2="900"
        y2="660"
      /><line
        class="voyage-chart-map__graticule"
        x1="1050"
        y1="0"
        x2="1050"
        y2="660"
      />
    </g>
    <g>
      <line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--major"
        x1="600"
        y1="320"
        x2="1360"
        y2="320"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="1345"
        y2="468"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--minor"
        x1="600"
        y1="320"
        x2="1302"
        y2="611"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="1232"
        y2="742"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--major"
        x1="600"
        y1="320"
        x2="1137"
        y2="857"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="1022"
        y2="952"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--minor"
        x1="600"
        y1="320"
        x2="891"
        y2="1022"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="748"
        y2="1065"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--major"
        x1="600"
        y1="320"
        x2="600"
        y2="1080"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="452"
        y2="1065"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--minor"
        x1="600"
        y1="320"
        x2="309"
        y2="1022"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="178"
        y2="952"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--major"
        x1="600"
        y1="320"
        x2="63"
        y2="857"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="-32"
        y2="742"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--minor"
        x1="600"
        y1="320"
        x2="-102"
        y2="611"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="-145"
        y2="468"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--major"
        x1="600"
        y1="320"
        x2="-160"
        y2="320"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="-145"
        y2="172"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--minor"
        x1="600"
        y1="320"
        x2="-102"
        y2="29"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="-32"
        y2="-102"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--major"
        x1="600"
        y1="320"
        x2="63"
        y2="-217"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="178"
        y2="-312"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--minor"
        x1="600"
        y1="320"
        x2="309"
        y2="-382"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="452"
        y2="-425"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--major"
        x1="600"
        y1="320"
        x2="600"
        y2="-440"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="748"
        y2="-425"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--minor"
        x1="600"
        y1="320"
        x2="891"
        y2="-382"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="1022"
        y2="-312"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--major"
        x1="600"
        y1="320"
        x2="1137"
        y2="-217"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="1232"
        y2="-102"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--minor"
        x1="600"
        y1="320"
        x2="1302"
        y2="29"
      /><line
        class="voyage-chart-map__rhumb voyage-chart-map__rhumb--faint"
        x1="600"
        y1="320"
        x2="1345"
        y2="172"
      />
    </g>
    <!-- bearing lines to the chosen territory -->
    <line
      class="voyage-chart-map__bearing"
      :class="modifier('bearing', 'dev')"
      x1="600"
      y1="320"
      x2="405"
      y2="228"
      pathLength="100"
    />
    <line
      class="voyage-chart-map__bearing"
      :class="modifier('bearing', 'des')"
      x1="600"
      y1="320"
      x2="860"
      y2="180"
      pathLength="100"
    />
    <line
      class="voyage-chart-map__bearing"
      :class="modifier('bearing', 'wri')"
      x1="600"
      y1="320"
      x2="900"
      y2="404"
      pathLength="100"
    />
    <line
      class="voyage-chart-map__bearing"
      :class="modifier('bearing', 'tra')"
      x1="600"
      y1="320"
      x2="330"
      y2="428"
      pathLength="100"
    />
    <!-- territories -->
    <g
      class="voyage-chart-map__territory"
      :class="modifier('territory', 'dev')"
      @click="emit('select', 'dev')"
    >
      <path
        class="voyage-chart-map__land-shade"
        d="M70,80 C160,40 300,50 380,90 C440,120 450,180 410,230 C380,268 330,262 300,290 C260,326 190,318 150,290 C110,262 60,250 52,200 C44,150 30,110 70,80 Z"
      />
      <path
        class="voyage-chart-map__land"
        d="M70,80 C160,40 300,50 380,90 C440,120 450,180 410,230 C380,268 330,262 300,290 C260,326 190,318 150,290 C110,262 60,250 52,200 C44,150 30,110 70,80 Z"
      />
      <path
        class="voyage-chart-map__glyph"
        transform="translate(96 228)"
        d="M10,0 L0,10 L10,20 M30,0 L40,10 L30,20 M24,-2 L16,22"
      />
      <g
        class="voyage-chart-map__glyph"
        transform="translate(326 104)"
      ><rect
        x="0"
        y="0"
        width="38"
        height="28"
        rx="2"
      /><path d="M0,7 L38,7 M7,13 L13,18 L7,23 M16,23 L24,23"/></g>
      <g
        class="voyage-chart-map__glyph"
        transform="translate(206 246)"
      ><circle
        cx="0"
        cy="0"
        r="4"
      /><circle
        cx="0"
        cy="34"
        r="4"
      /><circle
        cx="22"
        cy="12"
        r="4"
      /><path d="M0,4 L0,30 M22,16 C22,26 4,24 2,31"/></g>
    </g>
    <g
      class="voyage-chart-map__territory"
      :class="modifier('territory', 'des')"
      @click="emit('select', 'des')"
    >
      <path
        class="voyage-chart-map__land-shade"
        d="M800,90 C850,60 930,70 950,110 C970,150 920,180 870,175 C820,170 770,125 800,90 Z M990,150 C1040,120 1120,130 1135,175 C1150,220 1100,250 1050,245 C1000,240 960,190 990,150 Z M780,250 C805,232 845,238 852,262 C858,286 830,300 805,296 C780,292 765,268 780,250 Z"
      />
      <path
        class="voyage-chart-map__land"
        d="M800,90 C850,60 930,70 950,110 C970,150 920,180 870,175 C820,170 770,125 800,90 Z M990,150 C1040,120 1120,130 1135,175 C1150,220 1100,250 1050,245 C1000,240 960,190 990,150 Z M780,250 C805,232 845,238 852,262 C858,286 830,300 805,296 C780,292 765,268 780,250 Z"
      />
      <path
        class="voyage-chart-map__glyph"
        transform="translate(1046 176)"
        d="M0,24 L36,24 L0,-10 Z M7,17 L17,17 L7,7 Z"
      />
      <g
        class="voyage-chart-map__glyph"
        transform="translate(828 92)"
      ><path d="M0,34 C8,4 44,4 52,34 M0,34 L-6,14 M52,34 L58,14"/><rect
        x="-9"
        y="10"
        width="6"
        height="6"
      /><rect
        x="55"
        y="10"
        width="6"
        height="6"
      /><rect
        x="-3"
        y="31"
        width="6"
        height="6"
      /><rect
        x="49"
        y="31"
        width="6"
        height="6"
      /></g>
      <g
        class="voyage-chart-map__glyph"
        transform="translate(788 254)"
      ><rect
        x="0"
        y="0"
        width="12"
        height="18"
      /><rect
        x="16"
        y="0"
        width="12"
        height="18"
      /><rect
        x="32"
        y="0"
        width="12"
        height="18"
      /><path d="M0,24 L44,24"/></g>
    </g>
    <g
      class="voyage-chart-map__territory"
      :class="modifier('territory', 'wri')"
      @click="emit('select', 'wri')"
    >
      <path
        class="voyage-chart-map__land-shade"
        d="M760,470 C800,410 900,400 980,420 C1060,440 1140,470 1150,540 C1158,600 1080,630 1000,628 C930,626 900,600 880,570 C900,540 880,505 850,505 C820,505 815,545 790,555 C760,565 740,520 760,470 Z"
      />
      <path
        class="voyage-chart-map__land"
        d="M760,470 C800,410 900,400 980,420 C1060,440 1140,470 1150,540 C1158,600 1080,630 1000,628 C930,626 900,600 880,570 C900,540 880,505 850,505 C820,505 815,545 790,555 C760,565 740,520 760,470 Z"
      />
      <path
        class="voyage-chart-map__glyph"
        transform="translate(1086 470)"
        d="M0,34 C10,12 26,0 42,-6 C32,10 20,22 4,28 M0,34 L-5,42 M8,24 L20,14"
      />
      <g
        class="voyage-chart-map__glyph"
        transform="translate(782 448)"
      ><path d="M26,6 C18,0 6,0 0,4 L0,30 C6,26 18,26 26,32 C34,26 46,26 52,30 L52,4 C46,0 34,0 26,6 Z M26,6 L26,32 M6,11 L20,11 M6,17 L20,17 M32,11 L46,11 M32,17 L46,17"/></g>
      <g
        class="voyage-chart-map__glyph"
        transform="translate(1064 572)"
      ><rect
        x="0"
        y="0"
        width="34"
        height="26"
      /><path d="M4,5 L30,5 M4,10 L16,10 M4,15 L16,15 M4,20 L16,20 M20,10 L30,10 L30,20 L20,20 Z"/></g>
    </g>
    <g
      class="voyage-chart-map__territory"
      :class="modifier('territory', 'tra')"
      @click="emit('select', 'tra')"
    >
      <path
        class="voyage-chart-map__land-shade"
        d="M90,430 C150,395 260,400 330,425 C390,446 420,490 400,540 C385,580 340,585 320,610 C300,635 250,640 215,615 C175,588 150,560 110,548 C70,536 50,470 90,430 Z"
      />
      <path
        class="voyage-chart-map__land"
        d="M90,430 C150,395 260,400 330,425 C390,446 420,490 400,540 C385,580 340,585 320,610 C300,635 250,640 215,615 C175,588 150,560 110,548 C70,536 50,470 90,430 Z"
      />
      <g
        class="voyage-chart-map__glyph"
        transform="translate(116 452)"
      ><ellipse
        cx="12"
        cy="30"
        rx="8"
        ry="11"
      /><ellipse
        cx="4"
        cy="14"
        rx="6"
        ry="8"
        transform="rotate(-25 4 14)"
      /><ellipse
        cx="21"
        cy="12"
        rx="6"
        ry="8"
        transform="rotate(20 21 12)"
      /><path d="M12,41 L12,46 M2,46 L22,46"/></g>
      <g
        class="voyage-chart-map__glyph"
        transform="translate(350 494)"
      ><rect
        x="0"
        y="6"
        width="34"
        height="24"
        rx="2"
      /><path d="M11,6 L11,1 L23,1 L23,6 M0,15 L34,15 M8,6 L8,30 M26,6 L26,30"/></g>
      <path
        class="voyage-chart-map__glyph"
        transform="translate(286 560)"
        d="M0,30 L6,30 L6,24 L12,24 L12,18 L18,18 L18,12 L22,12 L22,6 L30,6 L30,12 L34,12 L34,18 L40,18 L40,24 L46,24 L46,30 L52,30 M-4,30 L56,30 M26,6 L26,0"
      />
    </g>
    <text
      class="voyage-chart-map__sea"
      x="600"
      y="214"
    >OCEANVS DIGITALIS</text>
    <g transform="translate(600 320)"><g class="voyage-chart-map__rose"><path
      class="voyage-chart-map__rose-sun"
      d="M63.7,-5.8 L76.0,0.0 L63.7,5.8 Z M61.1,19.1 L70.2,29.1 L56.7,29.7 Z M49.1,41.0 L53.7,53.7 L41.0,49.1 Z M29.7,56.7 L29.1,70.2 L19.1,61.1 Z M5.8,63.7 L0.0,76.0 L-5.8,63.7 Z M-19.1,61.1 L-29.1,70.2 L-29.7,56.7 Z M-41.0,49.1 L-53.7,53.7 L-49.1,41.0 Z M-56.7,29.7 L-70.2,29.1 L-61.1,19.1 Z M-63.7,5.8 L-76.0,0.0 L-63.7,-5.8 Z M-61.1,-19.1 L-70.2,-29.1 L-56.7,-29.7 Z M-49.1,-41.0 L-53.7,-53.7 L-41.0,-49.1 Z M-29.7,-56.7 L-29.1,-70.2 L-19.1,-61.1 Z M-5.8,-63.7 L-0.0,-76.0 L5.8,-63.7 Z M19.1,-61.1 L29.1,-70.2 L29.7,-56.7 Z M41.0,-49.1 L53.7,-53.7 L49.1,-41.0 Z M56.7,-29.7 L70.2,-29.1 L61.1,-19.1 Z"
    /><circle
      class="voyage-chart-map__rose-ring"
      cx="0"
      cy="0"
      r="60"
    /><circle
      class="voyage-chart-map__rose-ring"
      cx="0"
      cy="0"
      r="54"
    /><polygon
      class="voyage-chart-map__rose-star"
      points="0.0,-46.0 3.8,-9.2 18.4,-18.4 9.2,-3.8 46.0,0.0 9.2,3.8 18.4,18.4 3.8,9.2 0.0,46.0 -3.8,9.2 -18.4,18.4 -9.2,3.8 -46.0,0.0 -9.2,-3.8 -18.4,-18.4 -3.8,-9.2"
    /><polygon
      class="voyage-chart-map__rose-north"
      points="0,-46 3.8,-9.2 0,0 -3.8,-9.2"
    /></g></g>
    <path
      class="voyage-chart-map__serpent"
      d="M90,352 q12,-16 24,0 q12,16 24,0 q12,-16 24,0 q8,10 18,4"
    />
    <path
      class="voyage-chart-map__serpent"
      d="M84,354 q-6,-10 -2,-16 q6,-2 8,6"
    />
    <text
      class="voyage-chart-map__label-sm"
      x="92"
      y="380"
    >HIC SVNT BVGS</text>
    <path
      class="voyage-chart-map__route"
      d="M330,428 C300,350 330,262 405,228 C520,140 740,140 860,180 C990,240 1000,360 900,404"
      mask="url(#routeReveal)"
    />
    <g class="voyage-chart-map__port voyage-chart-map__port--1"><circle
      class="voyage-chart-map__port-ring"
      cx="330"
      cy="428"
      r="8"
    /><circle
      class="voyage-chart-map__port-dot"
      cx="330"
      cy="428"
      r="3"
    /></g>
    <g class="voyage-chart-map__port voyage-chart-map__port--2"><circle
      class="voyage-chart-map__port-ring"
      cx="405"
      cy="228"
      r="8"
    /><circle
      class="voyage-chart-map__port-dot"
      cx="405"
      cy="228"
      r="3"
    /></g>
    <g class="voyage-chart-map__port voyage-chart-map__port--3"><circle
      class="voyage-chart-map__port-ring"
      cx="860"
      cy="180"
      r="8"
    /><circle
      class="voyage-chart-map__port-dot"
      cx="860"
      cy="180"
      r="3"
    /></g>
    <g class="voyage-chart-map__port voyage-chart-map__port--4"><circle
      class="voyage-chart-map__port-ring"
      cx="900"
      cy="404"
      r="8"
    /><circle
      class="voyage-chart-map__port-dot"
      cx="900"
      cy="404"
      r="3"
    /></g>
    <circle
      class="voyage-chart-map__pulse"
      :class="modifier('pulse', 'tra')"
      cx="330"
      cy="428"
      r="10"
    />
    <circle
      class="voyage-chart-map__pulse"
      :class="modifier('pulse', 'dev')"
      cx="405"
      cy="228"
      r="10"
    />
    <circle
      class="voyage-chart-map__pulse"
      :class="modifier('pulse', 'des')"
      cx="860"
      cy="180"
      r="10"
    />
    <circle
      class="voyage-chart-map__pulse"
      :class="modifier('pulse', 'wri')"
      cx="900"
      cy="404"
      r="10"
    />
    <text
      class="voyage-chart-map__label"
      x="346"
      y="452"
    >México</text>
    <text
      class="voyage-chart-map__label-sm"
      x="346"
      y="466"
    >ORIGEN</text>
    <text
      class="voyage-chart-map__label"
      x="420"
      y="222"
    >Toronto</text>
    <text
      class="voyage-chart-map__label-sm"
      x="420"
      y="236"
    >HOME PORT</text>
    <g :transform="reducedMotion ? 'translate(900 404)' : undefined">
      <animateMotion
        v-if="!reducedMotion"
        dur="9s"
        begin="0.8s"
        fill="freeze"
        rotate="auto"
        calcMode="spline"
        keyPoints="0;1"
        keyTimes="0;1"
        keySplines="0.6 0.1 0.4 1"
      ><mpath href="#routePath"/></animateMotion>
      <g transform="translate(0 -4)"><g class="voyage-chart-map__ship-bob"><path
        class="voyage-chart-map__ship-hull"
        d="M-13,0 L13,0 L8,6 L-9,6 Z"
      /><path
        class="voyage-chart-map__ship-sail"
        d="M0,-1 L0,-20 L11,-2 Z"
      /><path
        class="voyage-chart-map__ship-sail"
        d="M-2,-17 L-11,-2 L-2,-2 Z"
      /><path
        class="voyage-chart-map__ship-flag"
        d="M0,-20 L6,-23 L0,-25 Z"
      /></g></g>
    </g>
    <rect
      class="voyage-chart-map__ticks"
      x="3"
      y="3"
      width="1194"
      height="654"
    />
  </svg>
</template>

<style scoped lang="scss">
.voyage-chart-map {
  display: block;
  width: 100%;
  height: auto;

  // Grid & rhumb lines
  &__graticule {
    fill: none;
    stroke: var(--rv-color-line);
    stroke-width: 0.5;
    opacity: 0.35;
  }

  &__rhumb--major {
    stroke: var(--rv-color-accent);
    stroke-width: 0.7;
    opacity: 0.55;
  }

  &__rhumb--minor {
    stroke: var(--rv-color-line);
    stroke-width: 0.5;
    opacity: 0.45;
  }

  &__rhumb--faint {
    stroke: var(--rv-color-line);
    stroke-width: 0.35;
    opacity: 0.28;
  }

  // Land
  &__hatch-line {
    stroke: var(--rv-color-hatch);
    stroke-width: 1.2;
  }

  &__hatch-on {
    stroke: var(--rv-color-accent);
    stroke-width: 1.4;
    opacity: 0.55;
  }

  &__land {
    fill: url('#hatch');
    stroke: var(--rv-color-ink);
    stroke-width: 1.4;
    transition:
      fill var(--rv-duration-400),
      stroke var(--rv-duration-400),
      opacity var(--rv-duration-400),
      stroke-width var(--rv-duration-400);
  }

  &__land-shade {
    fill: none;
    stroke: var(--rv-color-line);
    stroke-width: 7;
    opacity: 0.18;
  }

  &__glyph {
    fill: none;
    stroke: var(--rv-color-ink);
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.8;
  }

  &__territory {
    cursor: pointer;
    transition: opacity var(--rv-duration-450);

    &:hover .voyage-chart-map__land {
      stroke: var(--rv-color-accent);
    }

    &--active .voyage-chart-map__land {
      fill: url('#hatchOn');
      stroke: var(--rv-color-accent);
      stroke-width: 2.4;
    }

    &--dim {
      opacity: 0.45;
    }
  }

  // Bearing line from the compass to the chosen territory
  &__bearing {
    fill: none;
    stroke: var(--rv-color-accent);
    stroke-width: 1.4;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    opacity: 0;

    &--active {
      opacity: 0.9;
      animation: bearing var(--rv-duration-700) var(--rv-ease-bearing) forwards;
    }
  }

  &__pulse {
    fill: none;
    stroke: var(--rv-color-accent);
    stroke-width: 2;
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;

    &--active {
      animation: pulse var(--rv-duration-1600) var(--rv-ease-out) infinite;
    }
  }

  // The intro voyage
  &__route {
    fill: none;
    stroke: var(--rv-color-accent);
    stroke-width: 2.2;
    stroke-dasharray: 7 6;
    stroke-linecap: round;
  }

  &__route-mask {
    fill: none;
    stroke: var(--rv-object-mask);
    stroke-width: 12;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw var(--rv-duration-voyage-chart) 0.8s var(--rv-ease-voyage) forwards;
  }

  &__port {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    animation: pop var(--rv-duration-600) var(--rv-ease-spring) forwards;

    &--1 { animation-delay: 0.6s; }
    &--2 { animation-delay: 3.4s; }
    &--3 { animation-delay: 6.6s; }
    &--4 { animation-delay: 9.6s; }
  }

  &__port-ring {
    fill: var(--rv-color-chart);
    stroke: var(--rv-color-accent);
    stroke-width: 1.6;
  }

  &__port-dot {
    fill: var(--rv-color-accent);
  }

  // Lettering
  &__label {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-17);
    fill: var(--rv-color-ink);
  }

  &__label-sm {
    font-family: var(--rv-font-condensed);
    font-weight: var(--rv-weight-medium);
    font-size: var(--rv-text-12);
    letter-spacing: var(--rv-tracking-8);
    fill: var(--rv-color-ink-muted);
  }

  &__sea {
    font-family: var(--rv-font-display);
    font-size: var(--rv-text-13);
    letter-spacing: var(--rv-tracking-50);
    fill: var(--rv-color-ink-muted);
    text-anchor: middle;
  }

  &__serpent {
    fill: none;
    stroke: var(--rv-color-ink);
    stroke-width: 1.3;
  }

  // Compass rose
  &__rose {
    transform-box: fill-box;
    transform-origin: center;
    animation: spin var(--rv-duration-spin-slow) linear infinite;
  }

  &__rose-sun {
    fill: var(--rv-color-accent);
    opacity: 0.75;
  }

  &__rose-ring {
    fill: none;
    stroke: var(--rv-color-ink);
    stroke-width: 0.8;
  }

  &__rose-star {
    fill: var(--rv-color-paper);
    stroke: var(--rv-color-ink);
    stroke-width: 1;
  }

  &__rose-north {
    fill: var(--rv-color-accent);
  }

  // The ship
  &__ship-hull {
    fill: var(--rv-color-ink);
  }

  &__ship-sail {
    fill: var(--rv-color-paper);
    stroke: var(--rv-color-ink);
    stroke-width: 1;
  }

  &__ship-flag {
    fill: var(--rv-color-accent);
  }

  &__ship-bob {
    animation: bob var(--rv-duration-2400) var(--rv-ease-in-out) infinite;
  }

  // Neatline
  &__ticks {
    fill: none;
    stroke: var(--rv-color-ink);
    stroke-width: 6;
    stroke-dasharray: 20 20;
  }
}

@keyframes bearing {
  to { stroke-dashoffset: 0; }
}

// Motion is switched off globally; show the voyage already completed.
@media (prefers-reduced-motion: reduce) {
  .voyage-chart-map__route-mask {
    stroke-dashoffset: 0;
  }

  .voyage-chart-map__port {
    opacity: 1;
  }
}
</style>
