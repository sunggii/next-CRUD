import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
	const { id: rawId } = await params;
	const id = Number(rawId);

	if (Number.isNaN(id)) {
		return Response.json({ message: 'Invalid student id' }, { status: 400 });
	}

	const data = await request.json();

	try {
		const student = await prisma.student.update({
			where: { id },
			data: {
				name: data.name,
				age: data.age,
				major: data.major,
			},
		});

		return Response.json(student);
	} catch (error) {
		return Response.json({ message: 'Student not found' }, { status: 404 });
	}
}

export async function DELETE(_request, { params }) {
	const { id: rawId } = await params;
	const id = Number(rawId);

	if (Number.isNaN(id)) {
		return Response.json({ message: 'Invalid student id' }, { status: 400 });
	}

	try {
		await prisma.student.delete({
			where: { id },
		});

		return Response.json({ message: 'Student deleted successfully' });
	} catch (error) {
		return Response.json({ message: 'Student not found' }, { status: 404 });
	}
}