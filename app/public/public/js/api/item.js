$(document).ready(function(e){

    $("#addItem").on('click',function(e){
        e.preventDefault();

        var body = {
            Name : $("#Name").val(), 
            CategoryId : $("#CategoryId").val(), 
            Description : $("#Description").val(), 
            StackSize : $("#StackSize").val(), 
            IsCraftable : $("#IsCraftable").prop("checked"), 
            HasDurability : $("#HasDurability").prop("checked"), 
            IsEquipable : $("#IsEquipable").prop("checked")
        }

        $("#status").text("Adding item.")

        API_Request("POST", "/api/createItem", body)
        .then(function(response){
            console.log(response);
            $("#status").text("Item added. Redirecting")     
            
            setTimeout(function(){
                window.location.replace("/api/item/"+response.ItemId);
            }, 1000)
        }).catch(function(error){
            console.log(error);
            $("#status").text(error.error);
        })
    })
    
    $("#saveItem").on('click',function(e){
        e.preventDefault();

        var body = {
            Name : $("#Name").val(), 
            CategoryId : $("#CategoryId").val(), 
            Description : $("#Description").val(), 
            StackSize : $("#StackSize").val(), 
            IsCraftable : $("#IsCraftable").prop("checked"), 
            HasDurability : $("#HasDurability").prop("checked"), 
            IsEquipable : $("#IsEquipable").prop("checked")
        }

        $("#status").text("Saving item.");

        API_Request("PUT", "/api/item/"+$("#ItemForm").data("item"), body)
        .then(function(response){
            console.log(response);
            $("#status").text("item saved.");          
        }).catch(function(error){
            console.log(error);
            $("#status").text(error.error);
        })
    })
})