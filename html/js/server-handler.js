var server = io(config.host);

$("#send-button").on('click', function(e){
	$("#message-form").submit();
});

$("#message-form").on('submit', function(e){
	var message = $('#message').val();
	server.emit('message', message);
	$('#message').val('');
});

server.on('connect', function(data){
	var connectedUser = prompt("Question: What's your beautiful name?");
	$("#connected_user").html('<b>'+connectedUser+'</b>');
	server.emit('join', connectedUser);
});

server.on('prevmessages', function(data){
  prependOldMessages(data);
})

server.on('newmessage', function(data) { 
	insertMessage(data); 
});

function insertMessage(message){
	$(".sent-message").removeClass('last');
	$(".none").fadeOut(function(){
		$("#messages").prepend("<p class='sent-message last'>"+message+"</p>");
	});	
}

function prependOldMessages(messages){
  $(".none").fadeOut(function(){
    messages.forEach(function(message){
      var showDate = "";
      //if(message.date !== 'undefined' && !is_today(message.date)){ showDate = "On "+message.date.getMonth()+" "+message.date.getDay()+" "; }
      $("#messages").prepend("<p class='sent-message old'>"+showDate+"["+message.time+"] "+message.nickname+" wrote: "+message.message+"</p>");
    });
  }); 
}

function is_today(td){
	if(td !== 'undefined'){
		var d = new Date();
		return td.getDate() == d.getDate() && td.getMonth() == d.getMonth() && td.getFullYear() == d.getFullYear();
	}
}

