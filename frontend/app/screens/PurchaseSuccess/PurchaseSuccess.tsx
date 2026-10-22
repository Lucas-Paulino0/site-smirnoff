import ResultScreen from "~/ui/ResultScreen/ResultScreen";

export default function PurchaseSuccess() {
  return (
    <ResultScreen
      tone="success"
      title="Pagamento aprovado"
      message="Seu pedido foi aprovado. Os itens chegam na sua conta em até 1 hora."
    />
  );
}
