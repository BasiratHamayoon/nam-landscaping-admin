"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { Lock, KeyRound, Save, Eye, EyeOff } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { fetchApi } from "@/lib/api"

export function PasswordForm() {
  const [loading, setLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false })
  const [formData, setFormData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match")
      return
    }
    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    setLoading(true)
    try {
      await fetchApi("/auth/update-password", {
        method: "PUT",
        body: { currentPassword: formData.currentPassword, newPassword: formData.newPassword },
      })
      toast.success("Password updated successfully")
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const PasswordInput = ({ id, label, field, placeholder }) => (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          id={id}
          type={showPasswords[field] ? "text" : "password"}
          value={formData[field === "current" ? "currentPassword" : field === "new" ? "newPassword" : "confirmPassword"]}
          onChange={(e) => setFormData({
            ...formData,
            [field === "current" ? "currentPassword" : field === "new" ? "newPassword" : "confirmPassword"]: e.target.value
          })}
          className="pl-11 pr-11"
          placeholder={placeholder}
          required
        />
        <button
          type="button"
          onClick={() => setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] })}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {showPasswords[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-primary-600" />
          Change Password
        </CardTitle>
        <CardDescription>Update your password to keep your account secure</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput id="currentPassword" label="Current Password" field="current" placeholder="Enter current password" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PasswordInput id="newPassword" label="New Password" field="new" placeholder="At least 8 characters" />
            <PasswordInput id="confirmPassword" label="Confirm New Password" field="confirm" placeholder="Re-enter new password" />
          </div>

          <Button type="submit" loading={loading}>
            <Save className="w-4 h-4" />
            Update Password
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}