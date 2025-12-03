import AuthWrapper from "@/layout/form/auth-wrapper";
import { RoleSelectionOverlay } from "@/layout/form/role-select";
import LoginForm from "@/ui/auth/login";
import { useState } from "react";

const Home = () => {
  const [showRoleSelection, setShowRoleSelection] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'driver' | 'partner'>('driver');

  const handleSelectRole = (role: 'driver' | 'partner') => {
    setSelectedRole(role);
    setShowRoleSelection(false);
  };

  const handleGoToSignup = () => {
    console.log('Redirect to signup');
  };

  return (
    <>
      <AuthWrapper>
        {!showRoleSelection && <LoginForm loginType={selectedRole} />}
      </AuthWrapper>

      {showRoleSelection && (
        <RoleSelectionOverlay
          onSelectRole={handleSelectRole}
          onClose={handleGoToSignup}
        />
      )}
    </>
  );
};

export default Home;