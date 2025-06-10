import AuthForm from "@/components/auth-form";
import { signUpSchema } from "@/lib/schema";
import { z } from "zod";

type SignUpFormData = z.infer<typeof signUpSchema>;
const SignUp = () => {
  const handleOnSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{ email: "", password: "", name: "", confirmPassword: "" }}
      onSubmit={handleOnSubmit}
    />
  );
};

export default SignUp;
