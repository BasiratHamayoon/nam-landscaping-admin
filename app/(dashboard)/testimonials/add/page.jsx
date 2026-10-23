"use client"

import { Suspense } from "react"
import TestimonialFormPage from "@/components/testimonials/TestimonialFormPage"
import { Skeleton } from "@/components/ui/Skeleton"

function FormFallback() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-64 w-full rounded-2xl" />
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  )
}

export default function AddTestimonialPage() {
  return (
    <Suspense fallback={<FormFallback />}>
      <TestimonialFormPage />
    </Suspense>
  )
}