import { NextResponse } from 'next/server';
import { db } from '@db/connection'; 
import { properties } from '@db/schema';

export async function GET() {
    const allProperties = await db.select().from(properties);
    return NextResponse.json(allProperties);
}
