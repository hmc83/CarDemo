export class Car {
    ownerId: string;
    entryId: string;
    title: string;
    engine: string;
    kilometres: number;
    price: number;
    imagePath: string;

    constructor(
        ownerId: string,
        entryId: string,
        title: string, 
        engine: string,
        kilometres: number,
        price: number, 
        imagePath: string
    ){
        this.ownerId = ownerId;
        this.entryId = entryId;
        this.title = title;
        this.engine = engine;
        this.kilometres = kilometres;
        this.price = price;
        this.imagePath = imagePath;
    }
}