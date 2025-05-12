import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} David Khvedelidze. All rights
          reserved.
        </p>
        <ul className="flex justify-center space-x-4 mt-2">
          {/* Links removed as per request */}
        </ul>
      </div>
    </footer>
  );
}
