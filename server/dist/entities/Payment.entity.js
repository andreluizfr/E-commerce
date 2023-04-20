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
exports.Payment = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let Payment = class Payment {
    id;
    type;
    method;
    status;
    statusDetail;
    transactionDetails;
    transactionData;
    created_at;
    constructor(props, transactionDetails, transactionData) {
        Object.assign(this, props);
        this.id = (0, uuid_1.v4)();
        if (this.status === "pending")
            this.status = "pendente";
        else if (this.status === "approved")
            this.status = "aprovado";
        else if (this.status === "authorized")
            this.status = "autorizado";
        else if (this.status === "in_process")
            this.status = "processando";
        else if (this.status === "in_mediation")
            this.status = "em disputa";
        else if (this.status === "rejected")
            this.status = "recusado";
        else if (this.status === "cancelled")
            this.status = "cancelado";
        else if (this.status === "refunded")
            this.status = "reembolsado";
        else if (this.status === "charged_back")
            this.status = "cobrado de volta";
        if (transactionDetails)
            this.transactionDetails = transactionDetails;
        if (transactionData)
            this.transactionData = transactionData;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Payment.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Payment.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Payment.prototype, "statusDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json", nullable: true }),
    __metadata("design:type", Object)
], Payment.prototype, "transactionDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json", nullable: true }),
    __metadata("design:type", Object)
], Payment.prototype, "transactionData", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Payment.prototype, "created_at", void 0);
Payment = __decorate([
    (0, typeorm_1.Entity)("Payments"),
    __metadata("design:paramtypes", [Object, Object, Object])
], Payment);
exports.Payment = Payment;
