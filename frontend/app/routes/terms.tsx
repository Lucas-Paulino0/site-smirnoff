import type { Route } from "./+types/store";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Rede Cosmo" }, { name: "description", content: "Termos" }];
}

export default function Terms() {
  return (
    <object
      data={`${process.env.PUBLIC_API_URL}/files/0e515bba-6538-4fcd-a4e6-1ad79c2edcc1.pdf`}
      type="application/pdf"
      width="100%"
      height="100%"
    ></object>
  );
}
