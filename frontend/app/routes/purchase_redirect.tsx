import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function PurchaseRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);
  return <></>;
}
