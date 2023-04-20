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
exports.Rating = void 0;
const typeorm_1 = require("typeorm");
const Product_entity_1 = require("./Product.entity");
const User_entity_1 = require("./User.entity");
const uuid_1 = require("uuid");
let Rating = class Rating {
    id;
    user;
    product;
    variation;
    rating;
    comment;
    hasMidia;
    midias;
    created_at;
    constructor(props) {
        Object.assign(this, props);
        this.id = (0, uuid_1.v4)();
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Rating.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.ratings, { cascade: true }),
    __metadata("design:type", String)
], Rating.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_entity_1.Product, (product) => product.ratings, { cascade: true }),
    __metadata("design:type", String)
], Rating.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], Rating.prototype, "variation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Rating.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Rating.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Rating.prototype, "hasMidia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Array)
], Rating.prototype, "midias", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Rating.prototype, "created_at", void 0);
Rating = __decorate([
    (0, typeorm_1.Entity)("Ratings"),
    __metadata("design:paramtypes", [Object])
], Rating);
exports.Rating = Rating;
