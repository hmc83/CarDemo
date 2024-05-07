export class CarEntry {
    title: string;
    engine: string;
    kilometres: number;
    price: number;
    imagePath: string;

    constructor(
        title: string, 
        engine: string,
        kilometres: number,
        price: number, 
        imagePath: string
    ){
        this.title = title;
        this.engine = engine;
        this.kilometres = kilometres;
        this.price = price;
        this.imagePath = imagePath;
    }
}