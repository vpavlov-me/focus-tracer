// Генерация тестовых данных для приложения
export const generateTestData = () => {
  const tasks = [
    'Разработка интерфейса',
    'Изучение React',
    'Написание документации',
    'Исправление багов',
    'Код ревью',
    'Планирование спринта',
    'Тестирование',
    'Оптимизация производительности',
    'Рефакторинг кода',
    'Встреча с командой'
  ];

  const notes = [
    'Успешно завершено',
    'Требуется доработка',
    'Нужна помощь с интеграцией',
    'Отличный прогресс',
    'Сложная задача, но решена',
    'Планируется продолжение',
    'Удалось найти оптимальное решение',
    'Потребовалось больше времени, чем ожидалось',
    'Всё идет по плану',
    'Необходимо обсудить с командой'
  ];

  // Генерация дат за последние 30 дней
  const sessions = [];
  const now = new Date();
  
  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    
    // Случайное время в течение дня
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    date.setHours(hours, minutes, 0, 0);
    
    const taskIndex = Math.floor(Math.random() * tasks.length);
    const noteIndex = Math.floor(Math.random() * notes.length);
    
    // Случайная длительность от 5 до 60 минут
    const durationMinutes = Math.floor(Math.random() * 55) + 5;
    
    sessions.push({
      taskName: tasks[taskIndex],
      timeSpent: `${durationMinutes}:00`,
      note: Math.random() > 0.3 ? notes[noteIndex] : '',
      date: date.toISOString()
    });
  }
  
  // Сортировка по дате (от новых к старым)
  sessions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return sessions;
};

// Функция для инициализации тестовых данных
export const initializeTestData = () => {
  // Проверяем, есть ли уже данные
  const existingSessions = localStorage.getItem('sessions');
  
  // Если данных нет, добавляем тестовые
  if (!existingSessions || JSON.parse(existingSessions).length === 0) {
    const testSessions = generateTestData();
    localStorage.setItem('sessions', JSON.stringify(testSessions));
    console.log('Тестовые данные успешно добавлены');
  }
}; 