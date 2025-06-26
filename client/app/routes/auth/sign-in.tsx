import AuthForm from "@/components/auth-form";
import { useLoginMutation } from "@/hooks/use-auth";
import { signInSchema } from "@/lib/schema";
import { useAuth } from "@/providers/auth-context";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type SignInFormData = z.infer<typeof signInSchema>;
const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate, isPending } = useLoginMutation();
  const handleOnSubmit = (data: SignInFormData) => {
    mutate(data, {
      onSuccess: (data) => {
        login(data);
        toast.success("Login successfully");
        navigate("/dashboard");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response.data?.message || "An error occurred";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={handleOnSubmit}
      isPending={isPending}
    />
  );
};

export default SignIn;
