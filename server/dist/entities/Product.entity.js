"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const Rating_entity_1 = require("./Rating.entity");
const uuid_1 = require("uuid");
let Product = class Product {
    id;
    ratings;
    title;
    description;
    midias;
    price;
    comparisonPrice;
    costPerProduct;
    category;
    subcategory;
    providerURL;
    hasAttributes;
    attributes;
    productStatus;
    rating;
    ratingNumbers;
    sales;
    tags;
    created_at;
    constructor(props) {
        Object.assign(this, props);
        this.id = (0, uuid_1.v4)();
        const ratingNumbersInitial = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
        };
        this.ratingNumbers = ratingNumbersInitial;
        this.rating = 0;
        this.sales = 0;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Rating_entity_1.Rating, (rating) => rating.product),
    __metadata("design:type", Array)
], Product.prototype, "ratings", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Array)
], Product.prototype, "midias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "comparisonPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "costPerProduct", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "subcategory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "providerURL", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Product.prototype, "hasAttributes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Array)
], Product.prototype, "attributes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "productStatus", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Object)
], Product.prototype, "ratingNumbers", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.Column)({ array: true }),
    __metadata("design:type", String)
], Product.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)("Products"),
    __metadata("design:paramtypes", [Object])
], Product);
exports.Product = Product;
