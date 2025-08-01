
"use client"

import { useState, useEffect } from "react"
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
  id: string
  title: string
  content: string
  subject: string
  exam: "UPSC" | "CAT"
  tags: string[]
  type: "LEARNING" | "SUMMARY" | "REVISION" | "CUSTOM"
  createdAt: string
  updatedAt: string
}

export default function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
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
    { value: "LEARNING", label: "Learning Notes" },
    { value: "SUMMARY", label: "Lecture Summary" },
    { value: "REVISION", label: "Revision Points" },
    { value: "CUSTOM", label: "Custom Notes" },
  ]

  useEffect(() => {
    fetchNotes()
  }, [filterExam, filterSubject, filterType])

  const fetchNotes = async () => {
    try {
      const params = new URLSearchParams()
      if (filterExam !== "all") params.append("exam", filterExam)
      if (filterSubject !== "all") params.append("subject", filterSubject)
      if (filterType !== "all") params.append("type", filterType)

      const response = await fetch(`/api/notes?${params.toString()}`)
      const data = await response.json()
      setNotes(data)
    } catch (error) {
      console.error('Failed to fetch notes:', error)
    } finally {
      setLoading(false)
    }
  }

  const addNote = async () => {
    if (newNote.title && newNote.content && newNote.subject && newNote.exam) {
      try {
        const response = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newNote.title,
            content: newNote.content,
            subject: newNote.subject,
            exam: newNote.exam,
            tags: newNote.tags || [],
            type: newNote.type || "CUSTOM",
          })
        })

        if (response.ok) {
          const createdNote = await response.json()
          setNotes([createdNote, ...notes])
          setNewNote({})
          setIsAddDialogOpen(false)
        }
      } catch (error) {
        console.error('Failed to create note:', error)
      }
    }
  }

  const deleteNote = async (id: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setNotes(notes.filter((note) => note.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete note:', error)
    }
  }

  const filteredNotes = notes.filter((note) => {
    const searchMatch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return searchMatch
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "LEARNING":
        return "bg-blue-100 text-blue-800"
      case "SUMMARY":
        return "bg-green-100 text-green-800"
      case "REVISION":
        return "bg-yellow-100 text-yellow-800"
      case "CUSTOM":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading notes...</p>
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
                    value={newNote.type || "CUSTOM"}
                    onValueChange={(value) =>
                      setNewNote({ ...newNote, type: value as "LEARNING" | "SUMMARY" | "REVISION" | "CUSTOM" })
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
                <p className="text-xs text-gray-500">Created: {new Date(note.createdAt).toLocaleDateString()}</p>
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
                    <p>Created: {new Date(selectedNote.createdAt).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(selectedNote.updatedAt).toLocaleDateString()}</p>
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