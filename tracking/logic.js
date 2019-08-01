"use strict"

/**
 * @param {org.animal.tracking.AnimalMovementDeparture} MovementDeparture
 * @transaction
 */
 async function onAnimalMovementDeparture(movementDeparture){
    
    
    if(movementDeparture.animal.movementStatus !== 'IN_FIELD'){
         throw new Error('Animal ja esta em transito');
     }
   

     movementDeparture.animal.movementStatus = 'IN_TRANSIT';
     const ar = await getAssetRegistry('org.animal.tracking.Animal');
     await ar.update(movementDeparture.animal);

     const to = movementDeparture.to;

     if(to.animals){
         to.animals.push(movementDeparture.animal);
     }
     else{
         to.animals = [movementDeparture.animal]
     }

     const br = await getAssetRegistry('org.animal.tracking.Business');
     await br.update(to);
 }


/**
 * @param {org.animal.tracking.AnimalMovementArrival} MovementArrival
 * @transaction
 */
async function onAnimalMovementArrival(movementArrival){
    
    const animal = movementArrival.animal
    
    if(movementArrival.animal.movementStatus == 'IN_FIELD'){
        throw new Error('Animal ja esta alocado');
    }

    movementArrival.animal.movementStatus = 'IN_FIELD';

    movementArrival.animal.owner = movementArrival.to.owner;

    movementArrival.animal.location = movementArrival.arrivalField;

    const ar = await getAssetRegistry('org.animal.tracking.Animal');
    await ar.update(animal);

    
    movementArrival.to.animals = movementArrival.to.animals
    .filter(function(animal){
        return animal.animalId !== movementArrival.animal.animalId;
    });

    const br = await getAssetRegistry('org.animal.tracking.Business');
    await br.update(movementArrival.to);

}

/**
 *
 * @param {org.animal.tracking.SetupDemo} SetupDemo - SetupDemo instance
 * @transaction
 */
async function SetupDemo(setupDemo) {  // eslint-disable-line no-unused-vars
    const factory = getFactory();
    const NS = 'org.animal.tracking';

    const farmers = [
        factory.newResource(NS, 'Farmer', 'FARMER_1'),
        factory.newResource(NS, 'Farmer', 'FARMER_2')
    ];

    const businesses = [
        factory.newResource(NS, 'Business', 'BUSINESS_1'),
        factory.newResource(NS, 'Business', 'BUSINESS_2')
    ];

    const fields = [
        factory.newResource(NS, 'Field','FIELD_1'),
        factory.newResource(NS, 'Field','FIELD_2'),
        factory.newResource(NS, 'Field','FIELD_3'),
        factory.newResource(NS, 'Field','FIELD_4')
    ];

    const animals = [
        factory.newResource(NS, 'Animal', 'ANIMAL_1'),
        factory.newResource(NS, 'Animal', 'ANIMAL_2'),
        factory.newResource(NS, 'Animal', 'ANIMAL_3'),
        factory.newResource(NS, 'Animal', 'ANIMAL_4'),
        factory.newResource(NS, 'Animal', 'ANIMAL_5'),
        factory.newResource(NS, 'Animal', 'ANIMAL_6'),
        factory.newResource(NS, 'Animal', 'ANIMAL_7'),
        factory.newResource(NS, 'Animal', 'ANIMAL_8')
    ];

    const regulator = factory.newResource(NS, 'Regulator', 'REGULATOR');
    regulator.cpf = '123'
    regulator.email = 'REGULATOR';
    regulator.firstname = 'Ronnie';
    regulator.lastname = 'Regulator';
    const regulatorRegistry = await getParticipantRegistry(NS + '.Regulator');
    await regulatorRegistry.addAll([regulator]);

    farmers.forEach(function(farmer, indx) {
        const sbi = 'BUSINESS_' + farmer.getIdentifier().split('_')[1];
        farmer.cpf = '1'+indx;
      	farmer.firstname = '1'+indx;
        farmer.lastname = '';
      	farmer.email = 'email@'+indx;
        farmer.address1 = 'Address1';
        farmer.address2 = 'Address2';
        farmer.county = 'County';
        farmer.postcode = 'PO57C0D3';
        farmer.business = factory.newResource(NS, 'Business', sbi);
    });
    const farmerRegistry = await getParticipantRegistry(NS + '.Farmer');
    await farmerRegistry.addAll(farmers);

    businesses.forEach(function(business, index) {
        const farmer = 'FARMER_' + (index + 1);
        business.address1 = 'Address1';
        business.address2 = 'Address2';
        business.county = 'County';
        business.postcode = 'PO57C0D3';
        business.owner = factory.newRelationship(NS, 'Farmer', farmer);
    });
    const businessRegistry = await getAssetRegistry(NS + '.Business');
    await businessRegistry.addAll(businesses);

    fields.forEach(function(field, index) {
        const business = 'BUSINESS_' + ((index % 2) + 1);
        field.name = 'FIELD_' + (index + 1);
        field.business = factory.newRelationship(NS, 'Business', business);
    });
    const fieldRegistry = await getAssetRegistry(NS + '.Field');
    await fieldRegistry.addAll(fields);

    animals.forEach(function(animal, index) {
        const field = 'FIELD_' + ((index % 2) + 1);
        const farmer = 'FARMER_' + ((index % 2) + 1);
        animal.species = 'SHEEP';
        animal.movementStatus = 'IN_FIELD';
        animal.prodType = 'MEAT';
        animal.location = factory.newRelationship(NS, 'Field', field);
        animal.owner = factory.newRelationship(NS, 'Farmer', farmer);
    });
    const animalRegistry = await getAssetRegistry(NS + '.Animal');
    await animalRegistry.addAll(animals);
}

