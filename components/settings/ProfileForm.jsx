"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { User, Mail, Save } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Avatar } from "@/components/ui/Avatar"
import { fetchApi } from "@/lib/api"
import { updateAdmin } from "@/store/slices/authSlice"

export function ProfileForm() {
  const dispatch = useDispatch()
  const { admin } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetchApi("/auth/update-profile", { method: "PUT", body: formData })
      dispatch(updateAdmin(res.data))
      toast.success("Profile updated successfully")
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal details and email address</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-5">
            <Avatar name={admin?.name} src={admin?.avatar?.url} size="xl" />
            <div>
              <p className="text-sm font-semibold text-foreground">{admin?.name}</p>
              <p className="text-xs text-muted-foreground">{admin?.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-11"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-11"
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" loading={loading}>
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}