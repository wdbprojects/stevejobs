import JobListItem from "@/components/jobs/job-list-item";
import H1 from "@/components/ui/h1";
import prisma from "@/lib/prisma";
import Link from "next/link";

const AdminPage = async () => {
  const unapprovedJobs = await prisma.job.findMany({
    where: {
      approved: false,
    },
  });

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <H1 className="text-center">Admin Dashboard</H1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Unapproved jobs:</h2>

        {unapprovedJobs.length === 0 && (
          <p className="text-muted-foreground">No unapproved jobs.</p>
        )}

        {unapprovedJobs.map((job) => {
          return (
            <Link
              key={job.id}
              href={`/admin/jobs/${job.slug}`}
              className="block"
            >
              <JobListItem job={job} />
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default AdminPage;
