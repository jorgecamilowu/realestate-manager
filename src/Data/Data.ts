import { ObjectId } from 'mongodb';
/**
 * represents one instance of a property
 */
export type property = {
    _id: ObjectId,
    name: string,
    address: string,
    type: string,
    numBedrooms: number,
    numBathrooms: number,
    numParkingSpots: number,
    price: number,
    size: number,
}

/**
 * represents one instance of a quote
 */
export type quote = {
    _id: ObjectId;
    property: ObjectId;
    bankName: string;
    monthlyPayment: number;
    annualPayment: number;
    totalPayment: number;
    totalInterest: number,
    downPayment: number;
    maturity: number;
    rate: number;
}