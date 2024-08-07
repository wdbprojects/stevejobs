"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import H1 from "@/components/ui/h1";
import { createJobSchema, CreateJobValues } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import LocationInputSearch from "@/components/forms/location-input-search";
import { Loader2, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/forms/rich-text-editor";
import "@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { draftToMarkdown } from "markdown-draft-js";

const NewJobForm = () => {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
    // defaultValues: {
    //   title: "",
    //   type: "",
    //   companyName: "",
    //   //companyLogo: File | undefined,
    //   locationType: "",
    //   location: "",
    //   applicationEmail: "",
    //   applicationUrl: "",
    //   description: "",
    //   salary: "",
    // },
  });

  const {
    handleSubmit,
    reset,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (values: CreateJobValues) => {
    alert(JSON.stringify(values, null, 2));
    console.log(values);
  };

  const handleReset = () => {
    reset({
      type: "",
      location: "",
    });
    setValue("location", "", { shouldValidate: true });
  };

  return (
    <main className="m-auto my-10 max-w-3xl space-y-10 p-8">
      <div className="space-y-5">
        <H1 className="text-center">Find your perfect developer </H1>
        <p className="text-center text-muted-foreground">
          Get your job posting seen by thousands of job seekers.
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="text-center font-semibold">Job details</h2>
          <p className="text-center text-sm text-muted-foreground">
            Provide a job description and details
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-[500px] space-y-4"
            noValidate
          >
            {/* JOB TITLE */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the job title"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* JOB TYPE */}
            <FormField
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-0">Job Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-foreground">
                          <SelectValue placeholder="Select a job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobTypes.map((jobType) => {
                          return (
                            <SelectItem key={jobType} value={jobType}>
                              {jobType}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* COMPANY NAME */}
            <FormField
              control={control}
              name="companyName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-0">Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the company's name"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* COMPANY LOGO UPLOAD */}
            <FormField
              control={control}
              name="companyLogo"
              render={({ field: { value, ...fieldValues } }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-0">Company Logo</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* LOCATION TYPE */}
            <FormField
              control={control}
              name="locationType"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-0">Location</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-foreground">
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locationTypes.map((locationType) => {
                          return (
                            <SelectItem key={locationType} value={locationType}>
                              {locationType}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* OFFICE LOCATION */}
            <FormField
              control={control}
              name="location"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-0">Office Location</FormLabel>
                    <FormControl>
                      <LocationInputSearch
                        onLocationSelected={field.onChange}
                        ref={field.ref}
                      />
                    </FormControl>
                    {watch("location") && (
                      <FormDescription className="flex items-center gap-2 text-foreground">
                        <Button
                          size="icon"
                          type="button"
                          variant="outline"
                          className="h-6 w-6"
                          onClick={() => {
                            setValue("location", "", { shouldValidate: true });
                          }}
                        >
                          <X size={14} />
                        </Button>
                        <span className="text-sm">{watch("location")}</span>
                      </FormDescription>
                    )}

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* EMAIL & URL */}
            <div className="!mb-5 space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex items-center justify-between">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => {
                    return (
                      <FormItem className="relative grow">
                        <FormControl>
                          <div className="flex items-center">
                            <Input
                              type="email"
                              id="applicationEmail"
                              placeholder="Enter email"
                              {...field}
                              autoComplete="off"
                            />
                            <span className="mx-2">or</span>
                          </div>
                        </FormControl>
                        <FormMessage className="absolute left-0 top-8 mb-4" />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => {
                    return (
                      <FormItem className="relative grow">
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="Enter your website address"
                            {...field}
                            autoComplete="off"
                            onChange={(event) => {
                              field.onChange(event);
                              trigger("applicationUrl");
                            }}
                          />
                        </FormControl>
                        <FormMessage className="absolute left-0 top-8" />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            {/* RICH TEXT EDITOR */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel
                      className="mb-0"
                      onClick={() => {
                        setFocus("description");
                      }}
                    >
                      Job Description
                    </FormLabel>
                    <FormControl>
                      <RichTextEditor
                        onChange={(draft) => {
                          field.onChange(draftToMarkdown(draft));
                        }}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* SALARY */}
            <FormField
              control={control}
              name="salary"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-0">Salary</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the job's salary"
                        {...field}
                        autoComplete="off"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* BUTTONS */}
            <div className="!mt-8 flex justify-between gap-4">
              <Button
                variant="secondary"
                className="w-full"
                type="reset"
                onClick={handleReset}
              >
                Reset form
              </Button>
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>Submit form</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default NewJobForm;
