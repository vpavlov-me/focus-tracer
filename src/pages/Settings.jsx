import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function Settings() {
  const { setTheme } = useTheme()
  const [settings, setSettings] = useState({
    theme: localStorage.getItem('theme') || 'light',
    font: localStorage.getItem('font') || 'system',
    progressStyle: localStorage.getItem('progressStyle') || 'bar',
    defaultDuration: localStorage.getItem('defaultDuration') || '25'
  })

  useEffect(() => {
    // Применяем настройки при загрузке
    document.documentElement.classList.toggle('dark', settings.theme === 'dark')
    document.documentElement.style.fontFamily = settings.font === 'system' 
      ? 'system-ui, -apple-system, sans-serif'
      : settings.font === 'inter'
      ? 'Inter, sans-serif'
      : 'JetBrains Mono, monospace'
  }, [settings])

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    localStorage.setItem(key, value)
    
    if (key === 'theme') {
      setTheme(value)
    }
  }

  const exportToCSV = () => {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]')
    if (sessions.length === 0) {
      alert('Нет сессий для экспорта')
      return
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Task Name,Time Spent,Notes,Date\n"
      + sessions.map(session => 
          `"${session.taskName}","${session.timeSpent}","${session.note || ''}","${session.date}"`
        ).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `focus-sessions-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Настройки</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Тема
            </label>
            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="light">Светлая</option>
              <option value="dark">Тёмная</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Шрифт
            </label>
            <select
              value={settings.font}
              onChange={(e) => handleChange('font', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="system">Системный</option>
              <option value="inter">Inter</option>
              <option value="mono">Mono</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Стиль прогресса
            </label>
            <select
              value={settings.progressStyle}
              onChange={(e) => handleChange('progressStyle', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="bar">Полоса</option>
              <option value="circle">Круг</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Длительность по умолчанию (минут)
            </label>
            <select
              value={settings.defaultDuration}
              onChange={(e) => handleChange('defaultDuration', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="5">5</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Экспорт данных в CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 