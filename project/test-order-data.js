// Havale sipariş email testini CURL ile yap
const testOrder = {
  "id": "HAVALE-TEST-" + Date.now().toString(36).toUpperCase(),
  "createdAt": new Date().toISOString(),
  "paymentMethod": "bank-transfer",
  "customerInfo": {
    "firstName": "Test",
    "lastName": "Müşteri", 
    "email": "y.emrekaranfil@hotmail.com",
    "phone": "+90 530 890 66 13",
    "address": "Test Adres, İstanbul"
  },
  "items": [
    {
      "name": "Laboratuvar Test Cihazı",
      "price": 1500,
      "qty": 2,
      "image": "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp"
    },
    {
      "name": "Pastör Pipeti (100'lü paket)",
      "price": 180,
      "qty": 1,
      "image": "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp"
    }
  ],
  "totals": {
    "total": 3180
  }
};

console.log('Test order data:');
console.log(JSON.stringify(testOrder, null, 2));