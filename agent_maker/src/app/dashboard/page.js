'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="nav-container bg-white dark:bg-gray-800 shadow">
        <div className="responsive-container">
          <div className="nav-content">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </div>
                <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-gray-900 dark:text-white">WhatsApp Agent Maker</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
                Welcome, {session.user?.name || session.user?.firstName || session.user?.email}!
              </div>
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
              >
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="responsive-container py-4 sm:py-6">
        <div className="dashboard-layout">
          <div className="responsive-card bg-white dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-green-100 dark:bg-green-900">
                <svg className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 dark:text-white">
                Welcome to your Dashboard!
              </h3>
              <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                You've successfully logged in with NextAuth. This is where you'll manage your WhatsApp agents.
              </p>
              
              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                <div className="responsive-card bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Your Session Info:</h4>
                  <div className="text-left space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Email:</strong> <span className="break-all">{session.user?.email}</span></p>
                    <p><strong>Name:</strong> {session.user?.name || `${session.user?.firstName} ${session.user?.lastName}` || 'Not provided'}</p>
                    <p><strong>User ID:</strong> <span className="font-mono text-xs break-all">{session.user?.id}</span></p>
                  </div>
                </div>
                
                <div className="card-grid">
                  <div className="responsive-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 text-center">
                    <h5 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">WhatsApp Agents</h5>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400 mt-1 sm:mt-2">0</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Active agents</p>
                  </div>
                  
                  <div className="responsive-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 text-center">
                    <h5 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Messages</h5>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1 sm:mt-2">0</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Messages sent</p>
                  </div>
                  
                  <div className="responsive-card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700 text-center">
                    <h5 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Conversations</h5>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1 sm:mt-2">0</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total conversations</p>
                  </div>
                </div>
                
                {/* Mobile welcome message */}
                <div className="sm:hidden text-center mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Welcome, {session.user?.firstName || session.user?.name?.split(' ')[0] || 'User'}! 👋
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
