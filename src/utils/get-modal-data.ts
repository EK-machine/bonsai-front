import { MODAL } from "../consts/index";
import { Article, Bonsai, Instrument, Pot, Service } from "../types/index";

export const getModalName = (activeNav: number) => {
    if (activeNav === 0) return MODAL.BONSAI_EDIT;
    if (activeNav === 1) return MODAL.SOIL_EDIT;
    if (activeNav === 2) return MODAL.POT_EDIT;
    if (activeNav === 3) return MODAL.INSTRUMENT_EDIT;
    if (activeNav === 4) return MODAL.SERVICE_EDIT;
    if (activeNav === 5) return MODAL.ARTICLE_EDIT;
}

export const getModalImgAlt = (activeNav: number, entity: Bonsai | Article | Instrument | Pot | Service) => {
    if (activeNav === 0) return `картинка бонсая ${entity && Object.keys(entity).length > 0 && entity.name}`;
    if (activeNav === 1) return `картинка грунта ${entity && Object.keys(entity).length > 0 && entity.name}`;
    if (activeNav === 2) return `картинка горшка ${entity && Object.keys(entity).length > 0 && entity.name}`;
    if (activeNav === 3) return `картинка инструмента ${entity && Object.keys(entity).length > 0 && entity.name}`;
    if (activeNav === 4) return `картинка услуги ${entity && Object.keys(entity).length > 0 && entity.name}`;
    if (activeNav === 5) return `картинка статьи ${entity && Object.keys(entity).length > 0 && entity.name}`;
}