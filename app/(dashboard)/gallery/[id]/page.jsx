"use client"

import { Suspense } from "react"
import GalleryDetailPage from "@/components/gallery/GalleryDetailPage"
import { Skeleton } from "@/components/ui/Skeleton"

export default function GalleryDetailRoute() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
      <GalleryDetailPage />
    </Suspense>
  )
}