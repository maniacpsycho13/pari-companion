import { NextRequest, NextResponse } from 'next/server'
import { getNotes, createNote } from '@/lib/db'
import { Exam, NoteType } from '@/app/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const exam = searchParams.get('exam') as Exam | null
    const subject = searchParams.get('subject')
    const type = searchParams.get('type') as NoteType | null

    const notes = await getNotes(
      exam || undefined,
      subject || undefined,
      type || undefined
    )
    return NextResponse.json(notes)
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const note = await createNote({
      title: body.title,
      content: body.content,
      subject: body.subject,
      exam: body.exam as Exam,
      tags: body.tags,
      type: body.type as NoteType
    })
    return NextResponse.json(note)
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
  }
}