function printReceipt(barcodes) {
    let commoditiesInfo = mapTheBarcodes(barcodes);
    printTheOutput(commoditiesInfo);
}

function mapTheBarcodes(barcodes) {
    let commoditiesInfo = [];
    barcodes.forEach(barcode => {
        const commodityInfo = commoditiesInfo.find(commodityInfo => {
            return commodityInfo.barcode === barcode;
        });
        if (commodityInfo !== undefined) {
            commodityInfo.quantity ++;
            commodityInfo.subtotal = calculateSubtotal(commodityInfo);
        } else {
            let commodity = getCommodityInfoBybarcode(barcode);
            let commodityInfo = {
                barcode: barcode,
                name: commodity.name,
                price: commodity.price,
                quantity: 1
            };
            commodityInfo.subtotal = calculateSubtotal(commodityInfo);
            commoditiesInfo.push(commodityInfo);
        }
    });
    return commoditiesInfo;
}

function calculateSubtotal(commodity) {
    return commodity.quantity * commodity.price;
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
    return commodities.find(commodity => {
        return commodity.barcode === barcode
    })
}

function printTheOutput(commoditiesInfo) {
    let output = '\n***<store earning no money>Receipt ***\n';
    let total = 0;
    commoditiesInfo.forEach(commodityInfo => {
        output += `Name: ${commodityInfo.name}, Quantity: ${commodityInfo.quantity}, Unit price: ${commodityInfo.price} (yuan), Subtotal: ${commodityInfo.subtotal} (yuan)\n`;
        total += commodityInfo.subtotal;
    });
    output += `----------------------\nTotal: ${total} (yuan)\n`;
    output += '**********************';
    console.log(output);
}

module.exports = {
    printReceipt
};