"use client"

import { Search, X, Filter } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/cn"

const categories = [
  { value: "", label: "All Categories" },
  { value: "Landscaping", label: "Landscaping" },
  { value: "Hardscaping", label: "Hardscaping" },
  { value: "Irrigation", label: "Irrigation" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Design", label: "Design" },
  { value: "Lighting", label: "Lighting" },
  { value: "Water Features", label: "Water Features" },
  { value: "Outdoor Living", label: "Outdoor Living" },
  { value: "Tree Care", label: "Tree Care" },
  { value: "Seasonal", label: "Seasonal" },
  { value: "Other", label: "Other" },
]

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
]

const featuredOptions = [
  { value: "", label: "All" },
  { value: "true", label: "Featured" },
  { value: "false", label: "Not Featured" },
]

export default function ServiceFilters({ filters, onChange, onClear }) {
  const hasFilters = filters.search || filters.category || filters.isActive || filters.isFeatured

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <Input
            placeholder="Search services..."
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
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </Select>

        <Select
          value={filters.isFeatured}
          onChange={(e) => onChange({ ...filters, isFeatured: e.target.value })}
        >
          {featuredOptions.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
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