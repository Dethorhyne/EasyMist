$(window).bind('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch (String.fromCharCode(e.which).toLowerCase()) {
        case 's':
            if($(".control-save").length > 0)
            {
                $(".control-save").click();
                e.preventDefault()
            }
            break;
        case 'a':
            if($(".control-add-ingredient").length > 0)
            {
                $(".control-add-ingredient").click();
                e.preventDefault()
            }
            break;
        case 'b':
            if($(".control-new").length > 0)
            {
                $(".control-new button").click();
                e.preventDefault()
            }
            break;
        case 'q':
            if($(".control-previous").length > 0)
            {
                $(".control-previous button").click();
                e.preventDefault()
            }
            break;
        case 'e':
            if($(".control-next").length > 0)
            {
                $(".control-next button").click();
                e.preventDefault()
            }
            break;
        case 'd':
            if($(".control-delete").length > 0)
            {
                $(".control-delete").click();
                e.preventDefault()
            }
            break;
        case 'r':
            if($(".control-return").length > 0)
            {
                $(".control-return button").click();
                e.preventDefault()
            }
            break;
        }
    }
});