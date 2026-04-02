import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { email, source } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Append to leads.csv in project root
  const leadsFile = path.join(process.cwd(), "leads.csv");
  const line = `${new Date().toISOString()},${email.replace(/,/g, "")},${(source || "homepage").replace(/,/g, "")}\n`;

  try {
    if (!fs.existsSync(leadsFile)) {
      fs.writeFileSync(leadsFile, "timestamp,email,source\n");
    }
    fs.appendFileSync(leadsFile, line);
  } catch {
    // Non-fatal — log but don't fail the request
    console.error("Could not write leads.csv:", email);
  }

  console.log(`📧 Lead captured: ${email} [${source}]`);
  return NextResponse.json({ success: true });
}
