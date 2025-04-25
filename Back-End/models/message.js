class Message{
    constructor(message,code){
        this.Message=message;
        if(code>=200 && code<=299){
            this.Type="Success";
        }
        else if(code>=300 && code <400){
            this.Type="Redirection";
        }    
        else if(code>=400 && code <500) {
            this.Type="Client Error";
        }        
        else {
            this.Type="Server Error";
        }    
    }
}

module.exports=Message;