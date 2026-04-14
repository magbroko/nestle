import { Hero } from '../components/landing/Hero'
import { QuickAccessGrid } from '../components/landing/QuickAccessGrid'
import { WhoItsFor } from '../components/landing/WhoItsFor'
import { KeyBenefits } from '../components/landing/KeyBenefits'
import { HowItWorks } from '../components/landing/HowItWorks'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <QuickAccessGrid />
        <WhoItsFor />
        <KeyBenefits />
        <HowItWorks />
      </main>
      <SiteFooter />
    </div>
  )
}
