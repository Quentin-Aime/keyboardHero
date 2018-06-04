var el_Q = document.querySelector('.q');
var el_D = document.querySelector('.d');
var el_G = document.querySelector('.g');
var el_J = document.querySelector('.j');
var map = {81: false, 68: false, 71: false, 74: false};
var colums = document.querySelectorAll('.game-scroll-column');
var getScore = document.querySelector('.game-showScore');
var points = 50;
var multi = 0;
var rightCombination = 0;
var multiplicator1 = document.querySelector('.game-multiplicator1');
var multiplicator2 = document.querySelector('.game-multiplicator2');
var multiplicator3 = document.querySelector('.game-multiplicator3');
var multiplicator4 = document.querySelector('.game-multiplicator4');

var sets = {
	collection : [],
	create : function() {
		var code = Math.floor(Math.random() * 15 + 1);
		switch (code) {
			case 1:
				sets.collection.push('...J');
				break;
			case 2:
				sets.collection.push('..G.');
				break;
			case 3:
				sets.collection.push('..GJ');
				break;
			case 4:
				sets.collection.push('.D..');
				break;
			case 5:
				sets.collection.push('.D.J');
				break;
			case 6:
				sets.collection.push('.DG.');
				break;
			case 7:
				sets.collection.push('.DGJ');
				break;
			case 8:
				sets.collection.push('Q...');
				break;
			case 9:
				sets.collection.push('Q..J');
				break;
			case 10:
				sets.collection.push('Q.G.');
				break;
			case 11:
				sets.collection.push('Q.GJ');
				break;
			case 12:
				sets.collection.push('QD..');
				break;
			case 13:
				sets.collection.push('QD.J');
				break;
			case 14:
				sets.collection.push('QDG.');
				break;
			case 15:
				sets.collection.push('QDGJ');
				break;
		}
	},
}

function addScore(nb) {
	getScore.textContent = parseInt(getScore.textContent) + nb;
}

function updateScore(correct) {
	if (correct === 1) {
		rightCombination += 1;
		multiplicator1.style.display = 'none';
		multiplicator2.style.display = 'none';
		multiplicator3.style.display = 'none';
		multiplicator4.style.display = 'none';
		if (rightCombination <= 10) {
			multi = 1;
			multiplicator1.style.display = 'block';
		}
		else if (rightCombination <= 20) {
			multi = 2;
			multiplicator2.style.display = 'block';
		}
		else if (rightCombination <= 30) {
			multi = 3;
			multiplicator3.style.display = 'block';
		}
		else {
			multi = 4;
			multiplicator4.style.display = 'block';
		}
	}
	else {
		multiplicator2.style.display = 'none';
		multiplicator3.style.display = 'none';
		multiplicator4.style.display = 'none';
		multiplicator1.style.display = 'block';
		rightCombination = 0;
		multi = 0;
	}
	addScore(multi * points);
}

function renderHighlight() {
	el_Q.classList.remove('highlight');
	el_D.classList.remove('highlight');
	el_G.classList.remove('highlight');
	el_J.classList.remove('highlight');
	if (map['81'] === true) {
		el_Q.classList.add('highlight');
	}
	if (map['68'] === true) {
		el_D.classList.add('highlight');
	}
	if (map['71'] === true) {
		el_G.classList.add('highlight');
	}
	if (map['74'] === true) {
		el_J.classList.add('highlight');
	}
}

function newRow() {
	sets.create();
	var combination = sets.collection[sets.collection.length - 1];
	for (let i = 0; i < colums.length; i++) {
		if (combination[i] !== '.') {
			var newLetter = document.createElement('p');
			newLetter.textContent = combination[i];
			newLetter.classList.add('letter');
			newLetter.style.marginTop = "0vh";
			colums[i].appendChild(newLetter);
		}
	}
}

function fall() {
	var letters = document.querySelectorAll('.letter');
	var check = true;

	for (let i = 0; i < letters.length; i++)
	{
		letters[i].style.marginTop = (parseFloat(letters[i].style.marginTop) + 0.25) + "vh";
	}

	for (let i = 0; i < letters.length; i++)
	{
		if (parseFloat(letters[i].style.marginTop) >= 70 && parseFloat(letters[i].style.marginTop) < 75) {
			letters[i].style.backgroundColor = "orange";
		}
		else if (parseFloat(letters[i].style.marginTop) >= 75 && parseFloat(letters[i].style.marginTop) <= 79) {
			letters[i].style.backgroundColor = "#6EEB83";
		}
		else if (parseFloat(letters[i].style.marginTop) > 79 && parseFloat(letters[i].style.marginTop) < 83) {
			letters[i].style.backgroundColor = "orange";
		}
		else if (parseFloat(letters[i].style.marginTop) >= 83 && parseFloat(letters[i].style.marginTop) <= 84) {
			letters[i].style.backgroundColor = "red";
		}
		else if (parseFloat(letters[i].style.marginTop) > 84){
			letters[i].parentNode.removeChild(letters[i]);
			if (check === true) {
				sets.collection.shift();
				check = false;
				multi = 1;
				rightCombination = 0;
				multiplicator2.style.display = 'none';
				multiplicator3.style.display = 'none';
				multiplicator4.style.display = 'none';
				multiplicator1.style.display = 'block';

			}

		}
	}
}

function getCode() {
	var code = "";
	map['81'] === true ? code += "Q" : code += "."
	map['68'] === true ? code += "D" : code += "."
	map['71'] === true ? code += "G" : code += "."
	map['74'] === true ? code += "J" : code += "."
	return code;
}

function deleteLetter(letter) {
	var letters = document.querySelectorAll('.letter');
	var counter = 0;

	while (letters[counter].textContent !== letter) {
		counter++;
	}
	if (parseFloat(letters[counter].style.marginTop) < 70) {
		multi = 1;
		rightCombination = 0;
		multiplicator2.style.display = 'none';
		multiplicator3.style.display = 'none';
		multiplicator4.style.display = 'none';
		multiplicator1.style.display = 'block';
		return false;
	}
	letters[counter].parentNode.removeChild(letters[counter]);
	return true;
}

function correct(code, indic) {
	var model = "QDGJ";
	var myDelete = true;
	for (var modelIndex = 0; modelIndex < model.length; modelIndex++) {
		if (code.indexOf(model[modelIndex]) !== -1) {
			myDelete = deleteLetter(model[modelIndex]);
		}		
	}
	//shift quand delete = true

	if (myDelete) {
		sets.collection.shift();
	}
	updateScore(indic);
}

function hitSpace() {
	let code = sets.collection[0];
	var keyCode = getCode();
	code === keyCode ? correct(code, 1) : correct(code, 0);
}

function gameBegin() {
	newRow();
	id = window.setInterval(function() {
		fall();
	}, 20);
	
	window.setInterval(function() {
		newRow();
	}, 1500);

}

window.addEventListener('keydown', function(el) {
	el.repeat = false;

	if (el.keyCode === 32) {
		hitSpace();
	}
	map[el.keyCode] = true;
	renderHighlight();
});
window.addEventListener('keyup', function(el) {
	map[el.keyCode] = false;
	renderHighlight();
});

gameBegin();
