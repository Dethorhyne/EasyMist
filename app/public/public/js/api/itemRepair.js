$(document).ready(function(e){

    $("#addIngredient").on('click',function(e){
        e.preventDefault();

        var newIngredient = $('<div class="ingredient"> <select class="IngredientItem">'+$("#Ingredients").html()+'</select> <input class="IngredientAmount" type="number" placeholder="Item amount"> <button class="removeIngredient">Remove this ingredient</button></div>');

        $(newIngredient).find("select")[0].selectedIndex=-1;

        $("#ingredients").append(newIngredient);

        $("#ingredients").find("select").last().focus();
    });

    $("body").on('click','.removeIngredient',function(e){
        e.preventDefault();

        $(this).closest(".ingredient").remove();
    })

    $("#addItemRepair").on('click',function(e){
        e.preventDefault();

        var body = {
            ItemRepairTypeId : $("#ItemRepairTypeId").val(),
            RepairedItemId : $("#RepairedItemId").val(),
            RepairTimeInMinutes : $("#RepairTimeInMinutes").val()
        }

        $("#status").text("Adding item repair recipe.")

        API_Request("POST", "/api/createItemRepair", body)
        .then(function(response){
            console.log(response);
            $("#ingredients").find(".ingredient").each(function(i,e){
                var ingredientBody = {
                    IngredientItemId: $(e).find(".IngredientItem").first().val(), 
                    IngredientAmount: $(e).find(".IngredientAmount").first().val(),
                    OrderNo: i+1
                }
                $("#status").text("Item repair recipe added, adding ingredients.")

                API_Request("POST", "/api/itemrepair/"+response.ItemRepairId+"/ingredient", ingredientBody)
                .then(function(igredientResponse){
                    console.log(igredientResponse);
                    $("#status").text("Ingredient added.")
                })

            })        
            
            setTimeout(function(){
                $("#status").text("Added successfully.")
                window.location.replace("/api/itemrepair/"+response.ItemRepairId);
            }, 2000)
        }).catch(function(error){
            console.log(error);
            $("#status").text(error.error);
        })
    })
    

    $("#saveItemRepair").on('click',function(e){
        e.preventDefault();

        var body = {
            ItemRepairTypeId : $("#ItemRepairTypeId").val(),
            RepairedItemId : $("#RepairedItemId").val(),
            RepairTimeInMinutes : $("#RepairTimeInMinutes").val()
        }

        $("#status").text("Saving item repair recipe.");

        API_Request("PUT", "/api/itemrepair/"+$("#ItemRepairForm").data("itemrepair"), body)
        .then(function(response){
            console.log(response);
            $("#status").text("Item repair recipe saved. Saving ingredients.");
            $("#ingredients").find(".ingredient").each(function(i,e){
                var ingredientBody = {
                    IngredientItemId: $(e).find(".IngredientItem").first().val(), 
                    IngredientAmount: $(e).find(".IngredientAmount").first().val(),
                    OrderNo: i+1
                }

                API_Request("POST", "/api/itemrepair/"+response.ItemRepairId+"/ingredient", ingredientBody)
                .then(function(igredientResponse){
                    $("#status").text("Ingredient added.");
                    console.log(igredientResponse);
                })

                setTimeout(function(){
                    $("#status").text("Saved successfully.")
                    $("#nextButton").focus();
                }, 1000)
            })            
        }).catch(function(error){
            console.log(error);
            $("#status").text(error.error);
        })
    })
})