#!/usr/bin/env node
"use strict";
function require( path ){ return $node[ path ] };

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;

;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = self;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom = $mol_dom_context;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_style_attach(id, text) {
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        const elid = `$mol_style_attach:${id}`;
        let el = doc.getElementById(elid);
        if (!el) {
            el = doc.createElement('style');
            el.id = elid;
            doc.head.appendChild(el);
        }
        if (el.innerHTML != text)
            el.innerHTML = text;
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise extends Promise {
        done;
        fail;
        constructor(executor) {
            let done;
            let fail;
            super((d, f) => {
                done = d;
                fail = f;
                executor?.(d, f);
            });
            this.done = done;
            this.fail = fail;
        }
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise_blocker extends $mol_promise {
        static [Symbol.toStringTag] = '$mol_promise_blocker';
    }
    $.$mol_promise_blocker = $mol_promise_blocker;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS Units
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return `${value}%`; }
        static px(value) { return `${value}px`; }
        static mm(value) { return `${value}mm`; }
        static cm(value) { return `${value}cm`; }
        static Q(value) { return `${value}Q`; }
        static in(value) { return `${value}in`; }
        static pc(value) { return `${value}pc`; }
        static pt(value) { return `${value}pt`; }
        static cap(value) { return `${value}cap`; }
        static ch(value) { return `${value}ch`; }
        static em(value) { return `${value}em`; }
        static rem(value) { return `${value}rem`; }
        static ex(value) { return `${value}ex`; }
        static ic(value) { return `${value}ic`; }
        static lh(value) { return `${value}lh`; }
        static rlh(value) { return `${value}rlh`; }
        static vh(value) { return `${value}vh`; }
        static vw(value) { return `${value}vw`; }
        static vi(value) { return `${value}vi`; }
        static vb(value) { return `${value}vb`; }
        static vmin(value) { return `${value}vmin`; }
        static vmax(value) { return `${value}vmax`; }
        static deg(value) { return `${value}deg`; }
        static rad(value) { return `${value}rad`; }
        static grad(value) { return `${value}grad`; }
        static turn(value) { return `${value}turn`; }
        static s(value) { return `${value}s`; }
        static ms(value) { return `${value}ms`; }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    /**
     * CSS Functions
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static linear_gradient(value) {
            return new $mol_style_func('linear-gradient', value);
        }
        static radial_gradient(value) {
            return new $mol_style_func('radial-gradient', value);
        }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name, defaultValue) {
            return new $mol_style_func('var', defaultValue ? [name, defaultValue] : name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
        static linear(...breakpoints) {
            return new $mol_style_func("linear", breakpoints.map((e) => Array.isArray(e)
                ? String(e[0]) +
                    " " +
                    (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
                : String(e)));
        }
        static cubic_bezier(x1, y1, x2, y2) {
            return new $mol_style_func('cubic-bezier', [x1, y1, x2, y2]);
        }
        static steps(value, step_position) {
            return new $mol_style_func('steps', [value, step_position]);
        }
        static blur(value) {
            return new $mol_style_func('blur', value ?? "");
        }
        static brightness(value) {
            return new $mol_style_func('brightness', value ?? "");
        }
        static contrast(value) {
            return new $mol_style_func('contrast', value ?? "");
        }
        static drop_shadow(color, x_offset, y_offset, blur_radius) {
            return new $mol_style_func("drop-shadow", blur_radius
                ? [color, x_offset, y_offset, blur_radius]
                : [color, x_offset, y_offset]);
        }
        static grayscale(value) {
            return new $mol_style_func('grayscale', value ?? "");
        }
        static hue_rotate(value) {
            return new $mol_style_func('hue-rotate', value ?? "");
        }
        static invert(value) {
            return new $mol_style_func('invert', value ?? "");
        }
        static opacity(value) {
            return new $mol_style_func('opacity', value ?? "");
        }
        static sepia(value) {
            return new $mol_style_func('sepia', value ?? "");
        }
        static saturate(value) {
            return new $mol_style_func('saturate', value ?? "");
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Create record of CSS variables. */
    function $mol_style_prop(prefix, keys) {
        const record = keys.reduce((rec, key) => {
            rec[key] = $mol_style_func.vary(`--${prefix}_${key}`);
            return rec;
        }, {});
        return record;
    }
    $.$mol_style_prop = $mol_style_prop;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    $.$mol_theme = $mol_style_prop('mol_theme', [
        'back',
        'hover',
        'card',
        'current',
        'special',
        'text',
        'control',
        'shade',
        'line',
        'focus',
        'field',
        'image',
        'spirit',
        'hue',
        'hue_spread',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 240deg;\n\t--mol_theme_hue_spread: 90deg;\n\tcolor-scheme: dark light;\n}\n\nbody, :where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n\t--mol_theme_spirit: hsl( 0deg, 0%, 0%, .75 );\n\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 10% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 20%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 8%, .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 80% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 60%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 65% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 60%, 65% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 60%, 65% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 60%, 65% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\t\n\t--mol_theme_back: oklch( 20% .03 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 30% .05 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 15% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 80% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 60% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 80% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 70% .1 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 70% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 70% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl( 0deg, 0%, 100%, .75 );\n\t\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 92% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 100%, .5 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 100%, .75 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 0% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 40%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 40% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 80%, 30% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 30% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 30% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t--mol_theme_back: oklch( 92% .01 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 99% .01 var(--mol_theme_hue) / .5 );\n\t--mol_theme_field: oklch( 100% 0 var(--mol_theme_hue) / .5 );\n\t--mol_theme_hover: oklch( 50% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 20% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 50% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 60% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 40% .15 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 50% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 50% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 25% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .1 var(--mol_theme_hue) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 85% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 98% .03 var(--mol_theme_hue) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 35% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 45% .15 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 83% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n\n");
})($ || ($ = {}));

;
"use strict";
// namespace $ {
// 	$mol_style_attach( '$mol_theme_lights', `:root { --mol_theme_back: oklch( ${ $$.$mol_lights() ? 92 : 20 }% .01 var(--mol_theme_hue) ) }` )
// }

;
"use strict";
var $;
(function ($) {
    /**
     * Gap in CSS
     * @see https://page.hyoo.ru/#!=msdb74_bm7nsq
     */
    $.$mol_gap = $mol_style_prop('mol_gap', [
        'page',
        'block',
        'text',
        'emoji',
        'round',
        'space',
        'blur',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_page: 3rem;\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_emoji: .5rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    /**
     * JSX adapter that makes DOM tree.
     * Generates global unique ids for every DOM-element by components tree with ids.
     * Ensures all local ids are unique.
     * Can reuse an existing nodes by GUIDs when used inside [`mol_jsx_attach`](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/attach).
     */
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[String(Elem)] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[String(Elem)] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                if (typeof node[key] === 'string')
                    node[key] = props[key];
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    /**
     * Proxy that delegates all to lazy returned target.
     *
     * 	$mol_delegate( Array.prototype , ()=> fetch_array() )
     */
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object' && typeof having !== 'function')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error; /// Use 'Never Pause Here' breakpoint in DevTools or simply blackbox this script
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_key_handle = Symbol.for('$mol_key_handle');
    $.$mol_key_store = new WeakMap();
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if (!Symbol.dispose)
        Symbol.dispose = Symbol('Symbol.dispose');
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || this.constructor.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
        }
        static toJSON() {
            return this.toString();
        }
        static [$mol_key_handle]() {
            return this.toString();
        }
        destructor() { }
        static destructor() { }
        [Symbol.dispose]() {
            this.destructor();
        }
        //[ Symbol.toPrimitive ]( hint: string ) {
        //	return hint === 'number' ? this.valueOf() : this.toString()
        //}
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '<>';
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Generates unique identifier. */
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Special status statuses. */
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        /** Update required. */
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        /** Some of (transitive) pub update required. */
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        /** Actual state but may be dropped. */
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        /** State will never be changed. */
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Collects subscribers in compact array. 28B
     */
    class $mol_wire_pub extends Object {
        constructor(id = `$mol_wire_pub:${$mol_guid()}`) {
            super();
            this[Symbol.toStringTag] = id;
        }
        [Symbol.toStringTag];
        data = [];
        // Derived objects should be Arrays.
        static get [Symbol.species]() {
            return Array;
        }
        /**
         * Index of first subscriber.
         */
        sub_from = 0; // 4B
        /**
         * All current subscribers.
         */
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        /**
         * Has any subscribers or not.
         */
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        /**
         * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
         */
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        /**
         * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
         */
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.length = end;
            if (end === this.sub_from)
                this.reap();
        }
        /**
         * Called when last sub was unsubscribed.
         **/
        reap() { }
        /**
         * Autowire this publisher with current subscriber.
         **/
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        /**
         * Enforce actualization. Should not throw errors.
         */
        fresh() { }
        /**
         * Allow to put data to caches in the subtree.
         */
        complete() { }
        get incompleted() {
            return false;
        }
        /**
         * Notify subscribers about self changes.
         */
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant, this.data[i + 1]);
            }
        }
        /**
         * Moves peer from one position to another. Doesn't clear data at old position!
         */
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        /**
         * Updates self position in the peer.
         */
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    /**
     * When fulfilled, all publishers are promoted to this subscriber on access to its.
     */
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    /**
     * Affection queue. Used to prevent accidental stack overflow on emit.
     */
    $.$mol_wire_affected = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    // https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview#
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    function $mol_dev_format_button(label, click) {
        return $mol_dev_format_auto({
            [$.$mol_dev_format_head]() {
                return $.$mol_dev_format_span({ color: 'cornflowerblue' }, label);
            },
            [$.$mol_dev_format_body]() {
                Promise.resolve().then(click);
                return $.$mol_dev_format_span({});
            }
        });
    }
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                try {
                    return val[$.$mol_dev_format_head]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            if (val instanceof Error) {
                return $.$mol_dev_format_span({}, $mol_dev_format_native(val), ' ', $mol_dev_format_button('throw', () => $mol_fail_hidden(val)));
            }
            if (val instanceof Promise) {
                return $.$mol_dev_format_shade($mol_dev_format_native(val), ' ', val[Symbol.toStringTag] ?? '');
            }
            if (Symbol.toStringTag in val) {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: (val, config = false) => {
            if (config)
                return false;
            if (!val)
                return false;
            // if( Error.isError( val ) ) true
            if (val[$.$mol_dev_format_body])
                return true;
            return false;
        },
        body: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_body in val) {
                try {
                    return val[$.$mol_dev_format_body]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            // if( Error.isError( val ) ) {
            // 	return $mol_dev_format_native( val )
            // }
            return null;
        },
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        // if( ![ 'object', 'function', 'symbol' ].includes( typeof obj )  ) return obj
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    $.$mol_dev_format_span = $mol_dev_format_element.bind(null, 'span');
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $.$mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $.$mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $.$mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $.$mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-left': '13px'
    });
    class Stack extends Array {
        // [ Symbol.toPrimitive ]() {
        // 	return this.toString()
        // }
        match(...args) {
            return this.toString().match(...args);
        }
        split(...args) {
            return this.toString().split(...args);
        }
        toString() {
            return this.join('\n');
        }
    }
    class Call extends Object {
        type;
        function;
        method;
        eval;
        source;
        offset;
        pos;
        object;
        flags;
        [Symbol.toStringTag];
        constructor(call) {
            super();
            this.type = call.getTypeName() ?? '';
            this.function = call.getFunctionName() ?? '';
            this.method = call.getMethodName() ?? '';
            if (this.method === this.function)
                this.method = '';
            // const func = c.getFunction()
            this.pos = [call.getEnclosingLineNumber() ?? 0, call.getEnclosingColumnNumber() ?? 0];
            this.eval = call.getEvalOrigin() ?? '';
            this.source = call.getScriptNameOrSourceURL() ?? '';
            this.object = call.getThis();
            this.offset = call.getPosition();
            const flags = [];
            if (call.isAsync())
                flags.push('async');
            if (call.isConstructor())
                flags.push('constructor');
            if (call.isEval())
                flags.push('eval');
            if (call.isNative())
                flags.push('native');
            if (call.isPromiseAll())
                flags.push('PromiseAll');
            if (call.isToplevel())
                flags.push('top');
            this.flags = flags;
            const type = this.type ? this.type + '.' : '';
            const func = this.function || '<anon>';
            const method = this.method ? ' [' + this.method + '] ' : '';
            this[Symbol.toStringTag] = `${type}${func}${method}`;
        }
        [Symbol.toPrimitive]() {
            return this.toString();
        }
        toString() {
            const object = this.object || '';
            const label = this[Symbol.toStringTag];
            const source = `${this.source}:${this.pos.join(':')} #${this.offset}`;
            return `\tat ${object}${label} (${source})`;
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_div({}, $mol_dev_format_native(this), $.$mol_dev_format_shade(' '), ...this.object ? [
                $mol_dev_format_native(this.object),
            ] : [], ...this.method ? [$.$mol_dev_format_shade(' ', ' [', this.method, ']')] : [], $.$mol_dev_format_shade(' ', this.flags.join(', ')));
        }
    }
    Error.prepareStackTrace ??= (error, stack) => new Stack(...stack.map(call => new Call(call)));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Publisher that can auto collect other publishers. 32B
     *
     * 	P1 P2 P3 P4 S1 S2 S3
     * 	^           ^
     * 	pubs_from   subs_from
     */
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0; // 4B
        cursor = $mol_wire_cursor.stale; // 4B
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
            }
            this.data.length = this.sub_from;
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.stale;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let end = this.data.length;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                end -= 2;
                if (this.sub_from <= end)
                    this.peer_move(end, cursor);
            }
            this.data.length = end;
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale, pos = -1) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
            // if( pos >= 0 && pos < this.sub_from - 2 ) {
            // 	const pub = this.data[ pos ] as $mol_wire_pub
            // 	if( pub instanceof $mol_wire_task ) return
            // 	for(
            // 		let cursor = this.pub_from;
            // 		cursor < this.sub_from;
            // 		cursor += 2
            // 	) {
            // 		const pub = this.data[ cursor ] as $mol_wire_pub
            // 		if( pub instanceof $mol_wire_task ) {
            // 			pub.destructor()
            // 		}
            // 	}
            // }
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        /**
         * Is subscribed to any publisher or not.
         */
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        static promise = null;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            if (!$mol_after_tick.promise)
                $mol_after_tick.promise = Promise.resolve().then(() => {
                    $mol_after_tick.promise = null;
                });
            $mol_after_tick.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        try {
            return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function';
        }
        catch {
            return false;
        }
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const wrappers = new WeakMap();
    /**
     * Suspendable task with support both sync/async api.
     *
     * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
     * 	^           ^           ^
     * 	args_from   pubs_from   subs_from
     **/
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_tick(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            // Sync whole fiber graph
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            // Collect garbage
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super(id);
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
            return this;
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_owning_check(this, this.cache)
                ? $mol_dev_format_shade(cursor)
                : $mol_dev_format_shade(this[Symbol.toStringTag], cursor), $mol_dev_format_auto(this.cache));
        }
        [$mol_dev_format_body]() { return null; }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result).then(a => a);
                    }
                    else {
                        const put = (res) => {
                            if (this.cache === result)
                                this.put(res);
                            return res;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        wrappers.set(result, result);
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result);
                    }
                    else {
                        const put = (v) => {
                            if (this.cache === result)
                                this.absorb();
                            return v;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
            return this;
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        /**
         * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
         * Should be called inside SuspenseAPI consumer (ie fiber).
         */
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        /**
         * Asynchronous execution.
         * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
         */
        async async_raw() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await Promise.race([this.cache, this.step()]);
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    // never ends on destructed fiber
                    await new Promise(() => { });
                }
            }
        }
        async() {
            const promise = this.async_raw();
            if (!promise.destructor)
                promise.destructor = () => this.destructor();
            return promise;
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    setTimeout(() => sub.destructor());
                };
            });
        }
        destructor() {
            super.destructor();
            $mol_wire_fiber.planning.delete(this);
            if (!$mol_owning_check(this, this.cache))
                return;
            try {
                this.cache.destructor();
            }
            catch (result) {
                if ($mol_promise_like(result)) {
                    const error = new Error(`Promise in ${this}.destructor()`);
                    Object.defineProperty(result, 'stack', { get: () => error.stack });
                }
                $mol_fail_hidden(result);
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    /** Returns string key for any value. */
    function $mol_key(value) {
        primitives: {
            if (typeof value === 'bigint')
                return value.toString() + 'n';
            if (typeof value === 'symbol')
                return `Symbol(${value.description})`;
            if (!value)
                return JSON.stringify(value); // 0, null, ""
            if (typeof value !== 'object' && typeof value !== 'function')
                return JSON.stringify(value); // boolean, number, string
        }
        caching: {
            let key = $mol_key_store.get(value);
            if (key)
                return key;
        }
        objects: {
            if (value instanceof TypedArray) {
                return `${value[Symbol.toStringTag]}([${[...value].map(v => $mol_key(v))}])`;
            }
            if (Array.isArray(value))
                return `[${value.map(v => $mol_key(v))}]`;
            if (value instanceof RegExp)
                return value.toString();
            if (value instanceof Date)
                return `Date(${value.valueOf()})`;
        }
        structures: {
            const proto = Reflect.getPrototypeOf(value);
            if (!proto || !Reflect.getPrototypeOf(proto)) {
                return `{${Object.entries(value).map(([k, v]) => JSON.stringify(k) + ':' + $mol_key(v))}}`;
            }
        }
        handlers: {
            if ($mol_key_handle in value) {
                return value[$mol_key_handle]();
            }
        }
        containers: {
            const key = JSON.stringify('#' + $mol_guid());
            $mol_key_store.set(value, key);
            return key;
        }
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_object2 {
        task;
        static _promise = null;
        static get promise() {
            if (this._promise)
                return this._promise;
            return this._promise = new Promise(done => {
                const complete = () => {
                    this._promise = null;
                    done();
                };
                if (typeof requestAnimationFrame === 'function') {
                    requestAnimationFrame(complete);
                }
                else {
                    setTimeout(complete, 16);
                }
            });
        }
        cancelled = false;
        promise;
        constructor(task) {
            super();
            this.task = task;
            this.promise = $mol_after_frame.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    /**
     * Deeply compares two values. Returns true if equal.
     * Define `Symbol.toPrimitive` to customize.
     */
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && $mol_compare_deep(left.stack, right.stack);
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap();
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        left_cache.set(right, true);
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        if (left instanceof DataView)
            return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, right.byteOffset, right.byteLength));
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Log begin of collapsed group only when some logged inside, returns func to close group */
    function $mol_log3_area_lazy(event) {
        const self = this.$;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_log3_web_make(level, color) {
        return function $mol_log3_logger(event) {
            const pending = this.$mol_log3_stack.pop();
            if (pending)
                pending();
            let tpl = '%c';
            const chunks = Object.entries(event);
            for (let i = 0; i < chunks.length; ++i) {
                tpl += (typeof chunks[i][1] === 'string') ? '%s: %s\n' : '%s: %o\n';
            }
            const style = `color:${color};font-weight:bolder`;
            this.console[level](tpl.trim(), style, ...[].concat(...chunks));
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_web_make = $mol_log3_web_make;
    $.$mol_log3_come = $mol_log3_web_make('info', 'royalblue');
    $.$mol_log3_done = $mol_log3_web_make('info', 'forestgreen');
    $.$mol_log3_fail = $mol_log3_web_make('error', 'orangered');
    $.$mol_log3_warn = $mol_log3_web_make('warn', 'goldenrod');
    $.$mol_log3_rise = $mol_log3_web_make('log', 'magenta');
    $.$mol_log3_area = $mol_log3_web_make('group', 'cyan');
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** One-shot fiber */
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                let cause = '';
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.task !== task) {
                        cause = 'task';
                        break reuse;
                    }
                    if (existen.host !== host) {
                        cause = 'host';
                        break reuse;
                    }
                    if (!$mol_compare_deep(existen.args, args)) {
                        cause = 'args';
                        break reuse;
                    }
                    return existen;
                }
                const key = (host?.[Symbol.toStringTag] ?? host) + ('.' + task.name + '<#>');
                const next = new $mol_wire_task(key, task, host, args);
                // Disabled because non-idempotency is required for try-catch
                if (existen?.temp) {
                    $$.$mol_log3_warn({
                        place: '$mol_wire_task',
                        message: `Different ${cause} on restart`,
                        sub,
                        prev: existen,
                        next,
                        hint: 'Maybe required additional memoization',
                    });
                }
                return next;
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
        destructor() {
            super.destructor();
            this.cursor = $mol_wire_cursor.final;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber.
     */
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const catched = new WeakSet();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.has(error))
            return false;
        catched.add(error);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_try(handler) {
        try {
            return handler();
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    $.$mol_try = $mol_try;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let error;
    let result;
    let handler;
    /// Debugger will stop at exceptions but exception will be returned normally
    function $mol_try_web(handler2) {
        handler = handler2;
        error = undefined;
        result = undefined;
        self.dispatchEvent(new Event('$mol_try'));
        const error2 = error;
        const result2 = result;
        error = undefined;
        result = undefined;
        return error2 || result2;
    }
    $.$mol_try_web = $mol_try_web;
    $.$mol_try = $mol_try_web;
    self.addEventListener('$mol_try', (event) => {
        result = handler();
    }, true);
    self.addEventListener('error', (event) => {
        error = event.error;
    }, true);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        $mol_try(() => { $mol_fail_hidden(error); });
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Long-living fiber. */
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = prefix + ('.' + task.name + '<>');
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key_str = $mol_key(key);
            if (dict) {
                const existen = dict.get(key_str);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const id = prefix + ('.' + task.name) + ('<' + key_str.replace(/^"|"$/g, "'") + '>');
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(key_str, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        /**
         * Update atom value through another temp fiber.
         */
        resync(args) {
            // enforce pulling tasks abort
            for (let cursor = this.pub_from; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                if (pub && pub instanceof $mol_wire_task) {
                    pub.destructor();
                }
            }
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                const key = $mol_key(this.args[0]);
                const map = (this.host ?? this.task)[this.field()];
                if (!map.has(key))
                    this.$.$mol_log3_warn({
                        place: this,
                        message: 'Absent key on destruction',
                        hint: 'Check for $mol_key(key) is not changed',
                    });
                map.delete(key);
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Reactive memoizing multiplexed property decorator. */
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Reactive memoizing solo property decorator from [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem
     * name(next?: string) {
     * 	return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem = $mol_wire_solo;
    /**
     * Reactive memoizing multiplexed property decorator [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem_key
     * name(id: number, next?: string) {
     *  return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            this.resizes();
            return {
                width: self.innerWidth,
                height: self.innerHeight,
            };
        }
        static resizes(next) { return next; }
    }
    __decorate([
        $mol_mem
    ], $mol_window, "size", null);
    __decorate([
        $mol_mem
    ], $mol_window, "resizes", null);
    $.$mol_window = $mol_window;
    self.addEventListener('resize', event => $mol_window.resizes(event));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guard_defined(value) {
        return value !== null && value !== undefined;
    }
    $.$mol_guard_defined = $mol_guard_defined;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element?.shadowRoot) {
                element = element.shadowRoot.activeElement;
            }
            while (element) {
                parents.push(element);
                const parent = element.parentNode;
                if (parent instanceof ShadowRoot)
                    element = parent.host;
                else
                    element = parent;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
    * Key names code for hotkey
    * @see [mol_hotkey](../../hotkey/hotkey.view.ts)
    */
    let $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["slashBackLeft"] = 226] = "slashBackLeft";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if ($mol_dom_context.document) {
        function focus(event) {
            const target = event.target;
            if (target?.shadowRoot)
                watch(target.shadowRoot);
            $mol_view_selection.focused($mol_maybe(target), 'notify');
        }
        function watch(root) {
            root.removeEventListener('focus', focus, true);
            root.addEventListener('focus', focus, true);
        }
        watch($mol_dom_context.document);
        $mol_dom.document.addEventListener('keydown', event => {
            if (!event.altKey)
                return;
            const self = $mol_view_selection.focused()[0];
            if (!self)
                return;
            switch (event.keyCode) {
                case $mol_keyboard_code.down:
                    var vert = 1, hor = 0;
                    break;
                case $mol_keyboard_code.up:
                    var vert = -1, hor = 0;
                    break;
                case $mol_keyboard_code.left:
                    var hor = -1, vert = 0;
                    break;
                case $mol_keyboard_code.right:
                    var hor = 1, vert = 0;
                    break;
                default: return;
            }
            event.preventDefault();
            const self_rect = self.getBoundingClientRect();
            const center_hor = (self_rect.left + self_rect.right) / 2;
            const center_vert = (self_rect.top + self_rect.bottom) / 2;
            const all = [...$mol_dom.document.querySelectorAll(':where( [role="button"], [role="checkbox"], input, button, a ):not([disabled])')]
                .map(el => {
                const rect = el.getBoundingClientRect();
                const dist = (Math.max(0, center_hor - rect.right) + Math.max(0, rect.left - center_hor)) * vert * vert
                    + (Math.max(0, center_vert - rect.bottom) + Math.max(0, rect.top - center_vert)) * hor * hor;
                return [el, rect, dist];
            })
                .filter(([el, rect]) => {
                if (el === self)
                    return false;
                if (vert > 0 && rect.top < self_rect.bottom)
                    return false;
                if (vert < 0 && rect.bottom > self_rect.top)
                    return false;
                if (hor > 0 && rect.left < self_rect.right)
                    return false;
                if (hor < 0 && rect.right > self_rect.left)
                    return false;
                return true;
            })
                .sort(([, one, dist1], [, two, dist2]) => {
                return (dist1 - dist2) || ((one.top - two.top) * vert + (one.left - two.left) * hor);
            });
            const target = all[0]?.[0];
            target?.focus();
        });
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            const fun = function (next) {
                if (next === undefined && store.has(this ?? fun))
                    return store.get(this ?? fun);
                const val = task.call(this, next) ?? next;
                store.set(this ?? fun, val);
                return val;
            };
            Reflect.defineProperty(fun, 'name', { value: task.name + ' ' });
            return fun;
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Run code without state changes */
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Real-time refresh current atom.
     * Don't use if possible. May reduce performance.
     */
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is required for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Returns closure that returns constant value.
     * @example
     * const rnd = $mol_const( Math.random() )
     */
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, '()=> ', $mol_dev_format_auto(value));
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Disable reaping of current subscriber
     */
    function $mol_wire_solid() {
        let current = $mol_wire_auto();
        if (current.temp)
            current = current.host;
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === undefined) {
                continue;
            }
            else if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events, passive = false) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_message(error) {
        return String((error instanceof Error ? error.message : null) || error) || 'Unknown';
    }
    $.$mol_error_message = $mol_error_message;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
            if (typeof val === 'number') {
                style.setProperty(kebab(name), `${val}px`);
            }
            else {
                style.setProperty(kebab(name), val);
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            if (val === el[key])
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Convert a pseudo-synchronous (Suspense API) API to an explicit asynchronous one (for integrating with external systems). */
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "@view-transition {\n\tnavigation: auto;\n}\n\n[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform, scale, translate, rotate;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n\ttext-wrap-style: pretty;\n}\t\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: system-ui, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\t/* background: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text); */\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n\t/*overscroll-behavior: contain; /** Disable navigation gestures **/\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"], [mol_view_error=\"$mol_promise_blocker\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"$mol_promise_blocker\"]),\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps(20,end) infinite;\n}\n");
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    /**
     * The base class for all visual components. It provides the infrastructure for reactive lazy rendering, handling exceptions.
     * @see https://mol.hyoo.ru/#!section=docs/=vv2nig_s5zr0f
     */
    /// Reactive statefull lazy ViewModel
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        static roots() {
            return [...$mol_dom.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])')].map((node, index) => {
                const name = node.getAttribute('mol_view_root');
                const View = this.$[name];
                if (!View) {
                    $mol_fail_log(new Error(`Autobind unknown view class`, { cause: { name } }));
                    return null;
                }
                const view = View.Root(index);
                view.dom_node(node);
                return view;
            }).filter($mol_guard_defined);
        }
        static auto() {
            const roots = this.roots();
            if (!roots.length)
                return;
            for (const root of roots) {
                try {
                    root.dom_tree();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
            }
            try {
                document.title = roots[0].title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            descr: try {
                const descr = roots[0].hint();
                if (!descr)
                    break descr;
                const head = $mol_dom.document.head;
                let node = head.querySelector('meta[name="description"]');
                if (node)
                    node.content = descr;
                else
                    head.append($mol_jsx("meta", { name: "description", content: descr }));
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        title() {
            return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
        }
        hint() {
            return '';
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        /// Name of element that created when element not found in DOM
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        /// NameSpace of element that created when element not found in DOM
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        /// Raw child views
        sub() {
            return [];
        }
        /// Visible sub views with defined ambient context
        /// Render all by default
        sub_visible() {
            return this.sub();
        }
        /// Minimal width that used for lazy rendering
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        /// Minimal height that used for lazy rendering
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null; // don't touch DOM to prevent instant reflow
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom }; // pick to optimize compare
            }
        }
        dom_id() {
            return this.toString().replace(/</g, '(').replace(/>/g, ')').replaceAll(/"/g, "'");
        }
        dom_node_external(next) {
            const node = next ?? $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            return node;
        }
        dom_node(next) {
            $mol_wire_solid();
            const node = this.dom_node_external(next);
            $mol_dom_render_attributes(node, this.attr_static());
            const events = this.event_async();
            $mol_dom_render_events(node, events);
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                const mol_view_error = $mol_promise_like(error)
                    ? error.constructor[Symbol.toStringTag] ?? 'Promise'
                    : error.name || error.constructor.name;
                $mol_dom_render_attributes(node, { mol_view_error });
                if ($mol_promise_like(error))
                    break render;
                try {
                    ;
                    node.innerText = this.$.$mol_error_message(error).replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            const attr = this.attr();
            const style = this.style();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return [];
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                if (current.constructor.name !== classes.at(-1)?.name) {
                    classes.push(current.constructor);
                }
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        static _view_names;
        static view_names(suffix) {
            let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value;
            if (!cache)
                cache = this._view_names = new Map;
            const cached = cache.get(suffix);
            if (cached)
                return cached;
            const names = [];
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            for (const Class of this.view_classes()) {
                if (suffix in Class.prototype)
                    names.push(this.$.$mol_func_name(Class) + suffix2);
                else
                    break;
            }
            cache.set(suffix, names);
            return names;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (!(owner?.host instanceof $mol_view))
                return names;
            const suffix = owner.task.name.trim();
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            names.push(...owner.host.constructor.view_names(suffix));
            for (let prefix of owner.host.view_names_owned()) {
                names.push(prefix + suffix2);
            }
            return names;
        }
        view_names() {
            const names = new Set();
            for (let name of this.view_names_owned())
                names.add(name);
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (name)
                    names.add(name);
            }
            return names;
        }
        theme(next) {
            return next;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                mol_theme: this.theme(),
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return { ...$mol_wire_async(this.event()) };
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        /** Deep search view by predicate. */
        *view_find(check, path = []) {
            if (path.length === 0 && check(this))
                return yield [this];
            try {
                const checked = new Set();
                const sub = this.sub();
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (!check(item))
                        continue;
                    checked.add(item);
                    yield [...path, this, item];
                }
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (checked.has(item))
                        continue;
                    yield* item.view_find(check, [...path, this]);
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        /** Renders path of views to DOM. */
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        /** Renders view to DOM and scroll to it. */
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            try {
                this.dom_final();
            }
            finally {
                view.dom_node().scrollIntoView({ block: align });
            }
        }
        bring() {
            const win = this.$.$mol_dom_context;
            if (win.parent !== win.self && !win.document.hasFocus())
                return;
            // new this.$.$mol_after_frame( ()=> {
            // 	this.dom_node().scrollIntoView({ block: 'start', inline: 'nearest' })
            // } )
            new this.$.$mol_after_timeout(0, () => {
                this.focused(true);
            });
        }
        destructor() {
            const node = $mol_wire_probe(() => this.dom_node());
            if (!node)
                return;
            const events = $mol_wire_probe(() => this.event_async());
            if (!events)
                return;
            for (let event_name in events) {
                node.removeEventListener(event_name, events[event_name]);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_id", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "event_async", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "roots", null);
    __decorate([
        $mol_mem
    ], $mol_view, "auto", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_dom_context.document?.addEventListener('DOMContentLoaded', () => $mol_view.auto(), { once: true });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_persist = $mol_wire_solid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const factories = new WeakMap();
    function factory(val) {
        let make = factories.get(val);
        if (make)
            return make;
        make = $mol_func_name_from((...args) => new val(...args), val);
        factories.set(val, make);
        return make;
    }
    const getters = new WeakMap();
    function get_prop(host, field) {
        let props = getters.get(host);
        let get_val = props?.[field];
        if (get_val)
            return get_val;
        get_val = (next) => {
            if (next !== undefined)
                host[field] = next;
            return host[field];
        };
        Object.defineProperty(get_val, 'name', { value: field });
        if (!props) {
            props = {};
            getters.set(host, props);
        }
        props[field] = get_val;
        return get_val;
    }
    /**
     * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                let val = obj[field];
                const temp = $mol_wire_task.getter(typeof val === 'function' ? val : get_prop(obj, field));
                if (typeof val !== 'function')
                    return temp(obj, []).sync();
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            set(obj, field, next) {
                const temp = $mol_wire_task.getter(get_prop(obj, field));
                temp(obj, [next]).sync();
                return true;
            },
            construct(obj, args) {
                const temp = $mol_wire_task.getter(factory(obj));
                return temp(obj, args).sync();
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                return temp(self, args).sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wait_user_async() {
        return new Promise(done => $mol_dom.addEventListener('click', function onclick() {
            $mol_dom.removeEventListener('click', onclick);
            done(null);
        }));
    }
    $.$mol_wait_user_async = $mol_wait_user_async;
    function $mol_wait_user() {
        return this.$mol_wire_sync(this).$mol_wait_user_async();
    }
    $.$mol_wait_user = $mol_wait_user;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_storage extends $mol_object2 {
        static native() {
            return this.$.$mol_dom_context.navigator.storage ?? {
                persisted: async () => false,
                persist: async () => false,
                estimate: async () => ({}),
                getDirectory: async () => null,
            };
        }
        static persisted(next, cache) {
            $mol_mem_persist();
            if (cache)
                return Boolean(next);
            const native = this.native();
            if (next && !$mol_mem_cached(() => this.persisted())) {
                this.$.$mol_wait_user_async()
                    .then(() => native.persist())
                    .then(actual => {
                    setTimeout(() => this.persisted(actual, 'cache'), 5000);
                    if (actual)
                        this.$.$mol_log3_done({ place: `$mol_storage`, message: `Persist: Yes` });
                    else
                        this.$.$mol_log3_fail({ place: `$mol_storage`, message: `Persist: No` });
                });
            }
            return next ?? $mol_wire_sync(native).persisted();
        }
        static estimate() {
            return $mol_wire_sync(this.native() ?? {}).estimate();
        }
        static dir() {
            return $mol_wire_sync(this.native()).getDirectory();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage, "native", null);
    __decorate([
        $mol_mem
    ], $mol_storage, "persisted", null);
    $.$mol_storage = $mol_storage;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null) {
                this.native().removeItem(key);
            }
            else {
                this.native().setItem(key, JSON.stringify(next));
                this.$.$mol_storage.persisted(true);
            }
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    self.addEventListener('storage', event => $.$mol_state_local.changes(event));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber from [mol_wire](../wire/README.md)
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_lock extends $mol_object {
        promise = null;
        async wait() {
            let next = () => { };
            let destructed = false;
            const task = $mol_wire_auto();
            if (!task)
                return next;
            const destructor = task.destructor.bind(task);
            task.destructor = () => {
                destructor();
                destructed = true;
                next();
            };
            let promise;
            do {
                promise = this.promise;
                await promise;
                if (destructed)
                    return next;
            } while (promise !== this.promise);
            this.promise = new Promise(done => { next = done; });
            return next;
        }
        grab() { return $mol_wire_sync(this).wait(); }
    }
    $.$mol_lock = $mol_lock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let buf = new Uint8Array(2 ** 12); // 4KB Mem Page
    /** Temporary buffer. Recursive usage isn't supported. */
    function $mol_charset_buffer(size) {
        if (buf.byteLength < size)
            buf = new Uint8Array(size);
        return buf;
    }
    $.$mol_charset_buffer = $mol_charset_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_charset_encode(str) {
        const buf = $mol_charset_buffer(str.length * 3);
        return buf.slice(0, $mol_charset_encode_to(str, buf));
    }
    $.$mol_charset_encode = $mol_charset_encode;
    function $mol_charset_encode_to(str, buf, from = 0) {
        let pos = from;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80) { // ASCII - 1 octet
                buf[pos++] = code;
            }
            else if (code < 0x800) { // 2 octet
                buf[pos++] = 0xc0 | (code >> 6);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else if (code < 0xd800 || code >= 0xe000) { // 3 octet
                buf[pos++] = 0xe0 | (code >> 12);
                buf[pos++] = 0x80 | ((code >> 6) & 0x3f);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else { // surrogate pair
                const point = ((code - 0xd800) << 10) + str.charCodeAt(++i) + 0x2400;
                buf[pos++] = 0xf0 | (point >> 18);
                buf[pos++] = 0x80 | ((point >> 12) & 0x3f);
                buf[pos++] = 0x80 | ((point >> 6) & 0x3f);
                buf[pos++] = 0x80 | (point & 0x3f);
            }
        }
        return pos - from;
    }
    $.$mol_charset_encode_to = $mol_charset_encode_to;
    function $mol_charset_encode_size(str) {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80)
                size += 1;
            else if (code < 0x800)
                size += 2;
            else if (code < 0xd800 || code >= 0xe000)
                size += 3;
            else
                size += 4;
        }
        return size;
    }
    $.$mol_charset_encode_size = $mol_charset_encode_size;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_transaction extends $mol_object {
        path() { return ''; }
        modes() { return []; }
        write(options) {
            throw new Error('Not implemented');
        }
        read() {
            throw new Error('Not implemented');
        }
        truncate(size) {
            throw new Error('Not implemented');
        }
        flush() {
            throw new Error('Not implemented');
        }
        close() {
            throw new Error('Not implemented');
        }
        destructor() {
            this.close();
        }
    }
    $.$mol_file_transaction = $mol_file_transaction;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_base extends $mol_object {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        exists_cut() { return this.exists(); }
        root() {
            const path = this.path();
            const base = this.constructor.base;
            // Если путь выше или равен base или если parent такойже как и this - считаем это корнем
            return base.startsWith(path) || this == this.parent();
        }
        stat(next, virt) {
            const path = this.path();
            const parent = this.parent();
            // Отслеживать проверку наличия родительской папки не стоит до корня диска
            // Лучше ограничить mam-ом
            if (!this.root()) {
                /*
                Если parent папка удалилась, надо ресетнуть все объекты в ней на любой глубине.
                Например, rm -rf с последующим git pull: parent папка может удалиться, потом создасться,
                а текущая папка успеет только удалиться до момента выполнения stat.
                Поэтому parent.exists() не запустит перевычисления, нужна именно parent.version()

                Однако, parent.version() меняется не только при удалении, будет ложное срабатывание
                С этим придется мириться, красивого решения пока нет.
                */
                parent.version();
            }
            parent.watcher();
            if (virt)
                return next ?? null;
            return next ?? this.info(path);
        }
        static changed = new Set;
        static frame = null;
        static changed_add(type, path) {
            if (/([\/\\]\.|___$)/.test(path))
                return;
            const file = this.relative(path.at(-1) === '/' ? path.slice(0, -1) : path);
            // console.log(type, path)
            // add (change): добавился файл - у parent надо обновить список sub, если он был заюзан
            // change, unlink (rename): обновился или удалился файл - ресетим
            // addDir (change), добавилась папка, у parent обновляем список директорий в sub
            // дочерние ресетим
            // unlinkDir (rename), удалилась папка, ресетим ее
            // stat у всех дочерних обновится сам, т.к. связан с parent.version()
            this.changed.add(file);
            if (!this.watching)
                return;
            // throttle, пока события поступают не сбрасываем.
            // аналог awaitWriteFinish из chokidar
            // интервалы между change-сообщениями модифицируемого файла должны быть меньше watch_debounce
            this.frame?.destructor();
            this.frame = new this.$.$mol_after_timeout(this.watch_debounce(), () => {
                if (!this.watching)
                    return;
                this.watching = false;
                $mol_wire_async(this).flush();
            });
        }
        /**
         * Должно быть больше, чем время между событиями от вотчера при записи внешним процессом.
         * Иначе запуск ресетов паралельно с изменением может привести к неконсистентности.
         */
        static watch_debounce() { return 500; }
        static flush() {
            // Пока flush работает, вотчер сюда не заходит, но может добавлять новые изменения
            // на каждом перезапуске они применятся
            // Пока run выполняется, изменения накапливаются, в конце run вызывается flush
            // Пока применяются изменения, run должен ожидать конца flush
            for (const file of this.changed) {
                const parent = file.parent();
                try {
                    if ($mol_wire_probe(() => parent.sub()))
                        parent.sub(null);
                    file.reset();
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        $mol_fail_log(error);
                }
            }
            this.changed.clear();
            this.watching = true;
            // this.watch_wd?.destructor()
            // this.watch_wd = null
        }
        static watching = true;
        static lock = new $mol_lock;
        static watch_off(path) {
            this.watching = false;
            // run должен ожидать конца flush
            this.flush();
            this.watching = false;
            /*
            watch запаздывает и событие может прилететь через 3 сек после окончания сайд эффекта
            поэтому добавляем папку, которую меняет side_effect
            Когда дойдет до выполнения flush, он ресетнет ее
            
            Иначе будут лишние срабатывания
            Например, удалили hyoo/board, watch ресетит и exists начинает отдавать false, срабатывает git clone
            Сразу после него событие addDir еще не успело прийти,
            на следующем перезапуске вызывается git pull, т.к.
            с точки зрения реактивной системы hyoo/board еще не существует.
            */
            this.changed.add(this.absolute(path));
        }
        // protected static watch_wd = null as null | $mol_after_timeout
        static unwatched(side_effect, affected_dir) {
            // ждем, пока выполнится предыдущий unwatched
            const unlock = this.lock.grab();
            this.watch_off(affected_dir);
            try {
                const result = side_effect();
                this.flush();
                unlock();
                return result;
            }
            catch (e) {
                if (!$mol_promise_like(e)) {
                    this.flush();
                    unlock();
                }
                $mol_fail_hidden(e);
            }
        }
        reset() {
            this.stat(null);
        }
        modified() { return this.stat()?.mtime ?? null; }
        version() {
            const next = this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
            // console.log('version', next, this.path())
            return next;
        }
        info(path) { return null; }
        ensure() { }
        drop() { }
        copy(to) { }
        read() { return new Uint8Array; }
        write(buffer) { }
        kids() {
            return [];
        }
        readable(opts) {
            return new ReadableStream;
        }
        writable(opts) {
            return new WritableStream;
        }
        // open( ... modes: readonly $mol_file_mode[] ) { return 0 }
        buffer(next) {
            // Если версия пустая - возвращаем пустой буфер
            let readed = new Uint8Array();
            if (next === undefined) {
                // Если меняется версия файла, буфер надо перечитать
                if (this.version())
                    readed = this.read();
            }
            const prev = $mol_mem_cached(() => this.buffer());
            const changed = prev === undefined || !$mol_compare_array(prev, next ?? readed);
            if (prev !== undefined && changed) {
                // Логируем, если повторно читаем/пишем и буфер поменялся
                this.$.$mol_log3_rise({
                    place: `$mol_file_node.buffer()`,
                    message: 'Changed',
                    path: this.relate(),
                });
            }
            if (next === undefined)
                return changed ? readed : prev;
            // Если буфер при записи не поменялся и файл не удаляли перед этим - не записываем новую версию.
            // Если записывать, это приведет к смене mtime и вотчер снова триггернется, даже если содержимое файла не поменялось.
            // В этом алгоритме есть изъян.
            // Если файл записали, потом отключили вотчер, кто-то из вне его поменял, потом включили вотчер, снова записали тот же буфер,
            // то буфер не запишется на диск, т.к. кэш не консистентен с диском.
            if (!changed && this.exists())
                return prev;
            this.parent().exists(true);
            this.stat(this.stat_make(next.length), 'virt');
            this.write(next);
            return next;
        }
        stat_make(size) {
            const now = new Date();
            return {
                type: 'file',
                size,
                atime: now,
                mtime: now,
                ctime: now,
            };
        }
        clone(to) {
            if (!this.exists())
                return null;
            const target = this.constructor.absolute(to);
            try {
                this.version();
                target.parent().exists(true);
                this.copy(to);
                target.reset();
                return target;
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    console.error(error);
                }
            }
            return null;
        }
        // static watch_root = ''
        // static watcher_warned = false
        watcher() {
            // const constructor = this.constructor as typeof $mol_file_base
            // if (! constructor.watcher_warned) {
            // 	console.warn(`${constructor}.watcher() not implemented`)
            // 	constructor.watcher_warned = true
            // }
            return {
                destructor() { }
            };
        }
        exists(next) {
            const exists = Boolean(this.stat());
            // console.log('exists current', exists, 'next', next, this.path())
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next) {
                this.parent().exists(true);
                this.ensure();
            }
            else {
                this.drop();
            }
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            // Если записываем text, и вотчер ресетнул записанный файл,
            // то надо снова его обновить, вызвать логику, которая делала пуш в text.
            // Например файл удалили, потом снова создали, версия поменялась - перезаписываем
            // Если использовать version, то вновь созданный файл, через вотчер запустит свое пересоздание
            if (next !== undefined)
                this.exists();
            return this.text_int(next, virt);
        }
        text_int(next, virt) {
            if (virt) {
                this.stat(this.stat_make(0), 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer());
            }
            else {
                const buffer = $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        sub(reset) {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            this.version();
            // Если дочерний file удалился, список надо обновить
            return this.kids().filter(file => file.exists());
        }
        resolve(path) {
            throw new Error('implement');
        }
        relate(base = this.constructor.relative('.')) {
            const base_path = base.path();
            const path = this.path();
            return path.startsWith(base_path) ? path.slice(base_path.length) : path;
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
        toJSON() {
            return this.path();
        }
        open(...modes) {
            return this.$.$mol_file_transaction.make({
                path: () => this.path(),
                modes: () => modes
            });
        }
    }
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "exists_cut", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "modified", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "version", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "readable", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "writable", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "stat_make", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "clone", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "text_int", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "sub", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "size", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "open", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base, "absolute", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "flush", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "watch_off", null);
    $.$mol_file_base = $mol_file_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file extends $mol_file_base {
    }
    $.$mol_file = $mol_file;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_rest_code;
    (function ($mol_rest_code) {
        $mol_rest_code[$mol_rest_code["Continue"] = 100] = "Continue";
        $mol_rest_code[$mol_rest_code["Switching protocols"] = 101] = "Switching protocols";
        $mol_rest_code[$mol_rest_code["Processing"] = 102] = "Processing";
        $mol_rest_code[$mol_rest_code["OK"] = 200] = "OK";
        $mol_rest_code[$mol_rest_code["Created"] = 201] = "Created";
        $mol_rest_code[$mol_rest_code["Accepted"] = 202] = "Accepted";
        $mol_rest_code[$mol_rest_code["Non-Authoritative Information"] = 203] = "Non-Authoritative Information";
        $mol_rest_code[$mol_rest_code["No Content"] = 204] = "No Content";
        $mol_rest_code[$mol_rest_code["Reset Content"] = 205] = "Reset Content";
        $mol_rest_code[$mol_rest_code["Partial Content"] = 206] = "Partial Content";
        $mol_rest_code[$mol_rest_code["Multi Status"] = 207] = "Multi Status";
        $mol_rest_code[$mol_rest_code["Already Reported"] = 208] = "Already Reported";
        $mol_rest_code[$mol_rest_code["IM Used"] = 226] = "IM Used";
        $mol_rest_code[$mol_rest_code["Multiple Choices"] = 300] = "Multiple Choices";
        $mol_rest_code[$mol_rest_code["Moved Permanently"] = 301] = "Moved Permanently";
        $mol_rest_code[$mol_rest_code["Found"] = 302] = "Found";
        $mol_rest_code[$mol_rest_code["See Other"] = 303] = "See Other";
        $mol_rest_code[$mol_rest_code["Not Modified"] = 304] = "Not Modified";
        $mol_rest_code[$mol_rest_code["Use Proxy"] = 305] = "Use Proxy";
        $mol_rest_code[$mol_rest_code["Temporary Redirect"] = 307] = "Temporary Redirect";
        $mol_rest_code[$mol_rest_code["Bad Request"] = 400] = "Bad Request";
        $mol_rest_code[$mol_rest_code["Unauthorized"] = 401] = "Unauthorized";
        $mol_rest_code[$mol_rest_code["Payment Required"] = 402] = "Payment Required";
        $mol_rest_code[$mol_rest_code["Forbidden"] = 403] = "Forbidden";
        $mol_rest_code[$mol_rest_code["Not Found"] = 404] = "Not Found";
        $mol_rest_code[$mol_rest_code["Method Not Allowed"] = 405] = "Method Not Allowed";
        $mol_rest_code[$mol_rest_code["Not Acceptable"] = 406] = "Not Acceptable";
        $mol_rest_code[$mol_rest_code["Proxy Authentication Required"] = 407] = "Proxy Authentication Required";
        $mol_rest_code[$mol_rest_code["Request Timeout"] = 408] = "Request Timeout";
        $mol_rest_code[$mol_rest_code["Conflict"] = 409] = "Conflict";
        $mol_rest_code[$mol_rest_code["Gone"] = 410] = "Gone";
        $mol_rest_code[$mol_rest_code["Length Required"] = 411] = "Length Required";
        $mol_rest_code[$mol_rest_code["Precondition Failed"] = 412] = "Precondition Failed";
        $mol_rest_code[$mol_rest_code["Request Entity Too Large"] = 413] = "Request Entity Too Large";
        $mol_rest_code[$mol_rest_code["Request URI Too Long"] = 414] = "Request URI Too Long";
        $mol_rest_code[$mol_rest_code["Unsupported Media Type"] = 415] = "Unsupported Media Type";
        $mol_rest_code[$mol_rest_code["Requested Range Not Satisfiable"] = 416] = "Requested Range Not Satisfiable";
        $mol_rest_code[$mol_rest_code["Expectation Failed"] = 417] = "Expectation Failed";
        $mol_rest_code[$mol_rest_code["Teapot"] = 418] = "Teapot";
        $mol_rest_code[$mol_rest_code["Unprocessable Entity"] = 422] = "Unprocessable Entity";
        $mol_rest_code[$mol_rest_code["Locked"] = 423] = "Locked";
        $mol_rest_code[$mol_rest_code["Failed Dependency"] = 424] = "Failed Dependency";
        $mol_rest_code[$mol_rest_code["Upgrade Required"] = 426] = "Upgrade Required";
        $mol_rest_code[$mol_rest_code["Precondition Required"] = 428] = "Precondition Required";
        $mol_rest_code[$mol_rest_code["Too Many Requests"] = 429] = "Too Many Requests";
        $mol_rest_code[$mol_rest_code["Request Header Fields Too Large"] = 431] = "Request Header Fields Too Large";
        $mol_rest_code[$mol_rest_code["Unavailable For Legal Reasons"] = 451] = "Unavailable For Legal Reasons";
        $mol_rest_code[$mol_rest_code["Internal Server Error"] = 500] = "Internal Server Error";
        $mol_rest_code[$mol_rest_code["Not Implemented"] = 501] = "Not Implemented";
        $mol_rest_code[$mol_rest_code["Bad Gateway"] = 502] = "Bad Gateway";
        $mol_rest_code[$mol_rest_code["Service Unavailable"] = 503] = "Service Unavailable";
        $mol_rest_code[$mol_rest_code["Gateway Timeout"] = 504] = "Gateway Timeout";
        $mol_rest_code[$mol_rest_code["HTTP Version Not Supported"] = 505] = "HTTP Version Not Supported";
        $mol_rest_code[$mol_rest_code["Insufficient Storage"] = 507] = "Insufficient Storage";
        $mol_rest_code[$mol_rest_code["Loop Detected"] = 508] = "Loop Detected";
        $mol_rest_code[$mol_rest_code["Not Extended"] = 510] = "Not Extended";
        $mol_rest_code[$mol_rest_code["Network Authentication Required"] = 511] = "Network Authentication Required";
        $mol_rest_code[$mol_rest_code["Network Read Timeout Error"] = 598] = "Network Read Timeout Error";
        $mol_rest_code[$mol_rest_code["Network Connect Timeout Error"] = 599] = "Network Connect Timeout Error";
    })($mol_rest_code = $.$mol_rest_code || ($.$mol_rest_code = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function cause_serialize(cause) {
        return JSON.stringify(cause, null, '  ')
            .replace(/\(/, '<')
            .replace(/\)/, ' >');
    }
    function frame_normalize(frame) {
        return (typeof frame === 'string' ? frame : cause_serialize(frame))
            .trim()
            .replace(/at /gm, '   at ')
            .replace(/^(?!    +at )(.*)/gm, '    at | $1 (#)');
    }
    class $mol_error_mix extends AggregateError {
        cause;
        name = $$.$mol_func_name(this.constructor).replace(/^\$/, '') + '_Error';
        constructor(message, cause = {}, ...errors) {
            super(errors, message, { cause });
            this.cause = cause;
            const desc = Object.getOwnPropertyDescriptor(this, 'stack');
            const stack_get = () => desc?.get?.() ?? super.stack ?? desc?.value ?? this.message;
            Object.defineProperty(this, 'stack', {
                get: () => stack_get() + '\n' + [
                    this.cause ?? 'no cause',
                    ...this.errors.flatMap(e => [
                        String(e.stack),
                        ...e instanceof $mol_error_mix || !e.cause ? [] : [e.cause]
                    ])
                ].map(frame_normalize).join('\n')
            });
            // в nodejs, что б не дублировалось cause в консоли
            Object.defineProperty(this, 'cause', {
                get: () => cause
            });
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        static make(...params) {
            return new this(...params);
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function pass(data) {
        return data;
    }
    function $mol_error_fence(task, fallback, loading = pass) {
        try {
            return task();
        }
        catch (error) {
            let normalized;
            try {
                normalized = $mol_promise_like(error) ? loading(error) : fallback(error);
            }
            catch (sub_error) {
                normalized = $mol_promise_like(sub_error) ? sub_error : new $mol_error_mix(sub_error.message, { error }, sub_error);
            }
            if (normalized instanceof Error || $mol_promise_like(normalized)) {
                $mol_fail_hidden(normalized);
            }
            return normalized;
        }
    }
    $.$mol_error_fence = $mol_error_fence;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_enriched(cause, cb) {
        return $mol_error_fence(cb, e => new $mol_error_mix(e.message, cause, e));
    }
    $.$mol_error_enriched = $mol_error_enriched;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror');
        if (error.length)
            throw new Error(error[0].textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_fetch_response extends $mol_object {
        native;
        request;
        status() {
            const types = ['unknown', 'inform', 'success', 'redirect', 'wrong', 'failed'];
            return types[Math.floor(this.native.status / 100)];
        }
        code() {
            return this.native.status;
        }
        ok() {
            return this.native.ok;
        }
        message() {
            return $mol_rest_code[this.code()] || `HTTP Error ${this.code()}`;
        }
        headers() {
            return this.native.headers;
        }
        mime() {
            return this.headers().get('content-type');
        }
        stream() {
            return this.native.body;
        }
        text() {
            const buffer = this.buffer();
            const mime = this.mime() || '';
            const [, charset] = /charset=(.*)/.exec(mime) || [, 'utf-8'];
            const decoder = new TextDecoder(charset);
            return decoder.decode(buffer);
        }
        json() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).json());
        }
        blob() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).blob());
        }
        buffer() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).arrayBuffer());
        }
        xml() {
            return $mol_dom_parse(this.text(), 'application/xml');
        }
        xhtml() {
            return $mol_dom_parse(this.text(), 'application/xhtml+xml');
        }
        html() {
            return $mol_dom_parse(this.text(), 'text/html');
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "html", null);
    $.$mol_fetch_response = $mol_fetch_response;
    class $mol_fetch_request extends $mol_object {
        native;
        response_async() {
            const controller = new AbortController();
            let done = false;
            const request = new Request(this.native, { signal: controller.signal });
            const promise = fetch(request).finally(() => {
                done = true;
            });
            return Object.assign(promise, {
                destructor: () => {
                    // Abort of done request breaks response parsing
                    if (!done && !controller.signal.aborted)
                        controller.abort();
                },
            });
        }
        response() {
            return this.$.$mol_fetch_response.make({
                native: $mol_wire_sync(this).response_async(),
                request: this
            });
        }
        success() {
            const response = this.response();
            if (response.status() === 'success')
                return response;
            throw new Error(response.message(), { cause: response });
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_request.prototype, "response", null);
    $.$mol_fetch_request = $mol_fetch_request;
    class $mol_fetch extends $mol_object {
        static request(input, init) {
            return this.$.$mol_fetch_request.make({
                native: new Request(input, init)
            });
        }
        static response(input, init) {
            return this.request(input, init).response();
        }
        static success(input, init) {
            return this.request(input, init).success();
        }
        static stream(input, init) {
            return this.success(input, init).stream();
        }
        static text(input, init) {
            return this.success(input, init).text();
        }
        static json(input, init) {
            return this.success(input, init).json();
        }
        static blob(input, init) {
            return this.success(input, init).blob();
        }
        static buffer(input, init) {
            return this.success(input, init).buffer();
        }
        static xml(input, init) {
            return this.success(input, init).xml();
        }
        static xhtml(input, init) {
            return this.success(input, init).xhtml();
        }
        static html(input, init) {
            return this.success(input, init).html();
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch, "request", null);
    $.$mol_fetch = $mol_fetch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_webdav extends $mol_file_base {
        static relative(path) {
            return this.absolute(new URL(path, this.base).toString());
        }
        resolve(path) {
            let res = this.path() + '/' + path;
            while (true) {
                let prev = res;
                // foo/../ -> /
                res = res.replace(/\/[^\/.]+\/\.\.\//, '/');
                if (prev === res)
                    break;
            }
            // http://localhost/.. -> http://localhost
            res = res.replace(/\/\.\.\/?$/, '');
            if (res === this.path())
                return this;
            return this.constructor.absolute(res);
        }
        static headers() { return {}; }
        headers() { return this.constructor.headers(); }
        fetch(init) {
            return this.$.$mol_fetch.success(this.path(), {
                ...init,
                headers: {
                    ...this.headers(),
                    ...init.headers,
                }
            });
        }
        read() {
            try {
                const response = this.fetch({});
                return new Uint8Array(response.buffer());
            }
            catch (error) {
                if (error instanceof Error
                    && error.cause instanceof $mol_fetch_response
                    && error.cause.native.status === 404)
                    return new Uint8Array;
                $mol_fail_hidden(error);
            }
        }
        write(body) { this.fetch({ method: 'PUT', body }); }
        ensure() { this.fetch({ method: 'MKCOL' }); }
        drop() { this.fetch({ method: 'DELETE' }); }
        copy(to) {
            this.fetch({
                method: 'COPY',
                headers: { Destination: to }
            });
        }
        kids() {
            const response = this.fetch({ method: 'PROPFIND' });
            const xml = response.xml();
            const result = [];
            for (const multistatus of xml.childNodes) {
                if (multistatus.nodeName !== 'D:multistatus')
                    continue;
                for (const response of multistatus.childNodes) {
                    let path;
                    if (response.nodeName === 'D:href')
                        path = response.textContent ?? '';
                    if (!path)
                        continue;
                    if (response.nodeName !== 'D:propstat')
                        continue;
                    const stat = webdav_stat(response);
                    const file = this.resolve(path);
                    file.stat(stat, 'virt');
                    result.push(file);
                }
            }
            return result;
        }
        readable(opts) {
            return this.fetch({
                headers: !opts.start ? {} : {
                    'Range': `bytes=${opts.start}-${opts.end ?? ''}`
                }
            }).stream() || $mol_fail(new Error('Not found'));
        }
        info() {
            return this.kids().at(0)?.stat() ?? null;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_file_webdav.prototype, "readable", null);
    $.$mol_file_webdav = $mol_file_webdav;
    function webdav_stat(prop_stat) {
        const now = new Date();
        const stat = {
            type: 'file',
            size: 0,
            atime: now,
            mtime: now,
            ctime: now,
        };
        for (const prop of prop_stat.childNodes) {
            if (prop.nodeName !== 'D:prop')
                continue;
            for (const value of prop.childNodes) {
                const name = value.nodeName;
                const text = value.textContent ?? '';
                if (name === 'D:getcontenttype') {
                    stat.type = text.endsWith('directory') ? 'dir' : 'file';
                }
                if (name === 'D:getcontentlength') {
                    stat.size = Number(value.textContent || '0');
                    if (Number.isNaN(stat.size))
                        stat.size = 0;
                }
                if (name === 'D:getlastmodified')
                    stat.mtime = stat.atime = new Date(text);
                if (name === 'D:creationdate')
                    stat.ctime = new Date(text);
            }
        }
        return stat;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_web extends $mol_file_webdav {
        static base = new URL('.', $mol_dom_context.document?.currentScript?.['src'] ?? globalThis.location.href).toString();
        // Вотчер выключен, версия всегда будет одна
        // Если пустая строка - будет считаться, что файла нет
        version() { return '1'; }
        // Ворнинги подавляем, иначе в каждом приложении, загружающим локали, будет ворнинг
        // override watcher() { return { destructor() {} }}
        info() {
            // Директории не поддерживаются
            try {
                const response = this.fetch({ method: 'HEAD' });
                const headers = response.headers();
                let size = Number(headers.get('Content-Length'));
                if (Number.isNaN(size))
                    size = 0;
                const last = headers.get('Last-Modified');
                const mtime = last ? new Date(last) : new Date();
                return {
                    type: 'file',
                    size,
                    mtime,
                    atime: mtime,
                    ctime: mtime,
                };
            }
            catch (error) {
                if (error instanceof Error
                    && error.cause instanceof $mol_fetch_response
                    && error.cause.native.status === 404)
                    return null;
                $mol_fail_hidden(error);
            }
        }
    }
    $.$mol_file_web = $mol_file_web;
    $.$mol_file = $mol_file_web;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Localisation in $mol framework
     * @see https://mol.hyoo.ru/#!section=docs/=s5aqnb_odub8l
     */
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));

;
	($.$mol_svg) = class $mol_svg extends ($.$mol_view) {
		dom_name(){
			return "svg";
		}
		dom_name_space(){
			return "http://www.w3.org/2000/svg";
		}
		font_size(){
			return 16;
		}
		font_family(){
			return "";
		}
		style_size(){
			return {};
		}
	};


;
"use strict";
var $;
(function ($) {
    /** State of time moment */
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** Base SVG component to display SVG images or icons. */
        class $mol_svg extends $.$mol_svg {
            computed_style() {
                const win = this.$.$mol_dom_context;
                const style = win.getComputedStyle(this.dom_node());
                if (!style['font-size'])
                    $mol_state_time.now(0);
                return style;
            }
            font_size() {
                return parseInt(this.computed_style()['font-size']) || 16;
            }
            font_family() {
                return this.computed_style()['font-family'];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "computed_style", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_size", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_family", null);
        $$.$mol_svg = $mol_svg;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_root) = class $mol_svg_root extends ($.$mol_svg) {
		view_box(){
			return "0 0 100 100";
		}
		aspect(){
			return "xMidYMid";
		}
		dom_name(){
			return "svg";
		}
		attr(){
			return {
				...(super.attr()), 
				"viewBox": (this.view_box()), 
				"preserveAspectRatio": (this.aspect())
			};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/root/root.view.css", "[mol_svg_root] {\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_svg_path) = class $mol_svg_path extends ($.$mol_svg) {
		geometry(){
			return "";
		}
		dom_name(){
			return "path";
		}
		attr(){
			return {...(super.attr()), "d": (this.geometry())};
		}
	};


;
"use strict";


;
	($.$mol_icon) = class $mol_icon extends ($.$mol_svg_root) {
		path(){
			return "";
		}
		Path(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.path()));
			return obj;
		}
		view_box(){
			return "0 0 24 24";
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
		sub(){
			return [(this.Path())];
		}
	};
	($mol_mem(($.$mol_icon.prototype), "Path"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/icon/icon.view.css", "[mol_icon] {\n\tfill: currentColor;\n\tstroke: none;\n\twidth: 1em;\n\theight: 1.5em;\n\tflex: 0 0 auto;\n\tvertical-align: top;\n\tdisplay: inline-block;\n\tfilter: drop-shadow(0px 1px 1px var(--mol_theme_back));\n\ttransform-origin: center;\n}\n\n[mol_icon_path] {\n\ttransform-origin: center;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_icon_open_in_new) = class $mol_icon_open_in_new extends ($.$mol_icon) {
		path(){
			return "M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z";
		}
	};


;
"use strict";


;
	($.$mol_link) = class $mol_link extends ($.$mol_view) {
		uri_toggle(){
			return "";
		}
		uri_unsafe(){
			return (this.uri_toggle());
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		target(){
			return "_self";
		}
		file_name(){
			return "";
		}
		current(){
			return false;
		}
		relation(){
			return "";
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		click(next){
			return (this.event_click(next));
		}
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		uri_off(){
			return "";
		}
		uri_native(){
			return null;
		}
		external(){
			return false;
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri_unsafe()), 
				"title": (this.hint_safe()), 
				"target": (this.target()), 
				"download": (this.file_name()), 
				"mol_link_current": (this.current()), 
				"rel": (this.relation())
			};
		}
		sub(){
			return [(this.title())];
		}
		arg(){
			return {};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
	};
	($mol_mem(($.$mol_link.prototype), "event_click"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** State of arguments like `#foo=bar/xxx` or `?foo=bar&xxx` */
    class $mol_state_arg extends $mol_object {
        prefix;
        static href(next) {
            if (next === undefined) {
                next = $mol_dom.location.href;
            }
            else if (!/^about:srcdoc/.test(next)) {
                new $mol_after_frame(() => {
                    const next = this.href();
                    const prev = $mol_dom.location.href;
                    if (next === prev)
                        return;
                    const history = $mol_dom.history;
                    history.replaceState(history.state, $mol_dom.document.title, next);
                });
            }
            if ($mol_dom.parent && ($mol_dom.parent !== $mol_dom.self)) {
                $mol_dom.parent.postMessage(['hashchange', next], '*');
            }
            return next;
        }
        static href_normal() {
            return this.link({});
        }
        static href_absolute() {
            return new URL(this.href(), $mol_dom.location.href).toString();
        }
        static dict(next) {
            var href = this.href(next && this.make_link(next)).split(/#!?/)[1] || '';
            var chunks = href.split(this.separator);
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static dict_cut(except) {
            const dict = this.dict();
            const cut = {};
            for (const key in dict) {
                if (except.indexOf(key) >= 0)
                    break;
                cut[key] = dict[key];
            }
            return cut;
        }
        static value(key, next) {
            const nextDict = (next === void 0) ? void 0 : { ...this.dict(), [key]: next };
            const next2 = this.dict(nextDict)[key];
            return (next2 == null) ? null : next2;
        }
        static link(next) {
            return this.make_link({
                ...this.dict_cut(Object.keys(next)),
                ...next,
            });
        }
        static prolog = '!';
        static separator = '/';
        static make_link(next) {
            const chunks = [];
            for (let key in next) {
                if (null == next[key])
                    continue;
                const val = next[key];
                chunks.push([key].concat(val ? [val] : []).map(this.encode).join('='));
            }
            return new URL('#' + this.prolog + chunks.join(this.separator), this.href_absolute()).toString();
        }
        static commit() {
            $mol_dom.history.pushState($mol_dom.history.state, $mol_dom.document.title, this.href());
        }
        static go(next) {
            $mol_dom.location.href = this.link(next);
        }
        static encode(str) {
            return encodeURIComponent(str).replace(/\(/g, '%28').replace(/\)/g, '%29');
        }
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_normal", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_absolute", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "dict_cut", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "make_link", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "commit", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
    function $mol_state_arg_change() {
        $mol_state_arg.href($mol_dom.location.href);
    }
    self.addEventListener('hashchange', $mol_state_arg_change);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_safe_uri(uri) {
        return uri.replace(/^(?=\w+script+:)/, 'about:blank#');
    }
    $.$mol_dom_safe_uri = $mol_dom_safe_uri;
    function $mol_dom_safe_attr(val) {
        return val;
    }
    $.$mol_dom_safe_attr = $mol_dom_safe_attr;
    $.$mol_dom_safe_rules = {
        // defaults
        '': { id: $mol_dom_safe_attr },
        // special
        a: { href: $mol_dom_safe_uri },
        img: { src: $mol_dom_safe_uri },
        object: { src: $mol_dom_safe_uri },
        // blocks
        div: {},
        p: {},
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        blockquote: {},
        pre: {},
        ul: {},
        ol: {},
        li: {},
        details: {},
        summary: {},
        hr: {},
        table: {},
        tr: {},
        td: {},
        // inlines
        span: {},
        strong: {},
        em: {},
        br: {},
        ins: {},
        del: {},
        code: {},
    };
    function $mol_dom_safe(nodes) {
        const res = [];
        for (const node of nodes) {
            if (node.nodeType === node.TEXT_NODE) {
                res.push(node);
                continue;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
                const kids = this.$mol_dom_safe([...node.childNodes]);
                const allowed = this.$mol_dom_safe_rules[node.localName];
                if (!allowed) {
                    res.push(...kids);
                    continue;
                }
                for (const attr of [...node.attributes]) {
                    const proc = allowed[attr.localName] ?? this.$mol_dom_safe_rules[''][attr.localName];
                    if (proc)
                        attr.nodeValue = proc(attr.nodeValue);
                    else
                        node.removeAttribute(attr.nodeName);
                }
                $mol_dom_render_children(node, kids);
                res.push(node);
                continue;
            }
        }
        return res;
    }
    $.$mol_dom_safe = $mol_dom_safe;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_style_sheet(Component, config0) {
        let rules = [];
        const block = $mol_dom_qname($mol_ambient({}).$mol_func_name(Component));
        const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
        const make_class = (prefix, path, config) => {
            const props = [];
            const selector = (prefix, path) => {
                if (path.length === 0)
                    return prefix || `[${block}]`;
                let res = `[${block}_${path.join('_')}]`;
                if (prefix)
                    res = prefix + ' :where(' + res + ')';
                return res;
            };
            for (const key of Object.keys(config).reverse()) {
                if (/^(--)?[a-z]/.test(key)) {
                    const addProp = (keys, val) => {
                        if (Array.isArray(val)) {
                            if (val[0] && [Array, Object].includes(val[0].constructor)) {
                                val = val.map(v => {
                                    return Object.entries(v).map(([n, a]) => {
                                        if (a === true)
                                            return kebab(n);
                                        if (a === false)
                                            return null;
                                        return String(a);
                                    }).filter(Boolean).join(' ');
                                }).join(',');
                            }
                            else {
                                val = val.join(' ');
                            }
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                        else if (val.constructor === Object) {
                            for (let suffix of Object.keys(val).reverse()) {
                                addProp([...keys, kebab(suffix)], val[suffix]);
                            }
                        }
                        else {
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                    };
                    addProp([kebab(key)], config[key]);
                }
                else if (/^[A-Z]/.test(key)) {
                    make_class(prefix, [...path, key.toLowerCase()], config[key]);
                }
                else if (key[0] === '$') {
                    make_class(selector(prefix, path) + ' :where([' + $mol_dom_qname(key) + '])', [], config[key]);
                }
                else if (key === '>') {
                    const types = config[key];
                    for (let type of Object.keys(types).reverse()) {
                        make_class(selector(prefix, path) + ' > :where([' + $mol_dom_qname(type) + '])', [], types[type]);
                    }
                }
                else if (key === '@') {
                    const attrs = config[key];
                    for (let name of Object.keys(attrs).reverse()) {
                        for (let val in attrs[name]) {
                            make_class(selector(prefix, path) + ':where([' + name + '=' + JSON.stringify(val) + '])', [], attrs[name][val]);
                        }
                    }
                }
                else if (key === '@media' || key === '@container') {
                    const media = config[key];
                    for (let query of Object.keys(media).reverse()) {
                        rules.push('}\n');
                        make_class(prefix, path, media[query]);
                        rules.push(`${key} ${query} {\n`);
                    }
                }
                else if (key === '@starting-style') {
                    const styles = config[key];
                    rules.push('}\n');
                    make_class(prefix, path, styles);
                    rules.push(`${key} {\n`);
                }
                else if (key[0] === '[' && key[key.length - 1] === ']') {
                    const attr = key.slice(1, -1);
                    const vals = config[key];
                    for (let val of Object.keys(vals).reverse()) {
                        make_class(selector(prefix, path) + ':where([' + attr + '=' + JSON.stringify(val) + '])', [], vals[val]);
                    }
                }
                else {
                    make_class(selector(prefix, path) + key, [], config[key]);
                }
            }
            if (props.length) {
                rules.push(`${selector(prefix, path)} {\n${props.reverse().join('')}}\n`);
            }
        };
        make_class('', [], config0);
        return rules.reverse().join('');
    }
    $.$mol_style_sheet = $mol_style_sheet;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS in TS.
     * Statically typed CSS style sheets. Following samples show which CSS code are generated from TS code.
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    function $mol_style_define(Component, config) {
        return $mol_style_attach(Component.name, $mol_style_sheet(Component, config));
    }
    $.$mol_style_define = $mol_style_define;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Dynamic hyperlink. It can add, change or remove parameters. A link that leads to the current page has [mol_link_current] attribute set to true.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_link_demo
         */
        class $mol_link extends $.$mol_link {
            uri_toggle() {
                return this.current() ? this.uri_off() : this.uri();
            }
            uri() {
                return new this.$.$mol_state_arg(this.state_key()).link(this.arg());
            }
            uri_off() {
                const arg2 = {};
                for (let i in this.arg())
                    arg2[i] = null;
                return new this.$.$mol_state_arg(this.state_key()).link(arg2);
            }
            uri_native() {
                const base = this.$.$mol_state_arg.href();
                return new URL(this.uri(), base);
            }
            current() {
                const base = this.$.$mol_state_arg.href_normal();
                const target = this.uri_native().toString();
                if (base === target)
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) != args[key])
                        return false;
                }
                return true;
            }
            file_name() {
                return null;
            }
            minimal_height() {
                return Math.max(super.minimal_height(), 24);
            }
            external() {
                return this.uri_native().origin !== $mol_dom_context.location.origin;
            }
            target() {
                return this.external() ? '_blank' : '_self';
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    if (error instanceof Error)
                        return '💥' + error.message;
                    return '';
                }
            }
            uri_unsafe() {
                return $mol_dom_safe_uri(super.uri_unsafe());
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_toggle", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_off", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_native", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    $mol_style_define($mol_link, {
        textDecoration: 'none',
        color: $mol_theme.control,
        stroke: 'currentcolor',
        cursor: 'pointer',
        padding: $mol_gap.text,
        boxSizing: 'border-box',
        position: 'relative',
        minWidth: rem(2.5),
        minHeight: rem(2.5),
        gap: $mol_gap.space,
        border: {
            radius: $mol_gap.round,
        },
        ':hover': {
            background: {
                color: $mol_theme.hover,
            },
        },
        ':focus': {
            outline: 'none',
        },
        ':focus-visible': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            }
        },
        ':active': {
            color: $mol_theme.focus,
        },
        '@': {
            mol_link_current: {
                'true': {
                    color: $mol_theme.current,
                    textShadow: '0 0',
                }
            }
        },
    });
})($ || ($ = {}));

;
	($.$mol_speck) = class $mol_speck extends ($.$mol_view) {
		value(){
			return null;
		}
		theme(){
			return "$mol_theme_accent";
		}
		sub(){
			return [(this.value())];
		}
	};


;
"use strict";
var $;
(function ($) {
    /**
     * Z-index values for layers
     * https://page.hyoo.ru/#!=xthcpx_wqmiba
     */
    $.$mol_layer = $mol_style_prop('mol_layer', [
        'hover',
        'focus',
        'speck',
        'float',
        'popup',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/layer/layer.css", ":root {\n\t--mol_layer_hover: 1;\n\t--mol_layer_focus: 2;\n\t--mol_layer_speck: 3;\n\t--mol_layer_float: 4;\n\t--mol_layer_popup: 5;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .75rem;\n\tborder-radius: 1rem;\n\tmargin: -0.5rem -0.2rem;\n\talign-self: flex-start;\n\tmin-height: 1em;\n\tmin-width: .75rem;\n\tvertical-align: sub;\n\tpadding: 0 .2rem;\n\tposition: absolute;\n\tz-index: var(--mol_layer_speck);\n\ttext-align: center;\n\tline-height: .9;\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\tuser-select: none;\n\tbox-shadow: 0 0 3px rgba(0,0,0,.5);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button) = class $mol_button extends ($.$mol_view) {
		event_activate(next){
			if(next !== undefined) return next;
			return null;
		}
		activate(next){
			return (this.event_activate(next));
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		event_key_press(next){
			if(next !== undefined) return next;
			return null;
		}
		key_press(next){
			return (this.event_key_press(next));
		}
		disabled(){
			return false;
		}
		tab_index(){
			return 0;
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		error(){
			return "";
		}
		enabled(){
			return true;
		}
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		status(next){
			if(next !== undefined) return next;
			return [];
		}
		event(){
			return {
				...(super.event()), 
				"click": (next) => (this.activate(next)), 
				"dblclick": (next) => (this.clicks(next)), 
				"keydown": (next) => (this.key_press(next))
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"disabled": (this.disabled()), 
				"role": "button", 
				"tabindex": (this.tab_index()), 
				"title": (this.hint_safe())
			};
		}
		sub(){
			return [(this.title())];
		}
		Speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ((this.error()));
			return obj;
		}
	};
	($mol_mem(($.$mol_button.prototype), "event_activate"));
	($mol_mem(($.$mol_button.prototype), "clicks"));
	($mol_mem(($.$mol_button.prototype), "event_key_press"));
	($mol_mem(($.$mol_button.prototype), "click"));
	($mol_mem(($.$mol_button.prototype), "event_click"));
	($mol_mem(($.$mol_button.prototype), "status"));
	($mol_mem(($.$mol_button.prototype), "Speck"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Simple button.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
         */
        class $mol_button extends $.$mol_button {
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                try {
                    this.event_click(next);
                    this.click(next);
                    this.status([null]);
                }
                catch (error) {
                    // Calling actions from catch section, if throwing promise breaks idempotency
                    Promise.resolve().then(() => this.status([error]));
                    $mol_fail_hidden(error);
                }
            }
            event_key_press(event) {
                if (event.keyCode === $mol_keyboard_code.enter) {
                    return this.activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : -1;
            }
            error() {
                const error = this.status()?.[0];
                if (!error)
                    return '';
                if ($mol_promise_like(error)) {
                    return $mol_fail_hidden(error);
                }
                return this.$.$mol_error_message(error);
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
            sub_visible() {
                return [
                    ...this.error() ? [this.Speck()] : [],
                    ...this.sub(),
                ];
            }
        }
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n\tuser-select: none;\n\t-webkit-user-select: none;\n\tborder-radius: var(--mol_gap_round);\n\tbackground: transparent;\n\tcolor: inherit;\n}\n\n[mol_button]:where(:not(:disabled)):hover {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_button]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$mol_button_typed) = class $mol_button_typed extends ($.$mol_button) {
		minimal_height(){
			return 40;
		}
		minimal_width(){
			return 40;
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/typed/typed.view.css", "[mol_button_typed] {\n\talign-content: center;\n\talign-items: center;\n\tpadding: var(--mol_gap_text);\n\tborder-radius: var(--mol_gap_round);\n\tgap: var(--mol_gap_space);\n\tuser-select: none;\n\tcursor: pointer;\n\tmin-width: 2.5rem;\n\tmin-height: 2.5rem;\n}\n\n[mol_button_typed][disabled] {\n\tpointer-events: none;\n}\n\n[mol_button_typed]:hover ,\n[mol_button_typed]:focus-visible {\n\tbox-shadow: inset 0 0 0 100vmax var(--mol_theme_hover);\n}\n\n[mol_button_typed]:active {\n\tcolor: var(--mol_theme_focus);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button_minor) = class $mol_button_minor extends ($.$mol_button_typed) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/minor/minor.view.css", "[mol_button_minor]:where(:not([disabled])) {\n\tcolor: var(--mol_theme_control);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button_major) = class $mol_button_major extends ($.$mol_button_minor) {
		theme(){
			return "$mol_theme_base";
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/major/major.view.css", "[mol_button_major] {\n\tbackground-color: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$bog_smalljs_versus_case) = class $bog_smalljs_versus_case extends ($.$mol_view) {
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		Hint(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.hint())]);
			return obj;
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Title()), (this.Hint())]);
			return obj;
		}
		controls_content(){
			return [];
		}
		Controls(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.controls_content()));
			return obj;
		}
		columns(){
			return [];
		}
		Columns(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.columns()));
			return obj;
		}
		run_enabled(){
			return true;
		}
		run(next){
			if(next !== undefined) return next;
			return null;
		}
		run_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_run_label"));
		}
		run_hint(){
			return "";
		}
		framework_name(id){
			return "";
		}
		Label(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.framework_name(id))]);
			return obj;
		}
		frame_uri(id){
			return "";
		}
		frame_title(id){
			return "";
		}
		frame_loaded(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Frame(id){
			const obj = new this.$.$bog_smalljs_versus_case_frame();
			(obj.uri) = () => ((this.frame_uri(id)));
			(obj.frame_title) = () => ((this.frame_title(id)));
			(obj.loaded) = (next) => ((this.frame_loaded(id, next)));
			return obj;
		}
		card_content(id){
			return [];
		}
		Card(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.card_content(id)));
			return obj;
		}
		status(id){
			return "";
		}
		status_icon(id){
			return "";
		}
		status_text(id){
			return "";
		}
		observed(id){
			return "";
		}
		metric_rows(id){
			return [];
		}
		metric_name(id){
			return "";
		}
		Metric_name(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.metric_name(id))]);
			return obj;
		}
		metric_value(id){
			return "";
		}
		Metric_value(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.metric_value(id))]);
			return obj;
		}
		note(id){
			return "";
		}
		case_id(){
			return "";
		}
		title(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_title"));
		}
		hint(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_hint"));
		}
		status_idle(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_status_idle"));
		}
		status_running(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_status_running"));
		}
		status_ok(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_status_ok"));
		}
		status_warn(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_status_warn"));
		}
		status_fail(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_status_fail"));
		}
		status_error(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_status_error"));
		}
		status_invalid(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_status_invalid"));
		}
		error_timeout(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_error_timeout"));
		}
		error_not_loaded(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_error_not_loaded"));
		}
		run_hint_broken(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_run_hint_broken"));
		}
		invalid_tab_hidden(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_invalid_tab_hidden"));
		}
		invalid_timers_throttled(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_invalid_timers_throttled"));
		}
		invalid_frame_offscreen(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_invalid_frame_offscreen"));
		}
		invalid_other(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_invalid_other"));
		}
		run_hint_hidden(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_run_hint_hidden"));
		}
		run_hint_loading(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_case_run_hint_loading"));
		}
		sub(){
			return [
				(this.Head()), 
				(this.Controls()), 
				(this.Columns())
			];
		}
		Run(){
			const obj = new this.$.$mol_button_major();
			(obj.enabled) = () => ((this.run_enabled()));
			(obj.click) = (next) => ((this.run(next)));
			(obj.sub) = () => ([(this.run_label())]);
			return obj;
		}
		Run_hint(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.run_hint())]);
			return obj;
		}
		Column(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Label(id)), 
				(this.Frame(id)), 
				(this.Card(id))
			]);
			return obj;
		}
		Status(id){
			const obj = new this.$.$bog_smalljs_versus_case_status();
			(obj.status) = () => ((this.status(id)));
			(obj.icon) = () => ((this.status_icon(id)));
			(obj.text) = () => ((this.status_text(id)));
			return obj;
		}
		Observed(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.observed(id))]);
			return obj;
		}
		Metrics(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.metric_rows(id)));
			return obj;
		}
		Metric(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Metric_name(id)), (this.Metric_value(id))]);
			return obj;
		}
		Note(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.note(id))]);
			return obj;
		}
	};
	($mol_mem(($.$bog_smalljs_versus_case.prototype), "Title"));
	($mol_mem(($.$bog_smalljs_versus_case.prototype), "Hint"));
	($mol_mem(($.$bog_smalljs_versus_case.prototype), "Head"));
	($mol_mem(($.$bog_smalljs_versus_case.prototype), "Controls"));
	($mol_mem(($.$bog_smalljs_versus_case.prototype), "Columns"));
	($mol_mem(($.$bog_smalljs_versus_case.prototype), "run"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "Label"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "frame_loaded"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "Frame"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "Card"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "Metric_name"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "Metric_value"));
	($mol_mem(($.$bog_smalljs_versus_case.prototype), "Run"));
	($mol_mem(($.$bog_smalljs_versus_case.prototype), "Run_hint"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "Column"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "Status"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "Observed"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "Metrics"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "Metric"));
	($mol_mem_key(($.$bog_smalljs_versus_case.prototype), "Note"));
	($.$bog_smalljs_versus_case_status) = class $bog_smalljs_versus_case_status extends ($.$mol_view) {
		Icon(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.icon())]);
			return obj;
		}
		Text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.text())]);
			return obj;
		}
		status(){
			return "idle";
		}
		icon(){
			return "";
		}
		text(){
			return "";
		}
		attr(){
			return {...(super.attr()), "bog_smalljs_versus_status": (this.status())};
		}
		sub(){
			return [(this.Icon()), (this.Text())];
		}
	};
	($mol_mem(($.$bog_smalljs_versus_case_status.prototype), "Icon"));
	($mol_mem(($.$bog_smalljs_versus_case_status.prototype), "Text"));
	($.$bog_smalljs_versus_case_frame) = class $bog_smalljs_versus_case_frame extends ($.$mol_view) {
		loaded(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "iframe";
		}
		uri(){
			return "";
		}
		frame_title(){
			return "";
		}
		sub(){
			return [];
		}
		event(){
			return {...(super.event()), "load": (next) => (this.loaded(next))};
		}
		attr(){
			return {
				...(super.attr()), 
				"src": (this.uri()), 
				"title": (this.frame_title()), 
				"loading": "lazy"
			};
		}
	};
	($mol_mem(($.$bog_smalljs_versus_case_frame.prototype), "loaded"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_listener extends $mol_object {
        _node;
        _event;
        _handler;
        _config;
        constructor(_node, _event, _handler, _config = { passive: true }) {
            super();
            this._node = _node;
            this._event = _event;
            this._handler = _handler;
            this._config = _config;
            this._node.addEventListener(this._event, this._handler, this._config);
        }
        destructor() {
            this._node.removeEventListener(this._event, this._handler, this._config);
            super.destructor();
        }
    }
    $.$mol_dom_listener = $mol_dom_listener;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * BuilderUI design tokens — CSS variables in --bog_builderui_*.
     * Used in .view.css.ts via $bog_builderui_tokens.text, $bog_builderui_tokens.back, etc.
     */
    $.$bog_builderui_tokens = $mol_style_prop('bog_builderui', [
        'back',
        'card',
        'field',
        'hover',
        'text',
        'shade',
        'line',
        'focus',
        'control',
        'current',
        'special',
        'font_body',
        'font_head',
        'radius',
    ]);
})($ || ($ = {}));

