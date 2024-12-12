import { User } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${error.message}`
    );
  }
  return response.json();
}

export async function registerUser(user: User) {
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return handleResponse(res);
}

export async function loginUser({
  username,
  password,
}: Pick<User, "username" | "password">) {
  const response = await fetch(`${API_BASE_URL}/api/users/sessions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(response);
}

export async function getAccount(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/users/me/accounts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

export async function getUserProfile(token: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/api/users/me/accounts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}
