import { Exam, NoteType, Priority, SessionType } from '@/app/generated/prisma'


import prisma from './prisma'


// Default user ID for demo purposes
const DEFAULT_USER_ID = 'default-user'

// Initialize default user if not exists
export async function initializeUser() {
  const user = await prisma.user.findUnique({
    where: { id: DEFAULT_USER_ID }
  })

  if (!user) {
    await prisma.user.create({
      data: {
        id: DEFAULT_USER_ID,
        name: 'Study User',
        email: 'user@example.com'
      }
    })
  }
}

// Dashboard Functions
export async function getDashboardData() {
  await initializeUser()

  const [tasks, subjectProgress, dailyStats] = await Promise.all([
    prisma.task.findMany({
      where: { userId: DEFAULT_USER_ID },
      orderBy: { createdAt: 'desc' },
      take: 10
    }),
    prisma.subjectProgress.findMany({
      where: { userId: DEFAULT_USER_ID }
    }),
    prisma.dailyStats.findFirst({
      where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } }
    })
  ])

  const totalTasks = await prisma.task.count({
    where: { userId: DEFAULT_USER_ID, completed: true }
  })

  const totalNotes = await prisma.note.count({
    where: { userId: DEFAULT_USER_ID }
  })

  return {
    tasks,
    subjectProgress,
    dailyStats,
    totalTasks,
    totalNotes
  }
}

// Task Functions
export async function getTasks(exam?: Exam, subject?: string) {
  await initializeUser()


  const where : any = { userId: DEFAULT_USER_ID }
  if (exam) where.exam = exam
  if (subject) where.subject = subject

  return prisma.task.findMany({
    where,
    orderBy: [
      { completed: 'asc' },
      { priority: 'desc' },
      { createdAt: 'desc' }
    ]
  })
}

export async function createTask(data: {
  title: string
  description?: string
  subject: string
  exam: Exam
  priority?: Priority
  deadline?: Date
}) {
  await initializeUser()

  return prisma.task.create({
    data: {
      ...data,
      userId: DEFAULT_USER_ID
    }
  })
}

export async function updateTask(id: string, data: Partial<{
  title: string
  description: string
  subject: string
  exam: Exam
  priority: Priority
  deadline: Date
  completed: boolean
}>) {
  return prisma.task.update({
    where: { id },
    data
  })
}

export async function deleteTask(id: string) {
  return prisma.task.delete({
    where: { id }
  })
}

// Note Functions
export async function getNotes(exam?: Exam, subject?: string, type?: NoteType) {
  await initializeUser()

  const where: any = { userId: DEFAULT_USER_ID }
  if (exam) where.exam = exam
  if (subject) where.subject = subject
  if (type) where.type = type

  return prisma.note.findMany({
    where,
    orderBy: { updatedAt: 'desc' }
  })
}

export async function createNote(data: {
  title: string
  content: string
  subject: string
  exam: Exam
  tags?: string[]
  type?: NoteType
}) {
  await initializeUser()

  return prisma.note.create({
    data: {
      ...data,
      tags: data.tags || [],
      userId: DEFAULT_USER_ID
    }
  })
}

export async function updateNote(id: string, data: Partial<{
  title: string
  content: string
  subject: string
  exam: Exam
  tags: string[]
  type: NoteType
}>) {
  return prisma.note.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date()
    }
  })
}

export async function deleteNote(id: string) {
  return prisma.note.delete({
    where: { id }
  })
}

// Study Session Functions
export async function getStudySessions(date?: Date) {
  await initializeUser()

  const where: any = { userId: DEFAULT_USER_ID }
  if (date) {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0))
    const endOfDay = new Date(date.setHours(23, 59, 59, 999))
    where.date = {
      gte: startOfDay,
      lte: endOfDay
    }
  }

  return prisma.studySession.findMany({
    where,
    orderBy: [
      { date: 'asc' },
      { startTime: 'asc' }
    ]
  })
}

export async function createStudySession(data: {
  title: string
  subject: string
  exam: Exam
  startTime: string
  endTime: string
  date: Date
  type?: SessionType
  reminder?: boolean
}) {
  await initializeUser()

  return prisma.studySession.create({
    data: {
      ...data,
      userId: DEFAULT_USER_ID
    }
  })
}

export async function updateStudySession(id: string, data: Partial<{
  title: string
  subject: string
  exam: Exam
  startTime: string
  endTime: string
  date: Date
  type: SessionType
  reminder: boolean
  completed: boolean
}>) {
  return prisma.studySession.update({
    where: { id },
    data
  })
}

export async function deleteStudySession(id: string) {
  return prisma.studySession.delete({
    where: { id }
  })
}

// Subject Progress Functions
export async function getSubjectProgress() {
  await initializeUser()

  return prisma.subjectProgress.findMany({
    where: { userId: DEFAULT_USER_ID },
    orderBy: { name: 'asc' }
  })
}

export async function updateSubjectProgress(name: string, exam: Exam, data: {
  progress?: number
  totalTopics?: number
  completedTopics?: number
  hoursSpent?: number
}) {
  await initializeUser()

  return prisma.subjectProgress.upsert({
    where: {
      userId_name_exam: {
        userId: DEFAULT_USER_ID,
        name,
        exam
      }
    },
    update: data,
    create: {
      name,
      exam,
      userId: DEFAULT_USER_ID,
      ...data
    }
  })
}

// Daily Stats Functions
export async function updateDailyStats(date: Date, data: {
  studyHours?: number
  tasksCompleted?: number
  notesCreated?: number
}) {
  const dateOnly = new Date(date.setHours(0, 0, 0, 0))

  return prisma.dailyStats.upsert({
    where: { date: dateOnly },
    update: data,
    create: {
      date: dateOnly,
      ...data
    }
  })
}

export async function getDailyStats(startDate: Date, endDate: Date) {
  return prisma.dailyStats.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate
      }
    },
    orderBy: { date: 'asc' }
  })
}