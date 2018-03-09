export class Message {
    constructor(
        public content:String,
        public author : String,
        public messageId? : String,
        public userId? : String
    ) {
        
    }
}