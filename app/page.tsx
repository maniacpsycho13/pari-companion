"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, Heart, Star, Target, TrendingUp } from "lucide-react"

interface Task {
  id: string
  title: string
  subject: string
  exam: 'UPSC' | 'CAT'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  completed: boolean
}

interface SubjectProgress {
  id: string
  name: string
  exam: 'UPSC' | 'CAT'
  progress: number
  totalTopics: number
  completedTopics: number
  hoursSpent: number
}

interface DashboardData {
  tasks: Task[]
  subjectProgress: SubjectProgress[]
  totalTasks: number
  totalNotes: number
}

export default function Dashboard() {
  const [currentTime] = useState(new Date())
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  const examCountdown = {
    upsc: Math.ceil((new Date("2026-06-07").getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)),
    cat: Math.ceil((new Date("2025-11-24").getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)),
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTask = async (taskId: string) => {
    if (!dashboardData) return

    try {
      const task = dashboardData.tasks.find(t => t.id === taskId)
      if (!task) return

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      })

      if (response.ok) {
        setDashboardData(prev => ({
          ...prev!,
          tasks: prev!.tasks.map(t =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          )
        }))
      }
    } catch (error) {
      console.error('Failed to toggle task:', error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'destructive'
      case 'MEDIUM': return 'default'
      case 'LOW': return 'secondary'
      default: return 'default'
    }
  }

  const motivationalQuote = "Success is not final, failure is not fatal: it is the courage to continue that counts. You've got this! 🌟"

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome back! 🌸
          </h1>
          <p className="text-lg text-gray-600">Ready to conquer your dreams today?</p>
        </div>

        {/* Exam Countdown Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-purple-700">UPSC 2026</CardTitle>
              <CardDescription className="text-lg">Your IAS Dream</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-purple-800 mb-2">{examCountdown.upsc}</div>
              <p className="text-purple-600">days to go</p>
              <div className="mt-4 p-3 bg-white rounded-lg">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-700">IAS 2026 🎯</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-100 to-blue-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-indigo-700">CAT 2025</CardTitle>
              <CardDescription className="text-lg">MBA Gateway</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-indigo-800 mb-2">{examCountdown.cat}</div>
              <p className="text-indigo-600">days to go</p>
              <div className="mt-4 p-3 bg-white rounded-lg">
                <TrendingUp className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-indigo-700">Top B-School 📈</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Today&apos;s Tasks
            </CardTitle>
            <CardDescription>Stay focused, stay strong! 💪</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData?.tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No tasks for today. Great job staying organized!</p>
                </div>
              ) : (
                dashboardData?.tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-4 h-4 rounded-full ${task.completed ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <div>
                        <p className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                          {task.title}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {task.exam}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {task.subject}
                          </Badge>
                          <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                            {task.priority.toLowerCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Clock className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Subject Progress
            </CardTitle>
            <CardDescription>Look how far you&apos;ve come! 🚀</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {dashboardData?.subjectProgress.length === 0 ? (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  <p>No progress data available. Start studying to see your progress!</p>
                </div>
              ) : (
                dashboardData?.subjectProgress.map((subject) => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{subject.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {subject.exam}
                        </Badge>
                        <span className="text-sm text-gray-600">{subject.progress}%</span>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Motivation Corner */}
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Heart className="w-5 h-5 text-red-500" />
              Daily Motivation 🐥
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <p className="text-lg italic text-gray-700 mb-4">&quot;{motivationalQuote}&quot;</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="bg-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Plan Today
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Start Studying</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{dashboardData?.totalTasks || 0}</div>
              <p className="text-sm text-gray-600">Tasks Completed</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {dashboardData?.subjectProgress.reduce((acc, curr) => acc + curr.hoursSpent, 0) || 0}
              </div>
              <p className="text-sm text-gray-600">Study Hours</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">{dashboardData?.totalNotes || 0}</div>
              <p className="text-sm text-gray-600">Notes Created</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <p className="text-sm text-gray-600">Day Streak</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
                          
