"use client"

import { useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table"
import { Badge } from "@/components/ui/Badge"
import { DropdownMenu, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui/DropdownMenu"
import { MoreVertical, Eye, Pencil, Trash2, ToggleLeft, ToggleRight, Star, User } from "lucide-react"

export default function TestimonialTable({ items, onToggle, onDelete }) {
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
            <TableHead>Client</TableHead>
            <TableHead className="hidden md:table-cell">Review Snippet</TableHead>
            <TableHead className="hidden sm:table-cell">Rating</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {item.avatar?.url ? (
                    <img
                      src={item.avatar.url}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-primary-100 dark:border-white/10"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-white/10 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-primary-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-primary-900 dark:text-white truncate max-w-[150px]">
                      {item.name}
                    </p>
                    <p className="text-xs text-primary-400 dark:text-primary-500 truncate max-w-[150px]">
                      {item.role || "Client"}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <p className="text-sm text-primary-600 dark:text-primary-300 truncate max-w-[300px] italic">
                  "{item.content}"
                </p>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < item.rating
                          ? "fill-amber-500 text-amber-500"
                          : "fill-primary-100 text-primary-200 dark:fill-white/10 dark:text-white/20"
                      }`}
                    />
                  ))}
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
                          router.push(`/testimonials/${item._id}`)
                        }}>
                          <Eye className="w-4 h-4" />
                          View Details
                        </DropdownItem>
                        <DropdownItem onClick={() => {
                          setOpen(false)
                          router.push(`/testimonials/add?edit=${item._id}`)
                        }}>
                          <Pencil className="w-4 h-4" />
                          Edit Testimonial
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