import { useState, useEffect } from 'react'
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function Stats() {
  const [sessions, setSessions] = useState([])
  const [weeklyStats, setWeeklyStats] = useState([])
  const [taskStats, setTaskStats] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = () => {
    setIsLoading(true)
    const savedSessions = JSON.parse(localStorage.getItem('sessions') || '[]')
    setSessions(savedSessions)
    calculateStats(savedSessions)
    setIsLoading(false)
  }

  const calculateStats = (sessions) => {
    // Calculate weekly stats
    const start = startOfWeek(new Date(), { locale: ru })
    const end = endOfWeek(new Date(), { locale: ru })
    const days = eachDayOfInterval({ start, end })

    const weeklyData = days.map(day => {
      const daySessions = sessions.filter(session => 
        format(new Date(session.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
      )
      const totalMinutes = daySessions.reduce((acc, session) => {
        const [minutes] = session.timeSpent.split(':').map(Number)
        return acc + minutes
      }, 0)

      return {
        date: format(day, 'dd.MM', { locale: ru }),
        minutes: totalMinutes
      }
    })

    setWeeklyStats(weeklyData)

    // Calculate task stats
    const taskData = sessions.reduce((acc, session) => {
      if (!acc[session.taskName]) {
        acc[session.taskName] = 0
      }
      const [minutes] = session.timeSpent.split(':').map(Number)
      acc[session.taskName] += minutes
      return acc
    }, {})

    setTaskStats(taskData)
  }

  const maxMinutes = Math.max(...weeklyStats.map(day => day.minutes), 1)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Статистика за неделю</h2>
        <div className="space-y-4">
          {weeklyStats.map(day => (
            <div key={day.date} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{day.date}</span>
                <span className="text-foreground font-medium">{day.minutes} мин</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${(day.minutes / maxMinutes) * 100}%`,
                    transitionDelay: '100ms'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Статистика по задачам</h2>
        <div className="space-y-4">
          {Object.entries(taskStats).map(([task, minutes], index) => (
            <div key={task} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{task}</span>
                <span className="text-foreground font-medium">{minutes} мин</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${(minutes / maxMinutes) * 100}%`,
                    transitionDelay: `${index * 100}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 