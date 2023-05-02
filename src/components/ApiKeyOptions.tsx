"use client";

import { generateApiKey } from "@/helpers/generateApiKey";
import { revokeApiKey } from "@/helpers/revokeApiKey";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/ui/DropDownMenu";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import Button from "./ui/Button";
import { toast } from "./ui/Toast";

interface ApiKeyOptionsProps {
  apiKeyKey: string;
  apiKeyId: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyKey, apiKeyId }) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKeyKey);
    toast({
      title: "Copied!",
      message: "API key copied to clipboard",
      type: "success",
    });
  };

  const createNewApiKey = async () => {
    setIsCreatingNew(true);
    try {
      await revokeApiKey();
      await generateApiKey();
      router.refresh();
    } catch (err) {
      toast({
        title: "Error creating API key",
        message: "Please try again latter.",
        type: "error",
      });
    } finally {
      setIsCreatingNew(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true);
    try {
      await revokeApiKey();
      router.refresh();
    } catch (err) {
      toast({
        title: "Error revoking API key",
        message: "Please try again latter.",
        type: "error",
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isCreatingNew || isRevoking}>
        <Button variant="ghost" className="flex gap-2 items-center">
          <p>
            {isCreatingNew
              ? "Creating new key"
              : isRevoking
              ? "Revoking key"
              : "Options"}
          </p>

          {isCreatingNew || isRevoking ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleCopy}>Copy</DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create new key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
