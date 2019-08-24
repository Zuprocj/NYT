var authKey = "GtPCTckFAJUoJJYUs8uW0rOei8GWc84Y";

var queryTerm   = "";
var numResults  = 0;
var startYear   = 0;
var endYear     = 0;

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

var articleCounter = 0;


function runQuery(numArticles, queryURL){
    $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(NYTData) {
    for (var i = 0; i <numArticles.length; i++){
        var wellSection = $("<div>")
        wellSection.addClass("well");
        wellSection.attr("id", "articleWell-" + i)
        $("#wellSection").append(wellSection);
        $("#wellSection-" + i).append("<h3>" + NYTdata.response.docs[i].headline.main + "</h3>");
        $("#wellSection-" + i).append("<h5>"+ NYTdata.response.docs[i].section_name + "</h5>");
        $("#wellSection-" + i).append("<h5>"+ NYTdata.response.docs[i].pub_date + "</h5>");
        $("#wellSection-" + i).append("<h5>"+ NYTdata.response.docs[i].byline.original + "</h5>");
        $("#wellSection-" + i).append("<a href=" + NYTdata.response.docs[i].web_url">" + NYTdata.response.docs[i].web_url + "</a>");
    }
      })
      
    }

$("#searchBtn").on("click", function() {

    queryTerm = $("#search").val().trim();

    var newURL = queryURLBase + "&q=" + queryTerm;

    numResults = $("#numRecords").val();
    
    
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim();

if (parseInt(startYear)) {
    startYear = startYear + "0101";
    newURL = newURL + "&begin_date=" + startYear;

}
if (parseInt(endYear)){
    endYear = endYear + "0101";
    newURL = newURL + "&end_date=" + endYear

}
    newURL = newURL + "&begin_date=" + startYear + "&end_date=" + endYear;



    runQuery(numResults, newURL);
    return false;
})