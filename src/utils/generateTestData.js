const tasks = [
  'Работа над проектом',
  'Изучение React',
  'Чтение документации',
  'Написание кода',
  'Code review',
  'Тестирование',
  'Рефакторинг',
  'Планирование',
  'Встреча с командой',
  'Изучение TypeScript'
]

const notes = [
  'Хороший прогресс',
  'Нужно больше практики',
  'Интересная задача',
  'Сложный баг',
  'Успешное завершение',
  'Требуется доработка',
  'Отличная производительность',
  'Новые идеи',
  'Полезная обратная связь',
  'Планирую улучшения'
]

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function generateTestData(days = 30) {
  const sessions = []
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days * 3; i++) {
    const date = getRandomDate(startDate, endDate)
    const timeSpent = Math.floor(Math.random() * 25 * 60) // До 25 минут
    sessions.push({
      taskName: getRandomItem(tasks),
      timeSpent: formatTime(timeSpent),
      note: Math.random() > 0.3 ? getRandomItem(notes) : '',
      date: date.toISOString()
    })
  }

  // Сортируем по дате (от новых к старым)
  return sessions.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function saveTestData(sessions) {
  localStorage.setItem('sessions', JSON.stringify(sessions))
} 