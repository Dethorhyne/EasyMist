$(document).ready(function(e){

    $("#addUpdate").on('click',function(e){
        e.preventDefault();


        var body = {
            UpdateVersion : $("#UpdateVersion").val(), 
            UpdateDate : $("#UpdateDate").val(), 
            Changelist : $("#Changelist").val()
        }

        $("#status").text("Adding update.")

        API_Request("POST", "/api/createUpdate", body)
        .then(function(response){
            console.log(response);
            $("#status").text("Update added. Redirecting")     
            
            setTimeout(function(){
                window.location.replace("/api/update/"+response.UpdateId);
            }, 1000)
        }).catch(function(error){
            console.log(error);
            $("#status").text(error.error);
        })
    })
    
    $("#saveUpdate").on('click',function(e){
        e.preventDefault();

        var body = {
            UpdateVersion : $("#UpdateVersion").val(), 
            UpdateDate : $("#UpdateDate").val(), 
            Changelist : $("#Changelist").val()
        }

        $("#status").text("Saving update.");

        API_Request("PUT", "/api/update/"+$("#UpdateForm").data("update"), body)
        .then(function(response){
            console.log(response);
            $("#status").text("update saved.");          
        }).catch(function(error){
            console.log(error);
            $("#status").text(error.error);
        })
    })

    $("#deleteUpdate").on('click',function(e){
        e.preventDefault();
        if(confirm("Are you sure you want to delete this update?"))
        {
            $("#status").text("Deleting update.");

            API_Request("DELETE", "/api/update/"+$("#UpdateForm").data("update"))
            .then(function(response){
                $("#status").text("Update deleted. Redirecting")     
                
                setTimeout(function(){
                    window.location.replace("/api/updates");
                }, 1000)      
            }).catch(function(error){
                console.log(error);
                $("#status").text(error.error);
            })
        }
    })
})