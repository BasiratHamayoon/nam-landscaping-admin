"use client"

import { useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import {
  ArrowLeft, Pencil, Star, MapPin, Calendar, CheckCircle2, User, Quote
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"
import { fetchProjectById, clearCurrentProject } from "@/store/slices/projectsSlice"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentProject: project, detailLoading } = useSelector((s) => s.projects)
  const containerRef = useRef(null)

  useEffect(() => {
    dispatch(fetchProjectById(id))
    return () => {
      dispatch(clearCurrentProject())
    }
  }, [id, dispatch])

  useEffect(() => {
    if (!containerRef.current || detailLoading) return
    const items = containerRef.current.querySelectorAll("[data-animate]")
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power2.out", delay: 0.1 }
    )
  }, [detailLoading, project])

  if (detailLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 rounded-2xl" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-primary-500 mb-4">Project not found</p>
        <Button variant="outline" onClick={() => router.push("/projects")}>Back to Projects</Button>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-6">
      <div data-animate className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/projects")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">
              {project.title}
            </h1>
            <p className="text-sm text-primary-500 dark:text-primary-400">/{project.slug}</p>
          </div>
        </div>
        <Button onClick={() => router.push(`/projects/add?edit=${project._id}`)} className="gap-2">
          <Pencil className="w-4 h-4" /> Edit Project
        </Button>
      </div>

      {project.coverImage?.url && (
        <Card data-animate className="overflow-hidden">
          <div className="relative aspect-[21/9]">
            <img src={project.coverImage.url} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant={project.isActive ? "default" : "outline"}>
                {project.isActive ? "Active" : "Inactive"}
              </Badge>
              {project.isFeatured && (
                <Badge className="bg-amber-500/90 text-white border-0 gap-1">
                  <Star className="w-3 h-3 fill-white" /> Featured
                </Badge>
              )}
            </div>
          </div>
        </Card>
      )}

      <div data-animate className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <User className="w-5 h-5 text-primary-500 mx-auto mb-2" />
          <p className="text-xs text-primary-400">Client</p>
          <p className="text-sm font-semibold text-primary-900 dark:text-white truncate">{project.client || "N/A"}</p>
        </Card>
        <Card className="p-4 text-center">
          <MapPin className="w-5 h-5 text-primary-500 mx-auto mb-2" />
          <p className="text-xs text-primary-400">Location</p>
          <p className="text-sm font-semibold text-primary-900 dark:text-white truncate">{project.location || "N/A"}</p>
        </Card>
        <Card className="p-4 text-center">
          <Calendar className="w-5 h-5 text-primary-500 mx-auto mb-2" />
          <p className="text-xs text-primary-400">Completion</p>
          <p className="text-sm font-semibold text-primary-900 dark:text-white truncate">
            {project.completionDate ? new Date(project.completionDate).toLocaleDateString() : "N/A"}
          </p>
        </Card>
        <Card className="p-4 text-center">
          <CheckCircle2 className="w-5 h-5 text-primary-500 mx-auto mb-2" />
          <p className="text-xs text-primary-400">Service Type</p>
          <p className="text-sm font-semibold text-primary-900 dark:text-white truncate">{project.serviceType || "N/A"}</p>
        </Card>
      </div>

      {(project.shortDescription || project.description) && (
        <Card data-animate className="p-6 space-y-4">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Overview</h2>
          <Separator />
          {project.shortDescription && (
            <p className="text-primary-700 dark:text-primary-200 font-medium">{project.shortDescription}</p>
          )}
          {project.description && (
            <p className="text-primary-600 dark:text-primary-400 whitespace-pre-line">{project.description}</p>
          )}
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(project.challenge?.description || project.challenge?.points?.length > 0) && (
          <Card data-animate className="p-6">
            <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">The Challenge</h2>
            <Separator className="mb-4" />
            <p className="text-sm text-primary-600 dark:text-primary-400 mb-4">{project.challenge.description}</p>
            <ul className="space-y-2">
              {project.challenge.points.map((pt, i) => (
                <li key={i} className="flex gap-2 text-sm text-primary-700 dark:text-primary-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" /> {pt}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {(project.solution?.description || project.solution?.points?.length > 0) && (
          <Card data-animate className="p-6">
            <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">The Solution</h2>
            <Separator className="mb-4" />
            <p className="text-sm text-primary-600 dark:text-primary-400 mb-4">{project.solution.description}</p>
            <ul className="space-y-2">
              {project.solution.points.map((pt, i) => (
                <li key={i} className="flex gap-2 text-sm text-primary-700 dark:text-primary-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" /> {pt}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {project.stats?.length > 0 && (
        <div data-animate className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {project.stats.map((stat, i) => (
            <Card key={i} className="p-4 text-center bg-primary-50/50 dark:bg-white/[0.02]">
              <p className="text-2xl font-heading font-bold text-primary-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-xs text-primary-500 uppercase tracking-wider">{stat.label}</p>
            </Card>
          ))}
        </div>
      )}

      {project.testimonial?.quote && (
        <Card data-animate className="p-6 bg-primary-900 text-white dark:bg-white/5 border-none">
          <Quote className="w-8 h-8 text-primary-500/50 mb-4" />
          <p className="text-lg italic mb-6 leading-relaxed">"{project.testimonial.quote}"</p>
          <div>
            <p className="font-semibold text-white">{project.testimonial.author}</p>
            <p className="text-sm text-primary-300">{project.testimonial.role}</p>
          </div>
        </Card>
      )}

      {project.gallery?.length > 0 && (
        <Card data-animate className="p-6">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">Gallery</h2>
          <Separator className="mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {project.gallery.map((img, i) => (
              <div key={img.publicId || i} className="relative aspect-square rounded-xl overflow-hidden group">
                <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </Card>
      )}

      <div data-animate className="pb-8" />
    </div>
  )
}