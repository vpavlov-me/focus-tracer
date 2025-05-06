import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon, Clock, History, BarChart2, Settings } from 'lucide-react'

export default function Layout() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Clock, label: 'Таймер' },
    { path: '/history', icon: History, label: 'История' },
    { path: '/stats', icon: BarChart2, label: 'Статистика' },
    { path: '/settings', icon: Settings, label: 'Настройки' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 bg-card shadow-sm z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Focus Tracker</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-20 pb-24">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-4">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center space-y-1 ${
                  location.pathname === path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
} 