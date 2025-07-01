import { supabase } from "../lib/supabaseClient";

export async function fetchProductsByQuery(query) {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, price, store, volume, getMorePrice, compareOrdinaryPrice, imageURL"
    )
    .ilike("name", `%${query}%`)
    .order("price", { ascending: true });

  console.log("Sökord skickat till Supabase:", query);
  console.log(`Söker på: %${query}%`);
  console.log("Data från Supabase:", data);

  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error(error.message);
  }

  return data;
}
