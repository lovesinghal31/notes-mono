import { LoginForm } from "@/components/login-form"
import { CheckCircle2, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="bg-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 sm:p-6 md:p-10">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-100 w-150 -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Left Side: Information */}
        <div className="animate-fade-in flex flex-col justify-center gap-4 px-2 sm:gap-6 sm:p-6">
          <div className="mb-2 flex items-center gap-2">
            <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="gradient-text text-base font-bold tracking-tight">
              Now, let's log you in!
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              Sign in to continue managing your finances smarter.
            </p>
          </div>

          <div className="mt-2 space-y-4">
            {[
              {
                title: "Write Without Limits",
                desc: "Capture everything from quick ideas to detailed notes in one place.",
              },
              {
                title: "Find Notes Faster",
                desc: "Search, organize, and manage your notes effortlessly whenever you need them.",
              },
              {
                title: "Your Notes, Everywhere",
                desc: "Securely access your notes anytime across all your devices.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card flex items-start gap-3 rounded-xl p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div
          className="animate-fade-in flex flex-col items-center justify-center"
          style={{ animationDelay: "150ms" }}
        >
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
