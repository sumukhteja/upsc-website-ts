"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  User,
  ArrowLeft,
  Camera,
  Save,
  Bell,
  Shield,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Target,
  Settings,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Edit3,
} from "lucide-react"
import Link from "next/link"

// Mock user profile data
const mockProfile = {
  personalInfo: {
    fullName: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1995-08-15",
    location: "New Delhi, India",
    bio: "Aspiring civil servant preparing for UPSC CSE 2024. Passionate about public service and social change.",
    joinedDate: "2023-06-15",
    avatar: "/placeholder.svg?height=120&width=120&text=PS",
  },
  preferences: {
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    studyReminders: true,
    darkMode: false,
    language: "English",
    timezone: "Asia/Kolkata",
  },
  goals: {
    dailyQuizzes: 3,
    weeklyStudyHours: 35,
    targetExamYear: 2024,
    preferredSubjects: ["History", "Geography", "Polity"],
    currentFocus: "Prelims",
  },
  stats: {
    memberSince: "June 2023",
    totalQuizzes: 247,
    studyHours: 456,
    averageScore: 78,
    rank: 156,
    badges: 8,
    streak: 12,
  },
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState(mockProfile)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (status === "loading") return
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setIsEditing(false)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleInputChange = (section: string, field: string, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <Link href="/" className="text-2xl font-bold text-black">
                UPSC Master
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-700 font-medium">Profile</span>
            </div>

            <div className="flex items-center space-x-4">
              {saveSuccess && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Profile updated!</span>
                </div>
              )}

              {isEditing ? (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} disabled={isSaving} className="bg-black hover:bg-gray-800">
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={() => setIsEditing(true)} variant="outline">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <User className="h-10 w-10 text-black" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Your <span className="text-black">Profile</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your account settings and study preferences
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={session.user?.image || profileData.personalInfo.avatar}
                    alt={session.user?.name || "Profile"}
                    className="w-24 h-24 rounded-full border-4 border-black object-cover"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {session.user?.name || profileData.personalInfo.fullName}
                </h2>
                <p className="text-gray-600 mb-4">{session.user?.email}</p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member since</span>
                    <span className="font-medium">{profileData.stats.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Current Rank</span>
                    <span className="font-medium text-black">#{profileData.stats.rank}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Study Streak</span>
                    <span className="font-medium">{profileData.stats.streak} days</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-black">{profileData.stats.totalQuizzes}</div>
                      <div className="text-xs text-gray-600">Quizzes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-black">{profileData.stats.badges}</div>
                      <div className="text-xs text-gray-600">Badges</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="goals">Study Goals</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-black" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={profileData.personalInfo.fullName}
                          onChange={(e) => handleInputChange("personalInfo", "fullName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.personalInfo.email}
                            onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            value={profileData.personalInfo.phone}
                            onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="dob"
                            type="date"
                            value={profileData.personalInfo.dateOfBirth}
                            onChange={(e) => handleInputChange("personalInfo", "dateOfBirth", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="location"
                            value={profileData.personalInfo.location}
                            onChange={(e) => handleInputChange("personalInfo", "location", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.personalInfo.bio}
                          onChange={(e) => handleInputChange("personalInfo", "bio", e.target.value)}
                          disabled={!isEditing}
                          rows={3}
                          placeholder="Tell us about yourself and your UPSC journey..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences */}
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-black" />
                      Preferences & Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notifications
                      </h3>

                      <div className="space-y-4 pl-7">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailNotifications">Email Notifications</Label>
                            <p className="text-sm text-gray-600">Receive updates via email</p>
                          </div>
                          <Switch
                            id="emailNotifications"
                            checked={profileData.preferences.emailNotifications}
                            onCheckedChange={(checked) =>
                              handleInputChange("preferences", "emailNotifications", checked)
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="pushNotifications">Push Notifications</Label>
                            <p className="text-sm text-gray-600">Browser push notifications</p>
                          </div>
                          <Switch
                            id="pushNotifications"
                            checked={profileData.preferences.pushNotifications}
                            onCheckedChange={(checked) =>
                              handleInputChange("preferences", "pushNotifications", checked)
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="weeklyReports">Weekly Progress Reports</Label>
                            <p className="text-sm text-gray-600">Get weekly study summaries</p>
                          </div>
                          <Switch
                            id="weeklyReports"
                            checked={profileData.preferences.weeklyReports}
                            onCheckedChange={(checked) => handleInputChange("preferences", "weeklyReports", checked)}
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="studyReminders">Study Reminders</Label>
                            <p className="text-sm text-gray-600">Daily study reminders</p>
                          </div>
                          <Switch
                            id="studyReminders"
                            checked={profileData.preferences.studyReminders}
                            onCheckedChange={(checked) => handleInputChange("preferences", "studyReminders", checked)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">Display Settings</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <select
                            id="language"
                            value={profileData.preferences.language}
                            onChange={(e) => handleInputChange("preferences", "language", e.target.value)}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                          >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <select
                            id="timezone"
                            value={profileData.preferences.timezone}
                            onChange={(e) => handleInputChange("preferences", "timezone", e.target.value)}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                          >
                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                            <option value="UTC">UTC</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Study Goals */}
              <TabsContent value="goals">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-black" />
                      Study Goals & Targets
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="dailyQuizzes">Daily Quiz Target</Label>
                        <Input
                          id="dailyQuizzes"
                          type="number"
                          min="1"
                          max="10"
                          value={profileData.goals.dailyQuizzes}
                          onChange={(e) => handleInputChange("goals", "dailyQuizzes", Number.parseInt(e.target.value))}
                          disabled={!isEditing}
                        />
                        <p className="text-sm text-gray-600">Number of quizzes per day</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weeklyHours">Weekly Study Hours</Label>
                        <Input
                          id="weeklyHours"
                          type="number"
                          min="5"
                          max="70"
                          value={profileData.goals.weeklyStudyHours}
                          onChange={(e) =>
                            handleInputChange("goals", "weeklyStudyHours", Number.parseInt(e.target.value))
                          }
                          disabled={!isEditing}
                        />
                        <p className="text-sm text-gray-600">Target study hours per week</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="examYear">Target Exam Year</Label>
                        <select
                          id="examYear"
                          value={profileData.goals.targetExamYear}
                          onChange={(e) =>
                            handleInputChange("goals", "targetExamYear", Number.parseInt(e.target.value))
                          }
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                        >
                          <option value={2024}>2024</option>
                          <option value={2025}>2025</option>
                          <option value={2026}>2026</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentFocus">Current Focus</Label>
                        <select
                          id="currentFocus"
                          value={profileData.goals.currentFocus}
                          onChange={(e) => handleInputChange("goals", "currentFocus", e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                        >
                          <option value="Prelims">Prelims Preparation</option>
                          <option value="Mains">Mains Preparation</option>
                          <option value="Interview">Interview Preparation</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Subjects</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          "History",
                          "Geography",
                          "Polity",
                          "Economics",
                          "Science & Tech",
                          "Environment",
                          "Ethics",
                          "Current Affairs",
                        ].map((subject) => (
                          <label key={subject} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={profileData.goals.preferredSubjects.includes(subject)}
                              onChange={(e) => {
                                const newSubjects = e.target.checked
                                  ? [...profileData.goals.preferredSubjects, subject]
                                  : profileData.goals.preferredSubjects.filter((s) => s !== subject)
                                handleInputChange("goals", "preferredSubjects", newSubjects)
                              }}
                              disabled={!isEditing}
                              className="rounded border-gray-300 text-black focus:ring-black"
                            />
                            <span className="text-sm">{subject}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security */}
              <TabsContent value="security">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-black" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Change Password</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <div className="relative">
                              <Input
                                id="currentPassword"
                                type={showPassword ? "text" : "password"}
                                disabled={!isEditing}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type={showPassword ? "text" : "password"} disabled={!isEditing} />
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Account created:</span>
                            <span>{profileData.personalInfo.joinedDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last login:</span>
                            <span>Today at 2:30 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Login method:</span>
                            <span>{session.provider === "google" ? "Google OAuth" : "Email & Password"}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        Danger Zone
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-red-600 mb-2">Delete Account</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
