import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const commitments = Array.isArray(body.commitments) ? body.commitments.slice(0, 4) : [];
    const fire = typeof body.fire === "string" ? body.fire.trim() : "";
    const time = typeof body.time === "string" ? body.time.trim() : "";

    if (!commitments.length || !fire || !time) {
      return NextResponse.json({ error: "Missing required survey data." }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        commitments,
        fire,
        time,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Survey submission failed", error);
    return NextResponse.json({ error: "Unable to save lead right now." }, { status: 500 });
  }
}
