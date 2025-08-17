import { Logo } from "@/components";
import { User } from "@/interface";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function checkUserSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("CASHTRACKER_TOKEN")?.value;

  if (!token || token.trim() === "") {
    return null;
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (res.ok) {
      const user = await res.json();
      return user && user.id ? user : null;
    }

    return null;
  } catch (error) {
    console.log("Network error verifying token:", error);
    return null;
  }
}

export default async function RootAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verificar sesión una sola vez
  const user = await checkUserSession();

  if (user) {
    redirect("/admin");
  }

  console.log("No user session, showing auth layout");
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
        <div className="bg-purple-950 flex justify-center bg-auth">
          <div className="w-96 py-10 lg:py-20">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </div>

        <div className="p-10 lg:py-28">
          <div className="max-w-3xl mx-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
