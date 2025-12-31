export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-12">
      <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Blog. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <a
            href="#"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
