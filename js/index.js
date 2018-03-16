
var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"];


function channelInfo(){
  channels.forEach(function(channel){
    
    var url = function makeURL(type, name){
      return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + name + "?callback=?"
    } 
    
    $.getJSON(url("streams",channel),function(data){
      var game,
          status;
      
      if (data.stream === null){
        game = "offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      }
      
      $.getJSON(url("channels", channel), function(data2){
        var icon = data2.logo != null? data2.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
            name = data2.display_name != null? data2.display_name : channel,
            description = status === "online"? ": " + data2.status : "";
        
          html = '<div class="row ' + 
          status + '"><div class="col-sm-1" id="icon"><img src="' + 
          icon + '" id="logo"></div><div class="col-sm-3" id="name"><a href="' + 
          data2.url + '" target="_blank">' + 
          name + '</a></div><div class="col-sm-8" id="gameDes">'+ 
          game +  
          description + '</div></div>';
        
        
        status == "online"? $("#body").prepend(html) : $("#body").append(html);
      });
    });

  });
};
  
  
$(document).ready(function(){
  
  channelInfo();
  
  $(".rectangle").click(function(){
    $(".rectangle").removeClass("active");
    $(this).addClass("active");

    if ($(this).attr("id") === "all"){
      $(".online, .offline").removeClass("hidden");  
    } else if ($(this).attr("id") === "online"){
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    } else {
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  });




});