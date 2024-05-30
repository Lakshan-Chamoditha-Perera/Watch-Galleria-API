export enum Category {
    LUXURY = "LUXURY",
    SPORT = "SPORT",
    CASUAL = "CASUAL",
    SMART = "SMART"
}

export enum Gender {
    UNISEX = "UNISEX",
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export class WatchDto {
    _id?: any;
    itemCode: string;
    productName?: string;
    description?: string;
    category: Category;
    price: number;
    quantity: number;
    rating?: number;
    productDate: Date;
    gender: Gender;
    imageUrlList?: string[];

    constructor(
        _id: any,
        itemCode: string,
        category: Category,
        price: number,
        quantity: number,
        productDate: Date,
        gender: Gender,
        productName?: string,
        description?: string,
        rating?: number,
        imageUrlList?: string[]
    ) {
        this._id = _id;
        this.itemCode = itemCode;
        this.productName = productName;
        this.description = description;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.rating = rating;
        this.productDate = productDate;
        this.gender = gender;
        this.imageUrlList = imageUrlList;
    }
}
