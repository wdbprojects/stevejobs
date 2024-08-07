import { z } from "zod";
import { jobTypes, locationTypes } from "@/lib/job-types";

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => {
      return !file || (file instanceof File && file.type.startsWith("image/"));
    },
    { message: "Invalid file type" },
  )
  .refine(
    (file) => {
      return !file || file.size < 1024 * 1024 * 2;
    },
    { message: "File should be less than 2MB" },
  );

const applicationSchema = z
  .object({
    applicationEmail: z
      .string()
      .max(100, { message: "Email should be 100 chars tops." })
      .email()
      .optional()
      .or(z.literal("")),
    applicationUrl: z
      .string()
      .max(100, { message: "The url should be 100 chars tops." })
      .url({ message: "Invalid URL" })
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      return data.applicationEmail || data.applicationUrl;
    },
    { message: "Email or URL is required", path: ["applicationEmail"] },
  );

const locationSchema = z
  .object({
    locationType: z
      .string()
      .min(1, { message: "Location type is required" })
      .refine(
        (value) => {
          return locationTypes.includes(value);
        },
        { message: "Invalid location type" },
      ),
    location: z
      .string()
      .max(100, { message: "Location should be 100 chars tops." })
      .optional(),
  })
  .refine(
    (data) => {
      return (
        !data.locationType || data.locationType === "Remote" || data.location
      );
    },
    {
      message: "Office location is required for on-site or hybrid jobs",
      path: ["location"],
    },
  );

const numericRequiredString = z
  .string()
  .min(1, { message: "Salary is required" })
  .regex(/^\d+$/, { message: "This field must be a number" });

export const createJobSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(100, { message: "Title should be 100 chars tops." }),
    type: z.string().refine(
      (value) => {
        return jobTypes.includes(value);
      },
      { message: "Invalid job type", required_error: "Job type is required" },
    ),
    companyName: z.string().min(1, { message: "Company name is required" }),
    companyLogo: companyLogoSchema,
    description: z
      .string()
      .max(5000, { message: "Description should be 5000 chars tops." })
      .optional(),
    salary: numericRequiredString.max(9, {
      message: "Salary should not exceed 9 digits",
    }),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
