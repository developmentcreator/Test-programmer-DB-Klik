function validOrder(takeOutOrders, dineInOrders, servedOrders) {
  let takeOutIndex = 0;
  let dineInIndex = 0;
  let takeOutMaxIndex = takeOutOrders.length;
  let dineInMaxIndex = dineInOrders.length;

  for (let i = 0; i < servedOrders.length; i++) {
    // Cek jika pesanan diambil dari daftar take-out
    if (takeOutIndex < takeOutMaxIndex && servedOrders[i] === takeOutOrders[takeOutIndex]) {
      takeOutIndex++;
    }
    // Cek jika pesanan diambil dari daftar dine-in
    else if (dineInIndex < dineInMaxIndex && servedOrders[i] === dineInOrders[dineInIndex]) {
      dineInIndex++;
    }
    // Jika pesanan tidak ada di daftar take-out atau dine-in, return false
    else {
      return false;
    }
  }

  // Jika kita telah melayani semua pesanan dengan benar, return true
  return takeOutIndex === takeOutMaxIndex && dineInIndex === dineInMaxIndex;
}

// Contoh penggunaan:

let takeOutOrders1 = [1, 3, 5];
let dineInOrders1 = [2, 4, 6];
let servedOrders1 = [1, 2, 4, 6, 5, 3];
console.log(validOrder(takeOutOrders1, dineInOrders1, servedOrders1)); // Output: false

let takeOutOrders2 = [17, 8, 24];
let dineInOrders2 = [12, 19, 2];
let servedOrders2 = [17, 8, 12, 19, 24, 2];
console.log(validOrder(takeOutOrders2, dineInOrders2, servedOrders2)); // Output: true
