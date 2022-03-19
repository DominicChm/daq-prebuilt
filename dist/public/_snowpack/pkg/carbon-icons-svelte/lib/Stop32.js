import { S as SvelteComponent, i as init, s as safe_not_equal, c as create_slot, e as empty, a as insert, b as svg_element, t as text, d as append, f as set_data, g as detach, h as assign, j as attr, k as set_svg_attributes, l as listen, u as update_slot_base, m as get_all_dirty_from_scope, n as get_slot_changes, o as get_spread_update, p as transition_in, q as transition_out, r as run_all, v as exclude_internal_props, w as bubble } from '../../common/index-26537503.js';

/* node_modules\carbon-icons-svelte\lib\Stop32\Stop32.svelte generated by Svelte v3.46.4 */

function create_if_block(ctx) {
	let title_1;
	let t;

	return {
		c() {
			title_1 = svg_element("title");
			t = text(/*title*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, title_1, anchor);
			append(title_1, t);
		},
		p(ctx, dirty) {
			if (dirty & /*title*/ 4) set_data(t, /*title*/ ctx[2]);
		},
		d(detaching) {
			if (detaching) detach(title_1);
		}
	};
}

// (39:8)      
function fallback_block(ctx) {
	let if_block_anchor;
	let if_block = /*title*/ ctx[2] && create_if_block(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (/*title*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment(ctx) {
	let svg;
	let path;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[11].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);
	const default_slot_or_fallback = default_slot || fallback_block(ctx);

	let svg_levels = [
		{ "data-carbon-icon": "Stop32" },
		{ xmlns: "http://www.w3.org/2000/svg" },
		{ viewBox: "0 0 32 32" },
		{ fill: "currentColor" },
		{ width: "32" },
		{ height: "32" },
		{ class: /*className*/ ctx[0] },
		{ preserveAspectRatio: "xMidYMid meet" },
		{ style: /*style*/ ctx[3] },
		{ id: /*id*/ ctx[1] },
		/*attributes*/ ctx[4]
	];

	let svg_data = {};

	for (let i = 0; i < svg_levels.length; i += 1) {
		svg_data = assign(svg_data, svg_levels[i]);
	}

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			attr(path, "d", "M24,8V24H8V8H24m0-2H8A2,2,0,0,0,6,8V24a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z");
			set_svg_attributes(svg, svg_data);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(svg, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen(svg, "click", /*click_handler*/ ctx[12]),
					listen(svg, "mouseover", /*mouseover_handler*/ ctx[13]),
					listen(svg, "mouseenter", /*mouseenter_handler*/ ctx[14]),
					listen(svg, "mouseleave", /*mouseleave_handler*/ ctx[15]),
					listen(svg, "keyup", /*keyup_handler*/ ctx[16]),
					listen(svg, "keydown", /*keydown_handler*/ ctx[17])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[10],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null),
						null
					);
				}
			} else {
				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*title*/ 4)) {
					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}

			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
				{ "data-carbon-icon": "Stop32" },
				{ xmlns: "http://www.w3.org/2000/svg" },
				{ viewBox: "0 0 32 32" },
				{ fill: "currentColor" },
				{ width: "32" },
				{ height: "32" },
				(!current || dirty & /*className*/ 1) && { class: /*className*/ ctx[0] },
				{ preserveAspectRatio: "xMidYMid meet" },
				(!current || dirty & /*style*/ 8) && { style: /*style*/ ctx[3] },
				(!current || dirty & /*id*/ 2) && { id: /*id*/ ctx[1] },
				dirty & /*attributes*/ 16 && /*attributes*/ ctx[4]
			]));
		},
		i(local) {
			if (current) return;
			transition_in(default_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svg);
			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let ariaLabel;
	let ariaLabelledBy;
	let labelled;
	let attributes;
	let { $$slots: slots = {}, $$scope } = $$props;
	let { class: className = undefined } = $$props;
	let { id = undefined } = $$props;
	let { tabindex = undefined } = $$props;
	let { focusable = false } = $$props;
	let { title = undefined } = $$props;
	let { style = undefined } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseover_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseenter_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseleave_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keyup_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$new_props => {
		$$invalidate(18, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('id' in $$new_props) $$invalidate(1, id = $$new_props.id);
		if ('tabindex' in $$new_props) $$invalidate(5, tabindex = $$new_props.tabindex);
		if ('focusable' in $$new_props) $$invalidate(6, focusable = $$new_props.focusable);
		if ('title' in $$new_props) $$invalidate(2, title = $$new_props.title);
		if ('style' in $$new_props) $$invalidate(3, style = $$new_props.style);
		if ('$$scope' in $$new_props) $$invalidate(10, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		 $$invalidate(9, ariaLabel = $$props['aria-label']);
		 $$invalidate(8, ariaLabelledBy = $$props['aria-labelledby']);

		if ($$self.$$.dirty & /*ariaLabel, ariaLabelledBy, title*/ 772) {
			 $$invalidate(7, labelled = ariaLabel || ariaLabelledBy || title);
		}

		if ($$self.$$.dirty & /*ariaLabel, ariaLabelledBy, labelled, tabindex, focusable*/ 992) {
			 $$invalidate(4, attributes = {
				'aria-label': ariaLabel,
				'aria-labelledby': ariaLabelledBy,
				'aria-hidden': labelled ? undefined : true,
				role: labelled ? 'img' : undefined,
				focusable: tabindex === '0' ? true : focusable,
				tabindex
			});
		}
	};

	$$props = exclude_internal_props($$props);

	return [
		className,
		id,
		title,
		style,
		attributes,
		tabindex,
		focusable,
		labelled,
		ariaLabelledBy,
		ariaLabel,
		$$scope,
		slots,
		click_handler,
		mouseover_handler,
		mouseenter_handler,
		mouseleave_handler,
		keyup_handler,
		keydown_handler
	];
}

class Stop32 extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			class: 0,
			id: 1,
			tabindex: 5,
			focusable: 6,
			title: 2,
			style: 3
		});
	}
}

export default Stop32;
