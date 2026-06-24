export const usePageMeta = () => {
  const ctaTitle = useState('pf:ctaTitle', () => "Let's work together.")
  const ctaText  = useState(
    'pf:ctaText',
    () => "I'm available for freelance projects, collaborations, and speaking opportunities. Let's build something meaningful.",
  )
  return { ctaTitle, ctaText }
}
