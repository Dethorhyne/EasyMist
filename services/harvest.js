const mssql = require('mssql');
const helper = require('../helpers/helper');

module.exports = {
    GetAllHarvests,
    GetHarvest,

    CreateHarvest,
    SaveHarvest,
    AddGainedItemToHarvest,
}


function GetAllHarvests() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[Harvest_GetAll]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordsets[0])
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}

function GetHarvest(HarvestId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("HarvestId", mssql.Int, HarvestId);
        mssql_request.execute('[dbo].[Harvest_GetHarvest]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve({Harvest:dataset.recordsets[0][0], HarvestGains: dataset.recordsets[1]});
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}

function CreateHarvest(HarvestedItemId, ToolItemId) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("HarvestedItemId", mssql.Int, HarvestedItemId);
        mssql_request.input("ToolItemId", mssql.Int, ToolItemId);
        mssql_request.execute('[dbo].[Harvest_Insert]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordset[0])
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}

function SaveHarvest(HarvestId, HarvestedItemId, ToolItemId) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("HarvestId", mssql.Int, HarvestId);
        mssql_request.input("HarvestedItemId", mssql.Int, HarvestedItemId);
        mssql_request.input("ToolItemId", mssql.Int, ToolItemId);
        mssql_request.execute('[dbo].[Harvest_Update]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordset[0])
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}

function AddGainedItemToHarvest(HarvestId, GainedItemId, LowRange, HighRange, HarvestTime, OrderNo) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("HarvestId", mssql.Int, HarvestId);
        mssql_request.input("GainedItemId", mssql.Int, GainedItemId);
        mssql_request.input("LowRange", mssql.Int, LowRange);
        mssql_request.input("HighRange", mssql.Int, HighRange);
        mssql_request.input("HarvestTime", mssql.Float, HarvestTime);
        mssql_request.input("OrderNo", mssql.Int, OrderNo);
        mssql_request.execute('[dbo].[HarvestGain_Insert]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordset[0])
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}