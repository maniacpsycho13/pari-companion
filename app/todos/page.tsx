"use client"

import { useState } from "react"
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
  id: number
  title: string
  subject: string
  exam: "UPSC" | "CAT"
  priority: "low" | "medium" | "high"
  deadline?: Date
  completed: boolean
  description?: string
}

export default function TodoManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Current Affairs - January 2025",
      subject: "Current Affairs",
      exam: "UPSC",
      priority: "high",
      deadline: new Date(2025, 0, 15),
      completed: false,
      description: "Cover all major events from January 2025",
    },
    {
      id: 2,
      title: "Quantitative Aptitude - Percentages",
      subject: "Quantitative Aptitude",
      exam: "CAT",
      priority: "medium",
      deadline: new Date(2025, 0, 20),
      completed: true,
      description: "Complete all percentage problems and formulas",
    },
    {
      id: 3,
      title: "Polity - Fundamental Rights",
      subject: "Polity",
      exam: "UPSC",
      priority: "high",
      deadline: new Date(2025, 0, 18),
      completed: false,
      description: "Study Articles 12-35 in detail",
    },
  ])

  const [newTask, setNewTask] = useState<Partial<Task>>({})
  const [filterExam, setFilterExam] = useState<string>("all")
  const [filterSubject, setFilterSubject] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const subjects = {
    UPSC: ["Polity", "Economy", "Current Affairs", "Essay Writing", "History", "Geography"],
    CAT: ["Quantitative Aptitude", "Verbal Ability", "Logical Reasoning", "Data Interpretation"],
  }

  const addTask = () => {
    if (newTask.title && newTask.subject && newTask.exam) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        subject: newTask.subject,
        exam: newTask.exam as "UPSC" | "CAT",
        priority: newTask.priority || "medium",
        deadline: newTask.deadline,
        completed: false,
        description: newTask.description,
      }
      setTasks([...tasks, task])
      setNewTask({})
      setIsAddDialogOpen(false)
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    const examMatch = filterExam === "all" || task.exam === filterExam
    const subjectMatch = filterSubject === "all" || task.subject === filterSubject
    return examMatch && subjectMatch
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
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
                    value={newTask.priority || "medium"}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value as "low" | "medium" | "high" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
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
              {filteredTasks.map((task) => (
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
                            <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                            {task.deadline && <Badge variant="secondary">Due: {format(task.deadline, "MMM dd")}</Badge>}
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

          <TabsContent value="UPSC" className="space-y-4">
            <div className="grid gap-4">
              {filteredTasks
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
                              <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                              {task.deadline && (
                                <Badge variant="secondary">Due: {format(task.deadline, "MMM dd")}</Badge>
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
              {filteredTasks
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
                              <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                              {task.deadline && (
                                <Badge variant="secondary">Due: {format(task.deadline, "MMM dd")}</Badge>
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
