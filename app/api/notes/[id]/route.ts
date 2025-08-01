import { NextRequest, NextResponse } from 'next/server'
import { updateNote, deleteNote } from '@/lib/db'
import { Exam, NoteType } from '@/app/generated/prisma'
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { id } = await params
    const note = await updateNote(id, {
      title: body.title,
      content: body.content,
      subject: body.subject,
      exam: body.exam as Exam,
      tags: body.tags,
      type: body.type as NoteType
    })
    return NextResponse.json(note)
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteNote(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
  }
}
