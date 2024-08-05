import JobFilterSidebar from "@/components/jobs/job-filter-sidebar";
import H1 from "@/components/ui/h1";
import JobResults from "@/components/jobs/job-results";
import { JobFilterValues } from "@/lib/validations";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

const getTitle = ({ query, type, location, remote }: JobFilterValues) => {
  const titlePrefix = query
    ? `${query} jobs`
    : type
      ? `${type} developer jobs`
      : location
        ? `${location} developer jobs`
        : remote
          ? `Remote developer jobs`
          : "All developer jobs";

  const titleSuffix =
    (type && location) || (remote && location) ? `in ${location}` : "";

  return `${titlePrefix} ${titleSuffix}`;
};

export const generateMetadata = ({
  searchParams: { query, type, location, remote },
}: PageProps): Metadata => {
  return {
    title: `${getTitle({
      query: query,
      type: type,
      location: location,
      remote: remote === "true",
    })} | Flow Jobs`,
  };
};

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
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job!</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
