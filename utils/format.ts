export function formatDate(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "hace unos segundos"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"}`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `hace ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `hace ${diffInDays} ${diffInDays === 1 ? "día" : "días"}`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `hace ${diffInWeeks} ${diffInWeeks === 1 ? "semana" : "semanas"}`
  }

  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    missions: "Misiones",
    discoveries: "Descubrimientos",
    celestial_events: "Eventos Celestes",
  }
  return labels[category] || category
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    missions: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    discoveries: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    celestial_events: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  }
  return colors[category] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
}
