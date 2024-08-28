import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  const { username, password, amount } = await req.json();

  try {
    const { rows } = await sql`
      INSERT INTO users (username, password)
      VALUES (${username}, ${password})
      RETURNING id;
    `;
    const userId = rows[0].id;

    await sql`
      INSERT INTO accounts (user_id, amount)
      VALUES (${userId}, ${amount});
    `;
    return NextResponse.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
