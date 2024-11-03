import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = process.env.JWT_SECRET || "default_secret";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Missing credentials" },
      { status: 400 }
    );
  }

  try {
    const { rows } = await sql`
      SELECT * FROM users WHERE username = ${username};
    `;
    const dbUser = rows[0];
    console.log("db user", dbUser);
    if (dbUser && (await bcrypt.compare(password, dbUser.password))) {
      const token = jwt.sign({ userId: dbUser.id }, secret, {
        expiresIn: "1h",
      });
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
