import { getToken } from "@/authentication/get-token";

interface DeleteBudgetActionData {
  id: string;
  password: string;
}

export async function deleteBudgetAction (formData: DeleteBudgetActionData) {
  const token = await getToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/budget/${formData.id}`,)
}