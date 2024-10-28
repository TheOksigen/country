import { Suspense } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { Loader2 } from "lucide-react"
import { CountryDetail } from '@/components/country-detail'

export default function CountryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Suspense fallback={<Loading />}>
        <CountryDetail />
      </Suspense>
      <Toaster />
    </main>
  )
}

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}