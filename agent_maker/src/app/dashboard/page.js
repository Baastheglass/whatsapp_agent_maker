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
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 lg:w-6 lg:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </div>
                <span className="ml-3 text-lg lg:text-xl font-bold text-gray-900 dark:text-white">WhatsApp Agent Maker</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hidden sm:block font-medium">
                Welcome, {session.user?.firstName || session.user?.name?.split(' ')[0] || 'User'}! 👋
              </div>
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 lg:px-5 lg:py-2.5 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="space-y-6 lg:space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-green-100 dark:bg-green-900 mb-6">
              <svg className="h-8 w-8 lg:h-10 lg:w-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to your Dashboard!
            </h1>
            <p className="text-base lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              You've successfully logged in with NextAuth. This is where you'll manage your WhatsApp agents.
            </p>
            
            {/* Mobile welcome message */}
            <div className="sm:hidden mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                Welcome, {session.user?.firstName || session.user?.name?.split(' ')[0] || 'User'}! 👋
              </p>
            </div>
          </div>

          {/* Session Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-6">Your Session Info</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                <p className="text-base lg:text-lg text-gray-900 dark:text-white font-medium break-all">{session.user?.email}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                <p className="text-base lg:text-lg text-gray-900 dark:text-white font-medium">{session.user?.name || `${session.user?.firstName} ${session.user?.lastName}` || 'Not provided'}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</label>
                <p className="text-sm lg:text-base text-gray-900 dark:text-white font-mono bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg border break-all">{session.user?.id}</p>
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 rounded-xl p-6 lg:p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-lg">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">WhatsApp Agents</h3>
              <p className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">0</p>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">Active agents</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6 lg:p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-lg">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">Messages</h3>
              <p className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">0</p>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">Messages sent</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700 rounded-xl p-6 lg:p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-lg">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">Conversations</h3>
              <p className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">0</p>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">Total conversations</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
