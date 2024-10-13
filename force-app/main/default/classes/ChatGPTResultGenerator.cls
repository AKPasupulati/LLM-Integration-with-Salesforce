public class ChatGPTResultGenerator {
    @AuraEnabled
    public static String getResultUsingPrompt(String promptData){
        Groq_Api__mdt gr= [SELECT Id, Groq_Api_Key__c, Groq_endpoint__c, DeveloperName 
                           FROM Groq_Api__mdt 
                           WHERE DeveloperName= 'Generate_Text_Using_Prompt'];
        HttpRequest httpReq= new HttpRequest();
        httpReq.setEndpoint(gr.Groq_endpoint__c);
        httpReq.setMethod('POST');
        httpReq.setHeader('Authorization','bearer '+gr.Groq_Api_Key__c);
        String body= '{"messages": [ { "role" : "user", "content": "'+promptData+'" }],"model": "llama3-groq-70b-8192-tool-use-preview"}';
        httpReq.setBody(body);
        Http hp= new Http();
        HttpResponse res= hp.send(httpReq);
        if(res.getStatusCode()==200){
            return res.getBody();
        }
        return res.getBody();
    }

}