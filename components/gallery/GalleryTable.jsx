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
import { MoreVertical, Eye, Pencil, Trash2, ToggleLeft, ToggleRight, LayoutGrid } from "lucide-react"

export default function GalleryTable({ items, onToggle, onDelete }) {
  const router = useRouter()
  const tableRef = useRef(null)

  useEffect(() => {
    if (!tableRef.current || items.length === 0) return
    const rows = tableRef.current.querySelectorAll("tbody tr")
    gsap.fromTo(
      rows,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.4, ease: "power2.out" }
    )
  }, [items])

  return (
    <div ref={tableRef}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image & Caption</TableHead>
            <TableHead className="hidden sm:table-cell">Category</TableHead>
            <TableHead className="hidden lg:table-cell">Grid Span (Col x Row)</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {item.image?.url ? (
                    <img
                      src={item.image.url}
                      alt={item.caption || "Gallery image"}
                      className="w-14 h-14 rounded-lg object-cover shrink-0 border border-primary-100 dark:border-white/10"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-primary-100 dark:bg-white/10 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-primary-900 dark:text-white truncate max-w-[200px] md:max-w-[300px]">
                      {item.caption || "No caption provided"}
                    </p>
                    <p className="text-xs text-primary-400 dark:text-primary-500 mt-0.5">
                      Order: {item.order ?? 0}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant="secondary">{item.category || "Uncategorized"}</Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="flex items-center gap-1.5 text-primary-600 dark:text-primary-300 text-sm">
                  <LayoutGrid className="w-4 h-4 text-primary-400" />
                  {item.colSpan} x {item.rowSpan}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant={item.isActive ? "default" : "outline"}>
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
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
                          router.push(`/gallery/${item._id}`)
                        }}>
                          <Eye className="w-4 h-4" />
                          View Image
                        </DropdownItem>
                        <DropdownItem onClick={() => {
                          setOpen(false)
                          router.push(`/gallery/add?edit=${item._id}`)
                        }}>
                          <Pencil className="w-4 h-4" />
                          Edit Details
                        </DropdownItem>
                        <DropdownItem onClick={() => {
                          setOpen(false)
                          onToggle(item._id)
                        }}>
                          {item.isActive ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                          {item.isActive ? "Deactivate" : "Activate"}
                        </DropdownItem>
                        <DropdownItem
                          variant="destructive"
                          onClick={() => {
                            setOpen(false)
                            onDelete(item)
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