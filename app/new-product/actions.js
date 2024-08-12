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
