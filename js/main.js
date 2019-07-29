$(document).ready(function(){


    var toprint = "";
    $.getJSON("js/myData.json", function(data) { 
        //new_array_print(data);
        // $("body").append(toprint);;
        process_json(data);
    });
    
    function new_array_print(data) {
        toprint += "<ul>";
        $.each(data, function (key, val) { 
            toprint += "<li>" + key + ": ";
            if ($.isArray(val) || $.type(val) == "object") { new_array_print(val); }
            else { toprint += val; }
            toprint += "</li>";
        });
        toprint += "</ul>"; 
    }
    
    function process_json(data) {
        $.each(data, function(key, val) {
            switch (key) {
                case "summaries":
                    $.each(val, function(key,val) { add_to_summaries(val); });
                    break;
                case "skills":
                    $.each(val, function(key,val) { add_to_skills(val); });
                    break;
                case "languages":
                    $.each(val, function(key,val) { add_to_languages(val); });
                    break;
                case "companies":
                    $.each(val, function(key,val) { add_to_experiences(val); });
                    break;
            }
        });
    }
    
    function add_to_summaries(a) {
        $("#summary > dl").append(
            "<div class='list-group-item'>"+
            "<dt class='list-group-item-heading'>"+a.title+"</dt>"+
            "<dd class='list-group-item-text'>"+a.text+"</dd>"+
            "</div>"
        );
    }
    
    function add_to_experiences(a) {
        $("#experiences > .panel-body").append(
            "<div class='panel panel-default'>"+
            "<div class='panel-heading'><h3 class='panel-title'>"+a.name+" <span class='time'>"+a.years+"</span></h3></div>"+
            "<dl class='list-group'></dl>"+
            "</div>"
        );
        $.each(a.positions, function(key, val) {
            $("#experiences dl.list-group:last").append(
                "<div class='list-group-item'>"+
                "<dt class='list-group-item-heading'>"+val.title+"</dt>"+
                "<dd class='list-group-item-text'>"+val.descriptions[0].text+"</dd>"+
                "</div>"
            );
        });	
    }
    
    function add_to_languages(a) {
        $("#languages > ul").append( "<li><span class='badge'>"+a.years+" years</span>"+a.title+"</li>");
    }
    
    function add_to_skills(a) {
        var $span = $("<span/>", { "class": "badge" });
        for (i=1; i<=5; i++) {
            var $icon = $("<span/>", { "class": "glyphicon glyphicon-star" });
            if (i > a.rank) { $icon.addClass("hidden"); }
            $span.append($icon);
        }
                
        $("#skills > ul").append( $("<li>"+a.title+"</li>").prepend($span) );
    
    }
    
    
    });