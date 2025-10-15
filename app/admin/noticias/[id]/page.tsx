import React from "react"
import EditNoticiaForm from "./EditNoticiaForm"
import { getNewsArticle } from "@/actions/news"
import { notFound } from "next/navigation"

export default async function EditNoticiaPage(ctx) {
  const params = await ctx.params;
  const noticia = await getNewsArticle(params.id);
  if (!noticia) notFound();
  return <EditNoticiaForm noticia={noticia} />;
}