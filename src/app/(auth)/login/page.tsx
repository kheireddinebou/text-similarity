import { LucideIcons } from "@/components/Icons";
import UserAuthForm from "@/components/UserAuthForm";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import cn from "@/lib/utils";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="absolute container inset-0 h-screen flex items-center justify-center">
      <div className="flex  flex-col items-center justify-center gap-6">
        <Link
          href="/"
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "w-fit",
            })
          )}
        >
          <LucideIcons.ChevronLeft className="mr-2 w-4 h-4" />
          Back to home
        </Link>

        <LargeHeading>Welcome back!</LargeHeading>
        <Paragraph>Please sign in using your Google account.</Paragraph>
        <UserAuthForm />
      </div>
    </div>
  );
};

export default page;
