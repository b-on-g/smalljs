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
	($.$bog_builderui_div) = class $bog_builderui_div extends ($.$mol_view) {};


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
"use strict";
var $;
(function ($) {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    $.$bog_theme = $mol_style_prop('mol_theme', [
        'back',
        'background',
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
    ]);
    /**
     * Available theme names.
     * Add new theme to theme.css and add its name here.
     */
    $.$bog_theme_names = [
        '$mol_theme_giper_smash_dark',
        '$mol_theme_giper_smash_light',
        '$mol_theme_light',
        '$mol_theme_dark',
        '$mol_theme_monefro_light',
        '$mol_theme_monefro_dark',
        '$mol_theme_homerent_light',
        '$mol_theme_homerent_dark',
        '$mol_theme_upwork',
        '$mol_theme_ainews_light',
        '$mol_theme_ainews_dark',
        '$mol_theme_calm_dark',
        '$mol_theme_calm_light',
    ];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/theme/theme.css", ":root {\n\t--mol_theme_hue: 645deg;\n\t--mol_theme_hue_spread: 90deg;\n\t--mol_theme_background: var(--mol_theme_back);\n\n\t/* Bog theme semantic aliases */\n\t--mol_theme_primary_hue: var(--mol_theme_hue);\n\t--mol_theme_secondary_hue: calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread));\n\t--mol_theme_tertiary_hue: calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread));\n\t--mol_theme_accent_hue: calc(var(--mol_theme_hue) + 180deg);\n}\n\n:where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\n:root,\n[mol_theme='$mol_theme_dark'],\n:where([mol_theme='$mol_theme_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: hsl(0deg, 0%, 0%, 0.75);\n\n\t--bog_theme_back: hsl(var(--bog_theme_hue), 8%, 12%);\n\t--bog_theme_card: hsl(var(--bog_theme_hue), 15%, 18%, 0.25);\n\t--bog_theme_field: hsl(var(--bog_theme_hue), 12%, 10%, 0.25);\n\t--bog_theme_hover: hsl(var(--bog_theme_hue), 0%, 50%, 0.1);\n\n\t--bog_theme_text: hsl(var(--bog_theme_hue), 8%, 85%);\n\t--bog_theme_shade: hsl(var(--bog_theme_hue), 12%, 65%, 1);\n\t--bog_theme_line: hsl(var(--bog_theme_hue), 8%, 50%, 0.25);\n\t--bog_theme_focus: hsl(calc(var(--bog_theme_hue) + 180deg), 60%, 65%);\n\n\t--bog_theme_control: hsl(var(--bog_theme_hue), 25%, 70%);\n\t--bog_theme_current: hsl(calc(var(--bog_theme_hue) - var(--bog_theme_hue_spread)), 25%, 70%);\n\t--bog_theme_special: hsl(calc(var(--bog_theme_hue) + var(--bog_theme_hue_spread)), 25%, 70%);\n}\n@supports (color: oklch(0% 0 0deg)) {\n\t:root,\n\t[mol_theme='$mol_theme_dark'],\n\t:where([mol_theme='$mol_theme_dark']) [mol_theme] {\n\t\t--bog_theme_back: oklch(12% 0.02 var(--bog_theme_hue));\n\t\t--bog_theme_card: oklch(18% 0.03 var(--bog_theme_hue) / 0.25);\n\t\t--bog_theme_field: oklch(10% 0.015 var(--bog_theme_hue) / 0.25);\n\t\t--bog_theme_hover: oklch(70% 0 var(--bog_theme_hue) / 0.1);\n\n\t\t--bog_theme_text: oklch(85% 0.025 var(--bog_theme_hue));\n\t\t--bog_theme_shade: oklch(65% 0.035 var(--bog_theme_hue));\n\t\t--bog_theme_line: oklch(50% 0.025 var(--bog_theme_hue) / 0.25);\n\t\t--bog_theme_focus: oklch(75% 0.15 calc(var(--bog_theme_hue) + 180deg));\n\n\t\t--bog_theme_control: oklch(70% 0.06 var(--bog_theme_hue));\n\t\t--bog_theme_current: oklch(70% 0.08 calc(var(--bog_theme_hue) - var(--bog_theme_hue_spread)));\n\t\t--bog_theme_special: oklch(70% 0.08 calc(var(--bog_theme_hue) + var(--bog_theme_hue_spread)));\n\t}\n}\n\n[mol_theme='$mol_theme_light'],\n:where([mol_theme='$mol_theme_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl(0deg, 0%, 100%, 0.75);\n\n\t--mol_theme_back: hsl(var(--mol_theme_hue), 0%, 100%);\n\t--mol_theme_card: hsl(var(--mol_theme_hue), 50%, 100%, 0.5);\n\t--mol_theme_field: hsl(var(--mol_theme_hue), 50%, 100%, 0.75);\n\t--mol_theme_hover: hsl(var(--mol_theme_hue), 0%, 50%, 0.1);\n\n\t--mol_theme_text: hsl(var(--mol_theme_hue), 0%, 0%);\n\t--mol_theme_shade: hsl(var(--mol_theme_hue), 0%, 40%, 1);\n\t--mol_theme_line: hsl(var(--mol_theme_hue), 0%, 50%, 0.25);\n\t--mol_theme_focus: hsl(calc(var(--mol_theme_hue) + 180deg), 100%, 40%);\n\n\t--mol_theme_control: hsl(var(--mol_theme_hue), 80%, 30%);\n\t--mol_theme_current: hsl(calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)), 80%, 30%);\n\t--mol_theme_special: hsl(calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)), 80%, 30%);\n}\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_light'],\n\t:where([mol_theme='$mol_theme_light']) [mol_theme] {\n\t\t--mol_theme_back: oklch(100% 0 var(--mol_theme_hue));\n\t\t--mol_theme_card: oklch(99% 0.01 var(--mol_theme_hue) / 0.5);\n\t\t--mol_theme_field: oklch(100% 0 var(--mol_theme_hue) / 0.5);\n\t\t--mol_theme_hover: oklch(70% 0 var(--mol_theme_hue) / 0.1);\n\n\t\t--mol_theme_text: oklch(20% 0 var(--mol_theme_hue));\n\t\t--mol_theme_shade: oklch(60% 0 var(--mol_theme_hue));\n\t\t--mol_theme_line: oklch(50% 0 var(--mol_theme_hue) / 0.25);\n\t\t--mol_theme_focus: oklch(60% 0.2 calc(var(--mol_theme_hue) + 180deg));\n\n\t\t--mol_theme_control: oklch(40% 0.15 var(--mol_theme_hue));\n\t\t--mol_theme_current: oklch(50% 0.2 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t\t--mol_theme_special: oklch(50% 0.2 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t}\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: oklch(25% 0.075 var(--mol_theme_hue));\n\t--mol_theme_card: oklch(35% 0.1 var(--mol_theme_hue) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: oklch(85% 0.075 var(--mol_theme_hue));\n\t--mol_theme_card: oklch(98% 0.03 var(--mol_theme_hue) / 0.25);\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: oklch(25% 0.05 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(35% 0.1 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)) / 0.25);\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: oklch(25% 0.05 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(35% 0.1 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)) / 0.25);\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: oklch(35% 0.1 calc(var(--mol_theme_hue) + 180deg));\n\t--mol_theme_card: oklch(45% 0.15 calc(var(--mol_theme_hue) + 180deg) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: oklch(83% 0.1 calc(var(--mol_theme_hue) + 180deg));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + 180deg) / 0.25);\n}\n\n/* Upwork theme - based on Upwork brand colors */\n[mol_theme='$mol_theme_upwork'],\n:where([mol_theme='$mol_theme_upwork']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(255, 255, 255, 0.75);\n\n\t/* Upwork brand colors: #73bb44 (primary green), #4fab4a (medium green), #385925 (dark green), #b5deb1 (light green) */\n\t--mol_theme_back: #ffffff;\n\t--mol_theme_card: #f9fcf7;\n\t--mol_theme_field: #ffffff;\n\t--mol_theme_hover: rgba(115, 187, 68, 0.1);\n\n\t--mol_theme_text: #4c4444;\n\t--mol_theme_shade: #6e6d7a;\n\t--mol_theme_line: rgba(115, 187, 68, 0.25);\n\t--mol_theme_focus: #73bb44;\n\n\t--mol_theme_control: #73bb44;\n\t--mol_theme_current: #4fab4a;\n\t--mol_theme_special: #385925;\n}\n\n/* Ainews dark theme - based on Ainews brand palette */\n[mol_theme='$mol_theme_ainews_dark'],\n:where([mol_theme='$mol_theme_ainews_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\n\t/* ВАЖНО: mol_* — именно их читает демка */\n\t--mol_theme_back: #3e3e3e; /* paper dark */\n\t--mol_theme_card: #4a4a4a40; /* paper-2 dark 25% */\n\t--mol_theme_field: #4c4c4c40; /* chip dark 25% */\n\t--mol_theme_hover: #5a5a5a1a; /* edge dark 10% */\n\n\t--mol_theme_text: #bcbcbc; /* ink dark */\n\t--mol_theme_shade: #909090; /* ink-muted dark */\n\t--mol_theme_line: #5a5a5a40; /* edge dark 25% */\n\t--mol_theme_focus: #a8bcff; /* accent dark */\n\n\t--mol_theme_control: #a8bcff; /* accent dark */\n\t--mol_theme_current: #c7b18c; /* accent-2 dark */\n\t--mol_theme_special: #d4bf9d; /* accent-2 lighter */\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_ainews_dark'],\n\t:where([mol_theme='$mol_theme_ainews_dark']) [mol_theme] {\n\t\t--mol_theme_back: #3e3e3e;\n\t\t--mol_theme_card: #4a4a4a40;\n\t\t--mol_theme_field: #4c4c4c40;\n\t\t--mol_theme_hover: #5a5a5a1a;\n\n\t\t--mol_theme_text: #bcbcbc;\n\t\t--mol_theme_shade: #909090;\n\t\t--mol_theme_line: #5a5a5a40;\n\t\t--mol_theme_focus: #a8bcff;\n\n\t\t--mol_theme_control: #a8bcff;\n\t\t--mol_theme_current: #c7b18c;\n\t\t--mol_theme_special: #d4bf9d;\n\t}\n}\n\n/* Ainews light theme */\n[mol_theme='$mol_theme_ainews_light'],\n:where([mol_theme='$mol_theme_ainews_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: #fbf8f1bf; /* 75% */\n\n\t--mol_theme_back: #f7f3e9; /* paper */\n\t--mol_theme_card: #fbf8f180; /* paper-2 50% */\n\t--mol_theme_field: #efe8d8bf; /* chip 75% */\n\t--mol_theme_hover: #ded7c81a; /* edge 10% */\n\n\t--mol_theme_text: #22211f; /* ink */\n\t--mol_theme_shade: #6e6a62; /* ink-muted */\n\t--mol_theme_line: #ded7c840; /* edge 25% */\n\t--mol_theme_focus: #3b5aad; /* accent */\n\n\t--mol_theme_control: #3b5aad; /* accent */\n\t--mol_theme_current: #92734b; /* accent-2 */\n\t--mol_theme_special: #c7b18c; /* accent-2 lighter */\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_ainews_light'],\n\t:where([mol_theme='$mol_theme_ainews_light']) [mol_theme] {\n\t\t--mol_theme_back: #f7f3e9;\n\t\t--mol_theme_card: #fbf8f180;\n\t\t--mol_theme_field: #efe8d8bf;\n\t\t--mol_theme_hover: #ded7c81a;\n\n\t\t--mol_theme_text: #22211f;\n\t\t--mol_theme_shade: #6e6a62;\n\t\t--mol_theme_line: #ded7c840;\n\t\t--mol_theme_focus: #3b5aad;\n\n\t\t--mol_theme_control: #3b5aad;\n\t\t--mol_theme_current: #92734b;\n\t\t--mol_theme_special: #c7b18c;\n\t}\n}\n\n/* HomeRent dark theme */\n[mol_theme='$mol_theme_homerent_dark'],\n:where([mol_theme='$mol_theme_homerent_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: rgba(0, 0, 0, 0.6);\n\n\t--mol_theme_back: #2f2f2f;\n\t--mol_theme_background: #f5f5f5;\n\t--mol_theme_card: #3a3a3a;\n\t--mol_theme_field: #3a3a3a;\n\t--mol_theme_hover: rgba(255, 255, 255, 0.06);\n\n\t--mol_theme_text: #f5f5f5;\n\t--mol_theme_shade: #c7c7c7;\n\t--mol_theme_line: #ffffff26;\n\t--mol_theme_focus: #8fc32b;\n\n\t--mol_theme_control: #dbe05b;\n\t--mol_theme_current: #8fc32b;\n\t--mol_theme_special: #8fc32b;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_homerent_dark'],\n\t:where([mol_theme='$mol_theme_homerent_dark']) [mol_theme] {\n\t\t--mol_theme_back: #2f2f2f;\n\t\t--mol_theme_background: #f5f5f5;\n\t\t--mol_theme_card: #3a3a3a;\n\t\t--mol_theme_field: #3a3a3a;\n\t\t--mol_theme_hover: rgba(255, 255, 255, 0.06);\n\n\t\t--mol_theme_text: #f5f5f5;\n\t\t--mol_theme_shade: #c7c7c7;\n\t\t--mol_theme_line: #ffffff26;\n\t\t--mol_theme_focus: #8fc32b;\n\n\t\t--mol_theme_control: #dbe05b;\n\t\t--mol_theme_current: #8fc32b;\n\t\t--mol_theme_special: #8fc32b;\n\t}\n}\n\n/* HomeRent light theme */\n[mol_theme='$mol_theme_homerent_light'],\n:where([mol_theme='$mol_theme_homerent_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(245, 245, 245, 0.75);\n\n\t--mol_theme_back: #ffffff;\n\t--mol_theme_background: #f5f5f5;\n\t--mol_theme_card: #ffffff;\n\t--mol_theme_field: #ffffff;\n\t--mol_theme_hover: #8fc32b1a;\n\n\t--mol_theme_text: #4c4c4c;\n\t--mol_theme_shade: #707070;\n\t--mol_theme_line: #4c4c4c26;\n\t--mol_theme_focus: #8fc32b;\n\n\t--mol_theme_control: #dbe05b;\n\t--mol_theme_current: #8fc32b;\n\t--mol_theme_special: #8fc32b;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_homerent_light'],\n\t:where([mol_theme='$mol_theme_homerent_light']) [mol_theme] {\n\t\t--mol_theme_back: #ffffff;\n\t\t--mol_theme_background: #f5f5f5;\n\t\t--mol_theme_card: #ffffff;\n\t\t--mol_theme_field: #ffffff;\n\t\t--mol_theme_hover: #8fc32b1a;\n\n\t\t--mol_theme_text: #4c4c4c;\n\t\t--mol_theme_shade: #707070;\n\t\t--mol_theme_line: #4c4c4c26;\n\t\t--mol_theme_focus: #8fc32b;\n\n\t\t--mol_theme_control: #dbe05b;\n\t\t--mol_theme_current: #8fc32b;\n\t\t--mol_theme_special: #8fc32b;\n\t}\n}\n\n/* Giper Smash dark theme - original game palette */\n[mol_theme='$mol_theme_giper_smash_dark'],\n:where([mol_theme='$mol_theme_giper_smash_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: rgba(0, 0, 0, 0.85);\n\n\t--mol_theme_back: #1a1a2e;\n\t--mol_theme_card: #2d2d44;\n\t--mol_theme_field: #16213e;\n\t--mol_theme_hover: rgba(118, 75, 162, 0.15);\n\n\t--mol_theme_text: #ffffff;\n\t--mol_theme_shade: #b0b0cc;\n\t--mol_theme_line: rgba(255, 255, 255, 0.12);\n\t--mol_theme_focus: #f5b041;\n\n\t--mol_theme_control: #44a08d;\n\t--mol_theme_current: #0088cc;\n\t--mol_theme_special: #764ba2;\n}\n\n/* Giper Smash light theme - bright game palette */\n[mol_theme='$mol_theme_giper_smash_light'],\n:where([mol_theme='$mol_theme_giper_smash_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(255, 255, 255, 0.85);\n\n\t--mol_theme_back: #f0eef5;\n\t--mol_theme_card: #ffffff;\n\t--mol_theme_field: #e8e5f0;\n\t--mol_theme_hover: rgba(118, 75, 162, 0.08);\n\n\t--mol_theme_text: #1a1a2e;\n\t--mol_theme_shade: #5c5c7a;\n\t--mol_theme_line: rgba(26, 26, 46, 0.12);\n\t--mol_theme_focus: #d4941a;\n\n\t--mol_theme_control: #2e8b73;\n\t--mol_theme_current: #0077b3;\n\t--mol_theme_special: #6a3d99;\n}\n\n/* Monefro dark theme - inspired by Monefy */\n[mol_theme='$mol_theme_monefro_dark'],\n:where([mol_theme='$mol_theme_monefro_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: rgba(0, 0, 0, 0.6);\n\n\t--mol_theme_back: #24201c;\n\t--mol_theme_card: #2c2722;\n\t--mol_theme_field: #29241f;\n\t--mol_theme_hover: rgba(255, 255, 255, 0.04);\n\n\t--mol_theme_text: #f0e7dc;\n\t--mol_theme_shade: #b5a99c;\n\t--mol_theme_line: rgba(255, 255, 255, 0.12);\n\t--mol_theme_focus: #56c78a;\n\n\t--mol_theme_control: #56c78a;\n\t--mol_theme_current: #f2776e;\n\t--mol_theme_special: #f6b04a;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_monefro_dark'],\n\t:where([mol_theme='$mol_theme_monefro_dark']) [mol_theme] {\n\t\t--mol_theme_back: #24201c;\n\t\t--mol_theme_card: #2c2722;\n\t\t--mol_theme_field: #29241f;\n\t\t--mol_theme_hover: rgba(255, 255, 255, 0.04);\n\n\t\t--mol_theme_text: #f0e7dc;\n\t\t--mol_theme_shade: #b5a99c;\n\t\t--mol_theme_line: rgba(255, 255, 255, 0.12);\n\t\t--mol_theme_focus: #56c78a;\n\n\t\t--mol_theme_control: #56c78a;\n\t\t--mol_theme_current: #f2776e;\n\t\t--mol_theme_special: #f6b04a;\n\t}\n}\n\n/* Monefro light theme - inspired by Monefy */\n[mol_theme='$mol_theme_monefro_light'],\n:where([mol_theme='$mol_theme_monefro_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(255, 255, 255, 0.75);\n\n\t--mol_theme_back: #f6f2ea;\n\t--mol_theme_card: #ffffff;\n\t--mol_theme_field: #fff8ef;\n\t--mol_theme_hover: rgba(0, 0, 0, 0.04);\n\n\t--mol_theme_text: #3f3b36;\n\t--mol_theme_shade: #8b8278;\n\t--mol_theme_line: rgba(64, 55, 46, 0.15);\n\t--mol_theme_focus: #2f9a6a;\n\n\t--mol_theme_control: #2f9a6a;\n\t--mol_theme_current: #e85b54;\n\t--mol_theme_special: #f3a43b;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_monefro_light'],\n\t:where([mol_theme='$mol_theme_monefro_light']) [mol_theme] {\n\t\t--mol_theme_back: #f6f2ea;\n\t\t--mol_theme_card: #ffffff;\n\t\t--mol_theme_field: #fff8ef;\n\t\t--mol_theme_hover: rgba(0, 0, 0, 0.04);\n\n\t\t--mol_theme_text: #3f3b36;\n\t\t--mol_theme_shade: #8b8278;\n\t\t--mol_theme_line: rgba(64, 55, 46, 0.15);\n\t\t--mol_theme_focus: #2f9a6a;\n\n\t\t--mol_theme_control: #2f9a6a;\n\t\t--mol_theme_current: #e85b54;\n\t\t--mol_theme_special: #f3a43b;\n\t}\n}\n\n/* ═══════════════════════════════════════════════════════════════\n   Calm theme — universal working theme (draft for review)\n   Base hue: 230° (blue-gray), spread: 90°\n   Style: quiet, professional, no noise\n   ═══════════════════════════════════════════════════════════════ */\n\n/* Calm dark theme */\n[mol_theme='$mol_theme_calm_dark'],\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: #000000bf;\n\t--mol_theme_hue: 230deg;\n\t--mol_theme_hue_spread: 90deg;\n\n\t--mol_theme_back: #0d1117;\n\t--mol_theme_card: #161b2240;\n\t--mol_theme_field: #0a0e1440;\n\t--mol_theme_hover: #ffffff0c;\n\n\t--mol_theme_text: #e6edf3;\n\t--mol_theme_shade: #8b949e;\n\t--mol_theme_line: #30363d;\n\t--mol_theme_focus: #d29922;\n\n\t--mol_theme_control: #2f81f7;\n\t--mol_theme_current: #3fb950;\n\t--mol_theme_special: #a371f7;\n}\n\n/* Calm light theme */\n[mol_theme='$mol_theme_calm_light'],\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: #f7f8fabf;\n\t--mol_theme_hue: 230deg;\n\t--mol_theme_hue_spread: 90deg;\n\n\t--mol_theme_back: #f7f8fa;\n\t--mol_theme_card: #ffffff80;\n\t--mol_theme_field: #e8eaf0bf;\n\t--mol_theme_hover: #0000000a;\n\n\t--mol_theme_text: #1a1c23;\n\t--mol_theme_shade: #656a80;\n\t--mol_theme_line: #3a3e5026;\n\t--mol_theme_focus: #b87518;\n\n\t--mol_theme_control: #3560b8;\n\t--mol_theme_current: #28856e;\n\t--mol_theme_special: #8a4aad;\n}\n\n/* Calm dark sub-themes */\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: #1a2840;\n\t--mol_theme_card: #243450;\n}\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: #143028;\n\t--mol_theme_card: #1c3e3450;\n}\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: #2a1c48;\n\t--mol_theme_card: #3a2a5c50;\n}\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: #3a1c2a;\n\t--mol_theme_card: #4c283a50;\n}\n\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: oklch(85% 0.075 var(--mol_theme_hue));\n\t--mol_theme_card: oklch(98% 0.03 var(--mol_theme_hue) / 0.25);\n}\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: oklch(83% 0.1 calc(var(--mol_theme_hue) + 180deg));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + 180deg) / 0.25);\n}\n");
})($ || ($ = {}));

;
	($.$bog_theme_auto) = class $bog_theme_auto extends ($.$mol_plugin) {
		themes_default(){
			return [];
		}
		theme(){
			return "";
		}
		themes(){
			return (this.themes_default());
		}
		theme_light(){
			return "$mol_theme_light";
		}
		theme_dark(){
			return "$mol_theme_dark";
		}
		mode(next){
			if(next !== undefined) return next;
			return "system";
		}
		mode_next(next){
			if(next !== undefined) return next;
			return null;
		}
		theme_next(next){
			if(next !== undefined) return next;
			return null;
		}
		theme_prev(next){
			if(next !== undefined) return next;
			return null;
		}
		theme_set(next){
			if(next !== undefined) return next;
			return null;
		}
		is_light_now(){
			return false;
		}
		attr(){
			return {"mol_theme": (this.theme())};
		}
	};
	($mol_mem(($.$bog_theme_auto.prototype), "mode"));
	($mol_mem(($.$bog_theme_auto.prototype), "mode_next"));
	($mol_mem(($.$bog_theme_auto.prototype), "theme_next"));
	($mol_mem(($.$bog_theme_auto.prototype), "theme_prev"));
	($mol_mem(($.$bog_theme_auto.prototype), "theme_set"));


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
    class $mol_state_session extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.sessionStorage;
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
        static value(key, next) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
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
    class $mol_media extends $mol_object2 {
        static match(query, next) {
            if (next !== undefined)
                return next;
            const res = this.$.$mol_dom_context.matchMedia?.(query) ?? {};
            res.onchange = () => this.match(query, res.matches);
            return res.matches;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_media, "match", null);
    $.$mol_media = $mol_media;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function parse(theme) {
        if (theme === 'true')
            return true;
        if (theme === 'false')
            return false;
        return null;
    }
    /**
     * Switcher between light/dark themes (usually for `mol_theme_auto` plugin).
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_lights_demo
     */
    function $mol_lights(next) {
        const arg = parse(this.$mol_state_arg.value('mol_lights'));
        const base = this.$mol_media.match('(prefers-color-scheme: light)');
        if (next === undefined) {
            return arg ?? this.$mol_state_local.value('$mol_lights') ?? base;
        }
        else {
            if (arg === null) {
                this.$mol_state_local.value('$mol_lights', next === base ? null : next);
            }
            else {
                this.$mol_state_arg.value('mol_lights', String(next));
            }
            return next;
        }
    }
    $.$mol_lights = $mol_lights;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_theme_auto extends $.$bog_theme_auto {
            themes_default() {
                return this.$.$bog_theme_names;
            }
            /** Stores current mode in localStorage. Defaults to 'system'.
             *  При записи дёргает класс `.bog_theme_switching` на `<html>` —
             *  это активирует CSS-transition'ы на цветах темы.
             */
            mode(next) {
                if (next !== undefined && typeof document !== 'undefined') {
                    const root = document.documentElement;
                    root.classList.add('bog_theme_switching');
                    setTimeout(() => root.classList.remove('bog_theme_switching'), 350);
                }
                return this.$.$mol_state_local.value(`${this}.mode()`, next) ?? 'system';
            }
            click_step(next) {
                return this.$.$mol_state_session.value(`${this}.click_step()`, next) ?? 0;
            }
            /** 3-click cycle: opposite → back → system. */
            mode_next() {
                const step = (this.click_step() + 1) % 3;
                this.click_step(step);
                if (step === 0)
                    this.mode('system');
                else
                    this.mode(this.is_light_now() ? 'dark' : 'light');
            }
            is_light_now() {
                const mode = this.mode();
                if (mode === 'light')
                    return true;
                if (mode === 'dark')
                    return false;
                if (mode === 'system')
                    return this.$.$mol_lights();
                return this.theme().toLowerCase().includes('light');
            }
            theme_index(next) {
                const stored = this.$.$mol_state_local.value(`${this}.theme_index()`, next);
                if (stored === null && next === undefined) {
                    return this.system_theme_index();
                }
                return stored ?? 0;
            }
            system_theme_index() {
                const themes = this.themes();
                const prefersLight = this.$.$mol_lights();
                const preferredTheme = prefersLight ? this.theme_light() : this.theme_dark();
                const index = themes.indexOf(preferredTheme);
                return index !== -1 ? index : 0;
            }
            theme() {
                const mode = this.mode();
                if (mode === 'light')
                    return this.theme_light();
                if (mode === 'dark')
                    return this.theme_dark();
                if (mode === 'custom') {
                    const themes = this.themes();
                    const index = this.theme_index();
                    if (themes.length === 0)
                        return this.theme_light();
                    return themes[index % themes.length];
                }
                // system — follow browser preference
                return this.$.$mol_lights() ? this.theme_light() : this.theme_dark();
            }
            theme_next() {
                this.mode_next();
            }
            theme_prev() {
                const cycle = ['system', 'light', 'dark'];
                const i = cycle.indexOf(this.mode());
                this.mode(cycle[i <= 0 ? cycle.length - 1 : i - 1]);
            }
            /** Called by picker. Sets mode to light/dark or custom for themed palettes. */
            theme_set(index) {
                const themes = this.themes();
                if (themes.length === 0)
                    return;
                const theme = themes[index % themes.length];
                if (theme === this.theme_light()) {
                    this.mode('light');
                }
                else if (theme === this.theme_dark()) {
                    this.mode('dark');
                }
                else {
                    this.mode('custom');
                    this.theme_index(index % themes.length);
                }
                this.click_step(0);
            }
        }
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "mode", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "click_step", null);
        __decorate([
            $mol_action
        ], $bog_theme_auto.prototype, "mode_next", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "is_light_now", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "theme_index", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "system_theme_index", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "theme", null);
        __decorate([
            $mol_action
        ], $bog_theme_auto.prototype, "theme_next", null);
        __decorate([
            $mol_action
        ], $bog_theme_auto.prototype, "theme_prev", null);
        __decorate([
            $mol_action
        ], $bog_theme_auto.prototype, "theme_set", null);
        $$.$bog_theme_auto = $bog_theme_auto;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/theme/auto/auto.view.css", ".bog_theme_switching,\n.bog_theme_switching * {\n\ttransition: background-color 300ms ease, color 300ms ease, border-color 300ms ease, fill 300ms ease !important;\n}\n\n@media (prefers-reduced-motion: reduce) {\n\t.bog_theme_switching,\n\t.bog_theme_switching * {\n\t\ttransition: none !important;\n\t}\n}\n");
})($ || ($ = {}));

;
	($.$mol_image) = class $mol_image extends ($.$mol_view) {
		uri(){
			return "";
		}
		title(){
			return "";
		}
		loading(){
			return "lazy";
		}
		decoding(){
			return "async";
		}
		cors(){
			return null;
		}
		natural_width(){
			return 0;
		}
		natural_height(){
			return 0;
		}
		load(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "img";
		}
		attr(){
			return {
				...(super.attr()), 
				"src": (this.uri()), 
				"title": (this.hint()), 
				"alt": (this.title()), 
				"loading": (this.loading()), 
				"decoding": (this.decoding()), 
				"crossOrigin": (this.cors()), 
				"width": (this.natural_width()), 
				"height": (this.natural_height())
			};
		}
		event(){
			return {"load": (next) => (this.load(next))};
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
	};
	($mol_mem(($.$mol_image.prototype), "load"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_image extends $.$mol_image {
            natural_width(next) {
                const dom = this.dom_node();
                if (dom.naturalWidth)
                    return dom.naturalWidth;
                const found = this.uri().match(/\bwidth=(\d+)/);
                return found ? Number(found[1]) : null;
            }
            natural_height(next) {
                const dom = this.dom_node();
                if (dom.naturalHeight)
                    return dom.naturalHeight;
                const found = this.uri().match(/\bheight=(\d+)/);
                return found ? Number(found[1]) : null;
            }
            load() {
                this.natural_width(null);
                this.natural_height(null);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_image.prototype, "natural_width", null);
        __decorate([
            $mol_mem
        ], $mol_image.prototype, "natural_height", null);
        $$.$mol_image = $mol_image;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/image/image.view.css", "[mol_image] {\n\tborder-radius: var(--mol_gap_round);\n\toverflow: hidden;\n\tflex: 0 1 auto;\n\tmax-width: 100%;\n\tobject-fit: cover;\n\theight: fit-content;\n}\n");
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
	($.$mol_link) = class $mol_link extends ($.$mol_view) {
		uri_toggle(){
			return "";
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
				"href": (this.uri_toggle()), 
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
	($.$mol_icon_magnify) = class $mol_icon_magnify extends ($.$mol_icon) {
		path(){
			return "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";
		}
	};


;
"use strict";


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
	($.$mol_icon_chevron) = class $mol_icon_chevron extends ($.$mol_icon) {
		path(){
			return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
		}
	};


;
"use strict";


;
	($.$mol_icon_chevron_down) = class $mol_icon_chevron_down extends ($.$mol_icon) {
		path(){
			return "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
		}
	};


;
"use strict";


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
	($.$mol_icon_hamburger) = class $mol_icon_hamburger extends ($.$mol_icon) {
		path(){
			return "M22 13C22 14.11 21.11 15 20 15H4C2.9 15 2 14.11 2 13S2.9 11 4 11H13L15.5 13L18 11H20C21.11 11 22 11.9 22 13M12 3C3 3 3 9 3 9H21C21 9 21 3 12 3M3 18C3 19.66 4.34 21 6 21H18C19.66 21 21 19.66 21 18V17H3V18Z";
		}
	};


;
"use strict";


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
	($.$mol_check_expand) = class $mol_check_expand extends ($.$mol_check) {
		level_style(){
			return "0px";
		}
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return false;
		}
		Icon(){
			const obj = new this.$.$mol_icon_chevron();
			return obj;
		}
		level(){
			return 0;
		}
		style(){
			return {...(super.style()), "paddingLeft": (this.level_style())};
		}
		checked(next){
			return (this.expanded(next));
		}
		enabled(){
			return (this.expandable());
		}
	};
	($mol_mem(($.$mol_check_expand.prototype), "expanded"));
	($mol_mem(($.$mol_check_expand.prototype), "Icon"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Expander for trees, lists, etc
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_expand_demo
         */
        class $mol_check_expand extends $.$mol_check_expand {
            level_style() {
                return `${this.level() * 1 - 1}rem`;
            }
            expandable() {
                return this.expanded() !== null;
            }
        }
        $$.$mol_check_expand = $mol_check_expand;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/expand/expand.view.css", "[mol_check_expand] {\n\tmin-width: 20px;\n}\n\n:where([mol_check_expand][disabled]) [mol_check_expand_icon] {\n\tvisibility: hidden;\n}\n\n[mol_check_expand_icon] {\n\tbox-shadow: none;\n\tmargin-left: -0.375rem;\n}\n[mol_check_expand_icon] {\n\ttransform: rotateZ(0deg);\n}\n\n:where([mol_check_checked]) [mol_check_expand_icon] {\n\ttransform: rotateZ(90deg);\n}\n\n[mol_check_expand_icon] {\n\tvertical-align: text-top;\n}\n\n[mol_check_expand_label] {\n\tmargin-left: 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_expander) = class $mol_expander extends ($.$mol_list) {
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return true;
		}
		label(){
			return [(this.title())];
		}
		Trigger(){
			const obj = new this.$.$mol_check_expand();
			(obj.checked) = (next) => ((this.expanded(next)));
			(obj.expandable) = () => ((this.expandable()));
			(obj.label) = () => ((this.label()));
			return obj;
		}
		Tools(){
			return null;
		}
		Label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Trigger()), (this.Tools())]);
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.content()));
			return obj;
		}
		rows(){
			return [(this.Label()), (this.Content())];
		}
	};
	($mol_mem(($.$mol_expander.prototype), "expanded"));
	($mol_mem(($.$mol_expander.prototype), "Trigger"));
	($mol_mem(($.$mol_expander.prototype), "Label"));
	($mol_mem(($.$mol_expander.prototype), "Content"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Component which expands any content on title click.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_expander_demo
         */
        class $mol_expander extends $.$mol_expander {
            rows() {
                return [
                    this.Label(),
                    ...this.expanded() ? [this.Content()] : []
                ];
            }
            expandable() {
                return this.content().length > 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_expander.prototype, "rows", null);
        $$.$mol_expander = $mol_expander;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/expander/expander.view.css", "[mol_expander] {\n\tflex-direction: column;\n}\n\n[mol_expander_label] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_expander_trigger] {\n\tflex: auto;\n\tposition: relative;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_translate) = class $mol_icon_translate extends ($.$mol_icon) {
		path(){
			return "M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_white_balance_sunny) = class $mol_icon_white_balance_sunny extends ($.$mol_icon) {
		path(){
			return "M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13";
		}
	};


;
"use strict";


;
	($.$mol_icon_monitor) = class $mol_icon_monitor extends ($.$mol_icon) {
		path(){
			return "M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_weather_night) = class $mol_icon_weather_night extends ($.$mol_icon) {
		path(){
			return "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z";
		}
	};


;
"use strict";


;
	($.$bog_theme_switch) = class $bog_theme_switch extends ($.$mol_view) {
		light_active(){
			return false;
		}
		light_hint(){
			return (this.$.$mol_locale.text("$bog_theme_switch_light_hint"));
		}
		set_light(next){
			if(next !== undefined) return next;
			return null;
		}
		Light_icon(){
			const obj = new this.$.$mol_icon_white_balance_sunny();
			return obj;
		}
		Light(){
			const obj = new this.$.$mol_button_minor();
			(obj.attr) = () => ({...(this.$.$mol_button_minor.prototype.attr.call(obj)), "bog_theme_switch_active": (this.light_active())});
			(obj.hint) = () => ((this.light_hint()));
			(obj.click) = (next) => ((this.set_light(next)));
			(obj.sub) = () => ([(this.Light_icon())]);
			return obj;
		}
		system_active(){
			return false;
		}
		system_hint(){
			return (this.$.$mol_locale.text("$bog_theme_switch_system_hint"));
		}
		set_system(next){
			if(next !== undefined) return next;
			return null;
		}
		System_icon(){
			const obj = new this.$.$mol_icon_monitor();
			return obj;
		}
		System(){
			const obj = new this.$.$mol_button_minor();
			(obj.attr) = () => ({...(this.$.$mol_button_minor.prototype.attr.call(obj)), "bog_theme_switch_active": (this.system_active())});
			(obj.hint) = () => ((this.system_hint()));
			(obj.click) = (next) => ((this.set_system(next)));
			(obj.sub) = () => ([(this.System_icon())]);
			return obj;
		}
		dark_active(){
			return false;
		}
		dark_hint(){
			return (this.$.$mol_locale.text("$bog_theme_switch_dark_hint"));
		}
		set_dark(next){
			if(next !== undefined) return next;
			return null;
		}
		Dark_icon(){
			const obj = new this.$.$mol_icon_weather_night();
			return obj;
		}
		Dark(){
			const obj = new this.$.$mol_button_minor();
			(obj.attr) = () => ({...(this.$.$mol_button_minor.prototype.attr.call(obj)), "bog_theme_switch_active": (this.dark_active())});
			(obj.hint) = () => ((this.dark_hint()));
			(obj.click) = (next) => ((this.set_dark(next)));
			(obj.sub) = () => ([(this.Dark_icon())]);
			return obj;
		}
		theme_auto(){
			const obj = new this.$.$bog_theme_auto();
			return obj;
		}
		sub(){
			return [
				(this.Light()), 
				(this.System()), 
				(this.Dark())
			];
		}
	};
	($mol_mem(($.$bog_theme_switch.prototype), "set_light"));
	($mol_mem(($.$bog_theme_switch.prototype), "Light_icon"));
	($mol_mem(($.$bog_theme_switch.prototype), "Light"));
	($mol_mem(($.$bog_theme_switch.prototype), "set_system"));
	($mol_mem(($.$bog_theme_switch.prototype), "System_icon"));
	($mol_mem(($.$bog_theme_switch.prototype), "System"));
	($mol_mem(($.$bog_theme_switch.prototype), "set_dark"));
	($mol_mem(($.$bog_theme_switch.prototype), "Dark_icon"));
	($mol_mem(($.$bog_theme_switch.prototype), "Dark"));
	($mol_mem(($.$bog_theme_switch.prototype), "theme_auto"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_theme_switch extends $.$bog_theme_switch {
            light_active() {
                return this.theme_auto().mode() === 'light';
            }
            system_active() {
                return this.theme_auto().mode() === 'system';
            }
            dark_active() {
                return this.theme_auto().mode() === 'dark';
            }
            set_light() {
                this.theme_auto().mode('light');
                return null;
            }
            set_system() {
                this.theme_auto().mode('system');
                return null;
            }
            set_dark() {
                this.theme_auto().mode('dark');
                return null;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_theme_switch.prototype, "light_active", null);
        __decorate([
            $mol_mem
        ], $bog_theme_switch.prototype, "system_active", null);
        __decorate([
            $mol_mem
        ], $bog_theme_switch.prototype, "dark_active", null);
        __decorate([
            $mol_action
        ], $bog_theme_switch.prototype, "set_light", null);
        __decorate([
            $mol_action
        ], $bog_theme_switch.prototype, "set_system", null);
        __decorate([
            $mol_action
        ], $bog_theme_switch.prototype, "set_dark", null);
        $$.$bog_theme_switch = $bog_theme_switch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_theme_switch, {
        display: 'flex',
        flex: { direction: 'row', shrink: 0 },
        gap: '2px',
        padding: { top: '3px', right: '3px', bottom: '3px', left: '3px' },
        background: { color: $mol_theme.field },
        border: {
            radius: '999px',
            width: '1px',
            style: 'solid',
            color: $mol_theme.line,
        },
        $mol_button_minor: {
            minWidth: '2rem',
            minHeight: '2rem',
            padding: { top: 0, right: '0.5rem', bottom: 0, left: '0.5rem' },
            border: { radius: '999px' },
            background: { color: 'transparent' },
            boxShadow: 'none',
            color: $mol_theme.shade,
            transition: 'background-color 200ms ease, color 200ms ease, box-shadow 200ms ease',
            ':hover': {
                background: { color: $mol_theme.hover },
                boxShadow: 'none',
                color: $mol_theme.text,
            },
            '[bog_theme_switch_active]': {
                true: {
                    background: { color: $mol_theme.back },
                    color: $mol_theme.text,
                    box: {
                        shadow: [
                            { x: 0, y: '1px', blur: '2px', spread: 0, color: '#0000001a' },
                            { x: 0, y: '1px', blur: '1px', spread: 0, color: '#0000000d' },
                            { inset: true, x: 0, y: 0, blur: 0, spread: '100vmax', color: '#00000022' },
                        ],
                    },
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$mol_icon_script) = class $mol_icon_script extends ($.$mol_icon) {
		path(){
			return "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2H8C6.3,2 5,3.3 5,5V16H16V17C16,17.6 16.4,18 17,18H18V5C18,4.4 18.4,4 19,4C19.6,4 20,4.4 20,5V6H22V5C22,3.3 20.7,2 19,2Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_script_text) = class $mol_icon_script_text extends ($.$mol_icon) {
		path(){
			return "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2C20.7,2 22,3.3 22,5V6H20V5C20,4.4 19.6,4 19,4C18.4,4 18,4.4 18,5V18H17C16.4,18 16,17.6 16,17V16H5V5C5,3.3 6.3,2 8,2H19M8,6V8H15V6H8M8,10V12H14V10H8Z";
		}
	};


;
"use strict";


;
	($.$mol_link_source) = class $mol_link_source extends ($.$mol_link) {
		Icon(){
			const obj = new this.$.$mol_icon_script_text();
			return obj;
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_link_source_hint"));
		}
		sub(){
			return [(this.Icon())];
		}
	};
	($mol_mem(($.$mol_link_source.prototype), "Icon"));


;
"use strict";


;
	($.$mol_icon_check) = class $mol_icon_check extends ($.$mol_icon) {
		path(){
			return "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";
		}
	};


;
"use strict";


;
	($.$bog_smalljs_top) = class $bog_smalljs_top extends ($.$mol_view) {
		Logo_image(){
			const obj = new this.$.$mol_image();
			(obj.uri) = () => ((this.logo_uri()));
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Logo_image_title")));
			return obj;
		}
		Logo_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_top_Logo_text"));
		}
		Logo(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"section": "", "page": ""});
			(obj.sub) = () => ([(this.Logo_image()), (this.Logo_text())]);
			return obj;
		}
		Search_icon(){
			const obj = new this.$.$mol_icon_magnify();
			return obj;
		}
		Search_label_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_top_Search_label_text"));
		}
		Search_label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Search_label_text())]);
			return obj;
		}
		Search_hint_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_top_Search_hint_text"));
		}
		Search_hint(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Search_hint_text())]);
			return obj;
		}
		Search(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.search_click(next)));
			(obj.sub) = () => ([
				(this.Search_icon()), 
				(this.Search_label()), 
				(this.Search_hint())
			]);
			return obj;
		}
		Docs_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_top_Docs_label"));
		}
		Docs_chevron(){
			const obj = new this.$.$mol_icon_chevron_down();
			return obj;
		}
		Docs_quickstart(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Docs_quickstart_title")));
			(obj.arg) = () => ({"section": "docs", "page": "getting-started"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Docs_guide(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Docs_guide_title")));
			(obj.arg) = () => ({"section": "docs", "page": "views"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Docs_tutorial(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Docs_tutorial_title")));
			(obj.arg) = () => ({"section": "course", "page": null});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Docs_examples(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Docs_examples_title")));
			(obj.arg) = () => ({"section": "docs", "page": "showcase"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Docs_api(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Docs_api_title")));
			(obj.arg) = () => ({"section": "docs", "page": "api-mol-string"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Docs_menu(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Docs_quickstart()), 
				(this.Docs_guide()), 
				(this.Docs_tutorial()), 
				(this.Docs_examples()), 
				(this.Docs_api())
			]);
			return obj;
		}
		Docs_pick(){
			const obj = new this.$.$mol_pick();
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Docs_pick_hint")));
			(obj.align) = () => ("bottom_left");
			(obj.trigger_content) = () => ([(this.Docs_label()), (this.Docs_chevron())]);
			(obj.bubble_content) = () => ([(this.Docs_menu())]);
			return obj;
		}
		Nav_playground(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Nav_playground_title")));
			(obj.arg) = () => ({"section": "playground", "page": ""});
			return obj;
		}
		Ecosystem_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_top_Ecosystem_label"));
		}
		Ecosystem_chevron(){
			const obj = new this.$.$mol_icon_chevron_down();
			return obj;
		}
		Eco_components(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Eco_components_title")));
			(obj.uri) = () => ("https://mol.hyoo.ru/");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Eco_libs_title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_top_Eco_libs_title_text"));
		}
		Eco_libs_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Eco_libs_title_text())]);
			return obj;
		}
		Eco_wire(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Eco_wire_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/wire");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Eco_fetch(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Eco_fetch_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/fetch");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Eco_compare(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Eco_compare_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/compare/deep");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Eco_router(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Eco_router_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/state/arg");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Eco_crowd(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Eco_crowd_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/crowd.hyoo.ru");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Eco_baza(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Eco_baza_title")));
			(obj.uri) = () => ("https://github.com/giper-dev/baza");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Ecosystem_menu(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Eco_components()), 
				(this.Eco_libs_title()), 
				(this.Eco_wire()), 
				(this.Eco_fetch()), 
				(this.Eco_compare()), 
				(this.Eco_router()), 
				(this.Eco_crowd()), 
				(this.Eco_baza())
			]);
			return obj;
		}
		Ecosystem_pick(){
			const obj = new this.$.$mol_pick();
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Ecosystem_pick_hint")));
			(obj.align) = () => ("bottom_left");
			(obj.trigger_content) = () => ([(this.Ecosystem_label()), (this.Ecosystem_chevron())]);
			(obj.bubble_content) = () => ([(this.Ecosystem_menu())]);
			return obj;
		}
		About_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_top_About_label"));
		}
		About_chevron(){
			const obj = new this.$.$mol_icon_chevron_down();
			return obj;
		}
		About_faq(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_About_faq_title")));
			(obj.arg) = () => ({"section": "docs", "page": "faq"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		About_team(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_About_team_title")));
			(obj.arg) = () => ({"section": "docs", "page": "team"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		About_releases(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_About_releases_title")));
			(obj.arg) = () => ({"section": "docs", "page": "releases"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		About_telegram(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_About_telegram_title")));
			(obj.uri) = () => ("https://t.me/giper_dev");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		About_menu(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.About_faq()), 
				(this.About_team()), 
				(this.About_releases()), 
				(this.About_telegram())
			]);
			return obj;
		}
		About_pick(){
			const obj = new this.$.$mol_pick();
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_About_pick_hint")));
			(obj.align) = () => ("bottom_left");
			(obj.trigger_content) = () => ([(this.About_label()), (this.About_chevron())]);
			(obj.bubble_content) = () => ([(this.About_menu())]);
			return obj;
		}
		Nav(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Docs_pick()), 
				(this.Nav_playground()), 
				(this.Ecosystem_pick()), 
				(this.About_pick())
			]);
			return obj;
		}
		Burger_icon(){
			const obj = new this.$.$mol_icon_hamburger();
			return obj;
		}
		Mobile_playground(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Mobile_playground_title")));
			(obj.arg) = () => ({"section": "playground", "page": ""});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_docs_quickstart(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_docs_quickstart_title")));
			(obj.arg) = () => ({"section": "docs", "page": "getting-started"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_docs_guide(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_docs_guide_title")));
			(obj.arg) = () => ({"section": "docs", "page": "views"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_docs_tutorial(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_docs_tutorial_title")));
			(obj.arg) = () => ({"section": "course", "page": null});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_docs_examples(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_docs_examples_title")));
			(obj.arg) = () => ({"section": "docs", "page": "showcase"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_docs_api(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_docs_api_title")));
			(obj.arg) = () => ({"section": "docs", "page": "api-mol-string"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Docs_group(){
			const obj = new this.$.$mol_expander();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Docs_group_title")));
			(obj.content) = () => ([
				(this.M_docs_quickstart()), 
				(this.M_docs_guide()), 
				(this.M_docs_tutorial()), 
				(this.M_docs_examples()), 
				(this.M_docs_api())
			]);
			return obj;
		}
		M_eco_components(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_eco_components_title")));
			(obj.uri) = () => ("https://mol.hyoo.ru/");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_eco_libs_title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_top_M_eco_libs_title_text"));
		}
		M_eco_libs_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.M_eco_libs_title_text())]);
			return obj;
		}
		M_eco_wire(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_eco_wire_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/wire");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_eco_fetch(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_eco_fetch_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/fetch");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_eco_compare(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_eco_compare_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/compare/deep");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_eco_router(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_eco_router_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/state/arg");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_eco_crowd(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_eco_crowd_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/crowd.hyoo.ru");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_eco_baza(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_eco_baza_title")));
			(obj.uri) = () => ("https://github.com/giper-dev/baza");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		Ecosystem_group(){
			const obj = new this.$.$mol_expander();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Ecosystem_group_title")));
			(obj.content) = () => ([
				(this.M_eco_components()), 
				(this.M_eco_libs_title()), 
				(this.M_eco_wire()), 
				(this.M_eco_fetch()), 
				(this.M_eco_compare()), 
				(this.M_eco_router()), 
				(this.M_eco_crowd()), 
				(this.M_eco_baza())
			]);
			return obj;
		}
		M_about_faq(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_about_faq_title")));
			(obj.arg) = () => ({"section": "docs", "page": "faq"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_about_team(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_about_team_title")));
			(obj.arg) = () => ({"section": "docs", "page": "team"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_about_releases(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_about_releases_title")));
			(obj.arg) = () => ({"section": "docs", "page": "releases"});
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		M_about_telegram(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_M_about_telegram_title")));
			(obj.uri) = () => ("https://t.me/giper_dev");
			(obj.event_click) = (next) => ((this.nav_pick(next)));
			return obj;
		}
		About_group(){
			const obj = new this.$.$mol_expander();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_About_group_title")));
			(obj.content) = () => ([
				(this.M_about_faq()), 
				(this.M_about_team()), 
				(this.M_about_releases()), 
				(this.M_about_telegram())
			]);
			return obj;
		}
		Mobile_menu(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Mobile_playground()), 
				(this.Docs_group()), 
				(this.Ecosystem_group()), 
				(this.About_group())
			]);
			return obj;
		}
		Burger(){
			const obj = new this.$.$mol_pick();
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Burger_hint")));
			(obj.align) = () => ("bottom_right");
			(obj.trigger_content) = () => ([(this.Burger_icon())]);
			(obj.bubble_content) = () => ([(this.Mobile_menu())]);
			return obj;
		}
		Lang_icon(){
			const obj = new this.$.$mol_icon_translate();
			return obj;
		}
		lang_label(){
			return "EN";
		}
		Lang_chevron(){
			const obj = new this.$.$mol_icon_chevron_down();
			return obj;
		}
		lang_options(){
			return [];
		}
		Lang_menu(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.lang_options()));
			return obj;
		}
		Lang_pick(){
			const obj = new this.$.$mol_pick();
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_smalljs_top_Lang_pick_hint")));
			(obj.align) = () => ("bottom_right");
			(obj.trigger_content) = () => ([
				(this.Lang_icon()), 
				(this.lang_label()), 
				(this.Lang_chevron())
			]);
			(obj.bubble_content) = () => ([(this.Lang_menu())]);
			return obj;
		}
		Theme_toggle(){
			const obj = new this.$.$bog_theme_switch();
			(obj.theme_auto) = () => ((this.Theme()));
			return obj;
		}
		Github(){
			const obj = new this.$.$mol_link_source();
			(obj.uri) = () => ((this.github_uri()));
			return obj;
		}
		lang_option_label(id){
			return "";
		}
		Lang_option_check(id){
			const obj = new this.$.$mol_icon_check();
			return obj;
		}
		Theme(){
			return null;
		}
		github_uri(){
			return "https://github.com/hyoo-ru/mam_mol";
		}
		logo_uri(){
			return "bog/smalljs/assets/logo.svg";
		}
		search_click(next){
			if(next !== undefined) return next;
			return null;
		}
		nav_pick(next){
			if(next !== undefined) return next;
			return null;
		}
		sub(){
			return [
				(this.Logo()), 
				(this.Search()), 
				(this.Nav()), 
				(this.Burger()), 
				(this.Lang_pick()), 
				(this.Theme_toggle()), 
				(this.Github())
			];
		}
		Lang_option(id){
			const obj = new this.$.$mol_button_minor();
			(obj.sub) = () => ([(this.lang_option_label(id)), (this.Lang_option_check(id))]);
			return obj;
		}
	};
	($mol_mem(($.$bog_smalljs_top.prototype), "Logo_image"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Logo"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Search_icon"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Search_label"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Search_hint"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Search"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Docs_chevron"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Docs_quickstart"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Docs_guide"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Docs_tutorial"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Docs_examples"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Docs_api"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Docs_menu"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Docs_pick"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Nav_playground"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Ecosystem_chevron"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Eco_components"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Eco_libs_title"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Eco_wire"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Eco_fetch"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Eco_compare"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Eco_router"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Eco_crowd"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Eco_baza"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Ecosystem_menu"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Ecosystem_pick"));
	($mol_mem(($.$bog_smalljs_top.prototype), "About_chevron"));
	($mol_mem(($.$bog_smalljs_top.prototype), "About_faq"));
	($mol_mem(($.$bog_smalljs_top.prototype), "About_team"));
	($mol_mem(($.$bog_smalljs_top.prototype), "About_releases"));
	($mol_mem(($.$bog_smalljs_top.prototype), "About_telegram"));
	($mol_mem(($.$bog_smalljs_top.prototype), "About_menu"));
	($mol_mem(($.$bog_smalljs_top.prototype), "About_pick"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Nav"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Burger_icon"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Mobile_playground"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_docs_quickstart"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_docs_guide"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_docs_tutorial"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_docs_examples"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_docs_api"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Docs_group"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_eco_components"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_eco_libs_title"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_eco_wire"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_eco_fetch"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_eco_compare"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_eco_router"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_eco_crowd"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_eco_baza"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Ecosystem_group"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_about_faq"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_about_team"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_about_releases"));
	($mol_mem(($.$bog_smalljs_top.prototype), "M_about_telegram"));
	($mol_mem(($.$bog_smalljs_top.prototype), "About_group"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Mobile_menu"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Burger"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Lang_icon"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Lang_chevron"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Lang_menu"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Lang_pick"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Theme_toggle"));
	($mol_mem(($.$bog_smalljs_top.prototype), "Github"));
	($mol_mem_key(($.$bog_smalljs_top.prototype), "Lang_option_check"));
	($mol_mem(($.$bog_smalljs_top.prototype), "search_click"));
	($mol_mem(($.$bog_smalljs_top.prototype), "nav_pick"));
	($mol_mem_key(($.$bog_smalljs_top.prototype), "Lang_option"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_smalljs_top extends $.$bog_smalljs_top {
            nav_pick() {
                this.Docs_pick().showed(false);
                this.Ecosystem_pick().showed(false);
                this.About_pick().showed(false);
                this.Burger().showed(false);
            }
            // --- Language dropdown -------------------------------------------------
            // Reuses the framework-native $mol_locale: lang() reads/writes the current
            // locale, persisted in localStorage. Every localized `@ \…` string and the
            // docs content recompute reactively because they read $mol_locale.lang().
            //
            // The list is data-driven — add a language by adding one row here.
            langs() {
                return [
                    { code: 'en', label: 'English' },
                    { code: 'ru', label: 'Русский' },
                ];
            }
            lang(next) {
                return this.$.$mol_locale.lang(next);
            }
            lang_label() {
                return this.lang().toUpperCase();
            }
            lang_options() {
                return this.langs().map(item => this.Lang_option(item.code));
            }
            lang_option_label(code) {
                return this.langs().find(item => item.code === code)?.label ?? code;
            }
            /** Wire each option's click to its own language (keyed handler by closure). */
            Lang_option(code) {
                const option = super.Lang_option(code);
                option.click = () => this.lang_select(code);
                return option;
            }
            /** Show the check only next to the active language. */
            Lang_option_check(code) {
                if (this.lang() !== code)
                    return null;
                return super.Lang_option_check(code);
            }
            lang_select(code) {
                this.lang(code);
                this.Lang_pick().showed(false);
                return null;
            }
        }
        __decorate([
            $mol_action
        ], $bog_smalljs_top.prototype, "nav_pick", null);
        __decorate([
            $mol_mem_key
        ], $bog_smalljs_top.prototype, "Lang_option", null);
        __decorate([
            $mol_mem_key
        ], $bog_smalljs_top.prototype, "Lang_option_check", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_top.prototype, "lang_select", null);
        $$.$bog_smalljs_top = $bog_smalljs_top;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    // vertical link list used inside every dropdown bubble
    const menu_panel = {
        flex: { direction: 'column' },
        gap: rem(0.125),
        padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.5), right: rem(0.5) },
        minWidth: rem(11),
        background: { color: $bog_builderui_tokens.card },
        border: { radius: rem(0.5) },
        $mol_link: {
            flex: { direction: 'row' },
            justify: { content: 'flex-start' },
            padding: { top: rem(0.375), bottom: rem(0.375), left: rem(0.625), right: rem(0.625) },
            border: { radius: rem(0.375) },
            color: $bog_builderui_tokens.text,
            font: { size: rem(0.875), weight: 500 },
            ':hover': {
                background: { color: $bog_builderui_tokens.hover },
                color: $bog_builderui_tokens.special,
            },
        },
    };
    $mol_style_define($bog_smalljs_top, {
        flex: { direction: 'row' },
        align: { items: 'center' },
        gap: $mol_gap.text,
        padding: { left: $mol_gap.block, right: $mol_gap.block, top: $mol_gap.text, bottom: $mol_gap.text },
        height: rem(4),
        border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
        position: 'sticky',
        top: 0,
        background: { color: $bog_builderui_tokens.back },
        zIndex: 100,
        Logo: {
            align: { items: 'center' },
            gap: $mol_gap.text,
            flex: { shrink: 0 },
            font: { weight: 600 },
        },
        Logo_image: {
            width: rem(1.75),
            height: rem(1.75),
            minWidth: rem(1.75),
            minHeight: rem(1.75),
        },
        Search: {
            flex: { direction: 'row', grow: 0, basis: rem(10), shrink: 0 },
            justify: { content: 'flex-start' },
            align: { items: 'center' },
            gap: $mol_gap.text,
            padding: { left: rem(0.625), right: rem(0.5), top: rem(0.3), bottom: rem(0.3) },
            background: { color: $bog_builderui_tokens.field },
            border: { radius: rem(0.5) },
            color: $bog_builderui_tokens.shade,
            font: { size: rem(0.875) },
        },
        Search_icon: {
            width: rem(1),
            height: rem(1),
        },
        Search_label: {
            flex: { grow: 1 },
        },
        Search_hint: {
            padding: { left: rem(0.375), right: rem(0.375), top: rem(0.05), bottom: rem(0.05) },
            border: { radius: rem(0.25), width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            font: { size: rem(0.75) },
            color: $bog_builderui_tokens.shade,
        },
        Nav: {
            flex: { direction: 'row', grow: 1, wrap: 'nowrap' },
            align: { items: 'center' },
            justify: { content: 'center' },
            gap: 0,
            minWidth: 0,
            font: { size: rem(0.8125), weight: 500 },
            // dropdown triggers (each $mol_pick renders a $mol_check anchor)
            $mol_check: {
                gap: rem(0.125),
                font: { size: rem(0.8125), weight: 500 },
            },
        },
        Docs_chevron: { width: rem(0.875), height: rem(0.875) },
        Ecosystem_chevron: { width: rem(0.875), height: rem(0.875) },
        About_chevron: { width: rem(0.875), height: rem(0.875) },
        Docs_menu: menu_panel,
        Ecosystem_menu: menu_panel,
        About_menu: menu_panel,
        Eco_libs_title: {
            padding: { top: rem(0.5), bottom: rem(0.25), left: rem(0.625), right: rem(0.625) },
            font: { size: rem(0.6875), weight: 600 },
            color: $bog_builderui_tokens.shade,
            textTransform: 'uppercase',
            letterSpacing: rem(0.03),
        },
        // hamburger trigger — hidden on desktop, shown on narrow screens
        Burger: {
            display: 'none',
            flex: { shrink: 0 },
        },
        Burger_icon: {
            width: rem(1.375),
            height: rem(1.375),
        },
        Mobile_menu: {
            flex: { direction: 'column' },
            gap: rem(0.25),
            padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.5), right: rem(0.5) },
            minWidth: rem(16),
            maxWidth: '92vw',
            maxHeight: '80vh',
            overflow: { y: 'auto' },
            background: { color: $bog_builderui_tokens.card },
            border: { radius: rem(0.5) },
            $mol_check_expand: {
                padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.625), right: rem(0.625) },
                border: { radius: rem(0.375) },
                font: { size: rem(0.9375), weight: 600 },
                color: $bog_builderui_tokens.text,
            },
            $mol_link: {
                flex: { direction: 'row' },
                justify: { content: 'flex-start' },
                padding: { top: rem(0.375), bottom: rem(0.375), left: rem(1.25), right: rem(0.625) },
                border: { radius: rem(0.375) },
                color: $bog_builderui_tokens.shade,
                font: { size: rem(0.875), weight: 500 },
                ':hover': {
                    background: { color: $bog_builderui_tokens.hover },
                    color: $bog_builderui_tokens.special,
                },
            },
        },
        Mobile_playground: {
            padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.625), right: rem(0.625) },
            border: { radius: rem(0.375) },
            font: { size: rem(0.9375), weight: 600 },
            color: $bog_builderui_tokens.text,
        },
        M_eco_libs_title: {
            padding: { top: rem(0.5), bottom: rem(0.25), left: rem(1.25), right: rem(0.625) },
            font: { size: rem(0.6875), weight: 600 },
            color: $bog_builderui_tokens.shade,
            textTransform: 'uppercase',
            letterSpacing: rem(0.03),
        },
        Lang_pick: {
            flex: { shrink: 0 },
            // the pick's trigger is a $mol_check anchor
            $mol_check: {
                flex: { direction: 'row' },
                align: { items: 'center' },
                gap: rem(0.25),
                padding: { left: rem(0.5), right: rem(0.5), top: rem(0.4), bottom: rem(0.4) },
                border: { radius: rem(0.375) },
                font: { size: rem(0.8125), weight: 500 },
            },
        },
        Lang_icon: {
            width: rem(1.125),
            height: rem(1.125),
        },
        Lang_chevron: { width: rem(0.875), height: rem(0.875) },
        Lang_menu: {
            flex: { direction: 'column' },
            gap: rem(0.125),
            padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.5), right: rem(0.5) },
            minWidth: rem(9),
            background: { color: $bog_builderui_tokens.card },
            border: { radius: rem(0.5) },
        },
        Lang_option: {
            flex: { direction: 'row', grow: 1 },
            justify: { content: 'flex-start' },
            align: { items: 'center' },
            gap: rem(0.75),
            padding: { top: rem(0.375), bottom: rem(0.375), left: rem(0.625), right: rem(0.625) },
            border: { radius: rem(0.375) },
            color: $bog_builderui_tokens.text,
            font: { size: rem(0.875), weight: 500 },
            ':hover': {
                background: { color: $bog_builderui_tokens.hover },
                color: $bog_builderui_tokens.special,
            },
        },
        Lang_option_check: {
            width: rem(1),
            height: rem(1),
            flex: { shrink: 0 },
            color: $bog_builderui_tokens.special,
        },
        Github: {
            flex: { shrink: 0 },
        },
        '@media': {
            '(max-width: 47.9375rem)': {
                Search: { display: 'none' },
                Nav: { display: 'none' },
                Burger: { display: 'inline-flex' },
                padding: { left: rem(0.75), right: rem(0.75), top: $mol_gap.text, bottom: $mol_gap.text },
            },
        },
    });
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
	($.$bog_smalljs_search) = class $bog_smalljs_search extends ($.$mol_view) {
		Escape(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({"escape": (next) => (this.close(next))});
			return obj;
		}
		Nav_down(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({"down": (next) => (this.select_next(next))});
			return obj;
		}
		Nav_up(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({"up": (next) => (this.select_prev(next))});
			return obj;
		}
		Backdrop(){
			const obj = new this.$.$mol_view();
			(obj.event) = () => ({"click": (next) => (this.close(next))});
			return obj;
		}
		Field(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.query(next)));
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_smalljs_search_Field_hint")));
			(obj.submit) = (next) => ((this.activate(next)));
			return obj;
		}
		Hint(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.hint_text())]);
			return obj;
		}
		result_rows(){
			return [];
		}
		Results(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.result_rows()));
			return obj;
		}
		Panel(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Field()), 
				(this.Hint()), 
				(this.Results())
			]);
			return obj;
		}
		result_arg(id){
			return {};
		}
		result_current(id){
			return false;
		}
		result_title(id){
			return "";
		}
		Result_title(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.result_title(id))]);
			return obj;
		}
		result_snippet(id){
			return "";
		}
		Result_snippet(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.result_snippet(id))]);
			return obj;
		}
		open(next){
			if(next !== undefined) return next;
			return false;
		}
		query(next){
			if(next !== undefined) return next;
			return "";
		}
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		focus(next){
			if(next !== undefined) return next;
			return null;
		}
		activate(next){
			if(next !== undefined) return next;
			return null;
		}
		select_next(next){
			if(next !== undefined) return next;
			return null;
		}
		select_prev(next){
			if(next !== undefined) return next;
			return null;
		}
		pick(id, next){
			if(next !== undefined) return next;
			return null;
		}
		attr(){
			return {"bog_smalljs_search_open": (this.open())};
		}
		plugins(){
			return [
				(this.Escape()), 
				(this.Nav_down()), 
				(this.Nav_up())
			];
		}
		sub(){
			return [(this.Backdrop()), (this.Panel())];
		}
		Result(id){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.result_arg(id)));
			(obj.event_click) = (next) => ((this.pick(id, next)));
			(obj.attr) = () => ({...(this.$.$mol_link.prototype.attr.call(obj)), "bog_smalljs_search_current": (this.result_current(id))});
			(obj.sub) = () => ([(this.Result_title(id)), (this.Result_snippet(id))]);
			return obj;
		}
	};
	($mol_mem(($.$bog_smalljs_search.prototype), "Escape"));
	($mol_mem(($.$bog_smalljs_search.prototype), "Nav_down"));
	($mol_mem(($.$bog_smalljs_search.prototype), "Nav_up"));
	($mol_mem(($.$bog_smalljs_search.prototype), "Backdrop"));
	($mol_mem(($.$bog_smalljs_search.prototype), "Field"));
	($mol_mem(($.$bog_smalljs_search.prototype), "Hint"));
	($mol_mem(($.$bog_smalljs_search.prototype), "Results"));
	($mol_mem(($.$bog_smalljs_search.prototype), "Panel"));
	($mol_mem_key(($.$bog_smalljs_search.prototype), "Result_title"));
	($mol_mem_key(($.$bog_smalljs_search.prototype), "Result_snippet"));
	($mol_mem(($.$bog_smalljs_search.prototype), "open"));
	($mol_mem(($.$bog_smalljs_search.prototype), "query"));
	($mol_mem(($.$bog_smalljs_search.prototype), "close"));
	($mol_mem(($.$bog_smalljs_search.prototype), "focus"));
	($mol_mem(($.$bog_smalljs_search.prototype), "activate"));
	($mol_mem(($.$bog_smalljs_search.prototype), "select_next"));
	($mol_mem(($.$bog_smalljs_search.prototype), "select_prev"));
	($mol_mem_key(($.$bog_smalljs_search.prototype), "pick"));
	($mol_mem_key(($.$bog_smalljs_search.prototype), "Result"));


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
	($.$mol_icon_chevron_left) = class $mol_icon_chevron_left extends ($.$mol_icon) {
		path(){
			return "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_chevron_right) = class $mol_icon_chevron_right extends ($.$mol_icon) {
		path(){
			return "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
		}
	};


;
"use strict";


;
	($.$mol_number) = class $mol_number extends ($.$mol_view) {
		precision(){
			return 1;
		}
		event_dec(next){
			if(next !== undefined) return next;
			return null;
		}
		event_inc(next){
			if(next !== undefined) return next;
			return null;
		}
		event_dec_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		event_inc_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({
				"down": (next) => (this.event_dec(next)), 
				"up": (next) => (this.event_inc(next)), 
				"pageDown": (next) => (this.event_dec_boost(next)), 
				"pageUp": (next) => (this.event_inc_boost(next))
			});
			return obj;
		}
		dec_enabled(){
			return (this.enabled());
		}
		dec_icon(){
			const obj = new this.$.$mol_icon_chevron_left();
			return obj;
		}
		Dec(){
			const obj = new this.$.$mol_button_minor();
			(obj.event_click) = (next) => ((this.event_dec(next)));
			(obj.enabled) = () => ((this.dec_enabled()));
			(obj.sub) = () => ([(this.dec_icon())]);
			return obj;
		}
		type(){
			return "text";
		}
		value_string(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		string_enabled(){
			return (this.enabled());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		String(){
			const obj = new this.$.$mol_string();
			(obj.type) = () => ((this.type()));
			(obj.keyboard) = () => ("decimal");
			(obj.value) = (next) => ((this.value_string(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.string_enabled()));
			(obj.submit) = (next) => ((this.submit(next)));
			return obj;
		}
		inc_enabled(){
			return (this.enabled());
		}
		inc_icon(){
			const obj = new this.$.$mol_icon_chevron_right();
			return obj;
		}
		Inc(){
			const obj = new this.$.$mol_button_minor();
			(obj.event_click) = (next) => ((this.event_inc(next)));
			(obj.enabled) = () => ((this.inc_enabled()));
			(obj.sub) = () => ([(this.inc_icon())]);
			return obj;
		}
		precision_view(){
			return (this.precision());
		}
		precision_change(){
			return (this.precision());
		}
		boost(){
			return 10;
		}
		value_min(){
			return -Infinity;
		}
		value_max(){
			return +Infinity;
		}
		value(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		enabled(){
			return true;
		}
		plugins(){
			return [(this.Hotkey())];
		}
		sub(){
			return [
				(this.Dec()), 
				(this.String()), 
				(this.Inc())
			];
		}
	};
	($mol_mem(($.$mol_number.prototype), "event_dec"));
	($mol_mem(($.$mol_number.prototype), "event_inc"));
	($mol_mem(($.$mol_number.prototype), "event_dec_boost"));
	($mol_mem(($.$mol_number.prototype), "event_inc_boost"));
	($mol_mem(($.$mol_number.prototype), "Hotkey"));
	($mol_mem(($.$mol_number.prototype), "dec_icon"));
	($mol_mem(($.$mol_number.prototype), "Dec"));
	($mol_mem(($.$mol_number.prototype), "value_string"));
	($mol_mem(($.$mol_number.prototype), "submit"));
	($mol_mem(($.$mol_number.prototype), "String"));
	($mol_mem(($.$mol_number.prototype), "inc_icon"));
	($mol_mem(($.$mol_number.prototype), "Inc"));
	($mol_mem(($.$mol_number.prototype), "value"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/number/number.css", "[mol_number] {\n\tdisplay: flex;\n\tflex: 0 1 auto;\n\tposition: relative;\n\talign-items: stretch;\n\tmax-width: 100%;\n}\n\n[mol_number_string] {\n\tappearance: textfield;\n\tflex: 1 1 7rem;\n\twidth: 7rem;\n}\n\n[mol_number_string]::-webkit-inner-spin-button {\n\tdisplay: none;\n}\n");
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
         * Component for entering, incrementing and decrementing numeric values.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_number_demo
         */
        class $mol_number extends $.$mol_number {
            value_limited(val) {
                if (Number.isNaN(val))
                    return this.value(val);
                if (val === undefined)
                    return this.value();
                const min = this.value_min();
                const max = this.value_max();
                if (val < min)
                    return this.value(min);
                if (val > max)
                    return this.value(max);
                return this.value(val);
            }
            event_dec(next) {
                this.value_limited((this.value_limited() || 0) - this.precision_change());
                next?.preventDefault();
            }
            event_inc(next) {
                this.value_limited((this.value_limited() || 0) + this.precision_change());
                next?.preventDefault();
            }
            event_dec_boost(next) {
                this.value_limited((this.value_limited() || 0) - this.precision_change() * this.boost());
                next?.preventDefault();
            }
            event_inc_boost(next) {
                this.value_limited((this.value_limited() || 0) + this.precision_change() * this.boost());
                next?.preventDefault();
            }
            round(val) {
                if (Number.isNaN(val))
                    return '';
                if (val === 0)
                    return '0';
                if (!val)
                    return '';
                const precision_view = this.precision_view();
                if (!precision_view)
                    return val.toFixed();
                if (precision_view >= 1) {
                    return (val / precision_view).toFixed();
                }
                else {
                    const fixed_number = Math.log10(1 / precision_view);
                    return val.toFixed(Math.ceil(fixed_number));
                }
            }
            value_string(next) {
                // Вытягиваем value
                // Если кто-то поменяет из вне value, value_string надо обновить
                const current = this.round(this.value_limited());
                if (next === undefined)
                    return current;
                const precision = this.precision_view();
                // Точку в конце поставить нельзя, если precision_view целое число > 0
                if (precision - Math.floor(precision) === 0)
                    next = next.replace(/[.,]/g, '');
                // Запятые меняем на точки, удаляем не-цифры и не-точки и лишние ноли в начале целой части.
                // Минус получится ввести только в начале.
                next = (this.value_min() < 0 && next.startsWith('-') ? '-' : '')
                    + next.replace(/,/g, '.').replace(/[^\d\.]/g, '').replace(/^0{2,}/, '0');
                let dot_pos = next.indexOf('.');
                if (dot_pos !== -1) {
                    const prev = $mol_wire_probe(() => this.value_string()) ?? '';
                    const dot_pos_prev = prev.indexOf('.');
                    // Определяем где относительно предыдущей точки юзер поставил новую
                    if (dot_pos_prev === dot_pos)
                        dot_pos = next.lastIndexOf('.');
                    // Из частей до и после новой точки старую точку удаляем
                    const frac = next.slice(dot_pos + 1).replace(/\./g, '');
                    // Если точка идет первой, перед ней пишем 0, что бы форматирование выглядело нормально в mask
                    next = (next.slice(0, dot_pos) || '0').replace(/\./g, '') + '.' + frac;
                }
                // Оставляем старое значение в value есть сочетание, приводящие к NaN, например -.
                if (Number.isNaN(Number(next)))
                    return next;
                if (next.endsWith('.'))
                    return next;
                if (next.endsWith('-'))
                    return next;
                // Если пустая строка - сетим NaN
                // Применяем округления.
                this.value_limited(Number(next || Number.NaN));
                // Возвращаем все-равно не нормализованное значение
                // Иначе нельзя ввести будет 10, если min/max 5..10
                return next;
            }
            dec_enabled() {
                return this.enabled() && (!((this.value() || 0) <= this.value_min()));
            }
            inc_enabled() {
                return this.enabled() && (!((this.value() || 0) >= this.value_max()));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "value_string", null);
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "dec_enabled", null);
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "inc_enabled", null);
        $$.$mol_number = $mol_number;
    })($$ = $.$$ || ($.$$ = {}));
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
	($.$mol_stack) = class $mol_stack extends ($.$mol_view) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/stack/stack.view.css", "[mol_stack] {\n\tdisplay: grid;\n\t/* width: max-content; */\n\t/* height: max-content; */\n\talign-items: flex-start;\n\tjustify-items: flex-start;\n}\n\n[mol_stack] > * {\n\tgrid-area: 1/1;\n}\n");
})($ || ($ = {}));

;
"use strict";


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
	($.$mol_text_code_token) = class $mol_text_code_token extends ($.$mol_dimmer) {
		type(){
			return "";
		}
		attr(){
			return {...(super.attr()), "mol_text_code_token_type": (this.type())};
		}
	};
	($.$mol_text_code_token_link) = class $mol_text_code_token_link extends ($.$mol_text_code_token) {
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		type(){
			return "code-link";
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri()), 
				"target": "_blank"
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
        const { hsla } = $mol_style_func;
        $mol_style_define($mol_text_code_token, {
            display: 'inline',
            textDecoration: 'none',
            '@': {
                mol_text_code_token_type: {
                    'code-keyword': {
                        color: hsla(0, 70, 60, 1),
                    },
                    'code-field': {
                        color: hsla(300, 70, 50, 1),
                    },
                    'code-tag': {
                        color: hsla(330, 70, 50, 1),
                    },
                    'code-global': {
                        color: hsla(30, 80, 50, 1),
                    },
                    'code-decorator': {
                        color: hsla(180, 40, 50, 1),
                    },
                    'code-punctuation': {
                        color: hsla(0, 0, 50, 1),
                    },
                    'code-string': {
                        color: hsla(90, 40, 50, 1),
                    },
                    'code-number': {
                        color: hsla(55, 65, 45, 1),
                    },
                    'code-call': {
                        color: hsla(270, 60, 50, 1),
                    },
                    'code-link': {
                        color: hsla(210, 60, 50, 1),
                    },
                    'code-comment-inline': {
                        opacity: .5,
                    },
                    'code-comment-block': {
                        opacity: .5,
                    },
                    'code-docs': {
                        opacity: .75,
                    },
                },
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text_code_line) = class $mol_text_code_line extends ($.$mol_paragraph) {
		numb(){
			return 0;
		}
		token_type(id){
			return "";
		}
		token_text(id){
			return "";
		}
		highlight(){
			return "";
		}
		token_uri(id){
			return "";
		}
		text(){
			return "";
		}
		minimal_height(){
			return 24;
		}
		numb_showed(){
			return true;
		}
		syntax(){
			return null;
		}
		uri_resolve(id){
			return "";
		}
		Numb(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.numb())]);
			return obj;
		}
		Token(id){
			const obj = new this.$.$mol_text_code_token();
			(obj.type) = () => ((this.token_type(id)));
			(obj.haystack) = () => ((this.token_text(id)));
			(obj.needle) = () => ((this.highlight()));
			return obj;
		}
		Token_link(id){
			const obj = new this.$.$mol_text_code_token_link();
			(obj.haystack) = () => ((this.token_text(id)));
			(obj.needle) = () => ((this.highlight()));
			(obj.uri) = () => ((this.token_uri(id)));
			return obj;
		}
		find_pos(id){
			return null;
		}
	};
	($mol_mem(($.$mol_text_code_line.prototype), "Numb"));
	($mol_mem_key(($.$mol_text_code_line.prototype), "Token"));
	($mol_mem_key(($.$mol_text_code_line.prototype), "Token_link"));


;
"use strict";
var $;
(function ($) {
    /** Creates lexer by dictionary of lexems. Lexem that started first wins. Then lexem that declared earlier wins. Use regexp capture to take parts of token. */
    class $mol_syntax2 {
        lexems;
        constructor(lexems) {
            this.lexems = lexems;
            for (let name in lexems) {
                this.rules.push({
                    name: name,
                    regExp: lexems[name],
                    size: RegExp('^$|' + lexems[name].source).exec('').length - 1,
                });
            }
            const parts = '(' + this.rules.map(rule => rule.regExp.source).join(')|(') + ')';
            this.regexp = RegExp(`([\\s\\S]*?)(?:(${parts})|$(?![^]))`, 'gmu');
        }
        rules = [];
        regexp;
        tokenize(text, handle) {
            let end = 0;
            lexing: while (end < text.length) {
                const start = end;
                this.regexp.lastIndex = start;
                var found = this.regexp.exec(text);
                end = this.regexp.lastIndex;
                if (start === end)
                    throw new Error('Empty token');
                var prefix = found[1];
                if (prefix)
                    handle('', prefix, [prefix], start);
                var suffix = found[2];
                if (!suffix)
                    continue;
                let offset = 4;
                for (let rule of this.rules) {
                    if (found[offset - 1]) {
                        handle(rule.name, suffix, found.slice(offset, offset + rule.size), start + prefix.length);
                        continue lexing;
                    }
                    offset += rule.size + 1;
                }
                $mol_fail(new Error('$mol_syntax2 is broken'));
            }
        }
        parse(text, handlers) {
            this.tokenize(text, (name, ...args) => handlers[name](...args));
        }
    }
    $.$mol_syntax2 = $mol_syntax2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_syntax2_md_flow = new $mol_syntax2({
        'quote': /^((?:(?:[>"] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'spoiler': /^((?:(?:[\?] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'header': /^([#=]+)(\s+)(.*?)$([\n\r]*)/,
        'list': /^((?:(?: ?([*+-])|(?:\d+[\.\)])+) +(?:[^]*?)$(?:\r?\n?)(?:  (?:[^]*?)$(?:\r?\n?))*)+)((?:\r?\n)*)/,
        'code': /^(```)([\w.-]*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'code-indent': /^((?:(?: |\t)(?:[^]*?)$\r?\n?)+)([\n\r]*)/,
        'table': /((?:^\|.+?$\r?\n?)+)([\n\r]*)/,
        'grid': /((?:^ *! .*?$\r?\n?)+)([\n\r]*)/,
        'cut': /^--+$((?:\r?\n)*)/,
        'block': /^(.*?)$((?:\r?\n)*)/,
    });
    $.$mol_syntax2_md_line = new $mol_syntax2({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(?!\s)(.+?)\*|\/\/(?!\s)(.+?)\/\//,
        'code': /```(.+?)```|;;(.+?);;|`(.+?)`/,
        'insert': /\+\+(.+?)\+\+/,
        'delete': /~~(.+?)~~|--(.+?)--/,
        // 'remark' : /(\()(.+?)(\))/ ,
        // 'quote' : /(")(.+?)(")/ ,
        'embed': /""(?:(.*?)\\)?(.*?)""/,
        'link': /\\\\(?:(.*?)\\)?(.*?)\\\\/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
        'text-link': /\[(.*?(?:\[[^\[\]]*?\][^\[\]]*?)*)\]\((.*?)\)/,
        'text-link-http': /\b(https?:\/\/[^\s,.;:!?")]+(?:[,.;:!?")][^\s,.;:!?")]+)+)/,
    });
    $.$mol_syntax2_md_code = new $mol_syntax2({
        'code-indent': /\t+/,
        'code-docs': /\/\/\/.*?$/,
        'code-comment-block': /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/|<![^]*?>)/,
        'code-link': /(?:\w+:\/\/|#)\S+?(?=\s|\\\\|""|$)/,
        'code-comment-inline': /\/\/.*?(?:$|\/\/)|- \\(?!\\).*|(?<=^| )#!? .*/,
        'code-string': /(?:".*?"|'.*?'|`.*?`| ?\\\\.+?\\\\|\/.+?\/[dygimsu]*(?!\p{Letter})|[ \t]*\\[^\n]*)/u,
        'code-number': /[+-]?(?:\d*\.)?\d+\w*/,
        'code-call': /\.?\w+(?=\()/,
        'code-sexpr': /\((\w+ )/,
        'code-field': /(?:(?<=\.|::|->)[a-z][\w-]*|(?<=[, \t] |\t)[\w-]+\??:(?!\/\/|:))/,
        'code-keyword': /(?<=^|\t|[ )(}{=] )((throw|readonly|unknown|keyof|typeof|never|from|class|struct|interface|type|function|extends|implements|module|namespace|import|export|include|require|var|val|let|const|for|do|while|until|in|out|of|new|if|then|else|switch|case|return|async|await|yield|try|catch|break|continue|get|set|public|private|protected|void|int|float|ref)( |$|;))+/,
        'code-global': /[$]+\w*|\b[A-Z][a-z0-9]+[A-Z]\w*/,
        'code-word': /\w+/,
        'code-decorator': /(?<=^|  |\t)@\s*\S+/,
        'code-tag': /<\/?[\w-]+\/?>?|&\w+;/,
        'code-punctuation': /[\-\[\]\{\}\(\)<=>~!\?@#%&\*_\+\\\/\|;:\.,\^]+?/,
    });
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text_code_line extends $.$mol_text_code_line {
            maximal_width() {
                return this.text().length * this.letter_width();
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            tokens(path) {
                const tokens = [];
                const text = (path.length > 0)
                    // @FIXME: this logic compatible only with `string`
                    ? this.tokens(path.slice(0, path.length - 1))[path[path.length - 1]].found.slice(1, -1)
                    : this.text();
                this.syntax().tokenize(text, (name, found, chunks) => {
                    if (name === 'code-sexpr') {
                        tokens.push({ name: 'code-punctuation', found: '(', chunks: [] });
                        tokens.push({ name: 'code-call', found: chunks[0], chunks: [] });
                    }
                    else {
                        tokens.push({ name, found, chunks });
                    }
                });
                return tokens;
            }
            sub() {
                return [
                    ...this.numb_showed() ? [this.Numb()] : [],
                    ...this.row_content([])
                ];
            }
            row_content(path) {
                const content = this.tokens(path).map((t, i) => this.Token([...path, i]));
                return content.length ? content : ['\n'];
            }
            Token(path) {
                return this.token_type(path) === 'code-link' ? this.Token_link(path) : super.Token(path);
            }
            token_type(path) {
                return this.tokens([...path.slice(0, path.length - 1)])[path[path.length - 1]].name;
            }
            token_content(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                switch (token.name) {
                    case 'code-string': return [
                        token.found[0],
                        ...this.row_content(path),
                        token.found[token.found.length - 1],
                    ];
                    default: return [token.found];
                }
            }
            token_text(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                return token.found;
            }
            token_uri(path) {
                const uri = this.token_text(path);
                return this.uri_resolve(uri);
            }
            *view_find(check, path = []) {
                if (check(this, this.text())) {
                    yield [...path, this];
                }
            }
            find_pos(offset) {
                return this.find_token_pos([offset]);
            }
            find_token_pos([offset, ...path]) {
                for (const [index, token] of this.tokens(path).entries()) {
                    if (token.found.length >= offset) {
                        const token = this.Token([...path, index]);
                        return { token, offset };
                    }
                    else {
                        offset -= token.found.length;
                    }
                }
                return null;
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "row_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "find_pos", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "find_token_pos", null);
        $$.$mol_text_code_line = $mol_text_code_line;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem } = $mol_style_unit;
        $mol_style_define($mol_text_code_line, {
            display: 'block',
            position: 'relative',
            font: {
                family: 'monospace',
            },
            Numb: {
                textAlign: 'right',
                color: $mol_theme.shade,
                width: rem(3),
                margin: {
                    left: rem(-4),
                },
                display: 'inline-block',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                position: 'absolute',
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";

;
"use strict";
// @ts-ignore
var $node = $node || {};

;
"use strict";
var $;
(function ($) {
    $.$mol_blob = ($node.buffer?.Blob ?? $mol_dom_context.Blob);
})($ || ($ = {}));

;
	($.$mol_icon_clipboard) = class $mol_icon_clipboard extends ($.$mol_icon) {
		path(){
			return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3";
		}
	};


;
"use strict";


;
	($.$mol_icon_clipboard_outline) = class $mol_icon_clipboard_outline extends ($.$mol_icon) {
		path(){
			return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z";
		}
	};


;
"use strict";


;
	($.$mol_button_copy) = class $mol_button_copy extends ($.$mol_button_minor) {
		text(){
			return (this.title());
		}
		text_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_blob([(this.text())], {"type": "text/plain"});
			return obj;
		}
		html(){
			return "";
		}
		html_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_blob([(this.html())], {"type": "text/html"});
			return obj;
		}
		Icon(){
			const obj = new this.$.$mol_icon_clipboard_outline();
			return obj;
		}
		title(){
			return "";
		}
		blobs(){
			return [(this.text_blob()), (this.html_blob())];
		}
		data(){
			return {};
		}
		sub(){
			return [(this.Icon()), (this.title())];
		}
	};
	($mol_mem(($.$mol_button_copy.prototype), "text_blob"));
	($mol_mem(($.$mol_button_copy.prototype), "html_blob"));
	($mol_mem(($.$mol_button_copy.prototype), "Icon"));


;
"use strict";
var $;
(function ($) {
    const mapping = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '&': '&amp;',
    };
    function $mol_html_encode(text) {
        return text.replace(/[&<">]/gi, str => mapping[str]);
    }
    $.$mol_html_encode = $mol_html_encode;
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
         * Button copy text() value to clipboard
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
         */
        class $mol_button_copy extends $.$mol_button_copy {
            data() {
                return Object.fromEntries(this.blobs().map(blob => [blob.type, blob]));
            }
            html() {
                return $mol_html_encode(this.text());
            }
            attachments() {
                return [new ClipboardItem(this.data())];
            }
            click(event) {
                const cb = $mol_wire_sync(this.$.$mol_dom_context.navigator.clipboard);
                cb.writeText?.(this.text());
                cb.write?.(this.attachments());
                if (cb.writeText === undefined && cb.write === undefined) {
                    throw new Error("doesn't support copy to clipoard");
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "html", null);
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "attachments", null);
        $$.$mol_button_copy = $mol_button_copy;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text_code) = class $mol_text_code extends ($.$mol_stack) {
		sidebar_showed(){
			return false;
		}
		render_visible_only(){
			return false;
		}
		row_numb(id){
			return 0;
		}
		row_theme(id){
			return "";
		}
		row_text(id){
			return "";
		}
		syntax(){
			return null;
		}
		uri_resolve(id){
			return "";
		}
		highlight(){
			return "";
		}
		Row(id){
			const obj = new this.$.$mol_text_code_line();
			(obj.numb_showed) = () => ((this.sidebar_showed()));
			(obj.numb) = () => ((this.row_numb(id)));
			(obj.theme) = () => ((this.row_theme(id)));
			(obj.text) = () => ((this.row_text(id)));
			(obj.syntax) = () => ((this.syntax()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.highlight) = () => ((this.highlight()));
			return obj;
		}
		rows(){
			return [(this.Row("0"))];
		}
		Rows(){
			const obj = new this.$.$mol_list();
			(obj.render_visible_only) = () => ((this.render_visible_only()));
			(obj.rows) = () => ((this.rows()));
			return obj;
		}
		text_export(){
			return "";
		}
		Copy(){
			const obj = new this.$.$mol_button_copy();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_text_code_Copy_hint")));
			(obj.text) = () => ((this.text_export()));
			return obj;
		}
		attr(){
			return {...(super.attr()), "mol_text_code_sidebar_showed": (this.sidebar_showed())};
		}
		text(){
			return "";
		}
		text_lines(){
			return [];
		}
		find_pos(id){
			return null;
		}
		uri_base(){
			return "";
		}
		row_themes(){
			return [];
		}
		sub(){
			return [(this.Rows()), (this.Copy())];
		}
	};
	($mol_mem_key(($.$mol_text_code.prototype), "Row"));
	($mol_mem(($.$mol_text_code.prototype), "Rows"));
	($mol_mem(($.$mol_text_code.prototype), "Copy"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Code visualizer.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_text_code_demo
         */
        class $mol_text_code extends $.$mol_text_code {
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            text_lines() {
                return (this.text() ?? '').split('\n');
            }
            rows() {
                return this.text_lines().map((_, index) => this.Row(index + 1));
            }
            row_text(index) {
                return this.text_lines()[index - 1];
            }
            row_numb(index) {
                return index;
            }
            find_pos(offset) {
                for (const [index, line] of this.text_lines().entries()) {
                    if (line.length >= offset) {
                        return this.Row(index + 1).find_pos(offset);
                    }
                    else {
                        offset -= line.length + 1;
                    }
                }
                return null;
            }
            sub() {
                return [
                    this.Rows(),
                    ...this.sidebar_showed() ? [this.Copy()] : []
                ];
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                try {
                    const url = new URL(uri, this.uri_base());
                    return url.toString();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            text_export() {
                return this.text() + '\n';
            }
            row_theme(row) {
                return this.row_themes()[row - 1];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "text_lines", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "row_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "find_pos", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "sub", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "uri_resolve", null);
        $$.$mol_text_code = $mol_text_code;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem, px } = $mol_style_unit;
        $mol_style_define($mol_text_code, {
            whiteSpace: 'pre-wrap',
            font: {
                family: 'monospace',
            },
            Rows: {
                padding: $mol_gap.text,
                minWidth: 0,
            },
            Row: {
                font: {
                    family: 'inherit',
                },
            },
            Copy: {
                alignSelf: 'flex-start',
                justifySelf: 'flex-start',
            },
            '@': {
                'mol_text_code_sidebar_showed': {
                    true: {
                        $mol_text_code_line: {
                            margin: {
                                left: rem(1.75),
                            },
                        },
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_float) = class $mol_float extends ($.$mol_view) {
		style(){
			return {...(super.style()), "minHeight": "auto"};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/float/float.view.css", "[mol_float] {\n\tposition: sticky;\n\ttop: 0;\n\tleft: 0;\n\tz-index: var(--mol_layer_float);\n\topacity: 1;\n\ttransition: opacity .25s ease-in;\n\tdisplay: block;\n\tbackground: linear-gradient( var(--mol_theme_card), var(--mol_theme_card) ), var(--mol_theme_back);\n\tbox-shadow: 0 0 .5rem hsla(0,0%,0%,.25);\n}\n\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_grid) = class $mol_grid extends ($.$mol_view) {
		rows(){
			return [];
		}
		Table(){
			const obj = new this.$.$mol_grid_table();
			(obj.sub) = () => ((this.rows()));
			return obj;
		}
		head_cells(){
			return [];
		}
		cells(id){
			return [];
		}
		cell_content(id){
			return [];
		}
		cell_content_text(id){
			return (this.cell_content(id));
		}
		cell_content_number(id){
			return (this.cell_content(id));
		}
		col_head_content(id){
			return [];
		}
		cell_level(id){
			return 0;
		}
		cell_expanded(id, next){
			if(next !== undefined) return next;
			return false;
		}
		needle(){
			return "";
		}
		cell_value(id){
			return "";
		}
		Cell_dimmer(id){
			const obj = new this.$.$mol_dimmer();
			(obj.needle) = () => ((this.needle()));
			(obj.haystack) = () => ((this.cell_value(id)));
			return obj;
		}
		row_height(){
			return 32;
		}
		row_ids(){
			return [];
		}
		row_id(id){
			return null;
		}
		col_ids(){
			return [];
		}
		records(){
			return {};
		}
		record(id){
			return null;
		}
		hierarchy(){
			return null;
		}
		hierarchy_col(){
			return "";
		}
		minimal_width(){
			return 0;
		}
		sub(){
			return [(this.Head()), (this.Table())];
		}
		Head(){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.head_cells()));
			return obj;
		}
		Row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.minimal_height) = () => ((this.row_height()));
			(obj.minimal_width) = () => ((this.minimal_width()));
			(obj.cells) = () => ((this.cells(id)));
			return obj;
		}
		Cell(id){
			const obj = new this.$.$mol_view();
			return obj;
		}
		cell(id){
			return null;
		}
		Cell_text(id){
			const obj = new this.$.$mol_grid_cell();
			(obj.sub) = () => ((this.cell_content_text(id)));
			return obj;
		}
		Cell_number(id){
			const obj = new this.$.$mol_grid_number();
			(obj.sub) = () => ((this.cell_content_number(id)));
			return obj;
		}
		Col_head(id){
			const obj = new this.$.$mol_float();
			(obj.dom_name) = () => ("th");
			(obj.sub) = () => ((this.col_head_content(id)));
			return obj;
		}
		Cell_branch(id){
			const obj = new this.$.$mol_check_expand();
			(obj.level) = () => ((this.cell_level(id)));
			(obj.label) = () => ((this.cell_content(id)));
			(obj.expanded) = (next) => ((this.cell_expanded(id, next)));
			return obj;
		}
		Cell_content(id){
			return [(this.Cell_dimmer(id))];
		}
	};
	($mol_mem(($.$mol_grid.prototype), "Table"));
	($mol_mem_key(($.$mol_grid.prototype), "cell_expanded"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_dimmer"));
	($mol_mem(($.$mol_grid.prototype), "Head"));
	($mol_mem_key(($.$mol_grid.prototype), "Row"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_text"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_number"));
	($mol_mem_key(($.$mol_grid.prototype), "Col_head"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_branch"));
	($.$mol_grid_table) = class $mol_grid_table extends ($.$mol_list) {};
	($.$mol_grid_row) = class $mol_grid_row extends ($.$mol_view) {
		cells(){
			return [];
		}
		sub(){
			return (this.cells());
		}
	};
	($.$mol_grid_cell) = class $mol_grid_cell extends ($.$mol_view) {
		minimal_height(){
			return 40;
		}
	};
	($.$mol_grid_number) = class $mol_grid_number extends ($.$mol_grid_cell) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_grid extends $.$mol_grid {
            head_cells() {
                return this.col_ids().map(colId => this.Col_head(colId));
            }
            col_head_content(colId) {
                return [colId];
            }
            rows() {
                return this.row_ids().map(id => this.Row(id));
            }
            cells(row_id) {
                return this.col_ids().map(col_id => this.Cell({ row: row_id, col: col_id }));
            }
            col_type(col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                const rowFirst = this.row_id(0);
                const val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            }
            Cell(id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            }
            cell_content(id) {
                return [this.record(id.row[id.row.length - 1])[id.col]];
            }
            cell_content_text(id) {
                return this.cell_content(id).map(val => typeof val === 'object' ? JSON.stringify(val) : val);
            }
            records() {
                return [];
            }
            record(id) {
                return this.records()[id];
            }
            record_ids() {
                return Object.keys(this.records());
            }
            row_id(index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            }
            col_ids() {
                const rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return [];
                const record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            }
            hierarchy() {
                const hierarchy = {};
                const root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(id => {
                    root.sub.push(hierarchy[id] = {
                        id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            }
            row_sub_ids(row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(child => row.concat(child.id));
            }
            row_root_id() {
                return [''];
            }
            cell_level(id) {
                return id.row.length - 1;
            }
            row_ids() {
                const next = [];
                const add = (row) => {
                    next.push(row);
                    if (this.row_expanded(row)) {
                        this.row_sub_ids(row).forEach(child => add(child));
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(child => add(child));
                return next;
            }
            row_expanded(row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                const key = `row_expanded(${JSON.stringify(row_id)})`;
                const next2 = $mol_state_session.value(key, next);
                return (next2 == null) ? this.row_expanded_default(row_id) : next2;
            }
            row_expanded_default(row_id) {
                return true;
            }
            cell_expanded(id, next) {
                return this.row_expanded(id.row, next);
            }
            sub() {
                this.head_cells();
                this.rows();
                return super.sub();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "head_cells", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_grid.prototype, "col_type", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "record_ids", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "hierarchy", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "row_ids", null);
        $$.$mol_grid = $mol_grid;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/grid/grid.view.css", "[mol_grid] {\n\tdisplay: block;\n\tflex: 0 1 auto;\n\tposition: relative;\n\toverflow-x: auto;\n}\n\n[mol_grid_gap] {\n\tposition: absolute;\n\tpadding: .1px;\n\ttop: 0;\n\ttransform: translateZ(0);\n}\n\n[mol_grid_table] {\n\tborder-spacing: 0;\n\tdisplay: table-row-group;\n\tposition: relative;\n}\n\n[mol_grid_table] > * {\n\tdisplay: table-row;\n\ttransition: none;\n}\n\n[mol_grid_head] > *,\n[mol_grid_table] > * > * {\n\tdisplay: table-cell;\n\tpadding: var(--mol_gap_text);\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\tbox-shadow: inset 2px 2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_row]:where(:first-child) > * {\n\tbox-shadow: inset 2px 0 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_table] > * > *:where(:first-child) {\n\tbox-shadow: inset 0px 2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_head] > * {\n\tbox-shadow: inset 2px -2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_head] > *:where(:first-child) {\n\tbox-shadow: inset 0px -2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_table] > [mol_grid_row]:where(:first-child) > *:where(:first-child) {\n\tbox-shadow: none;\n}\t\n\n[mol_grid_head] {\n\tdisplay: table-row;\n\ttransform: none !important;\n}\n\n/* [mol_grid_cell_number] {\n\ttext-align: right;\n} */\n\n[mol_grid_col_head] {\n\tfont-weight: inherit;\n\ttext-align: inherit;\n\tdisplay: table-cell;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_grid_cell_dimmer] {\n\tdisplay: inline-block;\n\tvertical-align: inherit;\n}\n");
})($ || ($ = {}));

;
	($.$mol_link_iconed) = class $mol_link_iconed extends ($.$mol_link) {
		icon(){
			return "";
		}
		Icon(){
			const obj = new this.$.$mol_image();
			(obj.uri) = () => ((this.icon()));
			(obj.title) = () => ("");
			return obj;
		}
		title(){
			return (this.uri());
		}
		sub(){
			return [(this.Icon())];
		}
		content(){
			return [(this.title())];
		}
		host(){
			return "";
		}
	};
	($mol_mem(($.$mol_link_iconed.prototype), "Icon"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link_iconed extends $.$mol_link_iconed {
            icon() {
                return `https://favicon.yandex.net/favicon/${this.host()}?color=0,0,0,0&size=32&stub=1`;
                // return `https://api.faviconkit.com/${ this.host() }/16`
            }
            host() {
                const base = this.$.$mol_state_arg.href();
                const url = new URL(this.uri(), base);
                return url.hostname;
            }
            title() {
                const uri = this.uri();
                const host = this.host();
                const suffix = (host ? uri.split(this.host(), 2)[1] : uri)?.replace(/^[\/\?#!]+/, '');
                return decodeURIComponent(suffix || host).replace(/^\//, ' ');
            }
            sub() {
                return [
                    ...this.host() ? [this.Icon()] : [],
                    ...this.content() ? [' ', ...this.content()] : [],
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "icon", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "host", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "title", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "sub", null);
        $$.$mol_link_iconed = $mol_link_iconed;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/link/iconed/iconed.view.css", "[mol_link_iconed] {\n\talign-items: baseline;\n\tdisplay: inline-flex;\n\tpadding: var(--mol_gap_text);\n}\n\n[mol_link_iconed_icon] {\n\tbox-shadow: none;\n\theight: 1.5em;\n\twidth: 1em;\n\tflex: 0 0 auto;\n\tdisplay: inline-block;\n\talign-self: normal;\n\tvertical-align: top;\n\tborder-radius: 0;\n\tobject-fit: scale-down;\n\topacity: .75;\n}\n\n[mol_theme=\"$mol_theme_dark\"] [mol_link_iconed_icon] {\n\tfilter: var(--mol_theme_image);\n}\n");
})($ || ($ = {}));

;
	($.$mol_embed_native) = class $mol_embed_native extends ($.$mol_scroll) {
		uri(next){
			if(next !== undefined) return next;
			return "about:config";
		}
		title(){
			return "";
		}
		Fallback(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this.uri()));
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		uri_change(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "iframe";
		}
		window(){
			return null;
		}
		attr(){
			return {...(super.attr()), "src": (this.uri())};
		}
		sub(){
			return [(this.Fallback())];
		}
		message(){
			return {"hashchange": (next) => (this.uri_change(next))};
		}
	};
	($mol_mem(($.$mol_embed_native.prototype), "uri"));
	($mol_mem(($.$mol_embed_native.prototype), "Fallback"));
	($mol_mem(($.$mol_embed_native.prototype), "uri_change"));


;
"use strict";
var $;
(function ($) {
    function $mol_wait_timeout_async(timeout) {
        const promise = new $mol_promise();
        const task = new this.$mol_after_timeout(timeout, () => promise.done());
        return Object.assign(promise, {
            destructor: () => task.destructor()
        });
    }
    $.$mol_wait_timeout_async = $mol_wait_timeout_async;
    function $mol_wait_timeout(timeout) {
        return this.$mol_wire_sync(this).$mol_wait_timeout_async(timeout);
    }
    $.$mol_wait_timeout = $mol_wait_timeout;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_native extends $.$mol_embed_native {
            window() {
                $mol_wire_solid();
                this.uri_resource();
                return $mol_wire_sync(this).load(this.dom_node_actual());
            }
            load(frame) {
                return new Promise((done, fail) => {
                    frame.onload = () => {
                        try {
                            if (frame.contentWindow.location.href === 'about:blank') {
                                return;
                            }
                        }
                        catch { }
                        done(frame.contentWindow);
                    };
                    frame.onerror = (event) => {
                        fail(typeof event === 'string' ? new Error(event) : event.error || event);
                    };
                });
            }
            uri_resource() {
                return this.uri().replace(/#.*/, '');
            }
            message_listener() {
                return new $mol_dom_listener($mol_dom_context, 'message', $mol_wire_async(this).message_receive);
            }
            sub_visible() {
                this.window();
                return super.sub_visible();
            }
            message_receive(event) {
                if (!event)
                    return;
                if (event.source !== this.window())
                    return;
                if (!Array.isArray(event.data))
                    return;
                this.message()[event.data[0]]?.(event);
            }
            uri_change(event) {
                this.$.$mol_wait_timeout(1000);
                this.uri(event.data[1]);
            }
            auto() {
                return [
                    this.message_listener(),
                    this.window(),
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "window", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "uri_resource", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "message_listener", null);
        $$.$mol_embed_native = $mol_embed_native;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/native/native.view.css", "[mol_embed_native] {\n\tmin-width: 0;\n\tmin-height: 0;\n\tmax-width: 100%;\n\tmax-height: 100vh;\n\tobject-fit: cover;\n\tdisplay: flex;\n\tflex: 1 1 auto;\n\tobject-position: top left;\n\tborder-radius: var(--mol_gap_round);\n\taspect-ratio: 4/3;\n\tborder: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_youtube) = class $mol_icon_youtube extends ($.$mol_icon) {
		path(){
			return "M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z";
		}
	};


;
"use strict";


;
	($.$mol_frame) = class $mol_frame extends ($.$mol_embed_native) {
		allow(){
			return "";
		}
		html(){
			return null;
		}
		attr(){
			return {
				"tabindex": (this.tabindex()), 
				"allow": (this.allow()), 
				"src": (this.uri()), 
				"srcdoc": (this.html())
			};
		}
		fullscreen(){
			return true;
		}
		accelerometer(){
			return true;
		}
		autoplay(){
			return true;
		}
		encription(){
			return true;
		}
		gyroscope(){
			return true;
		}
		pip(){
			return true;
		}
		clipboard_read(){
			return true;
		}
		clipboard_write(){
			return true;
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
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_frame_demo
         */
        class $mol_frame extends $.$mol_frame {
            window() {
                // if( this.html() ) return ( this.dom_node() as HTMLIFrameElement ).contentWindow!
                return super.window();
            }
            allow() {
                return [
                    ...this.fullscreen() ? ['fullscreen'] : [],
                    ...this.accelerometer() ? ['accelerometer'] : [],
                    ...this.autoplay() ? ['autoplay'] : [],
                    ...this.encription() ? ['encrypted-media'] : [],
                    ...this.gyroscope() ? ['gyroscope'] : [],
                    ...this.pip() ? ['picture-in-picture'] : [],
                    ...this.clipboard_read() ? [`clipboard-read ${this.uri()}`] : [],
                    ...this.clipboard_write() ? [`clipboard-write ${this.uri()}`] : [],
                ].join('; ');
            }
        }
        $$.$mol_frame = $mol_frame;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($mol_frame, {
        border: {
            style: 'none',
        },
        maxHeight: $mol_style_unit.vh(100),
    });
})($ || ($ = {}));

;
	($.$mol_embed_service) = class $mol_embed_service extends ($.$mol_check) {
		active(next){
			if(next !== undefined) return next;
			return false;
		}
		title(){
			return "";
		}
		video_preview(){
			return "";
		}
		Image(){
			const obj = new this.$.$mol_image();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.video_preview()));
			return obj;
		}
		Hint(){
			const obj = new this.$.$mol_icon_youtube();
			return obj;
		}
		video_embed(){
			return "";
		}
		Frame(){
			const obj = new this.$.$mol_frame();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.video_embed()));
			return obj;
		}
		uri(){
			return "";
		}
		video_id(){
			return "";
		}
		checked(next){
			return (this.active(next));
		}
		sub(){
			return [
				(this.Image()), 
				(this.Hint()), 
				(this.Frame())
			];
		}
	};
	($mol_mem(($.$mol_embed_service.prototype), "active"));
	($mol_mem(($.$mol_embed_service.prototype), "Image"));
	($mol_mem(($.$mol_embed_service.prototype), "Hint"));
	($mol_mem(($.$mol_embed_service.prototype), "Frame"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_service extends $.$mol_embed_service {
            sub() {
                return this.active()
                    ? [this.Frame()]
                    : [this.Image(), this.Hint()];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_service.prototype, "sub", null);
        $$.$mol_embed_service = $mol_embed_service;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/service/service.view.css", "[mol_embed_service] {\n\tpadding: 0;\n\tmax-width: 100%;\n}\n\n[mol_embed_service_image] {\n\tflex: auto 1 1;\n\twidth: 100vw;\n}\n\n[mol_embed_service_frame] {\n\twidth: 100vw;\n}\n\n[mol_embed_service_hint] {\n\tposition: absolute;\n    left: 50%;\n    top: 50%;\n    width: 50%;\n    height: 50%;\n    opacity: 0.3;\n    transform: translate(-50%, -50%);\n}\n\n[mol_embed_service]:hover [mol_embed_service_hint] {\n\topacity: .6;\n}\n");
})($ || ($ = {}));

;
	($.$mol_embed_youtube) = class $mol_embed_youtube extends ($.$mol_embed_service) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_youtube extends $.$mol_embed_youtube {
            video_embed() {
                return `https://www.youtube.com/embed/${encodeURIComponent(this.video_id())}?autoplay=1&loop=1`;
            }
            video_id() {
                return this.uri().match(/^https\:\/\/www\.youtube\.com\/(?:embed\/|shorts\/|watch\?v=)([^\/&?#]+)/)?.[1]
                    ?? this.uri().match(/^https\:\/\/youtu\.be\/([^\/&?#]+)/)?.[1]
                    ?? 'about:blank';
            }
            video_preview() {
                return `https://i.ytimg.com/vi/${this.video_id()}/sddefault.jpg`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_preview", null);
        $$.$mol_embed_youtube = $mol_embed_youtube;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_rutube) = class $mol_embed_rutube extends ($.$mol_embed_service) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_rutube extends $.$mol_embed_rutube {
            video_embed() {
                return `https://rutube.ru/play/embed/${encodeURIComponent(this.video_id())}`;
            }
            video_id() {
                return this.uri().match(/^https:\/\/rutube.ru\/video\/([^\/&?#]+)/)?.[1] ?? 'about:blank';
            }
            video_preview() {
                return `https://rutube.ru/api/video/${this.video_id()}/thumbnail/?redirect=1`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_preview", null);
        $$.$mol_embed_rutube = $mol_embed_rutube;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_vklive) = class $mol_embed_vklive extends ($.$mol_embed_service) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_vklive extends $.$mol_embed_vklive {
            video_embed() {
                return `https://live.vkvideo.ru/app/embed/${this.channel_id()}/${this.video_id()}`;
            }
            channel_id() {
                return this.uri().match(/^https:\/\/live\.vkvideo\.ru\/([^\/&?#]+)/)?.[1] ?? '';
            }
            video_id() {
                return this.uri().match(/^https:\/\/live\.vkvideo\.ru\/[^\/&?#]+\/record\/([^\/&?#]+)/)?.[1] ?? '';
            }
            video_preview() {
                return `https://images.live.vkvideo.ru/public_video_stream/record/${this.video_id()}/preview`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "channel_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_preview", null);
        $$.$mol_embed_vklive = $mol_embed_vklive;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_any) = class $mol_embed_any extends ($.$mol_view) {
		title(){
			return "";
		}
		uri(){
			return "";
		}
		Image(){
			const obj = new this.$.$mol_image();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Object(){
			const obj = new this.$.$mol_embed_native();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Youtube(){
			const obj = new this.$.$mol_embed_youtube();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Rutube(){
			const obj = new this.$.$mol_embed_rutube();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Vklive(){
			const obj = new this.$.$mol_embed_vklive();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
	};
	($mol_mem(($.$mol_embed_any.prototype), "Image"));
	($mol_mem(($.$mol_embed_any.prototype), "Object"));
	($mol_mem(($.$mol_embed_any.prototype), "Youtube"));
	($mol_mem(($.$mol_embed_any.prototype), "Rutube"));
	($mol_mem(($.$mol_embed_any.prototype), "Vklive"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_any extends $.$mol_embed_any {
            type() {
                try {
                    const uri = this.uri();
                    if (/\b(png|gif|jpg|jpeg|jfif|webp|svg)\b/.test(uri))
                        return 'image';
                    if (/^https:\/\/www\.youtube\.com\//.test(uri))
                        return 'youtube';
                    if (/^https:\/\/youtu\.be\//.test(uri))
                        return 'youtube';
                    if (/^https:\/\/rutube\.ru\//.test(uri))
                        return 'rutube';
                    if (/^https:\/\/live\.vkvideo\.ru\//.test(uri))
                        return 'vklive';
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 'image';
                }
                return 'object';
            }
            sub() {
                switch (this.type()) {
                    case 'image': return [this.Image()];
                    case 'youtube': return [this.Youtube()];
                    case 'rutube': return [this.Rutube()];
                    case 'vklive': return [this.Vklive()];
                    default: return [this.Object()];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "type", null);
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "sub", null);
        $$.$mol_embed_any = $mol_embed_any;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text) = class $mol_text extends ($.$mol_list) {
		auto_scroll(){
			return null;
		}
		block_content(id){
			return [];
		}
		uri_resolve(id){
			return "";
		}
		quote_text(id){
			return "";
		}
		highlight(){
			return "";
		}
		list_type(id){
			return "-";
		}
		list_text(id){
			return "";
		}
		header_level(id){
			return 1;
		}
		header_arg(id){
			return {};
		}
		pre_text(id){
			return "";
		}
		pre_themes(id){
			return [];
		}
		code_sidebar_showed(){
			return true;
		}
		pre_sidebar_showed(){
			return (this.code_sidebar_showed());
		}
		table_head_cells(id){
			return [];
		}
		table_rows(id){
			return [];
		}
		table_cells(id){
			return [];
		}
		table_cell_text(id){
			return "";
		}
		grid_rows(id){
			return [];
		}
		grid_cells(id){
			return [];
		}
		grid_cell_text(id){
			return "";
		}
		line_text(id){
			return "";
		}
		line_type(id){
			return "";
		}
		line_content(id){
			return [];
		}
		code_syntax(){
			return null;
		}
		link_uri(id){
			return "";
		}
		link_host(id){
			return "";
		}
		spoiler_label(id){
			return "";
		}
		Spoiler_label(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.spoiler_label(id)));
			return obj;
		}
		spoiler_content(id){
			return "";
		}
		Spoiler_content(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.spoiler_content(id)));
			return obj;
		}
		uri_base(){
			return "";
		}
		text(){
			return "";
		}
		param(){
			return "";
		}
		flow_tokens(){
			return [];
		}
		block_text(id){
			return "";
		}
		auto(){
			return [(this.auto_scroll())];
		}
		Paragraph(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ((this.block_content(id)));
			return obj;
		}
		Quote(id){
			const obj = new this.$.$mol_text();
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.quote_text(id)));
			(obj.highlight) = () => ((this.highlight()));
			(obj.auto_scroll) = () => (null);
			return obj;
		}
		List(id){
			const obj = new this.$.$mol_text_list();
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.type) = () => ((this.list_type(id)));
			(obj.text) = () => ((this.list_text(id)));
			(obj.highlight) = () => ((this.highlight()));
			return obj;
		}
		item_index(id){
			return 0;
		}
		Header(id){
			const obj = new this.$.$mol_text_header();
			(obj.minimal_height) = () => (40);
			(obj.level) = () => ((this.header_level(id)));
			(obj.content) = () => ((this.block_content(id)));
			(obj.arg) = () => ((this.header_arg(id)));
			return obj;
		}
		Pre(id){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.pre_text(id)));
			(obj.row_themes) = () => ((this.pre_themes(id)));
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.sidebar_showed) = () => ((this.pre_sidebar_showed()));
			return obj;
		}
		Cut(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("hr");
			return obj;
		}
		Table(id){
			const obj = new this.$.$mol_grid();
			(obj.head_cells) = () => ((this.table_head_cells(id)));
			(obj.rows) = () => ((this.table_rows(id)));
			return obj;
		}
		Table_row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.table_cells(id)));
			return obj;
		}
		Table_cell(id){
			const obj = new this.$.$mol_text();
			(obj.auto_scroll) = () => (null);
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.table_cell_text(id)));
			return obj;
		}
		Grid(id){
			const obj = new this.$.$mol_grid();
			(obj.rows) = () => ((this.grid_rows(id)));
			return obj;
		}
		Grid_row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.grid_cells(id)));
			return obj;
		}
		Grid_cell(id){
			const obj = new this.$.$mol_text();
			(obj.auto_scroll) = () => (null);
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.grid_cell_text(id)));
			return obj;
		}
		String(id){
			const obj = new this.$.$mol_dimmer();
			(obj.dom_name) = () => ("span");
			(obj.needle) = () => ((this.highlight()));
			(obj.haystack) = () => ((this.line_text(id)));
			return obj;
		}
		Span(id){
			const obj = new this.$.$mol_text_span();
			(obj.dom_name) = () => ("span");
			(obj.type) = () => ((this.line_type(id)));
			(obj.sub) = () => ((this.line_content(id)));
			return obj;
		}
		Code_line(id){
			const obj = new this.$.$mol_text_code_line();
			(obj.numb_showed) = () => (false);
			(obj.highlight) = () => ((this.highlight()));
			(obj.text) = () => ((this.line_text(id)));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.syntax) = () => ((this.code_syntax()));
			return obj;
		}
		Link(id){
			const obj = new this.$.$mol_link_iconed();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.content) = () => ((this.line_content(id)));
			return obj;
		}
		Link_http(id){
			const obj = new this.$.$mol_link_iconed();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.content) = () => ([(this.link_host(id))]);
			return obj;
		}
		Embed(id){
			const obj = new this.$.$mol_embed_any();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.title) = () => ((this.line_text(id)));
			return obj;
		}
		Spoiler(id){
			const obj = new this.$.$mol_expander();
			(obj.label) = () => ([(this.Spoiler_label(id))]);
			(obj.content) = () => ([(this.Spoiler_content(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_text.prototype), "Spoiler_label"));
	($mol_mem_key(($.$mol_text.prototype), "Spoiler_content"));
	($mol_mem_key(($.$mol_text.prototype), "Paragraph"));
	($mol_mem_key(($.$mol_text.prototype), "Quote"));
	($mol_mem_key(($.$mol_text.prototype), "List"));
	($mol_mem_key(($.$mol_text.prototype), "Header"));
	($mol_mem_key(($.$mol_text.prototype), "Pre"));
	($mol_mem_key(($.$mol_text.prototype), "Cut"));
	($mol_mem_key(($.$mol_text.prototype), "Table"));
	($mol_mem_key(($.$mol_text.prototype), "Table_row"));
	($mol_mem_key(($.$mol_text.prototype), "Table_cell"));
	($mol_mem_key(($.$mol_text.prototype), "Grid"));
	($mol_mem_key(($.$mol_text.prototype), "Grid_row"));
	($mol_mem_key(($.$mol_text.prototype), "Grid_cell"));
	($mol_mem_key(($.$mol_text.prototype), "String"));
	($mol_mem_key(($.$mol_text.prototype), "Span"));
	($mol_mem_key(($.$mol_text.prototype), "Code_line"));
	($mol_mem_key(($.$mol_text.prototype), "Link"));
	($mol_mem_key(($.$mol_text.prototype), "Link_http"));
	($mol_mem_key(($.$mol_text.prototype), "Embed"));
	($mol_mem_key(($.$mol_text.prototype), "Spoiler"));
	($.$mol_text_header) = class $mol_text_header extends ($.$mol_paragraph) {
		arg(){
			return {};
		}
		content(){
			return [];
		}
		Link(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.arg()));
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_text_header_Link_hint")));
			(obj.sub) = () => ((this.content()));
			return obj;
		}
		level(){
			return 1;
		}
		sub(){
			return [(this.Link())];
		}
	};
	($mol_mem(($.$mol_text_header.prototype), "Link"));
	($.$mol_text_span) = class $mol_text_span extends ($.$mol_paragraph) {
		type(){
			return "";
		}
		dom_name(){
			return "span";
		}
		attr(){
			return {...(super.attr()), "mol_text_type": (this.type())};
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
         * Markdown visualizer.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_text_demo
         */
        class $mol_text extends $.$mol_text {
            flow_tokens() {
                const tokens = [];
                this.$.$mol_syntax2_md_flow.tokenize(this.text(), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            block_type(index) {
                return this.flow_tokens()[index].name;
            }
            rows() {
                return this.flow_tokens().map(({ name }, index) => {
                    switch (name) {
                        case 'quote': return this.Quote(index);
                        case 'spoiler': return this.Spoiler(index);
                        case 'header': return this.Header(index);
                        case 'list': return this.List(index);
                        case 'code': return this.Pre(index);
                        case 'code-indent': return this.Pre(index);
                        case 'table': return this.Table(index);
                        case 'grid': return this.Grid(index);
                        case 'cut': return this.Cut(index);
                        default: return this.Paragraph(index);
                    }
                });
            }
            param() {
                return this.toString().replace(/^.*?[\)>]\./, '').replace(/[(<>)]/g, '');
            }
            header_level(index) {
                return this.flow_tokens()[index].chunks[0].length;
            }
            header_arg(index) {
                return {
                    [this.param()]: this.block_text(index)
                };
            }
            list_type(index) {
                return this.flow_tokens()[index].chunks[1] ?? '';
            }
            item_index(index) {
                return this.flow_tokens().slice(0, index).filter(token => token.name === 'block').length + 1;
            }
            pre_text(index) {
                const token = this.flow_tokens()[index];
                return (token.chunks[2] ?? token.chunks[0].replace(/^(\t| (?:\+\+|--|\*\*|  ) )/gm, '')).replace(/[\n\r]*$/, '');
            }
            pre_themes(index) {
                const token = this.flow_tokens()[index];
                const names = {
                    ' ** ': '$mol_theme_accent',
                    ' ++ ': '$mol_theme_current',
                    ' -- ': '$mol_theme_special',
                };
                return token.chunks[0].split('\n')
                    .map(line => names[line.match(/^ (?:\+\+|--|\*\*|  ) /gm)?.[0] ?? ''] ?? null);
            }
            quote_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^[>"] /mg, '');
            }
            list_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^([-*+]|(?:\d+[\.\)])+) ?/mg, '').replace(/^  ?/mg, '');
            }
            cell_content(indexBlock) {
                return this.flow_tokens()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(row => row && !/\|--/.test(row))
                    .map((row, rowId) => {
                    return row.split(/\|/g)
                        .filter(cell => cell)
                        .map((cell, cellId) => cell.trim());
                });
            }
            table_rows(blockId) {
                return this.cell_content(blockId)
                    .slice(1)
                    .map((row, rowId) => this.Table_row({ block: blockId, row: rowId + 1 }));
            }
            table_head_cells(blockId) {
                return this.cell_content(blockId)[0]
                    .map((cell, cellId) => this.Table_cell({ block: blockId, row: 0, cell: cellId }));
            }
            table_cells(id) {
                return this.cell_content(id.block)[id.row]
                    .map((cell, cellId) => this.Table_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            table_cell_text(id) {
                return this.cell_content(id.block)[id.row][id.cell];
            }
            grid_content(indexBlock) {
                return [...this.flow_tokens()[indexBlock].chunks[0].match(/(?:^! .*?$\r?\n?)+(?:^ +! .*?$\r?\n?)*/gm)]
                    .map((row, rowId) => {
                    const cells = [];
                    for (const line of row.trim().split(/\r?\n/)) {
                        const [_, indent, content] = /^( *)! (.*)/.exec(line);
                        const col = Math.ceil(indent.length / 2);
                        cells[col] = (cells[col] ? cells[col] + '\n' : '') + content;
                    }
                    return cells;
                });
            }
            grid_rows(blockId) {
                return this.grid_content(blockId)
                    .map((row, rowId) => this.Grid_row({ block: blockId, row: rowId }));
            }
            grid_cells(id) {
                return this.grid_content(id.block)[id.row]
                    .map((cell, cellId) => this.Grid_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            grid_cell_text(id) {
                return this.grid_content(id.block)[id.row][id.cell];
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_base_abs() {
                return new URL(this.uri_base(), $mol_dom_context.document.location.href);
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                if (/^#\!/.test(uri)) {
                    const params = {};
                    for (const chunk of uri.slice(2).split(this.$.$mol_state_arg.separator)) {
                        if (!chunk)
                            continue;
                        const vals = chunk.split('=').map(decodeURIComponent);
                        params[vals.shift()] = vals.join('=');
                    }
                    return this.$.$mol_state_arg.link(params);
                }
                try {
                    const url = new URL(uri, this.uri_base_abs());
                    return url.toString();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            code_syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            block_text(index) {
                const token = this.flow_tokens()[index];
                switch (token.name) {
                    case 'header': return token.chunks[2];
                    default: return token.chunks[0];
                }
            }
            block_content(index) {
                return this.line_content([index]);
            }
            line_tokens(path) {
                const tokens = [];
                this.$.$mol_syntax2_md_line.tokenize(this.line_text(path), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            line_token(path) {
                const tokens = this.line_tokens(path.slice(0, path.length - 1));
                return tokens[path[path.length - 1]];
            }
            line_type(path) {
                return this.line_token(path).name;
            }
            line_text(path) {
                if (path.length === 1)
                    return this.block_text(path[0]);
                const { name, found, chunks } = this.line_token(path);
                switch (name) {
                    case 'link': return chunks[0] || chunks[1].replace(/^.*?\/\/|\/.*$/g, '');
                    case 'text-link': return chunks[0] || chunks[1].replace(/^.*?\/\/|\/.*$/g, '');
                    default: return (chunks[0] || chunks[1] || chunks[2]) ?? found;
                }
            }
            line_content(path) {
                return this.line_tokens(path).map(({ name, chunks }, index) => {
                    const path2 = [...path, index];
                    switch (name) {
                        case 'embed': return this.Embed(path2);
                        case 'link': return this.Link(path2);
                        case 'text-link-http': return this.Link_http(path2);
                        case 'text-link': return this.Link(path2);
                        case 'image-link': return this.Embed(path2);
                        case 'code': return this.Code_line(path2);
                        case '': return this.String(path2);
                        default: return this.Span(path2);
                    }
                });
            }
            link_uri(path) {
                const token = this.line_token(path);
                const uri = this.uri_resolve(token.chunks[1] ?? token.found);
                if (!uri)
                    throw new Error('Bad link');
                return uri;
            }
            link_host(path) {
                return this.link_uri(path).replace(/^.*?\/\/|\/.*$/g, '');
            }
            auto_scroll() {
                for (const [index, token] of this.flow_tokens().entries()) {
                    if (token.name !== 'header')
                        continue;
                    const header = this.Header(index);
                    if (!header.Link().current())
                        continue;
                    new $mol_after_tick(() => this.ensure_visible(header));
                }
            }
            spoiler_rows(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^[\?] /mg, '').split('\n');
            }
            spoiler_label(index) {
                return this.spoiler_rows(index)[0];
            }
            spoiler_content(index) {
                return this.spoiler_rows(index).slice(1).join('\n');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "flow_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_type", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "rows", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "param", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_level", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_arg", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "pre_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "pre_themes", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "quote_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "list_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "cell_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_head_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cell_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_cell_text", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "uri_base_abs", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "uri_resolve", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_token", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_host", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "auto_scroll", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_label", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_content", null);
        $$.$mol_text = $mol_text;
        class $mol_text_header extends $.$mol_text_header {
            dom_name() {
                return 'h' + this.level();
            }
        }
        $$.$mol_text_header = $mol_text_header;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/text/text/text.view.css", "[mol_text] {\n\tline-height: 1.5em;\n\tbox-sizing: border-box;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 0 0 auto;\n\ttab-size: 4;\n}\n\n[mol_text_paragraph] {\n\tpadding: var(--mol_gap_text);\n\toverflow: auto;\n\toverflow-x: overlay;\n\tmax-width: 100%;\n\tdisplay: block;\n\tmax-width: 60rem;\n\tbreak-inside: avoid;\n}\n\n[mol_text_spoiler_label_paragraph] {\n\tpadding: 0;\n}\n\n[mol_text_span] {\n\tdisplay: inline;\n}\n\n[mol_text_string] {\n\tdisplay: inline;\n\tflex: 0 1 auto;\n\twhite-space: normal;\n}\n\n[mol_text_quote] {\n\tmargin: var(--mol_gap_block);\n\tpadding: var(--mol_gap_block);\n\tbackground: var(--mol_theme_card);\n\tbox-shadow: 0 0 0 1px var(--mol_theme_back);\n\tbreak-inside: avoid;\n}\n\n[mol_text_header] {\n\tdisplay: block;\n\ttext-shadow: 0 0;\n\tfont-weight: normal;\n\tbreak-after: avoid;\n}\n\n* + [mol_text_header] {\n\tmargin-top: 0.75rem;\n}\n\nh1[mol_text_header] {\n\tfont-size: 1.5rem;\n}\n\nh2[mol_text_header] {\n\tfont-size: 1.5rem;\n\tfont-style: italic;\n}\n\nh3[mol_text_header] {\n\tfont-size: 1.25rem;\n}\n\nh4[mol_text_header] {\n\tfont-size: 1.25em;\n\tfont-style: italic;\n}\n\nh5[mol_text_header] {\n\tfont-size: 1rem;\n}\n\nh6[mol_text_header] {\n\tfont-size: 1rem;\n\tfont-style: italic;\n}\n\n[mol_text_header_link] {\n\tcolor: inherit;\n}\n\n[mol_text_table] {\n\tbreak-inside: avoid;\n}\n\n[mol_text_table_cell] {\n\twidth: auto;\n\tdisplay: table-cell;\n\tvertical-align: baseline;\n\tpadding: 0;\n\tborder-radius: 0;\n}\n\n[mol_text_grid] {\n\tbreak-inside: avoid;\n}\n\n[mol_text_grid_cell] {\n\twidth: auto;\n\tdisplay: table-cell;\n\tvertical-align: top;\n\tpadding: 0;\n\tborder-radius: 0;\n}\n\n[mol_text_cut] {\n\tborder: none;\n\twidth: 100%;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_text_link_http],\n[mol_text_link] {\n\tpadding: 0;\n\tdisplay: inline;\n\twhite-space: nowrap;\n}\n\n[mol_text_link_icon] + [mol_text_embed] {\n\tmargin-left: -1.5rem;\n}\n\n[mol_text_embed_youtube] {\n\tdisplay: inline;\n}\n\n[mol_text_embed_youtube_image],\n[mol_text_embed_youtube_frame],\n[mol_text_embed_object] {\n\tobject-fit: contain;\n\tobject-position: center;\n\twidth: 100vw;\n\tmax-height: calc( 100vh - 6rem );\n}\n[mol_text_embed_object_fallback] {\n\tpadding: 0;\n}\n[mol_text_embed_image] {\n\tobject-fit: contain;\n\tobject-position: center;\n\tdisplay: inline;\n\t/* max-height: calc( 100vh - 6rem ); */\n\tvertical-align: top;\n}\n\n[mol_text_pre] {\n\twhite-space: pre;\n\toverflow-x: auto;\n\toverflow-x: overlay;\n\ttab-size: 2;\n\tbreak-inside: avoid;\n}\n\n[mol_text_code_line] {\n\tdisplay: inline-block;\n}\n\n[mol_text_type=\"strong\"] {\n\ttext-shadow: 0 0;\n\tfilter: contrast(1.5);\n}\n\n[mol_text_type=\"emphasis\"] {\n\tfont-style: italic;\n}\n\n[mol_text_type=\"insert\"] {\n\tcolor: var(--mol_theme_special);\n}\n\n[mol_text_type=\"delete\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"remark\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"quote\"] {\n\tfont-style: italic;\n}\n");
})($ || ($ = {}));

;
	($.$mol_row) = class $mol_row extends ($.$mol_view) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/row/row.view.css", "[mol_row] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: flex-start;\n\talign-content: flex-start;\n\tjustify-content: flex-start;\n\tpadding: var(--mol_gap_block);\n\tgap: var(--mol_gap_block);\n\tflex: 0 0 auto;\n\tbox-sizing: border-box;\n\tmax-width: 100%;\n}\n\n[mol_row] > * {\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_check_list) = class $mol_check_list extends ($.$mol_view) {
		option_checked(id, next){
			if(next !== undefined) return next;
			return false;
		}
		option_title(id){
			return "";
		}
		option_label(id){
			return [(this.option_title(id))];
		}
		enabled(){
			return true;
		}
		option_enabled(id){
			return (this.enabled());
		}
		option_hint(id){
			return "";
		}
		items(){
			return [];
		}
		dictionary(){
			return {};
		}
		Option(id){
			const obj = new this.$.$mol_check();
			(obj.checked) = (next) => ((this.option_checked(id, next)));
			(obj.label) = () => ((this.option_label(id)));
			(obj.enabled) = () => ((this.option_enabled(id)));
			(obj.hint) = () => ((this.option_hint(id)));
			(obj.minimal_height) = () => (24);
			return obj;
		}
		options(){
			return {};
		}
		keys(){
			return [];
		}
		sub(){
			return (this.items());
		}
	};
	($mol_mem_key(($.$mol_check_list.prototype), "option_checked"));
	($mol_mem_key(($.$mol_check_list.prototype), "Option"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * List of checkboxes
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_list_demo
         */
        class $mol_check_list extends $.$mol_check_list {
            options() {
                return {};
            }
            dictionary(next) {
                return next ?? {};
            }
            option_checked(id, next) {
                const prev = this.dictionary();
                if (next === undefined)
                    return prev[id] ?? null;
                const next_rec = { ...prev, [id]: next };
                if (next === null)
                    delete next_rec[id];
                return this.dictionary(next_rec)[id] ?? null;
            }
            keys() {
                return Object.keys(this.options());
            }
            items() {
                return this.keys().map(key => this.Option(key));
            }
            option_title(key) {
                return this.options()[key] || key;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_check_list.prototype, "keys", null);
        __decorate([
            $mol_mem
        ], $mol_check_list.prototype, "items", null);
        $$.$mol_check_list = $mol_check_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/list/list.view.css", "[mol_check_list] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tflex: 1 1 auto;\n\tborder-radius: var(--mol_gap_round);\n\tgap: 1px;\n}\n\n[mol_check_list_option] {\n\tflex: 0 1 auto;\n}\n\n[mol_check_list_option]:where([mol_check_checked=\"true\"]) {\n\ttext-shadow: 0 0;\n\tcolor: var(--mol_theme_current);\n}\n\n[mol_check_list_option]:where([mol_check_checked=\"true\"][disabled]) {\n\tcolor: var(--mol_theme_text);\n}\n");
})($ || ($ = {}));

;
	($.$mol_switch) = class $mol_switch extends ($.$mol_check_list) {
		value(next){
			if(next !== undefined) return next;
			return "";
		}
	};
	($mol_mem(($.$mol_switch.prototype), "value"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Buttons which switching the state
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_switch_demo
         */
        class $mol_switch extends $.$mol_switch {
            value(next) {
                return $mol_state_session.value(`${this}.value()`, next) ?? '';
            }
            option_checked(key, next) {
                if (next === undefined)
                    return this.value() == key;
                this.value(next ? key : '');
                return next;
            }
        }
        $$.$mol_switch = $mol_switch;
    })($$ = $.$$ || ($.$$ = {}));
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
	($.$mol_page) = class $mol_page extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		Logo(){
			return null;
		}
		title_content(){
			return [(this.Logo()), (this.title())];
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h1");
			(obj.sub) = () => ((this.title_content()));
			return obj;
		}
		tools(){
			return [];
		}
		Tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.tools()));
			return obj;
		}
		head(){
			return [(this.Title()), (this.Tools())];
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (64);
			(obj.dom_name) = () => ("header");
			(obj.sub) = () => ((this.head()));
			return obj;
		}
		body_scroll_top(next){
			return (this.Body().scroll_top(next));
		}
		body(){
			return [];
		}
		Body_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.body()));
			return obj;
		}
		body_content(){
			return [(this.Body_content())];
		}
		Body(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ((this.body_content()));
			return obj;
		}
		foot(){
			return [];
		}
		Foot(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("footer");
			(obj.sub) = () => ((this.foot()));
			return obj;
		}
		dom_name(){
			return "article";
		}
		attr(){
			return {...(super.attr()), "tabIndex": (this.tabindex())};
		}
		sub(){
			return [
				(this.Head()), 
				(this.Body()), 
				(this.Foot())
			];
		}
	};
	($mol_mem(($.$mol_page.prototype), "Title"));
	($mol_mem(($.$mol_page.prototype), "Tools"));
	($mol_mem(($.$mol_page.prototype), "Head"));
	($mol_mem(($.$mol_page.prototype), "Body_content"));
	($mol_mem(($.$mol_page.prototype), "Body"));
	($mol_mem(($.$mol_page.prototype), "Foot"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem } = $mol_style_unit;
        const { hsla, blur } = $mol_style_func;
        $mol_style_define($mol_page, {
            display: 'flex',
            flex: {
                basis: 'auto',
                direction: 'column',
            },
            position: 'relative',
            alignSelf: 'stretch',
            maxWidth: per(100),
            maxHeight: per(100),
            boxSizing: 'border-box',
            color: $mol_theme.text,
            // backdropFilter: blur( `3px` ), enforces layering
            // zIndex: 0 ,
            ':focus': {
                outline: 'none',
            },
            Head: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                flex: 'none',
                position: 'relative',
                margin: 0,
                minHeight: rem(4),
                padding: $mol_gap.block,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 2,
                '@media': {
                    'print': {
                        box: {
                            shadow: [[0, `1px`, 0, 0, hsla(0, 0, 0, .25)]],
                        },
                    },
                },
            },
            Title: {
                minHeight: rem(2),
                margin: 0,
                padding: $mol_gap.text,
                gap: $mol_gap.text,
                wordBreak: 'normal',
                textShadow: '0 0',
                font: {
                    size: 'inherit',
                    weight: 'normal',
                },
                flex: {
                    grow: 1,
                    shrink: 1,
                    basis: 'auto',
                },
            },
            Tools: {
                flex: {
                    basis: 'auto',
                    grow: 0,
                    shrink: 1,
                },
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                '@media': {
                    'print': {
                        display: 'none',
                    },
                },
            },
            Body: {
                flex: {
                    grow: 1000,
                    shrink: 1,
                    basis: per(100),
                },
            },
            Body_content: {
                padding: $mol_gap.block,
                minHeight: 0,
                minWidth: 0,
                flex: {
                    direction: 'column',
                    shrink: 1,
                    grow: 1,
                },
                justify: {
                    self: 'stretch',
                },
            },
            Foot: {
                display: 'flex',
                justifyContent: 'space-between',
                flex: 'none',
                margin: 0,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 1,
                padding: $mol_gap.block,
                ':empty': {
                    display: 'none',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text_list) = class $mol_text_list extends ($.$mol_text) {
		type(){
			return "";
		}
		auto_scroll(){
			return null;
		}
		attr(){
			return {...(super.attr()), "mol_text_list_type": (this.type())};
		}
		Paragraph(id){
			const obj = new this.$.$mol_text_list_item();
			(obj.index) = () => ((this.item_index(id)));
			(obj.sub) = () => ((this.block_content(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_text_list.prototype), "Paragraph"));
	($.$mol_text_list_item) = class $mol_text_list_item extends ($.$mol_paragraph) {
		index(){
			return 0;
		}
		attr(){
			return {...(super.attr()), "mol_text_list_item_index": (this.index())};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/text/list/list.view.css", "[mol_text_list] {\r\n\tpadding-left: 1.75rem;\r\n}\r\n\r\n[mol_text_list_item] {\r\n\tcontain: none;\r\n\tdisplay: list-item;\r\n}\r\n\r\n[mol_text_list_item]::before {\r\n\tcontent: attr( mol_text_list_item_index ) \".\";\r\n\twidth: 1.25rem;\r\n\tdisplay: inline-block;\r\n\tposition: absolute;\r\n\tmargin-left: -1.75rem;\r\n\ttext-align: end;\r\n}\r\n\r\n[mol_text_list_type=\"-\"] > [mol_text_list_item]::before,\r\n[mol_text_list_type=\"*\"] > [mol_text_list_item]::before {\r\n\tcontent: \"•\";\r\n}\r\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    /**
     * Docs content registry for smalljs. GENERATED by content/gen.cjs — do not
     * edit by hand; edit the .md sources in content/en/docs/ and re-run the
     * generator. Markdown is embedded (not fetched) so it bundles into web.js
     * and works with the app/- deploy and the prerender step.
     */
    class $bog_smalljs_content extends $mol_object2 {
        static sections() {
            return [
                {
                    "id": "docs",
                    "title": "Docs",
                    "groups": [
                        {
                            "title": "Getting Started",
                            "pages": [
                                "introduction",
                                "getting-started"
                            ]
                        },
                        {
                            "title": "Essentials",
                            "pages": [
                                "installation",
                                "views",
                                "state",
                                "routing",
                                "rendering"
                            ]
                        },
                        {
                            "title": "Data",
                            "pages": [
                                "data",
                                "giper-baza"
                            ]
                        },
                        {
                            "title": "More",
                            "pages": [
                                "showcase",
                                "rosetta"
                            ]
                        },
                        {
                            "title": "Advanced",
                            "pages": [
                                "plugins",
                                "meta",
                                "ghost"
                            ]
                        },
                        {
                            "title": "About",
                            "pages": [
                                "faq",
                                "team",
                                "releases"
                            ]
                        },
                        {
                            "title": "API",
                            "pages": [
                                "api-mol-button-major",
                                "api-mol-button-minor",
                                "api-mol-string",
                                "api-mol-number",
                                "api-mol-text",
                                "api-mol-paragraph",
                                "api-mol-list",
                                "api-mol-row",
                                "api-mol-link",
                                "api-mol-check",
                                "api-mol-switch",
                                "api-mol-select",
                                "api-mol-scroll",
                                "api-mol-page",
                                "api-mol-pick"
                            ]
                        }
                    ]
                }
            ];
        }
        static pages() {
            return {
                'introduction': {
                    slug: 'introduction',
                    title: "Introduction",
                    file: 'content/en/docs/introduction.md',
                    md: "# Introduction\n\n## What is \u0024mol?\n\n\u0024mol is a reactive UI framework where you describe **what** the interface is, and the framework figures out **how** and **when** to update it. No virtual DOM, no manual subscriptions, no `useEffect`. You write components as a tree; \u0024mol renders only what is visible and recomputes only what actually changed.\n\nA component has three files:\n\n- `name.view.tree` — the declarative layout (a compact tree language)\n- `name.view.ts` — the behaviour (plain TypeScript classes)\n- `name.view.css.ts` — typed styles (checked by the compiler)\n\nThat separation is the whole idea: layout stays readable, logic stays testable, styles stay type-safe.\n\n## Who is it for?\n\n- You want a **small** app that stays small as it grows — the runtime is compact and rendering is virtualized by default.\n- You like **types everywhere** — even styles are checked by TypeScript.\n- You are tired of wiring reactivity by hand — state in \u0024mol is automatically reactive, like a spreadsheet.\n\n## A taste\n\nA counter, in full:\n\n```tree\n\u0024my_counter \u0024mol_view\n\tsub /\n\t\t<= Count \u0024mol_view\n\t\t\tsub / <= count \\\n\t\t<= Increment \u0024mol_button\n\t\t\tclick? <=> increment?\n\t\t\tsub / <= label \\+\n```\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_counter extends \u0024.\u0024my_counter {\n\t\t@ \u0024mol_mem count() { return 0 }\n\t\t@ \u0024mol_action increment() { this.count( this.count() + 1 ) }\n\t}\n}\n```\n\n`count` is reactive: anything that reads it re-renders automatically when it changes. There is no `setState`, no dependency array, no store to register.\n\n## Where to next?\n\nReady to run something on your own machine? Head to [Getting Started](#!section=docs/page=getting-started) and build a working app in under fifteen minutes.\n",
                    tr: {
                        ru: {
                            title: "Введение",
                            md: "# Введение\n\n## Что такое \u0024mol?\n\n\u0024mol — это реактивный UI-фреймворк, где вы описываете, **что** представляет собой интерфейс, а фреймворк сам решает, **как** и **когда** его обновлять. Никакого виртуального DOM, ручных подписок и `useEffect`. Вы описываете компоненты деревом; \u0024mol рендерит только видимое и пересчитывает только то, что действительно изменилось.\n\nКомпонент состоит из трёх файлов:\n\n- `name.view.tree` — декларативная разметка (компактный древовидный язык)\n- `name.view.ts` — поведение (обычные классы TypeScript)\n- `name.view.css.ts` — типизированные стили (проверяются компилятором)\n\nВ этом разделении и заключается вся идея: разметка остаётся читаемой, логика — тестируемой, стили — типобезопасными.\n\n## Для кого он?\n\n- Вам нужно **небольшое** приложение, которое остаётся небольшим по мере роста — рантайм компактный, а рендеринг по умолчанию виртуализирован.\n- Вы любите **типы повсюду** — даже стили проверяются TypeScript.\n- Вы устали связывать реактивность вручную — состояние в \u0024mol реактивно автоматически, как в электронной таблице.\n\n## На вкус\n\nСчётчик целиком:\n\n```tree\n\u0024my_counter \u0024mol_view\n\tsub /\n\t\t<= Count \u0024mol_view\n\t\t\tsub / <= count \\\n\t\t<= Increment \u0024mol_button\n\t\t\tclick? <=> increment?\n\t\t\tsub / <= label \\+\n```\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_counter extends \u0024.\u0024my_counter {\n\t\t@ \u0024mol_mem count() { return 0 }\n\t\t@ \u0024mol_action increment() { this.count( this.count() + 1 ) }\n\t}\n}\n```\n\n`count` реактивен: всё, что его читает, перерисовывается автоматически при изменении. Нет ни `setState`, ни массива зависимостей, ни стора, который нужно регистрировать.\n\n## Куда дальше?\n\nГотовы запустить что-нибудь на своей машине? Загляните в [Быстрый старт](#!section=docs/page=getting-started) и соберите рабочее приложение меньше чем за пятнадцать минут.\n",
                        },
                    },
                },
                'getting-started': {
                    slug: 'getting-started',
                    title: "Getting Started",
                    file: 'content/en/docs/getting-started.md',
                    md: "# Getting Started\n\nThis page takes you from an empty folder to a running, reactive \u0024mol app. It should take about fifteen minutes. Every snippet below is real, working code — copy it as-is.\n\n## What you need\n\n- **Node.js 18+** and **git**. That is the whole list.\n\nYou do not install a global CLI or generate boilerplate you have to understand later. \u0024mol apps live inside the MAM workspace, which already knows how to build and serve them.\n\n## 1. Get the workspace\n\nMAM is the build tool and module registry for \u0024mol. Clone it and install once:\n\n```bash\ngit clone https://github.com/hyoo-ru/mam.git ./mam\ncd mam\nnpm install\nnpm start\n```\n\n`npm start` launches the dev server on `http://localhost:9080/`. It watches your files and rebuilds automatically — leave it running in its own terminal.\n\n## 2. Create a module\n\nA \u0024mol app is just a folder. Pick a namespace (yours, e.g. `my`) and a name (`hello`):\n\n```bash\nmkdir -p my/hello\n```\n\n> **One rule to remember:** underscores in a component name are folder separators. `\u0024my_hello` lives in `my/hello/`, `\u0024my_hello_form` would live in `my/hello/form/`. Module folder names never contain an underscore.\n\nNow add three files inside `my/hello/`.\n\n### index.html — the entry point\n\n```html\n<!doctype html>\n<html mol_view_root>\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t</head>\n\t<body mol_view_root>\n\t\t<div mol_view_root=\"\u0024my_hello\"></div>\n\t\t<script src=\"web.js\"></script>\n\t</body>\n</html>\n```\n\nThe `mol_view_root=\"\u0024my_hello\"` attribute mounts your component when the page loads.\n\n### hello.view.tree — the layout\n\n```tree\n\u0024my_hello \u0024mol_page\n\ttitle @ \\Greeting\n\tbody /\n\t\t<= Name \u0024mol_string\n\t\t\thint @ \\Enter your name\n\t\t\tvalue? <=> name? \\\n\t\t<= Message \u0024mol_view\n\t\t\tsub / <= greeting \\\n```\n\nA few things worth naming:\n\n- `\u0024mol_page` and `\u0024mol_string` are built-in components — a page shell and a text input.\n- `<=` binds a property one way; `<=>` binds two ways. So `value? <=> name?` keeps the input and your `name` state in sync.\n- `@` marks a localizable string; `\\` starts a raw string.\n\n### hello.view.ts — the behaviour\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_hello extends \u0024.\u0024my_hello {\n\t\t@ \u0024mol_mem\n\t\tgreeting() {\n\t\t\tconst name = this.name()\n\t\t\treturn name ? `Hello, \u0024{name}!` : 'Please enter your name'\n\t\t}\n\t}\n}\n```\n\n`@ \u0024mol_mem` makes `greeting` a reactive, cached property. It reads `name()`, so the moment `name` changes, `greeting` recomputes and the message on screen updates. You never wrote a subscription, an effect, or a re-render call.\n\n## 3. Run it\n\nThe dev server from step 1 is already watching. Just open:\n\n```\nhttp://localhost:9080/my/hello/\n```\n\nType your name — the greeting updates as you type. That is \u0024mol reactivity: state flows to the view on its own.\n\n## 4. Add a second reactive value\n\nReactivity composes. Add a length counter that depends on the same `name`, with no extra wiring.\n\nIn `hello.view.tree`, add a line under `Message`:\n\n```tree\n\t\t<= Counter \u0024mol_view\n\t\t\tsub / <= counter \\\n```\n\nIn `hello.view.ts`, add the method:\n\n```typescript\n\t\t@ \u0024mol_mem\n\t\tcounter() {\n\t\t\treturn `\u0024{this.name().length} characters`\n\t\t}\n}\n```\n\nBoth `greeting` and `counter` read `name`; both update together. Add a third, add a tenth — the pattern does not change. This is why \u0024mol code stays flat as features pile up.\n\n## 5. Check your build\n\nMAM writes a diagnostics file next to every app. After a build, open:\n\n```\nhttp://localhost:9080/my/hello/-/web.audit.js\n```\n\nA clean audit means no unused deps, no type problems, nothing to fix. Make a habit of glancing at it — it catches mistakes before they reach a browser.\n\n## You built a \u0024mol app\n\nYou have a reactive component, two-way binding, and derived state — with three small files and zero configuration.\n\nKeep going: the **[Guide](#!section=docs/page=installation)** covers installation, views, state, routing, and data in depth — and turns this Hello World into something real.\n",
                    tr: {
                        ru: {
                            title: "Быстрый старт",
                            md: "# Быстрый старт\n\nЭта страница проведёт вас от пустой папки до работающего реактивного \u0024mol-приложения. Займёт около пятнадцати минут. Каждый фрагмент ниже — настоящий рабочий код, копируйте как есть.\n\n## Что понадобится\n\n- **Node.js 18+** и **git**. Это весь список.\n\nВам не нужно устанавливать глобальный CLI или генерировать шаблонный код, в котором потом придётся разбираться. \u0024mol-приложения живут внутри воркспейса MAM, который уже умеет их собирать и раздавать.\n\n## 1. Получите воркспейс\n\nMAM — это инструмент сборки и реестр модулей для \u0024mol. Склонируйте его и установите зависимости один раз:\n\n```bash\ngit clone https://github.com/hyoo-ru/mam.git ./mam\ncd mam\nnpm install\nnpm start\n```\n\n`npm start` запускает дев-сервер на `http://localhost:9080/`. Он следит за файлами и пересобирает автоматически — оставьте его работать в отдельном терминале.\n\n## 2. Создайте модуль\n\n\u0024mol-приложение — это просто папка. Выберите пространство имён (своё, например `my`) и имя (`hello`):\n\n```bash\nmkdir -p my/hello\n```\n\n> **Одно правило, которое стоит запомнить:** подчёркивания в имени компонента — это разделители папок. `\u0024my_hello` живёт в `my/hello/`, а `\u0024my_hello_form` жил бы в `my/hello/form/`. Имена папок-модулей никогда не содержат подчёркивания.\n\nТеперь добавьте три файла внутрь `my/hello/`.\n\n### index.html — точка входа\n\n```html\n<!doctype html>\n<html mol_view_root>\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t</head>\n\t<body mol_view_root>\n\t\t<div mol_view_root=\"\u0024my_hello\"></div>\n\t\t<script src=\"web.js\"></script>\n\t</body>\n</html>\n```\n\nАтрибут `mol_view_root=\"\u0024my_hello\"` монтирует ваш компонент при загрузке страницы.\n\n### hello.view.tree — разметка\n\n```tree\n\u0024my_hello \u0024mol_page\n\ttitle @ \\Greeting\n\tbody /\n\t\t<= Name \u0024mol_string\n\t\t\thint @ \\Enter your name\n\t\t\tvalue? <=> name? \\\n\t\t<= Message \u0024mol_view\n\t\t\tsub / <= greeting \\\n```\n\nПара моментов, которые стоит назвать:\n\n- `\u0024mol_page` и `\u0024mol_string` — встроенные компоненты: каркас страницы и текстовое поле.\n- `<=` связывает свойство в одну сторону; `<=>` — в обе. Так `value? <=> name?` держит поле ввода и ваше состояние `name` синхронными.\n- `@` помечает локализуемую строку; `\\` начинает сырую строку.\n\n### hello.view.ts — поведение\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_hello extends \u0024.\u0024my_hello {\n\t\t@ \u0024mol_mem\n\t\tgreeting() {\n\t\t\tconst name = this.name()\n\t\t\treturn name ? `Hello, \u0024{name}!` : 'Please enter your name'\n\t\t}\n\t}\n}\n```\n\n`@ \u0024mol_mem` делает `greeting` реактивным кешируемым свойством. Оно читает `name()`, поэтому в момент изменения `name` свойство `greeting` пересчитывается, и сообщение на экране обновляется. Вы не написали ни подписки, ни эффекта, ни вызова перерисовки.\n\n## 3. Запустите\n\nДев-сервер из шага 1 уже следит за файлами. Просто откройте:\n\n```\nhttp://localhost:9080/my/hello/\n```\n\nВведите имя — приветствие обновляется по мере ввода. Это и есть реактивность \u0024mol: состояние само перетекает во вью.\n\n## 4. Добавьте второе реактивное значение\n\nРеактивность композируется. Добавьте счётчик длины, который зависит от того же `name`, без единой лишней связки.\n\nВ `hello.view.tree` добавьте строку под `Message`:\n\n```tree\n\t\t<= Counter \u0024mol_view\n\t\t\tsub / <= counter \\\n```\n\nВ `hello.view.ts` добавьте метод:\n\n```typescript\n\t\t@ \u0024mol_mem\n\t\tcounter() {\n\t\t\treturn `\u0024{this.name().length} characters`\n\t\t}\n}\n```\n\nИ `greeting`, и `counter` читают `name`; оба обновляются вместе. Добавьте третье, добавьте десятое — паттерн не меняется. Именно поэтому \u0024mol-код остаётся плоским по мере роста числа фич.\n\n## 5. Проверьте сборку\n\nMAM пишет файл диагностики рядом с каждым приложением. После сборки откройте:\n\n```\nhttp://localhost:9080/my/hello/-/web.audit.js\n```\n\nЧистый аудит означает: ни неиспользуемых зависимостей, ни проблем с типами, чинить нечего. Заведите привычку заглядывать в него — он ловит ошибки до того, как они дойдут до браузера.\n\n## Вы собрали \u0024mol-приложение\n\nУ вас есть реактивный компонент, двустороннее связывание и производное состояние — три маленьких файла и ноль конфигурации.\n\nПродолжайте: **[Руководство](#!section=docs/page=installation)** подробно разбирает установку, вью, состояние, роутинг и данные — и превращает этот Hello World во что-то настоящее.\n",
                        },
                    },
                },
                'installation': {
                    slug: 'installation',
                    title: "Installation",
                    file: 'content/en/docs/installation.md',
                    md: "# Installation\n\n[Getting Started](#!section=docs/page=getting-started) walks you through your first app step by step. This page is the reference: how a \u0024mol project is laid out and how the build works.\n\n## Requirements\n\n- **Node.js 18+** and **git**. Nothing else is installed globally.\n\n## The MAM workspace\n\n\u0024mol apps live inside **MAM** — the build tool and module registry. You clone it once and develop your modules inside it:\n\n```bash\ngit clone https://github.com/hyoo-ru/mam.git ./mam\ncd mam\nnpm install\nnpm start\n```\n\n`npm start` runs a watching dev server on `http://localhost:9080/`. It rebuilds on save and resolves dependencies automatically — you never maintain a bundler config.\n\n## How modules are named\n\nEvery component name maps to a folder path, and **each underscore is a folder separator**:\n\n```\n\u0024my_app          →  my/app/\n\u0024my_app_header   →  my/app/header/\n```\n\nModule folder names never contain an underscore — use nested folders for multi-word names. If a component you use never shows up in the bundle, the folder path almost always doesn't match the class name.\n\n## Anatomy of a module\n\nA component is a folder with up to four files:\n\n| File | Purpose |\n|------|---------|\n| `name.view.tree` | Declarative layout |\n| `name.view.ts` | Behaviour (TypeScript) |\n| `name.view.css.ts` | Typed styles |\n| `name.view.tree`, `index.html` | Entry point for an app module |\n\nThe `index.html` of an app mounts the root component:\n\n```html\n<body mol_view_root>\n\t<div mol_view_root=\"\u0024my_app\"></div>\n\t<script src=\"web.js\"></script>\n</body>\n```\n\n## Building for production\n\nThe dev server builds on the fly, but you can build any module explicitly from the workspace root:\n\n```bash\nnpm run start my/app\n```\n\nThe output lands in `my/app/-/` — including `web.js`, `web.css`, and `web.audit.js`. **Always check the audit:** a clean `web.audit.js` means no unused dependencies and no type errors.\n\n## Adding npm packages\n\nReference a package with `require` and MAM installs it on the next build:\n\n```typescript\nconst dayjs = require\u0028 'dayjs' ) as typeof import\u0028 'dayjs' )\n```\n\n## Next\n\nWith the workspace in place, learn how the UI itself is described — continue to [Views](#!section=docs/page=views).\n",
                    tr: {
                        ru: {
                            title: "Установка",
                            md: "# Установка\n\n[Быстрый старт](#!section=docs/page=getting-started) проведёт вас через первое приложение шаг за шагом. Эта страница — справочник: как устроен \u0024mol-проект и как работает сборка.\n\n## Требования\n\n- **Node.js 18+** и **git**. Ничего больше глобально не ставится.\n\n## Воркспейс MAM\n\n\u0024mol-приложения живут внутри **MAM** — инструмента сборки и реестра модулей. Вы клонируете его один раз и разрабатываете свои модули внутри:\n\n```bash\ngit clone https://github.com/hyoo-ru/mam.git ./mam\ncd mam\nnpm install\nnpm start\n```\n\n`npm start` поднимает следящий дев-сервер на `http://localhost:9080/`. Он пересобирает при сохранении и разрешает зависимости автоматически — вам не нужно поддерживать конфиг сборщика.\n\n## Как именуются модули\n\nКаждое имя компонента соответствует пути к папке, и **каждое подчёркивание — разделитель папок**:\n\n```\n\u0024my_app          →  my/app/\n\u0024my_app_header   →  my/app/header/\n```\n\nИмена папок-модулей никогда не содержат подчёркивания — для составных имён используйте вложенные папки. Если используемый компонент никак не попадает в бандл, почти всегда путь к папке не совпадает с именем класса.\n\n## Анатомия модуля\n\nКомпонент — это папка с максимум четырьмя файлами:\n\n| Файл | Назначение |\n|------|-----------|\n| `name.view.tree` | Декларативная разметка |\n| `name.view.ts` | Поведение (TypeScript) |\n| `name.view.css.ts` | Типизированные стили |\n| `name.view.tree`, `index.html` | Точка входа для модуля-приложения |\n\n`index.html` приложения монтирует корневой компонент:\n\n```html\n<body mol_view_root>\n\t<div mol_view_root=\"\u0024my_app\"></div>\n\t<script src=\"web.js\"></script>\n</body>\n```\n\n## Сборка для продакшена\n\nДев-сервер собирает на лету, но любой модуль можно собрать явно из корня воркспейса:\n\n```bash\nnpm run start my/app\n```\n\nРезультат оказывается в `my/app/-/` — включая `web.js`, `web.css` и `web.audit.js`. **Всегда проверяйте аудит:** чистый `web.audit.js` означает отсутствие неиспользуемых зависимостей и ошибок типов.\n\n## Подключение npm-пакетов\n\nСошлитесь на пакет через `require`, и MAM установит его при следующей сборке:\n\n```typescript\nconst dayjs = require\u0028 'dayjs' ) as typeof import\u0028 'dayjs' )\n```\n\n## Дальше\n\nКогда воркспейс на месте, узнайте, как описывается сам интерфейс — переходите к [Вью](#!section=docs/page=views).\n",
                        },
                    },
                },
                'views': {
                    slug: 'views',
                    title: "Views",
                    file: 'content/en/docs/views.md',
                    md: "# Views\n\nA view is a component: a node in the UI tree with its own layout, behaviour, and styles. This chapter covers how views are declared, wired to logic, composed, and reused.\n\n## Three files, one component\n\nA component `\u0024my_card` lives in `my/card/` and is described by up to three files, each with a clear job:\n\n- `card.view.tree` — **what** the component is: its structure and default bindings.\n- `card.view.ts` — **how** it behaves: TypeScript methods, reactive state.\n- `card.view.css.ts` — how it looks: typed styles checked by the compiler.\n\nKeeping structure, behaviour, and style apart is deliberate — each file stays small and readable, and the layout is never tangled with logic.\n\n## The view.tree language\n\n`view.tree` describes structure declaratively. Indentation is nesting; there are no closing tags.\n\n```tree\n\u0024my_card \u0024mol_view\n\tsub /\n\t\t<= Title \u0024mol_view\n\t\t\tsub / <= title \\\n\t\t<= Body \u0024mol_view\n\t\t\tsub / <= text \\\n```\n\n- `\u0024my_card \u0024mol_view` — your component extends the base `\u0024mol_view`.\n- `sub /` — the list of children.\n- `<= Title \u0024mol_view` — a named sub-view, addressable as `this.Title()` in TypeScript.\n- `<= title \\` — a bindable property with a default raw-string value (`\\` starts a raw string).\n\nEvery capitalized name (`Title`, `Body`) becomes a real property you can reach, override, or style. Every lowercase binding (`title`, `text`) becomes a value you can compute in `.view.ts`.\n\n## Binding properties\n\nTwo operators connect a property to its source:\n\n- `<=` **one-way**: the child reads a value from the owner.\n- `<=>` **two-way**: the value flows both directions — used for inputs.\n\n```tree\n\u0024my_form \u0024mol_view\n\tsub /\n\t\t<= Field \u0024mol_string\n\t\t\tvalue? <=> text? \\\n```\n\nHere the input's `value` and the owner's `text` stay in sync automatically: type in the field and `text` updates; set `text` in code and the field reflects it.\n\n## Wiring to behaviour\n\nA binding with no default is implemented in `.view.ts`. The class extends the generated base of the same name:\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_card extends \u0024.\u0024my_card {\n\t\t@ \u0024mol_mem\n\t\ttitle() {\n\t\t\treturn 'Untitled'\n\t\t}\n\t}\n}\n```\n\nAnything the template binds — `title`, `text`, a sub-view's property — can be given logic here. Reactivity ([State](#!section=docs/page=state)) makes those values live.\n\n## Attributes and element type\n\nChange the underlying HTML element with `dom_name`, and set attributes through `attr`:\n\n```tree\n\u0024my_banner \u0024mol_view\n\tdom_name \\section\n\tattr *\n\t\t^\n\t\trole \\note\n```\n\nThe `^` inherits the parent's attributes so you don't drop the ones `\u0024mol_view` already sets.\n\n## Lists and keyed views\n\nA trailing `*` turns a sub-view into a family — one instance per key. Use it for rows:\n\n```tree\n\u0024my_list \u0024mol_list\n\trows /\n\t\t<= Row* \u0024mol_view\n\t\t\tsub / <= row_title* \\\n```\n\nThe framework creates a `Row` for each key you supply and, thanks to [virtualized rendering](#!section=docs/page=rendering), builds only the ones on screen.\n\n> When a keyed view itself contains keyed children, key the outer one with `Name*`, not `Name*0` — the indexed form leaves nested children unrendered.\n\n## Conditional views\n\nAssigning `null` removes a view from rendering. Subclass and null out what a variant doesn't need:\n\n```tree\n\u0024my_page_readonly \u0024my_page\n\tEdit_button null\n```\n\n## Composition and reuse\n\nViews compose by nesting, and specialize by extension. A card used inside a list:\n\n```tree\n\u0024my_user_card \u0024mol_view\n\tsub /\n\t\t<= Name \u0024mol_view\n\t\t\tsub / <= name \\\n\t\t<= Email \u0024mol_view\n\t\t\tsub / <= email \\\n\n\u0024my_users_list \u0024mol_list\n\trows /\n\t\t<= User* \u0024my_user_card\n\t\t\tname <= user_name* \\\n\t\t\temail <= user_email* \\\n```\n\n`\u0024my_users_list` never redefines what a card looks like — it reuses `\u0024my_user_card` and feeds each instance its data. This is the whole composition model: small views, wired together, specialized by `extends` when a variant is needed.\n\n## Next\n\nViews describe structure; what makes them come alive is reactive data. Continue to [State & Reactivity](#!section=docs/page=state).\n",
                    tr: {
                        ru: {
                            title: "Вью",
                            md: "# Вью\n\nВью — это компонент: узел в дереве интерфейса со своей разметкой, поведением и стилями. Эта глава о том, как вью объявляются, связываются с логикой, композируются и переиспользуются.\n\n## Три файла, один компонент\n\nКомпонент `\u0024my_card` живёт в `my/card/` и описывается максимум тремя файлами, у каждого — своя роль:\n\n- `card.view.tree` — **что** представляет собой компонент: его структура и связывания по умолчанию.\n- `card.view.ts` — **как** он ведёт себя: методы TypeScript, реактивное состояние.\n- `card.view.css.ts` — как он выглядит: типизированные стили, проверяемые компилятором.\n\nРазделение структуры, поведения и стиля сделано намеренно — каждый файл остаётся маленьким и читаемым, а разметка никогда не переплетается с логикой.\n\n## Язык view.tree\n\n`view.tree` описывает структуру декларативно. Отступ — это вложенность; закрывающих тегов нет.\n\n```tree\n\u0024my_card \u0024mol_view\n\tsub /\n\t\t<= Title \u0024mol_view\n\t\t\tsub / <= title \\\n\t\t<= Body \u0024mol_view\n\t\t\tsub / <= text \\\n```\n\n- `\u0024my_card \u0024mol_view` — ваш компонент наследует базовый `\u0024mol_view`.\n- `sub /` — список дочерних элементов.\n- `<= Title \u0024mol_view` — именованное под-вью, доступное как `this.Title()` в TypeScript.\n- `<= title \\` — связываемое свойство со значением-строкой по умолчанию (`\\` начинает сырую строку).\n\nКаждое имя с большой буквы (`Title`, `Body`) становится настоящим свойством, к которому можно обратиться, переопределить или стилизовать. Каждое связывание с маленькой буквы (`title`, `text`) становится значением, которое можно вычислить в `.view.ts`.\n\n## Связывание свойств\n\nДва оператора соединяют свойство с его источником:\n\n- `<=` **в одну сторону**: ребёнок читает значение у владельца.\n- `<=>` **в обе стороны**: значение течёт в обоих направлениях — используется для полей ввода.\n\n```tree\n\u0024my_form \u0024mol_view\n\tsub /\n\t\t<= Field \u0024mol_string\n\t\t\tvalue? <=> text? \\\n```\n\nЗдесь `value` поля ввода и `text` владельца остаются синхронными автоматически: пишете в поле — обновляется `text`; задаёте `text` в коде — поле это отражает.\n\n## Связь с поведением\n\nСвязывание без значения по умолчанию реализуется в `.view.ts`. Класс наследует сгенерированную базу с тем же именем:\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_card extends \u0024.\u0024my_card {\n\t\t@ \u0024mol_mem\n\t\ttitle() {\n\t\t\treturn 'Untitled'\n\t\t}\n\t}\n}\n```\n\nВсему, что связывает шаблон — `title`, `text`, свойство под-вью — можно задать логику здесь. Реактивность ([Состояние](#!section=docs/page=state)) делает эти значения живыми.\n\n## Атрибуты и тип элемента\n\nСмените нижележащий HTML-элемент через `dom_name`, а атрибуты задайте через `attr`:\n\n```tree\n\u0024my_banner \u0024mol_view\n\tdom_name \\section\n\tattr *\n\t\t^\n\t\trole \\note\n```\n\n`^` наследует атрибуты родителя, чтобы не потерять те, что `\u0024mol_view` уже проставляет.\n\n## Списки и ключевые вью\n\nХвостовая `*` превращает под-вью в семейство — по одному экземпляру на ключ. Используйте для строк:\n\n```tree\n\u0024my_list \u0024mol_list\n\trows /\n\t\t<= Row* \u0024mol_view\n\t\t\tsub / <= row_title* \\\n```\n\nФреймворк создаёт `Row` для каждого переданного ключа и, благодаря [виртуализированному рендерингу](#!section=docs/page=rendering), строит только те, что на экране.\n\n> Когда ключевое вью само содержит ключевых детей, ключуйте внешнее как `Name*`, а не `Name*0` — индексированная форма оставляет вложенных детей неотрендеренными.\n\n## Условные вью\n\nПрисваивание `null` убирает вью из рендеринга. Наследуйтесь и обнуляйте то, что варианту не нужно:\n\n```tree\n\u0024my_page_readonly \u0024my_page\n\tEdit_button null\n```\n\n## Композиция и переиспользование\n\nВью композируются вложением и специализируются наследованием. Карточка, используемая внутри списка:\n\n```tree\n\u0024my_user_card \u0024mol_view\n\tsub /\n\t\t<= Name \u0024mol_view\n\t\t\tsub / <= name \\\n\t\t<= Email \u0024mol_view\n\t\t\tsub / <= email \\\n\n\u0024my_users_list \u0024mol_list\n\trows /\n\t\t<= User* \u0024my_user_card\n\t\t\tname <= user_name* \\\n\t\t\temail <= user_email* \\\n```\n\n`\u0024my_users_list` не переопределяет, как выглядит карточка — он переиспользует `\u0024my_user_card` и кормит каждый экземпляр его данными. В этом и вся модель композиции: маленькие вью, связанные вместе, специализированные через `extends`, когда нужен вариант.\n\n## Дальше\n\nВью описывают структуру; оживляют их реактивные данные. Переходите к [Состоянию и реактивности](#!section=docs/page=state).\n",
                        },
                    },
                },
                'state': {
                    slug: 'state',
                    title: "State & Reactivity",
                    file: 'content/en/docs/state.md',
                    md: "# State & Reactivity\n\n\u0024mol state behaves like a spreadsheet: you declare how a value is computed, and everything that depends on it updates by itself. No stores, no dispatch, no effect hooks — the dependency graph tracks what to recompute.\n\n## Reactive properties\n\nA method decorated with `@ \u0024mol_mem` is a cached, reactive cell. It runs once, remembers its result, and recomputes only when something it read has changed.\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_counter extends \u0024.\u0024my_counter {\n\t\t@ \u0024mol_mem count() { return 0 }\n\n\t\t@ \u0024mol_mem doubled() {\n\t\t\treturn this.count() * 2\n\t\t}\n\t}\n}\n```\n\n`doubled` reads `count`, so it subscribes to `count` automatically. Change `count` and every view showing `doubled` refreshes — there is nothing to subscribe to by hand.\n\n## Reading and writing\n\nA property is both getter and setter: call it with no argument to read, with an argument to write.\n\n```typescript\n@ \u0024mol_action\nincrement() {\n\tthis.count( this.count() + 1 )\n}\n```\n\n## Actions vs. computations\n\nThis one distinction keeps reactive code predictable:\n\n- `@ \u0024mol_mem` is a **pure computation** — only read other cells and return a value.\n- `@ \u0024mol_action` is an **effect** — writes to state, network calls, and timers belong here.\n\nWriting to a cell from inside a `@ \u0024mol_mem` creates a feedback loop (the write invalidates a dependency, which recomputes, which writes again). \u0024mol reports this as a *circular subscription*. The fix is always the same: keep side effects in actions, keep computations pure.\n\n| In `@ \u0024mol_mem` you may | but not |\n|---|---|\n| read other cells | write other cells |\n| `new SomeClass()` | `fetch()`, `await` |\n| return a value | `setTimeout`, DOM writes |\n\nButton handlers are generated as `@ \u0024mol_mem` on the base class; override them with `@ \u0024mol_action` so they can write safely:\n\n```typescript\n@ \u0024mol_action\nsubmit() {\n\tthis.saved( true )\n}\n```\n\n## Derived state composes\n\nBecause dependencies are tracked automatically, derived values chain without any wiring. Each reads the one before it; a change at the root ripples out exactly as far as it needs to:\n\n```typescript\n@ \u0024mol_mem full_name() {\n\treturn `\u0024{ this.first() } \u0024{ this.last() }`.trim()\n}\n\n@ \u0024mol_mem greeting() {\n\treturn this.full_name() ? `Hello, \u0024{ this.full_name() }!` : 'Hello!'\n}\n```\n\n## Keyed state\n\n`@ \u0024mol_mem_key` is a computation parameterized by a key — one cached cell per key. Ideal for per-row values:\n\n```typescript\n@ \u0024mol_mem_key\ntask_done( id: string, next?: boolean ) {\n\tconst task = this.task( id )\n\tif ( next !== undefined ) task.Done( null )!.val( next )\n\treturn task.Done()?.val() ?? false\n}\n```\n\n## Async is just a value\n\nReturn a promise from a `@ \u0024mol_mem` and the view shows a loading state until it resolves — no explicit loading flag:\n\n```typescript\n@ \u0024mol_mem\nasync data() {\n\tconst res = await fetch( '/api/data' )\n\treturn await res.json()\n}\n```\n\n[Data Fetching](#!section=docs/page=data) builds on this pattern.\n\n## Transient state between events\n\nState declared in `view.tree` resets between separate event handlers (drag/pan/gesture sequences), because \u0024mol wraps each handler in its own fiber. For values that must survive from one event to the next, use a plain TypeScript field instead of a reactive property:\n\n```typescript\nexport class \u0024my_canvas extends \u0024.\u0024my_canvas {\n\t// plain field — survives across events, not reactive\n\tdrag_id = ''\n\n\t@ \u0024mol_action pan_start() { this.drag_id = 'node_42' }\n\t@ \u0024mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }\n}\n```\n\nUse a reactive cell when the view must react to the value; use a plain field for transient state only the handlers read.\n\n## Next\n\nReactive state is most useful when it's addressable — connect it to the URL in [Routing](#!section=docs/page=routing).\n",
                    tr: {
                        ru: {
                            title: "Состояние и реактивность",
                            md: "# Состояние и реактивность\n\nСостояние в \u0024mol ведёт себя как электронная таблица: вы объявляете, как вычисляется значение, и всё, что от него зависит, обновляется само. Ни сторов, ни диспатчей, ни хуков-эффектов — граф зависимостей сам отслеживает, что пересчитывать.\n\n## Реактивные свойства\n\nМетод, помеченный `@ \u0024mol_mem`, — это кешируемая реактивная ячейка. Она выполняется один раз, запоминает результат и пересчитывается только тогда, когда изменилось что-то из прочитанного ею.\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_counter extends \u0024.\u0024my_counter {\n\t\t@ \u0024mol_mem count() { return 0 }\n\n\t\t@ \u0024mol_mem doubled() {\n\t\t\treturn this.count() * 2\n\t\t}\n\t}\n}\n```\n\n`doubled` читает `count`, поэтому автоматически подписывается на `count`. Измените `count` — и каждое вью, показывающее `doubled`, обновится, при этом подписываться руками не на что.\n\n## Чтение и запись\n\nСвойство — одновременно геттер и сеттер: вызов без аргумента читает, с аргументом — пишет.\n\n```typescript\n@ \u0024mol_action\nincrement() {\n\tthis.count( this.count() + 1 )\n}\n```\n\n## Действия против вычислений\n\nОдно это различие держит реактивный код предсказуемым:\n\n- `@ \u0024mol_mem` — **чистое вычисление**: только читайте другие ячейки и возвращайте значение.\n- `@ \u0024mol_action` — **эффект**: запись в состояние, сетевые вызовы и таймеры — сюда.\n\nЗапись в ячейку изнутри `@ \u0024mol_mem` создаёт петлю обратной связи (запись инвалидирует зависимость, та пересчитывается, что снова пишет). \u0024mol сообщает об этом как о *циклической подписке*. Лечение всегда одно: держите побочные эффекты в действиях, а вычисления — чистыми.\n\n| В `@ \u0024mol_mem` можно | но нельзя |\n|---|---|\n| читать другие ячейки | писать в другие ячейки |\n| `new SomeClass()` | `fetch()`, `await` |\n| вернуть значение | `setTimeout`, запись в DOM |\n\nОбработчики кнопок генерируются как `@ \u0024mol_mem` в базовом классе; переопределяйте их через `@ \u0024mol_action`, чтобы они могли безопасно писать:\n\n```typescript\n@ \u0024mol_action\nsubmit() {\n\tthis.saved( true )\n}\n```\n\n## Производное состояние композируется\n\nПоскольку зависимости отслеживаются автоматически, производные значения выстраиваются в цепочку без всякой связки. Каждое читает предыдущее; изменение в корне расходится ровно настолько, насколько нужно:\n\n```typescript\n@ \u0024mol_mem full_name() {\n\treturn `\u0024{ this.first() } \u0024{ this.last() }`.trim()\n}\n\n@ \u0024mol_mem greeting() {\n\treturn this.full_name() ? `Hello, \u0024{ this.full_name() }!` : 'Hello!'\n}\n```\n\n## Ключевое состояние\n\n`@ \u0024mol_mem_key` — это вычисление, параметризованное ключом: по одной кешируемой ячейке на ключ. Идеально для значений по строкам:\n\n```typescript\n@ \u0024mol_mem_key\ntask_done( id: string, next?: boolean ) {\n\tconst task = this.task( id )\n\tif ( next !== undefined ) task.Done( null )!.val( next )\n\treturn task.Done()?.val() ?? false\n}\n```\n\n## Асинхронность — это просто значение\n\nВерните промис из `@ \u0024mol_mem`, и вью покажет состояние загрузки, пока он не разрешится — без явного флага загрузки:\n\n```typescript\n@ \u0024mol_mem\nasync data() {\n\tconst res = await fetch( '/api/data' )\n\treturn await res.json()\n}\n```\n\n[Загрузка данных](#!section=docs/page=data) развивает этот паттерн.\n\n## Временное состояние между событиями\n\nСостояние, объявленное в `view.tree`, сбрасывается между отдельными обработчиками событий (перетаскивание/панорамирование/жесты), потому что \u0024mol оборачивает каждый обработчик в собственную фибру. Для значений, которые должны пережить переход от одного события к другому, используйте обычное поле TypeScript вместо реактивного свойства:\n\n```typescript\nexport class \u0024my_canvas extends \u0024.\u0024my_canvas {\n\t// обычное поле — переживает события, не реактивно\n\tdrag_id = ''\n\n\t@ \u0024mol_action pan_start() { this.drag_id = 'node_42' }\n\t@ \u0024mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }\n}\n```\n\nБерите реактивную ячейку, когда вью должно реагировать на значение; обычное поле — для временного состояния, которое читают только обработчики.\n\n## Дальше\n\nРеактивное состояние полезнее всего, когда оно адресуемо — свяжите его с URL в [Роутинге](#!section=docs/page=routing).\n",
                        },
                    },
                },
                'routing': {
                    slug: 'routing',
                    title: "Routing",
                    file: 'content/en/docs/routing.md',
                    md: "# Routing\n\nRouting in \u0024mol is not a separate library — the URL is just another piece of reactive state. Read it, write it, and views react the same way they react to any cell. The back button, deep links, and shareable URLs all come for free.\n\n## The URL as state\n\n`\u0024mol_state_arg` exposes URL parameters as reactive values. Bind one to a property and the address bar becomes your source of truth:\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_app extends \u0024.\u0024my_app {\n\t\t@ \u0024mol_mem\n\t\tpage( next?: string ) {\n\t\t\treturn \u0024mol_state_arg.value( 'page', next ) ?? 'home'\n\t\t}\n\t}\n}\n```\n\nReading `page()` returns the current value; calling `page('about')` navigates. Anything that reads `page()` re-renders on change — including the browser's back button, which updates the cell for you.\n\n## Switching screens\n\nCombine a routed value with a plain `switch` to choose what renders. Because views are [lazy](#!section=docs/page=rendering), the screens you don't show are never built:\n\n```typescript\n@ \u0024mol_mem\nbody_content() {\n\tswitch ( this.page() ) {\n\t\tcase 'about': return [ this.About() ]\n\t\tcase 'docs': return [ this.Docs() ]\n\t\tdefault: return [ this.Home() ]\n\t}\n}\n```\n\n## Links that set arguments\n\nIn `view.tree`, a link can set URL arguments declaratively — clicking it navigates with no handler:\n\n```tree\n<= About_link \u0024mol_link\n\targ *\n\t\tpage \\about\n\tsub / <= about_label \\About\n```\n\n`\u0024mol_link` also marks itself active (`mol_link_current`) when its arguments match the current URL, so highlighting the current page needs no extra state.\n\n## Multiple parameters\n\nArguments are independent, so a screen can route on several at once. This very docs site routes on both `section` and `page`:\n\n```tree\n<= Guide_link \u0024mol_link\n\targ *\n\t\tsection \\docs\n\t\tpage \\views\n```\n\nEach key round-trips through the URL, so any view is shareable and bookmarkable by construction. Setting one argument leaves the others untouched, which makes deep links — a specific section *and* page *and* anchor — just a matter of setting the keys you care about.\n\n## State that shouldn't be in the URL\n\nNot every piece of state belongs in the address bar. For values that should persist locally but not pollute links — a collapsed sidebar, a draft — use `\u0024mol_state_local`, which stores to `localStorage` with the same getter/setter shape:\n\n```typescript\n@ \u0024mol_mem\nsidebar_open( next?: boolean ) {\n\treturn \u0024mol_state_local.value( 'sidebar_open', next ) ?? false\n}\n```\n\nReach for `\u0024mol_state_arg` when the state should be shareable; `\u0024mol_state_local` when it should merely be remembered.\n\n## Next\n\nYou've covered how \u0024mol turns state into UI and URLs. See how it all reaches the screen efficiently in [Rendering](#!section=docs/page=rendering).\n",
                    tr: {
                        ru: {
                            title: "Роутинг",
                            md: "# Роутинг\n\nРоутинг в \u0024mol — не отдельная библиотека: URL это просто ещё один кусок реактивного состояния. Читайте его, пишите в него — и вью реагируют так же, как на любую ячейку. Кнопка «назад», глубокие ссылки и делимые URL достаются даром.\n\n## URL как состояние\n\n`\u0024mol_state_arg` выставляет параметры URL реактивными значениями. Свяжите один со свойством, и адресная строка станет вашим источником истины:\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_app extends \u0024.\u0024my_app {\n\t\t@ \u0024mol_mem\n\t\tpage( next?: string ) {\n\t\t\treturn \u0024mol_state_arg.value( 'page', next ) ?? 'home'\n\t\t}\n\t}\n}\n```\n\nЧтение `page()` возвращает текущее значение; вызов `page('about')` переходит по адресу. Всё, что читает `page()`, перерисовывается при изменении — включая кнопку «назад» браузера, которая обновляет ячейку за вас.\n\n## Переключение экранов\n\nСкомбинируйте маршрутизируемое значение с обычным `switch`, чтобы выбрать, что рендерить. Поскольку вью [ленивы](#!section=docs/page=rendering), экраны, которые вы не показываете, никогда не строятся:\n\n```typescript\n@ \u0024mol_mem\nbody_content() {\n\tswitch ( this.page() ) {\n\t\tcase 'about': return [ this.About() ]\n\t\tcase 'docs': return [ this.Docs() ]\n\t\tdefault: return [ this.Home() ]\n\t}\n}\n```\n\n## Ссылки, задающие аргументы\n\nВ `view.tree` ссылка может задавать аргументы URL декларативно — клик по ней переходит без обработчика:\n\n```tree\n<= About_link \u0024mol_link\n\targ *\n\t\tpage \\about\n\tsub / <= about_label \\About\n```\n\n`\u0024mol_link` также помечает себя активной (`mol_link_current`), когда её аргументы совпадают с текущим URL, так что подсветка текущей страницы не требует дополнительного состояния.\n\n## Несколько параметров\n\nАргументы независимы, поэтому экран может маршрутизироваться сразу по нескольким. Этот самый сайт документации маршрутизируется и по `section`, и по `page`:\n\n```tree\n<= Guide_link \u0024mol_link\n\targ *\n\t\tsection \\docs\n\t\tpage \\views\n```\n\nКаждый ключ ходит туда-обратно через URL, поэтому любое вью делимо и добавляемо в закладки по построению. Задание одного аргумента оставляет остальные нетронутыми, что превращает глубокие ссылки — конкретную секцию *и* страницу *и* якорь — просто в вопрос установки тех ключей, которые вам важны.\n\n## Состояние, которого не должно быть в URL\n\nНе всякий кусок состояния место в адресной строке. Для значений, которые должны сохраняться локально, но не засорять ссылки — свёрнутый сайдбар, черновик — используйте `\u0024mol_state_local`, который пишет в `localStorage` с той же формой геттера/сеттера:\n\n```typescript\n@ \u0024mol_mem\nsidebar_open( next?: boolean ) {\n\treturn \u0024mol_state_local.value( 'sidebar_open', next ) ?? false\n}\n```\n\nТянитесь к `\u0024mol_state_arg`, когда состояние должно быть делимым; к `\u0024mol_state_local` — когда его достаточно просто запомнить.\n\n## Дальше\n\nВы разобрались, как \u0024mol превращает состояние в UI и URL. Посмотрите, как всё это эффективно доходит до экрана, в [Рендеринге](#!section=docs/page=rendering).\n",
                        },
                    },
                },
                'rendering': {
                    slug: 'rendering',
                    title: "Rendering",
                    file: 'content/en/docs/rendering.md',
                    md: "# Rendering\n\nThis chapter is about what happens between your reactive state changing and pixels updating on screen. You rarely have to think about it — but understanding the model explains why \u0024mol code stays fast without special effort.\n\n## No virtual DOM\n\n\u0024mol does not diff a virtual tree. Each view property is bound directly to the DOM node or attribute it controls, through the same reactive cells you already met in [State](#!section=docs/page=state). When a cell changes, only the exact bindings that read it re-run — not a subtree, not a component function, just the affected properties.\n\nThat means there is no reconciliation pass to optimize, no keys to hand-tune for a list diff, and no `memo`/`shouldComponentUpdate` to reach for. The dependency graph already knows the minimal set of updates.\n\n## Components are lazy\n\nA view is only constructed when something asks for it. A screen you never navigate to is never built; a tab you never open costs nothing. Because construction is on-demand and cached, composing large trees of components is cheap — the parts that aren't needed simply don't exist yet.\n\n## Rendering is virtualized\n\n\u0024mol renders only what is inside the viewport. Components scrolled out of view are not kept as hidden DOM — they are not created at all, and are built the moment they scroll into range. This is an architectural property of the framework, not an opt-in feature or a special list component: any layout is virtualized, so a list of ten items and a list of ten thousand cost about the same to display.\n\nThe practical effect is that you write ordinary component trees and long lists without reaching for windowing libraries.\n\n## Reproducible numbers\n\nPerformance claims are only useful if you can reproduce them. Rather than quote figures here, \u0024mol participates in the community **js-framework-benchmark**; you can read its results and re-run the suite yourself:\n\n[js-framework-benchmark results](https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html)\n\nTreat that as the source of truth for comparisons — measured, versioned, and independent of this page.\n\n## Next\n\nThat completes the core model of how \u0024mol runs. Next, put it to work loading real data in [Data Fetching](#!section=docs/page=data).\n",
                    tr: {
                        ru: {
                            title: "Рендеринг",
                            md: "# Рендеринг\n\nЭта глава о том, что происходит между изменением вашего реактивного состояния и обновлением пикселей на экране. Об этом редко приходится думать — но понимание модели объясняет, почему \u0024mol-код остаётся быстрым без особых усилий.\n\n## Никакого виртуального DOM\n\n\u0024mol не диффит виртуальное дерево. Каждое свойство вью привязано напрямую к DOM-узлу или атрибуту, которым оно управляет, через те же реактивные ячейки, с которыми вы уже познакомились в [Состоянии](#!section=docs/page=state). Когда ячейка меняется, заново выполняются только те связывания, что её читают — не поддерево, не функция компонента, а именно затронутые свойства.\n\nЭто значит, что нет ни прохода сверки, который надо оптимизировать, ни ключей для ручной подгонки диффа списка, ни `memo`/`shouldComponentUpdate`, за которыми надо тянуться. Граф зависимостей уже знает минимальный набор обновлений.\n\n## Компоненты ленивы\n\nВью конструируется, только когда его кто-то запросил. Экран, на который вы никогда не переходите, никогда не строится; вкладка, которую вы не открываете, не стоит ничего. Поскольку конструирование происходит по требованию и кешируется, композиция больших деревьев компонентов дёшева — ненужные части просто ещё не существуют.\n\n## Рендеринг виртуализирован\n\n\u0024mol рендерит только то, что внутри вьюпорта. Компоненты, прокрученные за пределы видимости, не хранятся как скрытый DOM — они вообще не создаются и строятся в тот момент, когда попадают в зону видимости. Это архитектурное свойство фреймворка, а не опциональная фича или особый компонент-список: виртуализирована любая разметка, поэтому список из десяти элементов и список из десяти тысяч отображаются примерно одинаково по стоимости.\n\nПрактический эффект в том, что вы пишете обычные деревья компонентов и длинные списки, не прибегая к библиотекам оконного рендеринга.\n\n## Воспроизводимые цифры\n\nЗаявления о производительности полезны, только если их можно воспроизвести. Вместо того чтобы приводить цифры здесь, \u0024mol участвует в общедоступном **js-framework-benchmark**; вы можете прочитать его результаты и перезапустить набор тестов сами:\n\n[результаты js-framework-benchmark](https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html)\n\nСчитайте это источником истины для сравнений — измеренным, версионированным и независимым от этой страницы.\n\n## Дальше\n\nНа этом завершается базовая модель того, как работает \u0024mol. Дальше — примените её к загрузке реальных данных в [Загрузке данных](#!section=docs/page=data).\n",
                        },
                    },
                },
                'data': {
                    slug: 'data',
                    title: "Data Fetching",
                    file: 'content/en/docs/data.md',
                    md: "# Data Fetching\n\nLoading remote data in \u0024mol is not a special API — an async value is just a reactive property that happens to return a promise. The view waits for it, shows a loading state, and re-renders when it resolves.\n\n## An async property\n\nReturn a promise from a `@ \u0024mol_mem` and read it like any other value:\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_users extends \u0024.\u0024my_users {\n\t\t@ \u0024mol_mem\n\t\tusers() {\n\t\t\treturn \u0024mol_fetch.json( 'https://api.example.com/users' ) as {\n\t\t\t\tid: number\n\t\t\t\tname: string\n\t\t\t}[]\n\t\t}\n\t}\n}\n```\n\n`\u0024mol_fetch` suspends the fiber until the response arrives. While it is pending, any view that reads `users()` automatically shows the built-in loading state — you write no `isLoading` flag.\n\n## Rendering the result\n\nBind the resolved data straight into a list:\n\n```typescript\n\t\t@ \u0024mol_mem\n\t\tuser_names() {\n\t\t\treturn this.users().map( user => user.name )\n\t\t}\n```\n\nWhen the promise resolves, `users()` updates, `user_names()` recomputes, and the list renders. No callbacks, no `useEffect`.\n\n## Reloading\n\nBecause it is just a reactive cell, you refetch by invalidating it. Depend on a token you can bump:\n\n```typescript\n\t\t@ \u0024mol_mem\n\t\treload_token( next?: number ) {\n\t\t\treturn next ?? 0\n\t\t}\n\n\t\t@ \u0024mol_mem\n\t\tusers() {\n\t\t\tthis.reload_token() // subscribe\n\t\t\treturn \u0024mol_fetch.json( 'https://api.example.com/users' ) as unknown[]\n\t\t}\n\n\t\t@ \u0024mol_action\n\t\treload() {\n\t\t\tthis.reload_token( this.reload_token() + 1 )\n\t\t}\n```\n\nCalling `reload()` changes the token, which invalidates `users()`, which refetches.\n\n## Errors\n\nA throw inside a reactive property propagates to the nearest view, which renders an error state instead of the content. To handle it yourself, catch and return a fallback:\n\n```typescript\n\t\t@ \u0024mol_mem\n\t\tusers_safe() {\n\t\t\ttry {\n\t\t\t\treturn this.users()\n\t\t\t} catch( error ) {\n\t\t\t\tif( error instanceof Promise ) throw error // still loading\n\t\t\t\treturn []\n\t\t\t}\n\t\t}\n```\n\nRe-throwing a `Promise` is how you let the loading state keep flowing while catching only real errors.\n\n## Next\n\nFor data that persists and syncs across clients without a backend, continue to [Giper Baza](#!section=docs/page=giper-baza).\n",
                    tr: {
                        ru: {
                            title: "Загрузка данных",
                            md: "# Загрузка данных\n\nЗагрузка удалённых данных в \u0024mol — не особый API: асинхронное значение это просто реактивное свойство, которое возвращает промис. Вью его дожидается, показывает состояние загрузки и перерисовывается, когда оно разрешается.\n\n## Асинхронное свойство\n\nВерните промис из `@ \u0024mol_mem` и читайте его как любое другое значение:\n\n```typescript\nnamespace \u0024.\u0024\u0024 {\n\texport class \u0024my_users extends \u0024.\u0024my_users {\n\t\t@ \u0024mol_mem\n\t\tusers() {\n\t\t\treturn \u0024mol_fetch.json( 'https://api.example.com/users' ) as {\n\t\t\t\tid: number\n\t\t\t\tname: string\n\t\t\t}[]\n\t\t}\n\t}\n}\n```\n\n`\u0024mol_fetch` приостанавливает фибру, пока не придёт ответ. Пока он в ожидании, любое вью, читающее `users()`, автоматически показывает встроенное состояние загрузки — вы не пишете флаг `isLoading`.\n\n## Рендеринг результата\n\nСвяжите разрешённые данные прямо в список:\n\n```typescript\n\t\t@ \u0024mol_mem\n\t\tuser_names() {\n\t\t\treturn this.users().map( user => user.name )\n\t\t}\n```\n\nКогда промис разрешается, `users()` обновляется, `user_names()` пересчитывается, и список рендерится. Ни колбэков, ни `useEffect`.\n\n## Перезагрузка\n\nПоскольку это просто реактивная ячейка, вы перезапрашиваете данные, инвалидируя её. Завязывайтесь на токен, который можно инкрементить:\n\n```typescript\n\t\t@ \u0024mol_mem\n\t\treload_token( next?: number ) {\n\t\t\treturn next ?? 0\n\t\t}\n\n\t\t@ \u0024mol_mem\n\t\tusers() {\n\t\t\tthis.reload_token() // подписка\n\t\t\treturn \u0024mol_fetch.json( 'https://api.example.com/users' ) as unknown[]\n\t\t}\n\n\t\t@ \u0024mol_action\n\t\treload() {\n\t\t\tthis.reload_token( this.reload_token() + 1 )\n\t\t}\n```\n\nВызов `reload()` меняет токен, что инвалидирует `users()`, что перезапрашивает данные.\n\n## Ошибки\n\nБрошенное исключение внутри реактивного свойства всплывает к ближайшему вью, которое рендерит состояние ошибки вместо контента. Чтобы обработать его самому, перехватите и верните запасное значение:\n\n```typescript\n\t\t@ \u0024mol_mem\n\t\tusers_safe() {\n\t\t\ttry {\n\t\t\t\treturn this.users()\n\t\t\t} catch( error ) {\n\t\t\t\tif( error instanceof Promise ) throw error // всё ещё загружается\n\t\t\t\treturn []\n\t\t\t}\n\t\t}\n```\n\nПереброс `Promise` — это способ дать состоянию загрузки продолжать течь, перехватывая только настоящие ошибки.\n\n## Дальше\n\nДля данных, которые сохраняются и синхронизируются между клиентами без бэкенда, переходите к [Гипер Базе](#!section=docs/page=giper-baza).\n",
                        },
                    },
                },
                'giper-baza': {
                    slug: 'giper-baza',
                    title: "Giper Baza",
                    file: 'content/en/docs/giper-baza.md',
                    md: "# Giper Baza\n\nGiper Baza is \u0024mol's local-first data layer: a CRDT store that persists locally and syncs between clients automatically. You model data as entities; reads and writes look like ordinary reactive properties, and replication just happens.\n\n> This page introduces the shape of the API. Giper Baza is a large topic — treat this as a map, not the full territory.\n\n## Define an entity\n\nAn entity is a **pure schema** — a set of typed fields. Keep behaviour out of it; do the reading and writing in your views.\n\n```typescript\nnamespace \u0024 {\n\texport class \u0024my_task extends \u0024giper_baza_entity.with( {\n\t\tTitle: \u0024giper_baza_atom_text,\n\t\tDone: \u0024giper_baza_atom_bool,\n\t\tCreatedAt: \u0024giper_baza_atom_time,\n\t} ) {}\n}\n```\n\nEach field is an **atom** — a synced cell with a typed value.\n\n## Read and write\n\nGet the store, reach a list of entities, and map over them reactively:\n\n```typescript\n\t\t@ \u0024mol_mem\n\t\ttasks() {\n\t\t\treturn this.tasks_list().remote_list()\n\t\t}\n\n\t\t@ \u0024mol_mem_key\n\t\ttask_done( id: string, next?: boolean ) {\n\t\t\tconst task = this.task( id )\n\t\t\tif( next !== undefined ) task.Done( null )!.val( next )\n\t\t\treturn task.Done()?.val() ?? false\n\t\t}\n```\n\nReading `Done()?.val()` gives the current value; writing `Done(null)!.val(next)` sets it. Any view reading the atom re-renders when it — or a remote peer — changes it.\n\n## Create and remove\n\n```typescript\n\t\t@ \u0024mol_action\n\t\ttask_add( title: string ) {\n\t\t\tconst task = this.tasks_list().make( [ [ null, \u0024giper_baza_rank_read ] ] )!\n\t\t\ttask.Title( null )!.val( title )\n\t\t\ttask.Done( null )!.val( false )\n\t\t}\n\n\t\t@ \u0024mol_action\n\t\ttask_remove( id: string ) {\n\t\t\tthis.tasks_list().cut( this.task( id ).link() )\n\t\t}\n```\n\n## Sync is automatic\n\nThere is nothing to configure. Changes replicate to other clients in real time, and the same data is available offline — the store reconciles when a connection returns. Because writes are CRDT merges, concurrent edits from different devices combine without conflicts.\n\n## Where to next?\n\nYou now have the full arc: [Views](#!section=docs/page=views), [State](#!section=docs/page=state), [Routing](#!section=docs/page=routing), [Data Fetching](#!section=docs/page=data), and local-first storage. Try it all in the [Playground](#!section=playground).\n",
                    tr: {
                        ru: {
                            title: "Гипер База",
                            md: "# Гипер База\n\nГипер База — это local-first слой данных для \u0024mol: CRDT-хранилище, которое сохраняется локально и синхронизируется между клиентами автоматически. Данные вы моделируете как сущности; чтение и запись выглядят как обычные реактивные свойства, а репликация просто происходит.\n\n> Эта страница знакомит с формой API. Гипер База — большая тема; считайте это картой, а не всей территорией.\n\n## Определение сущности\n\nСущность — это **чистая схема**, набор типизированных полей. Держите поведение вне неё; чтение и запись делайте во вью.\n\n```typescript\nnamespace \u0024 {\n\texport class \u0024my_task extends \u0024giper_baza_entity.with( {\n\t\tTitle: \u0024giper_baza_atom_text,\n\t\tDone: \u0024giper_baza_atom_bool,\n\t\tCreatedAt: \u0024giper_baza_atom_time,\n\t} ) {}\n}\n```\n\nКаждое поле — это **атом**, синхронизируемая ячейка с типизированным значением.\n\n## Чтение и запись\n\nВозьмите хранилище, доберитесь до списка сущностей и реактивно пройдитесь по ним:\n\n```typescript\n\t\t@ \u0024mol_mem\n\t\ttasks() {\n\t\t\treturn this.tasks_list().remote_list()\n\t\t}\n\n\t\t@ \u0024mol_mem_key\n\t\ttask_done( id: string, next?: boolean ) {\n\t\t\tconst task = this.task( id )\n\t\t\tif( next !== undefined ) task.Done( null )!.val( next )\n\t\t\treturn task.Done()?.val() ?? false\n\t\t}\n```\n\nЧтение `Done()?.val()` даёт текущее значение; запись `Done(null)!.val(next)` его задаёт. Любое вью, читающее атом, перерисовывается, когда его меняет он сам — или удалённый пир.\n\n## Создание и удаление\n\n```typescript\n\t\t@ \u0024mol_action\n\t\ttask_add( title: string ) {\n\t\t\tconst task = this.tasks_list().make( [ [ null, \u0024giper_baza_rank_read ] ] )!\n\t\t\ttask.Title( null )!.val( title )\n\t\t\ttask.Done( null )!.val( false )\n\t\t}\n\n\t\t@ \u0024mol_action\n\t\ttask_remove( id: string ) {\n\t\t\tthis.tasks_list().cut( this.task( id ).link() )\n\t\t}\n```\n\n## Синхронизация автоматическая\n\nНастраивать нечего. Изменения реплицируются на другие клиенты в реальном времени, и те же данные доступны офлайн — хранилище сверяется, когда соединение возвращается. Поскольку записи это CRDT-слияния, одновременные правки с разных устройств объединяются без конфликтов.\n\n## Куда дальше?\n\nТеперь у вас есть вся дуга: [Вью](#!section=docs/page=views), [Состояние](#!section=docs/page=state), [Роутинг](#!section=docs/page=routing), [Загрузка данных](#!section=docs/page=data) и local-first хранилище. Попробуйте всё это в [Песочнице](#!section=playground).\n",
                        },
                    },
                },
                'showcase': {
                    slug: 'showcase',
                    title: "Showcase",
                    file: 'content/en/docs/showcase.md',
                    md: "# Showcase\n\nReal things built with \u0024mol — from community platforms to developer tools. Each one is a working app, not a demo.\n\n## Applications\n\n- **[vas3k.club](https://vas3k.club)** — a paid community platform. The front end is a \u0024mol single-page app over a Django backend; \u0024mol keeps the many interactive screens (feed, posts, profiles) reactive without a heavy client stack.\n- **Bog Music** — a music player that runs both as a Chrome extension and a web app, with background playback and offline caching. \u0024mol drives the UI and the local-first state.\n- **Blitz Quiz** — a Kahoot-style live quiz built on \u0024mol and Giper Baza. Rooms sync in real time through the CRDT layer, so there is no game server to run.\n- **\u0024mol Styler** — a visual editor for typed `.view.css.ts` styles (a Figma-like surface for \u0024mol components), itself written in \u0024mol.\n- **WikiLive** — a local-first wiki where each page is a Giper Baza land, edited live in the browser.\n\n## Tools\n\n- **MAM** — the build tool and module registry that every \u0024mol app lives in — and it is itself a \u0024mol project. [Source](https://github.com/hyoo-ru/mam).\n- **view.tree LSP** — language tooling and the `npm create view-tree-lsp` scaffolder that starts new \u0024mol apps.\n- **This site** — the documentation you are reading, including the [Playground](#!section=playground) and [course](#!section=course), is a \u0024mol app. The search, live code editor, and in-browser TypeScript are all built with the framework they document.\n\n## More\n\nThe [\u0024mol component catalog](https://mol.hyoo.ru) has dozens of live components and demos you can open and inspect.\n\nBuilding something with \u0024mol? The best next step is the [Playground](#!section=playground) — try an idea in seconds, then share the URL.\n",
                    tr: {
                        ru: {
                            title: "Витрина",
                            md: "# Витрина\n\nНастоящие вещи, собранные на \u0024mol — от общественных платформ до инструментов разработчика. Каждая — рабочее приложение, а не демо.\n\n## Приложения\n\n- **[vas3k.club](https://vas3k.club)** — платная общественная платформа. Фронтенд — одностраничное \u0024mol-приложение поверх Django-бэкенда; \u0024mol держит множество интерактивных экранов (лента, посты, профили) реактивными без тяжёлого клиентского стека.\n- **Bog Music** — музыкальный плеер, работающий и как расширение Chrome, и как веб-приложение, с фоновым воспроизведением и офлайн-кешированием. \u0024mol управляет интерфейсом и local-first состоянием.\n- **Blitz Quiz** — живой квиз в стиле Kahoot на \u0024mol и Гипер Базе. Комнаты синхронизируются в реальном времени через CRDT-слой, поэтому игровой сервер не нужен.\n- **\u0024mol Styler** — визуальный редактор типизированных стилей `.view.css.ts` (Figma-подобная поверхность для \u0024mol-компонентов), сам написанный на \u0024mol.\n- **WikiLive** — local-first вики, где каждая страница это land Гипер Базы, редактируемый вживую в браузере.\n\n## Инструменты\n\n- **MAM** — инструмент сборки и реестр модулей, внутри которого живёт каждое \u0024mol-приложение — и он сам является \u0024mol-проектом. [Исходники](https://github.com/hyoo-ru/mam).\n- **view.tree LSP** — языковой тулинг и скаффолдер `npm create view-tree-lsp`, который создаёт новые \u0024mol-приложения.\n- **Этот сайт** — документация, которую вы читаете, включая [Песочницу](#!section=playground) и [курс](#!section=course), это \u0024mol-приложение. Поиск, живой редактор кода и TypeScript в браузере — всё собрано на фреймворке, который они документируют.\n\n## Ещё\n\nВ [каталоге компонентов \u0024mol](https://mol.hyoo.ru) десятки живых компонентов и демо, которые можно открыть и разобрать.\n\nСтроите что-то на \u0024mol? Лучший следующий шаг — [Песочница](#!section=playground): попробуйте идею за секунды, а потом поделитесь ссылкой.\n",
                        },
                    },
                },
                'rosetta': {
                    slug: 'rosetta',
                    title: "From React, Vue & Svelte",
                    file: 'content/en/docs/rosetta.md',
                    md: "# From React, Vue & Svelte\n\nIf you have built UIs with React, Vue, or Svelte, you already understand most of what \u0024mol does — the names are just different. Those frameworks are excellent and popular for good reason; this page is a translation table, not a competition, to help you feel at home quickly.\n\n## Concept map\n\n| Idea | React | Vue | Svelte | \u0024mol |\n|------|-------|-----|--------|------|\n| Component | function / class | SFC (`.vue`) | `.svelte` file | `.view.tree` + `.view.ts` |\n| Local state | `useState` | `ref` / `reactive` | `let x` | `@ \u0024mol_mem` |\n| Derived value | `useMemo` | `computed` | `\u0024: y = …` | `@ \u0024mol_mem` (reads other cells) |\n| Side effect | `useEffect` | `watchEffect` | `\u0024: { … }` | `@ \u0024mol_action` (explicit, never automatic) |\n| Props | props | props | `export let` | bindings in `view.tree` |\n| Event | `onClick` | `@click` | `on:click` | `click? <=> handler?` |\n| Two-way input | controlled input | `v-model` | `bind:value` | `value? <=> field?` |\n| List | `items.map()` | `v-for` | `{#each}` | keyed `Row*` |\n| Conditional | `cond && …` | `v-if` | `{#if}` | assign `null` to remove |\n| Shared state | Redux / Context | Pinia / provide | stores | any object with `@ \u0024mol_mem` |\n| Routing | React Router | Vue Router | SvelteKit | `\u0024mol_state_arg` |\n| Styling | CSS-in-JS | scoped `<style>` | `<style>` | typed `.view.css.ts` |\n\n## What tends to feel new\n\n- **Reactivity is automatic and non-optional.** Like Vue's `ref` or Svelte's `\u0024:`, a `@ \u0024mol_mem` value updates its readers by itself — but there is no dependency array to maintain and no manual subscription anywhere.\n- **Effects are separated from computations.** React folds derivation and effects into hooks; \u0024mol keeps them apart: `@ \u0024mol_mem` only computes, `@ \u0024mol_action` performs effects. That split is what removes most \"why did this run twice?\" puzzles.\n- **State is just objects.** There is no dedicated store library to adopt — a shared value is a reactive property on any object, so global state and component state work the same way.\n\n## Try the translation\n\nThe fastest way to internalize the mapping is to write a little of both: open the [Playground](#!section=playground), port a small component you know, and see how it lands. Or start from [Getting Started](#!section=docs/page=getting-started).\n",
                    tr: {
                        ru: {
                            title: "Из React, Vue и Svelte",
                            md: "# Из React, Vue и Svelte\n\nЕсли вы собирали интерфейсы на React, Vue или Svelte, вы уже понимаете большую часть того, что делает \u0024mol — просто названия другие. Эти фреймворки отличные и популярны заслуженно; эта страница — таблица перевода, а не соревнование, чтобы вы быстрее почувствовали себя как дома.\n\n## Карта концепций\n\n| Идея | React | Vue | Svelte | \u0024mol |\n|------|-------|-----|--------|------|\n| Компонент | функция / класс | SFC (`.vue`) | файл `.svelte` | `.view.tree` + `.view.ts` |\n| Локальное состояние | `useState` | `ref` / `reactive` | `let x` | `@ \u0024mol_mem` |\n| Производное значение | `useMemo` | `computed` | `\u0024: y = …` | `@ \u0024mol_mem` (читает другие ячейки) |\n| Побочный эффект | `useEffect` | `watchEffect` | `\u0024: { … }` | `@ \u0024mol_action` (явный, никогда не автоматический) |\n| Пропсы | props | props | `export let` | связывания в `view.tree` |\n| Событие | `onClick` | `@click` | `on:click` | `click? <=> handler?` |\n| Двустороннее поле | controlled input | `v-model` | `bind:value` | `value? <=> field?` |\n| Список | `items.map()` | `v-for` | `{#each}` | ключевое `Row*` |\n| Условие | `cond && …` | `v-if` | `{#if}` | присвоить `null`, чтобы убрать |\n| Общее состояние | Redux / Context | Pinia / provide | stores | любой объект с `@ \u0024mol_mem` |\n| Роутинг | React Router | Vue Router | SvelteKit | `\u0024mol_state_arg` |\n| Стили | CSS-in-JS | scoped `<style>` | `<style>` | типизированный `.view.css.ts` |\n\n## Что обычно ощущается новым\n\n- **Реактивность автоматическая и необязательной не бывает.** Как `ref` во Vue или `\u0024:` в Svelte, значение `@ \u0024mol_mem` само обновляет своих читателей — но нет массива зависимостей, который надо поддерживать, и нигде нет ручной подписки.\n- **Эффекты отделены от вычислений.** React складывает вывод и эффекты в хуки; \u0024mol держит их порознь: `@ \u0024mol_mem` только вычисляет, `@ \u0024mol_action` выполняет эффекты. Именно это разделение убирает большинство загадок «почему это выполнилось дважды?».\n- **Состояние — это просто объекты.** Нет отдельной библиотеки стора, которую надо принимать — общее значение это реактивное свойство на любом объекте, поэтому глобальное состояние и состояние компонента работают одинаково.\n\n## Попробуйте перевод\n\nБыстрее всего усвоить соответствие — написать немного и того, и другого: откройте [Песочницу](#!section=playground), перенесите небольшой знакомый компонент и посмотрите, как он ложится. Или начните с [Быстрого старта](#!section=docs/page=getting-started).\n",
                        },
                    },
                },
                'plugins': {
                    slug: 'plugins',
                    title: "Plugins",
                    file: 'content/en/docs/plugins.md',
                    md: "# Plugins\n\nA **plugin** is a component with no DOM element of its own. Instead of rendering into the page, it attaches behaviour to the element of the component that hosts it — much like a directive. You list plugins under `plugins /` in a view.tree; they run alongside the view but never show up in its `sub`.\n\n```tree\n\u0024my_app \u0024mol_view\n\tplugins /\n\t\t<= Theme \u0024mol_theme_auto\n\t\t<= Search_key \u0024mol_hotkey\n\t\t\tkey *\n\t\t\t\tK? <=> open_search?\n\tsub /\n\t\t<= Content \u0024my_content\n```\n\nBecause a plugin shares its host's element, it can add event listeners, attributes, or reactive side-effects to that element without wrapping it in extra markup.\n\n## Plugins you'll use often\n\n- **`\u0024mol_hotkey`** — bind keyboard shortcuts. `key * escape? <=> close?` runs `close` on Escape; set `mod_ctrl true` to require Ctrl/⌘.\n- **`\u0024mol_theme_auto`** — apply a light/dark theme to the host subtree.\n- **`\u0024mol_nav`** — arrow-key navigation across a list of components (`keys_y`, `current_y`).\n- **`\u0024mol_speech`** — speech recognition input.\n\n## Writing one\n\nA plugin extends `\u0024mol_plugin` (which is itself element-less) and typically wires an `event` to a handler:\n\n```tree\n\u0024my_autosave \u0024mol_plugin\n\tevent *\n\t\t^\n\t\tinput? <=> save? null\n```\n\nAttach it to any view via that view's `plugins /` list, and it augments that view's element.\n",
                    tr: {
                        ru: {
                            title: "Плагины",
                            md: "# Плагины\n\n**Плагин** — это компонент без собственного DOM-элемента. Вместо того чтобы рендериться в страницу, он присоединяет поведение к элементу компонента, который его хостит — во многом как директива. Плагины перечисляются под `plugins /` в view.tree; они работают рядом со вью, но никогда не появляются в его `sub`.\n\n```tree\n\u0024my_app \u0024mol_view\n\tplugins /\n\t\t<= Theme \u0024mol_theme_auto\n\t\t<= Search_key \u0024mol_hotkey\n\t\t\tkey *\n\t\t\t\tK? <=> open_search?\n\tsub /\n\t\t<= Content \u0024my_content\n```\n\nПоскольку плагин разделяет элемент своего хоста, он может добавлять обработчики событий, атрибуты или реактивные побочные эффекты к этому элементу, не оборачивая его в дополнительную разметку.\n\n## Плагины, которые вы будете использовать часто\n\n- **`\u0024mol_hotkey`** — привязка горячих клавиш. `key * escape? <=> close?` запускает `close` по Escape; поставьте `mod_ctrl true`, чтобы требовать Ctrl/⌘.\n- **`\u0024mol_theme_auto`** — применяет светлую/тёмную тему к поддереву хоста.\n- **`\u0024mol_nav`** — навигация стрелками по списку компонентов (`keys_y`, `current_y`).\n- **`\u0024mol_speech`** — ввод распознаванием речи.\n\n## Написание своего\n\nПлагин наследует `\u0024mol_plugin` (который сам по себе без элемента) и обычно связывает `event` с обработчиком:\n\n```tree\n\u0024my_autosave \u0024mol_plugin\n\tevent *\n\t\t^\n\t\tinput? <=> save? null\n```\n\nПрисоедините его к любому вью через список `plugins /` этого вью, и он дополнит элемент этого вью.\n",
                        },
                    },
                },
                'meta': {
                    slug: 'meta',
                    title: "Module metadata",
                    file: 'content/en/docs/meta.md',
                    md: "# Module metadata\n\nAlongside a module's components, a `name.meta.tree` file declares **build and deploy metadata** — things that are about the module as a whole rather than any single view. The app module is the usual place for it.\n\nHere is this site's `app.meta.tree`:\n\n```tree\ninclude \\/mol/offline/install\ninclude \\/bog/builderui/theme.css\ndeploy \\/bog/smalljs/assets\n```\n\n## Directives\n\n- **`include \\/path`** — pull another module's files into this bundle. `\\/mol/offline/install` adds PWA offline support; `\\/bog/builderui/theme.css` pulls a raw CSS file into the build. Use it to bring in assets or side-effect modules that no class references directly.\n- **`deploy \\/path`** — extra paths to ship with the production deploy (images, fonts, and other static assets).\n- **`pack <name> git \\<url>`** — maps a namespace to the git repository MAM fetches it from, e.g. `pack mol git \\https://github.com/hyoo-ru/mam_mol.git`. This is how `\u0024mol_*`, `\u0024hyoo_*`, and your own packages resolve to real code.\n\n## Where it lives\n\n`pack` declarations belong in the **workspace-root** `.meta.tree` — that is the registry of every package the workspace can pull. Keep them there, not in submodules; a submodule's own `meta.tree` should only carry `include`/`deploy` that are specific to it.\n",
                    tr: {
                        ru: {
                            title: "Метаданные модуля",
                            md: "# Метаданные модуля\n\nРядом с компонентами модуля файл `name.meta.tree` объявляет **метаданные сборки и деплоя** — то, что касается модуля в целом, а не какого-то отдельного вью. Обычное место для него — модуль приложения.\n\nВот `app.meta.tree` этого сайта:\n\n```tree\ninclude \\/mol/offline/install\ninclude \\/bog/builderui/theme.css\ndeploy \\/bog/smalljs/assets\n```\n\n## Директивы\n\n- **`include \\/path`** — подтягивает файлы другого модуля в этот бандл. `\\/mol/offline/install` добавляет офлайн-поддержку PWA; `\\/bog/builderui/theme.css` втягивает сырой CSS-файл в сборку. Используйте, чтобы внести ассеты или модули с побочными эффектами, на которые ни один класс не ссылается напрямую.\n- **`deploy \\/path`** — дополнительные пути, которые поедут с продакшен-деплоем (изображения, шрифты и другие статические ассеты).\n- **`pack <name> git \\<url>`** — сопоставляет пространство имён с git-репозиторием, откуда MAM его тянет, например `pack mol git \\https://github.com/hyoo-ru/mam_mol.git`. Именно так `\u0024mol_*`, `\u0024hyoo_*` и ваши собственные пакеты разрешаются в настоящий код.\n\n## Где он живёт\n\nОбъявления `pack` относятся к `.meta.tree` **корня воркспейса** — это реестр каждого пакета, который воркспейс может подтянуть. Держите их там, а не в подмодулях; собственный `meta.tree` подмодуля должен нести только `include`/`deploy`, специфичные для него.\n",
                        },
                    },
                },
                'ghost': {
                    slug: 'ghost',
                    title: "Ghost views",
                    file: 'content/en/docs/ghost.md',
                    md: "# Ghost views\n\n`\u0024mol_ghost` is a **node-less** view. Instead of creating its own DOM element, it borrows the element of its `Sub()` and mixes its own attributes, styles, and behaviour onto it. In one line from the source: *\"mixin view logic to DOM node of another component.\"*\n\n```tree\n\u0024mol_ghost \u0024mol_view\n\tSub \u0024mol_view\n```\n\nA normal `\u0024mol_view` renders its own element. A ghost renders **none** — it reuses the child's element, so nothing extra is added to the DOM tree.\n\n## When to reach for it\n\nUse a ghost when you want to attach behaviour to an existing component *without* wrapping it in another element — dragging, dropping, follow-on-scroll, transitions. Several framework components are built on it:\n\n- **`\u0024mol_drag`** / **`\u0024mol_drop`** — pointer drag-and-drop\n- **`\u0024mol_transit`** — enter/leave transitions\n- **`\u0024mol_follower`** — keep an element aligned to another as it scrolls\n- **`\u0024mol_book_page`** — a page inside `\u0024mol_book2` navigation\n\n## Relation to plugins\n\n`\u0024mol_plugin` — the base every [plugin](#!section=docs/page=plugins) extends — is element-less for the same reason: it augments the host's element rather than adding one. A ghost is the general form (wrap one child and take over its node); a plugin is the specialised form you list under `plugins /`.\n",
                    tr: {
                        ru: {
                            title: "Ghost-вью",
                            md: "# Ghost-вью\n\n`\u0024mol_ghost` — это вью **без узла**. Вместо того чтобы создавать собственный DOM-элемент, оно заимствует элемент своего `Sub()` и подмешивает на него свои атрибуты, стили и поведение. Одной строкой из исходников: *«подмешать логику вью к DOM-узлу другого компонента»*.\n\n```tree\n\u0024mol_ghost \u0024mol_view\n\tSub \u0024mol_view\n```\n\nОбычный `\u0024mol_view` рендерит собственный элемент. Ghost не рендерит **ни одного** — он переиспользует элемент ребёнка, поэтому в DOM-дерево ничего лишнего не добавляется.\n\n## Когда за ним тянуться\n\nИспользуйте ghost, когда хотите присоединить поведение к существующему компоненту, *не* оборачивая его в другой элемент — перетаскивание, сброс, следование за скроллом, переходы. На нём построено несколько компонентов фреймворка:\n\n- **`\u0024mol_drag`** / **`\u0024mol_drop`** — drag-and-drop указателем\n- **`\u0024mol_transit`** — переходы появления/исчезновения\n- **`\u0024mol_follower`** — держит элемент выровненным по другому при скролле\n- **`\u0024mol_book_page`** — страница внутри навигации `\u0024mol_book2`\n\n## Связь с плагинами\n\n`\u0024mol_plugin` — база, которую наследует каждый [плагин](#!section=docs/page=plugins) — без элемента по той же причине: он дополняет элемент хоста, а не добавляет новый. Ghost это общая форма (обернуть одного ребёнка и перенять его узел); плагин — специализированная форма, которую вы перечисляете под `plugins /`.\n",
                        },
                    },
                },
                'faq': {
                    slug: 'faq',
                    title: "FAQ",
                    file: 'content/en/docs/faq.md',
                    md: "# FAQ\n\n## What is smalljs?\n\nsmalljs is the documentation site for **\u0024mol** — a reactive UI framework with typed views, automatic reactivity, and no virtual DOM. The framework itself is developed in the open by the hyoo-ru community; this site gathers a guide, an interactive course, a live playground, and an API reference in one place.\n\n## Is \u0024mol production-ready?\n\nYes. \u0024mol powers real apps and internal tools — see the [Showcase](#!section=docs/page=showcase). It ships from a single monorepo (MAM) and is used daily by its authors and community.\n\n## How big is the runtime?\n\nSmall. A typical \u0024mol app ships around 100 KB of framework code, and rendering is virtualized by default — components outside the viewport are never created. See [Rendering](#!section=docs/page=rendering) for the details and benchmarks.\n\n## Do I have to learn a new template language?\n\nYou learn `view.tree`, a compact tree syntax for declaring component layout. It is intentionally small — the [Views](#!section=docs/page=views) chapter covers everything you need in one sitting. Logic stays in plain TypeScript, and styles are typed too.\n\n## How is it different from React, Vue or Svelte?\n\nReactivity is automatic — there is no `useState`, `useEffect`, or manual subscription. You describe *what* the UI is; \u0024mol decides *how* and *when* to update it. The [concept translation table](#!section=docs/page=rosetta) maps ideas from other frameworks onto \u0024mol.\n\n## Where do I get help?\n\n- Ask in the [DEV community](https://dev.to/t/mol)\n- Browse the [\u0024mol source and issues on GitHub](https://github.com/hyoo-ru/mam_mol)\n- Read the reference docs at [mol.hyoo.ru](https://mol.hyoo.ru/)\n\n## What license is it under?\n\nMIT. You can use \u0024mol in commercial and open-source projects freely.\n",
                    tr: {
                        ru: {
                            title: "Частые вопросы",
                            md: "# Частые вопросы\n\n## Что такое smalljs?\n\nsmalljs — это сайт документации для **\u0024mol**, реактивного UI-фреймворка с типизированными вью, автоматической реактивностью и без виртуального DOM. Сам фреймворк открыто разрабатывается сообществом hyoo-ru; этот сайт собирает руководство, интерактивный курс, живую песочницу и справочник API в одном месте.\n\n## Готов ли \u0024mol к продакшену?\n\nДа. \u0024mol работает в реальных приложениях и внутренних инструментах — смотрите [Витрину](#!section=docs/page=showcase). Он поставляется из единого монорепозитория (MAM) и ежедневно используется своими авторами и сообществом.\n\n## Насколько велик рантайм?\n\nНебольшой. Типичное \u0024mol-приложение поставляет около 100 КБ кода фреймворка, а рендеринг виртуализирован по умолчанию — компоненты за пределами вьюпорта никогда не создаются. Подробности и бенчмарки — в [Рендеринге](#!section=docs/page=rendering).\n\n## Нужно ли учить новый язык шаблонов?\n\nВы учите `view.tree` — компактный древовидный синтаксис для описания разметки компонентов. Он намеренно маленький — глава [Вью](#!section=docs/page=views) покрывает всё нужное за один присест. Логика остаётся в обычном TypeScript, а стили тоже типизированы.\n\n## Чем он отличается от React, Vue или Svelte?\n\nРеактивность автоматическая — нет ни `useState`, ни `useEffect`, ни ручных подписок. Вы описываете, *что* представляет собой UI; \u0024mol решает, *как* и *когда* его обновлять. [Таблица перевода концепций](#!section=docs/page=rosetta) сопоставляет идеи из других фреймворков с \u0024mol.\n\n## Где получить помощь?\n\n- Спросите в [DEV-сообществе](https://dev.to/t/mol)\n- Полистайте [исходники и issues \u0024mol на GitHub](https://github.com/hyoo-ru/mam_mol)\n- Читайте справочную документацию на [mol.hyoo.ru](https://mol.hyoo.ru/)\n\n## Под какой лицензией?\n\nMIT. Вы можете свободно использовать \u0024mol в коммерческих и open-source проектах.\n",
                        },
                    },
                },
                'team': {
                    slug: 'team',
                    title: "Team",
                    file: 'content/en/docs/team.md',
                    md: "# Team\n\n\u0024mol is built in the open by **[hyoo-ru](https://github.com/hyoo-ru)** — the community around its author, Dmitry Karlovsky ([nin-jin](https://github.com/nin-jin)). Development happens in a single monorepo, [mam_mol](https://github.com/hyoo-ru/mam_mol), where the framework, its components, and the tooling all live together.\n\nThe ecosystem is a group effort: the core framework, the [\u0024hyoo_crowd](https://github.com/hyoo-ru/crowd.hyoo.ru) CRDT library, [Giper Baza](https://github.com/giper-dev/baza), and dozens of published components all come from contributors working in the same workspace.\n\n## Contributing\n\n- The whole ecosystem is MIT-licensed and open to pull requests.\n- Every module lives in the [mam_mol](https://github.com/hyoo-ru/mam_mol) monorepo — fork, add a folder, open a PR.\n- Discuss ideas and share what you build in the [DEV community](https://dev.to/t/mol).\n\nThis documentation site is maintained separately at [b-on-g/smalljs](https://github.com/b-on-g/smalljs); every page has an *Edit on GitHub* link if you spot something to improve.\n",
                    tr: {
                        ru: {
                            title: "Команда",
                            md: "# Команда\n\n\u0024mol строится открыто силами **[hyoo-ru](https://github.com/hyoo-ru)** — сообщества вокруг его автора, Дмитрия Карловского ([nin-jin](https://github.com/nin-jin)). Разработка идёт в едином монорепозитории [mam_mol](https://github.com/hyoo-ru/mam_mol), где фреймворк, его компоненты и тулинг живут все вместе.\n\nЭкосистема — общее дело: ядро фреймворка, CRDT-библиотека [\u0024hyoo_crowd](https://github.com/hyoo-ru/crowd.hyoo.ru), [Гипер База](https://github.com/giper-dev/baza) и десятки опубликованных компонентов — всё это приходит от контрибьюторов, работающих в одном воркспейсе.\n\n## Как участвовать\n\n- Вся экосистема под лицензией MIT и открыта для pull-реквестов.\n- Каждый модуль живёт в монорепозитории [mam_mol](https://github.com/hyoo-ru/mam_mol) — форкните, добавьте папку, откройте PR.\n- Обсуждайте идеи и делитесь тем, что построили, в [DEV-сообществе](https://dev.to/t/mol).\n\nЭтот сайт документации поддерживается отдельно на [b-on-g/smalljs](https://github.com/b-on-g/smalljs); у каждой страницы есть ссылка *Редактировать на GitHub*, если вы заметили, что можно улучшить.\n",
                        },
                    },
                },
                'releases': {
                    slug: 'releases',
                    title: "Releases",
                    file: 'content/en/docs/releases.md',
                    md: "# Releases\n\n\u0024mol is delivered **continuously**. Instead of cutting numbered versions, the framework ships straight from the [mam_mol](https://github.com/hyoo-ru/mam_mol) monorepo — every merged change is immediately available to anyone building against it. The MAM build tool always pulls the current sources, so there is no upgrade step and no version matrix to reconcile.\n\n## Following changes\n\n- **Commit history** — the [mam_mol commits](https://github.com/hyoo-ru/mam_mol/commits/master) are the canonical changelog.\n- **Per-module history** — each component folder on GitHub carries its own commit log, so you can watch just the parts you use.\n- **DEV community** — notable additions and write-ups are shared under the [#mol tag](https://dev.to/t/mol).\n\n## What this means in practice\n\nBecause there are no breaking release boundaries, the framework favours backward-compatible evolution: components gain features without renaming, and the typed `view.tree` interfaces make incompatibilities surface at compile time rather than at runtime. If a build stops compiling after an update, the TypeScript errors point you straight at what changed.\n",
                    tr: {
                        ru: {
                            title: "Релизы",
                            md: "# Релизы\n\n\u0024mol поставляется **непрерывно**. Вместо нарезки нумерованных версий фреймворк едет прямо из монорепозитория [mam_mol](https://github.com/hyoo-ru/mam_mol) — каждое смёрженное изменение немедленно доступно всем, кто на нём строит. Инструмент сборки MAM всегда тянет текущие исходники, поэтому нет ни шага обновления, ни матрицы версий, которую надо сводить.\n\n## Как следить за изменениями\n\n- **История коммитов** — [коммиты mam_mol](https://github.com/hyoo-ru/mam_mol/commits/master) это канонический changelog.\n- **История по модулю** — папка каждого компонента на GitHub несёт собственный лог коммитов, так что можно следить только за теми частями, которые вы используете.\n- **DEV-сообщество** — заметные добавления и разборы публикуются под [тегом #mol](https://dev.to/t/mol).\n\n## Что это значит на практике\n\nПоскольку нет ломающих релизных границ, фреймворк тяготеет к обратно совместимой эволюции: компоненты обретают возможности без переименований, а типизированные интерфейсы `view.tree` выводят несовместимости на этап компиляции, а не в рантайм. Если после обновления сборка перестала компилироваться, ошибки TypeScript укажут прямо на то, что изменилось.\n",
                        },
                    },
                },
                'api-mol-button-major': {
                    slug: 'api-mol-button-major',
                    title: "$mol_button_major",
                    file: 'content/en/docs/api-mol-button-major.md',
                    md: "# \u0024mol_button_major\n\nExtends `\u0024mol_button_minor`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/button/major)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `theme` | read | `string` |\n",
                },
                'api-mol-button-minor': {
                    slug: 'api-mol-button-minor',
                    title: "$mol_button_minor",
                    file: 'content/en/docs/api-mol-button-minor.md',
                    md: "# \u0024mol_button_minor\n\nExtends `\u0024mol_button_typed`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/button/minor)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n\u0024mol_button_minor adds no new bindable properties of its own — see `\u0024mol_button_typed`.\n",
                },
                'api-mol-string': {
                    slug: 'api-mol-string',
                    title: "$mol_string",
                    file: 'content/en/docs/api-mol-string.md',
                    md: "# \u0024mol_string\n\nExtends `\u0024mol_view`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/string)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `disabled` | read | `boolean` |\n| `value` | read / write | `string` |\n| `value_changed` | read / write | `as 'value'` |\n| `hint` | read | `string` |\n| `hint_visible` | read | `as 'hint'` |\n| `spellcheck` | read | `boolean` |\n| `autocomplete_native` | read | `string` |\n| `selection_end` | read | `number` |\n| `selection_start` | read | `number` |\n| `keyboard` | read | `string` |\n| `enter` | read | `string` |\n| `length_max` | read | `number` |\n| `type` | read / write | `string` |\n| `submit_with_ctrl` | read | `boolean` |\n| `Submit` | read | `\u0024mol_hotkey` |\n| `dom_name` | read | `string` |\n| `enabled` | read | `boolean` |\n| `minimal_height` | read | `number` |\n| `autocomplete` | read | `boolean` |\n| `auto` | read | `readonly(any)[]` |\n| `field` | read | `({` |\n| `attr` | read | `({` |\n| `event` | read | `({` |\n| `plugins` | read | `readonly(any)[]` |\n",
                },
                'api-mol-number': {
                    slug: 'api-mol-number',
                    title: "$mol_number",
                    file: 'content/en/docs/api-mol-number.md',
                    md: "# \u0024mol_number\n\nExtends `\u0024mol_view`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/number)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `precision` | read | `number` |\n| `Hotkey` | read | `\u0024mol_hotkey` |\n| `dec_enabled` | read | `as 'enabled'` |\n| `dec_icon` | read | `\u0024mol_icon_chevron_left` |\n| `Dec` | read | `\u0024mol_button_minor` |\n| `type` | read | `string` |\n| `value_string` | read / write | `string` |\n| `hint` | read | `string` |\n| `string_enabled` | read | `as 'enabled'` |\n| `String` | read | `\u0024mol_string` |\n| `inc_enabled` | read | `as 'enabled'` |\n| `inc_icon` | read | `\u0024mol_icon_chevron_right` |\n| `Inc` | read | `\u0024mol_button_minor` |\n| `precision_view` | read | `as 'precision'` |\n| `precision_change` | read | `as 'precision'` |\n| `boost` | read | `number` |\n| `value_min` | read | `number` |\n| `value_max` | read | `number` |\n| `value` | read / write | `number` |\n| `enabled` | read | `boolean` |\n| `plugins` | read | `readonly(any)[]` |\n| `sub` | read | `readonly(any)[]` |\n",
                },
                'api-mol-text': {
                    slug: 'api-mol-text',
                    title: "$mol_text",
                    file: 'content/en/docs/api-mol-text.md',
                    md: "# \u0024mol_text\n\nExtends `\u0024mol_list`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/text/text)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `highlight` | read | `string` |\n| `code_sidebar_showed` | read | `boolean` |\n| `pre_sidebar_showed` | read | `as 'code_sidebar_showed'` |\n| `uri_base` | read | `string` |\n| `text` | read | `string` |\n| `param` | read | `string` |\n| `flow_tokens` | read | `readonly(any)[]` |\n| `auto` | read | `readonly(any)[]` |\n",
                },
                'api-mol-paragraph': {
                    slug: 'api-mol-paragraph',
                    title: "$mol_paragraph",
                    file: 'content/en/docs/api-mol-paragraph.md',
                    md: "# \u0024mol_paragraph\n\nExtends `\u0024mol_view`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/paragraph)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `line_height` | read | `number` |\n| `letter_width` | read | `number` |\n| `width_limit` | read | `number` |\n| `row_width` | read | `number` |\n| `sub` | read | `readonly(any)[]` |\n",
                },
                'api-mol-list': {
                    slug: 'api-mol-list',
                    title: "$mol_list",
                    file: 'content/en/docs/api-mol-list.md',
                    md: "# \u0024mol_list\n\nExtends `\u0024mol_view`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/list)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `gap_before` | read | `number` |\n| `Gap_before` | read | `\u0024mol_view` |\n| `Empty` | read | `\u0024mol_view` |\n| `gap_after` | read | `number` |\n| `Gap_after` | read | `\u0024mol_view` |\n| `rows` | read | `readonly(\u0024mol_view)[]` |\n| `render_visible_only` | read | `boolean` |\n| `render_over` | read | `number` |\n| `sub` | read | `as 'rows'` |\n| `view_window_shift` | read / write | `number` |\n| `view_window` | read | `readonly(any)[]` |\n",
                },
                'api-mol-row': {
                    slug: 'api-mol-row',
                    title: "$mol_row",
                    file: 'content/en/docs/api-mol-row.md',
                    md: "# \u0024mol_row\n\nExtends `\u0024mol_view`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/row)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n\u0024mol_row adds no new bindable properties of its own — see `\u0024mol_view`.\n",
                },
                'api-mol-link': {
                    slug: 'api-mol-link',
                    title: "$mol_link",
                    file: 'content/en/docs/api-mol-link.md',
                    md: "# \u0024mol_link\n\nExtends `\u0024mol_view`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/link)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `uri_toggle` | read | `string` |\n| `hint` | read | `string` |\n| `hint_safe` | read | `as 'hint'` |\n| `target` | read | `string` |\n| `file_name` | read | `string` |\n| `current` | read | `boolean` |\n| `relation` | read | `string` |\n| `click` | read / write | `as 'event_click'` |\n| `uri` | read | `string` |\n| `dom_name` | read | `string` |\n| `uri_off` | read | `string` |\n| `external` | read | `boolean` |\n| `attr` | read | `({` |\n| `sub` | read | `readonly(\u0024mol_view_content)[]` |\n| `arg` | read | `Record<string, any>` |\n| `event` | read | `({` |\n",
                },
                'api-mol-check': {
                    slug: 'api-mol-check',
                    title: "$mol_check",
                    file: 'content/en/docs/api-mol-check.md',
                    md: "# \u0024mol_check\n\nExtends `\u0024mol_button_minor`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/check)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `checked` | read / write | `boolean` |\n| `aria_checked` | read | `string` |\n| `aria_role` | read | `string` |\n| `title` | read | `string` |\n| `Title` | read | `\u0024mol_view` |\n| `label` | read | `readonly(any)[]` |\n| `attr` | read | `({` |\n| `sub` | read | `readonly(\u0024mol_view_content)[]` |\n",
                },
                'api-mol-switch': {
                    slug: 'api-mol-switch',
                    title: "$mol_switch",
                    file: 'content/en/docs/api-mol-switch.md',
                    md: "# \u0024mol_switch\n\nExtends `\u0024mol_check_list`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/switch)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `value` | read / write | `string` |\n",
                },
                'api-mol-select': {
                    slug: 'api-mol-select',
                    title: "$mol_select",
                    file: 'content/en/docs/api-mol-select.md',
                    md: "# \u0024mol_select\n\nExtends `\u0024mol_pick`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/select)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `enabled` | read | `boolean` |\n| `filter_pattern` | read / write | `string` |\n| `no_options_message` | read | `string` |\n| `nav_components` | read | `readonly(\u0024mol_view)[]` |\n| `nav_cycle` | read / write | `boolean` |\n| `Nav` | read | `\u0024mol_nav` |\n| `menu_content` | read | `readonly(\u0024mol_view)[]` |\n| `Menu` | read | `\u0024mol_list` |\n| `Bubble_pane` | read | `\u0024mol_scroll` |\n| `filter_hint` | read | `string` |\n| `dictionary` | read / write | `Record<string, any>` |\n| `options` | read | `readonly(string)[]` |\n| `value` | read / write | `string` |\n| `option_label_default` | read | `string` |\n| `No_options` | read | `\u0024mol_view` |\n| `plugins` | read | `readonly(any)[]` |\n| `hint` | read | `string` |\n| `bubble_content` | read | `readonly(any)[]` |\n| `Filter` | read | `\u0024mol_search` |\n| `Trigger_icon` | read | `\u0024mol_icon_dots_vertical` |\n| `trigger_enabled` | read | `as 'enabled'` |\n",
                },
                'api-mol-scroll': {
                    slug: 'api-mol-scroll',
                    title: "$mol_scroll",
                    file: 'content/en/docs/api-mol-scroll.md',
                    md: "# \u0024mol_scroll\n\nExtends `\u0024mol_view`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/scroll)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `tabindex` | read | `number` |\n| `scroll_top` | read / write | `number` |\n| `scroll_left` | read / write | `number` |\n| `attr` | read | `({` |\n| `event` | read | `({` |\n",
                },
                'api-mol-page': {
                    slug: 'api-mol-page',
                    title: "$mol_page",
                    file: 'content/en/docs/api-mol-page.md',
                    md: "# \u0024mol_page\n\nExtends `\u0024mol_view`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/page)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `tabindex` | read | `number` |\n| `title_content` | read | `readonly(any)[]` |\n| `Title` | read | `\u0024mol_view` |\n| `tools` | read | `readonly(\u0024mol_view_content)[]` |\n| `Tools` | read | `\u0024mol_view` |\n| `head` | read | `readonly(any)[]` |\n| `Head` | read | `\u0024mol_view` |\n| `body_scroll_top` | read / write | `ReturnType< as 'Body'['scroll_top'] >` |\n| `body` | read | `readonly(\u0024mol_view)[]` |\n| `Body_content` | read | `\u0024mol_view` |\n| `body_content` | read | `readonly(any)[]` |\n| `Body` | read | `\u0024mol_scroll` |\n| `foot` | read | `readonly(\u0024mol_view)[]` |\n| `Foot` | read | `\u0024mol_view` |\n| `dom_name` | read | `string` |\n| `attr` | read | `({` |\n| `sub` | read | `readonly(any)[]` |\n",
                },
                'api-mol-pick': {
                    slug: 'api-mol-pick',
                    title: "$mol_pick",
                    file: 'content/en/docs/api-mol-pick.md',
                    md: "# \u0024mol_pick\n\nExtends `\u0024mol_pop`. [View source on GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/pick)\n\nThis reference is generated from the component's typed `.view.tree` interface.\n\n## Properties\n\n| Property | Access | Type |\n|---|---|---|\n| `trigger_enabled` | read | `boolean` |\n| `trigger_content` | read | `readonly(\u0024mol_view_content)[]` |\n| `hint` | read | `string` |\n| `Trigger` | read | `\u0024mol_check` |\n| `event` | read | `({` |\n| `Anchor` | read | `as 'Trigger'` |\n",
                },
            };
        }
        /** Flat ordered slug list for prev/next. */
        static order(section = 'docs') {
            const sec = this.sections().find(s => s.id === section);
            if (!sec)
                return [];
            return sec.groups.flatMap(g => g.pages);
        }
        static page(slug) {
            return this.pages()[slug] ?? null;
        }
        /** Markdown for a page in the given language, falling back to EN. */
        static page_md(slug, lang = 'en') {
            const page = this.pages()[slug];
            if (!page)
                return null;
            return page.tr?.[lang]?.md ?? page.md;
        }
        /** Localized title for a page, falling back to EN. */
        static page_title(slug, lang = 'en') {
            const page = this.pages()[slug];
            if (!page)
                return null;
            return page.tr?.[lang]?.title ?? page.title;
        }
        static default_slug() {
            return 'introduction';
        }
    }
    $.$bog_smalljs_content = $bog_smalljs_content;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Dynamic sources import. */
    class $mol_import extends $mol_object2 {
        static module(uri) {
            $mol_wire_solid();
            return $mol_wire_sync(this).module_async(uri);
        }
        static module_async(uri) {
            return import(uri);
        }
        static script(uri) {
            $mol_wire_solid();
            return $mol_wire_sync(this).script_async(uri);
        }
        static script_async(uri) {
            const doc = $mol_dom_context.document;
            const script = doc.createElement('script');
            script.src = uri;
            doc.head.appendChild(script);
            return new Promise((done, fail) => {
                script.onload = () => done($mol_dom_context);
                script.onerror = () => fail(new Error(`Can not import ${uri}`));
            });
        }
        static style(uri) {
            return $mol_wire_sync(this).style_async(uri);
        }
        static style_async(uri) {
            const doc = $mol_dom_context.document;
            const style = doc.createElement('link');
            style.rel = 'stylesheet';
            style.href = uri;
            doc.head.appendChild(style);
            return new Promise((done, fail) => {
                style.onload = () => done(style.sheet);
                style.onerror = () => fail(new Error(`Can not import ${uri}`));
            });
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_import, "module", null);
    __decorate([
        $mol_mem_key
    ], $mol_import, "script", null);
    __decorate([
        $mol_mem_key
    ], $mol_import, "style", null);
    $.$mol_import = $mol_import;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_smalljs_embeddings extends $mol_object2 {
        static model() { return 'Xenova/all-MiniLM-L6-v2'; }
        static dim() { return 384; }
        static index() {
            return [
                { slug: 'api-mol-button-major', vector: [-0.0096, 0.0065, 0.0465, 0.0831, 0.0071, 0.0175, 0.0241, -0.0358, -0.0059, 0.0199, -0.0047, 0.051, -0.0841, 0.0323, 0.0205, 0.0403, -0.0369, -0.0214, -0.0012, 0.0552, 0.1063, 0.0213, 0.0561, -0.0398, -0.0611, -0.0087, 0.0066, -0.0045, 0.0552, -0.0179, 0.0142, 0.1875, 0.0752, -0.0209, -0.0736, -0.0069, 0.0481, -0.0229, 0.0577, 0.0208, -0.0305, 0.0801, 0.0058, -0.0427, -0.0174, -0.0332, 0.0438, -0.0523, -0.0676, -0.0128, 0.0471, -0.0679, 0.0221, -0.0604, -0.0094, 0.0073, -0.0199, 0.0413, 0.0559, 0.0939, -0.0274, 0.031, -0.018, 0.002, -0.0027, 0.0548, 0.0382, -0.0631, -0.056, -0.1125, -0.0316, -0.1209, 0.084, -0.0137, -0.001, -0.0332, 0.0286, 0.0422, 0.0086, -0.0529, -0.0254, 0.0364, -0.089, 0.0113, 0.0745, 0.1083, -0.0154, 0.0042, 0.0096, -0.0097, 0.0076, -0.0757, -0.042, 0.0766, 0.0296, -0.0134, -0.0023, -0.0954, -0.0951, 0.0284, -0.003, -0.0003, 0.0197, 0.063, 0.0583, 0.0099, 0.0281, -0.0248, -0.0534, 0.0164, 0.0185, 0.0519, -0.0223, -0.0562, 0.0651, -0.0878, 0.0001, -0.0011, 0.0801, -0.0366, 0.031, -0.1022, -0.1171, -0.0151, -0.0174, 0.0329, 0.0044, 0, 0.0425, 0.046, -0.0401, 0.0122, 0.0262, 0.0006, 0.0705, -0.0621, -0.0695, 0.0117, 0.0392, -0.0271, -0.0411, -0.0306, -0.0146, 0.0337, -0.0366, -0.0014, -0.0548, -0.0719, 0.0085, 0.1537, -0.0345, 0.0733, 0.0082, 0.057, 0.0597, -0.0155, 0.0088, -0.0117, 0.0932, -0.0277, 0.0685, 0.0117, -0.0828, 0.0052, 0.0153, -0.0569, 0.054, -0.0121, -0.0979, 0.0228, -0.0198, 0.0132, -0.0397, 0.0393, -0.0032, 0.0418, -0.0223, -0.0954, -0.0881, 0.0358, -0.014, -0.0456, -0.0112, 0.0344, 0.0041, 0.0854, 0.009, 0.0084, -0.065, -0.0371, 0.0667, 0.0287, -0.0491, 0.0821, 0.006, -0.063, 0.0597, -0.0535, 0.0272, 0.0525, -0.079, 0.0348, 0.0573, -0.0842, 0.0506, -0.0413, 0.1154, 0.0636, -0.077, -0.0206, 0.0145, 0.0405, 0.0158, -0.0739, -0.0199, -0.0439, 0.0385, -0.0511, -0.0847, -0.1072, -0.0512, -0.0262, -0.0094, 0, 0.046, -0.0151, 0.0223, -0.0181, -0.1149, -0.0465, -0.1123, 0.0714, -0.0629, -0.0467, 0.054, 0.1023, 0.0396, -0.0011, 0.0159, 0.0403, -0.0399, -0.0378, -0.043, -0.0033, 0.0792, -0.0096, -0.0193, -0.021, -0.0148, 0.0051, 0.0198, 0.0127, 0.0517, -0.0534, 0.0672, 0.0037, -0.0433, 0.0315, -0.0006, -0.0231, -0.0192, -0.032, -0.1465, 0.0466, -0.0771, 0.0035, 0.12, -0.0112, -0.0622, 0.0185, 0.0238, 0.0318, -0.016, -0.0151, 0.0111, -0.0779, 0.0225, -0.04, -0.0294, -0.0108, -0.0236, -0.0134, -0.0132, 0.0058, 0.1221, -0.0506, -0.0433, -0.0612, -0.0379, 0.0573, 0.0088, -0.0403, 0.0799, 0.0082, 0.0428, -0.0114, -0.0109, -0.0483, 0.0317, -0.0045, 0.0534, 0.0649, 0.0048, -0.0382, 0.0346, 0.0243, 0.0005, -0.0369, 0.0786, -0.0552, -0.0347, 0.066, 0.0712, 0.0252, -0.1064, 0.0656, 0.0178, -0.0002, 0.0137, 0, -0.0748, 0.0381, -0.039, -0.1229, 0.0355, 0.0175, -0.0434, -0.0184, -0.0598, 0.041, 0.0572, 0.0735, -0.0313, -0.0227, -0.0108, 0.0312, -0.0389, 0.0091, -0.0252, 0.0356, 0.0446, -0.0087, 0.0363, 0.0456, -0.0148, -0.0086, -0.011, 0.1124, 0.0227, 0.0818, 0.0192, 0.0471, 0.0337, -0.0019, 0.0089, 0.1238, -0.02, 0.0338, 0.0307, 0.0033, 0.0018, -0.1255, 0.045, 0.056, -0.0605, -0.0104, -0.0455, 0.0305, 0.0306, 0.0251, -0.0154, -0.0064, -0.0751, 0.0875, -0.1118, 0.0341, -0.007, 0.0537, 0.0422, -0.0785, 0.0221, -0.0429, -0.0298, 0.0278] },
                { slug: 'api-mol-button-minor', vector: [-0.0495, -0.045, 0.0341, 0.1234, -0.0246, 0.0098, 0.0268, -0.028, 0.0335, 0.0415, 0.0536, 0.0431, -0.046, 0.0454, 0.0167, 0.0834, -0.0364, -0.0296, -0.0218, 0.0318, 0.0515, 0.0645, 0.01, -0.0272, -0.0637, -0.02, -0.0359, -0.0443, 0.0713, -0.0163, -0.0324, 0.1668, 0.04, -0.0174, -0.0794, 0.0364, 0.0826, -0.0036, 0.0285, 0.0074, -0.0136, 0.0501, 0.0025, -0.03, -0.0465, -0.0279, 0.0543, -0.0455, -0.0992, -0.0183, 0.0316, -0.0641, 0.0207, -0.0538, 0.004, -0.0336, -0.0624, 0.0432, 0.0535, 0.0884, 0.011, 0.0518, -0.0243, 0.0165, 0.0178, 0.0157, 0.0259, -0.0908, -0.0517, -0.048, -0.0271, -0.1023, 0.0722, 0.002, 0.008, -0.0465, 0.0309, -0.0024, 0.0781, -0.0648, -0.0489, 0.0529, -0.0767, 0.0105, 0.0503, 0.0945, -0.0075, -0.0058, -0.0074, -0.0033, -0.0141, -0.0778, -0.0393, 0.0886, 0.0241, -0.0468, -0.0148, -0.0341, -0.1356, 0.0246, 0.0032, 0.0603, -0.0146, 0.0931, 0.0334, -0.0284, -0.0214, -0.0807, -0.067, 0.077, 0.0144, 0.0477, -0.0071, -0.0826, 0.0072, -0.0772, -0.0074, -0.007, 0.0177, -0.0541, -0.0037, -0.1011, -0.0909, -0.0129, -0.0226, -0.006, 0.0183, 0, 0.0747, 0.0541, -0.047, 0.0462, 0.0663, 0.0478, 0.0538, -0.0541, -0.092, 0.0138, 0.073, -0.0305, -0.034, -0.0036, 0.0137, 0.0542, -0.0124, 0.0027, -0.0481, -0.0401, -0.0253, 0.165, -0.0469, 0.0609, 0.028, 0.0593, 0.0383, 0.0162, -0.0193, -0.0147, 0.0888, -0.0148, 0.0327, 0.0077, -0.0875, -0.008, 0.0142, -0.0762, -0.0011, -0.0445, -0.0307, 0.0203, -0.0447, 0.0158, -0.0437, -0.012, 0.0109, 0.0765, -0.0545, -0.1125, -0.0671, 0.0692, -0.0137, -0.0456, -0.0556, 0.0711, -0.042, 0.0497, -0.0094, 0.0249, -0.0475, -0.0288, 0.0448, 0.0312, -0.0344, 0.0936, 0.0205, -0.0686, 0.0936, -0.0272, 0.0427, 0.055, -0.1077, 0.0351, 0.0694, -0.0981, 0.0525, -0.0944, 0.1121, 0.0485, -0.0514, -0.0189, 0.0285, 0.0715, 0.0133, -0.1281, -0.0315, 0.0039, 0.0442, -0.0178, -0.0666, -0.1014, -0.0244, -0.0187, 0.0169, 0, 0.027, -0.0517, -0.0063, -0.008, -0.1052, -0.0371, -0.1076, 0.0617, -0.0546, -0.0841, 0.0479, 0.0458, 0.0285, 0.009, -0.0098, 0.0428, -0.0861, -0.0551, -0.0402, -0.0308, 0.1313, 0.004, 0.004, 0.0284, -0.0082, -0.0183, -0.0149, 0.0513, 0.0171, -0.028, 0.0616, -0.0114, -0.0345, -0.0138, -0.0149, -0.0508, 0.0043, -0.0367, -0.0651, -0.012, -0.0639, 0.0256, 0.0981, 0.0305, 0.0037, 0.0002, 0.0122, 0.0127, 0.0272, -0.0136, 0.0085, -0.0438, -0.0275, -0.0128, -0.0637, 0.024, -0.045, -0.0123, 0.0522, -0.0134, 0.0536, -0.0596, -0.0547, -0.0054, -0.0035, 0.0361, -0.0119, -0.046, 0.1204, -0.0469, 0.037, 0.0044, 0.024, -0.0773, 0.0837, -0.0213, 0.0563, 0.0171, 0.0454, -0.0592, 0.0426, 0.0066, 0.0158, -0.0193, 0.0972, -0.0222, -0.0362, 0.0605, 0.0487, 0.0588, -0.0572, 0.0629, -0.0384, -0.0054, -0.039, 0, -0.0708, 0.0519, -0.0409, -0.09, 0.0157, -0.0143, 0.0167, 0.0264, -0.0252, 0.0213, 0.0433, 0.0751, -0.0428, 0.0056, 0.0025, 0.0043, -0.0434, -0.0273, -0.0275, 0.0617, 0.057, -0.0115, 0.0541, 0.0991, -0.0101, -0.0765, 0.0057, 0.0831, -0.0157, 0.0805, 0.0422, 0.0605, 0.0516, 0.0611, -0.0218, 0.1049, -0.0451, 0.0343, -0.0158, 0.0497, 0.0049, -0.1151, 0.0211, 0.0292, -0.021, 0.0228, -0.061, 0.0077, 0.0426, 0.0112, 0.0129, 0.0188, -0.0061, 0.0299, -0.0483, 0.0323, 0.0056, 0.0612, 0.08, -0.0231, -0.0135, -0.0828, 0.0005, -0.0056] },
                { slug: 'api-mol-check', vector: [0.0077, -0.0478, -0.048, 0.1015, 0.0194, -0.0145, 0.1034, -0.0822, 0.0458, -0.0089, 0.0544, 0.0198, -0.0154, 0.0752, -0.0775, 0.0131, -0.0184, -0.0282, -0.0125, -0.0227, 0.0293, 0.0083, 0.0215, -0.0185, -0.0925, 0.0123, -0.0134, -0.044, -0.0022, -0.0356, 0.0225, 0.1381, 0.037, -0.0042, -0.0324, 0.0102, 0.0768, -0.0518, 0.0483, -0.0253, -0.0301, 0.01, -0.052, -0.0597, 0.0157, -0.0201, 0.0137, -0.0751, -0.0505, -0.0002, 0.0316, -0.0819, 0.0336, -0.0586, 0.013, -0.0188, -0.0262, 0.0368, 0.0186, 0.0904, -0.0312, 0.0272, -0.0398, 0.0345, -0.0116, 0.0972, -0.0099, -0.1029, -0.0303, -0.0744, -0.0594, -0.0655, 0.1335, -0.0109, -0.0642, -0.04, 0.0741, -0.0595, 0.0797, -0.0733, -0.0638, 0.0655, -0.0498, 0.029, 0.0468, 0.1282, 0.0181, 0.0221, 0.007, -0.0554, 0.0052, -0.0386, -0.0509, 0.1056, 0.0105, 0.0209, 0.0011, -0.0272, -0.096, 0.0535, 0.0175, 0.0213, 0.0087, 0.022, 0.0599, -0.0195, 0.0429, -0.0039, -0.0436, 0.0351, -0.0032, 0.0891, 0.0513, -0.0125, 0.0067, -0.0798, 0.0472, 0.0311, 0.0294, 0.0007, -0.0033, -0.0801, -0.0945, 0.0178, 0.0496, -0.0179, 0.0565, 0, 0.0738, 0.0437, -0.0208, -0.0161, -0.0211, -0.0313, 0.0705, -0.0351, -0.0471, -0.0156, 0.1018, -0.0327, -0.0824, -0.0318, 0.0334, 0.0275, -0.0182, -0.0284, -0.0399, -0.0759, -0.0227, 0.0383, -0.0375, 0.0414, -0.0002, 0.0059, -0.0108, -0.0253, -0.0275, 0.0093, 0.0589, -0.0074, 0.0209, 0.0017, -0.0868, -0.0464, -0.0127, -0.027, 0.014, -0.0362, -0.0376, -0.0492, 0.0271, -0.0339, -0.0415, 0.0327, -0.0886, 0.0515, -0.0106, -0.0684, -0.0321, 0.0479, -0.0575, -0.0528, -0.0273, 0.02, -0.025, 0.0562, 0.0119, 0.0718, -0.0396, 0.0097, 0.0409, 0.0372, -0.0974, 0.0417, -0.0315, -0.0689, 0.0632, -0.0274, -0.073, 0.0123, -0.0241, 0.045, 0.0327, -0.0835, 0.0497, -0.0429, 0.1578, 0.0615, 0.0247, -0.0174, 0.0475, 0.0329, 0.0078, -0.0869, -0.0192, -0.0581, 0.0069, -0.0367, -0.0635, -0.0866, -0.0402, -0.0882, 0.0176, 0, 0.0706, -0.0558, 0.0581, -0.0223, -0.1742, -0.0924, -0.0953, 0.0544, 0.0338, -0.0307, 0.0276, 0.0268, 0.0324, 0.0162, 0.0001, 0.0431, -0.0643, -0.1058, -0.0057, 0.0559, 0.1159, 0.0583, 0.001, 0.0429, 0.0187, 0.0193, -0.002, -0.0279, 0.0496, -0.0005, 0.0451, 0.0036, 0.0372, 0.0067, -0.0212, -0.0659, 0.0277, 0.0403, -0.1116, 0.0446, -0.0382, 0.0501, 0.0634, -0.0218, -0.0893, 0.0217, 0.0517, 0.0476, -0.0421, -0.0165, 0.0037, -0.0352, 0.0097, 0.0031, -0.009, 0.0172, -0.0178, -0.0434, 0.0127, -0.0681, 0.0336, -0.0929, -0.0504, -0.0364, -0.0026, 0.0273, 0.0082, -0.0418, 0.1183, -0.0162, 0.062, -0.0642, -0.0255, -0.0654, 0.0595, 0.0142, 0.0078, 0.0044, -0.0344, 0.0107, 0.0687, 0.0047, -0.0118, 0.0475, 0.1007, -0.0355, -0.0674, -0.0055, 0.0472, 0.0321, -0.0921, 0.0389, 0.0124, -0.0338, -0.0098, 0, -0.1179, -0.0054, -0.0134, -0.0565, 0.0458, -0.0182, -0.0158, -0.0209, -0.048, -0.0017, 0.0527, 0.0796, -0.0489, -0.0699, -0.0185, 0.0245, -0.013, 0.0355, 0.0076, 0.0869, 0.0494, 0.0051, -0.007, 0.1166, 0.011, 0.0181, -0.0239, 0.0438, 0.0123, 0.044, 0.0925, 0.0571, 0.0869, 0.0314, -0.0177, 0.1528, 0.0153, 0.0466, 0.0297, 0.0918, 0.0328, -0.0778, 0.0197, 0.0528, -0.0667, -0.0027, -0.0278, -0.0177, 0.0339, -0.0685, 0.0034, -0.0168, -0.0372, 0.0685, -0.1069, 0.0109, 0.0396, 0.0464, 0.0483, 0.0395, 0.0479, -0.0225, 0.0145, -0.0481] },
                { slug: 'api-mol-link', vector: [-0.0565, -0.0385, -0.0112, 0.1229, 0.0289, -0.0073, 0.0436, -0.0059, 0.0662, -0.045, 0.0317, 0.0283, 0.0102, 0.05, -0.0769, 0.0927, -0.0521, 0.016, -0.0072, 0.0146, 0.0685, 0.0151, -0.0217, -0.0252, -0.0742, -0.0353, 0.0142, -0.0231, 0.0085, -0.0579, 0.0706, 0.0696, -0.0804, -0.0712, 0.006, -0.0101, 0.0416, -0.0485, 0.033, -0.0126, 0.0352, 0.0695, -0.0312, -0.0688, -0.0136, -0.0058, 0.0203, -0.0399, -0.0759, 0.0069, -0.0692, -0.0146, -0.0061, -0.0629, 0.0616, -0.014, -0.0528, 0.0597, -0.008, 0.0632, -0.0081, 0.0024, -0.0235, -0.0134, -0.0293, 0.0524, -0.0251, -0.0166, 0.012, -0.1045, -0.1231, -0.0653, 0.1282, -0.029, -0.0361, -0.0353, 0.0404, -0.0003, 0.0575, -0.0931, 0.0395, 0.0406, 0.033, -0.0183, 0.076, 0.1581, -0.0144, 0.0275, -0.0098, -0.0228, 0.0106, -0.0647, -0.0453, 0.0819, 0.0319, 0.0322, -0.003, -0.0138, -0.0817, 0.0513, 0.0362, 0.075, 0.0578, 0.0415, -0.0088, -0.0334, 0.0285, 0.0902, -0.0309, 0.0178, -0.0051, 0.0366, -0.0292, -0.0416, -0.0547, -0.0883, 0.0341, 0.0439, 0.0352, -0.0303, 0.0218, -0.0369, -0.0695, 0.0396, -0.0014, -0.0685, 0.0603, 0, 0.1096, 0.0575, -0.0624, -0.0816, 0.0022, -0.0533, 0.0541, -0.0325, -0.0464, -0.0109, 0.0309, -0.0344, -0.0678, -0.0277, 0.0329, 0.05, -0.078, -0.0154, -0.0309, -0.0744, -0.0614, 0.0611, -0.0426, 0.0307, 0.0495, 0.0425, 0.0004, -0.0611, -0.0195, 0.0027, 0.1351, 0.0051, 0.0247, -0.039, -0.0134, -0.0359, -0.0445, -0.0576, -0.0534, -0.0076, -0.0144, -0.0658, 0.0468, -0.0183, -0.0521, 0.0306, -0.0934, 0.0399, -0.1, -0.0842, -0.0105, 0.0452, -0.0345, -0.0593, 0.0089, -0.0015, -0.1142, 0.0384, 0.0242, 0.1193, -0.0571, 0.0149, 0.0709, 0.0091, -0.1207, -0.0008, -0.0243, -0.0948, 0.0248, -0.0039, -0.0706, 0.0608, -0.0114, 0.0221, 0.0073, -0.0546, -0.0564, -0.0956, 0.1508, 0.0688, -0.0236, -0.0642, 0.1165, 0.0574, 0.006, -0.0678, -0.033, -0.0705, -0.0155, -0.0532, 0.0231, -0.0295, -0.017, -0.0487, 0.0316, 0, 0.0924, -0.0053, 0.0798, -0.0441, -0.1188, -0.0256, -0.0606, -0.0074, 0.0295, 0.0189, 0.0243, 0.0874, 0.0347, 0.0539, 0.0205, 0.0283, -0.0209, -0.0977, -0.0388, 0.0514, 0.1039, 0.0457, 0.0378, 0.0073, 0.0068, -0.0051, 0.0852, -0.03, 0.0372, -0.0252, 0.0323, 0.0059, 0.0015, -0.0357, 0.0088, 0.0375, 0.0256, 0.0536, -0.0686, 0.0074, 0.0069, 0.0441, -0.0094, -0.0334, -0.0441, -0.0005, -0.0075, 0.0275, 0.0026, -0.0251, 0.0082, -0.0177, 0.0645, -0.0697, 0.0065, 0.0176, -0.018, -0.0536, -0.0533, -0.0233, 0.0739, -0.0716, -0.0764, 0.0669, 0.0036, -0.0008, -0.029, -0.0467, 0.0522, -0.0748, 0.0206, -0.0715, -0.0295, -0.0664, 0.1272, -0.0175, 0.0289, -0.0069, 0.0324, -0.0034, 0.0691, -0.0183, 0.0236, -0.0298, 0.0962, 0.0023, -0.0874, 0.0459, 0.0432, -0.0161, -0.0982, 0.036, 0.0063, 0.0339, 0.001, 0, -0.0887, -0.0234, 0.0283, -0.0719, 0.0039, 0.0346, -0.0081, 0.0463, -0.0786, 0.0128, 0.0416, 0.0631, -0.0501, -0.0026, -0.0298, 0.0529, 0.003, 0.0135, 0.0168, 0.0313, 0.0283, -0.0202, -0.0279, 0.1247, 0.0539, -0.0221, -0.0164, 0.0688, 0.0071, 0.0331, 0.063, 0.0418, 0.0215, 0.0287, -0.0825, 0.1213, 0.0129, 0.008, -0.0079, 0.0557, 0.0605, -0.0472, 0.1163, 0.0493, -0.0494, -0.0282, 0.0276, -0.0241, 0.0546, -0.0122, -0.0255, -0.0167, -0.0135, 0.0288, -0.0657, -0.0205, 0.0495, -0.0254, 0.0038, 0.0179, 0.0265, -0.0288, -0.0064, -0.0059] },
                { slug: 'api-mol-list', vector: [-0.0487, -0.0281, -0.0537, 0.1152, 0.0013, 0.0209, 0.0409, -0.0177, 0.0825, -0.043, 0.0307, 0.0179, 0.005, 0.0135, -0.0527, 0.0224, -0.0345, -0.0511, 0.0096, -0.0271, 0.076, 0.0638, -0.0509, -0.0128, -0.0113, 0.0525, -0.0192, -0.04, 0.0467, -0.0431, -0.0224, 0.1235, 0.0245, -0.0028, 0.0055, -0.0277, 0.083, -0.0025, -0.0398, 0.0223, 0.0052, 0.0445, -0.0567, -0.0947, -0.0082, 0.0038, 0.0427, -0.0746, -0.056, -0.0578, -0.0713, 0.0134, -0.011, -0.0166, 0.016, -0.0538, -0.003, 0.0437, -0.0187, 0.0476, -0.064, 0.0592, -0.0127, 0.0154, -0.0371, 0.0605, -0.0006, -0.0703, 0.0317, -0.044, -0.0429, 0.0123, 0.0825, -0.1008, -0.0481, -0.0385, 0.0892, -0.0545, 0.0947, -0.0852, -0.0303, 0.0515, -0.036, 0.0131, 0.0096, 0.087, -0.0128, 0.0369, -0.0114, -0.043, -0.0155, -0.0452, -0.0804, 0.1706, -0.017, 0.0445, 0.0836, 0.0006, -0.1049, 0.0158, 0.0012, 0.0689, 0.0449, 0.053, -0.0247, -0.0501, 0.0525, -0.0316, -0.081, 0.0144, 0.0529, 0.0725, -0.02, -0.0112, -0.0375, -0.1034, 0.0204, -0.0026, 0.0445, 0.0296, 0.029, -0.0599, -0.0497, 0.0508, 0.0723, -0.0006, 0.0192, 0, 0.0267, -0.027, 0.0123, -0.009, 0.0412, -0.0637, 0.0288, -0.0402, -0.0527, 0.0063, 0.0698, -0.0116, -0.0626, -0.0032, 0.0363, 0.0125, -0.0155, -0.0427, -0.0802, -0.0748, -0.0472, 0.0363, -0.0686, 0.0655, 0.0407, 0.0712, -0.0149, -0.0422, -0.0525, 0.0135, 0.0907, 0.0492, 0.0383, -0.0406, -0.0689, -0.0068, 0.0065, -0.0735, 0.0215, -0.0274, -0.0796, -0.0083, 0.0387, -0.0128, -0.0182, -0.0228, -0.0332, 0.1398, -0.0487, 0.0014, -0.0182, 0.0909, -0.1044, -0.0795, -0.0233, -0.0618, -0.0056, 0.0539, 0.0585, 0.1162, -0.071, 0.0135, 0.0636, 0.0325, -0.0781, 0.0207, -0.0605, -0.0975, -0.0071, -0.0015, -0.0517, 0.0332, 0.0021, 0.0786, 0.0418, -0.0496, 0.0277, -0.1167, 0.1018, 0.0382, 0.0489, 0.0007, 0.0542, 0.0452, -0.0579, -0.0541, 0.007, -0.0116, -0.0063, -0.0651, -0.0392, -0.0901, 0.0387, -0.1075, -0.0184, 0, 0.0515, -0.0175, 0.0375, -0.0445, -0.1017, -0.0887, -0.0518, 0.0548, 0.0473, -0.011, 0.0473, 0.0871, 0.035, 0.0434, -0.0126, -0.005, 0.0141, -0.1183, -0.0134, 0.0089, 0.1304, 0.0232, -0.0039, 0.0214, -0.043, -0.0089, -0.0037, -0.0374, 0.0472, -0.0274, 0.0123, -0.0444, 0.018, -0.03, -0.0234, -0.0381, -0.003, 0.0115, -0.1409, 0.0512, -0.0515, 0.0564, 0.0194, -0.0309, -0.0697, 0.0255, 0.049, 0.0196, 0.0159, -0.0513, 0.0336, 0.014, 0.0095, 0.02, -0.0122, -0.0001, 0.0017, 0.006, 0.0425, -0.0511, 0.0589, -0.0393, -0.059, -0.031, 0.022, -0.0292, -0.0499, -0.0361, 0.0943, -0.0932, -0.0047, -0.0691, -0.0343, -0.0563, 0.0407, -0.0239, 0.0151, 0.0296, 0.0322, 0.0776, 0.0206, -0.0143, 0.0255, 0.0118, 0.0777, -0.0128, -0.06, 0.009, 0.0834, 0.0097, -0.0739, -0.0136, -0.0014, 0.0012, -0.0104, 0, -0.1207, -0.0654, 0.0284, -0.071, 0.0184, -0.0375, 0.0089, 0.0267, -0.0405, 0.0181, 0.0577, 0.0515, -0.0154, -0.0185, 0.0556, 0.076, 0.0245, -0.0265, 0.0091, 0.0516, 0.0098, -0.0296, -0.0169, 0.0631, 0.0675, 0.0016, -0.0233, 0.0346, 0.017, -0.0034, 0.0531, 0.0868, 0.1159, 0.0338, -0.0188, 0.113, 0.0236, 0.1013, 0.0196, 0.0781, -0.0233, -0.1425, 0.0668, 0.0757, -0.0255, -0.026, 0.0091, 0.0062, 0.0121, -0.0567, -0.0258, -0.0076, -0.0116, 0.0237, -0.0886, -0.0556, 0.0164, 0.0086, 0.0466, -0.0021, 0.0276, -0.0459, -0.0199, 0.0203] },
                { slug: 'api-mol-number', vector: [-0.0419, -0.0635, -0.0538, 0.0858, -0.0956, -0.0069, 0.0843, -0.015, 0.0156, -0.0231, 0.0496, 0.0141, 0.0253, 0.0136, -0.0355, 0.0403, -0.049, -0.027, -0.042, -0.0402, 0.0941, 0.0594, -0.0349, -0.0358, -0.0502, 0.0337, -0.063, -0.0094, 0.0473, -0.0437, -0.0123, 0.1475, 0.0716, -0.0113, -0.0315, 0.0271, 0.0899, -0.036, 0.0314, -0.0141, -0.0211, -0.017, -0.015, -0.0605, 0.0108, -0.0126, -0.0098, -0.0527, -0.0641, -0.0146, -0.0271, -0.0138, -0.0091, -0.0013, 0.0244, -0.0361, -0.0367, 0.0184, 0.034, 0.0522, -0.0422, 0.0503, -0.014, -0.0015, -0.0272, 0.0928, -0.0149, -0.133, 0.0328, -0.0593, -0.0824, -0.0348, 0.0753, -0.0734, -0.07, -0.0672, 0.0512, -0.0386, 0.103, -0.0667, -0.0311, 0.0517, -0.0134, 0.0719, 0.0912, 0.0892, 0.0201, 0.0108, 0.0215, -0.0376, -0.0425, -0.0747, -0.0315, 0.1098, -0.0104, 0.0283, 0.0309, -0.0143, -0.1238, 0.0715, -0.0105, 0.0392, 0.0068, 0.0068, 0.0074, -0.0345, 0.0542, -0.0084, -0.0424, 0.0363, 0.0127, 0.0865, -0.0145, -0.0499, -0.0079, -0.1001, 0.0193, 0.0103, 0.065, 0.0145, -0.0037, -0.0496, -0.1162, 0.0206, 0.0354, 0.0124, -0.0114, 0, 0.0296, 0.0225, 0.0301, -0.0212, 0.0147, -0.0186, 0.0383, -0.0081, -0.0769, 0.0127, 0.0669, -0.002, -0.0846, 0.0236, 0.0276, -0.042, 0.0006, -0.0499, -0.0457, -0.0945, 0.0054, 0.0572, -0.0608, 0.0343, 0.0704, 0.0962, -0.0007, -0.0106, -0.0144, 0.0256, 0.0945, -0.0429, 0.0045, -0.0326, -0.0337, -0.0436, 0.0052, -0.0359, 0.0321, -0.0249, -0.0318, -0.0379, -0.0051, -0.0206, -0.0049, 0.0002, -0.0577, 0.1095, -0.0261, -0.0555, -0.046, 0.0787, -0.0779, -0.0518, -0.0133, -0.0597, -0.0527, 0.1016, -0.001, 0.0729, -0.0972, 0.0255, 0.0721, 0.0256, -0.0677, -0.0048, -0.0534, -0.0898, 0.0205, 0.0286, -0.0631, 0.0368, -0.0435, 0.0427, -0.0015, -0.0524, 0.0732, -0.103, 0.0975, 0.0781, 0.0035, 0.027, 0.0223, 0.0241, 0.0414, -0.0649, -0.0021, -0.0524, 0.0197, -0.0807, -0.0084, -0.0543, -0.0276, -0.108, -0.0761, 0, 0.0409, -0.0175, 0.0259, 0.0276, -0.1457, -0.0667, -0.0626, -0.0226, 0.0244, -0.0125, 0.0499, 0.0868, -0.0052, -0.0201, 0.0555, 0.0063, -0.1083, -0.0626, 0.0295, 0.0569, 0.0968, 0.0851, -0.0296, 0.0804, -0.0253, 0.0161, -0.0046, 0.0244, 0.0798, -0.0164, 0.0017, -0.0396, -0.014, -0.0051, -0.0421, -0.096, 0.0044, 0.0472, -0.0729, 0.0592, -0.0122, -0.0027, 0.045, 0.0111, -0.0495, -0.01, 0.0638, 0.0257, -0.0183, -0.0725, 0.0738, -0.024, -0.0283, 0.0172, -0.0171, 0.0281, -0.0028, -0.0449, 0.0269, -0.0386, 0.0269, -0.0516, -0.0139, 0.0318, 0.0247, -0.0067, -0.0467, -0.0502, 0.0231, -0.091, 0.0294, -0.0537, 0.0014, -0.1023, 0.056, -0.0571, -0.0299, 0.0316, 0.0203, 0.0618, 0.0477, 0.018, 0.0226, 0.0453, 0.0132, -0.0251, -0.0474, 0.0434, 0.0769, -0.0021, -0.091, 0.0733, -0.0391, 0.0231, -0.01, 0, -0.0783, -0.017, -0.0083, -0.0739, 0.0404, -0.0015, -0.0403, 0.0086, -0.066, -0.034, 0.0727, 0.0577, -0.0742, -0.056, 0.0462, 0.065, 0.0127, 0.0368, 0.0022, 0.0698, 0.054, -0.0009, 0.0251, 0.0937, -0.0048, 0.0215, 0.0012, 0.124, 0.0153, 0.0411, 0.0799, 0.057, 0.1187, 0.0173, -0.0312, 0.0645, -0.0066, 0.0608, 0.0222, 0.0338, 0.0332, -0.0997, 0.0124, 0.0755, -0.0583, -0.0168, -0.0002, -0.0109, 0.0306, -0.0347, -0.0342, 0.0131, 0.0085, 0.0768, -0.1541, 0.0193, 0.0019, -0.0192, 0.029, 0.024, 0.0548, -0.0129, -0.0027, -0.0232] },
                { slug: 'api-mol-page', vector: [-0.049, -0.0405, -0.019, 0.0705, 0.0108, -0.035, 0.0559, -0.0608, 0.0351, -0.0014, 0.0436, 0.0589, 0.0492, -0.0047, -0.0681, 0.0127, -0.0473, 0.0094, -0.0246, 0.0542, 0.0594, 0.079, 0.0335, -0.0097, -0.1027, 0.0708, -0.0564, -0.0393, 0.03, -0.0738, 0.0525, 0.1568, -0.0051, -0.0208, -0.0324, 0.0262, 0.0434, -0.0206, -0.008, -0.0326, -0.0122, 0.0089, -0.0422, -0.0216, 0.0391, -0.0366, 0.0343, -0.0741, -0.0613, -0.0479, -0.0335, -0.0436, 0.0205, 0.0127, 0.0122, -0.0117, -0.0783, 0.0121, -0.0013, 0.0515, -0.0266, 0.0491, -0.0156, 0.032, -0.0268, 0.0118, -0.0052, -0.06, -0.0226, -0.0721, -0.1158, -0.0691, 0.1187, -0.0353, -0.0047, -0.064, 0.0467, -0.0529, 0.0282, -0.1143, -0.0142, 0.064, 0.0646, 0.0484, 0.0333, 0.1498, -0.01, 0.048, -0.0163, -0.0258, -0.0386, -0.0766, -0.036, 0.0959, -0.0323, 0.0423, 0.007, -0.0111, -0.0352, 0.0764, 0.025, 0.0465, 0.076, 0.0928, -0.0293, -0.0602, 0.0688, 0.0387, -0.0394, 0.0215, 0.0312, 0.0511, -0.0297, -0.0537, -0.0398, -0.12, 0.0208, -0.002, 0.0819, 0.0164, 0.0082, -0.0371, -0.0692, 0.0031, 0.0482, -0.0225, 0.0242, 0, 0.043, 0.0143, -0.0085, -0.0256, 0.0255, -0.0134, 0.0471, -0.013, -0.0552, 0.0283, 0.0518, -0.0247, -0.0489, 0.0409, -0.0064, 0.0168, -0.0491, -0.0118, -0.0062, -0.0661, -0.0267, 0.0282, -0.0323, 0.0234, 0.0573, 0.075, -0.0472, -0.0235, -0.0609, 0.008, 0.1083, 0.0315, 0.0083, -0.053, -0.0586, -0.029, 0.0236, -0.0441, -0.0148, -0.0055, -0.005, -0.0499, 0.0454, -0.0501, -0.0542, 0.0069, -0.081, 0.085, -0.0622, 0.0012, -0.03, 0.0733, -0.0089, -0.0298, -0.0119, -0.0287, -0.1002, 0.0705, 0.0753, 0.1421, -0.1163, 0.0123, 0.0191, 0.0097, -0.0369, -0.0402, -0.0406, -0.0369, -0.0347, -0.0341, -0.0472, 0.0208, 0.0093, 0.0778, 0.0234, -0.0563, -0.0079, -0.0852, 0.0953, 0.0657, 0.0335, 0.0559, 0.0575, -0.0131, 0.0019, -0.0291, 0.0178, -0.1004, -0.0058, -0.0562, -0.0409, -0.0432, 0.0007, -0.1506, -0.0583, 0, 0.0462, -0.0323, -0.0427, 0.0064, -0.116, -0.0512, -0.0518, 0.0178, 0.0524, -0.0492, 0.0146, 0.0992, 0.0367, 0.0662, 0.0358, 0.0594, -0.0604, -0.1324, -0.0053, 0.0409, 0.0625, 0.0555, 0.0057, 0.0016, 0.0059, -0.0124, 0.0755, 0.0643, 0.0171, 0.0154, 0.0415, -0.0467, -0.0066, 0.0197, -0.012, -0.0289, -0.0603, 0.0303, -0.1117, 0.0442, -0.0156, 0.0148, 0.0599, -0.0568, -0.0682, 0.0104, 0.0193, -0.0036, 0.0259, -0.0638, -0.0194, -0.0366, 0.0404, -0.0415, 0.0266, 0.0031, 0.007, -0.003, -0.0082, -0.1103, 0.0814, 0.0161, -0.0633, 0.053, 0.0206, 0.0055, -0.0577, -0.0785, -0.0074, -0.0438, -0.064, -0.0651, -0.0176, -0.0487, 0.1026, 0.0334, 0.0749, -0.0078, 0.0005, 0.0138, 0.034, -0.0253, 0.0058, -0.0396, 0.0539, 0.0045, -0.1559, 0.0332, 0.0533, -0.0319, -0.0445, 0.067, -0.0406, 0.0464, 0.0218, 0, -0.1271, -0.0808, 0.0051, -0.0532, 0.0296, 0.0297, 0.1156, 0.0481, -0.0875, -0.0388, 0.0806, 0.042, 0.022, -0.0222, 0.0035, 0.0806, 0.0109, 0.0159, -0.0161, -0.0305, 0.0342, 0.0215, 0.0449, 0.0608, 0.0415, 0.03, -0.0619, 0.0131, -0.0542, 0.0159, 0.0949, 0.0526, 0.0465, -0.0066, 0.0335, 0.0168, 0.0149, 0.0173, -0.0146, 0.0755, 0.0337, -0.0479, 0.0761, 0.0558, -0.0217, -0.0316, -0.0217, 0.0084, 0.0791, -0.0534, 0.0046, -0.0158, -0.0055, 0.0399, -0.1009, -0.0121, 0.0634, 0.0278, 0.0298, 0.0383, -0.0194, -0.0042, 0.0294, -0.0387] },
                { slug: 'api-mol-paragraph', vector: [-0.0778, -0.0238, -0.0229, 0.0751, -0.0341, 0.0305, -0.0143, -0.0106, 0.0864, -0.0437, 0.0127, 0.0471, -0.0098, 0.0585, -0.0557, 0.023, -0.0437, -0.012, -0.0221, 0.0328, 0.0948, 0.0891, 0.0178, -0.021, -0.0399, 0.0672, -0.0172, -0.0368, 0.0299, -0.0241, 0.03, 0.1147, 0.0466, 0.0463, 0.0032, -0.017, 0.111, -0.025, 0.0187, -0.0253, 0.0061, 0.0419, -0.0542, -0.0255, 0.0429, -0.0534, 0.0053, -0.0745, -0.0609, -0.0353, -0.0529, -0.0108, 0.0239, 0.0233, 0.0274, -0.009, 0.0441, 0.0558, 0.0268, 0.0463, -0.0668, 0.0489, -0.0338, 0.0157, -0.0492, 0.0117, -0.0273, -0.0213, -0.0135, -0.0687, -0.1155, -0.0196, 0.1305, -0.0374, -0.0502, -0.0217, 0.0415, -0.039, 0.0917, -0.0569, -0.0424, 0.0879, 0.0196, 0.0614, 0.0209, 0.1023, -0.0359, 0.0063, 0.0342, -0.0561, 0.0066, -0.1216, -0.0632, 0.1428, -0.0804, 0.0253, 0.0085, -0.07, -0.0936, 0.0236, 0.0208, 0.0366, 0.0259, 0.0587, -0.0462, -0.045, 0.0245, -0.0235, -0.0425, 0.02, 0.035, 0.036, -0.0512, -0.008, 0.0093, -0.1304, 0.018, -0.0069, 0.0522, 0.0085, -0.0144, -0.0426, -0.0694, 0.0199, 0.0317, 0.0465, 0.1023, 0, 0.018, 0.02, 0.0276, 0.071, 0.0372, -0.0158, -0.0053, -0.04, -0.0638, -0.0545, 0.0471, -0.0852, -0.0526, 0.0225, 0.0579, 0.0158, -0.0894, 0.0063, -0.0609, -0.0307, -0.0447, 0.0456, -0.0051, 0.0553, 0.0381, 0.0031, 0.0101, -0.0499, -0.1116, 0.002, 0.09, 0.0137, 0.0329, -0.0317, -0.1054, -0.0218, -0.0258, -0.0505, -0.0145, -0.0153, -0.0851, 0.0061, 0.0742, -0.0381, -0.02, 0.0308, -0.0653, 0.1305, -0.0444, -0.0421, -0.0288, 0.0672, -0.0271, -0.0735, 0.0421, -0.0164, 0.0105, 0.0562, 0.0648, 0.089, -0.0204, 0.0306, 0.0412, 0.0416, -0.0378, 0.0042, -0.0409, -0.0687, 0.0023, 0.0239, -0.0165, 0.0298, -0.0383, 0.1036, 0.0201, -0.0864, 0.015, -0.0712, 0.1179, 0.0597, -0.0201, -0.0332, 0.1002, 0.0012, -0.0475, -0.0654, -0.013, -0.0479, 0.0201, -0.0614, -0.0262, -0.0881, -0.0084, -0.0716, -0.0148, 0, 0.03, -0.0086, 0.0096, -0.0515, -0.0929, -0.0363, -0.0874, 0.0679, 0.0345, 0.014, 0.0144, 0.1211, 0.0642, 0.0282, 0.0355, 0.0431, -0.0459, -0.1028, 0.0134, 0.0149, 0.1249, -0.0558, -0.0195, -0.0033, 0.0106, -0.0262, 0.0193, 0.0153, -0.0023, -0.0362, 0.0211, -0.0675, -0.0261, -0.0169, -0.0201, -0.0841, -0.0037, 0.0061, -0.0498, 0.0044, -0.025, 0.0714, 0.0586, -0.012, -0.1079, -0.0062, 0.022, -0.0005, 0.0437, -0.0338, -0.0461, 0.0241, 0.0804, 0.0623, -0.0458, -0.0403, -0.0334, -0.0048, 0.0215, -0.0367, 0.0344, -0.0127, -0.0722, 0.043, 0.0583, -0.0067, -0.0368, -0.0666, 0.0146, -0.0654, -0.0138, -0.0558, 0.008, -0.0241, 0.0461, -0.0372, 0.0157, 0.0083, -0.028, 0.005, 0.0725, 0.0042, -0.0058, 0.0018, 0.1203, -0.0344, -0.0434, 0.053, 0.0842, 0.0163, -0.0484, 0.0098, -0.0201, -0.0435, 0.0281, 0, -0.1448, -0.0544, -0.0065, -0.1121, 0.0018, -0.0166, 0.0258, 0.0521, -0.0181, 0.0193, 0.0849, 0.0594, -0.0306, -0.041, 0.0151, 0.0185, -0.0118, -0.006, -0.0088, 0.0547, 0.0729, -0.0166, -0.0041, 0.0981, 0.0414, 0.0098, -0.0571, 0.0552, 0.0314, -0.0086, 0.0755, 0.0796, 0.1161, 0.051, -0.0376, 0.0954, 0.0149, 0.047, 0.0395, 0.0677, -0.0447, -0.1175, 0.0698, 0.0239, 0.0642, 0.0096, -0.0386, 0.0081, 0.0063, -0.0243, -0.0089, -0.0087, 0.0076, 0.0201, -0.1075, -0.0266, 0.0351, 0.0255, 0.0591, -0.0032, 0.0177, -0.0311, -0.0044, -0.0031] },
                { slug: 'api-mol-pick', vector: [-0.0166, -0.0606, -0.0103, 0.1066, 0.0524, -0.0045, 0.1189, -0.0334, 0.1159, -0.041, 0.0459, -0.0246, -0.0151, 0.0315, -0.0311, 0.0576, -0.0368, -0.0406, 0.0235, 0.0177, -0.043, -0.0337, 0.0193, 0.0092, -0.06, 0.0115, 0.0341, -0.0087, 0.0163, -0.0069, 0.0775, 0.0843, 0.0054, -0.0711, -0.0376, -0.0147, 0.1013, -0.034, 0.0224, 0.0032, 0.0298, 0.0324, 0.0014, -0.0461, 0.0305, -0.0157, 0.0356, -0.0076, -0.0623, 0.0241, -0.0274, -0.0539, -0.0055, -0.0644, 0.0079, -0.0263, 0.0188, 0.0023, 0.0122, 0.0075, -0.0553, -0.0009, -0.0607, 0.0276, -0.0433, 0.0547, -0.0329, -0.0815, 0.0056, -0.1071, -0.0977, -0.0648, 0.1581, -0.0145, -0.0375, -0.0061, 0.0281, -0.0509, 0.0722, -0.0933, -0.0425, 0.0628, -0.0145, -0.0144, 0.037, 0.0866, -0.0157, 0.0383, 0.0305, -0.0066, 0.0027, -0.0664, -0.0388, 0.1196, -0.0248, 0.0938, -0.0485, -0.0171, -0.0784, 0.0377, 0.0062, -0.0119, 0.0002, 0.0486, -0.0365, -0.0418, -0.0441, 0.0312, -0.0303, 0.0097, -0.0074, 0.0368, 0.0521, 0.0008, -0.0153, -0.0391, 0.001, 0.0153, 0.0572, -0.0185, 0.032, -0.0669, -0.107, 0.0186, 0.0576, -0.0514, 0.0398, 0, 0.1046, 0.0285, -0.0148, -0.019, -0.0091, -0.0576, 0.0779, -0.0667, -0.0011, -0.0278, 0.046, -0.0369, -0.0327, -0.0427, 0.0451, 0.0256, -0.0843, -0.0262, -0.0349, -0.004, -0.0175, -0.0082, -0.0756, 0.0492, 0.0469, 0.0769, -0.0534, -0.0194, -0.0461, 0.025, 0.0848, -0.0187, 0.0551, -0.0222, -0.0464, -0.0234, -0.0793, -0.0333, -0.0574, -0.0058, 0.0232, -0.0709, 0.0281, 0.0473, -0.0247, 0.0099, -0.1298, 0.1315, -0.0379, -0.0905, 0.0818, 0.0308, -0.0718, -0.0388, 0.0228, 0.0946, -0.077, 0.0677, 0.0863, 0.0729, -0.072, 0.0262, 0.0412, 0.0461, -0.0384, 0.0185, 0.0186, -0.1158, 0.0193, 0.0336, -0.0399, 0.0263, -0.0476, 0.0369, 0.0244, -0.0919, 0.0088, -0.0868, 0.1443, 0.0452, -0.0078, -0.0773, 0.0586, 0.0027, -0.0292, -0.0446, -0.029, -0.0358, -0.0138, -0.0361, -0.0233, -0.0316, 0.0031, -0.045, 0.0037, 0, 0.07, -0.0574, 0.0488, -0.0034, -0.1182, -0.0338, -0.0643, 0.0071, 0.0214, -0.0598, -0.0178, 0.0514, 0.0794, 0.1376, 0, 0.0713, -0.0584, -0.1072, -0.0479, 0.0455, 0.0979, -0.0323, 0.0038, 0.0323, -0.0049, 0.006, 0.0489, -0.0173, 0.0494, -0.0334, -0.0334, -0.0103, 0.003, -0.0127, 0.0179, -0.0324, 0.0529, 0.0083, -0.1096, 0.071, -0.014, 0.0411, 0.0003, 0.0093, -0.0827, 0.0312, 0.0329, 0.0744, 0.0432, -0.0446, -0.0566, 0.0132, -0.0083, -0.001, -0.0074, 0.0195, 0.0066, -0.0778, 0.0743, -0.0493, 0.0016, -0.0938, -0.0319, 0.0397, 0.0696, -0.0304, 0.026, -0.0343, 0.0594, -0.0653, 0.0355, -0.0707, 0.0115, -0.0932, 0.0462, 0.035, 0.0445, -0.0171, 0.0087, 0.005, 0.0673, -0.0291, 0.0153, -0.0003, 0.0458, 0.0649, -0.0507, 0.0577, 0.0426, -0.0415, -0.0782, 0.0185, 0.0316, -0.0573, -0.0037, 0, -0.1445, -0.0187, 0.0156, -0.0744, 0.0704, 0.058, 0.0111, 0.0282, -0.0618, -0.0512, 0.0203, 0.049, -0.0179, -0.0292, 0.0181, 0.0234, 0.0194, 0.0521, -0.0045, 0.0005, 0.0732, -0.0127, 0.0418, 0.0461, 0.0285, -0.0134, -0.0295, 0.0637, 0.0333, 0.0139, 0.0095, 0.0341, 0.086, -0.0037, -0.0263, 0.1348, 0.0438, -0.034, 0.0435, 0.0755, 0.0232, -0.0464, 0.0584, 0.0018, -0.1522, -0.0067, 0.0561, -0.0434, 0.0606, 0.0078, -0.0244, -0.0445, -0.0185, 0.0234, -0.0788, 0.0108, 0.0206, -0.0419, 0.0249, -0.0097, -0.0026, -0.0487, -0.0006, -0.005] },
                { slug: 'api-mol-row', vector: [-0.0777, -0.0531, -0.0489, 0.0972, -0.045, -0.0233, -0.0056, -0.0569, 0.1015, -0.0042, 0.0195, 0.0034, 0.0153, 0.0043, -0.0344, 0.0899, -0.0457, -0.0415, -0.0211, 0.0839, 0.0393, 0.0551, -0.0282, -0.0359, -0.0174, 0.0499, -0.0037, -0.0102, 0.067, -0.026, -0.0265, 0.1316, -0.03, 0.0357, -0.0588, 0.019, 0.1026, -0.0208, -0.0028, 0.0211, 0.0321, 0.0815, 0.0023, -0.0536, -0.0251, -0.0312, 0.056, -0.1064, -0.0792, -0.0468, -0.0411, -0.0219, 0.0278, -0.052, 0.0381, -0.0169, 0.0112, 0.0767, 0.0268, 0.0779, 0.014, 0.0752, -0.0383, 0.0347, -0.0135, -0.0204, -0.0438, -0.0372, -0.0189, -0.0246, -0.0921, -0.0614, 0.1144, -0.0294, -0.0277, -0.0079, 0.061, -0.0355, 0.1209, -0.0517, 0.0136, 0.0943, -0.0434, 0.0013, 0.0508, 0.0935, -0.0542, 0.0131, 0.0044, -0.056, -0.0058, -0.0692, -0.0444, 0.0937, -0.0201, 0.0236, 0.0205, -0.0297, -0.1105, -0.0036, -0.0122, 0.0645, -0.0203, 0.0767, -0.039, -0.0454, -0.0314, -0.0553, -0.0738, 0.0514, 0.0064, 0.0579, -0.0386, -0.0489, -0.0231, -0.0715, -0.0345, -0.0199, 0.0121, -0.0595, -0.0072, -0.0936, -0.0488, 0.027, 0.0251, 0, 0.0088, 0, 0.0681, 0.013, 0.0256, 0.0125, 0.1056, -0.0163, 0.0315, -0.0278, -0.0456, 0.0186, 0.0545, -0.013, -0.0532, 0.0113, -0.0178, 0.0575, -0.0717, -0.0193, -0.0536, -0.0506, -0.0498, 0.1236, -0.0352, 0.0591, 0.0526, 0.0254, 0.0093, 0.0256, -0.0295, -0.0075, 0.0964, 0.0222, 0.0209, -0.0477, -0.0794, -0.0001, -0.0091, -0.0662, 0.0043, -0.018, -0.0203, 0.0312, -0.0178, 0.0232, -0.0216, -0.0138, -0.0143, 0.1236, -0.0661, -0.0853, -0.0156, 0.0729, -0.0635, -0.0442, -0.045, 0.0455, -0.048, 0.059, 0.0633, 0.1049, -0.0894, -0.0265, 0.0534, 0.0411, -0.0441, 0.0692, -0.007, -0.0831, 0.0589, 0.0455, 0.0316, 0.0746, -0.0543, 0.02, 0.0648, -0.0917, 0.0008, -0.1285, 0.0614, 0.0782, -0.0059, 0.0073, 0.058, 0.0766, -0.0299, -0.0979, -0.0131, 0.0164, 0.0145, -0.0265, -0.0307, -0.1095, 0.0068, -0.0526, 0.0134, 0, 0.0539, -0.0689, 0.0008, -0.0268, -0.0579, -0.0573, -0.0807, 0.0075, -0.0379, -0.0422, 0.0436, 0.0565, 0.0444, 0.0745, 0.0157, 0.0117, -0.0764, -0.1054, -0.0513, -0.0282, 0.1684, 0.0255, 0.0605, 0.0303, -0.0225, -0.0467, -0.0078, 0.0015, 0.0287, -0.0047, 0.0348, -0.0557, -0.0445, -0.0343, -0.0135, -0.0118, 0.0064, -0.0071, -0.0696, -0.0125, -0.0798, 0.0456, 0.0309, 0.052, -0.0241, -0.0033, 0.0334, 0.0091, 0.0698, -0.0431, -0.0233, -0.0339, 0.0026, 0.023, 0.0076, -0.019, -0.0059, -0.009, 0.0635, -0.0018, 0.0171, 0.0005, -0.0857, 0.0158, 0.0117, 0.0251, -0.0377, -0.0378, 0.1088, -0.0619, -0.015, -0.0535, -0.0147, -0.0268, 0.0819, 0.015, 0.0455, 0.0316, 0.0486, -0.0064, -0.0105, -0.0485, 0.0388, -0.0364, 0.0931, -0.0174, -0.0141, 0.0313, 0.0852, 0.0035, -0.0189, 0.0024, -0.065, -0.0153, -0.0144, 0, -0.1238, 0.0077, 0.004, -0.1042, -0.0117, -0.0531, 0.0884, 0.0732, -0.0259, 0.0103, 0.0712, 0.0464, -0.0484, 0.0012, -0.0031, 0.0341, -0.0275, -0.05, 0.0039, 0.0479, 0.0262, -0.0075, -0.0235, 0.0726, 0.0371, -0.0479, -0.033, 0.0372, 0.0312, 0.0557, 0.0513, 0.0591, 0.1049, 0.0455, -0.0223, 0.0805, -0.0073, 0.0506, -0.0137, 0.0526, -0.0292, -0.0876, 0.0844, 0.0153, -0.023, 0.0853, -0.0295, 0.047, 0.0871, -0.0283, 0.0229, -0.0298, -0.0372, 0.0034, -0.0849, 0.0118, -0.0183, 0.026, 0.1091, 0.0049, -0.0498, -0.0587, -0.0298, 0.0068] },
                { slug: 'api-mol-scroll', vector: [-0.027, -0.0473, -0.0243, 0.1017, 0.0092, 0.0129, 0.0639, 0.0066, 0.0698, 0.0183, -0.0086, 0.0771, -0.0045, 0.039, -0.1086, -0.0097, -0.0845, 0.0496, -0.0403, -0.0232, 0.037, 0.013, 0.0396, -0.0178, -0.1195, 0.0571, -0.0352, -0.1153, 0.0081, -0.0225, 0.0073, 0.1523, -0.0052, -0.0178, -0.0913, -0.0642, -0.0084, -0.0489, 0.0115, -0.0151, 0.0375, 0.0545, -0.0169, -0.0281, 0.0355, -0.0371, 0.0565, -0.0354, -0.0777, 0.0538, -0.0142, 0.0198, 0.0494, 0.0097, 0.0083, -0.0123, -0.0213, -0.0375, 0.0349, 0.0981, -0.0521, 0.0166, -0.0101, 0.0192, -0.0482, 0.0207, 0.0373, -0.0089, -0.0299, -0.0582, -0.0622, -0.0464, 0.101, -0.0177, -0.0191, -0.0715, 0.0338, -0.0102, 0.0379, -0.047, -0.0164, 0.0055, 0.0112, 0.0737, 0.062, 0.1392, -0.0155, 0.0696, 0.0352, -0.047, -0.0057, -0.0635, -0.0783, 0.1082, -0.0657, 0.0379, 0.0397, 0.0464, -0.0661, 0.0246, 0.0139, 0.0295, 0.0297, 0.0991, -0.0258, -0.0558, 0.0496, -0.0338, -0.0639, 0.0536, 0.0738, 0.0071, 0.0123, -0.0077, 0.0227, -0.1012, 0.0049, 0.0101, 0.0718, 0.0273, 0.0218, -0.0378, -0.1138, -0.0232, 0.0298, 0.0026, 0.0012, 0, 0.0365, -0.0019, -0.0063, -0.0288, 0.0715, -0.0302, 0.0273, -0.0343, -0.05, 0.009, 0.0588, -0.0202, -0.0316, -0.0273, 0.0178, -0.0002, -0.0645, -0.0178, -0.0382, -0.0345, -0.0573, 0.021, -0.059, 0.0203, 0.0712, 0.0612, -0.0699, -0.0159, 0.0157, 0.0311, 0.1226, 0.0527, -0.0062, -0.0708, -0.0521, -0.0611, -0.0379, -0.0152, -0.0081, -0.0037, -0.0227, -0.0299, -0.0185, -0.0267, -0.0948, -0.0396, -0.0627, 0.1422, 0.0553, -0.0406, -0.0517, 0.0548, -0.032, -0.0627, 0.064, -0.0164, 0.0095, 0.0765, 0.075, 0.1392, -0.132, 0.0091, 0.0017, 0.0077, -0.0477, 0.0131, -0.0163, -0.0501, -0.024, -0.0487, 0.0122, 0.0354, -0.0179, 0.0799, 0.0242, -0.0556, -0.0064, -0.0019, 0.0851, 0.0457, -0.0081, -0.0072, 0.0405, 0.0468, -0.0079, -0.0474, -0.0469, -0.0019, -0.0265, -0.0361, 0.0181, -0.0607, 0.037, -0.1167, -0.0764, 0, -0.0377, -0.0091, -0.0315, 0.0111, -0.1298, -0.0165, -0.0463, 0.0489, 0.0518, -0.024, 0.0169, 0.1225, 0.016, 0.0793, 0.0152, 0.0417, -0.0231, -0.113, -0.0082, -0.0216, 0.1329, -0.0434, -0.0157, 0.0235, -0.0124, -0.0005, 0.0944, 0.0339, 0.0012, -0.057, -0.0246, -0.0658, -0.0187, -0.0117, -0.0238, -0.0679, 0.0222, 0.0044, -0.1277, 0.0508, -0.0165, 0.0372, 0.0906, -0.0176, -0.067, 0.0172, -0.0005, 0.0566, 0.0897, -0.0738, -0.0344, -0.0204, 0.0533, -0.019, 0.0112, 0.0363, 0.0174, -0.0065, 0.0176, -0.1011, 0.0322, -0.0205, -0.013, 0.0108, -0.0131, 0.0309, -0.0282, -0.0971, -0.0023, -0.0047, -0.0183, -0.0664, 0.0099, -0.04, 0.0785, 0.0037, 0.0587, 0.0313, 0.0221, -0.003, 0.093, 0.0015, 0.0073, -0.083, 0.0573, 0.0102, -0.1009, 0.0225, 0.0809, 0.0166, -0.0417, -0.0059, -0.0598, -0.0282, 0.0311, 0, -0.1289, -0.0463, -0.0089, -0.0948, 0.0468, 0.0297, 0.0755, 0.0604, -0.0661, -0.0095, 0.0787, 0.0728, 0.0226, -0.0079, 0.0385, 0.0915, 0.0695, -0.0262, -0.0246, 0.0094, 0.0514, 0.0396, 0.0512, 0.0842, 0.0232, 0.0029, -0.0345, 0.0384, -0.0265, -0.0562, -0.012, 0.0553, 0.0649, -0.0029, -0.0288, 0.0287, 0.0201, -0.0119, 0.0307, 0.0949, 0.0222, -0.0588, 0.0638, 0.076, -0.0414, -0.0046, -0.043, 0.012, 0.0502, -0.0222, -0.0016, -0.0022, -0.0072, 0.0629, -0.1103, -0.0119, 0.0162, -0.0148, 0.0005, 0.0316, 0.0042, -0.0229, 0.0147, 0.0303] },
                { slug: 'api-mol-select', vector: [-0.0371, -0.0374, -0.0184, 0.0992, -0.0169, -0.0306, 0.1364, -0.082, 0.0372, -0.0454, 0.0428, 0.0127, 0.0273, 0.0147, -0.0202, 0.0505, -0.0087, -0.0527, -0.0209, -0.0015, 0.0439, 0.0461, -0.0169, -0.0437, -0.0672, 0.0874, -0.0099, -0.0315, -0.0137, -0.0819, 0.0051, 0.1194, 0.0264, -0.0521, -0.0081, -0.0348, 0.0805, 0.0014, -0.0369, -0.0661, 0.001, -0.0087, -0.052, -0.0244, -0.0452, -0.0518, 0.0335, -0.0934, -0.0181, -0.0093, -0.0489, -0.0316, -0.0294, -0.0528, 0.0518, -0.0282, -0.0661, 0.0173, -0.0081, -0.0079, -0.0845, 0.039, -0.0352, 0.0601, -0.0021, 0.0624, -0.0228, -0.0737, 0.0195, -0.081, -0.1243, -0.0352, 0.1116, -0.0022, -0.03, -0.02, 0.0772, -0.0755, 0.0359, -0.0828, -0.0235, 0.0611, -0.0254, 0.0499, 0.0371, 0.0942, -0.0404, -0.0219, 0.0691, -0.0463, -0.0202, -0.1067, -0.0199, 0.0611, -0.0112, 0.0411, 0.0002, -0.0328, -0.0671, 0.0799, 0.0076, -0.012, 0.074, 0.0227, -0.0566, -0.05, 0.0644, 0.0185, -0.0614, 0.0511, -0.0596, 0.0856, 0.0354, -0.0607, -0.0194, -0.0523, 0.0155, 0.009, 0.0246, 0.0437, 0.0159, -0.0419, -0.0934, 0.0027, 0.0462, 0.0492, 0.0322, 0, 0.0419, -0.0418, 0.0032, -0.0417, -0.0138, -0.0195, 0.0546, -0.0113, -0.0506, -0.0075, 0.0905, -0.0087, -0.0679, 0.0475, 0.0469, -0.0148, -0.0188, -0.0478, -0.003, -0.0769, -0.0361, 0.0601, -0.0602, 0.0188, 0.054, 0.0419, -0.0399, -0.0247, 0.0091, 0.0325, 0.0805, -0.0423, -0.0079, -0.0078, -0.0729, 0.0538, -0.0918, -0.0108, 0.0343, -0.0383, -0.0202, -0.0823, -0.0052, 0.0168, -0.017, 0.0167, -0.1338, 0.0766, -0.0492, -0.0406, 0.047, 0.0445, -0.1132, -0.0372, 0.014, 0.0157, -0.0882, 0.0441, 0.0454, 0.0936, -0.0664, 0.0542, 0.0651, 0.0561, -0.0126, -0.0035, -0.0198, -0.1252, 0.0273, -0.0069, -0.0518, 0.0334, 0.0252, 0.0776, 0.0096, -0.0896, 0.0251, -0.1095, 0.1146, 0.0524, 0.0069, -0.0775, -0.0179, 0.0017, 0.0114, -0.0066, 0.0068, -0.0397, 0.0217, -0.0698, -0.0294, 0, -0.0079, -0.1454, -0.0483, 0, 0.1109, -0.0468, 0.0384, 0.04, -0.1054, -0.0829, -0.0349, -0.0093, 0.0546, -0.0323, -0.0058, 0.1069, 0.0524, 0.0254, 0.0329, 0.0641, -0.0821, -0.1109, 0.0048, 0.0739, 0.0068, 0.0666, -0.006, 0.0484, -0.0349, -0.0238, 0.0008, 0.0113, 0.0676, -0.0007, -0.0098, 0.0361, -0.0035, -0.0195, 0.0049, -0.0515, 0.0075, 0.0672, -0.1321, 0.0468, -0.0326, 0.0336, 0.0124, -0.0055, -0.0403, 0.0347, 0.0452, 0.0102, 0.0174, -0.0438, 0.0144, -0.0081, -0.0058, -0.0179, 0.0781, 0.0532, 0.0445, -0.0769, 0.0597, -0.0446, 0.0204, -0.0279, -0.0461, -0.0305, 0.0909, -0.0214, -0.0049, -0.0066, 0.0012, -0.0879, -0.0094, -0.1176, 0.0243, -0.1029, 0.0692, -0.0058, 0.0011, 0.0084, -0.0186, 0.0601, 0.0261, 0.0053, 0.0099, 0.0373, 0.0021, 0.0062, -0.1015, 0.012, 0.0974, -0.0084, -0.0307, 0.0037, 0.0232, 0.0368, -0.0051, 0, -0.0912, -0.0684, 0.0161, -0.0338, 0.0917, 0.0557, -0.0022, 0.0686, -0.0499, -0.0217, 0.0553, 0.0629, -0.0608, -0.0268, 0.0233, 0.075, 0.0319, 0.0576, 0.0024, -0.0032, 0.062, -0.0004, -0.0438, 0.0897, 0.0306, 0.0442, -0.0645, -0.0125, 0.0006, 0.0565, 0.0336, 0.0312, 0.1169, -0.0158, -0.0129, 0.0133, -0.0072, 0.013, -0.0029, 0.0565, 0.0504, -0.0252, 0.0807, 0.0256, -0.1151, -0.0325, 0.0414, -0.0139, 0.053, -0.0322, -0.0344, -0.0068, 0.0637, 0.0568, -0.0431, -0.0015, 0.0447, 0.022, 0.0329, 0.001, 0.0198, -0.0029, -0.0043, -0.0139] },
                { slug: 'api-mol-string', vector: [-0.0176, -0.042, -0.0438, 0.1169, -0.048, 0.0507, 0.0815, -0.0094, 0.0369, -0.0281, 0.0477, 0.0189, -0.0125, 0.0109, -0.0691, 0.0454, -0.036, -0.0491, -0.0638, -0.0331, 0.0259, 0.0212, -0.0349, -0.0267, -0.0579, 0.0611, -0.0249, -0.0352, -0.0155, -0.0456, -0.0355, 0.0693, 0.0554, -0.0322, -0.0441, 0.0074, 0.0136, 0.0118, -0.0271, -0.0551, -0.0605, -0.0282, -0.0393, -0.0159, 0.0291, -0.0228, 0.0245, -0.0659, -0.0196, -0.0246, -0.0555, 0.0039, 0.0259, 0.0061, 0.0112, -0.0175, -0.0309, 0.0306, 0.0226, 0.0301, -0.075, 0.0464, -0.0234, 0.036, -0.0217, 0.0836, 0.02, -0.1092, 0.0294, -0.0963, -0.0359, -0.006, 0.076, -0.0824, -0.0332, -0.0079, 0.0061, -0.0646, 0.1446, -0.0344, -0.0145, 0.0348, -0.0387, 0.0638, 0.0488, 0.1165, -0.016, 0.0298, -0.0052, -0.0226, -0.0057, -0.0845, -0.0293, 0.1227, -0.0288, 0.0486, 0.029, -0.0264, -0.1181, 0.0416, 0.0037, 0.0299, 0.0333, 0.0265, 0.0191, -0.0617, 0.069, 0.0015, -0.0408, 0.0299, -0.0272, 0.0883, -0.0252, 0.0037, -0.0282, -0.0172, 0.0574, 0.018, 0.0057, 0.0697, 0.0218, -0.0322, -0.1562, 0.014, 0.035, -0.0413, 0.0292, 0, 0.0612, 0.0569, -0.0246, 0.0031, -0.0162, -0.0263, 0.0299, 0.0458, -0.0695, -0.0403, 0.0978, -0.0281, -0.0629, 0.0112, 0.0494, -0.0559, -0.0028, -0.0389, -0.0525, -0.0512, -0.0026, 0.0306, -0.0507, 0.0143, 0.0615, 0.0337, -0.0172, 0.0065, -0.0469, 0.0206, 0.0748, -0.0703, -0.017, -0.0107, -0.0648, -0.0426, 0.0241, -0.054, -0.0074, -0.0382, -0.0181, -0.066, 0.0158, -0.076, 0.0083, 0.0226, -0.0639, 0.0968, -0.0602, -0.0581, -0.0023, 0.0673, -0.0497, -0.0558, 0.0224, 0.0062, -0.0921, 0.0602, 0.0256, 0.1187, -0.0843, 0.0737, 0.0458, 0.0428, -0.0814, -0.0306, -0.0433, -0.1241, 0.0188, -0.0346, -0.0483, -0.0088, -0.0569, 0.0552, -0.0339, -0.0603, 0.0372, -0.1184, 0.1159, 0.0614, -0.0408, -0.0155, 0.0647, 0.0522, 0.0461, -0.042, -0.0218, -0.0534, 0.0199, -0.0967, 0.0234, -0.0222, -0.058, -0.138, -0.0351, 0, 0.0559, -0.0788, 0.0069, 0.0269, -0.074, -0.0377, -0.1026, 0.037, 0.1, -0.0459, 0.0301, 0.0494, 0.022, 0.0156, 0.033, 0.0387, -0.0798, -0.0717, 0.0326, 0.0842, 0.0853, 0.0591, -0.0372, 0.0397, -0.0837, 0.0051, -0.0052, 0.0037, 0.0306, 0.0225, 0.0042, 0.019, -0.0442, 0.0192, -0.0528, -0.0304, 0.0362, 0.0983, -0.0812, 0.095, 0.0368, 0.0163, 0.0135, -0.0432, -0.0555, 0.0094, 0.0526, 0.0445, 0.057, -0.0037, 0.0468, -0.0396, -0.0139, 0.0138, -0.0179, 0.0182, 0.0555, -0.1059, 0.0515, -0.0653, 0.0388, -0.0331, -0.0049, 0.0415, 0.0625, -0.0277, -0.0165, 0.0143, 0.0343, -0.1048, 0.0216, -0.0445, 0.019, -0.0373, 0.1208, -0.0027, -0.0302, 0.0325, 0.0544, 0.0242, 0.1154, 0.0143, 0.0151, 0.0286, 0.0556, 0.0316, -0.0894, 0.0544, 0.0601, 0.0004, -0.0735, 0.0607, -0.0262, 0.0231, -0.007, 0, -0.0664, -0.0112, -0.0027, -0.0558, 0.0361, -0.0166, -0.0143, -0.0102, -0.0064, -0.0388, -0.0067, 0.0603, -0.0618, -0.0724, -0.0064, 0.0801, 0.0086, 0.0276, -0.0137, 0.0476, 0.1103, -0.031, -0.0456, 0.0838, 0.0814, 0.0357, -0.0416, 0.0509, 0.0202, 0.0445, 0.0809, 0.0702, 0.0763, -0.0078, -0.0413, 0.0352, 0.0447, -0.0206, 0.0176, 0.0928, 0.0557, -0.0382, 0.0334, 0.0144, -0.0715, -0.0307, 0.0324, -0.0157, 0.0635, -0.042, -0.0494, 0.0084, 0.0436, 0.0481, -0.105, -0.0078, 0.0533, 0.0298, 0.0377, -0.0273, 0.0323, -0.0063, -0.0142, -0.017] },
                { slug: 'api-mol-switch', vector: [-0.0003, -0.0159, -0.0326, 0.1261, -0.0094, -0.0118, 0.1183, -0.0101, 0.0377, 0.0034, 0.0463, -0.0271, -0.0263, 0.0329, -0.0605, 0.0666, -0.0166, -0.0292, 0.0273, 0.006, 0.0889, -0.0012, -0.0166, -0.0223, -0.0342, 0.0044, 0.0068, -0.0398, 0.0077, -0.0396, -0.0314, 0.1019, -0.0279, -0.0215, -0.008, -0.0249, 0.0489, -0.046, 0.0225, -0.0375, 0.0252, 0.0505, 0.0067, -0.0873, -0.0444, -0.008, 0.0369, -0.0677, -0.0639, -0.0348, 0.0134, 0.0085, 0.0254, -0.0591, 0.0484, -0.011, -0.0012, 0.0477, 0.0333, 0.0678, -0.0245, 0.0768, -0.0121, -0.0096, -0.0366, 0.0724, -0.0394, -0.0669, 0.022, -0.1174, -0.0622, -0.0547, 0.1284, -0.0642, -0.0384, -0.0447, 0.0974, -0.0381, 0.0507, -0.0806, -0.0346, 0.0701, -0.0493, 0.0039, 0.0602, 0.1088, -0.0354, 0.059, 0.0193, -0.0175, -0.0139, -0.0616, -0.0156, 0.0908, 0.0244, 0.0166, 0.0163, -0.0313, -0.062, 0.0211, -0.0139, 0.0139, 0.0229, 0.0133, -0.0083, -0.0215, 0.0344, -0.0102, -0.0715, 0.0329, -0.0033, 0.112, -0.0076, -0.0017, 0.0209, -0.083, -0.0071, -0.003, 0.0255, 0.0134, 0.0092, -0.0816, -0.0578, 0.0059, 0.0379, 0.0142, 0.0327, 0, 0.082, 0.0614, -0.0099, 0.0138, -0.0053, -0.006, 0.0549, -0.0039, -0.0192, -0.0065, 0.0352, 0.0046, -0.0909, -0.0251, 0.0503, 0.0438, -0.0155, -0.0377, -0.0308, -0.0881, -0.0102, 0.0659, -0.071, 0.0319, 0.0245, 0.0012, -0.0491, -0.0275, -0.0243, 0.0136, 0.0678, -0.0055, 0.0515, -0.0197, -0.0245, 0.0297, -0.0142, -0.0549, -0.0056, -0.0567, -0.0186, -0.0483, 0.0113, -0.0027, -0.0092, -0.0303, -0.1097, 0.0981, -0.0008, -0.0398, -0.0041, 0.0635, -0.0826, -0.0313, 0.0052, 0.0019, -0.0073, 0.0893, 0.0735, 0.1238, -0.0764, 0.0649, 0.0322, -0.0023, -0.0936, 0.0764, -0.0145, -0.1179, 0.013, -0.0273, -0.0648, 0.024, -0.0632, 0.0633, 0.0099, -0.0626, -0.0119, -0.1082, 0.0897, 0.0456, -0.0047, -0.0272, 0.0396, 0.0523, 0.0069, -0.1099, -0.0056, -0.0116, -0.0005, -0.0461, -0.0276, -0.0593, -0.0401, -0.0283, 0.0276, 0, 0.0473, -0.0858, 0.0823, -0.0355, -0.1214, -0.1224, -0.0604, -0.0065, -0.0146, -0.0087, 0.0314, 0.0112, 0.0328, 0.0348, 0.018, -0.0214, -0.0672, -0.1225, 0.0437, 0.0344, 0.0856, 0.0634, 0.0337, 0.0571, -0.0701, -0.0092, 0.0149, -0.0302, 0.0746, -0.0237, 0.0285, -0.0175, 0.0108, 0.0117, -0.0245, -0.0647, 0.0272, 0.0684, -0.0859, 0.0633, -0.0381, 0.0085, 0.035, 0.0103, -0.0817, 0.0151, 0.0375, 0.0564, 0.0477, -0.018, 0.0598, -0.0478, 0.0308, 0.0047, 0.0126, 0.0187, 0.0067, -0.0495, 0.0417, -0.0288, 0.0066, -0.0987, -0.0408, 0.0074, 0.016, -0.0461, -0.0287, -0.0732, 0.109, -0.0921, 0.0234, -0.1052, -0.0106, -0.0975, 0.0466, -0.0369, -0.0041, 0.0276, 0.043, 0.0012, 0.0231, -0.0116, 0.04, -0.0032, 0.0791, -0.0206, -0.081, 0.0204, 0.0845, -0.0208, -0.1072, 0.0061, -0.0201, -0.0476, -0.0089, 0, -0.1081, -0.003, 0.0261, -0.0793, 0.0204, -0.0111, 0.016, -0.046, -0.0382, 0.0385, 0.0385, 0.0827, -0.0275, -0.0348, 0.049, 0.0232, 0.0136, 0.0262, 0.0135, 0.0997, 0.0418, -0.0627, -0.0223, 0.1054, -0.0098, -0.0255, -0.0036, 0.0351, 0.0097, 0.0708, 0.0583, 0.092, 0.1098, 0.0496, -0.0202, 0.1578, 0.0223, 0.0785, 0.0198, 0.0948, 0.0192, -0.0726, -0.0127, 0.0463, -0.0334, 0.0191, 0.017, 0.0399, 0.0421, -0.0417, -0.0341, -0.0231, -0.0487, 0.0518, -0.1403, 0.0071, 0.0347, 0.0159, 0.0704, -0.0289, 0.0506, -0.069, -0.0145, -0.0005] },
                { slug: 'api-mol-text', vector: [-0.0497, -0.0328, -0.0365, 0.1331, -0.0249, 0.0254, 0.0878, -0.005, 0.0754, -0.043, 0.0284, 0.0562, -0.0125, 0.0361, -0.04, 0.0695, -0.0121, -0.0311, 0.0058, -0.0271, 0.0683, 0.0993, -0.0598, 0.0118, -0.0598, 0.112, -0.0273, -0.033, 0.0208, 0.0191, -0.0008, 0.095, 0.0739, 0.0134, -0.0518, 0, 0.0528, -0.0151, 0.0024, 0.018, 0.0136, 0.0306, -0.0799, -0.0292, 0.0067, -0.0336, 0.023, -0.0682, -0.047, -0.0254, -0.0254, -0.0444, 0.001, -0.0185, 0.0129, -0.015, -0.0153, 0.0331, 0.0289, 0.0439, -0.0562, 0.0492, 0.0219, 0.0353, -0.0187, 0.0253, 0.002, 0, -0.0041, -0.1215, -0.0285, -0.0178, 0.1112, -0.0607, -0.0049, -0.0277, 0.0933, -0.0399, 0.0652, -0.0967, -0.0326, 0.0347, 0.0329, 0.0391, 0.0535, 0.1415, -0.038, 0.055, 0.0585, 0.0127, -0.0162, -0.1259, -0.026, 0.0982, -0.0169, 0.0438, -0.0216, -0.0322, -0.0797, 0.0062, 0.0251, 0.044, 0.0746, 0.039, 0.0029, -0.0243, 0.0923, 0.0251, -0.0049, 0.0076, -0.0009, 0.0351, -0.0014, -0.0268, -0.0589, -0.0882, 0.0157, 0.0255, 0.0411, 0.071, 0.0111, -0.0692, -0.0837, -0.0207, 0.0388, -0.055, 0.0438, 0, 0.0055, 0.0116, -0.0336, -0.0028, -0.0628, -0.066, -0.0013, -0.0546, -0.0654, -0.0677, 0.089, 0.0009, -0.0854, 0.0732, -0.0258, 0.0031, -0.0631, -0.0424, -0.0072, -0.0688, -0.0671, 0.0256, -0.0577, -0.0088, 0.0338, 0.0325, 0.0186, -0.0395, -0.0545, 0.0134, 0.0709, -0.0356, 0.0792, 0.0017, -0.0741, -0.0056, 0.0073, -0.0513, -0.0161, -0.005, -0.0226, -0.0522, 0.0256, -0.0725, -0.0146, 0.0011, -0.1335, 0.0835, -0.0352, -0.0407, -0.0218, 0.0827, -0.0781, -0.0359, -0.0024, -0.0226, -0.0439, 0.0784, 0.0526, 0.1279, -0.081, 0.0725, 0.0585, -0.0102, -0.0366, 0.02, -0.0248, -0.1102, 0.025, -0.0405, -0.0854, 0.006, -0.0242, 0.1014, -0.0045, -0.0587, -0.0027, -0.0882, 0.1163, 0.0456, -0.0158, -0.0803, 0.0939, 0.0815, -0.0442, -0.0599, -0.002, -0.1172, -0.001, -0.0906, -0.0199, -0.064, -0.0188, -0.0748, 0.0206, 0, 0.0404, -0.0309, 0.019, -0.0208, -0.1197, -0.0286, -0.0404, 0.0388, 0.0461, -0.0064, 0.0544, 0.0865, 0.002, 0.0375, 0.062, 0.0502, -0.016, -0.0899, 0.0384, 0.0162, 0.059, 0.0209, -0.0289, 0.0143, -0.0288, 0.0072, -0.0025, -0.0217, 0.0461, -0.0354, 0.001, -0.0414, 0.0165, -0.0039, -0.0536, -0.0229, 0.0087, 0.0363, -0.099, 0.048, 0.0489, 0.0309, 0.0113, -0.0282, -0.101, 0.0474, 0.0082, 0.0115, 0.051, -0.0331, 0.0491, -0.0136, 0.041, -0.0218, -0.0203, 0.0098, 0.0208, -0.0055, 0.0223, -0.0636, 0.0141, -0.034, -0.0447, 0.0025, 0.0206, -0.0374, -0.0209, -0.0356, 0.0339, -0.1413, 0.0299, -0.0862, -0.0473, -0.0581, 0.0633, -0.007, 0.0204, -0.0458, -0.0356, 0.055, 0.0689, 0.0232, 0.0098, 0.0412, 0.0937, -0.0456, -0.1283, 0.0202, 0.0722, 0.0066, -0.0526, 0.0479, -0.0057, 0.0161, 0.0148, 0, -0.1369, -0.035, 0.0007, -0.0862, 0.0122, -0.0242, -0.0089, 0.0216, -0.0609, 0.0234, 0.0328, 0.0463, -0.0647, -0.0847, 0.0088, 0.072, -0.0197, 0.0255, 0.0218, 0.0159, 0.0685, -0.0069, -0.0165, 0.05, 0.0247, 0.0271, -0.0044, 0.0731, -0.0022, 0.0225, 0.0857, 0.067, 0.0793, -0.0222, 0.0016, 0.0979, -0.0012, 0.0135, 0.0249, 0.1175, 0.043, -0.0957, 0.0424, 0.0316, -0.0175, 0.0121, 0.003, 0.0152, 0.0214, -0.093, -0.018, 0.0199, -0.0261, 0.0458, -0.0835, 0.0008, 0.0309, -0.0112, 0.0374, -0.0137, 0.0105, 0.029, 0.0275, 0.0104] },
                { slug: 'data', vector: [-0.1371, 0.001, 0.0254, 0.1684, -0.0331, -0.081, 0.0039, -0.0162, 0.0874, -0.0107, -0.0085, 0.0517, -0.0123, -0.0136, -0.0296, 0.0335, 0.1188, -0.0605, -0.0583, -0.0102, 0.0804, -0.0169, -0.0045, 0.0235, -0.0284, -0.0188, -0.041, -0.0428, 0.0728, -0.0331, 0.0252, 0.0826, -0.1117, -0.0166, -0.0886, 0.0934, 0.0301, -0.0607, -0.0275, 0.0193, 0.0528, -0.0007, -0.0764, 0.0028, 0.0696, -0.05, 0.066, -0.0477, -0.0369, -0.0062, -0.0285, -0.0015, -0.061, 0.0614, 0.0161, 0.0164, 0.0482, 0.0337, -0.0564, 0.0508, -0.049, -0.0426, 0.0006, 0.0408, 0.0043, 0.0085, -0.0091, -0.0413, 0.0487, -0.0617, 0.0135, -0.0702, 0.0728, -0.0503, -0.0204, -0.0176, 0.0328, -0.0432, 0.0484, -0.0461, 0.0772, -0.0493, -0.0097, -0.0475, 0.0152, 0.0505, 0.0534, -0.0141, 0.0241, -0.0438, -0.0187, 0.0185, -0.05, 0.0886, -0.0429, 0.0063, 0.0268, -0.0029, -0.0709, 0.0457, 0.0235, 0.0421, -0.0221, 0.0464, -0.0358, -0.0696, 0.0067, 0.0434, -0.0913, 0.0261, -0.0486, 0.0456, -0.0071, -0.0051, -0.0017, -0.0166, 0.0012, -0.0059, -0.0068, -0.0103, 0.0727, 0.0017, 0.0401, 0.0122, 0.0516, -0.0234, 0.041, 0, 0.0243, 0.0041, -0.0163, -0.0122, 0.0173, -0.0201, 0.0864, -0.0791, -0.0135, -0.0282, 0.0746, 0.0812, 0.0108, 0.0113, -0.0372, -0.0208, -0.0178, -0.0817, -0.01, 0.0616, -0.0327, 0.0097, -0.0148, -0.0033, 0.0283, 0.0106, -0.0624, 0.0828, -0.0002, 0.0045, 0.1194, 0.0209, -0.0233, -0.0477, -0.049, -0.0549, -0.0495, -0.0807, -0.0895, -0.0604, 0.0108, 0.0572, -0.0612, 0.0365, -0.0499, -0.0935, -0.0574, 0.0592, -0.0335, -0.0308, 0.0291, 0.0862, -0.0524, -0.0254, -0.0281, -0.0175, -0.0356, -0.0365, 0.0293, 0.0755, -0.0497, -0.143, -0.0305, -0.0144, -0.0393, 0.0051, -0.0494, -0.0159, -0.0233, 0.0817, 0.0015, 0.0796, 0.0448, 0.0178, 0.0626, -0.0438, -0.0658, -0.039, -0.0191, 0.0255, 0.1086, -0.0476, -0.0167, 0.097, -0.0529, 0.0536, 0.0197, -0.0613, -0.0469, 0.0465, -0.0038, -0.0427, 0.0928, -0.0543, -0.0428, 0, 0.0741, -0.0329, -0.0673, 0.0737, 0.0127, -0.0302, 0.025, 0.0478, -0.0112, -0.0824, -0.0478, 0.0014, 0.0177, 0.1109, -0.0192, 0.0624, -0.017, -0.1271, 0.0034, 0.0092, 0.0536, 0.059, -0.007, 0.0509, -0.0616, 0.0418, -0.0733, -0.0542, -0.0356, -0.0316, 0.0292, -0.0762, -0.0535, -0.0605, 0.016, 0.0519, 0.0233, 0.0698, -0.0759, -0.01, 0.0525, 0.0155, -0.0617, 0.0319, -0.0097, -0.0215, -0.0495, 0.0151, -0.0155, 0.0159, 0.0086, 0.0196, -0.0293, 0.0174, 0.0434, -0.0471, 0.021, -0.1147, 0.0814, 0.0137, -0.0255, -0.0891, 0.0441, -0.0411, -0.0488, 0.0528, 0.0088, -0.0363, 0.1689, 0.0259, 0.0046, 0.0074, -0.0219, -0.0751, 0.0672, -0.0349, -0.0656, -0.0789, 0.0141, 0.0971, -0.0313, 0.0162, 0.0214, 0.0075, 0.0647, -0.0168, -0.0017, 0.0524, 0.0824, 0.0088, -0.0329, -0.0056, -0.0536, 0.0298, 0.0928, 0, -0.0331, -0.0103, 0.051, 0.0426, 0.0154, 0.0202, 0.0167, -0.0248, -0.0041, -0.0107, 0.103, 0.0357, 0.0781, 0.0095, -0.0189, 0.1229, 0.0498, -0.0356, 0.0004, -0.0495, -0.0487, 0.0181, -0.0306, 0.0344, 0.0468, 0.031, 0.0178, 0.0681, -0.0452, -0.0352, -0.0076, -0.0469, 0.0997, 0.0134, -0.036, -0.0056, 0.0748, -0.0181, 0.0568, 0.0871, 0.058, 0.029, 0.0842, 0.0357, 0.0128, -0.0176, -0.0419, -0.0414, 0.055, 0.0394, -0.0097, -0.1142, -0.1032, 0.0731, 0.0584, -0.1096, 0.0047, -0.0213, 0.0483, 0.0268, 0.0102, -0.0818, -0.017, -0.0444] },
                { slug: 'faq', vector: [-0.0939, -0.0512, 0.0117, 0.079, 0.0623, -0.0344, -0.0272, 0.0667, 0.0277, 0.01, -0.0162, 0.0106, -0.033, -0.0022, 0.0046, 0.0351, 0.0793, -0.0383, -0.0422, 0.0027, 0.0776, -0.0871, -0.0058, -0.0229, 0.007, 0.041, -0.0337, -0.0022, 0.0832, -0.0644, 0.0075, 0.1689, 0.0246, -0.0281, -0.0691, 0.1085, 0.1059, -0.0141, -0.0775, -0.0335, -0.0583, 0.0411, -0.0018, -0.054, 0.043, -0.0596, 0.0121, -0.1098, -0.1012, -0.0534, -0.0466, -0.0824, -0.0351, -0.0129, 0.0239, -0.0342, -0.0062, 0.016, -0.0138, 0.0467, -0.0629, 0.012, -0.0126, 0.0745, 0.0341, -0.031, 0.0096, -0.0888, 0.0479, -0.1214, -0.122, -0.0458, 0.1128, 0.0022, -0.0747, -0.1058, 0.0465, -0.0002, 0.0704, -0.0255, 0.0043, 0.0928, -0.0722, 0.0393, -0.0048, 0.078, 0.035, 0.0288, 0.07, -0.0174, 0.0176, 0.0193, -0.0132, 0.0765, 0.0047, -0.0093, 0.0468, -0.0273, -0.0386, 0.0679, 0.062, 0.008, 0.0858, 0.013, -0.0215, -0.0321, 0.0075, 0.0561, -0.0405, 0.0419, -0.0229, 0.0709, -0.0116, -0.0817, 0.0266, -0.0568, 0.044, -0.0684, 0.1169, 0.0376, -0.0071, 0.0579, -0.0123, -0.0357, 0.0829, 0.0132, -0.0015, 0, 0.038, 0.0694, -0.008, 0.054, 0.0378, -0.0312, 0.1201, -0.0313, -0.0666, -0.0055, 0.1089, 0.1102, -0.0232, 0.0349, 0.0554, -0.0818, -0.0273, -0.0237, -0.0218, -0.0157, -0.0277, 0.0363, -0.002, 0.0457, 0.0213, 0.0418, 0.0489, 0.0263, -0.0754, 0.0204, 0.0266, -0.0205, -0.0311, -0.0347, -0.0196, -0.0037, -0.0407, -0.1173, 0.0235, -0.0797, -0.0686, 0.0215, -0.0847, 0.0016, -0.0188, -0.0221, -0.0059, 0.0602, 0.0197, -0.0302, -0.0054, 0.0196, -0.037, 0.0031, 0.0015, 0.0402, 0.0026, -0.0463, 0.0476, 0.0807, -0.1022, -0.0148, -0.0477, 0.0593, -0.0349, 0.0215, -0.0707, -0.0803, 0.0269, 0.0545, 0.037, 0.06, 0.0374, 0.0316, 0.0979, -0.0622, 0.0449, -0.0798, 0.0159, 0.0619, -0.0123, 0.0592, 0.0245, 0.024, -0.0103, -0.0689, 0.0426, 0.0368, -0.0013, -0.0361, -0.0223, -0.1224, 0.0348, -0.0606, -0.0172, 0, 0.0149, -0.0345, 0.0133, 0.0403, -0.095, -0.0501, -0.0644, 0.0609, 0.0072, -0.0663, -0.0489, 0.0297, 0.0371, 0.0639, -0.0275, 0.0514, -0.0351, -0.134, 0.0593, 0.0152, 0.0615, 0.0848, -0.0571, 0.0101, -0.0057, -0.0171, -0.0332, -0.0076, -0.0514, -0.0002, 0.0141, -0.0916, -0.0723, -0.0316, 0.0062, -0.037, -0.0172, 0.0395, -0.0283, -0.01, -0.0492, -0.0574, 0.0087, -0.0274, -0.0801, 0.0484, -0.0722, 0.0331, 0.0653, -0.0781, -0.0304, -0.0124, 0.0246, -0.0852, -0.0475, -0.0565, -0.0277, -0.016, 0.0224, 0.0121, 0.0554, -0.0346, -0.0179, -0.0252, -0.0057, 0.0847, -0.0806, -0.0055, 0.0826, -0.0385, -0.0488, -0.0193, 0.026, -0.0591, 0.0074, -0.0218, 0.0659, -0.0229, 0.0003, 0.0125, 0.0287, 0.0325, 0.0249, -0.0398, -0.0033, 0.0078, -0.0411, 0.015, 0.0348, 0.0486, -0.0979, 0.0985, -0.0148, 0.0438, -0.004, 0, -0.0584, 0.0173, 0.0168, -0.063, -0.0031, 0.0645, 0.0317, -0.0217, 0.021, 0.0915, 0.0539, 0.0512, -0.027, 0.0145, 0.021, 0.1171, -0.0182, -0.0326, -0.0313, -0.0234, 0.0477, 0.0248, 0, 0.0615, 0.0278, -0.016, 0.0323, 0.1047, -0.0099, -0.0126, -0.0384, 0.0925, 0.0335, 0.0239, 0.059, 0.0253, 0.0192, -0.0057, 0.0137, 0.0142, 0.0055, -0.009, 0.0672, -0.0128, -0.006, 0.0457, -0.0974, -0.095, 0.0594, -0.0089, 0.0187, -0.0305, -0.1041, 0.0491, -0.0389, 0.0584, 0.0195, -0.069, 0.0635, -0.0275, -0.0047, 0.0139, 0.0465, 0.026] },
                { slug: 'getting-started', vector: [-0.1097, -0.0279, 0.0055, 0.0926, 0.028, -0.0745, -0.0158, -0.0014, 0.0558, 0.0424, -0.0021, -0.0474, 0.0184, -0.0373, 0.0191, 0.0749, 0.0008, 0.0055, -0.0048, -0.0256, 0.0242, -0.0144, 0.0152, -0.0318, -0.0069, -0.0019, -0.0001, -0.0045, 0.0152, -0.063, 0.051, 0.1034, -0.0081, -0.0125, -0.0121, 0.1551, 0.0165, -0.0407, -0.0745, -0.0973, 0.0869, 0.097, -0.0379, -0.0903, 0.0238, -0.1249, -0.0432, -0.0574, -0.0322, -0.0575, -0.1119, -0.1214, -0.0713, -0.0284, 0.0075, 0.0289, 0.0246, 0.0448, -0.0413, -0.0278, 0.0023, -0.0051, -0.0056, -0.004, 0.0588, 0.0269, -0.015, 0.0139, 0.0396, -0.0311, -0.0855, 0.0078, -0.0101, -0.0781, -0.0899, -0.0811, -0.0076, 0.0168, 0.0024, -0.025, 0.0226, 0.0397, -0.014, 0.0438, -0.0073, 0.0348, 0.0538, 0.041, 0.1163, -0.0068, -0.0698, -0.0053, -0.0101, 0.0546, 0.0229, 0.0368, 0.0526, 0.0732, -0.0264, 0.0703, 0.0438, 0.0124, -0.0107, 0.0079, 0.0009, 0.0087, -0.0079, 0.0063, -0.0663, 0.0375, -0.0071, 0.0778, -0.0297, -0.041, 0.0263, -0.0099, 0.103, -0.0317, 0.0294, 0.0947, 0.1169, 0.0005, -0.0447, -0.011, 0.0458, 0.012, 0.049, 0, 0.078, 0.0011, -0.0331, 0.0982, 0.103, -0.0346, 0.0736, -0.0204, -0.0567, -0.0402, 0.0831, 0.0755, -0.0241, -0.0057, -0.0327, -0.1222, 0.0117, -0.0161, 0.0331, -0.0008, -0.0573, -0.0126, -0.0728, 0.0295, 0.0584, 0.0204, -0.0003, 0.0497, -0.0637, -0.0266, 0.1538, 0.0018, -0.0605, 0.0019, -0.0029, -0.0551, -0.0559, -0.0494, -0.0356, -0.0229, -0.0284, -0.0084, -0.0864, 0.0215, -0.0556, -0.0696, -0.095, 0.0352, 0.0931, 0.0232, -0.0241, 0.0489, -0.0675, -0.0084, -0.0283, 0.0137, -0.0764, -0.0608, 0.0266, 0.0724, -0.0605, -0.0354, -0.0514, 0.0605, -0.0046, -0.0096, -0.0503, -0.0565, 0.0744, 0.0353, -0.0307, 0.0378, 0.0889, 0.0347, 0.0861, -0.0639, -0.0257, -0.0159, -0.0432, 0.0247, 0.0533, 0.0073, -0.0836, 0.0517, 0.0988, -0.0161, 0.0217, 0.0014, -0.067, 0.0118, 0.0586, -0.0603, 0.0613, -0.0894, -0.0535, 0, 0.057, -0.0671, -0.0555, 0.0373, -0.0171, -0.0862, -0.0957, 0.0329, -0.0249, -0.0297, -0.088, 0.0695, 0.0275, 0.073, -0.0349, 0.1093, -0.0154, -0.0916, 0.0433, 0.0482, 0.0157, 0.1386, 0.0083, 0.0123, -0.0419, 0.0144, -0.0164, 0.0476, -0.025, -0.0296, -0.0196, 0.0249, -0.1181, -0.0417, -0.0293, -0.0225, 0.0201, 0.0817, -0.0228, -0.0107, 0.0327, -0.0573, -0.0745, -0.0278, -0.0498, -0.0189, 0.0124, 0.0489, -0.0558, -0.0028, -0.0379, -0.0394, -0.0074, -0.0752, 0.0101, -0.0548, 0.0171, -0.0225, 0.0223, 0.0042, 0.0633, -0.1073, 0.0485, -0.0439, -0.0192, 0.0133, -0.066, -0.0175, 0.0812, -0.0036, -0.1117, 0.036, 0.0109, -0.0523, 0.0628, 0.001, 0.038, -0.0713, 0.0317, 0.009, -0.0593, 0.0683, -0.0344, -0.099, 0.003, -0.0137, -0.0454, 0.0434, 0.0589, -0.0392, -0.0604, 0.0748, -0.0162, 0.0032, -0.0058, 0, -0.0079, -0.0101, -0.0421, 0.0313, 0.0265, 0.0244, 0.038, 0.0122, 0.0366, -0.0085, 0.0736, 0.0374, 0.0526, 0.0578, -0.0084, 0.0646, 0.0199, 0.034, -0.0589, -0.0178, -0.0073, 0.0326, 0.0096, 0.0992, 0.0458, -0.0122, 0.0438, 0.0169, -0.0744, -0.0036, 0.0257, 0.0304, 0.0035, 0.035, -0.0014, -0.0194, 0.062, -0.0491, 0.057, 0.0642, 0.0279, 0.0402, 0.0509, -0.006, -0.0231, -0.0221, -0.0554, -0.0554, 0.0758, -0.0048, 0.0165, -0.0454, -0.0791, 0.0105, 0.0292, 0.0322, 0.0882, -0.0118, 0.0666, 0.0613, -0.0119, -0.0178, 0.0097, -0.0459] },
                { slug: 'ghost', vector: [-0.0993, -0.0543, 0.0282, 0.0737, 0.0357, -0.0537, 0.0042, -0.1038, 0.1276, -0.0486, 0.0733, 0.0094, 0.0384, -0.0119, -0.0605, 0.0253, -0.0157, 0.0023, -0.0684, 0.0759, 0.0228, -0.027, -0.0454, 0.027, 0.0002, -0.0027, 0.0133, -0.082, 0.0998, -0.1222, 0.0598, 0.1266, -0.1037, -0.0504, -0.0585, 0.0509, 0.0866, 0.0241, -0.0691, -0.0529, -0.0109, 0.0646, -0.0282, -0.0184, -0.0609, -0.0664, 0.014, -0.0618, -0.0283, -0.0618, -0.0071, -0.0336, 0.0671, 0.0529, -0.0868, 0.0493, 0.003, 0.0539, -0.0315, 0.0069, -0.0317, 0.0593, 0.0062, 0.0242, 0.0081, -0.0677, -0.0107, -0.0486, 0.0121, -0.0174, -0.104, -0.0212, 0.0865, -0.0264, 0.0026, -0.0237, 0.0205, -0.0382, 0.0124, -0.0133, 0.0652, 0.0495, -0.0217, -0.0098, 0.0383, 0.0905, -0.0263, -0.0296, -0.0805, 0.0284, 0.035, 0.0175, -0.0373, 0.0621, 0.0103, 0.0144, 0.0046, 0.0531, -0.0303, 0.0582, 0.0005, 0.0261, 0.0644, 0.0229, -0.0314, -0.0719, -0.0753, -0.034, -0.0264, 0.0177, -0.003, 0.0438, -0.0621, -0.0199, -0.0264, -0.0318, 0.0505, -0.0406, 0.0723, -0.0408, 0.0186, 0.0845, 0.0167, 0.0304, 0.1115, -0.0441, 0.01, 0, 0.0428, 0.0066, -0.0422, -0.0028, 0.0498, -0.036, 0.0239, 0.0172, -0.01, 0.0413, 0.0264, -0.043, 0.0237, 0.0301, 0.0107, -0.0164, -0.0587, -0.018, -0.0304, -0.0428, -0.0128, 0.1202, -0.0302, 0.0087, 0.0658, 0.0917, -0.0048, 0.0176, -0.0817, -0.0008, 0.0659, 0.0202, 0.0159, -0.0669, -0.0327, 0.062, 0.0066, -0.0971, 0.0364, -0.0571, -0.0634, -0.0328, -0.0567, -0.0626, 0.0086, -0.0165, 0.075, 0.1289, -0.0767, -0.0144, 0.0325, 0.0086, 0.0144, 0.0274, -0.0151, -0.0016, 0.0058, -0.0592, 0.0926, 0.0217, 0.0155, -0.0175, -0.0421, 0.0163, -0.0077, 0.0459, 0.0128, -0.0106, 0.0202, -0.1037, -0.028, 0.0434, -0.0297, 0.0304, 0.0235, -0.0613, -0.0675, -0.1274, 0.0996, 0.0907, -0.0264, -0.0025, -0.0001, 0.0047, -0.0116, -0.0236, 0.0209, -0.0243, -0.0528, -0.0204, 0.0133, -0.0639, 0.0152, -0.0089, 0.0658, 0, 0.0279, -0.044, 0.048, 0.0266, -0.0169, -0.0977, -0.0721, -0.0053, 0.0201, -0.0839, -0.0621, 0.1058, 0.0016, 0.0905, -0.0178, 0.058, -0.036, -0.0989, -0.0061, -0.0164, 0.1207, 0.0853, -0.0373, -0.0009, 0.0294, -0.0317, 0.0502, 0.0342, 0.0521, 0.0169, 0.0659, -0.0345, 0.0207, -0.0556, 0.0015, -0.0104, -0.0579, 0.11, -0.0317, -0.089, -0.1041, 0.0189, 0.0839, -0.0323, -0.0581, 0.0379, -0.051, 0.023, 0.0564, 0.0108, -0.039, 0.0613, -0.0023, 0.0158, -0.0247, 0.0122, -0.0689, 0.0047, 0.0854, -0.0331, 0.0818, -0.012, -0.094, -0.0367, -0.0207, 0.0513, -0.0796, 0.0072, 0.0252, -0.039, 0.0041, 0.0256, -0.0262, -0.0176, 0.0342, 0.0089, 0.0839, -0.0649, 0.0551, -0.0143, -0.0498, -0.022, -0.0149, -0.0414, -0.0053, 0.011, -0.1103, 0.0367, 0.007, -0.0656, -0.0569, 0.0601, -0.0363, -0.0016, -0.0403, 0, -0.0689, -0.044, 0.005, -0.1068, -0.0098, 0.0082, 0.1327, 0.0043, -0.0721, -0.0138, 0.0528, 0.0477, -0.0191, 0.0044, 0.0081, 0.0419, -0.0737, -0.0348, -0.0157, -0.0359, 0.0039, 0.0264, -0.0268, 0.0533, 0.0082, 0.0103, 0.0069, 0.0645, 0.0359, -0.0136, 0.0808, 0.1103, 0.0666, 0.039, -0.0649, 0.0976, -0.021, 0.0404, -0.041, -0.0364, 0.0096, -0.1088, 0.1032, -0.0339, -0.0155, -0.0188, -0.023, -0.058, 0.0736, 0.018, 0.0148, -0.0409, -0.057, 0.083, 0.0411, -0.0429, 0.0224, 0.0257, 0.0682, 0.0087, 0.002, -0.068, 0.0399, 0.0471] },
                { slug: 'giper-baza', vector: [-0.087, -0.097, -0.0298, 0.0979, -0.0838, -0.0517, -0.0216, -0.0558, 0.034, 0.029, 0.0439, -0.0063, 0.0539, 0.0255, -0.0126, 0.0424, 0.0855, -0.0137, -0.0886, -0.0005, -0.0412, 0.004, -0.0261, 0.101, 0.0157, -0.0011, -0.0004, -0.0438, -0.0245, -0.0376, 0.0052, 0.0367, -0.0531, 0.0447, -0.0137, 0.025, 0.0325, -0.026, -0.0111, -0.0153, 0.052, -0.0133, -0.0903, -0.045, 0.039, -0.0571, 0.0035, -0.0199, -0.0117, -0.0008, -0.1449, 0.0263, -0.0879, 0.0732, 0.0078, 0.0232, 0.062, -0.0008, -0.0251, -0.008, -0.0138, -0.0066, 0.0168, 0.0248, -0.0058, -0.0367, -0.0159, 0.0312, 0.0779, -0.093, 0.021, -0.0089, -0.0399, -0.0703, -0.0059, -0.0355, 0.0329, -0.0112, 0.0018, -0.0625, -0.0486, -0.014, 0.0007, 0.0294, 0.0106, 0.0015, 0.0778, 0.0798, 0.0459, 0.0038, 0.0302, 0.0705, 0.0242, 0.015, -0.0176, 0.0172, 0.0477, 0.0057, 0.0103, 0.0439, 0.013, 0.0334, 0.0773, 0.0223, -0.022, -0.1213, 0.0119, 0.0441, -0.1418, 0.0047, 0.0644, 0.0332, -0.0231, 0.0376, 0.0406, 0.0782, -0.0092, 0.0192, 0.0337, 0.0066, 0.043, -0.0098, -0.0469, 0.0113, 0.0434, -0.0189, -0.0213, 0, 0.0571, 0.0107, 0.0378, 0.0315, -0.0157, 0.0706, -0.054, -0.0125, -0.0577, -0.0469, -0.0079, 0.1154, 0.0098, -0.0061, -0.0234, -0.0435, -0.0977, 0.0044, -0.0109, 0.0417, 0.0257, 0.0394, -0.1081, 0.0092, -0.0201, 0.0539, -0.0275, 0.0151, -0.0929, 0.0159, 0.0959, -0.0108, -0.0434, -0.0101, -0.0411, -0.0467, 0.0012, -0.0647, -0.1061, -0.0775, -0.019, 0.0078, -0.0809, 0.014, -0.0332, -0.0088, -0.0202, 0.0622, 0.0403, 0.0213, 0.0632, 0.0166, -0.0296, -0.0344, -0.0792, 0.0563, -0.0282, -0.0793, 0.0311, 0.0839, -0.0138, -0.0159, -0.0587, 0.0346, -0.0218, 0.0185, 0.0288, -0.0676, 0.076, -0.0234, -0.0113, 0.0766, 0.0378, 0.0337, 0.0469, -0.1066, -0.0155, -0.0461, -0.0302, 0.0637, -0.0903, -0.013, -0.0647, 0.0756, -0.0422, 0.0156, 0.0209, 0.0154, -0.0474, 0.0151, 0.0777, -0.0013, 0.0846, -0.0597, 0.0108, 0, 0.0294, -0.1565, -0.0309, 0.0698, -0.0141, -0.1208, -0.0713, 0.0241, 0.049, -0.0618, -0.04, -0.0208, 0.007, 0.0666, -0.0008, -0.0193, 0.0897, -0.1372, -0.0329, 0.0533, 0.05, 0.0641, -0.0268, 0.0756, 0.0134, 0.04, -0.0658, -0.021, 0.0097, -0.0141, 0.0118, -0.0581, -0.0213, -0.0719, -0.0485, -0.0083, -0.0226, 0.0742, -0.0383, 0.0604, -0.0107, 0.0051, -0.0941, 0.0271, 0.034, 0.0711, 0.0249, 0.1179, -0.044, 0.0141, -0.0012, -0.0056, -0.0246, -0.0972, 0.0277, 0.015, 0.0272, -0.0561, 0.0268, -0.0202, 0.0848, -0.1027, 0.0657, 0.0512, -0.0599, 0.008, 0.0638, -0.047, 0.043, -0.038, -0.0472, -0.0224, -0.0097, -0.0461, 0.0864, -0.0288, -0.1215, -0.0643, 0.0343, -0.0002, -0.0459, 0.0355, 0.026, 0.0531, 0.0455, 0.0173, -0.0508, 0.0205, 0.1071, -0.0235, -0.0916, 0.0346, -0.0803, 0.0267, -0.0346, 0, -0.0168, 0.0512, -0.0175, 0.0964, 0.0033, 0.0095, 0.027, -0.0002, 0.0864, 0.02, 0.0008, 0.0356, -0.0494, -0.0134, 0.0351, 0.0947, 0.1032, -0.1482, -0.0227, 0.0089, -0.0038, -0.0276, -0.0526, 0.0026, 0.0327, 0.0399, 0.0183, 0.0671, 0.048, -0.0522, 0.0977, -0.0465, 0.0874, 0.0766, -0.0116, -0.0213, 0.0729, 0.014, 0.0218, 0.0996, 0.0448, -0.0384, 0.0344, -0.0071, 0.0032, 0.0051, -0.0234, -0.073, 0.0937, 0.012, -0.0299, -0.0679, -0.0036, 0.0609, 0.0382, 0.023, 0.0658, -0.0457, 0.0781, 0.0566, 0.021, 0.0091, -0.0523, -0.0026] },
                { slug: 'installation', vector: [-0.1042, -0.0599, 0.0225, 0.075, 0.0903, -0.0475, -0.007, -0.0249, 0.0122, 0.0399, 0.0553, 0.0037, 0.0114, 0.0587, 0.0394, 0.075, 0.0181, -0.0158, 0.0168, 0.0129, 0.0467, 0.004, 0.0974, -0.0527, -0.0118, 0.0038, 0.0064, 0.0308, 0.0179, -0.0382, -0.0059, 0.089, 0.0112, 0.0066, -0.0145, 0.1286, 0.0515, 0.016, -0.0689, -0.0908, 0.0456, 0.1089, 0.0117, -0.105, -0.0157, -0.1045, -0.0122, -0.0665, -0.045, -0.0136, -0.0848, -0.0666, -0.0383, -0.0549, 0.038, 0.0253, 0.0154, 0.0854, -0.006, -0.006, 0.013, 0.0045, -0.0152, -0.0375, 0.0506, 0.048, -0.0209, -0.0033, 0.0488, -0.0512, -0.0953, -0.0133, 0.0127, -0.0157, -0.1285, -0.0913, 0.0662, 0.0673, 0.0336, -0.0167, -0.0134, 0.0601, 0.0329, 0.0735, 0.0229, 0.029, 0.0432, 0.0172, 0.0685, -0.03, 0.0095, -0.0937, -0.0701, 0.0827, 0.0819, -0.0645, 0.006, 0.1368, -0.035, 0.0108, 0.0058, -0.0898, 0.0445, 0.0259, 0.0164, 0.0084, -0.0147, -0.0224, 0.001, 0.0224, 0.0011, 0.0695, -0.0015, -0.0716, 0.0172, -0.0304, -0.0031, -0.0027, 0.0217, 0.1215, -0.0075, 0.0485, 0.0828, -0.0437, 0.0577, -0.0056, 0.0434, 0, 0.029, 0.033, -0.032, 0.1399, 0.0831, -0.0562, 0.0541, 0.0158, -0.0384, -0.0174, 0.0279, 0.0552, -0.0685, 0.0275, 0.0747, -0.0874, -0.0096, -0.0428, 0.0288, -0.0137, -0.0661, 0.0138, -0.0017, 0.0477, 0.0685, 0.0231, 0.0575, 0.0069, -0.0815, 0.0023, 0.0565, 0.055, -0.016, -0.0256, 0.0117, -0.0036, -0.0337, -0.0046, -0.0603, -0.0505, -0.0343, 0.0311, -0.0619, 0.0109, -0.0468, -0.074, -0.0283, 0.0217, 0.1749, 0.0309, -0.045, -0.0083, 0.0274, 0.0325, -0.0178, 0.0108, -0.0082, -0.0524, 0.0482, -0.0187, -0.0181, -0.084, -0.0357, 0.0785, -0.0043, 0.0039, -0.0315, -0.0338, 0.0614, 0.0367, -0.0169, -0.0044, -0.0137, 0.0477, 0.0452, -0.0296, -0.0017, 0.031, -0.0295, 0.0193, -0.0112, 0.0192, -0.0332, -0.0409, -0.005, -0.032, 0.0104, 0.0463, 0.013, -0.0436, 0.0814, -0.0411, -0.0068, -0.0119, -0.0495, 0, 0.0336, -0.0214, -0.0298, -0.0054, -0.1077, -0.0653, -0.0807, -0.0398, 0.0032, -0.0213, -0.0221, 0.0499, 0.0829, 0.0593, -0.024, 0.1105, -0.0557, -0.0481, 0.0724, -0.0137, 0.0395, 0.0784, -0.0151, -0.0539, -0.0305, 0.0516, -0.0554, 0.0163, 0.0171, -0.0157, 0.052, 0.0898, -0.0838, -0.0772, -0.1018, -0.0211, -0.0437, 0.0459, -0.0025, -0.0729, 0.0174, 0.0281, -0.0551, -0.0408, -0.042, -0.0408, 0.0561, 0.005, -0.0443, -0.0463, -0.0536, 0.0019, 0.0213, -0.0739, -0.0215, -0.0244, -0.0155, 0.0124, -0.0056, -0.0046, 0.0901, -0.0234, 0.0129, -0.0831, -0.0615, 0.0533, -0.0885, 0.0144, 0.0795, -0.0283, -0.1518, 0.0275, -0.0175, -0.0547, -0.0398, 0.0438, 0.0312, 0.0258, 0.0093, -0.0625, -0.0474, 0.0231, -0.0456, -0.0421, -0.0507, -0.038, -0.0159, -0.0288, 0.047, 0.0044, -0.0334, -0.0092, -0.0274, 0.0062, -0.0235, 0, -0.0383, 0.0272, -0.1029, -0.0739, 0.0667, -0.0021, 0.0558, 0.0854, 0.0781, 0.0182, 0.0789, 0.0745, -0.0633, 0.0233, -0.059, 0.0452, -0.0668, 0.0818, -0.0315, -0.0519, 0.019, -0.0282, -0.0045, 0.1479, 0.0462, 0.0002, 0.0382, 0.0337, -0.0082, 0.0351, -0.0499, 0.0331, -0.014, -0.0215, -0.0208, 0.0284, 0.0414, -0.03, 0.1078, 0.0284, 0.0063, -0.0377, 0.0681, -0.0004, -0.0586, -0.0075, -0.1053, -0.0473, 0.0004, -0.0463, 0.0034, 0.0192, -0.1087, 0.0459, 0.0312, 0.0536, 0.0402, 0.0029, 0.0628, -0.0644, -0.0005, -0.065, 0.031, -0.0943] },
                { slug: 'introduction', vector: [-0.1555, -0.0431, 0.0259, 0.0963, 0.004, -0.0283, 0.0162, 0.0082, 0.0667, -0.0168, -0.0636, 0.0034, 0.0088, 0.002, 0.0395, 0.0182, 0.0587, -0.0848, -0.0174, -0.0062, 0.0639, -0.0566, -0.003, -0.0204, -0.0462, 0.073, 0.0033, -0.0361, 0.0866, -0.0608, 0.0185, 0.1657, -0.018, -0.0196, -0.1259, 0.077, 0.0637, 0.0151, -0.0422, -0.0345, -0.0568, 0.0367, -0.0569, -0.0567, 0.0258, -0.0662, -0.0056, -0.0888, -0.1003, -0.0292, -0.0192, -0.0517, -0.0219, -0.0073, 0.0322, -0.0116, 0.0392, 0.0485, -0.0256, -0.0099, -0.0631, 0.0281, 0.0017, 0.026, 0.022, 0.0469, -0.0167, -0.0122, 0.1071, -0.0916, -0.1423, -0.0246, 0.1325, -0.0216, -0.0818, -0.0997, 0.0493, -0.0549, 0.0555, -0.0194, 0.0025, 0.0671, -0.0537, 0.0611, 0.0525, 0.0429, 0.0425, 0.0103, 0.0677, -0.0009, -0.0031, 0.0506, 0.0571, 0.0826, 0.0448, 0.0614, -0.0092, -0.0258, -0.036, 0.0896, 0.0295, -0.002, 0.048, 0.0134, -0.0222, -0.0412, -0.0036, -0.0101, -0.0673, 0.0025, -0.0072, 0.0708, -0.0114, -0.0432, -0.0273, -0.0553, 0.0182, 0.0037, 0.0968, 0.0474, 0.0367, 0.0233, -0.0122, -0.0211, 0.0705, 0.0217, 0.1071, 0, -0.0147, 0.0471, -0.0237, 0.0882, 0.0872, -0.033, 0.1373, -0.0229, -0.0357, -0.0153, 0.1305, 0.109, -0.0885, 0.0585, 0.0489, -0.0455, -0.0249, -0.0333, -0.0265, -0.0285, -0.0396, 0.0586, -0.0135, 0.0284, 0.0144, 0.0419, -0.0042, 0.0496, -0.058, -0.0135, 0.09, -0.017, -0.0219, 0.0019, -0.0391, -0.0191, -0.0624, -0.0793, 0.0386, -0.0455, -0.0646, -0.0032, -0.0386, 0.0597, -0.0079, 0.0218, -0.0297, 0.0776, -0.0172, -0.0226, 0.0014, 0.0648, -0.0044, -0.0158, -0.0105, 0.0036, -0.0319, -0.0213, 0.0621, 0.0624, -0.0512, -0.0269, -0.0072, 0.0292, -0.0507, 0.0191, -0.091, -0.1148, 0.0046, 0.0363, 0.0225, 0.1021, -0.0182, 0.0778, 0.0858, -0.0487, 0.0371, -0.0715, 0.0268, 0.0439, 0.0234, 0.0202, -0.0023, 0.0598, 0.0056, -0.0576, -0.0051, -0.0104, 0.0113, -0.0178, -0.0368, -0.0959, 0.0529, -0.0505, 0.0126, 0, 0.0319, -0.0449, 0.0002, 0.0131, -0.1092, -0.079, -0.101, 0.0199, 0.0055, -0.0477, -0.0297, 0.0881, 0.0516, 0.0455, -0.0588, 0.0404, -0.0415, -0.1072, 0.0096, -0.0156, 0.0618, 0.0471, -0.0516, 0.017, -0.0402, 0.0378, -0.0596, 0.0002, -0.0069, 0.0312, 0.0154, -0.0599, -0.0134, -0.0663, 0.0214, -0.0307, 0.0105, 0.0396, -0.0393, -0.0015, -0.0592, -0.0495, -0.0047, -0.0083, -0.0384, 0.0394, -0.071, 0.0344, 0.0451, -0.0646, 0.0065, 0.0135, -0.0086, -0.0922, -0.0181, -0.0747, -0.0267, -0.0873, -0.0069, -0.0052, 0.0057, -0.0473, 0.0032, -0.0085, -0.0432, 0.0257, -0.0766, -0.0547, 0.1289, -0.033, -0.0116, -0.0313, -0.0527, -0.0738, 0.0464, -0.0602, 0.083, -0.0055, 0.0167, 0.0216, -0.0155, 0.0203, 0.0366, -0.0906, -0.0391, 0.0499, -0.0571, 0.0065, 0.0979, 0.0329, -0.1065, 0.0808, -0.0433, 0.0222, -0.015, 0, -0.0586, -0.0231, 0.0046, -0.0337, -0.0145, 0.0626, -0.02, -0.0513, 0.0313, 0.0299, 0.0187, 0.0539, 0.0011, 0.0049, -0.0238, 0.1353, -0.0079, -0.0357, -0.0271, -0.0012, 0.0463, 0.0151, -0.0056, 0.0881, 0.0598, -0.0189, 0.0564, 0.0741, -0.0121, 0.059, -0.0111, 0.0331, 0.0511, 0.0392, 0.0048, 0.0228, 0.014, 0.0046, 0.0331, 0.0226, -0.0058, -0.0076, 0.0345, 0.0027, 0.0159, -0.0299, -0.056, -0.0368, 0.0643, 0.0016, -0.015, -0.0016, -0.1212, 0.0877, -0.0386, 0.0112, -0.006, -0.006, 0.0761, -0.0195, -0.042, -0.0822, 0.0211, -0.0228] },
                { slug: 'meta', vector: [-0.0443, 0.0127, -0.0107, 0.0643, 0.0819, -0.0521, 0.0419, 0.0031, -0.0217, -0.0329, 0.0515, -0.0098, 0.0259, -0.0306, 0.0832, 0.0607, 0.0387, 0.0389, -0.0163, 0.0199, 0.1014, 0.048, 0.062, 0.0347, -0.0419, 0.0712, -0.0672, 0.102, 0.0175, -0.0726, -0.0115, 0.1402, -0.0407, -0.0107, 0.0044, 0.1551, 0.021, 0.003, -0.0403, -0.0632, 0.0348, 0.0935, 0.0067, -0.0545, -0.0283, -0.1113, 0.0307, -0.0721, -0.0362, -0.0302, -0.0713, -0.0869, -0.0703, 0.0528, 0.0696, 0.0457, 0.0583, -0.0015, 0.0624, 0.0016, 0.0085, 0.0459, -0.0519, -0.0297, 0.0304, 0.0087, -0.0069, -0.013, 0.0257, -0.0914, -0.0356, -0.0229, -0.0096, 0.0184, -0.0544, -0.0099, 0.059, 0.0406, -0.0095, -0.1498, 0.0721, 0.0851, 0.041, 0.0204, 0.0213, 0.0061, 0.0493, 0.0529, 0.0653, 0.0024, 0.0034, -0.1124, -0.0055, 0.039, -0.0393, -0.0378, -0.0147, 0.0476, 0.0093, 0.0711, 0.0226, -0.058, 0.0512, 0.0042, 0.0087, 0.0189, -0.0369, 0.0476, -0.0412, 0.0396, -0.0454, 0.0185, -0.103, -0.1059, 0.0185, 0.0026, 0.001, 0.008, -0.011, 0.0589, 0.0081, -0.021, 0.1286, -0.0176, 0.0682, -0.0721, -0.1157, 0, 0.0765, -0.0193, -0.0299, 0.1408, 0.118, -0.0822, 0.0305, -0.0153, -0.0351, -0.008, 0.0259, 0.0529, -0.0891, 0.046, 0.0281, -0.0494, -0.0772, -0.0636, 0.0259, 0.0467, -0.0601, 0.0195, -0.0172, 0.0308, 0.0288, 0.0377, 0.0575, 0.0036, -0.0953, 0.0222, 0.0517, -0.0345, 0.1212, -0.0194, 0.002, -0.007, -0.0821, -0.0421, -0.0214, 0, -0.0229, 0.0177, -0.0521, 0.0219, 0.0031, -0.0261, -0.0208, 0.0243, 0.0862, 0.0288, 0.0318, -0.0051, 0.0549, -0.0142, -0.0718, -0.0192, 0.0033, -0.0164, 0.0492, -0.0141, -0.0325, -0.0676, -0.0511, 0.0835, -0.0082, 0.0662, -0.0384, -0.0128, 0.0081, -0.028, -0.0328, 0.034, -0.0128, 0.0104, -0.0478, -0.034, 0.0143, -0.013, -0.0443, 0.0574, -0.0469, 0.0815, -0.0132, -0.0041, -0.0661, -0.0153, 0.0357, -0.0351, -0.0216, -0.0627, 0.0592, -0.0231, -0.0034, -0.0525, 0.0126, 0, 0.0878, -0.0063, -0.0116, -0.0168, -0.0244, -0.0089, -0.0349, -0.0131, 0.0075, 0.0082, -0.0513, 0.0978, -0.0139, -0.0051, 0.0085, 0.0257, 0.0207, -0.0377, 0.0367, 0.0221, 0.009, 0.0694, 0.0156, -0.0025, -0.0228, 0.0394, -0.1027, -0.0169, 0.0345, 0.0104, 0.0047, -0.0078, -0.0629, -0.099, -0.0664, -0.0226, -0.1245, 0.0401, -0.0023, 0.0215, 0.009, 0.039, -0.0297, -0.0157, -0.0749, -0.0573, -0.0004, -0.0427, -0.0324, -0.0719, 0.033, -0.0146, -0.022, -0.0345, 0.0044, -0.0112, -0.007, 0.0468, -0.0387, 0.0688, 0.0625, -0.046, -0.0732, -0.0733, -0.1179, 0.0558, -0.0894, -0.1129, 0.0311, -0.0283, -0.0819, -0.0019, -0.0799, -0.0701, -0.043, 0.0699, 0.0499, 0.0493, -0.0028, -0.0051, -0.0359, 0.0355, -0.0846, -0.0582, -0.0053, -0.1026, -0.0683, 0.0585, 0.0482, -0.0672, 0.0158, 0.0435, 0.0724, 0.0318, -0.0068, 0, -0.0667, 0.0444, -0.033, -0.0044, -0.0131, 0.0225, 0.089, 0.0327, 0.082, 0.005, 0.0565, 0.03, -0.0548, 0.0663, -0.0887, 0.0521, -0.0286, 0.0623, -0.0625, -0.0286, -0.0601, -0.0275, -0.001, 0.0714, 0.0046, 0.0127, 0.0331, 0.0556, -0.0134, 0.0659, 0.002, 0.0162, -0.0987, -0.0024, -0.0011, -0.0029, 0.0055, -0.013, 0.0326, 0.0803, 0.0042, -0.0885, 0.0277, 0.0038, 0.0212, 0.0181, -0.1042, 0.0081, -0.0496, 0.0092, 0.0361, -0.0241, -0.0888, 0.0125, 0.0018, 0.0744, 0.0673, 0.0436, 0.0638, -0.016, -0.0232, -0.0645, 0.0704, -0.0468] },
                { slug: 'plugins', vector: [-0.0813, -0.0803, 0.037, 0.0849, 0.0489, -0.0014, 0.015, -0.0873, 0.0793, -0.0036, 0.0119, -0.0182, -0.0003, 0.0045, 0.0008, 0.0502, -0.0348, -0.0083, -0.089, -0.0613, 0.049, 0.0065, -0.0548, 0.0155, -0.0847, 0.0411, 0.0291, -0.0207, 0.0376, -0.0171, 0.0215, -0.0237, -0.0393, -0.0212, -0.1198, 0.1027, 0.0831, -0.01, -0.0457, -0.0553, -0.0056, 0.0153, 0.014, -0.0145, 0.0057, -0.0822, -0.0554, -0.079, -0.0419, -0.0528, -0.0121, -0.0656, 0.0192, 0.0844, 0.0019, -0.0285, -0.0345, -0.0565, 0.0093, -0.0123, -0.0296, 0.028, 0.0042, 0.0546, -0.0808, 0.0264, -0.0148, -0.0249, -0.027, -0.0395, -0.0929, -0.0695, 0.03, -0.0665, -0.0501, -0.0282, 0.0181, -0.0639, -0.0102, -0.0611, 0.1593, 0.0595, -0.0153, 0.0779, 0.0953, 0.0828, 0.0276, -0.1129, -0.0372, 0.0139, -0.0094, -0.0681, 0.0092, 0.0019, -0.0187, 0, 0.028, -0.066, -0.0608, 0.0767, 0.0181, 0.0439, -0.0072, -0.0702, -0.0081, -0.0184, -0.0441, 0.0332, -0.0201, 0.0324, -0.0032, 0.0359, 0.0051, -0.0723, 0.0185, -0.035, 0.048, 0.0257, 0.1228, 0.0835, 0.0041, 0.0535, -0.0732, 0.0445, 0.1188, 0.0301, -0.0437, 0, 0.0959, -0.0652, -0.0787, 0.078, 0.063, -0.0082, 0.0146, 0.0167, -0.0702, 0.0798, 0.0739, -0.0259, -0.0298, 0.0842, 0.0519, -0.0239, -0.0224, -0.04, -0.075, -0.1009, -0.0696, 0.0234, 0.0021, 0.0353, 0.086, 0.1043, -0.0049, 0.0052, -0.0376, -0.0028, 0.0089, -0.0049, 0.0417, -0.0072, -0.0369, 0.0424, -0.0138, -0.0682, 0.029, -0.0489, -0.0596, -0.04, -0.1366, -0.0276, 0.0128, -0.0159, -0.024, 0.0883, 0.0452, -0.0379, -0.0116, 0.0181, 0.0141, 0.0233, -0.0098, 0.0093, -0.0581, 0.0267, 0.1191, 0.0401, -0.0854, -0.0158, -0.0118, 0.0575, -0.0372, 0.0349, -0.0318, -0.0353, 0.0275, -0.0525, -0.048, 0.0548, -0.0283, 0.0279, 0.0078, -0.0305, -0.0185, -0.1147, 0.1555, 0.0881, -0.0036, -0.0398, 0.0006, 0.0103, 0.0675, -0.0645, 0.0071, -0.0325, -0.0153, -0.0521, 0.0192, -0.0057, -0.0037, -0.059, -0.0048, 0, 0.0526, 0.0096, -0.0267, 0.047, -0.0665, -0.0225, -0.109, -0.0405, 0.0554, -0.0675, -0.0063, 0.1126, 0.0656, 0.0083, 0.0614, 0.0578, -0.0299, -0.0091, 0.0195, 0.0106, 0.0067, -0.039, 0.0217, 0.0052, -0.0061, -0.0045, -0.0163, 0.0358, -0.0026, -0.0006, 0.0322, 0.0616, -0.0732, -0.0406, -0.039, 0.0649, -0.0701, 0.0413, -0.0201, -0.0041, 0.0139, -0.0126, 0.0765, 0.0079, -0.0322, -0.011, -0.0883, -0.0106, 0.0244, -0.0156, -0.0389, -0.0571, -0.0037, 0.0121, -0.0301, -0.0019, -0.0566, 0.009, 0.0335, -0.0047, 0.0725, -0.0475, -0.0341, 0.0088, -0.0566, 0.027, -0.0179, -0.007, 0.1118, -0.0255, 0.0306, 0.0217, -0.0035, -0.0824, 0.0262, 0.0054, 0.0283, -0.0406, -0.0377, -0.0123, 0.0558, 0.0107, -0.01, -0.1425, -0.0563, 0.04, -0.0746, 0.0642, -0.0059, -0.0492, -0.0828, 0.1474, -0.0299, -0.0061, -0.0002, 0, -0.0537, 0.0087, 0.0401, -0.1089, -0.0297, -0.026, 0.0838, -0.0033, -0.0497, -0.0301, 0.1204, 0.0361, 0.019, 0.0353, -0.0288, 0.0924, -0.069, 0.057, 0.0057, -0.0155, 0.0247, 0.0614, 0.0027, 0.0608, -0.0288, -0.0001, -0.0431, 0.0815, -0.0321, 0.02, 0.0756, 0.0668, -0.0019, 0.0294, -0.0396, 0.0974, 0.0157, -0.0559, -0.0453, -0.0098, 0.0195, -0.0948, 0.0097, -0.0321, -0.0574, 0.0502, 0.0604, -0.0505, 0.0501, 0.0631, 0.0034, -0.0048, -0.0097, 0.0534, 0.0265, -0.012, 0.0684, 0.0657, 0.0384, -0.0118, -0.0712, -0.0094, 0.0092, -0.0078] },
                { slug: 'releases', vector: [-0.0567, -0.0874, 0.077, 0.0328, 0.0891, -0.0616, -0.1093, -0.0353, 0.0934, 0.0072, 0.0466, 0.0509, -0.0529, -0.0011, 0.0046, 0.0246, -0.0335, -0.0333, 0.0373, 0.0571, 0.0179, 0.004, 0.0051, 0.0531, 0.0025, 0.019, -0.0655, 0.0137, 0.0642, -0.0694, -0.0005, 0.1984, -0.0119, -0.0499, -0.0042, 0.0486, 0.0746, 0.0435, -0.0009, -0.0372, 0.0084, 0.0502, 0.0517, 0.0035, -0.037, -0.0444, 0.0307, -0.0917, -0.0842, 0.0097, 0.0022, -0.0689, -0.0515, -0.0478, 0.0391, 0.0068, -0.019, 0.0787, -0.0043, -0.0238, -0.0582, 0.0603, -0.0668, -0.0314, 0.0444, -0.0433, 0.0482, -0.043, 0.0618, -0.0272, -0.0714, -0.0389, 0.09, -0.0771, -0.0825, 0.0186, 0.0546, 0.0005, 0.049, -0.0182, 0.02, 0.038, -0.0123, -0.0239, 0.0645, -0.0116, 0.0404, 0.0334, 0.077, -0.0354, 0.0001, -0.0286, 0.1006, 0.0876, 0.0164, 0.0473, -0.0394, 0.0409, 0.0288, 0.0777, 0.0337, 0.0266, 0.0328, -0.0016, 0.0383, -0.0073, -0.0115, 0.0354, -0.0064, 0.0069, 0.0252, 0.0559, 0.0114, -0.0892, 0.0133, -0.0702, -0.0039, -0.015, 0.0368, 0.0324, -0.0033, -0.0156, 0.0297, -0.0216, -0.0435, 0.0553, -0.0214, 0, 0.0677, -0.0141, -0.0197, 0.0597, 0.0437, -0.0086, 0.0666, -0.0679, -0.0034, -0.0656, 0.0438, 0.0498, -0.093, 0.0412, 0.0639, -0.1082, -0.0577, 0.0253, -0.0294, 0.0752, -0.0463, 0.0348, -0.0396, 0.0511, 0.1119, -0.0055, 0.0297, -0.0038, -0.0671, 0.0074, 0.0219, 0.0316, -0.0297, -0.018, -0.0327, -0.0099, -0.0782, -0.0978, -0.019, -0.1078, -0.0703, -0.0051, -0.0693, -0.0041, 0.0443, -0.0317, -0.0806, 0.0548, 0.06, -0.0786, 0.019, 0.0564, -0.0486, 0.0271, -0.0331, 0.0009, 0.0049, -0.0613, 0.0493, 0.0389, -0.0263, -0.0143, 0.018, 0.0257, -0.0032, 0.0865, -0.0416, -0.013, 0.038, 0.068, -0.0004, 0.0439, -0.1058, 0.0582, 0.0503, -0.0533, -0.0104, 0.0198, 0.066, 0.0553, 0.0267, 0.0734, -0.0283, 0.0096, 0.0173, -0.0099, -0.0139, 0.0274, 0.0337, 0.0635, 0.0391, -0.0758, 0.0394, 0.0116, -0.0173, 0, -0.0337, -0.0772, -0.0183, -0.0105, -0.1587, -0.1038, -0.1077, -0.0204, 0.0191, -0.049, -0.0197, 0.0352, -0.0461, 0.0372, -0.0463, -0.0281, -0.0334, -0.1209, 0.0668, -0.0156, 0.0877, 0.0621, -0.005, 0.0257, 0.0057, -0.0013, -0.0961, 0.0035, 0.0206, -0.0572, 0.0098, -0.0006, -0.0789, -0.0453, 0.0177, -0.0308, -0.0772, 0.0212, -0.0067, 0.045, -0.0428, 0.0266, 0.0115, 0.0056, 0.0078, 0.0182, -0.0065, 0.0229, 0.0822, -0.0613, -0.0154, 0.0189, 0.0398, -0.0704, -0.0241, -0.0426, 0.0036, -0.0154, -0.0403, 0.0367, 0.0044, 0.0095, 0.0271, -0.062, -0.0293, 0.072, -0.0485, -0.0259, 0.0091, 0.0421, -0.0416, -0.0714, -0.0863, -0.0739, 0.0476, -0.0512, -0.0257, -0.0222, -0.0039, -0.0795, -0.0621, 0.0335, 0.0143, 0.0253, -0.0305, -0.0075, 0.0178, -0.004, 0.0874, -0.0203, -0.0586, -0.0246, -0.0812, 0, -0.0487, 0, -0.0237, 0.0699, -0.0703, -0.0468, 0.0925, 0.0419, -0.0516, 0.0354, 0.0933, 0.0479, 0.0909, 0.0442, -0.0238, 0.0104, -0.0077, 0.0855, -0.0369, -0.0166, -0.02, -0.0919, -0.0193, 0.0198, 0.0257, 0.1017, -0.0262, -0.0285, 0.051, 0.1323, -0.0342, 0.0578, 0.0405, 0.0642, -0.0049, 0.0555, 0.0357, 0.0238, 0.0324, 0.0099, 0.066, 0.0746, 0.0031, -0.0187, 0.073, 0.0657, -0.0194, 0.0062, -0.0697, -0.0627, -0.0327, -0.0657, -0.0046, 0.0284, -0.0765, 0.0887, -0.015, -0.0048, 0.0003, -0.0261, 0.1089, -0.0343, 0.0428, -0.1486, 0.0687, -0.0043] },
                { slug: 'rendering', vector: [-0.1056, -0.017, 0.0423, 0.0914, 0.0841, -0.0638, -0.0229, -0.0189, 0.0846, 0.0235, -0.0246, -0.027, 0.0147, -0.0031, -0.0081, -0.0137, 0.0946, 0.0006, -0.0849, 0.0392, 0.0362, -0.1085, -0.0358, -0.0395, 0.0043, 0.0904, -0.0142, -0.0321, 0.0585, -0.0556, 0.0117, 0.147, -0.064, 0.011, -0.1062, 0.0515, 0.0293, -0.0081, -0.0541, -0.0072, -0.0362, 0.0685, -0.0283, -0.0683, 0.0487, -0.063, 0.0171, -0.08, -0.0864, -0.0461, -0.0718, 0.0043, -0.0168, 0.0229, -0.0349, 0.0383, 0.066, 0.0239, -0.0397, 0.0306, -0.046, -0.006, 0.0028, 0.0228, 0.0267, -0.0152, 0.0781, -0.1091, 0.0274, -0.0195, -0.0736, 0.0249, 0.0629, -0.0964, -0.0178, -0.0273, 0.0495, -0.0269, 0.0944, -0.0683, 0.042, 0.0654, -0.0516, 0.0061, 0.034, 0.0269, 0.0159, 0.0068, 0.0388, -0.0292, -0.006, 0.0172, 0.0096, 0.0961, -0.0186, 0.0596, 0.1006, 0.0375, 0.0007, 0.0493, 0.0497, 0.0344, 0.0459, 0.0266, -0.0253, -0.0778, 0.031, 0.0253, -0.0903, -0.0039, 0.0514, 0.0458, -0.0194, -0.0224, -0.0229, -0.0658, 0.0559, -0.049, 0.0751, 0.0299, 0.0258, -0.001, 0.0059, 0.0278, 0.07, -0.0651, 0.0081, 0, 0.0063, -0.0034, 0.0026, -0.0359, 0.1039, 0.0041, 0.0635, -0.019, -0.0024, -0.0211, 0.054, 0.0905, -0.0262, 0.0289, 0.0789, -0.0598, -0.0665, -0.0139, -0.0553, -0.0159, -0.0056, 0.0008, -0.0099, 0.0108, -0.0297, 0.0407, -0.0268, 0.0715, -0.123, 0.0072, 0.0502, 0.0308, 0.0003, 0.001, -0.0274, -0.024, -0.0227, -0.1102, -0.0076, -0.0843, -0.1065, 0.038, -0.0104, -0.0107, -0.0404, -0.0233, -0.037, 0.1049, -0.0188, -0.0047, -0.0021, 0.0748, -0.0251, -0.0806, -0.0257, 0.0056, 0.0293, 0.0026, 0.0583, 0.1322, -0.0892, -0.0567, -0.0622, 0.0673, -0.0688, 0.0532, -0.0407, -0.0495, -0.0113, 0.0237, 0.0133, 0.0861, 0.0393, -0.0237, 0.1075, -0.0469, 0.0038, -0.0814, -0.0289, 0.0327, -0.0114, 0.0654, -0.0495, 0.0137, 0.0159, -0.0956, 0.0136, 0.0083, -0.0299, -0.0148, 0.0447, -0.097, 0.0636, -0.0865, 0.0151, 0, -0.0168, -0.0087, 0.0157, 0.0645, -0.0235, -0.0525, -0.0561, -0.0022, 0.0028, -0.0903, -0.0811, 0.0775, -0.0276, 0.0595, -0.0817, 0.0883, 0.0261, -0.1352, 0.0098, -0.0457, 0.1043, 0.0996, -0.0197, 0.0058, -0.0301, 0.0164, -0.0019, 0.0009, -0.0132, -0.001, 0.0161, -0.0183, -0.068, -0.0666, 0.0261, -0.0038, -0.0049, 0.0115, -0.0321, 0.0204, -0.0348, -0.0424, -0.0047, 0.0195, -0.0003, 0.0271, -0.0681, 0.019, 0.0845, -0.0207, 0.0176, 0.032, -0.0228, 0.0216, -0.0165, -0.0645, -0.0865, 0.0022, 0.0854, -0.0529, -0.025, 0.0046, -0.0373, 0.0074, -0.032, 0.0595, -0.0539, -0.0511, 0.1468, -0.0236, -0.0535, -0.0585, -0.0219, -0.0704, 0.037, -0.0197, 0.0564, 0.0232, 0.015, 0.0363, -0.0162, 0.0195, 0.0178, -0.106, -0.0123, 0.0232, -0.0754, 0.0194, 0.0492, 0.0116, -0.0165, 0.0024, -0.0752, 0.0281, 0.0334, 0, -0.0454, -0.005, -0.0273, -0.0587, 0.0637, -0.0081, 0.079, 0.0476, -0.0141, 0.0489, 0.1725, 0.0347, 0.0294, 0.0182, 0.047, 0.1387, -0.0078, -0.0742, -0.0411, 0.0322, 0.0187, 0.0071, -0.0255, 0.0816, -0.0075, -0.0264, 0.0131, 0.035, 0.014, 0.0112, 0.0092, 0.0486, 0.0176, -0.0059, -0.0004, -0.0227, 0.0129, -0.0246, 0.039, 0.0714, -0.0125, -0.0315, 0.0323, 0.0168, 0.0402, 0.0198, -0.1367, -0.0004, 0.0326, -0.0144, -0.0314, -0.052, -0.1056, 0.0402, -0.0149, -0.0714, 0.0365, -0.0254, 0.0707, 0.0262, 0.0262, -0.0386, 0.0518, -0.0018] },
                { slug: 'rosetta', vector: [-0.0785, -0.0567, 0.0399, 0.084, 0.0082, 0.0329, 0.0247, 0.0434, 0.0639, 0.055, -0.0426, -0.0311, -0.018, 0.029, 0.0184, 0.083, 0.0632, -0.006, -0.0823, -0.0477, 0.104, -0.042, -0.0303, -0.0565, -0.0567, 0.0603, -0.0534, -0.0094, 0.0278, -0.0846, -0.0169, 0.1081, -0.0782, 0.0275, -0.1151, 0.0576, 0.0026, -0.0406, -0.0845, -0.0484, -0.0272, 0.0933, -0.0176, -0.0448, 0.0219, -0.008, 0.0557, -0.0674, -0.0667, -0.0123, -0.0227, -0.0015, 0.0185, 0.0418, 0.064, -0.0252, 0.0906, -0.022, -0.0445, -0.0374, -0.0663, -0.0315, 0.0594, -0.0031, 0.0179, 0.0036, 0.0832, 0.0014, 0.04, -0.0756, -0.0775, -0.0055, 0.0931, -0.0807, -0.0028, -0.0307, 0.0417, -0.0421, 0.0873, -0.0781, -0.0109, 0.0253, -0.0477, -0.0097, 0.0274, 0.0468, -0.016, -0.0465, 0.0887, 0.0397, -0.0601, -0.0815, 0.0072, 0.023, 0.0918, -0.015, 0.0098, 0.0478, -0.047, -0.0022, 0.0511, 0.0568, -0.0111, -0.0188, 0.0118, -0.0492, 0.0126, 0.0018, -0.0723, 0.0233, -0.0551, 0.0586, 0.0148, -0.0267, -0.0303, -0.0354, 0.098, -0.0045, 0.0957, 0.0176, 0.0161, -0.0154, -0.0166, -0.0197, -0.0037, -0.0352, -0.0085, 0, -0.0374, 0.0528, -0.0606, -0.0198, 0.0114, -0.0286, 0.0732, -0.0146, -0.0496, -0.0407, 0.0469, 0.0822, 0.0069, 0.0574, 0.0319, -0.0284, -0.0184, -0.0361, -0.0846, -0.0258, 0.0563, 0.0851, -0.0358, -0.0477, 0.0571, -0.021, -0.0602, 0.0942, -0.0925, -0.0542, 0.0754, 0.0341, 0.0045, -0.0216, 0.0401, -0.0758, 0.0381, -0.0613, -0.0339, -0.0853, 0.0312, -0.0126, -0.0508, -0.0011, -0.0029, -0.0854, -0.0604, 0.0822, 0.0142, -0.0082, 0.0415, 0.0463, -0.0114, -0.1202, -0.024, 0.0415, 0.0106, -0.0561, 0.043, 0.0961, -0.124, -0.0059, 0.0681, 0.0711, -0.0221, 0.0252, -0.0051, -0.0421, 0.0311, 0.0056, -0.0344, 0.038, -0.0064, -0.0521, 0.0606, -0.097, -0.0063, -0.0985, -0.0127, -0.0205, -0.0271, 0.0347, -0.0136, 0.0883, 0.0081, -0.0303, -0.0278, -0.064, -0.0401, -0.0073, 0.0155, -0.0719, 0.0485, -0.0319, -0.0283, 0, 0.0414, 0.0028, 0.0101, 0.0583, -0.0672, -0.0286, 0.0193, -0.0007, -0.0105, -0.1227, -0.0879, 0.0773, 0.0726, 0.0449, -0.0002, 0.0888, 0.0034, -0.0806, 0.0474, -0.0251, 0.0781, 0.1181, -0.0314, 0.0367, -0.0444, -0.0141, 0.0002, -0.0098, -0.0251, 0.0157, -0.0136, -0.0639, -0.0064, -0.0468, -0.0328, -0.0158, 0.028, -0.0453, -0.0417, 0.0545, -0.0482, 0.0273, -0.0597, 0.0144, -0.0986, 0.0623, -0.0347, 0.0595, 0.0076, 0.0184, 0.0245, -0.0507, -0.0964, -0.0312, -0.0176, -0.0574, -0.0489, -0.0625, 0.0426, -0.0241, -0.0295, -0.0486, 0.0164, 0.0126, 0.0221, 0.0397, -0.0624, -0.0678, 0.1407, -0.0506, -0.0062, 0.0248, -0.0012, -0.0453, 0.0812, -0.0598, 0.0698, -0.0156, -0.0018, -0.0203, -0.0759, -0.0112, 0.0103, -0.0349, -0.0389, 0.0354, -0.0622, 0.043, 0.0967, 0.0222, -0.0745, 0.028, -0.0597, 0.0384, -0.0454, 0, 0.0143, 0.0279, 0.0489, 0.0557, -0.0156, -0.0217, 0.0317, -0.0125, -0.0416, 0.0885, 0.052, 0.095, -0.0197, -0.0452, -0.0107, 0.1167, 0.0222, 0.002, -0.0413, 0.0628, 0.0502, 0.0163, -0.0512, 0.083, 0.0904, -0.0159, 0.0152, -0.0076, 0.0285, -0.0268, 0.0373, 0.0268, 0.0146, 0.0137, -0.0398, 0.0215, 0.0806, 0.0101, 0.0219, 0.1072, 0.0381, 0.0094, 0.0412, 0.0016, -0.068, 0.0486, -0.1262, -0.0438, 0.0494, 0.0086, 0.0004, -0.0091, -0.0725, 0.1174, 0.0178, -0.0459, 0.018, -0.0204, 0.1115, 0.0277, 0.0351, -0.0292, -0.0168, -0.0225] },
                { slug: 'routing', vector: [-0.0871, -0.045, 0.0339, 0.1045, -0.0022, -0.0327, -0.0099, -0.0528, 0.0524, -0.017, -0.0345, 0.0284, 0.044, -0.0014, -0.0265, 0.0887, 0.019, 0.0275, -0.0613, -0.0035, 0.0778, -0.0327, -0.0248, -0.044, -0.0792, 0.0245, 0.0041, -0.0408, 0.0116, -0.0837, 0.0898, 0.1038, -0.1762, -0.0327, -0.0936, 0.0226, 0.0387, -0.0217, 0.0036, -0.0247, 0.0031, 0.0891, 0.0016, -0.0406, -0.032, -0.0456, 0.017, -0.0146, -0.0499, -0.0471, -0.0724, -0.0456, -0.0348, -0.0047, 0.0381, 0.039, -0.0324, 0.0504, -0.0323, 0.0357, 0.0007, -0.0027, 0.0081, 0.0195, 0.0024, -0.0213, 0.0035, -0.038, 0.0065, -0.008, -0.0752, -0.0075, 0.069, -0.0385, -0.0132, -0.089, 0.0101, -0.0639, 0.0075, -0.0747, 0.0691, 0.0441, -0.0212, 0.0094, 0.1061, -0.0409, -0.0392, 0.0085, 0.0357, 0.0077, 0.0262, -0.0214, 0.0134, 0.0573, 0.0539, 0.0259, 0.0168, -0.0313, -0.0522, 0.0727, 0.0353, 0.0495, 0.1012, 0.031, 0.0304, -0.0454, 0.0035, 0.0624, -0.0836, 0.0746, -0.0205, 0.0524, -0.0209, 0.0099, -0.0478, -0.0708, 0.0891, -0.0234, 0.0272, -0.004, -0.0392, 0.0239, -0.0331, 0.0258, 0.0527, -0.062, 0.0079, 0, 0.078, 0.03, -0.0823, -0.0204, 0.0458, 0.0318, 0.0618, -0.0324, 0.0072, 0.0011, 0.0082, 0.0917, -0.0089, 0.0336, 0.0005, -0.0496, -0.0474, -0.0106, -0.0417, -0.0797, -0.0302, 0.0658, -0.0337, -0.0144, 0.0526, 0.0608, 0.0124, 0.0252, -0.1151, 0.0037, 0.0854, 0.0035, 0.0013, -0.0558, 0.0116, 0.0008, -0.0003, -0.0965, 0.0032, -0.0435, -0.1215, -0.0247, 0.0063, 0.0243, -0.0589, -0.014, -0.0803, 0.08, -0.059, 0.0083, -0.0445, 0.0044, -0.0086, -0.095, -0.069, -0.0361, -0.1236, 0.0188, 0.0509, 0.1192, -0.018, -0.0514, -0.0692, 0.0644, -0.1074, 0.0641, -0.0788, 0.0047, -0.0063, -0.0462, -0.0368, 0.0773, 0.0961, -0.0023, 0.0244, -0.0323, -0.0474, -0.1062, 0.0248, -0.004, 0.0431, -0.0069, 0.0057, 0.0644, 0.0624, -0.076, 0.0226, -0.0694, -0.0684, 0.022, 0.0193, -0.0462, 0.0535, -0.023, 0.0509, 0, 0.0759, -0.0333, -0.0092, 0.0494, -0.0412, 0.0041, -0.0049, -0.0081, -0.021, -0.1021, -0.1043, 0.1297, 0.0214, 0.0446, -0.0172, 0.0239, 0.0101, -0.0869, -0.0498, 0.0261, 0.0338, 0.1014, -0.0648, -0.0174, -0.0101, 0.0201, 0.0377, -0.0271, 0.023, 0.0574, 0.0486, -0.0688, -0.0249, -0.0134, 0.0019, 0.0877, -0.0547, 0.0391, -0.0371, 0.0424, 0.0237, -0.0226, 0.0082, 0.0211, -0.0291, 0.0817, -0.0381, 0.0235, -0.061, -0.0578, 0.0192, 0.0271, -0.0084, -0.0491, 0.0297, -0.0204, -0.0542, -0.0226, -0.0244, -0.032, 0.0003, -0.0058, -0.0564, 0.0192, -0.0144, 0.008, -0.0556, -0.0764, 0.1162, -0.0329, -0.0657, -0.0413, 0.0248, -0.0841, 0.1281, -0.0027, 0.0591, -0.0062, -0.0044, 0.0301, -0.0183, -0.0158, 0.0075, -0.1451, 0.0546, 0.0289, -0.0925, 0.0681, 0.0546, -0.0156, -0.019, 0.0177, -0.0079, 0.0173, 0.016, 0, -0.0339, 0.0677, 0.037, -0.0217, -0.0315, 0.0204, 0.0986, 0.054, -0.0176, 0.0543, 0.1218, 0.0903, -0.0372, 0.0235, -0.0339, 0.0918, 0.0331, -0.0679, -0.0155, 0.048, -0.034, -0.03, -0.0537, 0.1684, 0.0357, -0.0017, -0.029, 0.0564, 0.0031, 0.0456, 0.0374, 0.0173, -0.0225, 0.0514, -0.0571, 0.0509, -0.0089, -0.022, 0.0184, 0.0488, 0.0313, -0.0658, 0.0617, 0.0067, 0.0246, 0.0519, -0.0371, 0.0185, 0.0632, -0.027, -0.0547, -0.066, -0.0359, 0.017, 0.0498, 0.0023, 0.0015, -0.0425, 0.0621, 0.0527, 0.0254, -0.0218, -0.0696, -0.0019] },
                { slug: 'showcase', vector: [-0.1307, -0.0687, -0.03, 0.0676, 0.0298, -0.0782, -0.0027, -0.0161, 0.0328, -0.0157, -0.009, -0.0064, 0.024, 0.008, 0.043, 0.037, 0.0557, -0.0189, 0.0185, -0.0029, 0.0441, -0.0292, 0.0461, -0.0005, 0.0047, -0.0072, -0.034, 0.0521, 0.0645, -0.0698, 0.0575, 0.0936, -0.0351, -0.0345, -0.0192, 0.1069, 0.0463, -0.0302, -0.0545, -0.0618, -0.0211, 0.0491, -0.058, -0.0276, -0.0479, -0.1222, -0.0607, -0.0574, -0.0451, -0.0191, -0.0804, -0.119, -0.0397, -0.0171, -0.0125, -0.0173, -0.0372, 0.07, -0.0127, -0.0019, -0.0354, 0.032, -0.0038, 0.0559, 0.0134, 0.0099, -0.0472, 0.0133, 0.0581, -0.099, -0.1341, -0.0515, 0.0552, -0.0088, -0.0409, -0.0816, 0.0563, -0.0613, -0.0405, -0.0825, 0.0317, 0.0113, -0.0205, 0.0507, 0.0641, 0.0243, 0.0336, 0.0501, 0.0919, -0.0009, -0.0434, 0.0289, -0.0098, 0.0367, 0.0357, 0.0377, 0.074, -0.0054, -0.0303, 0.1018, -0.0068, -0.0352, 0.088, -0.0288, 0.016, -0.0305, 0.0286, 0.0765, -0.0067, 0.0021, -0.0417, 0.07, -0.0306, -0.0711, 0.0111, -0.0245, 0.0226, 0.0022, 0.0902, 0.0544, 0.1114, 0.0644, -0.0226, -0.0432, 0.0953, -0.0023, 0.029, 0, 0.1103, -0.0031, -0.0491, 0.0759, 0.108, -0.0249, 0.0668, 0.0158, -0.1156, -0.0028, 0.0861, 0.0995, -0.0584, 0.0285, 0.0912, -0.0126, -0.0867, 0.0018, 0.0171, -0.0025, -0.03, 0.0219, -0.0401, 0.0311, 0.0297, 0.0908, -0.0127, 0.0458, -0.0714, 0.0221, 0.0697, -0.0656, -0.0534, -0.0327, -0.028, 0.0108, -0.0485, -0.1341, 0.0334, -0.0324, -0.0772, -0.0649, -0.0702, 0.001, -0.1132, -0.0616, -0.0476, 0.0553, 0.0291, 0.0263, 0.0053, 0.0437, -0.0323, 0.0359, -0.0562, -0.0135, -0.0292, -0.0243, 0.0767, 0.0442, 0.0064, -0.028, -0.0324, 0.0357, -0.0057, -0.0427, 0.0205, -0.0293, 0.0875, 0.0064, -0.0468, 0.032, 0.0299, 0.0204, -0.0248, -0.0903, -0.0058, -0.0728, 0.0374, 0.0739, 0.0479, -0.0156, -0.0595, -0.0209, -0.0012, 0.018, 0.0322, -0.0371, -0.0321, -0.0766, -0.0407, -0.0426, 0.047, -0.0395, -0.0238, 0, 0.0286, -0.0806, -0.0125, 0.0548, -0.0317, -0.0376, -0.0521, -0.0346, -0.0157, -0.029, -0.0248, 0.0543, -0.0051, 0.0555, 0.0144, 0.0426, -0.073, -0.1396, 0.0295, 0.0002, -0.0041, 0.1062, -0.0305, 0.0203, -0.0339, 0.005, -0.0487, 0.0171, 0.0101, 0.0429, 0.049, -0.0367, -0.062, -0.1124, 0.0328, 0.0147, 0.0076, 0.033, -0.0326, 0.0143, 0.0534, -0.0445, -0.0184, -0.0133, -0.0421, 0.0845, -0.0603, 0.0124, 0.0232, -0.0512, 0.043, 0.0057, -0.009, -0.1235, 0.0003, -0.0433, -0.0713, -0.0343, -0.0492, 0.0209, 0.0655, -0.0348, -0.0478, -0.0119, -0.0103, 0.0657, -0.1117, -0.0002, 0.0051, -0.0332, -0.095, 0.0123, 0.0066, -0.0867, 0.0143, 0.0303, 0.0613, 0.0184, 0.039, -0.0287, 0.0037, 0.0424, 0.0469, -0.1059, -0.0217, 0.0035, -0.1059, 0.0875, 0.0401, -0.0421, -0.0257, 0.0991, 0.0279, 0.1062, 0.0263, 0, -0.0585, 0.0801, -0.006, -0.012, -0.0406, 0.0771, 0.0853, -0.0102, 0.0552, 0.0448, 0.0505, -0.0019, -0.0035, 0.0651, -0.008, 0.1, -0.029, 0.0455, -0.0324, -0.0243, 0.0466, 0.0223, -0.0129, 0.0588, 0.0229, 0.0446, -0.0308, 0.0696, -0.0306, 0.0225, 0.0003, 0.0219, 0.0233, 0.0218, 0.0452, 0.0403, -0.0683, -0.0217, -0.0346, 0.1038, 0.0429, -0.0373, 0.0418, -0.0053, -0.0241, 0.0406, -0.0791, -0.0935, 0.0425, -0.0116, -0.0238, -0.0589, -0.0415, 0.0295, 0.0236, 0.0755, 0.0307, 0.0088, 0.0549, 0.0214, -0.0115, -0.0084, 0.0174, 0.0479] },
                { slug: 'state', vector: [-0.1113, -0.0085, -0.0239, 0.0995, -0.0478, -0.0403, 0.0103, -0.0116, 0.0978, 0.0587, -0.0198, -0.024, 0.0696, -0.0563, -0.0238, 0.0661, 0.0762, -0.0562, -0.0952, -0.019, 0.073, -0.0575, -0.0122, -0.0125, -0.0494, 0.0265, -0.0392, -0.0379, 0.0345, -0.0616, 0.0021, 0.1267, -0.058, 0.0227, -0.0902, 0.0693, 0.0582, -0.0095, -0.0335, -0.0175, 0.015, 0.0402, -0.0034, -0.0305, 0.0366, -0.0241, 0.0491, -0.06, -0.1221, -0.0748, -0.0514, 0.0368, -0.0062, 0.0761, 0.0565, -0.0003, 0.0976, 0.0874, -0.0585, -0.0237, -0.0586, -0.0005, -0.0591, 0.0305, 0.0168, 0.0144, 0.0233, -0.0268, 0.0336, -0.0654, -0.0454, -0.0287, 0.0749, -0.0634, 0.0003, -0.0324, 0.029, -0.0094, 0.0457, -0.0561, -0.0183, 0.0582, 0.0291, -0.0389, 0.0442, -0.0266, 0.0278, 0.0024, 0.0954, 0.0047, -0.0097, 0.011, 0.0055, 0.084, 0.0208, 0.049, 0.0863, 0.0178, -0.0214, 0.0478, 0.0605, 0.0729, -0.0255, 0.0377, 0.0145, -0.0484, -0.0396, -0.0069, -0.0896, 0.0121, 0.0153, 0.0466, 0.005, 0.0163, 0.0051, -0.029, 0.0703, -0.0072, 0.0466, 0.0082, 0.0316, -0.0433, -0.0066, -0.0119, 0.0217, -0.0071, -0.0246, 0, -0.0158, -0.0335, -0.0571, -0.0179, 0.0326, -0.0235, 0.088, -0.0328, 0.0027, -0.0565, 0.0735, 0.0827, 0.0001, 0.0689, -0.0009, -0.031, -0.0121, -0.0902, -0.022, -0.0185, 0.0159, 0.0825, -0.0133, -0.0169, 0.0084, 0.03, 0.0053, 0.0202, -0.0876, 0.0038, 0.0918, 0.0212, -0.0096, -0.0434, 0.008, -0.0501, -0.0314, -0.0717, 0.0175, -0.1334, -0.0636, -0.0025, -0.0192, 0.0244, -0.0271, -0.0809, -0.0582, 0.0423, 0.0107, 0.009, 0.0457, 0.0387, 0.0013, -0.1014, -0.0221, 0.0057, -0.0217, -0.0143, 0.0043, 0.1521, -0.1183, -0.0314, -0.0121, 0.0708, -0.0343, 0.0321, -0.1057, -0.0549, 0.0541, 0.0481, -0.0022, 0.0733, 0.0337, 0.0161, 0.0619, -0.0756, 0.0406, -0.0855, -0.0431, 0.0035, 0.0541, 0.069, -0.043, 0.0706, -0.055, -0.0267, -0.0158, -0.03, -0.0697, 0.0325, 0.0595, -0.0908, 0.099, -0.0365, -0.0467, 0, 0.0156, -0.0368, -0.068, 0.0682, -0.0061, -0.0332, -0.0385, 0.0148, 0.0126, -0.1075, -0.0762, 0.0825, -0.0198, 0.1323, 0.019, -0.0059, 0.01, -0.114, -0.0193, 0.0088, 0.0501, 0.0924, -0.0184, 0.0198, -0.027, 0.0257, -0.0651, 0.0257, 0.0368, 0.0022, 0.01, -0.0379, -0.0902, -0.0124, -0.0034, -0.0343, 0.0108, 0.0078, -0.0681, -0.0101, 0.0125, -0.0079, -0.0261, 0.0286, 0.0239, 0.0232, -0.0486, 0.0397, -0.0064, -0.0455, 0.0154, -0.0219, -0.0019, 0.0102, 0.0074, -0.0292, 0.0231, -0.0595, 0.07, -0.0469, -0.0365, -0.0589, 0.033, -0.005, -0.019, 0.0691, 0.0049, -0.1053, 0.1342, -0.0088, 0.052, -0.0114, -0.0627, -0.1146, 0.0798, 0.0127, -0.0309, -0.0745, -0.0531, 0.028, -0.0865, -0.0113, 0.0016, -0.0723, -0.0312, -0.0155, -0.0354, 0.0043, 0.0791, -0.0112, -0.0185, 0.0538, -0.0825, 0.0127, -0.0105, 0, 0.0274, -0.024, 0.0454, 0.0624, 0.075, -0.0077, 0.0334, -0.057, -0.0041, 0.009, 0.1241, 0.0421, 0.0233, -0.0496, -0.011, 0.0979, 0.0333, -0.0918, -0.0594, 0.0073, -0.0025, -0.0349, -0.0538, 0.089, 0.0247, -0.0221, 0.0459, 0.0846, -0.0142, 0.0218, 0.0588, 0.0129, 0.0827, 0.0312, -0.0004, 0.0184, 0.1026, -0.0173, 0.0613, 0.0852, 0.0126, -0.0037, 0.0478, 0.0654, -0.0269, 0.003, -0.1129, -0.0538, 0.0491, -0.0343, -0.0241, -0.0403, -0.1075, 0.0773, -0.0145, -0.021, 0.0197, -0.0643, 0.0803, 0.0504, 0.0174, -0.0332, -0.0099, -0.0409] },
                { slug: 'team', vector: [-0.0946, -0.0734, 0.0338, 0.05, 0.0308, -0.0907, -0.0442, 0.0113, 0.0449, -0.0103, -0.0044, -0.033, -0.009, 0.0135, 0.0136, 0.0388, 0.0081, -0.0296, 0.0176, -0.0764, 0.0151, -0.0496, -0.0162, 0.0252, -0.0479, -0.014, -0.0422, 0.0494, 0.0855, -0.0967, 0.0318, 0.1307, 0.0584, -0.0628, 0.0414, 0.1877, 0.0878, -0.0294, -0.0337, -0.0453, 0.0053, 0.0016, 0.0138, -0.0114, -0.0572, -0.0643, 0.0211, -0.0859, -0.0171, -0.0222, 0.0259, -0.1524, -0.0174, -0.0289, 0.0218, 0.0033, -0.023, 0.0366, 0.0448, -0.0661, -0.0065, 0.0531, -0.0657, 0.0567, 0.0421, -0.0475, 0.0223, 0.0732, 0.0238, -0.1051, 0.0111, -0.1025, 0.0727, -0.0097, -0.0541, -0.0032, 0.0125, -0.0029, 0.0853, -0.0099, 0.0468, 0.0708, -0.0049, 0.0813, -0.0237, 0.0547, 0.0526, 0.0621, 0.0792, -0.0259, -0.024, 0.0362, 0.0252, 0.0166, -0.0509, 0.0513, 0.0379, -0.0307, -0.0139, 0.1203, -0.0221, 0.0079, 0.0754, -0.0224, 0.0151, 0.0011, -0.027, 0.0924, 0.0436, 0.06, -0.0272, 0.0718, -0.0045, -0.0262, 0.0538, -0.0679, 0.0101, -0.0005, 0.0587, -0.0073, -0.0115, 0.0388, -0.005, -0.0627, 0.0695, 0.0674, -0.0691, 0, 0.1154, 0.0369, -0.0015, 0.0905, 0.0402, -0.0573, 0.081, 0.0137, -0.1631, -0.0423, 0.0836, 0.0385, -0.0272, 0.0526, 0.0101, -0.1356, -0.0806, -0.0303, -0.0256, 0.0378, -0.1293, 0.0014, -0.0033, 0.0757, 0.0615, 0.0295, 0.0153, -0.0301, 0.0365, 0.0428, 0.0297, 0.0332, -0.0546, -0.0128, -0.0413, 0.0094, -0.0696, -0.0778, 0.0004, -0.0494, -0.0395, 0.0107, -0.1181, -0.0674, 0.0251, -0.0371, 0.0017, -0.0098, 0.1019, -0.0439, 0.004, -0.0127, -0.0576, 0.0452, -0.0155, 0.005, -0.0137, -0.0427, 0.0499, 0.0507, -0.0347, 0.0628, -0.0863, 0.0678, 0.0196, 0.0097, -0.0418, -0.0206, 0.0957, 0.0075, 0.0057, 0.0196, 0.0028, 0.0396, -0.0452, -0.0511, -0.0023, -0.0153, 0.0146, 0.0907, 0.0041, 0.0284, 0.0088, -0.0179, -0.0075, 0.0064, 0.0036, 0.0125, -0.0464, 0.0657, -0.0199, -0.0812, 0.0169, 0.0178, -0.0749, 0, -0.001, -0.0713, 0.0212, 0.0178, -0.0445, -0.0448, -0.0611, -0.0552, 0.0484, 0.063, -0.0322, 0.0453, 0.0227, 0.0783, -0.0447, -0.0405, 0.0198, -0.1001, 0.0444, 0.0138, 0.0495, 0.0255, 0.0055, 0.0504, 0.0426, 0.0179, -0.0559, -0.0287, -0.0384, 0.006, -0.0006, -0.0569, -0.0718, -0.0895, -0.012, -0.0226, -0.1122, 0.0574, 0.0007, -0.0552, -0.0149, -0.0299, -0.0206, -0.0864, -0.0233, 0.0337, -0.0408, 0.0099, -0.01, -0.0613, -0.048, 0.0336, 0.0118, -0.1112, -0.033, -0.0315, 0.0656, -0.0039, 0.026, 0.0305, 0.0485, -0.0129, -0.0082, 0.0743, -0.0396, 0.0538, -0.0141, -0.0145, -0.0239, -0.0104, -0.0644, 0.0177, -0.0245, -0.0898, 0.0216, -0.0074, -0.0653, -0.0451, -0.0095, -0.0527, -0.0031, 0.04, 0.0029, 0.0168, 0.0206, -0.0304, -0.0065, 0.0178, 0.061, 0.0496, -0.1019, 0.0558, -0.0077, 0.0326, 0.0249, 0, -0.0236, 0.0482, -0.0041, -0.0354, 0.0005, 0.0394, -0.0061, -0.0028, 0.122, 0.1372, 0.0648, 0.0146, -0.0486, 0.0649, -0.0284, 0.0871, -0.0315, 0.0324, -0.0386, -0.1141, 0.0482, 0.0182, 0.0447, 0.0473, 0.0106, -0.0573, -0.0045, 0.0672, -0.0815, -0.0419, -0.0284, 0.0897, -0.049, 0.0393, 0.0543, 0.0236, -0.016, 0.0113, 0.0034, 0.0493, -0.0221, 0.0542, 0.0689, -0.0057, -0.0356, 0.0649, -0.0769, -0.0508, -0.0213, -0.068, 0.0355, -0.0507, -0.0584, 0.0566, -0.0198, 0.0511, 0.0211, -0.0244, 0.0516, -0.0463, -0.0131, -0.0102, 0.0406, -0.0028] },
                { slug: 'views', vector: [-0.1007, -0.0363, 0.0194, 0.1327, 0.0115, 0.0162, 0.0265, -0.0032, 0.0755, 0.0089, -0.0809, 0.0358, -0.049, 0.0505, 0.0276, 0.0668, 0.0136, -0.0688, -0.0478, 0.0843, 0.0539, -0.0268, -0.0083, -0.018, -0.0266, 0.0782, 0.0412, -0.1079, 0.0093, -0.044, -0.0017, 0.0881, 0.0084, 0.0281, -0.1457, 0.0348, 0.0172, 0.0143, 0.0004, -0.0361, -0.0195, 0.1302, -0.0359, -0.1032, 0.0429, -0.0369, -0.0449, -0.0626, -0.1094, -0.0374, -0.1034, 0.0075, -0.0267, 0.0103, 0.0464, 0.0064, -0.0234, 0.0031, -0.0101, -0.0061, 0.0412, -0.0028, 0.0023, 0.0528, 0.0318, 0.045, 0.006, 0.0047, 0.0222, -0.0421, -0.0474, 0.0139, 0.0618, -0.0146, -0.0162, -0.058, 0.068, -0.0419, 0.045, -0.069, 0.0009, 0.0493, -0.0196, 0.0325, 0.0529, 0.0643, 0.0259, -0.0332, -0.0194, -0.0508, 0.0061, -0.0073, 0.0784, 0.0857, 0.0184, 0.0264, -0.0131, 0.033, -0.082, 0.0053, 0.0444, 0.0306, 0.0062, 0.025, -0.049, -0.0507, -0.0023, -0.0575, -0.0432, 0.0165, 0.0429, 0.0463, -0.0905, 0.0019, -0.0718, -0.0169, 0.0314, 0.0098, 0.0315, 0.1171, 0.0042, -0.0185, -0.03, -0.0086, 0.0776, -0.0547, 0.0751, 0, -0.018, 0.0123, -0.0754, 0.0222, 0.1372, -0.0353, 0.0086, -0.0324, -0.0304, 0.0819, 0.1124, 0.0845, 0.0064, 0.0289, 0.0209, -0.0269, -0.0469, 0.0168, -0.0168, 0.0012, -0.0074, 0.0721, -0.0452, 0.0254, 0.0096, 0.0516, -0.017, 0.0641, -0.1313, -0.021, 0.0594, -0.0236, 0.037, -0.0147, -0.0189, -0.0084, 0.0286, -0.0684, -0.0171, -0.0199, -0.0555, 0.0024, -0.0766, 0.0231, -0.0688, -0.0331, 0.0048, 0.0818, -0.0393, 0.0107, -0.0218, 0.0254, 0.0445, -0.0377, -0.0015, 0.0175, -0.0391, 0.0325, 0.0954, 0.0033, -0.0225, -0.0502, -0.0231, -0.006, -0.0245, 0.0418, 0.0681, -0.0455, 0.014, -0.0546, -0.0384, 0.0169, -0.0403, 0.0256, 0.0773, -0.0752, -0.0706, -0.0173, 0.0256, 0.0913, -0.0647, 0.0271, 0.0195, 0.0775, 0.0338, -0.064, 0.0543, -0.0136, 0.0132, -0.044, 0.0145, -0.1177, 0.0558, -0.1002, 0.0942, 0, 0.0362, -0.0316, -0.0787, -0.0265, -0.0815, -0.0899, -0.0154, 0.0792, 0.0255, -0.1266, 0.0293, 0.0856, -0.0072, 0.0344, -0.0105, 0.0553, 0.0019, -0.0586, -0.0284, -0.0607, 0.1015, 0.0326, -0.047, 0.0529, -0.0014, 0.1133, 0.016, 0.0361, 0.0583, -0.0012, 0.0092, -0.0182, -0.0416, -0.0538, -0.1092, -0.0238, -0.0186, 0.0293, -0.0227, 0.0205, -0.0598, 0.0057, 0.0503, 0.0407, -0.0613, -0.025, 0.0305, 0.0591, -0.0142, -0.055, -0.0363, -0.0678, -0.0176, -0.0119, -0.0613, -0.0216, 0.0124, -0.0673, 0.0142, -0.0245, 0.0742, -0.0261, -0.0182, 0.0046, -0.0658, 0.0289, -0.1016, -0.082, 0.1671, -0.0625, -0.0708, -0.0178, -0.0136, -0.0108, 0.027, 0.0286, 0.1252, 0.0099, 0.0838, -0.0551, -0.0077, -0.0296, 0.0317, -0.0625, 0.0264, -0.0015, -0.099, -0.0173, 0.083, -0.0471, -0.0924, 0.0186, 0.0015, 0.0209, -0.072, 0, -0.0868, 0.0299, -0.0062, -0.0069, -0.0496, 0.0106, 0.0443, -0.0121, -0.0464, -0.0351, 0.0222, 0.0789, -0.0219, -0.0373, 0.0216, 0.0408, 0.0153, -0.0268, -0.0626, 0.0511, 0.018, -0.0543, 0.0156, 0.049, 0.0471, 0.0273, 0.0198, 0.0022, 0.0414, 0.0456, 0.0437, 0.0531, 0.0509, 0.0709, 0.0101, 0.0124, 0.0502, -0.0114, 0.0639, 0.0864, 0.0428, -0.0776, 0.0035, 0.0296, -0.0532, 0.0095, -0.0628, -0.004, 0.0828, -0.0079, -0.0218, -0.0053, -0.1562, 0.0578, -0.0307, 0.0128, 0.0305, 0.0217, 0.0275, -0.0309, -0.0054, -0.0068, -0.0083, -0.0372] },
            ];
        }
    }
    $.$bog_smalljs_embeddings = $bog_smalljs_embeddings;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const Content = $bog_smalljs_content;
        // In-browser embedder, same model as the build-time index. Loaded lazily
        // via $mol_import.module so the ~30MB model is only fetched on first use.
        const SEMANTIC_CDN = 'https://esm.sh/@xenova/transformers@2.17.2';
        class $bog_smalljs_search extends $.$bog_smalljs_search {
            close() { this.open(false); return null; }
            // Focus the input. Called from an action (never from a @$mol_mem —
            // focused() is a reactive setter, and writing another cell inside a
            // mem freezes this component's rendering). $mol defers the actual
            // DOM .focus() a tick, so it lands after the overlay is shown.
            focus() {
                this.Field().focused(true);
                return null;
            }
            // Navigate to a doc page. Explicit arg writes (not the link's own
            // href) so a result ALWAYS lands on its page — even when it targets
            // the page you are already on. $mol_link would otherwise treat a
            // "current" link as a toggle and strip the args, bouncing you home.
            go(slug) {
                const arg = this.$.$mol_state_arg;
                arg.value('section', 'docs');
                arg.value('page', slug);
                this.open(false);
                return null;
            }
            pick(slug, event) {
                event?.preventDefault(); // stop $mol_link's toggle navigation
                this.go(slug);
                return null;
            }
            // Enter activates the highlighted result (or the first one).
            activate(event) {
                const ids = this.result_ids();
                if (!ids.length)
                    return null;
                this.go(ids[this.active()]);
                return null;
            }
            // --- Highlighted result (keyboard ↑/↓) ---------------------------
            // Keyed by the current result set so a new query resets to the top,
            // while stays reactive so the highlight re-renders on every move.
            active_at(_key, next) {
                return next ?? 0;
            }
            active(next) {
                return this.active_at(this.result_ids().join('|'), next);
            }
            select_next(event) {
                event?.preventDefault();
                const n = this.result_ids().length;
                if (!n)
                    return null;
                this.active(Math.min(n - 1, this.active() + 1));
                return null;
            }
            select_prev(event) {
                event?.preventDefault();
                const n = this.result_ids().length;
                if (!n)
                    return null;
                this.active(Math.max(0, this.active() - 1));
                return null;
            }
            result_current(slug) {
                const ids = this.result_ids();
                return ids[this.active()] === slug;
            }
            // All doc pages as a flat search corpus.
            corpus() {
                const seen = new Set();
                const docs = [];
                for (const section of Content.sections()) {
                    for (const group of section.groups) {
                        for (const slug of group.pages) {
                            if (seen.has(slug))
                                continue;
                            seen.add(slug);
                            const page = Content.page(slug);
                            if (page)
                                docs.push({ slug, title: page.title, text: page.md });
                        }
                    }
                }
                return docs;
            }
            // --- Full-text (instant, offline) --------------------------------
            // Raw keyword score for every page, keyed by slug. Works with zero
            // network and is what shows the moment you type.
            full_text_scores() {
                const scores = new Map();
                const query = this.query().trim().toLowerCase();
                if (!query)
                    return scores;
                const terms = query.split(/\s+/).filter(Boolean);
                for (const doc of this.corpus()) {
                    const title = doc.title.toLowerCase();
                    const text = doc.text.toLowerCase();
                    let score = 0;
                    for (const term of terms) {
                        if (title.includes(term))
                            score += 10;
                        let idx = text.indexOf(term), count = 0;
                        while (idx >= 0) {
                            count++;
                            idx = text.indexOf(term, idx + term.length);
                        }
                        score += count;
                    }
                    if (score > 0)
                        scores.set(doc.slug, score);
                }
                return scores;
            }
            // --- Semantic (lazy, in-browser) ---------------------------------
            // The embedder is loaded from a CDN on demand and suspends until ready.
            // Reads of these suspend; callers catch the suspense so full-text keeps
            // showing, and re-render once the model resolves. If anything fails,
            // full-text remains the result — semantics are strictly additive.
            extractor() {
                const mod = this.$.$mol_import.module(SEMANTIC_CDN);
                // Fetch weights from the HF hub, not from this dev server's /models/
                // (which returns a non-JSON error page). Cache in the browser.
                mod.env.allowLocalModels = false;
                mod.env.useBrowserCache = true;
                return $mol_wire_sync(this).build_pipeline(mod);
            }
            build_pipeline(mod) {
                return mod.pipeline('feature-extraction', $bog_smalljs_embeddings.model());
            }
            // Embed the current query into a normalized vector (suspends while the
            // model loads / infers).
            query_vector() {
                const query = this.query().trim();
                if (!query)
                    return [];
                const pipe = this.extractor();
                const out = $mol_wire_sync(this).run_embed(pipe, query);
                return Array.from(out.data);
            }
            run_embed(pipe, query) {
                return pipe(query, { pooling: 'mean', normalize: true });
            }
            // Cosine similarity per page. Empty until the query vector is ready.
            semantic_scores() {
                const scores = new Map();
                let vec = [];
                try {
                    vec = this.query_vector();
                }
                catch (error) {
                    if (error instanceof Promise)
                        return scores;
                    throw error;
                }
                if (!vec.length)
                    return scores;
                for (const row of $bog_smalljs_embeddings.index()) {
                    let dot = 0;
                    const v = row.vector;
                    for (let i = 0; i < vec.length; i++)
                        dot += vec[i] * v[i]; // both L2-normalized → dot = cosine
                    scores.set(row.slug, dot);
                }
                return scores;
            }
            // 'idle' | 'loading' | 'ready' | 'error' — drives the hint.
            model_status() {
                if (!this.query().trim())
                    return 'idle';
                try {
                    this.query_vector();
                    return 'ready';
                }
                catch (error) {
                    return error instanceof Promise ? 'loading' : 'error';
                }
            }
            // --- Merge -------------------------------------------------------
            ranked() {
                const ft = this.full_text_scores();
                const sem = this.semantic_scores();
                if (sem.size === 0) {
                    // Full-text only (semantics not ready / unavailable).
                    return [...ft.entries()]
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 8)
                        .map(([slug, score]) => ({ slug, score }));
                }
                // Blend: normalize full-text to 0..1, add cosine. Keyword hits stay
                // strong; semantic surfaces relevant pages with no literal match.
                const ft_max = Math.max(1, ...ft.values());
                const slugs = new Set([...ft.keys(), ...sem.keys()]);
                const rows = [];
                for (const slug of slugs) {
                    const f = (ft.get(slug) ?? 0) / ft_max;
                    const s = Math.max(0, sem.get(slug) ?? 0);
                    const score = f * 0.6 + s * 0.9;
                    if (score > 0.15)
                        rows.push({ slug, score });
                }
                return rows.sort((a, b) => b.score - a.score).slice(0, 8);
            }
            hint_text() {
                const query = this.query().trim();
                if (!query)
                    return 'Type to search the documentation.';
                const n = this.ranked().length;
                const status = this.model_status();
                const tail = status === 'loading' ? ' · loading semantic…' : status === 'ready' ? ' · semantic' : '';
                return n ? `${n} result${n > 1 ? 's' : ''} — ↑↓ to move, Enter to open${tail}` : 'No matches.';
            }
            result_ids() {
                return this.ranked().map(row => row.slug);
            }
            result_rows() {
                return this.result_ids().map(slug => this.Result(slug));
            }
            result_arg(slug) {
                return { section: 'docs', page: slug };
            }
            result_title(slug) {
                return Content.page(slug)?.title ?? slug;
            }
            result_snippet(slug) {
                const md = (Content.page(slug)?.md ?? '')
                    .replace(/```[\s\S]*?```/g, ' ')
                    .replace(/[#`*>]/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();
                const term = this.query().trim().toLowerCase().split(/\s+/)[0] ?? '';
                const at = md.toLowerCase().indexOf(term);
                if (at < 0)
                    return md.slice(0, 130) + '…';
                const start = Math.max(0, at - 40);
                return (start > 0 ? '…' : '') + md.slice(start, start + 150).trim() + '…';
            }
        }
        __decorate([
            $mol_action
        ], $bog_smalljs_search.prototype, "close", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_search.prototype, "focus", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_search.prototype, "go", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_search.prototype, "pick", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_search.prototype, "activate", null);
        __decorate([
            $mol_mem_key
        ], $bog_smalljs_search.prototype, "active_at", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_search.prototype, "select_next", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_search.prototype, "select_prev", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_search.prototype, "full_text_scores", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_search.prototype, "extractor", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_search.prototype, "query_vector", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_search.prototype, "ranked", null);
        $$.$bog_smalljs_search = $bog_smalljs_search;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    $mol_style_define($bog_smalljs_search, {
        display: 'none',
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1000,
        justify: { content: 'center' },
        align: { items: 'flex-start' },
        '@': {
            bog_smalljs_search_open: {
                true: { display: 'flex' },
            },
        },
        Backdrop: {
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: { color: '#00000099' },
        },
        Panel: {
            position: 'relative',
            flex: { direction: 'column' },
            margin: { top: rem(5.5) },
            width: rem(40),
            maxWidth: '92vw',
            maxHeight: '70vh',
            overflow: { y: 'auto' },
            background: { color: $bog_builderui_tokens.card },
            border: { radius: rem(0.75), width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            boxShadow: '0 12px 48px -12px #00000080',
        },
        Field: {
            flex: { shrink: 0 },
            padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.875), right: rem(0.875) },
            font: { size: rem(1.0625) },
            background: { color: $bog_builderui_tokens.card },
            border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
            // round top corners so the field follows the panel's rounding (its square
            // corners were filling the panel's rounded top and making it look square)
            borderTopLeftRadius: rem(0.75),
            borderTopRightRadius: rem(0.75),
            color: $bog_builderui_tokens.text,
        },
        Hint: {
            flex: { shrink: 0 },
            padding: { top: rem(0.375), bottom: rem(0.375), left: rem(0.875), right: rem(0.875) },
            font: { size: rem(0.75) },
            color: $bog_builderui_tokens.shade,
            background: { color: $bog_builderui_tokens.back },
            border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
        },
        Results: {
            flex: { direction: 'column' },
            padding: rem(0.375),
        },
        Result: {
            flex: { direction: 'column' },
            align: { items: 'flex-start' },
            gap: rem(0.125),
            padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.625), right: rem(0.625) },
            border: { radius: rem(0.5) },
            ':hover': { background: { color: $bog_builderui_tokens.hover } },
        },
        Result_title: {
            font: { size: rem(0.9375), weight: 600 },
            color: $bog_builderui_tokens.text,
        },
        Result_snippet: {
            font: { size: rem(0.8125) },
            color: $bog_builderui_tokens.shade,
        },
    });
    // Keyboard-highlighted result row. Raw CSS because the custom attribute
    // isn't part of $mol_link's typed attrs, so $mol_style_define rejects it.
    $mol_style_attach('bog/smalljs/search/search.view.css', `
		[bog_smalljs_search_current="true"] {
			background-color: var(--bog_builderui_hover);
		}
	`);
})($ || ($ = {}));

;
	($.$mol_icon_play) = class $mol_icon_play extends ($.$mol_icon) {
		path(){
			return "M8,5.14V19.14L19,12.14L8,5.14Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_arrow_right) = class $mol_icon_arrow_right extends ($.$mol_icon) {
		path(){
			return "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z";
		}
	};


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
	($.$bog_smalljs_landing) = class $bog_smalljs_landing extends ($.$mol_view) {
		Hero_title_pre(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Hero_title_pre"));
		}
		Hero_title_accent_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Hero_title_accent_text"));
		}
		Hero_title_accent(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.Hero_title_accent_text())]);
			return obj;
		}
		Hero_title_post(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Hero_title_post"));
		}
		Hero_title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h1");
			(obj.sub) = () => ([
				(this.Hero_title_pre()), 
				(this.Hero_title_accent()), 
				(this.Hero_title_post())
			]);
			return obj;
		}
		Hero_subtitle_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Hero_subtitle_text"));
		}
		Hero_subtitle(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Hero_subtitle_text())]);
			return obj;
		}
		Hero_cta_why_icon(){
			const obj = new this.$.$mol_icon_play();
			return obj;
		}
		Hero_cta_why_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Hero_cta_why_label"));
		}
		Hero_cta_why(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"section": "docs", "page": "introduction"});
			(obj.sub) = () => ([(this.Hero_cta_why_icon()), (this.Hero_cta_why_label())]);
			return obj;
		}
		Hero_cta_start_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Hero_cta_start_label"));
		}
		Hero_cta_start_icon(){
			const obj = new this.$.$mol_icon_arrow_right();
			return obj;
		}
		Hero_cta_start(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"section": "docs", "page": "getting-started"});
			(obj.sub) = () => ([(this.Hero_cta_start_label()), (this.Hero_cta_start_icon())]);
			return obj;
		}
		Hero_cta_install(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Hero_cta_install_title")));
			(obj.arg) = () => ({"section": "docs", "page": "getting-started"});
			return obj;
		}
		Hero_cta_play_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Hero_cta_play_label"));
		}
		Hero_cta_play_icon(){
			const obj = new this.$.$mol_icon_open_in_new();
			return obj;
		}
		Hero_cta_play(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"section": "playground", "page": ""});
			(obj.sub) = () => ([(this.Hero_cta_play_label()), (this.Hero_cta_play_icon())]);
			return obj;
		}
		Hero_actions(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Hero_cta_why()), 
				(this.Hero_cta_start()), 
				(this.Hero_cta_install()), 
				(this.Hero_cta_play())
			]);
			return obj;
		}
		Hero(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Hero_title()), 
				(this.Hero_subtitle()), 
				(this.Hero_actions())
			]);
			return obj;
		}
		Feature1_title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Feature1_title_text"));
		}
		Feature1_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Feature1_title_text())]);
			return obj;
		}
		Feature1_text(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Feature1_text_text")));
			return obj;
		}
		Feature1(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Feature1_title()), (this.Feature1_text())]);
			return obj;
		}
		Feature2_title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Feature2_title_text"));
		}
		Feature2_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Feature2_title_text())]);
			return obj;
		}
		Feature2_text(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Feature2_text_text")));
			return obj;
		}
		Feature2(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Feature2_title()), (this.Feature2_text())]);
			return obj;
		}
		Feature3_title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Feature3_title_text"));
		}
		Feature3_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Feature3_title_text())]);
			return obj;
		}
		Feature3_text(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Feature3_text_text")));
			return obj;
		}
		Feature3(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Feature3_title()), (this.Feature3_text())]);
			return obj;
		}
		Features(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Feature1()), 
				(this.Feature2()), 
				(this.Feature3())
			]);
			return obj;
		}
		Footer_sect_docs_title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Footer_sect_docs_title_text"));
		}
		Footer_sect_docs_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_sect_docs_title_text())]);
			return obj;
		}
		Footer_link_quickstart(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_quickstart_title")));
			(obj.arg) = () => ({"section": "docs", "page": "getting-started"});
			return obj;
		}
		Footer_link_guide(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_guide_title")));
			(obj.arg) = () => ({"section": "docs", "page": "views"});
			return obj;
		}
		Footer_link_tutorial(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_tutorial_title")));
			(obj.arg) = () => ({"section": "course", "page": ""});
			return obj;
		}
		Footer_link_examples(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_examples_title")));
			(obj.arg) = () => ({"section": "docs", "page": "showcase"});
			return obj;
		}
		Footer_link_api(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_api_title")));
			(obj.arg) = () => ({"section": "docs", "page": "api-mol-string"});
			return obj;
		}
		Footer_sect_docs(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Footer_sect_docs_title()), 
				(this.Footer_link_quickstart()), 
				(this.Footer_link_guide()), 
				(this.Footer_link_tutorial()), 
				(this.Footer_link_examples()), 
				(this.Footer_link_api())
			]);
			return obj;
		}
		Footer_col1(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_sect_docs())]);
			return obj;
		}
		Footer_sect_about_title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Footer_sect_about_title_text"));
		}
		Footer_sect_about_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_sect_about_title_text())]);
			return obj;
		}
		Footer_link_faq(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_faq_title")));
			(obj.arg) = () => ({"section": "docs", "page": "faq"});
			return obj;
		}
		Footer_link_team(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_team_title")));
			(obj.arg) = () => ({"section": "docs", "page": "team"});
			return obj;
		}
		Footer_link_releases(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_releases_title")));
			(obj.arg) = () => ({"section": "docs", "page": "releases"});
			return obj;
		}
		Footer_sect_about(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Footer_sect_about_title()), 
				(this.Footer_link_faq()), 
				(this.Footer_link_team()), 
				(this.Footer_link_releases())
			]);
			return obj;
		}
		Footer_col2(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_sect_about())]);
			return obj;
		}
		Footer_sect_resources_title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Footer_sect_resources_title_text"));
		}
		Footer_sect_resources_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_sect_resources_title_text())]);
			return obj;
		}
		Footer_link_playground(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_playground_title")));
			(obj.arg) = () => ({"section": "playground", "page": ""});
			return obj;
		}
		Footer_link_course(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_course_title")));
			(obj.arg) = () => ({"section": "course", "page": ""});
			return obj;
		}
		Footer_link_ui(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_ui_title")));
			(obj.uri) = () => ("https://mol.hyoo.ru/");
			(obj.target) = () => ("_blank");
			return obj;
		}
		Footer_link_telegram(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_telegram_title")));
			(obj.uri) = () => ("https://t.me/giper_dev");
			(obj.target) = () => ("_blank");
			return obj;
		}
		Footer_link_dev(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_dev_title")));
			(obj.uri) = () => ("https://dev.to/t/mol");
			(obj.target) = () => ("_blank");
			return obj;
		}
		Footer_sect_resources(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Footer_sect_resources_title()), 
				(this.Footer_link_playground()), 
				(this.Footer_link_course()), 
				(this.Footer_link_ui()), 
				(this.Footer_link_telegram()), 
				(this.Footer_link_dev())
			]);
			return obj;
		}
		Footer_col3(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_sect_resources())]);
			return obj;
		}
		Footer_sect_libs_title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Footer_sect_libs_title_text"));
		}
		Footer_sect_libs_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_sect_libs_title_text())]);
			return obj;
		}
		Footer_link_wire(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_wire_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/wire");
			(obj.target) = () => ("_blank");
			return obj;
		}
		Footer_link_fetch(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_fetch_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/fetch");
			(obj.target) = () => ("_blank");
			return obj;
		}
		Footer_link_compare(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_compare_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/compare/deep");
			(obj.target) = () => ("_blank");
			return obj;
		}
		Footer_link_router(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_router_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam_mol/tree/master/state/arg");
			(obj.target) = () => ("_blank");
			return obj;
		}
		Footer_link_crowd(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_crowd_title")));
			(obj.uri) = () => ("https://github.com/hyoo-ru/crowd.hyoo.ru");
			(obj.target) = () => ("_blank");
			return obj;
		}
		Footer_link_baza(){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_smalljs_landing_Footer_link_baza_title")));
			(obj.uri) = () => ("https://github.com/giper-dev/baza");
			(obj.target) = () => ("_blank");
			return obj;
		}
		Footer_sect_libs(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Footer_sect_libs_title()), 
				(this.Footer_link_wire()), 
				(this.Footer_link_fetch()), 
				(this.Footer_link_compare()), 
				(this.Footer_link_router()), 
				(this.Footer_link_crowd()), 
				(this.Footer_link_baza())
			]);
			return obj;
		}
		Footer_col4(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_sect_libs())]);
			return obj;
		}
		Footer_cols(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Footer_col1()), 
				(this.Footer_col2()), 
				(this.Footer_col3()), 
				(this.Footer_col4())
			]);
			return obj;
		}
		Footer_copy_line1_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Footer_copy_line1_text"));
		}
		Footer_copy_line1(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_copy_line1_text())]);
			return obj;
		}
		Footer_copy_line2_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_landing_Footer_copy_line2_text"));
		}
		Footer_copy_line2(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_copy_line2_text())]);
			return obj;
		}
		Footer_copy(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_copy_line1()), (this.Footer_copy_line2())]);
			return obj;
		}
		Footer(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_cols()), (this.Footer_copy())]);
			return obj;
		}
		sub(){
			return [
				(this.Hero()), 
				(this.Features()), 
				(this.Footer())
			];
		}
	};
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero_title_accent"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero_title"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero_subtitle"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero_cta_why_icon"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero_cta_why"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero_cta_start_icon"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero_cta_start"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero_cta_install"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero_cta_play_icon"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero_cta_play"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero_actions"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Hero"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Feature1_title"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Feature1_text"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Feature1"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Feature2_title"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Feature2_text"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Feature2"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Feature3_title"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Feature3_text"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Feature3"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Features"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_sect_docs_title"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_quickstart"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_guide"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_tutorial"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_examples"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_api"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_sect_docs"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_col1"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_sect_about_title"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_faq"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_team"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_releases"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_sect_about"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_col2"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_sect_resources_title"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_playground"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_course"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_ui"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_telegram"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_dev"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_sect_resources"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_col3"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_sect_libs_title"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_wire"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_fetch"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_compare"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_router"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_crowd"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_link_baza"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_sect_libs"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_col4"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_cols"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_copy_line1"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_copy_line2"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer_copy"));
	($mol_mem(($.$bog_smalljs_landing.prototype), "Footer"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_smalljs_landing extends $.$bog_smalljs_landing {
        }
        $$.$bog_smalljs_landing = $bog_smalljs_landing;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    $mol_style_define($bog_smalljs_landing, {
        flex: { direction: 'column' },
        Hero: {
            flex: { direction: 'column' },
            align: { items: 'center' },
            gap: $mol_gap.block,
            padding: { top: rem(4), bottom: 0, left: $mol_gap.block, right: $mol_gap.block },
        },
        Hero_title: {
            display: 'block',
            font: { family: $bog_builderui_tokens.font_head, size: rem(4.75), weight: 900 },
            lineHeight: '1.25',
            textAlign: 'center',
            maxWidth: rem(60),
            // long words ("micromodule" / "микромодульный") must break, not overflow on phones
            overflowWrap: 'break-word',
        },
        Hero_title_accent: {
            display: 'inline',
            color: $bog_builderui_tokens.special,
            margin: { left: '0.25em', right: '0.15em' },
        },
        Hero_subtitle: {
            font: { size: rem(1.25) },
            textAlign: 'center',
            maxWidth: rem(45),
            color: $bog_builderui_tokens.text,
        },
        Hero_actions: {
            flex: { direction: 'row', wrap: 'wrap' },
            gap: $mol_gap.block,
            justify: { content: 'center' },
            align: { items: 'center' },
        },
        Hero_cta_why: {
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: rem(0.4),
            background: { color: $bog_builderui_tokens.current },
            color: $bog_builderui_tokens.back,
            padding: { left: rem(1.25), right: rem(1.25), top: rem(0.625), bottom: rem(0.625) },
            border: { radius: rem(1.25) },
            font: { weight: 600 },
        },
        Hero_cta_why_icon: { width: rem(1), height: rem(1) },
        Hero_cta_start: {
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: rem(0.4),
            background: { color: $bog_builderui_tokens.card },
            padding: { left: rem(1.25), right: rem(1.25), top: rem(0.625), bottom: rem(0.625) },
            border: { radius: rem(1.25) },
            font: { weight: 600 },
        },
        Hero_cta_start_icon: { width: rem(0.875), height: rem(0.875) },
        Hero_cta_install: {
            background: { color: $bog_builderui_tokens.card },
            padding: { left: rem(1.25), right: rem(1.25), top: rem(0.625), bottom: rem(0.625) },
            border: { radius: rem(1.25) },
            font: { weight: 600 },
        },
        Hero_cta_play: {
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: rem(0.4),
            background: { color: $bog_builderui_tokens.back },
            padding: { left: rem(1.25), right: rem(1.25), top: rem(0.5), bottom: rem(0.5) },
            border: { radius: rem(1.25), width: '1px', style: 'solid', color: $bog_builderui_tokens.current },
            color: $bog_builderui_tokens.current,
            font: { weight: 600 },
        },
        Hero_cta_play_icon: { width: rem(0.875), height: rem(0.875) },
        Features: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: $mol_gap.block,
            padding: { top: rem(4), bottom: rem(4), left: $mol_gap.block, right: $mol_gap.block },
            maxWidth: rem(75),
            margin: { left: 'auto', right: 'auto' },
        },
        Feature1: { flex: { direction: 'column' }, gap: $mol_gap.text },
        Feature2: { flex: { direction: 'column' }, gap: $mol_gap.text },
        Feature3: { flex: { direction: 'column' }, gap: $mol_gap.text },
        Feature1_title: {
            display: 'block',
            font: { size: rem(1.25), weight: 600 },
            '::first-letter': { color: $bog_builderui_tokens.special },
        },
        Feature2_title: {
            display: 'block',
            font: { size: rem(1.25), weight: 600 },
            '::first-letter': { color: $bog_builderui_tokens.special },
        },
        Feature3_title: {
            display: 'block',
            font: { size: rem(1.25), weight: 600 },
            '::first-letter': { color: $bog_builderui_tokens.special },
        },
        Footer: {
            flex: { direction: 'column' },
            gap: rem(2),
            padding: { top: rem(4), bottom: rem(3), left: rem(4), right: rem(4) },
            border: { top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
            // center the 75rem footer on wide screens like the hero/features (it only
            // had margin-top:auto, so it hugged the left while the rest was centered)
            margin: { top: 'auto', left: 'auto', right: 'auto' },
            maxWidth: rem(75),
            width: '100%',
        },
        Footer_cols: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: rem(2),
            margin: { left: 'auto', right: 'auto' },
            width: '100%',
        },
        Footer_col1: { flex: { direction: 'column' }, gap: rem(2) },
        Footer_col2: { flex: { direction: 'column' }, gap: rem(2) },
        Footer_col3: { flex: { direction: 'column' }, gap: rem(2) },
        Footer_col4: { flex: { direction: 'column' }, gap: rem(2) },
        Footer_sect_docs: { flex: { direction: 'column' }, gap: rem(0.75) },
        Footer_sect_about: { flex: { direction: 'column' }, gap: rem(0.75) },
        Footer_sect_resources: { flex: { direction: 'column' }, gap: rem(0.75) },
        Footer_sect_libs: { flex: { direction: 'column' }, gap: rem(0.75) },
        Footer_sect_docs_title: { font: { size: rem(1), weight: 700 }, padding: { bottom: rem(0.25) } },
        Footer_sect_about_title: { font: { size: rem(1), weight: 700 }, padding: { bottom: rem(0.25) } },
        Footer_sect_resources_title: { font: { size: rem(1), weight: 700 }, padding: { bottom: rem(0.25) } },
        Footer_sect_libs_title: { font: { size: rem(1), weight: 700 }, padding: { bottom: rem(0.25) } },
        Footer_copy: {
            flex: { direction: 'column' },
            align: { items: 'center' },
            gap: rem(0.25),
            font: { size: rem(0.875) },
            color: $bog_builderui_tokens.shade,
            textAlign: 'center',
            padding: { top: rem(2) },
        },
        '@media': {
            // Phone: shrink the oversized hero, stack features and footer so
            // nothing overflows the viewport width.
            '(max-width: 47.9375rem)': {
                Hero: {
                    padding: { top: rem(2.5), bottom: 0, left: rem(1.25), right: rem(1.25) },
                },
                Hero_title: {
                    font: { size: rem(2) },
                },
                Hero_subtitle: {
                    font: { size: rem(1.0625) },
                },
                Features: {
                    gridTemplateColumns: '1fr',
                    gap: rem(1.5),
                    padding: { top: rem(2.5), bottom: rem(2.5), left: rem(1.25), right: rem(1.25) },
                },
                Footer: {
                    padding: { top: rem(2.5), bottom: rem(2), left: rem(1.25), right: rem(1.25) },
                },
                Footer_cols: {
                    gridTemplateColumns: '1fr 1fr',
                    gap: rem(1.5),
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$mol_icon_menu) = class $mol_icon_menu extends ($.$mol_icon) {
		path(){
			return "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_pencil) = class $mol_icon_pencil extends ($.$mol_icon) {
		path(){
			return "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";
		}
	};


;
"use strict";


;
	($.$bog_smalljs_docs) = class $bog_smalljs_docs extends ($.$mol_view) {
		menu_toggle(next){
			if(next !== undefined) return next;
			return null;
		}
		Menu_icon(){
			const obj = new this.$.$mol_icon_menu();
			return obj;
		}
		Menu_label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title_text())]);
			return obj;
		}
		Menu_toggle(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.menu_toggle(next)));
			(obj.sub) = () => ([(this.Menu_icon()), (this.Menu_label())]);
			return obj;
		}
		sidebar_groups(){
			return [];
		}
		Sidebar(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.sidebar_groups()));
			return obj;
		}
		Body(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.page_md()));
			return obj;
		}
		Edit_icon(){
			const obj = new this.$.$mol_icon_pencil();
			return obj;
		}
		Edit_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_docs_Edit_label"));
		}
		Edit(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this.edit_uri()));
			(obj.sub) = () => ([(this.Edit_icon()), (this.Edit_label())]);
			return obj;
		}
		nav_links(){
			return [];
		}
		Nav(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.nav_links()));
			return obj;
		}
		Main(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Body()), 
				(this.Edit()), 
				(this.Nav())
			]);
			return obj;
		}
		toc_title_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_docs_toc_title_text"));
		}
		Toc_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.toc_title_text())]);
			return obj;
		}
		toc_links(){
			return [];
		}
		Toc_list(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.toc_links()));
			return obj;
		}
		Toc(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Toc_title()), (this.Toc_list())]);
			return obj;
		}
		group_content(id){
			return [];
		}
		group_title_text(id){
			return "";
		}
		link_arg(id){
			return {};
		}
		nav_click(next){
			if(next !== undefined) return next;
			return null;
		}
		link_title(id){
			return "";
		}
		toc_arg(id){
			return {};
		}
		toc_text(id){
			return "";
		}
		prev_arg(){
			return {};
		}
		prev_hint_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_docs_prev_hint_text"));
		}
		Prev_hint(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.prev_hint_text())]);
			return obj;
		}
		prev_title(){
			return "";
		}
		Prev_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.prev_title())]);
			return obj;
		}
		next_arg(){
			return {};
		}
		next_hint_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_docs_next_hint_text"));
		}
		Next_hint(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.next_hint_text())]);
			return obj;
		}
		next_title(){
			return "";
		}
		Next_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.next_title())]);
			return obj;
		}
		page(){
			return "introduction";
		}
		page_md(){
			return "";
		}
		title_text(){
			return "";
		}
		edit_uri(){
			return "";
		}
		sidebar_open(next){
			if(next !== undefined) return next;
			return false;
		}
		attr(){
			return {"bog_smalljs_sidebar_open": (this.sidebar_open())};
		}
		sub(){
			return [
				(this.Menu_toggle()), 
				(this.Sidebar()), 
				(this.Main()), 
				(this.Toc())
			];
		}
		Group(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.group_content(id)));
			return obj;
		}
		Group_title(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.group_title_text(id))]);
			return obj;
		}
		Link(id){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.link_arg(id)));
			(obj.event_click) = (next) => ((this.nav_click(next)));
			(obj.sub) = () => ([(this.link_title(id))]);
			return obj;
		}
		Toc_link(id){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.toc_arg(id)));
			(obj.sub) = () => ([(this.toc_text(id))]);
			return obj;
		}
		Prev(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.prev_arg()));
			(obj.sub) = () => ([(this.Prev_hint()), (this.Prev_title())]);
			return obj;
		}
		Next(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.next_arg()));
			(obj.sub) = () => ([(this.Next_hint()), (this.Next_title())]);
			return obj;
		}
	};
	($mol_mem(($.$bog_smalljs_docs.prototype), "menu_toggle"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Menu_icon"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Menu_label"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Menu_toggle"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Sidebar"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Body"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Edit_icon"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Edit"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Nav"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Main"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Toc_title"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Toc_list"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Toc"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "nav_click"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Prev_hint"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Prev_title"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Next_hint"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Next_title"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "sidebar_open"));
	($mol_mem_key(($.$bog_smalljs_docs.prototype), "Group"));
	($mol_mem_key(($.$bog_smalljs_docs.prototype), "Group_title"));
	($mol_mem_key(($.$bog_smalljs_docs.prototype), "Link"));
	($mol_mem_key(($.$bog_smalljs_docs.prototype), "Toc_link"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Prev"));
	($mol_mem(($.$bog_smalljs_docs.prototype), "Next"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const section = 'docs';
        class $bog_smalljs_docs extends $.$bog_smalljs_docs {
            /** Current page slug, mirrored to the `page` URL argument. */
            page(next) {
                return this.$.$mol_state_arg.value('page', next) ?? $bog_smalljs_content.default_slug();
            }
            current() {
                return $bog_smalljs_content.page(this.page());
            }
            /** Active UI language; reading it makes the page reactive to switches. */
            lang() {
                return this.$.$mol_locale.lang();
            }
            page_md() {
                const md = $bog_smalljs_content.page_md(this.page(), this.lang());
                if (md)
                    return md;
                // Unbuilt page — degrade gracefully instead of a bare error.
                return [
                    `# Coming soon`,
                    ``,
                    `This page hasn't been written yet — the docs are a work in progress.`,
                    ``,
                    `In the meantime, start with **[Getting Started](#!section=docs/page=getting-started)**`,
                    `or read the [Introduction](#!section=docs/page=introduction).`,
                ].join('\n');
            }
            title_text() {
                return $bog_smalljs_content.page_title(this.page(), this.lang()) ?? 'Coming soon';
            }
            edit_uri() {
                const page = this.current();
                if (!page)
                    return 'https://github.com/b-on-g/smalljs';
                return `https://github.com/b-on-g/smalljs/edit/main/${page.file}`;
            }
            // --- Mobile drawer ------------------------------------------------
            menu_toggle() {
                this.sidebar_open(!this.sidebar_open());
            }
            nav_click() {
                this.sidebar_open(false);
                return null;
            }
            // --- Sidebar ------------------------------------------------------
            groups_data() {
                return $bog_smalljs_content.sections().find(s => s.id === section)?.groups ?? [];
            }
            sidebar_groups() {
                return this.groups_data().map((_, index) => this.Group(index));
            }
            group_title_text(index) {
                return this.groups_data()[index].title;
            }
            group_content(index) {
                const group = this.groups_data()[index];
                return [
                    this.Group_title(index),
                    ...group.pages.map(slug => this.Link(slug)),
                ];
            }
            link_title(slug) {
                return $bog_smalljs_content.page_title(slug, this.lang()) ?? slug;
            }
            link_arg(slug) {
                return { section, page: slug };
            }
            // --- Table of contents (headings of the current page) -------------
            toc_data() {
                const items = [];
                let in_code = false;
                for (const line of this.page_md().split('\n')) {
                    if (/^```/.test(line)) {
                        in_code = !in_code;
                        continue;
                    }
                    if (in_code)
                        continue;
                    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
                    if (match)
                        items.push({ level: match[1].length, text: match[2] });
                }
                return items;
            }
            toc_links() {
                return this.toc_data().map((_, index) => this.Toc_link(index));
            }
            toc_text(index) {
                return this.toc_data()[index].text;
            }
            /**
             * Reuse $mol_text's own anchor mechanism: each heading renders a link
             * whose arg key is the text component's `param`. Setting that arg makes
             * the matching header `current`, and $mol_text auto-scrolls to it.
             */
            toc_arg(index) {
                return { [this.Body().param()]: this.toc_data()[index].text };
            }
            // --- Prev / next --------------------------------------------------
            order() {
                return $bog_smalljs_content.order(section);
            }
            nav_index() {
                return this.order().indexOf(this.page());
            }
            prev_slug() {
                const index = this.nav_index();
                return index > 0 ? this.order()[index - 1] : '';
            }
            next_slug() {
                const index = this.nav_index();
                const order = this.order();
                return index >= 0 && index < order.length - 1 ? order[index + 1] : '';
            }
            prev_arg() {
                return { section, page: this.prev_slug() };
            }
            next_arg() {
                return { section, page: this.next_slug() };
            }
            prev_title() {
                return $bog_smalljs_content.page_title(this.prev_slug(), this.lang()) ?? '';
            }
            next_title() {
                return $bog_smalljs_content.page_title(this.next_slug(), this.lang()) ?? '';
            }
            nav_links() {
                const links = [];
                if (this.prev_slug())
                    links.push(this.Prev());
                if (this.next_slug())
                    links.push(this.Next());
                return links;
            }
        }
        __decorate([
            $mol_action
        ], $bog_smalljs_docs.prototype, "menu_toggle", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_docs.prototype, "nav_click", null);
        $$.$bog_smalljs_docs = $bog_smalljs_docs;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    const topbar = rem(4);
    // One sidebar navigation link (also used for prev/next captions).
    const sidebar_link = {
        flex: { direction: 'row' },
        justify: { content: 'flex-start' },
        padding: { top: rem(0.3), bottom: rem(0.3), left: rem(0.625), right: rem(0.625) },
        border: { radius: rem(0.375) },
        color: $bog_builderui_tokens.shade,
        font: { size: rem(0.875), weight: 500 },
        ':hover': {
            background: { color: $bog_builderui_tokens.hover },
            color: $bog_builderui_tokens.text,
        },
        // active page — $mol_link sets mol_link_current="true"
        '@': {
            mol_link_current: {
                true: {
                    color: $bog_builderui_tokens.special,
                    background: { color: $bog_builderui_tokens.hover },
                    font: { weight: 600 },
                },
            },
        },
    };
    $mol_style_define($bog_smalljs_docs, {
        display: 'grid',
        gridTemplateColumns: `16rem minmax(0, 1fr) 15rem`,
        flex: { grow: 1 },
        align: { items: 'start' },
        minHeight: 0,
        Menu_toggle: {
            display: 'none',
            flex: { direction: 'row', grow: 0 },
            align: { items: 'center' },
            gap: $mol_gap.text,
            gridColumn: '1 / -1',
            position: 'sticky',
            top: topbar,
            zIndex: 80,
            padding: { top: rem(0.5), bottom: rem(0.5), left: $mol_gap.block, right: $mol_gap.block },
            background: { color: $bog_builderui_tokens.back },
            border: { bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
            font: { weight: 600 },
            color: $bog_builderui_tokens.text,
        },
        Menu_icon: {
            width: rem(1.25),
            height: rem(1.25),
            flex: { shrink: 0 },
        },
        Sidebar: {
            flex: { direction: 'column' },
            position: 'sticky',
            top: topbar,
            maxHeight: $mol_style_func.calc('100vh - 4rem'),
            overflow: { y: 'auto', x: 'hidden' },
            padding: { top: $mol_gap.block, bottom: $mol_gap.block, left: rem(0.75), right: rem(0.75) },
            border: { right: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
            background: { color: $bog_builderui_tokens.back },
        },
        Group: {
            flex: { direction: 'column' },
            gap: rem(0.0625),
            margin: { bottom: $mol_gap.block },
        },
        Group_title: {
            padding: { top: rem(0.5), bottom: rem(0.25), left: rem(0.625), right: rem(0.625) },
            font: { size: rem(0.6875), weight: 700 },
            color: $bog_builderui_tokens.shade,
            textTransform: 'uppercase',
            letterSpacing: rem(0.03),
        },
        Link: sidebar_link,
        Main: {
            flex: { direction: 'column' },
            minWidth: 0,
            padding: { top: rem(2), bottom: rem(3), left: rem(3), right: rem(3) },
        },
        Body: {
            flex: { direction: 'column' },
            maxWidth: rem(48),
            width: '100%',
        },
        Edit: {
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: $mol_gap.text,
            margin: { top: rem(2) },
            color: $bog_builderui_tokens.control,
            font: { size: rem(0.875), weight: 500 },
            ':hover': { color: $bog_builderui_tokens.focus },
        },
        Edit_icon: {
            width: rem(1),
            height: rem(1),
        },
        Nav: {
            flex: { direction: 'row', wrap: 'wrap' },
            justify: { content: 'space-between' },
            gap: $mol_gap.block,
            maxWidth: rem(48),
            padding: { top: $mol_gap.block, bottom: $mol_gap.block },
            border: { top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
            margin: { top: rem(2) },
        },
        Prev: {
            flex: { direction: 'column', grow: 1, basis: rem(12) },
            align: { items: 'flex-start' },
            gap: rem(0.125),
            padding: $mol_gap.block,
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: rem(0.5) },
            ':hover': { border: { color: $bog_builderui_tokens.focus } },
        },
        Next: {
            flex: { direction: 'column', grow: 1, basis: rem(12) },
            align: { items: 'flex-end' },
            gap: rem(0.125),
            padding: $mol_gap.block,
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: rem(0.5) },
            ':hover': { border: { color: $bog_builderui_tokens.focus } },
        },
        Prev_hint: {
            font: { size: rem(0.75) },
            color: $bog_builderui_tokens.shade,
        },
        Next_hint: {
            font: { size: rem(0.75) },
            color: $bog_builderui_tokens.shade,
        },
        Prev_title: {
            color: $bog_builderui_tokens.control,
            font: { weight: 600 },
        },
        Next_title: {
            color: $bog_builderui_tokens.control,
            font: { weight: 600 },
        },
        Toc: {
            flex: { direction: 'column' },
            position: 'sticky',
            top: topbar,
            maxHeight: $mol_style_func.calc('100vh - 4rem'),
            overflow: { y: 'auto', x: 'hidden' },
            padding: { top: rem(2), bottom: $mol_gap.block, left: rem(1), right: rem(1) },
            border: { left: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line } },
        },
        Toc_title: {
            padding: { bottom: rem(0.5) },
            font: { size: rem(0.75), weight: 700 },
            color: $bog_builderui_tokens.shade,
            textTransform: 'uppercase',
            letterSpacing: rem(0.03),
        },
        Toc_list: {
            flex: { direction: 'column' },
            gap: rem(0.0625),
        },
        Toc_link: {
            padding: { top: rem(0.25), bottom: rem(0.25), left: rem(0.5), right: rem(0.5) },
            border: { radius: rem(0.25) },
            color: $bog_builderui_tokens.shade,
            font: { size: rem(0.8125) },
            ':hover': { color: $bog_builderui_tokens.text },
            '@': {
                mol_link_current: {
                    true: { color: $bog_builderui_tokens.special },
                },
            },
        },
        '@media': {
            // Tablet: drop the right-hand table of contents.
            '(max-width: 63.9375rem)': {
                gridTemplateColumns: `16rem minmax(0, 1fr)`,
                Toc: { display: 'none' },
            },
            // Phone: sidebar becomes a slide-in drawer, content full width.
            '(max-width: 47.9375rem)': {
                gridTemplateColumns: `minmax(0, 1fr)`,
                Menu_toggle: { display: 'flex' },
                Main: {
                    padding: { top: rem(1.25), bottom: rem(2), left: rem(1.25), right: rem(1.25) },
                },
                Sidebar: {
                    position: 'fixed',
                    top: topbar,
                    bottom: 0,
                    left: 0,
                    zIndex: 90,
                    width: rem(17),
                    maxWidth: '85vw',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.2s',
                    boxShadow: '0 0 24px -6px #00000055',
                },
                // drawer open state
                '@': {
                    bog_smalljs_sidebar_open: {
                        true: {
                            Sidebar: { transform: 'translateX(0)' },
                        },
                    },
                },
            },
        },
    });
    // $mol_text renders a list bullet/number via [mol_text_list_item]::before with
    // position:absolute + margin-left:-1.75rem (sits in the left gutter). Without a
    // positioning context the marker anchors to the scroll container and drifts on
    // scroll. Anchoring it to the item (position:relative) fixed the drift but the
    // item has overflow:auto, which clips the marker poking out to the left. So put
    // the positioning context on the LIST (overflow:visible) instead: the marker
    // stays glued to its line AND isn't clipped. Raw CSS (attributes belong to $mol_text).
    $mol_style_attach('$bog_smalljs_docs.list_marker', `
		[bog_smalljs_docs_body] [mol_text_list] { position: relative }
	`);
})($ || ($ = {}));

;
	($.$mol_textarea) = class $mol_textarea extends ($.$mol_stack) {
		clickable(next){
			if(next !== undefined) return next;
			return false;
		}
		sidebar_showed(){
			return false;
		}
		press(next){
			if(next !== undefined) return next;
			return null;
		}
		hover(next){
			if(next !== undefined) return next;
			return null;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		enabled(){
			return true;
		}
		spellcheck(){
			return true;
		}
		length_max(){
			return +Infinity;
		}
		selection(next){
			if(next !== undefined) return next;
			return [];
		}
		bring(){
			return (this.Edit().bring());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return true;
		}
		Edit(){
			const obj = new this.$.$mol_textarea_edit();
			(obj.value) = (next) => ((this.value(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.enabled()));
			(obj.spellcheck) = () => ((this.spellcheck()));
			(obj.length_max) = () => ((this.length_max()));
			(obj.selection) = (next) => ((this.selection(next)));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.submit_with_ctrl) = () => ((this.submit_with_ctrl()));
			return obj;
		}
		row_numb(id){
			return 0;
		}
		highlight(){
			return "";
		}
		syntax(){
			const obj = new this.$.$mol_syntax2();
			return obj;
		}
		View(){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.value()));
			(obj.render_visible_only) = () => (false);
			(obj.row_numb) = (id) => ((this.row_numb(id)));
			(obj.sidebar_showed) = () => ((this.sidebar_showed()));
			(obj.highlight) = () => ((this.highlight()));
			(obj.syntax) = () => ((this.syntax()));
			return obj;
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_textarea_clickable": (this.clickable()), 
				"mol_textarea_sidebar_showed": (this.sidebar_showed())
			};
		}
		event(){
			return {"keydown": (next) => (this.press(next)), "pointermove": (next) => (this.hover(next))};
		}
		sub(){
			return [(this.Edit()), (this.View())];
		}
		symbols_alt(){
			return {
				"comma": "<", 
				"period": ">", 
				"dash": "−", 
				"equals": "≈", 
				"graveAccent": "́", 
				"forwardSlash": "÷", 
				"E": "€", 
				"V": "✔", 
				"X": "×", 
				"C": "©", 
				"P": "§", 
				"H": "₽", 
				"key0": "°", 
				"key8": "•", 
				"key2": "@", 
				"key3": "#", 
				"key4": "$", 
				"key6": "^", 
				"key7": "&", 
				"bracketOpen": "[", 
				"bracketClose": "]", 
				"slashBack": "|"
			};
		}
		symbols_alt_ctrl(){
			return {"space": " "};
		}
		symbols_alt_shift(){
			return {
				"V": "✅", 
				"X": "❌", 
				"O": "⭕", 
				"key1": "❗", 
				"key4": "💲", 
				"key7": "❓", 
				"comma": "«", 
				"period": "»", 
				"semicolon": "“", 
				"quoteSingle": "”", 
				"dash": "—", 
				"equals": "≠", 
				"graveAccent": "̱", 
				"bracketOpen": "{", 
				"bracketClose": "}"
			};
		}
	};
	($mol_mem(($.$mol_textarea.prototype), "clickable"));
	($mol_mem(($.$mol_textarea.prototype), "press"));
	($mol_mem(($.$mol_textarea.prototype), "hover"));
	($mol_mem(($.$mol_textarea.prototype), "value"));
	($mol_mem(($.$mol_textarea.prototype), "selection"));
	($mol_mem(($.$mol_textarea.prototype), "submit"));
	($mol_mem(($.$mol_textarea.prototype), "Edit"));
	($mol_mem(($.$mol_textarea.prototype), "syntax"));
	($mol_mem(($.$mol_textarea.prototype), "View"));
	($.$mol_textarea_edit) = class $mol_textarea_edit extends ($.$mol_string) {
		dom_name(){
			return "textarea";
		}
		enter(){
			return "enter";
		}
		field(){
			return {...(super.field()), "scrollTop": 0};
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
         * An input field for entering multiline text.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
         */
        class $mol_textarea extends $.$mol_textarea {
            indent_inc() {
                let text = this.value();
                let [from, to] = this.selection();
                const rows = text.split('\n');
                let start = 0;
                for (let i = 0; i < rows.length; ++i) {
                    let end = start + rows[i].length;
                    if (end >= from && start <= to) {
                        if (to === from || start !== to) {
                            rows[i] = '\t' + rows[i];
                            to += 1;
                            end += 1;
                        }
                    }
                    start = end + 1;
                }
                this.value(rows.join('\n'));
                this.selection([from + 1, to]);
            }
            indent_dec() {
                let text = this.value();
                let [from, to] = this.selection();
                const rows = text.split('\n');
                let start = 0;
                for (let i = 0; i < rows.length; ++i) {
                    const end = start + rows[i].length;
                    if (end >= from && start <= to && rows[i].startsWith('\t')) {
                        rows[i] = rows[i].slice(1);
                        to -= 1;
                        if (start < from)
                            from -= 1;
                    }
                    start = end + 1;
                }
                this.value(rows.join('\n'));
                this.selection([from, to]);
            }
            symbol_insert(event) {
                const symbol = event.shiftKey
                    ? this.symbols_alt_shift()[$mol_keyboard_code[event.keyCode]]
                    : event.ctrlKey
                        ? this.symbols_alt_ctrl()[$mol_keyboard_code[event.keyCode]]
                        : this.symbols_alt()[$mol_keyboard_code[event.keyCode]];
                if (!symbol)
                    return;
                event.preventDefault();
                document.execCommand('insertText', false, symbol);
            }
            clickable(next) {
                if (!this.enabled())
                    return true;
                return next ?? false;
            }
            hover(event) {
                this.clickable(event.ctrlKey);
            }
            press(event) {
                if (event.altKey) {
                    this.symbol_insert(event);
                }
                else {
                    switch (event.keyCode) {
                        case !event.shiftKey && $mol_keyboard_code.tab:
                            this.indent_inc();
                            break;
                        case event.shiftKey && $mol_keyboard_code.tab:
                            this.indent_dec();
                            break;
                        default: return;
                    }
                    event.preventDefault();
                }
            }
            row_numb(index) {
                return index;
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_textarea.prototype, "clickable", null);
        $$.$mol_textarea = $mol_textarea;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/textarea/textarea.view.css", "[mol_textarea] {\n\tflex: 1 0 auto;\n\tflex-direction: column;\n\tvertical-align: top;\n\tmin-height: max-content;\n\twhite-space: pre-wrap;\n\tword-break: break-word;\n\tborder-radius: var(--mol_gap_round);\n\tfont-family: monospace;\n\tposition: relative;\n\ttab-size: 4;\n}\n\n[mol_textarea_view] {\n\tpointer-events: none;\n\twhite-space: inherit;\n\tfont-family: inherit;\n\ttab-size: inherit;\n\tuser-select: none;\n}\n\n[mol_textarea_view_copy] {\n\tpointer-events: all;\n}\n\n[mol_textarea_clickable] > [mol_textarea_view] {\n\tpointer-events: all;\n\tuser-select: auto;\n}\n\n[mol_textarea_clickable] > [mol_textarea_edit] {\n\tuser-select: none;\n}\n\n[mol_textarea_edit] {\n\tfont-family: inherit;\n\tpadding: var(--mol_gap_text);\n\tcolor: transparent !important;\n\tcaret-color: var(--mol_theme_text);\n\tresize: none;\n\ttext-align: inherit;\n\twhite-space: inherit;\n\tborder-radius: inherit;\n\toverflow-anchor: none;\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\ttab-size: inherit;\n}\n\n[mol_textarea_sidebar_showed] [mol_textarea_edit] {\n\tleft: 1.75rem;\n\twidth: calc( 100% - 1.75rem );\n}\n\n[mol_textarea_edit]:hover + [mol_textarea_view] {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_textarea_edit]:focus + [mol_textarea_view] {\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$bog_smalljs_playground) = class $bog_smalljs_playground extends ($.$mol_view) {
		show_tree(next){
			if(next !== undefined) return next;
			return null;
		}
		tree_tab_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_playground_tree_tab_label"));
		}
		Tree_tab(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.show_tree(next)));
			(obj.sub) = () => ([(this.tree_tab_label())]);
			return obj;
		}
		show_ts(next){
			if(next !== undefined) return next;
			return null;
		}
		ts_tab_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_playground_ts_tab_label"));
		}
		Ts_tab(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.show_ts(next)));
			(obj.sub) = () => ([(this.ts_tab_label())]);
			return obj;
		}
		Tabs(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Tree_tab()), (this.Ts_tab())]);
			return obj;
		}
		Editor(){
			const obj = new this.$.$mol_textarea();
			(obj.value) = (next) => ((this.draft(next)));
			(obj.hint) = () => ((this.editor_hint()));
			return obj;
		}
		Editor_pane(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Tabs()), (this.Editor())]);
			return obj;
		}
		preview_label_text(){
			return (this.$.$mol_locale.text("$bog_smalljs_playground_preview_label_text"));
		}
		Preview_label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.preview_label_text())]);
			return obj;
		}
		preview_content(){
			return [];
		}
		Preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.preview_content()));
			return obj;
		}
		Preview_pane(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Preview_label()), (this.Preview())]);
			return obj;
		}
		tab(){
			return "tree";
		}
		draft(next){
			if(next !== undefined) return next;
			return "";
		}
		editor_hint(){
			return "";
		}
		seed_tree(){
			return "";
		}
		seed_ts(){
			return "";
		}
		store_scope(){
			return "";
		}
		attr(){
			return {"bog_smalljs_pg_tab": (this.tab())};
		}
		sub(){
			return [(this.Editor_pane()), (this.Preview_pane())];
		}
	};
	($mol_mem(($.$bog_smalljs_playground.prototype), "show_tree"));
	($mol_mem(($.$bog_smalljs_playground.prototype), "Tree_tab"));
	($mol_mem(($.$bog_smalljs_playground.prototype), "show_ts"));
	($mol_mem(($.$bog_smalljs_playground.prototype), "Ts_tab"));
	($mol_mem(($.$bog_smalljs_playground.prototype), "Tabs"));
	($mol_mem(($.$bog_smalljs_playground.prototype), "Editor"));
	($mol_mem(($.$bog_smalljs_playground.prototype), "Editor_pane"));
	($mol_mem(($.$bog_smalljs_playground.prototype), "Preview_label"));
	($mol_mem(($.$bog_smalljs_playground.prototype), "Preview"));
	($mol_mem(($.$bog_smalljs_playground.prototype), "Preview_pane"));
	($mol_mem(($.$bog_smalljs_playground.prototype), "draft"));


;
"use strict";
var $;
(function ($) {
    /** Position in any resource. */
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = this.uri + ('#' + this.row + ':' + this.col + '/' + this.length);
        }
        /** Span for begin of unknown resource */
        static unknown = $mol_span.begin('?');
        /** Makes new span for begin of resource. */
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        /** Makes new span for end of resource. */
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, 0);
        }
        /** Makes new span for entire resource. */
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        /** Makes new error for this span. */
        error(message, Class = Error) {
            return new Class(`${message} (${this})`);
        }
        /** Makes new span for same uri. */
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        /** Makes new span after end of this. */
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        /** Makes new span between begin and end. */
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(this.error(`Begin value '${begin}' out of range`, RangeError));
            if (end < 0 || end > len)
                this.$.$mol_fail(this.error(`End value '${end}' out of range`, RangeError));
            if (end < begin)
                this.$.$mol_fail(this.error(`End value '${end}' can't be less than begin value`, RangeError));
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Syntax error with cordinates and source line snippet. */
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Parses tree format from string. */
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            // read indent
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            // invalid tab size
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                // skip error line
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            // parse types
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                // type can not contain space and tab
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                // read type
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                // read one space if exists
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            // read data
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            // now must be end of text
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Serializes tree to string in tree format. */
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Abstract Syntax Tree with human readable serialization.
     * Avoid direct instantiation. Use static factories instead.
     * @see https://github.com/nin-jin/tree.d
     */
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(
        /** Type of structural node, `value` should be empty */
        type, 
        /** Content of data node, `type` should be empty */
        value, 
        /** Child nodes */
        kids, 
        /** Position in most far source resource */
        span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        /** Makes collection node. */
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        /** Makes new derived collection node. */
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        /** Makes data node for any string. */
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        /** Makes new derived data node. */
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        /** Makes struct node. */
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        /** Makes new derived structural node. */
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        /** Makes new derived node with different kids id defined. */
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        /** Returns multiline text content. */
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        /** Parses tree format. */
        /** @deprecated Use $mol_tree2_from_string */
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        /** Serializes to tree format. */
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        /** Makes new tree with node overrided by path. */
        insert(value, ...path) {
            return this.update($mol_maybe(value), ...path)[0];
        }
        /** Makes new tree with node overrided by path. */
        update(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.flatMap((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.update(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(...this.struct(type, []).update(value, ...path.slice(1)));
                }
                return [this.clone(sub)];
            }
            else if (typeof type === 'number') {
                const ins = (this.kids[type] || this.list([]))
                    .update(value, ...path.slice(1));
                return [this.clone([
                        ...this.kids.slice(0, type),
                        ...ins,
                        ...this.kids.slice(type + 1),
                    ])];
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .flatMap(item => item.update(value, ...path.slice(1)));
                return [this.clone(kids)];
            }
        }
        /** Query nodes by path. */
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        /** Filter kids by path or value. */
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack_self(belt, context = {}) {
            let handle = belt[this.type] || belt[''];
            if (!handle || handle === Object.prototype[this.type]) {
                handle = (input, belt, context) => [
                    input.clone(input.hack(belt, context), context.span)
                ];
            }
            try {
                return handle(this, belt, context);
            }
            catch (error) {
                error.message += `\n${this.clone([])}${this.span}`;
                $mol_fail_hidden(error);
            }
        }
        /** Transform tree through context with transformers */
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => child.hack_self(belt, context)));
        }
        /** Makes Error with node coordinates. */
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_view_tree2_error extends Error {
        spans;
        constructor(message, spans) {
            super(message);
            this.spans = spans;
        }
        toJSON() {
            return {
                message: this.message,
                spans: this.spans
            };
        }
    }
    $.$mol_view_tree2_error = $mol_view_tree2_error;
    class $mol_view_tree2_error_suggestions {
        suggestions;
        constructor(suggestions) {
            this.suggestions = suggestions;
        }
        toString() {
            return this.suggestions.map(suggestion => `\`${suggestion}\``).join(', ');
        }
        toJSON() {
            return this.suggestions;
        }
    }
    $.$mol_view_tree2_error_suggestions = $mol_view_tree2_error_suggestions;
    function $mol_view_tree2_error_str(strings, ...parts) {
        const spans = [];
        for (const part of parts) {
            if (part instanceof $mol_span)
                spans.push(part);
            if (Array.isArray(part) && part.length > 0 && part[0] instanceof $mol_span)
                spans.push(...part);
        }
        return new $mol_view_tree2_error(join(strings, parts), spans);
    }
    $.$mol_view_tree2_error_str = $mol_view_tree2_error_str;
    function join(strings, objects) {
        let result = '';
        let obj_pos = 0;
        let obj_len = objects.length;
        for (const str of strings) {
            result += str;
            if (obj_pos < obj_len) {
                const obj = objects[obj_pos++];
                if (Array.isArray(obj))
                    result += obj.map(item => `\`${item}\``).join(', ');
                else
                    result += `\`${String(obj)}\``;
            }
        }
        return result;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_child(tree) {
        if (tree.kids.length === 0) {
            return this.$mol_fail($mol_view_tree2_error_str `Required one child at ${tree.span}`);
        }
        if (tree.kids.length > 1) {
            return this.$mol_fail($mol_view_tree2_error_str `Should be only one child at ${tree.span}`);
        }
        return tree.kids[0];
    }
    $.$mol_view_tree2_child = $mol_view_tree2_child;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_classes(defs) {
        return defs.clone(defs.hack({
            '-': () => []
        }));
    }
    $.$mol_view_tree2_classes = $mol_view_tree2_classes;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_normalize(defs) {
        return defs.clone($mol_view_tree2_classes(defs).kids.map(cl => cl.clone([
            this.$mol_view_tree2_class_super(cl).clone(this.$mol_view_tree2_class_props(cl))
        ])));
    }
    $.$mol_view_tree2_normalize = $mol_view_tree2_normalize;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { begin, end, latin_only, or, optional, repeat_greedy } = $mol_regexp;
    $.$mol_view_tree2_prop_signature = $mol_regexp.from([
        begin,
        { name: repeat_greedy(latin_only, 1) },
        { key: optional(['*', repeat_greedy(latin_only, 0)]) },
        { next: optional(['?', repeat_greedy(latin_only, 0)]) },
        end,
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_prop_parts(prop) {
        const groups = [...prop.type.matchAll($mol_view_tree2_prop_signature)][0]?.groups;
        if (!groups) {
            this.$mol_fail($mol_view_tree2_error_str `Required prop like some*? at ${prop.span}`);
        }
        return {
            name: groups.name,
            key: groups.key,
            next: groups.next ? '?' : ''
        };
    }
    $.$mol_view_tree2_prop_parts = $mol_view_tree2_prop_parts;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const regular_regex = /^\w+$/;
    function $mol_view_tree2_prop_quote(name) {
        if (regular_regex.test(name.value))
            return name;
        return name.data(JSON.stringify(name.value));
    }
    $.$mol_view_tree2_prop_quote = $mol_view_tree2_prop_quote;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const class_regex = /^[$A-Z][$\w<>\[\]()"'?|]+$/;
    function $mol_view_tree2_class_match(klass) {
        if (!klass?.type)
            return false;
        if (klass.type === 'NaN' || klass.type === 'Infinity')
            return false;
        return class_regex.test(klass.type);
    }
    $.$mol_view_tree2_class_match = $mol_view_tree2_class_match;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_class_super(klass) {
        if (!$mol_view_tree2_class_match(klass))
            return this.$mol_fail(err `Wrong class name at ${klass.span}`);
        const superclass = klass.kids.length === 1 ? klass.kids[0] : undefined;
        if (!superclass)
            return this.$mol_fail(err `No super class at ${klass.span}`);
        if (!$mol_view_tree2_class_match(superclass))
            return this.$mol_fail(err `Wrong super class name ${JSON.stringify(superclass.type).replace(/(^"|"$)/g, "")} at ${superclass.span}`);
        return superclass;
    }
    $.$mol_view_tree2_class_super = $mol_view_tree2_class_super;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    const is_writable = (input) => input.type.includes('?');
    function $mol_view_tree2_class_props(klass) {
        let props = this.$mol_view_tree2_class_super(klass);
        // ! syntax to * and ?val syntax to ?
        props = props.clone(props.hack({
            '': (node, belt) => {
                const next = node.type.indexOf('?');
                const id = node.type.indexOf('!');
                let normal = node.type;
                const ch = node.type[id + 1];
                if (id !== -1 && ch?.toUpperCase() !== ch?.toLowerCase())
                    normal = `${normal.substring(0, id)}*${next === -1 ? '' : '?'}`;
                else if (next !== -1)
                    normal = normal.substring(0, next + 1);
                if (node.type === normal)
                    return [node.clone(node.hack(belt))];
                console.warn(`Syntax ${node.type} at ${node.span} is deprecated. Use ${normal} instead`);
                return [node.struct(normal, node.hack(belt))];
            }
        }));
        const props_inner = {};
        const add_inner = (prop) => {
            const { name } = this.$mol_view_tree2_prop_parts(prop);
            const prev = props_inner[name];
            if (prev && prev.kids[0]?.toString() !== prop.kids[0]?.toString()) {
                this.$mol_fail(err `Need an equal default values at ${prev.span} vs ${prop.span}`);
            }
            props_inner[name] = prop;
        };
        const upper = (operator, belt, context) => {
            const prop = this.$mol_view_tree2_child(operator);
            const defs = prop.hack(belt, { factory: prop });
            if (defs.length)
                add_inner(prop.clone(defs));
            return [operator.clone([prop.clone([])])];
        };
        const props_root = props.hack({
            '<=': upper,
            '<=>': upper,
            '^': (operator, belt, context) => {
                if (operator.kids.length === 0)
                    return [operator];
                return upper(operator, belt, context);
            },
            '': (left, belt, context) => {
                let right;
                const operator = left.kids[0];
                if (operator?.type === '=>' && context.factory) {
                    right = operator.kids[0];
                    if (!right)
                        this.$mol_fail(err `Need a child ${operator.span}`);
                    if (!context.factory)
                        this.$mol_fail(err `Need a parent ${left.span}`);
                    if (is_writable(left) !== is_writable(right))
                        this.$mol_fail(err `Left and right operands are not compatible at ${operator.span}`);
                    add_inner(right.clone([
                        right.struct('=', [
                            context.factory.struct(context.factory.type.replace(/\*.*/, '*'), [left.clone([])]),
                        ]),
                    ]));
                }
                else if (operator?.type === "<=>") {
                    const right = operator.kids[0];
                    if (!right)
                        this.$mol_fail(err `Need a child ${operator.span}`);
                    if (!is_writable(left))
                        this.$mol_fail(err `Expected writable at ${left.span}`);
                    if (!is_writable(right))
                        this.$mol_fail(err `Expected writable at ${right.span}`);
                }
                else if (context.factory && operator?.type === "<=" && is_writable(left)) {
                    this.$mol_fail(err `Expected readonly at ${left.span}`);
                }
                if (right)
                    context = { factory: right.clone([]) };
                else if (operator && !context.factory && $mol_view_tree2_class_match(operator)) {
                    context = { factory: left.clone([]) };
                }
                const hacked = left.clone(left.hack(belt, context));
                return [hacked];
            }
        }, { factory: undefined });
        for (const prop of props_root)
            add_inner(prop);
        return Object.values(props_inner);
    }
    $.$mol_view_tree2_class_props = $mol_view_tree2_class_props;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_js_is_number(type) {
        return type.match(/[\+\-]*NaN/) || !Number.isNaN(Number(type));
    }
    $.$mol_tree2_js_is_number = $mol_tree2_js_is_number;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function name_of(prop) {
        return this.$mol_view_tree2_prop_parts(prop).name;
    }
    function params_of(prop, bidi = true) {
        const { key, next } = this.$mol_view_tree2_prop_parts(prop);
        return prop.struct('(,)', [
            ...key
                ? [prop.struct('id')]
                : [],
            ...(bidi && next) ? [prop.struct('next')] : [],
        ]);
    }
    function args_of(prop, bidi = true) {
        const { key, next } = this.$mol_view_tree2_prop_parts(prop);
        return prop.struct('(,)', [
            ...key
                ? key.length > 1
                    ? [prop.data(key.slice(1))]
                    : [prop.struct('id')]
                : [],
            ...(bidi && next) ? [prop.struct('next')] : [],
        ]);
    }
    function call_method_name(child, optional) {
        return child.struct(optional ? '?.[]' : '[]', [
            child.data(name_of.call(this, child))
        ]);
    }
    function call_of(bind, bidi = true) {
        if (bind.kids.length === 0) {
            return this.$mol_fail(err `Required one child at ${bind.span}`);
        }
        const chain = [bind.struct('this')];
        for (const child of bind.kids) {
            chain.push(call_method_name.call(this, child, chain.length > 1), args_of.call(this, child, bidi));
        }
        return bind.struct('()', chain);
    }
    const localized_string = $$.$mol_tree2_from_string(`
		()
			this
			[] \\$
			[] \\$mol_locale
			[] \\text
			(,) #key
	`, 'localized_string');
    function klass_body(acc, prop) {
        const { klass, members, addons } = acc;
        const { name, key, next } = this.$mol_view_tree2_prop_parts(prop);
        const decorate = () => {
            return prop.struct('()', [
                prop.struct(key ? '$mol_mem_key' : '$mol_mem'),
                prop.struct('(,)', [
                    prop.struct('()', [
                        klass.struct('$'),
                        prop.struct('[]', [
                            klass.data(klass.type),
                        ]),
                        prop.struct('[]', [
                            prop.data('prototype'),
                        ]),
                    ]),
                    prop.data(name),
                ]),
            ]);
        };
        const op = prop.kids[0];
        const is_delegate = op?.type === '<=>' || op?.type === '=';
        if (!is_delegate && next)
            addons.push(decorate());
        const val = prop.hack({
            '@': (locale, belt, context) => {
                const chain = context.chain?.join('_');
                return localized_string.hack({
                    '#key': key => [locale.data(`${klass.type}_${name}${chain ? `_${chain}` : ''}`)],
                });
            },
            '<=': bind => [call_of.call(this, bind, false)],
            '<=>': bind => [call_of.call(this, bind, true)],
            '=>': bind => [],
            '^': (ref, belt, context) => [
                ref.struct('...', [
                    // prop ^ foo
                    ref.kids[0]?.type
                        ? ref.struct('()', [
                            ref.struct('this'),
                            ref.struct('[]', [ref.data(name_of.call(this, ref.kids[0]))]),
                            args_of.call(this, ref.kids[0])
                        ])
                        // Having $having foo / ^
                        : context.chain
                            ? ref.struct('()', [
                                ref.struct('this'),
                                ref.struct('[]', [ref.data('$')]),
                                ref.struct('[]', [ref.data(op.type)]),
                                ref.struct('[]', [ref.data('prototype')]),
                                ref.struct('[]', [ref.data(context.chain[0])]),
                                ref.struct('[]', [ref.data('call')]),
                                ref.struct('(,)', [ref.struct('obj')]),
                                ...context.chain.slice(1).map(field => ref.struct('[]', [ref.data(field)]))
                            ])
                            // prop ^
                            : ref.struct('()', [
                                ref.struct('super'),
                                ref.struct('[]', [ref.data(name)]),
                                ref.struct('(,)')
                            ]),
                ]),
            ],
            '=': bind => [bind.struct('()', [
                    bind.struct('this'),
                    ...bind.hack({ '': (method, belt, ctx) => [
                            call_method_name.call(this, method, (ctx.item_index++) > 0),
                            args_of.call(this, method),
                            ...method.hack(belt),
                        ] }, { item_index: 0 }),
                ])],
            '': (input, belt, context) => {
                if (input.type[0] === '*') {
                    return [
                        input.struct('{,}', input.kids.map(field => {
                            if (field.type === '^')
                                return field.list([field]).hack(belt, context)[0];
                            const field_name = (field.type || field.value).replace(/\?\w*$/, '');
                            return field.struct(':', [
                                field.data(field_name),
                                field.kids[0].type === '<=>'
                                    ? field.struct('=>', [
                                        params_of.call(this, field),
                                        ...field.hack(belt),
                                    ])
                                    : field.hack(belt, { ...context, chain: [...context.chain ?? [], field_name] })[0],
                            ]);
                        }).filter(this.$mol_guard_defined))
                    ];
                }
                if (input.type[0] === '/')
                    return [
                        input.struct('[,]', input.hack(belt, context)),
                    ];
                if (input.type && $mol_tree2_js_is_number(input.type))
                    return [
                        input
                    ];
                if ($mol_view_tree2_class_match(input)) {
                    if (!next)
                        addons.push(decorate());
                    const overrides = [];
                    for (const over of input.kids) {
                        if (over.type[0] === '/')
                            continue;
                        const bind = over.kids[0];
                        if (bind.type === '=>')
                            continue;
                        const over_name = name_of.call(this, over);
                        const body = [
                            args_of.call(this, over),
                            over.struct('()', over.hack(belt, { chain: [over.type] })),
                        ];
                        overrides.push(over.struct('=', [
                            over.struct('()', [
                                over.struct('obj'),
                                over.struct('[]', [
                                    over.data(over_name),
                                ]),
                            ]),
                            over.struct('=>', body),
                        ]));
                    }
                    return [
                        input.struct('const', [
                            input.struct('obj'),
                            input.struct('new', [
                                input.struct('this'),
                                input.struct('[]', [
                                    input.data('$'),
                                ]),
                                input.struct('[]', [
                                    input.data(input.type.replace(/<.+>/g, '')),
                                ]),
                                input.struct('(,)', input.select('/', null).hack(belt)),
                            ]),
                        ]),
                        ...overrides,
                        input.struct('obj'),
                    ];
                }
                return [input];
            },
        });
        members.push(prop.struct('.', [
            prop.data(name),
            params_of.call(this, prop),
            prop.struct('{;}', [
                ...next && !is_delegate ? [
                    prop.struct('if', [
                        prop.struct('(!==)', [
                            prop.struct('next'),
                            prop.struct('undefined'),
                        ]),
                        prop.struct('return', [
                            prop.struct('next'),
                        ]),
                    ]),
                ] : [],
                ...val.slice(0, -1),
                prop.struct('return', val.slice(-1)),
            ]),
        ]));
        return acc;
    }
    function $mol_view_tree2_to_js(descr) {
        descr = $mol_view_tree2_classes(descr);
        const definitions = [];
        for (const klass of descr.kids) {
            const parent = klass.kids[0];
            const props = this.$mol_view_tree2_class_props(klass);
            const addons = [];
            const members = [];
            const acc = { klass, addons, members };
            for (const prop of props) {
                try {
                    klass_body.call(this, acc, prop);
                }
                catch (e) {
                    e.message += ` at ${prop.span}`;
                    $mol_fail_hidden(e);
                }
            }
            definitions.push(klass.struct('=', [
                klass.struct('()', [
                    klass.struct('$'),
                    klass.struct('[]', [
                        klass.data(klass.type),
                    ]),
                ]),
                klass.struct('class', [
                    klass.struct(klass.type),
                    parent.struct('extends', [
                        parent.struct('()', [
                            parent.struct('$'),
                            parent.struct('[]', [
                                parent.data(parent.type),
                            ]),
                        ]),
                    ]),
                    klass.struct('{}', members),
                ]),
            ]), ...addons);
        }
        return descr.list([
            descr.struct(';', definitions)
        ]);
    }
    $.$mol_view_tree2_to_js = $mol_view_tree2_to_js;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_text_to_string(text) {
        let res = '';
        function visit(text, prefix, inline) {
            if (text.type === 'indent') {
                if (inline)
                    res += '\n';
                for (let kid of text.kids) {
                    visit(kid, prefix + '\t', false);
                }
                if (inline)
                    res += prefix;
            }
            else if (text.type === 'line') {
                if (!inline)
                    res += prefix;
                for (let kid of text.kids) {
                    visit(kid, prefix, true);
                }
                if (!inline)
                    res += '\n';
            }
            else {
                if (!inline)
                    res += prefix;
                res += text.text();
                if (!inline)
                    res += '\n';
            }
        }
        for (let kid of text.kids) {
            visit(kid, '', false);
        }
        return res;
    }
    $.$mol_tree2_text_to_string = $mol_tree2_text_to_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    function $mol_vlq_encode(val) {
        const sign = val < 0 ? 1 : 0;
        if (sign)
            val = -val;
        let index = sign | ((val & 0b1111) << 1);
        val >>>= 4;
        let res = '';
        while (val) {
            index |= 1 << 5;
            res += alphabet[index];
            if (!val)
                break;
            index = val & 0b11111;
            val >>>= 5;
        }
        res += alphabet[index];
        return res;
    }
    $.$mol_vlq_encode = $mol_vlq_encode;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_text_to_sourcemap(tree) {
        let col = 1;
        let prev_span;
        let prev_index = 0;
        let prev_col = 1;
        let mappings = '';
        let line = [];
        const file_indexes = new Map();
        const file_sources = new Map();
        function span2index(span) {
            if (file_indexes.has(span.uri))
                return file_indexes.get(span.uri);
            const index = file_indexes.size;
            file_indexes.set(span.uri, index);
            file_sources.set(span.uri, span.source);
            return index;
        }
        function next_line() {
            if (!line.length)
                return;
            mappings += line.join(',') + ';';
            line = [];
            col = 1;
            prev_col = 1;
        }
        function visit(text, prefix, inline) {
            function indent() {
                col += prefix;
            }
            if (inline && text.type === 'indent')
                next_line();
            if (prev_span !== text.span || col === 1) {
                const index = span2index(text.span);
                line.push($mol_vlq_encode(col - prev_col) +
                    $mol_vlq_encode(index - prev_index) +
                    $mol_vlq_encode(text.span.row - (prev_span?.row ?? 1)) +
                    $mol_vlq_encode(text.span.col - (prev_span?.col ?? 1)));
                prev_col = col;
                prev_span = text.span;
                prev_index = index;
            }
            if (text.type === 'indent') {
                for (let kid of text.kids) {
                    visit(kid, prefix + 1, false);
                }
                if (inline)
                    next_line();
            }
            else if (text.type === 'line') {
                if (!inline)
                    indent();
                for (let kid of text.kids) {
                    visit(kid, prefix, true);
                }
                if (!inline)
                    next_line();
            }
            else {
                if (!inline)
                    indent();
                col += text.text().length;
                if (!inline)
                    next_line();
            }
        }
        for (let kid of tree.kids) {
            visit(kid, 0, false);
        }
        next_line();
        const map = {
            version: 3,
            sources: [...file_sources.keys()],
            sourcesContent: [...file_sources.values()],
            mappings,
        };
        return map;
    }
    $.$mol_tree2_text_to_sourcemap = $mol_tree2_text_to_sourcemap;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_sourcemap_url(uri, type = 'js') {
        if (type === 'css')
            return `\n/*# sourceMappingURL=${uri}*/`;
        return `\n//# sourceMappingURL=${uri}`;
    }
    $.$mol_sourcemap_url = $mol_sourcemap_url;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const prefix = '# sourceMappingURL=data:application/json,';
    const end_comment = ' */';
    function $mol_sourcemap_dataurl_decode(data) {
        const index = data.lastIndexOf(prefix);
        if (index === -1)
            return undefined;
        data = data.substring(index + prefix.length);
        if (data.endsWith(end_comment))
            data = data.substring(0, data.length - end_comment.length);
        const decoded = this.decodeURIComponent(data);
        try {
            const map = JSON.parse(decoded);
            if (!map)
                return undefined;
            if (typeof map.mappings === 'string' && map.mappings.startsWith(';;')) {
                map.mappings = map.mappings.substring(2);
            }
            return map;
        }
        catch (e) {
            if (e instanceof Error)
                e.message += ', origin=' + decoded;
            $mol_fail_hidden(e);
        }
    }
    $.$mol_sourcemap_dataurl_decode = $mol_sourcemap_dataurl_decode;
    function $mol_sourcemap_dataurl_encode(map, type = 'js') {
        const str = JSON.stringify({ ...map, mappings: ';;' + map.mappings });
        return this.$mol_sourcemap_url('data:application/json,' + this.encodeURIComponent(str), type);
    }
    $.$mol_sourcemap_dataurl_encode = $mol_sourcemap_dataurl_encode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_text_to_string_mapped(text, type) {
        const code = this.$mol_tree2_text_to_string(text);
        const map = this.$mol_tree2_text_to_sourcemap(text);
        const chunk = this.$mol_sourcemap_dataurl_encode(map, type);
        return code + chunk;
    }
    $.$mol_tree2_text_to_string_mapped = $mol_tree2_text_to_string_mapped;
    function $mol_tree2_text_to_string_mapped_js(text) {
        return this.$mol_tree2_text_to_string_mapped(text, 'js');
    }
    $.$mol_tree2_text_to_string_mapped_js = $mol_tree2_text_to_string_mapped_js;
    function $mol_tree2_text_to_string_mapped_css(text) {
        return this.$mol_tree2_text_to_string_mapped(text, 'css');
    }
    $.$mol_tree2_text_to_string_mapped_css = $mol_tree2_text_to_string_mapped_css;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function is_identifier(tree) {
        if (tree.type)
            return false;
        return /^[a-z_$][a-z_$0-9]*$/i.test(tree.text());
    }
    function $mol_tree2_js_to_text(js) {
        function sequence(open, separator, close) {
            return (input, belt) => [
                input.struct('line', [
                    ...open ? [input.data(open)] : [],
                    input.struct(separator && input.kids.length > 2 ? 'indent' : 'line', [].concat(...input.kids.map((kid, index) => [
                        kid.struct('line', [
                            ...kid.list([kid]).hack(belt),
                            ...(separator && index < input.kids.length - 1) ? [input.data(separator)] : [],
                        ]),
                    ]))),
                    ...close ? [input.data(close)] : [],
                ]),
            ];
        }
        function block(open, separator, close) {
            return (input, belt) => [
                ...open ? [input.data(open)] : [],
                ...input.kids.length === 0 ? [] : [input.struct('indent', input.kids.map((kid, index) => kid.struct('line', [
                        ...kid.list([kid]).hack(belt),
                        ...(separator) ? [input.data(separator)] : [],
                    ])))],
                ...close ? [input.data(close)] : [],
            ];
        }
        function duplet(open, separator, close) {
            return (input, belt) => [
                input.struct('line', [
                    ...open ? [input.data(open)] : [],
                    ...input.list(input.kids.slice(0, 1)).hack(belt),
                    ...(separator && input.kids.length > 1) ? [input.data(separator)] : [],
                    ...input.list(input.kids.slice(1, 2)).hack(belt),
                    ...close ? [input.data(close)] : [],
                ]),
            ];
        }
        function triplet(open, separator12, separator23, close) {
            return (input, belt) => [
                input.struct('line', [
                    ...open ? [input.data(open)] : [],
                    ...input.list(input.kids.slice(0, 1)).hack(belt),
                    ...(separator12 && input.kids.length > 1) ? [input.data(separator12)] : [],
                    ...input.list(input.kids.slice(1, 2)).hack(belt),
                    ...(separator23 && input.kids.length > 2) ? [input.data(separator23)] : [],
                    ...input.list(input.kids.slice(2, 3)).hack(belt),
                    ...close ? [input.data(close)] : [],
                ]),
            ];
        }
        return js.list(js.hack({
            '+': sequence('+'),
            '-': sequence('-'),
            '!': sequence('!'),
            '~': sequence('~'),
            'return': sequence('return '),
            'break': sequence('break '),
            'continue': sequence('continue '),
            'yield': sequence('yield '),
            'yield*': sequence('yield* '),
            'await': sequence('await '),
            'void': sequence('void '),
            'delete': sequence('delete '),
            'typeof': sequence('typeof '),
            'new': sequence('new '),
            '...': sequence('...'),
            '@++': sequence('', '', '++'),
            '@--': sequence('', '', '--'),
            '(in)': sequence('(', ' in ', ')'),
            '(instanceof)': sequence('(', ' instanceof ', ')'),
            '(+)': sequence('(', ' + ', ')'),
            '(-)': sequence('(', ' - ', ')'),
            '(*)': sequence('(', ' * ', ')'),
            '(/)': sequence('(', ' / ', ')'),
            '(%)': sequence('(', ' % ', ')'),
            '(**)': sequence('(', ' ** ', ')'),
            '(<)': sequence('(', ' < ', ')'),
            '(<=)': sequence('(', ' <= ', ')'),
            '(>)': sequence('(', ' > ', ')'),
            '(>=)': sequence('(', ' >= ', ')'),
            '(==)': sequence('(', ' == ', ')'),
            '(!=)': sequence('(', ' != ', ')'),
            '(===)': sequence('(', ' === ', ')'),
            '(!==)': sequence('(', ' !== ', ')'),
            '(<<)': sequence('(', ' << ', ')'),
            '(>>)': sequence('(', ' >> ', ')'),
            '(>>>)': sequence('(', ' >>> ', ')'),
            '(&)': sequence('(', ' & ', ')'),
            '(|)': sequence('(', ' | ', ')'),
            '(^)': sequence('(', ' ^ ', ')'),
            '(&&)': sequence('(', ' && ', ')'),
            '(||)': sequence('(', ' || ', ')'),
            '(,)': sequence('(', ', ', ')'),
            '{;}': block('{', ';', '}'),
            ';': block('', ';', ''),
            '[,]': sequence('[', ', ', ']'),
            '{,}': sequence('{', ', ', '}'),
            '()': sequence('(', '', ')'),
            '{}': block('{', '', '}'),
            '[]': (input, belt) => {
                const first = input.kids[0];
                if (!is_identifier(first))
                    return sequence('[', '', ']')(input, belt);
                else
                    return [input.data('.' + first.text())];
            },
            '?.[]': (input, belt) => {
                const first = input.kids[0];
                if (!is_identifier(first))
                    return sequence('?.[', '', ']')(input, belt);
                else
                    return [input.data('?.' + first.text())];
            },
            ':': (input, belt) => input.kids[0].type
                ? duplet('[', ']: ')(input, belt)
                : duplet('', ': ')(input, belt),
            'let': duplet('let ', ' = '),
            'const': duplet('const ', ' = '),
            'var': duplet('var ', ' = '),
            '=': duplet('', ' = '),
            '+=': duplet('', ' += '),
            '-=': duplet('', ' -= '),
            '*=': duplet('', ' *= '),
            '/=': duplet('', ' /= '),
            '%=': duplet('', ' %= '),
            '**=': duplet('', ' **= '),
            '<<=': duplet('', ' <<= '),
            '>>=': duplet('', ' >>= '),
            '>>>=': duplet('', ' >>>= '),
            '&=': duplet('', ' &= '),
            '|=': duplet('', ' |= '),
            '^=': duplet('', ' ^= '),
            '&&=': duplet('', ' &&= '),
            '||=': duplet('', ' ||= '),
            '=>': duplet('', ' => '),
            'async=>': duplet('async ', ' => '),
            'function': triplet('function '),
            'function*': triplet('function* '),
            'async': triplet('async function '),
            'async*': triplet('async function* '),
            'class': triplet('class ', ' '),
            'extends': sequence('extends ', '', ' '),
            'if': triplet('if', ' ', 'else'),
            '?:': triplet('', ' ? ', ' : '),
            '.': (input, belt) => {
                const first = input.kids[0];
                if (!is_identifier(first))
                    return triplet('[', ']')(input, belt);
                else
                    return [
                        input.data(first.text()),
                        ...input.list(input.kids.slice(1)).hack(belt),
                    ];
            },
            'get': triplet('get [', ']'),
            'set': triplet('set [', ']'),
            'static': triplet('static [', ']'),
            '/./': sequence(),
            '.global': sequence('g'),
            '.multiline': sequence('m'),
            '.ignoreCase': sequence('i'),
            '.source': (input, belt) => [
                input.data('/'),
                input.data(JSON.stringify(input.text()).slice(1, -1)),
                input.data('/'),
            ],
            '``': (input, belt) => {
                return [
                    input.struct('line', [
                        input.data('`'),
                        ...[].concat(...input.kids.map(kid => {
                            if (kid.type) {
                                return [
                                    kid.data('${'),
                                    ...kid.list([kid]).hack(belt),
                                    kid.data('}'),
                                ];
                            }
                            else {
                                return [
                                    input.data(JSON.stringify(kid.text()).slice(1, -1)),
                                ];
                            }
                        })),
                        input.data('`'),
                    ]),
                ];
            },
            '': (input, belt) => {
                // string
                if (!input.type)
                    return [
                        input.data(JSON.stringify(input.text())),
                    ];
                // variable
                if (/^[\w$#][\w0-9$]*$/i.test(input.type))
                    return [
                        input.data(input.type),
                        // ... input.hack( context ),
                    ];
                // number
                if ($mol_tree2_js_is_number(input.type))
                    return [
                        input.data(input.type)
                    ];
                $mol_fail(new SyntaxError(`Wrong node type`));
            },
        }));
    }
    $.$mol_tree2_js_to_text = $mol_tree2_js_to_text;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        // TypeScript compiler, lazy-loaded from a CDN only when the user writes logic.
        const TS_CDN = 'https://cdn.jsdelivr.net/npm/typescript@5.4.5/lib/typescript.js';
        /**
         * A live view.tree + view.ts playground. view.tree is compiled with $mol's own
         * toolchain ($mol_tree2_from_string -> $mol_view_tree2_to_js -> ...); optional
         * view.ts logic is transpiled in the browser by the TypeScript compiler and
         * layered on top as a subclass. We do NOT write a parser.
         *
         * Snippet components must be bundled into this app, so they are force-referenced
         * here (in a doc comment, which MAM keeps) to pull them into the bundle:
         * $mol_view $mol_button_major $mol_button_minor $mol_string $mol_number
         * $mol_text $mol_paragraph $mol_list $mol_row $mol_link $mol_check $mol_switch
         */
        class $bog_smalljs_playground extends $.$bog_smalljs_playground {
            // --- default snippets --------------------------------------------
            default_tree() {
                if (this.seed_tree())
                    return this.seed_tree(); // seeded by an embedder (e.g. course)
                const S = String.fromCharCode(36); // "$" — kept out of MAM's dep scan
                return [
                    `${S}my_demo ${S}mol_view`,
                    `\tcount_text \\0`,
                    `\tinc? null`,
                    `\tsub /`,
                    `\t\t<= Value ${S}mol_view`,
                    `\t\t\tsub / <= count_text`,
                    `\t\t<= Button ${S}mol_button_major`,
                    `\t\t\tclick? <=> inc?`,
                    `\t\t\tsub / <= button_label \\Count up`,
                ].join('\n') + '\n';
            }
            default_ts() {
                // An embedder (e.g. the course) fully controls the ts via seed_ts,
                // even when empty — mirror default_tree's seed gate.
                if (this.seed_tree())
                    return this.seed_ts();
                // Standalone playground: ship a working counter so the default
                // example is live on open (the tree alone has no logic, so inc()
                // would be dead). This does fetch the TS compiler on first render.
                const S = String.fromCharCode(36); // "$" — kept out of MAM's dep scan
                return [
                    `class ${S}my_demo extends ${S}.${S}my_demo {`,
                    `\t@ ${S}mol_mem count( next?: number ) { return next ?? 0 }`,
                    `\t@ ${S}mol_action inc() { this.count( this.count() + 1 ) }`,
                    `\tcount_text() { return String( this.count() ) }`,
                    `}`,
                ].join('\n') + '\n';
            }
            // --- tabs ---------------------------------------------------------
            tab(next) {
                return this.$.$mol_state_arg.value('tab', next) ?? 'tree';
            }
            show_tree() { this.tab('tree'); return null; }
            show_ts() { this.tab('ts'); return null; }
            editor_hint() {
                return this.tab() === 'ts'
                    ? 'Optional — add a class with logic (state, actions), e.g. count() and inc().'
                    : 'Type a view.tree here…';
            }
            // Persistence funnel — standalone stores in the URL hash (shareable); when an
            // embedder sets store_scope (e.g. the course, per lesson), store in localStorage.
            stored(key, next) {
                const scope = this.store_scope();
                if (scope)
                    return this.$.$mol_state_local.value(`${scope}/${key}`, next) ?? null;
                return this.$.$mol_state_arg.value(key, next) ?? null;
            }
            // --- editor sources (immediate) + debounced committed copies ------
            tree_draft(next) {
                if (next !== undefined) {
                    this.schedule('code', next);
                    return next;
                }
                return this.stored('code') || this.default_tree();
            }
            ts_draft(next) {
                if (next !== undefined) {
                    this.schedule('ts', next);
                    return next;
                }
                return this.stored('ts') || this.default_ts();
            }
            tree_committed(next) {
                return next ?? (this.stored('code') || this.default_tree());
            }
            ts_committed(next) {
                return next ?? (this.stored('ts') || this.default_ts());
            }
            // One editor, bound to the active tab's source.
            draft(next) {
                const ts_mode = this.tab() === 'ts';
                if (next !== undefined)
                    return ts_mode ? this.ts_draft(next) : this.tree_draft(next);
                return ts_mode ? this.ts_draft() : this.tree_draft();
            }
            // --- debounce -----------------------------------------------------
            timers = {};
            schedule(key, value) {
                this.timers[key]?.destructor();
                this.timers[key] = new this.$.$mol_after_timeout(400, () => this.commit(key, value));
            }
            commit(key, value) {
                this.stored(key, value);
                if (key === 'ts')
                    this.ts_committed(value);
                else
                    this.tree_committed(value);
            }
            // --- compilation --------------------------------------------------
            // TypeScript compiler, fetched on demand (suspends the preview until ready).
            ts_lib() {
                this.$.$mol_import.script(TS_CDN);
                const ts = globalThis.ts;
                if (!ts)
                    throw new Error('TypeScript compiler is unavailable.');
                return ts;
            }
            compile() {
                const $ = this.$;
                const tree_src = this.tree_committed();
                const ts_src = this.ts_committed();
                const root = /(\$[\w$]+)/.exec(tree_src)?.[1];
                if (!root)
                    throw new Error('No component found — the first line must declare one (a name and a base view).');
                if (/^\$(mol|hyoo|bog|node)_/.test(root)) {
                    throw new Error(`Choose another name — ${root} is reserved by the framework.`);
                }
                // view.tree -> base class, evaluated into the real namespace so child
                // components and cross-references resolve at render time.
                const tree = $.$mol_tree2_from_string(tree_src, 'playground.view.tree');
                const tree_js = $.$mol_tree2_text_to_string_mapped_js($.$mol_tree2_js_to_text($.$mol_view_tree2_to_js(tree)));
                new Function('$', '$mol_mem', '$mol_mem_key', tree_js)($, $.$mol_mem, $.$mol_mem_key);
                // optional view.ts -> subclass with logic, transpiled in the browser.
                if (ts_src.trim()) {
                    const ts = this.ts_lib();
                    const out = ts.transpileModule(ts_src, {
                        compilerOptions: {
                            experimentalDecorators: true,
                            target: ts.ScriptTarget.ES2018,
                            module: ts.ModuleKind.None,
                        },
                    }).outputText;
                    const body = out + `\n;return typeof ${root} !== 'undefined' ? ${root} : null;`;
                    const Sub = new Function('$', '$mol_mem', '$mol_mem_key', '$mol_action', body)($, $.$mol_mem, $.$mol_mem_key, $.$mol_action);
                    if (typeof Sub === 'function')
                        return new Sub();
                }
                const Base = $[root];
                if (typeof Base !== 'function')
                    throw new Error(`Component ${root} could not be built.`);
                return new Base();
            }
            error_box(message) {
                const box = new this.$.$mol_view();
                box.dom_name = () => 'pre';
                box.sub = () => ['⚠ ' + message];
                return box;
            }
            preview_content() {
                try {
                    return [this.compile()];
                }
                catch (error) {
                    if (error instanceof Promise)
                        throw error; // TS still loading — keep the loading state
                    return [this.error_box(error instanceof Error ? error.message : String(error))];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $bog_smalljs_playground.prototype, "tab", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_playground.prototype, "show_tree", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_playground.prototype, "show_ts", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_playground.prototype, "tree_draft", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_playground.prototype, "ts_draft", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_playground.prototype, "tree_committed", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_playground.prototype, "ts_committed", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_playground.prototype, "schedule", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_playground.prototype, "commit", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_playground.prototype, "preview_content", null);
        $$.$bog_smalljs_playground = $bog_smalljs_playground;
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    const line = { width: '1px', style: 'solid', color: $bog_builderui_tokens.line };
    const label = {
        flex: { shrink: 0 },
        padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.875), right: rem(0.875) },
        font: { size: rem(0.6875), weight: 700 },
        color: $bog_builderui_tokens.shade,
        textTransform: 'uppercase',
        letterSpacing: rem(0.03),
        background: { color: $bog_builderui_tokens.back },
        border: { bottom: line },
    };
    const pane = {
        flex: { direction: 'column' },
        minWidth: 0,
        minHeight: 0,
        overflow: { x: 'hidden', y: 'hidden' },
    };
    const tab = {
        flex: { grow: 0 },
        padding: { top: rem(0.4), bottom: rem(0.4), left: rem(0.75), right: rem(0.75) },
        border: { radius: rem(0) },
        font: { size: rem(0.75), weight: 600 },
        color: $bog_builderui_tokens.shade,
        background: { color: $bog_builderui_tokens.back },
    };
    const tab_active = {
        color: $bog_builderui_tokens.special,
        background: { color: $bog_builderui_tokens.card },
    };
    $mol_style_define($bog_smalljs_playground, {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        flex: { grow: 1 },
        minWidth: 0, // shrink to the container (e.g. embedded in the course column) instead of forcing content width
        minHeight: 0,
        height: $mol_style_func.calc('100vh - 4rem'),
        background: { color: $bog_builderui_tokens.back },
        Editor_pane: {
            ...pane,
            border: { right: line },
        },
        Preview_pane: pane,
        Tabs: {
            flex: { direction: 'row', shrink: 0 },
            align: { items: 'stretch' },
            border: { bottom: line },
            background: { color: $bog_builderui_tokens.back },
        },
        Tree_tab: tab,
        Ts_tab: tab,
        Preview_label: label,
        Editor: {
            flex: { grow: 1 },
            minHeight: 0,
            border: { radius: rem(0) },
            font: { family: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', size: rem(0.8125) },
        },
        Preview: {
            flex: { direction: 'column', grow: 1 },
            minHeight: 0,
            overflow: { y: 'auto' },
            padding: $mol_gap.block,
            color: $bog_builderui_tokens.text,
        },
        '@': {
            bog_smalljs_pg_tab: {
                tree: { Tree_tab: tab_active },
                ts: { Ts_tab: tab_active },
            },
        },
        '@media': {
            '(max-width: 47.9375rem)': {
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr 1fr',
                Editor_pane: {
                    ...pane,
                    border: { right: { width: '0px', style: 'solid', color: $bog_builderui_tokens.line }, bottom: line },
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$bog_smalljs_course) = class $bog_smalljs_course extends ($.$mol_view) {
		lesson_links(){
			return [];
		}
		Lesson_list(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.lesson_links()));
			return obj;
		}
		Instruction(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.lesson_md()));
			return obj;
		}
		Status(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.status_text())]);
			return obj;
		}
		prev_arg(){
			return {};
		}
		prev_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_course_prev_label"));
		}
		Prev(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.prev_arg()));
			(obj.sub) = () => ([(this.prev_label())]);
			return obj;
		}
		toggle_solution(next){
			if(next !== undefined) return next;
			return null;
		}
		Solution_btn(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.toggle_solution(next)));
			(obj.sub) = () => ([(this.solution_label())]);
			return obj;
		}
		next_arg(){
			return {};
		}
		next_label(){
			return (this.$.$mol_locale.text("$bog_smalljs_course_next_label"));
		}
		Next(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.next_arg()));
			(obj.sub) = () => ([(this.next_label())]);
			return obj;
		}
		Controls(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Prev()), 
				(this.Solution_btn()), 
				(this.Next())
			]);
			return obj;
		}
		Solution_block(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.solution_md()));
			return obj;
		}
		Aside(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Lesson_list()), 
				(this.Instruction()), 
				(this.Status()), 
				(this.Controls()), 
				(this.Solution_block())
			]);
			return obj;
		}
		editor_host(){
			return [];
		}
		Editor_host(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.editor_host()));
			return obj;
		}
		lesson_arg(id){
			return {};
		}
		lesson_link_label(id){
			return "";
		}
		lesson(){
			return "hello";
		}
		solution_shown(next){
			if(next !== undefined) return next;
			return false;
		}
		editor_seed_tree(id){
			return "";
		}
		editor_seed_ts(id){
			return "";
		}
		editor_store_key(id){
			return "";
		}
		lesson_md(){
			return "";
		}
		status_text(){
			return "";
		}
		solution_label(){
			return "";
		}
		solution_md(){
			return "";
		}
		sub(){
			return [(this.Aside()), (this.Editor_host())];
		}
		Lesson_link(id){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.lesson_arg(id)));
			(obj.sub) = () => ([(this.lesson_link_label(id))]);
			return obj;
		}
		Editor(id){
			const obj = new this.$.$bog_smalljs_playground();
			(obj.store_scope) = () => ((this.editor_store_key(id)));
			(obj.seed_tree) = () => ((this.editor_seed_tree(id)));
			(obj.seed_ts) = () => ((this.editor_seed_ts(id)));
			return obj;
		}
	};
	($mol_mem(($.$bog_smalljs_course.prototype), "Lesson_list"));
	($mol_mem(($.$bog_smalljs_course.prototype), "Instruction"));
	($mol_mem(($.$bog_smalljs_course.prototype), "Status"));
	($mol_mem(($.$bog_smalljs_course.prototype), "Prev"));
	($mol_mem(($.$bog_smalljs_course.prototype), "toggle_solution"));
	($mol_mem(($.$bog_smalljs_course.prototype), "Solution_btn"));
	($mol_mem(($.$bog_smalljs_course.prototype), "Next"));
	($mol_mem(($.$bog_smalljs_course.prototype), "Controls"));
	($mol_mem(($.$bog_smalljs_course.prototype), "Solution_block"));
	($mol_mem(($.$bog_smalljs_course.prototype), "Aside"));
	($mol_mem(($.$bog_smalljs_course.prototype), "Editor_host"));
	($mol_mem(($.$bog_smalljs_course.prototype), "solution_shown"));
	($mol_mem_key(($.$bog_smalljs_course.prototype), "Lesson_link"));
	($mol_mem_key(($.$bog_smalljs_course.prototype), "Editor"));


;
"use strict";
var $;
(function ($) {
    /**
     * Interactive course lessons. GENERATED by content/gen.cjs — edit the lessons
     * array there and re-run the generator. Code snippets are embedded escaped so
     * their $mol_* examples are not mistaken for module dependencies.
     */
    class $bog_smalljs_lessons extends $mol_object2 {
        static all() {
            return [
                this.lesson('hello'),
                this.lesson('views'),
                this.lesson('state'),
                this.lesson('events'),
                this.lesson('routing'),
            ];
        }
        static ids() {
            return ['hello', 'views', 'state', 'events', 'routing'];
        }
        static map() {
            return {
                'hello': {
                    id: 'hello',
                    title: "Hello World",
                    expect: "Hello",
                    expect_in: 'tree',
                    md: "# Hello World\n\nWelcome! On the left is a live \u0024mol editor — **view.tree** describes structure and the result renders on the right.\n\nRight now the component shows a placeholder. Change the text after the `\\` and watch the preview update instantly.\n\n**Goal:** make the greeting say hello to \u0024mol.",
                    start_tree: "\u0024my_demo \u0024mol_view\n\tsub /\n\t\t<= Greeting \u0024mol_view\n\t\t\tsub / <= greeting \\Edit me\n",
                    start_ts: "",
                    solution_tree: "\u0024my_demo \u0024mol_view\n\tsub /\n\t\t<= Greeting \u0024mol_view\n\t\t\tsub / <= greeting \\Hello, \u0024mol!\n",
                    solution_ts: "",
                },
                'views': {
                    id: 'views',
                    title: "Views",
                    expect: "Subtitle",
                    expect_in: 'tree',
                    md: "# Views\n\nA view is built from other views. Here `\u0024my_demo` has one child; add a second so the card shows a title *and* a subtitle.\n\n**Goal:** add a `Subtitle` sub-view under `sub /`, with its own text.",
                    start_tree: "\u0024my_demo \u0024mol_view\n\tsub /\n\t\t<= Title \u0024mol_view\n\t\t\tsub / <= title \\My component\n",
                    start_ts: "",
                    solution_tree: "\u0024my_demo \u0024mol_view\n\tsub /\n\t\t<= Title \u0024mol_view\n\t\t\tsub / <= title \\My component\n\t\t<= Subtitle \u0024mol_view\n\t\t\tsub / <= subtitle \\Built from views\n",
                    solution_ts: "",
                },
                'state': {
                    id: 'state',
                    title: "State",
                    expect: "\u0024mol_mem",
                    expect_in: 'ts',
                    md: "# State\n\nLogic lives in **view.ts** — switch to that tab. `@ \u0024mol_mem` makes a value reactive: everything that reads it updates on its own.\n\n**Goal:** in view.ts, give the component a reactive `count()` and a `count_text()` that returns it as a string, so the preview shows a number.\n\nStuck? Press **Solution**.",
                    start_tree: "\u0024my_demo \u0024mol_view\n\tcount_text \\?\n\tsub /\n\t\t<= Value \u0024mol_view\n\t\t\tsub / <= count_text\n",
                    start_ts: "",
                    solution_tree: "\u0024my_demo \u0024mol_view\n\tcount_text \\?\n\tsub /\n\t\t<= Value \u0024mol_view\n\t\t\tsub / <= count_text\n",
                    solution_ts: "class \u0024my_demo extends \u0024.\u0024my_demo {\n\t@ \u0024mol_mem count( next?: number ) { return next ?? 5 }\n\tcount_text() { return String( this.count() ) }\n}\n",
                },
                'events': {
                    id: 'events',
                    title: "Events",
                    expect: "\u0024mol_action",
                    expect_in: 'ts',
                    md: "# Events\n\nInteractivity comes from event handlers. The view.tree already wires the button’s `click` to an `inc?` action — you implement `inc` in view.ts as a `@ \u0024mol_action` that changes state.\n\n**Goal:** make the button increase the count on each click.",
                    start_tree: "\u0024my_demo \u0024mol_view\n\tcount_text \\0\n\tinc? null\n\tsub /\n\t\t<= Value \u0024mol_view\n\t\t\tsub / <= count_text\n\t\t<= Button \u0024mol_button_major\n\t\t\tclick? <=> inc?\n\t\t\tsub / <= button_label \\+1\n",
                    start_ts: "",
                    solution_tree: "\u0024my_demo \u0024mol_view\n\tcount_text \\0\n\tinc? null\n\tsub /\n\t\t<= Value \u0024mol_view\n\t\t\tsub / <= count_text\n\t\t<= Button \u0024mol_button_major\n\t\t\tclick? <=> inc?\n\t\t\tsub / <= button_label \\+1\n",
                    solution_ts: "class \u0024my_demo extends \u0024.\u0024my_demo {\n\t@ \u0024mol_mem count( next?: number ) { return next ?? 0 }\n\t@ \u0024mol_action inc() { this.count( this.count() + 1 ) }\n\tcount_text() { return String( this.count() ) }\n}\n",
                },
                'routing': {
                    id: 'routing',
                    title: "Routing",
                    expect: "\u0024mol_state_arg",
                    expect_in: 'ts',
                    md: "# Routing\n\nThe URL is just reactive state. `\u0024mol_state_arg` reads and writes a query parameter, so a value survives reloads and is shareable.\n\n**Goal:** back the input with a URL argument named `name` in view.ts, and echo it below.",
                    start_tree: "\u0024my_demo \u0024mol_view\n\tname? \\\n\techo \\\n\tsub /\n\t\t<= Field \u0024mol_string\n\t\t\tvalue? <=> name?\n\t\t\thint \\Type your name\n\t\t<= Echo \u0024mol_view\n\t\t\tsub / <= echo\n",
                    start_ts: "",
                    solution_tree: "\u0024my_demo \u0024mol_view\n\tname? \\\n\techo \\\n\tsub /\n\t\t<= Field \u0024mol_string\n\t\t\tvalue? <=> name?\n\t\t\thint \\Type your name\n\t\t<= Echo \u0024mol_view\n\t\t\tsub / <= echo\n",
                    solution_ts: "class \u0024my_demo extends \u0024.\u0024my_demo {\n\t@ \u0024mol_mem name( next?: string ) { return \u0024.\u0024mol_state_arg.value( 'name', next ) ?? '' }\n\techo() { return this.name() ? 'Hello, ' + this.name() + '!' : '' }\n}\n",
                },
            };
        }
        static lesson(id) {
            return this.map()[id] ?? null;
        }
        static first() { return this.ids()[0]; }
    }
    $.$bog_smalljs_lessons = $bog_smalljs_lessons;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const Lessons = $bog_smalljs_lessons;
        class $bog_smalljs_course extends $.$bog_smalljs_course {
            lesson(next) {
                return this.$.$mol_state_arg.value('lesson', next) ?? Lessons.first();
            }
            current() {
                return Lessons.lesson(this.lesson());
            }
            lesson_md() {
                return this.current()?.md ?? '# Not found';
            }
            ids() {
                return Lessons.ids();
            }
            // --- lesson list --------------------------------------------------
            lesson_links() {
                return this.ids().map(id => this.Lesson_link(id));
            }
            lesson_arg(id) {
                return { section: 'course', page: null, lesson: id };
            }
            lesson_link_label(id) {
                const num = this.ids().indexOf(id) + 1;
                const title = Lessons.lesson(id)?.title ?? id;
                return `${this.done(id) ? '✓ ' : ''}${num}. ${title}`;
            }
            // --- embedded editor (one per lesson, seeded + scoped) ------------
            editor_host() {
                return [this.Editor(this.lesson())];
            }
            editor_seed_tree(id) {
                return Lessons.lesson(id)?.start_tree ?? '';
            }
            editor_seed_ts(id) {
                return Lessons.lesson(id)?.start_ts ?? '';
            }
            editor_store_key(id) {
                return `smalljs/course/${id}`;
            }
            // --- solution -----------------------------------------------------
            toggle_solution() {
                this.solution_shown(!this.solution_shown());
                return null;
            }
            solution_label() {
                return this.solution_shown() ? 'Hide solution' : 'Show solution';
            }
            solution_md() {
                const lesson = this.current();
                if (!this.solution_shown() || !lesson)
                    return '';
                const parts = ['## Solution', '', '```tree', lesson.solution_tree.trimEnd(), '```'];
                if (lesson.solution_ts.trim()) {
                    parts.push('', '```typescript', lesson.solution_ts.trimEnd(), '```');
                }
                return parts.join('\n');
            }
            // --- auto-check + progress ----------------------------------------
            // Current source for a lesson (localStorage edit, or the starter).
            lesson_source(lesson) {
                const key = lesson.expect_in === 'ts' ? 'ts' : 'code';
                const stored = this.$.$mol_state_local.value(`smalljs/course/${lesson.id}/${key}`);
                const seed = lesson.expect_in === 'ts' ? lesson.start_ts : lesson.start_tree;
                return (stored ?? seed);
            }
            passed(lesson) {
                return this.lesson_source(lesson).includes(lesson.expect);
            }
            done(id) {
                const lesson = Lessons.lesson(id);
                return lesson ? this.passed(lesson) : false;
            }
            status_text() {
                const lesson = this.current();
                if (!lesson)
                    return '';
                return this.passed(lesson)
                    ? '✓ Looks good — move on when you are ready.'
                    : 'Edit the code on the right to complete this step.';
            }
            // --- prev / next --------------------------------------------------
            nav_index() {
                return this.ids().indexOf(this.lesson());
            }
            prev_arg() {
                const index = this.nav_index();
                return { section: 'course', page: null, lesson: index > 0 ? this.ids()[index - 1] : this.lesson() };
            }
            next_arg() {
                const index = this.nav_index();
                const ids = this.ids();
                return { section: 'course', page: null, lesson: index < ids.length - 1 ? ids[index + 1] : this.lesson() };
            }
        }
        __decorate([
            $mol_action
        ], $bog_smalljs_course.prototype, "toggle_solution", null);
        $$.$bog_smalljs_course = $bog_smalljs_course;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    const line = { width: '1px', style: 'solid', color: $bog_builderui_tokens.line };
    $mol_style_define($bog_smalljs_course, {
        display: 'grid',
        gridTemplateColumns: '22rem 1fr',
        flex: { grow: 1 },
        minHeight: 0,
        height: $mol_style_func.calc('100vh - 4rem'),
        background: { color: $bog_builderui_tokens.back },
        Aside: {
            flex: { direction: 'column' },
            minHeight: 0,
            overflow: { y: 'auto' },
            gap: $mol_gap.block,
            padding: { top: $mol_gap.block, bottom: $mol_gap.block, left: rem(1.25), right: rem(1.25) },
            border: { right: line },
        },
        Lesson_list: {
            flex: { direction: 'column' },
            gap: rem(0.0625),
            padding: { bottom: rem(0.5) },
            border: { bottom: line },
        },
        Lesson_link: {
            flex: { direction: 'row' },
            justify: { content: 'flex-start' },
            padding: { top: rem(0.3), bottom: rem(0.3), left: rem(0.5), right: rem(0.5) },
            border: { radius: rem(0.375) },
            color: $bog_builderui_tokens.shade,
            font: { size: rem(0.8125), weight: 500 },
            ':hover': { background: { color: $bog_builderui_tokens.hover }, color: $bog_builderui_tokens.text },
            '@': {
                mol_link_current: {
                    true: {
                        color: $bog_builderui_tokens.special,
                        background: { color: $bog_builderui_tokens.hover },
                        font: { weight: 600 },
                    },
                },
            },
        },
        Instruction: {
            flex: { direction: 'column' },
        },
        Status: {
            padding: { top: rem(0.5), bottom: rem(0.5), left: rem(0.75), right: rem(0.75) },
            border: { radius: rem(0.375) },
            background: { color: $bog_builderui_tokens.card },
            color: $bog_builderui_tokens.shade,
            font: { size: rem(0.8125) },
        },
        Controls: {
            flex: { direction: 'row', wrap: 'wrap' },
            align: { items: 'center' },
            justify: { content: 'space-between' },
            gap: $mol_gap.text,
        },
        Solution_block: {
            flex: { direction: 'column' },
        },
        Editor_host: {
            display: 'flex',
            minWidth: 0,
            minHeight: 0,
        },
        '@media': {
            '(max-width: 47.9375rem)': {
                gridTemplateColumns: '1fr',
                gridTemplateRows: 'auto auto',
                height: 'auto',
                Aside: {
                    flex: { direction: 'column' },
                    minHeight: 0,
                    overflow: { y: 'visible' },
                    gap: $mol_gap.block,
                    padding: { top: $mol_gap.block, bottom: $mol_gap.block, left: rem(1.25), right: rem(1.25) },
                    border: { right: { width: '0px', style: 'solid', color: $bog_builderui_tokens.line }, bottom: line },
                },
            },
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
	($.$bog_smalljs_app) = class $bog_smalljs_app extends ($.$bog_builderui_div) {
		hotkeys(){
			return null;
		}
		Theme(){
			const obj = new this.$.$bog_theme_auto();
			(obj.theme_light) = () => ("$mol_theme_calm_light");
			(obj.theme_dark) = () => ("$mol_theme_calm_dark");
			(obj.themes) = () => (["$mol_theme_calm_light", "$mol_theme_calm_dark"]);
			return obj;
		}
		Top(){
			const obj = new this.$.$bog_smalljs_top();
			(obj.search_click) = (next) => ((this.search_toggle(next)));
			(obj.Theme) = () => ((this.Theme()));
			return obj;
		}
		body_content(){
			return [];
		}
		Body(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.body_content()));
			return obj;
		}
		Search(){
			const obj = new this.$.$bog_smalljs_search();
			(obj.open) = (next) => ((this.search_open(next)));
			return obj;
		}
		section(next){
			if(next !== undefined) return next;
			return "home";
		}
		search_open(next){
			if(next !== undefined) return next;
			return false;
		}
		search_toggle(next){
			if(next !== undefined) return next;
			return null;
		}
		lights(){
			return "light";
		}
		attr(){
			return {
				...(super.attr()), 
				"bog_builderui_lights": (this.lights()), 
				"bog_builderui_base": "zinc", 
				"bog_builderui_theme": "sky", 
				"bog_builderui_chart": "yellow", 
				"bog_builderui_radius": "medium", 
				"bog_builderui_font_body": "inter", 
				"bog_builderui_font_head": "eb-garamond"
			};
		}
		auto(){
			return [(this.hotkeys())];
		}
		sub(){
			return [
				(this.Top()), 
				(this.Body()), 
				(this.Search())
			];
		}
		plugins(){
			return [(this.Theme())];
		}
		Landing(){
			const obj = new this.$.$bog_smalljs_landing();
			return obj;
		}
		Docs(){
			const obj = new this.$.$bog_smalljs_docs();
			return obj;
		}
		Playground(){
			const obj = new this.$.$bog_smalljs_playground();
			return obj;
		}
		Course(){
			const obj = new this.$.$bog_smalljs_course();
			return obj;
		}
	};
	($mol_mem(($.$bog_smalljs_app.prototype), "Theme"));
	($mol_mem(($.$bog_smalljs_app.prototype), "Top"));
	($mol_mem(($.$bog_smalljs_app.prototype), "Body"));
	($mol_mem(($.$bog_smalljs_app.prototype), "Search"));
	($mol_mem(($.$bog_smalljs_app.prototype), "section"));
	($mol_mem(($.$bog_smalljs_app.prototype), "search_open"));
	($mol_mem(($.$bog_smalljs_app.prototype), "search_toggle"));
	($mol_mem(($.$bog_smalljs_app.prototype), "Landing"));
	($mol_mem(($.$bog_smalljs_app.prototype), "Docs"));
	($mol_mem(($.$bog_smalljs_app.prototype), "Playground"));
	($mol_mem(($.$bog_smalljs_app.prototype), "Course"));


;
"use strict";
var $;
(function ($) {
    function $mol_offline() { }
    $.$mol_offline = $mol_offline;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const blacklist = new Set([
        '//cse.google.com/adsense/search/async-ads.js'
    ]);
    /** Installs service worker proxy, which caches all requests and respond from cache on http errors. */
    function $mol_offline_web() {
        if (typeof window === 'undefined') {
            self.addEventListener('install', (event) => {
                ;
                self.skipWaiting();
            });
            self.addEventListener('activate', (event) => {
                // caches.delete( '$mol_offline' )
                ;
                self.clients.claim();
                $$.$mol_log3_done({
                    place: '$mol_offline',
                    message: 'Activated',
                });
            });
            self.addEventListener('fetch', (event) => {
                const request = event.request;
                // console.log( 'FETCH', request.mode, request.cache, request.url )
                if (blacklist.has(request.url.replace(/^https?:/, ''))) {
                    return event.respondWith(new Response(null, {
                        status: 418,
                        statusText: 'Blocked'
                    }));
                }
                if (request.method !== 'GET')
                    return;
                if (!/^https?:/.test(request.url))
                    return;
                if (/\?/.test(request.url))
                    return;
                if (request.cache === 'no-store')
                    return;
                const fetch_data = () => fetch(new Request(request, { credentials: 'omit' })).then(response => {
                    if (response.status !== 200)
                        return response;
                    event.waitUntil(caches.open('$mol_offline').then(cache => cache.put(request, response)));
                    return response.clone();
                });
                const enrich = (response) => {
                    // console.log( 'ENRICH', response.status, response.url )
                    if (!response.status)
                        return response;
                    const headers = new Headers(response.headers);
                    headers.set("$mol_offline", "");
                    headers.set("Origin-Agent-Cluster", "?1"); // prevent thread sharing
                    // headers.set( "Cross-Origin-Embedder-Policy", "credentialless" )
                    // headers.set( "Cross-Origin-Resource-Policy", "cross-origin" )
                    // headers.set( "Cross-Origin-Opener-Policy", "same-origin" )
                    return new Response(response.body, {
                        status: response.status,
                        statusText: response.statusText,
                        headers,
                    });
                };
                const fresh = request.cache === 'force-cache' ? null : fetch_data();
                if (fresh)
                    event.waitUntil(fresh.then(enrich));
                event.respondWith(caches.match(request).then(cached => request.cache === 'no-cache' || request.cache === 'reload'
                    ? (cached
                        ? fresh
                            .then(actual => {
                            if (actual.status === cached.status)
                                return actual;
                            throw new Error(`${actual.status}${actual.statusText ? ` ${actual.statusText}` : ''}`, { cause: actual });
                        })
                            .catch((err) => {
                            const cloned = cached.clone();
                            const message = `${err.cause instanceof Response ? '' : '500 '}${err.message} $mol_offline fallback to cache`;
                            cloned.headers.set('$mol_offline_remote_status', message);
                            return cloned;
                        })
                        : fresh)
                    : (cached || fresh || fetch_data())).then(enrich));
            });
            self.addEventListener('beforeinstallprompt', (event) => event.prompt());
        }
        else if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
            console.warn('HTTPS or localhost is required for service workers.');
        }
        else if (!navigator.serviceWorker) {
            console.warn('Service Worker is not supported.');
        }
        else {
            $mol_dom.addEventListener('DOMContentLoaded', () => {
                navigator.serviceWorker.register('web.js').then(reg => {
                    reg.addEventListener('updatefound', () => {
                        $$.$mol_log3_rise({
                            place: '$mol_offline',
                            message: 'Outdated',
                        });
                        const worker = reg.installing;
                        worker.addEventListener('statechange', () => {
                            if (worker.state !== 'activated')
                                return;
                            window.location.reload();
                        });
                    });
                });
            });
        }
    }
    $.$mol_offline_web = $mol_offline_web;
    $.$mol_offline = $mol_offline_web;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    try {
        $mol_offline();
    }
    catch (error) {
        console.error(error);
    }
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_smalljs_app extends $.$bog_smalljs_app {
            section(next) {
                return $mol_state_arg.value('section', next) ?? 'home';
            }
            open_search() {
                this.search_open(true);
                this.Search().focus();
                return null;
            }
            search_toggle() {
                if (this.search_open())
                    this.search_open(false);
                else
                    this.open_search();
                return null;
            }
            // Global ⌘K / Ctrl+K opens the search overlay. Registered on window
            // (via the `auto` binding) rather than a $mol_hotkey plugin: when
            // nothing inside the app is focused the keydown targets <body>, which
            // never reaches a plugin bound to the app-root element. `event.code`
            // is layout-independent so it matches the physical K key.
            hotkeys() {
                const win = this.$.$mol_dom_context;
                win.addEventListener('keydown', (event) => {
                    if (event.defaultPrevented)
                        return;
                    if (!(event.metaKey || event.ctrlKey))
                        return;
                    if (event.code !== 'KeyK')
                        return;
                    event.preventDefault();
                    this.open_search();
                });
                return null;
            }
            lights() {
                return this.Theme().is_light_now() ? 'light' : 'dark';
            }
            body_content() {
                switch (this.section()) {
                    case 'docs': return [this.Docs()];
                    case 'playground': return [this.Playground()];
                    case 'course': return [this.Course()];
                    default: return [this.Landing()];
                }
            }
        }
        __decorate([
            $mol_action
        ], $bog_smalljs_app.prototype, "open_search", null);
        __decorate([
            $mol_action
        ], $bog_smalljs_app.prototype, "search_toggle", null);
        __decorate([
            $mol_mem
        ], $bog_smalljs_app.prototype, "hotkeys", null);
        $$.$bog_smalljs_app = $bog_smalljs_app;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_smalljs_app, {
        flex: { direction: 'column' },
        height: '100vh',
        overflow: { y: 'auto', x: 'hidden' },
        background: { color: $bog_builderui_tokens.back },
        color: $bog_builderui_tokens.text,
        Body: {
            flex: { direction: 'column', grow: 1 },
        },
    });
})($ || ($ = {}));


export default $
//# sourceMappingURL=web.js.map
