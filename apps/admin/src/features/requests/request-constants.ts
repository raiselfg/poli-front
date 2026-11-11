import type { RequestStatus } from './schemas';

export const statusLabels: Record<RequestStatus, string> = {
  new: 'Новая',
  in_progress: 'В работе',
  completed: 'Завершена',
};
