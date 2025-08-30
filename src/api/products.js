import { supabase } from "../lib/supabaseClient";

export async function fetchProductsByQuery(
  query,
  page = 1,
  limit = 10,
  store = "",
  sortOrder = ""
) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let queryBuilder = supabase.from("products").select(
    "id, name, price, volume, store, compareOrdinaryPrice, getMorePrice, priceMultipleItems, imageURL, productURL",

    { count: "exact" }
  );
  if (query) {
    queryBuilder = queryBuilder.ilike("name", `%${query}%`);
  }

  if (store) {
    queryBuilder = queryBuilder.eq("store", store);
  }
  if (sortOrder === "lowToHigh") {
    queryBuilder = queryBuilder.order("price", { ascending: true });
  } else if (sortOrder === "highToLow") {
    queryBuilder = queryBuilder.order("price", { ascending: false });
  } else {
    queryBuilder = queryBuilder.order("name", { ascending: true });
  }

  queryBuilder = queryBuilder.range(from, to);

  const { data, error, count } = await queryBuilder;

  console.log("Sökning:", { query, store, sortOrder, page });
  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error(error.message);
  }

  return { data, count };
}
