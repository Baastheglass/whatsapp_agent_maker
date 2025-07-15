import Link from 'next/link';

export default function AuthNavigation({ currentPage }) {
  return (
    <nav className="mb-8 animate-fadeInUp">
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all duration-300 group hover:scale-105"
      >
        <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="transition-all duration-300 group-hover:underline">Back to Home</span>
      </Link>
    </nav>
  );
}
