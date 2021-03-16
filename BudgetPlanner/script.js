
function retrieveFromSessionArray(key){
    var data = sessionStorage.getItem(key)
    if (data == null)
        return data;
    return JSON.parse(data);
}

function storeInSessionArray(key, value){
    var data = retrieveFromSessionArray(key);
    if(data == null){
        data = JSON.stringify([value]);
    } else {
        data.push(value);
        data = JSON.stringify(data);
    }
    sessionStorage.setItem(key,data);
}

