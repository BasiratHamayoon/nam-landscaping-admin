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
import { MoreVertical, Eye, Pencil, Trash2, Star, ToggleLeft, ToggleRight } from "lucide-react"

export default function ServiceTable({ services, onToggle, onDelete }) {
  const router = useRouter()
  const tableRef = useRef(null)

  useEffect(() => {
    if (!tableRef.current || services.length === 0) return
    const rows = tableRef.current.querySelectorAll("tbody tr")
    gsap.fromTo(
      rows,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.4, ease: "power2.out" }
    )
  }, [services])

  return (
    <div ref={tableRef}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden lg:table-cell">Pricing</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="hidden sm:table-cell">Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {service.coverImage?.url ? (
                    <img
                      src={service.coverImage.url}
                      alt={service.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-white/10 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-primary-900 dark:text-white truncate max-w-[200px]">
                      {service.title}
                    </p>
                    <p className="text-xs text-primary-400 dark:text-primary-500 truncate max-w-[200px]">
                      /{service.slug}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="secondary">{service.category || "Uncategorized"}</Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {service.pricing?.startingPrice ? (
                  <span className="text-sm font-medium">
                    {service.pricing.currency || "AED"} {service.pricing.startingPrice}
                    {service.pricing.unit && (
                      <span className="text-primary-400 dark:text-primary-500 font-normal">/{service.pricing.unit}</span>
                    )}
                  </span>
                ) : (
                  <span className="text-primary-400 dark:text-primary-500 text-sm">-</span>
                )}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant={service.isActive ? "default" : "outline"}>
                  {service.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {service.isFeatured && (
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
                          router.push(`/services/${service._id}`)
                        }}>
                          <Eye className="w-4 h-4" />
                          View Details
                        </DropdownItem>
                        <DropdownItem onClick={() => {
                          setOpen(false)
                          router.push(`/services/add?edit=${service._id}`)
                        }}>
                          <Pencil className="w-4 h-4" />
                          Edit Service
                        </DropdownItem>
                        <DropdownItem onClick={() => {
                          setOpen(false)
                          onToggle(service._id)
                        }}>
                          {service.isActive ? (
                            <ToggleLeft className="w-4 h-4" />
                          ) : (
                            <ToggleRight className="w-4 h-4" />
                          )}
                          {service.isActive ? "Deactivate" : "Activate"}
                        </DropdownItem>
                        <DropdownItem
                          variant="danger"
                          onClick={() => {
                            setOpen(false)
                            onDelete(service)
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