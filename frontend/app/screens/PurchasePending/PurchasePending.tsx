import ResultScreen from "~/ui/ResultScreen/ResultScreen";

export default function PurchasePending() {
  return (
    <ResultScreen
      tone="pending"
      title="Pagamento pendente"
      message="Seu pagamento está sendo processado. Assim que for confirmado, os itens chegam na sua conta em até 1 hora."
    />
  );
}
