
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
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
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

    function loader (urls, test, callback) {
      let remaining = urls.length;

      function maybeCallback () {
        remaining = --remaining;
        if (remaining < 1) {
          callback();
        }
      }

      if (!test()) {
        urls.forEach(({ type, url, options = { async: true, defer: true }}) => {
          const isScript = type === 'script';
          const tag = document.createElement(isScript ? 'script': 'link');
          if (isScript) {
            tag.src = url;
            tag.async = options.async;
            tag.defer = options.defer;
          } else {
            tag.rel = 'stylesheet';
    		    tag.href = url;
          }
          tag.onload = maybeCallback;
          document.body.appendChild(tag);
        });
      } else {
        callback();
      }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const gaStore = writable([]);

    /* node_modules/@beyonk/svelte-google-analytics/src/GoogleAnalytics.svelte generated by Svelte v3.37.0 */

    function create_fragment$2(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function test() {
    	return Boolean(window.dataLayer).valueOf() && Array.isArray(window.dataLayer);
    }

    function gtag() {
    	window.dataLayer.push(arguments);
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("GoogleAnalytics", slots, []);
    	let { properties } = $$props;
    	let { configurations = {} } = $$props;
    	let { enabled = true } = $$props;

    	onMount(() => {
    		if (!enabled) {
    			return;
    		}

    		init();
    	});

    	function init() {
    		const mainProperty = properties[0];

    		loader(
    			[
    				{
    					type: "script",
    					url: `//www.googletagmanager.com/gtag/js?id=${mainProperty}`
    				}
    			],
    			test,
    			callback
    		);
    	}

    	function callback() {
    		window.dataLayer = window.dataLayer || [];
    		gtag("js", new Date());

    		properties.forEach(p => {
    			gtag("config", p, configurations[p] || {});
    		});

    		return gaStore.subscribe(queue => {
    			let next = queue.length && queue.shift();

    			while (next) {
    				const { event, data } = next;
    				gtag("event", event, data);
    				next = queue.shift();
    			}
    		});
    	}

    	const writable_props = ["properties", "configurations", "enabled"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<GoogleAnalytics> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("properties" in $$props) $$invalidate(0, properties = $$props.properties);
    		if ("configurations" in $$props) $$invalidate(1, configurations = $$props.configurations);
    		if ("enabled" in $$props) $$invalidate(2, enabled = $$props.enabled);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		loader,
    		gaStore,
    		properties,
    		configurations,
    		enabled,
    		init,
    		test,
    		gtag,
    		callback
    	});

    	$$self.$inject_state = $$props => {
    		if ("properties" in $$props) $$invalidate(0, properties = $$props.properties);
    		if ("configurations" in $$props) $$invalidate(1, configurations = $$props.configurations);
    		if ("enabled" in $$props) $$invalidate(2, enabled = $$props.enabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [properties, configurations, enabled, init];
    }

    class GoogleAnalytics extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			properties: 0,
    			configurations: 1,
    			enabled: 2,
    			init: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GoogleAnalytics",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*properties*/ ctx[0] === undefined && !("properties" in props)) {
    			console.warn("<GoogleAnalytics> was created without expected prop 'properties'");
    		}
    	}

    	get properties() {
    		throw new Error("<GoogleAnalytics>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set properties(value) {
    		throw new Error("<GoogleAnalytics>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get configurations() {
    		throw new Error("<GoogleAnalytics>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set configurations(value) {
    		throw new Error("<GoogleAnalytics>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get enabled() {
    		throw new Error("<GoogleAnalytics>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set enabled(value) {
    		throw new Error("<GoogleAnalytics>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get init() {
    		return this.$$.ctx[3];
    	}

    	set init(value) {
    		throw new Error("<GoogleAnalytics>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
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
    	let section1;
    	let div4;
    	let h21;
    	let t18;
    	let p1;
    	let t20;
    	let div7;
    	let div5;
    	let p2;
    	let t21;
    	let br0;
    	let br1;
    	let t22;
    	let br2;
    	let t23;
    	let br3;
    	let br4;
    	let t24;
    	let t25;
    	let div6;
    	let img2;
    	let img2_src_value;
    	let t26;
    	let section2;
    	let div8;
    	let h22;
    	let t28;
    	let p3;
    	let t30;
    	let div15;
    	let div9;
    	let img3;
    	let img3_src_value;
    	let t31;
    	let h23;
    	let t33;
    	let p4;
    	let t35;
    	let div10;
    	let img4;
    	let img4_src_value;
    	let t36;
    	let h24;
    	let t38;
    	let p5;
    	let t40;
    	let div11;
    	let img5;
    	let img5_src_value;
    	let t41;
    	let h25;
    	let t43;
    	let p6;
    	let t45;
    	let div12;
    	let img6;
    	let img6_src_value;
    	let t46;
    	let h26;
    	let t48;
    	let p7;
    	let t50;
    	let div13;
    	let img7;
    	let img7_src_value;
    	let t51;
    	let h27;
    	let t53;
    	let p8;
    	let t55;
    	let div14;
    	let img8;
    	let img8_src_value;
    	let t56;
    	let h28;
    	let t58;
    	let p9;
    	let t60;
    	let section3;
    	let div16;
    	let h29;
    	let t62;
    	let p10;
    	let t64;
    	let div29;
    	let div19;
    	let div17;
    	let img9;
    	let img9_src_value;
    	let t65;
    	let div18;
    	let a2;
    	let h30;
    	let t67;
    	let div22;
    	let div20;
    	let img10;
    	let img10_src_value;
    	let t68;
    	let div21;
    	let a3;
    	let h31;
    	let t70;
    	let div25;
    	let div23;
    	let img11;
    	let img11_src_value;
    	let t71;
    	let div24;
    	let a4;
    	let h32;
    	let t73;
    	let div28;
    	let div26;
    	let img12;
    	let img12_src_value;
    	let t74;
    	let div27;
    	let a5;
    	let h33;
    	let t76;
    	let section4;
    	let div30;
    	let h210;
    	let t78;
    	let p11;
    	let t80;
    	let form;
    	let div41;
    	let div33;
    	let div31;
    	let input0;
    	let t81;
    	let div32;
    	let input1;
    	let t82;
    	let div36;
    	let div34;
    	let input2;
    	let t83;
    	let div35;
    	let input3;
    	let t84;
    	let div38;
    	let div37;
    	let textarea;
    	let t85;
    	let div40;
    	let div39;
    	let button;
    	let input4;
    	let t86;
    	let div42;
    	let p12;
    	let t88;
    	let div43;
    	let ul1;
    	let li1;
    	let a6;
    	let t90;
    	let li2;
    	let a7;
    	let t92;
    	let li3;
    	let a8;
    	let t94;
    	let li4;
    	let a9;
    	let t96;
    	let li5;
    	let a10;
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
    			h5.textContent = "Fl4v.io";
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
    			h41.textContent = "A developer with a versatile coding skillset.";
    			t11 = space();
    			p0 = element("p");
    			p0.textContent = "We are a developer with a broad and versatile coding skillset. We can help startups and enterprises with prototypes and ideas by efficiently building those things into reality. Our expertise lies in building MVPs, enterprise software, scalable microservices, REST and Socket APIs and deployments in AWS, Azure, DigitalOcean and others.";
    			t13 = space();
    			a0 = element("a");
    			a0.textContent = "About Me";
    			t15 = space();
    			ul0 = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			img1 = element("img");
    			t16 = space();
    			section1 = element("section");
    			div4 = element("div");
    			h21 = element("h2");
    			h21.textContent = "About Us";
    			t18 = space();
    			p1 = element("p");
    			p1.textContent = "I'm Flavio, continuously working to improve my web development skills.";
    			t20 = space();
    			div7 = element("div");
    			div5 = element("div");
    			p2 = element("p");
    			t21 = text("I'm Flavio, continuously working to improve my web development skills on the frontend, basically using Svelte framework, JavaScript, CSS3 and HTML5.  On the backend, we are mainly developing using the Django framework, Python and SQL database. I'm working as a freelancer, developing some web solutions for projects with scalable perspectives and integrating Django Rest API with the Svelte frontend.  In this way, we could see some fantastic plans, project, and dreams get off the paper to reality.");
    			br0 = element("br");
    			br1 = element("br");
    			t22 = text("\n                I speak Portuguese, English, and Spanish at the lower level.");
    			br2 = element("br");
    			t23 = text(" \n                I consider the most substantial skill of mine \"fast adaptation.\" I could confirm it in the last six years, moving country, changing the job, and adapting well in diverse environments.");
    			br3 = element("br");
    			br4 = element("br");
    			t24 = text("                \n                I used to be an athlete in Jiu Jitsu. I still compete, sometimes. I just described it because this experience helps me to push myself to be better day by day.");
    			t25 = space();
    			div6 = element("div");
    			img2 = element("img");
    			t26 = space();
    			section2 = element("section");
    			div8 = element("div");
    			h22 = element("h2");
    			h22.textContent = "Our Services";
    			t28 = space();
    			p3 = element("p");
    			p3.textContent = "It is the services that we offer to help you bring your project to life. We can do any step separately or the whole process from scratch to the deployment.";
    			t30 = space();
    			div15 = element("div");
    			div9 = element("div");
    			img3 = element("img");
    			t31 = space();
    			h23 = element("h2");
    			h23.textContent = "Web Development";
    			t33 = space();
    			p4 = element("p");
    			p4.textContent = "We develop intuitive software solutions for businesses. This helps to streamline, improve, and convert across a range of web based applications.";
    			t35 = space();
    			div10 = element("div");
    			img4 = element("img");
    			t36 = space();
    			h24 = element("h2");
    			h24.textContent = "Web Design";
    			t38 = space();
    			p5 = element("p");
    			p5.textContent = "By creating the perfect visual identity for your project, we aim to attract the attention of your audience with much more than just a logo refresh.";
    			t40 = space();
    			div11 = element("div");
    			img5 = element("img");
    			t41 = space();
    			h25 = element("h2");
    			h25.textContent = "Frontend";
    			t43 = space();
    			p6 = element("p");
    			p6.textContent = "We’ll guarantee your website works over a range of popular devices. Whether you need to function on tablets or mobile, we have the skills to make it happen.";
    			t45 = space();
    			div12 = element("div");
    			img6 = element("img");
    			t46 = space();
    			h26 = element("h2");
    			h26.textContent = "Backend";
    			t48 = space();
    			p7 = element("p");
    			p7.textContent = "Our backend applications usually are scalable and structured in one way to give you the possibility to grow with your project, adding easily new functionalities.";
    			t50 = space();
    			div13 = element("div");
    			img7 = element("img");
    			t51 = space();
    			h27 = element("h2");
    			h27.textContent = "Deployment";
    			t53 = space();
    			p8 = element("p");
    			p8.textContent = "We can deploy and administrate your applications on clouds services like AWS, Azure, Google Cloud and others.";
    			t55 = space();
    			div14 = element("div");
    			img8 = element("img");
    			t56 = space();
    			h28 = element("h2");
    			h28.textContent = "Website Administration";
    			t58 = space();
    			p9 = element("p");
    			p9.textContent = "If something has broken on your website, it needs to be fixed – fast. You’ll have someone on hand at all times, ready to resolve any issues that arise quickly and efficiently.";
    			t60 = space();
    			section3 = element("section");
    			div16 = element("div");
    			h29 = element("h2");
    			h29.textContent = "Recent Work";
    			t62 = space();
    			p10 = element("p");
    			p10.textContent = "Here are some studies, projects and jobs that we recently did to expose some technique and styles that we can use in your projects.";
    			t64 = space();
    			div29 = element("div");
    			div19 = element("div");
    			div17 = element("div");
    			img9 = element("img");
    			t65 = space();
    			div18 = element("div");
    			a2 = element("a");
    			h30 = element("h3");
    			h30.textContent = "Grid Layout";
    			t67 = space();
    			div22 = element("div");
    			div20 = element("div");
    			img10 = element("img");
    			t68 = space();
    			div21 = element("div");
    			a3 = element("a");
    			h31 = element("h3");
    			h31.textContent = "Animated Form";
    			t70 = space();
    			div25 = element("div");
    			div23 = element("div");
    			img11 = element("img");
    			t71 = space();
    			div24 = element("div");
    			a4 = element("a");
    			h32 = element("h3");
    			h32.textContent = "Profile Card";
    			t73 = space();
    			div28 = element("div");
    			div26 = element("div");
    			img12 = element("img");
    			t74 = space();
    			div27 = element("div");
    			a5 = element("a");
    			h33 = element("h3");
    			h33.textContent = "Landing Page";
    			t76 = space();
    			section4 = element("section");
    			div30 = element("div");
    			h210 = element("h2");
    			h210.textContent = "Contact Us";
    			t78 = space();
    			p11 = element("p");
    			p11.textContent = "Use this form to tell us about your project or idea; let's talk about how to make this happen.";
    			t80 = space();
    			form = element("form");
    			div41 = element("div");
    			div33 = element("div");
    			div31 = element("div");
    			input0 = element("input");
    			t81 = space();
    			div32 = element("div");
    			input1 = element("input");
    			t82 = space();
    			div36 = element("div");
    			div34 = element("div");
    			input2 = element("input");
    			t83 = space();
    			div35 = element("div");
    			input3 = element("input");
    			t84 = space();
    			div38 = element("div");
    			div37 = element("div");
    			textarea = element("textarea");
    			t85 = space();
    			div40 = element("div");
    			div39 = element("div");
    			button = element("button");
    			input4 = element("input");
    			t86 = space();
    			div42 = element("div");
    			p12 = element("p");
    			p12.textContent = "MIT License. Copyright © 2021 Flavio Oliveira.";
    			t88 = space();
    			div43 = element("div");
    			ul1 = element("ul");
    			li1 = element("li");
    			a6 = element("a");
    			a6.textContent = "Home";
    			t90 = space();
    			li2 = element("li");
    			a7 = element("a");
    			a7.textContent = "About";
    			t92 = space();
    			li3 = element("li");
    			a8 = element("a");
    			a8.textContent = "Services";
    			t94 = space();
    			li4 = element("li");
    			a9 = element("a");
    			a9.textContent = "Work";
    			t96 = space();
    			li5 = element("li");
    			a10 = element("a");
    			a10.textContent = "Contact";
    			document.title = "Flavio Oliveira";
    			attr_dev(div0, "class", "toggle svelte-1vgpxsg");
    			toggle_class(div0, "active", /*active*/ ctx[0]);
    			add_location(div0, file, 8, 0, 108);
    			if (img0.src !== (img0_src_value = "images/bg.jpg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			attr_dev(img0, "class", "svelte-1vgpxsg");
    			add_location(img0, file, 12, 8, 272);
    			attr_dev(div1, "class", "imgSidebar svelte-1vgpxsg");
    			add_location(div1, file, 11, 4, 239);
    			attr_dev(h5, "class", "logoText svelte-1vgpxsg");
    			add_location(h5, file, 15, 6, 350);
    			attr_dev(span, "class", "svelte-1vgpxsg");
    			add_location(span, file, 17, 16, 414);
    			attr_dev(h40, "class", "svelte-1vgpxsg");
    			add_location(h40, file, 17, 12, 410);
    			attr_dev(h20, "class", "svelte-1vgpxsg");
    			add_location(h20, file, 18, 12, 455);
    			attr_dev(h41, "class", "svelte-1vgpxsg");
    			add_location(h41, file, 19, 12, 492);
    			attr_dev(p0, "class", "svelte-1vgpxsg");
    			add_location(p0, file, 20, 12, 559);
    			attr_dev(a0, "href", "#about");
    			attr_dev(a0, "class", "btn svelte-1vgpxsg");
    			add_location(a0, file, 21, 12, 915);
    			attr_dev(div2, "class", "svelte-1vgpxsg");
    			add_location(div2, file, 16, 8, 392);
    			if (img1.src !== (img1_src_value = "images/twitter.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "twitter");
    			attr_dev(img1, "target", "_blank");
    			attr_dev(img1, "class", "svelte-1vgpxsg");
    			add_location(img1, file, 25, 61, 1148);
    			attr_dev(a1, "href", "https://twitter.com/fl4viooliveira");
    			attr_dev(a1, "class", "svelte-1vgpxsg");
    			add_location(a1, file, 25, 16, 1103);
    			attr_dev(li0, "class", "svelte-1vgpxsg");
    			add_location(li0, file, 25, 12, 1099);
    			attr_dev(ul0, "class", "sci svelte-1vgpxsg");
    			add_location(ul0, file, 23, 8, 980);
    			attr_dev(div3, "class", "contentBx svelte-1vgpxsg");
    			add_location(div3, file, 14, 4, 320);
    			attr_dev(section0, "class", "banner svelte-1vgpxsg");
    			attr_dev(section0, "id", "home");
    			add_location(section0, file, 10, 0, 200);
    			attr_dev(h21, "class", "svelte-1vgpxsg");
    			add_location(h21, file, 33, 8, 1444);
    			attr_dev(p1, "class", "svelte-1vgpxsg");
    			add_location(p1, file, 34, 8, 1470);
    			attr_dev(div4, "class", "title white svelte-1vgpxsg");
    			add_location(div4, file, 32, 4, 1410);
    			attr_dev(br0, "class", "svelte-1vgpxsg");
    			add_location(br0, file, 39, 515, 2145);
    			attr_dev(br1, "class", "svelte-1vgpxsg");
    			add_location(br1, file, 39, 519, 2149);
    			attr_dev(br2, "class", "svelte-1vgpxsg");
    			add_location(br2, file, 40, 76, 2230);
    			attr_dev(br3, "class", "svelte-1vgpxsg");
    			add_location(br3, file, 41, 199, 2435);
    			attr_dev(br4, "class", "svelte-1vgpxsg");
    			add_location(br4, file, 41, 203, 2439);
    			attr_dev(p2, "class", "svelte-1vgpxsg");
    			add_location(p2, file, 38, 12, 1626);
    			attr_dev(div5, "class", "textBx svelte-1vgpxsg");
    			add_location(div5, file, 37, 8, 1593);
    			if (img2.src !== (img2_src_value = "images/flavio_pc.PNG")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "Flavio");
    			attr_dev(img2, "class", "svelte-1vgpxsg");
    			add_location(img2, file, 46, 12, 2709);
    			attr_dev(div6, "class", "imgBx svelte-1vgpxsg");
    			add_location(div6, file, 45, 8, 2677);
    			attr_dev(div7, "class", "content svelte-1vgpxsg");
    			add_location(div7, file, 36, 4, 1563);
    			attr_dev(section1, "class", "about svelte-1vgpxsg");
    			attr_dev(section1, "id", "about");
    			add_location(section1, file, 31, 0, 1371);
    			attr_dev(h22, "class", "svelte-1vgpxsg");
    			add_location(h22, file, 53, 8, 2888);
    			attr_dev(p3, "class", "svelte-1vgpxsg");
    			add_location(p3, file, 54, 8, 2918);
    			attr_dev(div8, "class", "title svelte-1vgpxsg");
    			add_location(div8, file, 52, 4, 2860);
    			if (img3.src !== (img3_src_value = "images/webdevelopment.png")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "Web Development icon");
    			attr_dev(img3, "class", "svelte-1vgpxsg");
    			add_location(img3, file, 58, 12, 3163);
    			attr_dev(h23, "class", "svelte-1vgpxsg");
    			add_location(h23, file, 59, 12, 3240);
    			attr_dev(p4, "class", "svelte-1vgpxsg");
    			add_location(p4, file, 60, 12, 3277);
    			attr_dev(div9, "class", "servicesBx svelte-1vgpxsg");
    			add_location(div9, file, 57, 8, 3126);
    			if (img4.src !== (img4_src_value = "images/webdesign.png")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "Web Development icon");
    			attr_dev(img4, "class", "svelte-1vgpxsg");
    			add_location(img4, file, 63, 12, 3489);
    			attr_dev(h24, "class", "svelte-1vgpxsg");
    			add_location(h24, file, 64, 12, 3561);
    			attr_dev(p5, "class", "svelte-1vgpxsg");
    			add_location(p5, file, 65, 12, 3593);
    			attr_dev(div10, "class", "servicesBx svelte-1vgpxsg");
    			add_location(div10, file, 62, 8, 3452);
    			if (img5.src !== (img5_src_value = "images/frontend.png")) attr_dev(img5, "src", img5_src_value);
    			attr_dev(img5, "alt", "Frontend icon");
    			attr_dev(img5, "class", "svelte-1vgpxsg");
    			add_location(img5, file, 68, 12, 3808);
    			attr_dev(h25, "class", "svelte-1vgpxsg");
    			add_location(h25, file, 69, 12, 3872);
    			attr_dev(p6, "class", "svelte-1vgpxsg");
    			add_location(p6, file, 70, 12, 3902);
    			attr_dev(div11, "class", "servicesBx svelte-1vgpxsg");
    			add_location(div11, file, 67, 8, 3771);
    			if (img6.src !== (img6_src_value = "images/backend.png")) attr_dev(img6, "src", img6_src_value);
    			attr_dev(img6, "alt", "Backend icon");
    			attr_dev(img6, "class", "svelte-1vgpxsg");
    			add_location(img6, file, 73, 12, 4126);
    			attr_dev(h26, "class", "svelte-1vgpxsg");
    			add_location(h26, file, 74, 12, 4188);
    			attr_dev(p7, "class", "svelte-1vgpxsg");
    			add_location(p7, file, 75, 12, 4217);
    			attr_dev(div12, "class", "servicesBx svelte-1vgpxsg");
    			add_location(div12, file, 72, 8, 4089);
    			if (img7.src !== (img7_src_value = "images/deployment.png")) attr_dev(img7, "src", img7_src_value);
    			attr_dev(img7, "alt", "Deployment icon");
    			attr_dev(img7, "class", "svelte-1vgpxsg");
    			add_location(img7, file, 78, 12, 4446);
    			attr_dev(h27, "class", "svelte-1vgpxsg");
    			add_location(h27, file, 79, 12, 4514);
    			attr_dev(p8, "class", "svelte-1vgpxsg");
    			add_location(p8, file, 80, 12, 4546);
    			attr_dev(div13, "class", "servicesBx svelte-1vgpxsg");
    			add_location(div13, file, 77, 8, 4409);
    			if (img8.src !== (img8_src_value = "images/administrator.png")) attr_dev(img8, "src", img8_src_value);
    			attr_dev(img8, "alt", "Administrator icon");
    			attr_dev(img8, "class", "svelte-1vgpxsg");
    			add_location(img8, file, 83, 10, 4722);
    			attr_dev(h28, "class", "svelte-1vgpxsg");
    			add_location(h28, file, 84, 10, 4794);
    			attr_dev(p9, "class", "svelte-1vgpxsg");
    			add_location(p9, file, 85, 8, 4834);
    			attr_dev(div14, "class", "servicesBx svelte-1vgpxsg");
    			add_location(div14, file, 82, 8, 4687);
    			attr_dev(div15, "class", "content svelte-1vgpxsg");
    			add_location(div15, file, 56, 4, 3096);
    			attr_dev(section2, "class", "services svelte-1vgpxsg");
    			attr_dev(section2, "id", "services");
    			add_location(section2, file, 51, 0, 2815);
    			attr_dev(h29, "class", "svelte-1vgpxsg");
    			add_location(h29, file, 92, 8, 5138);
    			attr_dev(p10, "class", "svelte-1vgpxsg");
    			add_location(p10, file, 93, 8, 5167);
    			attr_dev(div16, "class", "title svelte-1vgpxsg");
    			add_location(div16, file, 91, 4, 5110);
    			if (img9.src !== (img9_src_value = "images/img1.jpg")) attr_dev(img9, "src", img9_src_value);
    			attr_dev(img9, "alt", "work-1");
    			attr_dev(img9, "class", "svelte-1vgpxsg");
    			add_location(img9, file, 98, 16, 5436);
    			attr_dev(div17, "class", "imgBx svelte-1vgpxsg");
    			add_location(div17, file, 97, 12, 5384);
    			attr_dev(h30, "class", "svelte-1vgpxsg");
    			add_location(h30, file, 102, 16, 5670);
    			attr_dev(a2, "href", "https://fl4viooliveira.github.io/bkg_grid_layout/");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "class", "svelte-1vgpxsg");
    			add_location(a2, file, 101, 16, 5562);
    			attr_dev(div18, "class", "textBx svelte-1vgpxsg");
    			add_location(div18, file, 100, 12, 5524);
    			attr_dev(div19, "class", "workBx svelte-1vgpxsg");
    			add_location(div19, file, 96, 8, 5351);
    			if (img10.src !== (img10_src_value = "images/img2.jpg")) attr_dev(img10, "src", img10_src_value);
    			attr_dev(img10, "alt", "work-2");
    			attr_dev(img10, "class", "svelte-1vgpxsg");
    			add_location(img10, file, 108, 16, 5823);
    			attr_dev(div20, "class", "imgBx svelte-1vgpxsg");
    			add_location(div20, file, 107, 12, 5787);
    			attr_dev(h31, "class", "svelte-1vgpxsg");
    			add_location(h31, file, 112, 20, 6042);
    			attr_dev(a3, "href", "https://fl4viooliveira.github.io/animated_form/");
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "class", "svelte-1vgpxsg");
    			add_location(a3, file, 111, 16, 5932);
    			attr_dev(div21, "class", "textBx svelte-1vgpxsg");
    			add_location(div21, file, 110, 12, 5895);
    			attr_dev(div22, "class", "workBx svelte-1vgpxsg");
    			add_location(div22, file, 106, 8, 5754);
    			if (img11.src !== (img11_src_value = "images/img3.jpg")) attr_dev(img11, "src", img11_src_value);
    			attr_dev(img11, "alt", "work-3");
    			attr_dev(img11, "class", "svelte-1vgpxsg");
    			add_location(img11, file, 118, 16, 6197);
    			attr_dev(div23, "class", "imgBx svelte-1vgpxsg");
    			add_location(div23, file, 117, 12, 6161);
    			attr_dev(h32, "class", "svelte-1vgpxsg");
    			add_location(h32, file, 122, 20, 6415);
    			attr_dev(a4, "href", "https://fl4viooliveira.github.io/profile_card/");
    			attr_dev(a4, "target", "_blank");
    			attr_dev(a4, "class", "svelte-1vgpxsg");
    			add_location(a4, file, 121, 16, 6306);
    			attr_dev(div24, "class", "textBx svelte-1vgpxsg");
    			add_location(div24, file, 120, 12, 6269);
    			attr_dev(div25, "class", "workBx svelte-1vgpxsg");
    			add_location(div25, file, 116, 8, 6128);
    			if (img12.src !== (img12_src_value = "images/img4.jpg")) attr_dev(img12, "src", img12_src_value);
    			attr_dev(img12, "alt", "work-4");
    			attr_dev(img12, "class", "svelte-1vgpxsg");
    			add_location(img12, file, 128, 16, 6569);
    			attr_dev(div26, "class", "imgBx svelte-1vgpxsg");
    			add_location(div26, file, 127, 12, 6533);
    			attr_dev(h33, "class", "svelte-1vgpxsg");
    			add_location(h33, file, 132, 20, 6793);
    			attr_dev(a5, "href", "https://fl4viooliveira.github.io/blogr_landing_page/");
    			attr_dev(a5, "target", "_blank");
    			attr_dev(a5, "class", "svelte-1vgpxsg");
    			add_location(a5, file, 131, 16, 6678);
    			attr_dev(div27, "class", "textBx svelte-1vgpxsg");
    			add_location(div27, file, 130, 12, 6641);
    			attr_dev(div28, "class", "workBx svelte-1vgpxsg");
    			add_location(div28, file, 126, 8, 6500);
    			attr_dev(div29, "class", "content svelte-1vgpxsg");
    			add_location(div29, file, 95, 4, 5321);
    			attr_dev(section3, "class", "work svelte-1vgpxsg");
    			attr_dev(section3, "id", "work");
    			add_location(section3, file, 90, 0, 5073);
    			attr_dev(h210, "class", "svelte-1vgpxsg");
    			add_location(h210, file, 173, 8, 7959);
    			attr_dev(p11, "class", "svelte-1vgpxsg");
    			add_location(p11, file, 174, 8, 7987);
    			attr_dev(div30, "class", "title white svelte-1vgpxsg");
    			add_location(div30, file, 172, 4, 7925);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "first_name");
    			attr_dev(input0, "placeholder", "First Name");
    			attr_dev(input0, "class", "svelte-1vgpxsg");
    			add_location(input0, file, 180, 20, 8312);
    			attr_dev(div31, "class", "col50 svelte-1vgpxsg");
    			add_location(div31, file, 179, 16, 8272);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "last_name");
    			attr_dev(input1, "placeholder", "Last Name");
    			attr_dev(input1, "class", "svelte-1vgpxsg");
    			add_location(input1, file, 183, 20, 8454);
    			attr_dev(div32, "class", "col50 svelte-1vgpxsg");
    			add_location(div32, file, 182, 16, 8414);
    			attr_dev(div33, "class", "row svelte-1vgpxsg");
    			add_location(div33, file, 178, 12, 8238);
    			attr_dev(input2, "type", "email");
    			attr_dev(input2, "name", "email");
    			attr_dev(input2, "placeholder", "Email");
    			attr_dev(input2, "class", "svelte-1vgpxsg");
    			add_location(input2, file, 188, 20, 8643);
    			attr_dev(div34, "class", "col50 svelte-1vgpxsg");
    			add_location(div34, file, 187, 16, 8603);
    			attr_dev(input3, "type", "text");
    			attr_dev(input3, "name", "subject");
    			attr_dev(input3, "placeholder", "Subject");
    			attr_dev(input3, "class", "svelte-1vgpxsg");
    			add_location(input3, file, 191, 20, 8776);
    			attr_dev(div35, "class", "col50 svelte-1vgpxsg");
    			add_location(div35, file, 190, 16, 8736);
    			attr_dev(div36, "class", "row svelte-1vgpxsg");
    			add_location(div36, file, 186, 12, 8569);
    			attr_dev(textarea, "name", "message");
    			attr_dev(textarea, "placeholder", "Message");
    			attr_dev(textarea, "class", "svelte-1vgpxsg");
    			add_location(textarea, file, 196, 20, 8962);
    			attr_dev(div37, "class", "col100 svelte-1vgpxsg");
    			add_location(div37, file, 195, 16, 8921);
    			attr_dev(div38, "class", "row svelte-1vgpxsg");
    			add_location(div38, file, 194, 12, 8887);
    			attr_dev(input4, "type", "submit");
    			input4.value = "Send";
    			attr_dev(input4, "class", "svelte-1vgpxsg");
    			add_location(input4, file, 202, 24, 9183);
    			attr_dev(button, "class", "svelte-1vgpxsg");
    			add_location(button, file, 201, 20, 9150);
    			attr_dev(div39, "class", "col100 svelte-1vgpxsg");
    			add_location(div39, file, 200, 16, 9109);
    			attr_dev(div40, "class", "row svelte-1vgpxsg");
    			add_location(div40, file, 199, 12, 9075);
    			attr_dev(div41, "class", "contactForm svelte-1vgpxsg");
    			add_location(div41, file, 177, 8, 8200);
    			attr_dev(form, "action", "https://getform.io/f/04feb2e1-24e2-4e73-98b3-837225c11041");
    			attr_dev(form, "method", "POST");
    			attr_dev(form, "class", "svelte-1vgpxsg");
    			add_location(form, file, 176, 4, 8104);
    			attr_dev(section4, "class", "contact svelte-1vgpxsg");
    			attr_dev(section4, "id", "contact");
    			add_location(section4, file, 171, 0, 7882);
    			attr_dev(p12, "class", "svelte-1vgpxsg");
    			add_location(p12, file, 211, 4, 9357);
    			attr_dev(div42, "class", "copyright svelte-1vgpxsg");
    			add_location(div42, file, 210, 0, 9329);
    			attr_dev(a6, "href", "#home");
    			attr_dev(a6, "class", "svelte-1vgpxsg");
    			toggle_class(a6, "active", /*active*/ ctx[0]);
    			add_location(a6, file, 216, 12, 9521);
    			attr_dev(li1, "class", "svelte-1vgpxsg");
    			add_location(li1, file, 216, 8, 9517);
    			attr_dev(a7, "href", "#about");
    			attr_dev(a7, "class", "svelte-1vgpxsg");
    			toggle_class(a7, "active", /*active*/ ctx[0]);
    			add_location(a7, file, 217, 12, 9600);
    			attr_dev(li2, "class", "svelte-1vgpxsg");
    			add_location(li2, file, 217, 8, 9596);
    			attr_dev(a8, "href", "#services");
    			attr_dev(a8, "class", "svelte-1vgpxsg");
    			toggle_class(a8, "active", /*active*/ ctx[0]);
    			add_location(a8, file, 218, 12, 9681);
    			attr_dev(li3, "class", "svelte-1vgpxsg");
    			add_location(li3, file, 218, 8, 9677);
    			attr_dev(a9, "href", "#work");
    			attr_dev(a9, "class", "svelte-1vgpxsg");
    			toggle_class(a9, "active", /*active*/ ctx[0]);
    			add_location(a9, file, 219, 12, 9768);
    			attr_dev(li4, "class", "svelte-1vgpxsg");
    			add_location(li4, file, 219, 8, 9764);
    			attr_dev(a10, "href", "#contact");
    			attr_dev(a10, "class", "svelte-1vgpxsg");
    			toggle_class(a10, "active", /*active*/ ctx[0]);
    			add_location(a10, file, 220, 12, 9847);
    			attr_dev(li5, "class", "svelte-1vgpxsg");
    			add_location(li5, file, 220, 8, 9843);
    			attr_dev(ul1, "class", "menu svelte-1vgpxsg");
    			add_location(ul1, file, 215, 4, 9491);
    			attr_dev(div43, "class", "sidebar svelte-1vgpxsg");
    			toggle_class(div43, "active", /*active*/ ctx[0]);
    			add_location(div43, file, 214, 0, 9419);
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
    			insert_dev(target, t16, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, div4);
    			append_dev(div4, h21);
    			append_dev(div4, t18);
    			append_dev(div4, p1);
    			append_dev(section1, t20);
    			append_dev(section1, div7);
    			append_dev(div7, div5);
    			append_dev(div5, p2);
    			append_dev(p2, t21);
    			append_dev(p2, br0);
    			append_dev(p2, br1);
    			append_dev(p2, t22);
    			append_dev(p2, br2);
    			append_dev(p2, t23);
    			append_dev(p2, br3);
    			append_dev(p2, br4);
    			append_dev(p2, t24);
    			append_dev(div7, t25);
    			append_dev(div7, div6);
    			append_dev(div6, img2);
    			insert_dev(target, t26, anchor);
    			insert_dev(target, section2, anchor);
    			append_dev(section2, div8);
    			append_dev(div8, h22);
    			append_dev(div8, t28);
    			append_dev(div8, p3);
    			append_dev(section2, t30);
    			append_dev(section2, div15);
    			append_dev(div15, div9);
    			append_dev(div9, img3);
    			append_dev(div9, t31);
    			append_dev(div9, h23);
    			append_dev(div9, t33);
    			append_dev(div9, p4);
    			append_dev(div15, t35);
    			append_dev(div15, div10);
    			append_dev(div10, img4);
    			append_dev(div10, t36);
    			append_dev(div10, h24);
    			append_dev(div10, t38);
    			append_dev(div10, p5);
    			append_dev(div15, t40);
    			append_dev(div15, div11);
    			append_dev(div11, img5);
    			append_dev(div11, t41);
    			append_dev(div11, h25);
    			append_dev(div11, t43);
    			append_dev(div11, p6);
    			append_dev(div15, t45);
    			append_dev(div15, div12);
    			append_dev(div12, img6);
    			append_dev(div12, t46);
    			append_dev(div12, h26);
    			append_dev(div12, t48);
    			append_dev(div12, p7);
    			append_dev(div15, t50);
    			append_dev(div15, div13);
    			append_dev(div13, img7);
    			append_dev(div13, t51);
    			append_dev(div13, h27);
    			append_dev(div13, t53);
    			append_dev(div13, p8);
    			append_dev(div15, t55);
    			append_dev(div15, div14);
    			append_dev(div14, img8);
    			append_dev(div14, t56);
    			append_dev(div14, h28);
    			append_dev(div14, t58);
    			append_dev(div14, p9);
    			insert_dev(target, t60, anchor);
    			insert_dev(target, section3, anchor);
    			append_dev(section3, div16);
    			append_dev(div16, h29);
    			append_dev(div16, t62);
    			append_dev(div16, p10);
    			append_dev(section3, t64);
    			append_dev(section3, div29);
    			append_dev(div29, div19);
    			append_dev(div19, div17);
    			append_dev(div17, img9);
    			append_dev(div19, t65);
    			append_dev(div19, div18);
    			append_dev(div18, a2);
    			append_dev(a2, h30);
    			append_dev(div29, t67);
    			append_dev(div29, div22);
    			append_dev(div22, div20);
    			append_dev(div20, img10);
    			append_dev(div22, t68);
    			append_dev(div22, div21);
    			append_dev(div21, a3);
    			append_dev(a3, h31);
    			append_dev(div29, t70);
    			append_dev(div29, div25);
    			append_dev(div25, div23);
    			append_dev(div23, img11);
    			append_dev(div25, t71);
    			append_dev(div25, div24);
    			append_dev(div24, a4);
    			append_dev(a4, h32);
    			append_dev(div29, t73);
    			append_dev(div29, div28);
    			append_dev(div28, div26);
    			append_dev(div26, img12);
    			append_dev(div28, t74);
    			append_dev(div28, div27);
    			append_dev(div27, a5);
    			append_dev(a5, h33);
    			insert_dev(target, t76, anchor);
    			insert_dev(target, section4, anchor);
    			append_dev(section4, div30);
    			append_dev(div30, h210);
    			append_dev(div30, t78);
    			append_dev(div30, p11);
    			append_dev(section4, t80);
    			append_dev(section4, form);
    			append_dev(form, div41);
    			append_dev(div41, div33);
    			append_dev(div33, div31);
    			append_dev(div31, input0);
    			append_dev(div33, t81);
    			append_dev(div33, div32);
    			append_dev(div32, input1);
    			append_dev(div41, t82);
    			append_dev(div41, div36);
    			append_dev(div36, div34);
    			append_dev(div34, input2);
    			append_dev(div36, t83);
    			append_dev(div36, div35);
    			append_dev(div35, input3);
    			append_dev(div41, t84);
    			append_dev(div41, div38);
    			append_dev(div38, div37);
    			append_dev(div37, textarea);
    			append_dev(div41, t85);
    			append_dev(div41, div40);
    			append_dev(div40, div39);
    			append_dev(div39, button);
    			append_dev(button, input4);
    			insert_dev(target, t86, anchor);
    			insert_dev(target, div42, anchor);
    			append_dev(div42, p12);
    			insert_dev(target, t88, anchor);
    			insert_dev(target, div43, anchor);
    			append_dev(div43, ul1);
    			append_dev(ul1, li1);
    			append_dev(li1, a6);
    			append_dev(ul1, t90);
    			append_dev(ul1, li2);
    			append_dev(li2, a7);
    			append_dev(ul1, t92);
    			append_dev(ul1, li3);
    			append_dev(li3, a8);
    			append_dev(ul1, t94);
    			append_dev(ul1, li4);
    			append_dev(li4, a9);
    			append_dev(ul1, t96);
    			append_dev(ul1, li5);
    			append_dev(li5, a10);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*click_handler*/ ctx[1], false, false, false),
    					listen_dev(a6, "click", /*click_handler_1*/ ctx[2], false, false, false),
    					listen_dev(a7, "click", /*click_handler_2*/ ctx[3], false, false, false),
    					listen_dev(a8, "click", /*click_handler_3*/ ctx[4], false, false, false),
    					listen_dev(a9, "click", /*click_handler_4*/ ctx[5], false, false, false),
    					listen_dev(a10, "click", /*click_handler_5*/ ctx[6], false, false, false),
    					listen_dev(div43, "click", /*click_handler_6*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*active*/ 1) {
    				toggle_class(div0, "active", /*active*/ ctx[0]);
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
    				toggle_class(a9, "active", /*active*/ ctx[0]);
    			}

    			if (dirty & /*active*/ 1) {
    				toggle_class(a10, "active", /*active*/ ctx[0]);
    			}

    			if (dirty & /*active*/ 1) {
    				toggle_class(div43, "active", /*active*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(section1);
    			if (detaching) detach_dev(t26);
    			if (detaching) detach_dev(section2);
    			if (detaching) detach_dev(t60);
    			if (detaching) detach_dev(section3);
    			if (detaching) detach_dev(t76);
    			if (detaching) detach_dev(section4);
    			if (detaching) detach_dev(t86);
    			if (detaching) detach_dev(div42);
    			if (detaching) detach_dev(t88);
    			if (detaching) detach_dev(div43);
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
    	let googleanalytics;
    	let t;
    	let home;
    	let current;

    	googleanalytics = new GoogleAnalytics({
    			props: { properties: ["G-WQV15FT6HQ"] },
    			$$inline: true
    		});

    	home = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(googleanalytics.$$.fragment);
    			t = space();
    			create_component(home.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(googleanalytics, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(googleanalytics.$$.fragment, local);
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(googleanalytics.$$.fragment, local);
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(googleanalytics, detaching);
    			if (detaching) detach_dev(t);
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

    	$$self.$capture_state = () => ({ GoogleAnalytics, Home });
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
