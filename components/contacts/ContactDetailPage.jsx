"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import toast from "react-hot-toast"
import {
  ArrowLeft, Mail, Phone, Calendar, User, Clock, Eye, CheckCircle2, Archive, Save, ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"
import { Label } from "@/components/ui/Label"
import { fetchContactById, updateContactStatus, updateContactNotes, clearCurrentContact } from "@/store/slices/contactsSlice"

const statusConfig = {
  Unread: { color: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20", icon: Clock },
  Read: { color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20", icon: Eye },
  Replied: { color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20", icon: CheckCircle2 },
  Archived: { color: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20", icon: Archive },
}

export default function ContactDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentContact: contact, detailLoading, actionLoading } = useSelector((s) => s.contacts)
  const containerRef = useRef(null)

  const [notes, setNotes] = useState("")

  useEffect(() => {
    dispatch(fetchContactById(id)).unwrap().then((data) => {
      setNotes(data.notes || "")
      // Auto-mark as read if it was unread
      if (data.status === "Unread") {
        dispatch(updateContactStatus({ id, status: "Read" }))
      }
    })
    return () => dispatch(clearCurrentContact())
  }, [id, dispatch])

  useEffect(() => {
    if (!containerRef.current || detailLoading) return
    const elements = containerRef.current.querySelectorAll("[data-animate]")
    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power2.out", delay: 0.1 }
    )
  }, [detailLoading, contact])

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    try {
      await dispatch(updateContactStatus({ id, status: newStatus })).unwrap()
      toast.success(`Marked as ${newStatus}`)
    } catch (err) {
      toast.error(err || "Failed to update status")
    }
  }

  const handleSaveNotes = async () => {
    try {
      await dispatch(updateContactNotes({ id, notes })).unwrap()
      toast.success("Notes saved successfully")
    } catch (err) {
      toast.error(err || "Failed to save notes")
    }
  }

  if (detailLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-primary-500 mb-4">Message not found</p>
        <Button variant="outline" onClick={() => router.push("/contacts")}>Back to Inbox</Button>
      </div>
    )
  }

  const StatusIcon = statusConfig[contact.status]?.icon || Clock
  const statusClass = statusConfig[contact.status]?.color || ""

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto space-y-6">
      <div data-animate className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/contacts")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">
              Message Details
            </h1>
          </div>
        </div>
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${statusClass}`}>
          <StatusIcon className="w-4 h-4" />
          <span className="font-semibold text-sm">{contact.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card data-animate className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white">Client Information</h2>
              <Badge variant="secondary">{contact.serviceOfInterest || "General Inquiry"}</Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-xs text-primary-400 uppercase tracking-wider font-semibold mb-0.5">Name</p>
                  <p className="font-medium text-primary-900 dark:text-white">{contact.name}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-xs text-primary-400 uppercase tracking-wider font-semibold mb-0.5">Email</p>
                  <a href={`mailto:${contact.email}`} className="font-medium text-primary-600 dark:text-primary-300 hover:underline flex items-center gap-1.5">
                    {contact.email} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-xs text-primary-400 uppercase tracking-wider font-semibold mb-0.5">Phone</p>
                  {contact.phone ? (
                    <a href={`tel:${contact.phone}`} className="font-medium text-primary-600 dark:text-primary-300 hover:underline flex items-center gap-1.5">
                      {contact.phone} <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <p className="font-medium text-primary-500">Not provided</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-xs text-primary-400 uppercase tracking-wider font-semibold mb-0.5">Date Received</p>
                  <p className="font-medium text-primary-900 dark:text-white">
                    {new Date(contact.createdAt).toLocaleString("en-AE", {
                      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card data-animate className="p-6">
            <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-4">Message</h2>
            <Separator className="mb-4" />
            <div className="bg-primary-50/50 dark:bg-[#0a0f0c] p-5 rounded-xl border border-primary-100 dark:border-white/5">
              <p className="text-primary-700 dark:text-primary-200 whitespace-pre-line leading-relaxed">
                {contact.message}
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card data-animate className="p-6">
            <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-4">Actions</h2>
            <Separator className="mb-4" />
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Update Status</Label>
                <Select id="status" value={contact.status} onChange={handleStatusChange} disabled={actionLoading}>
                  <option value="Unread">Unread</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                  <option value="Archived">Archived</option>
                </Select>
              </div>

              <Button 
                variant="default" 
                className="w-full gap-2" 
                onClick={() => window.open(`mailto:${contact.email}`)}
              >
                <Mail className="w-4 h-4" /> Reply via Email
              </Button>
            </div>
          </Card>

          <Card data-animate className="p-6">
            <h2 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-4">Admin Notes</h2>
            <Separator className="mb-4" />
            <p className="text-xs text-primary-500 mb-3">
              These notes are for internal use only and are not visible to the client.
            </p>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about this client..."
              className="min-h-[150px] mb-3"
            />
            <Button onClick={handleSaveNotes} loading={actionLoading} className="w-full gap-2">
              <Save className="w-4 h-4" /> Save Notes
            </Button>
          </Card>
        </div>
      </div>

      <div data-animate className="pb-8" />
    </div>
  )
}