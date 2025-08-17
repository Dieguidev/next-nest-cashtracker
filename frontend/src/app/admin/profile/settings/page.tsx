import { verifySession } from "@/authentication/dal";
import { ProfileForm } from "@/components";
import { User } from "@/interface";

export default async function EditProfilePage() {
  const user: User = await verifySession();
  return (
    <>
      <h1 className="font-black text-4xl text-purple-950 my-5">
        Actualizar Perfil
      </h1>
      <p className="text-xl font-bold">
        Aquí puedes cambiar los datos de tu {""}
        <span className="text-amber-500">perfil</span>
      </p>
      <ProfileForm user={user} />
    </>
  );
}
