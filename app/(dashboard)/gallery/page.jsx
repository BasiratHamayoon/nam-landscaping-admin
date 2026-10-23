"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import toast from "react-hot-toast"
import { Plus, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { Dialog, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog"
import GalleryFilters from "@/components/gallery/GalleryFilters"
import GalleryTable from "@/components/gallery/GalleryTable"
import { fetchGallery, deleteGallery, toggleGalleryStatus } from "@/store/slices/gallerySlice"

export default function GalleryPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { items, loading } = useSelector((s) => s.gallery)
  const headerRef = useRef(null)

  const [filters, setFilters] = useState({ search: "", category: "", isActive: "" })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const loadGallery = useCallback(() => {
    const params = {}
    if (filters.search) params.search = filters.search
    if (filters.category) params.category = filters.category
    if (filters.isActive) params.isActive = filters.isActive
    dispatch(fetchGallery(params))
  }, [dispatch, filters])

  useEffect(() => {
    const timeout = setTimeout(loadGallery, 300)
    return () => clearTimeout(timeout)
  }, [loadGallery])

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
      await dispatch(toggleGalleryStatus(id)).unwrap()
      toast.success("Visibility updated")
    } catch (err) {
      toast.error(err || "Failed to update visibility")
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await dispatch(deleteGallery(deleteTarget._id)).unwrap()
      toast.success("Image deleted from gallery")
      setDeleteTarget(null)
    } catch (err) {
      toast.error(err || "Failed to delete image")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">Gallery</h1>
          <p className="text-sm text-primary-500 dark:text-primary-400">Manage your portfolio bento grid</p>
        </div>
        <Button onClick={() => router.push("/gallery/add")} className="gap-2">
          <Plus className="w-4 h-4" /> Add Image
        </Button>
      </div>

      <GalleryFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters({ search: "", category: "", isActive: "" })}
      />

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="Gallery is empty"
          description="Upload high-quality images to showcase your landscaping work."
          action={<Button onClick={() => router.push("/gallery/add")} className="gap-2"><Plus className="w-4 h-4" /> Add Image</Button>}
        />
      ) : (
        <GalleryTable items={items} onToggle={handleToggle} onDelete={setDeleteTarget} />
      )}

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Gallery Image</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this image? It will be permanently removed from Cloudinary and your website grid.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} loading={deleting}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}