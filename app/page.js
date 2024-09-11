import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "primereact/button";

export default function Home() {
  const Logout = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/login");
  };

  redirect("/products");

  return (
    <main>
      <h1 className="text-3xl font-bold">Hello world</h1>
      <form action={Logout}>
        <Button label="Log out"></Button>
      </form>
    </main>
  );
}
