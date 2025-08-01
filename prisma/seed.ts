import { Exam, NoteType, Priority, SessionType } from '@/app/generated/prisma'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const userId = 'default-user'

  // Create default user
  const user = await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      name: 'Study User',
      email: 'user@example.com'
    }
  })

  console.log('Created user:', user)

  // Create sample tasks
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Current Affairs - January 2025',
        description: 'Cover all major events from January 2025',
        subject: 'Current Affairs',
        exam: Exam.UPSC,
        priority: Priority.HIGH,
        deadline: new Date('2025-01-15'),
        userId
      }
    }),
    prisma.task.create({
      data: {
        title: 'Quantitative Aptitude - Percentages',
        description: 'Complete all percentage problems and formulas',
        subject: 'Quantitative Aptitude',
        exam: Exam.CAT,
        priority: Priority.MEDIUM,
        deadline: new Date('2025-01-20'),
        completed: true,
        userId
      }
    }),
    prisma.task.create({
      data: {
        title: 'Polity - Fundamental Rights',
        description: 'Study Articles 12-35 in detail',
        subject: 'Polity',
        exam: Exam.UPSC,
        priority: Priority.HIGH,
        deadline: new Date('2025-01-18'),
        userId
      }
    }),
    prisma.task.create({
      data: {
        title: 'Verbal Ability - Reading Comprehension',
        description: 'Practice RC passages and improve speed',
        subject: 'Verbal Ability',
        exam: Exam.CAT,
        priority: Priority.MEDIUM,
        userId
      }
    }),
    prisma.task.create({
      data: {
        title: 'Economy - Budget 2025 Analysis',
        description: 'Analyze key highlights and implications',
        subject: 'Economy',
        exam: Exam.UPSC,
        priority: Priority.HIGH,
        userId
      }
    })
  ])

  console.log('Created tasks:', tasks.length)

  // Create sample notes
  const notes = await Promise.all([
    prisma.note.create({
      data: {
        title: 'Fundamental Rights - Key Points',
        content: 'Article 12-35 covers Fundamental Rights. Key points:\n1. Right to Equality (Art 14-18)\n2. Right to Freedom (Art 19-22)\n3. Right against Exploitation (Art 23-24)\n4. Right to Freedom of Religion (Art 25-28)\n5. Cultural and Educational Rights (Art 29-30)\n6. Right to Constitutional Remedies (Art 32)',
        subject: 'Polity',
        exam: Exam.UPSC,
        tags: ['fundamental-rights', 'constitution', 'articles'],
        type: NoteType.LEARNING,
        userId
      }
    }),
    prisma.note.create({
      data: {
        title: 'Percentage Formulas - Quick Reference',
        content: 'Important percentage formulas:\n1. Percentage = (Part/Whole) × 100\n2. Increase% = (New-Old)/Old × 100\n3. Decrease% = (Old-New)/Old × 100\n4. Successive percentage: If two changes of a% and b%, final change = a + b + (ab/100)%',
        subject: 'Quantitative Aptitude',
        exam: Exam.CAT,
        tags: ['formulas', 'percentage', 'quick-reference'],
        type: NoteType.REVISION,
        userId
      }
    }),
    prisma.note.create({
      data: {
        title: 'Current Affairs - January 2025 Summary',
        content: 'Key events from January 2025:\n1. Economic Survey highlights\n2. Budget 2025 key announcements\n3. International relations updates\n4. Science and technology developments\n5. Awards and recognitions',
        subject: 'Current Affairs',
        exam: Exam.UPSC,
        tags: ['january-2025', 'budget', 'economy'],
        type: NoteType.SUMMARY,
        userId
      }
    }),
    prisma.note.create({
      data: {
        title: 'Essay Writing - Structure Template',
        content: 'Standard essay structure:\n1. Introduction (Hook + Background + Thesis)\n2. Body Paragraph 1 (Topic sentence + Evidence + Analysis)\n3. Body Paragraph 2 (Topic sentence + Evidence + Analysis)\n4. Body Paragraph 3 (Counterargument + Refutation)\n5. Conclusion (Restate thesis + Summary + Call to action)',
        subject: 'Essay Writing',
        exam: Exam.UPSC,
        tags: ['essay', 'structure', 'template'],
        type: NoteType.CUSTOM,
        userId
      }
    })
  ])

  console.log('Created notes:', notes.length)

  // Create sample study sessions
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const sessions = await Promise.all([
    prisma.studySession.create({
      data: {
        title: 'Current Affairs Reading',
        subject: 'Current Affairs',
        exam: Exam.UPSC,
        startTime: '09:00',
        endTime: '11:00',
        date: today,
        type: SessionType.STUDY,
        reminder: true,
        userId
      }
    }),
    prisma.studySession.create({
      data: {
        title: 'Quantitative Aptitude Practice',
        subject: 'Quantitative Aptitude',
        exam: Exam.CAT,
        startTime: '14:00',
        endTime: '16:00',
        date: today,
        type: SessionType.STUDY,
        reminder: true,
        completed: true,
        userId
      }
    }),
    prisma.studySession.create({
      data: {
        title: 'Polity Revision',
        subject: 'Polity',
        exam: Exam.UPSC,
        startTime: '19:00',
        endTime: '21:00',
        date: today,
        type: SessionType.REVISION,
        reminder: true,
        userId
      }
    }),
    prisma.studySession.create({
      data: {
        title: 'CAT Mock Test',
        subject: 'Quantitative Aptitude',
        exam: Exam.CAT,
        startTime: '10:00',
        endTime: '13:00',
        date: tomorrow,
        type: SessionType.MOCK_TEST,
        reminder: true,
        userId
      }
    })
  ])

  console.log('Created study sessions:', sessions.length)

  // Create subject progress
  const subjectProgress = await Promise.all([
    prisma.subjectProgress.create({
      data: {
        name: 'Quantitative Aptitude',
        exam: Exam.CAT,
        progress: 75,
        totalTopics: 20,
        completedTopics: 15,
        hoursSpent: 45,
        userId
      }
    }),
    prisma.subjectProgress.create({
      data: {
        name: 'Verbal Ability',
        exam: Exam.CAT,
        progress: 60,
        totalTopics: 15,
        completedTopics: 9,
        hoursSpent: 32,
        userId
      }
    }),
    prisma.subjectProgress.create({
      data: {
        name: 'Logical Reasoning',
        exam: Exam.CAT,
        progress: 45,
        totalTopics: 18,
        completedTopics: 8,
        hoursSpent: 28,
        userId
      }
    }),
    prisma.subjectProgress.create({
      data: {
        name: 'Polity',
        exam: Exam.UPSC,
        progress: 80,
        totalTopics: 25,
        completedTopics: 20,
        hoursSpent: 65,
        userId
      }
    }),
    prisma.subjectProgress.create({
      data: {
        name: 'Economy',
        exam: Exam.UPSC,
        progress: 55,
        totalTopics: 22,
        completedTopics: 12,
        hoursSpent: 38,
        userId
      }
    }),
    prisma.subjectProgress.create({
      data: {
        name: 'Current Affairs',
        exam: Exam.UPSC,
        progress: 90,
        totalTopics: 12,
        completedTopics: 11,
        hoursSpent: 42,
        userId
      }
    }),
    prisma.subjectProgress.create({
      data: {
        name: 'Essay Writing',
        exam: Exam.UPSC,
        progress: 35,
        totalTopics: 10,
        completedTopics: 4,
        hoursSpent: 15,
        userId
      }
    }),
    prisma.subjectProgress.create({
      data: {
        name: 'History',
        exam: Exam.UPSC,
        progress: 70,
        totalTopics: 30,
        completedTopics: 21,
        hoursSpent: 55,
        userId
      }
    })
  ])

  console.log('Created subject progress:', subjectProgress.length)

  // Create daily stats
  const dailyStats = await prisma.dailyStats.create({
    data: {
      date: today,
      studyHours: 6,
      tasksCompleted: 2,
      notesCreated: 1
    }
  })

  console.log('Created daily stats:', dailyStats)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

// package.json script addition:
// "scripts": {
//   "db:seed": "tsx prisma/seed.ts"
// }