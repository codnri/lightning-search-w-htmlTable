({
    getContacts : function(cmp,event) {
        var action = cmp.get("c.searchContactWithPage");
        var pageSize = cmp.get("v.pageSize").toString();
        var pageNumber = cmp.get("v.pageNumber").toString();
        var searchString = cmp.get("v.searchString");
        action.setParams({
            'pageSize' : pageSize,
            'pageNumber' : pageNumber,
            'keyword':searchString
        });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //turn on isChecked field
                var selectedRowsMap = cmp.get('v.selectedRows');
                var result = response.getReturnValue();
                console.log('result ---->' + JSON.stringify(result));
                for(var i=0;i<result.contacts.length;i++){
                    var con = result.contacts[i];

                    con.isChecked = selectedRowsMap.has(con.Id)? true : false;//turn on isChecked field
                     
                    if(result.contacts[i].Account){
                        result.contacts[i].AccountName 
                            = result.contacts[i].Account.Name;
                    }else{
                        result.contacts[i].AccountName ='';
                    }
                }
                console.log('result.contacts ---->' + JSON.stringify(result.contacts));

                
                cmp.set("v.contacts", result.contacts);
                cmp.set("v.pageNumber", result.pageNumber);
                cmp.set("v.totalRecords", result.totalRecords);
                cmp.set("v.lastPageNumber", Math.ceil(result.totalRecords / pageSize));

                // if(totalRecords < cmp.get("v.pageSize")){
                //     cmp.set("v.isLastPage", true);
                // } else{
                //     cmp.set("v.isLastPage", false);
                // }
                
            }
        });
        $A.enqueueAction(action);
    }
    //searchContactWithPage(String keyword,Decimal pageNumber ,Integer pageSize){
})
