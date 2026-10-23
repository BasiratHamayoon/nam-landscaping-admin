"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import toast from "react-hot-toast"
import { Inbox } from "lucide-react"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { Dialog, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import ContactFilters from "@/components/contacts/ContactFilters"
import ContactTable from "@/components/contacts/ContactTable"
import { fetchContacts, updateContactStatus, deleteContact } from "@/store/slices/contactsSlice"

export default function ContactsPage() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((s) => s.contacts)
  const headerRef = useRef(null)

  const [filters, setFilters] = useState({ search: "", status: "", serviceOfInterest: "" })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const loadContacts = useCallback(() => {
    const params = {}
    if (filters.search) params.search = filters.search
    if (filters.status) params.status = filters.status
    if (filters.serviceOfInterest) params.serviceOfInterest = filters.serviceOfInterest
    dispatch(fetchContacts(params))
  }, [dispatch, filters])

  useEffect(() => {
    const timeout = setTimeout(loadContacts, 300)
    return () => clearTimeout(timeout)
  }, [loadContacts])

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }
    )
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateContactStatus({ id, status })).unwrap()
      toast.success(`Marked as ${status}`)
    } catch (err) {
      toast.error(err || "Failed to update status")
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await dispatch(deleteContact(deleteTarget._id)).unwrap()
      toast.success("Message deleted")
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
          <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">Inbox</h1>
          <p className="text-sm text-primary-500 dark:text-primary-400">Manage client inquiries and messages</p>
        </div>
      </div>

      <ContactFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters({ search: "", status: "", serviceOfInterest: "" })}
      />

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Inbox is empty"
          description={filters.search || filters.status || filters.serviceOfInterest 
            ? "No messages match your current filters." 
            : "You don't have any messages yet."}
        />
      ) : (
        <ContactTable items={items} onStatusChange={handleStatusChange} onDelete={setDeleteTarget} />
      )}

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Message</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the message from "{deleteTarget?.name}"? This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} loading={deleting}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}