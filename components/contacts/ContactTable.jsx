"use client"

import { useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table"
import { Badge } from "@/components/ui/Badge"
import { DropdownMenu, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui/DropdownMenu"
import { MoreVertical, Eye, Trash2, Mail, CheckCircle2, Archive, Clock } from "lucide-react"

const statusConfig = {
  Unread: { color: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30", icon: Clock },
  Read: { color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30", icon: Eye },
  Replied: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30", icon: CheckCircle2 },
  Archived: { color: "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400 border-gray-200 dark:border-gray-500/30", icon: Archive },
}

export default function ContactTable({ items, onStatusChange, onDelete }) {
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
            <TableHead>Contact Info</TableHead>
            <TableHead className="hidden sm:table-cell">Service / Subject</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const StatusIcon = statusConfig[item.status]?.icon || Clock
            const statusClass = statusConfig[item.status]?.color || ""

            return (
              <TableRow key={item._id} className={item.status === "Unread" ? "bg-primary-50/30 dark:bg-white/[0.02]" : ""}>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-primary-500" />
                    </div>
                    <div className="min-w-0">
                      <p className={`font-medium truncate max-w-[200px] ${item.status === "Unread" ? "text-primary-900 dark:text-white font-semibold" : "text-primary-800 dark:text-primary-100"}`}>
                        {item.name}
                      </p>
                      <p className="text-xs text-primary-500 dark:text-primary-400 truncate max-w-[200px]">
                        {item.email}
                      </p>
                      {item.phone && (
                        <p className="text-xs text-primary-400 dark:text-primary-500 truncate mt-0.5">
                          {item.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary" className="mb-1">{item.serviceOfInterest || "General Inquiry"}</Badge>
                  <p className="text-sm text-primary-500 truncate max-w-[200px]">
                    {item.message?.substring(0, 40)}{item.message?.length > 40 ? "..." : ""}
                  </p>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-sm text-primary-600 dark:text-primary-300">
                    {new Date(item.createdAt).toLocaleDateString("en-AE", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </span>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusClass}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {item.status}
                  </div>
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
                            router.push(`/contacts/${item._id}`)
                          }}>
                            <Eye className="w-4 h-4" />
                            View Message
                          </DropdownItem>
                          <DropdownItem onClick={() => {
                            setOpen(false)
                            onStatusChange(item._id, "Read")
                          }}>
                            <Eye className="w-4 h-4 text-blue-500" />
                            Mark as Read
                          </DropdownItem>
                          <DropdownItem onClick={() => {
                            setOpen(false)
                            onStatusChange(item._id, "Replied")
                          }}>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            Mark as Replied
                          </DropdownItem>
                          <DropdownItem onClick={() => {
                            setOpen(false)
                            onStatusChange(item._id, "Archived")
                          }}>
                            <Archive className="w-4 h-4 text-gray-500" />
                            Archive
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
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}