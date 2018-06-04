// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],5:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":6}],4:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":5}],3:[function(require,module,exports) {
var el_Q = document.querySelector('.q');
var el_D = document.querySelector('.d');
var el_G = document.querySelector('.g');
var el_J = document.querySelector('.j');
var map = { 81: false, 68: false, 71: false, 74: false };
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
	collection: [],
	create: function create() {
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
	}
};

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
		} else if (rightCombination <= 20) {
			multi = 2;
			multiplicator2.style.display = 'block';
		} else if (rightCombination <= 30) {
			multi = 3;
			multiplicator3.style.display = 'block';
		} else {
			multi = 4;
			multiplicator4.style.display = 'block';
		}
	} else {
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
	for (var i = 0; i < colums.length; i++) {
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

	for (var i = 0; i < letters.length; i++) {
		letters[i].style.marginTop = parseFloat(letters[i].style.marginTop) + 0.25 + "vh";
	}

	for (var _i = 0; _i < letters.length; _i++) {
		if (parseFloat(letters[_i].style.marginTop) >= 70 && parseFloat(letters[_i].style.marginTop) < 75) {
			letters[_i].style.backgroundColor = "orange";
		} else if (parseFloat(letters[_i].style.marginTop) >= 75 && parseFloat(letters[_i].style.marginTop) <= 79) {
			letters[_i].style.backgroundColor = "#6EEB83";
		} else if (parseFloat(letters[_i].style.marginTop) > 79 && parseFloat(letters[_i].style.marginTop) < 83) {
			letters[_i].style.backgroundColor = "orange";
		} else if (parseFloat(letters[_i].style.marginTop) >= 83 && parseFloat(letters[_i].style.marginTop) <= 84) {
			letters[_i].style.backgroundColor = "red";
		} else if (parseFloat(letters[_i].style.marginTop) > 84) {
			letters[_i].parentNode.removeChild(letters[_i]);
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
	map['81'] === true ? code += "Q" : code += ".";
	map['68'] === true ? code += "D" : code += ".";
	map['71'] === true ? code += "G" : code += ".";
	map['74'] === true ? code += "J" : code += ".";
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
	var code = sets.collection[0];
	var keyCode = getCode();
	code === keyCode ? correct(code, 1) : correct(code, 0);
}

function gameBegin() {
	newRow();
	id = window.setInterval(function () {
		fall();
	}, 20);

	window.setInterval(function () {
		newRow();
	}, 1500);
}

window.addEventListener('keydown', function (el) {
	el.repeat = false;

	if (el.keyCode === 32) {
		hitSpace();
	}
	map[el.keyCode] = true;
	renderHighlight();
});
window.addEventListener('keyup', function (el) {
	map[el.keyCode] = false;
	renderHighlight();
});

gameBegin();
},{}],2:[function(require,module,exports) {
'use strict';

require('./src/scss/common.scss');

require('./src/js/main.js');
},{"./src/scss/common.scss":4,"./src/js/main.js":3}],15:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50140' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[15,2])
//# sourceMappingURL=/app.f7a9c952.map