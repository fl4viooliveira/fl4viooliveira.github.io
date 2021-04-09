
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.37.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Home.svelte generated by Svelte v3.37.0 */

    const file = "src/Home.svelte";

    function create_fragment$1(ctx) {
    	let t0;
    	let div0;
    	let t1;
    	let section0;
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t2;
    	let div3;
    	let h5;
    	let t4;
    	let div2;
    	let h40;
    	let span;
    	let t6;
    	let t7;
    	let h20;
    	let t9;
    	let h41;
    	let t11;
    	let p0;
    	let t13;
    	let a0;
    	let t15;
    	let ul0;
    	let li0;
    	let a1;
    	let img1;
    	let img1_src_value;
    	let t16;
    	let li1;
    	let a2;
    	let img2;
    	let img2_src_value;
    	let t17;
    	let li2;
    	let a3;
    	let img3;
    	let img3_src_value;
    	let t18;
    	let section1;
    	let div4;
    	let h21;
    	let t20;
    	let p1;
    	let t22;
    	let div7;
    	let div5;
    	let p2;
    	let t23;
    	let br0;
    	let br1;
    	let t24;
    	let t25;
    	let div6;
    	let img4;
    	let img4_src_value;
    	let t26;
    	let section2;
    	let div8;
    	let h22;
    	let t28;
    	let p3;
    	let t30;
    	let div9;
    	let ul1;
    	let li3;
    	let a4;
    	let t32;
    	let li4;
    	let a5;
    	let t34;
    	let li5;
    	let a6;
    	let t36;
    	let li6;
    	let a7;
    	let t38;
    	let li7;
    	let a8;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			t0 = space();
    			div0 = element("div");
    			t1 = space();
    			section0 = element("section");
    			div1 = element("div");
    			img0 = element("img");
    			t2 = space();
    			div3 = element("div");
    			h5 = element("h5");
    			h5.textContent = "Fl4_Dev";
    			t4 = space();
    			div2 = element("div");
    			h40 = element("h4");
    			span = element("span");
    			span.textContent = "Hello";
    			t6 = text(", I'm");
    			t7 = space();
    			h20 = element("h2");
    			h20.textContent = "Flavio Oliveira";
    			t9 = space();
    			h41 = element("h4");
    			h41.textContent = "I'm a FullStack Web Developer.";
    			t11 = space();
    			p0 = element("p");
    			p0.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nemo amet, reiciendis rem ipsum at accusantium aperiam minima iusto ipsam, quasi ab reprehenderit inventore dolorem. Facere voluptatum iure provident cumque!\n            Autem natus sit repudiandae, hic sint ullam molestias ratione vel consectetur!";
    			t13 = space();
    			a0 = element("a");
    			a0.textContent = "About Me";
    			t15 = space();
    			ul0 = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			img1 = element("img");
    			t16 = space();
    			li1 = element("li");
    			a2 = element("a");
    			img2 = element("img");
    			t17 = space();
    			li2 = element("li");
    			a3 = element("a");
    			img3 = element("img");
    			t18 = space();
    			section1 = element("section");
    			div4 = element("div");
    			h21 = element("h2");
    			h21.textContent = "About Us";
    			t20 = space();
    			p1 = element("p");
    			p1.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
    			t22 = space();
    			div7 = element("div");
    			div5 = element("div");
    			p2 = element("p");
    			t23 = text("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente laborum voluptate aut error aliquam veritatis deleniti suscipit expedita velit tempora! Ut molestiae commodi quia adipisci consequuntur et a rem ipsum.\n                Distinctio excepturi, veritatis magni eum qui adipisci esse explicabo nam hic possimus ipsam enim nesciunt quisquam ut odit fuga praesentium ipsa sunt doloribus aperiam accusantium voluptatum error amet culpa? Labore?");
    			br0 = element("br");
    			br1 = element("br");
    			t24 = text("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa repellendus corrupti reiciendis hic facilis adipisci, atque quae, quaerat doloribus unde molestias repudiandae. Minima iusto reprehenderit, fugit expedita labore harum saepe?");
    			t25 = space();
    			div6 = element("div");
    			img4 = element("img");
    			t26 = space();
    			section2 = element("section");
    			div8 = element("div");
    			h22 = element("h2");
    			h22.textContent = "Our Services";
    			t28 = space();
    			p3 = element("p");
    			p3.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sapiente repellendus numquam iste impedit dolorum earum minima. Nisi ex eligendi ad illo officia!";
    			t30 = space();
    			div9 = element("div");
    			ul1 = element("ul");
    			li3 = element("li");
    			a4 = element("a");
    			a4.textContent = "Home";
    			t32 = space();
    			li4 = element("li");
    			a5 = element("a");
    			a5.textContent = "About";
    			t34 = space();
    			li5 = element("li");
    			a6 = element("a");
    			a6.textContent = "Services";
    			t36 = space();
    			li6 = element("li");
    			a7 = element("a");
    			a7.textContent = "Work";
    			t38 = space();
    			li7 = element("li");
    			a8 = element("a");
    			a8.textContent = "Contact";
    			document.title = "Flavio Oliveira";
    			attr_dev(div0, "class", "toggle svelte-9ado1z");
    			toggle_class(div0, "active", /*active*/ ctx[0]);
    			add_location(div0, file, 8, 0, 108);
    			if (img0.src !== (img0_src_value = "/images/bg.jpg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			attr_dev(img0, "class", "svelte-9ado1z");
    			add_location(img0, file, 12, 8, 272);
    			attr_dev(div1, "class", "imgSidebar svelte-9ado1z");
    			add_location(div1, file, 11, 4, 239);
    			attr_dev(h5, "class", "logoText svelte-9ado1z");
    			add_location(h5, file, 15, 8, 353);
    			attr_dev(span, "class", "svelte-9ado1z");
    			add_location(span, file, 17, 16, 417);
    			attr_dev(h40, "class", "svelte-9ado1z");
    			add_location(h40, file, 17, 12, 413);
    			attr_dev(h20, "class", "svelte-9ado1z");
    			add_location(h20, file, 18, 12, 458);
    			attr_dev(h41, "class", "svelte-9ado1z");
    			add_location(h41, file, 19, 12, 495);
    			attr_dev(p0, "class", "svelte-9ado1z");
    			add_location(p0, file, 20, 12, 547);
    			attr_dev(a0, "href", "#0");
    			attr_dev(a0, "class", "btn svelte-9ado1z");
    			add_location(a0, file, 22, 12, 878);
    			attr_dev(div2, "class", "svelte-9ado1z");
    			add_location(div2, file, 16, 8, 395);
    			if (img1.src !== (img1_src_value = "/images/facebook.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "facebook");
    			attr_dev(img1, "class", "svelte-9ado1z");
    			add_location(img1, file, 25, 29, 985);
    			attr_dev(a1, "href", "#0");
    			attr_dev(a1, "class", "svelte-9ado1z");
    			add_location(a1, file, 25, 16, 972);
    			attr_dev(li0, "class", "svelte-9ado1z");
    			add_location(li0, file, 25, 12, 968);
    			if (img2.src !== (img2_src_value = "/images/twitter.png")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "twitter");
    			attr_dev(img2, "class", "svelte-9ado1z");
    			add_location(img2, file, 26, 29, 1071);
    			attr_dev(a2, "href", "#0");
    			attr_dev(a2, "class", "svelte-9ado1z");
    			add_location(a2, file, 26, 16, 1058);
    			attr_dev(li1, "class", "svelte-9ado1z");
    			add_location(li1, file, 26, 12, 1054);
    			if (img3.src !== (img3_src_value = "/images/instagram.png")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "instagram");
    			attr_dev(img3, "class", "svelte-9ado1z");
    			add_location(img3, file, 27, 29, 1155);
    			attr_dev(a3, "href", "#0");
    			attr_dev(a3, "class", "svelte-9ado1z");
    			add_location(a3, file, 27, 16, 1142);
    			attr_dev(li2, "class", "svelte-9ado1z");
    			add_location(li2, file, 27, 12, 1138);
    			attr_dev(ul0, "class", "sci svelte-9ado1z");
    			add_location(ul0, file, 24, 8, 939);
    			attr_dev(div3, "class", "contentBx svelte-9ado1z");
    			add_location(div3, file, 14, 4, 321);
    			attr_dev(section0, "class", "banner svelte-9ado1z");
    			attr_dev(section0, "id", "home");
    			add_location(section0, file, 10, 0, 200);
    			attr_dev(h21, "class", "svelte-9ado1z");
    			add_location(h21, file, 34, 8, 1346);
    			attr_dev(p1, "class", "svelte-9ado1z");
    			add_location(p1, file, 35, 8, 1372);
    			attr_dev(div4, "class", "title white svelte-9ado1z");
    			add_location(div4, file, 33, 4, 1312);
    			attr_dev(br0, "class", "svelte-9ado1z");
    			add_location(br0, file, 41, 233, 1986);
    			attr_dev(br1, "class", "svelte-9ado1z");
    			add_location(br1, file, 41, 237, 1990);
    			attr_dev(p2, "class", "svelte-9ado1z");
    			add_location(p2, file, 39, 12, 1514);
    			attr_dev(div5, "class", "textBx svelte-9ado1z");
    			add_location(div5, file, 38, 8, 1481);
    			if (img4.src !== (img4_src_value = "/images/flavio_pc.PNG")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "Flavio");
    			attr_dev(img4, "class", "svelte-9ado1z");
    			add_location(img4, file, 45, 12, 2305);
    			attr_dev(div6, "class", "imgBx svelte-9ado1z");
    			add_location(div6, file, 44, 8, 2273);
    			attr_dev(div7, "class", "content svelte-9ado1z");
    			add_location(div7, file, 37, 4, 1451);
    			attr_dev(section1, "class", "about svelte-9ado1z");
    			attr_dev(section1, "id", "about");
    			add_location(section1, file, 32, 0, 1273);
    			attr_dev(h22, "class", "svelte-9ado1z");
    			add_location(h22, file, 52, 8, 2485);
    			attr_dev(p3, "class", "svelte-9ado1z");
    			add_location(p3, file, 53, 8, 2515);
    			attr_dev(div8, "class", "title svelte-9ado1z");
    			add_location(div8, file, 51, 4, 2457);
    			attr_dev(section2, "class", "services svelte-9ado1z");
    			attr_dev(section2, "id", "services");
    			add_location(section2, file, 50, 0, 2412);
    			attr_dev(a4, "href", "#home");
    			attr_dev(a4, "class", "svelte-9ado1z");
    			toggle_class(a4, "active", /*active*/ ctx[0]);
    			add_location(a4, file, 59, 12, 2810);
    			attr_dev(li3, "class", "svelte-9ado1z");
    			add_location(li3, file, 59, 8, 2806);
    			attr_dev(a5, "href", "#about");
    			attr_dev(a5, "class", "svelte-9ado1z");
    			toggle_class(a5, "active", /*active*/ ctx[0]);
    			add_location(a5, file, 60, 12, 2889);
    			attr_dev(li4, "class", "svelte-9ado1z");
    			add_location(li4, file, 60, 8, 2885);
    			attr_dev(a6, "href", "#services");
    			attr_dev(a6, "class", "svelte-9ado1z");
    			toggle_class(a6, "active", /*active*/ ctx[0]);
    			add_location(a6, file, 61, 12, 2970);
    			attr_dev(li5, "class", "svelte-9ado1z");
    			add_location(li5, file, 61, 8, 2966);
    			attr_dev(a7, "href", "#0");
    			attr_dev(a7, "class", "svelte-9ado1z");
    			toggle_class(a7, "active", /*active*/ ctx[0]);
    			add_location(a7, file, 62, 12, 3057);
    			attr_dev(li6, "class", "svelte-9ado1z");
    			add_location(li6, file, 62, 8, 3053);
    			attr_dev(a8, "href", "#0");
    			attr_dev(a8, "class", "svelte-9ado1z");
    			toggle_class(a8, "active", /*active*/ ctx[0]);
    			add_location(a8, file, 63, 12, 3133);
    			attr_dev(li7, "class", "svelte-9ado1z");
    			add_location(li7, file, 63, 8, 3129);
    			attr_dev(ul1, "class", "menu svelte-9ado1z");
    			add_location(ul1, file, 58, 4, 2780);
    			attr_dev(div9, "class", "sidebar svelte-9ado1z");
    			toggle_class(div9, "active", /*active*/ ctx[0]);
    			add_location(div9, file, 57, 0, 2708);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section0, anchor);
    			append_dev(section0, div1);
    			append_dev(div1, img0);
    			append_dev(section0, t2);
    			append_dev(section0, div3);
    			append_dev(div3, h5);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, h40);
    			append_dev(h40, span);
    			append_dev(h40, t6);
    			append_dev(div2, t7);
    			append_dev(div2, h20);
    			append_dev(div2, t9);
    			append_dev(div2, h41);
    			append_dev(div2, t11);
    			append_dev(div2, p0);
    			append_dev(div2, t13);
    			append_dev(div2, a0);
    			append_dev(div3, t15);
    			append_dev(div3, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a1);
    			append_dev(a1, img1);
    			append_dev(ul0, t16);
    			append_dev(ul0, li1);
    			append_dev(li1, a2);
    			append_dev(a2, img2);
    			append_dev(ul0, t17);
    			append_dev(ul0, li2);
    			append_dev(li2, a3);
    			append_dev(a3, img3);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, div4);
    			append_dev(div4, h21);
    			append_dev(div4, t20);
    			append_dev(div4, p1);
    			append_dev(section1, t22);
    			append_dev(section1, div7);
    			append_dev(div7, div5);
    			append_dev(div5, p2);
    			append_dev(p2, t23);
    			append_dev(p2, br0);
    			append_dev(p2, br1);
    			append_dev(p2, t24);
    			append_dev(div7, t25);
    			append_dev(div7, div6);
    			append_dev(div6, img4);
    			insert_dev(target, t26, anchor);
    			insert_dev(target, section2, anchor);
    			append_dev(section2, div8);
    			append_dev(div8, h22);
    			append_dev(div8, t28);
    			append_dev(div8, p3);
    			insert_dev(target, t30, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, ul1);
    			append_dev(ul1, li3);
    			append_dev(li3, a4);
    			append_dev(ul1, t32);
    			append_dev(ul1, li4);
    			append_dev(li4, a5);
    			append_dev(ul1, t34);
    			append_dev(ul1, li5);
    			append_dev(li5, a6);
    			append_dev(ul1, t36);
    			append_dev(ul1, li6);
    			append_dev(li6, a7);
    			append_dev(ul1, t38);
    			append_dev(ul1, li7);
    			append_dev(li7, a8);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*click_handler*/ ctx[1], false, false, false),
    					listen_dev(a4, "click", /*click_handler_1*/ ctx[2], false, false, false),
    					listen_dev(a5, "click", /*click_handler_2*/ ctx[3], false, false, false),
    					listen_dev(a6, "click", /*click_handler_3*/ ctx[4], false, false, false),
    					listen_dev(a7, "click", /*click_handler_4*/ ctx[5], false, false, false),
    					listen_dev(a8, "click", /*click_handler_5*/ ctx[6], false, false, false),
    					listen_dev(div9, "click", /*click_handler_6*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*active*/ 1) {
    				toggle_class(div0, "active", /*active*/ ctx[0]);
    			}

    			if (dirty & /*active*/ 1) {
    				toggle_class(a4, "active", /*active*/ ctx[0]);
    			}

    			if (dirty & /*active*/ 1) {
    				toggle_class(a5, "active", /*active*/ ctx[0]);
    			}

    			if (dirty & /*active*/ 1) {
    				toggle_class(a6, "active", /*active*/ ctx[0]);
    			}

    			if (dirty & /*active*/ 1) {
    				toggle_class(a7, "active", /*active*/ ctx[0]);
    			}

    			if (dirty & /*active*/ 1) {
    				toggle_class(a8, "active", /*active*/ ctx[0]);
    			}

    			if (dirty & /*active*/ 1) {
    				toggle_class(div9, "active", /*active*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(section1);
    			if (detaching) detach_dev(t26);
    			if (detaching) detach_dev(section2);
    			if (detaching) detach_dev(t30);
    			if (detaching) detach_dev(div9);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Home", slots, []);
    	let active = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(0, active = !active);
    	const click_handler_1 = () => active;
    	const click_handler_2 = () => active;
    	const click_handler_3 = () => active;
    	const click_handler_4 = () => active;
    	const click_handler_5 = () => active;
    	const click_handler_6 = () => $$invalidate(0, active = !active);
    	$$self.$capture_state = () => ({ active });

    	$$self.$inject_state = $$props => {
    		if ("active" in $$props) $$invalidate(0, active = $$props.active);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		active,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6
    	];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.37.0 */

    function create_fragment(ctx) {
    	let home;
    	let current;
    	home = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Home });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
