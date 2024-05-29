export interface ProductDTO {
    imageUrl: string,
    name: string,
    count: number,
    size: {
        width: number,
        height: number,
    }
    weight: string,
}
