/* src\Components\PageNav.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	component_subscribe,
	create_component,
	destroy_component,
	detach,
	init,
	insert,
	mount_component,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "../../_snowpack/pkg/svelte/internal.js";

import { SideNavLink } from "../../_snowpack/pkg/carbon-components-svelte.js";
import Fade16 from "../../_snowpack/pkg/carbon-icons-svelte/lib/Fade16.js";
import { location, push } from "../../_snowpack/pkg/svelte-spa-router.js";

function create_fragment(ctx) {
	let sidenavlink0;
	let t0;
	let sidenavlink1;
	let t1;
	let sidenavlink2;
	let current;

	sidenavlink0 = new SideNavLink({
			props: {
				icon: Fade16,
				text: "Overview",
				href: "#/overview",
				isSelected: /*$location*/ ctx[0] === "/overview"
			}
		});

	sidenavlink1 = new SideNavLink({
			props: {
				icon: Fade16,
				text: "Dashboard",
				href: "#/dashboard",
				isSelected: /*$location*/ ctx[0] === "/dashboard"
			}
		});

	sidenavlink2 = new SideNavLink({
			props: {
				icon: Fade16,
				text: "Schema",
				href: "#/schema",
				isSelected: /*$location*/ ctx[0] === "/schema"
			}
		});

	return {
		c() {
			create_component(sidenavlink0.$$.fragment);
			t0 = space();
			create_component(sidenavlink1.$$.fragment);
			t1 = space();
			create_component(sidenavlink2.$$.fragment);
		},
		m(target, anchor) {
			mount_component(sidenavlink0, target, anchor);
			insert(target, t0, anchor);
			mount_component(sidenavlink1, target, anchor);
			insert(target, t1, anchor);
			mount_component(sidenavlink2, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const sidenavlink0_changes = {};
			if (dirty & /*$location*/ 1) sidenavlink0_changes.isSelected = /*$location*/ ctx[0] === "/overview";
			sidenavlink0.$set(sidenavlink0_changes);
			const sidenavlink1_changes = {};
			if (dirty & /*$location*/ 1) sidenavlink1_changes.isSelected = /*$location*/ ctx[0] === "/dashboard";
			sidenavlink1.$set(sidenavlink1_changes);
			const sidenavlink2_changes = {};
			if (dirty & /*$location*/ 1) sidenavlink2_changes.isSelected = /*$location*/ ctx[0] === "/schema";
			sidenavlink2.$set(sidenavlink2_changes);
		},
		i(local) {
			if (current) return;
			transition_in(sidenavlink0.$$.fragment, local);
			transition_in(sidenavlink1.$$.fragment, local);
			transition_in(sidenavlink2.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(sidenavlink0.$$.fragment, local);
			transition_out(sidenavlink1.$$.fragment, local);
			transition_out(sidenavlink2.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(sidenavlink0, detaching);
			if (detaching) detach(t0);
			destroy_component(sidenavlink1, detaching);
			if (detaching) detach(t1);
			destroy_component(sidenavlink2, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $location;
	component_subscribe($$self, location, $$value => $$invalidate(0, $location = $$value));
	return [$location];
}

class PageNav extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default PageNav;