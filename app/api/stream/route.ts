import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/lib/db";
const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYoutube = data.url.includes("youtube");
    const extractedId =
      data.url.split("?v=")[1] || data.url.split("youtu.be/")[1];
    if (!isYoutube) {
      return NextResponse.json({ message: "Invalid url" }, { status: 400 });
    }
    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
      },
    });

    return new Response("hi there");
  } catch (e) {
    return NextResponse.json(
      { message: `Error while adding a stream Error: ${e}` },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorId || "",
    },
  });

  return NextResponse.json({ streams }, { status: 200 });
}
