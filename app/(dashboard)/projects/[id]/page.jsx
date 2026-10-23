"use client"

import { Suspense } from "react"
import ProjectDetailPage from "@/components/projects/ProjectDetailPage"
import { Skeleton } from "@/components/ui/Skeleton"

export default function ProjectDetailRoute() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
      <ProjectDetailPage />
    </Suspense>
  )
}