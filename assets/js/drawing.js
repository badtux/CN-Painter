	if ( $( "#myCanvas" ).length ) {
		//Create canvas
		var canvas = document.getElementById('myCanvas');
		var parent = document.getElementById("canvasarea");
		canvas.width = parent.offsetWidth;
		canvas.height = parent.offsetHeight;

		var background = new Image();
		background.src = "assets/images/paint_white.png";
		//background.src = "assets/images/paint.png";

		var ctx = canvas.getContext('2d');

		background.onload = function(){
		    ctx.drawImage(background,0,0,canvas.width,canvas.height);
		}

		lines();
		//var removeRectangleInLine = 0;
	}

	function lines() {
		//painting = false;
		//Remove event listeners so line won't draw rectangle
		/*if (removeRectangleInLine == 1) {
			canvas.removeEventListener('mousedown', rectMouseDown);
			canvas.removeEventListener('mouseup', rectMouseUp);
			canvas.removeEventListener('mousemove', rectMouseMove);
			canvas.removeEventListener('mouseout', rectMouseout);
		};*/

		//Initialize mouse coordinates to 0,0
		var mouse = { x: 0, y: 0};

		//Paint includes line width, line cap, and color
		paint = function() {
			ctx.lineTo(mouse.x, mouse.y);
			ctx.lineWidth = lineWidthRange();
			ctx.lineJoin = 'round';
			ctx.lineCap = brushstyle;
			ctx.strokeStyle = colors;
			ctx.stroke();
		};

		//Find mouse coordinates relative to canvas
		linesMousemove = function(e){
			mouse.x = e.pageX - this.offsetLeft;
			mouse.y = e.pageY - this.offsetTop;
		};

		//User clicks down on canvas to trigger paint
		linesMousedown = function(){
			ctx.beginPath();
			ctx.moveTo(mouse.x, mouse.y);
			canvas.addEventListener('mousemove', paint, false);
		};

		//When mouse lifts up, line stops painting
		linesMouseup = function(){
			canvas.removeEventListener('mousemove', paint, false);
		};

		//When mouse leaves canvas, line stops painting
		linesMouseout = function() {
			canvas.removeEventListener('mousemove', paint, false);
		};

		//Event listeners that will trigger the paint functions when
		//mousedown, mousemove, mouseup, mouseout
		canvas.addEventListener('mousedown', linesMousedown, false);
		canvas.addEventListener('mousemove', linesMousemove, false);
		canvas.addEventListener('mouseup', linesMouseup, false);
		canvas.addEventListener('mouseout', linesMouseout, false);

	};

	//Color palette
	var colors;
	function changeColors(palette) {
		switch(palette.id) {
			case "red":
				colors = "red";
				break;
			case "red1":
				colors = "#F16161";
				break;
			case "red2":
				colors = "#F69FA0";
				break;
			case "orange":
				colors = "orange";
				break;
			case "orange1":
				colors = "#F99F62";
				break;
			case "orange2":
				colors = "#FBB57B";
				break;
			case "blue":
				colors = "#09C2DB";
				break;
			case "blue1":
				colors = "#8BD3DC";
				break;
			case "blue2":
				colors = "#B9E3E8";
				break;
			case "indigo":
				colors = "#0E38AD";
				break;
			case "indigo1":
				colors = "#546AB2";
				break;
			case "indigo2":
				colors = "#9C96C9";
				break;
			case "green":
				colors = "green";
				break;
			case "green1":
				colors = "#97CD7E";
				break;
			case "green2":
				colors = "#C6E2BB";
				break;
			case "black":
				colors = "black";
				break;
			case "black1":
				colors = "#545454";
				break;
			case "black2":
				colors = "#B2B2B2";
				break;
			case "yellow":
				colors = "yellow";
				break;
			case "yellow1":
				colors = "#F7F754";
				break;
			case "yellow2":
				colors ="#F7F4B1";
				break;
			case "purple":
				colors = "#B9509E";
				break;
			case "purple1":
				colors = "#D178B1";
				break;
			case "purple2":
				colors = "#E3ABCE";
				break;
			case "erase":
				colors = "white";
				break;
		}
	};

	//Change brush style
	var brushstyle;
	function changeBrushStyle(obj) {
		switch(obj.id) {
			case "round":
				brushstyle = "round";
				break;
			case "square":
				brushstyle = "butt";
				break;
			case "rough":
				brushstyle = "square";
				break;
		}
	};

	//Change line width
	function lineWidthRange() {
	    var widthLine = document.getElementById("myRange").value;
	    return widthLine;
	};

	//Clear canvas
	function erase() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	function thankYouShareNow(){
		console.log('11');
		$('#modalThankYou').modal('show');
	}

	function addOutLine() {
		var outLine = new Image();
		outLine.src = "assets/images/paint.png";
		outLine.onload = function(){
		    ctx.drawImage(outLine,0,0,canvas.width,canvas.height);
		}
	}

	function submitArtwork() {
		var childName = $('#childName').val();
		var childAge = $('#childAge').val();
		var parentNo = $('#parentNo').val();

		var canvas = document.getElementById("myCanvas");

		//const ctx = canvas.getContext('2d');
		//ctx.drawImage(background,0,0);
		//Convert image to 'octet-stream' (Just a download, really)
		//var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
		//window.location.href = image;
		var imgBase64 = canvas.toDataURL(); 

		var fd = new FormData();
		fd.append('parentNo', parentNo);
		fd.append('childName', childName);
		fd.append('childAge', childAge);
		fd.append('painting', imgBase64);

		$.ajax({
		    type: 'POST',
		    url: 'up.php',
		    data: fd,
		    dataType: 'json',
		    processData: false,
		    contentType: false
		}).done(function(data) {
		
			console.log(data);
			
			$('#modalSubmissionForm').modal('hide');

			var shareButton = document.getElementById('shareBtn');
			shareButton.addEventListener('click', function (e) {
				FB.ui({
				    display: 'popup',
				    method: 'share',
				    quote: data.share_msg,
				    href: data.share_url,
				  }, function(response){});	
			});

			console.log('uploaded.');
		});
	}

	$(document).ready(function(){
		$.ajaxSetup({ cache: true });
		$.getScript('https://connect.facebook.net/en_US/sdk.js', function(e){
			FB.init({
				appId: '1294688194235622',
			    version: 'v2.7' // or v2.1, v2.2, v2.3, ...
			});
		});

		if ( $( "#btn-trynow" ).length ) {
			var button = document.getElementById('btn-trynow');
			button.addEventListener('click', function (e) {
				window.location.href = "/";
			});
		}

		if ( $( "#btn-finish" ).length ) {
			var button = document.getElementById('btn-finish');
			button.addEventListener('click', function (e) {
				addOutLine();
				$('#modalSubmissionForm').on('shown.bs.modal', function () {
					$('#childName').trigger('focus');
					var button = document.getElementById('submitSuperPainting');
					button.addEventListener('click', function (e) {

					    // Fetch all the forms we want to apply custom Bootstrap validation styles to
					    var forms = document.getElementsByClassName('needs-validation');
					    // Loop over them and prevent submission
					    var validation = Array.prototype.filter.call(forms, function(form) {
					      form.addEventListener('submit', function(event) {
							event.preventDefault();
					        event.stopPropagation();
					        
					        if (form.checkValidity() === false) {
					        	
					        }
					        else {
					        	submitArtwork();
					        }

					        form.classList.add('was-validated');

					      }, false);
					    });
					});
				});

				$('#modalSubmissionForm').modal('show');
				console.log('4');

				$('#modalSubmissionForm').on('hidden.bs.modal', function (e) {
					console.log('5');
					thankYouShareNow();
				});
			});
		}
	});