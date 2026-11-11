import { createFileRoute } from '@tanstack/react-router';
import { Home } from '@/features/dashboard/home-page';

export const Route = createFileRoute('/_admin/')({ component: Home });
