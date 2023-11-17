module.exports = {
    checkBoolean,
}


function checkBoolean(value)
{
    if(value === true || value === "1" || value === 1 || value === "true")
        return true;
    else
        return false;
}