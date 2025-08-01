"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Plus, Search, Tag, Edit, Trash2, BookOpen } from "lucide-react"

interface Note {
  id: number
  title: string
  content: string
  subject: string
  exam: "UPSC" | "CAT"
  tags: string[]
  type: "learning" | "summary" | "revision" | "custom"
  createdAt: Date
  updatedAt: Date
}

export default function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Fundamental Rights - Key Points",
      content:
        "Article 12-35 covers Fundamental Rights. Key points:\n1. Right to Equality (Art 14-18)\n2. Right to Freedom (Art 19-22)\n3. Right against Exploitation (Art 23-24)\n4. Right to Freedom of Religion (Art 25-28)\n5. Cultural and Educational Rights (Art 29-30)\n6. Right to Constitutional Remedies (Art 32)",
      subject: "Polity",
      exam: "UPSC",
      tags: ["fundamental-rights", "constitution", "articles"],
      type: "learning",
      createdAt: new Date(2025, 0, 10),
      updatedAt: new Date(2025, 0, 10),
    },
    {
      id: 2,
      title: "Percentage Formulas - Quick Reference",
      content:
        "Important percentage formulas:\n1. Percentage = (Part/Whole) × 100\n2. Increase% = (New-Old)/Old × 100\n3. Decrease% = (Old-New)/Old × 100\n4. Successive percentage: If two changes of a% and b%, final change = a + b + (ab/100)%",
      subject: "Quantitative Aptitude",
      exam: "CAT",
      tags: ["formulas", "percentage", "quick-reference"],
      type: "revision",
      createdAt: new Date(2025, 0, 8),
      updatedAt: new Date(2025, 0, 8),
    },
    {
      id: 3,
      title: "Current Affairs - January 2025 Summary",
      content:
        "Key events from January 2025:\n1. Economic Survey highlights\n2. Budget 2025 key announcements\n3. International relations updates\n4. Science and technology developments\n5. Awards and recognitions",
      subject: "Current Affairs",
      exam: "UPSC",
      tags: ["january-2025", "budget", "economy"],
      type: "summary",
      createdAt: new Date(2025, 0, 12),
      updatedAt: new Date(2025, 0, 12),
    },
  ])

  const [newNote, setNewNote] = useState<Partial<Note>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [filterExam, setFilterExam] = useState<string>("all")
  const [filterSubject, setFilterSubject] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const subjects = {
    UPSC: ["Polity", "Economy", "Current Affairs", "Essay Writing", "History", "Geography"],
    CAT: ["Quantitative Aptitude", "Verbal Ability", "Logical Reasoning", "Data Interpretation"],
  }

  const noteTypes = [
    { value: "learning", label: "Learning Notes" },
    { value: "summary", label: "Lecture Summary" },
    { value: "revision", label: "Revision Points" },
    { value: "custom", label: "Custom Notes" },
  ]

  const addNote = () => {
    if (newNote.title && newNote.content && newNote.subject && newNote.exam) {
      const note: Note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        subject: newNote.subject,
        exam: newNote.exam as "UPSC" | "CAT",
        tags: newNote.tags || [],
        type: (newNote.type as "learning" | "summary" | "revision" | "custom") || "custom",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setNotes([note, ...notes])
      setNewNote({})
      setIsAddDialogOpen(false)
    }
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const filteredNotes = notes.filter((note) => {
    const searchMatch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const examMatch = filterExam === "all" || note.exam === filterExam
    const subjectMatch = filterSubject === "all" || note.subject === filterSubject
    const typeMatch = filterType === "all" || note.type === filterType
    return searchMatch && examMatch && subjectMatch && typeMatch
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "learning":
        return "bg-blue-100 text-blue-800"
      case "summary":
        return "bg-green-100 text-green-800"
      case "revision":
        return "bg-yellow-100 text-yellow-800"
      case "custom":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Notes Section
            </h1>
            <p className="text-gray-600 mt-2">Capture and organize your learning journey 📝</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
                <DialogDescription>Add a new note to your study collection.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Note Title</Label>
                  <Input
                    id="title"
                    value={newNote.title || ""}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="Enter note title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="exam">Exam</Label>
                    <Select
                      value={newNote.exam || ""}
                      onValueChange={(value) => setNewNote({ ...newNote, exam: value as "UPSC" | "CAT", subject: "" })}
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
                  {newNote.exam && (
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select
                        value={newNote.subject || ""}
                        onValueChange={(value) => setNewNote({ ...newNote, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects[newNote.exam as keyof typeof subjects].map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Note Type</Label>
                  <Select
                    value={newNote.type || "custom"}
                    onValueChange={(value) =>
                      setNewNote({ ...newNote, type: value as "learning" | "summary" | "revision" | "custom" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select note type" />
                    </SelectTrigger>
                    <SelectContent>
                      {noteTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={newNote.tags?.join(", ") || ""}
                    onChange={(e) =>
                      setNewNote({
                        ...newNote,
                        tags: e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="e.g., formulas, important, revision"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newNote.content || ""}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Write your note content here..."
                    rows={8}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addNote}>Create Note</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {noteTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline">{note.exam}</Badge>
                        <Badge variant="outline">{note.subject}</Badge>
                        <Badge className={getTypeColor(note.type)}>
                          {noteTypes.find((t) => t.value === note.type)?.label}
                        </Badge>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedNote(note)}>
                      <BookOpen className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-4 mb-4">{note.content}</p>
                {note.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap mb-3">
                    {note.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500">Created: {note.createdAt.toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No notes found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterExam !== "all" || filterSubject !== "all" || filterType !== "all"
                  ? "Try adjusting your search or filters"
                  : "Create your first note to get started"}
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Note
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Note Detail Dialog */}
        <Dialog open={!!selectedNote} onOpenChange={() => setSelectedNote(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            {selectedNote && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedNote.title}</DialogTitle>
                  <DialogDescription>
                    <div className="flex gap-2 flex-wrap mt-2">
                      <Badge variant="outline">{selectedNote.exam}</Badge>
                      <Badge variant="outline">{selectedNote.subject}</Badge>
                      <Badge className={getTypeColor(selectedNote.type)}>
                        {noteTypes.find((t) => t.value === selectedNote.type)?.label}
                      </Badge>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{selectedNote.content}</div>
                  {selectedNote.tags.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <Label className="text-sm font-medium">Tags:</Label>
                      <div className="flex gap-1 flex-wrap mt-2">
                        {selectedNote.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                    <p>Created: {selectedNote.createdAt.toLocaleDateString()}</p>
                    <p>Last updated: {selectedNote.updatedAt.toLocaleDateString()}</p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
