({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'First name', fieldName: 'FirstName', type: 'text'},
            {label: 'Last name', fieldName: 'LastName', type: 'text'},
            {label: 'Title', fieldName: 'Title', type: 'text'},            
        ]);
        cmp.set('v.contacts',[]);
    },
    handlePrev : function(cmp, event, helper) {        
        var pageNumber = cmp.get("v.pageNumber");
        cmp.set("v.pageNumber", pageNumber-1);
        helper.getContacts(cmp, event,helper);
    },
    handleNext : function(cmp, event, helper) { 
        var pageNumber = cmp.get("v.pageNumber");
        cmp.set("v.pageNumber", pageNumber+1);
        helper.getContacts(cmp, event,helper);
    },
    doSearch:  function(cmp, event, helper) { 
        cmp.set("v.pageNumber", 1);
        helper.getContacts(cmp,event);
    }

})
