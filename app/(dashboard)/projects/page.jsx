"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import toast from "react-hot-toast"
import { Plus, FolderGit2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { Dialog, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog"
import ProjectFilters from "@/components/projects/ProjectFilters"
import ProjectTable from "@/components/projects/ProjectTable"
import { fetchProjects, deleteProject, toggleProjectStatus } from "@/store/slices/projectsSlice"

export default function ProjectsPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { items, loading } = useSelector((s) => s.projects)
  const headerRef = useRef(null)

  const [filters, setFilters] = useState({
    search: "", serviceType: "", isActive: "", isFeatured: "",
  })

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const loadProjects = useCallback(() => {
    const params = {}
    if (filters.search) params.search = filters.search
    if (filters.serviceType) params.serviceType = filters.serviceType
    if (filters.isActive) params.isActive = filters.isActive
    if (filters.isFeatured) params.isFeatured = filters.isFeatured
    dispatch(fetchProjects(params))
  }, [dispatch, filters])

  useEffect(() => {
    const timeout = setTimeout(loadProjects, 300)
    return () => clearTimeout(timeout)
  }, [loadProjects])

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
      await dispatch(toggleProjectStatus(id)).unwrap()
      toast.success("Status updated")
    } catch (err) {
      toast.error(err || "Failed to update status")
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await dispatch(deleteProject(deleteTarget._id)).unwrap()
      toast.success("Project deleted")
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
          <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">Projects</h1>
          <p className="text-sm text-primary-500 dark:text-primary-400">Manage your portfolio and case studies</p>
        </div>
        <Button onClick={() => router.push("/projects/add")} className="gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      <ProjectFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters({ search: "", serviceType: "", isActive: "", isFeatured: "" })}
      />

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title="No projects found"
          description="Build your portfolio by adding your first landscape project."
          action={<Button onClick={() => router.push("/projects/add")} className="gap-2"><Plus className="w-4 h-4" /> Add Project</Button>}
        />
      ) : (
        <ProjectTable projects={items} onToggle={handleToggle} onDelete={setDeleteTarget} />
      )}

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete &ldquo;{deleteTarget?.title}&rdquo;? All gallery images will be removed.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} loading={deleting}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}