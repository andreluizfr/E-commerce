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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Payment_entity_1 = require("./Payment.entity");
const uuid_1 = require("uuid");
let Order = class Order {
    id;
    user;
    payment;
    status;
    items;
    created_at;
    constructor(props) {
        Object.assign(this, props);
        this.id = (0, uuid_1.v4)();
        this.status = "não processado";
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.orders, { cascade: true }),
    __metadata("design:type", String)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Payment_entity_1.Payment),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Payment_entity_1.Payment)
], Order.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "created_at", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)("Orders"),
    __metadata("design:paramtypes", [Object])
], Order);
exports.Order = Order;
