function printReceipt(barcodes) {
    let commoditiesInfo = mapTheBarcodes(barcodes);
    printTheOutput(commoditiesInfo);
}

function mapTheBarcodes(barcodes) {
    let commoditiesInfo = [];
    for (let i = 0; i < barcodes.length; i++) {
        let index = null;
        for (let j = 0; j < commoditiesInfo.length; j++) {
            if (commoditiesInfo[j].barcode === barcodes[i]) {
                index = j;
                break;
            }
        }
        if (index !== null) {
            let commodity = commoditiesInfo[index]
            commoditiesInfo[index].quantity ++;
            commoditiesInfo[index].subtotal = calculateSubtotal(commodity);
        } else {
            let commodity = getCommodityInfoBybarcode(barcodes[i]);
            let commodityInfo = {
                barcode: barcodes[i],
                name: commodity.name,
                price: commodity.price,
                quantity: 1,
                subtotal: 0
            };
            commodityInfo.subtotal = calculateSubtotal(commodity, 1);
            commoditiesInfo.push(commodityInfo);
        }
    }
    return commoditiesInfo;
}

function calculateSubtotal(commodity, quantity) {
    return quantity ? quantity * commodity.price : commodity.quantity * commodity.price;
}

function getCommodityInfoBybarcode(barcode) {
    const commodities = [
        {
           barcode: 'ITEM000000',
           name: 'Coca-Cola',
           price: 3
         },
         {
           barcode: 'ITEM000001',
           name: 'Sprite',
           price: 3
         },
         {
           barcode: 'ITEM000002',
           name: 'Apple',
           price: 5
         },
         {
           barcode: 'ITEM000003',
           name: 'Litchi',
           price: 15
         },
         {
           barcode: 'ITEM000004',
           name: 'Battery',
           price: 2
         },
         {
           barcode: 'ITEM000005',
           name: 'Instant Noodles',
           price: 4
         }
     ];
     for (let i = 0; i < commodities.length; i++) {
         if (commodities[i].barcode === barcode) {
            return commodities[i];
         }
     }
}

function printTheOutput(commoditiesInfo) {
    let output = '\n***<store earning no money>Receipt ***\n';
    let total = 0;
    for (let i = 0; i < commoditiesInfo.length; i++) {
        output += 'Name: ' + commoditiesInfo[i].name + ', Quantity: ' + commoditiesInfo[i].quantity
         + ', Unit price: ' + commoditiesInfo[i].price + ' (yuan), Subtotal: '
         + commoditiesInfo[i].subtotal + ' (yuan)\n';
        total += commoditiesInfo[i].subtotal;
    }
    output += '----------------------\nTotal: ' + total + ' (yuan)\n';
    output += '**********************';
    console.log(output);
}

module.exports = {
    printReceipt
};