"use server";

import { createClient } from "@/utils/supabase/server";

export async function getProductSSR(id) {
  const supabase = createClient();
  const { data, error } = await supabase.from("product").select().eq("id", id);
  if (data.length) {
    return data;
  } else {
    console.error(error);
    return null;
  }
}
