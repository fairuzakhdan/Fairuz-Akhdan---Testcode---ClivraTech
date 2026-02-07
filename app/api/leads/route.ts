import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leadSchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const serviceType = searchParams.get('serviceType');

  const leads = serviceType 
    ? db.filterByService(serviceType)
    : db.getLeads();

  return NextResponse.json({ leads });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = leadSchema.parse(body);
    const lead = db.addLead(validated);
    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
