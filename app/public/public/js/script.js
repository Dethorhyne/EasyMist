$(document).ready(function(e){

    checkWidths();

    $('#search').on('input', function() {
        var userText = $(this).val();
    
        $("#dbList").find("option").each(function() {
            if ($(this).val() == userText) {
                if(userText.indexOf("Item >") > -1)
                window.location.replace("/item/" + $(this).data("item"));
                if(userText.indexOf("Structure >") > -1)
                window.location.replace("/structure/" + $(this).data("structure"));
            }
        })
    })

    $(".modalTrigger").on('click',function(e){
        e.preventDefault();

        $("#"+$(this).data('target')).show();
    })

    $(".modal").on('click',function(e){
        if(event.target == event.currentTarget) {
            $(this).hide();
        }
    })

    $(".closeModal").on('click',function(e){
        e.preventDefault()
        $(this).closest(".modal").click();
    })

    $("#reportSubmit").on('click',function(e){
        e.preventDefault();
        var modal = $(this).closest(".modal");


        var body = {
            ReportId : $("#modalReport_ReportId").val(), 
            Content : $("#modalReport_Content").val()
        }

        $("#reportModal_status").text("Creating report.")

        API_Request("POST", "/createReport", body)
        .then(function(response){
            console.log(response);
            $("#reportModal_status").html("Thank you! Report has been sent. <br />This window will close automatically after 3 seconds.");
            
            setTimeout(function(){
                $("#modalReport_ReportId").val(0), 
                $("#modalReport_Content").val("")
                $("#reportModal_status").text("");
                $(modal).hide();
            }, 3000)
        }).catch(function(error){
            console.log(error);
            $("#reportModal_status").text(error.error);
        })
    })

    $(".actionableButton").on('click',function(e){
        $(".hudUI .scaleWrap").hide();
        $($(this).data("target")).show().attr("style","");
        checkStructureUIWidth($(window).width());
    });

    $(window).on('resize', function(e){
        checkWidths();
    })

    $(window).on('orientationchange', function(e){
        checkWidths();
    })

    function checkWidths()
    {
        checkRecipeWidth($(window).width());
        checkStructureUIWidth($(window).width());
        checkItemRepairWidth($(window).width());
        checkHarvestWidth($(window).width());
    }

    function checkRecipeWidth(width)
    {
        if(width < 768)
        {
            $(".craftingRecipeFrame").each(function(i,e){
                fitToParent($(e));
            })
            $(".buildingRecipe").each(function(i,e){
                fitToParent($(e));
            })
        }
    }

    function checkStructureUIWidth(width)
    {
        if(width < 768)
        {
            $(".hudElementsFrame").each(function(i,e){
                fitToParent($(e));
            })
        }
    }

    function checkItemRepairWidth(width)
    {
        if(width < 768)
        {
            $(".itemRepairFrame").each(function(i,e){
                fitToParent($(e));
            })
        }
    }
    

    function checkHarvestWidth(width)
    {
        if(width < 768)
        {
            $(".harvestFrame").each(function(i,e){
                fitToParent($(e));
            })
        }
    }

    function scaleAmountNeededToFit(el) {
        var parentSize = {
            width: el.parentElement.clientWidth,
            height: el.parentElement.clientHeight
        };

        return Math.min(parentSize.width / el.clientWidth, parentSize.height / el.clientHeight);
    }

    function fitToParent(element) {
        
        var DOMElem = $(element)[0];
        var scale = scaleAmountNeededToFit(DOMElem);

        if(scale > 1) scale = 1;
        DOMElem.style.transformOrigin = "0 0";
        DOMElem.style.transform = `translate(0px, 0px) scale(${scale})`;

        var heightScale = $(element).parent().width() / $(element).width();
        if(heightScale>1) heightScale = 1
        $(element).parent().height($(element).height()*heightScale);

    }
})