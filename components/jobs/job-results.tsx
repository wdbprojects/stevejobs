import JobListItem from "@/components/jobs/job-list-item";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { JobFilterValues } from "@/lib/validations";
import { Prisma } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
}

const Pagination = ({
  currentPage,
  totalPages,
  filterValues: { query, type, location, remote },
}: PaginationProps) => {
  const generatePageLink = (page: number) => {
    const searchParams = new URLSearchParams({
      ...(query && { query }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });
    return `/?${searchParams.toString()}`;
  };
  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        <span>Previous page</span>
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        <span>Next page</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

const JobResults = async ({ filterValues, page = 1 }: JobResultsProps) => {
  const { query, type, location, remote } = filterValues;
  const jobsPerPage = 3;
  const skip = (page - 1) * jobsPerPage;

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

  const jobsPromise = prisma.job.findMany({
    where: where,
    orderBy: {
      createdAt: "desc",
    },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count({ where });

  const [jobs, totalResult] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div className="grow space-y-2">
      <span>Number of results: {jobs.length}</span>
      {jobs.map((job) => {
        return (
          <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
            <JobListItem job={job} />
          </Link>
        );
      })}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}

      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResult / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
};

export default JobResults;
