import AuthForm from "@/components/auth-form";
import { useSignUpMutation } from "@/hooks/use-auth";
import { signUpSchema } from "@/lib/schema";
import { toast } from "sonner";
import { z } from "zod";

export type SignUpFormData = z.infer<typeof signUpSchema>;
const SignUp = () => {
  const { mutate, isPending } = useSignUpMutation();
  const handleOnSubmit = (data: SignUpFormData) => {
    mutate(data, {
      onSuccess() {
        toast.success(
          "Account created successfully! Please check your email to verify your account."
        );
      },
      onError(error: any) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        console.log(error);

        toast.error(errorMessage);
      },
    });
  };

  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{ email: "", password: "", name: "", confirmPassword: "" }}
      onSubmit={handleOnSubmit}
      isPending={isPending}
    />
  );
};

export default SignUp;
