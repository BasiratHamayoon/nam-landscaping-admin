"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Button } from "@/components/ui/Button"

const categories = [
  { value: "", label: "All Categories" },
  { value: "Landscaping", label: "Landscaping" },
  { value: "Hardscaping", label: "Hardscaping" },
  { value: "Before & After", label: "Before & After" },
  { value: "Pools & Water", label: "Pools & Water" },
  { value: "Lighting", label: "Lighting" },
]

export default function GalleryFilters({ filters, onChange, onClear }) {
  const hasFilters = filters.search || filters.category || filters.isActive

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <Input
            placeholder="Search captions..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
        <Select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </Select>
        <Select
          value={filters.isActive}
          onChange={(e) => onChange({ ...filters, isActive: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
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