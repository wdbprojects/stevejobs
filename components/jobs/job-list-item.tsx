import { Job } from "@prisma/client";
import Image from "next/image";
import companyLogoPlaceholder from "@/public/assets/images/company-logo-placeholder.png";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface IJobListItem {
  job: Job;
}

const JobListItem = ({ job }: IJobListItem) => {
  const {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  } = job;

  return (
    <article className="flex cursor-pointer gap-8 rounded-lg border p-5 transition hover:bg-muted/60">
      <Image
        src={companyLogoUrl || companyLogoPlaceholder}
        alt={`${companyName} logo`}
        width={50}
        height={50}
        className="h-20 w-20 self-center rounded-lg"
      />

      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between text-center text-sm font-medium sm:flex">
        <Badge variant="secondary">{type}</Badge>
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} className="shrink-0" />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
};

export default JobListItem;
