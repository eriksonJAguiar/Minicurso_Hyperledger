#!/bin/sh

composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile sales@0.0.1.bna

composer network start --networkName sales --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file sales.card

composer card import --file sales.card

composer network ping --card admin@sales
