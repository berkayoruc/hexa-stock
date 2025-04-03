"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "utils/supabase/server";

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
    purchase_dollar_price,
    count,
    category (
      id,
      name
    ),
    updated_at
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
  const { count, id, name, purchase_price, sell_count, sold_price, category } =
    product;
  const supabase = createClient();
  // update product count
  const updateResponse = await supabase
    .from("product")
    .update({
      count,
    })
    .eq("id", id);
  if (updateResponse?.error) {
    console.error(updateResponse?.error);
    return { error: updateResponse?.error };
  }

  const sellResponse = await supabase.from("sold-product").insert({
    name,
    purchase_price,
    count: sell_count,
    sold_price,
    category_id: category?.id,
    product_id: id,
  });
  if (sellResponse?.error) {
    console.error(sellResponse?.error);
    return { error: sellResponse?.error };
  }
}

export async function purchaseProductSSR(product) {
  const { id, count, purchase_price, purchase_dollar_price } = product;
  const supabase = createClient();
  const { error } = await supabase
    .from("product")
    .update({
      count,
      purchase_price,
      purchase_dollar_price,
    })
    .eq("id", id);
  if (error) {
    console.error("error", error);
    return { error };
  }
}

export async function createCategory(category) {
  console.log(category);
  const data = {
    name: category.get("category_name"),
  };
  const supabase = createClient();
  const { data: categories, cError } = await supabase
    .from("category")
    .select("name");
  if (categories.length) {
    if (
      categories.filter(
        (cat) => cat.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
      ).length
    ) {
      console.warn("Category already exists");
      return "Category already exists";
    }
  } else {
    console.error(cError);
  }
  const { error } = await supabase.from("category").insert({
    name: data.name,
  });
  console.log("error", error);
  return error;
}

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
  const supabase = createClient();
  const response = await supabase.from("product").insert({
    name: data.name,
    purchase_price: data.purchase_price,
    count: data.count,
    category_id: data.category_id,
  });
  console.log("error", response.error, response);
  return response.status;
}
