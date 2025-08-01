import { NextRequest, NextResponse } from 'next/server'
import { getTasks, createTask } from '@/lib/db'
import { Exam, Priority } from '@/app/generated/prisma'
import { log } from 'console'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const exam = searchParams.get('exam') as Exam | null
    const subject = searchParams.get('subject')

    const tasks = await getTasks(
      exam || undefined,
      subject || undefined
    )
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const task = await createTask({
      title: body.title,
      description: body.description,
      subject: body.subject,
      exam: body.exam as Exam,
      priority: body.priority as Priority,
      deadline: body.deadline ? new Date(body.deadline) : undefined
    })
    return NextResponse.json(task)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}