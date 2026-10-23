"use client"

import { Suspense } from "react"
import ServiceFormPage from "@/components/services/ServiceFormPage"
import { Skeleton } from "@/components/ui/Skeleton"

function FormFallback() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-10 w-64" />
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-40 w-full rounded-2xl" />
      ))}
    </div>
  )
}

export default function AddServicePage() {
  return (
    <Suspense fallback={<FormFallback />}>
      <ServiceFormPage />
    </Suspense>
  )
}