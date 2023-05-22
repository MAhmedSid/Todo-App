import { NextRequest, NextResponse } from "next/server";
import { db, tasksTable, Task } from "../../../lib/drizzle";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  // const listidParam: number = Number(req.nextUrl.searchParams.get("listid"));

  try {
    const res = await db
      .select()
      .from(tasksTable)
      // .where(eq(tasksTable.listid, listidParam));

    return NextResponse.json({ data: res });

  } catch (error: any) {
    console.log((error as { message: string }).message);
    NextResponse.json({ message: "Something went wrong" });
  }
}

export async function POST(req: NextRequest) {
  const body: Task = await req.json();
  try {
    const data = await db.insert(tasksTable).values(body).execute();

    return NextResponse.json(
      JSON.stringify({
        message: "Data Added",
        data,
      })
    );
  } catch (error: any) {
    console.log(error);
    NextResponse.json({ message: "Something went wrong" });
  }
}


export async function DELETE(req: NextRequest) {
  const taskId: number = Number(req.nextUrl.searchParams.get("id"));
  try {
    const data = await db.delete(tasksTable).where(eq(tasksTable.id, taskId)).execute();

    return NextResponse.json(
      JSON.stringify({
        message: "TASK DELETED",
        data,
      })
    );
  } catch (error: any) {
    console.log(error);
    NextResponse.json({ message: "Something went wrong" });
  }
}
