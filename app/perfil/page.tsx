import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import EditProfileForm from "@/components/edit-profile-form";
import { Button } from "@/components/ui/button";

function formatDate(dateStr?: string) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

type PerfilUser = {
  id: string;
  email: string | undefined;
  username: string;
  role: string;
  xp?: number;
  avatar_url?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
};

export default async function PerfilPage() {
  const user = await getCurrentUser() as PerfilUser;
  if (!user) {
    redirect("/auth/login?redirect=/perfil");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 p-6">
      <div className="w-full max-w-md relative z-10">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">Mi Perfil</CardTitle>
            <CardDescription className="text-slate-600">Información de tu cuenta personal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-6 my-4">
              <Avatar className="h-20 w-20">
                {user.avatar_url ? (
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                ) : (
                  <AvatarFallback className="bg-blue-700 text-white text-3xl">{user.username?.slice(0,2).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-xl text-slate-900">{user.username}</span>
                <span className="text-sm text-gray-600">{user.email}</span>
                <span className="mt-1 text-xs px-2 py-1 rounded bg-slate-200 text-blue-700 font-semibold uppercase tracking-wide">{user.role}</span>
                <span className="mt-4 text-green-700 font-mono text-sm">ID: <span className='break-all'>{user.id}</span></span>
              </div>
              <div className="w-full mt-4 border-t pt-4 space-y-2">
                <div className="flex flex-col items-center">
                  <span className="text-gray-800 font-medium">Biografía</span>
                  <span className="text-gray-600 text-sm text-center min-h-[30px]">{user.bio || '— Sin biografía —'}</span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-gray-800 font-medium">XP</span>
                  <span className="text-blue-700 font-semibold">{user.xp ?? 0} XP</span>
                </div>
                <div className="flex justify-between w-full text-sm text-gray-600">
                  <span>Creado:</span>
                  <span>{formatDate(user.created_at)}</span>
                </div>
                <div className="flex justify-between w-full text-sm text-gray-600">
                  <span>Actualizado:</span>
                  <span>{formatDate(user.updated_at)}</span>
                </div>
              </div>
              <EditProfileForm user={user} />
              <div className="flex gap-2 mt-6 w-full">
                <form action="/api/signout" method="post" className="w-full">
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">Cerrar sesión</Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
