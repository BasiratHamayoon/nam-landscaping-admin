"use client"

import Link from "next/link"
import { Mail, ArrowRight, Inbox, Clock } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar } from "@/components/ui/Avatar"
import { formatRelativeTime } from "@/lib/utils"

export function RecentContacts({ contacts, loading }) {
  const statusVariants = {
    Unread: "warning",
    Read: "default",
    Replied: "success",
    Archived: "outline",
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex items-center justify-between flex-row gap-3 border-b border-border bg-gradient-to-r from-primary-50/50 to-transparent dark:from-primary-900/10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
            <Inbox className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>Latest leads from your website</CardDescription>
          </div>
        </div>
        <Link
          href="/contacts"
          className="text-sm text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all shrink-0"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>

      <CardContent className="p-0">
        {loading ? (
          <div className="divide-y divide-border">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-2 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : contacts?.length === 0 ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
              <Mail className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              No inquiries yet
            </p>
            <p className="text-xs text-muted-foreground">
              New leads from your website will appear here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {contacts?.map((contact) => (
              <Link
                key={contact._id}
                href={`/contacts/${contact._id}`}
                className="flex items-center gap-4 p-4 hover:bg-muted/60 transition-colors group"
              >
                <Avatar name={contact.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {contact.name}
                    </p>
                    <Badge variant={statusVariants[contact.status]}>
                      {contact.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {contact.message}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(contact.createdAt)}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}