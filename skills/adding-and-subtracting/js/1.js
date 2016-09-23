var global = {};

function generateQuestion() {
	var fnum = Math.floor((Math.random() * 900) + 100);
	var snum = Math.floor((Math.random() * 900) + 100);
	var operator = Math.floor((Math.random() * 2) - 1);
	if (operator < 0){
		global.ans = fnum + snum;
		document.getElementById('question').innerHTML = fnum + " + " + snum;
	} else {
		if (fnum >= snum) {
			global.ans = fnum - snum;
			document.getElementById('question').innerHTML = fnum + " - " + snum;
		} else {
			global.ans = snum - fnum;
			document.getElementById('question').innerHTML = snum + " - " + fnum;
		}
	}
}

function skipQuestion() {
	if (!global.onresult) {
		document.getElementById('result').innerHTML = "The correct answer was " + global.ans;
		document.getElementById('skip').innerHTML = "Next";
		document.getElementById('answer').disabled = true;
		document.getElementById('button').style.display = 'none';
		global.onresult = true;
	} else {
		generateQuestion();
		document.getElementById('result').innerHTML = "";
		document.getElementById('skip').innerHTML = "Skip";
		document.getElementById('button').disabled = true;
		document.getElementById('answer').disabled = false;
		document.getElementById('button').style.display = 'initial';
		document.getElementById('answer').focus();
		document.getElementById('answer').value = "";
		global.onresult = false;
	}
}

function checkEmpty() {
	if (document.getElementById('answer').value != "") {
		document.getElementById('button').disabled = false;
	} else {
		document.getElementById('button').disabled = true;
	}
}

function checkAnswerIfEnter() {
	if (event.keyCode == 13 && document.getElementById('button').disabled == false) {
		checkAnswer();
	}
}

window.onload=function(){
generateQuestion();
document.getElementById('button').disabled = true;
document.getElementById('instruction').innerHTML = "Calculate";
global.onresult = false;
}

function checkAnswer() {
	if (!global.onresult) {
		var audio_correct = new Audio('../../../sounds/right_answer.mp3');
		var audio_wrong = new Audio('../../../sounds/wrong_answer.mp3');
		var userans = document.getElementById('answer').value;
		if (global.ans == userans) {
			document.getElementById('result').innerHTML = "Correct";
			audio_correct.play();
		} else {
			document.getElementById('result').innerHTML = "Incorrect. The correct answer was " + global.ans;
			audio_wrong.play();
		}
		document.getElementById('button').innerHTML = "Next";
		document.getElementById('answer').disabled = true;
		document.getElementById('skip').style.display = 'none';
		global.onresult = true;
	} else {
		generateQuestion();
		document.getElementById('result').innerHTML = "";
		document.getElementById('button').innerHTML = "Check";
		global.onresult = false;
		document.getElementById('answer').value = "";
		document.getElementById('button').disabled = true;
		document.getElementById('answer').disabled = false;
		document.getElementById('answer').focus();
		document.getElementById('skip').style.display = 'initial';
	}
}