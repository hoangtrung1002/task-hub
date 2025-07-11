import { COLOR_OPTIONS } from "@/constants";
import { workspaceSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  isCreatingWorkspace: boolean;
  setIsCreatingWorkspace: (isCreating: boolean) => void;
}

type WorkspaceForm = z.infer<typeof workspaceSchema>;

const CreateWorkspace = ({
  isCreatingWorkspace,
  setIsCreatingWorkspace,
}: Props) => {
  const form = useForm<WorkspaceForm>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      color: COLOR_OPTIONS[0],
      description: "",
    },
  });
  const isPending = false;
  const onSubmit = (data: WorkspaceForm) => {};

  return (
    <Dialog
      open={isCreatingWorkspace}
      onOpenChange={setIsCreatingWorkspace}
      modal={true}
    >
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Workspace Name"
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Description"
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <div className="flex gap-3 flex-wrap">
                        {COLOR_OPTIONS.map((color) => (
                          <div
                            key={color}
                            onClick={() => field.onChange(color)}
                            className={cn(
                              "size-6 rounded-full  hover:opacity-80 transition-all duration-300",
                              isPending
                                ? "pointer-events-none"
                                : "cursor-pointer",
                              field.value === color &&
                                "ring-2 ring-offset-2 ring-blue-500"
                            )}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" /> Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
