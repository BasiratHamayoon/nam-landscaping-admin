"use client"

import Link from "next/link"
import { Mail, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
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
    <Card>
      <CardHeader className="flex items-center justify-between flex-row">
        <div>
          <CardTitle>Recent Inquiries</CardTitle>
          <CardDescription>Latest leads from your website</CardDescription>
        </div>
        <Link href="/contacts" className="text-sm text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="p-6 text-center text-muted-foreground text-sm">Loading...</div>
        ) : contacts?.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground text-sm">
            <Mail className="w-10 h-10 mx-auto mb-3 opacity-50" />
            No inquiries yet
          </div>
        ) : (
          <div className="divide-y divide-border">
            {contacts?.map((contact) => (
              <Link
                key={contact._id}
                href={`/contacts/${contact._id}`}
                className="flex items-center gap-4 p-4 hover:bg-muted transition-colors"
              >
                <Avatar name={contact.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-foreground truncate">{contact.name}</p>
                    <Badge variant={statusVariants[contact.status]}>{contact.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{contact.message}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatRelativeTime(contact.createdAt)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}