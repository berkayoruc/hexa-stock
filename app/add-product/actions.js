"use server";
import { createClient } from "@/utils/supabase/server";

export async function updateProduct(product) {
  const data = {
    name: product.get("name"),
    purchase_price: parseFloat(product.get("purchase_price").replace(",", "")),
    count: product.get("count"),
    id: product.get("id"),
  };
  const supabase = createClient();
  const { error } = await supabase
    .from("product")
    .update({
      name: data.name,
      purchase_price: data.purchase_price,
      count: data.count,
    })
    .eq("id", data.id);
  console.log("error", error);
  return error;
}
