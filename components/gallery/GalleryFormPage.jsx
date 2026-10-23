"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import toast from "react-hot-toast"
import { ArrowLeft, Upload, Image as ImageIcon, Save, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select } from "@/components/ui/Select"
import { Switch } from "@/components/ui/Switch"
import { Card } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"
import {
  createGallery, updateGallery, fetchGalleryById, clearCurrentGallery
} from "@/store/slices/gallerySlice"

const categories = [
  "Landscaping", "Hardscaping", "Before & After", "Pools & Water", "Lighting", "Maintenance"
]

export default function GalleryFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")
  const isEdit = Boolean(editId)
  const dispatch = useDispatch()
  const { currentGallery, detailLoading, actionLoading } = useSelector((s) => s.gallery)
  const containerRef = useRef(null)

  const [form, setForm] = useState({
    caption: "",
    category: "Landscaping",
    colSpan: "1",
    rowSpan: "1",
    order: "0",
    isActive: true,
  })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchGalleryById(editId))
    }
    return () => {
      dispatch(clearCurrentGallery())
    }
  }, [isEdit, editId, dispatch])

  useEffect(() => {
    if (isEdit && currentGallery) {
      setForm({
        caption: currentGallery.caption || "",
        category: currentGallery.category || "Landscaping",
        colSpan: currentGallery.colSpan?.toString() || "1",
        rowSpan: currentGallery.rowSpan?.toString() || "1",
        order: currentGallery.order?.toString() || "0",
        isActive: currentGallery.isActive ?? true,
      })
      if (currentGallery.image?.url) setImagePreview(currentGallery.image.url)
    }
  }, [isEdit, currentGallery])

  useEffect(() => {
    if (!containerRef.current) return
    const sections = containerRef.current.querySelectorAll("[data-animate]")
    gsap.fromTo(
      sections,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power2.out", delay: 0.1 }
    )
  }, [detailLoading])

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isEdit && !imageFile) {
      return toast.error("An image is required for the gallery")
    }

    const fd = new FormData()
    if (form.caption) fd.append("caption", form.caption.trim())
    fd.append("category", form.category)
    fd.append("colSpan", form.colSpan)
    fd.append("rowSpan", form.rowSpan)
    fd.append("order", form.order)
    fd.append("isActive", form.isActive)
    
    if (imageFile) fd.append("image", imageFile)

    try {
      if (isEdit) {
        await dispatch(updateGallery({ id: editId, formData: fd })).unwrap()
        toast.success("Gallery item updated successfully")
      } else {
        await dispatch(createGallery(fd)).unwrap()
        toast.success("Gallery item added successfully")
      }
      router.push("/gallery")
    } catch (err) {
      toast.error(err || "Something went wrong")
    }
  }

  if (isEdit && detailLoading) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-96 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto space-y-6">
      <div data-animate className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/gallery")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">
            {isEdit ? "Edit Gallery Item" : "Add to Gallery"}
          </h1>
          <p className="text-sm text-primary-500 dark:text-primary-400">
            {isEdit ? "Update image metadata and bento grid layout" : "Upload a new photo to your portfolio grid"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Image Upload</h2>
          <Separator />
          
          <label className="group relative flex flex-col items-center justify-center min-h-[300px] rounded-xl border-2 border-dashed border-primary-200 dark:border-white/10 hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer overflow-hidden bg-primary-50/30 dark:bg-white/5">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Upload className="w-6 h-6 text-white" />
                  <span className="text-white font-medium">Change Image</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 text-primary-400">
                <ImageIcon className="w-12 h-12" />
                <span className="text-sm font-medium">Click to upload image</span>
                <span className="text-xs opacity-70">JPG, PNG, WEBP (Max 5MB)</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
          </label>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Details & Layout</h2>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                placeholder="e.g. Modern poolside lighting installation"
                value={form.caption}
                onChange={(e) => handleChange("caption", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                placeholder="0"
                value={form.order}
                onChange={(e) => handleChange("order", e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Bento Grid Configuration</h2>
          </div>
          <Separator />
          <p className="text-sm text-primary-500 dark:text-primary-400 mb-2">
            Control how this image scales in the asymmetric frontend gallery.
          </p>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="colSpan">Column Span</Label>
              <Select
                id="colSpan"
                value={form.colSpan}
                onChange={(e) => handleChange("colSpan", e.target.value)}
              >
                <option value="1">1 Column (Standard)</option>
                <option value="2">2 Columns (Wide)</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rowSpan">Row Span</Label>
              <Select
                id="rowSpan"
                value={form.rowSpan}
                onChange={(e) => handleChange("rowSpan", e.target.value)}
              >
                <option value="1">1 Row (Standard)</option>
                <option value="2">2 Rows (Tall)</option>
              </Select>
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <Switch checked={form.isActive} onCheckedChange={(v) => handleChange("isActive", v)} />
            <div>
              <Label>Visible to Public</Label>
              <p className="text-xs text-primary-500 dark:text-primary-400 mt-0.5">
                Toggle to show or hide this image in the live gallery
              </p>
            </div>
          </div>
        </Card>

        <div data-animate className="flex items-center justify-end gap-3 pb-8">
          <Button type="button" variant="outline" onClick={() => router.push("/gallery")}>
            Cancel
          </Button>
          <Button type="submit" loading={actionLoading} className="min-w-[140px]">
            <Save className="w-4 h-4" />
            {isEdit ? "Update Image" : "Upload Image"}
          </Button>
        </div>
      </form>
    </div>
  )
}