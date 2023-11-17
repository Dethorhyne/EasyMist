$(document).ready(function(e){

    $("#addGainedItem").on('click',function(e){
        e.preventDefault();

        var newGainedItem = $('<div class="gainedItem"> <select class="GainedItemId">'+$("#HarvestedItemId").html()+'</select> <input class="LowRange" type="number" placeholder="Low range"> <input class="HighRange" type="number" placeholder="High range"> <input class="HarvestTime" type="number" placeholder="Harvest time"> <button class="removeGainedItem">Remove this gained item</button></div>');

        $(newGainedItem).find("select")[0].selectedIndex=-1;

        $("#gainedItems").append(newGainedItem);

        $("#gainedItems").find("select").last().focus();
    });

    $("body").on('click','.removeGainedItem',function(e){
        e.preventDefault();

        $(this).closest(".gainedItem").remove();
    })

    $("#addHarvest").on('click',function(e){
        e.preventDefault();

        var body = {
            HarvestedItemId : $("#HarvestedItemId").val(),
            ToolItemId : $("#ToolItemId").val()==0?null:$("#ToolItemId").val(),
        }

        $("#status").text("Adding harvest.")

        API_Request("POST", "/api/createHarvest", body)
        .then(function(response){
            console.log(response);
            $("#gainedItems").find(".gainedItem").each(function(i,e){
                var gainedItemBody = {
                    GainedItemId: $(e).find(".GainedItemId").first().val(), 
                    LowRange: $(e).find(".LowRange").first().val(),
                    HighRange: $(e).find(".HighRange").first().val(),
                    HarvestTime: $(e).find(".HarvestTime").first().val(),
                    OrderNo: i+1
                }
                $("#status").text("Harvest added, adding gained items.")

                API_Request("POST", "/api/harvest/"+response.HarvestId+"/gainedItem", gainedItemBody)
                .then(function(igredientResponse){
                    console.log(igredientResponse);
                    $("#status").text("Gained item added.")
                })

            })        
            
            setTimeout(function(){
                $("#status").text("Added successfully.")
                window.location.replace("/api/harvest/"+response.HarvestId);
            }, 2000)
        }).catch(function(error){
            console.log(error);
            $("#status").text(error.error);
        })
    })
    

    $("#saveHarvest").on('click',function(e){
        e.preventDefault();

        var body = {
            HarvestedItemId : $("#HarvestedItemId").val(),
            ToolItemId : $("#ToolItemId").val()==0?null:$("#ToolItemId").val(),
        }

        $("#status").text("Saving harvest.");

        API_Request("PUT", "/api/harvest/"+$("#HarvestForm").data("harvest"), body)
        .then(function(response){
            console.log(response);
            $("#status").text("harvest saved. Saving gained items.");
            $("#gainedItems").find(".gainedItem").each(function(i,e){
                var gainedItemBody = {
                    GainedItemId: $(e).find(".GainedItemId").first().val(), 
                    LowRange: $(e).find(".LowRange").first().val(),
                    HighRange: $(e).find(".HighRange").first().val(),
                    HarvestTime: $(e).find(".HarvestTime").first().val(),
                    OrderNo: i+1
                }
                $("#status").text("Harvest saved, adding gained items.")

                API_Request("POST", "/api/harvest/"+response.HarvestId+"/gainedItem", gainedItemBody)
                .then(function(igredientResponse){
                    console.log(igredientResponse);
                    $("#status").text("Gained item added.")
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