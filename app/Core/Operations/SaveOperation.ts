import IOperation = require("./IOperation");

class SaveOperation<String> implements IOperation
{
    private _JSON: any;

    constructor(json: string) {

        this._JSON = {
            "Data": json
        };
    }

    Do(): Promise<String> {
        var that = this;

        return new Promise((resolve) => {

            $.ajax(<JQueryAjaxSettings>{
                url: "http://blobdust.azurewebsites.net/api/anonymousblobs",
                type: 'POST',
                crossDomain: true,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(that._JSON)
            }).done(function(data){
                console.log(data);
                resolve();
            });

        });
    }

}

export = SaveOperation;