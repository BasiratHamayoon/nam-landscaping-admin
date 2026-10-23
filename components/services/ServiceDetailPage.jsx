"use client"

import { useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import {
  ArrowLeft, Pencil, Star, Tag, DollarSign, Layers, Zap, Clock, Globe, Calendar,
  Image as ImageIcon
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"
import { fetchServiceById, clearCurrentService } from "@/store/slices/servicesSlice"

export default function ServiceDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentService: service, detailLoading } = useSelector((s) => s.services)
  const containerRef = useRef(null)

  useEffect(() => {
    dispatch(fetchServiceById(id))
    return () => {
      dispatch(clearCurrentService())
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
  }, [detailLoading, service])

  if (detailLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-64 rounded-2xl" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-primary-500 dark:text-primary-400 mb-4">Service not found</p>
        <Button variant="outline" onClick={() => router.push("/services")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-6">
      <div data-animate className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/services")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">
              {service.title}
            </h1>
            <p className="text-sm text-primary-500 dark:text-primary-400">/{service.slug}</p>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/services/add?edit=${service._id}`)}
          className="gap-2"
        >
          <Pencil className="w-4 h-4" />
          Edit Service
        </Button>
      </div>

      {service.coverImage?.url && (
        <Card data-animate className="overflow-hidden">
          <div className="relative aspect-[21/9]">
            <img
              src={service.coverImage.url}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant={service.isActive ? "default" : "outline"}>
                {service.isActive ? "Active" : "Inactive"}
              </Badge>
              {service.isFeatured && (
                <Badge className="bg-amber-500/90 text-white border-0 gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </Card>
      )}

      <div data-animate className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Layers className="w-5 h-5 text-primary-500 mx-auto mb-2" />
          <p className="text-xs text-primary-400 dark:text-primary-500">Category</p>
          <p className="text-sm font-semibold text-primary-900 dark:text-white">{service.category}</p>
        </Card>
        <Card className="p-4 text-center">
          <DollarSign className="w-5 h-5 text-primary-500 mx-auto mb-2" />
          <p className="text-xs text-primary-400 dark:text-primary-500">Starting Price</p>
          <p className="text-sm font-semibold text-primary-900 dark:text-white">
            {service.pricing?.startingPrice
              ? `${service.pricing.currency} ${service.pricing.startingPrice}`
              : "N/A"}
          </p>
        </Card>
        <Card className="p-4 text-center">
          <Zap className="w-5 h-5 text-primary-500 mx-auto mb-2" />
          <p className="text-xs text-primary-400 dark:text-primary-500">Features</p>
          <p className="text-sm font-semibold text-primary-900 dark:text-white">
            {service.features?.length || 0}
          </p>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="w-5 h-5 text-primary-500 mx-auto mb-2" />
          <p className="text-xs text-primary-400 dark:text-primary-500">Steps</p>
          <p className="text-sm font-semibold text-primary-900 dark:text-white">
            {service.process?.length || 0}
          </p>
        </Card>
      </div>

      {service.shortDescription && (
        <Card data-animate className="p-6">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">
            Short Description
          </h2>
          <Separator className="mb-4" />
          <p className="text-primary-600 dark:text-primary-300 leading-relaxed">
            {service.shortDescription}
          </p>
        </Card>
      )}

      {service.description && (
        <Card data-animate className="p-6">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">
            Full Description
          </h2>
          <Separator className="mb-4" />
          <p className="text-primary-600 dark:text-primary-300 leading-relaxed whitespace-pre-line">
            {service.description}
          </p>
        </Card>
      )}

      {service.features?.length > 0 && (
        <Card data-animate className="p-6">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">
            Features
          </h2>
          <Separator className="mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feat, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-xl bg-primary-50/50 dark:bg-white/[0.03] border border-primary-100 dark:border-white/5"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-800/50 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="font-medium text-primary-900 dark:text-white text-sm">{feat.title}</p>
                  {feat.description && (
                    <p className="text-xs text-primary-500 dark:text-primary-400 mt-0.5">
                      {feat.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {service.process?.length > 0 && (
        <Card data-animate className="p-6">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">
            Process Steps
          </h2>
          <Separator className="mb-4" />
          <div className="space-y-4">
            {service.process.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary-600 dark:bg-primary-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {step.step || i + 1}
                </div>
                <div className="pt-1.5">
                  <p className="font-medium text-primary-900 dark:text-white">{step.title}</p>
                  {step.description && (
                    <p className="text-sm text-primary-500 dark:text-primary-400 mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {service.gallery?.length > 0 && (
        <Card data-animate className="p-6">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">
            Gallery ({service.gallery.length})
          </h2>
          <Separator className="mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {service.gallery.map((img, i) => (
              <div key={img.publicId || i} className="relative aspect-square rounded-xl overflow-hidden group">
                <img src={img.url} alt={img.caption || "Gallery"} className="w-full h-full object-cover" />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white truncate">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {service.tags?.length > 0 && (
        <Card data-animate className="p-6">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">
            Tags
          </h2>
          <Separator className="mb-4" />
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="gap-1">
                <Tag className="w-3 h-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {(service.seo?.title || service.seo?.description) && (
        <Card data-animate className="p-6">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">
            SEO Information
          </h2>
          <Separator className="mb-4" />
          <div className="space-y-3 text-sm">
            {service.seo.title && (
              <div>
                <span className="text-primary-400 dark:text-primary-500">Title:</span>{" "}
                <span className="text-primary-700 dark:text-primary-200">{service.seo.title}</span>
              </div>
            )}
            {service.seo.description && (
              <div>
                <span className="text-primary-400 dark:text-primary-500">Description:</span>{" "}
                <span className="text-primary-700 dark:text-primary-200">{service.seo.description}</span>
              </div>
            )}
            {service.seo.keywords?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-primary-400 dark:text-primary-500">Keywords:</span>
                {service.seo.keywords.map((k, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{k}</Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}

      <Card data-animate className="p-6">
        <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">
          Metadata
        </h2>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-primary-500 dark:text-primary-400">
            <Calendar className="w-4 h-4" />
            <span>Created: {new Date(service.createdAt).toLocaleDateString("en-AE", {
              year: "numeric", month: "long", day: "numeric"
            })}</span>
          </div>
          <div className="flex items-center gap-2 text-primary-500 dark:text-primary-400">
            <Calendar className="w-4 h-4" />
            <span>Updated: {new Date(service.updatedAt).toLocaleDateString("en-AE", {
              year: "numeric", month: "long", day: "numeric"
            })}</span>
          </div>
          <div className="flex items-center gap-2 text-primary-500 dark:text-primary-400">
            <Globe className="w-4 h-4" />
            <span>Order: {service.order ?? "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-primary-500 dark:text-primary-400">
            <ImageIcon className="w-4 h-4" />
            <span>Gallery Images: {service.gallery?.length || 0}</span>
          </div>
        </div>
      </Card>

      <div data-animate className="pb-8" />
    </div>
  )
}