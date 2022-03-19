/* src\Icons\DAQConnectionStatus.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	detach,
	empty,
	group_outros,
	init,
	insert,
	mount_component,
	noop,
	safe_not_equal,
	transition_in,
	transition_out
} from "../../_snowpack/pkg/svelte/internal.js";

import ConnectionSignal32 from "../../_snowpack/pkg/carbon-icons-svelte/lib/ConnectionSignal32.js";
import ConnectionSignalOff32 from "../../_snowpack/pkg/carbon-icons-svelte/lib/ConnectionSignalOff32.js";
import { connected } from "../stores.js";

function create_else_block(ctx) {
	let connectionsignaloff32;
	let current;

	connectionsignaloff32 = new ConnectionSignalOff32({
			props: {
				style: "fill: " + /*fill*/ ctx[0] + "; height: 100%; margin: 0 5px"
			}
		});

	return {
		c() {
			create_component(connectionsignaloff32.$$.fragment);
		},
		m(target, anchor) {
			mount_component(connectionsignaloff32, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const connectionsignaloff32_changes = {};
			if (dirty & /*fill*/ 1) connectionsignaloff32_changes.style = "fill: " + /*fill*/ ctx[0] + "; height: 100%; margin: 0 5px";
			connectionsignaloff32.$set(connectionsignaloff32_changes);
		},
		i(local) {
			if (current) return;
			transition_in(connectionsignaloff32.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(connectionsignaloff32.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(connectionsignaloff32, detaching);
		}
	};
}

// (14:0) {#if ($connected)}
function create_if_block(ctx) {
	let connectionsignal32;
	let current;

	connectionsignal32 = new ConnectionSignal32({
			props: {
				style: "fill: lawngreen; height: 100%; margin: 0 5px "
			}
		});

	return {
		c() {
			create_component(connectionsignal32.$$.fragment);
		},
		m(target, anchor) {
			mount_component(connectionsignal32, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(connectionsignal32.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(connectionsignal32.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(connectionsignal32, detaching);
		}
	};
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$connected*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $connected;
	component_subscribe($$self, connected, $$value => $$invalidate(1, $connected = $$value));
	let fill = "red";

	setInterval(
		() => {
			$$invalidate(0, fill = fill === "red" ? "darkRed" : "red");
		},
		300
	);

	return [fill, $connected];
}

class DAQConnectionStatus extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default DAQConnectionStatus;