import { prisma } from "@/lib/prisma";

// GET all students
export async function GET() {
  const students = await prisma.student.findMany();
  return Response.json(students);
}

// CREATE student
export async function POST(req: Request) {
  const body = await req.json();

  const student = await prisma.student.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return Response.json(student);
}