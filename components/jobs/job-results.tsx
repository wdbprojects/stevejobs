import JobListItem from "@/components/jobs/job-list-item";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validations";
import { Prisma } from "@prisma/client";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

const JobResults = async ({
  filterValues: { query, type, location, remote },
}: JobResultsProps) => {
  const searchString = query
    ?.split(" ")
    .filter((word) => {
      return word.length > 0;
    })
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where: where,
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(jobs.length);

  return (
    <div className="grow space-y-2">
      <span>Number of results: {jobs.length}</span>
      {jobs.map((job) => {
        return <JobListItem key={job.id} job={job} />;
      })}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
};

export default JobResults;
