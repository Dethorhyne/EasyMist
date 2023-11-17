const _update = require('../services/update');

module.exports = {
    Public_Index,
    Index,
}

//GET
function Public_Index(req, res)
{

    Promise.all([
        _update.GetTopThreeUpdates()
    ])
    .then(function(responses){

        req.view.Updates = responses[0];

        req.view.Title = "Home";

        res.status(200).render('index', {"view": req.view});
    })
    
}


//GET
function Index(req, res)
{
    req.view = {};
    req.view.Title = "Index";
    res.status(200).render('api/index', {"view": req.view});
}
