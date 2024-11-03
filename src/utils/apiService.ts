import { User } from "../types/types";

export async function registerUser(user: User) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
}

export async function loginUser({
  username,
  password,
}: Pick<User, "username" | "password">) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/sessions`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function getAccount(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me/accounts`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function getUserProfile(token: string): Promise<User> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me/accounts`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
