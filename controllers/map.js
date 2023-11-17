const _update = require('../services/update');

module.exports = {
    Public_Map,
    Map,
}

//GET
function Public_Map(req, res)
{
    req.view.Title = "Map";
    res.status(200).render('map', {"view": req.view});
    
}


//GET
function Map(req, res)
{
    req.view.Title = "Map";
    res.status(200).render('api/map', {"view": req.view});
}
