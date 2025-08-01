import { NextRequest, NextResponse } from 'next/server'
import { updateStudySession, deleteStudySession } from '@/lib/db'
import { Exam, SessionType } from '@/app/generated/prisma'
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const session = await updateStudySession(params.id, {
      title: body.title,
      subject: body.subject,
      exam: body.exam as Exam,
      startTime: body.startTime,
      endTime: body.endTime,
      date: body.date ? new Date(body.date) : undefined,
      type: body.type as SessionType,
      reminder: body.reminder,
      completed: body.completed
    })
    return NextResponse.json(session)
  } catch (error) {
    console.error('Error updating session:', error)
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteStudySession(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting session:', error)
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 })
  }
}