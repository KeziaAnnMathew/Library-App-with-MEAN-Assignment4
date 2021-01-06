export class BookModel{
    constructor(
        public title:string,
        public author:string,
        public genre:string,
        public img:File,
        public details:string,
        public link:string,
        public _id:string

    ){

    }
}