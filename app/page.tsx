"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, Heart, Star, Target, TrendingUp } from "lucide-react"

export default function Dashboard() {
  const [currentTime] = useState(new Date())

  const examCountdown = {
    upsc: Math.ceil((new Date("2026-06-07").getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)),
    cat: Math.ceil((new Date("2025-11-24").getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)),
  }

  const todaysTasks = [
    {
      id: 1,
      title: "Current Affairs - January 2025",
      subject: "Current Affairs",
      exam: "UPSC",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Quantitative Aptitude - Percentages",
      subject: "Quantitative Aptitude",
      exam: "CAT",
      priority: "medium",
      completed: true,
    },
    {
      id: 3,
      title: "Polity - Fundamental Rights",
      subject: "Polity",
      exam: "UPSC",
      priority: "high",
      completed: false,
    },
  ]

  const subjectProgress = [
    { name: "Quantitative Aptitude", progress: 75, exam: "CAT" },
    { name: "Verbal Ability", progress: 60, exam: "CAT" },
    { name: "Logical Reasoning", progress: 45, exam: "CAT" },
    { name: "Polity", progress: 80, exam: "UPSC" },
    { name: "Economy", progress: 55, exam: "UPSC" },
    { name: "Current Affairs", progress: 90, exam: "UPSC" },
  ]

  const motivationalQuote =
    "Success is not final, failure is not fatal: it is the courage to continue that counts. You've got this, Pari! 🌟"

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome back, Pari! 🌸
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
              {todaysTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${task.completed ? "bg-green-500" : "bg-gray-300"}`} />
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
                        <Badge variant={task.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Clock className="w-4 h-4" />
                  </Button>
                </div>
              ))}
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
              {subjectProgress.map((subject) => (
                <div key={subject.name} className="space-y-2">
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
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Motivation Corner */}
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Heart className="w-5 h-5 text-red-500" />
              Daily Motivation from ullu 🐥
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
              <div className="text-2xl font-bold text-green-600">127</div>
              <p className="text-sm text-gray-600">Tasks Completed</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <p className="text-sm text-gray-600">Study Hours</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">23</div>
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
