import { projectSchema } from "@/lib/schema";
import { cn, formatDate } from "@/lib/utils";
import { ProjectStatus, type IMember } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { TagsInput } from "../tag-input";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

type UserRole = "contributor" | "manager" | "viewer";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
  workspaceMembers: IMember[] | undefined;
}
export type CreateProjectFormData = z.infer<typeof projectSchema>;
const CreateProjectDialog = ({
  isOpen,
  onOpenChange,
  workspaceId,
  workspaceMembers,
}: Props) => {
  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: ProjectStatus.PLANNING,
      startDate: new Date().toISOString(),
      dueDate: "",
      members: [],
      tags: [],
    },
  });

  const handleCheckedChange = (
    checked: boolean | "indeterminate",
    memberId: string,
    selectedMembers: CreateProjectFormData["members"],
    onChange: (value: CreateProjectFormData["members"]) => void
  ) => {
    const currentMembers = selectedMembers ?? [];

    if (checked === true) {
      onChange([
        ...currentMembers,
        {
          user: memberId,
          role: "contributor",
        },
      ]);
    } else {
      onChange(currentMembers.filter((selected) => selected.user !== memberId));
    }
  };

  const handleChangeRole = (
    role: UserRole,
    selectedMembers: CreateProjectFormData["members"],
    member: IMember
  ) => {
    selectedMembers?.map((m) =>
      m.user === member.user._id ? { ...m, role: role } : m
    );
  };

  const onSubmit = (data: CreateProjectFormData) => {
    console.log(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to get started
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Project title" />
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
                    <Input {...field} placeholder="description your project" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={ProjectStatus.IN_PROGRESS}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ProjectStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value ? "text-muted-foreground" : ""
                            )}
                          >
                            <CalendarIcon className="size-4 " />
                            {field.value ? (
                              formatDate(new Date(field.value), "PPPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              field.onChange(date?.toISOString() || undefined);
                            }}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value ? "text-muted-foreground" : ""
                            )}
                          >
                            <CalendarIcon className="size-4 " />
                            {field.value ? (
                              formatDate(new Date(field.value), "PPPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              field.onChange(date?.toISOString() || undefined);
                            }}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="max-w-full">
                      <TagsInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Type a tag..."
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => {
                const selectedMembers = field.value || [];
                return (
                  <FormItem>
                    <FormLabel>Members</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-md justify-start text-left font-normal min-h-11"
                        >
                          {selectedMembers.length === 0 ? (
                            <span className="text-muted-foreground">
                              Select members
                            </span>
                          ) : selectedMembers.length <= 2 ? (
                            selectedMembers.map((selectedMember) => {
                              const member = workspaceMembers?.find(
                                (member) =>
                                  member.user._id === selectedMember.user
                              );
                              return `${member?.user.name} members selected`;
                            })
                          ) : (
                            `${selectedMembers.length} members selected`
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-sm max-w-full overflow-y-auto"
                        align="end"
                      >
                        <div className="flex flex-col gap-2">
                          {workspaceMembers?.map((member) => {
                            const selectedMember = selectedMembers.find(
                              (selected) => selected.user === member.user._id
                            );
                            return (
                              <div
                                key={member.user._id}
                                className="flex items-center gap-2 p-2 border rounded"
                              >
                                <Checkbox
                                  checked={!!selectedMember}
                                  onCheckedChange={(checked) =>
                                    handleCheckedChange(
                                      !!checked,
                                      member.user._id,
                                      selectedMembers,
                                      field.onChange
                                    )
                                  }
                                  id={`member-${member.user._id}`}
                                />
                                <span className="truncate flex-1">
                                  {member.user.name}
                                </span>
                                {selectedMember && (
                                  <Select
                                    value={selectedMember.role}
                                    onValueChange={(role: UserRole) =>
                                      handleChangeRole(
                                        role,
                                        selectedMembers,
                                        member
                                      )
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="manager">
                                        Manager
                                      </SelectItem>
                                      <SelectItem value="contributor">
                                        Contributor
                                      </SelectItem>
                                      <SelectItem value="viewer">
                                        Viewer
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                );
              }}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
