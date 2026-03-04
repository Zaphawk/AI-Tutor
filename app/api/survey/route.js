import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidSurveyPayload } from "@/lib/survey";

export async function POST(request) {
  try {
    const body = await request.json();
    const normalized = isValidSurveyPayload(body);

    if (!normalized.valid) {
      return NextResponse.json(
        { error: "Invalid survey data. Please select valid options before continuing." },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        commitments: normalized.commitments,
        fire: normalized.fire,
        time: normalized.time,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Survey submission failed", error);
    return NextResponse.json({ error: "Unable to save lead right now." }, { status: 500 });
  }
}
