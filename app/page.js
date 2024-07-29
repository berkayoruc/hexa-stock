import { createClient } from "@/utils/supabase/server";
import { logout } from "./login/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function Home() {
  const Logout = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/");
  };

  return (
    <main>
      <h1 className="text-3xl font-bold">Hello world</h1>
      <form action={Logout}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Log out
        </button>
      </form>
    </main>
  );
}
