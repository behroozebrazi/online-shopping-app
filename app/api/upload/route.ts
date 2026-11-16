import { NextResponse } from "next/server";

import path from "path";
import fs from "fs";

export const runtime = "nodejs";

function ensureUploadDir(): string {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  return uploadDir;
}

function generateFileName(originalName: string): string {
  const timePart = Date.now().toString();
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `${timePart}_${safeName}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file)
      return NextResponse.json({ message: "No file name is provided!" });

    // upload the file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = ensureUploadDir();
    const fileName = generateFileName(file.name);
    const filePath = path.join(uploadDir, fileName);
    const publicUrl = `/uploads/products/${fileName}`;
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    return NextResponse.json({ message: "Upload failed!" });
  }
}
