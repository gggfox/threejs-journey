const mensual = 50_000
const porcentajeAnual = 9 / 100

let total = 0;

for (let i = 0; i < 240; i++) {
  total += mensual 
  total *= 1 + 0.15/12

  if ((((i + 1) / 12) % 10) === 0) {
    console.log(`${i} :${Intl.NumberFormat('mxn').format(total)}`)
  } 
}

