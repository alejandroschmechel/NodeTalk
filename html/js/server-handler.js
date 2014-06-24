var server = io(config.host);
var connectedUser = "";

$("#send-button").on('click', function(e){
	$("#message-form").submit();
});

$("#message-form").on('submit', function(e){
	var message = $('#message').val();
	server.emit('message', message);
	$('#message').val('');
});

server.on('connect', function(data){
	connectedUser = prompt("Question: What's your beautiful name?");
	$("#connected_user").html('<b>'+connectedUser+'</b>');
	server.emit('join', connectedUser);
});

server.on('leave', function(data){
	server.emit('leave', connectedUser)
})

server.on('prevmessages', function(data){
  prependOldMessages(data);
});

server.on('newmessage', function(data) { 
	insertMessage(data); 
});

server.on('userjoined', function(name){
	promptJoined(name);
});

server.on('userleft', function(name){
	promptLeft(name);
});

server.on('prevusers', function(names){
	prependPrevUsers(names);
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
      console.log(message.date);
      if(message.date !== undefined && !is_today(message.date)){ var cdate = new Date(message.date); showDate = "On "+cdate.getMonth()+"/"+cdate.getDay()+" "; }
      $("#messages").prepend("<p class='sent-message old'>"+showDate+"["+message.time+"] "+message.nickname+" wrote: "+message.message+"</p>");
    });
    server.emit('messagesloaded', connectedUser);
  }); 
}

function prependPrevUsers(names){
	var virg = "";
    names.forEach(function(name){
    	$("#usersList").append(virg+name);
    	virg = ", ";
    }); 
}

function promptLeft(name){
	$("#messages").prepend("<p class='sent-message left'>"+name+" has left.</p>");
}

function promptJoined(name){
	$("#messages").prepend("<p class='sent-message joined'>"+name+" has connected.</p>");
}

function is_today(td){
	td = new Date(td);
	var d = new Date();
	return td.getDate() == d.getDate() && td.getMonth() == d.getMonth() && td.getFullYear() == d.getFullYear();
}

