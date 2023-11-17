$(document).ready(function(){
    $("#filter").on("input",function(e){
        var query = $(this).val();

        if(query == "")
        {
            $("table tbody").find("tr").each(function(i,e){
                $(e).show();
            })
        }
        else
        {
            query = query.toLowerCase();
            $("table tbody").find("tr").each(function(i,e){
                if($(e).text().toLowerCase().indexOf(query) == -1)
                {
                    $(e).hide();
                }
                else
                {
                    $(e).show();
                }
            })
        }
        
    })
})