$(document).ready(function(e){

    $("#addStructure").on('click',function(e){
        e.preventDefault();

        var body = {
            Name : $("#Name").val(), 
            BuildingCategoryId : $("#BuildingCategoryId").val(), 
            Description : $("#Description").val(), 
            StorageAmount : $("#StorageAmount").val(), 
            IsElectricityRequired : $("#IsElectricityRequired").prop("checked"), 
            EnergyConsumption : $("#EnergyConsumption").val(),
            IsCraftStation : $("#IsCraftStation").val(),
            StructureUI: $("#StructureUI").val()
        }

        $("#status").text("Adding structure.")

        API_Request("POST", "/api/createStructure", body)
        .then(function(response){
            console.log(response);
            $("#status").text("Structure added. Redirecting")     
            
            setTimeout(function(){
                window.location.replace("/api/structure/"+response.StructureId);
            }, 1000)
        }).catch(function(error){
            console.log(error);
            $("#status").text(error.error);
        })
    })
    
    $("#saveStructure").on('click',function(e){
        e.preventDefault();

        var body = {
            Name : $("#Name").val(), 
            BuildingCategoryId : $("#BuildingCategoryId").val(), 
            Description : $("#Description").val(), 
            StorageAmount : $("#StorageAmount").val(), 
            IsElectricityRequired : $("#IsElectricityRequired").prop("checked"), 
            EnergyConsumption : $("#EnergyConsumption").val(),
            IsCraftStation : $("#IsCraftStation").val(),
            StructureUI: $("#StructureUI").val()
        }

        $("#status").text("Saving structure.");

        API_Request("PUT", "/api/structure/"+$("#StructureForm").data("structure"), body)
        .then(function(response){
            console.log(response);
            $("#status").text("Structure saved.");          
        }).catch(function(error){
            console.log(error);
            $("#status").text(error.error);
        })
    })
})