;
	($.$bog_builderui_div) = class $bog_builderui_div extends ($.$mol_view) {};


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($bog_builderui_div, {
        font: {
            family: $bog_builderui_tokens.font_body,
        },
        color: $bog_builderui_tokens.text,
        flex: {
            direction: 'column',
        },
    });
})($ || ($ = {}));

;
	($.$bog_builderui_card) = class $bog_builderui_card extends ($.$bog_builderui_div) {};


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($bog_builderui_card, {
        background: {
            color: $bog_builderui_tokens.card,
        },
        color: $bog_builderui_tokens.text,
        border: {
            radius: $bog_builderui_tokens.radius,
            width: '1px',
            style: 'solid',
            color: $bog_builderui_tokens.line,
        },
        padding: {
            top: '1rem',
            bottom: '1rem',
            left: '1.25rem',
            right: '1.25rem',
        },
        box: {
            shadow: [{
                    x: 0,
                    y: '1px',
                    blur: '3px',
                    spread: 0,
                    color: '#0000001a',
                }],
        },
        gap: '0.75rem',
        flex: {
            direction: 'column',
        },
        breakInside: 'avoid',
        margin: {
            bottom: '1rem',
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Plugin is component without its own DOM element, but instead uses the owner DOM element */
    class $mol_plugin extends $mol_view {
        dom_node_external(next) {
            return next ?? $mol_owning_get(this).host.dom_node();
        }
        render() {
            this.dom_node_actual();
        }
    }
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));

;
	($.$mol_hotkey) = class $mol_hotkey extends ($.$mol_plugin) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		key(){
			return {};
		}
		mod_ctrl(){
			return false;
		}
		mod_alt(){
			return false;
		}
		mod_shift(){
			return false;
		}
	};
	($mol_mem(($.$mol_hotkey.prototype), "keydown"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin which adds handlers for keyboard keys.
         * @see [mol_keyboard_code](../keyboard/code/code.ts)
         */
        class $mol_hotkey extends $.$mol_hotkey {
            key() {
                return super.key();
            }
            keydown(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                if (this.mod_ctrl() !== (event.ctrlKey || event.metaKey))
                    return;
                if (this.mod_alt() !== event.altKey)
                    return;
                if (this.mod_shift() !== event.shiftKey)
                    return;
                const handle = this.key()[name];
                if (handle)
                    handle(event);
            }
        }
        $$.$mol_hotkey = $mol_hotkey;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_string) = class $mol_string extends ($.$mol_view) {
		selection_watcher(){
			return null;
		}
		error_report(){
			return null;
		}
		disabled(){
			return false;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		value_changed(next){
			return (this.value(next));
		}
		hint(){
			return "";
		}
		hint_visible(){
			return (this.hint());
		}
		spellcheck(){
			return true;
		}
		autocomplete_native(){
			return "";
		}
		selection_end(){
			return 0;
		}
		selection_start(){
			return 0;
		}
		keyboard(){
			return "text";
		}
		enter(){
			return "go";
		}
		length_max(){
			return +Infinity;
		}
		type(next){
			if(next !== undefined) return next;
			return "text";
		}
		event_change(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return false;
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		Submit(){
			const obj = new this.$.$mol_hotkey();
			(obj.mod_ctrl) = () => ((this.submit_with_ctrl()));
			(obj.key) = () => ({"enter": (next) => (this.submit(next))});
			return obj;
		}
		dom_name(){
			return "input";
		}
		enabled(){
			return true;
		}
		minimal_height(){
			return 40;
		}
		autocomplete(){
			return false;
		}
		selection(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		auto(){
			return [(this.selection_watcher()), (this.error_report())];
		}
		field(){
			return {
				...(super.field()), 
				"disabled": (this.disabled()), 
				"value": (this.value_changed()), 
				"placeholder": (this.hint_visible()), 
				"spellcheck": (this.spellcheck()), 
				"autocomplete": (this.autocomplete_native()), 
				"selectionEnd": (this.selection_end()), 
				"selectionStart": (this.selection_start()), 
				"inputMode": (this.keyboard()), 
				"enterkeyhint": (this.enter())
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"maxlength": (this.length_max()), 
				"type": (this.type())
			};
		}
		event(){
			return {...(super.event()), "input": (next) => (this.event_change(next))};
		}
		plugins(){
			return [(this.Submit())];
		}
	};
	($mol_mem(($.$mol_string.prototype), "value"));
	($mol_mem(($.$mol_string.prototype), "type"));
	($mol_mem(($.$mol_string.prototype), "event_change"));
	($mol_mem(($.$mol_string.prototype), "submit"));
	($mol_mem(($.$mol_string.prototype), "Submit"));
	($mol_mem(($.$mol_string.prototype), "selection"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * An input field for entering single line text.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_string_demo
         */
        class $mol_string extends $.$mol_string {
            event_change(next) {
                if (!next)
                    return;
                const el = this.dom_node();
                const from = el.selectionStart;
                const to = el.selectionEnd;
                try {
                    el.value = this.value_changed(el.value);
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                    $mol_fail_hidden(error);
                }
                if (to === null)
                    return;
                el.selectionEnd = to;
                el.selectionStart = from;
                this.selection_change(next);
            }
            error_report() {
                try {
                    if (this.focused())
                        this.value();
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                }
            }
            hint_visible() {
                return (this.enabled() ? this.hint() : '') || ' ';
            }
            disabled() {
                return !this.enabled();
            }
            autocomplete_native() {
                return this.autocomplete() ? 'on' : 'off';
            }
            selection_watcher() {
                return new $mol_dom_listener(this.$.$mol_dom_context.document, 'selectionchange', $mol_wire_async(event => this.selection_change(event)));
            }
            selection_change(event) {
                const el = this.dom_node();
                if (el !== this.$.$mol_dom_context.document.activeElement)
                    return;
                const [from, to] = this.selection([
                    el.selectionStart,
                    el.selectionEnd,
                ]);
                el.selectionEnd = to;
                el.selectionStart = from;
                if (to !== from && el.selectionEnd === el.selectionStart) {
                    el.selectionEnd = to;
                }
            }
            selection_start() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionStart == null)
                    return undefined;
                return this.selection()[0];
            }
            selection_end() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionEnd == null)
                    return undefined;
                return this.selection()[1];
            }
        }
        __decorate([
            $mol_action
        ], $mol_string.prototype, "event_change", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "error_report", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "selection_watcher", null);
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/string/string.view.css", "[mol_string] {\n\tbox-sizing: border-box;\n\toutline-offset: 0;\n\tborder: none;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tposition: relative;\n\tfont: inherit;\n\tflex: 1 1 auto;\n\tbackground: transparent;\n\tmin-width: 0;\n\tcolor: inherit;\n\tbackground: var(--mol_theme_field);\n}\n\n[mol_string]:disabled:not(:placeholder-shown) {\n\tbackground-color: transparent;\n\tcolor: var(--mol_theme_text);\n}\n\n[mol_string]:where(:not(:disabled)) {\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_string]:where(:not(:disabled)):hover {\n\tbox-shadow: inset 0 0 0 2px var(--mol_theme_line);\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_string]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_focus);\n}\n\n[mol_string]::placeholder {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_string]::-ms-clear {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$bog_builderui_field) = class $bog_builderui_field extends ($.$mol_string) {
		minimal_height(){
			return 36;
		}
	};


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($bog_builderui_field, {
        font: {
            family: $bog_builderui_tokens.font_body,
        },
        color: $bog_builderui_tokens.text,
        background: {
            color: $bog_builderui_tokens.field,
        },
        border: {
            radius: $bog_builderui_tokens.radius,
            width: '1px',
            style: 'solid',
            color: $bog_builderui_tokens.line,
        },
        padding: {
            top: '0.5rem',
            bottom: '0.5rem',
            left: '0.75rem',
            right: '0.75rem',
        },
        flex: {
            grow: 0,
            shrink: 1,
        },
        align: {
            self: 'stretch',
        },
        minWidth: 0,
        maxWidth: '100%',
        boxSizing: 'border-box',
    });
})($ || ($ = {}));

