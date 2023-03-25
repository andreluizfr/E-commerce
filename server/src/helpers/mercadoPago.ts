// SDK do Mercado Pago
import mercadopago from 'mercadopago';
// Adicione as credenciais
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || "2848880495686725-032423-6170e1caacf3f2d838b937f4f69efbfa-1321642718"
});

// Cria um objeto de preferência
let preference = {
    items: [
        {
            title: 'Meu produto',
            unit_price: 100,
            quantity: 1,
        }
    ]
};
  
mercadopago.preferences.create(preference)
  .then(function(response){
  // Este valor substituirá a string "<%= global.id %>" no seu HTML
    //global.id = response.body.id;
  }).catch(function(error){
    console.log(error);
  });