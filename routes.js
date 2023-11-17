var express = require('express');
var router = express.Router();

const __item = require('./services/item');
const __structure = require('./services/structure');
const __report = require('./services/report');

var loadView = function (req, res, next) {
	req.view = {};
	req.view.Title = "";
	Promise.all([
        __item.GetAllItems(),
        __structure.GetAllStructures(),
        __report.GetAllReports()
    ])
    .then(function(responses){

        req.view.Items = responses[0];
        req.view.Structures = responses[1];
        req.view.Reports = responses[2];

        next();
    })
    .catch(function(error){
        console.log(error)
    })
}

router.use(loadView);

var _index                  = require('./controllers/index');
var _map                    = require('./controllers/map');
var _item                   = require('./controllers/item');
var _report                 = require('./controllers/report');
var _structure              = require('./controllers/structure');
var _update                 = require('./controllers/update');

router.get	 ('/', _index.Public_Index);

router.get	 ('/items', _item.Public_Items);

router.get	 ('/item/:ItemId', _item.Public_ViewItem);

router.get	 ('/structures', _structure.Public_Structures)

router.get	 ('/structure/:StructureId', _structure.Public_ViewStructure);

router.get	 ('/updates', _update.Public_Updates)

router.post	 ('/createReport', _report.Public_CreateReport)

router.get	 ('/map', _map.Public_Map);

module.exports = router;