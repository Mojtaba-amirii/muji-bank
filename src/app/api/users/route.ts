import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password, amount } = await req.json();

  if (!username || !password || amount === undefined) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  if (typeof amount !== "number" || amount < 0) {
    return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
  }

  try {
    await sql`BEGIN`;

    const { rows: existingUsers } = await sql`
      SELECT id FROM users WHERE username = ${username};
    `;
    if (existingUsers.length > 0) {
      await sql`ROLLBACK`;
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows: userRows } = await sql`
      INSERT INTO users (username, password)
      VALUES (${username}, ${hashedPassword})
      RETURNING id;
    `;
    const userId = userRows[0].id;
    await sql`
      INSERT INTO accounts (user_id, amount)
      VALUES (${userId}, ${amount});
    `;
    await sql`COMMIT`;

    return NextResponse.json({ message: "User registered successfully" });
  } catch (err) {
    await sql`ROLLBACK`;
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
