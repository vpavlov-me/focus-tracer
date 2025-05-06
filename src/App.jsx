import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { TimerProvider } from './contexts/TimerContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Timer from './pages/Timer'
import History from './pages/History'
import Stats from './pages/Stats'
import Settings from './pages/Settings'
import Onboarding from './pages/Onboarding'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <TimerProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Timer />} />
              <Route path="history" element={<History />} />
              <Route path="stats" element={<Stats />} />
              <Route path="settings" element={<Settings />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </TimerProvider>
      </Router>
    </ThemeProvider>
  )
} 