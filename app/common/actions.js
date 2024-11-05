"use server";

import { createClient } from "utils/supabase/server";

export async function getProductSSR(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("product")
    .select(
      `
      name,
      id,
      purchase_price,
      count,
      category (
        name
      )
      `
    )
    .eq("id", id);
  if (data.length) {
    return data[0];
  } else {
    console.error(error);
    return null;
  }
}
