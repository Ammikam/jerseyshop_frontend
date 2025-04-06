import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/Database/config';

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
      // Check if the current path is '/admin'
      const isAdminPage = window.location.pathname === '/admin';

      // Only redirect if it's not the admin page and the user is not authenticated
      if (!loading && !user && !isAdminPage) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    // Allow access to the admin page without authentication
    if (window.location.pathname === '/admin') {
      return <WrappedComponent {...props} />;
    }

    if (!user) {
      // Optionally, show a message or redirect if user is not authenticated
      return <div>You are not authorized to view this page.</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;