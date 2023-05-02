"use client";

import { ButtonHTMLAttributes, FC } from "react";
import Button from "./ui/Button";
import { toast } from "./ui/Toast";
import { LucideIcons } from "./Icons";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton: FC<CopyButtonProps> = ({
  valueToCopy,
  className,
  ...props
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(valueToCopy);
    toast({
      title: "Copied!",
      message: "API key copied to clipboard",
      type: "success",
    });
  };

  return (
    <Button
      {...props}
      className={className}
      onClick={handleCopy}
      variant="ghost"
    >
      <LucideIcons.Copy className="w-5 h-5" />
    </Button>
  );
};

export default CopyButton;
