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
  const { data, error } = await supabase
    .from("product")
    .select(
      `
    id,
    name,
    purchase_price,
    count,
    category (
      name
    )
    `
    )
    .order("name", { ascending: true });
  if (data.length) {
    return data;
  } else {
    console.error(error);
    return [];
  }
}

export async function sellProductSSR(product) {
  const supabase = createClient();
  const { error } = await supabase
    .from("product")
    .update({
      count: product.count,
    })
    .eq("id", product.id);
  if (error) {
    console.error(error);
    return { error };
  }
}
