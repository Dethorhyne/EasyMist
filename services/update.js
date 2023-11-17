const mssql = require('mssql');
const helper = require('../helpers/helper');

module.exports = {
    GetAllUpdates,
    GetUpdate,
    GetTopThreeUpdates,

    CreateUpdate,
    SaveUpdate,
    DeleteUpdate,
}


function GetAllUpdates() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[Updates_GetAll]')
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

function GetUpdate(UpdateId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("UpdateId", mssql.Int, UpdateId);
        mssql_request.execute('[dbo].[Updates_GetUpdate]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordset[0]);
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

function GetTopThreeUpdates()
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[Updates_GetNewestThree]')
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


function CreateUpdate(UpdateVersion, UpdateDate, Changelist) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("UpdateVersion", mssql.NVarChar, UpdateVersion);
        mssql_request.input("UpdateDate", mssql.Date, UpdateDate);
        mssql_request.input("Changelist", mssql.NVarChar, Changelist);
        mssql_request.execute('[dbo].[Update_Insert]')
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

function SaveUpdate(UpdateId, UpdateVersion, UpdateDate, Changelist) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("UpdateId", mssql.Int, UpdateId);
        mssql_request.input("UpdateVersion", mssql.NVarChar, UpdateVersion);
        mssql_request.input("UpdateDate", mssql.Date, UpdateDate);
        mssql_request.input("Changelist", mssql.NVarChar, Changelist);
        mssql_request.execute('[dbo].[Update_Update]')
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

function DeleteUpdate(UpdateId) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("UpdateId", mssql.Int, UpdateId);
        mssql_request.execute('[dbo].[Update_Delete]')
        .then(function (dataset) {
            resolve({});
        }).catch(function (exception) {
            reject(exception);
        });
    })
}