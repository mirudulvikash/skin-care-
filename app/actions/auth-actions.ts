"use server";

import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { sendWelcomeEmail } from "@/lib/email";

export async function signUp(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }
  
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  try {
    const existingUser = await query("SELECT id FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return { error: "User with this email already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const id = crypto.randomUUID();

    await query(
      "INSERT INTO users (id, name, email, password_hash) VALUES ($1, $2, $3, $4)",
      [id, name, email, passwordHash]
    );

    // Trigger the welcome email (non-blocking)
    sendWelcomeEmail(email, name).catch(console.error);

  } catch (error) {
    console.error("Signup error:", error);
    return { error: "An unexpected error occurred" };
  }

  // After signup, redirect to login page as requested
  redirect("/sign-in?registered=true");
}

export async function continueAsGuest() {
  await createSession("guest_id", "Guest User", "guest@dermasense.local");
  redirect("/");
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "All fields are required" };
  }

  try {
    const userResult = await query("SELECT id, name, email, password_hash FROM users WHERE email = $1", [email]);
    const user = userResult.rows[0];

    if (!user) {
      return { error: "Invalid email or password" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return { error: "Invalid email or password" };
    }

    await createSession(user.id, user.name, user.email);
  } catch (error) {
    console.error("Signin error:", error);
    return { error: "An unexpected error occurred" };
  }

  redirect("/");
}

export async function signOut() {
  await deleteSession();
  redirect("/sign-in");
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!email || !newPassword) {
    return { error: "Email and new password are required" };
  }

  if (newPassword.length < 8) {
    return { error: "New password must be at least 8 characters long" };
  }

  try {
    const userResult = await query("SELECT id FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return { error: "No account found with this email address" };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await query("UPDATE users SET password_hash = $1 WHERE email = $2", [passwordHash, email]);
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: "Failed to update password" };
  }

  redirect("/sign-in?reset=true");
}
