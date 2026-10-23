"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import toast from "react-hot-toast"
import { Plus, Leaf } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { Dialog, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog"
import ServiceFilters from "@/components/services/ServiceFilters"
import ServiceTable from "@/components/services/ServiceTable"
import {
  fetchServices, deleteService, toggleServiceStatus
} from "@/store/slices/servicesSlice"

export default function ServicesPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { items, loading } = useSelector((s) => s.services)
  const headerRef = useRef(null)

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    isActive: "",
    isFeatured: "",
  })

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const loadServices = useCallback(() => {
    const params = {}
    if (filters.search) params.search = filters.search
    if (filters.category) params.category = filters.category
    if (filters.isActive) params.isActive = filters.isActive
    if (filters.isFeatured) params.isFeatured = filters.isFeatured
    dispatch(fetchServices(params))
  }, [dispatch, filters])

  useEffect(() => {
    const timeout = setTimeout(loadServices, 300)
    return () => clearTimeout(timeout)
  }, [loadServices])

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
      await dispatch(toggleServiceStatus(id)).unwrap()
      toast.success("Status updated")
    } catch (err) {
      toast.error(err || "Failed to update status")
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await dispatch(deleteService(deleteTarget._id)).unwrap()
      toast.success("Service deleted")
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
          <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">
            Services
          </h1>
          <p className="text-sm text-primary-500 dark:text-primary-400">
            Manage your landscaping services
          </p>
        </div>
        <Button onClick={() => router.push("/services/add")} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Service
        </Button>
      </div>

      <ServiceFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters({ search: "", category: "", isActive: "", isFeatured: "" })}
      />

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={Leaf}
          title="No services found"
          description="Get started by creating your first landscaping service."
          action={
            <Button onClick={() => router.push("/services/add")} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Service
            </Button>
          }
        />
      ) : (
        <ServiceTable
          services={items}
          onToggle={handleToggle}
          onDelete={setDeleteTarget}
        />
      )}

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Service</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete &ldquo;{deleteTarget?.title}&rdquo;? This action cannot be undone.
          All associated images will be removed from Cloudinary.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}