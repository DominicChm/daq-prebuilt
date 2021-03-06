import './Toast.svelte.css.proxy.js';
/* src\Components\Toast.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	add_render_callback,
	append,
	attr,
	check_outros,
	component_subscribe,
	create_bidirectional_transition,
	create_component,
	destroy_component,
	detach,
	element,
	group_outros,
	init,
	insert,
	mount_component,
	outro_and_destroy_block,
	safe_not_equal,
	space,
	transition_in,
	transition_out,
	update_keyed_each
} from "../../_snowpack/pkg/svelte/internal.js";

import { fly } from "../../_snowpack/pkg/svelte/transition.js";
import { notifications } from "./notifications.js";
import { ToastNotification } from "../../_snowpack/pkg/carbon-components-svelte.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (18:4) {#each $notifications as notification (notification.id)}
function create_each_block(key_1, ctx) {
	let div;
	let toastnotification;
	let t;
	let div_transition;
	let current;

	toastnotification = new ToastNotification({
			props: {
				title: /*types*/ ctx[0][/*notification*/ ctx[2].type].title,
				subtitle: /*notification*/ ctx[2].message,
				kind: /*types*/ ctx[0][/*notification*/ ctx[2].type].kind,
				lowContrast: true
			}
		});

	return {
		key: key_1,
		first: null,
		c() {
			div = element("div");
			create_component(toastnotification.$$.fragment);
			t = space();
			attr(div, "class", "toast svelte-1q759bs");
			this.first = div;
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(toastnotification, div, null);
			append(div, t);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const toastnotification_changes = {};
			if (dirty & /*types, $notifications*/ 3) toastnotification_changes.title = /*types*/ ctx[0][/*notification*/ ctx[2].type].title;
			if (dirty & /*$notifications*/ 2) toastnotification_changes.subtitle = /*notification*/ ctx[2].message;
			if (dirty & /*types, $notifications*/ 3) toastnotification_changes.kind = /*types*/ ctx[0][/*notification*/ ctx[2].type].kind;
			toastnotification.$set(toastnotification_changes);
		},
		i(local) {
			if (current) return;
			transition_in(toastnotification.$$.fragment, local);

			add_render_callback(() => {
				if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { y: 30 }, true);
				div_transition.run(1);
			});

			current = true;
		},
		o(local) {
			transition_out(toastnotification.$$.fragment, local);
			if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { y: 30 }, false);
			div_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(toastnotification);
			if (detaching && div_transition) div_transition.end();
		}
	};
}

function create_fragment(ctx) {
	let div;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let current;
	let each_value = /*$notifications*/ ctx[1];
	const get_key = ctx => /*notification*/ ctx[2].id;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "notifications svelte-1q759bs");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*types, $notifications*/ 3) {
				each_value = /*$notifications*/ ctx[1];
				group_outros();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block, null, get_each_context);
				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $notifications;
	component_subscribe($$self, notifications, $$value => $$invalidate(1, $notifications = $$value));

	let { types = {
		danger: { kind: "error", title: "Error" },
		success: { kind: "success", title: "Success!" },
		warning: { kind: "warning", title: "Warning" },
		info: { kind: "info", title: "Info" },
		default: { kind: "info", title: "Info" }
	} } = $$props;

	$$self.$$set = $$props => {
		if ('types' in $$props) $$invalidate(0, types = $$props.types);
	};

	return [types, $notifications];
}

class Toast extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { types: 0 });
	}
}

export default Toast;