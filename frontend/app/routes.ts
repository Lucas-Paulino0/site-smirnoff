import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("classes", "routes/classes.tsx"),
  route("mapa", "routes/map.tsx"),
  ...prefix("wiki", [
    index("routes/wiki.tsx"),
    route(":slug", "routes/wiki_article.tsx"),
  ]),
  route("termos", "routes/terms.tsx"),
  ...prefix("loja", [
    index("routes/store.tsx"),
    route("usuario", "routes/user.tsx"),
    route("carrinho", "routes/cart.tsx"),
  ]),
  ...prefix("compra", [
    route("sucesso", "routes/purchase_success.tsx"),
    route("erro", "routes/purchase_fail.tsx"),
    route("pendente", "routes/purchase_pending.tsx"),
  ]),
] satisfies RouteConfig;
