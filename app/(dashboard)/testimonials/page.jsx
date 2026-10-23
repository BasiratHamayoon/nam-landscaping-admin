"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import toast from "react-hot-toast"
import { Plus, MessageSquareQuote } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { Dialog, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog"
import TestimonialFilters from "@/components/testimonials/TestimonialFilters"
import TestimonialTable from "@/components/testimonials/TestimonialTable"
import { fetchTestimonials, deleteTestimonial, toggleTestimonialStatus } from "@/store/slices/testimonialsSlice"

export default function TestimonialsPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { items, loading } = useSelector((s) => s.testimonials)
  const headerRef = useRef(null)

  const [filters, setFilters] = useState({ search: "", rating: "", isActive: "" })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const loadTestimonials = useCallback(() => {
    const params = {}
    if (filters.search) params.search = filters.search
    if (filters.rating) params.rating = filters.rating
    if (filters.isActive) params.isActive = filters.isActive
    dispatch(fetchTestimonials(params))
  }, [dispatch, filters])

  useEffect(() => {
    const timeout = setTimeout(loadTestimonials, 300)
    return () => clearTimeout(timeout)
  }, [loadTestimonials])

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }
    )
  }, [])

  const handleToggle = async (id) => {
    try {
      await dispatch(toggleTestimonialStatus(id)).unwrap()
      toast.success("Visibility updated")
    } catch (err) {
      toast.error(err || "Failed to update status")
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await dispatch(deleteTestimonial(deleteTarget._id)).unwrap()
      toast.success("Testimonial deleted")
      setDeleteTarget(null)
    } catch (err) {
      toast.error(err || "Failed to delete")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">Testimonials</h1>
          <p className="text-sm text-primary-500 dark:text-primary-400">Manage client reviews and ratings</p>
        </div>
        <Button onClick={() => router.push("/testimonials/add")} className="gap-2">
          <Plus className="w-4 h-4" /> Add Review
        </Button>
      </div>

      <TestimonialFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters({ search: "", rating: "", isActive: "" })}
      />

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={MessageSquareQuote}
          title="No testimonials found"
          description="Add some shining reviews to build trust with new clients."
          action={<Button onClick={() => router.push("/testimonials/add")} className="gap-2"><Plus className="w-4 h-4" /> Add Review</Button>}
        />
      ) : (
        <TestimonialTable items={items} onToggle={handleToggle} onDelete={setDeleteTarget} />
      )}

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Testimonial</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the review from "{deleteTarget?.name}"? This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} loading={deleting}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}