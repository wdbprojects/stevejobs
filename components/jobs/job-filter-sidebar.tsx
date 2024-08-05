import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SelectRO from "@/components/ui/select-ro";
import prisma from "@/lib/prisma";
import { jobTypes } from "@/lib/job-types";
import { jobFilterSchema, JobFilterValues } from "@/lib/validations";
import { redirect } from "next/navigation";
import FormSubmittButton from "@/components/jobs/form-submit-button";

const filterJobs = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { query, type, location, remote } = jobFilterSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(query && { query: query.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  redirect(`/?${searchParams.toString()}`);
};

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

const JobFilterSidebar = async ({ defaultValues }: JobFilterSidebarProps) => {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) => {
      return locations
        .map(({ location }) => {
          return location;
        })
        .filter(Boolean);
    })
    .catch((err) => {
      console.log(err);
    })) as string[];

  return (
    <aside className="sticky top-0 h-fit bg-background md:w-[260px]">
      <span className="mb-2 block">Filter Jobs</span>
      <form
        action={filterJobs}
        className="rounded-lg border p-4"
        key={JSON.stringify(defaultValues)}
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="query">Search</Label>
            <Input
              id="query"
              name="query"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.query}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <SelectRO
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                );
              })}
            </SelectRO>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <SelectRO
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All locations</option>
              {distinctLocations.map((loc) => {
                return (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                );
              })}
            </SelectRO>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 cursor-pointer accent-foreground"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote" className="cursor-pointer">
              Remote jobs
            </Label>
          </div>
          <FormSubmittButton className="w-full">Filter jobs</FormSubmittButton>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
