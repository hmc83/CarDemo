export class WatchedCar {
    userId: string;
    watchlistEntryId: string;
    ownerId: string;
    entryId: string;
    title: string;
    engine: string;
    kilometres: number;
    price: number;
    imagePath: string;

    constructor(
        userId: string,
        watchlistEntryId: string,
        ownerId: string,
        entryId: string,
        title: string, 
        engine: string,
        kilometres: number,
        price: number, 
        imagePath: string
    ){
        this.userId = userId;
        this.watchlistEntryId = watchlistEntryId;
        this.ownerId = ownerId;
        this.entryId = entryId;
        this.title = title;
        this.engine = engine;
        this.kilometres = kilometres;
        this.price = price;
        this.imagePath = imagePath;
    }
}