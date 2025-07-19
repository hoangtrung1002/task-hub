import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { Button } from "./ui/button";

interface TagsInputProps {
  value?: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export const TagsInput = ({
  value = [],
  onChange,
  placeholder = "Add a tag",
  maxTags = 5,
}: TagsInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    const cleaned = tag.trim().replace(/,$/, "");
    if (!cleaned || value.includes(cleaned) || value.length >= maxTags) return;
    onChange([...value, cleaned]);
    setInputValue("");
  };

  const removeTag = (index: number) => {
    const newTags = [...value];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
      e.preventDefault();
      addTag(inputValue);
    }
    if (e.key === "Backspace" && inputValue === "") {
      removeTag(value.length - 1);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center border rounded-md p-1 text-xs shadow-xs">
      {value.map((tag, index) => (
        <div
          key={index}
          className="flex items-center gap-1 bg-muted text-sm text-muted-foreground px-2 py-1 rounded-full"
        >
          <span>{tag}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-red-500"
            onClick={() => removeTag(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Input
        className={cn(
          "text-xs border-none outline-none focus-visible:ring-0 flex-1 shadow-none",
          value.length >= maxTags ? "hidden" : "block"
        )}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};
