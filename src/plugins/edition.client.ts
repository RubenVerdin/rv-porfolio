// After hydration: pick up the saved/device edition and today's date.
//
// This must wait for hydration to *finish*. `app:mounted` fires earlier
// (hydration resolves later, inside <Suspense>), and changing state then
// makes Vue hit a hydration mismatch and leave the server-rendered toggle
// ("Day" pressed) in place even when the device prefers dark.
export default defineNuxtPlugin((nuxtApp) => {
  onNuxtReady(() => {
    nuxtApp.runWithContext(() => {
      initEdition()
      refreshEditionDate()
    })
  })
})
