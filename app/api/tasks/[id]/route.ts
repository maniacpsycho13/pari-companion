import { NextRequest, NextResponse } from 'next/server'
import { updateTask, deleteTask } from '@/lib/db'
import { Exam, Priority } from '@/app/generated/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const task = await updateTask(params.id, {
      title: body.title,
      description: body.description,
      subject: body.subject,
      exam: body.exam as Exam,
      priority: body.priority as Priority,
      deadline: body.deadline ? new Date(body.deadline) : undefined,
      completed: body.completed
    })
    return NextResponse.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteTask(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}