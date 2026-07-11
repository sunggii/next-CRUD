import prisma from '@/lib/prisma';
import StudentClient from './StudentClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const students = await prisma.student.findMany({
        orderBy: { id: 'asc' },
    });

    return <StudentClient students={students} />;
}