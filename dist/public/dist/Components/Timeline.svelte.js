import './Timeline.svelte.css.proxy.js';
/* src\Components\Timeline.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	action_destroyer,
	append,
	attr,
	binding_callbacks,
	destroy_each,
	detach,
	element,
	empty,
	init,
	insert,
	is_function,
	listen,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	set_style,
	svg_element,
	text
} from "../../_snowpack/pkg/svelte/internal.js";

import { createEventDispatcher, onMount } from "../../_snowpack/pkg/svelte.js";
import { calculateTicks } from "../ticks.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[25] = list[i];
	return child_ctx;
}

// (120:8) {#each ticks as t}
function create_each_block(ctx) {
	let line;
	let line_x__value;
	let line_x__value_1;
	let text_1;
	let t_value = /*t*/ ctx[25].toFixed(2) + "";
	let t;
	let text_1_x_value;

	return {
		c() {
			line = svg_element("line");
			text_1 = svg_element("text");
			t = text(t_value);
			attr(line, "x1", line_x__value = /*x*/ ctx[11](/*t*/ ctx[25]));
			attr(line, "x2", line_x__value_1 = /*x*/ ctx[11](/*t*/ ctx[25]));
			attr(line, "y1", "0");
			attr(line, "y2", "100%");
			attr(line, "stroke-width", "1");
			attr(line, "stroke", "black");
			attr(text_1, "x", text_1_x_value = /*x*/ ctx[11](/*t*/ ctx[25]));
			attr(text_1, "y", "100%");
		},
		m(target, anchor) {
			insert(target, line, anchor);
			insert(target, text_1, anchor);
			append(text_1, t);
		},
		p(ctx, dirty) {
			if (dirty & /*x, ticks*/ 2560 && line_x__value !== (line_x__value = /*x*/ ctx[11](/*t*/ ctx[25]))) {
				attr(line, "x1", line_x__value);
			}

			if (dirty & /*x, ticks*/ 2560 && line_x__value_1 !== (line_x__value_1 = /*x*/ ctx[11](/*t*/ ctx[25]))) {
				attr(line, "x2", line_x__value_1);
			}

			if (dirty & /*ticks*/ 512 && t_value !== (t_value = /*t*/ ctx[25].toFixed(2) + "")) set_data(t, t_value);

			if (dirty & /*x, ticks*/ 2560 && text_1_x_value !== (text_1_x_value = /*x*/ ctx[11](/*t*/ ctx[25]))) {
				attr(text_1, "x", text_1_x_value);
			}
		},
		d(detaching) {
			if (detaching) detach(line);
			if (detaching) detach(text_1);
		}
	};
}

// (125:8) {#if (dataStart != null && dataStart > viewStart)}
function create_if_block_2(ctx) {
	let rect;
	let rect_x_value;
	let rect_width_value;

	return {
		c() {
			rect = svg_element("rect");
			attr(rect, "x", rect_x_value = /*x*/ ctx[11](/*viewStart*/ ctx[7]));
			attr(rect, "width", rect_width_value = /*x*/ ctx[11](/*dataStart*/ ctx[2]) - /*x*/ ctx[11](/*viewStart*/ ctx[7]));
			attr(rect, "y", "0");
			attr(rect, "height", "100%");
			attr(rect, "fill", "gray");
			attr(rect, "fill-opacity", ".5");
		},
		m(target, anchor) {
			insert(target, rect, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*x, viewStart*/ 2176 && rect_x_value !== (rect_x_value = /*x*/ ctx[11](/*viewStart*/ ctx[7]))) {
				attr(rect, "x", rect_x_value);
			}

			if (dirty & /*x, dataStart, viewStart*/ 2180 && rect_width_value !== (rect_width_value = /*x*/ ctx[11](/*dataStart*/ ctx[2]) - /*x*/ ctx[11](/*viewStart*/ ctx[7]))) {
				attr(rect, "width", rect_width_value);
			}
		},
		d(detaching) {
			if (detaching) detach(rect);
		}
	};
}

