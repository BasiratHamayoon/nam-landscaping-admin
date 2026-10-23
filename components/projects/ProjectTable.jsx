"use client"

import { useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from "@/components/ui/Table"
import { Badge } from "@/components/ui/Badge"
import {
  DropdownMenu, DropdownTrigger, DropdownContent, DropdownItem
} from "@/components/ui/DropdownMenu"
import { MoreVertical, Eye, Pencil, Trash2, Star, ToggleLeft, ToggleRight, MapPin } from "lucide-react"

export default function ProjectTable({ projects, onToggle, onDelete }) {
  const router = useRouter()
  const tableRef = useRef(null)

  useEffect(() => {
    if (!tableRef.current || projects.length === 0) return
    const rows = tableRef.current.querySelectorAll("tbody tr")
    gsap.fromTo(
      rows,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.4, ease: "power2.out" }
    )
  }, [projects])

  return (
    <div ref={tableRef}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead className="hidden md:table-cell">Client & Location</TableHead>
            <TableHead className="hidden lg:table-cell">Service Type</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="hidden sm:table-cell">Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {project.coverImage?.url ? (
                    <img
                      src={project.coverImage.url}
                      alt={project.title}
                      className="w-12 h-10 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-10 rounded-lg bg-primary-100 dark:bg-white/10 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-primary-900 dark:text-white truncate max-w-[200px]">
                      {project.title}
                    </p>
                    <p className="text-xs text-primary-400 dark:text-primary-500 truncate max-w-[200px]">
                      /{project.slug}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="min-w-0">
                  <p className="font-medium text-primary-700 dark:text-primary-200 truncate max-w-[150px]">
                    {project.client || "N/A"}
                  </p>
                  {project.location && (
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-primary-400 dark:text-primary-500">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate max-w-[150px]">{project.location}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge variant="secondary">{project.serviceType || "Uncategorized"}</Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant={project.isActive ? "default" : "outline"}>
                  {project.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {project.isFeatured && (
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  {({ open, setOpen }) => (
                    <>
                      <DropdownTrigger onClick={() => setOpen(!open)}>
                        <MoreVertical className="w-4 h-4 text-primary-500" />
                      </DropdownTrigger>
                      <DropdownContent open={open}>
                        <DropdownItem onClick={() => {
                          setOpen(false)
                          router.push(`/projects/${project._id}`)
                        }}>
                          <Eye className="w-4 h-4" />
                          View Details
                        </DropdownItem>
                        <DropdownItem onClick={() => {
                          setOpen(false)
                          router.push(`/projects/add?edit=${project._id}`)
                        }}>
                          <Pencil className="w-4 h-4" />
                          Edit Project
                        </DropdownItem>
                        <DropdownItem onClick={() => {
                          setOpen(false)
                          onToggle(project._id)
                        }}>
                          {project.isActive ? (
                            <ToggleLeft className="w-4 h-4" />
                          ) : (
                            <ToggleRight className="w-4 h-4" />
                          )}
                          {project.isActive ? "Deactivate" : "Activate"}
                        </DropdownItem>
                        <DropdownItem
                          variant="destructive"
                          onClick={() => {
                            setOpen(false)
                            onDelete(project)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownItem>
                      </DropdownContent>
                    </>
                  )}
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}