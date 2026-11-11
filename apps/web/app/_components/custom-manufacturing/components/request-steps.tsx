import { requestSteps } from '../constants/request-steps';

export function RequestSteps() {
  return (
    <div className="px-8 pt-7 pb-8 max-[700px]:p-6">
      <h3 className="mb-[18px] text-[22px] font-semibold tracking-[-0.03em]">
        Как оставить заявку
      </h3>
      <ol className="m-0 grid list-none gap-0 p-0 [&_p]:mt-1 [&_p]:text-[13px] [&_p]:leading-[1.5] [&_p]:text-[#5c7888] [&_strong]:block [&_strong]:text-[15px] [&_strong]:font-bold [&_strong]:text-[#294b60] [&>li]:grid [&>li]:grid-cols-[42px_1fr] [&>li]:items-start [&>li]:gap-4 [&>li]:py-4 [&>li+li]:border-t [&>li+li]:border-[#e0edf3] [&>li>svg]:size-[42px] [&>li>svg]:rounded-[14px] [&>li>svg]:bg-[#e7f4fa] [&>li>svg]:p-[11px] [&>li>svg]:text-[#397fa1]">
        {requestSteps.map(({ title, description, icon: Icon }) => (
          <li key={title}>
            <Icon aria-hidden="true" />
            <div>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
