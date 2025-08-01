"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
import { CalendarIcon, Plus, Trash2, Edit, Filter } from "lucide-react"
import { format } from "date-fns"

interface Task {
  id: string
  title: string
  subject: string
  exam: "UPSC" | "CAT"
  priority: "LOW" | "MEDIUM" | "HIGH"
  deadline?: string
  completed: boolean
  description?: string
  createdAt: string
}

export default function TodoManagement() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [newTask, setNewTask] = useState<Partial<Task & { deadline?: Date }>>({})
  const [filterExam, setFilterExam] = useState<string>("all")
  const [filterSubject, setFilterSubject] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const subjects = {
    UPSC: ["Polity", "Economy", "Current Affairs", "Essay Writing", "History", "Geography"],
    CAT: ["Quantitative Aptitude", "Verbal Ability", "Logical Reasoning", "Data Interpretation"],
  }

  useEffect(() => {
    fetchTasks()
  }, [filterExam, filterSubject])

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams()
      if (filterExam !== "all") params.append("exam", filterExam)
      if (filterSubject !== "all") params.append("subject", filterSubject)

      const response = await fetch(`/api/tasks?${params.toString()}`)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async () => {
    if (newTask.title && newTask.subject && newTask.exam) {
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newTask.title,
            subject: newTask.subject,
            exam: newTask.exam,
            priority: newTask.priority || "MEDIUM",
            deadline: newTask.deadline?.toISOString(),
            description: newTask.description,
          })
        })

        if (response.ok) {
          const createdTask = await response.json()
          setTasks([...tasks, createdTask])
          setNewTask({})
          setIsAddDialogOpen(false)
        }
      } catch (error) {
        console.error('Failed to create task:', error)
      }
    }
  }

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      })

      if (response.ok) {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
      }
    } catch (error) {
      console.error('Failed to toggle task:', error)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "destructive"
      case "MEDIUM":
        return "default"
      case "LOW":
        return "secondary"
      default:
        return "default"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tasks...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              To-Do Management
            </h1>
            <p className="text-gray-600 mt-2">Organize your study tasks efficiently 📚</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>Create a new study task to keep yourself organized.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title || ""}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="exam">Exam</Label>
                  <Select
                    value={newTask.exam || ""}
                    onValueChange={(value) => setNewTask({ ...newTask, exam: value as "UPSC" | "CAT", subject: "" })}
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
                {newTask.exam && (
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={newTask.subject || ""}
                      onValueChange={(value) => setNewTask({ ...newTask, subject: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects[newTask.exam as keyof typeof subjects].map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority || "MEDIUM"}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value as "LOW" | "MEDIUM" | "HIGH" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTask.deadline ? format(newTask.deadline, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newTask.deadline}
                        onSelect={(date) => setNewTask({ ...newTask, deadline: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    value={newTask.description || ""}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Add task description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addTask}>Add Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="space-y-2">
                <Label>Exam</Label>
                <Select value={filterExam} onValueChange={setFilterExam}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="UPSC">UPSC</SelectItem>
                    <SelectItem value="CAT">CAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {Object.values(subjects)
                      .flat()
                      .map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks by Exam */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="UPSC">UPSC Tasks</TabsTrigger>
            <TabsTrigger value="CAT">CAT Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {tasks.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <div className="text-gray-400 mb-4">📋</div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No tasks found</h3>
                    <p className="text-gray-500 mb-4">Create your first task to get started</p>
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Task
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                tasks.map((task) => (
                  <Card key={task.id} className={`${task.completed ? "opacity-75" : ""}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(task.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h3 className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
                              {task.title}
                            </h3>
                            {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline">{task.exam}</Badge>
                              <Badge variant="outline">{task.subject}</Badge>
                              <Badge variant={getPriorityColor(task.priority)}>{task.priority.toLowerCase()}</Badge>
                              {task.deadline && (
                                <Badge variant="secondary">
                                  Due: {format(new Date(task.deadline), "MMM dd")}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="UPSC" className="space-y-4">
            <div className="grid gap-4">
              {tasks
                .filter((task) => task.exam === "UPSC")
                .map((task) => (
                  <Card key={task.id} className={`${task.completed ? "opacity-75" : ""}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(task.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h3 className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
                              {task.title}
                            </h3>
                            {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline">{task.subject}</Badge>
                              <Badge variant={getPriorityColor(task.priority)}>{task.priority.toLowerCase()}</Badge>
                              {task.deadline && (
                                <Badge variant="secondary">
                                  Due: {format(new Date(task.deadline), "MMM dd")}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="CAT" className="space-y-4">
            <div className="grid gap-4">
              {tasks
                .filter((task) => task.exam === "CAT")
                .map((task) => (
                  <Card key={task.id} className={`${task.completed ? "opacity-75" : ""}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(task.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h3 className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
                              {task.title}
                            </h3>
                            {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline">{task.subject}</Badge>
                              <Badge variant={getPriorityColor(task.priority)}>{task.priority.toLowerCase()}</Badge>
                              {task.deadline && (
                                <Badge variant="secondary">
                                  Due: {format(new Date(task.deadline), "MMM dd")}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}