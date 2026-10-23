"use client"

import { Suspense } from "react"
import TestimonialDetailPage from "@/components/testimonials/TestimonialDetailPage"
import { Skeleton } from "@/components/ui/Skeleton"

export default function TestimonialDetailRoute() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
      <TestimonialDetailPage />
    </Suspense>
  )
}