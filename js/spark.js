$(document).ready(function() {
	console.log("wat");
	var baseURL = "https://api.spark.io/v1/devices/";
	var timer1, timer2, timer3, timer4;

	// check settings header if we don't have info
	checkSettings();

	// check local storage for core id and token
	if (localStorage.getItem("api-token")) {
		$("#api-token").val(localStorage.getItem("api-token"));
	}
	if (localStorage.getItem("core-id")) {
    	$("#core-id").val(localStorage.getItem("core-id"));
  	}

  	$( "api-token" ).on("change", function() {
  		localStorage.setItem("api-token", $("#api-token").val());
	  	checkSettings();
	  	console.log("api token changed");
	  });
	$( "#core-id" ).on("change", function() {
    	localStorage.setItem("core-id", $("#core-id").val());
    	checkSettings();
    	console.log("core id changed");
    });

    function checkSettings() {
    	var apiToken = localStorage.getItem("api-token");
    	var coreID = localStorage.getItem("core-id");
    	if (apiToken === undefined || apiToken === '' || apiToken === null || coreID
    		=== undefined || coreID === '' || coreID === null) {
    			$("#settings-panel").removeClass("panel-default").addClass("panel-danger");
    			return false;
    	} else {
    			$("#settings-panel").removeClass("panel-danger").addClass("panel-default");
    			return true;
    	}
    }

    // alerts
    $("#info-alert").alert();
    $("#info-alert").affix();

    // methods
    function onMethodSuccess() {
    	alertt = $("#alertt");
    	alertt.animate({color: "#33D633"}, 500);
    	alert = $("#info-alert");
    	//alert.text("Yus").removeClass("alert-danger").addClass("alert-success");
    	alert.show();
    	setTimeout(function() { alertt.animate({color: "#fff"}, 1000); alert.hide(); console.log("hide"); }, 1500);
    }

    function onMethodFailure() {
    	alertt = $("#alertt");
    	alertt.animate({color: "#FF3333"}, 500);
    	alert = $("#info-alert");
    	//alert.text("nope").removeClass("alert-success").addClass("alert-danger");
    	alert.show();
    	setTimeout(function() { alertt.animate({color: "#fff"}, 1000); alert.hide(); console.log("hide"); }, 1500);
    }

    function doMethod(method, data) {
    	var url = baseURL + $("#core-id").val() + "/" + method;
    	$.ajax({
	    	type: "POST",
		    url: url,
			data: {access_token: $("#api-token").val(), args: data },
			success: onMethodSuccess,
			dataType: "json"
		}).fail(function(obj) {
			onMethodFailure();
		});
    }

    $("#post-1").on("click", function () {
	    doMethod($("#method-1").val(), $("#data-1").val());
	    console.log("click");
	});
	$("#post-2").on("click", function () {
	    doMethod($("#method-2").val(), $("#data-2").val());
	    console.log("click");
	});





});