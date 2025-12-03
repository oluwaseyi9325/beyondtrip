// // import Container from "@/components/container";
// import AuthWrapper from "@/layout/form/auth-wrapper";
// import { RoleSelectionOverlay } from "@/layout/form/role-select";
// import Login from "@/ui/auth/login";
// // import router from "next/router";
// import { useState } from "react";

// const Home = () => {
//   const [showRoleSelection, setShowRoleSelection] = useState(true);

//   const handleSelectRole = (role: any) => {
//     setShowRoleSelection(false);
//     // Store role or redirect based on selection
//     if (role === 'driver') {
//       // Stay on driver login or redirect
//     } else {
//       // Redirect to partner login
//       // router.push('/partners/login');
//     }
//   };
//   return (
//     <>
//       <AuthWrapper>
//         <Login />
//       </AuthWrapper>

//       {showRoleSelection && (
//         <RoleSelectionOverlay
//           onSelectRole={handleSelectRole}
//           onClose={() => setShowRoleSelection(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Home;



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
    // Redirect to signup page
    // router.push('/signup');
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