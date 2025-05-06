import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Edit2, Trash2, Download, Database } from 'lucide-react'
import { generateTestData, saveTestData } from '../utils/generateTestData'

export default function History() {
  const [sessions, setSessions] = useState([])
  const [editingSession, setEditingSession] = useState(null)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = () => {
    const savedSessions = JSON.parse(localStorage.getItem('sessions') || '[]')
    setSessions(savedSessions)
  }

  const deleteSession = (sessionId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту сессию?')) {
      const updatedSessions = sessions.filter(session => session.date !== sessionId)
      localStorage.setItem('sessions', JSON.stringify(updatedSessions))
      setSessions(updatedSessions)
    }
  }

  const editSession = (session) => {
    setEditingSession(session)
  }

  const saveEdit = (e) => {
    e.preventDefault()
    const updatedSessions = sessions.map(session =>
      session.date === editingSession.date ? editingSession : session
    )
    localStorage.setItem('sessions', JSON.stringify(updatedSessions))
    setSessions(updatedSessions)
    setEditingSession(null)
  }

  const exportToCSV = () => {
    const headers = ['Дата', 'Задача', 'Затраченное время', 'Заметка']
    const csvContent = [
      headers.join(','),
      ...sessions.map(session => [
        new Date(session.date).toLocaleString(),
        `"${session.taskName}"`,
        session.timeSpent,
        `"${session.notes || ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `focus-sessions-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generateData = () => {
    const testSessions = generateTestData()
    saveTestData(testSessions)
    setSessions(testSessions)
  }

  const groupedSessions = sessions.reduce((acc, session) => {
    const date = format(new Date(session.date), 'dd.MM.yyyy', { locale: ru })
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(session)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">История сессий</h2>
        <div className="flex gap-4">
          <button
            onClick={generateData}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
          >
            <Database className="w-4 h-4" />
            Сгенерировать тестовые данные
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Экспорт в CSV
          </button>
        </div>
      </div>

      {Object.entries(groupedSessions).map(([date, dateSessions]) => (
        <div key={date} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{date}</h3>
          <div className="space-y-4">
            {dateSessions.map(session => (
              <div
                key={session.date}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                {editingSession?.date === session.date ? (
                  <form onSubmit={saveEdit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Название задачи
                      </label>
                      <input
                        type="text"
                        value={editingSession.taskName}
                        onChange={e => setEditingSession({ ...editingSession, taskName: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Заметка
                      </label>
                      <textarea
                        value={editingSession.notes}
                        onChange={e => setEditingSession({ ...editingSession, notes: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingSession(null)}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        Отмена
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                      >
                        Сохранить
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          {session.taskName}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {format(new Date(session.date), 'HH:mm', { locale: ru })} • {session.timeSpent}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editSession(session)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteSession(session.date)}
                          className="p-2 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {session.notes && (
                      <p className="mt-2 text-gray-600 dark:text-gray-400">{session.notes}</p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {sessions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Нет сохраненных сессий</p>
        </div>
      )}
    </div>
  )
} 