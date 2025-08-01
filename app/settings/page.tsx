"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, User, Bell, Palette, Database, Shield, Moon, Sun, Download, Upload } from "lucide-react"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: false,
    push: true,
    dailyReminders: true,
    weeklyProgress: true,
    examReminders: true,
  })

  const [profile, setProfile] = useState({
    name: "Pari",
    email: "pari@example.com",
    phone: "+91 98765 43210",
    targetYear: "2026",
    preferredExam: "UPSC",
  })

  const [studyPreferences, setStudyPreferences] = useState({
    dailyTarget: "8",
    studyStartTime: "06:00",
    studyEndTime: "22:00",
    breakDuration: "15",
    reminderFrequency: "30",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 mt-2">Customize your study companion experience ⚙️</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Study Preferences</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="data">Data & Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and exam preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Pari" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      P
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Profile Picture</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetYear">Target Year</Label>
                    <Select
                      value={profile.targetYear}
                      onValueChange={(value) => setProfile({ ...profile, targetYear: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredExam">Primary Exam Focus</Label>
                    <Select
                      value={profile.preferredExam}
                      onValueChange={(value) => setProfile({ ...profile, preferredExam: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UPSC">UPSC (Primary)</SelectItem>
                        <SelectItem value="CAT">CAT (Primary)</SelectItem>
                        <SelectItem value="Both">Both Equally</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to receive reminders and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive study reminders and progress updates via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>WhatsApp Notifications</Label>
                      <p className="text-sm text-gray-600">Get daily motivation and reminders on WhatsApp</p>
                    </div>
                    <Switch
                      checked={notifications.whatsapp}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, whatsapp: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-600">Browser notifications for immediate alerts</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Daily Study Reminders</Label>
                      <p className="text-sm text-gray-600">Get reminded to start your daily study sessions</p>
                    </div>
                    <Switch
                      checked={notifications.dailyReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, dailyReminders: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Weekly Progress Reports</Label>
                      <p className="text-sm text-gray-600">Receive weekly summaries of your progress</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyProgress}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyProgress: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Exam Date Reminders</Label>
                      <p className="text-sm text-gray-600">Important reminders about upcoming exam dates</p>
                    </div>
                    <Switch
                      checked={notifications.examReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, examReminders: checked })}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Study Preferences
                </CardTitle>
                <CardDescription>Customize your study schedule and targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dailyTarget">Daily Study Target (hours)</Label>
                    <Select
                      value={studyPreferences.dailyTarget}
                      onValueChange={(value) => setStudyPreferences({ ...studyPreferences, dailyTarget: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="10">10 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
                    <Select
                      value={studyPreferences.breakDuration}
                      onValueChange={(value) => setStudyPreferences({ ...studyPreferences, breakDuration: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="20">20 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studyStartTime">Preferred Study Start Time</Label>
                    <Input
                      id="studyStartTime"
                      type="time"
                      value={studyPreferences.studyStartTime}
                      onChange={(e) => setStudyPreferences({ ...studyPreferences, studyStartTime: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studyEndTime">Preferred Study End Time</Label>
                    <Input
                      id="studyEndTime"
                      type="time"
                      value={studyPreferences.studyEndTime}
                      onChange={(e) => setStudyPreferences({ ...studyPreferences, studyEndTime: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reminderFrequency">Reminder Frequency (minutes)</Label>
                    <Select
                      value={studyPreferences.reminderFrequency}
                      onValueChange={(value) => setStudyPreferences({ ...studyPreferences, reminderFrequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                        <SelectItem value="120">Every 2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>Customize the look and feel of your study companion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      Dark Mode
                    </Label>
                    <p className="text-sm text-gray-600">Switch to dark theme for comfortable night study sessions</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Theme Colors</Label>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg border-2 border-purple-600"></div>
                      <p className="text-sm text-center">Purple-Pink</p>
                      <Badge variant="default" className="w-full justify-center">
                        Current
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"></div>
                      <p className="text-sm text-center">Blue-Indigo</p>
                      <Badge variant="outline" className="w-full justify-center">
                        Available
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg"></div>
                      <p className="text-sm text-center">Green-Emerald</p>
                      <Badge variant="outline" className="w-full justify-center">
                        Available
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg"></div>
                      <p className="text-sm text-center">Orange-Red</p>
                      <Badge variant="outline" className="w-full justify-center">
                        Available
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Apply Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Management
                </CardTitle>
                <CardDescription>Manage your study data and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">Cloud Backup</h3>
                    <p className="text-sm text-blue-700 mb-3">
                      Your data is automatically backed up to secure cloud storage. Last backup: Today at 2:30 PM
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Backup Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Data
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Data Export</h3>
                    <p className="text-sm text-green-700 mb-3">
                      Export all your study data including tasks, notes, and progress reports
                    </p>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export All Data
                    </Button>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-2">Privacy Settings</h3>
                    <p className="text-sm text-yellow-700 mb-3">
                      Your data is private and secure. We never share your personal information.
                    </p>
                    <Button variant="outline" size="sm">
                      <Shield className="w-4 h-4 mr-2" />
                      View Privacy Policy
                    </Button>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h3 className="font-semibold text-red-800 mb-2">Danger Zone</h3>
                    <p className="text-sm text-red-700 mb-3">
                      Permanently delete all your data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" size="sm">
                      Delete All Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
