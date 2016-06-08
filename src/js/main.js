/* main.js, tbmg/src/js/
 * entry file of tbmg
 */
'use strict';

const conf = require('./default.js');
const lan = require('./lan.js');
const core = require('./core.js');


function start_init() {
	
	init_hide_show_about();
	
	init_core();
	// TODO
}

// init hide/show about page function
function init_hide_show_about() {
	
	const title = $('.title span');
	const about = $('.about');
	
	let show = false;
	
	function on_click() {
		if (show) {
			// hide it
			about.removeClass('show');
			console.log('main: hide about page');
			
			show = false;
		} else {
			// show it
			about.addClass('show');
			console.log('main: show about page');
			
			show = true;
		}
	}
	
	title.on('click', on_click);
}

// init core
function init_core() {
	// create a core and set it
	const c = new core();
	c.conf = conf;
	
	// set canvas
	const canvas = $('#c_0');
	c.set_canvas(canvas);
	// init core
	c.reset();
	
	// set start callback
	canvas.on('click', () => {
		c.start();
		
		// log
		console.log('main: game start ');
	});
	
	// TODO set pause callback
	
	// init fps count
	init_fps_count(c);
}

function init_fps_count(core) {
	const out = $('#c_time_fps');
	
	// check fps each time
	function do_fps() {
		// get core info
		const fps = core.get_frame_count();
		core.reset_frame_count();
		
		const time_ms = core.get_core_time();
		
		// make text
		const t = fps + 'fps ' + ms_to_time(time_ms);
		// update text
		out.text(t);
		
		// set next callback
		setTimeout(() => {
			do_fps();
		}, 1e3);
	}
	
	do_fps();
}

// base format function
function ms_to_time(ms) {
	const s = Math.floor(ms / 1e3);
	const o_ms = ms - s * 1e3;
	
	const m = Math.floor(s / 60);
	const o_s = s - m * 60;
	
	const h = Math.floor(s / 60);
	const o_m = m - h * 60;
	
	function fill_zero(n, l) {
		let out = n.toString();
		while (out.length < l) {
			out = '0' + out;
		}
		return out;
	}
	
	// format text
	const t_ms = fill_zero(o_ms, 3);
	const t_s = fill_zero(o_s, 2);
	const t_m = fill_zero(o_m, 2);
	const t_h = fill_zero(h, 2);
	
	const out = t_h + ':' + t_m + ':' + t_s + '.' + t_ms;
	return out;
}

// start init after dom loaded, with jquery-2
$(start_init);

// TODO exports for DEBUG
/* end main.js */


