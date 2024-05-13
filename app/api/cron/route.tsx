import { NextResponse } from "next/server";

export async function GET() {
  const result = await fetch(
    "http://worldtimeapi.org/api/timezone/America/Chicago",
    {
      cache: "no-store",
    }
  );
  const data = await result.json();

  return NextResponse.json({ datetime: data.datetime });
}
