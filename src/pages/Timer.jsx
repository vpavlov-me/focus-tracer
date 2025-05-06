import { useTimer } from '../contexts/TimerContext'
import { Play, Pause, Square } from 'lucide-react'

export default function Timer() {
  const {
    timeLeft,
    isRunning,
    taskName,
    note,
    initialTime,
    setTime,
    startTimer,
    pauseTimer,
    stopTimer,
    setTaskName,
    setNote,
    formatTime
  } = useTimer()

  const progress = ((initialTime - timeLeft) / initialTime) * 100

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                className="stroke-muted fill-none"
                strokeWidth="8"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                className="stroke-primary fill-none transition-all duration-1000 ease-linear"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-primary">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setTime(25)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                initialTime === 25 * 60
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              25 мин
            </button>
            <button
              onClick={() => setTime(15)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                initialTime === 15 * 60
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              15 мин
            </button>
            <button
              onClick={() => setTime(5)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                initialTime === 5 * 60
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              5 мин
            </button>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={isRunning ? pauseTimer : startTimer}
              className="p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={stopTimer}
              className="p-3 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-colors"
            >
              <Square className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="taskName" className="block text-sm font-medium text-foreground mb-1">
              Название задачи
            </label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Введите название задачи"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="note" className="block text-sm font-medium text-foreground mb-1">
              Заметка
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Добавьте заметку о выполненной задаче"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 