;
	($.$mol_scroll) = class $mol_scroll extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		event_scroll(next){
			if(next !== undefined) return next;
			return null;
		}
		scroll_top(next){
			if(next !== undefined) return next;
			return 0;
		}
		scroll_left(next){
			if(next !== undefined) return next;
			return 0;
		}
		attr(){
			return {...(super.attr()), "tabindex": (this.tabindex())};
		}
		event(){
			return {...(super.event()), "scroll": (next) => (this.event_scroll(next))};
		}
	};
	($mol_mem(($.$mol_scroll.prototype), "event_scroll"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_top"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_left"));


;
"use strict";
var $;
(function ($) {
    class $mol_print extends $mol_object {
        static before() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'beforeprint', () => {
                this.active(true);
            });
        }
        static after() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'afterprint', () => {
                this.active(false);
            });
        }
        static active(next) {
            this.before();
            this.after();
            return next || false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_print, "before", null);
    __decorate([
        $mol_mem
    ], $mol_print, "after", null);
    __decorate([
        $mol_mem
    ], $mol_print, "active", null);
    $.$mol_print = $mol_print;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Scrolling pane.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_scroll_demo
         */
        class $mol_scroll extends $.$mol_scroll {
            scroll_top(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollTop = next;
                return el.scrollTop;
            }
            scroll_left(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollLeft = next;
                return el.scrollLeft;
            }
            event_scroll(next) {
                const el = this.dom_node();
                this.scroll_left(el.scrollLeft, 'cache');
                this.scroll_top(el.scrollTop, 'cache');
            }
            minimal_height() {
                return this.$.$mol_print.active() ? null : 0;
            }
            minimal_width() {
                return this.$.$mol_print.active() ? null : 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_top", null);
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_left", null);
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem, px } = $mol_style_unit;
        $mol_style_define($mol_scroll, {
            display: 'grid',
            overflow: 'auto',
            flex: {
                direction: 'column',
                grow: 1,
                shrink: 1,
                // basis: 0,
            },
            outline: 'none',
            align: {
                self: 'stretch',
                items: 'flex-start',
            },
            boxSizing: 'border-box',
            willChange: 'scroll-position',
            scroll: {
                padding: [rem(.75), 0],
            },
            maxHeight: per(100),
            maxWidth: per(100),
            webkitOverflowScrolling: 'touch',
            contain: 'content',
            '>': {
                $mol_view: {
                    // transform: 'translateZ(0)', // enforce gpu scroll in all agents
                    gridArea: '1/1',
                },
            },
            '::before': {
                display: 'none',
            },
            '::after': {
                display: 'none',
            },
            '::-webkit-scrollbar': {
                width: rem(.25),
                height: rem(.25),
            },
            '@media': {
                'print': {
                    overflow: 'hidden',
                    contain: 'none',
                    maxHeight: 'unset',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_gallery) = class $mol_gallery extends ($.$mol_view) {
		items(){
			return [];
		}
		side_size(id){
			return "1";
		}
		side_items(id){
			return [];
		}
		sub(){
			return (this.items());
		}
		Side(id){
			const obj = new this.$.$mol_gallery();
			(obj.style) = () => ({"flexGrow": (this.side_size(id))});
			(obj.items) = () => ((this.side_items(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_gallery.prototype), "Side"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_gallery_demo
         */
        class $mol_gallery extends $.$mol_gallery {
            sub() {
                const items = this.items();
                if (items.length <= 3)
                    return items;
                return [
                    this.Side(0),
                    this.Side(1),
                ];
            }
            side_items(id) {
                const items = this.items();
                const middle = items.length % 2
                    ? Math.ceil(items.length / 3)
                    : items.length / 2;
                return id
                    ? items.slice(middle)
                    : items.slice(0, middle);
            }
            side_size(id) {
                return String(this.side_items(id).length);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_gallery.prototype, "sub", null);
        __decorate([
            $mol_mem_key
        ], $mol_gallery.prototype, "side_items", null);
        $$.$mol_gallery = $mol_gallery;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gallery/gallery.view.css", "[mol_gallery] {\n\tflex-wrap: wrap;\n\tflex: 1 1 auto;\n\talign-items: stretch;\n    align-content: stretch;\n}\n");
})($ || ($ = {}));

;
	($.$mol_chart_legend) = class $mol_chart_legend extends ($.$mol_scroll) {
		graph_legends(){
			return [];
		}
		Gallery(){
			const obj = new this.$.$mol_gallery();
			(obj.items) = () => ((this.graph_legends()));
			return obj;
		}
		Graph_sample(id){
			return null;
		}
		Graph_sample_box(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Graph_sample(id))]);
			return obj;
		}
		graph_title(id){
			return "";
		}
		Graph_title(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.graph_title(id))]);
			return obj;
		}
		graphs(){
			return [];
		}
		graphs_front(){
			return [];
		}
		sub(){
			return [(this.Gallery())];
		}
		Graph_legend(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Graph_sample_box(id)), (this.Graph_title(id))]);
			return obj;
		}
	};
	($mol_mem(($.$mol_chart_legend.prototype), "Gallery"));
	($mol_mem_key(($.$mol_chart_legend.prototype), "Graph_sample_box"));
	($mol_mem_key(($.$mol_chart_legend.prototype), "Graph_title"));
	($mol_mem_key(($.$mol_chart_legend.prototype), "Graph_legend"));


