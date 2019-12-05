export interface Alerts {
    Alerts?: (AlertsEntity)[] | null;
}
export interface AlertsEntity {
    AlertType: string;
    Crime: string;
    Date: string;
    Description: string;
    Id: number;
    Latitude: number;
    Location: string;
    Longitude: number;
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
