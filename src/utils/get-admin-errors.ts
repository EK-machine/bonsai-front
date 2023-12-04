import { ErrorObj } from "../types/index";

export const getAdminErrors = (property: string, adminErrors: ErrorObj[]) => {
    if (adminErrors && adminErrors.length > 0) {
        return adminErrors.filter(e => e.property === property).map(el => el.message);
    }
    return []
}