import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "default_secret";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const { rows } = await sql`
      SELECT * FROM users WHERE username = ${username};
    `;
    const dbUser = rows[0];

    if (dbUser && dbUser.password === password) {
      const token = jwt.sign({ userId: dbUser.id }, secret);
      return NextResponse.json({ token });
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error("Error during login:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
