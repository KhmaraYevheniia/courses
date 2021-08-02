function visitLink(path) {
	document.querySelector(`${path}`);
	let value = +localStorage.getItem(path);
	if (value) {
		value++
		localStorage.setItem(path, value);
	} else {
		localStorage.setItem(path, 1);
	}
}

function viewResults() {
	const resultNode = document.querySelector('#results');
	if (resultNode) {
		resultNode.remove();
	}

	let ulEl = document.createElement('ul');
	ulEl.setAttribute('id', 'results')
	let value1 = +localStorage.getItem('Page1');
	let value2 = +localStorage.getItem('Page2');
	let value3 = +localStorage.getItem('Page3');

	ulEl.innerHTML += `<li>You visited Page3 ${value3} time(s)</li>`;
	ulEl.innerHTML += `<li>You visited Page1 ${value1} time(s)</li>`;
	ulEl.innerHTML += `<li>You visited Page2 ${value2} time(s)</li>`;

	let content = document.querySelector('#content');
	content.after(ulEl);
	localStorage.clear();
}
