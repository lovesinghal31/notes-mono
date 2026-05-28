import { DeleteAccountCard } from "@/components/delete-account-card"
import { Sparkles } from "lucide-react"

export default function DeleteAccountPage() {
  return (
    <div className="bg-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 sm:p-6 md:p-10">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-100 w-150 -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />

      <div className="animate-fade-in relative z-10 flex flex-col items-center gap-8">
        <div className="mb-2 flex items-center gap-2">
          <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="gradient-text text-base font-bold tracking-tight">
            Now, let's delete your account!
          </span>
        </div>

        <div className="w-full max-w-sm">
          <DeleteAccountCard />
        </div>
      </div>
    </div>
  )
}
