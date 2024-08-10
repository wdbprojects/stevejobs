"use server";

import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState = { error?: string } | undefined;

export const approveSubmission = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const jobId = parseInt(formData.get("jobId") as string);
    const user = await currentUser();
    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }
    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        approved: true,
      },
    });
    revalidatePath("/");
  } catch (err) {
    let message = "Unexpected error";
    if (err instanceof Error) {
      message = err.message;
    }
    return { error: message };
  }
};

export const deleteJob = async (prevState: FormState, formData: FormData) => {
  try {
    //throw new Error("123123testestes");
    const jobId = parseInt(formData.get("jobId") as string);
    const user = await currentUser();
    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (job?.companyLogoUrl) {
      await del(job.companyLogoUrl);
    }
    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });
    revalidatePath("/");
  } catch (err) {
    let message = "Unexpected error";
    if (err instanceof Error) {
      message: err.message;
    }
    return { error: message };
  }
  redirect("/admin");
};
