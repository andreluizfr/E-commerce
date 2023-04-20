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
exports.Collection = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Product_entity_1 = require("./Product.entity");
let Collection = class Collection {
    id;
    products;
    title;
    description;
    created_at;
    constructor(props) {
        Object.assign(this, props);
        this.id = (0, uuid_1.v4)();
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Product_entity_1.Product),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Collection.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Collection.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Collection.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Collection.prototype, "created_at", void 0);
Collection = __decorate([
    (0, typeorm_1.Entity)("Collections"),
    __metadata("design:paramtypes", [Object])
], Collection);
exports.Collection = Collection;
