import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getToken = async () => {
  const cookieStore = await cookies();
    const token = cookieStore.get("CASHTRACKER_TOKEN")?.value;
    if (!token) {
      redirect("/auth/login");
    }
    return token;
};
