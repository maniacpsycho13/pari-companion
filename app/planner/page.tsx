"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Plus, Clock, Bell, Edit, Trash2 } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek } from "date-fns"

interface StudySession {
  id: string
  title: string
  subject: string
  exam: "UPSC" | "CAT"
  startTime: string
  endTime: string
  date: string
  type: "STUDY" | "REVISION" | "MOCK_TEST" | "BREAK"
  reminder: boolean
  completed: boolean
}

export default function StudyPlanner() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [loading, setLoading] = useState(true)
  const [newSession, setNewSession] = useState<Partial<StudySession>>({})
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"daily" | "weekly" | "monthly">("daily")

  const subjects = {
    UPSC: ["Polity", "Economy", "Current Affairs", "Essay Writing", "History", "Geography"],
    CAT: ["Quantitative Aptitude", "Verbal Ability", "Logical Reasoning", "Data Interpretation"],
  }

  const sessionTypes = [
    { value: "STUDY", label: "Study Session", color: "bg-blue-100 text-blue-800" },
    { value: "REVISION", label: "Revision", color: "bg-green-100 text-green-800" },
    { value: "MOCK_TEST", label: "Mock Test", color: "bg-red-100 text-red-800" },
    { value: "BREAK", label: "Break", color: "bg-gray-100 text-gray-800" },
  ]

  useEffect(() => {
    fetchSessions()
  }, [selectedDate])

  const fetchSessions = async () => {
    try {
      const params = new URLSearchParams()
      params.append("date", selectedDate.toISOString())

      const response = await fetch(`/api/sessions?${params.toString()}`)
      const data = await response.json()
      setSessions(data)
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const addSession = async () => {
    if (newSession.title && newSession.subject && newSession.exam && newSession.startTime && newSession.endTime) {
      try {
        const response = await fetch('/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newSession.title,
            subject: newSession.subject,
            exam: newSession.exam,
            startTime: newSession.startTime,
            endTime: newSession.endTime,
            date: selectedDate.toISOString(),
            type: newSession.type || "STUDY",
            reminder: newSession.reminder || false,
          })
        })

        if (response.ok) {
          const createdSession = await response.json()
          setSessions([...sessions, createdSession])
          setNewSession({})
          setIsAddDialogOpen(false)
        }
      } catch (error) {
        console.error('Failed to create session:', error)
      }
    }
  }

  const toggleSession = async (id: string) => {
    const session = sessions.find(s => s.id === id)
    if (!session) return

    try {
      const response = await fetch(`/api/sessions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !session.completed })
      })

      if (response.ok) {
        setSessions(
          sessions.map((session) => (session.id === id ? { ...session, completed: !session.completed } : session))
        )
      }
    } catch (error) {
      console.error('Failed to toggle session:', error)
    }
  }

  const deleteSession = async (id: string) => {
    try {
      const response = await fetch(`/api/sessions/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setSessions(sessions.filter((session) => session.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete session:', error)
    }
  }

  const getSessionsForDate = (date: Date) => {
    const dateString = date.toDateString()
    return sessions
      .filter((session) => new Date(session.date).toDateString() === dateString)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  const getWeekSessions = () => {
    const weekStart = startOfWeek(selectedDate)
    const weekEnd = endOfWeek(selectedDate)
    const weekDays = []

    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i)
      weekDays.push({
        date: day,
        sessions: getSessionsForDate(day),
      })
    }

    return weekDays
  }

  const getTypeColor = (type: string) => {
    const typeObj = sessionTypes.find((t) => t.value === type)
    return typeObj?.color || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading planner...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Study Planner
            </h1>
            <p className="text-gray-600 mt-2">Plan your study schedule effectively 📅</p>
          </div>

          <div className="flex gap-2">
            <Select value={viewMode} onValueChange={(value) => setViewMode(value as "daily" | "weekly" | "monthly")}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Session
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Study Session</DialogTitle>
                  <DialogDescription>Schedule a new study session for {format(selectedDate, "PPP")}.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Session Title</Label>
                    <Input
                      id="title"
                      value={newSession.title || ""}
                      onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                      placeholder="Enter session title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="exam">Exam</Label>
                    <Select
                      value={newSession.exam || ""}
                      onValueChange={(value) =>
                        setNewSession({ ...newSession, exam: value as "UPSC" | "CAT", subject: "" })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UPSC">UPSC</SelectItem>
                        <SelectItem value="CAT">CAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newSession.exam && (
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select
                        value={newSession.subject || ""}
                        onValueChange={(value) => setNewSession({ ...newSession, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects[newSession.exam as keyof typeof subjects].map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="type">Session Type</Label>
                    <Select
                      value={newSession.type || "STUDY"}
                      onValueChange={(value) =>
                        setNewSession({ ...newSession, type: value as "STUDY" | "REVISION" | "MOCK_TEST" | "BREAK" })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {sessionTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newSession.startTime || ""}
                        onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newSession.endTime || ""}
                        onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addSession}>Add Session</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Schedule View */}
          <div className="lg:col-span-3">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "daily" | "weekly" | "monthly")}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily View</TabsTrigger>
                <TabsTrigger value="weekly">Weekly View</TabsTrigger>
                <TabsTrigger value="monthly">Monthly View</TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule for {format(selectedDate, "EEEE, MMMM d, yyyy")}</CardTitle>
                    <CardDescription>Your study sessions for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getSessionsForDate(selectedDate).length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>No sessions scheduled for this day</p>
                          <Button
                            variant="outline"
                            className="mt-4 bg-transparent"
                            onClick={() => setIsAddDialogOpen(true)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add First Session
                          </Button>
                        </div>
                      ) : (
                        getSessionsForDate(selectedDate).map((session) => (
                          <div
                            key={session.id}
                            className={`p-4 rounded-lg border ${session.completed ? "opacity-75 bg-gray-50" : "bg-white"}`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3
                                    className={`font-semibold ${session.completed ? "line-through text-gray-500" : ""}`}
                                  >
                                    {session.title}
                                  </h3>
                                  <Badge className={getTypeColor(session.type)}>
                                    {sessionTypes.find((t) => t.value === session.type)?.label}
                                  </Badge>
                                </div>
                                <div className="flex gap-2 text-sm text-gray-600 mb-2">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {session.startTime} - {session.endTime}
                                  </span>
                                  {session.reminder && (
                                    <span className="flex items-center gap-1">
                                      <Bell className="w-4 h-4" />
                                      Reminder set
                                    </span>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <Badge variant="outline">{session.exam}</Badge>
                                  <Badge variant="outline">{session.subject}</Badge>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant={session.completed ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => toggleSession(session.id)}
                                >
                                  {session.completed ? "Completed" : "Mark Done"}
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => deleteSession(session.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weekly" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Week of {format(startOfWeek(selectedDate), "MMMM d")} -{" "}
                      {format(endOfWeek(selectedDate), "MMMM d, yyyy")}
                    </CardTitle>
                    <CardDescription>Your weekly study schedule</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {getWeekSessions().map((day, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="font-semibold mb-3 text-lg">{format(day.date, "EEEE, MMM d")}</h3>
                          {day.sessions.length === 0 ? (
                            <p className="text-gray-500 text-sm">No sessions scheduled</p>
                          ) : (
                            <div className="space-y-2">
                              {day.sessions.map((session) => (
                                <div
                                  key={session.id}
                                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{session.startTime}</span>
                                    <span className="text-sm">{session.title}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {session.exam}
                                    </Badge>
                                  </div>
                                  <Badge className={`${getTypeColor(session.type)} text-xs`}>
                                    {sessionTypes.find((t) => t.value === session.type)?.label}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monthly" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{format(selectedDate, "MMMM yyyy")} Overview</CardTitle>
                    <CardDescription>Monthly study schedule summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Monthly View</h3>
                      <p className="text-gray-500 mb-4">
                        This feature will show your entire month&apos;s schedule in a calendar format
                      </p>
                      <Badge variant="secondary">Coming Soon</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
} 