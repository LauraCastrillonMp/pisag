'use client';
import { useTransition, useState } from 'react';
import { Button } from '@/components/ui/button';
import { updateProfile } from '@/actions/auth';

export default function EditProfileForm({ user }: { user: any }) {
  const [pending, startTransition] = useTransition();
  const [formState, setFormState] = useState({
    username: user.username,
    bio: user.bio || '',
    avatar_url: user.avatar_url || '',
    status: '',
    error: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, status: 'saving', error: '' }));
    const formData = new FormData(e.currentTarget);
    const res = await updateProfile({}, formData);
    if (res.success) {
      setFormState((prev) => ({ ...prev, status: 'saved', error: '' }));
      // Reload to refresh profile info after change
      window.location.reload();
    } else {
      setFormState((prev) => ({ ...prev, error: res.error || 'Error al guardar', status: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-slate-50 rounded-lg mt-8 p-4 flex flex-col gap-3 border">
      <label className="block">
        <span className="text-slate-800 font-semibold">Usuario</span>
        <input name="username" className="w-full rounded p-2 border mt-1" minLength={3} maxLength={32} required defaultValue={formState.username} />
      </label>
      <label className="block">
        <span className="text-slate-800 font-semibold">Biografía</span>
        <textarea name="bio" className="w-full rounded p-2 border mt-1" rows={2} maxLength={256} defaultValue={formState.bio} />
      </label>
      <label className="block">
        <span className="text-slate-800 font-semibold">Avatar URL</span>
        <input name="avatar_url" className="w-full rounded p-2 border mt-1" type="url" placeholder="URL de imagen de avatar" defaultValue={formState.avatar_url} />
      </label>
      {formState.error && <p className="text-red-600 text-sm">{formState.error}</p>}
      {formState.status === 'saving' && <p className="text-blue-700 text-sm">Guardando...</p>}
      {formState.status === 'saved' && <p className="text-green-700 text-sm">¡Cambios guardados!</p>}
      <Button type="submit" className="w-full bg-blue-700 text-white mt-2" disabled={pending}>
        Guardar Cambios
      </Button>
    </form>
  );
}