;
	($.$mol_svg_group) = class $mol_svg_group extends ($.$mol_svg) {
		dom_name(){
			return "g";
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    class $mol_vector extends Array {
        get length() {
            return super.length;
        }
        constructor(...values) { super(...values); }
        map(convert, self) {
            return super.map(convert, self);
        }
        merged(patches, combine) {
            return this.map((value, index) => combine(value, patches[index]));
        }
        limited(limits) {
            return this.merged(limits, (value, [min, max]) => (value < min) ? min : (value > max) ? max : value);
        }
        added0(diff) {
            return this.map(value => value + diff);
        }
        added1(diff) {
            return this.merged(diff, (a, b) => a + b);
        }
        substracted1(diff) {
            return this.merged(diff, (a, b) => a - b);
        }
        multed0(mult) {
            return this.map(value => value * mult);
        }
        multed1(mults) {
            return this.merged(mults, (a, b) => a * b);
        }
        divided1(mults) {
            return this.merged(mults, (a, b) => a / b);
        }
        powered0(mult) {
            return this.map(value => value ** mult);
        }
        expanded1(point) {
            return this.merged(point, (range, value) => range.expanded0(value));
        }
        expanded2(point) {
            return this.merged(point, (range1, range2) => {
                let next = range1;
                const Range = range1.constructor;
                if (range1[0] > range2[0])
                    next = new Range(range2[0], next.max);
                if (range1[1] < range2[1])
                    next = new Range(next.min, range2[1]);
                return next;
            });
        }
        center() {
            const Result = this[0].constructor;
            return new Result(...this[0].map((_, i) => this.reduce((sum, point) => sum + point[i], 0) / this.length));
        }
        distance() {
            let distance = 0;
            for (let i = 1; i < this.length; ++i) {
                distance += this[i - 1].reduce((sum, min, j) => sum + (min - this[i][j]) ** 2, 0) ** (1 / this[i].length);
            }
            return distance;
        }
        transponed() {
            return this[0].map((_, i) => this.map(row => row[i]));
        }
        get x() { return this[0]; }
        set x(next) { this[0] = next; }
        get y() { return this[1]; }
        set y(next) { this[1] = next; }
        get z() { return this[2]; }
        set z(next) { this[2] = next; }
    }
    $.$mol_vector = $mol_vector;
    class $mol_vector_1d extends $mol_vector {
    }
    $.$mol_vector_1d = $mol_vector_1d;
    class $mol_vector_2d extends $mol_vector {
    }
    $.$mol_vector_2d = $mol_vector_2d;
    class $mol_vector_3d extends $mol_vector {
    }
    $.$mol_vector_3d = $mol_vector_3d;
    class $mol_vector_range extends $mol_vector {
        0;
        1;
        constructor(min, max = min) {
            super(min, max);
            this[0] = min;
            this[1] = max;
        }
        get min() { return this[0]; }
        set min(next) { this[0] = next; }
        get max() { return this[1]; }
        set max(next) { this[1] = next; }
        get inversed() {
            return new this.constructor(this.max, this.min);
        }
        expanded0(value) {
            const Range = this.constructor;
            let range = this;
            if (value > range.max)
                range = new Range(range.min, value);
            if (value < range.min)
                range = new Range(value, range.max);
            return range;
        }
    }
    $.$mol_vector_range = $mol_vector_range;
    $.$mol_vector_range_full = new $mol_vector_range(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    class $mol_vector_matrix extends $mol_vector {
        added2(diff) {
            return this.merged(diff, (a, b) => a.map((a2, index) => a2 + b[index]));
        }
        multed2(diff) {
            return this.merged(diff, (a, b) => a.map((a2, index) => a2 * b[index]));
        }
    }
    $.$mol_vector_matrix = $mol_vector_matrix;
})($ || ($ = {}));

;
	($.$mol_svg_title) = class $mol_svg_title extends ($.$mol_svg) {
		dom_name(){
			return "title";
		}
		sub(){
			return [(this.title())];
		}
	};


;
"use strict";


;
	($.$mol_plot_graph) = class $mol_plot_graph extends ($.$mol_svg_group) {
		type(){
			return "solid";
		}
		color(){
			return "";
		}
		viewport_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		viewport_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_pane_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_pane_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		gap_x(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		gap_y(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		title(){
			return "";
		}
		hint(){
			return (this.title());
		}
		series_x(){
			return [];
		}
		series_y(){
			return [];
		}
		attr(){
			return {...(super.attr()), "mol_plot_graph_type": (this.type())};
		}
		style(){
			return {...(super.style()), "color": (this.color())};
		}
		viewport(){
			const obj = new this.$.$mol_vector_2d((this.viewport_x()), (this.viewport_y()));
			return obj;
		}
		shift(){
			return [0, 0];
		}
		scale(){
			return [1, 1];
		}
		cursor_position(){
			const obj = new this.$.$mol_vector_2d(NaN, NaN);
			return obj;
		}
		dimensions_pane(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_pane_x()), (this.dimensions_pane_y()));
			return obj;
		}
		dimensions(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_x()), (this.dimensions_y()));
			return obj;
		}
		size_real(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		gap(){
			const obj = new this.$.$mol_vector_2d((this.gap_x()), (this.gap_y()));
			return obj;
		}
		repos_x(id){
			return 0;
		}
		repos_y(id){
			return 0;
		}
		indexes(){
			return [];
		}
		points(){
			return [];
		}
		front(){
			return [];
		}
		back(){
			return [];
		}
		Hint(){
			const obj = new this.$.$mol_svg_title();
			(obj.title) = () => ((this.hint()));
			return obj;
		}
		hue(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		Sample(){
			return null;
		}
	};
	($mol_mem(($.$mol_plot_graph.prototype), "viewport_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "viewport_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_pane_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_pane_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "gap_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "gap_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "viewport"));
	($mol_mem(($.$mol_plot_graph.prototype), "cursor_position"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_pane"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions"));
	($mol_mem(($.$mol_plot_graph.prototype), "size_real"));
	($mol_mem(($.$mol_plot_graph.prototype), "gap"));
	($mol_mem(($.$mol_plot_graph.prototype), "Hint"));
	($mol_mem(($.$mol_plot_graph.prototype), "hue"));
	($.$mol_plot_graph_sample) = class $mol_plot_graph_sample extends ($.$mol_view) {
		type(){
			return "solid";
		}
		color(){
			return "black";
		}
		attr(){
			return {...(super.attr()), "mol_plot_graph_type": (this.type())};
		}
		style(){
			return {...(super.style()), "color": (this.color())};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_graph extends $.$mol_plot_graph {
            viewport() {
                const size = this.size_real();
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(0, size.x), new this.$.$mol_vector_range(0, size.y));
            }
            indexes() {
                return this.series_x().map((_, i) => i);
            }
            repos_x(val) {
                return val;
            }
            repos_y(val) {
                return val;
            }
            points() {
                const [shift_x, shift_y] = this.shift();
                const [scale_x, scale_y] = this.scale();
                const series_x = this.series_x();
                const series_y = this.series_y();
                return this.indexes().map(index => {
                    let point_x = Math.round(shift_x + this.repos_x(series_x[index]) * scale_x);
                    let point_y = Math.round(shift_y + this.repos_y(series_y[index]) * scale_y);
                    point_x = Math.max(Number.MIN_SAFE_INTEGER, Math.min(point_x, Number.MAX_SAFE_INTEGER));
                    point_y = Math.max(Number.MIN_SAFE_INTEGER, Math.min(point_y, Number.MAX_SAFE_INTEGER));
                    return [point_x, point_y];
                });
            }
            series_x() {
                return this.series_y().map((val, index) => index);
            }
            dimensions() {
                let next = new this.$.$mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
                const series_x = this.series_x();
                const series_y = this.series_y();
                for (let i = 0; i < series_x.length; i++) {
                    if (series_x[i] > next.x.max)
                        next.x.max = this.repos_x(series_x[i]);
                    if (series_x[i] < next.x.min)
                        next.x.min = this.repos_x(series_x[i]);
                    if (series_y[i] > next.y.max)
                        next.y.max = this.repos_y(series_y[i]);
                    if (series_y[i] < next.y.min)
                        next.y.min = this.repos_y(series_y[i]);
                }
                return next;
            }
            color() {
                const hue = this.hue();
                return hue ? `hsl( ${hue} , 100% , 35% )` : '';
            }
            front() {
                return [this];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_plot_graph.prototype, "indexes", null);
        __decorate([
            $mol_mem
        ], $mol_plot_graph.prototype, "series_x", null);
        __decorate([
            $mol_mem
        ], $mol_plot_graph.prototype, "dimensions", null);
        $$.$mol_plot_graph = $mol_plot_graph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/plot/graph/graph.view.css", "[mol_plot_graph] {\n\tstroke: currentColor;\n}\n\n[mol_plot_graph_sample] {\n\tborder-width: 0;\n\tborder-style: solid;\n}\n\n[mol_plot_graph_type=\"dashed\"] {\n\tstroke-dasharray: 4 4;\n\tborder-style: dashed;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_chart_legend extends $.$mol_chart_legend {
            graphs_front() {
                return this.graphs().filter(graph => graph.Sample());
            }
            graph_legends() {
                return this.graphs_front().map((graph, index) => this.Graph_legend(index));
            }
            graph_title(index) {
                return this.graphs_front()[index].title();
            }
            Graph_sample(index) {
                return this.graphs_front()[index].Sample();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_chart_legend.prototype, "graphs_front", null);
        $$.$mol_chart_legend = $mol_chart_legend;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/chart/legend/legend.view.css", "[mol_chart_legend] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tflex-direction: row;\n\tflex: 0 1 auto;\n}\n\n[mol_chart_legend_graph_legend] {\n\tdisplay: flex;\n\tjustify-content: flex-start;\n\tflex: 1 1 8rem;\n\tpadding: .5rem;\n}\n\n[mol_chart_legend_graph_title] {\n\tmargin: 0 .25rem;\n\tflex: 1 1 auto;\n}\n\n[mol_chart_legend_graph_sample_box] {\n\tposition: relative;\n\twidth: 1.5rem;\n\tflex: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_touch) = class $mol_touch extends ($.$mol_plugin) {
		event_start(next){
			if(next !== undefined) return next;
			return null;
		}
		event_move(next){
			if(next !== undefined) return next;
			return null;
		}
		event_end(next){
			if(next !== undefined) return next;
			return null;
		}
		event_leave(next){
			if(next !== undefined) return next;
			return null;
		}
		event_wheel(next){
			if(next !== undefined) return next;
			return null;
		}
		start_zoom(next){
			if(next !== undefined) return next;
			return 0;
		}
		start_distance(next){
			if(next !== undefined) return next;
			return 0;
		}
		zoom(next){
			if(next !== undefined) return next;
			return 1;
		}
		allow_draw(){
			return true;
		}
		allow_pan(){
			return true;
		}
		allow_zoom(){
			return true;
		}
		action_type(next){
			if(next !== undefined) return next;
			return "";
		}
		action_point(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(NaN, NaN);
			return obj;
		}
		start_pan(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		pan(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		pointer_center(){
			const obj = new this.$.$mol_vector_2d(NaN, NaN);
			return obj;
		}
		start_pos(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_precision(){
			return 16;
		}
		swipe_right(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_bottom(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_left(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_top(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_right(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_bottom(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_left(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_top(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_right(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_bottom(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_left(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_top(next){
			if(next !== undefined) return next;
			return null;
		}
		draw_start(next){
			if(next !== undefined) return next;
			return null;
		}
		draw(next){
			if(next !== undefined) return next;
			return null;
		}
		draw_end(next){
			if(next !== undefined) return next;
			return null;
		}
		style(){
			return {
				...(super.style()), 
				"touch-action": "none", 
				"overscroll-behavior": "none"
			};
		}
		event(){
			return {
				...(super.event()), 
				"pointerdown": (next) => (this.event_start(next)), 
				"pointermove": (next) => (this.event_move(next)), 
				"pointerup": (next) => (this.event_end(next)), 
				"pointerleave": (next) => (this.event_leave(next)), 
				"wheel": (next) => (this.event_wheel(next))
			};
		}
	};
	($mol_mem(($.$mol_touch.prototype), "event_start"));
	($mol_mem(($.$mol_touch.prototype), "event_move"));
	($mol_mem(($.$mol_touch.prototype), "event_end"));
	($mol_mem(($.$mol_touch.prototype), "event_leave"));
	($mol_mem(($.$mol_touch.prototype), "event_wheel"));
	($mol_mem(($.$mol_touch.prototype), "start_zoom"));
	($mol_mem(($.$mol_touch.prototype), "start_distance"));
	($mol_mem(($.$mol_touch.prototype), "zoom"));
	($mol_mem(($.$mol_touch.prototype), "action_type"));
	($mol_mem(($.$mol_touch.prototype), "action_point"));
	($mol_mem(($.$mol_touch.prototype), "start_pan"));
	($mol_mem(($.$mol_touch.prototype), "pan"));
	($mol_mem(($.$mol_touch.prototype), "pointer_center"));
	($mol_mem(($.$mol_touch.prototype), "start_pos"));
	($mol_mem(($.$mol_touch.prototype), "swipe_right"));
	($mol_mem(($.$mol_touch.prototype), "swipe_bottom"));
	($mol_mem(($.$mol_touch.prototype), "swipe_left"));
	($mol_mem(($.$mol_touch.prototype), "swipe_top"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_right"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_bottom"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_left"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_top"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_right"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_bottom"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_left"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_top"));
	($mol_mem(($.$mol_touch.prototype), "draw_start"));
	($mol_mem(($.$mol_touch.prototype), "draw"));
	($mol_mem(($.$mol_touch.prototype), "draw_end"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin for touch gestures.
         * @see [mol_plugin](../plugin/readme.md)
         */
        class $mol_touch extends $.$mol_touch {
            auto() {
                this.pointer_events();
                this.start_pan();
                this.start_pos();
                this.start_distance();
                this.start_zoom();
                this.action_type();
                this.view_rect();
            }
            pointer_events(next = []) {
                return next;
            }
            pointer_coords() {
                const events = this.pointer_events();
                const touches = events.filter(e => e.pointerType === 'touch');
                const pens = events.filter(e => e.pointerType === 'pen');
                const mouses = events.filter(e => !e.pointerType || e.pointerType === 'mouse');
                const choosen = touches.length ? touches : pens.length ? pens : mouses;
                return new $mol_vector(...choosen.map(event => this.event_coords(event)));
            }
            pointer_center() {
                const coords = this.pointer_coords();
                return coords.length ? coords.center() : new $mol_vector_2d(NaN, NaN);
            }
            event_coords(event) {
                const { left, top } = this.view_rect();
                return new $mol_vector_2d(Math.round(event.pageX - left), Math.round(event.pageY - top));
            }
            action_point() {
                const coord = this.pointer_center();
                if (!coord)
                    return null;
                const zoom = this.zoom();
                const pan = this.pan();
                return new $mol_vector_2d((coord.x - pan.x) / zoom, (coord.y - pan.y) / zoom);
            }
            event_eat(event) {
                if (event instanceof PointerEvent) {
                    const events = this.pointer_events()
                        .filter(e => e instanceof PointerEvent)
                        .filter(e => e.pointerId !== event.pointerId);
                    if (event.type !== 'pointerup' && event.type !== 'pointerleave')
                        events.push(event);
                    this.pointer_events(events);
                    const touch_count = events.filter(e => e.pointerType === 'touch').length;
                    if (this.allow_zoom() && touch_count === 2) {
                        return this.action_type('zoom');
                    }
                    if (this.action_type() === 'zoom' && touch_count === 1) {
                        return this.action_type('zoom');
                    }
                    let button;
                    (function (button) {
                        button[button["left"] = 1] = "left";
                        button[button["right"] = 2] = "right";
                        button[button["middle"] = 4] = "middle";
                    })(button || (button = {}));
                    if (events.length > 0) {
                        if (event.ctrlKey && this.allow_zoom())
                            return this.action_type('zoom');
                        if (event.buttons === button.left && this.allow_draw())
                            return this.action_type('draw');
                        if (event.buttons && this.allow_pan())
                            return this.action_type('pan');
                    }
                    return this.action_type('');
                }
                if (event instanceof WheelEvent) {
                    this.pointer_events([event]);
                    if (event.shiftKey)
                        return this.action_type('pan');
                    return this.action_type('zoom');
                }
                return this.action_type('');
            }
            event_start(event) {
                if (event.defaultPrevented)
                    return;
                this.start_pan(this.pan());
                const action_type = this.event_eat(event);
                if (!action_type)
                    return;
                const coords = this.pointer_coords();
                this.start_pos(coords.center());
                if (action_type === 'draw') {
                    this.draw_start(event);
                    return;
                }
                this.start_distance(coords.distance());
                this.start_zoom(this.zoom());
            }
            event_move(event) {
                if (event.defaultPrevented)
                    return;
                const rect = this.view_rect();
                if (!rect)
                    return;
                const start_pan = this.start_pan();
                const action_type = this.event_eat(event);
                const start_pos = this.start_pos();
                let pos = this.pointer_center();
                if (!action_type)
                    return;
                if (!start_pos)
                    return;
                if (action_type === 'draw') {
                    const distance = new $mol_vector(start_pos, pos).distance();
                    if (distance >= 4) {
                        this.draw(event);
                    }
                    return;
                }
                if (action_type === 'pan') {
                    this.dom_node().setPointerCapture(event.pointerId);
                    this.pan(new $mol_vector_2d(start_pan[0] + pos[0] - start_pos[0], start_pan[1] + pos[1] - start_pos[1]));
                }
                const precision = this.swipe_precision();
                if ((this.swipe_right !== $mol_touch.prototype.swipe_right
                    || this.swipe_from_left !== $mol_touch.prototype.swipe_from_left
                    || this.swipe_to_right !== $mol_touch.prototype.swipe_to_right)
                    && pos[0] - start_pos[0] > precision * 2
                    && Math.abs(pos[1] - start_pos[1]) < precision) {
                    this.swipe_right(event);
                }
                if ((this.swipe_left !== $mol_touch.prototype.swipe_left
                    || this.swipe_from_right !== $mol_touch.prototype.swipe_from_right
                    || this.swipe_to_left !== $mol_touch.prototype.swipe_to_left)
                    && start_pos[0] - pos[0] > precision * 2
                    && Math.abs(pos[1] - start_pos[1]) < precision) {
                    this.swipe_left(event);
                }
                if ((this.swipe_bottom !== $mol_touch.prototype.swipe_bottom
                    || this.swipe_from_top !== $mol_touch.prototype.swipe_from_top
                    || this.swipe_to_bottom !== $mol_touch.prototype.swipe_to_bottom)
                    && pos[1] - start_pos[1] > precision * 2
                    && Math.abs(pos[0] - start_pos[0]) < precision) {
                    this.swipe_bottom(event);
                }
                if ((this.swipe_top !== $mol_touch.prototype.swipe_top
                    || this.swipe_from_bottom !== $mol_touch.prototype.swipe_from_bottom
                    || this.swipe_to_top !== $mol_touch.prototype.swipe_to_top)
                    && start_pos[1] - pos[1] > precision * 2
                    && Math.abs(pos[0] - start_pos[0]) < precision) {
                    this.swipe_top(event);
                }
                if (action_type === 'zoom') {
                    const coords = this.pointer_coords();
                    const distance = coords.distance();
                    const start_distance = this.start_distance();
                    const center = coords.center();
                    const start_zoom = this.start_zoom();
                    let mult = Math.abs(distance - start_distance) < 32 ? 1 : distance / start_distance;
                    this.zoom(start_zoom * mult);
                    const pan = new $mol_vector_2d((start_pan[0] - center[0] + pos[0] - start_pos[0]) * mult + center[0], (start_pan[1] - center[1] + pos[1] - start_pos[1]) * mult + center[1]);
                    this.pan(pan);
                }
            }
            event_end(event) {
                const action = this.action_type();
                if (action === 'draw') {
                    this.draw_end(event);
                }
                this.event_leave(event);
            }
            event_leave(event) {
                this.event_eat(event);
                this.dom_node().releasePointerCapture(event.pointerId);
                this.start_pos(null);
            }
            swipe_left(event) {
                if (this.view_rect().right - this.start_pos()[0] < this.swipe_precision() * 2)
                    this.swipe_from_right(event);
                else
                    this.swipe_to_left(event);
                this.event_end(event);
            }
            swipe_right(event) {
                if (this.start_pos()[0] - this.view_rect().left < this.swipe_precision() * 2)
                    this.swipe_from_left(event);
                else
                    this.swipe_to_right(event);
                this.event_end(event);
            }
            swipe_top(event) {
                if (this.view_rect().bottom - this.start_pos()[1] < this.swipe_precision() * 2)
                    this.swipe_from_bottom(event);
                else
                    this.swipe_to_top(event);
                this.event_end(event);
            }
            swipe_bottom(event) {
                if (this.start_pos()[1] - this.view_rect().top < this.swipe_precision() * 2)
                    this.swipe_from_top(event);
                else
                    this.swipe_to_bottom(event);
                this.event_end(event);
            }
            event_wheel(event) {
                if (event.defaultPrevented)
                    return;
                if (this.pan === $mol_touch.prototype.pan && this.zoom === $mol_touch.prototype.zoom)
                    return;
                if (this.pan !== $mol_touch.prototype.pan) {
                    event.preventDefault();
                }
                const action_type = this.event_eat(event);
                if (action_type === 'zoom') {
                    const zoom_prev = this.zoom() || 0.001;
                    let zoom_next = zoom_prev * (1 - .001 * Math.min(event.deltaY, 100));
                    zoom_next = this.zoom(zoom_next);
                    const mult = zoom_next / zoom_prev;
                    const pan_prev = this.pan();
                    const center = this.pointer_center();
                    const pan_next = pan_prev.multed0(mult).added1(center.multed0(1 - mult));
                    this.pan(pan_next);
                }
                if (action_type === 'pan') {
                    const pan_prev = this.pan();
                    const pan_next = new $mol_vector_2d(pan_prev.x - event.deltaX, pan_prev.y - event.deltaY);
                    this.pan(pan_next);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "pointer_events", null);
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "pointer_coords", null);
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "pointer_center", null);
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "action_point", null);
        $$.$mol_touch = $mol_touch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_plot_pane) = class $mol_plot_pane extends ($.$mol_svg_root) {
		gap_x(){
			const obj = new this.$.$mol_vector_range((this.gap_left()), (this.gap_right()));
			return obj;
		}
		gap_y(){
			const obj = new this.$.$mol_vector_range((this.gap_bottom()), (this.gap_top()));
			return obj;
		}
		shift_limit_x(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		shift_limit_y(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		scale_limit_x(){
			const obj = new this.$.$mol_vector_range(0, Infinity);
			return obj;
		}
		scale_limit_y(){
			const obj = new this.$.$mol_vector_range(0, -Infinity);
			return obj;
		}
		dimensions_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_viewport_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_viewport_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		graphs_sorted(){
			return [];
		}
		graphs(){
			return [];
		}
		graphs_positioned(){
			return (this.graphs());
		}
		graphs_visible(){
			return (this.graphs_positioned());
		}
		zoom(next){
			if(next !== undefined) return next;
			return 1;
		}
		cursor_position(){
			return (this.Touch().pointer_center());
		}
		allow_draw(){
			return true;
		}
		allow_pan(){
			return true;
		}
		allow_zoom(){
			return true;
		}
		action_type(){
			return (this.Touch().action_type());
		}
		action_point(){
			return (this.Touch().action_point());
		}
		draw_start(next){
			if(next !== undefined) return next;
			return null;
		}
		draw(next){
			if(next !== undefined) return next;
			return null;
		}
		draw_end(next){
			if(next !== undefined) return next;
			return null;
		}
		Touch(){
			const obj = new this.$.$mol_touch();
			(obj.zoom) = (next) => ((this.zoom(next)));
			(obj.pan) = (next) => ((this.shift(next)));
			(obj.allow_draw) = () => ((this.allow_draw()));
			(obj.allow_pan) = () => ((this.allow_pan()));
			(obj.allow_zoom) = () => ((this.allow_zoom()));
			(obj.draw_start) = (next) => ((this.draw_start(next)));
			(obj.draw) = (next) => ((this.draw(next)));
			(obj.draw_end) = (next) => ((this.draw_end(next)));
			return obj;
		}
		aspect(){
			return "none";
		}
		hue_base(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		hue_shift(next){
			if(next !== undefined) return next;
			return 111;
		}
		gap_hor(){
			return 48;
		}
		gap_vert(){
			return 24;
		}
		gap_left(){
			return (this.gap_hor());
		}
		gap_right(){
			return (this.gap_hor());
		}
		gap_top(){
			return (this.gap_vert());
		}
		gap_bottom(){
			return (this.gap_vert());
		}
		gap(){
			const obj = new this.$.$mol_vector_2d((this.gap_x()), (this.gap_y()));
			return obj;
		}
		shift_limit(){
			const obj = new this.$.$mol_vector_2d((this.shift_limit_x()), (this.shift_limit_y()));
			return obj;
		}
		shift_default(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		shift(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		scale_limit(){
			const obj = new this.$.$mol_vector_2d((this.scale_limit_x()), (this.scale_limit_y()));
			return obj;
		}
		scale_default(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		scale(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(1, -1);
			return obj;
		}
		scale_x(next){
			if(next !== undefined) return next;
			return 1;
		}
		scale_y(next){
			if(next !== undefined) return next;
			return -1;
		}
		size(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		size_real(){
			const obj = new this.$.$mol_vector_2d(1, 1);
			return obj;
		}
		dimensions(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_x()), (this.dimensions_y()));
			return obj;
		}
		dimensions_viewport(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_viewport_x()), (this.dimensions_viewport_y()));
			return obj;
		}
		sub(){
			return (this.graphs_sorted());
		}
		graphs_colored(){
			return (this.graphs_visible());
		}
		plugins(){
			return [...(super.plugins()), (this.Touch())];
		}
	};
	($mol_mem(($.$mol_plot_pane.prototype), "gap_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "gap_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_limit_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_limit_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_limit_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_limit_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_viewport_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_viewport_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "zoom"));
	($mol_mem(($.$mol_plot_pane.prototype), "draw_start"));
	($mol_mem(($.$mol_plot_pane.prototype), "draw"));
	($mol_mem(($.$mol_plot_pane.prototype), "draw_end"));
	($mol_mem(($.$mol_plot_pane.prototype), "Touch"));
	($mol_mem(($.$mol_plot_pane.prototype), "hue_base"));
	($mol_mem(($.$mol_plot_pane.prototype), "hue_shift"));
	($mol_mem(($.$mol_plot_pane.prototype), "gap"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_limit"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_default"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_limit"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_default"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "size"));
	($mol_mem(($.$mol_plot_pane.prototype), "size_real"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_viewport"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Fastest plot lib for vector graphics.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_plot_demo
         */
        class $mol_plot_pane extends $.$mol_plot_pane {
            dimensions() {
                const graphs = this.graphs();
                let next = new this.$.$mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
                for (let graph of graphs) {
                    next = next.expanded2(graph.dimensions());
                }
                return next;
            }
            size() {
                const dims = this.dimensions();
                return new this.$.$mol_vector_2d((dims.x.max - dims.x.min) || 1, (dims.y.max - dims.y.min) || 1);
            }
            graph_hue(index) {
                return (360 + (this.hue_base() + this.hue_shift() * index) % 360) % 360;
            }
            graphs_colored() {
                const graphs = this.graphs_visible();
                for (let index = 0; index < graphs.length; index++) {
                    graphs[index].hue(this.graph_hue(index));
                }
                return graphs;
            }
            size_real() {
                const rect = this.view_rect();
                if (!rect)
                    return new this.$.$mol_vector_2d(1, 1);
                return new this.$.$mol_vector_2d(rect.width, rect.height);
            }
            view_box() {
                const size = this.size_real();
                return `0 0 ${size.x} ${size.y}`;
            }
            scale_limit() {
                const { x: { max: right }, y: { max: top } } = super.scale_limit();
                const gap = this.gap();
                const size = this.size();
                const real = this.size_real();
                const left = +(real.x - gap.x.min - gap.x.max) / size.x;
                const bottom = -(real.y - gap.y.max - gap.y.min) / size.y;
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(left, right), new this.$.$mol_vector_range(top, bottom));
            }
            scale_default() {
                const limits = this.scale_limit();
                return new $mol_vector_2d(limits.x.min, limits.y.max);
            }
            scale(next) {
                if (next === undefined) {
                    if (!this.graph_touched)
                        return this.scale_default();
                    next = $mol_mem_cached(() => this.scale()) ?? this.scale_default();
                }
                this.graph_touched = true;
                return next.limited(this.scale_limit());
            }
            scale_x(next) {
                return this.scale(next === undefined
                    ? undefined
                    : new $mol_vector_2d(next, this.scale().y)).x;
            }
            scale_y(next) {
                return this.scale(next === undefined
                    ? undefined
                    : new $mol_vector_2d(this.scale().x, next)).y;
            }
            shift_limit() {
                const dims = this.dimensions();
                const [scale_x, scale_y] = this.scale();
                const size = this.size_real();
                const gap = this.gap();
                const left = gap.x.min - dims.x.min * scale_x;
                const right = size.x - gap.x.max - dims.x.max * scale_x;
                const top = gap.y.max - dims.y.max * scale_y;
                const bottom = size.y - gap.y.min - dims.y.min * scale_y;
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(right, left), new this.$.$mol_vector_range(bottom, top));
            }
            shift_default() {
                const limits = this.shift_limit();
                return new $mol_vector_2d(limits.x.min, limits.y.min);
            }
            graph_touched = false;
            shift(next) {
                if (next === undefined) {
                    if (!this.graph_touched)
                        return this.shift_default();
                    next = $mol_mem_cached(() => this.shift()) ?? this.shift_default();
                }
                this.graph_touched = true;
                return next.limited(this.shift_limit());
            }
            reset(event) {
                this.graph_touched = false;
                this.scale(this.scale_default());
                this.shift(this.shift_default());
            }
            graphs_visible() {
                const viewport = this.dimensions_viewport();
                const size_real = this.size_real();
                const max_x = (viewport.x.max - viewport.x.min) / size_real.x;
                const max_y = (viewport.y.max - viewport.y.min) / size_real.y;
                return this.graphs_positioned().filter(graph => {
                    const dims = graph.dimensions();
                    if (dims.x.min > dims.x.max)
                        return true;
                    if (dims.y.min > dims.y.max)
                        return true;
                    const size_x = dims.x.max - dims.x.min;
                    const size_y = dims.y.max - dims.y.min;
                    if ((size_x || size_y) && size_x < max_x && size_y < max_y)
                        return false;
                    if (dims.x.min > viewport.x.max)
                        return false;
                    if (dims.x.max < viewport.x.min)
                        return false;
                    if (dims.y.min > viewport.y.max)
                        return false;
                    if (dims.y.max < viewport.y.min)
                        return false;
                    return true;
                });
            }
            graphs_positioned() {
                const graphs = this.graphs();
                for (let graph of graphs) {
                    graph.shift = () => this.shift();
                    graph.scale = () => this.scale();
                    graph.dimensions_pane = () => this.dimensions_viewport();
                    graph.viewport = () => this.viewport();
                    graph.size_real = () => this.size_real();
                    graph.cursor_position = () => this.cursor_position();
                    graph.gap = () => this.gap();
                }
                return graphs;
            }
            dimensions_viewport() {
                const shift = this.shift().multed0(-1);
                const scale = this.scale().powered0(-1);
                return this.viewport().map((range, i) => range.added0(shift[i]).multed0(scale[i]).sort((a, b) => a - b));
            }
            viewport() {
                const size = this.size_real();
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(0, size.x), new this.$.$mol_vector_range(0, size.y));
            }
            graphs_sorted() {
                const graphs = this.graphs_colored();
                const sorted = [];
                for (let graph of graphs)
                    sorted.push(...graph.back());
                for (let graph of graphs)
                    sorted.push(...graph.front());
                return sorted;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "dimensions", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "size", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_colored", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "scale_limit", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "scale", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "shift_limit", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "shift_default", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "shift", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_visible", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_positioned", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "dimensions_viewport", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "viewport", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_sorted", null);
        $$.$mol_plot_pane = $mol_plot_pane;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/plot/pane/pane.view.css", "[mol_plot_pane] {\n\tcolor: var(--mol_theme_control);\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tstroke-width: 2px;\n\tuser-select: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_chart) = class $mol_chart extends ($.$mol_view) {
		Legend(){
			const obj = new this.$.$mol_chart_legend();
			(obj.graphs) = () => ((this.graphs_colored()));
			return obj;
		}
		zoom(next){
			return (this.Plot().scale_x(next));
		}
		graphs_colored(){
			return (this.Plot().graphs_colored());
		}
		hue_base(){
			return 210;
		}
		hue_shift(){
			return 163;
		}
		Plot(){
			const obj = new this.$.$mol_plot_pane();
			(obj.zoom) = (next) => ((this.zoom(next)));
			(obj.gap_left) = () => ((this.gap_left()));
			(obj.gap_right) = () => ((this.gap_right()));
			(obj.gap_bottom) = () => ((this.gap_bottom()));
			(obj.gap_top) = () => ((this.gap_top()));
			(obj.graphs) = () => ((this.graphs()));
			(obj.hue_base) = () => ((this.hue_base()));
			(obj.hue_shift) = () => ((this.hue_shift()));
			return obj;
		}
		gap_hor(){
			return 48;
		}
		gap_vert(){
			return 24;
		}
		gap_left(){
			return (this.gap_hor());
		}
		gap_right(){
			return (this.gap_hor());
		}
		gap_bottom(){
			return (this.gap_vert());
		}
		gap_top(){
			return (this.gap_vert());
		}
		graphs(){
			return [];
		}
		sub(){
			return [(this.Legend()), (this.Plot())];
		}
	};
	($mol_mem(($.$mol_chart.prototype), "Legend"));
	($mol_mem(($.$mol_chart.prototype), "Plot"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/chart/chart.view.css", "[mol_chart] {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-self: stretch;\n\tflex: 1 1 auto;\n\tmin-height: 0;\n}\n\n[mol_chart_plot] {\n\tflex: 1 0 50%;\n\tmargin: .5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$bog_builderui_chart) = class $bog_builderui_chart extends ($.$mol_chart) {};


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($bog_builderui_chart, {
        font: {
            family: $bog_builderui_tokens.font_body,
        },
        color: $bog_builderui_tokens.text,
    });
})($ || ($ = {}));

;
	($.$mol_ghost) = class $mol_ghost extends ($.$mol_view) {
		Sub(){
			const obj = new this.$.$mol_view();
			return obj;
		}
	};
	($mol_mem(($.$mol_ghost.prototype), "Sub"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Mixin view logic to DOM node of another component.
         */
        class $mol_ghost extends $.$mol_ghost {
            dom_node_external(next) {
                return this.Sub().dom_node(next);
            }
            dom_node_actual() {
                this.dom_node();
                const node = this.Sub().dom_node_actual();
                const attr = this.attr();
                const style = this.style();
                const fields = this.field();
                $mol_dom_render_attributes(node, attr);
                $mol_dom_render_styles(node, style);
                $mol_dom_render_fields(node, fields);
                return node;
            }
            dom_tree() {
                const Sub = this.Sub();
                const node = Sub.dom_tree();
                try {
                    this.dom_node_actual();
                    this.auto();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                return node;
            }
            title() {
                return this.Sub().title();
            }
            minimal_width() {
                return this.Sub().minimal_width();
            }
            minimal_height() {
                return this.Sub().minimal_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_ghost.prototype, "dom_node_actual", null);
        $$.$mol_ghost = $mol_ghost;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_follower) = class $mol_follower extends ($.$mol_ghost) {
		transform(){
			return "";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		align(){
			return [-.5, -.5];
		}
		offset(){
			return [0, 0];
		}
		style(){
			return {...(super.style()), "transform": (this.transform())};
		}
	};
	($mol_mem(($.$mol_follower.prototype), "Anchor"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Marker on top of another component with tracking of its position.
         */
        class $mol_follower extends $.$mol_follower {
            pos() {
                const self_rect = this.view_rect();
                const prev = $mol_wire_probe(() => this.pos());
                const anchor_rect = this.Anchor()?.view_rect();
                if (!anchor_rect)
                    return null;
                const offset = this.offset();
                const align = this.align();
                const left = Math.floor((prev?.left ?? 0)
                    - (self_rect?.left ?? 0)
                    + (self_rect?.width ?? 0) * align[0]
                    + (anchor_rect?.left ?? 0)
                    + offset[0] * (anchor_rect?.width ?? 0));
                const top = Math.floor((prev?.top ?? 0)
                    - (self_rect?.top ?? 0)
                    + (self_rect?.height ?? 0) * align[1]
                    + (anchor_rect?.top ?? 0)
                    + offset[1] * (anchor_rect?.height ?? 0));
                return { left, top };
            }
            transform() {
                const pos = this.pos();
                if (!pos)
                    return 'scale(0)';
                const { left, top } = pos;
                return `translate( ${left}px, ${top}px )`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "pos", null);
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "transform", null);
        $$.$mol_follower = $mol_follower;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/follower/follower.view.css", "[mol_follower] {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\ttransition: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_pop) = class $mol_pop extends ($.$mol_view) {
		bubble(){
			return null;
		}
		Anchor(){
			return null;
		}
		bubble_offset(){
			return [0, 1];
		}
		bubble_align(){
			return [0, 0];
		}
		bubble_content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		Bubble(){
			const obj = new this.$.$mol_pop_bubble();
			(obj.content) = () => ((this.bubble_content()));
			(obj.height_max) = () => ((this.height_max()));
			return obj;
		}
		Follower(){
			const obj = new this.$.$mol_follower();
			(obj.offset) = () => ((this.bubble_offset()));
			(obj.align) = () => ((this.bubble_align()));
			(obj.Anchor) = () => ((this.Anchor()));
			(obj.Sub) = () => ((this.Bubble()));
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		align_vert(){
			return "";
		}
		align_hor(){
			return "";
		}
		align(){
			return "bottom_center";
		}
		prefer(){
			return "vert";
		}
		auto(){
			return [(this.bubble())];
		}
		sub(){
			return [(this.Anchor())];
		}
		sub_visible(){
			return [(this.Anchor()), (this.Follower())];
		}
	};
	($mol_mem(($.$mol_pop.prototype), "Bubble"));
	($mol_mem(($.$mol_pop.prototype), "Follower"));
	($mol_mem(($.$mol_pop.prototype), "showed"));
	($.$mol_pop_bubble) = class $mol_pop_bubble extends ($.$mol_view) {
		content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		sub(){
			return (this.content());
		}
		style(){
			return {...(super.style()), "maxHeight": (this.height_max())};
		}
		attr(){
			return {
				...(super.attr()), 
				"tabindex": 0, 
				"popover": "manual"
			};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * `Bubble` that can be shown anchored to `Anchor` element.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo
         */
        class $mol_pop extends $.$mol_pop {
            showed(next = false) {
                this.focused();
                return next;
            }
            sub_visible() {
                return [
                    this.Anchor(),
                    ...this.showed() ? [this.Follower()] : [],
                ];
            }
            height_max() {
                const viewport = this.$.$mol_window.size();
                const rect_bubble = this.view_rect();
                const align = this.align_vert();
                if (align === 'bottom')
                    return (viewport.height - rect_bubble.bottom);
                if (align === 'top')
                    return rect_bubble.top;
                return 0;
            }
            align() {
                switch (this.prefer()) {
                    case 'hor': return `${this.align_hor()}_${this.align_vert()}`;
                    case 'vert': return `${this.align_vert()}_${this.align_hor()}`;
                    default: return this.prefer();
                }
            }
            align_vert() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.top > viewport.height / 2 ? 'top' : 'bottom';
            }
            align_hor() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.left > viewport.width / 2 ? 'left' : 'right';
            }
            bubble_offset() {
                const tags = new Set(this.align().split('_'));
                if (tags.has('suspense'))
                    return [0, 0];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                if ([...tags][0] === hor) {
                    return [
                        { left: 0, center: .5, right: 1 }[hor],
                        { top: 1, center: .5, bottom: 0 }[vert],
                    ];
                }
                else {
                    return [
                        { left: 1, center: .5, right: 0 }[hor],
                        { top: 0, center: .5, bottom: 1 }[vert],
                    ];
                }
            }
            bubble_align() {
                const tags = new Set(this.align().split('_'));
                if (tags.has('suspense'))
                    return [-.5, -.5];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                return [
                    { left: -1, center: -.5, right: 0, suspense: -.5 }[hor],
                    { top: -1, center: -.5, bottom: 0, suspense: -.5 }[vert],
                ];
            }
            bubble() {
                if (!this.showed())
                    return;
                this.Bubble().dom_node().showPopover?.();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "showed", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "height_max", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_vert", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_hor", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_offset", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble", null);
        $$.$mol_pop = $mol_pop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pop/pop.view.css", "@keyframes mol_pop_show {\n\tfrom {\n\t\topacity: 0;\n\t}\n}\n\n[mol_pop] {\n\tposition: relative;\n\tdisplay: inline-flex;\n}\n\n[mol_pop_bubble] {\n\tborder: none;\n\tpadding: 0;\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: 0 0 1rem hsla(0,0%,0%,.5);\n\tborder-radius: var(--mol_gap_round);\n\tposition: fixed;\n\tz-index: var(--mol_layer_popup);\n\tbackground: var(--mol_theme_back);\n\tmax-width: none;\n\tmax-height: none;\n\t/* overflow: hidden;\n\toverflow-y: scroll;\n\toverflow-y: overlay; */\n\tword-break: normal;\n\twidth: max-content;\n\t/* height: max-content; */\n\tflex-direction: column;\n\tmax-width: calc( 100vw - var(--mol_gap_page) );\n\tmax-height: 80vw;\n\tcontain: paint;\n\ttransition-property: opacity;\n\t/* Safari ios layer fix, https://t.me/mam_mol/170017 */\n\ttransform: translateZ(0);\n\tanimation: mol_pop_show .1s ease-in;\n}\n\n:where( [mol_pop_bubble] > * ) {\n\tbackground: var(--mol_theme_card);\n}\n\n[mol_pop_bubble][mol_scroll] {\n\tbackground: var(--mol_theme_back);\n}\n\n[mol_pop_bubble]:focus {\n\toutline: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_check) = class $mol_check extends ($.$mol_button_minor) {
		checked(next){
			if(next !== undefined) return next;
			return false;
		}
		aria_checked(){
			return "false";
		}
		aria_role(){
			return "checkbox";
		}
		Icon(){
			return null;
		}
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		label(){
			return [(this.Title())];
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_check_checked": (this.checked()), 
				"aria-checked": (this.aria_checked()), 
				"role": (this.aria_role())
			};
		}
		sub(){
			return [(this.Icon()), (this.label())];
		}
	};
	($mol_mem(($.$mol_check.prototype), "checked"));
	($mol_mem(($.$mol_check.prototype), "Title"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_event extends $mol_object {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        prevented(next) {
            if (next)
                this.native.preventDefault();
            return this.native.defaultPrevented;
        }
        static wrap(event) {
            return new this.$.$mol_dom_event(event);
        }
    }
    __decorate([
        $mol_action
    ], $mol_dom_event.prototype, "prevented", null);
    __decorate([
        $mol_action
    ], $mol_dom_event, "wrap", null);
    $.$mol_dom_event = $mol_dom_event;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/check.css", "[mol_check] {\n\tflex: 0 0 auto;\n\tjustify-content: flex-start;\n\talign-content: center;\n\t/* align-items: flex-start; */\n\tborder: none;\n\tfont-weight: inherit;\n\tbox-shadow: none;\n\ttext-align: left;\n\tdisplay: inline-flex;\n\tflex-wrap: nowrap;\n}\n\n[mol_check_title] {\n\tflex-shrink: 1;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Checkbox UI component. See Variants for more concrete implementations.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_box_demo
         */
        class $mol_check extends $.$mol_check {
            click(next) {
                const event = next ? $mol_dom_event.wrap(next) : null;
                if (event?.prevented())
                    return;
                event?.prevented(true);
                this.checked(!this.checked());
            }
            sub() {
                return [
                    ...$mol_maybe(this.Icon()),
                    ...this.label(),
                ];
            }
            label() {
                return this.title() ? super.label() : [];
            }
            aria_checked() {
                return String(this.checked());
            }
        }
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_pick) = class $mol_pick extends ($.$mol_pop) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_enabled(){
			return true;
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_content(){
			return [(this.title())];
		}
		hint(){
			return "";
		}
		Trigger(){
			const obj = new this.$.$mol_check();
			(obj.minimal_width) = () => (40);
			(obj.minimal_height) = () => (40);
			(obj.enabled) = () => ((this.trigger_enabled()));
			(obj.checked) = (next) => ((this.showed(next)));
			(obj.clicks) = (next) => ((this.clicks(next)));
			(obj.sub) = () => ((this.trigger_content()));
			(obj.hint) = () => ((this.hint()));
			return obj;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		Anchor(){
			return (this.Trigger());
		}
	};
	($mol_mem(($.$mol_pick.prototype), "keydown"));
	($mol_mem(($.$mol_pick.prototype), "clicks"));
	($mol_mem(($.$mol_pick.prototype), "Trigger"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Pop-up display and hide by mouse click, also hide by unfocus.
         * Based on [mol_pop](https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo) component.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pick_demo
         */
        class $mol_pick extends $.$mol_pick {
            keydown(event) {
                if (!this.trigger_enabled())
                    return;
                if (event.defaultPrevented)
                    return;
                if (event.keyCode === $mol_keyboard_code.escape) {
                    if (!this.showed())
                        return;
                    event.preventDefault();
                    this.showed(false);
                }
            }
        }
        $$.$mol_pick = $mol_pick;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pick/pick.view.css", "[mol_pick_trigger] {\n\talign-items: center;\n\tflex-grow: 1;\n}\n");
})($ || ($ = {}));

;
	($.$mol_paragraph) = class $mol_paragraph extends ($.$mol_view) {
		line_height(){
			return 24;
		}
		letter_width(){
			return 7;
		}
		width_limit(){
			return +Infinity;
		}
		row_width(){
			return 0;
		}
		sub(){
			return [(this.title())];
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paragraph extends $.$mol_paragraph {
            maximal_width() {
                let width = 0;
                const letter = this.letter_width();
                for (const kid of this.sub()) {
                    if (!kid)
                        continue;
                    if (kid instanceof $mol_view) {
                        width += kid.maximal_width();
                    }
                    else if (typeof kid !== 'object') {
                        width += String(kid).length * letter;
                    }
                }
                return width;
            }
            width_limit() {
                return this.$.$mol_window.size().width;
            }
            minimal_width() {
                return this.letter_width();
            }
            row_width() {
                return Math.max(Math.min(this.width_limit(), this.maximal_width()), this.letter_width());
            }
            minimal_height() {
                return Math.max(1, Math.ceil(this.maximal_width() / this.row_width())) * this.line_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "maximal_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "row_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "minimal_height", null);
        $$.$mol_paragraph = $mol_paragraph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/paragraph/paragraph.view.css", ":where([mol_paragraph]) {\n\tmargin: 0;\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));

;
	($.$mol_dimmer) = class $mol_dimmer extends ($.$mol_paragraph) {
		parts(){
			return [];
		}
		string(id){
			return "";
		}
		haystack(){
			return "";
		}
		needle(){
			return "";
		}
		sub(){
			return (this.parts());
		}
		Low(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
		High(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_dimmer.prototype), "Low"));
	($mol_mem_key(($.$mol_dimmer.prototype), "High"));


;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    let x = /x/[Symbol.matchAll];
    /** Type safe reguar expression builder */
    class $mol_regexp extends RegExp {
        groups;
        /** Prefer to use $mol_regexp.from */
        constructor(source, flags = 'gsu', groups = []) {
            super(source, flags);
            this.groups = groups;
        }
        *[Symbol.matchAll](str) {
            const index = this.lastIndex;
            this.lastIndex = 0;
            try {
                while (this.lastIndex < str.length) {
                    const found = this.exec(str);
                    if (!found)
                        break;
                    yield found;
                }
            }
            finally {
                this.lastIndex = index;
            }
        }
        /** Parses input and returns found capture groups or null */
        [Symbol.match](str) {
            const res = [...this[Symbol.matchAll](str)].filter(r => r.groups).map(r => r[0]);
            if (!res.length)
                return null;
            return res;
        }
        /** Splits string by regexp edges */
        [Symbol.split](str) {
            const res = [];
            let token_last = null;
            for (let token of this[Symbol.matchAll](str)) {
                if (token.groups && (token_last ? token_last.groups : true))
                    res.push('');
                res.push(token[0]);
                token_last = token;
            }
            if (!res.length)
                res.push('');
            return res;
        }
        test(str) {
            return Boolean(str.match(this));
        }
        exec(str) {
            const from = this.lastIndex;
            if (from >= str.length)
                return null;
            const res = super.exec(str);
            if (res === null) {
                this.lastIndex = str.length;
                if (!str)
                    return null;
                return Object.assign([str.slice(from)], {
                    index: from,
                    input: str,
                });
            }
            if (from === this.lastIndex) {
                $mol_fail(new Error('Captured empty substring'));
            }
            const groups = {};
            const skipped = str.slice(from, this.lastIndex - res[0].length);
            if (skipped) {
                this.lastIndex = this.lastIndex - res[0].length;
                return Object.assign([skipped], {
                    index: from,
                    input: res.input,
                });
            }
            for (let i = 0; i < this.groups.length; ++i) {
                const group = this.groups[i];
                groups[group] = groups[group] || res[i + 1] || '';
            }
            return Object.assign(res, { groups });
        }
        generate(params) {
            return null;
        }
        get native() {
            return new RegExp(this.source, this.flags);
        }
        /** Makes regexp that greedy repeats this pattern with delimiter */
        static separated(chunk, sep) {
            return $mol_regexp.from([
                $mol_regexp.repeat_greedy([[chunk], sep], 0),
                chunk,
            ]);
        }
        /** Makes regexp that non-greedy repeats this pattern from min to max count */
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}?`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that greedy repeats this pattern from min to max count */
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that match any of options */
        static vary(sources, flags = 'gsu') {
            const groups = [];
            const chunks = sources.map(source => {
                const regexp = $mol_regexp.from(source);
                groups.push(...regexp.groups);
                return regexp.source;
            });
            return new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
        }
        /** Makes regexp that allow absent of this pattern */
        static optional(source) {
            return $mol_regexp.repeat_greedy(source, 0, 1);
        }
        /** Makes regexp that look ahead for pattern */
        static force_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Makes regexp that look ahead for pattern */
        static forbid_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Converts some js values to regexp */
        static from(source, { ignoreCase, multiline } = {
            ignoreCase: false,
            multiline: false,
        }) {
            let flags = 'gsu';
            if (multiline)
                flags += 'm';
            if (ignoreCase)
                flags += 'i';
            if (typeof source === 'number') {
                const src = `\\u{${source.toString(16)}}`;
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => src;
                return regexp;
            }
            if (typeof source === 'string') {
                const src = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => source;
                return regexp;
            }
            else if (source instanceof $mol_regexp) {
                const regexp = new $mol_regexp(source.source, flags, source.groups);
                regexp.generate = params => source.generate(params);
                return regexp;
            }
            if (source instanceof RegExp) {
                const test = new RegExp('|' + source.source);
                const groups = Array.from({ length: test.exec('').length - 1 }, (_, i) => String(i + 1));
                const regexp = new $mol_regexp(source.source, source.flags, groups);
                regexp.generate = () => '';
                return regexp;
            }
            if (Array.isArray(source)) {
                const patterns = source.map(src => Array.isArray(src)
                    ? $mol_regexp.optional(src)
                    : $mol_regexp.from(src));
                const chunks = patterns.map(pattern => pattern.source);
                const groups = [];
                let index = 0;
                for (const pattern of patterns) {
                    for (let group of pattern.groups) {
                        if (Number(group) >= 0) {
                            groups.push(String(index++));
                        }
                        else {
                            groups.push(group);
                        }
                    }
                }
                const regexp = new $mol_regexp(chunks.join(''), flags, groups);
                regexp.generate = params => {
                    let res = '';
                    for (const pattern of patterns) {
                        let sub = pattern.generate(params);
                        if (sub === null)
                            return '';
                        res += sub;
                    }
                    return res;
                };
                return regexp;
            }
            else {
                const groups = [];
                const chunks = Object.keys(source).map(name => {
                    groups.push(name);
                    const regexp = $mol_regexp.from(source[name]);
                    groups.push(...regexp.groups);
                    return `(${regexp.source})`;
                });
                const regexp = new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
                const validator = new RegExp('^' + regexp.source + '$', flags);
                regexp.generate = (params) => {
                    for (let option in source) {
                        if (option in params) {
                            if (typeof params[option] === 'boolean') {
                                if (!params[option])
                                    continue;
                            }
                            else {
                                const str = String(params[option]);
                                if (str.match(validator))
                                    return str;
                                $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                            }
                        }
                        else {
                            if (typeof source[option] !== 'object')
                                continue;
                        }
                        const res = $mol_regexp.from(source[option]).generate(params);
                        if (res)
                            return res;
                    }
                    return null;
                };
                return regexp;
            }
        }
        /** Makes regexp which includes only unicode category */
        static unicode_only(...category) {
            return new $mol_regexp(`\\p{${category.join('=')}}`);
        }
        /** Makes regexp which excludes unicode category */
        static unicode_except(...category) {
            return new $mol_regexp(`\\P{${category.join('=')}}`);
        }
        static char_range(from, to) {
            return new $mol_regexp(`${$mol_regexp.from(from).source}-${$mol_regexp.from(to).source}`);
        }
        static char_only(...allowed) {
            const regexp = allowed.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[${regexp}]`);
        }
        static char_except(...forbidden) {
            const regexp = forbidden.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp.from(/\d/gsu);
        static decimal_except = $mol_regexp.from(/\D/gsu);
        static latin_only = $mol_regexp.from(/\w/gsu);
        static latin_except = $mol_regexp.from(/\W/gsu);
        static space_only = $mol_regexp.from(/\s/gsu);
        static space_except = $mol_regexp.from(/\S/gsu);
        static word_break_only = $mol_regexp.from(/\b/gsu);
        static word_break_except = $mol_regexp.from(/\B/gsu);
        static tab = $mol_regexp.from(/\t/gsu);
        static slash_back = $mol_regexp.from(/\\/gsu);
        static nul = $mol_regexp.from(/\0/gsu);
        static char_any = $mol_regexp.from(/./gsu);
        static begin = $mol_regexp.from(/^/gsu);
        static end = $mol_regexp.from(/$/gsu);
        static or = $mol_regexp.from(/|/gsu);
        static line_end = $mol_regexp.from({
            win_end: [['\r'], '\n'],
            mac_end: '\r',
        });
    }
    $.$mol_regexp = $mol_regexp;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Output text with dimmed mismatched substrings.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_dimmer_demo
         */
        class $mol_dimmer extends $.$mol_dimmer {
            parts() {
                const needle = this.needle();
                if (needle.length < 2)
                    return [this.haystack()];
                let chunks = [];
                let strings = this.strings();
                for (let index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? this.High(index) : this.Low(index));
                }
                return chunks;
            }
            strings() {
                const options = this.needle().split(/\s+/g).filter(Boolean);
                if (!options.length)
                    return [this.haystack()];
                const variants = { ...options };
                const regexp = $mol_regexp.from({ needle: variants }, { ignoreCase: true });
                return this.haystack().split(regexp);
            }
            string(index) {
                return this.strings()[index];
            }
            *view_find(check, path = []) {
                if (check(this, this.haystack())) {
                    yield [...path, this];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_dimmer.prototype, "strings", null);
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/dimmer/dimmer.view.css", "[mol_dimmer] {\n\tdisplay: block;\n\tmax-width: 100%;\n}\n\n[mol_dimmer_low] {\n\tdisplay: inline;\n\topacity: 0.8;\n}\n\n[mol_dimmer_high] {\n\tdisplay: inline;\n\tcolor: var(--mol_theme_focus);\n\ttext-shadow: 0 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_nav) = class $mol_nav extends ($.$mol_plugin) {
		event_key(next){
			if(next !== undefined) return next;
			return null;
		}
		cycle(next){
			if(next !== undefined) return next;
			return false;
		}
		mod_ctrl(){
			return false;
		}
		mod_shift(){
			return false;
		}
		mod_alt(){
			return false;
		}
		keys_x(next){
			if(next !== undefined) return next;
			return [];
		}
		keys_y(next){
			if(next !== undefined) return next;
			return [];
		}
		current_x(next){
			if(next !== undefined) return next;
			return null;
		}
		current_y(next){
			if(next !== undefined) return next;
			return null;
		}
		event_up(next){
			if(next !== undefined) return next;
			return null;
		}
		event_down(next){
			if(next !== undefined) return next;
			return null;
		}
		event_left(next){
			if(next !== undefined) return next;
			return null;
		}
		event_right(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.event_key(next))};
		}
	};
	($mol_mem(($.$mol_nav.prototype), "event_key"));
	($mol_mem(($.$mol_nav.prototype), "cycle"));
	($mol_mem(($.$mol_nav.prototype), "keys_x"));
	($mol_mem(($.$mol_nav.prototype), "keys_y"));
	($mol_mem(($.$mol_nav.prototype), "current_x"));
	($mol_mem(($.$mol_nav.prototype), "current_y"));
	($mol_mem(($.$mol_nav.prototype), "event_up"));
	($mol_mem(($.$mol_nav.prototype), "event_down"));
	($mol_mem(($.$mol_nav.prototype), "event_left"));
	($mol_mem(($.$mol_nav.prototype), "event_right"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin which can navigate in list of items
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_nav_demo
         */
        class $mol_nav extends $.$mol_nav {
            event_key(event) {
                if (!event)
                    return event;
                if (event.defaultPrevented)
                    return;
                if (this.mod_ctrl() && !event.ctrlKey)
                    return;
                if (this.mod_shift() && !event.shiftKey)
                    return;
                if (this.mod_alt() && !event.altKey)
                    return;
                switch (event.keyCode) {
                    case $mol_keyboard_code.up: return this.event_up(event);
                    case $mol_keyboard_code.down: return this.event_down(event);
                    case $mol_keyboard_code.left: return this.event_left(event);
                    case $mol_keyboard_code.right: return this.event_right(event);
                    case $mol_keyboard_code.pageUp: return this.event_up(event);
                    case $mol_keyboard_code.pageDown: return this.event_down(event);
                }
            }
            event_up(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? 0 : index_y;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_down(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? keys.length - 1 : index_y;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_left(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? 0 : index_x;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            event_right(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? keys.length - 1 : index_x;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            index_y() {
                let index = this.keys_y().indexOf(this.current_y());
                if (index < 0)
                    return null;
                return index;
            }
            index_x() {
                let index = this.keys_x().indexOf(this.current_x());
                if (index < 0)
                    return null;
                return index;
            }
        }
        $$.$mol_nav = $mol_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_list) = class $mol_list extends ($.$mol_view) {
		gap_before(){
			return 0;
		}
		Gap_before(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_before())});
			return obj;
		}
		Empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		gap_after(){
			return 0;
		}
		Gap_after(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_after())});
			return obj;
		}
		rows(){
			return [
				(this.Gap_before()), 
				(this.Empty()), 
				(this.Gap_after())
			];
		}
		render_visible_only(){
			return true;
		}
		render_over(){
			return 0.1;
		}
		sub(){
			return (this.rows());
		}
		item_height_min(id){
			return 1;
		}
		item_width_min(id){
			return 1;
		}
		view_window_shift(next){
			if(next !== undefined) return next;
			return 0;
		}
		view_window(){
			return [0, 0];
		}
	};
	($mol_mem(($.$mol_list.prototype), "Gap_before"));
	($mol_mem(($.$mol_list.prototype), "Empty"));
	($mol_mem(($.$mol_list.prototype), "Gap_after"));
	($mol_mem(($.$mol_list.prototype), "view_window_shift"));


;
"use strict";
var $;
(function ($) {
    let cache = null;
    function $mol_support_css_overflow_anchor() {
        return cache ?? (cache = this.$mol_dom_context.CSS?.supports('overflow-anchor:auto') ?? false);
    }
    $.$mol_support_css_overflow_anchor = $mol_support_css_overflow_anchor;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * The list of rows with lazy/virtual rendering support based on `minimal_height` of rows.
         * `mol_list` should contain only components that inherits `mol_view`. You should not place raw strings or numbers in list.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_list_demo
         */
        class $mol_list extends $.$mol_list {
            sub() {
                const rows = this.rows();
                const next = (rows.length === 0) ? [this.Empty()] : rows;
                const prev = $mol_mem_cached(() => this.sub());
                const [start, end] = $mol_mem_cached(() => this.view_window()) ?? [0, 0];
                if (prev && $mol_mem_cached(() => prev[start] !== next[start])) {
                    const index = $mol_mem_cached(() => next.indexOf(prev[start])) ?? -1;
                    if (index >= 0)
                        this.view_window_shift(index - start);
                }
                return next;
            }
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            _view_window_last = [0, 0];
            view_window(next) {
                const kids = this.sub();
                if (kids.length < 3)
                    return [0, kids.length];
                if (this.$.$mol_print.active())
                    return [0, kids.length];
                const rect = this.view_rect();
                if (next)
                    return next;
                let [min, max] = $mol_mem_cached(() => this.view_window()) ?? this._view_window_last;
                const shift = this.view_window_shift();
                this.view_window_shift(0);
                min += shift;
                max += shift;
                let max2 = max = Math.min(max, kids.length);
                let min2 = min = Math.max(0, Math.min(min, max - 1));
                const anchoring = this.render_visible_only();
                const window_height = this.$.$mol_window.size().height + 40;
                const over = Math.ceil(window_height * this.render_over());
                const limit_top = -over;
                const limit_bottom = window_height + over;
                const gap_before = $mol_mem_cached(() => this.gap_before()) ?? 0;
                const gap_after = $mol_mem_cached(() => this.gap_after()) ?? 0;
                let top = Math.ceil(rect?.top ?? 0) + gap_before;
                let bottom = Math.ceil(rect?.bottom ?? 0) - gap_after;
                // change nothing when already covers all limits
                if (top <= limit_top && bottom >= limit_bottom) {
                    return [min2, max2];
                }
                // jumps when fully over limits
                if (anchoring && ((bottom < limit_top) || (top > limit_bottom))) {
                    min = 0;
                    top = Math.ceil(rect?.top ?? 0);
                    while (min < (kids.length - 1)) {
                        const height = this.item_height_min(min);
                        if (top + height >= limit_top)
                            break;
                        top += height;
                        ++min;
                    }
                    min2 = min;
                    max2 = max = min;
                    bottom = top;
                }
                let top2 = top;
                let bottom2 = bottom;
                // force recalc min when overlapse top limit
                if (anchoring && (top < limit_top) && (bottom < limit_bottom) && (max < kids.length)) {
                    min2 = max;
                    top2 = bottom;
                }
                // force recalc max when overlapse bottom limit
                if ((bottom > limit_bottom) && (top > limit_top) && (min > 0)) {
                    max2 = min;
                    bottom2 = top;
                }
                // extend min to cover top limit
                while (anchoring && ((top2 > limit_top) && (min2 > 0))) {
                    --min2;
                    top2 -= this.item_height_min(min2);
                }
                // extend max to cover bottom limit
                while (bottom2 < limit_bottom && max2 < kids.length) {
                    bottom2 += this.item_height_min(max2);
                    ++max2;
                }
                return [min2, max2];
            }
            item_height_min(index) {
                try {
                    return this.sub()[index]?.minimal_height() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            row_width_min(index) {
                try {
                    return this.sub()[index]?.minimal_width() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            gap_before() {
                let gap = 0;
                const skipped = this.view_window()[0];
                for (let i = 0; i < skipped; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            gap_after() {
                let gap = 0;
                const from = this.view_window()[1];
                const to = this.sub().length;
                for (let i = from; i < to; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            sub_visible() {
                return [
                    ...this.gap_before() ? [this.Gap_before()] : [],
                    ...this.sub().slice(...this._view_window_last = this.view_window()),
                    ...this.gap_after() ? [this.Gap_after()] : [],
                ];
            }
            minimal_height() {
                let height = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    height += this.item_height_min(i);
                return height;
            }
            minimal_width() {
                let width = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    width = Math.max(width, this.item_width_min(i));
                return width;
            }
            force_render(path) {
                const kids = this.rows();
                const index = kids.findIndex(item => path.has(item));
                if (index >= 0) {
                    const win = this.view_window();
                    if (index < win[0] || index >= win[1]) {
                        this.view_window([this.render_visible_only() ? index : 0, index + 1]);
                    }
                    kids[index].force_render(path);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "view_window", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_before", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_after", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_height", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_width", null);
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/list/list.view.css", "[mol_list] {\n\twill-change: contents;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\tmax-width: 100%;\n\t/* display: flex;\n\talign-items: stretch;\n\talign-content: stretch; */\n\ttransition: none;\n\tmin-height: 1.5rem;\n\t/* will-change: contents; */\n}\n\n[mol_list_gap_before] ,\n[mol_list_gap_after] {\n\tdisplay: block !important;\n\tflex: none;\n\ttransition: none;\n\toverflow-anchor: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_close) = class $mol_icon_close extends ($.$mol_icon) {
		path(){
			return "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
		}
	};


;
"use strict";


;
	($.$mol_search) = class $mol_search extends ($.$mol_pop) {
		clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({"escape": (next) => (this.clear(next))});
			return obj;
		}
		nav_components(){
			return [];
		}
		nav_focused(next){
			if(next !== undefined) return next;
			return null;
		}
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_y) = () => ((this.nav_components()));
			(obj.current_y) = (next) => ((this.nav_focused(next)));
			return obj;
		}
		suggests_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		query(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_search_hint"));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return true;
		}
		keyboard(){
			return "search";
		}
		enter(){
			return "search";
		}
		bring(){
			return (this.Query().bring());
		}
		Query(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.query(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.keyboard) = () => ((this.keyboard()));
			(obj.enter) = () => ((this.enter()));
			return obj;
		}
		Clear_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		Clear(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_search_Clear_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.clear(next)));
			(obj.sub) = () => ([(this.Clear_icon())]);
			return obj;
		}
		anchor_content(){
			return [(this.Query()), (this.Clear())];
		}
		menu_items(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_items()));
			return obj;
		}
		Bubble_pane(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Menu())]);
			return obj;
		}
		suggest_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		suggest_label(id){
			return "";
		}
		Suggest_label(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.suggest_label(id)));
			(obj.needle) = () => ((this.query()));
			return obj;
		}
		suggest_content(id){
			return [(this.Suggest_label(id))];
		}
		suggests(){
			return [];
		}
		plugins(){
			return [
				...(super.plugins()), 
				(this.Hotkey()), 
				(this.Nav())
			];
		}
		showed(next){
			return (this.suggests_showed(next));
		}
		align_hor(){
			return "right";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.anchor_content()));
			return obj;
		}
		bubble_content(){
			return [(this.Bubble_pane())];
		}
		Suggest(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.suggest_select(id, next)));
			(obj.sub) = () => ((this.suggest_content(id)));
			return obj;
		}
	};
	($mol_mem(($.$mol_search.prototype), "clear"));
	($mol_mem(($.$mol_search.prototype), "Hotkey"));
	($mol_mem(($.$mol_search.prototype), "nav_focused"));
	($mol_mem(($.$mol_search.prototype), "Nav"));
	($mol_mem(($.$mol_search.prototype), "suggests_showed"));
	($mol_mem(($.$mol_search.prototype), "query"));
	($mol_mem(($.$mol_search.prototype), "submit"));
	($mol_mem(($.$mol_search.prototype), "Query"));
	($mol_mem(($.$mol_search.prototype), "Clear_icon"));
	($mol_mem(($.$mol_search.prototype), "Clear"));
	($mol_mem(($.$mol_search.prototype), "Menu"));
	($mol_mem(($.$mol_search.prototype), "Bubble_pane"));
	($mol_mem_key(($.$mol_search.prototype), "suggest_select"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest_label"));
	($mol_mem(($.$mol_search.prototype), "Anchor"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Search input with suggest and clear button.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_search_demo
         */
        class $mol_search extends $.$mol_search {
            anchor_content() {
                return [
                    this.Query(),
                    ...this.query() ? [this.Clear()] : [],
                ];
            }
            suggests_showed(next = true) {
                this.query();
                if (!this.focused())
                    return false;
                return next;
            }
            suggest_selected(next) {
                if (next === undefined)
                    return;
                this.query(next);
                this.Query().focused(true);
            }
            nav_components() {
                return [
                    this.Query(),
                    ...this.menu_items(),
                ];
            }
            nav_focused(component) {
                if (!this.focused())
                    return null;
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.suggests_showed()) {
                    this.ensure_visible(component, "center");
                    component.focused(true);
                }
                return component;
            }
            suggest_label(key) {
                return key;
            }
            menu_items() {
                return this.suggests().map((suggest) => this.Suggest(suggest));
            }
            suggest_select(id, event) {
                this.query(id);
                this.Query().selection([id.length, id.length]);
                this.Query().focused(true);
            }
            clear(event) {
                this.query('');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "anchor_content", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "suggests_showed", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "nav_focused", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "menu_items", null);
        $$.$mol_search = $mol_search;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/search/search.view.css", "[mol_search] {\n\talign-self: flex-start;\n\tflex: auto;\n}\n\n[mol_search_anchor] {\n\tflex: 1 1 auto;\n}\n\n[mol_search_query] {\n\tflex-grow: 1;\n}\n\n[mol_search_menu] {\n\tmin-height: .75rem;\n\tdisplay: flex;\n}\n\n[mol_search_suggest] {\n\ttext-align: left;\n}\n\n[mol_search_suggest_label_high] {\n\tcolor: var(--mol_theme_shade);\n\ttext-shadow: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_dots_vertical) = class $mol_icon_dots_vertical extends ($.$mol_icon) {
		path(){
			return "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
		}
	};


;
"use strict";


;
	($.$mol_select) = class $mol_select extends ($.$mol_pick) {
		enabled(){
			return true;
		}
		event_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		option_label(id){
			return "";
		}
		filter_pattern(next){
			if(next !== undefined) return next;
			return "";
		}
		Option_label(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.option_label(id)));
			(obj.needle) = () => ((this.filter_pattern()));
			return obj;
		}
		option_content(id){
			return [(this.Option_label(id))];
		}
		no_options_message(){
			return (this.$.$mol_locale.text("$mol_select_no_options_message"));
		}
		nav_components(){
			return [];
		}
		option_focused(next){
			if(next !== undefined) return next;
			return null;
		}
		nav_cycle(next){
			if(next !== undefined) return next;
			return true;
		}
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_y) = () => ((this.nav_components()));
			(obj.current_y) = (next) => ((this.option_focused(next)));
			(obj.cycle) = (next) => ((this.nav_cycle(next)));
			return obj;
		}
		menu_content(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_content()));
			return obj;
		}
		Bubble_pane(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Menu())]);
			return obj;
		}
		filter_hint(){
			return (this.$.$mol_locale.text("$mol_select_filter_hint"));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		dictionary(next){
			if(next !== undefined) return next;
			return {};
		}
		options(){
			return [];
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		option_label_default(){
			return "";
		}
		Option_row(id){
			const obj = new this.$.$mol_button_minor();
			(obj.enabled) = () => ((this.enabled()));
			(obj.event_click) = (next) => ((this.event_select(id, next)));
			(obj.sub) = () => ((this.option_content(id)));
			return obj;
		}
		No_options(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.no_options_message())]);
			return obj;
		}
		plugins(){
			return [...(super.plugins()), (this.Nav())];
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_select_hint"));
		}
		bubble_content(){
			return [(this.Filter()), (this.Bubble_pane())];
		}
		Filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.filter_pattern(next)));
			(obj.hint) = () => ((this.filter_hint()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		Trigger_icon(){
			const obj = new this.$.$mol_icon_dots_vertical();
			return obj;
		}
		trigger_enabled(){
			return (this.enabled());
		}
	};
	($mol_mem_key(($.$mol_select.prototype), "event_select"));
	($mol_mem(($.$mol_select.prototype), "filter_pattern"));
	($mol_mem_key(($.$mol_select.prototype), "Option_label"));
	($mol_mem(($.$mol_select.prototype), "option_focused"));
	($mol_mem(($.$mol_select.prototype), "nav_cycle"));
	($mol_mem(($.$mol_select.prototype), "Nav"));
	($mol_mem(($.$mol_select.prototype), "Menu"));
	($mol_mem(($.$mol_select.prototype), "Bubble_pane"));
	($mol_mem(($.$mol_select.prototype), "submit"));
	($mol_mem(($.$mol_select.prototype), "dictionary"));
	($mol_mem(($.$mol_select.prototype), "value"));
	($mol_mem_key(($.$mol_select.prototype), "Option_row"));
	($mol_mem(($.$mol_select.prototype), "No_options"));
	($mol_mem(($.$mol_select.prototype), "Filter"));
	($mol_mem(($.$mol_select.prototype), "Trigger_icon"));


;
"use strict";
var $;
(function ($) {
    function $mol_match_text(query, values) {
        const tags = query.toLowerCase().trim().split(/\s+/).filter(tag => tag);
        if (tags.length === 0)
            return () => true;
        return (variant) => {
            const vals = values(variant);
            return tags.every(tag => vals.some(val => val.toLowerCase().indexOf(tag) >= 0));
        };
    }
    $.$mol_match_text = $mol_match_text;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Allow user to select value from various options and displays current value.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_select_demo_colors
         */
        class $mol_select extends $.$mol_select {
            filter_pattern(next) {
                this.focused();
                return next || '';
            }
            open() {
                this.showed(true);
            }
            options() {
                return Object.keys(this.dictionary());
            }
            options_filtered() {
                let options = this.options();
                options = options.filter($mol_match_text(this.filter_pattern(), (id) => [this.option_label(id)]));
                const index = options.indexOf(this.value());
                if (index >= 0)
                    options = [...options.slice(0, index), ...options.slice(index + 1)];
                return options;
            }
            option_label(id) {
                const value = this.dictionary()[id];
                return (value == null ? id : value) || this.option_label_default();
            }
            option_rows() {
                return this.options_filtered().map((option) => this.Option_row(option));
            }
            option_focused(component) {
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.showed()) {
                    component.focused(true);
                }
                return component;
            }
            event_select(id, event) {
                this.value(id);
                this.showed(false);
                event?.preventDefault();
            }
            nav_components() {
                if (this.options().length > 1 && this.Filter()) {
                    return [this.Filter(), ...this.option_rows()];
                }
                else {
                    return this.option_rows();
                }
            }
            trigger_content() {
                return [
                    ...this.option_content(this.value()),
                    ...this.trigger_enabled() ? [this.Trigger_icon()] : [],
                ];
            }
            menu_content() {
                return [
                    ...this.option_rows(),
                    ...(this.options_filtered().length === 0) ? [this.No_options()] : []
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "filter_pattern", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "option_focused", null);
        $$.$mol_select = $mol_select;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/select/select.view.css", "[mol_select] {\n\tdisplay: flex;\n\tword-break: normal;\n\talign-self: flex-start;\n}\n\n[mol_select_option_row] {\n\tmin-width: 100%;\n\tpadding: 0;\n\tjustify-content: flex-start;\n}\n\n[mol_select_filter] {\n\tflex: 1 0 auto;\n\talign-self: stretch;\n}\n\n[mol_select_option_label] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tmin-height: 1.5em;\n\tdisplay: block;\n\twhite-space: nowrap;\n}\n\n[mol_select_clear_option_content] {\n\tpadding: .5em 1rem .5rem 0;\n\ttext-align: left;\n\tbox-shadow: var(--mol_theme_line);\n\tflex: 1 0 auto;\n}\n\n[mol_select_no_options] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tdisplay: block;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_select_trigger] {\n\tpadding: 0;\n\tflex: 1 1 auto;\n\tdisplay: flex;\n}\n\n[mol_select_trigger] > * {\n\tmargin-right: -1rem;\n}\n\n[mol_select_trigger] > *:last-child {\n\tmargin-right: 0;\n}\n\n[mol_select_menu] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n");
})($ || ($ = {}));

;
	($.$bog_builderui_select) = class $bog_builderui_select extends ($.$mol_select) {};


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($bog_builderui_select, {
        font: {
            family: $bog_builderui_tokens.font_body,
        },
        color: $bog_builderui_tokens.text,
        background: {
            color: $bog_builderui_tokens.field,
        },
        border: {
            radius: $bog_builderui_tokens.radius,
            width: '1px',
            style: 'solid',
            color: $bog_builderui_tokens.line,
        },
        padding: {
            left: '0.75rem',
            right: '0.75rem',
        },
        cursor: 'pointer',
        transition: 'background-color 120ms, border-color 120ms',
        ':hover': {
            background: {
                color: $bog_builderui_tokens.hover,
            },
            border: {
                color: $bog_builderui_tokens.focus,
            },
        },
        $mol_check: {
            background: { color: 'transparent' },
            boxShadow: 'none',
            outline: 'none',
            color: 'inherit',
            ':hover': {
                background: { color: 'transparent' },
                boxShadow: 'none',
            },
            ':focus': {
                background: { color: 'transparent' },
                boxShadow: 'none',
                outline: 'none',
            },
            ':focus-visible': {
                background: { color: 'transparent' },
                boxShadow: 'none',
                outline: 'none',
            },
        },
        $mol_pop_bubble: {
            background: {
                color: $bog_builderui_tokens.card,
            },
            color: $bog_builderui_tokens.text,
            border: {
                width: '1px',
                style: 'solid',
                color: $bog_builderui_tokens.line,
                radius: $bog_builderui_tokens.radius,
            },
            padding: {
                top: '0.25rem',
                right: '0.25rem',
                bottom: '0.25rem',
                left: '0.25rem',
            },
            box: {
                shadow: [{ x: 0, y: '4px', blur: '12px', spread: 0, color: '#00000026' }],
            },
            overflow: 'hidden',
            $mol_scroll: {
                background: { color: 'transparent' },
                border: { radius: $bog_builderui_tokens.radius },
            },
            $mol_button_minor: {
                border: { radius: $bog_builderui_tokens.radius },
                color: $bog_builderui_tokens.text,
                background: { color: 'transparent' },
                boxShadow: 'none',
                ':hover': {
                    background: { color: $bog_builderui_tokens.hover },
                    boxShadow: 'none',
                },
                ':focus': {
                    background: { color: 'transparent' },
                    boxShadow: 'none',
                },
                ':focus-visible': {
                    background: { color: 'transparent' },
                    boxShadow: 'none',
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$mol_pop_over) = class $mol_pop_over extends ($.$mol_pop) {
		hovered(next){
			if(next !== undefined) return next;
			return false;
		}
		event_show(next){
			if(next !== undefined) return next;
			return null;
		}
		event_hide(next){
			if(next !== undefined) return next;
			return null;
		}
		showed(){
			return (this.hovered());
		}
		attr(){
			return {...(super.attr()), "tabindex": 0};
		}
		event(){
			return {
				...(super.event()), 
				"mouseenter": (next) => (this.event_show(next)), 
				"mouseleave": (next) => (this.event_hide(next))
			};
		}
	};
	($mol_mem(($.$mol_pop_over.prototype), "hovered"));
	($mol_mem(($.$mol_pop_over.prototype), "event_show"));
	($mol_mem(($.$mol_pop_over.prototype), "event_hide"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Bubble that can be shown anchored to Anchor element.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_over_demo
         */
        class $mol_pop_over extends $.$mol_pop_over {
            event_show(event) {
                this.hovered(true);
            }
            event_hide(event) {
                this.hovered(false);
            }
            showed() {
                return this.focused() || this.hovered();
            }
        }
        $$.$mol_pop_over = $mol_pop_over;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pop/over/over.view.css", "[mol_pop_over]:focus {\r\n\toutline: none;\r\n}");
})($ || ($ = {}));

;
	($.$bog_builderui_tooltip) = class $bog_builderui_tooltip extends ($.$mol_pop_over) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/builderui/theme.css", "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=EB+Garamond:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');\n\n:root {\n\t--bog_builderui_font_body: 'Inter', system-ui, sans-serif;\n\t--bog_builderui_font_head: 'Inter', system-ui, sans-serif;\n\t--bog_builderui_radius: 0.5rem;\n}\n\n/* ============================================================\n   RADIUS PRESETS\n   ============================================================ */\n[bog_builderui_radius=\"none\"] { --bog_builderui_radius: 0; }\n[bog_builderui_radius=\"small\"] { --bog_builderui_radius: 0.25rem; }\n[bog_builderui_radius=\"medium\"] { --bog_builderui_radius: 0.5rem; }\n[bog_builderui_radius=\"large\"] { --bog_builderui_radius: 1rem; }\n\n/* ============================================================\n   BODY FONT\n   ============================================================ */\n[bog_builderui_font_body=\"inter\"] { --bog_builderui_font_body: 'Inter', system-ui, sans-serif; }\n[bog_builderui_font_body=\"manrope\"] { --bog_builderui_font_body: 'Manrope', system-ui, sans-serif; }\n[bog_builderui_font_body=\"dm-sans\"] { --bog_builderui_font_body: 'DM Sans', system-ui, sans-serif; }\n[bog_builderui_font_body=\"eb-garamond\"] { --bog_builderui_font_body: 'EB Garamond', Georgia, serif; }\n\n/* ============================================================\n   HEADING FONT\n   ============================================================ */\n[bog_builderui_font_head=\"inter\"] { --bog_builderui_font_head: 'Inter', system-ui, sans-serif; }\n[bog_builderui_font_head=\"manrope\"] { --bog_builderui_font_head: 'Manrope', system-ui, sans-serif; }\n[bog_builderui_font_head=\"dm-sans\"] { --bog_builderui_font_head: 'DM Sans', system-ui, sans-serif; }\n[bog_builderui_font_head=\"eb-garamond\"] { --bog_builderui_font_head: 'EB Garamond', Georgia, serif; }\n\n/* ============================================================\n   BASE COLORS (neutral palette)\n   Vars: back, card, field, text, shade, line, hover\n   ============================================================ */\n\n/* === Slate (default) === */\n:root,\n[bog_builderui_base=\"slate\"][bog_builderui_lights=\"dark\"] {\n\t--bog_builderui_back: #020817;\n\t--bog_builderui_card: #0f172a;\n\t--bog_builderui_field: #1e293b;\n\t--bog_builderui_text: #f8fafc;\n\t--bog_builderui_shade: #94a3b8;\n\t--bog_builderui_line: #1e293b;\n\t--bog_builderui_hover: #ffffff0d;\n}\n[bog_builderui_base=\"slate\"][bog_builderui_lights=\"light\"] {\n\t--bog_builderui_back: #ffffff;\n\t--bog_builderui_card: #f8fafc;\n\t--bog_builderui_field: #f1f5f9;\n\t--bog_builderui_text: #0f172a;\n\t--bog_builderui_shade: #64748b;\n\t--bog_builderui_line: #e2e8f0;\n\t--bog_builderui_hover: #0000000a;\n}\n\n/* === Stone === */\n[bog_builderui_base=\"stone\"][bog_builderui_lights=\"dark\"] {\n\t--bog_builderui_back: #0c0a09;\n\t--bog_builderui_card: #1c1917;\n\t--bog_builderui_field: #292524;\n\t--bog_builderui_text: #fafaf9;\n\t--bog_builderui_shade: #a8a29e;\n\t--bog_builderui_line: #292524;\n\t--bog_builderui_hover: #ffffff0d;\n}\n[bog_builderui_base=\"stone\"][bog_builderui_lights=\"light\"] {\n\t--bog_builderui_back: #fafaf9;\n\t--bog_builderui_card: #ffffff;\n\t--bog_builderui_field: #f5f5f4;\n\t--bog_builderui_text: #0c0a09;\n\t--bog_builderui_shade: #78716c;\n\t--bog_builderui_line: #e7e5e4;\n\t--bog_builderui_hover: #0000000a;\n}\n\n/* === Zinc === */\n[bog_builderui_base=\"zinc\"][bog_builderui_lights=\"dark\"] {\n\t--bog_builderui_back: #09090b;\n\t--bog_builderui_card: #18181b;\n\t--bog_builderui_field: #27272a;\n\t--bog_builderui_text: #fafafa;\n\t--bog_builderui_shade: #a1a1aa;\n\t--bog_builderui_line: #27272a;\n\t--bog_builderui_hover: #ffffff0d;\n}\n[bog_builderui_base=\"zinc\"][bog_builderui_lights=\"light\"] {\n\t--bog_builderui_back: #ffffff;\n\t--bog_builderui_card: #fafafa;\n\t--bog_builderui_field: #f4f4f5;\n\t--bog_builderui_text: #09090b;\n\t--bog_builderui_shade: #71717a;\n\t--bog_builderui_line: #e4e4e7;\n\t--bog_builderui_hover: #0000000a;\n}\n\n/* === Gray === */\n[bog_builderui_base=\"gray\"][bog_builderui_lights=\"dark\"] {\n\t--bog_builderui_back: #030712;\n\t--bog_builderui_card: #111827;\n\t--bog_builderui_field: #1f2937;\n\t--bog_builderui_text: #f9fafb;\n\t--bog_builderui_shade: #9ca3af;\n\t--bog_builderui_line: #1f2937;\n\t--bog_builderui_hover: #ffffff0d;\n}\n[bog_builderui_base=\"gray\"][bog_builderui_lights=\"light\"] {\n\t--bog_builderui_back: #ffffff;\n\t--bog_builderui_card: #f9fafb;\n\t--bog_builderui_field: #f3f4f6;\n\t--bog_builderui_text: #030712;\n\t--bog_builderui_shade: #6b7280;\n\t--bog_builderui_line: #e5e7eb;\n\t--bog_builderui_hover: #0000000a;\n}\n\n/* ============================================================\n   ACCENT THEMES (vars: control, focus, current, special)\n   ============================================================ */\n\n:root,\n[bog_builderui_theme=\"sky\"] {\n\t--bog_builderui_control: #0ea5e9;\n\t--bog_builderui_focus: #38bdf8;\n\t--bog_builderui_current: #06b6d4;\n\t--bog_builderui_special: #6366f1;\n}\n[bog_builderui_theme=\"rose\"] {\n\t--bog_builderui_control: #f43f5e;\n\t--bog_builderui_focus: #fb7185;\n\t--bog_builderui_current: #ec4899;\n\t--bog_builderui_special: #f97316;\n}\n[bog_builderui_theme=\"violet\"] {\n\t--bog_builderui_control: #8b5cf6;\n\t--bog_builderui_focus: #a78bfa;\n\t--bog_builderui_current: #6366f1;\n\t--bog_builderui_special: #d946ef;\n}\n[bog_builderui_theme=\"emerald\"] {\n\t--bog_builderui_control: #10b981;\n\t--bog_builderui_focus: #34d399;\n\t--bog_builderui_current: #14b8a6;\n\t--bog_builderui_special: #84cc16;\n}\n[bog_builderui_theme=\"amber\"] {\n\t--bog_builderui_control: #f59e0b;\n\t--bog_builderui_focus: #fbbf24;\n\t--bog_builderui_current: #f97316;\n\t--bog_builderui_special: #eab308;\n}\n\n/* ============================================================\n   Bridge to --mol_theme_* so stock $mol components ($mol_chart,\n   $mol_button, $mol_string) pick up our palette automatically.\n   ============================================================ */\n:where([bog_builderui_lights]) {\n\t--mol_theme_back: var(--bog_builderui_back);\n\t--mol_theme_card: var(--bog_builderui_card);\n\t--mol_theme_field: var(--bog_builderui_field);\n\t--mol_theme_hover: var(--bog_builderui_hover);\n\t--mol_theme_text: var(--bog_builderui_text);\n\t--mol_theme_shade: var(--bog_builderui_shade);\n\t--mol_theme_line: var(--bog_builderui_line);\n\t--mol_theme_focus: var(--bog_builderui_focus);\n\t--mol_theme_control: var(--bog_builderui_control);\n\t--mol_theme_current: var(--bog_builderui_current);\n\t--mol_theme_special: var(--bog_builderui_special);\n}\n\n/* ============================================================\n   CHART COLOR — independent accent for the chart bar/line\n   ============================================================ */\n:root,\n[bog_builderui_chart=\"blue\"] { --bog_builderui_chart: #3b82f6; }\n[bog_builderui_chart=\"green\"] { --bog_builderui_chart: #10b981; }\n[bog_builderui_chart=\"red\"] { --bog_builderui_chart: #ef4444; }\n[bog_builderui_chart=\"yellow\"] { --bog_builderui_chart: #eab308; }\n[bog_builderui_chart=\"purple\"] { --bog_builderui_chart: #a855f7; }\n\n/* ============================================================\n   Popover for $bog_builderui_select (style the $mol_pop bubble\n   when it sits inside our scope or carries our marker)\n   ============================================================ */\n[bog_builderui_lights] [mol_pop_bubble],\n[bog_builderui_pop] {\n\tbackground-color: var(--bog_builderui_card);\n\tborder: 1px solid var(--bog_builderui_line);\n\tborder-radius: var(--bog_builderui_radius);\n\tbox-shadow: 0 10px 30px #00000059;\n\tpadding: 0.375rem;\n\tgap: 0.125rem;\n\tmin-width: 14rem;\n\toverflow: hidden;\n}\n\n[bog_builderui_lights] [mol_select_filter] {\n\tdisplay: none;\n}\n\n[bog_builderui_lights] [mol_select_option_row] {\n\tborder-radius: calc(var(--bog_builderui_radius) - 2px);\n\tpadding: 0.5rem 0.75rem;\n\tcolor: var(--bog_builderui_text);\n\tfont-family: var(--bog_builderui_font_body);\n\tfont-size: 0.9rem;\n\tbackground-color: transparent;\n}\n\n[bog_builderui_lights] [mol_select_option_row]:hover {\n\tbackground-color: var(--bog_builderui_hover);\n}\n\n[bog_builderui_lights] [mol_select_option_label] {\n\tpadding: 0;\n\tcolor: inherit;\n}\n\n[bog_builderui_lights] [mol_select_no_options] {\n\tcolor: var(--bog_builderui_shade);\n\tpadding: 0.5rem 0.75rem;\n}\n\n[bog_builderui_lights] [bog_builderui_select] [mol_select_trigger] {\n\tgap: 0.5rem;\n\tpadding: 0 0.25rem 0 0;\n}\n[bog_builderui_lights] [bog_builderui_select] [mol_select_trigger] > * {\n\tmargin-right: 0;\n}\n\n/* ============================================================\n   Skeleton — any $mol_view in pending state gets a pulsing surface\n   ============================================================ */\n@keyframes bog_builderui_skeleton_pulse {\n\t0%, 100% { opacity: 1; }\n\t50% { opacity: 0.5; }\n}\n\n[bog_builderui_lights] [mol_view][mol_view_error=\"Promise\"],\n[bog_builderui_lights] [mol_view][mol_view_error=\"$mol_promise_blocker\"] {\n\tborder-radius: var(--bog_builderui_radius);\n\tbackground-color: var(--bog_builderui_field);\n\tcolor: transparent;\n\tanimation: bog_builderui_skeleton_pulse 1.6s ease-in-out infinite;\n}\n\n/* ============================================================\n   Tooltip surface\n   ============================================================ */\n[bog_builderui_lights] [bog_builderui_tooltip] [mol_pop_bubble] {\n\tbackground-color: var(--bog_builderui_text);\n\tcolor: var(--bog_builderui_back);\n\tborder: none;\n\tborder-radius: calc(var(--bog_builderui_radius) - 2px);\n\tpadding: 0.375rem 0.625rem;\n\tfont-family: var(--bog_builderui_font_body);\n\tfont-size: 0.8rem;\n\tbox-shadow: 0 4px 12px #0000004d;\n\tmin-width: 0;\n}\n\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** Frameworks in column order. */
        const frameworks = ['react', 'vue', 'mol'];
        const framework_titles = {
            react: 'React',
            vue: 'Vue',
            mol: '$mol',
        };
        const result_idle = { status: 'idle', observed: '', metrics: [] };
        /** Shown for a metric the runner could not measure honestly. Never a zero:
         *  a zero is a reading, this is the absence of one. */
        const no_value = '—';
        const status_icons = {
            idle: '○',
            running: '⏳',
            ok: '✅',
            warn: '⚠️',
            fail: '❌',
            error: '⛔',
            invalid: '↻',
        };
        /** How long a runner gets to answer a `run` before its column reports no result. */
        const answer_timeout = 15000;
        /** How long after its page finishes loading a runner gets to say `ready`.
         *  The load event fires once the document and its scripts are in, so the
         *  greeting should follow almost immediately; anything past this is a page
         *  that is not a runner at all — a 404 body, most likely. */
        const ready_timeout = 5000;
        // Where each runner is served from, relative to the site root. React and Vue
        // are static files under the assets deploy; the $mol one is a MAM module of
        // its own, which CI copies into the output at the same path it has on the dev
        // server — so there is no assets/versus/mol/ folder.
        const runner_paths = {
            react: 'bog/smalljs/assets/versus/react/runner.html',
            vue: 'bog/smalljs/assets/versus/vue/runner.html',
            mol: 'bog/smalljs/versus/runner/-/index.html',
        };
        // The mam dev server serves the repo root, so the page path carries this.
        const repo_prefix = '/bog/smalljs/';
        // Path the site is mounted at on the deploy — the same mount the path router
        // is activated with in app/app.view.ts.
        const site_mount = '/smalljs/';
        /** Per case, per framework: what the runner leaves out and what has to be
         *  written by hand in that framework for the observed behaviour to change.
         *  Kept in TS rather than in the tree: the text is selected by case id at
         *  runtime and is not part of the component's public interface. */
        const notes = {
            race: {
                react: 'The effect calls setState with whatever the request returns, with no cancellation. Ignoring a response that is no longer current takes a cancel flag or an AbortController inside the effect.',
                vue: 'The watcher assigns whatever the awaited request returns, with no cancellation. Ignoring a response that is no longer current takes a check after the await that the selected id has not changed.',
                mol: 'The panel value is computed from the selected id, so a response for an earlier id is never assigned. Nothing is written by hand here.',
            },
            virtual: {
                react: 'Every row is rendered by a plain .map() over the data. Rendering only the rows on screen takes a virtualization library and a way to measure each row, since the heights differ.',
                vue: 'Every row is rendered by a plain v-for over the data. Rendering only the rows on screen takes a virtualization library and a way to measure each row, since the heights differ.',
                mol: 'The list keeps only the rows inside the viewport in the DOM and measures their heights as it scrolls. Nothing is written by hand here.',
            },
            leak: {
                react: 'The effect subscribes and returns nothing. Releasing the subscription takes a cleanup function returned from every effect that subscribes.',
                vue: 'onMounted subscribes and there is no matching onUnmounted. Releasing the subscription takes a teardown hook in every component that subscribes.',
                mol: 'The subscription belongs to the component\'s own reactive cell and is released together with the component. Nothing is written by hand here.',
            },
            crash: {
                react: 'With no ErrorBoundary above it, a throw during render takes the whole tree down. Keeping the rest of the list on screen takes an ErrorBoundary component around every part that may throw.',
                vue: 'The production build drops the throwing component and leaves an empty comment node in its place, so the rest of the list stays and the page shows no sign that anything failed — the TypeError reaches the console only. Putting something visible where the card was takes an onErrorCaptured hook and markup to render in the failed slot.',
                mol: 'A view that throws renders the error message in its own place and the rest of the tree keeps rendering. Nothing is written by hand here.',
            },
        };
        function status_parse(raw) {
            return raw === 'ok' || raw === 'warn' || raw === 'fail' ? raw : 'error';
        }
        /** Runners omit a metric they could not measure honestly rather than sending
         *  a zero, so an absent entry simply has no row. An entry that arrives without
         *  a value gets a dash for the same reason. Order is the runner's — the first
         *  metric is the one the status is derived from — so it is never re-sorted. */
        function metrics_parse(raw) {
            if (!Array.isArray(raw))
                return [];
            return raw.flatMap(item => {
                if (!item || typeof item !== 'object')
                    return [];
                const name = item.name;
                if (!name)
                    return [];
                const value = item.value;
                const unit = item.unit;
                if (value === null || value === undefined || value === '') {
                    return [{ name: String(name), value: no_value }];
                }
                return [{ name: String(name), value: String(value) + (unit ? ' ' + String(unit) : '') }];
            });
        }
        class $bog_smalljs_versus_case extends $.$bog_smalljs_versus_case {
            frameworks() {
                return frameworks;
            }
            columns() {
                return this.frameworks().map(id => this.Column(id));
            }
            framework_name(id) {
                return framework_titles[id] ?? id;
            }
            frame_title(id) {
                return this.framework_name(id) + ' — ' + this.case_id();
            }
            /** Path of the page itself. Split out so the base below can be checked
             *  without a browser. */
            location_path() {
                return this.$.$mol_dom_context.location?.pathname ?? '';
            }
            /** Site root the runner paths hang off. The page lives at two very
             *  different paths and the runners have to be addressed from both:
             *
             *      dev     /bog/smalljs/app/-/test.html  (repo root is the server root)
             *      deploy  /smalljs/section=versus       (app/-/ is the site root)
             *
             *  so the base is derived from the current path rather than written down.
             *  A relative URI would not survive here: prerendered routes are served
             *  as /<route>/index.html, which shifts what a relative path resolves
             *  against. The dev check has to come first — a dev path contains the
             *  deploy mount as a substring, but not the other way round. */
            site_base() {
                const pathname = this.location_path();
                const repo_at = pathname.indexOf(repo_prefix);
                if (repo_at >= 0)
                    return pathname.slice(0, repo_at) + '/';
                const mount_at = pathname.indexOf(site_mount);
                if (mount_at >= 0)
                    return pathname.slice(0, mount_at + site_mount.length);
                return '/';
            }
            frame_uri(id) {
                return this.site_base() + runner_paths[id] + '?case=' + encodeURIComponent(this.case_id());
            }
            /** Latest thing every column has to say. Written by run(), by the message
             *  handler and by the countdown, read by everything below. */
            result(id, next) {
                return next ?? result_idle;
            }
            status(id) {
                return this.result(id).status;
            }
            status_icon(id) {
                return status_icons[this.status(id)];
            }
            status_text(id) {
                switch (this.status(id)) {
                    case 'running': return this.status_running();
                    case 'ok': return this.status_ok();
                    case 'warn': return this.status_warn();
                    case 'fail': return this.status_fail();
                    case 'error': return this.status_error();
                    case 'invalid': return this.status_invalid();
                    default: return this.status_idle();
                }
            }
            observed(id) {
                return this.result(id).observed;
            }
            /** One neutral state, one line per reason. A reason this build has never
             *  heard of gets the general wording rather than being pushed into an
             *  error: the protocol is expected to grow, and a runner reporting an
             *  unmeasurable run is doing its job, not failing at it. */
            invalid_text(reason) {
                switch (reason) {
                    case 'tab-hidden': return this.invalid_tab_hidden();
                    case 'timers-throttled': return this.invalid_timers_throttled();
                    case 'frame-offscreen': return this.invalid_frame_offscreen();
                    default: return this.invalid_other();
                }
            }
            note(id) {
                return notes[this.case_id()]?.[id] ?? '';
            }
            metric_ids(id) {
                return this.result(id).metrics.map((_, index) => id + '/' + index);
            }
            metric_rows(id) {
                return this.metric_ids(id).map(key => this.Metric(key));
            }
            metric(key) {
                const slash = key.lastIndexOf('/');
                return this.result(key.slice(0, slash)).metrics[Number(key.slice(slash + 1))];
            }
            metric_name(key) {
                return this.metric(key)?.name ?? '';
            }
            metric_value(key) {
                return this.metric(key)?.value ?? no_value;
            }
            /** Rows of the result card, skipping the ones with nothing to show —
             *  an empty view would still take a gap in the column. */
            card_content(id) {
                return [
                    this.Status(id),
                    ...this.observed(id) ? [this.Observed(id)] : [],
                    ...this.metric_ids(id).length ? [this.Metrics(id)] : [],
                    ...this.note(id) ? [this.Note(id)] : [],
                ];
            }
            controls_content() {
                return [
                    this.Run(),
                    ...this.run_hint() ? [this.Run_hint()] : [],
                ];
            }
            /** Every runner reports `ready` once its scenario is mounted. Until all
             *  three have, a run would post into a frame that cannot answer. */
            ready(id, next) {
                return next ?? false;
            }
            frames_ready() {
                return this.frameworks().every(id => this.ready(id));
            }
            /** Whether the frame's document finished loading, whatever it turned out
             *  to be. A 404 is still a document, so this fires for a missing runner
             *  too — which is exactly what makes it usable as the starting gun for
             *  the greeting countdown below. */
            frame_settled(id, next) {
                return next ?? false;
            }
            frame_loaded(id, next) {
                this.frame_settled(id, true);
                return null;
            }
            /** Grades a frame that loaded something but never introduced itself.
             *  Without this the column would sit on "Not run yet" for good and Run
             *  would stay disabled with no hint of which frame is holding it up —
             *  the 15 s answer timeout never gets a chance, because a run cannot
             *  start in the first place. Disarms itself the moment `ready` lands. */
            ready_watchdog(id) {
                if (!this.frame_settled(id))
                    return null;
                if (this.ready(id))
                    return null;
                return new this.$.$mol_after_timeout(ready_timeout, () => this.ready_expire(id));
            }
            ready_expire(id) {
                if (this.ready(id))
                    return null;
                this.result(id, { status: 'error', observed: this.error_not_loaded(), metrics: [] });
                return null;
            }
            /** Frames that answered with nothing runnable. */
            frames_broken() {
                return this.frameworks().some(id => !this.ready(id) && this.status(id) === 'error');
            }
            /** Whether the tab is in front. A background tab clamps setTimeout to
             *  about a second and never fires requestAnimationFrame, which turns every
             *  scenario here into a coin toss, so runs do not start in one. */
            page_visible(next) {
                return next ?? !this.$.$mol_dom_context.document?.hidden;
            }
            visibility_sync() {
                this.page_visible(!this.$.$mol_dom_context.document.hidden);
                return null;
            }
            run_enabled() {
                return this.frames_ready() && this.page_visible();
            }
            /** Why Run is not available, when it is not. The broken case comes before
             *  the loading one: a frame that will never load is still "not ready",
             *  and telling the reader to wait for it would be a lie. */
            run_hint() {
                if (!this.page_visible())
                    return this.run_hint_hidden();
                if (this.frames_broken())
                    return this.run_hint_broken();
                if (!this.frames_ready())
                    return this.run_hint_loading();
                return '';
            }
            /** Bumped on every Run, so a countdown armed by an earlier run cannot
             *  touch the results of a later one. */
            run_id(next) {
                return next ?? 0;
            }
            run() {
                if (!this.run_enabled())
                    return null;
                const run_id = this.run_id() + 1;
                this.run_id(run_id);
                for (const id of this.frameworks()) {
                    this.result(id, { status: 'running', observed: '', metrics: [] });
                    this.post(id, { ns: 'versus', type: 'run', case: this.case_id() });
                }
                return null;
            }
            /** Countdown for the answers of the current run. It lives in a cell of its
             *  own rather than being started from run(): a fiber spawned inside an
             *  action is owned by that action and dies with it, taking its timer along.
             *  Re-arming needs no code — the cell depends on run_id, so the next Run
             *  drops this timer and creates the next one. Returned from the cell and
             *  read through auto(), otherwise it would be destroyed on creation. */
            watchdog() {
                const run_id = this.run_id();
                if (!run_id)
                    return null;
                return new this.$.$mol_after_timeout(answer_timeout, () => this.expire(run_id));
            }
            expire(run_id) {
                if (this.run_id() !== run_id)
                    return null;
                for (const id of this.frameworks()) {
                    if (this.status(id) !== 'running')
                        continue;
                    this.result(id, { status: 'error', observed: this.error_timeout(), metrics: [] });
                }
                return null;
            }
            frame_window(id) {
                return this.Frame(id).dom_node().contentWindow;
            }
            post(id, message) {
                this.frame_window(id)?.postMessage(message, '*');
            }
            // One listener per case block on the window, not per frame: a frame that
            // has not finished loading has no contentWindow to listen on yet. The
            // sender is resolved by comparing event.source with each frame's window —
            // origins differ between dev and deploy, so they are not filtered on.
            // Returned from a cell and kept alive through auto(), otherwise the
            // reactive engine would drop the object right after creating it.
            message_listener() {
                return new $mol_dom_listener(this.$.$mol_dom_context, 'message', $mol_wire_async(this).message_receive);
            }
            visibility_listener() {
                return new $mol_dom_listener(this.$.$mol_dom_context.document, 'visibilitychange', () => this.visibility_sync());
            }
            auto() {
                return [
                    this.message_listener(),
                    this.visibility_listener(),
                    this.watchdog(),
                    ...this.frameworks().map(id => this.ready_watchdog(id)),
                ];
            }
            message_receive(event) {
                if (!event)
                    return;
                const packet = event.data;
                if (!packet || typeof packet !== 'object')
                    return;
                if (packet.ns !== 'versus')
                    return;
                const id = this.frameworks().find(id => event.source === this.frame_window(id));
                if (!id)
                    return;
                if (packet.case !== undefined && packet.case !== this.case_id())
                    return;
                switch (packet.type) {
                    // A remount invalidates whatever the previous run left on the card,
                    // unless a run is in flight and this is the frame answering it.
                    case 'ready': {
                        this.ready(id, true);
                        if (this.status(id) === 'running')
                            return;
                        this.result(id, result_idle);
                        return;
                    }
                    case 'result': {
                        this.result(id, {
                            status: status_parse(packet.status),
                            observed: String(packet.observed ?? ''),
                            metrics: metrics_parse(packet.metrics),
                        });
                        return;
                    }
                    // Not a verdict and not a breakage: the run happened under
                    // conditions that make its numbers meaningless. The previous
                    // verdict goes away with it rather than staying up next to the
                    // explanation, where it would read as still standing.
                    case 'invalid': {
                        this.result(id, {
                            status: 'invalid',
                            observed: this.invalid_text(packet.reason),
                            metrics: [],
                        });
                        return;
                    }
                    case 'error': {
                        this.result(id, {
                            status: 'error',
                            observed: String(packet.message ?? ''),
                            metrics: [],
                        });
                        return;
                    }
                }
            }
        }
        __decorate([
            $mol_mem_key
        ], $bog_smalljs_versus_case.prototype, "frame_uri", null);
        __decorate([
            $mol_mem_key
        ], $bog_smalljs_versus_case.prototype, "result", null);
        __decorate([
            $mol_mem_key
        ], $bog_smalljs_versus_case.prototype, "ready", null);
        __decorate([
            $mol_mem_key
        ], $bog_smalljs_versus_case.prototype, "frame_settled", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_versus_case.prototype, "frame_loaded", null);
        __decorate([
            $mol_mem_key
        ], $bog_smalljs_versus_case.prototype, "ready_watchdog", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_versus_case.prototype, "ready_expire", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_case.prototype, "page_visible", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_versus_case.prototype, "visibility_sync", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_case.prototype, "run_id", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_versus_case.prototype, "run", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_case.prototype, "watchdog", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_versus_case.prototype, "expire", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_case.prototype, "message_listener", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_case.prototype, "visibility_listener", null);
        $$.$bog_smalljs_versus_case = $bog_smalljs_versus_case;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem, px } = $mol_style_unit;
    const line = { width: '1px', style: 'solid', color: $bog_builderui_tokens.line };
    const mono = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace";
    // Verdict colours. Not theme tokens: the palette has no ok/warn/fail slots,
    // and these mid-tones stay legible on both the light and the dark card.
    const verdict_ok = '#3f9e57';
    const verdict_warn = '#bb8218';
    const verdict_fail = '#d2564f';
    $mol_style_define($bog_smalljs_versus_case, {
        flex: { direction: 'column' },
        gap: rem(1),
        padding: rem(1.25),
        border: { radius: rem(0.75), ...line },
        background: { color: $bog_builderui_tokens.card },
        Head: {
            flex: { direction: 'column' },
            gap: rem(0.35),
        },
        Title: {
            display: 'block',
            font: { family: $bog_builderui_tokens.font_head, size: rem(1.25), weight: 600 },
            lineHeight: '1.25',
            color: $bog_builderui_tokens.text,
        },
        Hint: {
            display: 'block',
            font: { size: rem(0.9375) },
            lineHeight: '1.5',
            color: $bog_builderui_tokens.shade,
        },
        Controls: {
            flex: { direction: 'row', wrap: 'wrap' },
            align: { items: 'center' },
            gap: rem(0.75),
        },
        Run: {
            flex: { grow: 0, shrink: 0 },
            padding: { top: rem(0.5), bottom: rem(0.5), left: rem(1.25), right: rem(1.25) },
            border: { radius: rem(0.375) },
            font: { weight: 600 },
            // $mol_button renders a custom tag, not <button>, so :disabled never
            // matches and the base sheet leaves a disabled button looking active.
            '@': {
                disabled: {
                    true: { opacity: 0.45 },
                },
            },
        },
        Run_hint: {
            display: 'block',
            flex: { shrink: 1 },
            minWidth: 0,
            font: { size: rem(0.8125) },
            lineHeight: '1.45',
            color: $bog_builderui_tokens.shade,
        },
        Columns: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: rem(0.75),
        },
        Column: {
            flex: { direction: 'column' },
            // without it the frame's intrinsic width wins over the grid track
            minWidth: 0,
            gap: rem(0.5),
            padding: rem(0.75),
            border: { radius: rem(0.5), ...line },
            background: { color: $bog_builderui_tokens.back },
        },
        Label: {
            display: 'block',
            font: { family: mono, size: rem(0.6875), weight: 600 },
            letterSpacing: rem(0.06),
            textTransform: 'uppercase',
            color: $bog_builderui_tokens.shade,
        },
        Frame: {
            display: 'block',
            width: '100%',
            height: px(320),
            minWidth: 0,
            border: { radius: rem(0.375), ...line },
            // the runner pages paint a light surface of their own
            background: { color: '#ffffff' },
        },
        Card: {
            flex: { direction: 'column' },
            minWidth: 0,
            gap: rem(0.4),
        },
        Observed: {
            display: 'block',
            font: { size: rem(0.875) },
            lineHeight: '1.45',
            color: $bog_builderui_tokens.text,
        },
        Metrics: {
            flex: { direction: 'column' },
            gap: rem(0.15),
        },
        Metric: {
            flex: { direction: 'row', wrap: 'wrap' },
            justify: { content: 'space-between' },
            gap: rem(0.5),
            font: { size: rem(0.8125) },
        },
        Metric_name: {
            display: 'block',
            color: $bog_builderui_tokens.shade,
        },
        Metric_value: {
            display: 'block',
            font: { family: mono },
            color: $bog_builderui_tokens.text,
        },
        Note: {
            display: 'block',
            padding: { top: rem(0.4) },
            border: { top: line },
            font: { size: rem(0.75) },
            lineHeight: '1.45',
            color: $bog_builderui_tokens.shade,
        },
        '@media': {
            // same breakpoint the other sections of the site fold at
            '(max-width: 47.9375rem)': {
                Columns: {
                    gridTemplateColumns: '1fr',
                },
            },
        },
    });
    $mol_style_define($bog_smalljs_versus_case_status, {
        flex: { direction: 'row', wrap: 'wrap' },
        align: { items: 'baseline' },
        gap: rem(0.4),
        font: { size: rem(0.875), weight: 600 },
        color: $bog_builderui_tokens.shade,
        Icon: {
            display: 'block',
            flex: { shrink: 0 },
        },
        Text: {
            display: 'block',
        },
        // ok / warn / fail are peer verdicts and get equal weight — warn is the
        // whole band between the two thresholds, not a rare edge. error is a
        // breakage, so it borrows the same red; invalid stays uncoloured on
        // purpose, since nothing was decided and the reader is only asked to
        // run it again.
        '@': {
            bog_smalljs_versus_status: {
                ok: { color: verdict_ok },
                warn: { color: verdict_warn },
                fail: { color: verdict_fail },
                error: { color: verdict_fail },
            },
        },
    });
})($ || ($ = {}));

;
	($.$bog_smalljs_versus) = class $bog_smalljs_versus extends ($.$mol_view) {
		title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_title_text"));
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h1");
			(obj.sub) = () => ([(this.title_text())]);
			return obj;
		}
		intro_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_intro_text"));
		}
		Intro(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.intro_text())]);
			return obj;
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Title()), (this.Intro())]);
			return obj;
		}
		cases(){
			return [];
		}
		Cases(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.cases()));
			return obj;
		}
		method_title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_method_title_text"));
		}
		Method_title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h2");
			(obj.sub) = () => ([(this.method_title_text())]);
			return obj;
		}
		method_body(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_method_body"));
		}
		Method_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.method_body())]);
			return obj;
		}
		method_link_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_method_link_label"));
		}
		Method_link_icon(){
			const obj = new this.$.$mol_icon_open_in_new();
			return obj;
		}
		Method_link(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://github.com/b-on-g/smalljs/tree/master/versus");
			(obj.sub) = () => ([(this.method_link_label()), (this.Method_link_icon())]);
			return obj;
		}
		Method(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Method_title()), 
				(this.Method_text()), 
				(this.Method_link())
			]);
			return obj;
		}
		sub(){
			return [
				(this.Head()), 
				(this.Cases()), 
				(this.Method())
			];
		}
		Case_race(){
			const obj = new this.$.$bog_smalljs_versus_case();
			(obj.case_id) = () => ("race");
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_versus_Case_race_title")));
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_smalljs_versus_Case_race_hint")));
			return obj;
		}
		Case_virtual(){
			const obj = new this.$.$bog_smalljs_versus_case();
			(obj.case_id) = () => ("virtual");
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_versus_Case_virtual_title")));
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_smalljs_versus_Case_virtual_hint")));
			return obj;
		}
		Case_leak(){
			const obj = new this.$.$bog_smalljs_versus_case();
			(obj.case_id) = () => ("leak");
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_versus_Case_leak_title")));
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_smalljs_versus_Case_leak_hint")));
			return obj;
		}
		Case_crash(){
			const obj = new this.$.$bog_smalljs_versus_case();
			(obj.case_id) = () => ("crash");
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_versus_Case_crash_title")));
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_smalljs_versus_Case_crash_hint")));
			return obj;
		}
	};
	($mol_mem(($.$bog_smalljs_versus.prototype), "Title"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Intro"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Head"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Cases"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Method_title"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Method_text"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Method_link_icon"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Method_link"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Method"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Case_race"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Case_virtual"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Case_leak"));
	($mol_mem(($.$bog_smalljs_versus.prototype), "Case_crash"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_smalljs_versus extends $.$bog_smalljs_versus {
            /** Crash-test cases in reading order. Each one is a $bog_smalljs_versus_case
             *  declared in the tree with its own `case_id`; the id is what the case passes
             *  to every runner iframe as `runner.html?case=<id>`. Adding a case means one
             *  declaration there plus one line here — the page itself stays static. */
            cases() {
                return [
                    this.Case_race(),
                    this.Case_virtual(),
                    this.Case_leak(),
                    this.Case_crash(),
                ];
            }
        }
        $$.$bog_smalljs_versus = $bog_smalljs_versus;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    // One editorial column for prose (heading, intro, methodology) and a wider one for
    // the cases, which hold three side-by-side runner frames and need the room.
    const prose = rem(48);
    const wide = rem(76);
    $mol_style_define($bog_smalljs_versus, {
        flex: { direction: 'column', grow: 1 },
        align: { items: 'center' },
        gap: rem(3),
        minWidth: 0,
        padding: { top: rem(3.5), bottom: rem(4), left: $mol_gap.block, right: $mol_gap.block },
        background: { color: $bog_builderui_tokens.back },
        Head: {
            flex: { direction: 'column' },
            gap: rem(1),
            // width:100% (not just max-width) so the column never collapses to its
            // max-content width and pushes the page sideways on a phone.
            width: '100%',
            maxWidth: prose,
        },
        Title: {
            display: 'block',
            font: { family: $bog_builderui_tokens.font_head, size: rem(2.75), weight: 500 },
            lineHeight: '1.14',
            letterSpacing: '-0.02em',
            color: $bog_builderui_tokens.text,
            maxWidth: '100%',
            overflowWrap: 'break-word',
        },
        Intro: {
            display: 'block',
            font: { size: rem(1.0625) },
            lineHeight: '1.6',
            maxWidth: rem(42),
            color: $bog_builderui_tokens.shade,
        },
        // Cases style themselves ($bog_smalljs_versus_case owns its layout); the page
        // only decides how wide the column is and how far apart the blocks sit.
        Cases: {
            flex: { direction: 'column' },
            gap: rem(3),
            width: '100%',
            maxWidth: wide,
            minWidth: 0,
        },
        Method: {
            flex: { direction: 'column' },
            align: { items: 'flex-start' },
            gap: rem(0.75),
            width: '100%',
            maxWidth: prose,
            padding: { top: rem(2) },
            border: { top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
        },
        Method_title: {
            display: 'block',
            font: { family: $bog_builderui_tokens.font_head, size: rem(1.625), weight: 500 },
            lineHeight: '1.2',
            color: $bog_builderui_tokens.text,
        },
        Method_text: {
            display: 'block',
            font: { size: rem(0.9375) },
            lineHeight: '1.6',
            color: $bog_builderui_tokens.shade,
        },
        Method_link: {
            flex: { direction: 'row', grow: 0 },
            align: { items: 'center' },
            gap: rem(0.4),
            margin: { top: rem(0.25) },
            color: $bog_builderui_tokens.control,
            font: { size: rem(0.9375), weight: 600 },
            ':hover': { color: $bog_builderui_tokens.focus },
        },
        Method_link_icon: {
            width: rem(0.9),
            height: rem(0.9),
            flex: { shrink: 0 },
        },
        '@media': {
            '(max-width: 47.9375rem)': {
                gap: rem(2.25),
                padding: { top: rem(2), bottom: rem(2.5), left: rem(1.25), right: rem(1.25) },
                Title: { font: { size: rem(2) } },
                Cases: { gap: rem(2.25) },
                Method: { padding: { top: rem(1.5) } },
            },
        },
    });
})($ || ($ = {}));

;
	($.$bog_smalljs_versus_runner) = class $bog_smalljs_versus_runner extends ($.$mol_view) {
		case_content(){
			return [];
		}
		race_options(){
			return [];
		}
		Race_options(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.race_options()));
			return obj;
		}
		race_panel_name(){
			return "";
		}
		Race_panel_name(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.race_panel_name())]);
			return obj;
		}
		race_panel_descr(){
			return "";
		}
		Race_panel_descr(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.race_panel_descr())]);
			return obj;
		}
		Race_panel(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Race_panel_name()), (this.Race_panel_descr())]);
			return obj;
		}
		race_option_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		race_option_current(id){
			return false;
		}
		race_option_label(id){
			return "";
		}
		virtual_rows(){
			return [];
		}
		Virtual_list(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.virtual_rows()));
			return obj;
		}
		Virtual_scroll(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Virtual_list())]);
			return obj;
		}
		virtual_row_text(id){
			return "";
		}
		virtual_placeholder(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_runner_virtual_placeholder"));
		}
		leak_hint(){
			return (this.$.$mol_locale.text("$bog_smalljs_versus_runner_leak_hint"));
		}
		Leak_hint(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.leak_hint())]);
			return obj;
		}
		leak_probes(){
			return [];
		}
		Leak_place(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.leak_probes()));
			return obj;
		}
		leak_probe_label(id){
			return "";
		}
		crash_cards(){
			return [];
		}
		Crash_list(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.crash_cards()));
			return obj;
		}
		Crash_scroll(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Crash_list())]);
			return obj;
		}
		crash_card_name(id){
			return "";
		}
		crash_card_text(id){
			return "";
		}
		sub(){
			return (this.case_content());
		}
		Race(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Race_options()), (this.Race_panel())]);
			return obj;
		}
		Race_option(id){
			const obj = new this.$.$bog_smalljs_versus_runner_option();
			(obj.click) = (next) => ((this.race_option_click(id, next)));
			(obj.current) = () => ((this.race_option_current(id)));
			(obj.title) = () => ((this.race_option_label(id)));
			return obj;
		}
		Virtual(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Virtual_scroll())]);
			return obj;
		}
		Virtual_row(id){
			const obj = new this.$.$mol_paragraph();
			(obj.title) = () => ((this.virtual_row_text(id)));
			return obj;
		}
		Virtual_placeholder(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.virtual_placeholder())]);
			return obj;
		}
		Leak(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Leak_hint()), (this.Leak_place())]);
			return obj;
		}
		Leak_probe(id){
			const obj = new this.$.$bog_smalljs_versus_runner_probe();
			(obj.label) = () => ((this.leak_probe_label(id)));
			return obj;
		}
		Crash(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Crash_scroll())]);
			return obj;
		}
		Crash_card(id){
			const obj = new this.$.$bog_smalljs_versus_runner_card();
			(obj.name) = () => ((this.crash_card_name(id)));
			(obj.text) = () => ((this.crash_card_text(id)));
			return obj;
		}
	};
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Race_options"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Race_panel_name"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Race_panel_descr"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Race_panel"));
	($mol_mem_key(($.$bog_smalljs_versus_runner.prototype), "race_option_click"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Virtual_list"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Virtual_scroll"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Leak_hint"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Leak_place"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Crash_list"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Crash_scroll"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Race"));
	($mol_mem_key(($.$bog_smalljs_versus_runner.prototype), "Race_option"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Virtual"));
	($mol_mem_key(($.$bog_smalljs_versus_runner.prototype), "Virtual_row"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Virtual_placeholder"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Leak"));
	($mol_mem_key(($.$bog_smalljs_versus_runner.prototype), "Leak_probe"));
	($mol_mem(($.$bog_smalljs_versus_runner.prototype), "Crash"));
	($mol_mem_key(($.$bog_smalljs_versus_runner.prototype), "Crash_card"));
	($.$bog_smalljs_versus_runner_option) = class $bog_smalljs_versus_runner_option extends ($.$mol_button_minor) {
		current(){
			return false;
		}
		attr(){
			return {...(super.attr()), "versus_current": (this.current())};
		}
	};
	($.$bog_smalljs_versus_runner_probe) = class $bog_smalljs_versus_runner_probe extends ($.$mol_view) {
		label(){
			return "";
		}
		sub(){
			return [(this.label())];
		}
	};
	($.$bog_smalljs_versus_runner_card) = class $bog_smalljs_versus_runner_card extends ($.$mol_view) {
		name(){
			return "";
		}
		text(){
			return "";
		}
		attr(){
			return {...(super.attr()), "versus_card": ""};
		}
		sub(){
			return [(this.name()), (this.text())];
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    /**
     * Shared store with a plain list of subscribers. Same shape in every runner
     * of the comparison, so that `subscribers.length` means the same thing.
     */
    class $bog_smalljs_versus_runner_store extends $mol_object {
        subscribers = [];
        static shared() {
            return new this;
        }
        subscribe(handler) {
            this.subscribers.push(handler);
            return new $bog_smalljs_versus_runner_link(this, handler);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_smalljs_versus_runner_store, "shared", null);
    $.$bog_smalljs_versus_runner_store = $bog_smalljs_versus_runner_store;
    /**
     * Reports whether a node is inside the viewport. An observer with no root of
     * its own measures against the top level viewport even from a nested frame,
     * which is what makes a scrolled away frame detectable from the inside.
     */
    class $bog_smalljs_versus_runner_watch extends $mol_object {
        observer;
        constructor(node, handler) {
            super();
            this.observer = new $mol_dom_context.IntersectionObserver(entries => handler(entries[entries.length - 1].isIntersecting), { threshold: 0 });
            this.observer.observe(node);
        }
        destructor() {
            this.observer.disconnect();
        }
    }
    $.$bog_smalljs_versus_runner_watch = $bog_smalljs_versus_runner_watch;
    /**
     * Handle of a single subscription. It is created inside a reactive cell of
     * the subscribing component, so the engine drops it together with that
     * component and the store forgets the handler without a manual call.
     */
    class $bog_smalljs_versus_runner_link extends $mol_object {
        store;
        handler;
        constructor(store, handler) {
            super();
            this.store = store;
            this.handler = handler;
        }
        destructor() {
            const index = this.store.subscribers.indexOf(this.handler);
            if (index >= 0)
                this.store.subscribers.splice(index, 1);
        }
    }
    $.$bog_smalljs_versus_runner_link = $bog_smalljs_versus_runner_link;
})($ || ($ = {}));
(function ($) {
    var $$;
    (function ($$) {
        /** Filler text of the virtual list rows. Hoisted, so that building 10 000
         *  rows does not rebuild it 10 000 times. */
        const filler = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ';
        class $bog_smalljs_versus_runner extends $.$bog_smalljs_versus_runner {
            /** Scenario to mount, taken from the query of the page the iframe loads. */
            case_id() {
                const href = this.$.$mol_dom_context.location.href;
                return new URL(href).searchParams.get('case') ?? 'race';
            }
            case_content() {
                switch (this.case_id()) {
                    case 'virtual': return [this.Virtual()];
                    case 'leak': return [this.Leak()];
                    case 'crash': return [this.Crash()];
                    default: return [this.Race()];
                }
            }
            // The listeners and the ready beacon are returned from their own cells and
            // held through auto(), otherwise the reactive engine would destroy them
            // right after they were created.
            auto() {
                return [
                    this.message_listener(),
                    this.visibility_listener(),
                    this.frame_watch(),
                    this.ready_beacon(),
                ];
            }
            message_listener() {
                return new this.$.$mol_dom_listener(this.$.$mol_dom_context, 'message', (event) => this.message_receive(event));
            }
            // Checked through visibilityState rather than the `hidden` flag: inside a
            // frame Chrome leaves `hidden` false while visibilityState already says
            // the tab went away, which makes a check on the flag silently dead.
            hidden() {
                return this.$.$mol_dom_context.document.visibilityState !== 'visible';
            }
            visibility_listener() {
                return new this.$.$mol_dom_listener(this.$.$mol_dom_context.document, 'visibilitychange', () => { if (this.hidden())
                    this.spoil('tab-hidden'); });
            }
            /** A frame scrolled out of the viewport stops being given animation
             *  frames, which would otherwise look like the framework hanging. */
            frame_watch() {
                return new this.$.$bog_smalljs_versus_runner_watch(this.dom_node(), visible => { if (!visible)
                    this.spoil('frame-offscreen'); });
            }
            /** Why the current run stopped being trustworthy, empty while it still
             *  is. The first reason wins: it is the one that actually spoiled the
             *  measurement, the rest are its consequences. */
            spoil_reason(next) {
                return next ?? '';
            }
            spoil(reason) {
                if (!this.spoil_reason())
                    this.spoil_reason(reason);
            }
            spoiled() {
                if (this.hidden())
                    this.spoil('tab-hidden');
                return this.spoil_reason();
            }
            /** Announces the mounted scenario once the first render is over. */
            ready_beacon() {
                const case_id = this.case_id();
                return new this.$.$mol_after_tick(() => this.post({ type: 'ready', case: case_id }));
            }
            post(message) {
                this.$.$mol_dom_context.parent.postMessage({ ns: 'versus', ...message }, '*');
            }
            message_receive(event) {
                const packet = event.data;
                if (!packet || typeof packet !== 'object')
                    return;
                if (packet.ns !== 'versus')
                    return;
                if (packet.type === 'run')
                    this.run();
                if (packet.type === 'reset')
                    this.reset();
            }
            async run() {
                this.spoil_reason('');
                this.spoiled();
                try {
                    switch (this.case_id()) {
                        case 'virtual':
                            await this.run_virtual();
                            break;
                        case 'leak':
                            await this.run_leak();
                            break;
                        case 'crash':
                            await this.run_crash();
                            break;
                        default:
                            await this.run_race();
                            break;
                    }
                }
                catch (error) {
                    this.post({ type: 'error', message: this.$.$mol_error_message(error) });
                }
            }
            reset() {
                this.race_selected(0);
                this.virtual_filled(false);
                this.leak_cycle(0);
                this.leak_mounted(false);
                this.crash_broken(false);
                return null;
            }
            report(status, observed, metrics = []) {
                const reason = this.spoiled();
                if (reason)
                    return this.report_invalid(reason);
                this.post({
                    type: 'result',
                    case: this.case_id(),
                    status,
                    observed,
                    metrics,
                });
            }
            /** Nothing measured is worth reporting, and the page should say why
             *  rather than hold on to the verdict of an earlier run. */
            report_invalid(reason) {
                this.post({
                    type: 'invalid',
                    case: this.case_id(),
                    reason,
                });
            }
            sleep(delay) {
                return new Promise(done => new this.$.$mol_after_timeout(delay, () => done()));
            }
            /** Waits for one animation frame. A hidden tab and a frame scrolled out of
             *  the viewport are never given one, so the wait also ends once the run
             *  is spoiled — otherwise it would hang forever and could not even report
             *  why it gave up. */
            frame() {
                return new Promise(done => {
                    let settled = false;
                    const finish = () => {
                        if (settled)
                            return;
                        settled = true;
                        done();
                    };
                    new this.$.$mol_after_frame(finish);
                    const guard = () => {
                        if (settled)
                            return;
                        if (this.spoiled())
                            return finish();
                        new this.$.$mol_after_timeout(100, guard);
                    };
                    new this.$.$mol_after_timeout(100, guard);
                });
            }
            // ---------------------------------------------------------------- race
            race_ids() {
                return [1, 2, 3, 4, 5];
            }
            race_selected(next) {
                return next ?? 0;
            }
            race_options() {
                return this.race_ids().map(id => this.Race_option(id));
            }
            race_option_label(id) {
                return `User ${id}`;
            }
            race_option_current(id) {
                return this.race_selected() === id;
            }
            race_option_click(id, next) {
                this.race_selected(id);
                return null;
            }
            race_delay(id) {
                return 1000 - (id - 1) * 200;
            }
            async race_load(id) {
                await this.sleep(this.race_delay(id));
                return {
                    name: `User ${id}`,
                    descr: `Profile of user ${id}, answered in ${this.race_delay(id)} ms`,
                };
            }
            /** The record is a value of the selected id. A record for an id nobody
             *  looks at any more has no place to land. */
            race_user(id) {
                return $mol_wire_sync(this).race_load(id);
            }
            race_panel_name() {
                const id = this.race_selected();
                return id ? this.race_user(id).name : '';
            }
            race_panel_descr() {
                const id = this.race_selected();
                return id ? this.race_user(id).descr : '';
            }
            /** The two waits add up to 1600 ms. Past this the machine was stretching
             *  timers, and stretched timers pull the 200 ms and 1000 ms answers
             *  towards each other until the order of arrival is a coin toss. */
            race_deadline() {
                return 2200;
            }
            async run_race() {
                const started = performance.now();
                this.race_selected(1);
                await this.sleep(100);
                this.race_selected(5);
                await this.sleep(1500);
                if (performance.now() - started > this.race_deadline())
                    this.spoil('timers-throttled');
                const shown = this.Race_panel().dom_node().textContent ?? '';
                const found = shown.match(/User (\d+)/);
                const id = found ? Number(found[1]) : 0;
                this.report(id === 5 ? 'ok' : 'fail', id
                    ? `Selected user 5, panel showed user ${id}`
                    : `Selected user 5, panel showed no user`);
            }
            // ------------------------------------------------------------- virtual
            virtual_count() {
                return 10000;
            }
            virtual_filled(next) {
                return next ?? false;
            }
            virtual_rows() {
                if (!this.virtual_filled())
                    return [this.Virtual_placeholder()];
                const rows = [];
                for (let index = 0; index < this.virtual_count(); ++index) {
                    rows.push(this.Virtual_row(index));
                }
                return rows;
            }
            virtual_row_text(index) {
                const size = 20 + (index * 37) % 400;
                const head = `Row ${index + 1}. `;
                const body = filler.repeat(Math.ceil(size / filler.length));
                return (head + body).slice(0, size);
            }
            async run_virtual() {
                const container = this.Virtual_scroll().dom_node();
                // Back to an empty list first, so a repeated Run measures the same
                // work over again instead of reading a list that is already there.
                this.virtual_filled(false);
                this.Virtual_scroll().scroll_top(0);
                await this.sleep(16);
                const started = performance.now();
                this.virtual_filled(true);
                await this.frame();
                await this.frame();
                // Reading the height makes the browser lay the rows out, so the
                // measurement covers the frame the user actually waits for.
                const height = container.scrollHeight;
                const render_time = Math.round(performance.now() - started);
                // Without frames the time above measured the wait, not the work, so
                // the run stops here instead of spending two more seconds scrolling.
                const spoiled = this.spoiled();
                if (spoiled)
                    return this.report_invalid(spoiled);
                this.Virtual_scroll().scroll_top(Math.round((height - container.clientHeight) / 2));
                await this.sleep(1000);
                this.Virtual_scroll().scroll_top(0);
                await this.sleep(1000);
                const nodes = container.querySelectorAll('*').length;
                this.report(nodes < 500 ? 'ok' : nodes > 5000 ? 'fail' : 'warn', `Rendered ${nodes} DOM nodes for ${this.virtual_count()} rows`, [
                    { name: 'DOM nodes', value: nodes, unit: '' },
                    { name: 'Render time', value: render_time, unit: 'ms' },
                ]);
            }
            // ---------------------------------------------------------------- leak
            leak_count() {
                return 100;
            }
            leak_cycle(next) {
                return next ?? 0;
            }
            leak_mounted(next) {
                return next ?? false;
            }
            leak_probes() {
                return this.leak_mounted() ? [this.Leak_probe(this.leak_cycle())] : [];
            }
            leak_probe_label(cycle) {
                return `Subscribed component, mount ${cycle}`;
            }
            async run_leak() {
                const store = this.$.$bog_smalljs_versus_runner_store.shared();
                const place = this.Leak_place();
                // dom_tree() renders the place right here instead of on the next
                // frame, so that every pass of the loop is a real mount and unmount.
                for (let cycle = 1; cycle <= this.leak_count(); ++cycle) {
                    this.leak_cycle(cycle);
                    this.leak_mounted(true);
                    place.dom_tree();
                    this.leak_mounted(false);
                    place.dom_tree();
                }
                // Cells left without subscribers are collected on the next tick.
                await this.sleep(100);
                const live = store.subscribers.length;
                const metrics = [{ name: 'Live subscribers', value: live, unit: '' }];
                const memory = performance.memory;
                if (memory)
                    metrics.push({
                        name: 'Heap',
                        value: Math.round(memory.usedJSHeapSize / 1048576),
                        unit: 'MB',
                    });
                this.report(live === 0 ? 'ok' : 'fail', `${this.leak_count()} mount cycles left ${live} live subscribers`, metrics);
            }
            // --------------------------------------------------------------- crash
            crash_count() {
                return 20;
            }
            /** Zero based index of the card whose record is replaced with null. */
            crash_broken_index() {
                return 6;
            }
            crash_broken(next) {
                return next ?? false;
            }
            crash_records() {
                const broken = this.crash_broken();
                const records = [];
                for (let index = 0; index < this.crash_count(); ++index) {
                    records.push(broken && index === this.crash_broken_index()
                        ? null
                        : { name: `Card ${index + 1}`, text: `Payload of card ${index + 1}` });
                }
                return records;
            }
            crash_cards() {
                const cards = [];
                for (let index = 0; index < this.crash_count(); ++index) {
                    cards.push(this.Crash_card(index));
                }
                return cards;
            }
            crash_card_name(index) {
                return this.crash_records()[index].name;
            }
            crash_card_text(index) {
                return this.crash_records()[index].text;
            }
            async run_crash() {
                // Whole records first, so a repeated Run swaps them out again.
                this.crash_broken(false);
                await this.sleep(16);
                this.crash_broken(true);
                await this.sleep(200);
                const container = this.Crash_list().dom_node();
                const alive = container.querySelectorAll('[versus_card]:not([mol_view_error])').length;
                const broken = container.querySelector('[versus_card][mol_view_error]');
                const placeholder = !!broken && (broken.textContent ?? '').trim().length > 0;
                const number = this.crash_broken_index() + 1;
                const status = alive === 0
                    ? 'fail'
                    : alive === this.crash_count() - 1 && placeholder
                        ? 'ok'
                        : 'warn';
                const observed = alive === 0
                    ? `0 of ${this.crash_count()} cards survived, the list disappeared`
                    : placeholder
                        ? `${alive} of ${this.crash_count()} cards survived, card ${number} showed an error placeholder`
                        : `${alive} of ${this.crash_count()} cards survived, card ${number} disappeared without a placeholder`;
                this.report(status, observed, [{ name: 'Surviving cards', value: alive, unit: '' }]);
            }
        }
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "case_id", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "case_content", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "message_listener", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "visibility_listener", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "frame_watch", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "spoil_reason", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "ready_beacon", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_versus_runner.prototype, "reset", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "race_selected", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "race_options", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_versus_runner.prototype, "race_option_click", null);
        __decorate([
            $mol_mem_key
        ], $bog_smalljs_versus_runner.prototype, "race_user", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "virtual_filled", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "virtual_rows", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "leak_cycle", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "leak_mounted", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "leak_probes", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "crash_broken", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "crash_records", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner.prototype, "crash_cards", null);
        $$.$bog_smalljs_versus_runner = $bog_smalljs_versus_runner;
        class $bog_smalljs_versus_runner_probe extends $.$bog_smalljs_versus_runner_probe {
            /** Subscription lives in a cell of this component, so it is released
             *  together with the component. There is no teardown hook to forget. */
            subscription() {
                return this.$.$bog_smalljs_versus_runner_store.shared().subscribe(() => this.label());
            }
            auto() {
                return [this.subscription()];
            }
        }
        __decorate([
            $mol_mem
        ], $bog_smalljs_versus_runner_probe.prototype, "subscription", null);
        $$.$bog_smalljs_versus_runner_probe = $bog_smalljs_versus_runner_probe;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    // Plain neutral palette instead of theme tokens: the three runner pages of a
    // case sit side by side and have to look the same, and the React and Vue
    // pages have no theme to read from.
    const text = '#18181b';
    const shade = '#71717a';
    const line_color = '#d4d4d8';
    const card = '#ffffff';
    const back = '#fafafa';
    const current = '#e0e7ff';
    const current_text = '#3730a3';
    const line = { width: '1px', style: 'solid', color: line_color };
    // mol_view ships with flex-shrink: 0, so every pane that has to fit the
    // frame instead of growing past it says shrink: 1 on its own.
    const pane = {
        flex: { direction: 'column', grow: 1, shrink: 1 },
        minHeight: 0,
        minWidth: 0,
    };
    const scroller = {
        flex: { grow: 1, shrink: 1 },
        minHeight: 0,
        border: { width: '1px', style: 'solid', color: line_color, radius: rem(0.25) },
        background: { color: back },
    };
    const hint = {
        flex: { shrink: 0 },
        color: shade,
        font: { size: rem(0.75) },
    };
    const row = {
        padding: { top: rem(0.25), bottom: rem(0.25), left: rem(0.5), right: rem(0.5) },
        border: { bottom: { width: '1px', style: 'solid', color: line_color } },
    };
    $mol_style_define($bog_smalljs_versus_runner, {
        flex: { direction: 'column' },
        gap: rem(0.5),
        height: '100%',
        minHeight: 0,
        padding: rem(0.75),
        overflow: 'hidden',
        background: { color: card },
        color: text,
        font: {
            family: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
            size: rem(0.8125),
        },
        Race: {
            flex: { direction: 'row', grow: 1, shrink: 1 },
            gap: rem(0.5),
            minHeight: 0,
        },
        Race_options: {
            flex: { direction: 'column', shrink: 0 },
            gap: rem(0.25),
            minWidth: rem(6),
        },
        Race_panel: {
            ...pane,
            gap: rem(0.25),
            padding: rem(0.5),
            border: { ...line, radius: rem(0.25) },
            background: { color: back },
        },
        Race_panel_name: {
            minHeight: rem(1.25),
            font: { weight: 600 },
        },
        Race_panel_descr: {
            minHeight: rem(1.25),
            color: shade,
        },
        Virtual: pane,
        Virtual_scroll: scroller,
        Virtual_placeholder: {
            ...row,
            color: shade,
        },
        Virtual_list: {
            flex: { direction: 'column' },
        },
        Virtual_row: row,
        Leak: {
            ...pane,
            gap: rem(0.5),
        },
        Leak_hint: hint,
        Leak_place: {
            flex: { direction: 'column', shrink: 0 },
            minHeight: rem(2),
            padding: rem(0.5),
            border: { ...line, radius: rem(0.25) },
            background: { color: back },
        },
        Crash: pane,
        Crash_scroll: scroller,
        Crash_list: {
            flex: { direction: 'column' },
            gap: rem(0.25),
            padding: rem(0.25),
        },
    });
    $mol_style_define($bog_smalljs_versus_runner_option, {
        flex: { grow: 0, shrink: 0 },
        justify: { content: 'flex-start' },
        minHeight: rem(1.75),
        padding: { top: rem(0.25), bottom: rem(0.25), left: rem(0.5), right: rem(0.5) },
        border: { radius: rem(0.25) },
        font: { size: rem(0.8125) },
        color: text,
        '@': {
            versus_current: {
                true: {
                    background: { color: current },
                    color: current_text,
                },
            },
        },
    });
    $mol_style_define($bog_smalljs_versus_runner_probe, {
        color: shade,
    });
    $mol_style_define($bog_smalljs_versus_runner_card, {
        flex: { direction: 'column', shrink: 0 },
        minHeight: rem(2.5),
        padding: { top: rem(0.25), bottom: rem(0.25), left: rem(0.5), right: rem(0.5) },
        border: { ...line, radius: rem(0.25) },
        background: { color: card },
    });
})($ || ($ = {}));


//# sourceMappingURL=web.js.map
