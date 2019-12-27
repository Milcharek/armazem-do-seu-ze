// Formata os preços em reais
export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
