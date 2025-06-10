import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";

import { Link } from "react-router";
import type { ZodType } from "zod";

interface Props<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T, any, any>;
  defaultValues: T;
  onSubmit: (data: T) => void;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === "SIGN_IN";
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isSignIn ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {isSignIn
              ? "Sign in to your account to continue"
              : "Create an account to continue"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {Object.keys(defaultValues).map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as Path<T>}
                  render={({ field }) => (
                    <FormItem>
                      {isSignIn && field.name === "password" ? (
                        <div className="flex items-center justify-between">
                          <FormLabel>
                            {
                              FIELD_NAMES[
                                field.name as keyof typeof FIELD_NAMES
                              ]
                            }
                          </FormLabel>
                          <Link
                            to="/forgot-password"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      ) : (
                        <FormLabel>
                          {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                        </FormLabel>
                      )}

                      <FormControl>
                        <Input
                          type={
                            FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" className="w-full">
                {isSignIn ? "Sign In" : "Sign Up"}
              </Button>
              <CardFooter className="flex items-center justify-center mt-6">
                <div className="flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    {isSignIn
                      ? "Don't have an account?"
                      : "Already have an account?"}{" "}
                    <Link
                      className="underline  text-blue-600"
                      to={isSignIn ? "/sign-up" : "/sign-in"}
                    >
                      {isSignIn ? "Sign Up" : "Sign In"}
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
