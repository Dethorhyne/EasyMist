$(document).ready(function(e){
    
    $("#saveReport").on('click',function(e){
        e.preventDefault();

        var body = {
            Content : $("#Content").val()
        }

        $("#status").text("Saving report.");

        API_Request("PUT", "/api/report/"+$("#ReportForm").data("report"), body)
        .then(function(response){
            console.log(response);
            $("#status").text("report saved.");          
        }).catch(function(error){
            console.log(error);
            $("#status").text(error.error);
        })
    })

    $("#deleteReport").on('click',function(e){
        e.preventDefault();
        if(confirm("Are you sure you want to delete this report?"))
        {
            $("#status").text("Deleting report.");
    
            API_Request("DELETE", "/api/report/"+$("#ReportForm").data("report"))
            .then(function(response){
                $("#status").text("Report deleted. Redirecting")     
                
                setTimeout(function(){
                    window.location.replace("/api/reports");
                }, 1000)      
            }).catch(function(error){
                console.log(error);
                $("#status").text(error.error);
            })
        }
    })
})