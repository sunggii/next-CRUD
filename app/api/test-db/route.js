import prisma from '@/lib/prisma';

// API route สำหรับทดสอบการเชื่อมต่อกับฐานข้อมูล
export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW() AS now`;
    return Response.json({ 
      success: true, 
      time: result[0].now 
    });
  } catch (err) {
    return Response.json({ 
      success: false, 
      error: err.message 
    });
  }
}