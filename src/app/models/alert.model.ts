export interface Alerts {
    Alerts?: (AlertsEntity)[] | null;
}
export interface AlertsEntity {
    AlertType: string;
    Crime: string;
    Date: string;
    Description: string;
    Id: number;
    Location: string;
    Time: string;
}
export interface AlertModel {
    Description: string;
    Date: string;
    Time: string;
    Location: string;
    Lat: number;
    Long: number;
}