// (130:8) {#if (dataEnd != null && dataEnd < viewEnd)}
function create_if_block_1(ctx) {
	let rect;
	let rect_x_value;
	let rect_width_value;

	return {
		c() {
			rect = svg_element("rect");
			attr(rect, "x", rect_x_value = /*x*/ ctx[11](/*dataEnd*/ ctx[3]));
			attr(rect, "width", rect_width_value = /*x*/ ctx[11](/*viewEnd*/ ctx[6]) - /*x*/ ctx[11](/*dataEnd*/ ctx[3]));
			attr(rect, "y", "0");
			attr(rect, "height", "100%");
			attr(rect, "fill", "gray");
			attr(rect, "fill-opacity", ".5");
		},
		m(target, anchor) {
			insert(target, rect, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*x, dataEnd*/ 2056 && rect_x_value !== (rect_x_value = /*x*/ ctx[11](/*dataEnd*/ ctx[3]))) {
				attr(rect, "x", rect_x_value);
			}

			if (dirty & /*x, viewEnd, dataEnd*/ 2120 && rect_width_value !== (rect_width_value = /*x*/ ctx[11](/*viewEnd*/ ctx[6]) - /*x*/ ctx[11](/*dataEnd*/ ctx[3]))) {
				attr(rect, "width", rect_width_value);
			}
		},
		d(detaching) {
			if (detaching) detach(rect);
		}
	};
}

// (135:8) {#if (dragDisabled)}
function create_if_block(ctx) {
	let rect;

	return {
		c() {
			rect = svg_element("rect");
			attr(rect, "x", "0");
			attr(rect, "width", "100%");
			attr(rect, "y", "0");
			attr(rect, "height", "100%");
			attr(rect, "fill", "gray");
			attr(rect, "fill-opacity", ".5");
		},
		m(target, anchor) {
			insert(target, rect, anchor);
		},
		d(detaching) {
			if (detaching) detach(rect);
		}
	};
}

