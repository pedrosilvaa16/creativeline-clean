import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export function getClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL!,
      fetchOptions: { mode: "cors" },
    }),
    cache: new InMemoryCache(),
    // Em páginas server-side usamos .query(), sem need de SSR mode aqui.
  });
}
