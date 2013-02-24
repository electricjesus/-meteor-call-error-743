if (Meteor.isClient) {

  Template.testbutton.events({
    'click input' : function () {
      if (typeof console !== 'undefined') {
	Meteor.call('callme', function(err, res) {
	    if(!err) {
		alert("success!");
	    } else {
		Session.set("error3", err.reason);
	    }
        });
      }
    }
  });

  Template.error1.message = function() {
    try {
       return Session.get("error1");
    } catch(err) {
    }
  }
  Template.error2.message = function() {
    try {
       return Session.get("error2");
    } catch(err) {
	console.log("Got an exception calling Session.get", err);
    }
  }
  Template.error3.message = function() {
    try {
       return Session.get("error3");
    } catch(err) {
	console.log("Got an exception calling Session.get", err);
    }
  }

  Meteor.startup(function() {
	// 1 : directly on startup 
	Meteor.call('callme', function(err, res) {
	    if(!err) {
		alert("success!");
	    } else {
		Session.set("error1", err.reason);
	    }
        });	

	Meteor.autorun(function() {
	    // 2 : inside autorun
   	    Meteor.call('callme', function(err, res) {
	        if(!err) {
		    alert("success!");
	        } else {
		    Session.set("error2", err.reason);
                }
            });
	});
  });
}

if (Meteor.isServer) {
  Meteor.methods({
	'callme' : function () {
	    throw new Meteor.Error(403, "Error received");
            return false;
        }
  });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}


