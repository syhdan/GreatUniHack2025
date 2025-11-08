import { NextResponse } from "next/server"
import { getGuideById } from "@/lib/guides-data"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const guide = getGuideById(id)

  if (!guide) {
    return NextResponse.json({ error: "Guide not found" }, { status: 404 })
  }

  return NextResponse.json(guide)
}