function create_fragment(ctx) {
	let wheel_action;
	let div;
	let svg;
	let each_1_anchor;
	let if_block0_anchor;
	let if_block1_anchor;
	let line;
	let line_x__value;
	let line_x__value_1;
	let text0;
	let t0_value = /*center*/ ctx[0]?.toFixed(2) + "";
	let t0;
	let text0_x_value;
	let text1;
	let t1_value = /*domain*/ ctx[1]?.toFixed(2) + "";
	let t1;
	let text1_x_value;
	let text2;
	let t2_value = /*viewStart*/ ctx[7]?.toFixed(2) + "";
	let t2;
	let text2_x_value;
	let text3;
	let t3_value = /*center*/ ctx[0]?.toFixed(2) + "";
	let t3;
	let text3_x_value;
	let mounted;
	let dispose;
	let each_value = /*ticks*/ ctx[9];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let if_block0 = /*dataStart*/ ctx[2] != null && /*dataStart*/ ctx[2] > /*viewStart*/ ctx[7] && create_if_block_2(ctx);
	let if_block1 = /*dataEnd*/ ctx[3] != null && /*dataEnd*/ ctx[3] < /*viewEnd*/ ctx[6] && create_if_block_1(ctx);
	let if_block2 = /*dragDisabled*/ ctx[4] && create_if_block(ctx);

	return {
		c() {
			div = element("div");
			svg = svg_element("svg");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			if (if_block2) if_block2.c();
			line = svg_element("line");
			text0 = svg_element("text");
			t0 = text(t0_value);
			text1 = svg_element("text");
			t1 = text(t1_value);
			text2 = svg_element("text");
			t2 = text(t2_value);
			text3 = svg_element("text");
			t3 = text(t3_value);
			attr(line, "x1", line_x__value = /*x*/ ctx[11](/*center*/ ctx[0]));
			attr(line, "x2", line_x__value_1 = /*x*/ ctx[11](/*center*/ ctx[0]));
			attr(line, "y1", "0");
			attr(line, "y2", "100%");
			attr(line, "stroke-width", "5");
			attr(line, "stroke", "black");
			attr(text0, "x", text0_x_value = /*x*/ ctx[11](/*center*/ ctx[0]) + 10);
			attr(text0, "y", "13px");
			attr(text1, "x", text1_x_value = /*x*/ ctx[11](/*center*/ ctx[0]) - 10);
			attr(text1, "y", "13px");
			attr(text1, "text-anchor", "end");
			attr(text2, "x", text2_x_value = /*x*/ ctx[11](/*viewStart*/ ctx[7]));
			attr(text2, "y", "13px");
			attr(text3, "x", text3_x_value = /*x*/ ctx[11](/*viewEnd*/ ctx[6]));
			attr(text3, "y", "13px");
			attr(text3, "text-anchor", "end");
			attr(svg, "width", "100%");
			attr(svg, "height", "100%");
			attr(svg, "class", "svelte-1xsfvof");
			attr(div, "class", "root svelte-1xsfvof");
			set_style(div, "width", "100%");
			set_style(div, "height", "100%");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, svg);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(svg, null);
			}

			append(svg, each_1_anchor);
			if (if_block0) if_block0.m(svg, null);
			append(svg, if_block0_anchor);
			if (if_block1) if_block1.m(svg, null);
			append(svg, if_block1_anchor);
			if (if_block2) if_block2.m(svg, null);
			append(svg, line);
			append(svg, text0);
			append(text0, t0);
			append(svg, text1);
			append(text1, t1);
			append(svg, text2);
			append(text2, t2);
			append(svg, text3);
			append(text3, t3);
			/*svg_binding*/ ctx[17](svg);

			if (!mounted) {
				dispose = [
					action_destroyer(wheel_action = /*wheel*/ ctx[14].call(null, window, { scrollable: /*scrollable*/ ctx[10] })),
					listen(window, "resize", /*handleResize*/ ctx[12]),
					listen(window, "mouseup", /*mouseup_handler*/ ctx[16]),
					listen(window, "mousemove", /*handleMousemove*/ ctx[13]),
					listen(svg, "mousedown", /*mousedown_handler*/ ctx[18]),
					listen(svg, "mouseup", /*mouseup_handler_1*/ ctx[19]),
					listen(svg, "mouseenter", /*mouseenter_handler*/ ctx[20]),
					listen(svg, "mouseleave", /*mouseleave_handler*/ ctx[21])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (wheel_action && is_function(wheel_action.update) && dirty & /*scrollable*/ 1024) wheel_action.update.call(null, { scrollable: /*scrollable*/ ctx[10] });

			if (dirty & /*x, ticks*/ 2560) {
				each_value = /*ticks*/ ctx[9];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(svg, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*dataStart*/ ctx[2] != null && /*dataStart*/ ctx[2] > /*viewStart*/ ctx[7]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					if_block0.m(svg, if_block0_anchor);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*dataEnd*/ ctx[3] != null && /*dataEnd*/ ctx[3] < /*viewEnd*/ ctx[6]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					if_block1.m(svg, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*dragDisabled*/ ctx[4]) {
				if (if_block2) {
					
				} else {
					if_block2 = create_if_block(ctx);
					if_block2.c();
					if_block2.m(svg, line);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty & /*x, center*/ 2049 && line_x__value !== (line_x__value = /*x*/ ctx[11](/*center*/ ctx[0]))) {
				attr(line, "x1", line_x__value);
			}

			if (dirty & /*x, center*/ 2049 && line_x__value_1 !== (line_x__value_1 = /*x*/ ctx[11](/*center*/ ctx[0]))) {
				attr(line, "x2", line_x__value_1);
			}

			if (dirty & /*center*/ 1 && t0_value !== (t0_value = /*center*/ ctx[0]?.toFixed(2) + "")) set_data(t0, t0_value);

			if (dirty & /*x, center*/ 2049 && text0_x_value !== (text0_x_value = /*x*/ ctx[11](/*center*/ ctx[0]) + 10)) {
				attr(text0, "x", text0_x_value);
			}

			if (dirty & /*domain*/ 2 && t1_value !== (t1_value = /*domain*/ ctx[1]?.toFixed(2) + "")) set_data(t1, t1_value);

			if (dirty & /*x, center*/ 2049 && text1_x_value !== (text1_x_value = /*x*/ ctx[11](/*center*/ ctx[0]) - 10)) {
				attr(text1, "x", text1_x_value);
			}

			if (dirty & /*viewStart*/ 128 && t2_value !== (t2_value = /*viewStart*/ ctx[7]?.toFixed(2) + "")) set_data(t2, t2_value);

			if (dirty & /*x, viewStart*/ 2176 && text2_x_value !== (text2_x_value = /*x*/ ctx[11](/*viewStart*/ ctx[7]))) {
				attr(text2, "x", text2_x_value);
			}

			if (dirty & /*center*/ 1 && t3_value !== (t3_value = /*center*/ ctx[0]?.toFixed(2) + "")) set_data(t3, t3_value);

			if (dirty & /*x, viewEnd*/ 2112 && text3_x_value !== (text3_x_value = /*x*/ ctx[11](/*viewEnd*/ ctx[6]))) {
				attr(text3, "x", text3_x_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			/*svg_binding*/ ctx[17](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let viewStart;
	let viewEnd;
	let x;
	const dispatch = createEventDispatcher();
	let containerRef;
	let dragging = false;
	let { center = 0 } = $$props;
	let { domain = 10 } = $$props;
	let { dataStart = undefined } = $$props;
	let { dataEnd = undefined } = $$props;
	let { dragDisabled = false } = $$props;

	//View of a single panel
	let ticks;

	let scrollable = true;
	let clientWidth = 100;

	function handleResize() {
		$$invalidate(15, clientWidth = containerRef.clientWidth ?? 100);
	}

	function handleMousemove(event) {
		if (dragging) {
			$$invalidate(0, center -= event.movementX * domain / clientWidth);
			if (dataStart != null) $$invalidate(0, center = Math.max(center, dataStart));
			if (dataEnd != null) $$invalidate(0, center = Math.min(center, dataEnd));
		}

		calcTicks();
	}

	function calcTicks() {
		let t = [];
		const [interval, niceMin, niceMax] = calculateTicks(10, viewStart, viewEnd);
		for (let i = niceMin; i < niceMax; i += interval) t.push(i);
		return t;
	}

	function genMapper(viewStart, clientWidth, domain) {
		return dataX => (dataX - viewStart) * clientWidth / (domain || 1);
	}

	onMount(handleResize);

	const wheel = (node, options) => {
		let { scrollable } = options;

		const handler = e => {
			if (!scrollable) {
				e.preventDefault();
				const dy = Math.sign(e.wheelDeltaY);
				if (dy > 0) $$invalidate(1, domain /= Math.abs(dy) * 2); else if (dy < 0 && domain < 1000000) $$invalidate(1, domain *= Math.abs(dy) * 2);
				calcTicks();
			}
		};

		node.addEventListener('wheel', handler, { passive: false });

		return {
			update(options) {
				scrollable = options.scrollable;
			},
			destroy() {
				node.removeEventListener('wheel', handler, { passive: false });
			}
		};
	};

	const mouseup_handler = () => $$invalidate(5, dragging = false);

	function svg_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			containerRef = $$value;
			$$invalidate(8, containerRef);
		});
	}

	const mousedown_handler = () => {
		if (!dragDisabled) $$invalidate(5, dragging = true);
	};

	const mouseup_handler_1 = () => $$invalidate(5, dragging = false);
	const mouseenter_handler = () => $$invalidate(10, scrollable = false);
	const mouseleave_handler = () => $$invalidate(10, scrollable = true);

	$$self.$$set = $$props => {
		if ('center' in $$props) $$invalidate(0, center = $$props.center);
		if ('domain' in $$props) $$invalidate(1, domain = $$props.domain);
		if ('dataStart' in $$props) $$invalidate(2, dataStart = $$props.dataStart);
		if ('dataEnd' in $$props) $$invalidate(3, dataEnd = $$props.dataEnd);
		if ('dragDisabled' in $$props) $$invalidate(4, dragDisabled = $$props.dragDisabled);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*center, domain*/ 3) {
			//View of entire block of panels.
			$: $$invalidate(7, viewStart = center - domain / 2);
		}

		if ($$self.$$.dirty & /*center, domain*/ 3) {
			$: $$invalidate(6, viewEnd = center + domain / 2);
		}

		if ($$self.$$.dirty & /*viewStart, viewEnd*/ 192) {
			$: $$invalidate(9, ticks = calcTicks(viewStart, viewEnd));
		}

		if ($$self.$$.dirty & /*viewStart, clientWidth, domain*/ 32898) {
			$: $$invalidate(11, x = genMapper(viewStart, clientWidth, domain));
		}

		if ($$self.$$.dirty & /*dragging*/ 32) {
			$: if (dragging) dispatch("dragstart");
		}

		if ($$self.$$.dirty & /*dragging*/ 32) {
			$: if (!dragging) dispatch("dragend");
		}
	};

	return [
		center,
		domain,
		dataStart,
		dataEnd,
		dragDisabled,
		dragging,
		viewEnd,
		viewStart,
		containerRef,
		ticks,
		scrollable,
		x,
		handleResize,
		handleMousemove,
		wheel,
		clientWidth,
		mouseup_handler,
		svg_binding,
		mousedown_handler,
		mouseup_handler_1,
		mouseenter_handler,
		mouseleave_handler
	];
}

class Timeline extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			center: 0,
			domain: 1,
			dataStart: 2,
			dataEnd: 3,
			dragDisabled: 4
		});
	}
}

export default Timeline;