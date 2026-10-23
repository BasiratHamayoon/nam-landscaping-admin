"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import toast from "react-hot-toast"
import {
  ArrowLeft, Upload, Plus, Trash2, GripVertical, Image as ImageIcon, X, Save, Loader2
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"
import { Switch } from "@/components/ui/Switch"
import { Card } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"
import {
  createService, updateService, fetchServiceById, clearCurrentService
} from "@/store/slices/servicesSlice"

const categories = [
  "Landscaping", "Hardscaping", "Irrigation", "Maintenance",
  "Design", "Lighting", "Water Features", "Outdoor Living",
  "Tree Care", "Seasonal", "Other"
]

const emptyFeature = { title: "", description: "" }
const emptyStep = { step: "", title: "", description: "" }

export default function ServiceFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")
  const isEdit = Boolean(editId)
  const dispatch = useDispatch()
  const { currentService, detailLoading, actionLoading } = useSelector((s) => s.services)
  const containerRef = useRef(null)

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "Landscaping",
    tags: "",
    startingPrice: "",
    currency: "AED",
    unit: "",
    isActive: true,
    isFeatured: false,
    features: [{ ...emptyFeature }],
    process: [{ ...emptyStep, step: "1" }],
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  })

  const [iconFile, setIconFile] = useState(null)
  const [iconPreview, setIconPreview] = useState("")
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState("")
  const [galleryFiles, setGalleryFiles] = useState([])
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const [existingGallery, setExistingGallery] = useState([])

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchServiceById(editId))
    }
    return () => {
      dispatch(clearCurrentService())
    }
  }, [isEdit, editId, dispatch])

  useEffect(() => {
    if (isEdit && currentService) {
      setForm({
        title: currentService.title || "",
        shortDescription: currentService.shortDescription || "",
        description: currentService.description || "",
        category: currentService.category || "Landscaping",
        tags: currentService.tags?.join(", ") || "",
        startingPrice: currentService.pricing?.startingPrice?.toString() || "",
        currency: currentService.pricing?.currency || "AED",
        unit: currentService.pricing?.unit || "",
        isActive: currentService.isActive ?? true,
        isFeatured: currentService.isFeatured ?? false,
        features: currentService.features?.length
          ? currentService.features.map((f) => ({ title: f.title || "", description: f.description || "" }))
          : [{ ...emptyFeature }],
        process: currentService.process?.length
          ? currentService.process.map((p) => ({
              step: p.step?.toString() || "",
              title: p.title || "",
              description: p.description || "",
            }))
          : [{ ...emptyStep, step: "1" }],
        seoTitle: currentService.seo?.title || "",
        seoDescription: currentService.seo?.description || "",
        seoKeywords: currentService.seo?.keywords?.join(", ") || "",
      })
      if (currentService.icon?.url) setIconPreview(currentService.icon.url)
      if (currentService.coverImage?.url) setCoverPreview(currentService.coverImage.url)
      if (currentService.gallery?.length) setExistingGallery(currentService.gallery)
    }
  }, [isEdit, currentService])

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

  const handleImageSelect = (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    if (type === "icon") {
      setIconFile(file)
      setIconPreview(url)
    } else {
      setCoverFile(file)
      setCoverPreview(url)
    }
  }

  const handleGallerySelect = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const previews = files.map((f) => URL.createObjectURL(f))
    setGalleryFiles((prev) => [...prev, ...files])
    setGalleryPreviews((prev) => [...prev, ...previews])
  }

  const removeGalleryNew = (idx) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== idx))
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== idx))
  }

  const addFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, { ...emptyFeature }] }))
  }

  const removeFeature = (idx) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }))
  }

  const updateFeature = (idx, field, value) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === idx ? { ...f, [field]: value } : f)),
    }))
  }

  const addStep = () => {
    setForm((prev) => ({
      ...prev,
      process: [...prev.process, { ...emptyStep, step: String(prev.process.length + 1) }],
    }))
  }

  const removeStep = (idx) => {
    setForm((prev) => ({
      ...prev,
      process: prev.process
        .filter((_, i) => i !== idx)
        .map((s, i) => ({ ...s, step: String(i + 1) })),
    }))
  }

  const updateStep = (idx, field, value) => {
    setForm((prev) => ({
      ...prev,
      process: prev.process.map((s, i) => (i === idx ? { ...s, [field]: value } : s)),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title.trim()) {
      toast.error("Service title is required")
      return
    }

    const fd = new FormData()
    fd.append("title", form.title.trim())
    if (form.shortDescription.trim()) fd.append("shortDescription", form.shortDescription.trim())
    if (form.description.trim()) fd.append("description", form.description.trim())
    fd.append("category", form.category)
    fd.append("isActive", form.isActive)
    fd.append("isFeatured", form.isFeatured)

    if (form.tags.trim()) {
      const tagsArr = form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      tagsArr.forEach((t) => fd.append("tags[]", t))
    }

    if (form.startingPrice) {
      fd.append("pricing[startingPrice]", form.startingPrice)
      fd.append("pricing[currency]", form.currency)
      if (form.unit) fd.append("pricing[unit]", form.unit)
    }

    const validFeatures = form.features.filter((f) => f.title.trim())
    if (validFeatures.length) {
      fd.append("features", JSON.stringify(validFeatures))
    }

    const validSteps = form.process.filter((s) => s.title.trim())
    if (validSteps.length) {
      fd.append("process", JSON.stringify(validSteps))
    }

    if (form.seoTitle || form.seoDescription || form.seoKeywords) {
      const seo = {}
      if (form.seoTitle) seo.title = form.seoTitle
      if (form.seoDescription) seo.description = form.seoDescription
      if (form.seoKeywords) seo.keywords = form.seoKeywords.split(",").map((k) => k.trim()).filter(Boolean)
      fd.append("seo", JSON.stringify(seo))
    }

    if (iconFile) fd.append("icon", iconFile)
    if (coverFile) fd.append("coverImage", coverFile)
    galleryFiles.forEach((f) => fd.append("gallery", f))

    try {
      if (isEdit) {
        await dispatch(updateService({ id: editId, formData: fd })).unwrap()
        toast.success("Service updated successfully")
      } else {
        await dispatch(createService(fd)).unwrap()
        toast.success("Service created successfully")
      }
      router.push("/services")
    } catch (err) {
      toast.error(err || "Something went wrong")
    }
  }

  if (isEdit && detailLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-2xl" />
        ))}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-6">
      <div data-animate className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/services")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">
            {isEdit ? "Edit Service" : "Add New Service"}
          </h1>
          <p className="text-sm text-primary-500 dark:text-primary-400">
            {isEdit ? "Update service details and media" : "Create a new landscaping service"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">
            Basic Information
          </h2>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Service Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Landscape Design & Planning"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                placeholder="Brief description for cards and previews..."
                value={form.shortDescription}
                onChange={(e) => handleChange("shortDescription", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the service..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="min-h-[140px]"
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
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="garden, design, outdoor..."
                value={form.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">
            Media
          </h2>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Service Icon</Label>
              <label className="group relative flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed border-primary-200 dark:border-white/10 hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer overflow-hidden">
                {iconPreview ? (
                  <>
                    <img src={iconPreview} alt="Icon" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-primary-400">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-sm">Upload Icon</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageSelect(e, "icon")}
                />
              </label>
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <label className="group relative flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed border-primary-200 dark:border-white/10 hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer overflow-hidden">
                {coverPreview ? (
                  <>
                    <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-primary-400">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-sm">Upload Cover</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageSelect(e, "cover")}
                />
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Gallery Images</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {existingGallery.map((img, i) => (
                <div key={img.publicId || i} className="relative group rounded-xl overflow-hidden aspect-square">
                  <img src={img.url} alt={img.caption || "Gallery"} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs text-white/80 bg-black/50 px-2 py-1 rounded-full">Existing</span>
                  </div>
                </div>
              ))}
              {galleryPreviews.map((url, i) => (
                <div key={`new-${i}`} className="relative group rounded-xl overflow-hidden aspect-square">
                  <img src={url} alt="New" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryNew(i)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-primary-200 dark:border-white/10 hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer">
                <Plus className="w-6 h-6 text-primary-400 mb-1" />
                <span className="text-xs text-primary-400">Add Photos</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGallerySelect}
                />
              </label>
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">
            Pricing
          </h2>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label htmlFor="startingPrice">Starting Price</Label>
              <Input
                id="startingPrice"
                type="number"
                placeholder="0"
                value={form.startingPrice}
                onChange={(e) => handleChange("startingPrice", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                id="currency"
                value={form.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
              >
                <option value="AED">AED</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                placeholder="e.g. sqft, project, month"
                value={form.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">
              Features
            </h2>
            <Button type="button" variant="outline" size="sm" onClick={addFeature} className="gap-1.5">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
          <Separator />
          <div className="space-y-4">
            {form.features.map((feat, i) => (
              <div key={i} className="flex gap-3 items-start p-4 rounded-xl bg-primary-50/50 dark:bg-white/[0.03] border border-primary-100 dark:border-white/5">
                <GripVertical className="w-5 h-5 text-primary-300 dark:text-primary-600 mt-2 shrink-0" />
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    placeholder="Feature title"
                    value={feat.title}
                    onChange={(e) => updateFeature(i, "title", e.target.value)}
                  />
                  <Input
                    placeholder="Feature description"
                    value={feat.description}
                    onChange={(e) => updateFeature(i, "description", e.target.value)}
                  />
                </div>
                {form.features.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFeature(i)}
                    className="shrink-0 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">
              Process Steps
            </h2>
            <Button type="button" variant="outline" size="sm" onClick={addStep} className="gap-1.5">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
          <Separator />
          <div className="space-y-4">
            {form.process.map((step, i) => (
              <div key={i} className="flex gap-3 items-start p-4 rounded-xl bg-primary-50/50 dark:bg-white/[0.03] border border-primary-100 dark:border-white/5">
                <div className="w-8 h-8 rounded-full bg-primary-600 dark:bg-primary-500 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-1">
                  {step.step || i + 1}
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    placeholder="Step title"
                    value={step.title}
                    onChange={(e) => updateStep(i, "title", e.target.value)}
                  />
                  <Input
                    placeholder="Step description"
                    value={step.description}
                    onChange={(e) => updateStep(i, "description", e.target.value)}
                  />
                </div>
                {form.process.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStep(i)}
                    className="shrink-0 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">
            Settings
          </h2>
          <Separator />
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3">
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => handleChange("isActive", v)}
              />
              <Label>Active</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.isFeatured}
                onCheckedChange={(v) => handleChange("isFeatured", v)}
              />
              <Label>Featured</Label>
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">
            SEO
          </h2>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seoTitle">Meta Title</Label>
              <Input
                id="seoTitle"
                placeholder="SEO title"
                value={form.seoTitle}
                onChange={(e) => handleChange("seoTitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDescription">Meta Description</Label>
              <Textarea
                id="seoDescription"
                placeholder="SEO description"
                value={form.seoDescription}
                onChange={(e) => handleChange("seoDescription", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoKeywords">Keywords (comma separated)</Label>
              <Input
                id="seoKeywords"
                placeholder="landscaping, dubai, garden..."
                value={form.seoKeywords}
                onChange={(e) => handleChange("seoKeywords", e.target.value)}
              />
            </div>
          </div>
        </Card>

        <div data-animate className="flex items-center justify-end gap-3 pb-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/services")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={actionLoading} className="gap-2 min-w-[140px]">
            {actionLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isEdit ? "Update Service" : "Create Service"}
          </Button>
        </div>
      </form>
    </div>
  )
}