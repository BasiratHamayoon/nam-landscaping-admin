"use client"

import { useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import {
  ArrowLeft, Pencil, Tag, LayoutGrid, Eye, Calendar
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"
import { fetchGalleryById, clearCurrentGallery } from "@/store/slices/gallerySlice"

export default function GalleryDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentGallery: item, detailLoading } = useSelector((s) => s.gallery)
  const containerRef = useRef(null)

  useEffect(() => {
    dispatch(fetchGalleryById(id))
    return () => {
      dispatch(clearCurrentGallery())
    }
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
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[500px] w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-primary-500 mb-4">Gallery item not found</p>
        <Button variant="outline" onClick={() => router.push("/gallery")}>Back to Gallery</Button>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-6">
      <div data-animate className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/gallery")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white truncate max-w-md">
              {item.caption || "Untitled Image"}
            </h1>
          </div>
        </div>
        <Button onClick={() => router.push(`/gallery/add?edit=${item._id}`)} className="gap-2">
          <Pencil className="w-4 h-4" /> Edit Details
        </Button>
      </div>

      {item.image?.url && (
        <Card data-animate className="overflow-hidden p-2 bg-white dark:bg-[#141a16]">
          <div className="relative rounded-xl overflow-hidden bg-primary-50/50 dark:bg-white/5 flex items-center justify-center min-h-[400px]">
            <img 
              src={item.image.url} 
              alt={item.caption || "Gallery preview"} 
              className="max-h-[600px] w-auto object-contain"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant={item.isActive ? "default" : "outline"}>
                {item.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </Card>
      )}

      <Card data-animate className="p-6">
        <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3">Image Metadata</h2>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary-400">
              <Tag className="w-4 h-4" />
              <span className="text-xs uppercase font-semibold tracking-wider">Category</span>
            </div>
            <p className="font-medium text-primary-900 dark:text-white">{item.category || "None"}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary-400">
              <LayoutGrid className="w-4 h-4" />
              <span className="text-xs uppercase font-semibold tracking-wider">Grid Size</span>
            </div>
            <p className="font-medium text-primary-900 dark:text-white">
              Col: {item.colSpan} &times; Row: {item.rowSpan}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary-400">
              <Eye className="w-4 h-4" />
              <span className="text-xs uppercase font-semibold tracking-wider">Display Order</span>
            </div>
            <p className="font-medium text-primary-900 dark:text-white">{item.order ?? 0}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary-400">
              <Calendar className="w-4 h-4" />
              <span className="text-xs uppercase font-semibold tracking-wider">Added On</span>
            </div>
            <p className="font-medium text-primary-900 dark:text-white">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>
      
      <div data-animate className="pb-8" />
    </div>
  )
}