"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import toast from "react-hot-toast"
import { ArrowLeft, Upload, Save, User } from "lucide-react"
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
  createTestimonial, updateTestimonial, fetchTestimonialById, clearCurrentTestimonial
} from "@/store/slices/testimonialsSlice"

export default function TestimonialFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")
  const isEdit = Boolean(editId)
  const dispatch = useDispatch()
  const { currentTestimonial, detailLoading, actionLoading } = useSelector((s) => s.testimonials)
  const containerRef = useRef(null)

  const [form, setForm] = useState({
    name: "",
    role: "",
    location: "",
    projectType: "",
    content: "",
    rating: "5",
    order: "0",
    isActive: true,
  })

  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState("")

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchTestimonialById(editId))
    }
    return () => dispatch(clearCurrentTestimonial())
  }, [isEdit, editId, dispatch])

  useEffect(() => {
    if (isEdit && currentTestimonial) {
      setForm({
        name: currentTestimonial.name || "",
        role: currentTestimonial.role || "",
        location: currentTestimonial.location || "",
        projectType: currentTestimonial.projectType || "",
        content: currentTestimonial.content || "",
        rating: currentTestimonial.rating?.toString() || "5",
        order: currentTestimonial.order?.toString() || "0",
        isActive: currentTestimonial.isActive ?? true,
      })
      if (currentTestimonial.avatar?.url) setAvatarPreview(currentTestimonial.avatar.url)
    }
  }, [isEdit, currentTestimonial])

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

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name.trim() || !form.content.trim()) {
      return toast.error("Client name and review content are required")
    }

    const fd = new FormData()
    fd.append("name", form.name.trim())
    fd.append("content", form.content.trim())
    if (form.role) fd.append("role", form.role.trim())
    if (form.location) fd.append("location", form.location.trim())
    if (form.projectType) fd.append("projectType", form.projectType.trim())
    fd.append("rating", form.rating)
    fd.append("order", form.order)
    fd.append("isActive", form.isActive)
    
    if (avatarFile) fd.append("avatar", avatarFile)

    try {
      if (isEdit) {
        await dispatch(updateTestimonial({ id: editId, formData: fd })).unwrap()
        toast.success("Testimonial updated successfully")
      } else {
        await dispatch(createTestimonial(fd)).unwrap()
        toast.success("Testimonial created successfully")
      }
      router.push("/testimonials")
    } catch (err) {
      toast.error(err || "Something went wrong")
    }
  }

  if (isEdit && detailLoading) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto space-y-6">
      <div data-animate className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/testimonials")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">
            {isEdit ? "Edit Testimonial" : "Add Testimonial"}
          </h1>
          <p className="text-sm text-primary-500 dark:text-primary-400">
            {isEdit ? "Update client review details" : "Add a new client review to your website"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Client Information</h2>
          <Separator />
          
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="shrink-0 flex flex-col items-center gap-3">
              <label className="group relative flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-primary-200 dark:border-white/10 hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer overflow-hidden bg-primary-50/30 dark:bg-white/5">
                {avatarPreview ? (
                  <>
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-primary-400">
                    <User className="w-8 h-8 mb-1" />
                    <span className="text-[10px] font-medium uppercase tracking-wide">Upload Photo</span>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarSelect} />
              </label>
              <span className="text-xs text-primary-400">Client Avatar (Optional)</span>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="name">Client Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Sarah Williams"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role / Relationship</Label>
                <Input
                  id="role"
                  placeholder="e.g. Homeowner"
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. Palm Jumeirah"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Review Details</h2>
          <Separator />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="content">Review Content *</Label>
              <Textarea
                id="content"
                placeholder="Write the client's testimonial here..."
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Select
                id="rating"
                value={form.rating}
                onChange={(e) => handleChange("rating", e.target.value)}
              >
                {[5, 4, 3, 2, 1].map(n => (
                  <option key={n} value={n}>{n} Stars</option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <Input
                id="projectType"
                placeholder="e.g. Full Landscape Design"
                value={form.projectType}
                onChange={(e) => handleChange("projectType", e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card data-animate className="p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Settings</h2>
          <Separator />
          <div className="flex flex-col sm:flex-row sm:items-center gap-8">
            <div className="flex items-center gap-3">
              <Switch checked={form.isActive} onCheckedChange={(v) => handleChange("isActive", v)} />
              <div>
                <Label>Visible to Public</Label>
                <p className="text-xs text-primary-500 mt-0.5">Show this review on the website</p>
              </div>
            </div>
            
            <div className="space-y-2 flex-1 max-w-[200px]">
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

        <div data-animate className="flex items-center justify-end gap-3 pb-8">
          <Button type="button" variant="outline" onClick={() => router.push("/testimonials")}>
            Cancel
          </Button>
          <Button type="submit" loading={actionLoading} className="min-w-[140px]">
            <Save className="w-4 h-4" />
            {isEdit ? "Update Testimonial" : "Add Testimonial"}
          </Button>
        </div>
      </form>
    </div>
  )
}