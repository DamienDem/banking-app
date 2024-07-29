export function formatAmount(amount: number): string {
    const formatter = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    });
  
    return formatter.format(amount);
  }
  