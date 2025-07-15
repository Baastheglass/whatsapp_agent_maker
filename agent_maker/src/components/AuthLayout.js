export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        {subtitle}
      </p>
      {children}
    </div>
  );
}
