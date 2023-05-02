"use client";

import { generateApiKey } from "@/helpers/generateApiKey";
import React, { useState } from "react";
import CopyButton from "./CopyButton";
import { LucideIcons } from "./Icons";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import { toast } from "./ui/Toast";
import { Input } from "./ui/Input";
import Button from "./ui/Button";

const RequestApiKey = ({}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [apiKey, setApiKey] = useState<null | string>(null);

  const createNewApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const generatedApiKey = await generateApiKey();
      setApiKey(generatedApiKey);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "error",
          message: error.message,
          type: "error",
        });

        return;
      }

      toast({
        title: "Error",
        message: "Something went wrong",
        type: "error",
      });
      return;
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col items-center gap-6">
        <LucideIcons.Key className="w-12 h-12 text-gray-400" />
        <LargeHeading>Request your API key</LargeHeading>
        <Paragraph>You haven&apos;t requested an API key yet!</Paragraph>

        <form
          onSubmit={createNewApiKey}
          className="mt-6 sm:flex sm:items-center w-full"
        >
          <div className="relative rounded-md shadow-md sm:min-w-0 sm:flex-grow">
            {apiKey ? (
              <CopyButton
                valueToCopy={apiKey}
                type="button"
                className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
              />
            ) : null}

            <Input
              readOnly
              value={apiKey ?? ""}
              placeholder="Request an API key to display it here!"
            />
          </div>
          <div className="mt-3 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
            <Button disabled={!!apiKey} isLoading={isCreating}>
              Request key
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestApiKey;
