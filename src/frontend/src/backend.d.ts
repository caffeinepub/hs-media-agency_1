import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PhoneNumber {
    countryCode: string;
    number: string;
}
export type Time = bigint;
export interface Inquiry {
    id: bigint;
    fullName: string;
    submittedBy: Principal;
    email: string;
    serviceInterest: ServiceInterest;
    message: string;
    timestamp: Time;
    consentGiven: boolean;
    phone?: PhoneNumber;
}
export enum ServiceInterest {
    strategyConsulting = "strategyConsulting",
    other = "other",
    publicRelations = "publicRelations",
    eventManagement = "eventManagement",
    mediaProduction = "mediaProduction",
    digitalMarketing = "digitalMarketing",
    influencerMarketing = "influencerMarketing",
    contentCreation = "contentCreation"
}
export interface backendInterface {
    getInquiry(id: bigint): Promise<Inquiry>;
    listInquiries(): Promise<Array<Inquiry>>;
    submitInquiry(fullName: string, email: string, phone: PhoneNumber | null, serviceInterest: ServiceInterest, message: string, consentGiven: boolean): Promise<void>;
}
