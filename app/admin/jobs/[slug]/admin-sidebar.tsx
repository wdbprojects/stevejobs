"use client";

import { useFormState } from "react-dom";
import { Job } from "@prisma/client";
import FormSubmittButton from "@/components/jobs/form-submit-button";
import { approveSubmission, deleteJob } from "@/app/admin/actions";

interface AdminSidebarProps {
  job: Job;
}
interface AdminButtonProps {
  jobId: number;
}
const ApproveSubmissionButton = ({ jobId }: AdminButtonProps) => {
  const [formState, formAction] = useFormState(approveSubmission, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmittButton className="w-full">Approve</FormSubmittButton>
      {formState?.error && (
        <p className="text-sm text-red-700">{formState.error}</p>
      )}
    </form>
  );
};

const DeleteJobButton = ({ jobId }: AdminButtonProps) => {
  const [formState, formAction] = useFormState(deleteJob, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} readOnly />
      <FormSubmittButton className="w-full !bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90">
        Delete Job
      </FormSubmittButton>
      {formState?.error && (
        <p className="text-sm text-red-700">{formState.error}</p>
      )}
    </form>
  );
};

const AdminSidebar = ({ job }: AdminSidebarProps) => {
  return (
    <aside className="md:items-strech flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
};

export default AdminSidebar;
