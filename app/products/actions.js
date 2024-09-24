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
      id,
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
  console.log(product);
  const supabase = createClient();
  // update product count
  const updateResponse = await supabase
    .from("product")
    .update({
      count: product.count,
    })
    .eq("id", product.id);
  if (updateResponse?.error) {
    console.error(updateResponse?.error);
    return { error: updateResponse?.error };
  }

  const sellResponse = await supabase.from("sold-product").insert({
    name: product?.name,
    purchase_price: product?.purchase_price,
    count: product?.sell_count,
    sold_price: product?.sell_price,
    category_id: product?.category?.id,
    product_id: product?.id,
  });
  if (sellResponse?.error) {
    console.error(sellResponse?.error);
    return { error: sellResponse?.error };
  }
}
