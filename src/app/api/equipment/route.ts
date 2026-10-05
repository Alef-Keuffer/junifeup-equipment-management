import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_CATEGORIES = ['Laptop', 'Monitor', 'Smartphone', 'Tablet', 'Printer', 'Network Equipment'];
const VALID_STATUSES = ['Available', 'Assigned', 'Maintenance', 'Retired'];

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const equipmentList = await prisma.equipment.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json(equipmentList);
  } catch (error: any) {
    console.error("Prisma error in GET /api/equipment:", error);
    return NextResponse.json({ error: 'Failed to fetch equipment', details: error.message || String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, serial_number, status, location, purchase_date } = body;

    // Validation
    if (!name || !category || !serial_number || !status || !location || !purchase_date) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const newEquipment = await prisma.equipment.create({
      data: {
        name,
        category,
        serial_number,
        status,
        location,
        purchase_date
      }
    });

    return NextResponse.json(newEquipment, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Serial number already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create equipment' }, { status: 500 });
  }
}
