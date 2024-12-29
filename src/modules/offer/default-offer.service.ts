import { inject, injectable } from "inversify";
import { OfferService } from "./offer-service.interface.js";
import { Component } from "../../types/component.enum.js";
import { Logger } from "../../logger/logger.interface.js";
import { DocumentType, types } from "@typegoose/typegoose";
import { OfferEntity } from "./offer.entity.js";
import CreateOfferDto from "./dto/create-offer.dto.js";

@injectable()
export default class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Новый офер создан ${dto.name}`);
    return result;
  }

  public async findById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
