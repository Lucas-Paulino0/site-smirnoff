import ResultScreen from "~/ui/ResultScreen/ResultScreen";

export default function PurchasePending() {
  return (
    <ResultScreen
      icon="hourglass_top"
      color="var(--gold)"
      title="Pagamento pendente"
      message="Seu pagamento está sendo processado. Assim que for confirmado, os itens chegam na sua conta em até 1 hora."
    />
  );
}
