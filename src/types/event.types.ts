export interface EventTargetWithDataSetTagName extends EventTarget {
    tagName: string;
    dataset: {
        openModalName: string;
        locale: string;
        formLink: string;
        menuType: string;
    }
}