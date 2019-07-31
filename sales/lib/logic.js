/**
 * @param {org.tradesalecar.Sale} Sale
 * @transaction
 */

 async function sale(contract){
     const car = contract.car;
     const price = contract.saleContract.price
     const terms = contract.saleContract.saleId
     const seller = contract.saleContract.seller
     const buyer = contract.saleContract.buyer
     
     
     seller.amount += price;
     buyer.amount -= price;
   	 
	 //update seller amount
     const sellerRegistry = await getParticipantRegistry('org.tradesalecar.Seller');
     await sellerRegistry.update(seller);
   
     //Update buyer amount
     const buyerRegistry = await getParticipantRegistry('org.tradesalecar.Buyer');
     await buyerRegistry.update(buyer);
   
 }
