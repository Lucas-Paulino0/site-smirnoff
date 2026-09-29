import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("termos", "routes/terms.tsx"),
  ...prefix("compra", [
    index("routes/purchase_redirect.tsx"),
    route("/sucesso", "routes/purchase_success.tsx"),
    route("/erro", "routes/purchase_fail.tsx"),
    route("/pendente", "routes/purchase_pending.tsx"),
  ]),
  ...prefix(":serverName", [
    index("routes/store.tsx"),
    route("/usuario", "routes/user.tsx"),
    route("/carrinho", "routes/cart.tsx"),
  ]),
] satisfies RouteConfig;
