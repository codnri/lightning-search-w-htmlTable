public with sharing class IncrementalLightningController {
    public IncrementalLightningController() {
    }
    @AuraEnabled
    public static List<Contact> searchContact(String keyword){
        String searchText = '%'+keyword+'%';
        List<Contact> contacts = [SELECT FirstName,LastName, Title, Account.Name FROM Contact 
        WHERE FirstName LIKE :searchText OR LastName LIKE :searchText];
        return contacts;
    }

    @AuraEnabled
    public static ContactWrapper searchContactWithPage(String keyword,Decimal pageNumber ,Integer pageSize){
        Integer offset = ((Integer)pageNumber - 1) * pageSize;
        String searchText = '%'+keyword+'%';
        Integer total = [SELECT COUNT() FROM Contact 
            WHERE Name LIKE :searchText ];
        List<Contact> contacts = [SELECT Name,FirstName,LastName, Title, Account.Name FROM Contact 
            WHERE Name LIKE :searchText 
            LIMIT :pageSize OFFSET :offset];
        return new ContactWrapper(pageSize,(Integer)pageNumber,total,contacts);
    }

    public class ContactWrapper {        
        public ContactWrapper(Integer pageSize,Integer pageNumber,Integer totalRecords,List<Contact> contacts){
            this.pageSize=pageSize;
            this.pageNumber=pageNumber;
            this.totalRecords=totalRecords;
            this.contacts=contacts;
        }
        @AuraEnabled public Integer pageSize {get;set;}
        @AuraEnabled public Integer pageNumber {get;set;}
        @AuraEnabled public Integer totalRecords {get;set;}
        @AuraEnabled public List<Contact> contacts {get;set;}
    }
}
