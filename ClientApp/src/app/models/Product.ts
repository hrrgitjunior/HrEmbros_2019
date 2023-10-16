export class Product {
    constructor(
        public pId?: number,
        public name?: string,
        public description?: string,
        public urlSmallImage?: string,
        public urlBigImage?: string,
        public altImage?: string,
        public category?: string,
        public size?: string,
        public colorCount?: string,
        public stitchCount?: string,
        public embFile?: string,
        public enableDownload?: boolean
    ) { }
}