import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-8">Страница не найдена</p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Вернуться на главную
      </Link>
    </div>
  )
} 