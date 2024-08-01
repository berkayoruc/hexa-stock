"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function getProductsSSR() {
  const supabase = createClient();
  const { data, error } = await supabase.from("product").select();
  if (data.length) {
    return data;
  } else {
    console.error(error);
    return [];
  }
}
