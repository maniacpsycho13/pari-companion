import { NextResponse } from 'next/server'
import { getDashboardData } from '@/lib/db'

export async function GET() {
  try {
    const data = await getDashboardData()
    return NextResponse.json(data)
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}