import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  language?: string;
  darkMode?: boolean;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  className,
  language = "javascript",
  darkMode = false,
  value,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={cn(
        `relative rounded-md overflow-hidden`,
        className
      )}
      {...props}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className={`absolute top-2 right-2 z-10 p-1 ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
      <SyntaxHighlighter
        language={language}
        style={darkMode ? materialDark : materialLight}
        showLineNumbers
        customStyle={{
          margin: 0,
          paddingTop: "2rem",
          paddingBottom: "1rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          backgroundColor: "inherit",
        }}
        lineNumberStyle={{
          color: darkMode ? "#ccc" : "#999",
          paddingRight: "1rem",
        }}
      >
        {value.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export { CodeBlock };