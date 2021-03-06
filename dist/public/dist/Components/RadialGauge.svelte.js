import './RadialGauge.svelte.css.proxy.js';
/* src\Components\RadialGauge.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	add_render_callback,
	add_resize_listener,
	append,
	assign,
	attr,
	binding_callbacks,
	compute_rest_props,
	detach,
	element,
	exclude_internal_props,
	get_spread_update,
	init,
	insert,
	noop,
	safe_not_equal,
	set_attributes,
	toggle_class
} from "../../_snowpack/pkg/svelte/internal.js";

import { onDestroy, onMount } from "../../_snowpack/pkg/svelte.js";
import CG from "../../_snowpack/pkg/canvas-gauges.js";

function create_fragment(ctx) {
	let div;
	let canvas_1;
	let div_resize_listener;
	let div_levels = [/*$$restProps*/ ctx[4]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			canvas_1 = element("canvas");
			attr(canvas_1, "class", "svelte-1uoypnv");
			set_attributes(div, div_data);
			add_render_callback(() => /*div_elementresize_handler*/ ctx[14].call(div));
			toggle_class(div, "svelte-1uoypnv", true);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, canvas_1);
			/*canvas_1_binding*/ ctx[12](canvas_1);
			/*div_binding*/ ctx[13](div);
			div_resize_listener = add_resize_listener(div, /*div_elementresize_handler*/ ctx[14].bind(div));
		},
		p(ctx, [dirty]) {
			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4]]));
			toggle_class(div, "svelte-1uoypnv", true);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			/*canvas_1_binding*/ ctx[12](null);
			/*div_binding*/ ctx[13](null);
			div_resize_listener();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const omit_props_names = ["value","minValue","maxValue","units","title","ticksAngle"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { value = 3 } = $$props;
	let { minValue = 0 } = $$props;
	let { maxValue = 10 } = $$props;
	let { units = null } = $$props;
	let { title = null } = $$props;
	let { ticksAngle = 270 } = $$props;
	let canvas;
	let gauge;
	let width = 0;
	let height = 0;
	let container;
	console.log(CG);

	onMount(() => {
		$$invalidate(11, gauge = new CG.RadialGauge({
				renderTo: canvas,
				minValue,
				maxValue,
				units,
				title,
				ticksAngle
			}).draw());
	});

	onDestroy(() => {
		
	});

	function canvas_1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			canvas = $$value;
			$$invalidate(2, canvas);
		});
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			container = $$value;
			$$invalidate(3, container);
		});
	}

	function div_elementresize_handler() {
		width = this.clientWidth;
		height = this.clientHeight;
		$$invalidate(0, width);
		$$invalidate(1, height);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('value' in $$new_props) $$invalidate(5, value = $$new_props.value);
		if ('minValue' in $$new_props) $$invalidate(6, minValue = $$new_props.minValue);
		if ('maxValue' in $$new_props) $$invalidate(7, maxValue = $$new_props.maxValue);
		if ('units' in $$new_props) $$invalidate(8, units = $$new_props.units);
		if ('title' in $$new_props) $$invalidate(9, title = $$new_props.title);
		if ('ticksAngle' in $$new_props) $$invalidate(10, ticksAngle = $$new_props.ticksAngle);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*gauge, width*/ 2049) {
			$: gauge?.update({ width });
		}

		if ($$self.$$.dirty & /*gauge, height*/ 2050) {
			$: gauge?.update({ height });
		}

		if ($$self.$$.dirty & /*gauge, value*/ 2080) {
			$: gauge?.update({ value });
		}

		if ($$self.$$.dirty & /*gauge, minValue, maxValue, units, title, ticksAngle*/ 4032) {
			$: gauge?.update({
				minValue,
				maxValue,
				units,
				title,
				ticksAngle
			});
		}
	};

	return [
		width,
		height,
		canvas,
		container,
		$$restProps,
		value,
		minValue,
		maxValue,
		units,
		title,
		ticksAngle,
		gauge,
		canvas_1_binding,
		div_binding,
		div_elementresize_handler
	];
}

class RadialGauge extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			value: 5,
			minValue: 6,
			maxValue: 7,
			units: 8,
			title: 9,
			ticksAngle: 10
		});
	}
}

export default RadialGauge;