/**
 * represents one instance of a property
 */
class Property {    
    private name: string;
    private type: string;
    private address: string;
    private size: number;
    private numBedrooms: number;
    private numBathrooms: number;
    private numParkingSpots: number;
    private price: number;

    public constructor(name: string, type = "", address = "", size = 0, 
        beds = 0, baths = 0, parkings = 0, price = 0) {
        this.name = name;
        this.type = type;
        this.address = address;
        this.size = size;
        this.numBedrooms = beds;
        this.numBathrooms = baths;
        this.numParkingSpots = parkings;
        this.price = price;
    }

    //////////////////////GETTERS//////////////////////
    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }

    public getAddress(): string {
        return this.address;
    }
    
    public getSize(): number {
        return this.size;
    }
    
    public getBedrooms(): number {
        return this.numBedrooms;
    }
    
    public getBathrooms(): number {
        return this.numBathrooms;
    }
    
    public getParkingSpots(): number {
        return this.numParkingSpots;
    }
    
    public getPrice(): number {
        return this.price;
    }
    
    //////////////////////SETTERS//////////////////////
    public setType(type: string): void {
        this.type = type;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public setSize(size: number): void {
        this.size = size;
    }

    public setBedrooms(beds: number): void {
        this.numBedrooms = beds;
    }

    public setBathrooms(baths: number): void {
        this.numBathrooms = baths;
    }

    public setParkings(parkings: number): void {
        this.numParkingSpots = parkings;
    }

}

export default Property;