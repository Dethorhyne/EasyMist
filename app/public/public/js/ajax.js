function API_Request(method, route, body)
{
    return new Promise((resolve, reject) => {
        $.ajax({type: method, 
                url: route,
                data: body,
                dataType: "json"
        })
        .then((result) => {
            resolve(result);
        })
        .fail((error) => {
            reject(error.responseJSON)
        });
    });
}