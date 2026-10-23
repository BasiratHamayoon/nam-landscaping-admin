"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Button } from "@/components/ui/Button"

export default function TestimonialFilters({ filters, onChange, onClear }) {
  const hasFilters = filters.search || filters.rating || filters.isActive

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <Input
            placeholder="Search name, role, or review..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
        <Select
          value={filters.rating}
          onChange={(e) => onChange({ ...filters, rating: e.target.value })}
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
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