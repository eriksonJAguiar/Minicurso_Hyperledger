import requests


URL = 'http://localhost:3000/api/'

params_buyer = {
  "$class": "org.tradesalecar.Buyer",
  "buyerId": "1",
  "amount": 20000,
  "name": "A"
}

params_car = {
  "$class": "org.tradesalecar.Car",
  "carId": "2",
  "make": "CHEVY",
  "model": "asasas",
  "VIN": "asasasa"
}

params_seller = {
  "$class": "org.tradesalecar.Seller",
  "sellerId": "3",
  "amount": 1000,
  "name": "B"
}

params_saleContract = {
  "$class": "org.tradesalecar.SaleContract",
  "saleId": "1",
  "price": 15000,
  "make": "CHEVY",
  "model": "string",
  "VIN": "string",
  "buyer": "org.tradesalecar.Buyer#1",
  "seller": "org.tradesalecar.Seller#3"
}


params_sale = {
  "$class": "org.tradesalecar.Sale",
  "saleContract": "org.tradesalecar.SaleContract#1"
}

#r = requests.post(url = URL+'Buyer/', data = params_buyer)
#r = requests.post(url = URL+'Seller/', data = params_seller)
#r = requests.post(url = URL+'Car/', data = params_car)
#r = requests.post(url = URL+'SaleContract/', data = params_saleContract)
r = requests.post(url = URL+'Sale/', data = params_sale)