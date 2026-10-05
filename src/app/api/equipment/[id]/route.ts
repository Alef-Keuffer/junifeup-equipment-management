import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_CATEGORIES = ['Laptop', 'Monitor', 'Smartphone', 'Tablet', 'Printer', 'Network Equipment'];
const VALID_STATUSES = ['Available', 'Assigned', 'Maintenance', 'Retired'];

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const equipment = await prisma.equipment.findUnique({
      where: { id: parseInt(id) }
    });

    if (!equipment) {
      return NextResponse.json({ error: 'Equipment not found' }, { status: 404 });
    }

    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const updatedEquipment = await prisma.equipment.update({
      where: { id: parseInt(id) },
      data: {
        name,
        category,
        serial_number,
        status,
        location,
        purchase_date
      }
    });

    return NextResponse.json(updatedEquipment);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Serial number already exists' }, { status: 409 });
    }
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Equipment not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update equipment' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.equipment.delete({
      where: { id: parseInt(id) }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Equipment not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete equipment' }, { status: 500 });
  }
}
