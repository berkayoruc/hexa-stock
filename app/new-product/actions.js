"use server";
import { createClient } from "@/utils/supabase/server";

export async function getCategoriesSSR() {
  const supabase = createClient();
  const { data, error } = await supabase.from("category").select(`
      id,
      name
      `);
  if (data.length) {
    return data;
  } else {
    console.error(error);
    return [];
  }
}

export async function createProduct(product) {
  const data = {
    name: product.get("name"),
    purchase_price: parseFloat(
      product.get("purchase_price").replaceAll(",", "")
    ),
    count: parseInt(product.get("count").replaceAll(",", "")),
    category_id: product.get("categories"),
  };
  console.log(data);
  const supabase = createClient();
  const { error } = await supabase.from("product").insert({
    name: data.name,
    purchase_price: data.purchase_price,
    count: data.count,
    category_id: data.category_id,
  });
  console.log("error", error);
  return error;
}
