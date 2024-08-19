"use server";
import { createClient } from "@/utils/supabase/server";

export async function createCategory(category) {
  const data = {
    name: category.get("name"),
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
