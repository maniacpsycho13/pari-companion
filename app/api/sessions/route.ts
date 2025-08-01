import { NextRequest, NextResponse } from 'next/server'
import { getStudySessions, createStudySession } from '@/lib/db'
import { Exam, SessionType } from '@/app/generated/prisma'
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateParam = searchParams.get('date')
    const date = dateParam ? new Date(dateParam) : undefined

    const sessions = await getStudySessions(date)
    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching study sessions:', error)
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const session = await createStudySession({
      title: body.title,
      subject: body.subject,
      exam: body.exam as Exam,
      startTime: body.startTime,
      endTime: body.endTime,
      date: new Date(body.date),
      type: body.type as SessionType,
      reminder: body.reminder
    })
    return NextResponse.json(session)
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}