({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'First name', fieldName: 'FirstName', type: 'text'},
            {label: 'Last name', fieldName: 'LastName', type: 'text'},
            {label: 'Title', fieldName: 'Title', type: 'text'},            
        ]);
        cmp.set('v.contacts',[]);
        cmp.set('v.selectedRows',new Map());
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
    },
    checkboxSelect: function(cmp, event, helper) {
        var isSelected = event.getSource().get("v.value");
        var selectedRecId = event.getSource().get("v.text");
        var contacts = cmp.get('v.contacts')
        console.log('isSelected:', isSelected);
        console.log('selected:', selectedRecId);
        var selectedRowsMap = cmp.get('v.selectedRows');
        if(isSelected){
            selectedRowsMap.set(selectedRecId,contacts.filter(con=> con.Id == selectedRecId)[0]);
        }else{
            selectedRowsMap.delete(selectedRecId);
        }
        console.log('selectedRowsMap key',[...selectedRowsMap.keys()]);
        console.log('selectedRowsMap value',[...selectedRowsMap.values()]);
        cmp.set('v.selectedRows',selectedRowsMap)

    },
    selectAllCheckbox: function(cmp, event, helper) {

    }

})
