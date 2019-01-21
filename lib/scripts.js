function getUser(method) {
    $('#'+method+'>tbody').html("");
    var pattern = /Artist/g
    var test = pattern.test(method);
    $.ajax({
        url: "http://35.187.122.220:3000/api/"+method,
        // the URL for the request
        type: "GET",
        // whether this is a POST or GET request
        dataType: "json",
        //
        // the type of data we expect back
        success: function (responseJson) {
             $.each(responseJson, function (i, user) {
                if(test)
                    $('#'+method+'>tbody').prepend("<tr><th scope=\"row\"><a id=\"login\" href=\"#\">"+user.userId+"</a></th><td>"+user.firstName+"</td><td>"+user.lastName+"</td><td>"+user.addressETH+"</td><td id =\"balance"+i+method+"\"></td><td><button type=\"button\" id=\""+user.userId+"\" class=\"btn btn-info newopera\">New Opera</button></td></tr>");
                else
                    $('#'+method+'>tbody').prepend("<tr><th scope=\"row\"><a id=\"login\" href=\"#\">"+user.userId+"</a></th><td>"+user.firstName+"</td><td>"+user.lastName+"</td><td>"+user.addressETH+"</td><td id =\"balance"+i+method+"\"></td><td><button type=\"button\" id=\""+user.userId+"\" class=\"btn btn-info bid\">New Bid</button></td></tr>");
                getBalance(i+method,user.addressETH);
                console.log(i+method)
            });

        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
        },
        complete: function (xhr, status) {      // code to run regardless of success or function() {}ailure
            console.log("The request is complete!");
        }
    });
}
function postUser(method, postData) {
    $.ajax({
        url: "http://35.187.122.220:3000/api/"+method,
        // the URL for the request
        type: "POST",
        contentType:"application/json",
        // whether this is a POST or GET request
        dataType: "json",
        //
        data: postData,
        // the type of data we expect back
        success: function (responseJson) {
             console.log("Success");
             refresh();

        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
            console.log(xhr);
        },
        complete: function (xhr, status) {      // code to run regardless of success or failure
            console.log("The request is complete!");
        }
    });
}
function postOpera(postData) {
    $.ajax({
        url: "http://35.187.122.220:3000/api/Opera",
        // the URL for the request
        type: "POST",
        contentType:"application/json",
        //
        // whether this is a POST or GET request
        dataType: "json",
        data: postData,
        // the type of data we expect back
        success: function (responseJson) {
             console.log("Success");
             refresh();

        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
            console.log(xhr);
        },
        complete: function (xhr, status) {      // code to run regardless of success or failure
            console.log("The request is complete!");
        }
    });
}
function postOffer(postData) {
    console.log(postData);
    $.ajax({
        url: "http://35.187.122.220:3000/api/Offer",
        // the URL for the request
        type: "POST",
        contentType:"application/json",
        // whether this is a POST or GET request
        dataType: "json",
        //
        data: postData,
        // the type of data we expect back
        success: function (responseJson) {
             console.log("Success");
             refresh();

        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
            console.log(xhr);
        },
        complete: function (xhr, status) {      // code to run regardless of success or failure
            console.log("The request is complete!");
        }
    });
}
function getAllTransactionData() {
    $("#blocks").html("");
    $.ajax({
        url: "http://35.187.122.220:3000/api/system/historian?",
        // the URL for the request
        type: "GET",
        // whether this is a POST or GET request
        dataType: "json",
        //
        // the type of data we expect back
        success: function (responseJson) {

            responseJson.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(a.timestamp) - new Date(b.timestamp);
            });

            $.each(responseJson, function (i, transaction) {
                //var txId = transaction["transactionId"];
                $("#blocks").append("<div class=\"block\">"+transaction.transactionId+"</div>");
            });
            console.log("tx ok");
        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
        },
        complete: function (xhr, status) {      // code to run regardless of success or failure
            console.log("The request is complete!");
        }
    });
}
function refresh(){
    $('table').each(function(){
      getUser($(this).attr("id"));
    });
    getAllTransactionData();
}
function getOperasByArtist(artist, kind) {
    $('#login>tbody').html("");
    var pattern = /Artist/g
    var test = pattern.test(kind);
    if(test)
        var user= "Artist";
    else
        var user = "User";
    $.ajax({
        url: "http://35.187.122.220:3000/api/queries/selectCommoditiesByOwner?owner=resource%3Aorg.nexid.artchain."+user+"%23"+artist,
        // the URL for the request
        type: "GET",
        //
        // whether this is a POST or GET request
        dataType: "json",
        // the type of data we expect back
        success: function (responseJson) {
             $.each(responseJson, function (i, opera) {
                 $("#login>tbody").append("<tr style=\"background:#17a2b8; color:white;\"><th scope=\"row\">"+opera.assetId+"</th><td>"+opera.owner.split("#")[1]+"</td><td>"+opera.priceEth+"</td><td>"+opera.hash+"</td></tr>");
                 if(test){
                    $("#login>tbody").append("<table class=\"table\" id=\"prop"+i+"\"></table>");
                    getProposeByUserAndOpera(opera.owner,opera.assetId, i);
                 }else console.log("false");

                    
            });
        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
        },
        complete: function (xhr, status) {      // code to run regardless of success or failure
            console.log("The request is complete!");
        }
    });
}
function getAllOperas(){
   $.ajax({
        url: "http://35.187.122.220:3000/api/queries/selectCommodities?",
        // the URL for the request
        type: "GET",
        // whether this is a POST or GET request
        dataType: "json",
        //
        // the type of data we expect back
        success: function (responseJson) {
             $.each(responseJson, function (i, opera) {
                 $("#opera_list").append("<option value="+opera.assetId+">"+opera.assetId+"</option>");
            });
        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
        },
        complete: function (xhr, status) {      // code to run regardless of success or failure
            console.log("The request is complete!");
        }
    }); 
}
function getOffersByOwner(owner, kind) {
    $('#login>tbody').html("");
    var pattern = /Artist/g
    var test = pattern.test(kind);
    if(test)
        var user= "Artist";
    else
        var user = "User";
    $.ajax({
        url: "http://35.187.122.220:3000/api/queries/selectOfferByOwner?owner=resource%3Aorg.nexid.artchain."+user+"%23"+owner,
        // the URL for the request
        type: "GET",
        //
        // whether this is a POST or GET request
        dataType: "json",
        // the type of data we expect back
        success: function (responseJson) {
             if(!test){
                $.each(responseJson, function (i, offer) {
                    $("#login>tbody").append("<tr style=\"background:#b6eef3\"; color:white;\"><th scope=\"row\">"+offer.assetId+"</th><td>"+offer.owner.split("#")[1]+"</td><td>"+offer.priceEth+"</td><td>"+offer.contract+"</td><td>"+offer.asset.split("#")[1]+"</td><td><button type=\"button\" class=\"btn btn-primary send\">Send</button></td></tr>");                 
                });
             }
        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
        },
        complete: function (xhr, status) {      // code to run regardless of success or failure
            console.log("The request is complete!");
        }
    });
}
function getProposeByUserAndOpera(user, opera, index){
    console.log(opera);
    var kind = user.split("#")[0].split(".")[3];
    $.ajax({
        url: "http://35.187.122.220:3000/api/queries/selectOffersByOwnerAndOpera?owner=resource%3Aorg.nexid.artchain."+kind+"%23"+user.split("#")[1]+"&assetId=resource%3Aorg.nexid.artchain.Opera%23"+opera,
        // the URL for the request
        type: "GET",
        //
        // whether this is a POST or GET request
        dataType: "json",
        // the type of data we expect back
        success: function (responseJson) {
            var rows;
             $.each(responseJson, function (i, offer) {
                rows += "<tr style=\"background:#b6eef3\"><th scope=\"row\">"+offer.assetId+"</a></th><td>"+offer.contract+"</td><td>"+offer.offerer.split("#")[1]+"</td><td>"+offer.priceEth+"</td><td><button type=\"button\" class=\"btn btn-primary trade\">Accept</button></td></tr>"
            });
            $("#prop"+index).append(rows);

        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log(xhr);
        },
        complete: function (xhr, status) {      // code to run regardless of success or failure
            console.log("The request is complete!");
        }
    });
}
function newBid(offer, buyer){
    $("#spinner").modal();
    $.when(getOperas()).done(offer, buyer, function(operas){
        $.each(operas, function (i, opera) {
            if(opera.assetId==offer.asset){
            var seller = $("a:contains('"+opera.owner.split("#")[1]+"')").parent().parent().find('td:eq(2)').text();
                      $.ajax({
                        url: "http://35.240.46.194:3000/propose",
                        // the URL for the request
                        type: "POST",
                        //
                        //contentType:"application/json",
                        // whether this is a POST or GET request
                        //dataType: "json",
                        data: {"buyer": buyer, "seller": seller},
                        // the type of data we expect back
                        success: function (responseJson) {
                            offer.contract=responseJson;
                            $(".modal-content").html("<h3>Contract Addres:</h3><p> "+responseJson+"</p><br><h3>Please sign the transaction on Metamask</h3>");
                             web3.eth.sendTransaction({gas:30000,to: responseJson,
                                    from: buyer, 
                                   value:web3.toHex(web3.toWei(offer.priceEth, "ether"))}
                                    ,function (err, res){
                                        if(res.substring(0,2)=="0x")
                                               $(".modal-content").html("<h3>Transaction Success!</h3>"); 
                                              var json = JSON.stringify(offer);
                                              postOffer(json);
                                    });

                        },
                        error: function (xhr, status) {
                            // code run if request fails; raw request and status
                            console.log("Sorry, there was a problem! Propose");
                            console.log(status);
                        },
                        complete: function (xhr, status) {      // code to run regardless of success or failure
                            console.log("The request is complete!");
                        }
                    });
            }
        });
 
    });
}
function getUserById(id) {
    return $.ajax({
            url: "http://35.187.122.220:3000/api/queries/selectUserById?userId=resource%3Aorg.nexid.artchain.User%23"+id,
            // the URL for the request
            type: "GET",
            //
            dataType: "json"});
}
function getOperas() {
   return $.ajax({
            url: "http://35.187.122.220:3000/api/queries/selectCommodities?",
            // the URL for the request
            type: "GET",
            headers:{'X-Access-Token' : 'Fo2OvJWhJ0a8CPj5IAggbqQrIbmfOaamY6wzrwqHZdEDk1GLiW7BHMrG0ORAnaJo'},
            // whether this is a POST or GET request
            dataType: "json"});
}
function getBalance(i,address){
    web3.eth.getBalance(address, function(err, res){
        $('#balance'+i).append(web3.fromWei(res.toNumber(), "ether" ));
    });
}
function SendBid(postData){
    $("#spinner").modal();
    $(".modal-content").html("<h3>Sending Bid<br>please wait...</h3>");
     $.ajax({
        url: "http://35.187.122.220:3000/api/Propose",
        // the URL for the request
        type: "POST",
        contentType:"application/json",
        //
        // whether this is a POST or GET request
        dataType: "json",
        data: postData,
        // the type of data we expect back
        success: function (responseJson) {
             $(".modal-content").html("<h3>Bid Sent!</h3>");             
             refresh();
             $("#spinner").modal("toggle");
        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
            console.log(xhr);
        },
        complete: function (xhr, status) {      // code to run regardless of success or failure
            console.log("The request is complete!");
        }
    });
}
function getOperaById(id) {
   return $.ajax({
            url: "http://35.187.122.220:3000/api/queries/selectOperaById?assetId="+id,
            // the URL for the request
            type: "GET",
            // whether this is a POST or GET request
            dataType: "json"});
}

function AcceptBid(postData){
    $("#spinner").modal();
    $(".modal-content").html("<h3>Selling Opera<br>please wait...</h3>");
    $.ajax({
        url: "http://35.187.122.220:3000/api/Trade",
        // the URL for the request
        type: "POST",
        contentType:"application/json",
        //
        // whether this is a POST or GET request
        dataType: "json",
        data: postData,
        // the type of data we expect back
        success: function (responseJson) {
             $(".modal-content").html("<h3>Opera Sold!</h3>");
             refresh();
             $("#spinner").modal("toggle");

        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
            console.log(xhr);
        },
        complete: function (xhr, status) {      // code to run regardless of success or failure
            console.log("The request is complete!");
        }
    });
}
