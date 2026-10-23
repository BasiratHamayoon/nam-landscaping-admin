"use client"

import { Suspense } from "react"
import ContactDetailPage from "@/components/contacts/ContactDetailPage"
import { Skeleton } from "@/components/ui/Skeleton"

export default function ContactDetailRoute() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
      <ContactDetailPage />
    </Suspense>
  )
}