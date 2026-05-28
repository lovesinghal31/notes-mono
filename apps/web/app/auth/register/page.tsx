import { RegisterForm } from "@/components/register-form"
import { CheckCircle2, Sparkles } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="bg-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 sm:p-6 md:p-10">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-100 w-150 -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Left Side */}
        <div className="animate-fade-in flex flex-col justify-center gap-4 px-2 sm:gap-6 sm:p-6">
          <div className="mb-2 flex items-center gap-2">
            <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="gradient-text text-base font-bold tracking-tight">
              Budgetly
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Create your account
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              Join thousands of users managing their notes with ease and
              security. Sign up now to start your journey!
            </p>
          </div>

          <div className="mt-2 space-y-4">
            {[
              {
                title: "Turn Ideas into Action",
                desc: "Capture thoughts, meeting points, and tasks the moment inspiration strikes.",
              },
              {
                title: "Organized Without Effort",
                desc: "Sort notes with categories and tags to keep everything easy to find.",
              },
              {
                title: "Never Forget Important Things",
                desc: "Add reminders and stay ahead of deadlines, plans, and priorities.",
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
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}
