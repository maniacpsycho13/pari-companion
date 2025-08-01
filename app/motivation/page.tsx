"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, RefreshCw, Target, Calendar, Star, Trophy, Sparkles, Quote } from "lucide-react"

export default function MotivationCorner() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [currentTime] = useState(new Date())

  const motivationalQuotes = [
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts. You've got this, Pari! 🌟",
      author: "ullu 🐥",
      category: "Perseverance",
    },
    {
      text: "Every small step you take today brings you closer to your IAS dream. Keep pushing forward! 💪",
      author: "ullu 🐥",
      category: "Progress",
    },
    {
      text: "The difference between ordinary and extraordinary is that little 'extra'. You have that extra, Pari! ✨",
      author: "ullu 🐥",
      category: "Excellence",
    },
    {
      text: "Your dedication today is building the foundation for your success tomorrow. Stay consistent! 🏗️",
      author: "ullu 🐥",
      category: "Consistency",
    },
    {
      text: "Remember, every expert was once a beginner. Every pro was once an amateur. Keep learning! 📚",
      author: "ullu 🐥",
      category: "Learning",
    },
    {
      text: "The path to IAS is challenging, but so are you. Embrace the challenge and grow stronger! 🦋",
      author: "ullu 🐥",
      category: "Strength",
    },
  ]

  const personalizedMessages = [
    {
      title: "Morning Motivation",
      message:
        "Good morning, future IAS officer! Today is another opportunity to get closer to your dreams. Start with confidence! ☀️",
      time: "morning",
      icon: "🌅",
    },
    {
      title: "Study Break Reminder",
      message:
        "You've been working hard! Remember to take breaks, stay hydrated, and be kind to yourself. You're doing amazing! 💧",
      time: "afternoon",
      icon: "☕",
    },
    {
      title: "Evening Reflection",
      message:
        "As the day ends, reflect on what you've learned. Every bit of knowledge is a step towards your goal. Sleep well! 🌙",
      time: "evening",
      icon: "🌟",
    },
  ]

  const examCountdown = {
    upsc: Math.ceil((new Date("2026-06-07").getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)),
    cat: Math.ceil((new Date("2025-11-24").getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)),
  }

  const achievements = [
    { title: "12-Day Study Streak", icon: "🔥", description: "Consistent daily progress!" },
    { title: "127 Tasks Completed", icon: "✅", description: "Amazing productivity!" },
    { title: "45 Hours Studied", icon: "⏰", description: "Dedicated effort!" },
    { title: "23 Notes Created", icon: "📝", description: "Knowledge building!" },
  ]

  const goals = [
    { title: "IAS 2026", progress: 65, color: "from-purple-600 to-pink-600" },
    { title: "CAT 2025", progress: 78, color: "from-blue-600 to-indigo-600" },
    { title: "Daily Study Goal", progress: 85, color: "from-green-600 to-emerald-600" },
  ]

  const getTimeBasedMessage = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return personalizedMessages[0]
    if (hour < 18) return personalizedMessages[1]
    return personalizedMessages[2]
  }

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Motivation Corner
          </h1>
          <p className="text-gray-600">Your daily dose of inspiration and encouragement 💖</p>
        </div>

        {/* Daily Quote */}
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Quote className="w-6 h-6" />
              Daily Motivation from ullu 🐥
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <blockquote className="text-lg italic text-gray-700 leading-relaxed">
                &quot;{motivationalQuotes[currentQuoteIndex].text}&quot;
              </blockquote>
              <div className="flex justify-center items-center gap-4">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  {motivationalQuotes[currentQuoteIndex].category}
                </Badge>
                <Button variant="outline" onClick={nextQuote} className="bg-white">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Quote
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time-based Personal Message */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Heart className="w-5 h-5 text-red-500" />
              Personal Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-3">
              <div className="text-4xl">{getTimeBasedMessage().icon}</div>
              <h3 className="text-xl font-semibold text-blue-800">{getTimeBasedMessage().title}</h3>
              <p className="text-blue-700 leading-relaxed">{getTimeBasedMessage().message}</p>
            </div>
          </CardContent>
        </Card>

        {/* Exam Countdown Goals */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-purple-700 flex items-center justify-center gap-2">
                <Target className="w-6 h-6" />
                IAS 2026 Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl font-bold text-purple-800">{examCountdown.upsc}</div>
              <p className="text-purple-600 text-lg">days to achieve your dream</p>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-purple-700 text-xl mb-2">🎯 IAS 2026</h3>
                <p className="text-purple-600 text-sm">Serving the nation, making a difference</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-100 to-blue-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-indigo-700 flex items-center justify-center gap-2">
                <Trophy className="w-6 h-6" />
                CAT 2025 Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl font-bold text-indigo-800">{examCountdown.cat}</div>
              <p className="text-indigo-600 text-lg">days to MBA success</p>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-indigo-700 text-xl mb-2">📈 Top B-School</h3>
                <p className="text-indigo-600 text-sm">Building leadership skills</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Your Progress Goals
            </CardTitle>
            <CardDescription>Visual representation of your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{goal.title}</span>
                    <span className="text-sm text-gray-600">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${goal.color} transition-all duration-500`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Your Achievements
            </CardTitle>
            <CardDescription>Celebrate your wins, big and small! 🎉</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspirational Banners */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white">
            <CardContent className="text-center py-8">
              <h2 className="text-3xl font-bold mb-2">✨ Dream Big ✨</h2>
              <p className="text-lg opacity-90">Your potential is limitless</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
            <CardContent className="text-center py-8">
              <h2 className="text-3xl font-bold mb-2">🚀 Stay Focused 🚀</h2>
              <p className="text-lg opacity-90">Success is just around the corner</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Motivation Challenge */}
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Calendar className="w-5 h-5" />
              This Week&apos;s Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl">🎯</div>
              <h3 className="text-xl font-semibold text-green-800">Complete 5 Mock Tests This Week</h3>
              <p className="text-green-700">
                Challenge yourself to take one mock test each day. Track your progress and identify areas for
                improvement!
              </p>
              <div className="flex justify-center gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Accept Challenge</Button>
                <Button variant="outline" className="border-green-600 text-green-600 bg-transparent">
                  View Progress
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Affirmations */}
        <Card className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
          <CardHeader>
            <CardTitle className="text-center text-purple-700">Daily Affirmations 🌸</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-3">
              <p className="text-lg font-medium text-purple-800">I am capable of achieving my dreams</p>
              <p className="text-lg font-medium text-purple-800">Every day I grow stronger and wiser</p>
              <p className="text-lg font-medium text-purple-800">I trust in my preparation and abilities</p>
              <p className="text-lg font-medium text-purple-800">Success flows to me naturally</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
