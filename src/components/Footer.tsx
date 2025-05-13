import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white py-4 mt-8 z-10 pb-safe">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} David Khvedelidze. All rights
          reserved.
        </p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <a
              href="https://github.com/davidkhvedelidze"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/davidkhvedelidze"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
