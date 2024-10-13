import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/lib/db";

const createUpvoteSchema = z.object({
  creatorId: z.string(),
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  // TODO: replace email with id everywhere
  // TODO: you can get rid of Db call here
  const user = await prismaClient.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });
  if (!user) {
    return NextResponse.json({ message: "Unauthenticated " }, { status: 403 });
  }

  try {
    const data = createUpvoteSchema.parse(await req.json());
    await prismaClient.upvote.delete({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
    });
    return NextResponse.json({ message: "hi there" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error while updating upvote Error: ${error}` },
      { status: 500 }
    );
  }
}
