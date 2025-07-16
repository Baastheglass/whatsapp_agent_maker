"use client";
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="font-sans bg-gray-50 dark:bg-gray-900 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-start responsive-container py-16 sm:py-20 lg:py-28 min-h-screen">
        {/* Custom Logo/Icon with animations */}
        <div className="flex items-center justify-center mb-8 lg:mb-12 animate-fadeInUp">
          <div className="relative group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-110">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110 animate-pulse">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="text-center max-w-4xl mx-auto px-4 animate-fadeInUp animation-delay-200 mb-10 lg:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 lg:mb-8 tracking-tight animate-slideInFromBottom leading-tight">
            WhatsApp Agent Maker
          </h1>
          {session ? (
            <div className="mb-4 lg:mb-6">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-green-600 dark:text-green-400 font-semibold animate-fadeInUp animation-delay-300">
                Welcome back, {session.user?.firstName || session.user?.name?.split(' ')[0] || session.user?.email}! 👋
              </p>
            </div>
          ) : null}
          <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 dark:text-gray-300 mb-4 lg:mb-6 leading-relaxed animate-fadeInUp animation-delay-400 mx-auto">
            Create, deploy, and manage intelligent WhatsApp automation agents with ease.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-lg text-gray-500 dark:text-gray-400 mb-10 lg:mb-12 animate-fadeInUp animation-delay-600 mx-auto max-w-2xl leading-relaxed">
            Build powerful chatbots, automate customer service, and streamline your WhatsApp business communications.
          </p>
        </div>

        <div className="flex gap-4 sm:gap-6 lg:gap-6 items-center flex-col sm:flex-row mb-12 lg:mb-16 animate-fadeInUp animation-delay-800">
          {session ? (
            // User is logged in - show dashboard and logout
            <>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-4 font-semibold text-base sm:text-lg lg:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 group"
              >
                <svg className="w-5 h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Go to Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full sm:w-auto rounded-xl border-2 border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-4 font-semibold text-base sm:text-lg lg:text-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 flex items-center justify-center gap-2 hover:border-red-400 dark:hover:border-red-500 hover:shadow-lg transform hover:scale-105 group"
              >
                <svg className="w-5 h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </>
          ) : (
            // User is not logged in - show signup and login
            <>
              <Link
                href="/signup"
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-4 font-semibold text-base sm:text-lg lg:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 group"
              >
                <svg className="w-5 h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-4 font-semibold text-base sm:text-lg lg:text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg transform hover:scale-105 group"
              >
                <svg className="w-5 h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </Link>
            </>
          )}
        </div>        {/* Features Grid */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 lg:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeInUp animation-delay-1000 group border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-6 lg:mb-6 transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 group-hover:scale-110 shadow-md">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg lg:text-2xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-5 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Smart Automation</h3>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">Create intelligent agents that understand context and respond naturally to customer inquiries.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeInUp animation-delay-1200 group border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mx-auto mb-6 lg:mb-6 transition-all duration-300 group-hover:bg-green-200 dark:group-hover:bg-green-800 group-hover:scale-110 shadow-md">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 dark:text-green-400 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg lg:text-2xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-5 transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400">Easy Setup</h3>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">Get your WhatsApp agent up and running in minutes with our intuitive drag-and-drop interface.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeInUp animation-delay-1400 group border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mx-auto mb-6 lg:mb-6 transition-all duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 group-hover:scale-110 shadow-md">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg lg:text-2xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-5 transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">Analytics & Insights</h3>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">Track performance, monitor conversations, and optimize your agents with detailed analytics.</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto py-8 lg:py-12 flex flex-col items-center justify-center text-sm lg:text-base text-gray-500 dark:text-gray-400 space-y-3 animate-fadeInUp animation-delay-1600 responsive-container">
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-wrap justify-center">
          <span>© 2025 WhatsApp Agent Maker</span>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-300 hover:scale-105">Privacy Policy</a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-300 hover:scale-105">Terms of Service</a>
        </div>
        <p className="text-xs lg:text-sm animate-pulse text-center">Built with ❤️ for WhatsApp automation</p>
      </footer>
    </div>
  );
}
