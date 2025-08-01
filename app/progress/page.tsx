"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Target, BookOpen, Clock, Award, BarChart3 } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function ProgressTracker() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const subjectProgress = [
    { name: "Quantitative Aptitude", progress: 75, exam: "CAT", totalTopics: 20, completedTopics: 15, hoursSpent: 45 },
    { name: "Verbal Ability", progress: 60, exam: "CAT", totalTopics: 15, completedTopics: 9, hoursSpent: 32 },
    { name: "Logical Reasoning", progress: 45, exam: "CAT", totalTopics: 18, completedTopics: 8, hoursSpent: 28 },
    { name: "Polity", progress: 80, exam: "UPSC", totalTopics: 25, completedTopics: 20, hoursSpent: 65 },
    { name: "Economy", progress: 55, exam: "UPSC", totalTopics: 22, completedTopics: 12, hoursSpent: 38 },
    { name: "Current Affairs", progress: 90, exam: "UPSC", totalTopics: 12, completedTopics: 11, hoursSpent: 42 },
    { name: "Essay Writing", progress: 35, exam: "UPSC", totalTopics: 10, completedTopics: 4, hoursSpent: 15 },
    { name: "History", progress: 70, exam: "UPSC", totalTopics: 30, completedTopics: 21, hoursSpent: 55 },
  ]

  const weeklyProgress = [
    { week: "Week 1", upsc: 45, cat: 35, total: 40 },
    { week: "Week 2", upsc: 52, cat: 42, total: 47 },
    { week: "Week 3", upsc: 58, cat: 48, total: 53 },
    { week: "Week 4", upsc: 65, cat: 55, total: 60 },
    { week: "Week 5", upsc: 70, cat: 62, total: 66 },
    { week: "Week 6", upsc: 75, cat: 68, total: 72 },
  ]

  const dailyStudyHours = [
    { day: "Mon", hours: 6, target: 8 },
    { day: "Tue", hours: 7, target: 8 },
    { day: "Wed", hours: 5, target: 8 },
    { day: "Thu", hours: 8, target: 8 },
    { day: "Fri", hours: 6, target: 8 },
    { day: "Sat", hours: 9, target: 8 },
    { day: "Sun", hours: 7, target: 8 },
  ]

  const examDistribution = [
    { name: "UPSC", value: 65, color: "#8b5cf6" },
    { name: "CAT", value: 35, color: "#06b6d4" },
  ]

  const overallStats = {
    totalHours: 320,
    completedTasks: 127,
    averageScore: 78,
    streak: 12,
    totalSubjects: 8,
    completedSubjects: 2,
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600"
    if (progress >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressBg = (progress: number) => {
    if (progress >= 80) return "bg-green-100"
    if (progress >= 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Progress Tracker
            </h1>
            <p className="text-gray-600 mt-2">Monitor your journey towards success 📊</p>
          </div>

          <div className="flex items-center gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="text-center pt-6">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{overallStats.totalHours}</div>
              <p className="text-sm text-gray-600">Total Hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center pt-6">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{overallStats.completedTasks}</div>
              <p className="text-sm text-gray-600">Tasks Done</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center pt-6">
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600">{overallStats.averageScore}%</div>
              <p className="text-sm text-gray-600">Avg Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center pt-6">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{overallStats.streak}</div>
              <p className="text-sm text-gray-600">Day Streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center pt-6">
              <BookOpen className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-indigo-600">{overallStats.totalSubjects}</div>
              <p className="text-sm text-gray-600">Subjects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center pt-6">
              <BarChart3 className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-600">{overallStats.completedSubjects}</div>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="subjects" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="subjects">Subject Progress</TabsTrigger>
            <TabsTrigger value="trends">Progress Trends</TabsTrigger>
            <TabsTrigger value="daily">Daily Activity</TabsTrigger>
            <TabsTrigger value="distribution">Study Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Progress</CardTitle>
                <CardDescription>Detailed breakdown of your progress in each subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjectProgress.map((subject, index) => (
                    <div key={index} className={`p-4 rounded-lg ${getProgressBg(subject.progress)}`}>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">{subject.exam}</Badge>
                            <Badge variant="secondary">{subject.hoursSpent}h studied</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getProgressColor(subject.progress)}`}>
                            {subject.progress}%
                          </div>
                          <p className="text-sm text-gray-600">
                            {subject.completedTopics}/{subject.totalTopics} topics
                          </p>
                        </div>
                      </div>
                      <Progress value={subject.progress} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Trends</CardTitle>
                <CardDescription>Your learning journey over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="upsc" stroke="#8b5cf6" strokeWidth={3} name="UPSC" />
                      <Line type="monotone" dataKey="cat" stroke="#06b6d4" strokeWidth={3} name="CAT" />
                      <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} name="Overall" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="daily" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Study Hours</CardTitle>
                <CardDescription>Your daily study pattern vs target</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyStudyHours}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#8b5cf6" name="Actual Hours" />
                      <Bar dataKey="target" fill="#e5e7eb" name="Target Hours" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Study Time Distribution</CardTitle>
                  <CardDescription>How you&apos;re dividing your time between exams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={examDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {examDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                  <CardDescription>Key insights about your progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-1">🎉 Strengths</h4>
                    <p className="text-sm text-green-700">Current Affairs and Polity are your strongest subjects!</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-1">⚡ Focus Areas</h4>
                    <p className="text-sm text-yellow-700">Essay Writing and Logical Reasoning need more attention.</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-1">📈 Trend</h4>
                    <p className="text-sm text-blue-700">You&apos;re showing consistent improvement week over week!</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-1">🎯 Goal Status</h4>
                    <p className="text-sm text-purple-700">On track to meet your study targets for both exams.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
