import prisma from "@/lib/db";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  try {
   const values = await req.json();
   const reply=await prisma.reply.create({
      data:{
        message:values.text,
        userId:id,
      }
   });
   const fb=await prisma.feedback.findMany({
      relationLoadStrategy: 'join',
      include:{
        reply:true
      }
     });
   return new Response(JSON.stringify({ success: true ,fb}));
  } catch (error) {
   return new Response(JSON.stringify({ success: false }));
  }
}
