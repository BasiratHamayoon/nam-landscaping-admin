"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Button } from "@/components/ui/Button"

export default function ContactFilters({ filters, onChange, onClear }) {
  const hasFilters = filters.search || filters.status || filters.serviceOfInterest

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <Input
            placeholder="Search name, email, or phone..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
        <Select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="Unread">Unread</option>
          <option value="Read">Read</option>
          <option value="Replied">Replied</option>
          <option value="Archived">Archived</option>
        </Select>
        <Select
          value={filters.serviceOfInterest}
          onChange={(e) => onChange({ ...filters, serviceOfInterest: e.target.value })}
        >
          <option value="">All Services</option>
          <option value="Landscaping">Landscaping</option>
          <option value="Hardscaping">Hardscaping</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Design">Design</option>
          <option value="Other">Other</option>
        </Select>
        {hasFilters && (
          <Button variant="outline" onClick={onClear} className="gap-2 shrink-0">
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}