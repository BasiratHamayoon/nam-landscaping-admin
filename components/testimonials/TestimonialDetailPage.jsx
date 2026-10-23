"use client"

import { useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import { ArrowLeft, Pencil, MapPin, Briefcase, Star, User, Quote } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"
import { fetchTestimonialById, clearCurrentTestimonial } from "@/store/slices/testimonialsSlice"

export default function TestimonialDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentTestimonial: item, detailLoading } = useSelector((s) => s.testimonials)
  const containerRef = useRef(null)

  useEffect(() => {
    dispatch(fetchTestimonialById(id))
    return () => dispatch(clearCurrentTestimonial())
  }, [id, dispatch])

  useEffect(() => {
    if (!containerRef.current || detailLoading) return
    const elements = containerRef.current.querySelectorAll("[data-animate]")
    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power2.out", delay: 0.1 }
    )
  }, [detailLoading, item])

  if (detailLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-primary-500 mb-4">Testimonial not found</p>
        <Button variant="outline" onClick={() => router.push("/testimonials")}>Back to Testimonials</Button>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto space-y-6">
      <div data-animate className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/testimonials")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">
              Client Review
            </h1>
          </div>
        </div>
        <Button onClick={() => router.push(`/testimonials/add?edit=${item._id}`)} className="gap-2">
          <Pencil className="w-4 h-4" /> Edit Details
        </Button>
      </div>

      <Card data-animate className="p-8 relative overflow-hidden bg-primary-900 dark:bg-[#141a16] text-white">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Quote className="w-32 h-32" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < item.rating
                    ? "fill-amber-500 text-amber-500"
                    : "fill-white/20 text-white/20"
                }`}
              />
            ))}
          </div>

          <p className="text-xl font-medium leading-relaxed italic text-primary-100">
            "{item.content}"
          </p>

          <Separator className="bg-white/10" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {item.avatar?.url ? (
                <img src={item.avatar.url} alt={item.name} className="w-14 h-14 rounded-full object-cover border-2 border-white/20" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                  <User className="w-6 h-6 text-white/60" />
                </div>
              )}
              <div>
                <p className="font-heading text-xl font-bold">{item.name}</p>
                {item.role && <p className="text-sm text-primary-300">{item.role}</p>}
              </div>
            </div>
            
            <Badge variant={item.isActive ? "default" : "secondary"} className="self-start sm:self-center">
              {item.isActive ? "Published" : "Hidden"}
            </Badge>
          </div>
        </div>
      </Card>

      <Card data-animate className="p-6">
        <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">Additional Details</h2>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary-400">
              <MapPin className="w-4 h-4" />
              <span className="text-xs uppercase font-semibold tracking-wider">Location</span>
            </div>
            <p className="font-medium text-primary-900 dark:text-white">{item.location || "N/A"}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary-400">
              <Briefcase className="w-4 h-4" />
              <span className="text-xs uppercase font-semibold tracking-wider">Project Type</span>
            </div>
            <p className="font-medium text-primary-900 dark:text-white">{item.projectType || "N/A"}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary-400">
              <span className="text-xs uppercase font-semibold tracking-wider">Sort Order</span>
            </div>
            <p className="font-medium text-primary-900 dark:text-white">{item.order ?? 0}</p>
          </div>
        </div>
      </Card>

      <div data-animate className="pb-8" />
    </div>
  )
}