import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { RequestPage } from '@/features/requests/request-page';

export const Route = createFileRoute('/_admin/requests/$requestId')({
  params: {
    parse: (params) => ({ requestId: z.uuid().parse(params.requestId) }),
    stringify: (params) => params,
  },
  component: RequestRoute,
});
function RequestRoute() {
  const { requestId } = Route.useParams();
  return <RequestPage requestId={requestId} />;
}
