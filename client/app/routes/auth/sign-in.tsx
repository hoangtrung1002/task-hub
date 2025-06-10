import AuthForm from "@/components/auth-form";
import { signInSchema } from "@/lib/schema";
import { z } from "zod";

type SignInFormData = z.infer<typeof signInSchema>;
const SignIn = () => {
  const handleOnSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={handleOnSubmit}
    />
  );
};

export default SignIn;
