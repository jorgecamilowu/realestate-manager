import { ObjectId } from "mongodb";

interface property {
    name: string,
    address: string,
    type: string,
    numBedrooms: number,
    numBathrooms: number,
    numParkingSpots: number,
    price: number,
    size: number,
}

interface quote {
    property: string;
    bankName: string;
    monthlyPayment: number;
    annualPayment: number;
    totalPayment: number;
    downPayment: number;
    maturity: number;
    rate: number;
}

class DataHandler {
    private static serverURI = "http://localhost:8080/propertyManager";
    private static endpointProp = DataHandler.serverURI + "/properties";
    private static endpointQuote = DataHandler.serverURI + "/quotes";


    ///////////////////////////// Properties Methods /////////////////////////////
    public static async getProperties(): Promise<any> {
        try {
            const response = await fetch(DataHandler.endpointProp);
            if(response.ok) {
                return await response.json();
            }
            throw new Error('Failed to fetch properties');
        } catch (error) {
            console.error(error);
        }
    }
    
    /** @param propertySpecs dictionary of the property specification */
    public static async addProperty(propertySpecs: {[key: string]: string}): Promise<any> {
        let urlencoded = new URLSearchParams();
        Object.keys(propertySpecs).forEach( key => urlencoded.append(key, propertySpecs[key]));
        
        try {
            const response = await fetch(DataHandler.endpointProp, {
                method: 'POST',
                body: urlencoded,
            })
            if(response.ok) {
                console.info('POST request success');
                return await response.json();
            }
        } catch (err) {
            console.error('Failed to post property', err);
        }
    }
    
    public static async updateProperty(id: string, propertySpecs: {[key: string]: string}): Promise<any> {
        let urlencoded = new URLSearchParams();
        Object.keys(propertySpecs).forEach( key => urlencoded.append(key, propertySpecs[key]));

        try {
            const response = await fetch(`${DataHandler.endpointProp}/${id}`, {
                method: 'PUT',
                body: urlencoded,
            })
            if(response.ok) {
                console.info('PUT request success');
                return await response.json();
            }
        } catch (err) {
            console.error('Failed to post property', err);
        }

    }

    public static async deleteProperty(id: string): Promise<any> {
        // let property: ObjectId = new ObjectId(id);
        try {
            const response = await fetch(`${DataHandler.endpointProp}/${id}`, {
                method: 'DELETE',
            });
            if(response.ok) {
                console.info('Delete request success');
                return await response.json();
            }
        } catch(err) {
            console.error('Failed to delete property', err);
        }
    }

    ///////////////////////////// Quotes Methods /////////////////////////////
    public static async getQuotes(): Promise<any> {
        try {
            const response = await fetch(DataHandler.endpointQuote);
            if(response.ok) {
                return await response.json();
            }
            throw new Error('Quotes Get request failed');
        } catch(error) {
            console.error(error);
        }
    }

    /** @param quoteSpecs dictionary of the property specification */
    public static async addQuote(quoteSpecs: {[key: string]: string}): Promise<any> {
        let urlencoded = new URLSearchParams();
        Object.keys(quoteSpecs).forEach( key => urlencoded.append(key, quoteSpecs[key]));
        
        try {
            const response = await fetch(DataHandler.endpointQuote, {
                method: 'POST',
                body: urlencoded,
            })
            if(response.ok) {
                console.info('POST request success');
                return await response.json();
            }
        } catch (err) {
            console.error('Failed to post property', err);
        }
    }

    public static async deleteQuote(quoteId: string): Promise<any> {
        try {
            let urlencoded = new URLSearchParams();
            urlencoded.append('id', quoteId);
            const response = await fetch(`${DataHandler.endpointQuote}/delete`, {
                method: 'DELETE',
                body: urlencoded
            })
            if (response.ok) {
                console.info('Delete request success');
                return await response.json();
            }
        } catch (err) {
            console.error('Failed to delete specified quote', err);
        }
    }
    
    public static async deleteManyQuotes(propertyId: string): Promise<any> {
        try {
            let urlencoded = new URLSearchParams();
            urlencoded.append('property', propertyId);
            let response = await fetch(`${DataHandler.endpointQuote}/deleteMany`, {
                method: 'DELETE',
                body: urlencoded
            });
            if(response.ok) {
                console.info('Delete many request successful');
                return await response.json();
            }
        } catch (err) {
            console.log('Failed to delete quotes', err);
        }
    }



}

export default DataHandler;