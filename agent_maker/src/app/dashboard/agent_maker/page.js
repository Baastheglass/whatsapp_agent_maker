'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AgentMaker() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [whatsappStatus, setWhatsappStatus] = useState('disconnected');
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Check WhatsApp status and QR code
  const checkWhatsAppStatus = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/whatsapp/status');
      const data = await response.json();
      setWhatsappStatus(data.status);
      setQrCode(data.qrCode);
    } catch (error) {
      console.error('Error checking WhatsApp status:', error);
      setMessage('Error connecting to WhatsApp service');
    }
  };

  // Start WhatsApp client
  const startWhatsAppClient = async () => {
    setLoading(true);
    setMessage('Starting WhatsApp client...');
    
    try {
      const response = await fetch('http://localhost:3000/api/whatsapp/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user?.id,
          email: session.user?.email
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(data.message);
        setWhatsappStatus(data.status);
        
        // If QR code is in the response, set it immediately
        if (data.qrCode) {
          setQrCode(data.qrCode);
        }
        
        // Start polling for status updates only if not ready
        if (data.status !== 'ready') {
          const pollInterval = setInterval(async () => {
            await checkWhatsAppStatus();
            // Stop polling when ready or failed
            if (whatsappStatus === 'ready' || whatsappStatus === 'auth_failed') {
              clearInterval(pollInterval);
            }
          }, 2000);
          
          // Clear interval after 5 minutes
          setTimeout(() => clearInterval(pollInterval), 300000);
        }
      } else {
        setMessage(data.message || 'Failed to start WhatsApp client');
      }
    } catch (error) {
      console.error('Error starting WhatsApp client:', error);
      setMessage('Error starting WhatsApp client');
    } finally {
      setLoading(false);
    }
  };

  // Check status on component mount and periodically
  useEffect(() => {
    checkWhatsAppStatus();
    const interval = setInterval(checkWhatsAppStatus, 5000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 hidden lg:flex lg:flex-col">
        <div className="flex items-center px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
            </div>
            <span className="ml-3 text-lg font-bold text-gray-900 dark:text-white">WAM</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link 
            href="/dashboard" 
            className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Overview
          </Link>
          
          <Link 
            href="/dashboard/agents" 
            className="flex items-center px-4 py-3 text-gray-900 dark:text-white bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500 font-medium transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
            </svg>
            Agent Maker
          </Link>

          
        </nav>
        
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                    </svg>
                  </div>
                  <span className="ml-3 text-lg font-bold text-gray-900 dark:text-white">WAM</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block font-medium">
                  Agent Maker
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
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
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    Agent Maker
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Create and manage your WhatsApp automation agents
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Area - WhatsApp Connection Interface */}
            <div className="space-y-6">
              {/* WhatsApp Connection Status */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    WhatsApp Connection
                  </h2>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      whatsappStatus === 'ready' ? 'bg-green-500' :
                      whatsappStatus === 'qr_ready' ? 'bg-yellow-500' :
                      whatsappStatus === 'initializing' ? 'bg-blue-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                      {whatsappStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {message && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <p className="text-blue-700 dark:text-blue-300 text-sm">{message}</p>
                  </div>
                )}

                {whatsappStatus === 'disconnected' && (
                  <button
                    onClick={startWhatsAppClient}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Starting...' : 'Connect WhatsApp'}
                  </button>
                )}

                {whatsappStatus === 'ready' && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-700 dark:text-green-300 font-medium">
                        WhatsApp is connected and ready!
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* QR Code Display */}
              {qrCode && whatsappStatus === 'qr_ready' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Scan QR Code
                  </h2>
                  <div className="text-center">
                    <div className="inline-block p-4 bg-white rounded-lg shadow-md">
                      <img 
                        src={qrCode} 
                        alt="WhatsApp QR Code" 
                        className="w-64 h-64 mx-auto"
                      />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                      Open WhatsApp on your phone and scan this QR code to connect
                    </p>
                  </div>
                </div>
              )}

              {/* Agent Creation Area */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to Create Agents
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {whatsappStatus === 'ready' 
                      ? 'Your WhatsApp is connected! Start building your automation agents.'
                      : 'Connect your WhatsApp first to start creating agents.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
