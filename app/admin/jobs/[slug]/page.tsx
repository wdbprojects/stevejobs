import JobDetails from "@/components/jobs/job-details";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./admin-sidebar";

interface PageProps {
  params: { slug: string };
}

const AdminPageDetails = async ({ params: { slug } }: PageProps) => {
  const job = await prisma.job.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!job) notFound();

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobDetails job={job} />
      <AdminSidebar job={job} />
    </main>
  );
};

export default AdminPageDetails;
