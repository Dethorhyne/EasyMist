$(document).ready(function(e){

    $("#addIngredient").on('click',function(e){
        e.preventDefault();

        var newIngredient = $('<div class="ingredient"> <select class="IngredientItem">'+$("#CraftedItemId").html()+'</select> <input class="IngredientAmount" type="number" placeholder="Item amount"> <button class="removeIngredient">Remove this ingredient</button></div>');

        $(newIngredient).find("select")[0].selectedIndex=-1;

        $("#ingredients").append(newIngredient);

        $("#ingredients").find("select").last().focus();
    });

    $("body").on('click','.removeIngredient',function(e){
        e.preventDefault();

        $(this).closest(".ingredient").remove();
    })

    $("#addRecipe").on('click',function(e){
        e.preventDefault();

        var body = {
            CraftedItemId : $("#CraftedItemId").val(),
            CraftTimeInMinutes : $("#CraftTimeInMinutes").val(),
            ItemYield : $("#ItemYield").val(),
            RequiredStructureId : $("#RequiredStructureId").val()==0?null:$("#RequiredStructureId").val(),
            RequiredStructureLevel : $("#RequiredStructureLevel").val()==""?null:$("#RequiredStructureLevel").val(),
            RequiredToolOneId : $("#RequiredToolOneId").val()==0?null:$("#RequiredToolOneId").val(),
            RequiredToolTwoId : $("#RequiredToolTwoId").val()==0?null:$("#RequiredToolTwoId").val(),
        }

        $("#status").text("Adding recipe.")

        API_Request("POST", "/api/createCraftingRecipe", body)
        .then(function(response){
            console.log(response);
            $("#ingredients").find(".ingredient").each(function(i,e){
                var ingredientBody = {
                    IngredientItemId: $(e).find(".IngredientItem").first().val(), 
                    IngredientAmount: $(e).find(".IngredientAmount").first().val(),
                    OrderNo: i+1
                }
                $("#status").text("Recipe added, adding ingredients.")

                API_Request("POST", "/api/recipe/"+response.CraftingRecipeId+"/ingredient", ingredientBody)
                .then(function(igredientResponse){
                    console.log(igredientResponse);
                    $("#status").text("Ingredient added.")
                })

            })        
            
            setTimeout(function(){
                $("#status").text("Added successfully.")
                window.location.replace("/api/recipe/"+response.CraftingRecipeId);
            }, 2000)
        }).catch(function(error){
            console.log(error);
            $("#status").text(error.error);
        })
    })
    

    $("#saveRecipe").on('click',function(e){
        e.preventDefault();

        var body = {
            CraftedItemId : $("#CraftedItemId").val(),
            CraftTimeInMinutes : $("#CraftTimeInMinutes").val(),
            ItemYield : $("#ItemYield").val(),
            RequiredStructureId : $("#RequiredStructureId").val()==0?null:$("#RequiredStructureId").val(),
            RequiredStructureLevel : $("#RequiredStructureLevel").val()==""?null:$("#RequiredStructureLevel").val(),
            RequiredToolOneId : $("#RequiredToolOneId").val()==0?null:$("#RequiredToolOneId").val(),
            RequiredToolTwoId : $("#RequiredToolTwoId").val()==0?null:$("#RequiredToolTwoId").val(),
        }

        $("#status").text("Saving recipe.");

        API_Request("PUT", "/api/recipe/"+$("#CraftingRecipeForm").data("recipe"), body)
        .then(function(response){
            console.log(response);
            $("#status").text("recipe saved. Saving ingredients.");
            $("#ingredients").find(".ingredient").each(function(i,e){
                var ingredientBody = {
                    IngredientItemId: $(e).find(".IngredientItem").first().val(), 
                    IngredientAmount: $(e).find(".IngredientAmount").first().val(),
                    OrderNo: i+1
                }

                API_Request("POST", "/api/recipe/"+response.CraftingRecipeId+"/ingredient", ingredientBody)
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