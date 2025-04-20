// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function RedirectToHome() {
  redirect('/home');
}
