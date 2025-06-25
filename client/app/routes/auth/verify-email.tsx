import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useVerifyEmailMutation } from "@/hooks/use-auth";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending: isVerifying } = useVerifyEmailMutation();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setIsSuccess(false);
    } else {
      mutate(
        { token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: () => {
            setIsSuccess(false);
          },
        }
      );
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            {isVerifying ? (
              <>
                <Loader2 className="size-10 text-gray-500 animate-spin" />
                <h3 className="text-lg font-semibold">Verifying email...</h3>
                <p className="text-sm text-gray-500">
                  Please wait while we verify your email address.
                </p>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="size-10 text-green-500" />
                <h3 className="text-lg font-semibold">Email Verified</h3>
                <p className="text-sm text-gray-500">
                  Your email has been verified successfully
                </p>
                <Link to="/sign-in" className="text-sm text-blue-500 mt-5">
                  <Button variant="outline">Back to Sign In</Button>
                </Link>
              </>
            ) : (
              <>
                <XCircle className="size-10 text-red-500" />
                <h3 className="text-lg font-semibold">Email Verified Failed</h3>
                <p className="text-sm text-gray-500">
                  Your email verification failed. Please try again.
                </p>
                <Link to="/sign-in" className="text-sm text-blue-500 mt-5">
                  <Button variant="outline">Back to Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
