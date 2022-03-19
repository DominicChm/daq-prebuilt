/* src\Components\RecordButton.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	mount_component,
	noop,
	safe_not_equal,
	set_data,
	text,
	transition_in,
	transition_out
} from "../../_snowpack/pkg/svelte/internal.js";

import { Button } from "../../_snowpack/pkg/carbon-components-svelte.js";
import { activeRunId, recordingRun, runs } from "../stores.js";
import { startStorage, stopRunStorage } from "../api.js";
import Recording32 from "../../_snowpack/pkg/carbon-icons-svelte/lib/Recording32.js";

function create_else_block(ctx) {
	let button;
	let current;

	button = new Button({
			props: {
				icon: Recording32,
				iconDescription: "Record",
				kind: /*RecordingKind*/ ctx[2]
			}
		});

	button.$on("click", /*click_handler_1*/ ctx[8]);

	return {
		c() {
			create_component(button.$$.fragment);
		},
		m(target, anchor) {
			mount_component(button, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const button_changes = {};
			if (dirty & /*RecordingKind*/ 4) button_changes.kind = /*RecordingKind*/ ctx[2];
			button.$set(button_changes);
		},
		i(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(button.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(button, detaching);
		}
	};
}

// (14:27) 
function create_if_block_1(ctx) {
	let button;
	let current;

	button = new Button({
			props: {
				icon: Recording32,
				iconDescription: "Record",
				kind: /*notRecordingKind*/ ctx[1]
			}
		});

	button.$on("click", /*click_handler*/ ctx[7]);

	return {
		c() {
			create_component(button.$$.fragment);
		},
		m(target, anchor) {
			mount_component(button, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const button_changes = {};
			if (dirty & /*notRecordingKind*/ 2) button_changes.kind = /*notRecordingKind*/ ctx[1];
			button.$set(button_changes);
		},
		i(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(button.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(button, detaching);
		}
	};
}

// (12:0) {#if ($runs.find(r => r.id === id)?.type !== "realtime")}
function create_if_block(ctx) {
	let p;
	let t0;
	let t1;
	let t2;

	return {
		c() {
			p = element("p");
			t0 = text("ID: ");
			t1 = text(/*id*/ ctx[0]);
			t2 = text(" - NO ID OR NOT REALTIME");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t0);
			append(p, t1);
			append(p, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*id*/ 1) set_data(t1, /*id*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

function create_fragment(ctx) {
	let show_if;
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_if_block_1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (dirty & /*$runs, id*/ 9) show_if = null;
		if (show_if == null) show_if = !!(/*$runs*/ ctx[3].find(/*func*/ ctx[6])?.type !== "realtime");
		if (show_if) return 0;
		if (!/*$recordingRun*/ ctx[4]) return 1;
		return 2;
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
	let $runs;
	let $recordingRun;
	let $activeRunId;
	component_subscribe($$self, runs, $$value => $$invalidate(3, $runs = $$value));
	component_subscribe($$self, recordingRun, $$value => $$invalidate(4, $recordingRun = $$value));
	component_subscribe($$self, activeRunId, $$value => $$invalidate(5, $activeRunId = $$value));
	let { id = "" } = $$props;
	let { notRecordingKind = "primary" } = $$props;
	let { RecordingKind = "secondary" } = $$props;
	const func = r => r.id === id;
	const click_handler = () => startStorage($activeRunId);
	const click_handler_1 = () => stopRunStorage($recordingRun.id);

	$$self.$$set = $$props => {
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
		if ('notRecordingKind' in $$props) $$invalidate(1, notRecordingKind = $$props.notRecordingKind);
		if ('RecordingKind' in $$props) $$invalidate(2, RecordingKind = $$props.RecordingKind);
	};

	return [
		id,
		notRecordingKind,
		RecordingKind,
		$runs,
		$recordingRun,
		$activeRunId,
		func,
		click_handler,
		click_handler_1
	];
}

class RecordButton extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			id: 0,
			notRecordingKind: 1,
			RecordingKind: 2
		});
	}
}

export default RecordButton;