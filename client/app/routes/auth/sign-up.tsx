import AuthForm from "@/components/auth-form";
import { useSignUpMutation } from "@/hooks/use-auth";
import { signUpSchema } from "@/lib/schema";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export type SignUpFormData = z.infer<typeof signUpSchema>;
const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useSignUpMutation();
  const handleOnSubmit = (data: SignUpFormData) => {
    mutate(data, {
      onSuccess() {
        toast.success(
          "Account created successfully! Please check your email to verify your account.",
          {
            description:
              "please check your spam folder if you do not see the email.",
          }
        );
        navigate("/sign-in");
      },
      onError(error: any) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
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
