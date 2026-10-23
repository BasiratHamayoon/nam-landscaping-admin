"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { Globe, Save } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { fetchSettings, updateSettings } from "@/store/slices/settingsSlice"

export function SiteSettingsForm() {
  const dispatch = useDispatch()
  const { data, loading, saving } = useSelector((state) => state.settings)

  const [form, setForm] = useState({
    siteInfo: { siteName: "", footerText: "" },
    contact: { email: "", phonePrimary: "", whatsapp: "", address: "" },
    socialLinks: { facebook: "", instagram: "", linkedin: "" },
  })

  useEffect(() => {
    dispatch(fetchSettings())
  }, [dispatch])

  useEffect(() => {
    if (data) {
      setForm({
        siteInfo: {
          siteName: data.siteInfo?.siteName || "",
          footerText: data.siteInfo?.footerText || "",
        },
        contact: {
          email: data.contact?.email || "",
          phonePrimary: data.contact?.phonePrimary || "",
          whatsapp: data.contact?.whatsapp || "",
          address: data.contact?.address || "",
        },
        socialLinks: {
          facebook: data.socialLinks?.facebook || "",
          instagram: data.socialLinks?.instagram || "",
          linkedin: data.socialLinks?.linkedin || "",
        },
      })
    }
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updateSettings({
        siteInfo: JSON.stringify(form.siteInfo),
        contact: JSON.stringify(form.contact),
        socialLinks: JSON.stringify(form.socialLinks),
      })).unwrap()
      toast.success("Site settings updated")
    } catch (err) {
      toast.error(err)
    }
  }

  const updateField = (section, field, value) => {
    setForm({ ...form, [section]: { ...form[section], [field]: value } })
  }

  if (loading) return <Card className="p-10 text-center text-muted-foreground">Loading settings...</Card>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary-600" />
          Site Settings
        </CardTitle>
        <CardDescription>Manage global website information shown on your public site</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Site Info</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Site Name</Label>
                <Input value={form.siteInfo.siteName} onChange={(e) => updateField("siteInfo", "siteName", e.target.value)} />
              </div>
              <div>
                <Label>Footer Text</Label>
                <Input value={form.siteInfo.footerText} onChange={(e) => updateField("siteInfo", "footerText", e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input value={form.contact.email} onChange={(e) => updateField("contact", "email", e.target.value)} />
              </div>
              <div>
                <Label>Primary Phone</Label>
                <Input value={form.contact.phonePrimary} onChange={(e) => updateField("contact", "phonePrimary", e.target.value)} />
              </div>
              <div>
                <Label>WhatsApp (without +)</Label>
                <Input value={form.contact.whatsapp} onChange={(e) => updateField("contact", "whatsapp", e.target.value)} />
              </div>
              <div>
                <Label>Address</Label>
                <Input value={form.contact.address} onChange={(e) => updateField("contact", "address", e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Social Links</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Facebook URL</Label>
                <Input value={form.socialLinks.facebook} onChange={(e) => updateField("socialLinks", "facebook", e.target.value)} />
              </div>
              <div>
                <Label>Instagram URL</Label>
                <Input value={form.socialLinks.instagram} onChange={(e) => updateField("socialLinks", "instagram", e.target.value)} />
              </div>
              <div>
                <Label>LinkedIn URL</Label>
                <Input value={form.socialLinks.linkedin} onChange={(e) => updateField("socialLinks", "linkedin", e.target.value)} />
              </div>
            </div>
          </div>

          <Button type="submit" loading={saving}>
            <Save className="w-4 h-4" />
            Save Site Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}