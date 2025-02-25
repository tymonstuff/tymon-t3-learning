import { currentUser } from "@clerk/nextjs/server";

/**
 * Checks if the current user has admin role
 * @returns Promise<boolean> - True if user is an admin, false otherwise
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const user = await currentUser();
    if (!user) return false;

    // Check user's public metadata for role
    return user.publicMetadata?.role === "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}
