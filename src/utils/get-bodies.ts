import { CreateBonsaiBody } from "../types/index";

export const getBonsaiCreateBody = (
    nameState: string,
    levelState: string,
    priceState: number,
    categoryState: string,
    inStockState: boolean,
    descrState: string,
    imgOneState: string,
    imgTwoState: string,
    imgTwoThreeState: string
) => {
    let createBonsaiBody: CreateBonsaiBody = {
        name: nameState,
        price: priceState,
        img_path_1: imgOneState,
        in_stock: inStockState,
    }
    if (imgTwoState) {
        createBonsaiBody.img_path_2 = imgTwoState;
    }
    if (imgTwoThreeState) {
        createBonsaiBody.img_path_3 = imgTwoThreeState;
    }
    if (categoryState) {
        createBonsaiBody.category = categoryState;
    }
    if (descrState) {
        createBonsaiBody.descr = descrState;
    }
    if (levelState) {
        createBonsaiBody.level = levelState;
    }
    return createBonsaiBody;
}