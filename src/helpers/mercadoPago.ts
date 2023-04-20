// SDK do Mercado Pago
import MercadoPago from 'mercadopago';
// Adicione as credenciais
MercadoPago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || "2848880495686725-032423-6170e1caacf3f2d838b937f4f69efbfa-1321642718"
});

export default MercadoPago;