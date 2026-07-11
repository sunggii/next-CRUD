import Link from "next/link";
import Header from "@/component/Header";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Header>
        Students Management
      </Header>
      <p>
        This is a simple CRUD application for managing students using Next.js, \
        Prisma, and PostgreSQL.
      </p>

      <div className="mt-6 flex items-center gap-4">
        <Link
            href="/api/student"
            className='bg-gray-500 rounded px-3 py-1 mr-2 text-white hover:bg-gray-600 transition'
            target="_blank"
          >
            View API
        </Link>
        <Link
            href="/student"
            className='bg-gray-500 rounded px-3 py-1 mr-2 text-white hover:bg-gray-600 transition'
          >
            View Students
        </Link>
       
      </div>
    </div>  
  );
}
