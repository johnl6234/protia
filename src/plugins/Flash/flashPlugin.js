export default {
	install: app => {
		function flash(params) {
			const flashDiv = document.querySelector('#flash-view-target');
			document.querySelector('#flash-title').innerHTML = params.title;
			document.querySelector('#flash-message').innerHTML = params.message;
			flashDiv.classList.add(params.type);
			flashDiv.classList.remove('hide');
			flashDiv.classList.add('show');
			setTimeout(closeFlash, 3000);
		}
		function closeFlash() {
			const flashDiv = document.querySelector('#flash-view-target');
			flashDiv.classList.remove('show');
			flashDiv.classList.add('hide');
		}
		app.config.globalProperties.$flash = flash;
		app.config.globalProperties.$flash.close = closeFlash;
	},
};
