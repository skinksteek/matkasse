import { supabase } from "../lib/supabaseClient";

export async function fetchProductsByQuery(query, page = 1, limit = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, error, count } = await supabase
    .from("products")
    .select(
      "id, name, price, store, volume, getMorePrice, compareOrdinaryPrice, imageURL",
      { count: "exact" }
    )
    .ilike("name", `%${query}%`)
    .order("price", { ascending: true })
    .range(from, to);

  console.log("Sökord skickat till Supabase:", query);
  console.log(`Söker på: %${query}%`);
  console.log("Data från Supabase:", data);

  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error(error.message);
  }

  return { data, count };
}
