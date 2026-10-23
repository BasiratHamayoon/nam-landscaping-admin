"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import toast from "react-hot-toast"
import {
  ArrowLeft, Upload, Plus, Trash2, Image as ImageIcon, X, Save
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
  createProject, updateProject, fetchProjectById, clearCurrentProject
} from "@/store/slices/projectsSlice"

export default function ProjectFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")
  const isEdit = Boolean(editId)
  const dispatch = useDispatch()
  const { currentProject, detailLoading, actionLoading } = useSelector((s) => s.projects)
  const containerRef = useRef(null)

  const [form, setForm] = useState({
    title: "",
    client: "",
    location: "",
    completionDate: "",
    serviceType: "Landscaping",
    shortDescription: "",
    description: "",
    isActive: true,
    isFeatured: false,
    challengeDesc: "",
    challengePoints: [""],
    solutionDesc: "",
    solutionPoints: [""],
    testiQuote: "",
    testiAuthor: "",
    testiRole: "",
    testiRating: "5",
    stats: [{ label: "", value: "" }],
    seoTitle: "",
    seoDescription: "",
  })

  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState("")
  const [galleryFiles, setGalleryFiles] = useState([])
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const [existingGallery, setExistingGallery] = useState([])

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchProjectById(editId))
    }
    return () => {
      dispatch(clearCurrentProject())
    }
  }, [isEdit, editId, dispatch])

  useEffect(() => {
    if (isEdit && currentProject) {
      setForm({
        title: currentProject.title || "",
        client: currentProject.client || "",
        location: currentProject.location || "",
        completionDate: currentProject.completionDate ? new Date(currentProject.completionDate).toISOString().split("T")[0] : "",
        serviceType: currentProject.serviceType || "Landscaping",
        shortDescription: currentProject.shortDescription || "",
        description: currentProject.description || "",
        isActive: currentProject.isActive ?? true,
        isFeatured: currentProject.isFeatured ?? false,
        challengeDesc: currentProject.challenge?.description || "",
        challengePoints: currentProject.challenge?.points?.length ? currentProject.challenge.points : [""],
        solutionDesc: currentProject.solution?.description || "",
        solutionPoints: currentProject.solution?.points?.length ? currentProject.solution.points : [""],
        testiQuote: currentProject.testimonial?.quote || "",
        testiAuthor: currentProject.testimonial?.author || "",
        testiRole: currentProject.testimonial?.role || "",
        testiRating: currentProject.testimonial?.rating?.toString() || "5",
        stats: currentProject.stats?.length ? currentProject.stats : [{ label: "", value: "" }],
        seoTitle: currentProject.seo?.title || "",
        seoDescription: currentProject.seo?.description || "",
      })
      if (currentProject.coverImage?.url) setCoverPreview(currentProject.coverImage.url)
      if (currentProject.gallery?.length) setExistingGallery(currentProject.gallery)
    }
  }, [isEdit, currentProject])

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

  const handleArrayChange = (field, index, value, key = null) => {
    setForm((prev) => {
      const newArray = [...prev[field]]
      if (key) {
        newArray[index] = { ...newArray[index], [key]: value }
      } else {
        newArray[index] = value
      }
      return { ...prev, [field]: newArray }
    })
  }

  const addArrayItem = (field, defaultValue = "") => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], defaultValue] }))
  }

  const removeArrayItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleCoverSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return toast.error("Project title is required")

    const fd = new FormData()
    fd.append("title", form.title.trim())
    if (form.client) fd.append("client", form.client.trim())
    if (form.location) fd.append("location", form.location.trim())
    if (form.completionDate) fd.append("completionDate", form.completionDate)
    fd.append("serviceType", form.serviceType)
    if (form.shortDescription) fd.append("shortDescription", form.shortDescription.trim())
    if (form.description) fd.append("description", form.description.trim())
    fd.append("isActive", form.isActive)
    fd.append("isFeatured", form.isFeatured)

    const cPoints = form.challengePoints.filter(Boolean)
    if (form.challengeDesc || cPoints.length) {
      fd.append("challenge", JSON.stringify({ description: form.challengeDesc, points: cPoints }))
    }

    const sPoints = form.solutionPoints.filter(Boolean)
    if (form.solutionDesc || sPoints.length) {
      fd.append("solution", JSON.stringify({ description: form.solutionDesc, points: sPoints }))
    }

    if (form.testiQuote || form.testiAuthor) {
      fd.append("testimonial", JSON.stringify({
        quote: form.testiQuote, author: form.testiAuthor, role: form.testiRole, rating: Number(form.testiRating)
      }))
    }

    const validStats = form.stats.filter((s) => s.label && s.value)
    if (validStats.length) {
      fd.append("stats", JSON.stringify(validStats))
    }

    if (form.seoTitle || form.seoDescription) {
      fd.append("seo", JSON.stringify({ title: form.seoTitle, description: form.seoDescription }))
    }

    if (coverFile) fd.append("coverImage", coverFile)
    galleryFiles.forEach((f) => fd.append("gallery", f))

    try {
      if (isEdit) {
        await dispatch(updateProject({ id: editId, formData: fd })).unwrap()
        toast.success("Project updated successfully")
      } else {
        await dispatch(createProject(fd)).unwrap()
        toast.success("Project created successfully")
      }
      router.push("/projects")
    } catch (err) {
      toast.error(err || "Something went wrong")
    }
  }

  if (isEdit && detailLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Skeleton className="h-10 w-48" />
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-40 w-full rounded-2xl" />)}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-6">
      <div data-animate className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/projects")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">
            {isEdit ? "Edit Project" : "Add New Project"}
          </h1>
          <p className="text-sm text-primary-500 dark:text-primary-400">
            {isEdit ? "Update portfolio project details" : "Create a new portfolio showcase"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">General Information</h2>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Modern Villa Garden"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client Name</Label>
              <Input
                id="client"
                placeholder="e.g. John Doe"
                value={form.client}
                onChange={(e) => handleChange("client", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Palm Jumeirah, Dubai"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="completionDate">Completion Date</Label>
              <Input
                id="completionDate"
                type="date"
                value={form.completionDate}
                onChange={(e) => handleChange("completionDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select
                id="serviceType"
                value={form.serviceType}
                onChange={(e) => handleChange("serviceType", e.target.value)}
              >
                <option value="Landscaping">Landscaping</option>
                <option value="Hardscaping">Hardscaping</option>
                <option value="Pool Design">Pool Design</option>
                <option value="Lighting">Lighting</option>
                <option value="Maintenance">Maintenance</option>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                placeholder="Brief summary..."
                value={form.shortDescription}
                onChange={(e) => handleChange("shortDescription", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Media</h2>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <label className="group relative flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-primary-200 dark:border-white/10 hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer overflow-hidden">
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
                    <span className="text-sm">Upload Cover Image</span>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverSelect} />
              </label>
            </div>
            <div className="space-y-3 pt-4">
              <Label>Gallery Images</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {existingGallery.map((img, i) => (
                  <div key={img.publicId || i} className="relative group rounded-xl overflow-hidden aspect-square">
                    <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
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
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleGallerySelect} />
                </label>
              </div>
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Case Study Details</h2>
          <Separator />
          
          <div className="space-y-5">
            <div>
              <Label className="mb-2 block">The Challenge</Label>
              <Textarea
                placeholder="Describe the main challenge..."
                value={form.challengeDesc}
                onChange={(e) => handleChange("challengeDesc", e.target.value)}
                className="mb-3"
              />
              {form.challengePoints.map((point, i) => (
                <div key={`c-${i}`} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Challenge point..."
                    value={point}
                    onChange={(e) => handleArrayChange("challengePoints", i, e.target.value)}
                  />
                  {form.challengePoints.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("challengePoints", i)} className="shrink-0 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("challengePoints")} className="mt-1">
                <Plus className="w-4 h-4 mr-1" /> Add Point
              </Button>
            </div>

            <Separator className="bg-primary-100 dark:bg-white/5" />

            <div>
              <Label className="mb-2 block">The Solution</Label>
              <Textarea
                placeholder="Describe the solution provided..."
                value={form.solutionDesc}
                onChange={(e) => handleChange("solutionDesc", e.target.value)}
                className="mb-3"
              />
              {form.solutionPoints.map((point, i) => (
                <div key={`s-${i}`} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Solution point..."
                    value={point}
                    onChange={(e) => handleArrayChange("solutionPoints", i, e.target.value)}
                  />
                  {form.solutionPoints.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("solutionPoints", i)} className="shrink-0 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("solutionPoints")} className="mt-1">
                <Plus className="w-4 h-4 mr-1" /> Add Point
              </Button>
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Project Stats</h2>
          <Separator />
          {form.stats.map((stat, i) => (
            <div key={`stat-${i}`} className="flex gap-3 items-center">
              <Input
                placeholder="Label (e.g. Area Size)"
                value={stat.label}
                onChange={(e) => handleArrayChange("stats", i, e.target.value, "label")}
              />
              <Input
                placeholder="Value (e.g. 15,000 sq ft)"
                value={stat.value}
                onChange={(e) => handleArrayChange("stats", i, e.target.value, "value")}
              />
              {form.stats.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("stats", i)} className="shrink-0 text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("stats", { label: "", value: "" })}>
            <Plus className="w-4 h-4 mr-1" /> Add Stat
          </Button>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Client Testimonial</h2>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 space-y-2">
              <Label>Quote</Label>
              <Textarea
                placeholder="Client's review..."
                value={form.testiQuote}
                onChange={(e) => handleChange("testiQuote", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Author Name</Label>
              <Input
                placeholder="e.g. Jane Smith"
                value={form.testiAuthor}
                onChange={(e) => handleChange("testiAuthor", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Author Role/Company</Label>
              <Input
                placeholder="e.g. Homeowner"
                value={form.testiRole}
                onChange={(e) => handleChange("testiRole", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <Select
                value={form.testiRating}
                onChange={(e) => handleChange("testiRating", e.target.value)}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} Stars</option>
                ))}
              </Select>
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Visibility & SEO</h2>
          <Separator />
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="flex items-center gap-3">
              <Switch checked={form.isActive} onCheckedChange={(v) => handleChange("isActive", v)} />
              <Label>Active Project</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.isFeatured} onCheckedChange={(v) => handleChange("isFeatured", v)} />
              <Label>Featured Portfolio</Label>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>SEO Title</Label>
              <Input
                placeholder="Meta title"
                value={form.seoTitle}
                onChange={(e) => handleChange("seoTitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>SEO Description</Label>
              <Textarea
                placeholder="Meta description"
                value={form.seoDescription}
                onChange={(e) => handleChange("seoDescription", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>
        </Card>

        <div data-animate className="flex items-center justify-end gap-3 pb-8">
          <Button type="button" variant="outline" onClick={() => router.push("/projects")}>
            Cancel
          </Button>
          <Button type="submit" loading={actionLoading} className="min-w-[140px]">
            <Save className="w-4 h-4" />
            {isEdit ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  )
}