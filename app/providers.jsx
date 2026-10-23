"use client"

import { ThemeProvider } from "next-themes"
import { ReduxProvider } from "@/store/provider"
import { Toaster } from "react-hot-toast"

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ReduxProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--color-card)",
              color: "var(--color-foreground)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
            },
          }}
        />
      </ReduxProvider>
    </ThemeProvider>
  )
}