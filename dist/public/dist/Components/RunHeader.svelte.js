import './RunHeader.svelte.css.proxy.js';
/* src\Components\RunHeader.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	component_subscribe,
	create_component,
	create_slot,
	destroy_component,
	detach,
	element,
	get_all_dirty_from_scope,
	get_slot_changes,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	set_data,
	space,
	text,
	transition_in,
	transition_out,
	update_slot_base
} from "../../_snowpack/pkg/svelte/internal.js";

import { Button, Tile } from "../../_snowpack/pkg/carbon-components-svelte.js";
import Recording32 from "../../_snowpack/pkg/carbon-icons-svelte/lib/Recording32.js";
import { activeRun, activeRunId, isRealtime, recordingRun } from "../stores.js";
import { startStorage, stopRunStorage } from "../api.js";
import RecordButton from "./RecordButton.svelte.js";
const get_actions_slot_changes = dirty => ({});
const get_actions_slot_context = ctx => ({});

// (24:8) {#if ($isRealtime)}
function create_if_block(ctx) {
	let recordbutton;
	let current;
	recordbutton = new RecordButton({ props: { id: /*$activeRunId*/ ctx[1] } });

	return {
		c() {
			create_component(recordbutton.$$.fragment);
		},
		m(target, anchor) {
			mount_component(recordbutton, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const recordbutton_changes = {};
			if (dirty & /*$activeRunId*/ 2) recordbutton_changes.id = /*$activeRunId*/ ctx[1];
			recordbutton.$set(recordbutton_changes);
		},
		i(local) {
			if (current) return;
			transition_in(recordbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(recordbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(recordbutton, detaching);
		}
	};
}

// (30:29)               
function fallback_block(ctx) {
	let span;

	return {
		c() {
			span = element("span");
			span.textContent = "No actions (TODO: DELETE THIS)";
			attr(span, "class", "missing");
		},
		m(target, anchor) {
			insert(target, span, anchor);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (22:0) <Tile style="padding: 0; display: flex; align-items: center; justify-content: space-between; min-height: 3rem; fill: red">
function create_default_slot(ctx) {
	let div0;
	let t0;
	let h3;
	let t1_value = /*$activeRun*/ ctx[2].type + "";
	let t1;
	let t2;
	let div1;
	let current;
	let if_block = /*$isRealtime*/ ctx[0] && create_if_block(ctx);
	const actions_slot_template = /*#slots*/ ctx[3].actions;
	const actions_slot = create_slot(actions_slot_template, ctx, /*$$scope*/ ctx[4], get_actions_slot_context);
	const actions_slot_or_fallback = actions_slot || fallback_block(ctx);

	return {
		c() {
			div0 = element("div");
			if (if_block) if_block.c();
			t0 = space();
			h3 = element("h3");
			t1 = text(t1_value);
			t2 = space();
			div1 = element("div");
			if (actions_slot_or_fallback) actions_slot_or_fallback.c();
			attr(h3, "class", "svelte-16gryho");
			attr(div0, "class", "actions svelte-16gryho");
			attr(div1, "class", "actions svelte-16gryho");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			if (if_block) if_block.m(div0, null);
			append(div0, t0);
			append(div0, h3);
			append(h3, t1);
			insert(target, t2, anchor);
			insert(target, div1, anchor);

			if (actions_slot_or_fallback) {
				actions_slot_or_fallback.m(div1, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (/*$isRealtime*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$isRealtime*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div0, t0);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if ((!current || dirty & /*$activeRun*/ 4) && t1_value !== (t1_value = /*$activeRun*/ ctx[2].type + "")) set_data(t1, t1_value);

			if (actions_slot) {
				if (actions_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot_base(
						actions_slot,
						actions_slot_template,
						ctx,
						/*$$scope*/ ctx[4],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
						: get_slot_changes(actions_slot_template, /*$$scope*/ ctx[4], dirty, get_actions_slot_changes),
						get_actions_slot_context
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(actions_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			transition_out(actions_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div0);
			if (if_block) if_block.d();
			if (detaching) detach(t2);
			if (detaching) detach(div1);
			if (actions_slot_or_fallback) actions_slot_or_fallback.d(detaching);
		}
	};
}

function create_fragment(ctx) {
	let tile;
	let current;

	tile = new Tile({
			props: {
				style: "padding: 0; display: flex; align-items: center; justify-content: space-between; min-height: 3rem; fill: red",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(tile.$$.fragment);
		},
		m(target, anchor) {
			mount_component(tile, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const tile_changes = {};

			if (dirty & /*$$scope, $activeRun, $activeRunId, $isRealtime*/ 23) {
				tile_changes.$$scope = { dirty, ctx };
			}

			tile.$set(tile_changes);
		},
		i(local) {
			if (current) return;
			transition_in(tile.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(tile.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(tile, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $isRealtime;
	let $activeRunId;
	let $activeRun;
	component_subscribe($$self, isRealtime, $$value => $$invalidate(0, $isRealtime = $$value));
	component_subscribe($$self, activeRunId, $$value => $$invalidate(1, $activeRunId = $$value));
	component_subscribe($$self, activeRun, $$value => $$invalidate(2, $activeRun = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
	};

	return [$isRealtime, $activeRunId, $activeRun, slots, $$scope];
}

class RunHeader extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default RunHeader;