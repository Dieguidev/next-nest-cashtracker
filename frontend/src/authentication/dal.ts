import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const verifySession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("CASHTRACKER_TOKEN")?.value;
  if (!token) {
    redirect("/auth/login");
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const session = await res.json();
  if (!session) {
    redirect("/auth/login");
  }

  console.log(session);

  return session;
};
