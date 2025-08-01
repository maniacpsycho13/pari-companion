import { NextResponse } from 'next/server'
import { getSubjectProgress } from '@/lib/db'

export async function GET() {
  try {
    const progress = await getSubjectProgress()
    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}