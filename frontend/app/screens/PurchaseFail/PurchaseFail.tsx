import ResultScreen from "~/ui/ResultScreen/ResultScreen";

export default function PurchaseFail() {
  return (
    <ResultScreen
      icon="error"
      color="var(--offline)"
      title="Pagamento não aprovado"
      message="Seu pagamento não foi aprovado. Nenhum valor foi cobrado; você pode tentar de novo pela loja."
    />
  );
}
