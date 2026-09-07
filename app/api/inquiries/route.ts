import { saveInquiry } from '@/lib/inquiry-storage';
export const runtime = 'nodejs';
import { z } from 'zod';
const schema=z.object({name:z.string().trim().min(1).max(120),email:z.string().trim().email().max(254),company:z.string().trim().max(160).default(''),service:z.enum(['Custom AI Solutions','Automations','Motion Design & Video Editing','Social Media Marketing','Not sure yet']),budget:z.string().max(60).default(''),message:z.string().trim().min(10).max(5000),website:z.string().max(500).default('')});
export async function POST(request:Request){
 if(request.headers.get('origin')&&request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Invalid request origin.'},{status:403});
 if(Number(request.headers.get('content-length')||0)>20000)return Response.json({error:'Please shorten your message.'},{status:413});
 try{const parsed=schema.safeParse(await request.json());if(!parsed.success)return Response.json({error:'Please add your name, a valid email, and at least 10 characters about your project.'},{status:400});if(parsed.data.website)return Response.json({error:'Unable to submit this inquiry.'},{status:400});const {website,...data}=parsed.data;const id=crypto.randomUUID();await saveInquiry({...data,id,createdAt:new Date().toISOString()});return Response.json({reference:id.slice(0,8).toUpperCase()},{status:201});}catch{return Response.json({error:'We couldn’t save your inquiry. Please try again shortly.'},{status:500});}
}
