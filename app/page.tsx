import DarkMode from "@/components/shared/dark-theme";
import JobFilterSidebar from "@/components/jobs/job-filter-sidebar";
import H1 from "@/components/ui/h1";
import JobResults from "@/components/jobs/job-results";
import { JobFilterValues } from "@/lib/validations";

interface PageProps {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: { query, type, location, remote },
}: PageProps) {
  const filterValues: JobFilterValues = {
    query: query,
    type: type,
    location: location,
    remote: remote === "true",
  };

  return (
    <main className="m-auto my-10 min-h-screen max-w-5xl space-y-10 px-3">
      <div className="mb-8 flex flex-col items-center justify-center space-y-5 text-center">
        <H1>Developer Jobs</H1>
        <p className="text-muted-foreground">Find your dream job!</p>
        <DarkMode />
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
