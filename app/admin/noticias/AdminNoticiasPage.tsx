"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Edit } from "lucide-react"
import { formatDate } from "@/utils/format"
import { deleteNewsArticle } from "@/actions/admin"

export default function AdminNoticiasPage({ noticias }: { noticias: any[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4 hover:bg-primary/10">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Panel
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Gestión de Noticias
              </h1>
              <p className="text-muted-foreground mt-2">Crea, edita y elimina artículos de noticias</p>
            </div>
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Link href="/admin/noticias/nueva">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Noticia
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {noticias.map((article) => (
            <Card
              key={article.id}
              className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Por {article.profiles?.username}</span>
                    <span>•</span>
                    <span>{formatDate(article.created_at)}</span>
                    <span>•</span>
                    <span className="capitalize">{article.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Edit Button */}
                  <Link href={`/admin/noticias/${article.id}`}>
                    <Button variant="secondary" size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  </Link>
                  {/* Delete Button */}
                  <form action={deleteNewsArticle.bind(null, article.id)}>
                    <Button type="submit" variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}