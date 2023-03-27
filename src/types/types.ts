"use strict";
// types.ts
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["ACCESSORIES"] = "Acess\u00F3rios";
    ProductCategory["CLOTHES_AND_SHOES"] = "Roupas e cal\u00E7ados";
    ProductCategory["ELECTRONICS"] = "Eletr\u00F4nicos";
})(ProductCategory || (ProductCategory = {}));
// database.ts
const products = [
    {
        id: "1",
        name: "Fone de Ouvido",
        description: "Um fone de ouvido de excelente qualidade.",
        price: 150,
        category: ProductCategory.ELECTRONICS
    },
    {
        id: "2",
        name: "Camiseta",
        description: "Uma camiseta confortável e estilosa.",
        price: 50,
        category: ProductCategory.CLOTHES_AND_SHOES
    },
    {
        id: "3",
        name: "Bolsa",
        description: "Uma bolsa espaçosa e elegante.",
        price: 200,
        category: ProductCategory.ACCESSORIES
    }
];
