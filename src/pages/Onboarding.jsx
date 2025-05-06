import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [settings, setSettings] = useState({
    theme: 'light',
    progressStyle: 'bar'
  })

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      localStorage.setItem('theme', settings.theme)
      localStorage.setItem('progressStyle', settings.progressStyle)
      localStorage.setItem('seenOnboarding', 'true')
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {step === 1 ? (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
              Добро пожаловать в Focus Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Давайте настроим приложение под ваши предпочтения
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Выберите тему
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                    className={`p-4 rounded-lg border-2 ${
                      settings.theme === 'light'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="h-20 bg-white dark:bg-gray-800 rounded mb-2" />
                    <span className="text-sm">Светлая</span>
                  </button>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                    className={`p-4 rounded-lg border-2 ${
                      settings.theme === 'dark'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="h-20 bg-gray-900 rounded mb-2" />
                    <span className="text-sm">Тёмная</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              Стиль прогресса
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSettings(prev => ({ ...prev, progressStyle: 'bar' }))}
                  className={`p-4 rounded-lg border-2 ${
                    settings.progressStyle === 'bar'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="h-2 bg-primary-500 rounded-full mb-2" />
                  <span className="text-sm">Полоса</span>
                </button>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, progressStyle: 'circle' }))}
                  className={`p-4 rounded-lg border-2 ${
                    settings.progressStyle === 'circle'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="w-8 h-8 border-4 border-primary-500 rounded-full mx-auto mb-2" />
                  <span className="text-sm">Круг</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-primary-500' : 'bg-gray-300'}`} />
            <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-primary-500' : 'bg-gray-300'}`} />
          </div>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            {step === 2 ? 'Начать' : 'Далее'}
          </button>
        </div>
      </div>
    </div>
  )
} 