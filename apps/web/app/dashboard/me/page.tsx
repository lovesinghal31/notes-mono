"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getCurrentUser } from "@/hooks/user"
import { FileText, Mail, User, Calendar, ArrowUpRight } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { IUser } from "@mono-fun/types"

export default function DashboardPage() {
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      setIsFetching(true)
      const resUser = await getCurrentUser()
      console.log("Fetched user:", resUser)
      if (!resUser) {
        router.push("/auth/login")
        return
      }
      setUser(resUser)
      setIsFetching(false)
    }
    fetchUser()
  }, [])

  return (
    <div className="animate-fade-in space-y-8 p-4 md:p-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {isFetching ? (
            <Skeleton className="h-9 w-64" />
          ) : (
            <>
              Welcome back, <span className="gradient-text">{user?.name}</span>
            </>
          )}
        </h1>
        {isFetching ? (
          <Skeleton className="mt-2 h-5 w-48" />
        ) : (
          <p className="mt-1 text-muted-foreground">
            Your personal note-taking workspace
          </p>
        )}
      </div>

      {/* User Info Cards */}
      <div className="stagger-children grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
        {/* User Name */}
        <Card className="glass-card glass-card-hover relative overflow-hidden border-0">
          <div className="accent-bar-emerald absolute top-0 right-0 left-0 h-1" />
          <CardContent className="flex items-center gap-4 py-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
              <User className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-sm text-muted-foreground">Full Name</p>
              {isFetching ? (
                <Skeleton className="h-7 w-28" />
              ) : (
                <p className="text-xl font-bold tracking-tight text-emerald-400 sm:text-2xl">
                  {user?.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Email */}
        <Card className="glass-card glass-card-hover relative overflow-hidden border-0">
          <div className="accent-bar-indigo absolute top-0 right-0 left-0 h-1" />
          <CardContent className="flex items-center gap-4 py-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
              <Mail className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              {isFetching ? (
                <Skeleton className="h-7 w-28" />
              ) : (
                <p className="truncate text-xl font-bold tracking-tight text-indigo-400 sm:text-2xl">
                  {user?.email}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account ID */}
        <Card className="glass-card glass-card-hover relative overflow-hidden border-0">
          <div className="accent-bar-rose absolute top-0 right-0 left-0 h-1" />
          <CardContent className="flex items-center gap-4 py-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/10">
              <Calendar className="h-6 w-6 text-rose-400" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-sm text-muted-foreground">Account ID</p>
              {isFetching ? (
                <Skeleton className="h-7 w-28" />
              ) : (
                <p className="text-xl font-bold tracking-tight text-rose-400 sm:text-2xl">
                  {user?.id}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Profile Section */}
      <div className="stagger-children grid gap-6 md:grid-cols-2">
        {/* Profile Details */}
        <Card className="glass-card border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Profile Information
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {isFetching ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-40" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Full Name
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {user?.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Email Address
                  </p>
                  <p className="mt-1 text-sm font-semibold break-all text-foreground">
                    {user?.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Account ID
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {user?.id}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
