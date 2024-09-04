import { SessionProvider, useSession } from 'next-auth/react';
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import Context from '@/components/Context';
import Navbar from '@/components/Layout/Navbar';
import { useRouter } from 'next/router';

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to the login page if the user is not authenticated
  if (status === 'loading') return null; // Optional: Add a loading state here
  if (!session && router.pathname !== '/auth') {
    router.push('/auth');
    return null;
  }

  return (
    <>
      {/* Render the Navbar on all pages except the /auth page */}
      {session && router.pathname !== '/auth' && <Navbar />}
      {children}
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Context>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </Context>
    </SessionProvider>
  );
}

export default MyApp;
