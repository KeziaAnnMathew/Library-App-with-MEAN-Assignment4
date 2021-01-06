export class AuthorModel{
    constructor(
        public name:string,
        public book:string,
        public genre:string,
        public img:File,
        public details:string,
        public link:string,
        public _id:string

    ){

    }
}