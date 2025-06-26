import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-context";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  return <Button onClick={logout}>Log out</Button>;
};

export default DashboardLayout;
