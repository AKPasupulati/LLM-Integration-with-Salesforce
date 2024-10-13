import { LightningElement,track } from 'lwc';
import getResultUsingPrompt from '@salesforce/apex/ChatGPTResultGenerator.getResultUsingPrompt';
export default class ChatgptManager extends LightningElement {
    @track searchedText='';
    @track GPTResult='';
    showSpinner=false;
    handleAlert=false;
    handleInputChange(event) {
        this.searchedText = event.target.value;
    }
    handleButtonClick(event){
        this.showSpinner=true;
        if(this.searchedText===''){
            window.setTimeout(()=>{
                this.showSpinner=false;
                this.handleAlert=true;
        },1000);
        
        return;
    }
        
        this.handleAlert=false;
        getResultUsingPrompt({promptData: this.searchedText})
        .then(result =>{
            this.showSpinner=false;
            let response= JSON.parse(result);
            if(response.choices[0].message.content){
                this.GPTResult= response.choices[0].message.content;
                this.GPTResult=this.GPTResult.replace(/\n/g,"<br />");
                this.GPTResult=this.GPTResult.trim();
            }
        }).catch(error =>{
            this.showSpinner = false;
            console.error("Error===>",error);
        })
    }
    
}