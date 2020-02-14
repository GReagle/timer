"use strict";

var g_stop;
var g_duration;
var g_intervalID;

function startTimer () {
	clearInterval(g_intervalID);
	let start = new Date().getTime();
	let mins = Number(document.getElementById("minutes").value);
	let secs = Number(document.getElementById("seconds").value);
	g_duration = ((mins * 60) + secs) * 1000;
	g_stop = start + g_duration;
	update();
	g_intervalID = setInterval(update, 1000);
}

function update () {
	let remains = g_stop - new Date().getTime();
	let percent = Math.round((remains / g_duration) * 100);
	let minutes = Math.floor(remains / 60000);
	let seconds = Math.round((remains % 60000) / 1000);
	if (seconds == 60) {  //because we rounded seconds, have to check this
		minutes += 1;
		seconds -= 60;
	}
	document.getElementById("remains").innerHTML = minutes + ":" + ("0" + seconds).slice(-2);
	document.getElementById("barFG").style.width = percent + "%";
	if (remains <= 0) {
		clearInterval(g_intervalID);
		document.getElementById("remains").innerHTML = "Expired";
		document.getElementById("barFG").style.width = "0%";
		let audio = new Audio("Goldberg-1a1-Ishizaka-pd-10s.mp3");
		audio.play();
		if (document.getElementById("auto-repeat").checked) { startTimer(); }
	}
}
