declare let _$_: {
    new (): {};
} & typeof globalThis;
declare class $ extends _$_ {
}
declare namespace $ {
    export type $ = typeof $$;
    export class $$ extends $ {
        static $: $;
    }
    namespace $$ {
        type $$ = $;
    }
    export {};
}

declare namespace $ {
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
}

declare namespace $ {
    var $mol_dom: typeof globalThis;
}

declare namespace $ {
    function $mol_style_attach(id: string, text: string): HTMLStyleElement | null;
}

declare namespace $ {
    class $mol_promise<Result = void> extends Promise<Result> {
        done: (value: Result | PromiseLike<Result>) => void;
        fail: (reason?: any) => void;
        constructor(executor?: (done: (value: Result | PromiseLike<Result>) => void, fail: (reason?: any) => void) => void);
    }
}

declare namespace $ {
    class $mol_promise_blocker<Result> extends $mol_promise<Result> {
        static [Symbol.toStringTag]: string;
    }
}

declare namespace $ {
    class $mol_decor<Value> {
        readonly value: Value;
        constructor(value: Value);
        prefix(): string;
        valueOf(): Value;
        postfix(): string;
        toString(): string;
    }
}

declare namespace $ {
    type $mol_style_unit_length = '%' | 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt' | 'cap' | 'ch' | 'em' | 'rem' | 'ex' | 'ic' | 'lh' | 'rlh' | 'vh' | 'vw' | 'vi' | 'vb' | 'vmin' | 'vmax';
    type $mol_style_unit_angle = 'deg' | 'rad' | 'grad' | 'turn';
    type $mol_style_unit_time = 's' | 'ms';
    type $mol_style_unit_any = $mol_style_unit_length | $mol_style_unit_angle | $mol_style_unit_time;
    type $mol_style_unit_str<Quanity extends $mol_style_unit_any = $mol_style_unit_any> = `${number}${Quanity}`;
    /**
     * CSS Units
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_unit<Literal extends $mol_style_unit_any> extends $mol_decor<number> {
        readonly literal: Literal;
        constructor(value: number, literal: Literal);
        postfix(): Literal;
        static per(value: number): `${number}%`;
        static px(value: number): `${number}px`;
        static mm(value: number): `${number}mm`;
        static cm(value: number): `${number}cm`;
        static Q(value: number): `${number}Q`;
        static in(value: number): `${number}in`;
        static pc(value: number): `${number}pc`;
        static pt(value: number): `${number}pt`;
        static cap(value: number): `${number}cap`;
        static ch(value: number): `${number}ch`;
        static em(value: number): `${number}em`;
        static rem(value: number): `${number}rem`;
        static ex(value: number): `${number}ex`;
        static ic(value: number): `${number}ic`;
        static lh(value: number): `${number}lh`;
        static rlh(value: number): `${number}rlh`;
        static vh(value: number): `${number}vh`;
        static vw(value: number): `${number}vw`;
        static vi(value: number): `${number}vi`;
        static vb(value: number): `${number}vb`;
        static vmin(value: number): `${number}vmin`;
        static vmax(value: number): `${number}vmax`;
        static deg(value: number): `${number}deg`;
        static rad(value: number): `${number}rad`;
        static grad(value: number): `${number}grad`;
        static turn(value: number): `${number}turn`;
        static s(value: number): `${number}s`;
        static ms(value: number): `${number}ms`;
    }
}

declare namespace $ {
    type $mol_style_func_name = 'calc' | 'hsla' | 'rgba' | 'var' | 'clamp' | 'scale' | 'cubic-bezier' | 'linear' | 'steps' | $mol_style_func_image | $mol_style_func_filter;
    type $mol_style_func_image = 'url' | 'linear-gradient' | 'radial-gradient' | 'conic-gradient';
    type $mol_style_func_filter = 'blur' | 'brightness' | 'contrast' | 'drop-shadow' | 'grayscale' | 'hue-rotate' | 'invert' | 'opacity' | 'sepia' | 'saturate';
    /**
     * CSS Functions
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_func<Name extends $mol_style_func_name, Value = unknown> extends $mol_decor<Value> {
        readonly name: Name;
        constructor(name: Name, value: Value);
        prefix(): string;
        postfix(): string;
        static linear_gradient<Value>(value: Value): $mol_style_func<"linear-gradient", Value>;
        static radial_gradient<Value>(value: Value): $mol_style_func<"radial-gradient", Value>;
        static calc<Value>(value: Value): $mol_style_func<"calc", Value>;
        static vary<Name extends string, Value extends string>(name: Name, defaultValue?: Value): $mol_style_func<"var", Name | (Name | Value)[]>;
        static url<Href extends string>(href: Href): $mol_style_func<"url", string>;
        static hsla(hue: number | $mol_style_func<'var'>, saturation: number, lightness: number, alpha: number): $mol_style_func<"hsla", (number | `${number}%` | $mol_style_func<"var", unknown>)[]>;
        static clamp(min: $mol_style_unit_str<any>, mid: $mol_style_unit_str<any>, max: $mol_style_unit_str<any>): $mol_style_func<"clamp", `${number}${any}`[]>;
        static rgba(red: number | $mol_style_func<'var'>, green: number | $mol_style_func<'var'>, blue: number | $mol_style_func<'var'>, alpha: number | $mol_style_func<'var'>): $mol_style_func<"rgba", (number | $mol_style_func<"var", unknown>)[]>;
        static scale(zoom: number): $mol_style_func<"scale", number[]>;
        static linear(...breakpoints: Array<number | [number, number | $mol_style_unit_str<'%'>]>): $mol_style_func<"linear", string[]>;
        static cubic_bezier(x1: number, y1: number, x2: number, y2: number): $mol_style_func<"cubic-bezier", number[]>;
        static steps(value: number, step_position: 'jump-start' | 'jump-end' | 'jump-none' | 'jump-both' | 'start' | 'end'): $mol_style_func<"steps", (number | "end" | "start" | "jump-start" | "jump-end" | "jump-none" | "jump-both")[]>;
        static blur(value?: $mol_style_unit_str<$mol_style_unit_length>): $mol_style_func<"blur", string>;
        static brightness(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"brightness", string | number>;
        static contrast(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"contrast", string | number>;
        static drop_shadow(color: $mol_style_properties_color, x_offset: $mol_style_unit_str<$mol_style_unit_length>, y_offset: $mol_style_unit_str<$mol_style_unit_length>, blur_radius?: $mol_style_unit_str<$mol_style_unit_length>): $mol_style_func<"drop-shadow", readonly [$mol_style_properties_color, `${number}%` | `${number}px` | `${number}mm` | `${number}cm` | `${number}Q` | `${number}in` | `${number}pc` | `${number}pt` | `${number}cap` | `${number}ch` | `${number}em` | `${number}rem` | `${number}ex` | `${number}ic` | `${number}lh` | `${number}rlh` | `${number}vh` | `${number}vw` | `${number}vi` | `${number}vb` | `${number}vmin` | `${number}vmax`, `${number}%` | `${number}px` | `${number}mm` | `${number}cm` | `${number}Q` | `${number}in` | `${number}pc` | `${number}pt` | `${number}cap` | `${number}ch` | `${number}em` | `${number}rem` | `${number}ex` | `${number}ic` | `${number}lh` | `${number}rlh` | `${number}vh` | `${number}vw` | `${number}vi` | `${number}vb` | `${number}vmin` | `${number}vmax`, `${number}%` | `${number}px` | `${number}mm` | `${number}cm` | `${number}Q` | `${number}in` | `${number}pc` | `${number}pt` | `${number}cap` | `${number}ch` | `${number}em` | `${number}rem` | `${number}ex` | `${number}ic` | `${number}lh` | `${number}rlh` | `${number}vh` | `${number}vw` | `${number}vi` | `${number}vb` | `${number}vmin` | `${number}vmax`] | readonly [$mol_style_properties_color, `${number}%` | `${number}px` | `${number}mm` | `${number}cm` | `${number}Q` | `${number}in` | `${number}pc` | `${number}pt` | `${number}cap` | `${number}ch` | `${number}em` | `${number}rem` | `${number}ex` | `${number}ic` | `${number}lh` | `${number}rlh` | `${number}vh` | `${number}vw` | `${number}vi` | `${number}vb` | `${number}vmin` | `${number}vmax`, `${number}%` | `${number}px` | `${number}mm` | `${number}cm` | `${number}Q` | `${number}in` | `${number}pc` | `${number}pt` | `${number}cap` | `${number}ch` | `${number}em` | `${number}rem` | `${number}ex` | `${number}ic` | `${number}lh` | `${number}rlh` | `${number}vh` | `${number}vw` | `${number}vi` | `${number}vb` | `${number}vmin` | `${number}vmax`]>;
        static grayscale(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"grayscale", string | number>;
        static hue_rotate(value?: 0 | $mol_style_unit_str<$mol_style_unit_angle>): $mol_style_func<"hue-rotate", string | 0>;
        static invert(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"invert", string | number>;
        static opacity(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"opacity", string | number>;
        static sepia(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"sepia", string | number>;
        static saturate(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"saturate", string | number>;
    }
}

declare namespace $ {
    /** Replaces properties of `Base` record by properties from `Over`. */
    type $mol_type_override<Base, Over> = Omit<Base, keyof Over> & Over;
}

declare namespace $ {
    export type $mol_style_properties = Partial<$mol_type_override<CSSStyleDeclaration, Overrides>>;
    type Common = 'inherit' | 'initial' | 'unset' | 'revert' | 'revert-layer' | 'none' | $mol_style_func<'var'>;
    type Portion = `${number}${'%'}` | number;
    type Space = '' | ' ';
    type Var = `var(--${string})`;
    type Calc = `calc(${string})`;
    type Angle = number | `${number}${'deg' | 'turn'}` | Var | Calc | 'none';
    export type $mol_style_properties_color = 'aliceblue' | 'antiquewhite' | 'aqua' | 'aquamarine' | 'azure' | 'beige' | 'bisque' | 'black' | 'blanchedalmond' | 'blue' | 'blueviolet' | 'brown' | 'burlywood' | 'cadetblue' | 'chartreuse' | 'chocolate' | 'coral' | 'cornflowerblue' | 'cornsilk' | 'crimson' | 'cyan' | 'darkblue' | 'darkcyan' | 'darkgoldenrod' | 'darkgray' | 'darkgreen' | 'darkgrey' | 'darkkhaki' | 'darkmagenta' | 'darkolivegreen' | 'darkorange' | 'darkorchid' | 'darkred' | 'darksalmon' | 'darkseagreen' | 'darkslateblue' | 'darkslategrey' | 'darkturquoise' | 'darkviolet' | 'deeppink' | 'deepskyblue' | 'dimgray' | 'dimgrey' | 'dodgerblue' | 'firebrick' | 'floralwhite' | 'forestgreen' | 'fuchsia' | 'gainsboro' | 'ghostwhite' | 'gold' | 'goldenrod' | 'gray' | 'green' | 'greenyellow' | 'grey' | 'honeydew' | 'hotpink' | 'indianred' | 'indigo' | 'ivory' | 'khaki' | 'lavender' | 'lavenderblush' | 'lawngreen' | 'lemonchiffon' | 'lightblue' | 'lightcoral' | 'lightcyan' | 'lightgoldenrodyellow' | 'lightgray' | 'lightgreen' | 'lightgrey' | 'lightpink' | 'lightsalmon' | 'lightseagreen' | 'lightskyblue' | 'lightslategray' | 'lightslategrey' | 'lightsteelblue' | 'lightyellow' | 'lime' | 'limegreen' | 'linen' | 'magenta' | 'maroon' | 'mediumaquamarine' | 'mediumblue' | 'mediumorchid' | 'mediumpurple' | 'mediumseagreen' | 'mediumslateblue' | 'mediumspringgreen' | 'mediumturquoise' | 'mediumvioletred' | 'midnightblue' | 'mintcream' | 'mistyrose' | 'moccasin' | 'navajowhite' | 'navy' | 'oldlace' | 'olive' | 'olivedrab' | 'orange' | 'orangered' | 'orchid' | 'palegoldenrod' | 'palegreen' | 'paleturquoise' | 'palevioletred' | 'papayawhip' | 'peachpuff' | 'peru' | 'pink' | 'plum' | 'powderblue' | 'purple' | 'rebeccapurple' | 'red' | 'rosybrown' | 'royalblue' | 'saddlebrown' | 'salmon' | 'sandybrown' | 'seagreen' | 'seashell' | 'sienna' | 'silver' | 'skyblue' | 'slateblue' | 'slategray' | 'slategrey' | 'snow' | 'springgreen' | 'steelblue' | 'tan' | 'teal' | 'thistle' | 'tomato' | 'turquoise' | 'violet' | 'wheat' | 'white' | 'whitesmoke' | 'yellow' | 'yellowgreen' | 'transparent' | 'currentcolor' | $mol_style_func<'hsla' | 'rgba' | 'var'> | `#${string}` | `hsl(${Space}${Angle} ${Portion} ${Portion}${'' | `${Space}/${Space}${Portion}`}${Space})`;
    type Length = 0 | `${number}${$mol_style_unit_length}` | $mol_style_func<'calc' | 'var' | 'clamp'>;
    type Size = 'auto' | 'max-content' | 'min-content' | 'fit-content' | Length | Common;
    type Sides<Value> = {
        top?: Value;
        right?: Value;
        bottom?: Value;
        left?: Value;
        blockStart?: Value;
        blockEnd?: Value;
        inlineStart?: Value;
        inlineEnd?: Value;
    };
    type Directions<Value> = Value | readonly [Value, Value] | Sides<Value>;
    type Edges<Value> = {
        topLeft?: Value;
        topRight?: Value;
        bottomLeft?: Value;
        bottomRight?: Value;
    };
    type Borders<Value> = Value | readonly [Value, Value] | (Sides<Value> & Edges<Value>);
    type Single_animation_composition = 'replace' | 'add' | 'accumulate';
    type Single_animation_direction = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    type Single_animation_fill_mode = 'none' | 'forwards' | 'backwards' | 'both';
    type Single_animation_iteration_count = 'infinite' | number;
    type Single_animation_play_state = 'running' | 'paused';
    type Easing_function = Linear_easing_function | Cubic_bezier_easing_function | Step_easing_function;
    type Linear_easing_function = 'linear' | $mol_style_func<'linear'>;
    type Cubic_bezier_easing_function = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | $mol_style_func<'cubic-bezier'>;
    type Step_easing_function = 'step-start' | 'step-end' | $mol_style_func<'steps'>;
    type Compat_auto = 'searchfield' | 'textarea' | 'push-button' | 'slider-horizontal' | 'checkbox' | 'radio' | 'menulist' | 'listbox' | 'meter' | 'progress-bar' | 'button';
    type Compat_special = 'textfield' | 'menulist-button';
    type Mix_blend_mode = Blend_mode | 'plus-darker' | 'plus-lighter';
    type Blend_mode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
    type Box = 'border-box' | 'padding-box' | 'content-box';
    type Baseline_position = 'baseline' | `${'first' | 'last'} baseline`;
    type Content_distribution = 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
    type Self_position = 'center' | 'start' | 'end' | 'self-start' | 'self-end' | 'flex-start' | 'flex-end';
    type Content_position = 'center' | 'start' | 'end' | 'flex-start' | 'flex-end';
    type Span_align = 'none' | 'start' | 'end' | 'center' | $mol_style_func<'var'>;
    type Snap_axis = 'x' | 'y' | 'block' | 'inline' | 'both' | $mol_style_func<'var'>;
    type Overflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'overlay' | Common;
    type Overflow_position = 'unsafe' | 'safe';
    type ContainRule = 'size' | 'layout' | 'style' | 'paint' | $mol_style_func<'var'>;
    type Repeat = 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | $mol_style_func<'var'>;
    type BG_size = Length | 'auto' | 'contain' | 'cover';
    interface Overrides {
        /**
         * Sets the accent color for user-interface controls generated by some elements.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color
         */
        accentColor?: $mol_style_properties_color | Common;
        align?: {
            /**
             * Distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
             */
            content?: 'normal' | Baseline_position | Content_distribution | Content_position | `${Overflow_position} ${Content_position}` | Common;
            /**
             * Sets the align-self value on all direct children as a group.
             * In Flexbox, it controls the alignment of items on the Cross Axis.
             * In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
             */
            items?: 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
            /**
             * Overrides a grid or flex item's align-items value.
             * In Grid, it aligns the item inside the grid area.
             * In Flexbox, it aligns the item on the cross axis.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
             */
            self?: 'auto' | 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
        };
        justify?: {
            /**
             * Distribution of space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
             */
            content?: 'normal' | Baseline_position | Content_distribution | Content_position | `${Overflow_position} ${Content_position}` | Common;
            /**
             * Sets the justify-self value on all direct children as a group.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
             */
            items?: 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
            /**
             * Way a box is justified inside its alignment container along the appropriate axis.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self
             */
            self?: 'auto' | 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
        };
        /**
         * resets all of an element's properties except unicode-bidi, direction, and CSS Custom Properties.
         * It can set properties to their initial or inherited values, or to the values specified in another cascade layer or stylesheet origin.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/all
         */
        all?: Common;
        animation?: {
            /**
             * Specifies the composite operation to use when multiple animations affect the same property simultaneously.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-composition
             */
            composition?: Single_animation_composition | Single_animation_composition[][] | Common;
            /**
             * Specifies the amount of time to wait from applying the animation to an element before beginning to perform the animation.
             * The animation can start later, immediately from its beginning, or immediately and partway through the animation.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
             */
            delay?: $mol_style_unit_str<$mol_style_unit_time> | $mol_style_unit_str<$mol_style_unit_time>[][] | Common;
            /**
             * Sets whether an animation should play forward, backward, or alternate back and forth between playing the sequence forward and backward.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
             */
            direction?: Single_animation_direction | Single_animation_direction[][] | Common;
            /**
             * Sets the length of time that an animation takes to complete one cycle.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
             */
            duration?: $mol_style_unit_str<$mol_style_unit_time> | $mol_style_unit_str<$mol_style_unit_time>[][] | Common;
            /**
             * Sets how a CSS animation applies styles to its target before and after its execution.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
             */
            fillMode?: Single_animation_fill_mode | Single_animation_fill_mode[][] | Common;
            /**
             * Sets the number of times an animation sequence should be played before stopping.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
             */
            iterationCount?: Single_animation_iteration_count | Single_animation_iteration_count[][] | Common;
            /**
             * Specifies the names of one or more keyframes at-rules that describe the animation to apply to an element.
             * Multiple keyframe at-rules are specified as a comma-separated list of names.
             * If the specified name does not match any keyframe at-rule, no properties are animated.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
             */
            name?: 'none' | string & {} | ('none' | string & {})[][] | Common;
            /**
             * Sets whether an animation is running or paused.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
             */
            playState?: Single_animation_play_state | Single_animation_play_state[][] | Common;
            /**
             * Sets how an animation progresses through the duration of each cycle.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
             */
            timingFunction?: Easing_function | Easing_function[][] | Common;
        };
        /**
         * Used to control native appearance of UI controls, that are based on operating system's theme.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/appearance
         */
        appearance?: 'none' | 'auto' | Compat_auto | Compat_special | Common;
        /**
         * Sets a preferred aspect ratio for the box, which will be used in the calculation of auto sizes and some other layout functions.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
         */
        aspectRatio?: 'auto' | number | `${number} / ${number}`;
        /**
         * lets you apply graphical effects such as blurring or color shifting to the area behind an element.
         * Because it applies to everything behind the element, to see the effect you must make the element
         * or its background at least partially transparent.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
         */
        backdropFilter: $mol_style_func<$mol_style_func_filter> | $mol_style_func<'url'> | ($mol_style_func<$mol_style_func_filter> | $mol_style_func<'url'>)[][] | 'none' | Common;
        /**
         * Sets whether the back face of an element is visible when turned towards the user.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility
         */
        backfaceVisibility: 'visible' | 'hidden' | Common;
        /**
         * How the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
         * @see https://developer.mozilla.org/ru/docs/Web/CSS/justify-content
         */
        justifyContent?: 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | 'space-between' | 'space-around' | 'space-evenly' | 'normal' | 'stretch' | 'center' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/gap */
        gap?: Length | readonly [Length, Length] | Common;
        /**
         * All background style properties.
         * @see https://developer.mozilla.org/ru/docs/Web/CSS/background
         * */
        background?: 'none' | {
            /**
             * Sets whether a background image's position is fixed within the viewport, or scrolls with its containing block.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment
             */
            attachment?: 'scroll' | 'fixed' | 'local' | ('scroll' | 'fixed' | 'local')[][] | Common;
            /**
             * Sets how an element's background images should blend with each other and with the element's background color.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode
             */
            blendMode?: Mix_blend_mode | Mix_blend_mode[][] | Common;
            /**
             * Sets whether an element's background extends underneath its border box, padding box, or content box.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
             */
            clip?: Box | Box[][] | Common;
            /**
             * Background color.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/background-color
             */
            color?: $mol_style_properties_color | Common;
            /**
             * Background images.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/background-image
             */
            image?: readonly (readonly [$mol_style_func<$mol_style_func_image> | string & {}])[] | 'none' | Common;
            /**
             * How background images are repeated.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/background-repeat
             */
            repeat?: Repeat | [Repeat, Repeat] | Common;
            /** @see https://developer.mozilla.org/ru/docs/Web/CSS/background-position */
            position?: 'left' | 'right' | 'top' | 'bottom' | 'center' | Common;
            /** @see https://developer.mozilla.org/ru/docs/Web/CSS/background-size */
            size?: (BG_size | [BG_size] | [BG_size, BG_size])[];
        };
        /** @see https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow */
        box?: {
            /**
             * Shadow effects around an element's frame.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow
             */
            shadow?: readonly ([
                ...[inset: 'inset'] | [],
                x: Length,
                y: Length,
                blur: Length,
                spread: Length,
                color: $mol_style_properties_color
            ] | {
                inset?: boolean;
                x: Length;
                y: Length;
                blur: Length;
                spread: Length;
                color: $mol_style_properties_color;
            })[] | 'none' | Common;
        };
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/rx */
        rx?: Length | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/ry */
        ry?: Length | Common;
        /** @see https://developer.mozilla.org/ru/docs/Web/CSS/font */
        font?: {
            /**
             * Whether a font should be styled.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-style
             */
            style?: 'normal' | 'italic' | Common;
            /**
             * Weight (or boldness) of the font.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-weight
             */
            weight?: 'normal' | 'bold' | 'lighter' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | Common;
            /**
             * Size of the font. Changing the font size also updates the sizes of the font size-relative length units.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-size
             */
            size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large' | 'smaller' | 'larger' | Length | Common;
            /**
             * Prioritized list of one or more font family names and/or generic family names.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-family
             */
            family?: string & {} | 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy' | 'system-ui' | 'ui-serif' | 'ui-sans-serif' | 'ui-monospace' | 'ui-rounded' | 'emoji' | 'math' | 'fangsong' | Common;
        };
        /**
         * Foreground color value of text and text decorations, and sets the `currentcolor` value.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color
         */
        color?: $mol_style_properties_color | Common;
        /**
         * Whether an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
         */
        display?: 'block' | 'inline' | 'run-in' | 'list-item' | 'none' | 'flow' | 'flow-root' | 'table' | 'flex' | 'grid' | 'contents' | 'table-row-group' | 'table-header-group' | 'table-footer-group' | 'table-column-group' | 'table-row' | 'table-cell' | 'table-column' | 'table-caption' | 'inline-block' | 'inline-table' | 'inline-flex' | 'inline-grid' | 'ruby' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' | 'ruby-text-container' | Common;
        /**
         * What to do when an element's content is too big to fit in its block formatting context. It is a shorthand for `overflowX` and `overflowY`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
         */
        overflow?: Overflow | {
            /**
             * What shows when content overflows a block-level element's left and right edges.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x
             */
            x?: Overflow | Common;
            /**
             * What shows when content overflows a block-level element's top and bottom edges.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y
             */
            y?: Overflow | Common;
            /**
             * A way to opt out of the browser's scroll anchoring behavior, which adjusts scroll position to minimize content shifts.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor
             */
            anchor?: 'auto' | 'none' | Common;
        };
        /**
         * Indicate that an element and its contents are, as much as possible, independent of the rest of the document tree. This allows the browser to recalculate layout, style, paint, size, or any combination of them for a limited area of the DOM and not the entire page, leading to obvious performance benefits.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/contain
         */
        contain?: 'none' | 'strict' | 'content' | ContainRule | readonly ContainRule[] | Common;
        /**
         * How white space inside an element is handled.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
         */
        whiteSpace?: 'normal' | 'nowrap' | 'break-spaces' | 'pre' | 'pre-wrap' | 'pre-line' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-overflow-scrolling */
        webkitOverflowScrolling?: 'auto' | 'touch' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color */
        scrollbar?: {
            /**
             * Color of thumb and track of scrollbars.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
             */
            color?: readonly [$mol_style_properties_color, $mol_style_properties_color] | 'auto' | Common;
            /**
             * Maximum thickness of scrollbars.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
             */
            width?: 'auto' | 'thin' | 'none' | Common;
        };
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior */
        scroll?: {
            /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align */
            snap?: {
                /**
                 * How strictly snap points are enforced on the scroll container in case there is one.
                 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
                 */
                type: 'none' | Snap_axis | readonly [Snap_axis, 'mandatory' | 'proximity'] | Common;
                /**
                 * Whether the scroll container is allowed to "pass over" possible snap positions.
                 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
                 */
                stop: 'normal' | 'always' | Common;
                /**
                 * The box’s snap position as an alignment of its snap area (as the alignment subject) within its snap container’s snapport (as the alignment container). The two values specify the snapping alignment in the block axis and inline axis, respectively. If only one value is specified, the second value defaults to the same value.
                 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align
                 */
                align: Span_align | readonly [Span_align, Span_align] | Common;
            };
            /**
             * Offsets for the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding
             */
            padding?: Directions<Length | 'auto'>;
        };
        /**
         * Element's width. By default, it sets the width of the content area, but if `boxSizing` is set to `border-box`, it sets the width of the border area.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/width
         */
        width?: Size;
        /**
         * Minimum width of an element. It prevents the used value of the `width` property from becoming smaller than the value specified for `minWidth`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-width
         */
        minWidth?: Size;
        /**
         * Maximum width of an element. It prevents the used value of the `width` property from becoming larger than the value specified for `maxWidth`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-width
         */
        maxWidth?: Size;
        /**
         * Height of an element. By default, the property defines the height of the content area. If box-sizing is set to border-box, however, it instead determines the height of the border area.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/height
         */
        height?: Size;
        /**
         * Minimum height of an element. It prevents the used value of the `height` property from becoming smaller than the value specified for `minHeight`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-height
         */
        minHeight?: Size;
        /**
         * Maximum height of an element. It prevents the used value of the `height` property from becoming larger than the value specified for `maxHeight`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-height
         */
        maxHeight?: Size;
        /**
         * Margin area on all four sides of an element.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/margin
         */
        margin?: Directions<Length | 'auto'>;
        /**
         * Padding area on all four sides of an element.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/padding
         */
        padding?: Directions<Length | 'auto'>;
        /**
         * How an element is positioned in a document. The `top`, `right`, `bottom`, and `left` properties determine the final location of positioned elements.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/position
         */
        position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/top */
        top?: Length | 'auto' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/right */
        right?: Length | 'auto' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/bottom */
        bottom?: Length | 'auto' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/left */
        left?: Length | 'auto' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/border */
        border?: Borders<{
            /**
             * Rounds the corners of an element's outer border edge. You can set a single radius to make circular corners, or two radii to make elliptical corners.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
             */
            radius?: Length | [Length, Length];
            /**
             * Line style for all four sides of an element's border.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
             */
            style?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | Common;
            /**
             * Color of element's border.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
             */
            color?: $mol_style_properties_color | Common;
            /**
             * Width of element's border.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
             */
            width?: Length | Common;
        }>;
        /**
         * How a flex item will grow or shrink to fit the space available in its flex container. It is a shorthand for `flexGrow`, `flexShrink`, and `flexBasis`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex
         */
        flex?: 'none' | 'auto' | {
            /**
             * Growing weight of the flex item. Negative values are considered invalid. Defaults to 1 when omitted.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
             */
            grow?: number | Common;
            /**
             * Shrinking weight of the flex item. Negative values are considered invalid. Defaults to 1 when omitted.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
             */
            shrink?: number | Common;
            /**
             * Preferred size of the flex item. A value of 0 must have a unit to avoid being interpreted as a flexibility. Defaults to 0 when omitted.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
             */
            basis?: Size | Common;
            /**
             * How flex items are placed in the flex container defining the main axis and the direction (normal or reversed).
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
             */
            direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | Common;
            /**
             * Whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
             */
            wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | Common;
        };
        container?: {
            name?: string;
            type?: Container_type | readonly Container_type[];
        };
        /**
         * Z-order of a positioned element and its descendants or flex items. Overlapping elements with a larger z-index cover those with a smaller one.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
         */
        zIndex: number | Common;
        /**
         * Degree to which content behind an element is hidden, and is the opposite of transparency.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
         */
        opacity: number | Common;
    }
    type Container_type = 'normal' | 'size' | 'inline-size' | 'scroll-state' | 'anchored';
    export {};
}

declare namespace $ {
    /** Create record of CSS variables. */
    function $mol_style_prop<Keys extends string[]>(prefix: string, keys: Keys): Record<Keys[number], $mol_style_func<"var", unknown>>;
}

declare namespace $ {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    const $mol_theme: Record<"image" | "line" | "text" | "field" | "focus" | "hue" | "back" | "hover" | "card" | "current" | "special" | "control" | "shade" | "spirit" | "hue_spread", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
}

declare namespace $ {
    /**
     * Gap in CSS
     * @see https://page.hyoo.ru/#!=msdb74_bm7nsq
     */
    let $mol_gap: Record<"text" | "space" | "block" | "page" | "blur" | "round" | "emoji", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
}

declare namespace $ {
    function $mol_fail(error: any): never;
}

declare namespace $ {
    function $mol_func_name(this: $, func: Function): string;
    function $mol_func_name_from<Target extends Function>(target: Target, source: Function): Target;
}

declare namespace $ {
    function $mol_dom_render_children(el: Element | DocumentFragment, childNodes: NodeList | Array<Node | string | null>): void;
}

declare namespace $ {
    /**
     * Recursive `Partial`.
     *
     * 	let props : $mol_type_partial_deep< HTMLElement > = { style : { display : 'block' } }
     */
    type $mol_type_partial_deep<Val> = Val extends object ? Val extends Function ? Val : {
        [field in keyof Val]?: $mol_type_partial_deep<Val[field]> | undefined;
    } : Val;
}

declare namespace $ {
    let $mol_jsx_prefix: string;
    let $mol_jsx_crumbs: string;
    let $mol_jsx_booked: null | Set<string>;
    let $mol_jsx_document: $mol_jsx.JSX.ElementClass['ownerDocument'];
    const $mol_jsx_frag = "";
    /**
     * JSX adapter that makes DOM tree.
     * Generates global unique ids for every DOM-element by components tree with ids.
     * Ensures all local ids are unique.
     * Can reuse an existing nodes by GUIDs when used inside [`mol_jsx_attach`](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/attach).
     */
    function $mol_jsx<Props extends $mol_jsx.JSX.IntrinsicAttributes, Children extends Array<Node | string>>(Elem: string | ((props: Props, ...children: Children) => Element), props: Props, ...childNodes: Children): Element | DocumentFragment;
    namespace $mol_jsx.JSX {
        interface Element extends HTMLElement {
            class?: string;
        }
        interface ElementClass {
            attributes: {};
            ownerDocument: Pick<Document, 'getElementById' | 'createElementNS' | 'createDocumentFragment'>;
            childNodes: Array<Node | string>;
            valueOf(): Element;
        }
        type OrString<Dict> = {
            [key in keyof Dict]: Dict[key] | string;
        };
        /** Props for html elements */
        type IntrinsicElements = {
            [key in keyof ElementTagNameMap]?: $.$mol_type_partial_deep<OrString<Element & IntrinsicAttributes & ElementTagNameMap[key]>>;
        };
        /** Additional undeclared props */
        interface IntrinsicAttributes {
            id?: string;
            xmlns?: string;
        }
        interface ElementAttributesProperty {
            attributes: {};
        }
        interface ElementChildrenAttribute {
        }
    }
}

declare namespace $ {
    const $mol_ambient_ref: unique symbol;
    /** @deprecated use $ instead */
    type $mol_ambient_context = $;
    function $mol_ambient(this: $ | void, overrides: Partial<$>): $;
}

declare namespace $ {
    /**
     * Proxy that delegates all to lazy returned target.
     *
     * 	$mol_delegate( Array.prototype , ()=> fetch_array() )
     */
    function $mol_delegate<Value extends object>(proto: Value, target: () => Value): Value;
}

declare namespace $ {
    const $mol_owning_map: WeakMap<any, any>;
    function $mol_owning_allow<Having>(having: Having): having is Having & {
        destructor(): void;
    };
    function $mol_owning_get<Having, Owner extends object>(having: Having, Owner?: {
        new (): Owner;
    }): Owner | null;
    function $mol_owning_check<Owner, Having>(owner: Owner, having: Having): having is Having & {
        destructor(): void;
    };
    function $mol_owning_catch<Owner, Having>(owner: Owner, having: Having): boolean;
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    type $mol_type_writable<T> = {
        -readonly [P in keyof T]: T[P];
    };
}

declare namespace $ {
    const $mol_key_handle: unique symbol;
    const $mol_key_store: WeakMap<object, string>;
}

declare namespace $ {
    class $mol_object2 {
        static $: $;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: $;
        get $(): $;
        set $(next: $);
        static create<Instance>(this: new (init?: (instance: any) => void) => Instance, init?: (instance: $mol_type_writable<Instance>) => void): Instance;
        static [Symbol.toPrimitive](): any;
        static toString(): any;
        static toJSON(): any;
        static [$mol_key_handle](): any;
        destructor(): void;
        static destructor(): void;
        [Symbol.dispose](): void;
        toString(): string;
    }
}

declare namespace $ {
    namespace $$ { }
    const $mol_object_field: unique symbol;
    class $mol_object extends $mol_object2 {
        static make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
    }
}

declare namespace $ {
    /** Generates unique identifier. */
    function $mol_guid(length?: number, exists?: (id: string) => boolean): string;
}

declare namespace $ {
    /** Special status statuses. */
    enum $mol_wire_cursor {
        /** Update required. */
        stale = -1,
        /** Some of (transitive) pub update required. */
        doubt = -2,
        /** Actual state but may be dropped. */
        fresh = -3,
        /** State will never be changed. */
        final = -4
    }
}

declare namespace $ {
    /**
     * Collects subscribers in compact array. 28B
     */
    class $mol_wire_pub extends Object {
        constructor(id?: string);
        [Symbol.toStringTag]: string;
        data: unknown[];
        static get [Symbol.species](): ArrayConstructor;
        /**
         * Index of first subscriber.
         */
        protected sub_from: number;
        /**
         * All current subscribers.
         */
        get sub_list(): readonly $mol_wire_sub[];
        /**
         * Has any subscribers or not.
         */
        get sub_empty(): boolean;
        /**
         * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
         */
        sub_on(sub: $mol_wire_pub, pub_pos: number): number;
        /**
         * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
         */
        sub_off(sub_pos: number): void;
        /**
         * Called when last sub was unsubscribed.
         **/
        reap(): void;
        /**
         * Autowire this publisher with current subscriber.
         **/
        promote(): void;
        /**
         * Enforce actualization. Should not throw errors.
         */
        fresh(): void;
        /**
         * Allow to put data to caches in the subtree.
         */
        complete(): void;
        get incompleted(): boolean;
        /**
         * Notify subscribers about self changes.
         */
        emit(quant?: $mol_wire_cursor): void;
        /**
         * Moves peer from one position to another. Doesn't clear data at old position!
         */
        peer_move(from_pos: number, to_pos: number): void;
        /**
         * Updates self position in the peer.
         */
        peer_repos(peer_pos: number, self_pos: number): void;
    }
}

declare namespace $ {
    /** Generic subscriber interface */
    interface $mol_wire_sub extends $mol_wire_pub {
        temp: boolean;
        pub_list: $mol_wire_pub[];
        /**
         * Begin auto wire to publishers.
         * Returns previous auto subscriber that must me transfer to the `end`.
         */
        track_on(): $mol_wire_sub | null;
        /**
         * Returns next auto wired publisher. It can be easely repormoted.
         * Or promotes next publisher to auto wire its togeter.
         * Must be used only between `track_on` and `track_off`.
         */
        track_next(pub?: $mol_wire_pub): $mol_wire_pub | null;
        pub_off(pub_pos: number): void;
        /**
         * Unsubscribes from unpromoted publishers.
         */
        track_cut(sub: $mol_wire_pub | null): void;
        /**
         * Ends auto wire to publishers.
         */
        track_off(sub: $mol_wire_pub | null): void;
        /**
         * Receive notification about publisher changes.
         */
        absorb(quant: $mol_wire_cursor, pos: number): void;
        /**
         * Unsubscribes from all publishers.
         */
        destructor(): void;
    }
}

declare namespace $ {
    let $mol_wire_auto_sub: $mol_wire_sub | null;
    /**
     * When fulfilled, all publishers are promoted to this subscriber on access to its.
     */
    function $mol_wire_auto(next?: $mol_wire_sub | null): $mol_wire_sub | null;
    /**
     * Affection queue. Used to prevent accidental stack overflow on emit.
     */
    const $mol_wire_affected: ($mol_wire_sub | number)[];
}

declare namespace $ {
    function $mol_dev_format_register(config: {
        header: (val: any, config: any) => any;
        hasBody: (val: any, config: any) => false;
    } | {
        header: (val: any, config: any) => any;
        hasBody: (val: any, config: any) => boolean;
        body: (val: any, config: any) => any;
    }): void;
    const $mol_dev_format_head: unique symbol;
    const $mol_dev_format_body: unique symbol;
    function $mol_dev_format_native(obj: any): any[];
    function $mol_dev_format_auto(obj: any): any[];
    function $mol_dev_format_element(element: string, style: object, ...content: any[]): any[];
    let $mol_dev_format_span: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_div: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_ol: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_li: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_table: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_tr: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_td: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_accent: (...args: any[]) => any[];
    let $mol_dev_format_strong: (...args: any[]) => any[];
    let $mol_dev_format_string: (...args: any[]) => any[];
    let $mol_dev_format_shade: (...args: any[]) => any[];
    let $mol_dev_format_indent: (...args: any[]) => any[];
}

declare namespace $ {
    /**
     * Publisher that can auto collect other publishers. 32B
     *
     * 	P1 P2 P3 P4 S1 S2 S3
     * 	^           ^
     * 	pubs_from   subs_from
     */
    class $mol_wire_pub_sub extends $mol_wire_pub implements $mol_wire_sub {
        protected pub_from: number;
        protected cursor: $mol_wire_cursor;
        get temp(): boolean;
        get pub_list(): $mol_wire_pub[];
        track_on(): $mol_wire_sub | null;
        promote(): void;
        track_next(pub?: $mol_wire_pub): $mol_wire_pub | null;
        track_off(sub: $mol_wire_sub | null): void;
        pub_off(sub_pos: number): void;
        destructor(): void;
        track_cut(): void;
        complete(): void;
        complete_pubs(): void;
        absorb(quant?: $mol_wire_cursor, pos?: number): void;
        [$mol_dev_format_head](): any[];
        /**
         * Is subscribed to any publisher or not.
         */
        get pub_empty(): boolean;
    }
}

declare namespace $ {
    class $mol_after_tick extends $mol_object2 {
        task: () => void;
        static promise: Promise<void> | null;
        cancelled: boolean;
        constructor(task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    function $mol_promise_like(val: any): val is Promise<any>;
}

declare namespace $ {
    /**
     * Suspendable task with support both sync/async api.
     *
     * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
     * 	^           ^           ^
     * 	args_from   pubs_from   subs_from
     **/
    abstract class $mol_wire_fiber<Host, Args extends readonly unknown[], Result> extends $mol_wire_pub_sub {
        readonly task: (this: Host, ...args: Args) => Result;
        readonly host?: Host | undefined;
        static warm: boolean;
        static planning: Set<$mol_wire_fiber<any, any, any>>;
        static reaping: Set<$mol_wire_fiber<any, any, any>>;
        static plan_task: $mol_after_tick | null;
        static plan(): void;
        static sync(): void;
        cache: Result | Error | Promise<Result | Error>;
        get args(): Args;
        result(): Result | undefined;
        get incompleted(): boolean;
        field(): string;
        constructor(id: string, task: (this: Host, ...args: Args) => Result, host?: Host | undefined, args?: Args);
        plan(): this;
        reap(): void;
        toString(): string;
        toJSON(): string;
        [$mol_dev_format_head](): any[];
        [$mol_dev_format_body](): null;
        get $(): any;
        emit(quant?: $mol_wire_cursor): void;
        fresh(): this | undefined;
        refresh(): void;
        abstract put(next: Result | Error | Promise<Result | Error>): Result | Error | Promise<Result | Error>;
        /**
         * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
         * Should be called inside SuspenseAPI consumer (ie fiber).
         */
        sync(): Awaited<Result>;
        /**
         * Asynchronous execution.
         * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
         */
        async_raw(): Promise<Result>;
        async(): Promise<Result> & {
            destructor(): void;
        };
        step(): Promise<null>;
        destructor(): void;
    }
}

declare namespace $ {
    /** Returns string key for any value. */
    function $mol_key<Value>(value: Value): string;
}

declare namespace $ {
    class $mol_after_frame extends $mol_object2 {
        task: () => void;
        static _promise: Promise<void> | null;
        static get promise(): Promise<void>;
        cancelled: boolean;
        promise: Promise<void>;
        constructor(task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    let $mol_compare_deep_cache: WeakMap<any, WeakMap<any, boolean>>;
    /**
     * Deeply compares two values. Returns true if equal.
     * Define `Symbol.toPrimitive` to customize.
     */
    function $mol_compare_deep<Value>(left: Value, right: Value): boolean;
}

declare namespace $ {
    /** Logger event data */
    type $mol_log3_event<Fields> = {
        [key in string]: unknown;
    } & {
        /** Time of event creation */
        time?: string;
        /** Place of event creation */
        place: unknown;
        /** Short description of event */
        message: string;
    } & Fields;
    /** Logger function */
    type $mol_log3_logger<Fields, Res = void> = (this: $, event: $mol_log3_event<Fields>) => Res;
    /** Log begin of some task */
    let $mol_log3_come: $mol_log3_logger<{}>;
    /** Log end of some task */
    let $mol_log3_done: $mol_log3_logger<{}>;
    /** Log error */
    let $mol_log3_fail: $mol_log3_logger<{}>;
    /** Log warning message */
    let $mol_log3_warn: $mol_log3_logger<{
        hint: string;
    }>;
    /** Log some generic event */
    let $mol_log3_rise: $mol_log3_logger<{}>;
    /** Log begin of log group, returns func to close group */
    let $mol_log3_area: $mol_log3_logger<{}, () => void>;
    /** Log begin of collapsed group only when some logged inside, returns func to close group */
    function $mol_log3_area_lazy(this: $, event: $mol_log3_event<{}>): () => void;
    let $mol_log3_stack: (() => void)[];
}

declare namespace $ {
    /**
     * Extracts keys from `Input` which values extends `Upper` and extendable by `Lower`.
     *
     * 	type MathConstants = $mol_type_keys_extract< Math , number > // "E" | "PI" ...
     */
    type $mol_type_keys_extract<Input, Upper, Lower = never> = {
        [Field in keyof Input]: unknown extends Input[Field] ? never : Input[Field] extends never ? never : Input[Field] extends Upper ? [
            Lower
        ] extends [Input[Field]] ? Field : never : never;
    }[keyof Input];
}

declare namespace $ {
    function $mol_log3_web_make(level: $mol_type_keys_extract<Console, Function>, color: string): (this: $, event: $mol_log3_event<{}>) => () => void;
}

declare namespace $ {
    /** One-shot fiber */
    class $mol_wire_task<Host, Args extends readonly unknown[], Result> extends $mol_wire_fiber<Host, Args, Result> {
        static getter<Host, Args extends readonly unknown[], Result>(task: (this: Host, ...args: Args) => Result): (host: Host, args: Args) => $mol_wire_task<Host, Args, Result>;
        get temp(): boolean;
        complete(): void;
        put(next: Result | Error | Promise<Result | Error>): Error | Result | Promise<Error | Result>;
        destructor(): void;
    }
}

declare namespace $ {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber.
     */
    function $mol_wire_method<Host extends object, Args extends readonly any[]>(host: Host, field: PropertyKey, descr?: TypedPropertyDescriptor<(...args: Args) => any>): {
        value: (this: Host, ...args: Args) => any;
        enumerable?: boolean;
        configurable?: boolean;
        writable?: boolean;
        get?: (() => (...args: Args) => any) | undefined;
        set?: ((value: (...args: Args) => any) => void) | undefined;
    };
}

declare namespace $ {
    /**
     * Returns `Tuple` without first element.
     *
     * 	$mol_type_tail<[ 1 , 2 , 3 ]> // [ 2, 3 ]
     */
    type $mol_type_tail<Tuple extends readonly any[]> = ((...tail: Tuple) => any) extends ((head: any, ...tail: infer Tail) => any) ? Tail : never;
}

declare namespace $ {
    /**
     * Returns last element of `Tuple`.
     *
     * 	$mol_type_tail<[ 1 , 2 , 3 ]> // 3
     */
    type $mol_type_foot<Tuple extends readonly any[]> = Tuple['length'] extends 0 ? never : Tuple[$mol_type_tail<Tuple>['length']];
}

declare namespace $ {
    function $mol_fail_catch(error: unknown): boolean;
}

declare namespace $ {
    function $mol_try<Result>(handler: () => Result): Result | Error;
}

declare namespace $ {
    function $mol_try_web<Result>(handler2: () => Result): Result | Error;
}

declare namespace $ {
    function $mol_fail_log(error: unknown): boolean;
}

declare namespace $ {
    /** Long-living fiber. */
    class $mol_wire_atom<Host, Args extends readonly unknown[], Result> extends $mol_wire_fiber<Host, Args, Result> {
        static solo<Host, Args extends readonly unknown[], Result>(host: Host, task: (this: Host, ...args: Args) => Result): $mol_wire_atom<Host, Args, Result>;
        static plex<Host, Args extends readonly unknown[], Result>(host: Host, task: (this: Host, ...args: Args) => Result, key: Args[0]): $mol_wire_atom<Host, Args, Result>;
        static watching: Set<$mol_wire_atom<any, any, any>>;
        static watcher: $mol_after_frame | null;
        static watch(): void;
        watch(): void;
        /**
         * Update atom value through another temp fiber.
         */
        resync(args: Args): Error | Result | Promise<Error | Result>;
        once(): Awaited<Result>;
        channel(): ((next?: $mol_type_foot<Args>) => Awaited<Result>) & {
            atom: $mol_wire_atom<Host, Args, Result>;
        };
        destructor(): void;
        put(next: Result | Error | Promise<Result | Error>): Error | Result | Promise<Error | Result>;
    }
}

declare namespace $ {
    /** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
    export function $mol_wire_solo<Args extends any[]>(host: object, field: string, descr?: TypedPropertyDescriptor<(...args: Args) => any>): TypedPropertyDescriptor<(...args: First_optional<Args>) => any>;
    type First_optional<Args extends any[]> = Args extends [] ? [] : [Args[0] | undefined, ...$mol_type_tail<Args>];
    export {};
}

declare namespace $ {
    /** Reactive memoizing multiplexed property decorator. */
    function $mol_wire_plex<Args extends [any, ...any[]]>(host: object, field: string, descr?: TypedPropertyDescriptor<(...args: Args) => any>): {
        value: (this: typeof host, ...args: Args) => any;
        enumerable?: boolean;
        configurable?: boolean;
        writable?: boolean;
        get?: (() => (...args: Args) => any) | undefined;
        set?: ((value: (...args: Args) => any) => void) | undefined;
    };
}

declare namespace $ {
    /**
     * Reactive memoizing solo property decorator from [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem
     * name(next?: string) {
     * 	return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    let $mol_mem: typeof $mol_wire_solo;
    /**
     * Reactive memoizing multiplexed property decorator [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem_key
     * name(id: number, next?: string) {
     *  return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    let $mol_mem_key: typeof $mol_wire_plex;
}

declare namespace $ {
    class $mol_window extends $mol_object {
        static size(): {
            width: number;
            height: number;
        };
        static resizes(next?: Event): Event | undefined;
    }
}

declare namespace $ {
    function $mol_guard_defined<T>(value: T): value is NonNullable<T>;
}

declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[], notify?: 'notify'): Element[];
    }
}

declare namespace $ {
    function $mol_maybe<Value>(value: Value | null | undefined): Value[];
}

declare namespace $ {
    /**
    * Key names code for hotkey
    * @see [mol_hotkey](../../hotkey/hotkey.view.ts)
    */
    enum $mol_keyboard_code {
        backspace = 8,
        tab = 9,
        enter = 13,
        shift = 16,
        ctrl = 17,
        alt = 18,
        pause = 19,
        capsLock = 20,
        escape = 27,
        space = 32,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        left = 37,
        up = 38,
        right = 39,
        down = 40,
        insert = 45,
        delete = 46,
        key0 = 48,
        key1 = 49,
        key2 = 50,
        key3 = 51,
        key4 = 52,
        key5 = 53,
        key6 = 54,
        key7 = 55,
        key8 = 56,
        key9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        metaLeft = 91,
        metaRight = 92,
        select = 93,
        numpad0 = 96,
        numpad1 = 97,
        numpad2 = 98,
        numpad3 = 99,
        numpad4 = 100,
        numpad5 = 101,
        numpad6 = 102,
        numpad7 = 103,
        numpad8 = 104,
        numpad9 = 105,
        multiply = 106,
        add = 107,
        subtract = 109,
        decimal = 110,
        divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        numLock = 144,
        scrollLock = 145,
        semicolon = 186,
        equals = 187,
        comma = 188,
        dash = 189,
        period = 190,
        forwardSlash = 191,
        graveAccent = 192,
        bracketOpen = 219,
        slashBack = 220,
        slashBackLeft = 226,
        bracketClose = 221,
        quoteSingle = 222
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_wrapper extends $mol_object2 {
        static wrap: (task: (...ags: any[]) => any) => (...ags: any[]) => any;
        static run<Result>(task: () => Result): Result;
        static func<Args extends any[], Result, Host = void>(func: (this: Host, ...args: Args) => Result): (this: Host, ...args: Args) => Result;
        static get class(): <Class extends new (...args: any[]) => any>(Class: Class) => Class;
        static get method(): (obj: object, name: PropertyKey, descr?: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
        static get field(): <Host extends object, Field extends keyof Host, Args extends any[], Result>(obj: Host, name: Field, descr?: TypedPropertyDescriptor<Result>) => TypedPropertyDescriptor<Result>;
    }
}

declare namespace $ {
    class $mol_memo extends $mol_wrapper {
        static wrap<This extends object, Value>(task: (this: This, next?: Value) => Value): (this: This, next?: Value) => Value | undefined;
    }
}

declare namespace $ {
    function $mol_dom_qname(name: string): string;
}

declare namespace $ {
    /** Run code without state changes */
    function $mol_wire_probe<Value>(task: () => Value, def?: Value): Value | undefined;
}

declare namespace $ {
    /**
     * Real-time refresh current atom.
     * Don't use if possible. May reduce performance.
     */
    function $mol_wire_watch(): void;
}

declare namespace $ {
    /**
     * Returns closure that returns constant value.
     * @example
     * const rnd = $mol_const( Math.random() )
     */
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}

declare namespace $ {
    /**
     * Disable reaping of current subscriber
     */
    function $mol_wire_solid(): void;
}

declare namespace $ {
    function $mol_dom_render_attributes(el: Element, attrs: {
        [key: string]: string | number | boolean | null;
    }): void;
}

declare namespace $ {
    function $mol_dom_render_events(el: Element, events: {
        [key: string]: (event: Event) => any;
    }, passive?: boolean): void;
}

declare namespace $ {
    function $mol_error_message(this: $, error: unknown): string;
}

declare namespace $ {
    function $mol_dom_render_styles(el: Element, styles: {
        [key: string]: string | number;
    }): void;
}

declare namespace $ {
    function $mol_dom_render_fields(el: Element, fields: {
        [key: string]: any;
    }): void;
}

declare namespace $ {
    /** Convert a pseudo-synchronous (Suspense API) API to an explicit asynchronous one (for integrating with external systems). */
    export function $mol_wire_async<Host extends object>(obj: Host): ObjectOrFunctionResultPromisify<Host>;
    type FunctionResultPromisify<Some> = Some extends (...args: infer Args) => infer Res ? Res extends PromiseLike<unknown> ? Some : (...args: Args) => Promise<Res> : Some;
    type MethodsResultPromisify<Host extends Object> = {
        [K in keyof Host]: FunctionResultPromisify<Host[K]>;
    };
    type ObjectOrFunctionResultPromisify<Some> = (Some extends (...args: any) => unknown ? FunctionResultPromisify<Some> : {}) & (Some extends Object ? MethodsResultPromisify<Some> : Some);
    export {};
}

declare namespace $ {
    class $mol_after_timeout extends $mol_object2 {
        delay: number;
        task: () => void;
        id: any;
        constructor(delay: number, task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    /**
     * Picks keys from `Input` which values extends `Upper`.
     *
     * 	type MathConstants = $mol_type_pick< Math , number > // { E , PI , ... }
     */
    type $mol_type_pick<Input, Upper> = Pick<Input, $mol_type_keys_extract<Input, Upper>>;
}

declare namespace $ {
}

/** @jsx $mol_jsx */
declare namespace $ {
    type $mol_view_content = $mol_view | Node | string | number | boolean | null;
    function $mol_view_visible_width(): number;
    function $mol_view_visible_height(): number;
    function $mol_view_state_key(suffix: string): string;
    /**
     * The base class for all visual components. It provides the infrastructure for reactive lazy rendering, handling exceptions.
     * @see https://mol.hyoo.ru/#!section=docs/=vv2nig_s5zr0f
     */
    class $mol_view extends $mol_object {
        static Root<This extends typeof $mol_view>(this: This, id: number): InstanceType<This>;
        static roots(): $mol_view[];
        static auto(): void;
        title(): string;
        hint(): string;
        focused(next?: boolean): boolean;
        state_key(suffix?: string): string;
        dom_name(): string;
        dom_name_space(): string;
        sub(): readonly $mol_view_content[];
        sub_visible(): readonly $mol_view_content[];
        minimal_width(): number;
        maximal_width(): number;
        minimal_height(): number;
        static watchers: Set<$mol_view>;
        view_rect(): {
            width: number;
            height: number;
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | null;
        dom_id(): string;
        dom_node_external(next?: Element): Element;
        dom_node(next?: Element): Element;
        dom_final(): Element | undefined;
        dom_tree(next?: Element): Element;
        dom_node_actual(): Element;
        auto(): any;
        render(): void;
        static view_classes(): (typeof $mol_view)[];
        static _view_names?: Map<string, string[]>;
        static view_names(suffix: string): string[];
        view_names_owned(): string[];
        view_names(): Set<string>;
        theme(next?: string | null): string | null | undefined;
        attr_static(): {
            [key: string]: string | number | boolean | null;
        };
        attr(): {};
        style(): {
            [key: string]: string | number;
        };
        field(): {
            [key: string]: any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        event_async(): {
            [x: string]: (event: Event) => Promise<void>;
        };
        plugins(): readonly $mol_view[];
        [$mol_dev_format_head](): any[];
        /** Deep search view by predicate. */
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
        /** Renders path of views to DOM. */
        force_render(path: Set<$mol_view>): void;
        /** Renders view to DOM and scroll to it. */
        ensure_visible(view: $mol_view, align?: ScrollLogicalPosition): void;
        bring(): void;
        destructor(): void;
    }
    type $mol_view_all = $mol_type_pick<$, typeof $mol_view>;
}

interface Window {
    cordova: any;
}
declare namespace $ {
}

declare namespace $ {
    /**
     * BuilderUI design tokens — CSS variables in --bog_builderui_*.
     * Used in .view.css.ts via $bog_builderui_tokens.text, $bog_builderui_tokens.back, etc.
     */
    const $bog_builderui_tokens: Record<"line" | "text" | "field" | "focus" | "back" | "hover" | "card" | "current" | "special" | "control" | "shade" | "font_body" | "font_head" | "radius", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
    type $mol_style_pseudo_class = ':active' | ':any' | ':any-link' | ':checked' | ':default' | ':defined' | ':dir(rtl)' | ':dir(ltr)' | ':disabled' | ':empty' | ':enabled' | ':first' | ':first-child' | ':first-of-type' | ':fullscreen' | ':focus' | ':focus-visible' | ':focus-within' | ':hover' | ':indeterminate' | ':in-range' | ':invalid' | ':last-child' | ':last-of-type' | ':left' | ':link' | `:not(${string})` | `:nth-child(${string})` | `:nth-last-child(${string})` | `:nth-of-type(${string})` | `:nth-last-of-type(${string})` | ':only-child' | ':only-of-type' | ':optional' | ':out-of-range' | ':placeholder-shown' | ':read-only' | ':read-write' | ':required' | ':right' | ':root' | ':scope' | ':target' | ':valid' | ':visited';
}

declare namespace $ {
    type $mol_style_pseudo_element = '::after' | '::before' | '::cue' | '::first-letter' | '::first-line' | '::selection' | '::slotted' | '::backdrop' | '::placeholder' | '::marker' | '::spelling-error' | '::grammar-error' | '::-webkit-calendar-picker-indicator' | '::-webkit-color-swatch' | '::-webkit-color-swatch-wrapper' | '::-webkit-details-marker' | '::-webkit-file-upload-button' | '::-webkit-image-inner-element' | '::-webkit-inner-spin-button' | '::-webkit-input-placeholder' | '::-webkit-input-speech-button' | '::-webkit-keygen-select' | '::-webkit-media-controls-panel' | '::-webkit-media-controls-timeline-container' | '::-webkit-media-slider-container' | '::-webkit-meter-bar' | '::-webkit-meter-even-less-good-value' | '::-webkit-meter-optimum-value' | '::-webkit-meter-suboptimal-value' | '::-webkit-progress-bar' | '::-webkit-progress-value' | '::-webkit-resizer' | '::-webkit-resizer:window-inactive' | '::-webkit-scrollbar' | '::-webkit-scrollbar-button' | '::-webkit-scrollbar-button:disabled' | '::-webkit-scrollbar-button:double-button:horizontal:end:decrement' | '::-webkit-scrollbar-button:double-button:horizontal:end:increment' | '::-webkit-scrollbar-button:double-button:horizontal:end:increment:corner-present' | '::-webkit-scrollbar-button:double-button:horizontal:start:decrement' | '::-webkit-scrollbar-button:double-button:horizontal:start:increment' | '::-webkit-scrollbar-button:double-button:vertical:end:decrement' | '::-webkit-scrollbar-button:double-button:vertical:end:increment' | '::-webkit-scrollbar-button:double-button:vertical:end:increment:corner-present' | '::-webkit-scrollbar-button:double-button:vertical:start:decrement' | '::-webkit-scrollbar-button:double-button:vertical:start:increment' | '::-webkit-scrollbar-button:end' | '::-webkit-scrollbar-button:end:decrement' | '::-webkit-scrollbar-button:end:increment' | '::-webkit-scrollbar-button:horizontal' | '::-webkit-scrollbar-button:horizontal:decrement' | '::-webkit-scrollbar-button:horizontal:decrement:active' | '::-webkit-scrollbar-button:horizontal:decrement:hover' | '::-webkit-scrollbar-button:horizontal:decrement:window-inactive' | '::-webkit-scrollbar-button:horizontal:end' | '::-webkit-scrollbar-button:horizontal:end:decrement' | '::-webkit-scrollbar-button:horizontal:end:increment' | '::-webkit-scrollbar-button:horizontal:end:increment:corner-present' | '::-webkit-scrollbar-button:horizontal:increment' | '::-webkit-scrollbar-button:horizontal:increment:active' | '::-webkit-scrollbar-button:horizontal:increment:hover' | '::-webkit-scrollbar-button:horizontal:increment:window-inactive' | '::-webkit-scrollbar-button:horizontal:start' | '::-webkit-scrollbar-button:horizontal:start:decrement' | '::-webkit-scrollbar-button:horizontal:start:increment' | '::-webkit-scrollbar-button:start' | '::-webkit-scrollbar-button:start:decrement' | '::-webkit-scrollbar-button:start:increment' | '::-webkit-scrollbar-button:vertical' | '::-webkit-scrollbar-button:vertical:decrement' | '::-webkit-scrollbar-button:vertical:decrement:active' | '::-webkit-scrollbar-button:vertical:decrement:hover' | '::-webkit-scrollbar-button:vertical:decrement:window-inactive' | '::-webkit-scrollbar-button:vertical:end' | '::-webkit-scrollbar-button:vertical:end:decrement' | '::-webkit-scrollbar-button:vertical:end:increment' | '::-webkit-scrollbar-button:vertical:end:increment:corner-present' | '::-webkit-scrollbar-button:vertical:increment' | '::-webkit-scrollbar-button:vertical:increment:active' | '::-webkit-scrollbar-button:vertical:increment:hover' | '::-webkit-scrollbar-button:vertical:increment:window-inactive' | '::-webkit-scrollbar-button:vertical:start' | '::-webkit-scrollbar-button:vertical:start:decrement' | '::-webkit-scrollbar-button:vertical:start:increment' | '::-webkit-scrollbar-corner' | '::-webkit-scrollbar-corner:window-inactive' | '::-webkit-scrollbar-thumb' | '::-webkit-scrollbar-thumb:horizontal' | '::-webkit-scrollbar-thumb:horizontal:active' | '::-webkit-scrollbar-thumb:horizontal:hover' | '::-webkit-scrollbar-thumb:horizontal:window-inactive' | '::-webkit-scrollbar-thumb:vertical' | '::-webkit-scrollbar-thumb:vertical:active' | '::-webkit-scrollbar-thumb:vertical:hover' | '::-webkit-scrollbar-thumb:vertical:window-inactive' | '::-webkit-scrollbar-track' | '::-webkit-scrollbar-track-piece' | '::-webkit-scrollbar-track-piece:disabled' | '::-webkit-scrollbar-track-piece:end' | '::-webkit-scrollbar-track-piece:horizontal:decrement' | '::-webkit-scrollbar-track-piece:horizontal:decrement:active' | '::-webkit-scrollbar-track-piece:horizontal:decrement:hover' | '::-webkit-scrollbar-track-piece:horizontal:end' | '::-webkit-scrollbar-track-piece:horizontal:end:corner-present' | '::-webkit-scrollbar-track-piece:horizontal:end:double-button' | '::-webkit-scrollbar-track-piece:horizontal:end:no-button' | '::-webkit-scrollbar-track-piece:horizontal:end:no-button:corner-present' | '::-webkit-scrollbar-track-piece:horizontal:end:single-button' | '::-webkit-scrollbar-track-piece:horizontal:increment' | '::-webkit-scrollbar-track-piece:horizontal:increment:active' | '::-webkit-scrollbar-track-piece:horizontal:increment:hover' | '::-webkit-scrollbar-track-piece:horizontal:start' | '::-webkit-scrollbar-track-piece:horizontal:start:double-button' | '::-webkit-scrollbar-track-piece:horizontal:start:no-button' | '::-webkit-scrollbar-track-piece:horizontal:start:single-button' | '::-webkit-scrollbar-track-piece:start' | '::-webkit-scrollbar-track-piece:vertical:decrement' | '::-webkit-scrollbar-track-piece:vertical:decrement:active' | '::-webkit-scrollbar-track-piece:vertical:decrement:hover' | '::-webkit-scrollbar-track-piece:vertical:end' | '::-webkit-scrollbar-track-piece:vertical:end:corner-present' | '::-webkit-scrollbar-track-piece:vertical:end:double-button' | '::-webkit-scrollbar-track-piece:vertical:end:no-button' | '::-webkit-scrollbar-track-piece:vertical:end:no-button:corner-present' | '::-webkit-scrollbar-track-piece:vertical:end:single-button' | '::-webkit-scrollbar-track-piece:vertical:increment' | '::-webkit-scrollbar-track-piece:vertical:increment:active' | '::-webkit-scrollbar-track-piece:vertical:increment:hover' | '::-webkit-scrollbar-track-piece:vertical:start' | '::-webkit-scrollbar-track-piece:vertical:start:double-button' | '::-webkit-scrollbar-track-piece:vertical:start:no-button' | '::-webkit-scrollbar-track-piece:vertical:start:single-button' | '::-webkit-scrollbar-track:disabled' | '::-webkit-scrollbar-track:horizontal' | '::-webkit-scrollbar-track:horizontal:disabled' | '::-webkit-scrollbar-track:horizontal:disabled:corner-present' | '::-webkit-scrollbar-track:vertical:disabled' | '::-webkit-scrollbar-track:vertical:disabled:corner-present' | '::-webkit-scrollbar:horizontal' | '::-webkit-scrollbar:horizontal:corner-present' | '::-webkit-scrollbar:horizontal:window-inactive' | '::-webkit-scrollbar:vertical' | '::-webkit-scrollbar:vertical:corner-present' | '::-webkit-scrollbar:vertical:window-inactive' | '::-webkit-search-cancel-button' | '::-webkit-search-decoration' | '::-webkit-search-results-button' | '::-webkit-search-results-decoration' | '::-webkit-slider-container' | '::-webkit-slider-runnable-track' | '::-webkit-slider-thumb' | '::-webkit-slider-thumb:disabled' | '::-webkit-slider-thumb:hover' | '::-webkit-textfield-decoration-container' | '::-webkit-validation-bubble' | '::-webkit-validation-bubble-arrow' | '::-webkit-validation-bubble-arrow-clipper' | '::-webkit-validation-bubble-heading' | '::-webkit-validation-bubble-message' | '::-webkit-validation-bubble-text-block';
}

declare namespace $ {
    /** Returns error type, that don't match to normal value. */
    type $mol_type_error<Message, Info = {}> = Message & {
        $mol_type_error: Info;
    };
}

declare namespace $ {
    type Attrs<View extends $mol_view, Config, Attrs = ReturnType<View['attr']>> = {
        [name in keyof Attrs]?: {
            [val in keyof Config[Extract<name, keyof Config>]]: $mol_style_guard<View, Config[Extract<name, keyof Config>][val]>;
        };
    };
    type Medias<View extends $mol_view, Config> = {
        [query in keyof Config]: $mol_style_guard<View, Config[query]>;
    };
    type Keys<View extends $mol_view> = '>' | '@' | keyof $mol_style_properties | $mol_style_pseudo_element | $mol_style_pseudo_class | $mol_type_keys_extract<View, () => $mol_view> | `$${string}`;
    export type $mol_style_guard<View extends $mol_view, Config> = {
        [key in Keys<View>]?: unknown;
    } & $mol_style_properties & {
        [key in keyof Config]: key extends keyof $mol_style_properties ? $mol_style_properties[key] : key extends '>' | $mol_style_pseudo_class | $mol_style_pseudo_element ? $mol_style_guard<View, Config[key]> : key extends '@' ? Attrs<View, Config[key]> : key extends ('@media' | '@container') ? Medias<View, Config[key]> : key extends '@starting-style' ? $mol_style_guard<View, Config[key]> : key extends `[${string}]` ? {
            [val in keyof Config[key]]: $mol_style_guard<View, Config[key][val]>;
        } : key extends `--${string}` ? any : key extends keyof $ ? $mol_style_guard<InstanceType<Extract<$[key], typeof $mol_view>>, Config[key]> : key extends keyof View ? View[key] extends (id?: any) => infer Sub ? Sub extends $mol_view ? $mol_style_guard<Sub, Config[key]> : $mol_type_error<'Property returns non $mol_view', {
            Returns: Sub;
        }> : $mol_type_error<'Field is not a Property'> : key extends `$${string}` ? $mol_type_error<'Unknown View Class'> : $mol_type_error<'Unknown CSS Property'>;
    };
    export {};
}

declare namespace $ {
    function $mol_style_sheet<Component extends $mol_view, Config extends $mol_style_guard<Component, Config>>(Component: new () => Component, config0: Config): string;
}

declare namespace $ {
    /**
     * CSS in TS.
     * Statically typed CSS style sheets. Following samples show which CSS code are generated from TS code.
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    function $mol_style_define<Component extends $mol_view, Config extends $mol_style_guard<Component, Config>>(Component: new () => Component, config: Config): HTMLStyleElement | null;
}

declare namespace $ {
    /** Plugin is component without its own DOM element, but instead uses the owner DOM element */
    class $mol_plugin extends $mol_view {
        dom_node_external(next?: Element): Element;
        render(): void;
    }
}

declare namespace $ {

	export class $bog_builderui_div extends $mol_view {
	}
	
}

//# sourceMappingURL=div.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    const $bog_theme: Record<"image" | "line" | "text" | "field" | "focus" | "background" | "back" | "hover" | "card" | "current" | "special" | "control" | "shade" | "spirit", $mol_style_func<"var", unknown>>;
    /**
     * Available theme names.
     * Add new theme to theme.css and add its name here.
     */
    const $bog_theme_names: readonly ["$mol_theme_giper_smash_dark", "$mol_theme_giper_smash_light", "$mol_theme_light", "$mol_theme_dark", "$mol_theme_monefro_light", "$mol_theme_monefro_dark", "$mol_theme_homerent_light", "$mol_theme_homerent_dark", "$mol_theme_upwork", "$mol_theme_ainews_light", "$mol_theme_ainews_dark", "$mol_theme_calm_dark", "$mol_theme_calm_light"];
    /**
     * Type-safe theme name
     */
    type $bog_theme_name = (typeof $bog_theme_names)[number];
}

declare namespace $ {
}

declare namespace $ {
    class $mol_storage extends $mol_object2 {
        /** Is storage a long term. */
        static persisted(next?: boolean): boolean;
        /** Total storage quota in bytes. */
        static total(): number;
        /** Total storage usage in bytes. */
        static used(): number;
        /** Minimum available free space in bytes. */
        static free(): number;
        /** Fulfillness of storage. */
        static portion(): number;
        /**
         * Fulfillness logarithmic level.
         * `0` - empty
         * `1` - half free
         * `2` - quart free
         * `Infinity` - fulfilled
         */
        static level(): number;
    }
}

declare namespace $ {
    let $mol_mem_persist: typeof $mol_wire_solid;
}

declare namespace $ {
    let $mol_mem_cached: typeof $mol_wire_probe;
}

declare namespace $ {
    /**
     * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    export function $mol_wire_sync<Host extends object>(obj: Host): ObjectOrFunctionResultAwaited<Host>;
    type FunctionResultAwaited<Some> = Some extends (...args: infer Args) => infer Res ? (...args: Args) => Awaited<Res> : Some;
    type ConstructorResultAwaited<Some> = Some extends new (...args: infer Args) => infer Res ? new (...args: Args) => Res : {};
    type MethodsResultAwaited<Host extends Object> = {
        [K in keyof Host]: FunctionResultAwaited<Host[K]>;
    };
    type ObjectOrFunctionResultAwaited<Some> = (Some extends (...args: any) => unknown ? FunctionResultAwaited<Some> : {}) & (Some extends Object ? MethodsResultAwaited<Some> & ConstructorResultAwaited<Some> : Some);
    export {};
}

declare namespace $ {
    function $mol_wait_user_async(this: $): Promise<unknown>;
    function $mol_wait_user(this: $): unknown;
}

declare namespace $ {
    /** State of time moment */
    class $mol_state_time extends $mol_object {
        static task(precision: number, reset?: null): $mol_after_timeout | $mol_after_frame;
        static now(precision: number): number;
    }
}

declare namespace $ {
    class $mol_storage_web extends $mol_storage {
        static native(): StorageManager;
        static persisted(next?: boolean, cache?: 'cache'): boolean;
        static estimate(): StorageEstimate;
        static total(): number;
        static used(): number;
        static free(): number;
        static portion(): number;
        static dir(): FileSystemDirectoryHandle;
    }
}

declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static changes(next?: StorageEvent): StorageEvent | undefined;
        static value<Value>(key: string, next?: Value | null): Value | null;
        prefix(): string;
        value(key: string, next?: Value): Value | null;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}

declare namespace $ {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber from [mol_wire](../wire/README.md)
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    let $mol_action: typeof $mol_wire_method;
}

declare namespace $ {
    /** State of arguments like `#foo=bar/xxx` or `?foo=bar&xxx` */
    class $mol_state_arg extends $mol_object {
        prefix: string;
        static href(next?: string): string;
        static href_normal(): string;
        static href_absolute(): string;
        static dict(next?: {
            [key: string]: string | null;
        }): Readonly<{
            [key: string]: string;
        }>;
        static dict_cut(except: string[]): {
            [key: string]: string;
        };
        static value(key: string, next?: string | null): string | null;
        static link(next: Record<string, string | null>): string;
        static prolog: string;
        static separator: string;
        static make_link(next: {
            [key: string]: string | null;
        }): string;
        static commit(): void;
        static go(next: {
            [key: string]: string | null;
        }): void;
        static encode(str: string): string;
        constructor(prefix?: string);
        value(key: string, next?: string): string | null;
        sub(postfix: string): $mol_state_arg;
        link(next: Record<string, string | null>): string;
    }
}

declare namespace $ {
    class $mol_media extends $mol_object2 {
        static match(query: string, next?: boolean): boolean;
    }
}

declare namespace $ {
    /**
     * Switcher between light/dark themes (usually for `mol_theme_auto` plugin).
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_lights_demo
     */
    function $mol_lights(this: $, next?: boolean): boolean;
}

declare namespace $ {

	export class $bog_theme_auto extends $mol_plugin {
		themes_default( ): readonly(any)[]
		theme( ): string
		themes( ): ReturnType< $bog_theme_auto['themes_default'] >
		theme_light( ): string
		theme_dark( ): string
		mode( next?: string ): string
		mode_next( next?: any ): any
		theme_next( next?: any ): any
		theme_prev( next?: any ): any
		theme_set( next?: any ): any
		is_light_now( ): boolean
		attr( ): ({ 
			'mol_theme': ReturnType< $bog_theme_auto['theme'] >,
		}) 
	}
	
}

//# sourceMappingURL=auto.view.tree.d.ts.map
declare namespace $.$$ {
    type $bog_theme_mode = 'light' | 'dark' | 'system' | 'custom';
    class $bog_theme_auto extends $.$bog_theme_auto {
        themes_default(): readonly $.$bog_theme_name[];
        /** Stores current mode in localStorage. Defaults to 'system'.
         *  При записи дёргает класс `.bog_theme_switching` на `<html>` —
         *  это активирует CSS-transition'ы на цветах темы.
         */
        mode(next?: $bog_theme_mode): $bog_theme_mode;
        click_step(next?: number): number;
        /** 3-click cycle: opposite → back → system. */
        mode_next(): void;
        is_light_now(): any;
        theme_index(next?: number): number;
        system_theme_index(): number;
        theme(): any;
        theme_next(): void;
        theme_prev(): void;
        /** Called by picker. Sets mode to light/dark or custom for themed palettes. */
        theme_set(index: number): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_image extends $mol_view {
		uri( ): string
		title( ): string
		loading( ): string
		decoding( ): string
		cors( ): any
		natural_width( ): number
		natural_height( ): number
		load( next?: any ): any
		dom_name( ): string
		attr( ): Record<string, any> & ReturnType< $mol_view['attr'] >
		event( ): Record<string, any>
		minimal_width( ): number
		minimal_height( ): number
	}
	
}

//# sourceMappingURL=image.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_image extends $.$mol_image {
        natural_width(next?: null): number;
        natural_height(next?: null): number;
        load(): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_lock extends $mol_object {
        protected promise: null | Promise<void>;
        wait(): Promise<() => void>;
        grab(): () => void;
    }
}

declare namespace $ {
    function $mol_compare_array<Value extends ArrayLike<unknown>>(a: Value, b: Value): boolean;
}

declare namespace $ {
    type $mol_charset_encoding = 'utf8' | 'utf-16le' | 'utf-16be' | 'ibm866' | 'iso-8859-2' | 'iso-8859-3' | 'iso-8859-4' | 'iso-8859-5' | 'iso-8859-6' | 'iso-8859-7' | 'iso-8859-8' | 'iso-8859-8i' | 'iso-8859-10' | 'iso-8859-13' | 'iso-8859-14' | 'iso-8859-15' | 'iso-8859-16' | 'koi8-r' | 'koi8-u' | 'koi8-r' | 'macintosh' | 'windows-874' | 'windows-1250' | 'windows-1251' | 'windows-1252' | 'windows-1253' | 'windows-1254' | 'windows-1255' | 'windows-1256' | 'windows-1257' | 'windows-1258' | 'x-mac-cyrillic' | 'gbk' | 'gb18030' | 'hz-gb-2312' | 'big5' | 'euc-jp' | 'iso-2022-jp' | 'shift-jis' | 'euc-kr' | 'iso-2022-kr';
}

declare namespace $ {
    function $mol_charset_decode(buffer: AllowSharedBufferSource, encoding?: $mol_charset_encoding): string;
}

declare namespace $ {
    /** Temporary buffer. Recursive usage isn't supported. */
    function $mol_charset_buffer(size: number): Uint8Array<ArrayBuffer>;
}

declare namespace $ {
    function $mol_charset_encode(str: string): Uint8Array<ArrayBuffer>;
    function $mol_charset_encode_to(str: string, buf: Uint8Array<ArrayBuffer>, from?: number): number;
    function $mol_charset_encode_size(str: string): number;
}

declare namespace $ {
    type $mol_file_transaction_mode = 'create' | 'exists_truncate' | 'exists_fail' | 'read_only' | 'write_only' | 'read_write' | 'append';
    type $mol_file_transaction_buffer = ArrayBufferView;
    class $mol_file_transaction extends $mol_object {
        path(): string;
        modes(): readonly $mol_file_transaction_mode[];
        write(options: {
            buffer: ArrayBufferView | string | readonly ArrayBufferView[];
            offset?: number | null;
            length?: number | null;
            position?: number | null;
        }): number;
        read(): Uint8Array<ArrayBuffer>;
        truncate(size: number): void;
        flush(): void;
        close(): void;
        destructor(): void;
    }
}

declare namespace $ {
    class $mol_file_base extends $mol_object {
        static absolute<This extends typeof $mol_file_base>(this: This, path: string): InstanceType<This>;
        static relative<This extends typeof $mol_file_base>(this: This, path: string): InstanceType<This>;
        static base: string;
        path(): string;
        parent(): this;
        exists_cut(): boolean;
        protected root(): boolean;
        protected stat(next?: $mol_file_stat | null, virt?: 'virt'): $mol_file_stat | null;
        protected static changed: Set<$mol_file_base>;
        protected static frame: null | $mol_after_timeout;
        protected static changed_add(type: 'change' | 'rename', path: string): void;
        /**
         * Должно быть больше, чем время между событиями от вотчера при записи внешним процессом.
         * Иначе запуск ресетов паралельно с изменением может привести к неконсистентности.
         */
        static watch_debounce(): number;
        static flush(): void;
        protected static watching: boolean;
        protected static lock: $mol_lock;
        protected static watch_off(path: string): void;
        static unwatched<Result>(side_effect: () => Result, affected_dir: string): Result;
        reset(): void;
        modified(): Date | null;
        version(): string;
        protected info(path: string): null | $mol_file_stat;
        protected ensure(): void;
        protected drop(): void;
        protected copy(to: string): void;
        protected read(): Uint8Array<ArrayBuffer>;
        protected write(buffer: Uint8Array<ArrayBuffer>): void;
        protected kids(): readonly this[];
        readable(opts: {
            start?: number;
            end?: number;
        }): ReadableStream<Uint8Array<ArrayBuffer>>;
        writable(opts: {
            start?: number;
        }): WritableStream<Uint8Array<ArrayBuffer>>;
        buffer(next?: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer>;
        stat_make(size: number): {
            readonly type: "file";
            readonly size: number;
            readonly atime: Date;
            readonly mtime: Date;
            readonly ctime: Date;
        };
        clone(to: string): this | null;
        watcher(): {
            destructor(): void;
        };
        exists(next?: boolean): boolean;
        type(): "" | $mol_file_type;
        name(): string;
        ext(): string;
        text(next?: string, virt?: 'virt'): string;
        text_int(next?: string, virt?: 'virt'): string;
        sub(reset?: null): this[];
        resolve(path: string): this;
        relate(base?: $mol_file_base): string;
        find(include?: RegExp, exclude?: RegExp): this[];
        size(): number;
        toJSON(): string;
        open(...modes: readonly $mol_file_transaction_mode[]): $mol_file_transaction;
    }
}

declare namespace $ {
    type $mol_file_type = 'file' | 'dir' | 'link';
    interface $mol_file_stat {
        type: $mol_file_type;
        size: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
    }
    class $mol_file extends $mol_file_base {
    }
}

declare namespace $ {
    enum $mol_rest_code {
        'Continue' = 100,
        'Switching protocols' = 101,
        'Processing' = 102,
        'OK' = 200,
        'Created' = 201,
        'Accepted' = 202,
        'Non-Authoritative Information' = 203,
        'No Content' = 204,
        'Reset Content' = 205,
        'Partial Content' = 206,
        'Multi Status' = 207,
        'Already Reported' = 208,
        'IM Used' = 226,
        'Multiple Choices' = 300,
        'Moved Permanently' = 301,
        'Found' = 302,
        'See Other' = 303,
        'Not Modified' = 304,
        'Use Proxy' = 305,
        'Temporary Redirect' = 307,
        'Bad Request' = 400,
        'Unauthorized' = 401,
        'Payment Required' = 402,
        'Forbidden' = 403,
        'Not Found' = 404,
        'Method Not Allowed' = 405,
        'Not Acceptable' = 406,
        'Proxy Authentication Required' = 407,
        'Request Timeout' = 408,
        'Conflict' = 409,
        'Gone' = 410,
        'Length Required' = 411,
        'Precondition Failed' = 412,
        'Request Entity Too Large' = 413,
        'Request URI Too Long' = 414,
        'Unsupported Media Type' = 415,
        'Requested Range Not Satisfiable' = 416,
        'Expectation Failed' = 417,
        'Teapot' = 418,
        'Unprocessable Entity' = 422,
        'Locked' = 423,
        'Failed Dependency' = 424,
        'Upgrade Required' = 426,
        'Precondition Required' = 428,
        'Too Many Requests' = 429,
        'Request Header Fields Too Large' = 431,
        'Unavailable For Legal Reasons' = 451,
        'Internal Server Error' = 500,
        'Not Implemented' = 501,
        'Bad Gateway' = 502,
        'Service Unavailable' = 503,
        'Gateway Timeout' = 504,
        'HTTP Version Not Supported' = 505,
        'Insufficient Storage' = 507,
        'Loop Detected' = 508,
        'Not Extended' = 510,
        'Network Authentication Required' = 511,
        'Network Read Timeout Error' = 598,
        'Network Connect Timeout Error' = 599
    }
}

declare namespace $ {
    class $mol_error_mix<Cause extends {} = {}> extends AggregateError {
        readonly cause: Cause;
        name: string;
        constructor(message: string, cause?: Cause, ...errors: readonly Error[]);
        static [Symbol.toPrimitive](): string;
        static toString(): string;
        static make(...params: ConstructorParameters<typeof $mol_error_mix>): $mol_error_mix<{}>;
    }
}

declare namespace $ {
    function $mol_error_fence<Data>(task: () => Data, fallback: (parent: Error) => Error | Data | PromiseLike<Data>, loading?: (parent: PromiseLike<Data>) => Error | Data | PromiseLike<Data>): Data;
}

declare namespace $ {
    function $mol_error_enriched<V>(cause: {}, cb: () => V): V;
}

declare namespace $ {
    function $mol_dom_parse(text: string, type?: DOMParserSupportedType): Document;
}

declare namespace $ {
    class $mol_fetch_response extends $mol_object {
        readonly native: Response;
        readonly request: $mol_fetch_request;
        status(): "success" | "unknown" | "inform" | "redirect" | "wrong" | "failed";
        code(): number;
        ok(): boolean;
        message(): string;
        headers(): Headers;
        mime(): string | null;
        stream(): ReadableStream<Uint8Array<ArrayBuffer>> | null;
        text(): string;
        json(): unknown;
        blob(): Blob;
        buffer(): ArrayBuffer;
        xml(): Document;
        xhtml(): Document;
        html(): Document;
    }
    class $mol_fetch_request extends $mol_object {
        readonly native: Request;
        response_async(): Promise<Response> & {
            destructor: () => void;
        };
        response(): $mol_fetch_response;
        success(): $mol_fetch_response;
    }
    class $mol_fetch extends $mol_object {
        static request(input: RequestInfo, init?: RequestInit): $mol_fetch_request;
        static response(input: RequestInfo, init?: RequestInit): $mol_fetch_response;
        static success(input: RequestInfo, init?: RequestInit): $mol_fetch_response;
        static stream(input: RequestInfo, init?: RequestInit): ReadableStream<Uint8Array<ArrayBuffer>> | null;
        static text(input: RequestInfo, init?: RequestInit): string;
        static json(input: RequestInfo, init?: RequestInit): unknown;
        static blob(input: RequestInfo, init?: RequestInit): Blob;
        static buffer(input: RequestInfo, init?: RequestInit): ArrayBuffer;
        static xml(input: RequestInfo, init?: RequestInit): Document;
        static xhtml(input: RequestInfo, init?: RequestInit): Document;
        static html(input: RequestInfo, init?: RequestInit): Document;
    }
}

declare namespace $ {
    class $mol_file_webdav extends $mol_file_base {
        static relative<This extends typeof $mol_file>(this: This, path: string): InstanceType<This>;
        resolve(path: string): this;
        static headers(): Record<string, string>;
        headers(): Record<string, string>;
        protected fetch(init: RequestInit): $mol_fetch_response;
        protected read(): Uint8Array<ArrayBuffer>;
        protected write(body: Uint8Array<ArrayBuffer>): void;
        protected ensure(): void;
        protected drop(): void;
        protected copy(to: string): void;
        protected kids(): this[];
        readable(opts: {
            start?: number;
            end?: number;
        }): ReadableStream<Uint8Array<ArrayBuffer>>;
        protected info(): $mol_file_stat | null;
    }
}

declare namespace $ {
    class $mol_file_web extends $mol_file_webdav {
        static base: string;
        version(): string;
        protected info(): $mol_file_stat | null;
    }
}

declare namespace $ {
    interface $mol_locale_dict {
        [key: string]: string;
    }
    /**
     * Localisation in $mol framework
     * @see https://mol.hyoo.ru/#!section=docs/=s5aqnb_odub8l
     */
    class $mol_locale extends $mol_object {
        static lang_default(): string;
        static lang(next?: string): string;
        static langs_rtl(): string[];
        static direction(): "rtl" | "ltr";
        static source(lang: string): any;
        static texts(lang: string, next?: $mol_locale_dict): $mol_locale_dict;
        static text(key: string): string;
        static warn(key: string): null;
    }
}

declare namespace $ {
    function $mol_dom_safe_uri(uri: string): string;
    function $mol_dom_safe_attr(val: string): string;
    let $mol_dom_safe_rules: Record<string, Record<string, (val: string) => string>>;
    function $mol_dom_safe(this: $, nodes: ChildNode[]): ChildNode[];
}

declare namespace $ {

	export class $mol_link extends $mol_view {
		uri_toggle( ): string
		uri_unsafe( ): ReturnType< $mol_link['uri_toggle'] >
		hint( ): string
		hint_safe( ): ReturnType< $mol_link['hint'] >
		target( ): string
		file_name( ): string
		current( ): boolean
		relation( ): string
		event_click( next?: any ): any
		click( next?: ReturnType< $mol_link['event_click'] > ): ReturnType< $mol_link['event_click'] >
		uri( ): string
		dom_name( ): string
		uri_off( ): string
		uri_native( ): any
		external( ): boolean
		attr( ): ({ 
			'href': ReturnType< $mol_link['uri_unsafe'] >,
			'title': ReturnType< $mol_link['hint_safe'] >,
			'target': ReturnType< $mol_link['target'] >,
			'download': ReturnType< $mol_link['file_name'] >,
			'mol_link_current': ReturnType< $mol_link['current'] >,
			'rel': ReturnType< $mol_link['relation'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		arg( ): Record<string, any>
		event( ): ({ 
			click( next?: ReturnType< $mol_link['click'] > ): ReturnType< $mol_link['click'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=link.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Dynamic hyperlink. It can add, change or remove parameters. A link that leads to the current page has [mol_link_current] attribute set to true.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_link_demo
     */
    class $mol_link extends $.$mol_link {
        uri_toggle(): string;
        uri(): string;
        uri_off(): string;
        uri_native(): URL;
        current(): boolean;
        file_name(): string;
        minimal_height(): number;
        external(): boolean;
        target(): '_self' | '_blank' | '_top' | '_parent' | string;
        hint_safe(): string;
        uri_unsafe(): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_svg extends $mol_view {
		dom_name( ): string
		dom_name_space( ): string
		font_size( ): number
		font_family( ): string
		style_size( ): Record<string, any>
	}
	
}

//# sourceMappingURL=svg.view.tree.d.ts.map
declare namespace $.$$ {
    /** Base SVG component to display SVG images or icons. */
    class $mol_svg extends $.$mol_svg {
        computed_style(): Record<string, any>;
        font_size(): number;
        font_family(): any;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_svg_root extends $mol_svg {
		view_box( ): string
		aspect( ): string
		dom_name( ): string
		attr( ): ({ 
			'viewBox': ReturnType< $mol_svg_root['view_box'] >,
			'preserveAspectRatio': ReturnType< $mol_svg_root['aspect'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=root.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_path extends $mol_svg {
		geometry( ): string
		dom_name( ): string
		attr( ): ({ 
			'd': ReturnType< $mol_svg_path['geometry'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=path.view.tree.d.ts.map
declare namespace $ {
    /**
     * Fails if `Actual` type is not subtype of `Expected`.
     */
    type $mol_type_enforce<Actual extends Expected, Expected> = Actual;
}

declare namespace $ {
}

declare namespace $ {

	type $mol_svg_path__geometry_mol_icon_1 = $mol_type_enforce<
		ReturnType< $mol_icon['path'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	export class $mol_icon extends $mol_svg_root {
		path( ): string
		Path( ): $mol_svg_path
		view_box( ): string
		minimal_width( ): number
		minimal_height( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_magnify extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=magnify.view.tree.d.ts.map
declare namespace $ {
    /**
     * Z-index values for layers
     * https://page.hyoo.ru/#!=xthcpx_wqmiba
     */
    let $mol_layer: Record<"focus" | "float" | "hover" | "speck" | "popup", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_speck extends $mol_view {
		value( ): any
		theme( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=speck.view.tree.d.ts.map
declare namespace $ {

	type $mol_speck__value_mol_button_1 = $mol_type_enforce<
		ReturnType< $mol_button['error'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	export class $mol_button extends $mol_view {
		event_activate( next?: any ): any
		activate( next?: ReturnType< $mol_button['event_activate'] > ): ReturnType< $mol_button['event_activate'] >
		clicks( next?: any ): any
		event_key_press( next?: any ): any
		key_press( next?: ReturnType< $mol_button['event_key_press'] > ): ReturnType< $mol_button['event_key_press'] >
		disabled( ): boolean
		tab_index( ): number
		hint( ): string
		hint_safe( ): ReturnType< $mol_button['hint'] >
		error( ): string
		enabled( ): boolean
		click( next?: any ): any
		event_click( next?: any ): any
		status( next?: readonly(any)[] ): readonly(any)[]
		event( ): ({ 
			click( next?: ReturnType< $mol_button['activate'] > ): ReturnType< $mol_button['activate'] >,
			dblclick( next?: ReturnType< $mol_button['clicks'] > ): ReturnType< $mol_button['clicks'] >,
			keydown( next?: ReturnType< $mol_button['key_press'] > ): ReturnType< $mol_button['key_press'] >,
		})  & ReturnType< $mol_view['event'] >
		attr( ): ({ 
			'disabled': ReturnType< $mol_button['disabled'] >,
			'role': string,
			'tabindex': ReturnType< $mol_button['tab_index'] >,
			'title': ReturnType< $mol_button['hint_safe'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		Speck( ): $mol_speck
	}
	
}

//# sourceMappingURL=button.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Simple button.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
     */
    class $mol_button extends $.$mol_button {
        disabled(): boolean;
        event_activate(next: Event): void;
        event_key_press(event: KeyboardEvent): any;
        tab_index(): number;
        error(): string;
        hint_safe(): string;
        sub_visible(): ($mol_view_content | $mol_speck)[];
    }
}

declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_button_typed extends $mol_button {
		minimal_height( ): number
		minimal_width( ): number
	}
	
}

//# sourceMappingURL=typed.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	export class $mol_button_minor extends $mol_button_typed {
	}
	
}

//# sourceMappingURL=minor.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=chevron.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_down extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=down.view.tree.d.ts.map
declare namespace $ {

	export class $mol_ghost extends $mol_view {
		Sub( ): $mol_view
	}
	
}

//# sourceMappingURL=ghost.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Mixin view logic to DOM node of another component.
     */
    class $mol_ghost extends $.$mol_ghost {
        dom_node_external(next?: Element): Element;
        dom_node_actual(): Element;
        dom_tree(): Element;
        title(): string;
        minimal_width(): number;
        minimal_height(): number;
    }
}

declare namespace $ {

	export class $mol_follower extends $mol_ghost {
		transform( ): string
		Anchor( ): $mol_view
		align( ): readonly(number)[]
		offset( ): readonly(number)[]
		style( ): ({ 
			'transform': ReturnType< $mol_follower['transform'] >,
		})  & ReturnType< $mol_ghost['style'] >
	}
	
}

//# sourceMappingURL=follower.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Marker on top of another component with tracking of its position.
     */
    class $mol_follower extends $.$mol_follower {
        pos(): {
            left: number;
            top: number;
        } | null;
        transform(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_dom_listener extends $mol_object {
        _node: any;
        _event: string;
        _handler: (event: any) => any;
        _config: boolean | {
            passive: boolean;
        };
        constructor(_node: any, _event: string, _handler: (event: any) => any, _config?: boolean | {
            passive: boolean;
        });
        destructor(): void;
    }
}

declare namespace $ {
    class $mol_print extends $mol_object {
        static before(): $mol_dom_listener;
        static after(): $mol_dom_listener;
        static active(next?: boolean): boolean;
    }
}

declare namespace $ {

	export class $mol_scroll extends $mol_view {
		tabindex( ): number
		event_scroll( next?: any ): any
		scroll_top( next?: number ): number
		scroll_left( next?: number ): number
		attr( ): ({ 
			'tabindex': ReturnType< $mol_scroll['tabindex'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			scroll( next?: ReturnType< $mol_scroll['event_scroll'] > ): ReturnType< $mol_scroll['event_scroll'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=scroll.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Scrolling pane.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_scroll_demo
     */
    class $mol_scroll extends $.$mol_scroll {
        scroll_top(next?: number, cache?: 'cache'): number;
        scroll_left(next?: number, cache?: 'cache'): number;
        event_scroll(next?: Event): void;
        minimal_height(): number;
        minimal_width(): number;
    }
}

declare namespace $.$$ {
}

declare namespace $ {

	type $mol_pop_bubble__content_mol_pop_1 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_content'] >
		,
		ReturnType< $mol_pop_bubble['content'] >
	>
	type $mol_pop_bubble__height_max_mol_pop_2 = $mol_type_enforce<
		ReturnType< $mol_pop['height_max'] >
		,
		ReturnType< $mol_pop_bubble['height_max'] >
	>
	type $mol_follower__offset_mol_pop_3 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_offset'] >
		,
		ReturnType< $mol_follower['offset'] >
	>
	type $mol_follower__align_mol_pop_4 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_align'] >
		,
		ReturnType< $mol_follower['align'] >
	>
	type $mol_follower__Anchor_mol_pop_5 = $mol_type_enforce<
		ReturnType< $mol_pop['Anchor'] >
		,
		ReturnType< $mol_follower['Anchor'] >
	>
	type $mol_follower__Sub_mol_pop_6 = $mol_type_enforce<
		ReturnType< $mol_pop['Bubble'] >
		,
		ReturnType< $mol_follower['Sub'] >
	>
	export class $mol_pop extends $mol_view {
		bubble( ): any
		Anchor( ): any
		bubble_offset( ): readonly(number)[]
		bubble_align( ): readonly(number)[]
		bubble_content( ): readonly($mol_view_content)[]
		height_max( ): number
		Bubble( ): $mol_pop_bubble
		Follower( ): $mol_follower
		showed( next?: boolean ): boolean
		align_vert( ): string
		align_hor( ): string
		align( ): string
		prefer( ): string
		auto( ): readonly(any)[]
		sub( ): readonly(any)[]
		sub_visible( ): readonly(any)[]
	}
	
	export class $mol_pop_bubble extends $mol_view {
		content( ): readonly($mol_view_content)[]
		height_max( ): number
		sub( ): ReturnType< $mol_pop_bubble['content'] >
		style( ): ({ 
			'maxHeight': ReturnType< $mol_pop_bubble['height_max'] >,
		})  & ReturnType< $mol_view['style'] >
		attr( ): ({ 
			'tabindex': number,
			'popover': string,
		})  & ReturnType< $mol_view['attr'] >
	}
	
}

//# sourceMappingURL=pop.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * `Bubble` that can be shown anchored to `Anchor` element.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo
     */
    class $mol_pop extends $.$mol_pop {
        showed(next?: boolean): boolean;
        sub_visible(): any[];
        height_max(): number;
        align(): string;
        align_vert(): "suspense" | "top" | "bottom";
        align_hor(): "suspense" | "left" | "right";
        bubble_offset(): number[];
        bubble_align(): number[];
        bubble(): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_dom_event<EventType extends Event> extends $mol_object {
        readonly native: EventType;
        constructor(native: EventType);
        prevented(next?: boolean): boolean;
        static wrap<EventType extends Event>(event: EventType): $mol_dom_event<EventType>;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_view__sub_mol_check_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_check extends $mol_button_minor {
		checked( next?: boolean ): boolean
		aria_checked( ): string
		aria_role( ): string
		Icon( ): any
		title( ): string
		Title( ): $mol_view
		label( ): readonly(any)[]
		attr( ): ({ 
			'mol_check_checked': ReturnType< $mol_check['checked'] >,
			'aria-checked': ReturnType< $mol_check['aria_checked'] >,
			'role': ReturnType< $mol_check['aria_role'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		sub( ): readonly($mol_view_content)[]
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Checkbox UI component. See Variants for more concrete implementations.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_box_demo
     */
    class $mol_check extends $.$mol_check {
        click(next?: Event): void;
        sub(): readonly $mol_view_content[];
        label(): readonly any[];
        aria_checked(): string;
    }
}

declare namespace $ {

	type $mol_check__minimal_width_mol_pick_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_width'] >
	>
	type $mol_check__minimal_height_mol_pick_2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_height'] >
	>
	type $mol_check__enabled_mol_pick_3 = $mol_type_enforce<
		ReturnType< $mol_pick['trigger_enabled'] >
		,
		ReturnType< $mol_check['enabled'] >
	>
	type $mol_check__checked_mol_pick_4 = $mol_type_enforce<
		ReturnType< $mol_pick['showed'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__clicks_mol_pick_5 = $mol_type_enforce<
		ReturnType< $mol_pick['clicks'] >
		,
		ReturnType< $mol_check['clicks'] >
	>
	type $mol_check__sub_mol_pick_6 = $mol_type_enforce<
		ReturnType< $mol_pick['trigger_content'] >
		,
		ReturnType< $mol_check['sub'] >
	>
	type $mol_check__hint_mol_pick_7 = $mol_type_enforce<
		ReturnType< $mol_pick['hint'] >
		,
		ReturnType< $mol_check['hint'] >
	>
	export class $mol_pick extends $mol_pop {
		keydown( next?: any ): any
		trigger_enabled( ): boolean
		clicks( next?: any ): any
		trigger_content( ): readonly($mol_view_content)[]
		hint( ): string
		Trigger( ): $mol_check
		event( ): ({ 
			keydown( next?: ReturnType< $mol_pick['keydown'] > ): ReturnType< $mol_pick['keydown'] >,
		})  & ReturnType< $mol_pop['event'] >
		Anchor( ): ReturnType< $mol_pick['Trigger'] >
	}
	
}

//# sourceMappingURL=pick.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Pop-up display and hide by mouse click, also hide by unfocus.
     * Based on [mol_pop](https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo) component.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pick_demo
     */
    class $mol_pick extends $.$mol_pick {
        keydown(event: KeyboardEvent): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_hamburger extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=hamburger.view.tree.d.ts.map
declare namespace $ {
    function $mol_support_css_overflow_anchor(this: $): boolean;
}

declare namespace $ {

	type $mol_view__style_mol_list_1 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_before'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__style_mol_list_2 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_after'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	export class $mol_list extends $mol_view {
		gap_before( ): number
		Gap_before( ): $mol_view
		Empty( ): $mol_view
		gap_after( ): number
		Gap_after( ): $mol_view
		rows( ): readonly($mol_view)[]
		render_visible_only( ): boolean
		render_over( ): number
		sub( ): ReturnType< $mol_list['rows'] >
		item_height_min( id: any): number
		item_width_min( id: any): number
		view_window_shift( next?: number ): number
		view_window( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * The list of rows with lazy/virtual rendering support based on `minimal_height` of rows.
     * `mol_list` should contain only components that inherits `mol_view`. You should not place raw strings or numbers in list.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_list_demo
     */
    class $mol_list extends $.$mol_list {
        sub(): readonly $mol_view[];
        render_visible_only(): boolean;
        _view_window_last: number[];
        view_window(next?: [number, number]): [number, number];
        item_height_min(index: number): number;
        row_width_min(index: number): number;
        gap_before(): number;
        gap_after(): number;
        sub_visible(): $mol_view[];
        minimal_height(): number;
        minimal_width(): number;
        force_render(path: Set<$mol_view>): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_check_expand extends $mol_check {
		level_style( ): string
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		Icon( ): $mol_icon_chevron
		level( ): number
		style( ): ({ 
			'paddingLeft': ReturnType< $mol_check_expand['level_style'] >,
		})  & ReturnType< $mol_check['style'] >
		checked( next?: ReturnType< $mol_check_expand['expanded'] > ): ReturnType< $mol_check_expand['expanded'] >
		enabled( ): ReturnType< $mol_check_expand['expandable'] >
	}
	
}

//# sourceMappingURL=expand.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Expander for trees, lists, etc
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_expand_demo
     */
    class $mol_check_expand extends $.$mol_check_expand {
        level_style(): string;
        expandable(): boolean;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_check_expand__checked_mol_expander_1 = $mol_type_enforce<
		ReturnType< $mol_expander['expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_check_expand__expandable_mol_expander_2 = $mol_type_enforce<
		ReturnType< $mol_expander['expandable'] >
		,
		ReturnType< $mol_check_expand['expandable'] >
	>
	type $mol_check_expand__label_mol_expander_3 = $mol_type_enforce<
		ReturnType< $mol_expander['label'] >
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_view__sub_mol_expander_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows_mol_expander_5 = $mol_type_enforce<
		ReturnType< $mol_expander['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_expander extends $mol_list {
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		label( ): readonly(any)[]
		Trigger( ): $mol_check_expand
		Tools( ): any
		Label( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_list
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=expander.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Component which expands any content on title click.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_expander_demo
     */
    class $mol_expander extends $.$mol_expander {
        rows(): $mol_view[];
        expandable(): boolean;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_translate extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=translate.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_white_balance_sunny extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=sunny.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_monitor extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=monitor.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_weather_night extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=night.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_minor__attr_bog_theme_switch_1 = $mol_type_enforce<
		({ 
			'bog_theme_switch_active': ReturnType< $bog_theme_switch['light_active'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		,
		ReturnType< $mol_button_minor['attr'] >
	>
	type $mol_button_minor__hint_bog_theme_switch_2 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['light_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_theme_switch_3 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['set_light'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_theme_switch_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__attr_bog_theme_switch_5 = $mol_type_enforce<
		({ 
			'bog_theme_switch_active': ReturnType< $bog_theme_switch['system_active'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		,
		ReturnType< $mol_button_minor['attr'] >
	>
	type $mol_button_minor__hint_bog_theme_switch_6 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['system_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_theme_switch_7 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['set_system'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_theme_switch_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__attr_bog_theme_switch_9 = $mol_type_enforce<
		({ 
			'bog_theme_switch_active': ReturnType< $bog_theme_switch['dark_active'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		,
		ReturnType< $mol_button_minor['attr'] >
	>
	type $mol_button_minor__hint_bog_theme_switch_10 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['dark_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_theme_switch_11 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['set_dark'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_theme_switch_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $bog_theme_switch extends $mol_view {
		light_active( ): boolean
		light_hint( ): string
		set_light( next?: any ): any
		Light_icon( ): $mol_icon_white_balance_sunny
		Light( ): $mol_button_minor
		system_active( ): boolean
		system_hint( ): string
		set_system( next?: any ): any
		System_icon( ): $mol_icon_monitor
		System( ): $mol_button_minor
		dark_active( ): boolean
		dark_hint( ): string
		set_dark( next?: any ): any
		Dark_icon( ): $mol_icon_weather_night
		Dark( ): $mol_button_minor
		theme_auto( ): $bog_theme_auto
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=switch.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_theme_switch extends $.$bog_theme_switch {
        light_active(): boolean;
        system_active(): boolean;
        dark_active(): boolean;
        set_light(): null;
        set_system(): null;
        set_dark(): null;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_script extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=script.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_script_text extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $ {

	export class $mol_link_source extends $mol_link {
		Icon( ): $mol_icon_script_text
		hint( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=source.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_check extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $ {

	type $mol_image__uri_bog_smalljs_top_1 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['logo_uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_image__title_bog_smalljs_top_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_view__sub_bog_smalljs_top_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__arg_bog_smalljs_top_4 = $mol_type_enforce<
		({ 
			'section': any,
			'page': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_top_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_top_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_top_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_smalljs_top_8 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['search_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_top_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_link__title_bog_smalljs_top_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_11 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_12 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_14 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_15 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $bog_smalljs_top_item__title_bog_smalljs_top_16 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_top_item['title'] >
	>
	type $bog_smalljs_top_item__arg_bog_smalljs_top_17 = $mol_type_enforce<
		({ 
			'section': string,
			'page': any,
		}) 
		,
		ReturnType< $bog_smalljs_top_item['arg'] >
	>
	type $bog_smalljs_top_item__event_click_bog_smalljs_top_18 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $bog_smalljs_top_item['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_19 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_20 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_21 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_22 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_23 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_24 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_view__sub_bog_smalljs_top_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_pick__hint_bog_smalljs_top_26 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['hint'] >
	>
	type $mol_pick__align_bog_smalljs_top_27 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['align'] >
	>
	type $mol_pick__trigger_content_bog_smalljs_top_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content_bog_smalljs_top_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $bog_smalljs_top_item__title_bog_smalljs_top_30 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_top_item['title'] >
	>
	type $bog_smalljs_top_item__arg_bog_smalljs_top_31 = $mol_type_enforce<
		({ 
			'section': string,
			'page': any,
		}) 
		,
		ReturnType< $bog_smalljs_top_item['arg'] >
	>
	type $bog_smalljs_top_item__title_bog_smalljs_top_32 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_top_item['title'] >
	>
	type $bog_smalljs_top_item__arg_bog_smalljs_top_33 = $mol_type_enforce<
		({ 
			'section': string,
			'page': any,
		}) 
		,
		ReturnType< $bog_smalljs_top_item['arg'] >
	>
	type $mol_link__title_bog_smalljs_top_34 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_35 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_36 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_view__sub_bog_smalljs_top_37 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__title_bog_smalljs_top_38 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_39 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_40 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_41 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_42 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_43 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_44 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_45 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_46 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_47 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_48 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_49 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_50 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_51 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_52 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_53 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_54 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_55 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_view__sub_bog_smalljs_top_56 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_pick__hint_bog_smalljs_top_57 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['hint'] >
	>
	type $mol_pick__align_bog_smalljs_top_58 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['align'] >
	>
	type $mol_pick__trigger_content_bog_smalljs_top_59 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content_bog_smalljs_top_60 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_link__title_bog_smalljs_top_61 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_62 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_63 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_64 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_65 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_66 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_67 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_68 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_69 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_70 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_71 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_72 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_view__sub_bog_smalljs_top_73 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_pick__hint_bog_smalljs_top_74 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['hint'] >
	>
	type $mol_pick__align_bog_smalljs_top_75 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['align'] >
	>
	type $mol_pick__trigger_content_bog_smalljs_top_76 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content_bog_smalljs_top_77 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_view__sub_bog_smalljs_top_78 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_top_item__title_bog_smalljs_top_79 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_top_item['title'] >
	>
	type $bog_smalljs_top_item__arg_bog_smalljs_top_80 = $mol_type_enforce<
		({ 
			'section': string,
			'page': any,
		}) 
		,
		ReturnType< $bog_smalljs_top_item['arg'] >
	>
	type $bog_smalljs_top_item__event_click_bog_smalljs_top_81 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $bog_smalljs_top_item['event_click'] >
	>
	type $bog_smalljs_top_item__title_bog_smalljs_top_82 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_top_item['title'] >
	>
	type $bog_smalljs_top_item__arg_bog_smalljs_top_83 = $mol_type_enforce<
		({ 
			'section': string,
			'page': any,
		}) 
		,
		ReturnType< $bog_smalljs_top_item['arg'] >
	>
	type $bog_smalljs_top_item__event_click_bog_smalljs_top_84 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $bog_smalljs_top_item['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_85 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_86 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_87 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_88 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_89 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_90 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $bog_smalljs_top_item__title_bog_smalljs_top_91 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_top_item['title'] >
	>
	type $bog_smalljs_top_item__arg_bog_smalljs_top_92 = $mol_type_enforce<
		({ 
			'section': string,
			'page': any,
		}) 
		,
		ReturnType< $bog_smalljs_top_item['arg'] >
	>
	type $bog_smalljs_top_item__event_click_bog_smalljs_top_93 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $bog_smalljs_top_item['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_94 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_95 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_96 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_97 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_98 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_99 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_expander__title_bog_smalljs_top_100 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content_bog_smalljs_top_101 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	type $mol_link__title_bog_smalljs_top_102 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_103 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_104 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_view__sub_bog_smalljs_top_105 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__title_bog_smalljs_top_106 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_107 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_108 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_109 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_110 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_111 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_112 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_113 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_114 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_115 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_116 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_117 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_118 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_119 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_120 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_121 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_122 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_123 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_expander__title_bog_smalljs_top_124 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content_bog_smalljs_top_125 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	type $mol_link__title_bog_smalljs_top_126 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_127 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_128 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_129 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_130 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_131 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_132 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_top_133 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_top_134 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__title_bog_smalljs_top_135 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_top_136 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__event_click_bog_smalljs_top_137 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['nav_pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_expander__title_bog_smalljs_top_138 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content_bog_smalljs_top_139 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	type $mol_view__sub_bog_smalljs_top_140 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_pick__hint_bog_smalljs_top_141 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['hint'] >
	>
	type $mol_pick__align_bog_smalljs_top_142 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['align'] >
	>
	type $mol_pick__trigger_content_bog_smalljs_top_143 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content_bog_smalljs_top_144 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_view__sub_bog_smalljs_top_145 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['lang_options'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_pick__hint_bog_smalljs_top_146 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['hint'] >
	>
	type $mol_pick__align_bog_smalljs_top_147 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['align'] >
	>
	type $mol_pick__trigger_content_bog_smalljs_top_148 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content_bog_smalljs_top_149 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $bog_theme_switch__theme_auto_bog_smalljs_top_150 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['Theme'] >
		,
		ReturnType< $bog_theme_switch['theme_auto'] >
	>
	type $mol_link_source__uri_bog_smalljs_top_151 = $mol_type_enforce<
		ReturnType< $bog_smalljs_top['github_uri'] >
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_button_minor__sub_bog_smalljs_top_152 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $bog_smalljs_top extends $mol_view {
		Logo_image( ): $mol_image
		Logo_text( ): string
		Logo_text_box( ): $mol_view
		Logo( ): $mol_link
		Search_icon( ): $mol_icon_magnify
		Search_label_text( ): string
		Search_label( ): $mol_view
		Search_hint_text( ): string
		Search_hint( ): $mol_view
		Search( ): $mol_button_minor
		Docs_label( ): string
		Docs_chevron( ): $mol_icon_chevron_down
		Docs_quickstart( ): $mol_link
		Docs_guide( ): $mol_link
		Docs_tutorial( ): $bog_smalljs_top_item
		Docs_examples( ): $mol_link
		Docs_api( ): $mol_link
		Docs_menu( ): $mol_view
		Docs_pick( ): $mol_pick
		Nav_playground( ): $bog_smalljs_top_item
		Nav_versus( ): $bog_smalljs_top_item
		Ecosystem_label( ): string
		Ecosystem_chevron( ): $mol_icon_chevron_down
		Eco_components( ): $mol_link
		Eco_libs_title_text( ): string
		Eco_libs_title( ): $mol_view
		Eco_wire( ): $mol_link
		Eco_fetch( ): $mol_link
		Eco_compare( ): $mol_link
		Eco_router( ): $mol_link
		Eco_crowd( ): $mol_link
		Eco_baza( ): $mol_link
		Ecosystem_menu( ): $mol_view
		Ecosystem_pick( ): $mol_pick
		About_label( ): string
		About_chevron( ): $mol_icon_chevron_down
		About_faq( ): $mol_link
		About_team( ): $mol_link
		About_releases( ): $mol_link
		About_telegram( ): $mol_link
		About_menu( ): $mol_view
		About_pick( ): $mol_pick
		Nav( ): $mol_view
		Burger_icon( ): $mol_icon_hamburger
		Mobile_playground( ): $bog_smalljs_top_item
		Mobile_versus( ): $bog_smalljs_top_item
		M_docs_quickstart( ): $mol_link
		M_docs_guide( ): $mol_link
		M_docs_tutorial( ): $bog_smalljs_top_item
		M_docs_examples( ): $mol_link
		M_docs_api( ): $mol_link
		Docs_group( ): $mol_expander
		M_eco_components( ): $mol_link
		M_eco_libs_title_text( ): string
		M_eco_libs_title( ): $mol_view
		M_eco_wire( ): $mol_link
		M_eco_fetch( ): $mol_link
		M_eco_compare( ): $mol_link
		M_eco_router( ): $mol_link
		M_eco_crowd( ): $mol_link
		M_eco_baza( ): $mol_link
		Ecosystem_group( ): $mol_expander
		M_about_faq( ): $mol_link
		M_about_team( ): $mol_link
		M_about_releases( ): $mol_link
		M_about_telegram( ): $mol_link
		About_group( ): $mol_expander
		Mobile_menu( ): $mol_view
		Burger( ): $mol_pick
		Lang_icon( ): $mol_icon_translate
		lang_label( ): string
		Lang_chevron( ): $mol_icon_chevron_down
		lang_options( ): readonly(any)[]
		Lang_menu( ): $mol_view
		Lang_pick( ): $mol_pick
		Theme_toggle( ): $bog_theme_switch
		Github( ): $mol_link_source
		lang_option_label( id: any): string
		Lang_option_check( id: any): $mol_icon_check
		Theme( ): any
		github_uri( ): string
		logo_uri( ): string
		search_click( next?: any ): any
		nav_pick( next?: any ): any
		sub( ): readonly(any)[]
		Lang_option( id: any): $mol_button_minor
	}
	
	export class $bog_smalljs_top_item extends $mol_link {
		uri_off( ): ReturnType< $bog_smalljs_top_item['uri'] >
	}
	
}

//# sourceMappingURL=top.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_smalljs_top extends $.$bog_smalljs_top {
        nav_pick(): void;
        langs(): {
            code: string;
            label: string;
        }[];
        lang(next?: string): string;
        lang_label(): string;
        lang_options(): $mol_button_minor[];
        lang_option_label(code: string): string;
        /** Wire each option's click to its own language (keyed handler by closure). */
        Lang_option(code: string): $mol_button_minor;
        /** Show the check only next to the active language. */
        Lang_option_check(code: string): any;
        /** Выбор языка уезжает и в адрес.
         *
         *  Без этого перезагрузка приходила на английскую статику: пререндер
         *  раскладывает по языкам ( `/mol_locale=ru/…` ), а голый адрес — это
         *  x-default, то есть английский. Читатель видел английский текст, пока
         *  бандл не поднимется и не вспомнит его выбор из localStorage. С языком
         *  в адресе он с первого байта получает свою страницу, а ссылкой на неё
         *  можно поделиться. */
        lang_select(code: string): null;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_hotkey extends $mol_plugin {
		keydown( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_hotkey['keydown'] > ): ReturnType< $mol_hotkey['keydown'] >,
		})  & ReturnType< $mol_plugin['event'] >
		key( ): Record<string, any>
		mod_ctrl( ): boolean
		mod_alt( ): boolean
		mod_shift( ): boolean
	}
	
}

//# sourceMappingURL=hotkey.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Plugin which adds handlers for keyboard keys.
     * @see [mol_keyboard_code](../keyboard/code/code.ts)
     */
    class $mol_hotkey extends $.$mol_hotkey {
        key(): { [key in keyof typeof $mol_keyboard_code]?: (event: KeyboardEvent) => void; };
        keydown(event?: KeyboardEvent): void;
    }
}

declare namespace $ {

	type $mol_hotkey__mod_ctrl_mol_string_1 = $mol_type_enforce<
		ReturnType< $mol_string['submit_with_ctrl'] >
		,
		ReturnType< $mol_hotkey['mod_ctrl'] >
	>
	type $mol_hotkey__key_mol_string_2 = $mol_type_enforce<
		({ 
			enter( next?: ReturnType< $mol_string['submit'] > ): ReturnType< $mol_string['submit'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	export class $mol_string extends $mol_view {
		selection_watcher( ): any
		error_report( ): any
		disabled( ): boolean
		value( next?: string ): string
		value_changed( next?: ReturnType< $mol_string['value'] > ): ReturnType< $mol_string['value'] >
		hint( ): string
		hint_visible( ): ReturnType< $mol_string['hint'] >
		spellcheck( ): boolean
		autocomplete_native( ): string
		selection_end( ): number
		selection_start( ): number
		keyboard( ): string
		enter( ): string
		length_max( ): number
		type( next?: string ): string
		event_change( next?: any ): any
		submit_with_ctrl( ): boolean
		submit( next?: any ): any
		Submit( ): $mol_hotkey
		dom_name( ): string
		enabled( ): boolean
		minimal_height( ): number
		autocomplete( ): boolean
		selection( next?: readonly(number)[] ): readonly(number)[]
		auto( ): readonly(any)[]
		field( ): ({ 
			'disabled': ReturnType< $mol_string['disabled'] >,
			'value': ReturnType< $mol_string['value_changed'] >,
			'placeholder': ReturnType< $mol_string['hint_visible'] >,
			'spellcheck': ReturnType< $mol_string['spellcheck'] >,
			'autocomplete': ReturnType< $mol_string['autocomplete_native'] >,
			'selectionEnd': ReturnType< $mol_string['selection_end'] >,
			'selectionStart': ReturnType< $mol_string['selection_start'] >,
			'inputMode': ReturnType< $mol_string['keyboard'] >,
			'enterkeyhint': ReturnType< $mol_string['enter'] >,
		})  & ReturnType< $mol_view['field'] >
		attr( ): ({ 
			'maxlength': ReturnType< $mol_string['length_max'] >,
			'type': ReturnType< $mol_string['type'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			input( next?: ReturnType< $mol_string['event_change'] > ): ReturnType< $mol_string['event_change'] >,
		})  & ReturnType< $mol_view['event'] >
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=string.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * An input field for entering single line text.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_string_demo
     */
    class $mol_string extends $.$mol_string {
        event_change(next?: Event): void;
        error_report(): void;
        hint_visible(): string;
        disabled(): boolean;
        autocomplete_native(): "on" | "off";
        selection_watcher(): $mol_dom_listener;
        selection_change(event: Event): void;
        selection_start(): number;
        selection_end(): number;
    }
}

declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_button_major extends $mol_button_minor {
		theme( ): string
	}
	
}

//# sourceMappingURL=major.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_left extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=left.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_right extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=right.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	type $mol_hotkey__key_mol_number_1 = $mol_type_enforce<
		({ 
			down( next?: ReturnType< $mol_number['event_dec'] > ): ReturnType< $mol_number['event_dec'] >,
			up( next?: ReturnType< $mol_number['event_inc'] > ): ReturnType< $mol_number['event_inc'] >,
			pageDown( next?: ReturnType< $mol_number['event_dec_boost'] > ): ReturnType< $mol_number['event_dec_boost'] >,
			pageUp( next?: ReturnType< $mol_number['event_inc_boost'] > ): ReturnType< $mol_number['event_inc_boost'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_button_minor__event_click_mol_number_2 = $mol_type_enforce<
		ReturnType< $mol_number['event_dec'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__enabled_mol_number_3 = $mol_type_enforce<
		ReturnType< $mol_number['dec_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub_mol_number_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_string__type_mol_number_5 = $mol_type_enforce<
		ReturnType< $mol_number['type'] >
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_string__keyboard_mol_number_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['keyboard'] >
	>
	type $mol_string__value_mol_number_7 = $mol_type_enforce<
		ReturnType< $mol_number['value_string'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_mol_number_8 = $mol_type_enforce<
		ReturnType< $mol_number['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__enabled_mol_number_9 = $mol_type_enforce<
		ReturnType< $mol_number['string_enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__submit_mol_number_10 = $mol_type_enforce<
		ReturnType< $mol_number['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_button_minor__event_click_mol_number_11 = $mol_type_enforce<
		ReturnType< $mol_number['event_inc'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__enabled_mol_number_12 = $mol_type_enforce<
		ReturnType< $mol_number['inc_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub_mol_number_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_number extends $mol_view {
		precision( ): number
		event_dec( next?: any ): any
		event_inc( next?: any ): any
		event_dec_boost( next?: any ): any
		event_inc_boost( next?: any ): any
		Hotkey( ): $mol_hotkey
		dec_enabled( ): ReturnType< $mol_number['enabled'] >
		dec_icon( ): $mol_icon_chevron_left
		Dec( ): $mol_button_minor
		type( ): string
		value_string( next?: string ): string
		hint( ): string
		string_enabled( ): ReturnType< $mol_number['enabled'] >
		submit( next?: any ): any
		String( ): $mol_string
		inc_enabled( ): ReturnType< $mol_number['enabled'] >
		inc_icon( ): $mol_icon_chevron_right
		Inc( ): $mol_button_minor
		precision_view( ): ReturnType< $mol_number['precision'] >
		precision_change( ): ReturnType< $mol_number['precision'] >
		boost( ): number
		value_min( ): number
		value_max( ): number
		value( next?: number ): number
		enabled( ): boolean
		plugins( ): readonly(any)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=number.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Component for entering, incrementing and decrementing numeric values.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_number_demo
     */
    class $mol_number extends $.$mol_number {
        value_limited(val?: number): number;
        event_dec(next?: Event): void;
        event_inc(next?: Event): void;
        event_dec_boost(next?: Event): void;
        event_inc_boost(next?: Event): void;
        round(val: number): string;
        value_string(next?: string): string;
        dec_enabled(): boolean;
        inc_enabled(): boolean;
    }
}

declare namespace $ {

	export class $mol_paragraph extends $mol_view {
		line_height( ): number
		letter_width( ): number
		width_limit( ): number
		row_width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=paragraph.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_paragraph extends $.$mol_paragraph {
        maximal_width(): number;
        width_limit(): number;
        minimal_width(): number;
        row_width(): number;
        minimal_height(): number;
    }
}

declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_stack extends $mol_view {
	}
	
}

//# sourceMappingURL=stack.view.tree.d.ts.map
declare namespace $ {
    /**
     * Return `unknown` when `A` and `B` are the same type. `never` otherwise.
     *
     * 	$mol_type_equals< unknown , any > & number // true
     * 	$mol_type_equals< never , never > & number // false
     */
    type $mol_type_equals<A, B> = (<X>() => X extends A ? 1 : 2) extends (<X>() => X extends B ? 1 : 2) ? true : false;
}

declare namespace $ {
    /**
     * Reqursive converts intersection of records to record of intersections
     *
     * 	// { a : { x : 1 , y : 2 } }
     * 	$mol_type_merge< { a : { x : 1 } }&{ a : { y : 2 } } >
     */
    type $mol_type_merge<Intersection> = Intersection extends (...a: any[]) => any ? Intersection : Intersection extends new (...a: any[]) => any ? Intersection : Intersection extends object ? $mol_type_merge_object<Intersection> extends Intersection ? true extends $mol_type_equals<{
        [Key in keyof Intersection]: Intersection[Key];
    }, Intersection> ? Intersection : {
        [Key in keyof Intersection]: $mol_type_merge<Intersection[Key]>;
    } : Intersection : Intersection;
    /**
     * Flat converts intersection of records to record of intersections
     *
     * 	// { a: 1, b: 2 }
     * 	$mol_type_merge< { a: 1 } & { b: 2 } >
     */
    type $mol_type_merge_object<Intersection> = {
        [Key in keyof Intersection]: Intersection[Key];
    };
}

declare namespace $ {
    /**
     * Converts union of types to intersection of same types
     *
     * 	$mol_type_intersect< number | string > // number & string
     */
    type $mol_type_intersect<Union> = (Union extends any ? (_: Union) => void : never) extends ((_: infer Intersection) => void) ? Intersection : never;
}

declare namespace $ {
    type $mol_unicode_category = [$mol_unicode_category_binary] | ['General_Category', $mol_char_category_general] | ['Script', $mol_unicode_category_script] | ['Script_Extensions', $mol_unicode_category_script];
    type $mol_unicode_category_binary = 'ASCII' | 'ASCII_Hex_Digit' | 'Alphabetic' | 'Any' | 'Assigned' | 'Bidi_Control' | 'Bidi_Mirrored' | 'Case_Ignorable' | 'Cased' | 'Changes_When_Casefolded' | 'Changes_When_Casemapped' | 'Changes_When_Lowercased' | 'Changes_When_NFKC_Casefolded' | 'Changes_When_Titlecased' | 'Changes_When_Uppercased' | 'Dash' | 'Default_Ignorable_Code_Point' | 'Deprecated' | 'Diacritic' | 'Emoji' | 'Emoji_Component' | 'Emoji_Modifier' | 'Emoji_Modifier_Base' | 'Emoji_Presentation' | 'Extended_Pictographic' | 'Extender' | 'Grapheme_Base' | 'Grapheme_Extend' | 'Hex_Digit' | 'IDS_Binary_Operator' | 'IDS_Trinary_Operator' | 'ID_Continue' | 'ID_Start' | 'Ideographic' | 'Join_Control' | 'Logical_Order_Exception' | 'Lowercase' | 'Math' | 'Noncharacter_Code_Point' | 'Pattern_Syntax' | 'Pattern_White_Space' | 'Quotation_Mark' | 'Radical' | 'Regional_Indicator' | 'Sentence_Terminal' | 'Soft_Dotted' | 'Terminal_Punctuation' | 'Unified_Ideograph' | 'Uppercase' | 'Variation_Selector' | 'White_Space' | 'XID_Continue' | 'XID_Start';
    type $mol_char_category_general = 'Cased_Letter' | 'Close_Punctuation' | 'Connector_Punctuation' | 'Control' | 'Currency_Symbol' | 'Dash_Punctuation' | 'Decimal_Number' | 'Enclosing_Mark' | 'Final_Punctuation' | 'Format' | 'Initial_Punctuation' | 'Letter' | 'Letter_Number' | 'Line_Separator' | 'Lowercase_Letter' | 'Mark' | 'Math_Symbol' | 'Modifier_Letter' | 'Modifier_Symbol' | 'Nonspacing_Mark' | 'Number' | 'Open_Punctuation' | 'Other' | 'Other_Letter' | 'Other_Number' | 'Other_Punctuation' | 'Other_Symbol' | 'Paragraph_Separator' | 'Private_Use' | 'Punctuation' | 'Separator' | 'Space_Separator' | 'Spacing_Mark' | 'Surrogate' | 'Symbol' | 'Titlecase_Letter' | 'Unassigned' | 'Uppercase_Letter';
    type $mol_unicode_category_script = 'Adlam' | 'Ahom' | 'Anatolian_Hieroglyphs' | 'Arabic' | 'Armenian' | 'Avestan' | 'Balinese' | 'Bamum' | 'Bassa_Vah' | 'Batak' | 'Bengali' | 'Bhaiksuki' | 'Bopomofo' | 'Brahmi' | 'Braille' | 'Buginese' | 'Buhid' | 'Canadian_Aboriginal' | 'Carian' | 'Caucasian_Albanian' | 'Chakma' | 'Cham' | 'Chorasmian' | 'Cherokee' | 'Common' | 'Coptic' | 'Cuneiform' | 'Cypriot' | 'Cyrillic' | 'Deseret' | 'Devanagari' | 'Dives_Akuru' | 'Dogra' | 'Duployan' | 'Egyptian_Hieroglyphs' | 'Elbasan' | 'Elymaic' | 'Ethiopic' | 'Georgian' | 'Glagolitic' | 'Gothic' | 'Grantha' | 'Greek' | 'Gujarati' | 'Gunjala_Gondi' | 'Gurmukhi' | 'Han' | 'Hangul' | 'Hanifi_Rohingya' | 'Hanunoo' | 'Hatran' | 'Hebrew' | 'Hiragana' | 'Imperial_Aramaic' | 'Inherited' | 'Inscriptional_Pahlavi' | 'Inscriptional_Parthian' | 'Javanese' | 'Kaithi' | 'Kannada' | 'Katakana' | 'Kayah_Li' | 'Kharoshthi' | 'Khitan_Small_Script' | 'Khmer' | 'Khojki' | 'Khudawadi' | 'Lao' | 'Latin' | 'Lepcha' | 'Limbu' | 'Linear_A' | 'Linear_B' | 'Lisu' | 'Lycian' | 'Lydian' | 'Mahajani' | 'Makasar' | 'Malayalam' | 'Mandaic' | 'Manichaean' | 'Marchen' | 'Medefaidrin' | 'Masaram_Gondi' | 'Meetei_Mayek' | 'Mende_Kikakui' | 'Meroitic_Cursive' | 'Meroitic_Hieroglyphs' | 'Miao' | 'Modi' | 'Mongolian' | 'Mro' | 'Multani' | 'Myanmar' | 'Nabataean' | 'Nandinagari' | 'New_Tai_Lue' | 'Newa' | 'Nko' | 'Nushu' | 'Nyiakeng_Puachue_Hmong' | 'Ogham' | 'Ol_Chiki' | 'Old_Hungarian' | 'Old_Italic' | 'Old_North_Arabian' | 'Old_Permic' | 'Old_Persian' | 'Old_Sogdian' | 'Old_South_Arabian' | 'Old_Turkic' | 'Oriya' | 'Osage' | 'Osmanya' | 'Pahawh_Hmong' | 'Palmyrene' | 'Pau_Cin_Hau' | 'Phags_Pa' | 'Phoenician' | 'Psalter_Pahlavi' | 'Rejang' | 'Runic' | 'Samaritan' | 'Saurashtra' | 'Sharada' | 'Shavian' | 'Siddham' | 'SignWriting' | 'Sinhala' | 'Sogdian' | 'Sora_Sompeng' | 'Soyombo' | 'Sundanese' | 'Syloti_Nagri' | 'Syriac' | 'Tagalog' | 'Tagbanwa' | 'Tai_Le' | 'Tai_Tham' | 'Tai_Viet' | 'Takri' | 'Tamil' | 'Tangut' | 'Telugu' | 'Thaana' | 'Thai' | 'Tibetan' | 'Tifinagh' | 'Tirhuta' | 'Ugaritic' | 'Vai' | 'Wancho' | 'Warang_Citi' | 'Yezidi' | 'Yi' | 'Zanabazar_Square';
}

interface String {
    match<RE extends RegExp>(regexp: RE): ReturnType<RE[typeof Symbol.match]>;
    matchAll<RE extends RegExp>(regexp: RE): ReturnType<RE[typeof Symbol.matchAll]>;
}
declare namespace $ {
    type Groups_to_params<T> = {
        [P in keyof T]?: T[P] | boolean | undefined;
    };
    export type $mol_regexp_source = number | string | RegExp | {
        [key in string]: $mol_regexp_source;
    } | readonly [$mol_regexp_source, ...$mol_regexp_source[]];
    export type $mol_regexp_groups<Source extends $mol_regexp_source> = Source extends number ? {} : Source extends string ? {} : Source extends $mol_regexp_source[] ? $mol_type_merge<$mol_type_intersect<{
        [key in Extract<keyof Source, number>]: $mol_regexp_groups<Source[key]>;
    }[Extract<keyof Source, number>]>> : Source extends RegExp ? Record<string, string> extends NonNullable<NonNullable<ReturnType<Source['exec']>>['groups']> ? {} : NonNullable<NonNullable<ReturnType<Source['exec']>>['groups']> : Source extends {
        readonly [key in string]: $mol_regexp_source;
    } ? $mol_type_merge<$mol_type_intersect<{
        [key in keyof Source]: $mol_type_merge<$mol_type_override<{
            readonly [k in Extract<keyof Source, string>]: string;
        }, {
            readonly [k in key]: Source[key] extends string ? Source[key] : string;
        }> & $mol_regexp_groups<Source[key]>>;
    }[keyof Source]>> : never;
    /** Type safe reguar expression builder */
    export class $mol_regexp<Groups extends Record<string, string>> extends RegExp {
        readonly groups: (Extract<keyof Groups, string>)[];
        /** Prefer to use $mol_regexp.from */
        constructor(source: string, flags?: string, groups?: (Extract<keyof Groups, string>)[]);
        [Symbol.matchAll](str: string): RegExpStringIterator<RegExpExecArray & $mol_type_override<RegExpExecArray, {
            groups?: {
                [key in keyof Groups]: string;
            };
        }>>;
        /** Parses input and returns found capture groups or null */
        [Symbol.match](str: string): null | RegExpMatchArray;
        /** Splits string by regexp edges */
        [Symbol.split](str: string): string[];
        test(str: string): boolean;
        exec(str: string): RegExpExecArray & $mol_type_override<RegExpExecArray, {
            groups?: {
                [key in keyof Groups]: string;
            };
        }> | null;
        generate(params: Groups_to_params<Groups>): string | null;
        get native(): RegExp;
        /** Makes regexp that greedy repeats this pattern with delimiter */
        static separated<Chunk extends $mol_regexp_source, Sep extends $mol_regexp_source>(chunk: Chunk, sep: Sep): $mol_regexp<[$mol_regexp<[[Chunk], Sep] extends infer T ? T extends [[Chunk], Sep] ? T extends $mol_regexp_source[] ? $mol_type_merge<$mol_type_intersect<{ [key in Extract<keyof T, number>]: $mol_regexp_groups<T[key]>; }[Extract<keyof T, number>]>> : T extends RegExp ? Record<string, string> extends NonNullable<NonNullable<ReturnType<T["exec"]>>["groups"]> ? {} : NonNullable<NonNullable<ReturnType<T["exec"]>>["groups"]> : T extends {
            readonly [x: string]: $mol_regexp_source;
        } ? $mol_type_merge<$mol_type_intersect<{ [key_1 in keyof T]: $mol_type_merge<Omit<{ readonly [k in Extract<keyof T, string>]: string; }, key_1> & { readonly [k_1 in key_1]: T[key_1] extends string ? T[key_1] : string; } & $mol_regexp_groups<T[key_1]>>; }[keyof T]>> : never : never : never>, Chunk] extends infer T_1 ? T_1 extends [$mol_regexp<[[Chunk], Sep] extends infer T_2 ? T_2 extends [[Chunk], Sep] ? T_2 extends $mol_regexp_source[] ? $mol_type_merge<$mol_type_intersect<{ [key_4 in Extract<keyof T_2, number>]: $mol_regexp_groups<T_2[key_4]>; }[Extract<keyof T_2, number>]>> : T_2 extends RegExp ? Record<string, string> extends NonNullable<NonNullable<ReturnType<T_2["exec"]>>["groups"]> ? {} : NonNullable<NonNullable<ReturnType<T_2["exec"]>>["groups"]> : T_2 extends {
            readonly [x: string]: $mol_regexp_source;
        } ? $mol_type_merge<$mol_type_intersect<{ [key_5 in keyof T_2]: $mol_type_merge<Omit<{ readonly [k in Extract<keyof T_2, string>]: string; }, key_5> & { readonly [k_1 in key_5]: T_2[key_5] extends string ? T_2[key_5] : string; } & $mol_regexp_groups<T_2[key_5]>>; }[keyof T_2]>> : never : never : never>, Chunk] ? T_1 extends $mol_regexp_source[] ? $mol_type_merge<$mol_type_intersect<{ [key_2 in Extract<keyof T_1, number>]: $mol_regexp_groups<T_1[key_2]>; }[Extract<keyof T_1, number>]>> : T_1 extends RegExp ? Record<string, string> extends NonNullable<NonNullable<ReturnType<T_1["exec"]>>["groups"]> ? {} : NonNullable<NonNullable<ReturnType<T_1["exec"]>>["groups"]> : T_1 extends {
            readonly [x: string]: $mol_regexp_source;
        } ? $mol_type_merge<$mol_type_intersect<{ [key_3 in keyof T_1]: $mol_type_merge<Omit<{ readonly [k in Extract<keyof T_1, string>]: string; }, key_3> & { readonly [k_1 in key_3]: T_1[key_3] extends string ? T_1[key_3] : string; } & $mol_regexp_groups<T_1[key_3]>>; }[keyof T_1]>> : never : never : never>;
        /** Makes regexp that non-greedy repeats this pattern from min to max count */
        static repeat<Source extends $mol_regexp_source>(source: Source, min?: number, max?: number): $mol_regexp<$mol_regexp_groups<Source>>;
        /** Makes regexp that greedy repeats this pattern from min to max count */
        static repeat_greedy<Source extends $mol_regexp_source>(source: Source, min?: number, max?: number): $mol_regexp<$mol_regexp_groups<Source>>;
        /** Makes regexp that match any of options */
        static vary<Sources extends readonly $mol_regexp_source[]>(sources: Sources, flags?: string): $mol_regexp<$mol_regexp_groups<Sources[number]>>;
        /** Makes regexp that allow absent of this pattern */
        static optional<Source extends $mol_regexp_source>(source: Source): $mol_regexp<$mol_regexp_groups<Source>>;
        /** Makes regexp that look ahead for pattern */
        static force_after(source: $mol_regexp_source): $mol_regexp<Record<string, string>>;
        /** Makes regexp that look ahead for pattern */
        static forbid_after(source: $mol_regexp_source): $mol_regexp<Record<string, string>>;
        /** Converts some js values to regexp */
        static from<Source extends $mol_regexp_source>(source: Source, { ignoreCase, multiline }?: Partial<Pick<RegExp, 'ignoreCase' | 'multiline'>>): $mol_regexp<$mol_regexp_groups<Source>>;
        /** Makes regexp which includes only unicode category */
        static unicode_only(...category: $mol_unicode_category): $mol_regexp<Record<string, string>>;
        /** Makes regexp which excludes unicode category */
        static unicode_except(...category: $mol_unicode_category): $mol_regexp<Record<string, string>>;
        static char_range(from: number, to: number): $mol_regexp<{}>;
        static char_only(...allowed: readonly [$mol_regexp_source, ...$mol_regexp_source[]]): $mol_regexp<{}>;
        static char_except(...forbidden: readonly [$mol_regexp_source, ...$mol_regexp_source[]]): $mol_regexp<{}>;
        static decimal_only: $mol_regexp<{}>;
        static decimal_except: $mol_regexp<{}>;
        static latin_only: $mol_regexp<{}>;
        static latin_except: $mol_regexp<{}>;
        static space_only: $mol_regexp<{}>;
        static space_except: $mol_regexp<{}>;
        static word_break_only: $mol_regexp<{}>;
        static word_break_except: $mol_regexp<{}>;
        static tab: $mol_regexp<{}>;
        static slash_back: $mol_regexp<{}>;
        static nul: $mol_regexp<{}>;
        static char_any: $mol_regexp<{}>;
        static begin: $mol_regexp<{}>;
        static end: $mol_regexp<{}>;
        static or: $mol_regexp<{}>;
        static line_end: $mol_regexp<{
            readonly win_end: string;
            readonly mac_end: string;
        }>;
    }
    export {};
}

declare namespace $ {

	type $mol_paragraph__sub_mol_dimmer_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub_mol_dimmer_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	export class $mol_dimmer extends $mol_paragraph {
		parts( ): readonly($mol_view_content)[]
		string( id: any): string
		haystack( ): string
		needle( ): string
		sub( ): ReturnType< $mol_dimmer['parts'] >
		Low( id: any): $mol_paragraph
		High( id: any): $mol_paragraph
	}
	
}

//# sourceMappingURL=dimmer.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Output text with dimmed mismatched substrings.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_dimmer_demo
     */
    class $mol_dimmer extends $.$mol_dimmer {
        parts(): any[];
        strings(): string[];
        string(index: number): string;
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_text_code_token extends $mol_dimmer {
		type( ): string
		attr( ): ({ 
			'mol_text_code_token_type': ReturnType< $mol_text_code_token['type'] >,
		})  & ReturnType< $mol_dimmer['attr'] >
	}
	
	export class $mol_text_code_token_link extends $mol_text_code_token {
		uri( ): string
		dom_name( ): string
		type( ): string
		attr( ): ({ 
			'href': ReturnType< $mol_text_code_token_link['uri'] >,
			'target': string,
		})  & ReturnType< $mol_text_code_token['attr'] >
	}
	
}

//# sourceMappingURL=token.view.tree.d.ts.map
declare namespace $.$$ {
}

declare namespace $ {
    /** Creates lexer by dictionary of lexems. Lexem that started first wins. Then lexem that declared earlier wins. Use regexp capture to take parts of token. */
    class $mol_syntax2<Lexems extends {
        [name: string]: RegExp;
    } = {}> {
        lexems: Lexems;
        constructor(lexems: Lexems);
        rules: Array<{
            regExp: RegExp;
            name: string;
            size: number;
        }>;
        regexp: RegExp;
        tokenize(text: string, handle: (name: string, found: string, chunks: string[], offset: number) => void): void;
        parse(text: string, handlers: {
            [key in keyof Lexems | '']: (found: string, chunks: string[], offset: number) => void;
        }): void;
    }
}

declare namespace $ {
    var $mol_syntax2_md_flow: $mol_syntax2<{
        quote: RegExp;
        spoiler: RegExp;
        header: RegExp;
        list: RegExp;
        code: RegExp;
        'code-indent': RegExp;
        table: RegExp;
        grid: RegExp;
        cut: RegExp;
        block: RegExp;
    }>;
    var $mol_syntax2_md_line: $mol_syntax2<{
        strong: RegExp;
        emphasis: RegExp;
        code: RegExp;
        insert: RegExp;
        delete: RegExp;
        embed: RegExp;
        link: RegExp;
        'image-link': RegExp;
        'text-link': RegExp;
        'text-link-http': RegExp;
    }>;
    const $mol_syntax2_md_code: $mol_syntax2<{
        'code-indent': RegExp;
        'code-docs': RegExp;
        'code-comment-block': RegExp;
        'code-link': RegExp;
        'code-comment-inline': RegExp;
        'code-string': RegExp;
        'code-number': RegExp;
        'code-call': RegExp;
        'code-sexpr': RegExp;
        'code-field': RegExp;
        'code-keyword': RegExp;
        'code-global': RegExp;
        'code-word': RegExp;
        'code-decorator': RegExp;
        'code-tag': RegExp;
        'code-punctuation': RegExp;
    }>;
}

declare namespace $ {

	type $mol_view__sub_mol_text_code_line_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_text_code_token__type_mol_text_code_line_2 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_type'] >
		,
		ReturnType< $mol_text_code_token['type'] >
	>
	type $mol_text_code_token__haystack_mol_text_code_line_3 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_text'] >
		,
		ReturnType< $mol_text_code_token['haystack'] >
	>
	type $mol_text_code_token__needle_mol_text_code_line_4 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['highlight'] >
		,
		ReturnType< $mol_text_code_token['needle'] >
	>
	type $mol_text_code_token_link__haystack_mol_text_code_line_5 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_text'] >
		,
		ReturnType< $mol_text_code_token_link['haystack'] >
	>
	type $mol_text_code_token_link__needle_mol_text_code_line_6 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['highlight'] >
		,
		ReturnType< $mol_text_code_token_link['needle'] >
	>
	type $mol_text_code_token_link__uri_mol_text_code_line_7 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_uri'] >
		,
		ReturnType< $mol_text_code_token_link['uri'] >
	>
	export class $mol_text_code_line extends $mol_paragraph {
		numb( ): number
		token_type( id: any): string
		token_text( id: any): string
		highlight( ): string
		token_uri( id: any): string
		text( ): string
		minimal_height( ): number
		numb_showed( ): boolean
		syntax( ): any
		uri_resolve( id: any): string
		Numb( ): $mol_view
		Token( id: any): $mol_text_code_token
		Token_link( id: any): $mol_text_code_token_link
		find_pos( id: any): any
	}
	
}

//# sourceMappingURL=line.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_text_code_line extends $.$mol_text_code_line {
        maximal_width(): number;
        syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
        tokens(path: number[]): Readonly<{
            name: string;
            found: string;
            chunks: string[];
        }[]>;
        sub(): (string | $mol_view)[];
        row_content(path: number[]): string[] | $mol_text_code_token[];
        Token(path: number[]): $mol_text_code_token;
        token_type(path: number[]): string;
        token_content(path: number[]): (string | $mol_text_code_token)[];
        token_text(path: number[]): string;
        token_uri(path: number[]): string;
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
        find_pos(offset: number): {
            token: $mol_text_code_token;
            offset: number;
        } | null;
        find_token_pos([offset, ...path]: number[]): {
            token: $mol_text_code_token;
            offset: number;
        } | null;
    }
}

declare namespace $.$$ {
}

declare var $node: any;

declare namespace $ {
    type $mol_blob = Blob;
    let $mol_blob: {
        prototype: Blob;
        new (blobParts?: readonly BlobPart[], options?: BlobPropertyBag): Blob;
    };
}

declare namespace $ {

	export class $mol_icon_clipboard extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=clipboard.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_clipboard_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {
    function $mol_html_encode(text: string): string;
}

declare namespace $ {

	type $mol_blob__mol_button_copy_1 = $mol_type_enforce<
		[ readonly(BlobPart)[], ({ 
			'type': string,
		})  ]
		,
		ConstructorParameters< typeof $mol_blob >
	>
	type $mol_blob__mol_button_copy_2 = $mol_type_enforce<
		[ readonly(BlobPart)[], ({ 
			'type': string,
		})  ]
		,
		ConstructorParameters< typeof $mol_blob >
	>
	export class $mol_button_copy extends $mol_button_minor {
		text( ): ReturnType< $mol_button_copy['title'] >
		text_blob( next?: $mol_blob ): $mol_blob
		html( ): string
		html_blob( next?: $mol_blob ): $mol_blob
		Icon( ): $mol_icon_clipboard_outline
		title( ): string
		blobs( ): readonly($mol_blob)[]
		data( ): Record<string, any>
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=copy.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Button copy text() value to clipboard
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
     */
    class $mol_button_copy extends $.$mol_button_copy {
        data(): {
            [k: string]: Blob;
        };
        html(): string;
        attachments(): ClipboardItem[];
        click(event?: Event): void;
    }
}

declare namespace $ {

	type $mol_text_code_line__numb_showed_mol_text_code_1 = $mol_type_enforce<
		ReturnType< $mol_text_code['sidebar_showed'] >
		,
		ReturnType< $mol_text_code_line['numb_showed'] >
	>
	type $mol_text_code_line__numb_mol_text_code_2 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_numb'] >
		,
		ReturnType< $mol_text_code_line['numb'] >
	>
	type $mol_text_code_line__theme_mol_text_code_3 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_theme'] >
		,
		ReturnType< $mol_text_code_line['theme'] >
	>
	type $mol_text_code_line__text_mol_text_code_4 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_text'] >
		,
		ReturnType< $mol_text_code_line['text'] >
	>
	type $mol_text_code_line__syntax_mol_text_code_5 = $mol_type_enforce<
		ReturnType< $mol_text_code['syntax'] >
		,
		ReturnType< $mol_text_code_line['syntax'] >
	>
	type $mol_text_code_line__uri_resolve_mol_text_code_6 = $mol_type_enforce<
		ReturnType< $mol_text_code['uri_resolve'] >
		,
		ReturnType< $mol_text_code_line['uri_resolve'] >
	>
	type $mol_text_code_line__highlight_mol_text_code_7 = $mol_type_enforce<
		ReturnType< $mol_text_code['highlight'] >
		,
		ReturnType< $mol_text_code_line['highlight'] >
	>
	type $mol_list__render_visible_only_mol_text_code_8 = $mol_type_enforce<
		ReturnType< $mol_text_code['render_visible_only'] >
		,
		ReturnType< $mol_list['render_visible_only'] >
	>
	type $mol_list__rows_mol_text_code_9 = $mol_type_enforce<
		ReturnType< $mol_text_code['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_copy__hint_mol_text_code_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['hint'] >
	>
	type $mol_button_copy__text_mol_text_code_11 = $mol_type_enforce<
		ReturnType< $mol_text_code['text_export'] >
		,
		ReturnType< $mol_button_copy['text'] >
	>
	export class $mol_text_code extends $mol_stack {
		sidebar_showed( ): boolean
		render_visible_only( ): boolean
		row_numb( id: any): number
		row_theme( id: any): string
		row_text( id: any): string
		syntax( ): any
		uri_resolve( id: any): string
		highlight( ): string
		Row( id: any): $mol_text_code_line
		rows( ): readonly(any)[]
		Rows( ): $mol_list
		text_export( ): string
		Copy( ): $mol_button_copy
		attr( ): ({ 
			'mol_text_code_sidebar_showed': ReturnType< $mol_text_code['sidebar_showed'] >,
		})  & ReturnType< $mol_stack['attr'] >
		text( ): string
		text_lines( ): readonly(string)[]
		find_pos( id: any): any
		uri_base( ): string
		row_themes( ): readonly(string)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=code.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Code visualizer.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_text_code_demo
     */
    class $mol_text_code extends $.$mol_text_code {
        render_visible_only(): boolean;
        text_lines(): readonly string[];
        rows(): $.$mol_text_code_line[];
        row_text(index: number): string;
        row_numb(index: number): number;
        find_pos(offset: number): any;
        sub(): ($.$mol_list | $.$mol_button_copy)[];
        syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
        uri_base(): string;
        uri_resolve(uri: string): string;
        text_export(): string;
        row_theme(row: number): string;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_float extends $mol_view {
		style( ): ({ 
			'minHeight': string,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=float.view.tree.d.ts.map
declare namespace $ {

	type $mol_grid_table__sub_mol_grid_1 = $mol_type_enforce<
		ReturnType< $mol_grid['rows'] >
		,
		ReturnType< $mol_grid_table['sub'] >
	>
	type $mol_dimmer__needle_mol_grid_2 = $mol_type_enforce<
		ReturnType< $mol_grid['needle'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_grid_3 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_value'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_grid_row__cells_mol_grid_4 = $mol_type_enforce<
		ReturnType< $mol_grid['head_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_grid_row__minimal_height_mol_grid_5 = $mol_type_enforce<
		ReturnType< $mol_grid['row_height'] >
		,
		ReturnType< $mol_grid_row['minimal_height'] >
	>
	type $mol_grid_row__minimal_width_mol_grid_6 = $mol_type_enforce<
		ReturnType< $mol_grid['minimal_width'] >
		,
		ReturnType< $mol_grid_row['minimal_width'] >
	>
	type $mol_grid_row__cells_mol_grid_7 = $mol_type_enforce<
		ReturnType< $mol_grid['cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_grid_cell__sub_mol_grid_8 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content_text'] >
		,
		ReturnType< $mol_grid_cell['sub'] >
	>
	type $mol_grid_number__sub_mol_grid_9 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content_number'] >
		,
		ReturnType< $mol_grid_number['sub'] >
	>
	type $mol_float__dom_name_mol_grid_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_float['dom_name'] >
	>
	type $mol_float__sub_mol_grid_11 = $mol_type_enforce<
		ReturnType< $mol_grid['col_head_content'] >
		,
		ReturnType< $mol_float['sub'] >
	>
	type $mol_check_expand__level_mol_grid_12 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_level'] >
		,
		ReturnType< $mol_check_expand['level'] >
	>
	type $mol_check_expand__label_mol_grid_13 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content'] >
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_check_expand__expanded_mol_grid_14 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_expanded'] >
		,
		ReturnType< $mol_check_expand['expanded'] >
	>
	export class $mol_grid extends $mol_view {
		rows( ): readonly($mol_view)[]
		Table( ): $mol_grid_table
		head_cells( ): readonly($mol_view)[]
		cells( id: any): readonly($mol_view)[]
		cell_content( id: any): readonly($mol_view_content)[]
		cell_content_text( id: any): ReturnType< $mol_grid['cell_content'] >
		cell_content_number( id: any): ReturnType< $mol_grid['cell_content'] >
		col_head_content( id: any): readonly($mol_view_content)[]
		cell_level( id: any): number
		cell_expanded( id: any, next?: boolean ): boolean
		needle( ): string
		cell_value( id: any): string
		Cell_dimmer( id: any): $mol_dimmer
		row_height( ): number
		row_ids( ): readonly(string[])[]
		row_id( id: any): any
		col_ids( ): readonly(any)[]
		records( ): Record<string, any>
		record( id: any): any
		hierarchy( ): any
		hierarchy_col( ): string
		minimal_width( ): number
		sub( ): readonly(any)[]
		Head( ): $mol_grid_row
		Row( id: any): $mol_grid_row
		Cell( id: any): $mol_view
		cell( id: any): any
		Cell_text( id: any): $mol_grid_cell
		Cell_number( id: any): $mol_grid_number
		Col_head( id: any): $mol_float
		Cell_branch( id: any): $mol_check_expand
		Cell_content( id: any): readonly(any)[]
	}
	
	export class $mol_grid_table extends $mol_list {
	}
	
	export class $mol_grid_row extends $mol_view {
		cells( ): readonly($mol_view)[]
		sub( ): ReturnType< $mol_grid_row['cells'] >
	}
	
	export class $mol_grid_cell extends $mol_view {
		minimal_height( ): number
	}
	
	export class $mol_grid_number extends $mol_grid_cell {
	}
	
}

//# sourceMappingURL=grid.view.tree.d.ts.map
declare namespace $.$$ {
    interface $mol_grid_node {
        id: string;
        parent: $mol_grid_node;
        sub: $mol_grid_node[];
    }
    class $mol_grid extends $.$mol_grid {
        head_cells(): readonly $mol_view[];
        col_head_content(colId: string): readonly string[];
        rows(): readonly $mol_view[];
        cells(row_id: string[]): readonly $mol_view[];
        col_type(col_id: string): "number" | "text" | "branch";
        Cell(id: {
            row: string[];
            col: string;
        }): $mol_view;
        cell_content(id: {
            row: string[];
            col: string;
        }): any[];
        cell_content_text(id: {
            row: string[];
            col: string;
        }): any[];
        records(): any;
        record(id: string): any;
        record_ids(): string[];
        row_id(index: number): string;
        col_ids(): readonly string[];
        hierarchy(): {
            [id: string]: $mol_grid_node;
        };
        row_sub_ids(row: string[]): string[][];
        row_root_id(): string[];
        cell_level(id: {
            row: string[];
        }): number;
        row_ids(): readonly string[][];
        row_expanded(row_id: string[], next?: boolean): boolean | null;
        row_expanded_default(row_id: string[]): boolean;
        cell_expanded(id: {
            row: string[];
        }, next?: boolean): boolean;
        sub(): readonly any[];
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_image__uri_mol_link_iconed_1 = $mol_type_enforce<
		ReturnType< $mol_link_iconed['icon'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_image__title_mol_link_iconed_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['title'] >
	>
	export class $mol_link_iconed extends $mol_link {
		icon( ): string
		Icon( ): $mol_image
		title( ): ReturnType< $mol_link_iconed['uri'] >
		sub( ): readonly(any)[]
		content( ): readonly(any)[]
		host( ): string
	}
	
}

//# sourceMappingURL=iconed.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_link_iconed extends $.$mol_link_iconed {
        icon(): string;
        host(): string;
        title(): string;
        sub(): readonly any[];
    }
}

declare namespace $ {
}

declare namespace $ {
    function $mol_wait_timeout_async(this: $, timeout: number): Promise<void>;
    function $mol_wait_timeout(this: $, timeout: number): void;
}

declare namespace $ {

	type $mol_link__uri_mol_embed_native_1 = $mol_type_enforce<
		ReturnType< $mol_embed_native['uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub_mol_embed_native_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_embed_native extends $mol_scroll {
		uri( next?: string ): string
		title( ): string
		Fallback( ): $mol_link
		uri_change( next?: any ): any
		dom_name( ): string
		window( ): any
		attr( ): ({ 
			'src': ReturnType< $mol_embed_native['uri'] >,
		})  & ReturnType< $mol_scroll['attr'] >
		sub( ): readonly(any)[]
		message( ): ({ 
			hashchange( next?: ReturnType< $mol_embed_native['uri_change'] > ): ReturnType< $mol_embed_native['uri_change'] >,
		}) 
	}
	
}

//# sourceMappingURL=native.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_embed_native extends $.$mol_embed_native {
        window(): Window;
        load(frame: HTMLIFrameElement): Promise<Window>;
        uri_resource(): string;
        message_listener(): $mol_dom_listener;
        sub_visible(): readonly $mol_view_content[];
        message_receive(event?: MessageEvent<[string, string]>): void;
        uri_change(event: MessageEvent<[string, string]>): void;
        auto(): (Window | $mol_dom_listener)[];
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_youtube extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=youtube.view.tree.d.ts.map
declare namespace $ {

	export class $mol_frame extends $mol_embed_native {
		allow( ): string
		html( ): any
		attr( ): ({ 
			'tabindex': ReturnType< $mol_frame['tabindex'] >,
			'allow': ReturnType< $mol_frame['allow'] >,
			'src': ReturnType< $mol_frame['uri'] >,
			'srcdoc': ReturnType< $mol_frame['html'] >,
		}) 
		fullscreen( ): boolean
		accelerometer( ): boolean
		autoplay( ): boolean
		encription( ): boolean
		gyroscope( ): boolean
		pip( ): boolean
		clipboard_read( ): boolean
		clipboard_write( ): boolean
	}
	
}

//# sourceMappingURL=frame.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_frame_demo
     */
    class $mol_frame extends $.$mol_frame {
        window(): any;
        allow(): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_image__title_mol_embed_service_1 = $mol_type_enforce<
		ReturnType< $mol_embed_service['title'] >
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri_mol_embed_service_2 = $mol_type_enforce<
		ReturnType< $mol_embed_service['video_preview'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_frame__title_mol_embed_service_3 = $mol_type_enforce<
		ReturnType< $mol_embed_service['title'] >
		,
		ReturnType< $mol_frame['title'] >
	>
	type $mol_frame__uri_mol_embed_service_4 = $mol_type_enforce<
		ReturnType< $mol_embed_service['video_embed'] >
		,
		ReturnType< $mol_frame['uri'] >
	>
	export class $mol_embed_service extends $mol_check {
		active( next?: boolean ): boolean
		title( ): string
		video_preview( ): string
		Image( ): $mol_image
		Hint( ): $mol_icon_youtube
		video_embed( ): string
		Frame( ): $mol_frame
		uri( ): string
		video_id( ): string
		checked( next?: ReturnType< $mol_embed_service['active'] > ): ReturnType< $mol_embed_service['active'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=service.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_embed_service extends $.$mol_embed_service {
        sub(): $.$mol_frame[] | ($.$mol_image | $mol_icon_youtube)[];
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_embed_youtube extends $mol_embed_service {
	}
	
}

//# sourceMappingURL=youtube.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_embed_youtube extends $.$mol_embed_youtube {
        video_embed(): string;
        video_id(): string;
        video_preview(): string;
    }
}

declare namespace $ {

	export class $mol_embed_rutube extends $mol_embed_service {
	}
	
}

//# sourceMappingURL=rutube.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_embed_rutube extends $.$mol_embed_rutube {
        video_embed(): string;
        video_id(): string;
        video_preview(): string;
    }
}

declare namespace $ {

	export class $mol_embed_vklive extends $mol_embed_service {
	}
	
}

//# sourceMappingURL=vklive.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_embed_vklive extends $.$mol_embed_vklive {
        video_embed(): string;
        channel_id(): string;
        video_id(): string;
        video_preview(): string;
    }
}

declare namespace $ {

	type $mol_image__title_mol_embed_any_1 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri_mol_embed_any_2 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_embed_native__title_mol_embed_any_3 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_native['title'] >
	>
	type $mol_embed_native__uri_mol_embed_any_4 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_native['uri'] >
	>
	type $mol_embed_youtube__title_mol_embed_any_5 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_youtube['title'] >
	>
	type $mol_embed_youtube__uri_mol_embed_any_6 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_youtube['uri'] >
	>
	type $mol_embed_rutube__title_mol_embed_any_7 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_rutube['title'] >
	>
	type $mol_embed_rutube__uri_mol_embed_any_8 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_rutube['uri'] >
	>
	type $mol_embed_vklive__title_mol_embed_any_9 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_vklive['title'] >
	>
	type $mol_embed_vklive__uri_mol_embed_any_10 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_vklive['uri'] >
	>
	export class $mol_embed_any extends $mol_view {
		title( ): string
		uri( ): string
		Image( ): $mol_image
		Object( ): $mol_embed_native
		Youtube( ): $mol_embed_youtube
		Rutube( ): $mol_embed_rutube
		Vklive( ): $mol_embed_vklive
	}
	
}

//# sourceMappingURL=any.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_embed_any extends $.$mol_embed_any {
        type(): "object" | "image" | "youtube" | "rutube" | "vklive";
        sub(): $.$mol_image[] | $.$mol_embed_youtube[] | $.$mol_embed_native[];
    }
}

declare namespace $ {

	type $mol_text__text_mol_text_1 = $mol_type_enforce<
		ReturnType< $mol_text['spoiler_label'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__text_mol_text_2 = $mol_type_enforce<
		ReturnType< $mol_text['spoiler_content'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_paragraph__sub_mol_text_3 = $mol_type_enforce<
		ReturnType< $mol_text['block_content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_text__uri_resolve_mol_text_4 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text_mol_text_5 = $mol_type_enforce<
		ReturnType< $mol_text['quote_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__highlight_mol_text_6 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__auto_scroll_mol_text_7 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text_list__uri_resolve_mol_text_8 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_list['uri_resolve'] >
	>
	type $mol_text_list__type_mol_text_9 = $mol_type_enforce<
		ReturnType< $mol_text['list_type'] >
		,
		ReturnType< $mol_text_list['type'] >
	>
	type $mol_text_list__text_mol_text_10 = $mol_type_enforce<
		ReturnType< $mol_text['list_text'] >
		,
		ReturnType< $mol_text_list['text'] >
	>
	type $mol_text_list__highlight_mol_text_11 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_list['highlight'] >
	>
	type $mol_text_header__minimal_height_mol_text_12 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_text_header['minimal_height'] >
	>
	type $mol_text_header__level_mol_text_13 = $mol_type_enforce<
		ReturnType< $mol_text['header_level'] >
		,
		ReturnType< $mol_text_header['level'] >
	>
	type $mol_text_header__content_mol_text_14 = $mol_type_enforce<
		ReturnType< $mol_text['block_content'] >
		,
		ReturnType< $mol_text_header['content'] >
	>
	type $mol_text_header__arg_mol_text_15 = $mol_type_enforce<
		ReturnType< $mol_text['header_arg'] >
		,
		ReturnType< $mol_text_header['arg'] >
	>
	type $mol_text_code__text_mol_text_16 = $mol_type_enforce<
		ReturnType< $mol_text['pre_text'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__row_themes_mol_text_17 = $mol_type_enforce<
		ReturnType< $mol_text['pre_themes'] >
		,
		ReturnType< $mol_text_code['row_themes'] >
	>
	type $mol_text_code__highlight_mol_text_18 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_code['highlight'] >
	>
	type $mol_text_code__uri_resolve_mol_text_19 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_code['uri_resolve'] >
	>
	type $mol_text_code__sidebar_showed_mol_text_20 = $mol_type_enforce<
		ReturnType< $mol_text['pre_sidebar_showed'] >
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_view__dom_name_mol_text_21 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_grid__head_cells_mol_text_22 = $mol_type_enforce<
		ReturnType< $mol_text['table_head_cells'] >
		,
		ReturnType< $mol_grid['head_cells'] >
	>
	type $mol_grid__rows_mol_text_23 = $mol_type_enforce<
		ReturnType< $mol_text['table_rows'] >
		,
		ReturnType< $mol_grid['rows'] >
	>
	type $mol_grid_row__cells_mol_text_24 = $mol_type_enforce<
		ReturnType< $mol_text['table_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_text__auto_scroll_mol_text_25 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text__highlight_mol_text_26 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__uri_resolve_mol_text_27 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text_mol_text_28 = $mol_type_enforce<
		ReturnType< $mol_text['table_cell_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_grid__rows_mol_text_29 = $mol_type_enforce<
		ReturnType< $mol_text['grid_rows'] >
		,
		ReturnType< $mol_grid['rows'] >
	>
	type $mol_grid_row__cells_mol_text_30 = $mol_type_enforce<
		ReturnType< $mol_text['grid_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_text__auto_scroll_mol_text_31 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text__highlight_mol_text_32 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__uri_resolve_mol_text_33 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text_mol_text_34 = $mol_type_enforce<
		ReturnType< $mol_text['grid_cell_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_dimmer__dom_name_mol_text_35 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['dom_name'] >
	>
	type $mol_dimmer__needle_mol_text_36 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_text_37 = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_text_span__dom_name_mol_text_38 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_text_span['dom_name'] >
	>
	type $mol_text_span__type_mol_text_39 = $mol_type_enforce<
		ReturnType< $mol_text['line_type'] >
		,
		ReturnType< $mol_text_span['type'] >
	>
	type $mol_text_span__sub_mol_text_40 = $mol_type_enforce<
		ReturnType< $mol_text['line_content'] >
		,
		ReturnType< $mol_text_span['sub'] >
	>
	type $mol_text_code_line__numb_showed_mol_text_41 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code_line['numb_showed'] >
	>
	type $mol_text_code_line__highlight_mol_text_42 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_code_line['highlight'] >
	>
	type $mol_text_code_line__text_mol_text_43 = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_text_code_line['text'] >
	>
	type $mol_text_code_line__uri_resolve_mol_text_44 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_code_line['uri_resolve'] >
	>
	type $mol_text_code_line__syntax_mol_text_45 = $mol_type_enforce<
		ReturnType< $mol_text['code_syntax'] >
		,
		ReturnType< $mol_text_code_line['syntax'] >
	>
	type $mol_link_iconed__uri_mol_text_46 = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__content_mol_text_47 = $mol_type_enforce<
		ReturnType< $mol_text['line_content'] >
		,
		ReturnType< $mol_link_iconed['content'] >
	>
	type $mol_link_iconed__uri_mol_text_48 = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__content_mol_text_49 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link_iconed['content'] >
	>
	type $mol_embed_any__uri_mol_text_50 = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_embed_any['uri'] >
	>
	type $mol_embed_any__title_mol_text_51 = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_embed_any['title'] >
	>
	type $mol_expander__label_mol_text_52 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['label'] >
	>
	type $mol_expander__content_mol_text_53 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	export class $mol_text extends $mol_list {
		auto_scroll( ): any
		block_content( id: any): readonly(any)[]
		uri_resolve( id: any): string
		quote_text( id: any): string
		highlight( ): string
		list_type( id: any): string
		list_text( id: any): string
		header_level( id: any): number
		header_arg( id: any): Record<string, any>
		pre_text( id: any): string
		pre_themes( id: any): readonly(string)[]
		code_sidebar_showed( ): boolean
		pre_sidebar_showed( ): ReturnType< $mol_text['code_sidebar_showed'] >
		table_head_cells( id: any): readonly(any)[]
		table_rows( id: any): readonly(any)[]
		table_cells( id: any): readonly(any)[]
		table_cell_text( id: any): string
		grid_rows( id: any): readonly(any)[]
		grid_cells( id: any): readonly(any)[]
		grid_cell_text( id: any): string
		line_text( id: any): string
		line_type( id: any): string
		line_content( id: any): readonly(any)[]
		code_syntax( ): any
		link_uri( id: any): string
		link_host( id: any): string
		spoiler_label( id: any): string
		Spoiler_label( id: any): $mol_text
		spoiler_content( id: any): string
		Spoiler_content( id: any): $mol_text
		uri_base( ): string
		text( ): string
		param( ): string
		flow_tokens( ): readonly(any)[]
		block_text( id: any): string
		auto( ): readonly(any)[]
		Paragraph( id: any): $mol_paragraph
		Quote( id: any): $mol_text
		List( id: any): $mol_text_list
		item_index( id: any): number
		Header( id: any): $mol_text_header
		Pre( id: any): $mol_text_code
		Cut( id: any): $mol_view
		Table( id: any): $mol_grid
		Table_row( id: any): $mol_grid_row
		Table_cell( id: any): $mol_text
		Grid( id: any): $mol_grid
		Grid_row( id: any): $mol_grid_row
		Grid_cell( id: any): $mol_text
		String( id: any): $mol_dimmer
		Span( id: any): $mol_text_span
		Code_line( id: any): $mol_text_code_line
		Link( id: any): $mol_link_iconed
		Link_http( id: any): $mol_link_iconed
		Embed( id: any): $mol_embed_any
		Spoiler( id: any): $mol_expander
	}
	
	type $mol_link__arg_mol_text_header_1 = $mol_type_enforce<
		ReturnType< $mol_text_header['arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__hint_mol_text_header_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_mol_text_header_3 = $mol_type_enforce<
		ReturnType< $mol_text_header['content'] >
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_text_header extends $mol_paragraph {
		arg( ): Record<string, any>
		content( ): readonly(any)[]
		Link( ): $mol_link
		level( ): number
		sub( ): readonly(any)[]
	}
	
	export class $mol_text_span extends $mol_paragraph {
		type( ): string
		dom_name( ): string
		attr( ): ({ 
			'mol_text_type': ReturnType< $mol_text_span['type'] >,
		})  & ReturnType< $mol_paragraph['attr'] >
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Markdown visualizer.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_text_demo
     */
    class $mol_text extends $.$mol_text {
        flow_tokens(): Readonly<{
            name: string;
            found: string;
            chunks: string[];
        }[]>;
        block_type(index: number): string;
        rows(): ($mol_view | $.$mol_paragraph | $.$mol_text_code | $.$mol_grid)[];
        param(): string;
        header_level(index: number): number;
        header_arg(index: number): {
            [x: string]: string;
        };
        list_type(index: number): string;
        item_index(index: number): number;
        pre_text(index: number): string;
        pre_themes(index: number): string[];
        quote_text(index: number): string;
        list_text(index: number): string;
        cell_content(indexBlock: number): string[][];
        table_rows(blockId: number): $mol_grid_row[];
        table_head_cells(blockId: number): $.$mol_text[];
        table_cells(id: {
            block: number;
            row: number;
        }): $.$mol_text[];
        table_cell_text(id: {
            block: number;
            row: number;
            cell: number;
        }): string;
        grid_content(indexBlock: number): string[][];
        grid_rows(blockId: number): $mol_grid_row[];
        grid_cells(id: {
            block: number;
            row: number;
        }): $.$mol_text[];
        grid_cell_text(id: {
            block: number;
            row: number;
            cell: number;
        }): string;
        uri_base(): string;
        uri_base_abs(): URL;
        uri_resolve(uri: string): string;
        code_syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
        block_text(index: number): string;
        block_content(index: number): ($.$mol_dimmer | $.$mol_text_code_line | $.$mol_link_iconed | $.$mol_embed_any | $mol_text_span)[];
        line_tokens(path: readonly number[]): Readonly<{
            name: string;
            found: string;
            chunks: string[];
        }[]>;
        line_token(path: readonly number[]): {
            name: string;
            found: string;
            chunks: string[];
        };
        line_type(path: readonly number[]): string;
        line_text(path: readonly number[]): string;
        line_content(path: readonly number[]): ($.$mol_dimmer | $.$mol_text_code_line | $.$mol_link_iconed | $.$mol_embed_any | $mol_text_span)[];
        link_uri(path: readonly number[]): string;
        link_host(path: readonly number[]): string;
        auto_scroll(): void;
        spoiler_rows(index: number): string[];
        spoiler_label(index: number): string;
        spoiler_content(index: number): string;
    }
    class $mol_text_header extends $.$mol_text_header {
        dom_name(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_row extends $mol_view {
	}
	
}

//# sourceMappingURL=row.view.tree.d.ts.map
declare namespace $ {

	type $mol_check__checked_mol_check_list_1 = $mol_type_enforce<
		ReturnType< $mol_check_list['option_checked'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__label_mol_check_list_2 = $mol_type_enforce<
		ReturnType< $mol_check_list['option_label'] >
		,
		ReturnType< $mol_check['label'] >
	>
	type $mol_check__enabled_mol_check_list_3 = $mol_type_enforce<
		ReturnType< $mol_check_list['option_enabled'] >
		,
		ReturnType< $mol_check['enabled'] >
	>
	type $mol_check__hint_mol_check_list_4 = $mol_type_enforce<
		ReturnType< $mol_check_list['option_hint'] >
		,
		ReturnType< $mol_check['hint'] >
	>
	type $mol_check__minimal_height_mol_check_list_5 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_height'] >
	>
	export class $mol_check_list extends $mol_view {
		option_checked( id: any, next?: boolean ): boolean
		option_title( id: any): string
		option_label( id: any): readonly(any)[]
		enabled( ): boolean
		option_enabled( id: any): ReturnType< $mol_check_list['enabled'] >
		option_hint( id: any): string
		items( ): readonly($mol_check)[]
		dictionary( ): Record<string, any>
		Option( id: any): $mol_check
		options( ): Record<string, any>
		keys( ): readonly(string)[]
		sub( ): ReturnType< $mol_check_list['items'] >
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * List of checkboxes
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_list_demo
     */
    class $mol_check_list extends $.$mol_check_list {
        options(): {
            [key: string]: string;
        };
        dictionary(next?: Record<string, boolean>): Record<string, boolean>;
        option_checked(id: string, next?: boolean | null): boolean;
        keys(): readonly string[];
        items(): $.$mol_check[];
        option_title(key: string): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_switch extends $mol_check_list {
		value( next?: string ): string
	}
	
}

//# sourceMappingURL=switch.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Buttons which switching the state
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_switch_demo
     */
    class $mol_switch extends $.$mol_switch {
        value(next?: string): string;
        option_checked(key: string, next?: boolean): boolean;
    }
}

declare namespace $ {

	export class $mol_nav extends $mol_plugin {
		event_key( next?: any ): any
		cycle( next?: boolean ): boolean
		mod_ctrl( ): boolean
		mod_shift( ): boolean
		mod_alt( ): boolean
		keys_x( next?: readonly(any)[] ): readonly(any)[]
		keys_y( next?: readonly(any)[] ): readonly(any)[]
		current_x( next?: any ): any
		current_y( next?: any ): any
		event_up( next?: any ): any
		event_down( next?: any ): any
		event_left( next?: any ): any
		event_right( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_nav['event_key'] > ): ReturnType< $mol_nav['event_key'] >,
		})  & ReturnType< $mol_plugin['event'] >
	}
	
}

//# sourceMappingURL=nav.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Plugin which can navigate in list of items
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_nav_demo
     */
    class $mol_nav extends $.$mol_nav {
        event_key(event?: KeyboardEvent): undefined;
        event_up(event?: KeyboardEvent): undefined;
        event_down(event?: KeyboardEvent): undefined;
        event_left(event?: KeyboardEvent): undefined;
        event_right(event?: KeyboardEvent): undefined;
        index_y(): number | null;
        index_x(): number | null;
    }
}

declare namespace $ {

	export class $mol_icon_close extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=close.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__key_mol_search_1 = $mol_type_enforce<
		({ 
			escape( next?: ReturnType< $mol_search['clear'] > ): ReturnType< $mol_search['clear'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_nav__keys_y_mol_search_2 = $mol_type_enforce<
		ReturnType< $mol_search['nav_components'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y_mol_search_3 = $mol_type_enforce<
		ReturnType< $mol_search['nav_focused'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_string__value_mol_search_4 = $mol_type_enforce<
		ReturnType< $mol_search['query'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_mol_search_5 = $mol_type_enforce<
		ReturnType< $mol_search['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__submit_mol_search_6 = $mol_type_enforce<
		ReturnType< $mol_search['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_string__enabled_mol_search_7 = $mol_type_enforce<
		ReturnType< $mol_search['enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__keyboard_mol_search_8 = $mol_type_enforce<
		ReturnType< $mol_search['keyboard'] >
		,
		ReturnType< $mol_string['keyboard'] >
	>
	type $mol_string__enter_mol_search_9 = $mol_type_enforce<
		ReturnType< $mol_search['enter'] >
		,
		ReturnType< $mol_string['enter'] >
	>
	type $mol_button_minor__hint_mol_search_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_mol_search_11 = $mol_type_enforce<
		ReturnType< $mol_search['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click_mol_search_12 = $mol_type_enforce<
		ReturnType< $mol_search['clear'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_search_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_list__rows_mol_search_14 = $mol_type_enforce<
		ReturnType< $mol_search['menu_items'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_search_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_dimmer__haystack_mol_search_16 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_label'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_search_17 = $mol_type_enforce<
		ReturnType< $mol_search['query'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_search_plugins__18 = $mol_type_enforce<
		ReturnType< $mol_pop['plugins'] >[number]
		,
		$mol_plugin
	>
	type $mol_view__sub_mol_search_19 = $mol_type_enforce<
		ReturnType< $mol_search['anchor_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_mol_search_20 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_select'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_search_21 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_content'] >
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_search extends $mol_pop {
		clear( next?: any ): any
		Hotkey( ): $mol_hotkey
		nav_components( ): readonly($mol_view)[]
		nav_focused( next?: any ): any
		Nav( ): $mol_nav
		suggests_showed( next?: boolean ): boolean
		query( next?: string ): string
		hint( ): string
		submit( next?: any ): any
		enabled( ): boolean
		keyboard( ): string
		enter( ): string
		bring( ): ReturnType< ReturnType< $mol_search['Query'] >['bring'] >
		Query( ): $mol_string
		Clear_icon( ): $mol_icon_close
		Clear( ): $mol_button_minor
		anchor_content( ): readonly(any)[]
		menu_items( ): readonly($mol_view)[]
		Menu( ): $mol_list
		Bubble_pane( ): $mol_scroll
		suggest_select( id: any, next?: any ): any
		suggest_label( id: any): string
		Suggest_label( id: any): $mol_dimmer
		suggest_content( id: any): readonly($mol_view_content)[]
		suggests( ): readonly(string)[]
		plugins( ): readonly($mol_plugin)[]
		showed( next?: ReturnType< $mol_search['suggests_showed'] > ): ReturnType< $mol_search['suggests_showed'] >
		align_hor( ): string
		Anchor( ): $mol_view
		bubble_content( ): readonly($mol_view_content)[]
		Suggest( id: any): $mol_button_minor
	}
	
}

//# sourceMappingURL=search.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Search input with suggest and clear button.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_search_demo
     */
    class $mol_search extends $.$mol_search {
        anchor_content(): ($mol_button_minor | $.$mol_string)[];
        suggests_showed(next?: boolean): boolean;
        suggest_selected(next?: string): void;
        nav_components(): ($mol_button_minor | $.$mol_string)[];
        nav_focused(component?: $mol_view): $mol_view | $.$mol_string | null;
        suggest_label(key: string): string;
        menu_items(): $mol_button_minor[];
        suggest_select(id: string, event?: MouseEvent): void;
        clear(event?: Event): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_dots_vertical extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=vertical.view.tree.d.ts.map
declare namespace $ {
    function $mol_match_text<Variant>(query: string, values: (variant: Variant) => readonly string[]): (variant: Variant) => boolean;
}

declare namespace $ {

	type $mol_dimmer__haystack_mol_select_1 = $mol_type_enforce<
		ReturnType< $mol_select['option_label'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_select_2 = $mol_type_enforce<
		ReturnType< $mol_select['filter_pattern'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_nav__keys_y_mol_select_3 = $mol_type_enforce<
		ReturnType< $mol_select['nav_components'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y_mol_select_4 = $mol_type_enforce<
		ReturnType< $mol_select['option_focused'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_nav__cycle_mol_select_5 = $mol_type_enforce<
		ReturnType< $mol_select['nav_cycle'] >
		,
		ReturnType< $mol_nav['cycle'] >
	>
	type $mol_list__rows_mol_select_6 = $mol_type_enforce<
		ReturnType< $mol_select['menu_content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_select_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_button_minor__enabled_mol_select_8 = $mol_type_enforce<
		ReturnType< $mol_select['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__event_click_mol_select_9 = $mol_type_enforce<
		ReturnType< $mol_select['event_select'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__sub_mol_select_10 = $mol_type_enforce<
		ReturnType< $mol_select['option_content'] >
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_mol_select_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_search__query_mol_select_12 = $mol_type_enforce<
		ReturnType< $mol_select['filter_pattern'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_search__hint_mol_select_13 = $mol_type_enforce<
		ReturnType< $mol_select['filter_hint'] >
		,
		ReturnType< $mol_search['hint'] >
	>
	type $mol_search__submit_mol_select_14 = $mol_type_enforce<
		ReturnType< $mol_select['submit'] >
		,
		ReturnType< $mol_search['submit'] >
	>
	type $mol_search__enabled_mol_select_15 = $mol_type_enforce<
		ReturnType< $mol_select['enabled'] >
		,
		ReturnType< $mol_search['enabled'] >
	>
	export class $mol_select extends $mol_pick {
		enabled( ): boolean
		event_select( id: any, next?: any ): any
		option_label( id: any): string
		filter_pattern( next?: string ): string
		Option_label( id: any): $mol_dimmer
		option_content( id: any): readonly(any)[]
		no_options_message( ): string
		nav_components( ): readonly($mol_view)[]
		option_focused( next?: any ): any
		nav_cycle( next?: boolean ): boolean
		Nav( ): $mol_nav
		menu_content( ): readonly($mol_view)[]
		Menu( ): $mol_list
		Bubble_pane( ): $mol_scroll
		filter_hint( ): string
		submit( next?: any ): any
		dictionary( next?: Record<string, any> ): Record<string, any>
		options( ): readonly(string)[]
		value( next?: string ): string
		option_label_default( ): string
		Option_row( id: any): $mol_button_minor
		No_options( ): $mol_view
		plugins( ): readonly(any)[]
		hint( ): string
		bubble_content( ): readonly(any)[]
		Filter( ): $mol_search
		Trigger_icon( ): $mol_icon_dots_vertical
		trigger_enabled( ): ReturnType< $mol_select['enabled'] >
	}
	
}

//# sourceMappingURL=select.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Allow user to select value from various options and displays current value.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_select_demo_colors
     */
    class $mol_select extends $.$mol_select {
        filter_pattern(next?: string): string;
        open(): void;
        options(): readonly string[];
        options_filtered(): readonly string[];
        option_label(id: string): any;
        option_rows(): $mol_button_minor[];
        option_focused(component?: $mol_view): $mol_view | $.$mol_search | null;
        event_select(id: string, event?: MouseEvent): void;
        nav_components(): ($mol_button_minor | $.$mol_search)[];
        trigger_content(): readonly $mol_view_content[];
        menu_content(): $mol_view[];
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_view__dom_name_mol_page_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_2 = $mol_type_enforce<
		ReturnType< $mol_page['title_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_page_3 = $mol_type_enforce<
		ReturnType< $mol_page['tools'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height_mol_page_4 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__dom_name_mol_page_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_6 = $mol_type_enforce<
		ReturnType< $mol_page['head'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type __mol_page_7 = $mol_type_enforce<
		Parameters< $mol_page['body_scroll_top'] >[0]
		,
		Parameters< ReturnType< $mol_page['Body'] >['scroll_top'] >[0]
	>
	type $mol_view__sub_mol_page_8 = $mol_type_enforce<
		ReturnType< $mol_page['body'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_scroll__sub_mol_page_9 = $mol_type_enforce<
		ReturnType< $mol_page['body_content'] >
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_view__dom_name_mol_page_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_11 = $mol_type_enforce<
		ReturnType< $mol_page['foot'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_page extends $mol_view {
		tabindex( ): number
		Logo( ): any
		title_content( ): readonly(any)[]
		Title( ): $mol_view
		tools( ): readonly($mol_view_content)[]
		Tools( ): $mol_view
		head( ): readonly(any)[]
		Head( ): $mol_view
		body_scroll_top( next?: ReturnType< ReturnType< $mol_page['Body'] >['scroll_top'] > ): ReturnType< ReturnType< $mol_page['Body'] >['scroll_top'] >
		body( ): readonly($mol_view)[]
		Body_content( ): $mol_view
		body_content( ): readonly(any)[]
		Body( ): $mol_scroll
		foot( ): readonly($mol_view)[]
		Foot( ): $mol_view
		dom_name( ): string
		attr( ): ({ 
			'tabIndex': ReturnType< $mol_page['tabindex'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=page.view.tree.d.ts.map
declare namespace $.$$ {
}

declare namespace $ {
}

declare namespace $ {

	type $mol_text_list_item__index_mol_text_list_1 = $mol_type_enforce<
		ReturnType< $mol_text_list['item_index'] >
		,
		ReturnType< $mol_text_list_item['index'] >
	>
	type $mol_text_list_item__sub_mol_text_list_2 = $mol_type_enforce<
		ReturnType< $mol_text_list['block_content'] >
		,
		ReturnType< $mol_text_list_item['sub'] >
	>
	export class $mol_text_list extends $mol_text {
		type( ): string
		auto_scroll( ): any
		attr( ): ({ 
			'mol_text_list_type': ReturnType< $mol_text_list['type'] >,
		})  & ReturnType< $mol_text['attr'] >
		Paragraph( id: any): $mol_text_list_item
	}
	
	export class $mol_text_list_item extends $mol_paragraph {
		index( ): number
		attr( ): ({ 
			'mol_text_list_item_index': ReturnType< $mol_text_list_item['index'] >,
		})  & ReturnType< $mol_paragraph['attr'] >
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $ {
    /**
     * Docs content registry for smalljs. GENERATED by content/gen.cjs — do not
     * edit by hand; edit the .md sources in content/en/docs/ and re-run the
     * generator. Markdown is embedded (not fetched) so it bundles into web.js
     * and works with the app/- deploy and the prerender step.
     */
    type $bog_smalljs_content_translation = {
        title: string;
        /** First prose paragraph of the translated page, for meta/OG descriptions. */
        summary?: string;
        md: string;
    };
    type $bog_smalljs_content_page = {
        slug: string;
        title: string;
        /** One-line description, used for meta/OG descriptions and llms.txt. */
        summary: string;
        /** GitHub-relative path, for the Edit-on-GitHub link. */
        file: string;
        md: string;
        /** Per-language overrides, keyed by lang code. EN lives in title/md above. */
        tr?: Readonly<Record<string, $bog_smalljs_content_translation>>;
    };
    type $bog_smalljs_content_group = {
        title: string;
        pages: readonly string[];
    };
    type $bog_smalljs_content_section = {
        id: string;
        title: string;
        groups: readonly $bog_smalljs_content_group[];
    };
    class $bog_smalljs_content extends $mol_object2 {
        static sections(): readonly $bog_smalljs_content_section[];
        static pages(): Readonly<Record<string, $bog_smalljs_content_page>>;
        /** Flat ordered slug list for prev/next. */
        static order(section?: string): readonly string[];
        static page(slug: string): $bog_smalljs_content_page | null;
        /** Markdown for a page in the given language, falling back to EN. */
        static page_md(slug: string, lang?: string): string | null;
        /** Localized title for a page, falling back to EN. */
        static page_title(slug: string, lang?: string): string | null;
        /** Summary for a page in the given language: the translated first
         *  paragraph when present, else the EN manifest one-liner. */
        static page_summary(slug: string, lang?: string): string | null;
        static default_slug(): string;
    }
}

declare namespace $ {

	export class $mol_icon_menu extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=menu.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_smalljs_structure_step_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_structure_step_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_structure_step_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_structure_step_4 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure_step['body_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_structure_step extends $mol_view {
		Number( ): $mol_view
		Text( ): $mol_view
		Code( ): $mol_view
		body_content( ): readonly(any)[]
		Body( ): $mol_view
		number( ): string
		text( ): string
		code( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=step.view.tree.d.ts.map
declare namespace $.$$ {
    /** One numbered step of "how to start a project", with the command or path it names. */
    class $bog_smalljs_structure_step extends $.$bog_smalljs_structure_step {
        /** A step without a command is just the sentence. */
        body_content(): $mol_view[];
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_help extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=help.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_help_circle extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=circle.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_help_circle_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	export class $mol_pop_over extends $mol_pop {
		hovered( next?: boolean ): boolean
		event_show( next?: any ): any
		event_hide( next?: any ): any
		showed( ): ReturnType< $mol_pop_over['hovered'] >
		attr( ): ({ 
			'tabindex': number,
		})  & ReturnType< $mol_pop['attr'] >
		event( ): ({ 
			mouseenter( next?: ReturnType< $mol_pop_over['event_show'] > ): ReturnType< $mol_pop_over['event_show'] >,
			mouseleave( next?: ReturnType< $mol_pop_over['event_hide'] > ): ReturnType< $mol_pop_over['event_hide'] >,
		})  & ReturnType< $mol_pop['event'] >
	}
	
}

//# sourceMappingURL=over.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Bubble that can be shown anchored to Anchor element.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_over_demo
     */
    class $mol_pop_over extends $.$mol_pop_over {
        event_show(event?: MouseEvent): void;
        event_hide(event?: MouseEvent): void;
        showed(): boolean;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_view__sub_bog_smalljs_structure_row_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_structure_row_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_structure_row_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_structure_row_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_pop_over__Anchor_bog_smalljs_structure_row_5 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure_row['Help_icon'] >
		,
		ReturnType< $mol_pop_over['Anchor'] >
	>
	type $mol_pop_over__bubble_content_bog_smalljs_structure_row_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pop_over['bubble_content'] >
	>
	type $mol_view__event_bog_smalljs_structure_row_7 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_smalljs_structure_row['line_click'] > ): ReturnType< $bog_smalljs_structure_row['line_click'] >,
		}) 
		,
		ReturnType< $mol_view['event'] >
	>
	type $mol_view__sub_bog_smalljs_structure_row_8 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure_row['line_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_structure_row extends $mol_view {
		Prefix( ): $mol_view
		Name( ): $mol_view
		Comment( ): $mol_view
		Help_icon( ): $mol_icon_help_circle_outline
		Note( ): $mol_view
		Help( ): $mol_pop_over
		line_content( ): readonly(any)[]
		Line( ): $mol_view
		prefix( ): string
		name( ): string
		pad( ): string
		comment( ): string
		note( ): string
		kind( ): string
		active( ): boolean
		pickable( ): boolean
		pick( next?: any ): any
		line_click( next?: any ): any
		attr( ): ({ 
			'bog_smalljs_structure_kind': ReturnType< $bog_smalljs_structure_row['kind'] >,
			'bog_smalljs_structure_active': ReturnType< $bog_smalljs_structure_row['active'] >,
			'bog_smalljs_structure_pickable': ReturnType< $bog_smalljs_structure_row['pickable'] >,
		}) 
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=row.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * One line of the project tree: the box-drawing indent, the name, the comment that
     * followed it in the listing, and a "?" whose tooltip says why the file or folder is
     * there. A line of a list is its own component, because a keyed sub-view does not
     * pass its key down to keyed children.
     *
     * The explanation is a $mol_pop_over — it opens on hover (and on focus, so the
     * keyboard reaches it) and renders in the browser's top layer, which is what keeps
     * it whole inside the scrolling boxes this tree lives in: the docs body and the
     * playground's side panel would both clip an ordinary absolutely positioned box.
     * It used to unfold under the line instead, and pushed the rest of the tree down
     * every time a reader asked what a folder was for.
     */
    class $bog_smalljs_structure_row extends $.$bog_smalljs_structure_row {
        /** No comment, no column; no explanation, no question mark. */
        line_content(): ($mol_view | $.$mol_pop_over)[];
        /** A whole line is the click target when the host offers a file to open. */
        line_click(next?: any): null;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_view__sub_bog_smalljs_structure_1 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['rows'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_structure_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_structure_step__number_bog_smalljs_structure_3 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_structure_step['number'] >
	>
	type $bog_smalljs_structure_step__text_bog_smalljs_structure_4 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['step1_text'] >
		,
		ReturnType< $bog_smalljs_structure_step['text'] >
	>
	type $bog_smalljs_structure_step__code_bog_smalljs_structure_5 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['step1_code'] >
		,
		ReturnType< $bog_smalljs_structure_step['code'] >
	>
	type $bog_smalljs_structure_step__number_bog_smalljs_structure_6 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_structure_step['number'] >
	>
	type $bog_smalljs_structure_step__text_bog_smalljs_structure_7 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['step2_text'] >
		,
		ReturnType< $bog_smalljs_structure_step['text'] >
	>
	type $bog_smalljs_structure_step__code_bog_smalljs_structure_8 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['step2_code'] >
		,
		ReturnType< $bog_smalljs_structure_step['code'] >
	>
	type $bog_smalljs_structure_step__number_bog_smalljs_structure_9 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_structure_step['number'] >
	>
	type $bog_smalljs_structure_step__text_bog_smalljs_structure_10 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['step3_text'] >
		,
		ReturnType< $bog_smalljs_structure_step['text'] >
	>
	type $bog_smalljs_structure_step__code_bog_smalljs_structure_11 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['step3_code'] >
		,
		ReturnType< $bog_smalljs_structure_step['code'] >
	>
	type $bog_smalljs_structure_step__number_bog_smalljs_structure_12 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_structure_step['number'] >
	>
	type $bog_smalljs_structure_step__text_bog_smalljs_structure_13 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['step4_text'] >
		,
		ReturnType< $bog_smalljs_structure_step['text'] >
	>
	type $bog_smalljs_structure_step__code_bog_smalljs_structure_14 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['step4_code'] >
		,
		ReturnType< $bog_smalljs_structure_step['code'] >
	>
	type $bog_smalljs_structure_step__number_bog_smalljs_structure_15 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_structure_step['number'] >
	>
	type $bog_smalljs_structure_step__text_bog_smalljs_structure_16 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['step5_text'] >
		,
		ReturnType< $bog_smalljs_structure_step['text'] >
	>
	type $bog_smalljs_structure_step__code_bog_smalljs_structure_17 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['step5_code'] >
		,
		ReturnType< $bog_smalljs_structure_step['code'] >
	>
	type $mol_view__sub_bog_smalljs_structure_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_structure_row__prefix_bog_smalljs_structure_19 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['row_prefix'] >
		,
		ReturnType< $bog_smalljs_structure_row['prefix'] >
	>
	type $bog_smalljs_structure_row__name_bog_smalljs_structure_20 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['row_name'] >
		,
		ReturnType< $bog_smalljs_structure_row['name'] >
	>
	type $bog_smalljs_structure_row__pad_bog_smalljs_structure_21 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['row_pad'] >
		,
		ReturnType< $bog_smalljs_structure_row['pad'] >
	>
	type $bog_smalljs_structure_row__comment_bog_smalljs_structure_22 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['row_comment'] >
		,
		ReturnType< $bog_smalljs_structure_row['comment'] >
	>
	type $bog_smalljs_structure_row__note_bog_smalljs_structure_23 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['row_note'] >
		,
		ReturnType< $bog_smalljs_structure_row['note'] >
	>
	type $bog_smalljs_structure_row__kind_bog_smalljs_structure_24 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['row_kind'] >
		,
		ReturnType< $bog_smalljs_structure_row['kind'] >
	>
	type $bog_smalljs_structure_row__active_bog_smalljs_structure_25 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['row_active'] >
		,
		ReturnType< $bog_smalljs_structure_row['active'] >
	>
	type $bog_smalljs_structure_row__pickable_bog_smalljs_structure_26 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['row_pickable'] >
		,
		ReturnType< $bog_smalljs_structure_row['pickable'] >
	>
	type $bog_smalljs_structure_row__pick_bog_smalljs_structure_27 = $mol_type_enforce<
		ReturnType< $bog_smalljs_structure['pick'] >
		,
		ReturnType< $bog_smalljs_structure_row['pick'] >
	>
	export class $bog_smalljs_structure extends $mol_view {
		rows( ): readonly(any)[]
		Tree( ): $mol_view
		Steps_title( ): $mol_view
		Step1( ): $bog_smalljs_structure_step
		Step2( ): $bog_smalljs_structure_step
		Step3( ): $bog_smalljs_structure_step
		Step4( ): $bog_smalljs_structure_step
		Step5( ): $bog_smalljs_structure_step
		Steps( ): $mol_view
		tree( ): string
		active( ): string
		pickable( ): boolean
		plain( ): boolean
		steps_showed( ): boolean
		pick( id: any, next?: any ): any
		file( next?: any ): any
		row_prefix( id: any): string
		row_name( id: any): string
		row_pad( id: any): string
		row_comment( id: any): string
		row_note( id: any): string
		row_kind( id: any): string
		row_active( id: any): boolean
		row_pickable( id: any): boolean
		hint_workspace( ): string
		hint_registry( ): string
		hint_framework( ): string
		hint_package( ): string
		hint_gitattributes( ): string
		hint_registry_own( ): string
		hint_project( ): string
		hint_entry( ): string
		hint_tree( ): string
		hint_ts( ): string
		hint_css( ): string
		hint_submodule( ): string
		steps_title( ): string
		step1_text( ): string
		step1_code( ): string
		step2_text( ): string
		step2_code( ): string
		step3_text( ): string
		step3_code( ): string
		step4_text( ): string
		step4_code( ): string
		step5_text( ): string
		step5_code( ): string
		attr( ): ({ 
			'bog_smalljs_structure_steps': ReturnType< $bog_smalljs_structure['steps_showed'] >,
			'bog_smalljs_structure_plain': ReturnType< $bog_smalljs_structure['plain'] >,
		}) 
		sub( ): readonly(any)[]
		Row( id: any): $bog_smalljs_structure_row
	}
	
}

//# sourceMappingURL=structure.view.tree.d.ts.map
declare namespace $.$$ {
    /** One parsed line of the ASCII tree. */
    type row_data = {
        /** The box-drawing glyphs that indent the line. */
        prefix: string;
        /** File or folder name, a folder keeping its trailing slash. */
        name: string;
        /** Whatever the source line wrote after the name, aligned into a column. */
        comment: string;
        /** Role of the line — picks the hint and the colour. */
        kind: string;
    };
    /**
     * A project layout drawn as the reader would see it in a file manager, with a "?"
     * on every line that explains why the folder is there at all.
     *
     * The tree is not hard-coded: the host passes the same plain ASCII listing that a
     * markdown page would print, and this parses it. That keeps one source of truth per
     * place it is shown — the docs page keeps its listing inside the .md (so the raw
     * .md endpoint still reads correctly), and the playground builds one from the
     * example currently open.
     */
    export class $bog_smalljs_structure extends $.$bog_smalljs_structure {
        /**
         * Parsed lines, keyed by index so a repeated file name (two `index.html`) still
         * gets a view of its own. The key carries the name after the colon, so a host
         * handling a click reads the file name straight off it.
         */
        lines(): readonly row_data[];
        /** Row keys: index for uniqueness, name for whoever handles a click. */
        keys(): readonly string[];
        line(key: string): row_data;
        /** Name of the file or folder a row key points at. */
        static file(key: string): string;
        rows(): $.$bog_smalljs_structure_row[];
        sub(): $mol_view[];
        /**
         * Comments line up in a column the way they do in the source listing: the name
         * is padded to the width of the longest line, in the same monospace font. Doing
         * it here rather than with a grid keeps a row a plain flex line, so the "?" and
         * its explanation can sit inside it.
         */
        width(): number;
        /** A listing with nothing to align needs no column: the "?" follows the name. */
        commented(): boolean;
        row_prefix(key: string): string;
        row_name(key: string): string;
        row_pad(key: string): string;
        row_comment(key: string): string;
        row_kind(key: string): string;
        row_active(key: string): boolean;
        row_pickable(key: string): boolean;
        /**
         * A click on a row leaves as the file name, not as a row key: the host binds a
         * plain `file?` and gets `hello.view.ts`. The key is this component's own
         * business, and a keyed property cannot be bound from outside anyway.
         */
        pick(key: string, next?: any): null;
        /** The "why is this here" text, one per role rather than one per line. */
        row_note(key: string): string;
    }
    export {};
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_play extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=play.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_launch extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=launch.view.tree.d.ts.map
declare namespace $ {

	type $mol_textarea_edit__value_mol_textarea_1 = $mol_type_enforce<
		ReturnType< $mol_textarea['value'] >
		,
		ReturnType< $mol_textarea_edit['value'] >
	>
	type $mol_textarea_edit__hint_mol_textarea_2 = $mol_type_enforce<
		ReturnType< $mol_textarea['hint'] >
		,
		ReturnType< $mol_textarea_edit['hint'] >
	>
	type $mol_textarea_edit__enabled_mol_textarea_3 = $mol_type_enforce<
		ReturnType< $mol_textarea['enabled'] >
		,
		ReturnType< $mol_textarea_edit['enabled'] >
	>
	type $mol_textarea_edit__spellcheck_mol_textarea_4 = $mol_type_enforce<
		ReturnType< $mol_textarea['spellcheck'] >
		,
		ReturnType< $mol_textarea_edit['spellcheck'] >
	>
	type $mol_textarea_edit__length_max_mol_textarea_5 = $mol_type_enforce<
		ReturnType< $mol_textarea['length_max'] >
		,
		ReturnType< $mol_textarea_edit['length_max'] >
	>
	type $mol_textarea_edit__selection_mol_textarea_6 = $mol_type_enforce<
		ReturnType< $mol_textarea['selection'] >
		,
		ReturnType< $mol_textarea_edit['selection'] >
	>
	type $mol_textarea_edit__submit_mol_textarea_7 = $mol_type_enforce<
		ReturnType< $mol_textarea['submit'] >
		,
		ReturnType< $mol_textarea_edit['submit'] >
	>
	type $mol_textarea_edit__submit_with_ctrl_mol_textarea_8 = $mol_type_enforce<
		ReturnType< $mol_textarea['submit_with_ctrl'] >
		,
		ReturnType< $mol_textarea_edit['submit_with_ctrl'] >
	>
	type $mol_text_code__text_mol_textarea_9 = $mol_type_enforce<
		ReturnType< $mol_textarea['value'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__render_visible_only_mol_textarea_10 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code['render_visible_only'] >
	>
	type $mol_text_code__row_numb_mol_textarea_11 = $mol_type_enforce<
		ReturnType< $mol_textarea['row_numb'] >
		,
		ReturnType< $mol_text_code['row_numb'] >
	>
	type $mol_text_code__sidebar_showed_mol_textarea_12 = $mol_type_enforce<
		ReturnType< $mol_textarea['sidebar_showed'] >
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_text_code__highlight_mol_textarea_13 = $mol_type_enforce<
		ReturnType< $mol_textarea['highlight'] >
		,
		ReturnType< $mol_text_code['highlight'] >
	>
	type $mol_text_code__syntax_mol_textarea_14 = $mol_type_enforce<
		ReturnType< $mol_textarea['syntax'] >
		,
		ReturnType< $mol_text_code['syntax'] >
	>
	export class $mol_textarea extends $mol_stack {
		clickable( next?: boolean ): boolean
		sidebar_showed( ): boolean
		press( next?: any ): any
		hover( next?: any ): any
		value( next?: string ): string
		hint( ): string
		enabled( ): boolean
		spellcheck( ): boolean
		length_max( ): number
		selection( next?: readonly(number)[] ): readonly(number)[]
		bring( ): ReturnType< ReturnType< $mol_textarea['Edit'] >['bring'] >
		submit( next?: any ): any
		submit_with_ctrl( ): boolean
		Edit( ): $mol_textarea_edit
		row_numb( id: any): number
		highlight( ): string
		syntax( ): $mol_syntax2
		View( ): $mol_text_code
		attr( ): ({ 
			'mol_textarea_clickable': ReturnType< $mol_textarea['clickable'] >,
			'mol_textarea_sidebar_showed': ReturnType< $mol_textarea['sidebar_showed'] >,
		})  & ReturnType< $mol_stack['attr'] >
		event( ): ({ 
			keydown( next?: ReturnType< $mol_textarea['press'] > ): ReturnType< $mol_textarea['press'] >,
			pointermove( next?: ReturnType< $mol_textarea['hover'] > ): ReturnType< $mol_textarea['hover'] >,
		}) 
		sub( ): readonly(any)[]
		symbols_alt( ): Record<string, string>
		symbols_alt_ctrl( ): Record<string, string>
		symbols_alt_shift( ): Record<string, string>
	}
	
	export class $mol_textarea_edit extends $mol_string {
		dom_name( ): string
		enter( ): string
		field( ): ({ 
			'scrollTop': number,
		})  & ReturnType< $mol_string['field'] >
	}
	
}

//# sourceMappingURL=textarea.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * An input field for entering multiline text.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    class $mol_textarea extends $.$mol_textarea {
        indent_inc(): void;
        indent_dec(): void;
        symbol_insert(event: KeyboardEvent): void;
        clickable(next?: boolean): boolean;
        hover(event: PointerEvent): void;
        press(event: KeyboardEvent): void;
        row_numb(index: number): number;
        syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_tick extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=tick.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	export class $mol_check_box extends $mol_check {
		Icon( ): $mol_icon_tick
	}
	
}

//# sourceMappingURL=box.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	export class $mol_check_icon extends $mol_check {
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_calendar extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=calendar.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_calendar_today extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=today.view.tree.d.ts.map
declare namespace $ {

	export class $mol_format extends $mol_string {
		mask( id: any): string
		allow( ): string
		hint( ): ReturnType< $mol_format['mask'] >
		keyboard( ): string
	}
	
}

//# sourceMappingURL=format.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Formatted string input/output
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_format_demo
     */
    class $mol_format extends $.$mol_format {
        selection([from, to]?: [number, number]): number[];
        value_changed(next?: string): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_trash_can extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=can.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_trash_can_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_double_left extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=left.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_double_right extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=right.view.tree.d.ts.map
declare namespace $ {
    class $mol_time_base {
        static patterns: Record<string, (arg: any) => string>;
        static formatter(pattern: string): (arg: any, lang?: string) => string;
        toString(pattern: string, lang?: string): string;
    }
}

declare namespace $ {
    type $mol_time_duration_config = number | string | readonly [number, number, number, number, number, number] | {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        minute?: number;
        second?: number;
    };
    /**
     * Small, simple, powerful, and fast TypeScript/JavaScript library for proper date/time/duration/interval arithmetic.
     *
     * Immutable iso8601 time duration representation.
     * @see http://localhost:9080/mol/app/docs/-/test.html#!demo=mol_time_demo
     */
    class $mol_time_duration extends $mol_time_base {
        constructor(config?: $mol_time_duration_config);
        readonly year: number;
        readonly month: number;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        get normal(): $mol_time_duration;
        summ(config: $mol_time_duration_config): $mol_time_duration;
        mult(numb: number): $mol_time_duration;
        count(config: $mol_time_duration_config): number;
        valueOf(): number;
        toJSON(): string;
        toString(pattern?: string): string;
        toArray(): readonly [number, number, number, number, number, number];
        [Symbol.toPrimitive](mode: 'default' | 'number' | 'string'): string | number;
        static patterns: {
            '#Y': (duration: $mol_time_duration) => string;
            '#M': (duration: $mol_time_duration) => string;
            '#D': (duration: $mol_time_duration) => string;
            '#h': (duration: $mol_time_duration) => string;
            '#m': (duration: $mol_time_duration) => string;
            '#s': (duration: $mol_time_duration) => string;
            hh: (moment: $mol_time_moment) => string;
            h: (moment: $mol_time_moment) => string;
            ':mm': (moment: $mol_time_moment) => string;
            mm: (moment: $mol_time_moment) => string;
            m: (moment: $mol_time_moment) => string;
            ':ss': (moment: $mol_time_moment) => string;
            ss: (moment: $mol_time_moment) => string;
            s: (moment: $mol_time_moment) => string;
            '.sss': (moment: $mol_time_moment) => string;
            sss: (moment: $mol_time_moment) => string;
        };
    }
}

declare namespace $ {
    enum $mol_time_moment_weekdays {
        monday = 0,
        tuesday = 1,
        wednesday = 2,
        thursday = 3,
        friday = 4,
        saturday = 5,
        sunday = 6
    }
    type $mol_time_moment_config = number | Date | string | readonly (number | undefined)[] | {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        minute?: number;
        second?: number;
        offset?: $mol_time_duration_config;
    };
    /**
     * Small, simple, powerful, and fast TypeScript/JavaScript library for proper date/time/duration/interval arithmetic.
     *
     * Immutable iso8601 time moment representation.
     * @see http://localhost:9080/mol/app/docs/-/test.html#!demo=mol_time_demo
     */
    class $mol_time_moment extends $mol_time_base {
        constructor(config?: $mol_time_moment_config);
        readonly year: number | undefined;
        readonly month: number | undefined;
        readonly day: number | undefined;
        readonly hour: number | undefined;
        readonly minute: number | undefined;
        readonly second: number | undefined;
        readonly offset: $mol_time_duration | undefined;
        get weekday(): number;
        _native: Date | undefined;
        get native(): Date;
        _normal: $mol_time_moment | undefined;
        get normal(): $mol_time_moment;
        merge(config: $mol_time_moment_config): $mol_time_moment;
        shift(config: $mol_time_duration_config): $mol_time_moment;
        mask(config: $mol_time_moment_config): $mol_time_moment;
        toOffset(config?: $mol_time_duration_config): $mol_time_moment;
        valueOf(): number;
        toJSON(): string;
        toString(pattern?: string, lang?: string): string;
        toArray(): readonly [number | undefined, number | undefined, number | undefined, number | undefined, number | undefined, number | undefined, number | undefined];
        [Symbol.toPrimitive](mode: 'default' | 'number' | 'string'): string | number;
        [$mol_dev_format_head](): any[];
        protected static formatters: Record<string, Record<string, Intl.DateTimeFormat>>;
        static intl(lang: string | undefined, pattern: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat;
        static patterns: {
            YYYY: (moment: $mol_time_moment) => string;
            AD: (moment: $mol_time_moment) => string;
            YY: (moment: $mol_time_moment) => string;
            Month: (moment: $mol_time_moment, lang?: string) => string;
            'DD Month': (moment: $mol_time_moment, lang?: string) => string;
            'D Month': (moment: $mol_time_moment, lang?: string) => string;
            Mon: (moment: $mol_time_moment, lang?: string) => string;
            'DD Mon': (moment: $mol_time_moment, lang?: string) => string;
            'D Mon': (moment: $mol_time_moment, lang?: string) => string;
            '-MM': (moment: $mol_time_moment) => string;
            MM: (moment: $mol_time_moment) => string;
            M: (moment: $mol_time_moment) => string;
            WeekDay: (moment: $mol_time_moment, lang?: string) => string;
            WD: (moment: $mol_time_moment, lang?: string) => string;
            '-DD': (moment: $mol_time_moment) => string;
            DD: (moment: $mol_time_moment) => string;
            D: (moment: $mol_time_moment) => string;
            Thh: (moment: $mol_time_moment) => string;
            hh: (moment: $mol_time_moment) => string;
            h: (moment: $mol_time_moment) => string;
            ':mm': (moment: $mol_time_moment) => string;
            mm: (moment: $mol_time_moment) => string;
            m: (moment: $mol_time_moment) => string;
            ':ss': (moment: $mol_time_moment) => string;
            ss: (moment: $mol_time_moment) => string;
            s: (moment: $mol_time_moment) => string;
            '.sss': (moment: $mol_time_moment) => string;
            sss: (moment: $mol_time_moment) => string;
            Z: (moment: $mol_time_moment) => string;
        };
    }
}

declare namespace $ {

	export class $mol_hor extends $mol_view {
	}
	
}

//# sourceMappingURL=hor.view.tree.d.ts.map
declare namespace $.$$ {
    /** Horizontal list of blocks. */
    class $mol_hor extends $.$mol_hor {
        minimal_width(): number;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_view__minimal_height_mol_calendar_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_mol_calendar_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_calendar_3 = $mol_type_enforce<
		ReturnType< $mol_calendar['head'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_hor__sub_mol_calendar_4 = $mol_type_enforce<
		ReturnType< $mol_calendar['weekdays'] >
		,
		ReturnType< $mol_hor['sub'] >
	>
	type $mol_calendar_day__holiday_mol_calendar_5 = $mol_type_enforce<
		ReturnType< $mol_calendar['weekend'] >
		,
		ReturnType< $mol_calendar_day['holiday'] >
	>
	type $mol_calendar_day__sub_mol_calendar_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_calendar_day['sub'] >
	>
	type $mol_hor__sub_mol_calendar_7 = $mol_type_enforce<
		ReturnType< $mol_calendar['week_days'] >
		,
		ReturnType< $mol_hor['sub'] >
	>
	type $mol_calendar_day__ghost_mol_calendar_8 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_ghost'] >
		,
		ReturnType< $mol_calendar_day['ghost'] >
	>
	type $mol_calendar_day__holiday_mol_calendar_9 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_holiday'] >
		,
		ReturnType< $mol_calendar_day['holiday'] >
	>
	type $mol_calendar_day__selected_mol_calendar_10 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_selected'] >
		,
		ReturnType< $mol_calendar_day['selected'] >
	>
	type $mol_calendar_day__today_mol_calendar_11 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_today'] >
		,
		ReturnType< $mol_calendar_day['today'] >
	>
	type $mol_calendar_day__theme_mol_calendar_12 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_theme'] >
		,
		ReturnType< $mol_calendar_day['theme'] >
	>
	type $mol_calendar_day__sub_mol_calendar_13 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_content'] >
		,
		ReturnType< $mol_calendar_day['sub'] >
	>
	export class $mol_calendar extends $mol_list {
		title( ): string
		Title( ): $mol_view
		head( ): readonly(any)[]
		Head( ): $mol_view
		weekdays( ): readonly($mol_view)[]
		Weekdays( ): $mol_hor
		weekend( id: any): boolean
		weekday( id: any): string
		week_days( id: any): readonly($mol_view)[]
		day_ghost( id: any): boolean
		day_holiday( id: any): boolean
		day_selected( id: any): boolean
		day_today( id: any): boolean
		day_theme( id: any): any
		day_text( id: any): string
		day_content( id: any): readonly(any)[]
		sub( ): readonly(any)[]
		weeks( ): readonly($mol_view)[]
		weeks_count( ): number
		Weekday( id: any): $mol_calendar_day
		Week( id: any): $mol_hor
		Day( id: any): $mol_calendar_day
		month_string( ): string
		month_moment( ): $mol_time_moment
	}
	
	export class $mol_calendar_day extends $mol_view {
		holiday( ): boolean
		ghost( ): boolean
		selected( ): boolean
		today( ): boolean
		theme( ): any
		minimal_height( ): number
		minimal_width( ): number
		attr( ): ({ 
			'mol_calendar_holiday': ReturnType< $mol_calendar_day['holiday'] >,
			'mol_calendar_ghost': ReturnType< $mol_calendar_day['ghost'] >,
			'mol_calendar_selected': ReturnType< $mol_calendar_day['selected'] >,
			'mol_calendar_today': ReturnType< $mol_calendar_day['today'] >,
			'mol_theme': ReturnType< $mol_calendar_day['theme'] >,
		}) 
	}
	
}

//# sourceMappingURL=calendar.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Draws all days of month as table.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_calendar_demo_holiday
     */
    class $mol_calendar extends $.$mol_calendar {
        month_moment(): $mol_time_moment;
        lang(): string;
        title(): string;
        day_first(): $mol_time_moment;
        day_last(): $mol_time_moment;
        day_draw_from(): $mol_time_moment;
        weekdays(): $mol_view[];
        weekday(index: number): string;
        weekend(index: number): boolean;
        sub(): any[];
        weeks(): $mol_view[];
        week_days(index: number): $mol_view[];
        day_text(day: string): string;
        day_holiday(day: string): boolean;
        today(): $mol_time_moment;
        day_today(day: string): boolean;
        day_ghost(day: string): boolean;
        day_theme(day: string): any;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_button_minor__hint_mol_date_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_mol_date_2 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click_mol_date_3 = $mol_type_enforce<
		ReturnType< $mol_date['today_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type __mol_date_5 = $mol_type_enforce<
		Parameters< $mol_date['value_changed'] >[0]
		,
		Parameters< ReturnType< $mol_date['Input'] >['value_changed'] >[0]
	>
	type $mol_format__value_mol_date_6 = $mol_type_enforce<
		ReturnType< $mol_date['value'] >
		,
		ReturnType< $mol_format['value'] >
	>
	type $mol_format__mask_mol_date_7 = $mol_type_enforce<
		ReturnType< $mol_date['input_mask'] >
		,
		ReturnType< $mol_format['mask'] >
	>
	type $mol_format__enabled_mol_date_8 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_format['enabled'] >
	>
	type $mol_button_minor__hint_mol_date_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_mol_date_10 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click_mol_date_11 = $mol_type_enforce<
		ReturnType< $mol_date['clear'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_mol_date_13 = $mol_type_enforce<
		ReturnType< $mol_date['input_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__hint_mol_date_14 = $mol_type_enforce<
		ReturnType< $mol_date['year_prev_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_mol_date_15 = $mol_type_enforce<
		ReturnType< $mol_date['year_prev'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint_mol_date_17 = $mol_type_enforce<
		ReturnType< $mol_date['prev_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_mol_date_18 = $mol_type_enforce<
		ReturnType< $mol_date['prev'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint_mol_date_20 = $mol_type_enforce<
		ReturnType< $mol_date['next_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_mol_date_21 = $mol_type_enforce<
		ReturnType< $mol_date['next'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint_mol_date_23 = $mol_type_enforce<
		ReturnType< $mol_date['year_next_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_mol_date_24 = $mol_type_enforce<
		ReturnType< $mol_date['year_next'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_mol_date_26 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_date_calendar__enabled_mol_date_27 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_date_calendar['enabled'] >
	>
	type $mol_date_calendar__month_moment_mol_date_28 = $mol_type_enforce<
		ReturnType< $mol_date['month_moment'] >
		,
		ReturnType< $mol_date_calendar['month_moment'] >
	>
	type $mol_date_calendar__day_selected_mol_date_29 = $mol_type_enforce<
		ReturnType< $mol_date['day_selected'] >
		,
		ReturnType< $mol_date_calendar['day_selected'] >
	>
	type $mol_date_calendar__day_click_mol_date_30 = $mol_type_enforce<
		ReturnType< $mol_date['day_click'] >
		,
		ReturnType< $mol_date_calendar['day_click'] >
	>
	type $mol_date_calendar__head_mol_date_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_date_calendar['head'] >
	>
	export class $mol_date extends $mol_pick {
		enabled( ): boolean
		today_click( next?: any ): any
		Today_icon( ): $mol_icon_calendar_today
		Today( ): $mol_button_minor
		value( next?: string ): string
		value_changed( next?: ReturnType< ReturnType< $mol_date['Input'] >['value_changed'] > ): ReturnType< ReturnType< $mol_date['Input'] >['value_changed'] >
		input_mask( id: any): string
		Input( ): $mol_format
		clear( next?: any ): any
		Clear_icon( ): $mol_icon_trash_can_outline
		Clear( ): $mol_button_minor
		input_content( ): readonly(any)[]
		Input_row( ): $mol_view
		month_moment( ): ReturnType< $mol_date['value_moment'] >
		day_selected( id: any): boolean
		day_click( id: any, next?: any ): any
		Calendar_title( ): ReturnType< ReturnType< $mol_date['Calendar'] >['Title'] >
		year_prev_hint( ): string
		year_prev( next?: any ): any
		Year_prev_icon( ): $mol_icon_chevron_double_left
		Year_prev( ): $mol_button_minor
		month_prev_hint( ): string
		prev_hint( ): ReturnType< $mol_date['month_prev_hint'] >
		month_prev( next?: any ): any
		prev( next?: ReturnType< $mol_date['month_prev'] > ): ReturnType< $mol_date['month_prev'] >
		Month_prev_icon( ): $mol_icon_chevron_left
		Prev_icon( ): ReturnType< $mol_date['Month_prev_icon'] >
		Month_prev( ): $mol_button_minor
		Prev( ): ReturnType< $mol_date['Month_prev'] >
		month_next_hint( ): string
		next_hint( ): ReturnType< $mol_date['month_next_hint'] >
		month_next( next?: any ): any
		next( next?: ReturnType< $mol_date['month_next'] > ): ReturnType< $mol_date['month_next'] >
		Month_next_icon( ): $mol_icon_chevron_right
		Next_icon( ): ReturnType< $mol_date['Month_next_icon'] >
		Month_next( ): $mol_button_minor
		Next( ): ReturnType< $mol_date['Month_next'] >
		year_next_hint( ): string
		year_next( next?: any ): any
		Year_next_icon( ): $mol_icon_chevron_double_right
		Year_next( ): $mol_button_minor
		Calendar_tools( ): $mol_view
		Calendar( ): $mol_date_calendar
		Icon( ): $mol_icon_calendar
		bubble_content( ): readonly(any)[]
		value_number( next?: number ): number
		value_moment( next?: $mol_time_moment ): $mol_time_moment
	}
	
	type $mol_button_minor__title_mol_date_calendar_1 = $mol_type_enforce<
		ReturnType< $mol_date_calendar['day_text'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__event_click_mol_date_calendar_2 = $mol_type_enforce<
		ReturnType< $mol_date_calendar['day_click'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__minimal_height_mol_date_calendar_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_button_minor['minimal_height'] >
	>
	type $mol_button_minor__enabled_mol_date_calendar_4 = $mol_type_enforce<
		ReturnType< $mol_date_calendar['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	export class $mol_date_calendar extends $mol_calendar {
		day_click( id: any, next?: any ): any
		enabled( ): boolean
		Day_button( id: any): $mol_button_minor
		day_content( id: any): readonly(any)[]
	}
	
}

//# sourceMappingURL=date.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Date presenter and picker.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_date_demo
     */
    class $mol_date extends $.$mol_date {
        trigger_content(): (string | $mol_icon_calendar)[];
        input_mask(val: string): "____-__-__ __:__" | "____-__-__ ";
        input_content(): ($mol_button_minor | $.$mol_format)[];
        value(val?: string): string;
        value_moment(next?: $mol_time_moment): $mol_time_moment;
        value_number(next?: number): number;
        value_moment_today(): $mol_time_moment;
        clear(): void;
        month_moment(next?: $mol_time_moment): $mol_time_moment;
        day_selected(day: string): boolean;
        day_click(day: string): void;
        month_prev(): void;
        month_next(): void;
        year_prev(): void;
        year_next(): void;
        today_click(): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    function $mol_range_in<Item>(source: {
        item: (id: number) => Item;
        length: number;
    }): Item[];
    class $mol_range_common<Value> {
        item(id: number): Value;
        get length(): number;
        get '0'(): Value;
        forEach(handle: (value?: Value, id?: number) => void): void;
        valueOf(): Value[];
        concat(...args: any[]): Value[];
        slice(start?: number, end?: number): $mol_range_lazy<Value>;
        map<ResValue>(proceed: (val: Value, id?: number) => ResValue): $mol_range_lazy<ResValue>;
        join(delim?: string): string;
        every(check: (value: Value, id: number) => boolean): boolean;
        some(check: (value: Value, id: number) => boolean): boolean;
    }
    class $mol_range_lazy<Value> extends $mol_range_common<Value> {
        private source;
        constructor(source?: {
            item(id: number): Value;
            length: number;
        });
        item(id: number): Value;
        get length(): number;
    }
}

declare namespace $ {

	export class $mol_icon_eye extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=eye.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__type_mol_password_1 = $mol_type_enforce<
		ReturnType< $mol_password['type'] >
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_string__hint_mol_password_2 = $mol_type_enforce<
		ReturnType< $mol_password['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_password_3 = $mol_type_enforce<
		ReturnType< $mol_password['value'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__submit_mol_password_4 = $mol_type_enforce<
		ReturnType< $mol_password['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_string__enabled_mol_password_5 = $mol_type_enforce<
		ReturnType< $mol_password['enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_check_icon__checked_mol_password_6 = $mol_type_enforce<
		ReturnType< $mol_password['checked'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon_mol_password_7 = $mol_type_enforce<
		ReturnType< $mol_password['Show_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	export class $mol_password extends $mol_view {
		hint( ): string
		value( next?: string ): string
		submit( next?: any ): any
		enabled( ): boolean
		Pass( ): $mol_string
		checked( next?: boolean ): boolean
		Show_icon( ): $mol_icon_eye
		Show( ): $mol_check_icon
		content( ): readonly(any)[]
		type( next?: string ): string
		sub( ): ReturnType< $mol_password['content'] >
	}
	
}

//# sourceMappingURL=password.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Password input field
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_password_demo
     */
    class $mol_password extends $.$mol_password {
        checked(next?: boolean): boolean;
    }
}

declare namespace $ {

	export class $mol_icon_view_agenda extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=agenda.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_share extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=share.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_share_variant extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=variant.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_share_variant_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_restore extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=restore.view.tree.d.ts.map
declare namespace $ {
    /** Position in any resource. */
    class $mol_span extends $mol_object2 {
        readonly uri: string;
        readonly source: string;
        readonly row: number;
        readonly col: number;
        readonly length: number;
        constructor(uri: string, source: string, row: number, col: number, length: number);
        /** Span for begin of unknown resource */
        static unknown: $mol_span;
        /** Makes new span for begin of resource. */
        static begin(uri: string, source?: string): $mol_span;
        /** Makes new span for end of resource. */
        static end(uri: string, source: string): $mol_span;
        /** Makes new span for entire resource. */
        static entire(uri: string, source: string): $mol_span;
        toString(): string;
        toJSON(): {
            uri: string;
            row: number;
            col: number;
            length: number;
        };
        /** Makes new error for this span. */
        error(message: string, Class?: ErrorConstructor): Error;
        /** Makes new span for same uri. */
        span(row: number, col: number, length: number): $mol_span;
        /** Makes new span after end of this. */
        after(length?: number): $mol_span;
        /** Makes new span between begin and end. */
        slice(begin: number, end?: number): $mol_span;
    }
}

declare namespace $ {
    /** Syntax error with cordinates and source line snippet. */
    class $mol_error_syntax extends SyntaxError {
        reason: string;
        line: string;
        span: $mol_span;
        constructor(reason: string, line: string, span: $mol_span);
    }
}

declare namespace $ {
    /** Parses tree format from string. */
    function $mol_tree2_from_string(this: $, str: string, uri?: string): $mol_tree2;
}

declare namespace $ {
    /** Serializes tree to string in tree format. */
    function $mol_tree2_to_string(this: $, tree: $mol_tree2): string;
}

declare namespace $ {
    /** Path by types in tree. */
    type $mol_tree2_path = Array<string | number | null>;
    /** Hask tool for processing node. */
    type $mol_tree2_hack<Context> = (input: $mol_tree2, belt: $mol_tree2_belt<Context>, context: Context) => readonly $mol_tree2[];
    /** Collection of hask tools for processing tree. */
    type $mol_tree2_belt<Context> = Record<string, $mol_tree2_hack<Context>>;
    /**
     * Abstract Syntax Tree with human readable serialization.
     * Avoid direct instantiation. Use static factories instead.
     * @see https://github.com/nin-jin/tree.d
     */
    class $mol_tree2 extends Object {
        /** Type of structural node, `value` should be empty */
        readonly type: string;
        /** Content of data node, `type` should be empty */
        readonly value: string;
        /** Child nodes */
        readonly kids: readonly $mol_tree2[];
        /** Position in most far source resource */
        readonly span: $mol_span;
        constructor(
        /** Type of structural node, `value` should be empty */
        type: string, 
        /** Content of data node, `type` should be empty */
        value: string, 
        /** Child nodes */
        kids: readonly $mol_tree2[], 
        /** Position in most far source resource */
        span: $mol_span);
        /** Makes collection node. */
        static list(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Makes new derived collection node. */
        list(kids: readonly $mol_tree2[]): $mol_tree2;
        /** Makes data node for any string. */
        static data(value: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Makes new derived data node. */
        data(value: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        /** Makes struct node. */
        static struct(type: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Makes new derived structural node. */
        struct(type: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        /** Makes new derived node with different kids id defined. */
        clone(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Returns multiline text content. */
        text(): string;
        /** Parses tree format. */
        /** @deprecated Use $mol_tree2_from_string */
        static fromString(str: string, uri?: string): $mol_tree2;
        /** Serializes to tree format. */
        toString(): string;
        /** Makes new tree with node overrided by path. */
        insert(value: $mol_tree2 | null, ...path: $mol_tree2_path): $mol_tree2;
        /** Makes new tree with node overrided by path. */
        update(value: readonly $mol_tree2[], ...path: $mol_tree2_path): readonly $mol_tree2[];
        /** Query nodes by path. */
        select(...path: $mol_tree2_path): $mol_tree2;
        /** Filter kids by path or value. */
        filter(path: string[], value?: string): $mol_tree2;
        hack_self<Context extends {
            span?: $mol_span;
            [key: string]: unknown;
        } = {}>(belt: $mol_tree2_belt<Context>, context?: Context): readonly $mol_tree2[];
        /** Transform tree through context with transformers */
        hack<Context extends {
            span?: $mol_span;
            [key: string]: unknown;
        } = {}>(belt: $mol_tree2_belt<Context>, context?: Context): $mol_tree2[];
        /** Makes Error with node coordinates. */
        error(message: string, Class?: ErrorConstructor): Error;
    }
    class $mol_tree2_empty extends $mol_tree2 {
        constructor();
    }
}

declare namespace $ {
    class $mol_view_tree2_error extends Error {
        readonly spans: readonly $mol_span[];
        constructor(message: string, spans: readonly $mol_span[]);
        toJSON(): {
            message: string;
            spans: readonly $mol_span[];
        };
    }
    class $mol_view_tree2_error_suggestions {
        readonly suggestions: readonly string[];
        constructor(suggestions: readonly string[]);
        toString(): string;
        toJSON(): readonly string[];
    }
    function $mol_view_tree2_error_str(strings: readonly string[], ...parts: readonly ($mol_span | readonly $mol_span[] | string | number | $mol_view_tree2_error_suggestions)[]): $mol_view_tree2_error;
}

declare namespace $ {
    function $mol_view_tree2_child(this: $, tree: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_classes(defs: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_normalize(this: $, defs: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    let $mol_view_tree2_prop_signature: $mol_regexp<{
        readonly name: string;
        readonly key: string;
        readonly next: string;
    }>;
}

declare namespace $ {
    function $mol_view_tree2_prop_parts(this: $, prop: $mol_tree2): {
        name: string;
        key: string;
        next: string;
    };
}

declare namespace $ {
    function $mol_view_tree2_prop_quote(name: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_class_match(klass?: $mol_tree2): boolean;
}

declare namespace $ {
    function $mol_view_tree2_class_super(this: $, klass: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_class_props(this: $, klass: $mol_tree2): $mol_tree2[];
}

declare namespace $ {
    function $mol_tree2_js_is_number(type: string): boolean | RegExpMatchArray;
}

declare namespace $ {
    function $mol_view_tree2_to_js(this: $, descr: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    /** Dynamic sources import. */
    class $mol_import extends $mol_object2 {
        static module(uri: string): any;
        static module_async(uri: string): Promise<any>;
        static script(uri: string): any;
        static script_async(uri: string): Promise<any>;
        static style(uri: string): any;
        static style_async(uri: string): any;
    }
}

declare namespace $ {
    function $mol_tree2_text_to_string(this: $, text: $mol_tree2): string;
}

declare namespace $ {
    function $mol_vlq_encode(val: number): string;
}

declare namespace $ {
    type $mol_sourcemap_segment = [number] | [number, number, number, number] | [number, number, number, number, number];
    type $mol_sourcemap_line = $mol_sourcemap_segment[];
    type $mol_sourcemap_mappings = $mol_sourcemap_line[];
    interface $mol_sourcemap_raw {
        version: number;
        sources: string[];
        names?: string[];
        sourceRoot?: string;
        sourcesContent?: (string | null)[];
        mappings: string | $mol_sourcemap_line[];
        file?: string;
    }
}

declare namespace $ {
    function $mol_tree2_text_to_sourcemap(this: $, tree: $mol_tree2): $mol_sourcemap_raw;
}

declare namespace $ {
    function $mol_sourcemap_url(this: $, uri: string, type?: "js" | "css"): string;
}

declare namespace $ {
    function $mol_sourcemap_dataurl_decode(this: $, data: string): $mol_sourcemap_raw | undefined;
    function $mol_sourcemap_dataurl_encode(this: $, map: $mol_sourcemap_raw, type?: "js" | "css"): string;
}

declare namespace $ {
    function $mol_tree2_text_to_string_mapped(this: $, text: $mol_tree2, type: 'js' | 'css'): string;
    function $mol_tree2_text_to_string_mapped_js(this: $, text: $mol_tree2): string;
    function $mol_tree2_text_to_string_mapped_css(this: $, text: $mol_tree2): string;
}

declare namespace $ {
    function $mol_tree2_js_to_text(this: $, js: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    type $bog_smalljs_playground_log_entry = {
        level: 'log' | 'info' | 'warn' | 'error';
        text: string;
    };
    /**
     * Журнал песочницы: вывод примера и необработанные ошибки.
     *
     * Перехват глобальный, потому что превью живёт в том же документе, что и сайт,
     * и отделить его вывод было бы гаданием по стеку. Это допустимо по измерению:
     * за полный цикл работы песочницы — загрузка, переключение примеров, сбросы —
     * сам сайт не пишет в консоль ничего, так что в журнале оказывается только
     * то, что напечатал пример. Если сайт когда-нибудь станет разговорчивым,
     * это перестанет быть правдой и журнал придётся уводить в iframe.
     */
    class $bog_smalljs_playground_log extends $mol_object {
        static limit: number;
        static entries: $bog_smalljs_playground_log_entry[];
        static installed: boolean;
        /** Отложенный сигнал о новых записях; держим ссылку, чтобы его не убрали. */
        static ticket: unknown;
        static version(next?: number): number;
        static one(arg: unknown): string;
        static text(args: unknown[]): string;
        static push(level: $bog_smalljs_playground_log_entry['level'], args: unknown[]): void;
        static clear(): void;
        static install(): void;
    }
}

declare namespace $ {
    /**
     * Готовые примеры для песочницы.
     *
     * Пишутся так, как пишут настоящий $mol: подписи — локализуемыми строками
     * `@ \текст`, поля — готовыми компонентами вместо самодельных, тело метода —
     * с новой строки, а не в одну с сигнатурой. Пример учит не только тому, что
     * в нём написано, но и тому, как это принято писать.
     *
     * Компоненты, на которые они ссылаются, обязаны быть в бандле: код примера
     * компилируется в браузере и обращается к настоящим классам. В коде примеров
     * `$` собирается через String.fromCharCode, чтобы не попадать в разбор
     * зависимостей, поэтому перечисляем нужное здесь — в TS только `/** *\/`
     * тащит модули в граф:
     * $mol_view $mol_string $mol_password $mol_button_major $mol_button_minor
     * $mol_row $mol_link $mol_check $mol_fetch $mol_state_arg $mol_state_local
     * $mol_gap
     */
    type $bog_smalljs_playground_sample = {
        /** Корневой компонент примера — по нему видно, что редактор всё ещё на нём. */
        root: string;
        tree: string;
        ts: string;
        css: string;
    };
    const $bog_smalljs_playground_samples: Record<string, $bog_smalljs_playground_sample>;
    /** Порядок в выпадашке. */
    const $bog_smalljs_playground_sample_ids: string[];
}

declare namespace $ {

	type $mol_view__sub_bog_smalljs_playground_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_structure__tree_bog_smalljs_playground_2 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['files_tree'] >
		,
		ReturnType< $bog_smalljs_structure['tree'] >
	>
	type $bog_smalljs_structure__active_bog_smalljs_playground_3 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['active_file'] >
		,
		ReturnType< $bog_smalljs_structure['active'] >
	>
	type $bog_smalljs_structure__pickable_bog_smalljs_playground_4 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_structure['pickable'] >
	>
	type $bog_smalljs_structure__plain_bog_smalljs_playground_5 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_structure['plain'] >
	>
	type $bog_smalljs_structure__file_bog_smalljs_playground_6 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['file_pick'] >
		,
		ReturnType< $bog_smalljs_structure['file'] >
	>
	type $mol_view__sub_bog_smalljs_playground_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_smalljs_playground_9 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['show_tree'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_playground_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_smalljs_playground_11 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['show_ts'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_playground_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_smalljs_playground_13 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['show_css'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_playground_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_16 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['sample_options'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_pick__hint_bog_smalljs_playground_17 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['samples_hint'] >
		,
		ReturnType< $mol_pick['hint'] >
	>
	type $mol_pick__align_bog_smalljs_playground_18 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['align'] >
	>
	type $mol_pick__trigger_content_bog_smalljs_playground_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content_bog_smalljs_playground_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_button_minor__hint_bog_smalljs_playground_21 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['layout_title'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_smalljs_playground_22 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['layout_toggle'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_playground_23 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__hint_bog_smalljs_playground_25 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['share_title'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_smalljs_playground_26 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['share'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_playground_27 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['share_content'] >
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint_bog_smalljs_playground_28 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['reset_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_smalljs_playground_29 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['reset'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_playground_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_31 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['tabs_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_textarea__value_bog_smalljs_playground_33 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['draft'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_textarea__hint_bog_smalljs_playground_34 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['editor_hint'] >
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_view__sub_bog_smalljs_playground_35 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_textarea__value_bog_smalljs_playground_36 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['ts_draft'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_textarea__hint_bog_smalljs_playground_37 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['editor_hint_ts'] >
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_view__sub_bog_smalljs_playground_38 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_textarea__value_bog_smalljs_playground_39 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['css_draft'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_textarea__hint_bog_smalljs_playground_40 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['editor_hint_css'] >
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_view__sub_bog_smalljs_playground_41 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_42 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_smalljs_playground_43 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['log_toggle'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_playground_44 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_45 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_46 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['preview_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_47 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__hint_bog_smalljs_playground_48 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['log_clear_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_smalljs_playground_49 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['log_clear'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_playground_50 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_51 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_52 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['log_rows'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__attr_bog_smalljs_playground_53 = $mol_type_enforce<
		({ 
			'bog_smalljs_pg_log_shown': ReturnType< $bog_smalljs_playground['log_shown'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_bog_smalljs_playground_54 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_playground_55 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_smalljs_playground_56 = $mol_type_enforce<
		ReturnType< $bog_smalljs_playground['sample_pick'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_playground_57 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__attr_bog_smalljs_playground_58 = $mol_type_enforce<
		({ 
			'bog_smalljs_pg_level': ReturnType< $bog_smalljs_playground['log_level'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_bog_smalljs_playground_59 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_playground extends $mol_view {
		Files_label( ): $mol_view
		Files_tree( ): $bog_smalljs_structure
		Files_note( ): $mol_view
		Files( ): $mol_view
		show_tree( next?: any ): any
		tree_tab_label( ): string
		Tree_tab( ): $mol_button_minor
		show_ts( next?: any ): any
		ts_tab_label( ): string
		Ts_tab( ): $mol_button_minor
		show_css( next?: any ): any
		css_tab_label( ): string
		Css_tab( ): $mol_button_minor
		Tabs_gap( ): $mol_view
		samples_hint( ): string
		samples_label( ): string
		Samples_label( ): $mol_view
		Samples_chevron( ): $mol_icon_chevron_down
		sample_options( ): readonly(any)[]
		Samples_menu( ): $mol_view
		Samples( ): $mol_pick
		layout_title( ): string
		layout_toggle( next?: any ): any
		Layout_icon( ): $mol_icon_view_agenda
		Layout_toggle( ): $mol_button_minor
		share_title( ): string
		share( next?: any ): any
		Share_icon( ): $mol_icon_share_variant_outline
		Share_done_icon( ): $mol_icon_check
		share_done_label( ): string
		Share_done_label( ): $mol_view
		share_content( ): readonly(any)[]
		Share( ): $mol_button_minor
		reset_hint( ): string
		reset( next?: any ): any
		Reset_icon( ): $mol_icon_restore
		Reset( ): $mol_button_minor
		tabs_content( ): readonly(any)[]
		Tabs( ): $mol_view
		Editor_tree_label( ): $mol_view
		Editor( ): $mol_textarea
		Editor_ts_label( ): $mol_view
		editor_hint_ts( ): string
		Editor_ts( ): $mol_textarea
		Editor_css_label( ): $mol_view
		editor_hint_css( ): string
		Editor_css( ): $mol_textarea
		Editors( ): $mol_view
		Editor_pane( ): $mol_view
		preview_label_text( ): string
		Preview_gap( ): $mol_view
		log_toggle( next?: any ): any
		log_toggle_label( ): string
		Log_toggle( ): $mol_button_minor
		Preview_label( ): $mol_view
		preview_content( ): readonly(any)[]
		Preview( ): $mol_view
		log_shown( ): boolean
		log_title_text( ): string
		Log_title( ): $mol_view
		Log_gap( ): $mol_view
		log_clear_hint( ): string
		log_clear( next?: any ): any
		Log_clear( ): $mol_button_minor
		Log_head( ): $mol_view
		log_rows( ): readonly(any)[]
		Log_list( ): $mol_view
		Log( ): $mol_view
		Preview_pane( ): $mol_view
		tab( ): string
		draft( next?: string ): string
		ts_draft( next?: string ): string
		css_draft( next?: string ): string
		editor_hint( ): string
		seed_tree( ): string
		seed_ts( ): string
		seed_css( ): string
		store_scope( ): string
		sample_title( id: any): string
		sample_pick( id: any, next?: any ): any
		sample_hello_title( ): string
		sample_counter_title( ): string
		sample_fetch_title( ): string
		sample_args_title( ): string
		sample_routing_title( ): string
		sample_state_title( ): string
		sample_login_title( ): string
		Sample_option( id: any): $mol_button_minor
		shared( ): boolean
		share_hint( ): string
		share_done_hint( ): string
		editors_mode( next?: string ): string
		layout_hint( ): string
		layout_hint_tabs( ): string
		files_showed( ): boolean
		files_tree( ): string
		active_file( ): string
		file_pick( next?: any ): any
		files_title( ): string
		files_note( ): string
		attr( ): ({ 
			'bog_smalljs_pg_tab': ReturnType< $bog_smalljs_playground['tab'] >,
			'bog_smalljs_pg_editors': ReturnType< $bog_smalljs_playground['editors_mode'] >,
			'bog_smalljs_pg_files': ReturnType< $bog_smalljs_playground['files_showed'] >,
			'bog_smalljs_pg_shared': ReturnType< $bog_smalljs_playground['shared'] >,
		}) 
		sub( ): readonly(any)[]
		log_open( next?: boolean ): boolean
		log_text( id: any): string
		log_level( id: any): string
		Log_row( id: any): $mol_view
	}
	
}

//# sourceMappingURL=playground.view.tree.d.ts.map
declare namespace $ {
    /** Где отдельно стоящая песочница держит черновики. */
    const $bog_smalljs_playground_store = "$bog_smalljs_playground";
}
declare namespace $.$$ {
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
     * $mol_password
     */
    class $bog_smalljs_playground extends $.$bog_smalljs_playground {
        default_tree(): string;
        /** Выбранный пример. Живёт в URL, чтобы ссылкой можно было поделиться. */
        sample(next?: string): string;
        sample_ids(): string[];
        sample_options(): $mol_button_minor[];
        sample_title(id: string): string;
        samples_label(): string;
        /** Выбор примера — это сброс на него: черновики берутся из дефолтов. */
        sample_pick(id: string): null;
        tree_is_default(): boolean;
        default_css(): string;
        default_ts(): string;
        /**
         * Слева от редактора — то же дерево проекта, что и в доках, но заполненное
         * текущим примером. Начинающий приходит в песочницу с архитектурой реакта в
         * голове и видит три файла без адреса; здесь у них появляется место: пакет,
         * проект, модуль. Клик по файлу открывает его во вкладке.
         *
         * У встраивателя (курс) колонка узкая и сценарий свой — там панели нет.
         */
        files_showed(): boolean;
        /**
         * Путь модуля выводим из корневого компонента примера: my_demo живёт в
         * my/demo/, потому что подчёркивание в имени и есть разделитель папок.
         * Имя пишем без ведущего знака доллара нарочно: в doc-комментарии он тащил
         * бы несуществующий модуль в граф сборки.
         * Свой сниппет, открытый из доков, назовётся по-своему — дерево подстроится.
         */
        module_path(): readonly string[];
        /** Имя модуля — последний сегмент пути: из него и собираются имена файлов. */
        module_name(): string;
        /** Файлы модуля в том порядке, в каком они лежат на диске. */
        module_files(): string[];
        /**
         * Дерево рисуется тем же текстом, который в доках лежит в разметке страницы:
         * компонент разбирает обычный ASCII-листинг, никакой отдельной модели.
         */
        files_tree(): string;
        /** Открытая вкладка подсвечивается в дереве как открытый файл. */
        active_file(): string;
        /**
         * Клик по файлу в дереве открывает его: дерево отдаёт имя файла, суффикс
         * решает, какая это вкладка. `.view.css.ts` проверяем раньше `.view.ts`:
         * второй суффикс — конец первого.
         */
        file_pick(file?: string): null;
        sub(): $mol_view[];
        tab(next?: string): string;
        show_tree(): null;
        show_ts(): null;
        show_css(): null;
        editor_hint(): "Optional — add a class with logic (state, actions), e.g. count() and inc()." | "Optional — style the component with $mol_style_define." | "Type a view.tree here…";
        stored(key: string, next?: string | null): string | null;
        /**
         * Пришли по ссылке «Попробовать пример»: в адресе назван пример, а в
         * localStorage лежит черновик от прошлого захода. Показать черновик значило
         * бы, что кнопка ведёт куда угодно, только не на обещанный пример.
         *
         * Отличаем по корневому компоненту: не совпал с корнем запрошенного примера
         * — черновик не про него. Сам черновик остаётся на месте, мы его только не
         * показываем; первая же правка в редакторе делает его своим (см. schedule).
         */
        draft_is_foreign(): boolean;
        /** Черновик, если он относится к тому, что просили показать. */
        stored_own(key: string): string | null;
        tree_draft(next?: string): string;
        ts_draft(next?: string): string;
        tree_committed(next?: string): string;
        ts_committed(next?: string): string;
        css_draft(next?: string): string;
        css_committed(next?: string): string;
        draft(next?: string): string;
        /** Перехват ставится один раз на страницу, при первом обращении к журналу. */
        log_entries(): readonly $bog_smalljs_playground_log_entry[];
        log_errors(): number;
        /** Ошибки видно и с закрытой панелью — иначе их незачем ловить. */
        log_toggle_label(): string;
        log_shown(): boolean;
        log_rows(): $mol_view[];
        log_text(index: number): string;
        log_level(index: number): "log" | "info" | "warn" | "error";
        log_toggle(): null;
        log_clear(): null;
        shared(next?: boolean): boolean;
        share_title(): string;
        /**
         * Пока ссылка в буфере, кнопка говорит это сама: галочка и слово вместо
         * иконки «поделиться». Раньше единственным ответом на клик была подсказка
         * в `title`, а её после клика никто не видит — жать приходилось наугад.
         */
        share_content(): ($mol_view | $mol_icon_check)[];
        /** Ссылка собирается по требованию, а не висит в адресе постоянно. */
        share(): null;
        /**
         * Вкладки или все файлы стопкой. Выбор личный и запоминается: это вкус,
         * а не свойство страницы, поэтому в ссылку он не попадает — иначе
         * расшаренный код навязывал бы получателю чужую раскладку.
         */
        editors_mode(next?: string): string;
        editors_all(): boolean;
        layout_title(): string;
        layout_toggle(): null;
        /** Кнопки сброса просто нет в разметке, пока откатывать нечего. */
        tabs_content(): readonly $mol_view[];
        /** Что-то из трёх исходников правили — значит есть что откатывать. */
        is_modified(): boolean;
        reset(): null;
        timers: Record<string, $mol_after_timeout | null>;
        schedule(key: string, value: string): void;
        commit(key: string, value: string): void;
        ts_lib(): any;
        static build_base($: any, tree_src: string): {
            root: string;
            Base: any;
        };
        compile(): $mol_view;
        error_box(message: string): $mol_view;
        preview_content(): readonly ($mol_view | string)[];
    }
}

declare namespace $ {
}

declare namespace $ {

	type $bog_smalljs_text_code__text_bog_smalljs_text_1 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text['pre_text'] >
		,
		ReturnType< $bog_smalljs_text_code['text'] >
	>
	type $bog_smalljs_text_code__row_themes_bog_smalljs_text_2 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text['pre_themes'] >
		,
		ReturnType< $bog_smalljs_text_code['row_themes'] >
	>
	type $bog_smalljs_text_code__highlight_bog_smalljs_text_3 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text['highlight'] >
		,
		ReturnType< $bog_smalljs_text_code['highlight'] >
	>
	type $bog_smalljs_text_code__uri_resolve_bog_smalljs_text_4 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text['uri_resolve'] >
		,
		ReturnType< $bog_smalljs_text_code['uri_resolve'] >
	>
	type $bog_smalljs_text_code__sidebar_showed_bog_smalljs_text_5 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text['pre_sidebar_showed'] >
		,
		ReturnType< $bog_smalljs_text_code['sidebar_showed'] >
	>
	type $bog_smalljs_text_code__lang_bog_smalljs_text_6 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text['pre_lang'] >
		,
		ReturnType< $bog_smalljs_text_code['lang'] >
	>
	type $bog_smalljs_text_code__run_enabled_bog_smalljs_text_7 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text['pre_run_enabled'] >
		,
		ReturnType< $bog_smalljs_text_code['run_enabled'] >
	>
	type $bog_smalljs_text_code__playground_arg_bog_smalljs_text_8 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text['pre_playground_arg'] >
		,
		ReturnType< $bog_smalljs_text_code['playground_arg'] >
	>
	type $bog_smalljs_text_code__playground_showed_bog_smalljs_text_9 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text['pre_playground_showed'] >
		,
		ReturnType< $bog_smalljs_text_code['playground_showed'] >
	>
	type $bog_smalljs_structure__tree_bog_smalljs_text_10 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text['pre_text'] >
		,
		ReturnType< $bog_smalljs_structure['tree'] >
	>
	export class $bog_smalljs_text extends $mol_text {
		pre_text( id: any): string
		pre_themes( id: any): readonly(string)[]
		highlight( ): string
		uri_resolve( id: any): string
		code_sidebar_showed( ): boolean
		pre_sidebar_showed( ): ReturnType< $bog_smalljs_text['code_sidebar_showed'] >
		pre_lang( id: any): string
		pre_run_enabled( id: any): boolean
		pre_playground_arg( id: any): Record<string, any>
		pre_playground_showed( id: any): boolean
		Pre( id: any): $bog_smalljs_text_code
		Structure( id: any): $bog_smalljs_structure
	}
	
	type $mol_button_minor__click_bog_smalljs_text_code_1 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text_code['run_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__hint_bog_smalljs_text_code_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub_bog_smalljs_text_code_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $bog_smalljs_text_live__tree_bog_smalljs_text_code_4 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text_code['text'] >
		,
		ReturnType< $bog_smalljs_text_live['tree'] >
	>
	type $mol_link__arg_bog_smalljs_text_code_5 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text_code['playground_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__hint_bog_smalljs_text_code_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_bog_smalljs_text_code_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $bog_smalljs_text_code extends $mol_text_code {
		run_click( next?: any ): any
		Run_icon( ): $mol_icon_play
		Playground_icon( ): $mol_icon_launch
		lang( ): string
		playground_arg( ): Record<string, any>
		playground_showed( ): boolean
		run_enabled( ): boolean
		run( next?: boolean ): boolean
		attr( ): ({ 
			'bog_smalljs_run_active': ReturnType< $bog_smalljs_text_code['run'] >,
		})  & ReturnType< $mol_text_code['attr'] >
		Run( ): $mol_button_minor
		Live( ): $bog_smalljs_text_live
		Playground( ): $mol_link
	}
	
	type $mol_view__sub_bog_smalljs_text_live_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_text_live_2 = $mol_type_enforce<
		ReturnType< $bog_smalljs_text_live['live_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_text_live extends $mol_view {
		label_text( ): string
		Label( ): $mol_view
		live_content( ): readonly(any)[]
		Output( ): $mol_view
		tree( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * $mol_text with language-aware code blocks: view.tree gets its own highlighter,
     * and executable snippets (view.tree) grow an "Open in Playground" button.
     */
    class $bog_smalljs_text extends $.$bog_smalljs_text {
        pre_text(index: number): string;
        pre_themes(index: number): string[];
        uri_resolve(uri: string): string;
        /**
         * A ```structure fence is not code but a project layout, so it renders as the
         * interactive tree instead of a code block: same listing, plus a "?" per line
         * explaining why the folder is there. The listing stays inside the markdown, so
         * the raw .md endpoint (and any reader who never loads the site) still gets it.
         *
         * $mol_text picks a component per flow token, and the switch below is its own,
         * one case richer. It is repeated rather than delegated because the base builds
         * the whole list in one memoized pass — calling it from an override of itself
         * would re-enter the same cell.
         */
        rows(): ($mol_view | $.$mol_paragraph | $.$mol_grid | $.$bog_smalljs_structure | $.$bog_smalljs_text_code)[];
        /** Raw fence info-string of a code block (chunk 1 of the flow token), e.g. `tree-no-run`. */
        pre_info(index: number): any;
        /** Fence language with any author flag stripped, e.g. `tree`, `typescript`. */
        pre_lang(index: number): string;
        /** False when the fence opted out via `-no-run` (see {@link fence_no_run}). */
        pre_run_enabled(index: number): boolean;
        /** Normalized language family used for grammar selection and playground gating. */
        lang_kind(index: number): string;
        pre_playground_showed(index: number): boolean;
        pre_playground_arg(index: number): Record<string, string | null>;
    }
    /** Code block that picks a grammar by language and can offer an "Open in Playground" link. */
    class $bog_smalljs_text_code extends $.$bog_smalljs_text_code {
        render_visible_only(): boolean;
        syntax(): any;
        run_showed(): boolean;
        run_click(): null;
        sub(): ($.$mol_link | $mol_button_minor | $.$mol_list | $.$mol_button_copy | $.$bog_smalljs_text_live)[];
    }
    /**
     * Render-only live embed for a doc snippet: compiles the view.tree in the browser
     * with the playground's own $mol toolchain ($bog_smalljs_playground.build_base) and
     * mounts the resulting component — no editor, no persistence. Compilation errors are
     * caught and shown inline so a bad snippet never takes down the page.
     */
    class $bog_smalljs_text_live extends $.$bog_smalljs_text_live {
        live_content(): readonly ($mol_view | string)[];
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_pencil extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=pencil.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_thumb_up extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=up.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_thumb_down extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=down.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_smalljs_docs_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_smalljs_docs_2 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['menu_toggle'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_docs_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_4 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['sidebar_groups'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_text__text_bog_smalljs_docs_5 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['page_md'] >
		,
		ReturnType< $bog_smalljs_text['text'] >
	>
	type $mol_link__uri_bog_smalljs_docs_6 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['edit_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub_bog_smalljs_docs_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_8 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['feedback_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_9 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['nav_links'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_12 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['toc_links'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_18 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['group_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__arg_bog_smalljs_docs_20 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['link_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_docs_21 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['nav_click'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__sub_bog_smalljs_docs_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_bog_smalljs_docs_23 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['toc_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_docs_24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_smalljs_docs_26 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['feedback_yes'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_docs_27 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_smalljs_docs_28 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['feedback_no'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_docs_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_smalljs_docs_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__arg_bog_smalljs_docs_31 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['prev_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_docs_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_bog_smalljs_docs_33 = $mol_type_enforce<
		ReturnType< $bog_smalljs_docs['next_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_docs_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $bog_smalljs_docs extends $mol_view {
		scroll_reset( ): any
		menu_toggle( next?: any ): any
		Menu_icon( ): $mol_icon_menu
		Menu_label( ): $mol_view
		Menu_toggle( ): $mol_button_minor
		sidebar_groups( ): readonly(any)[]
		Sidebar( ): $mol_view
		Body( ): $bog_smalljs_text
		Edit_icon( ): $mol_icon_pencil
		Edit_label( ): string
		Edit( ): $mol_link
		feedback_content( ): readonly(any)[]
		Feedback( ): $mol_view
		nav_links( ): readonly(any)[]
		Nav( ): $mol_view
		Main( ): $mol_view
		toc_title_text( ): string
		Toc_title( ): $mol_view
		toc_links( ): readonly(any)[]
		Toc_list( ): $mol_view
		Toc( ): $mol_view
		group_content( id: any): readonly(any)[]
		group_title_text( id: any): string
		link_arg( id: any): Record<string, any>
		nav_click( next?: any ): any
		link_title( id: any): string
		toc_arg( id: any): Record<string, any>
		toc_text( id: any): string
		feedback_prompt_text( ): string
		feedback_yes( next?: any ): any
		Feedback_yes_icon( ): $mol_icon_thumb_up
		feedback_yes_label( ): string
		feedback_no( next?: any ): any
		Feedback_no_icon( ): $mol_icon_thumb_down
		feedback_no_label( ): string
		feedback_thanks_text( ): string
		prev_arg( ): Record<string, any>
		prev_hint_text( ): string
		Prev_hint( ): $mol_view
		prev_title( ): string
		Prev_title( ): $mol_view
		next_arg( ): Record<string, any>
		next_hint_text( ): string
		Next_hint( ): $mol_view
		next_title( ): string
		Next_title( ): $mol_view
		page( ): string
		page_md( ): string
		title_text( ): string
		edit_uri( ): string
		sidebar_open( next?: boolean ): boolean
		attr( ): ({ 
			'bog_smalljs_sidebar_open': ReturnType< $bog_smalljs_docs['sidebar_open'] >,
		}) 
		auto( ): readonly(any)[]
		sub( ): readonly(any)[]
		Group( id: any): $mol_view
		Group_title( id: any): $mol_view
		Link( id: any): $mol_link
		Toc_link( id: any): $mol_link
		Feedback_prompt( ): $mol_view
		Feedback_yes( ): $mol_button_minor
		Feedback_no( ): $mol_button_minor
		Feedback_thanks( ): $mol_view
		Prev( ): $mol_link
		Next( ): $mol_link
	}
	
}

//# sourceMappingURL=docs.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_smalljs_docs extends $.$bog_smalljs_docs {
        /** Current page slug, mirrored to the `page` URL argument. */
        page(next?: string): string;
        current(): $bog_smalljs_content_page | null;
        /** Active UI language; reading it makes the page reactive to switches. */
        lang(): string;
        page_md(): string;
        title_text(): string;
        edit_uri(): string;
        scroll_reset(): null;
        menu_toggle(): void;
        nav_click(): null;
        feedback_value(next?: string): string;
        feedback_yes(): null;
        feedback_no(): null;
        feedback_content(): readonly $mol_view[];
        groups_data(): readonly $bog_smalljs_content_group[];
        sidebar_groups(): $mol_view[];
        group_title_text(index: number): string;
        group_content(index: number): readonly $mol_view[];
        link_title(slug: string): string;
        link_arg(slug: string): {
            section: string;
            page: string;
        };
        toc_data(): {
            level: number;
            text: string;
        }[];
        toc_links(): $.$mol_link[];
        toc_text(index: number): string;
        /**
         * Reuse $mol_text's own anchor mechanism: each heading renders a link
         * whose arg key is the text component's `param`. Setting that arg makes
         * the matching header `current`, and $mol_text auto-scrolls to it.
         */
        toc_arg(index: number): {
            [x: string]: string;
        };
        order(): readonly string[];
        nav_index(): number;
        prev_slug(): string;
        next_slug(): string;
        prev_arg(): {
            section: string;
            page: string;
        };
        next_arg(): {
            section: string;
            page: string;
        };
        prev_title(): string;
        next_title(): string;
        nav_links(): $mol_view[];
    }
}

declare namespace $ {
}

declare namespace $ {
    type $bog_smalljs_outline_section = {
        /** Heading depth (2 or 3). 0 marks the preamble before the first heading. */
        level: number;
        /** Heading text, verbatim. Empty for the preamble. */
        title: string;
        /** Section source, heading line included. */
        md: string;
    };
    /**
     * Splits a documentation page into sections at its `##`/`###` headings.
     *
     * The docs table of contents and the search index both go through here so
     * their headings cannot drift apart: `title` is used as the value of the
     * anchor URL argument, and $mol_text only scrolls to a heading when that
     * value matches its own header text character for character (see
     * `$bog_smalljs_docs.toc_arg` and `$mol_text.header_arg`).
     *
     * The first entry is always the preamble, even when it is empty, and the
     * sections concatenate back to the input — search relies on that to score a
     * page by summing over its sections.
     */
    class $bog_smalljs_outline extends $mol_object2 {
        static sections(md: string): readonly $bog_smalljs_outline_section[];
    }
}

declare namespace $ {
    /**
     * Static semantic index for docs search. GENERATED by content/embed.cjs —
     * do not edit by hand. Vectors are 384-dim, produced by Xenova/all-MiniLM-L6-v2
     * (mean-pooled, L2-normalized). The runtime embeds the query with the same
     * model and ranks by cosine similarity. Re-run: node content/embed.cjs
     */
    type $bog_smalljs_embeddings_row = {
        slug: string;
        vector: readonly number[];
    };
    class $bog_smalljs_embeddings extends $mol_object2 {
        static model(): string;
        static dim(): number;
        static index(): readonly $bog_smalljs_embeddings_row[];
    }
}

declare namespace $ {

	type $mol_hotkey__key_bog_smalljs_search_1 = $mol_type_enforce<
		({ 
			escape( next?: ReturnType< $bog_smalljs_search['close'] > ): ReturnType< $bog_smalljs_search['close'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_hotkey__key_bog_smalljs_search_2 = $mol_type_enforce<
		({ 
			down( next?: ReturnType< $bog_smalljs_search['select_next'] > ): ReturnType< $bog_smalljs_search['select_next'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_hotkey__key_bog_smalljs_search_3 = $mol_type_enforce<
		({ 
			up( next?: ReturnType< $bog_smalljs_search['select_prev'] > ): ReturnType< $bog_smalljs_search['select_prev'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_view__event_bog_smalljs_search_4 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_smalljs_search['close'] > ): ReturnType< $bog_smalljs_search['close'] >,
		}) 
		,
		ReturnType< $mol_view['event'] >
	>
	type $mol_string__value_bog_smalljs_search_5 = $mol_type_enforce<
		ReturnType< $bog_smalljs_search['query'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_bog_smalljs_search_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__submit_bog_smalljs_search_7 = $mol_type_enforce<
		ReturnType< $bog_smalljs_search['activate'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_view__sub_bog_smalljs_search_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows_bog_smalljs_search_9 = $mol_type_enforce<
		ReturnType< $bog_smalljs_search['result_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_view__sub_bog_smalljs_search_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_search_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_search_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__arg_bog_smalljs_search_13 = $mol_type_enforce<
		ReturnType< $bog_smalljs_search['result_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__event_click_bog_smalljs_search_14 = $mol_type_enforce<
		ReturnType< $bog_smalljs_search['pick'] >
		,
		ReturnType< $mol_link['event_click'] >
	>
	type $mol_link__attr_bog_smalljs_search_15 = $mol_type_enforce<
		({ 
			'bog_smalljs_search_current': ReturnType< $bog_smalljs_search['result_current'] >,
		})  & ReturnType< $mol_link['attr'] >
		,
		ReturnType< $mol_link['attr'] >
	>
	type $mol_link__sub_bog_smalljs_search_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $bog_smalljs_search extends $mol_view {
		Escape( ): $mol_hotkey
		Nav_down( ): $mol_hotkey
		Nav_up( ): $mol_hotkey
		Backdrop( ): $mol_view
		Field( ): $mol_string
		Hint( ): $mol_view
		result_rows( ): readonly(any)[]
		Results( ): $mol_list
		Panel( ): $mol_view
		result_arg( id: any): Record<string, any>
		result_current( id: any): boolean
		result_title( id: any): string
		Result_title( id: any): $mol_view
		result_snippet( id: any): string
		Result_snippet( id: any): $mol_view
		open( next?: boolean ): boolean
		query( next?: string ): string
		anchor_key( ): string
		close( next?: any ): any
		focus( next?: any ): any
		activate( next?: any ): any
		select_next( next?: any ): any
		select_prev( next?: any ): any
		pick( id: any, next?: any ): any
		attr( ): ({ 
			'bog_smalljs_search_open': ReturnType< $bog_smalljs_search['open'] >,
		}) 
		plugins( ): readonly($mol_plugin)[]
		sub( ): readonly(any)[]
		Result( id: any): $mol_link
	}
	
}

//# sourceMappingURL=search.view.tree.d.ts.map
declare namespace $.$$ {
    type Chunk = {
        /** Heading text, verbatim — the anchor to jump to. Empty for the preamble. */
        anchor: string;
        /** Lowercased heading, localized and English, for the section-pick bonus. */
        head: string;
        head_en: string;
        /** Lowercased section source, heading line included. */
        text: string;
        text_en: string;
        /** Section source as written, for the result snippet. */
        raw: string;
    };
    type Doc = {
        slug: string;
        title: string;
        title_en: string;
        chunks: readonly Chunk[];
    };
    export class $bog_smalljs_search extends $.$bog_smalljs_search {
        close(): null;
        focus(): null;
        go(slug: string): null;
        pick(slug: string, event?: Event): null;
        activate(event?: unknown): null;
        active_at(_key: string, next?: number): number;
        active(next?: number): number;
        select_next(event?: KeyboardEvent): null;
        select_prev(event?: KeyboardEvent): null;
        result_current(slug: string): boolean;
        /** Active UI language; reading it makes search reactive to switches. */
        lang(): string;
        corpus(): readonly Doc[];
        /**
         * Cuts a page into one chunk per heading, plus the preamble, and pairs
         * each with the matching section of the English original **by position**:
         * translations are generated from the English page and keep its heading
         * structure, so the n-th section means the same thing in both.
         *
         * If the two outlines ever disagree, the page degrades to a single
         * anchor-less chunk. Ranking is unaffected — the score of a page is the
         * sum over its chunks either way — only the deep link is dropped.
         */
        chunks(md: string, md_en: string): readonly Chunk[];
        full_text_hits(): Map<string, {
            score: number;
            chunk: Chunk | null;
        }>;
        full_text_scores(): Map<string, number>;
        /** Section of `slug` the query matched best, or null for a page-level hit. */
        result_chunk(slug: string): Chunk | null;
        /** Heading to deep-link to, empty when the page should open at the top. */
        result_anchor(slug: string): string;
        /** Occurrences of `term` in already-lowercased `text`. */
        term_count(text: string, term: string): number;
        extractor(): ((text: string, opts: unknown) => Promise<{
            data: ArrayLike<number>;
        }>);
        build_pipeline(mod: {
            pipeline: (task: string, model: string) => Promise<unknown>;
        }): Promise<unknown>;
        query_vector(): readonly number[];
        run_embed(pipe: (text: string, opts: unknown) => Promise<{
            data: ArrayLike<number>;
        }>, query: string): Promise<{
            data: ArrayLike<number>;
        }>;
        semantic_scores(): Map<string, number>;
        model_status(): string;
        ranked(): {
            slug: string;
            score: number;
        }[];
        hint_text(): string;
        result_ids(): string[];
        result_rows(): $.$mol_link[];
        result_arg(slug: string): Record<string, string | null>;
        result_title(slug: string): string;
        result_snippet(slug: string): string;
    }
    export {};
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_arrow_right extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=right.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_open_in_new extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=new.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__hint_bog_smalljs_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_bog_smalljs_demo_2 = $mol_type_enforce<
		ReturnType< $bog_smalljs_demo['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_paragraph__title_bog_smalljs_demo_3 = $mol_type_enforce<
		ReturnType< $bog_smalljs_demo['greeting'] >
		,
		ReturnType< $mol_paragraph['title'] >
	>
	export class $bog_smalljs_demo extends $mol_view {
		name( next?: string ): string
		Name( ): $mol_string
		greeting( ): string
		Greeting( ): $mol_paragraph
		guest( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * The tiny reactive component mounted live in the landing hero, right next to
     * its own view.tree source. Typing in the field re-derives the greeting with no
     * wiring — that automatic reactivity is the one thing the hero has to prove.
     */
    class $bog_smalljs_demo extends $.$bog_smalljs_demo {
        greeting(): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_view__sub_bog_smalljs_landing_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_landing_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_landing_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_landing_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_landing_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__arg_bog_smalljs_landing_8 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_landing_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_bog_smalljs_landing_10 = $mol_type_enforce<
		({ 
			'section': string,
			'page': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_landing_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_bog_smalljs_landing_12 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_landing_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_text_code__text_bog_smalljs_landing_17 = $mol_type_enforce<
		ReturnType< $bog_smalljs_landing['code'] >
		,
		ReturnType< $bog_smalljs_text_code['text'] >
	>
	type $bog_smalljs_text_code__lang_bog_smalljs_landing_18 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_text_code['lang'] >
	>
	type $bog_smalljs_text_code__sidebar_showed_bog_smalljs_landing_19 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_text_code['sidebar_showed'] >
	>
	type $bog_smalljs_text_code__playground_showed_bog_smalljs_landing_20 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_text_code['playground_showed'] >
	>
	type $bog_smalljs_text_code__run_enabled_bog_smalljs_landing_21 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_text_code['run_enabled'] >
	>
	type $mol_view__sub_bog_smalljs_landing_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_text_code__text_bog_smalljs_landing_23 = $mol_type_enforce<
		ReturnType< $bog_smalljs_landing['code_ts'] >
		,
		ReturnType< $bog_smalljs_text_code['text'] >
	>
	type $bog_smalljs_text_code__lang_bog_smalljs_landing_24 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_text_code['lang'] >
	>
	type $bog_smalljs_text_code__sidebar_showed_bog_smalljs_landing_25 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_text_code['sidebar_showed'] >
	>
	type $bog_smalljs_text_code__playground_showed_bog_smalljs_landing_26 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_text_code['playground_showed'] >
	>
	type $bog_smalljs_text_code__run_enabled_bog_smalljs_landing_27 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_text_code['run_enabled'] >
	>
	type $mol_view__sub_bog_smalljs_landing_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_text_code__text_bog_smalljs_landing_29 = $mol_type_enforce<
		ReturnType< $bog_smalljs_landing['code_css'] >
		,
		ReturnType< $bog_smalljs_text_code['text'] >
	>
	type $bog_smalljs_text_code__lang_bog_smalljs_landing_30 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_text_code['lang'] >
	>
	type $bog_smalljs_text_code__sidebar_showed_bog_smalljs_landing_31 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_text_code['sidebar_showed'] >
	>
	type $bog_smalljs_text_code__playground_showed_bog_smalljs_landing_32 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_text_code['playground_showed'] >
	>
	type $bog_smalljs_text_code__run_enabled_bog_smalljs_landing_33 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_text_code['run_enabled'] >
	>
	type $mol_view__sub_bog_smalljs_landing_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_35 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_37 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_38 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_39 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__arg_bog_smalljs_landing_40 = $mol_type_enforce<
		({ 
			'section': string,
			'page': any,
			'sample': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_landing_41 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_42 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_43 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_44 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_text__text_bog_smalljs_landing_45 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_view__sub_bog_smalljs_landing_46 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_47 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_text__text_bog_smalljs_landing_48 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_view__sub_bog_smalljs_landing_49 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_50 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_text__text_bog_smalljs_landing_51 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_view__sub_bog_smalljs_landing_52 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_53 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_54 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_landing_55 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_landing_56 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_57 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_structure__tree_bog_smalljs_landing_58 = $mol_type_enforce<
		ReturnType< $bog_smalljs_landing['arch_tree'] >
		,
		ReturnType< $bog_smalljs_structure['tree'] >
	>
	type $bog_smalljs_structure__steps_showed_bog_smalljs_landing_59 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_smalljs_structure['steps_showed'] >
	>
	type $mol_link__arg_bog_smalljs_landing_60 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_landing_61 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_62 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_63 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_64 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__arg_bog_smalljs_landing_65 = $mol_type_enforce<
		({ 
			'section': string,
			'page': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_landing_66 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_bog_smalljs_landing_67 = $mol_type_enforce<
		({ 
			'section': string,
			'a': string,
			'b': string,
			'page': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_landing_68 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_69 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_70 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_71 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__title_bog_smalljs_landing_72 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_landing_73 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__title_bog_smalljs_landing_74 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_landing_75 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__title_bog_smalljs_landing_76 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_landing_77 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__title_bog_smalljs_landing_78 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_landing_79 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__title_bog_smalljs_landing_80 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_landing_81 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_view__sub_bog_smalljs_landing_82 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_83 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_84 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__title_bog_smalljs_landing_85 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_landing_86 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__title_bog_smalljs_landing_87 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_landing_88 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__title_bog_smalljs_landing_89 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_landing_90 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_view__sub_bog_smalljs_landing_91 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_92 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_93 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__title_bog_smalljs_landing_94 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_landing_95 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__title_bog_smalljs_landing_96 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_bog_smalljs_landing_97 = $mol_type_enforce<
		({ 
			'section': string,
			'page': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__title_bog_smalljs_landing_98 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_landing_99 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_landing_100 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_link__title_bog_smalljs_landing_101 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_landing_102 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_landing_103 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_link__title_bog_smalljs_landing_104 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_landing_105 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_landing_106 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_view__sub_bog_smalljs_landing_107 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_108 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_109 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__title_bog_smalljs_landing_110 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_landing_111 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_landing_112 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_link__title_bog_smalljs_landing_113 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_landing_114 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_landing_115 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_link__title_bog_smalljs_landing_116 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_landing_117 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_landing_118 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_link__title_bog_smalljs_landing_119 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_landing_120 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_landing_121 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_link__title_bog_smalljs_landing_122 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_landing_123 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_landing_124 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_link__title_bog_smalljs_landing_125 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_smalljs_landing_126 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_landing_127 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_view__sub_bog_smalljs_landing_128 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_129 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_130 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_131 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_132 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_133 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_landing_134 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_landing extends $mol_view {
		Hero_eyebrow_text( ): string
		Hero_eyebrow( ): $mol_view
		Hero_title_pre( ): string
		Hero_title_accent_text( ): string
		Hero_title_accent( ): $mol_view
		Hero_title_post( ): string
		Hero_title( ): $mol_view
		Hero_subtitle_text( ): string
		Hero_subtitle( ): $mol_view
		Hero_subtitle_note_text( ): string
		Hero_subtitle_note( ): $mol_view
		Hero_cta_start_label( ): string
		Hero_cta_start_icon( ): $mol_icon_arrow_right
		Hero_cta_start( ): $mol_link
		Hero_cta_play_label( ): string
		Hero_cta_play_icon( ): $mol_icon_open_in_new
		Hero_cta_play( ): $mol_link
		Hero_cta_why_label( ): string
		Hero_cta_why_icon( ): $mol_icon_arrow_right
		Hero_cta_why( ): $mol_link
		Hero_actions( ): $mol_view
		Hero_head( ): $mol_view
		Sign_code_label_text( ): string
		Sign_code_label( ): $mol_view
		code( ): string
		Sign_code_view( ): $bog_smalljs_text_code
		Sign_ts_label_text( ): string
		Sign_ts_label( ): $mol_view
		code_ts( ): string
		Sign_ts_view( ): $bog_smalljs_text_code
		Sign_css_label_text( ): string
		Sign_css_label( ): $mol_view
		code_css( ): string
		Sign_css_view( ): $bog_smalljs_text_code
		Sign_code( ): $mol_view
		Sign_arrow_text( ): string
		Sign_arrow( ): $mol_view
		Sign_live_label_text( ): string
		Sign_live_label( ): $mol_view
		Sign_demo( ): $bog_smalljs_demo
		Sign_live( ): $mol_view
		Sign_panel( ): $mol_view
		Sign_caption_text( ): string
		Sign_caption( ): $mol_view
		Sign_try_label( ): string
		Sign_try_icon( ): $mol_icon_open_in_new
		Sign_try( ): $mol_link
		Signature( ): $mol_view
		Hero( ): $mol_view
		Feature1_title_text( ): string
		Feature1_title( ): $mol_view
		Feature1_text( ): $mol_text
		Feature1( ): $mol_view
		Feature2_title_text( ): string
		Feature2_title( ): $mol_view
		Feature2_text( ): $mol_text
		Feature2( ): $mol_view
		Feature3_title_text( ): string
		Feature3_title( ): $mol_view
		Feature3_text( ): $mol_text
		Feature3( ): $mol_view
		Features( ): $mol_view
		arch_eyebrow_text( ): string
		Arch_eyebrow( ): $mol_view
		arch_title_text( ): string
		Arch_title( ): $mol_view
		arch_line_text( ): string
		Arch_line( ): $mol_view
		arch_tree( ): string
		Arch_structure( ): $bog_smalljs_structure
		arch_link_label( ): string
		Arch_link_icon( ): $mol_icon_arrow_right
		Arch_link( ): $mol_link
		Arch( ): $mol_view
		versus_eyebrow_text( ): string
		Versus_eyebrow( ): $mol_view
		versus_line_text( ): string
		Versus_line( ): $mol_view
		versus_open_label( ): string
		Versus_open_icon( ): $mol_icon_arrow_right
		Versus_open( ): $mol_link
		versus_pair_label( ): string
		Versus_pair( ): $mol_link
		Versus_links( ): $mol_view
		Versus( ): $mol_view
		Footer_sect_docs_title_text( ): string
		Footer_sect_docs_title( ): $mol_view
		Footer_link_quickstart( ): $mol_link
		Footer_link_guide( ): $mol_link
		Footer_link_tutorial( ): $mol_link
		Footer_link_examples( ): $mol_link
		Footer_link_api( ): $mol_link
		Footer_sect_docs( ): $mol_view
		Footer_col1( ): $mol_view
		Footer_sect_about_title_text( ): string
		Footer_sect_about_title( ): $mol_view
		Footer_link_faq( ): $mol_link
		Footer_link_team( ): $mol_link
		Footer_link_releases( ): $mol_link
		Footer_sect_about( ): $mol_view
		Footer_col2( ): $mol_view
		Footer_sect_resources_title_text( ): string
		Footer_sect_resources_title( ): $mol_view
		Footer_link_playground( ): $mol_link
		Footer_link_course( ): $mol_link
		Footer_link_ui( ): $mol_link
		Footer_link_telegram( ): $mol_link
		Footer_link_dev( ): $mol_link
		Footer_sect_resources( ): $mol_view
		Footer_col3( ): $mol_view
		Footer_sect_libs_title_text( ): string
		Footer_sect_libs_title( ): $mol_view
		Footer_link_wire( ): $mol_link
		Footer_link_fetch( ): $mol_link
		Footer_link_compare( ): $mol_link
		Footer_link_router( ): $mol_link
		Footer_link_crowd( ): $mol_link
		Footer_link_baza( ): $mol_link
		Footer_sect_libs( ): $mol_view
		Footer_col4( ): $mol_view
		Footer_cols( ): $mol_view
		Footer_copy_line1_text( ): string
		Footer_copy_line1( ): $mol_view
		Footer_copy_line2_text( ): string
		Footer_copy_line2( ): $mol_view
		Footer_copy( ): $mol_view
		Footer( ): $mol_view
		arch_label_workspace( ): string
		arch_label_registry( ): string
		arch_label_framework( ): string
		arch_label_package( ): string
		arch_label_registry_own( ): string
		arch_label_project( ): string
		arch_label_entry( ): string
		arch_label_tree( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=landing.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_smalljs_landing extends $.$bog_smalljs_landing {
        /**
         * Три файла витрины — это буквально пример `hello` из песочницы, а не его
         * пересказ. Кнопка «Попробовать» рядом открывает песочницу на нём же, и
         * читатель попадает в тот самый код, который только что прочёл. Держать
         * вторую копию значило бы однажды поправить одну из них.
         *
         * Живое демо справа — $bog_smalljs_demo, ручной двойник этого примера:
         * то же поле, то же приветствие, но в теме сайта.
         *
         * Примеры лежат в $bog_smalljs_playground — упоминаем модуль здесь, чтобы
         * сборщик увидел зависимость: имя константы длиннее имени папки и само по
         * себе в граф не разбирается.
         */
        sample(): $bog_smalljs_playground_sample;
        /** Разметка: что показано, из чего собрано. */
        code(): string;
        /**
         * Второй файл витрины. Без него `greeting` в дереве остался бы статической
         * строкой: ввод в поле ничего бы не менял, а живое демо справа — меняет.
         * Показывать одно дерево значило обещать поведение, которого показанный
         * код не даёт.
         */
        code_ts(): string;
        /**
         * Третий файл. Фронтендер, впервые увидевший $mol, первым делом
         * спрашивает, чем тут пишут стили — и уходит гадать, если ответа рядом
         * нет. Это он: обычный TypeScript, свойства проверяются типами.
         */
        code_css(): string;
        /**
         * Раскладка, которая есть у любого проекта на $mol, урезанная до строк,
         * отвечающих на вопрос «куда класть свой код»: воркспейс, фреймворк рядом,
         * ваш пакет и один проект внутри со своим репозиторием. В доках то же дерево
         * показано вместе с файлами модуля — здесь речь про владение, а не про файлы.
         *
         * Собирается строками, а не разметкой: компонент разбирает ровно тот листинг,
         * который читатель скопировал бы из доков. Подписи — локализуемые, пути — нет.
         */
        arch_tree(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    /**
     * Interactive course lessons. GENERATED by content/gen.cjs — edit the lessons
     * array there and re-run the generator. Code snippets are embedded escaped so
     * their $mol_* examples are not mistaken for module dependencies.
     */
    type $bog_smalljs_lesson_translation = {
        title: string;
        md: string;
    };
    type $bog_smalljs_lesson = {
        id: string;
        title: string;
        /** Substring the finished source should contain (simple auto-check). */
        expect: string;
        expect_in: 'tree' | 'ts';
        md: string;
        start_tree: string;
        start_ts: string;
        solution_tree: string;
        solution_ts: string;
        /** Per-language prose overrides (title + md), keyed by lang. EN is above. */
        tr?: Readonly<Record<string, $bog_smalljs_lesson_translation>>;
    };
    class $bog_smalljs_lessons extends $mol_object2 {
        static all(): readonly $bog_smalljs_lesson[];
        static ids(): readonly string[];
        static map(): Readonly<Record<string, $bog_smalljs_lesson>>;
        static lesson(id: string): $bog_smalljs_lesson | null;
        /** Localized title for a lesson, falling back to EN. */
        static lesson_title(id: string, lang?: string): string | null;
        /** Localized instruction markdown for a lesson, falling back to EN. */
        static lesson_md(id: string, lang?: string): string | null;
        static first(): string;
    }
}

declare namespace $ {

	type $mol_view__sub_bog_smalljs_course_1 = $mol_type_enforce<
		ReturnType< $bog_smalljs_course['lesson_links'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_text__text_bog_smalljs_course_2 = $mol_type_enforce<
		ReturnType< $bog_smalljs_course['lesson_md'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_view__sub_bog_smalljs_course_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__arg_bog_smalljs_course_4 = $mol_type_enforce<
		ReturnType< $bog_smalljs_course['prev_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_course_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_button_minor__click_bog_smalljs_course_6 = $mol_type_enforce<
		ReturnType< $bog_smalljs_course['toggle_solution'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_course_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_link__arg_bog_smalljs_course_8 = $mol_type_enforce<
		ReturnType< $bog_smalljs_course['next_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_course_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_course_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_text__text_bog_smalljs_course_11 = $mol_type_enforce<
		ReturnType< $bog_smalljs_course['solution_md'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_view__sub_bog_smalljs_course_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_course_13 = $mol_type_enforce<
		ReturnType< $bog_smalljs_course['editor_host'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__arg_bog_smalljs_course_14 = $mol_type_enforce<
		ReturnType< $bog_smalljs_course['lesson_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_course_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $bog_smalljs_playground__store_scope_bog_smalljs_course_16 = $mol_type_enforce<
		ReturnType< $bog_smalljs_course['editor_store_key'] >
		,
		ReturnType< $bog_smalljs_playground['store_scope'] >
	>
	type $bog_smalljs_playground__seed_tree_bog_smalljs_course_17 = $mol_type_enforce<
		ReturnType< $bog_smalljs_course['editor_seed_tree'] >
		,
		ReturnType< $bog_smalljs_playground['seed_tree'] >
	>
	type $bog_smalljs_playground__seed_ts_bog_smalljs_course_18 = $mol_type_enforce<
		ReturnType< $bog_smalljs_course['editor_seed_ts'] >
		,
		ReturnType< $bog_smalljs_playground['seed_ts'] >
	>
	export class $bog_smalljs_course extends $mol_view {
		lesson_links( ): readonly(any)[]
		Lesson_list( ): $mol_view
		Instruction( ): $mol_text
		Status( ): $mol_view
		prev_arg( ): Record<string, any>
		prev_label( ): string
		Prev( ): $mol_link
		toggle_solution( next?: any ): any
		Solution_btn( ): $mol_button_minor
		next_arg( ): Record<string, any>
		next_label( ): string
		Next( ): $mol_link
		Controls( ): $mol_view
		Solution_block( ): $mol_text
		Aside( ): $mol_view
		editor_host( ): readonly(any)[]
		Editor_host( ): $mol_view
		lesson_arg( id: any): Record<string, any>
		lesson_link_label( id: any): string
		lesson( ): string
		solution_shown( next?: boolean ): boolean
		editor_seed_tree( id: any): string
		editor_seed_ts( id: any): string
		editor_store_key( id: any): string
		lesson_md( ): string
		status_text( ): string
		status_ok( ): string
		status_todo( ): string
		solution_label( ): string
		solution_show( ): string
		solution_hide( ): string
		solution_md( ): string
		sub( ): readonly(any)[]
		Lesson_link( id: any): $mol_link
		Editor( id: any): $bog_smalljs_playground
	}
	
}

//# sourceMappingURL=course.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_smalljs_course extends $.$bog_smalljs_course {
        lesson(next?: string): string;
        current(): $bog_smalljs_lesson | null;
        /** Active UI language; reading it makes the course reactive to switches. */
        lang(): string;
        lesson_md(): string;
        ids(): readonly string[];
        lesson_links(): $.$mol_link[];
        lesson_arg(id: string): {
            section: string;
            page: null;
            lesson: string;
        };
        lesson_link_label(id: string): string;
        editor_host(): $.$bog_smalljs_playground[];
        editor_seed_tree(id: string): string;
        editor_seed_ts(id: string): string;
        editor_store_key(id: string): string;
        toggle_solution(): null;
        solution_label(): string;
        solution_md(): string;
        lesson_source(lesson: $bog_smalljs_lesson): string;
        passed(lesson: $bog_smalljs_lesson): boolean;
        done(id: string): boolean;
        status_text(): string;
        nav_index(): number;
        prev_arg(): {
            section: string;
            page: null;
            lesson: string;
        };
        next_arg(): {
            section: string;
            page: null;
            lesson: string;
        };
    }
}

declare namespace $ {
}

declare namespace $ {
    /**
     * Static comparison data for the versus section. GENERATED by
     * versus/data/gen.cjs — do not edit by hand; edit the .json files next to it
     * and re-run the generator.
     *
     * Every value carries the source it came from and the date it was taken.
     * A metric nobody could measure is absent — never null, never 0.
     */
    type $bog_smalljs_versus_data_value = {
        value: number | boolean;
        /** URL the number can be checked against. */
        source: string;
        /** ISO date the measurement was taken. */
        measured_at: string;
        /** Optional deeper link: the exact run, package page or tooling. */
        method?: string;
    };
    type $bog_smalljs_versus_data_framework = {
        id: string;
        title: string;
        /** Year the canonical repository was created. */
        since?: number;
        since_source?: string;
        /** True only where a live crash-test runner exists. */
        runner?: boolean;
        metrics: Readonly<Record<string, $bog_smalljs_versus_data_value>>;
    };
    type $bog_smalljs_versus_data_metric = {
        category: string;
        title: string;
        unit: string;
        better: 'lower' | 'higher' | 'boolean';
        /** Plain sentence saying why the number matters. */
        human: string;
        /** How the number is obtained, same for every framework. */
        method?: string;
    };
    class $bog_smalljs_versus_data extends $mol_object2 {
        /** Metric descriptions, keyed by metric id. */
        static registry(): Readonly<Record<string, $bog_smalljs_versus_data_metric>>;
        static metric(id: string): $bog_smalljs_versus_data_metric | null;
        /** Every framework, keyed by id. */
        static items(): Readonly<Record<string, $bog_smalljs_versus_data_framework>>;
        /** Every framework, sorted by title. Never throws, never empty-checks. */
        static list(): readonly $bog_smalljs_versus_data_framework[];
        static item(id: string): $bog_smalljs_versus_data_framework | null;
        /** One measurement, or null when this framework has no data for it. */
        static value(framework: string, metric: string): $bog_smalljs_versus_data_value | null;
    }
}

declare namespace $ {

	type $mol_view__dom_name_bog_smalljs_versus_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_search__hint_bog_smalljs_versus_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_search['hint'] >
	>
	type $mol_search__query_bog_smalljs_versus_6 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['query_a'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_search__suggests_bog_smalljs_versus_7 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['suggests_a'] >
		,
		ReturnType< $mol_search['suggests'] >
	>
	type $mol_view__sub_bog_smalljs_versus_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_search__hint_bog_smalljs_versus_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_search['hint'] >
	>
	type $mol_search__query_bog_smalljs_versus_10 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['query_b'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_search__suggests_bog_smalljs_versus_11 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['suggests_b'] >
		,
		ReturnType< $mol_search['suggests'] >
	>
	type $mol_view__sub_bog_smalljs_versus_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_15 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['popular_links'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_17 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_20 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['top_apps_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_22 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_23 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_25 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['top_sites_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_26 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_27 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_33 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_35 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['rating_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_36 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['pager_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_37 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_38 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_39 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_40 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__uri_bog_smalljs_versus_41 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub_bog_smalljs_versus_42 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_43 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_44 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_45 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_46 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_47 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_48 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_49 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_50 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__style_bog_smalljs_versus_51 = $mol_type_enforce<
		({ 
			'width': ReturnType< $bog_smalljs_versus['row_fill_width'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__sub_bog_smalljs_versus_52 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_53 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__arg_bog_smalljs_versus_54 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['pair_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_bog_smalljs_versus_55 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $bog_smalljs_versus_pick__arg_bog_smalljs_versus_56 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['card_arg'] >
		,
		ReturnType< $bog_smalljs_versus_pick['arg'] >
	>
	type $bog_smalljs_versus_pick__sub_bog_smalljs_versus_57 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_smalljs_versus_pick['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_58 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['row_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_59 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_60 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_61 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['row_name_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_versus_pick__arg_bog_smalljs_versus_62 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['row_arg'] >
		,
		ReturnType< $bog_smalljs_versus_pick['arg'] >
	>
	type $bog_smalljs_versus_pick__sub_bog_smalljs_versus_63 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_smalljs_versus_pick['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_64 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_65 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_66 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_smalljs_versus_67 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['page_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__attr_bog_smalljs_versus_68 = $mol_type_enforce<
		({ 
			'bog_smalljs_versus_page_current': ReturnType< $bog_smalljs_versus['page_current'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		,
		ReturnType< $mol_button_minor['attr'] >
	>
	type $mol_button_minor__sub_bog_smalljs_versus_69 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint_bog_smalljs_versus_70 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['page_next_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_smalljs_versus_71 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus['page_next'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_smalljs_versus_72 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_73 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_versus extends $mol_view {
		pick_sync( ): any
		title_text( ): string
		Title( ): $mol_view
		intro_text( ): string
		Intro( ): $mol_view
		Head( ): $mol_view
		query_a( next?: string ): string
		suggests_a( ): readonly(any)[]
		Pick_a( ): $mol_search
		Vs( ): $mol_view
		query_b( next?: string ): string
		suggests_b( ): readonly(any)[]
		Pick_b( ): $mol_search
		Picker( ): $mol_view
		popular_title( ): string
		Popular_title( ): $mol_view
		popular_links( ): readonly(any)[]
		Popular_list( ): $mol_view
		Popular( ): $mol_view
		top_apps_title( ): string
		Top_apps_title( ): $mol_view
		top_apps_note( ): string
		Top_apps_note( ): $mol_view
		top_apps_content( ): readonly(any)[]
		Top_apps_list( ): $mol_view
		Top_apps( ): $mol_view
		top_sites_title( ): string
		Top_sites_title( ): $mol_view
		top_sites_note( ): string
		Top_sites_note( ): $mol_view
		top_sites_content( ): readonly(any)[]
		Top_sites_list( ): $mol_view
		Top_sites( ): $mol_view
		rating_title( ): string
		Rating_title( ): $mol_view
		rating_note( ): string
		Rating_note( ): $mol_view
		rating_head_rank( ): string
		Rating_head_rank( ): $mol_view
		Rating_head_mark( ): $mol_view
		rating_head_name( ): string
		Rating_head_name( ): $mol_view
		rating_head_score( ): string
		Rating_head_score( ): $mol_view
		rating_head_since( ): string
		Rating_head_since( ): $mol_view
		Rating_head( ): $mol_view
		rating_content( ): readonly(any)[]
		Rating_list( ): $mol_view
		pager_content( ): readonly(any)[]
		Pager( ): $mol_view
		Rating( ): $mol_view
		method_title_text( ): string
		Method_title( ): $mol_view
		method_body( ): string
		Method_text( ): $mol_view
		method_link_label( ): string
		Method_link_icon( ): $mol_icon_open_in_new
		Method_link( ): $mol_link
		Method( ): $mol_view
		pair_arg( id: any): Record<string, any>
		pair_left( id: any): string
		Popular_left( id: any): $mol_view
		Popular_mid( id: any): $mol_view
		pair_right( id: any): string
		Popular_right( id: any): $mol_view
		card_arg( id: any): Record<string, any>
		card_mark( id: any): string
		Card_mark( id: any): $mol_view
		card_name( id: any): string
		Card_name( id: any): $mol_view
		row_content( id: any): readonly(any)[]
		rank( id: any): string
		row_mark( id: any): string
		row_name_content( id: any): readonly(any)[]
		row_arg( id: any): Record<string, any>
		row_title( id: any): string
		row_partial_text( id: any): string
		row_fill_width( id: any): string
		Row_fill( id: any): $mol_view
		Row_track( id: any): $mol_view
		row_score_text( id: any): string
		Row_value( id: any): $mol_view
		row_since_text( id: any): string
		page_click( id: any, next?: any ): any
		page_current( id: any): boolean
		page_label( id: any): string
		page_next_hint( ): string
		page_next( next?: any ): any
		page_next_label( ): string
		empty_text( ): string
		framework_title( id: any): string
		vs_text( ): string
		row_partial_template( ): string
		auto( ): readonly(any)[]
		sub( ): readonly(any)[]
		Popular_link( id: any): $mol_link
		Card( id: any): $bog_smalljs_versus_pick
		Row( id: any): $mol_view
		Rank( id: any): $mol_view
		Row_mark( id: any): $mol_view
		Row_name( id: any): $mol_view
		Row_link( id: any): $bog_smalljs_versus_pick
		Row_partial( id: any): $mol_view
		Row_score( id: any): $mol_view
		Row_since( id: any): $mol_view
		Page( id: any): $mol_button_minor
		Page_next( ): $mol_button_minor
		Empty( id: any): $mol_view
	}
	
	export class $bog_smalljs_versus_pick extends $mol_link {
		uri_off( ): ReturnType< $bog_smalljs_versus_pick['uri'] >
	}
	
}

//# sourceMappingURL=versus.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_smalljs_versus extends $.$bog_smalljs_versus {
        data(): typeof $bog_smalljs_versus_data;
        /** Every framework in the catalogue. */
        frameworks(): readonly $bog_smalljs_versus_data_framework[];
        /** Metric descriptions, keyed by metric id. */
        registry(): Readonly<Record<string, $bog_smalljs_versus_data_metric>>;
        /** Human name of a framework id. Also used by the app shell for the
         *  `React vs Vue — $mol` page title, which is why it is declared in the
         *  tree rather than kept private here.
         *
         *  An id nobody wrote a file for is shown capitalized rather than mapped
         *  through a table of hand-written names: a second place where a
         *  framework is named is a second place to keep in step with the data. */
        framework_title(id: string): string;
        metrics_by_category(): Readonly<Record<string, readonly string[]>>;
        categories(): readonly string[];
        /** +1 when `a` is better, -1 when `b` is, 0 when tied or when either side
         *  does not publish the metric — the rule from the section's spec, and
         *  the same one the comparison page scores a category by. */
        compare_metric(metric: string, a: $bog_smalljs_versus_data_framework, b: $bog_smalljs_versus_data_framework): 0 | 1 | -1;
        /** +1 / -1 / 0 for one category of one duel. */
        category_winner(a: $bog_smalljs_versus_data_framework, b: $bog_smalljs_versus_data_framework, category: string): number;
        /** Categories won by each framework against every other one. `key` is a
         *  comma-separated category filter; empty means all of them. */
        scores(key: string): Readonly<Record<string, number>>;
        /** Frameworks ordered by `scores( key )`, ties broken by name so the
         *  order never wobbles between renders. */
        ranked(key: string): readonly $bog_smalljs_versus_data_framework[];
        /** How many of the registry's metrics this framework actually publishes. */
        coverage(id: string): number;
        /** Whether the row deserves a word about how thin its table is. Every
         *  file is missing something, so flagging "incomplete" everywhere would
         *  say nothing; the note appears once less than half the registry is
         *  filled in, where the placing really is standing on little. */
        partial(id: string): boolean;
        row_partial_text(id: string): string;
        /** Field text defaults to whatever the address preselects, so a link like
         *  `section=versus/a=react` opens the section with React already in the
         *  left field. Typing overrides it. */
        query_a(next?: string): string;
        query_b(next?: string): string;
        /** Id behind the text typed in a field, or '' while it matches nothing. */
        query_id(text: string): string;
        /** Titles offered under a field: everything the text is a substring of,
         *  minus whatever the other field already holds. */
        suggest_titles(query: string, exclude: string): string[];
        suggests_a(): string[];
        suggests_b(): string[];
        /** Both fields resolved to different frameworks — open their page. The
         *  reference site has no Compare button either: choosing the second one
         *  is the action.
         *
         *  This cell only *notices*; the address is written by the action below,
         *  reached through `$mol_wire_async` so the write lands outside this
         *  memoized body. Writing `$mol_state_arg` from inside one is the
         *  invalidation loop $mol forbids. The check against the current address
         *  is what keeps a page that renders these very fields from re-triggering
         *  itself once the address already says this. */
        pick_sync(): null;
        /** Navigation proper: a history entry the reader can step back out of. */
        pair_open(a: string, b: string): null;
        popular_links(): $.$mol_link[];
        pair_arg(key: string): {
            section: string;
            a: string;
            b: string;
        };
        pair_left(key: string): string;
        pair_right(key: string): string;
        /** Cards of one top block. The key of a card carries its block, because
         *  the same framework can lead both lists and one view cannot hang in two
         *  places at once. */
        top_content(block: string, categories: readonly string[]): $mol_view[];
        top_apps_content(): $mol_view[];
        top_sites_content(): $mol_view[];
        card_id(key: string): string;
        card_name(key: string): string;
        card_mark(key: string): string;
        /** A card preselects its framework in the left field: there is no page
         *  for a single framework, the section is about pairs. */
        card_arg(key: string): {
            section: string;
            a: string;
            b: null;
        };
        rating_rows(): readonly $bog_smalljs_versus_data_framework[];
        ranks(): Readonly<Record<string, number>>;
        rating_content(): $mol_view[];
        row_content(id: string): $mol_view[];
        row_name_content(id: string): $mol_view[];
        rank(id: string): string;
        row_mark(id: string): string;
        row_title(id: string): string;
        row_arg(id: string): {
            section: string;
            a: string;
            b: null;
        };
        row_score_text(id: string): string;
        row_fill_width(id: string): string;
        row_since_text(id: string): string;
        page(next?: number): number;
        pages(): number;
        /** Clamped, so shrinking data cannot leave the view on a page that is no
         *  longer there. */
        page_current_index(): number;
        pager_content(): readonly $mol_view[];
        page_label(key: string): string;
        page_current(key: string): boolean;
        page_click(key: string, event?: Event): null;
        page_next(event?: Event): null;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_view__sub_bog_smalljs_lab_1 = $mol_type_enforce<
		ReturnType< $bog_smalljs_lab['race_options'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_lab_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_lab_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_lab_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows_bog_smalljs_lab_5 = $mol_type_enforce<
		ReturnType< $bog_smalljs_lab['virtual_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_bog_smalljs_lab_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_view__sub_bog_smalljs_lab_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_lab_8 = $mol_type_enforce<
		ReturnType< $bog_smalljs_lab['leak_probes'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_lab_9 = $mol_type_enforce<
		ReturnType< $bog_smalljs_lab['crash_cards'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_scroll__sub_bog_smalljs_lab_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_view__sub_bog_smalljs_lab_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_lab_option__click_bog_smalljs_lab_12 = $mol_type_enforce<
		ReturnType< $bog_smalljs_lab['race_option_click'] >
		,
		ReturnType< $bog_smalljs_lab_option['click'] >
	>
	type $bog_smalljs_lab_option__current_bog_smalljs_lab_13 = $mol_type_enforce<
		ReturnType< $bog_smalljs_lab['race_option_current'] >
		,
		ReturnType< $bog_smalljs_lab_option['current'] >
	>
	type $bog_smalljs_lab_option__title_bog_smalljs_lab_14 = $mol_type_enforce<
		ReturnType< $bog_smalljs_lab['race_option_label'] >
		,
		ReturnType< $bog_smalljs_lab_option['title'] >
	>
	type $mol_view__sub_bog_smalljs_lab_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_paragraph__title_bog_smalljs_lab_16 = $mol_type_enforce<
		ReturnType< $bog_smalljs_lab['virtual_row_text'] >
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_view__sub_bog_smalljs_lab_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_lab_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_lab_probe__label_bog_smalljs_lab_19 = $mol_type_enforce<
		ReturnType< $bog_smalljs_lab['leak_probe_label'] >
		,
		ReturnType< $bog_smalljs_lab_probe['label'] >
	>
	type $mol_view__sub_bog_smalljs_lab_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_lab_card__name_bog_smalljs_lab_21 = $mol_type_enforce<
		ReturnType< $bog_smalljs_lab['crash_card_name'] >
		,
		ReturnType< $bog_smalljs_lab_card['name'] >
	>
	type $bog_smalljs_lab_card__text_bog_smalljs_lab_22 = $mol_type_enforce<
		ReturnType< $bog_smalljs_lab['crash_card_text'] >
		,
		ReturnType< $bog_smalljs_lab_card['text'] >
	>
	export class $bog_smalljs_lab extends $mol_view {
		mol_theme( ): string
		case_content( ): readonly(any)[]
		race_options( ): readonly(any)[]
		Race_options( ): $mol_view
		race_panel_name( ): string
		Race_panel_name( ): $mol_view
		race_panel_descr( ): string
		Race_panel_descr( ): $mol_view
		Race_panel( ): $mol_view
		race_option_click( id: any, next?: any ): any
		race_option_current( id: any): boolean
		race_option_label( id: any): string
		virtual_rows( ): readonly(any)[]
		Virtual_list( ): $mol_list
		Virtual_scroll( ): $mol_scroll
		virtual_row_text( id: any): string
		virtual_placeholder( ): string
		leak_hint( ): string
		Leak_hint( ): $mol_view
		leak_probes( ): readonly(any)[]
		Leak_place( ): $mol_view
		leak_probe_label( id: any): string
		crash_cards( ): readonly(any)[]
		Crash_list( ): $mol_view
		Crash_scroll( ): $mol_scroll
		crash_card_name( id: any): string
		crash_card_text( id: any): string
		lights( next?: string ): string
		attr( ): ({ 
			'versus_lights': ReturnType< $bog_smalljs_lab['lights'] >,
			'mol_theme': ReturnType< $bog_smalljs_lab['mol_theme'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): ReturnType< $bog_smalljs_lab['case_content'] >
		Race( ): $mol_view
		Race_option( id: any): $bog_smalljs_lab_option
		Virtual( ): $mol_view
		Virtual_row( id: any): $mol_paragraph
		Virtual_placeholder( ): $mol_view
		Leak( ): $mol_view
		Leak_probe( id: any): $bog_smalljs_lab_probe
		Crash( ): $mol_view
		Crash_card( id: any): $bog_smalljs_lab_card
	}
	
	export class $bog_smalljs_lab_option extends $mol_button_minor {
		current( ): boolean
		attr( ): ({ 
			'versus_current': ReturnType< $bog_smalljs_lab_option['current'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
	}
	
	export class $bog_smalljs_lab_probe extends $mol_view {
		label( ): string
		sub( ): readonly(any)[]
	}
	
	export class $bog_smalljs_lab_card extends $mol_view {
		name( ): string
		text( ): string
		attr( ): ({ 
			'versus_card': string,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=lab.view.tree.d.ts.map
declare namespace $ {
    /**
     * Shared store with a plain list of subscribers. Same shape in every runner
     * of the comparison, so that `subscribers.length` means the same thing.
     */
    class $bog_smalljs_lab_store extends $mol_object {
        subscribers: (() => void)[];
        static shared(): $bog_smalljs_lab_store;
        subscribe(handler: () => void): $bog_smalljs_lab_link;
    }
    /**
     * Reports whether a node is inside the viewport. An observer with no root of
     * its own measures against the top level viewport even from a nested frame,
     * which is what makes a scrolled away frame detectable from the inside.
     */
    class $bog_smalljs_lab_watch extends $mol_object {
        readonly observer: IntersectionObserver;
        constructor(node: Element, handler: (visible: boolean) => void);
        destructor(): void;
    }
    /**
     * Handle of a single subscription. It is created inside a reactive cell of
     * the subscribing component, so the engine drops it together with that
     * component and the store forgets the handler without a manual call.
     */
    class $bog_smalljs_lab_link extends $mol_object {
        readonly store: $bog_smalljs_lab_store;
        readonly handler: () => void;
        constructor(store: $bog_smalljs_lab_store, handler: () => void);
        destructor(): void;
    }
}
declare namespace $.$$ {
    type Metric = {
        name: string;
        value: number;
        unit: string;
    };
    type Status = 'ok' | 'warn' | 'fail';
    export class $bog_smalljs_lab extends $.$bog_smalljs_lab {
        /** Scenario to mount, taken from the query of the page the iframe loads. */
        case_id(): string;
        case_content(): readonly $mol_view[];
        auto(): ($mol_after_tick | $mol_dom_listener | $bog_smalljs_lab_watch)[];
        message_listener(): $mol_dom_listener;
        hidden(): boolean;
        visibility_listener(): $mol_dom_listener;
        /** A frame scrolled out of the viewport stops being given animation
         *  frames, which would otherwise look like the framework hanging. */
        frame_watch(): $bog_smalljs_lab_watch;
        /** Why the current run stopped being trustworthy, empty while it still
         *  is. The first reason wins: it is the one that actually spoiled the
         *  measurement, the rest are its consequences. */
        spoil_reason(next?: string): string;
        spoil(reason: string): void;
        spoiled(): string;
        /** Announces the mounted scenario once the first render is over. */
        ready_beacon(): $mol_after_tick;
        post(message: Record<string, unknown>): void;
        message_receive(event: MessageEvent): void;
        /** The page hands its theme over instead of putting it in the query: a
         *  different src reloads the runner and throws away the result of a run
         *  already made, while the reader may switch themes at any moment,
         *  including after Run. Anything other than `dark` reads as light, so an
         *  unknown value leaves the frame legible rather than blank. */
        theme_receive(packet: {
            lights?: unknown;
        }): void;
        /** Pins the built-in $mol parts — hover, focus ring, scrollbars — to the
         *  same side of the theme as the runner's own palette. Without it they
         *  follow the operating system rather than the site, and a reader with a
         *  light system reading the site in dark gets pale scrollbars on a dark
         *  list. */
        mol_theme(): "$mol_theme_light" | "$mol_theme_dark";
        run(): Promise<void>;
        reset(): null;
        report(status: Status, observed: string, metrics?: readonly Metric[]): void;
        /** Nothing measured is worth reporting, and the page should say why
         *  rather than hold on to the verdict of an earlier run. */
        report_invalid(reason: string): void;
        sleep(delay: number): Promise<void>;
        /** Waits for one animation frame. A hidden tab and a frame scrolled out of
         *  the viewport are never given one, so the wait also ends once the run
         *  is spoiled — otherwise it would hang forever and could not even report
         *  why it gave up. */
        frame(): Promise<void>;
        race_ids(): number[];
        race_selected(next?: number): number;
        race_options(): readonly $mol_view[];
        race_option_label(id: number): string;
        race_option_current(id: number): boolean;
        race_option_click(id: number, next?: unknown): null;
        race_delay(id: number): number;
        race_load(id: number): Promise<{
            name: string;
            descr: string;
        }>;
        /** The record is a value of the selected id. A record for an id nobody
         *  looks at any more has no place to land. */
        race_user(id: number): {
            name: string;
            descr: string;
        };
        /** The empty state carries the same words as the React and Vue runners.
         *  The three frames are read side by side, and a column that is silent
         *  where the others speak looks like a column that failed to load. */
        race_panel_name(): string;
        race_panel_descr(): string;
        /** The two waits add up to 1600 ms. Past this the machine was stretching
         *  timers, and stretched timers pull the 200 ms and 1000 ms answers
         *  towards each other until the order of arrival is a coin toss. */
        race_deadline(): number;
        run_race(): Promise<void>;
        virtual_count(): number;
        virtual_filled(next?: boolean): boolean;
        virtual_rows(): readonly $mol_view[];
        virtual_row_text(index: number): string;
        run_virtual(): Promise<void>;
        leak_count(): number;
        leak_cycle(next?: number): number;
        leak_mounted(next?: boolean): boolean;
        leak_probes(): readonly $mol_view[];
        leak_probe_label(cycle: number): string;
        run_leak(): Promise<void>;
        crash_count(): number;
        /** Zero based index of the card whose record is replaced with null. */
        crash_broken_index(): number;
        crash_broken(next?: boolean): boolean;
        crash_records(): readonly ({
            name: string;
            text: string;
        } | null)[];
        crash_cards(): readonly $mol_view[];
        crash_card_name(index: number): string;
        crash_card_text(index: number): string;
        run_crash(): Promise<void>;
    }
    export class $bog_smalljs_lab_probe extends $.$bog_smalljs_lab_probe {
        /** Subscription lives in a cell of this component, so it is released
         *  together with the component. There is no teardown hook to forget. */
        subscription(): $bog_smalljs_lab_link;
        auto(): $bog_smalljs_lab_link[];
    }
    export {};
}

declare namespace $ {
}

declare namespace $ {
    /** One scenario as it is written in one runner. */
    type $bog_smalljs_versus_code_snippet = {
        readonly lang: string;
        readonly file: string;
        readonly text: string;
    };
    /**
     * Source of every crash-test scenario, per case and per framework.
     *
     * Generated by `versus/code/gen.cjs` from the runners themselves — never
     * edit by hand. The page shows this next to the frames that just ran, so a
     * snippet that had drifted from the executed code would be worse than no
     * snippet at all.
     */
    const $bog_smalljs_versus_code_data: Readonly<Record<string, Readonly<Record<string, $bog_smalljs_versus_code_snippet>>>>;
}

declare namespace $ {

	type $mol_view__sub_bog_smalljs_versus_code_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_code_2 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_code['columns'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__uri_bog_smalljs_versus_code_3 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_code['column_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub_bog_smalljs_versus_code_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_code_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_code_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_code_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_expander__title_bog_smalljs_versus_code_8 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_code['title'] >
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content_bog_smalljs_versus_code_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	type $mol_view__sub_bog_smalljs_versus_code_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_code_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_versus_code extends $mol_view {
		body( ): readonly(any)[]
		Hint( ): $mol_view
		columns( ): readonly(any)[]
		Columns( ): $mol_view
		column_name( id: any): string
		column_uri( id: any): string
		column_file( id: any): string
		Column_file( id: any): $mol_link
		Column_head( id: any): $mol_view
		column_text( id: any): string
		Column_code( id: any): $mol_view
		missing_text( ): string
		case_id( ): string
		left( ): string
		right( ): string
		title( ): string
		hint( ): string
		missing( ): string
		sub( ): ReturnType< $bog_smalljs_versus_code['body'] >
		Expander( ): $mol_expander
		Column( id: any): $mol_view
		Missing( ): $mol_view
	}
	
}

//# sourceMappingURL=code.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * The two implementations of one crash-test scenario, side by side, under the
     * frames that just ran them.
     *
     * This is the whole answer to "readability" in the comparison, and it is
     * deliberately not a number. Nobody can defend a readability score, and a
     * reader who disagrees with one has no way to check it; two blocks of code
     * next to each other need no defending, because the reader is looking at the
     * evidence rather than at our reading of it.
     *
     * Collapsed by default. The section argues by behaviour first — the frames
     * above have already shown what happens — and the code is there for whoever
     * asks why, not as a wall to get past on the way down the page.
     */
    class $bog_smalljs_versus_code extends $.$bog_smalljs_versus_code {
        snippets(): Readonly<Record<string, $bog_smalljs_versus_code_snippet>>;
        /** Sides that actually have a runner, in the pair's own order. A framework
         *  nobody wrote a scenario for is left out rather than shown empty: an
         *  empty column reads as "this framework needs no code", which is the
         *  opposite of the truth. */
        sides(): string[];
        columns(): $mol_view[];
        snippet(id: string): $bog_smalljs_versus_code_snippet;
        column_name(id: string): string;
        column_text(id: string): string;
        column_file(id: string): string;
        /** Straight at the file the snippet was lifted from, so "generated from
         *  the runners" is a claim the reader can check in one click. */
        column_uri(id: string): string;
        missing_text(): string;
        /** What the block is made of. Built as a list rather than by returning
         *  null from a factory: the tree is where a $mol component declares what
         *  it can contain, and switching a child off by type fights that.
         *
         *  Nothing at all when neither side has a runner — a disclosure that
         *  opens onto nothing is worse than no disclosure. */
        body(): readonly $mol_view[];
    }
}

declare namespace $.$$ {
}

declare namespace $ {

	type $mol_view__sub_bog_smalljs_versus_case_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_4 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['controls_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_5 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['columns'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_versus_case_frame__uri_bog_smalljs_versus_case_7 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['frame_uri'] >
		,
		ReturnType< $bog_smalljs_versus_case_frame['uri'] >
	>
	type $bog_smalljs_versus_case_frame__frame_title_bog_smalljs_versus_case_8 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['frame_title'] >
		,
		ReturnType< $bog_smalljs_versus_case_frame['frame_title'] >
	>
	type $bog_smalljs_versus_case_frame__loaded_bog_smalljs_versus_case_9 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['frame_loaded'] >
		,
		ReturnType< $bog_smalljs_versus_case_frame['loaded'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_10 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['card_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_major__enabled_bog_smalljs_versus_case_13 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['run_enabled'] >
		,
		ReturnType< $mol_button_major['enabled'] >
	>
	type $mol_button_major__click_bog_smalljs_versus_case_14 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['run'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub_bog_smalljs_versus_case_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_versus_case_status__status_bog_smalljs_versus_case_18 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['status'] >
		,
		ReturnType< $bog_smalljs_versus_case_status['status'] >
	>
	type $bog_smalljs_versus_case_status__icon_bog_smalljs_versus_case_19 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['status_icon'] >
		,
		ReturnType< $bog_smalljs_versus_case_status['icon'] >
	>
	type $bog_smalljs_versus_case_status__text_bog_smalljs_versus_case_20 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['status_text'] >
		,
		ReturnType< $bog_smalljs_versus_case_status['text'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_22 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_case['metric_rows'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_23 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_versus_case extends $mol_view {
		Title( ): $mol_view
		Hint( ): $mol_view
		Head( ): $mol_view
		controls_content( ): readonly(any)[]
		Controls( ): $mol_view
		columns( ): readonly(any)[]
		Columns( ): $mol_view
		run_enabled( ): boolean
		run( next?: any ): any
		run_label( ): string
		run_hint( ): string
		framework_name( id: any): string
		Label( id: any): $mol_view
		frame_uri( id: any): string
		frame_title( id: any): string
		frame_loaded( id: any, next?: any ): any
		Frame( id: any): $bog_smalljs_versus_case_frame
		card_content( id: any): readonly(any)[]
		Card( id: any): $mol_view
		status( id: any): string
		status_icon( id: any): string
		status_text( id: any): string
		observed( id: any): string
		metric_rows( id: any): readonly(any)[]
		metric_name( id: any): string
		Metric_name( id: any): $mol_view
		metric_value( id: any): string
		Metric_value( id: any): $mol_view
		note( id: any): string
		case_id( ): string
		lights( ): string
		title( ): string
		hint( ): string
		status_idle( ): string
		status_running( ): string
		status_ok( ): string
		status_warn( ): string
		status_fail( ): string
		status_error( ): string
		status_invalid( ): string
		error_timeout( ): string
		error_not_loaded( ): string
		run_hint_broken( ): string
		invalid_tab_hidden( ): string
		invalid_timers_throttled( ): string
		invalid_frame_offscreen( ): string
		invalid_other( ): string
		run_hint_hidden( ): string
		run_hint_loading( ): string
		sub( ): readonly(any)[]
		Run( ): $mol_button_major
		Run_hint( ): $mol_view
		Column( id: any): $mol_view
		Status( id: any): $bog_smalljs_versus_case_status
		Observed( id: any): $mol_view
		Metrics( id: any): $mol_view
		Metric( id: any): $mol_view
		Note( id: any): $mol_view
	}
	
	type $mol_view__sub_bog_smalljs_versus_case_status_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_case_status_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_versus_case_status extends $mol_view {
		Icon( ): $mol_view
		Text( ): $mol_view
		status( ): string
		icon( ): string
		text( ): string
		attr( ): ({ 
			'bog_smalljs_versus_status': ReturnType< $bog_smalljs_versus_case_status['status'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
	export class $bog_smalljs_versus_case_frame extends $mol_view {
		loaded( next?: any ): any
		dom_name( ): string
		uri( ): string
		frame_title( ): string
		sub( ): readonly(any)[]
		event( ): ({ 
			load( next?: ReturnType< $bog_smalljs_versus_case_frame['loaded'] > ): ReturnType< $bog_smalljs_versus_case_frame['loaded'] >,
		})  & ReturnType< $mol_view['event'] >
		attr( ): ({ 
			'src': ReturnType< $bog_smalljs_versus_case_frame['uri'] >,
			'title': ReturnType< $bog_smalljs_versus_case_frame['frame_title'] >,
			'loading': string,
		})  & ReturnType< $mol_view['attr'] >
	}
	
}

//# sourceMappingURL=case.view.tree.d.ts.map
declare namespace $.$$ {
    /** `idle` and `running` are states of the block, the rest come off the wire.
     *  `error` means the runner broke and there is nothing to read; `invalid`
     *  means it ran but the conditions made the numbers worthless. They are kept
     *  apart on purpose — only one of the two is the reader's fault to fix. */
    type Status = 'idle' | 'running' | 'ok' | 'warn' | 'fail' | 'error' | 'invalid';
    type Metric = {
        name: string;
        value: string;
    };
    type Result = {
        status: Status;
        observed: string;
        metrics: readonly Metric[];
    };
    export class $bog_smalljs_versus_case extends $.$bog_smalljs_versus_case {
        frameworks(): readonly string[];
        columns(): $mol_view[];
        framework_name(id: string): string;
        frame_title(id: string): string;
        /** Path of the page itself. Split out so the base below can be checked
         *  without a browser. */
        location_path(): string;
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
        site_base(): string;
        frame_uri(id: string): string;
        /** Latest thing every column has to say. Written by run(), by the message
         *  handler and by the countdown, read by everything below. */
        result(id: string, next?: Result): Result;
        status(id: string): Status;
        status_icon(id: string): string;
        status_text(id: string): string;
        observed(id: string): string;
        /** One neutral state, one line per reason. A reason this build has never
         *  heard of gets the general wording rather than being pushed into an
         *  error: the protocol is expected to grow, and a runner reporting an
         *  unmeasurable run is doing its job, not failing at it. */
        invalid_text(reason: unknown): string;
        note(id: string): string;
        metric_ids(id: string): string[];
        metric_rows(id: string): $mol_view[];
        metric(key: string): Metric | undefined;
        metric_name(key: string): string;
        metric_value(key: string): string;
        /** Rows of the result card, skipping the ones with nothing to show —
         *  an empty view would still take a gap in the column. */
        card_content(id: string): ($mol_view | $bog_smalljs_versus_case_status)[];
        controls_content(): $mol_view[];
        /** Every runner reports `ready` once its scenario is mounted. Until all
         *  three have, a run would post into a frame that cannot answer. */
        ready(id: string, next?: boolean): boolean;
        frames_ready(): boolean;
        /** Whether the frame's document finished loading, whatever it turned out
         *  to be. A 404 is still a document, so this fires for a missing runner
         *  too — which is exactly what makes it usable as the starting gun for
         *  the greeting countdown below. */
        frame_settled(id: string, next?: boolean): boolean;
        frame_loaded(id: string, next?: unknown): null;
        /** Grades a frame that loaded something but never introduced itself.
         *  Without this the column would sit on "Not run yet" for good and Run
         *  would stay disabled with no hint of which frame is holding it up —
         *  the 15 s answer timeout never gets a chance, because a run cannot
         *  start in the first place. Disarms itself the moment `ready` lands. */
        ready_watchdog(id: string): $mol_after_timeout | null;
        ready_expire(id: string): null;
        /** Frames that answered with nothing runnable. */
        frames_broken(): boolean;
        /** Whether the tab is in front. A background tab clamps setTimeout to
         *  about a second and never fires requestAnimationFrame, which turns every
         *  scenario here into a coin toss, so runs do not start in one. */
        page_visible(next?: boolean): boolean;
        visibility_sync(): null;
        run_enabled(): boolean;
        /** Why Run is not available, when it is not. The broken case comes before
         *  the loading one: a frame that will never load is still "not ready",
         *  and telling the reader to wait for it would be a lie. */
        run_hint(): string;
        /** Bumped on every Run, so a countdown armed by an earlier run cannot
         *  touch the results of a later one. */
        run_id(next?: number): number;
        run(): null;
        /** Countdown for the answers of the current run. It lives in a cell of its
         *  own rather than being started from run(): a fiber spawned inside an
         *  action is owned by that action and dies with it, taking its timer along.
         *  Re-arming needs no code — the cell depends on run_id, so the next Run
         *  drops this timer and creates the next one. Returned from the cell and
         *  read through auto(), otherwise it would be destroyed on creation. */
        watchdog(): $mol_after_timeout | null;
        expire(run_id: number): null;
        frame_window(id: string): Window | null;
        post(id: string, message: unknown): void;
        /** Theme the frames have to paint themselves in, normalised to the two
         *  values the protocol carries. */
        frame_lights(): "light" | "dark";
        /** Hands the site's theme to every frame that has already introduced
         *  itself. Sent as a message and never as a query parameter: changing a
         *  frame's src reloads the runner and throws away the result of a run
         *  already made, while the reader is free to flip the theme long after
         *  pressing Run.
         *
         *  Reading ready() per frame is what makes the late ones work — a frame
         *  that finishes loading after a theme switch is caught up the moment it
         *  says hello, instead of staying in whatever theme the page had when it
         *  started loading. */
        theme_broadcast(): null;
        message_listener(): $mol_dom_listener;
        visibility_listener(): $mol_dom_listener;
        auto(): ($mol_after_timeout | $mol_dom_listener | null)[];
        message_receive(event?: MessageEvent): void;
    }
    export {};
}

declare namespace $ {
}

declare namespace $ {
    /** One entry of the metric registry: what a metric is called, which direction
     *  is better, the sentence that turns the number into something a reader can
     *  act on, and how the number was obtained. */
    type $bog_smalljs_versus_pair_meta = $bog_smalljs_versus_data_metric;
    /** One measurement. There is no entry for a metric nobody measured — absence
     *  is how "we do not know" is written down, so nothing here is ever a
     *  placeholder zero. */
    type $bog_smalljs_versus_pair_measure = $bog_smalljs_versus_data_value;
    type $bog_smalljs_versus_pair_framework = $bog_smalljs_versus_data_framework;
    /**
     * Reading side of `versus/data`.
     *
     * The measurements themselves live in `$bog_smalljs_versus_data`, generated
     * from the JSON files next to it and compiled into the bundle. This sits in
     * front of them and answers the questions a page actually asks — what is this
     * framework called, what does it report for this metric, which metrics belong
     * to this category — with answers that hold even when the id is one nobody
     * has written a file for.
     *
     * That last part is the whole point of the layer. A framework with no data is
     * a normal state of this section, not an error: ids arrive from the URL, and
     * the roster grows one file at a time. So an unknown id resolves to a
     * framework with no metrics rather than to null, and every page above renders
     * the same dash it renders for a metric that was never measured.
     */
    class $bog_smalljs_versus_pair_data extends $mol_object2 {
        static source(): typeof $bog_smalljs_versus_data;
        /** Whether anything at all is on file for this id. Tells "we have no file
         *  for this framework" apart from "we have a file and it is thin". */
        static known(id: string): boolean;
        /** Never null, so nothing above has to branch on an id it got from a URL.
         *  An unknown one comes back with no metrics and no runner, which is the
         *  truth about it. */
        static framework(id: string): $bog_smalljs_versus_pair_framework;
        static registry(): Readonly<Record<string, $bog_smalljs_versus_data_metric>>;
        /** Display name. An id with no file keeps the id: a name nobody wrote
         *  down is as made up as a number nobody measured. */
        static title(id: string): string;
        static measure(id: string, metric: string): $bog_smalljs_versus_pair_measure | null;
        static meta(metric: string): $bog_smalljs_versus_pair_meta | null;
        /** Metric ids of a category, in the order the registry lists them. Pages
         *  reorder them by their own canonical list and append whatever they do
         *  not know about, so a metric added to the registry alone still reaches
         *  the reader. */
        static category_metrics(category: string): readonly string[];
    }
}

declare namespace $ {
    /** Which of the two sides a metric favours. `none` means the metric was not
     *  compared at all — one side has no reading, or the two readings are of
     *  kinds that cannot be put on the same scale. It never means "equal": that
     *  is `tie`, and a tie is a result. */
    type $bog_smalljs_versus_pair_side = 'left' | 'right' | 'tie' | 'none';
    type $bog_smalljs_versus_pair_diff = {
        readonly side: $bog_smalljs_versus_pair_side;
        /** Share of the bar that belongs to the left side, 0..1, where a bigger
         *  share always means the better value whichever way the metric points.
         *  Null when no honest bar can be drawn — a yes/no metric, a negative
         *  value, a pair that is not numeric. */
        readonly share: number | null;
        /** How far the losing value sits from the winning one, always measured
         *  against the loser so the base of the percentage is never ambiguous:
         *  percent below the loser for a lower-is-better metric, percent above it
         *  for a higher-is-better one. */
        readonly percent: number | null;
        /** The same distance as a multiplier. Used instead of the percentage once
         *  the gap passes a doubling, where "400% above" stops reading as a
         *  quantity and starts reading as a slogan. */
        readonly times: number | null;
    };
    /**
     * Compares one metric for the two sides of a pair. Pure, so the scoring rule
     * can be read and tested without a page around it.
     */
    class $bog_smalljs_versus_pair_compare extends $mol_object2 {
        /** Whether a value can take part in a comparison at all. A string reading
         *  is displayable but not rankable, so it is shown and left unscored. */
        static rankable(better: string, value: unknown): boolean;
        static diff(better: string, left: unknown, right: unknown): $bog_smalljs_versus_pair_diff;
        /** Left's share of the bar. Both sides are put on one track so the eye
         *  reads the ratio rather than two lengths it has to hold at once; the
         *  track is flipped for a lower-is-better metric, so the longer half is
         *  always the better one and the bar means the same thing in every row.
         *  A negative reading is refused rather than folded in — it would make
         *  the two halves add up to something other than the whole, and a bar
         *  that lies about proportion is worse than no bar. */
        static share(lower_wins: boolean, a: number, b: number): number | null;
        /** Distance between the two readings, stated against the losing side. */
        static distance(lower_wins: boolean, a: number, b: number): {
            percent: null;
            times: null;
        } | {
            percent: number;
            times: null;
        } | {
            percent: number;
            times: number;
        };
    }
}

declare namespace $ {

	type $mol_view__sub_bog_smalljs_versus_pair_1 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['head_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_2 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['sections'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_pair_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__uri_bog_smalljs_versus_pair_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_versus_pair_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_link__sub_bog_smalljs_versus_pair_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_pair_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_string__value_bog_smalljs_versus_pair_13 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['suggest_name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_bog_smalljs_versus_pair_14 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_link__uri_bog_smalljs_versus_pair_15 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['suggest_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_versus_pair_16 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_link__sub_bog_smalljs_versus_pair_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_pair_20 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_23 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_versus_pair_section__title_bog_smalljs_versus_pair_24 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['section_title'] >
		,
		ReturnType< $bog_smalljs_versus_pair_section['title'] >
	>
	type $bog_smalljs_versus_pair_section__score_bog_smalljs_versus_pair_25 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['section_score'] >
		,
		ReturnType< $bog_smalljs_versus_pair_section['score'] >
	>
	type $bog_smalljs_versus_pair_section__note_bog_smalljs_versus_pair_26 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['section_note'] >
		,
		ReturnType< $bog_smalljs_versus_pair_section['note'] >
	>
	type $bog_smalljs_versus_pair_section__content_bog_smalljs_versus_pair_27 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['section_content'] >
		,
		ReturnType< $bog_smalljs_versus_pair_section['content'] >
	>
	type $bog_smalljs_versus_pair_names__left_name_bog_smalljs_versus_pair_28 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['left_title'] >
		,
		ReturnType< $bog_smalljs_versus_pair_names['left_name'] >
	>
	type $bog_smalljs_versus_pair_names__right_name_bog_smalljs_versus_pair_29 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['right_title'] >
		,
		ReturnType< $bog_smalljs_versus_pair_names['right_name'] >
	>
	type $bog_smalljs_versus_pair_metric__title_bog_smalljs_versus_pair_30 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['metric_title'] >
		,
		ReturnType< $bog_smalljs_versus_pair_metric['title'] >
	>
	type $bog_smalljs_versus_pair_metric__left_value_bog_smalljs_versus_pair_31 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['metric_left_value'] >
		,
		ReturnType< $bog_smalljs_versus_pair_metric['left_value'] >
	>
	type $bog_smalljs_versus_pair_metric__right_value_bog_smalljs_versus_pair_32 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['metric_right_value'] >
		,
		ReturnType< $bog_smalljs_versus_pair_metric['right_value'] >
	>
	type $bog_smalljs_versus_pair_metric__bar_bog_smalljs_versus_pair_33 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['metric_bar'] >
		,
		ReturnType< $bog_smalljs_versus_pair_metric['bar'] >
	>
	type $bog_smalljs_versus_pair_metric__lead_bog_smalljs_versus_pair_34 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['metric_lead'] >
		,
		ReturnType< $bog_smalljs_versus_pair_metric['lead'] >
	>
	type $bog_smalljs_versus_pair_metric__left_share_bog_smalljs_versus_pair_35 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['metric_left_share'] >
		,
		ReturnType< $bog_smalljs_versus_pair_metric['left_share'] >
	>
	type $bog_smalljs_versus_pair_metric__right_share_bog_smalljs_versus_pair_36 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['metric_right_share'] >
		,
		ReturnType< $bog_smalljs_versus_pair_metric['right_share'] >
	>
	type $bog_smalljs_versus_pair_metric__delta_bog_smalljs_versus_pair_37 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['metric_delta'] >
		,
		ReturnType< $bog_smalljs_versus_pair_metric['delta'] >
	>
	type $bog_smalljs_versus_pair_metric__human_bog_smalljs_versus_pair_38 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['metric_human'] >
		,
		ReturnType< $bog_smalljs_versus_pair_metric['human'] >
	>
	type $bog_smalljs_versus_pair_metric__method_bog_smalljs_versus_pair_39 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['metric_method'] >
		,
		ReturnType< $bog_smalljs_versus_pair_metric['method'] >
	>
	type $bog_smalljs_versus_pair_metric__sources_bog_smalljs_versus_pair_40 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['metric_sources'] >
		,
		ReturnType< $bog_smalljs_versus_pair_metric['sources'] >
	>
	type $bog_smalljs_versus_pair_source__name_bog_smalljs_versus_pair_41 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['source_name'] >
		,
		ReturnType< $bog_smalljs_versus_pair_source['name'] >
	>
	type $bog_smalljs_versus_pair_source__label_bog_smalljs_versus_pair_42 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['source_label'] >
		,
		ReturnType< $bog_smalljs_versus_pair_source['label'] >
	>
	type $bog_smalljs_versus_pair_source__uri_bog_smalljs_versus_pair_43 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['source_uri'] >
		,
		ReturnType< $bog_smalljs_versus_pair_source['uri'] >
	>
	type $bog_smalljs_versus_pair_source__date_bog_smalljs_versus_pair_44 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['source_date'] >
		,
		ReturnType< $bog_smalljs_versus_pair_source['date'] >
	>
	type $bog_smalljs_versus_pair_case__case_id_bog_smalljs_versus_pair_45 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['case_id'] >
	>
	type $bog_smalljs_versus_pair_case__title_bog_smalljs_versus_pair_46 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['title'] >
	>
	type $bog_smalljs_versus_pair_case__hint_bog_smalljs_versus_pair_47 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['hint'] >
	>
	type $bog_smalljs_versus_pair_case__left_bog_smalljs_versus_pair_48 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['left'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['left'] >
	>
	type $bog_smalljs_versus_pair_case__right_bog_smalljs_versus_pair_49 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['right'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['right'] >
	>
	type $bog_smalljs_versus_pair_case__lights_bog_smalljs_versus_pair_50 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['lights'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['lights'] >
	>
	type $bog_smalljs_versus_pair_case__missing_note_bog_smalljs_versus_pair_51 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['edge_missing_note'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['missing_note'] >
	>
	type $bog_smalljs_versus_pair_case__case_id_bog_smalljs_versus_pair_52 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['case_id'] >
	>
	type $bog_smalljs_versus_pair_case__title_bog_smalljs_versus_pair_53 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['title'] >
	>
	type $bog_smalljs_versus_pair_case__hint_bog_smalljs_versus_pair_54 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['hint'] >
	>
	type $bog_smalljs_versus_pair_case__left_bog_smalljs_versus_pair_55 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['left'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['left'] >
	>
	type $bog_smalljs_versus_pair_case__right_bog_smalljs_versus_pair_56 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['right'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['right'] >
	>
	type $bog_smalljs_versus_pair_case__lights_bog_smalljs_versus_pair_57 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['lights'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['lights'] >
	>
	type $bog_smalljs_versus_pair_case__missing_note_bog_smalljs_versus_pair_58 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['edge_missing_note'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['missing_note'] >
	>
	type $bog_smalljs_versus_pair_case__case_id_bog_smalljs_versus_pair_59 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['case_id'] >
	>
	type $bog_smalljs_versus_pair_case__title_bog_smalljs_versus_pair_60 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['title'] >
	>
	type $bog_smalljs_versus_pair_case__hint_bog_smalljs_versus_pair_61 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['hint'] >
	>
	type $bog_smalljs_versus_pair_case__left_bog_smalljs_versus_pair_62 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['left'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['left'] >
	>
	type $bog_smalljs_versus_pair_case__right_bog_smalljs_versus_pair_63 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['right'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['right'] >
	>
	type $bog_smalljs_versus_pair_case__lights_bog_smalljs_versus_pair_64 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['lights'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['lights'] >
	>
	type $bog_smalljs_versus_pair_case__missing_note_bog_smalljs_versus_pair_65 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['edge_missing_note'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['missing_note'] >
	>
	type $bog_smalljs_versus_pair_case__case_id_bog_smalljs_versus_pair_66 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['case_id'] >
	>
	type $bog_smalljs_versus_pair_case__title_bog_smalljs_versus_pair_67 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['title'] >
	>
	type $bog_smalljs_versus_pair_case__hint_bog_smalljs_versus_pair_68 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_pair_case['hint'] >
	>
	type $bog_smalljs_versus_pair_case__left_bog_smalljs_versus_pair_69 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['left'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['left'] >
	>
	type $bog_smalljs_versus_pair_case__right_bog_smalljs_versus_pair_70 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['right'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['right'] >
	>
	type $bog_smalljs_versus_pair_case__lights_bog_smalljs_versus_pair_71 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['lights'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['lights'] >
	>
	type $bog_smalljs_versus_pair_case__missing_note_bog_smalljs_versus_pair_72 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['edge_missing_note'] >
		,
		ReturnType< $bog_smalljs_versus_pair_case['missing_note'] >
	>
	type $bog_smalljs_versus_code__case_id_bog_smalljs_versus_pair_73 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_code['case_id'] >
	>
	type $bog_smalljs_versus_code__left_bog_smalljs_versus_pair_74 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['left'] >
		,
		ReturnType< $bog_smalljs_versus_code['left'] >
	>
	type $bog_smalljs_versus_code__right_bog_smalljs_versus_pair_75 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['right'] >
		,
		ReturnType< $bog_smalljs_versus_code['right'] >
	>
	type $bog_smalljs_versus_code__case_id_bog_smalljs_versus_pair_76 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_code['case_id'] >
	>
	type $bog_smalljs_versus_code__left_bog_smalljs_versus_pair_77 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['left'] >
		,
		ReturnType< $bog_smalljs_versus_code['left'] >
	>
	type $bog_smalljs_versus_code__right_bog_smalljs_versus_pair_78 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['right'] >
		,
		ReturnType< $bog_smalljs_versus_code['right'] >
	>
	type $bog_smalljs_versus_code__case_id_bog_smalljs_versus_pair_79 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_code['case_id'] >
	>
	type $bog_smalljs_versus_code__left_bog_smalljs_versus_pair_80 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['left'] >
		,
		ReturnType< $bog_smalljs_versus_code['left'] >
	>
	type $bog_smalljs_versus_code__right_bog_smalljs_versus_pair_81 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['right'] >
		,
		ReturnType< $bog_smalljs_versus_code['right'] >
	>
	type $bog_smalljs_versus_code__case_id_bog_smalljs_versus_pair_82 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_smalljs_versus_code['case_id'] >
	>
	type $bog_smalljs_versus_code__left_bog_smalljs_versus_pair_83 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['left'] >
		,
		ReturnType< $bog_smalljs_versus_code['left'] >
	>
	type $bog_smalljs_versus_code__right_bog_smalljs_versus_pair_84 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair['right'] >
		,
		ReturnType< $bog_smalljs_versus_code['right'] >
	>
	export class $bog_smalljs_versus_pair extends $mol_view {
		head_content( ): readonly(any)[]
		Head( ): $mol_view
		sections( ): readonly(any)[]
		Sections( ): $mol_view
		method_title_text( ): string
		Method_title( ): $mol_view
		method_body( ): string
		Method_text( ): $mol_view
		method_link_label( ): string
		Method_link_icon( ): $mol_icon_open_in_new
		Method_link( ): $mol_link
		Method( ): $mol_view
		suggest_title_text( ): string
		Suggest_title( ): $mol_view
		suggest_body( ): string
		Suggest_text( ): $mol_view
		suggest_name( next?: string ): string
		Suggest_field( ): $mol_string
		suggest_uri( ): string
		suggest_send_label( ): string
		Suggest_send_icon( ): $mol_icon_open_in_new
		Suggest_send( ): $mol_link
		Suggest_form( ): $mol_view
		Suggest( ): $mol_view
		title_text( ): string
		verdict_text( ): string
		verdict_note_text( ): string
		section_title( id: any): string
		section_score( id: any): string
		section_note( id: any): string
		section_content( id: any): readonly(any)[]
		metric_title( id: any): string
		metric_left_value( id: any): string
		metric_right_value( id: any): string
		metric_bar( id: any): boolean
		metric_lead( id: any): string
		metric_left_share( id: any): string
		metric_right_share( id: any): string
		metric_delta( id: any): string
		metric_human( id: any): string
		metric_method( id: any): string
		metric_sources( id: any): readonly(any)[]
		source_name( id: any): string
		source_label( id: any): string
		source_uri( id: any): string
		source_date( id: any): string
		edge_missing_note( ): string
		left( ): string
		right( ): string
		left_title( ): string
		right_title( ): string
		lights( ): string
		verdict_win( ): string
		verdict_draw( ): string
		verdict_none( ): string
		verdict_note_edge( ): string
		verdict_note_no_runner( ): string
		verdict_note_no_runner_both( ): string
		verdict_note_gap_one( ): string
		verdict_note_gaps( ): string
		category_edge( ): string
		category_code( ): string
		category_weight( ): string
		category_speed( ): string
		category_builtin( ): string
		category_market( ): string
		category_cost( ): string
		note_edge( ): string
		note_code( ): string
		note_weight( ): string
		note_speed( ): string
		note_builtin( ): string
		note_market( ): string
		note_cost( ): string
		score_line( ): string
		score_ahead( ): string
		score_tied( ): string
		score_empty( ): string
		edge_score_line( ): string
		edge_score_empty( ): string
		edge_score_no_runner( ): string
		edge_missing_one( ): string
		edge_missing_both( ): string
		delta_below( ): string
		delta_above( ): string
		delta_times( ): string
		delta_ahead( ): string
		delta_zero( ): string
		delta_tie( ): string
		delta_only( ): string
		delta_both( ): string
		delta_neither( ): string
		delta_partial( ): string
		value_yes( ): string
		value_no( ): string
		no_data( ): string
		sub( ): readonly(any)[]
		Title( ): $mol_view
		Verdict( ): $mol_view
		Verdict_note( ): $mol_view
		Section( id: any): $bog_smalljs_versus_pair_section
		Names( id: any): $bog_smalljs_versus_pair_names
		Metric( id: any): $bog_smalljs_versus_pair_metric
		Source( id: any): $bog_smalljs_versus_pair_source
		Case_race( ): $bog_smalljs_versus_pair_case
		Case_virtual( ): $bog_smalljs_versus_pair_case
		Case_leak( ): $bog_smalljs_versus_pair_case
		Case_crash( ): $bog_smalljs_versus_pair_case
		Code_race( ): $bog_smalljs_versus_code
		Code_virtual( ): $bog_smalljs_versus_code
		Code_leak( ): $bog_smalljs_versus_code
		Code_crash( ): $bog_smalljs_versus_code
	}
	
	type $mol_view__sub_bog_smalljs_versus_pair_case_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_versus_pair_case extends $bog_smalljs_versus_case {
		left( ): string
		right( ): string
		missing_note( ): string
		columns_count( ): number
		attr( ): ({ 
			'bog_smalljs_versus_pair_columns': ReturnType< $bog_smalljs_versus_pair_case['columns_count'] >,
		})  & ReturnType< $bog_smalljs_versus_case['attr'] >
		Missing_note( ): $mol_view
	}
	
	type $mol_view__sub_bog_smalljs_versus_pair_section_1 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair_section['head_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_bog_smalljs_versus_pair_section_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_section_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_section_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_section_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_section_6 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair_section['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_versus_pair_section extends $mol_view {
		section_content( ): readonly(any)[]
		head_content( ): readonly(any)[]
		content( ): readonly(any)[]
		title( ): string
		score( ): string
		note( ): string
		sub( ): ReturnType< $bog_smalljs_versus_pair_section['section_content'] >
		Head( ): $mol_view
		Title( ): $mol_view
		Score( ): $mol_view
		Note( ): $mol_view
		Content( ): $mol_view
	}
	
	type $mol_view__sub_bog_smalljs_versus_pair_names_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_names_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_names_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_versus_pair_names extends $mol_view {
		Left( ): $mol_view
		Middle( ): $mol_view
		Right( ): $mol_view
		left_name( ): string
		right_name( ): string
		sub( ): readonly(any)[]
	}
	
	type $mol_view__style_bog_smalljs_versus_pair_metric_1 = $mol_type_enforce<
		({ 
			'width': ReturnType< $bog_smalljs_versus_pair_metric['left_share'] >,
		})  & ReturnType< $mol_view['style'] >
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__style_bog_smalljs_versus_pair_metric_2 = $mol_type_enforce<
		({ 
			'width': ReturnType< $bog_smalljs_versus_pair_metric['right_share'] >,
		})  & ReturnType< $mol_view['style'] >
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_metric_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_metric_4 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair_metric['row_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_metric_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_metric_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_metric_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_metric_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_metric_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_metric_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_metric_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_metric_12 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair_metric['sources'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_versus_pair_metric extends $mol_view {
		metric_content( ): readonly(any)[]
		row_content( ): readonly(any)[]
		Bar_left( ): $mol_view
		Bar_right( ): $mol_view
		sources( ): readonly(any)[]
		title( ): string
		left_value( ): string
		right_value( ): string
		bar( ): boolean
		lead( ): string
		left_share( ): string
		right_share( ): string
		attr( ): ({ 
			'bog_smalljs_versus_pair_lead': ReturnType< $bog_smalljs_versus_pair_metric['lead'] >,
		})  & ReturnType< $mol_view['attr'] >
		delta( ): string
		human( ): string
		method( ): string
		sub( ): ReturnType< $bog_smalljs_versus_pair_metric['metric_content'] >
		Title( ): $mol_view
		Row( ): $mol_view
		Value_left( ): $mol_view
		Value_right( ): $mol_view
		Gap( ): $mol_view
		Bar( ): $mol_view
		Delta( ): $mol_view
		Human( ): $mol_view
		Method( ): $mol_view
		Sources( ): $mol_view
	}
	
	type $mol_view__sub_bog_smalljs_versus_pair_source_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_link__uri_bog_smalljs_versus_pair_source_2 = $mol_type_enforce<
		ReturnType< $bog_smalljs_versus_pair_source['uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__target_bog_smalljs_versus_pair_source_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['target'] >
	>
	type $mol_link__sub_bog_smalljs_versus_pair_source_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_source_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_smalljs_versus_pair_source_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_smalljs_versus_pair_source extends $mol_view {
		source_content( ): readonly(any)[]
		name( ): string
		label( ): string
		uri( ): string
		date( ): string
		sub( ): ReturnType< $bog_smalljs_versus_pair_source['source_content'] >
		Name( ): $mol_view
		Link( ): $mol_link
		Text( ): $mol_view
		Taken( ): $mol_view
	}
	
}

//# sourceMappingURL=pair.view.tree.d.ts.map
declare namespace $.$$ {
    type Measure = $bog_smalljs_versus_pair_measure;
    type Row = {
        readonly id: string;
        readonly meta: $bog_smalljs_versus_pair_meta;
        readonly left: Measure | null;
        readonly right: Measure | null;
        readonly diff: $bog_smalljs_versus_pair_diff;
    };
    /** Wins on each side out of the metrics both sides report. `total` is that
     *  shared count, not the number of metrics in the category. */
    type Score = {
        readonly left: number;
        readonly right: number;
        readonly total: number;
    };
    /**
     * One comparison of two frameworks.
     *
     * There is no overall score anywhere on this page, on purpose: rolling seven
     * unlike categories into a single number would need weights, and a weight is
     * an opinion wearing the clothes of a measurement.
     *
     * What a category score does mean: the share of metrics a side is better on,
     * counted only among the metrics **both** sides report. A metric one of them
     * has no reading for is drawn as a dash on both sides and scores for nobody.
     * Counting it would hand the win to whoever has the fuller data file, which
     * measures how much work went into the table rather than the framework.
     */
    export class $bog_smalljs_versus_pair extends $.$bog_smalljs_versus_pair {
        data(): typeof $bog_smalljs_versus_pair_data;
        compare(): typeof $bog_smalljs_versus_pair_compare;
        meta(metric: string): $bog_smalljs_versus_data_metric | null;
        measure(id: string, metric: string): $bog_smalljs_versus_data_value | null;
        /** Metric ids of a category, in the order the registry lists them. That
         *  order is curated, so it is the one the page renders. */
        registry_metrics(category: string): readonly string[];
        runner(id: string): boolean;
        /** Display names come from the data files. Before a file exists the id is
         *  shown as it stands rather than being prettied up into a name nobody
         *  wrote down. */
        left_title(): string;
        right_title(): string;
        title_text(): string;
        head_content(): $mol_view[];
        /** Rows of a category. A metric neither side reports is dropped: a wall
         *  of dashes says nothing that the category score does not already say,
         *  and it buries the rows that do carry a reading. A metric only one side
         *  reports stays — it is worth seeing what is known — but it is marked as
         *  not counted. */
        rows(category: string): readonly Row[];
        row(id: string): Row | null;
        score(category: string): Score;
        /** Same rule as every other category, applied to what the reader has
         *  actually run. A case counts once both columns have a status that can
         *  be ranked; until then it is a metric one side has no reading for, and
         *  it scores for nobody. Which is why the verdict grows from six
         *  categories to seven as the cases below are run, rather than claiming
         *  an outcome for tests that have not happened. */
        edge_score(): Score;
        /** Which side one live case went to. Unrunnable outcomes on either side —
         *  not started, broken, measured under conditions that void the run — make
         *  the case count for nobody, exactly as a metric only one side reports
         *  counts for nobody. */
        case_side(left_status: string, right_status: string): $bog_smalljs_versus_pair_side;
        /** Whether the live tests can decide anything for this pair at all. */
        edge_live(): boolean;
        /** Categories that have something to say. A category with no metric both
         *  sides report is not a draw — nothing was compared — so it stays out of
         *  the count instead of quietly padding it. */
        decided(): readonly string[];
        /** Category counts behind the verdict line. */
        tally(): {
            left: number;
            right: number;
            ties: number;
            total: number;
        };
        verdict_text(): string;
        /** What the verdict line does not cover: the live category while it is
         *  still unrun, and the static ones nobody has measured for this pair. */
        verdict_note_text(): string;
        sections(): $.$bog_smalljs_versus_pair_section[];
        section_title(category: string): string;
        section_note(category: string): string;
        section_score(category: string): string;
        section_content(category: string): readonly $mol_view[];
        metric_title(id: string): string;
        metric_human(id: string): string;
        /** Whether both sides have a reading. Only a shared metric is ever printed
         *  as a pair of values; see `metric_left_value` for why. */
        shared(id: string): boolean;
        /** How the number was obtained — the same procedure for both sides, which
         *  is what makes the two comparable at all. Printed next to the row rather
         *  than hidden behind the methodology link at the bottom: a reader who
         *  doubts one number should not have to go looking for what it means. */
        metric_method(id: string): string;
        value_text(measure: Measure | null, meta: $bog_smalljs_versus_pair_meta | undefined): string;
        /**
         * A metric only one side reports is a dash on **both** sides, not a number
         * against a dash.
         *
         * The number is real and printing it would feel like the honest thing to
         * do. It is not. Put "357" opposite a dash and the row reads "this side is
         * small, the other side is unknown" — a comparison the reader cannot help
         * making and that nobody measured. The true reading is "we measured
         * ourselves and did not measure them", and there is no way to tell those
         * two apart from the outside.
         *
         * The cost is real too: a measurement we have is withheld. It is the right
         * trade, because the alternative puts a thumb on the scale in whichever
         * direction our data happens to be fuller, and this section is worth
         * nothing the moment a reader finds one of those.
         */
        metric_left_value(id: string): string;
        metric_right_value(id: string): string;
        /** Left's share of the bar, or null when this row has no honest bar.
         *
         *  A reading of zero on one side is one of those cases. The proportion is
         *  real — one side holds all of it — but it draws as a single solid block
         *  spanning the whole track, and at that point the only thing left to read
         *  is the colour, which says "this row is good" rather than "this side
         *  is". The numbers are right there and the sentence names both sides, so
         *  the bar is dropped rather than drawn as something the eye misreads.
         *  Same reasoning as a yes/no metric, which is the same shape. */
        metric_share(id: string): number | null;
        metric_bar(id: string): boolean;
        /** Which half of the bar is the better one. The length already says it,
         *  but the colour has to agree: a fixed green on the left would read as
         *  "left is good" and would be wrong on every row the right side wins. */
        metric_lead(id: string): "" | "left" | "right";
        metric_left_share(id: string): string;
        metric_right_share(id: string): string;
        /** The side whose numeric reading is exactly zero, when the other side's
         *  is not. Null for anything else, including two zeroes — that is a tie
         *  and reads as one. */
        zero_side(row: Row): 'left' | 'right' | null;
        /** The sentence next to the bar. Every wording states its own base — a
         *  percentage is always measured against the losing side — because "62%
         *  faster" is ambiguous about what it is 62% of, and an ambiguous number
         *  is the kind a reader is right to distrust. */
        metric_delta(id: string): string;
        /** One line per side that has a reading, so a row built from two
         *  measurements taken on different days cannot hide that. */
        metric_sources(id: string): $.$bog_smalljs_versus_pair_source[];
        source_measure(key: string): $bog_smalljs_versus_data_value | null | undefined;
        source_name(key: string): string;
        /** Whichever of the two links is an address a reader can open. `source`
         *  can be a path in the repository, which is worth printing but is not a
         *  link; `method` is the page describing how the number was taken. */
        source_uri(key: string): string;
        source_label(key: string): string;
        source_date(key: string): string;
        cases(): $.$bog_smalljs_versus_pair_case[];
        /** What the edge-cases section renders: every case followed by its own
         *  source, so "why did that happen" is answered where the question comes
         *  up rather than in a separate section further down.
         *
         *  Kept apart from `cases()` because that list is also what the score is
         *  counted from, and a code block is not a case that can be won or lost.
         */
        edge_content(): readonly $mol_view[];
        /** Said once, under the Run button of every case, when one of the pair has
         *  no runner. Written here rather than in the case block because only the
         *  page knows what the two are called. */
        edge_missing_note(): string;
        suggest_uri(): string;
    }
    /**
     * The crash-test block of the section page, narrowed to the two frameworks
     * of this pair. Everything else about it — the protocol, the timeouts, the
     * visibility rules — is inherited untouched, so a case behaves here exactly
     * as it does on the section page and the two pages cannot drift apart.
     */
    export class $bog_smalljs_versus_pair_case extends $.$bog_smalljs_versus_pair_case {
        /** Only the sides that have a runner. A framework nobody wrote a runner
         *  for gets no column rather than an empty one: an empty frame next to a
         *  working one reads as a failure, and it is not one. */
        frameworks(): string[];
        /** The section page always has three columns and says so in its stylesheet.
         *  Here the count depends on how many of the pair have a runner, so it has
         *  to reach the stylesheet as an attribute — otherwise a pair with one
         *  runner leaves two thirds of the block empty and reads as two frames
         *  that failed to load. */
        columns_count(): number;
        /** With no runnable column there is nothing to run, so the button goes
         *  and only the explanation stays. */
        controls_content(): any[];
    }
    export class $bog_smalljs_versus_pair_section extends $.$bog_smalljs_versus_pair_section {
        head_content(): $mol_view[];
        section_content(): $mol_view[];
    }
    export class $bog_smalljs_versus_pair_metric extends $.$bog_smalljs_versus_pair_metric {
        /** The middle cell is always there, with or without a bar, so the values
         *  of every row line up down the page whether or not a particular metric
         *  can be drawn as a proportion. */
        row_content(): $mol_view[];
        metric_content(): $mol_view[];
    }
    export class $bog_smalljs_versus_pair_source extends $.$bog_smalljs_versus_pair_source {
        source_content(): $mol_view[];
    }
    export {};
}

declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_card extends $bog_builderui_div {
	}
	
}

//# sourceMappingURL=card.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_field extends $mol_string {
		minimal_height( ): number
	}
	
}

//# sourceMappingURL=field.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $mol_gallery__style_mol_gallery_1 = $mol_type_enforce<
		({ 
			'flexGrow': ReturnType< $mol_gallery['side_size'] >,
		}) 
		,
		ReturnType< $mol_gallery['style'] >
	>
	type $mol_gallery__items_mol_gallery_2 = $mol_type_enforce<
		ReturnType< $mol_gallery['side_items'] >
		,
		ReturnType< $mol_gallery['items'] >
	>
	export class $mol_gallery extends $mol_view {
		items( ): readonly($mol_view)[]
		side_size( id: any): string
		side_items( id: any): readonly($mol_view)[]
		sub( ): ReturnType< $mol_gallery['items'] >
		Side( id: any): $mol_gallery
	}
	
}

//# sourceMappingURL=gallery.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_gallery_demo
     */
    class $mol_gallery extends $.$mol_gallery {
        sub(): readonly $mol_view[];
        side_items(id: number): $mol_view[];
        side_size(id: number): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_svg_group extends $mol_svg {
		dom_name( ): string
	}
	
}

//# sourceMappingURL=group.view.tree.d.ts.map
declare namespace $ {
    class $mol_vector<Value, Length extends number> extends Array<Value> {
        get length(): Length;
        constructor(...values: Value[] & {
            length: Length;
        });
        map<Res>(convert: (value: Value, index: number, array: this) => Res, self?: any): $mol_vector<Res, Length>;
        merged<Patch>(patches: readonly Patch[] & {
            length: Length;
        }, combine: (value: Value, patch: Patch) => Value): this;
        limited(this: $mol_vector<number, Length>, limits: readonly (readonly [number, number])[] & {
            length: Length;
        }): this;
        added0(this: $mol_vector<number, Length>, diff: number): this;
        added1(this: $mol_vector<number, Length>, diff: readonly number[] & {
            length: Length;
        }): this;
        substracted1(this: $mol_vector<number, Length>, diff: readonly number[] & {
            length: Length;
        }): this;
        multed0(this: $mol_vector<number, Length>, mult: number): this;
        multed1(this: $mol_vector<number, Length>, mults: readonly number[] & {
            length: Length;
        }): this;
        divided1(this: $mol_vector<number, Length>, mults: readonly number[] & {
            length: Length;
        }): this;
        powered0(this: $mol_vector<number, Length>, mult: number): this;
        expanded1(this: $mol_vector<$mol_vector_range<number>, Length>, point: readonly number[] & {
            length: Length;
        }): this;
        expanded2(this: $mol_vector<$mol_vector_range<number>, Length>, point: readonly (readonly [number, number])[] & {
            length: Length;
        }): this;
        center<Item extends $mol_vector<number, number>>(this: $mol_vector<Item, Length>): Item;
        distance(this: $mol_vector<$mol_vector<number, number>, Length>): number;
        transponed(this: $mol_vector<$mol_vector<number, number>, Length>): $mol_vector<$mol_vector<number, Length>, typeof this[0]['length']>;
        get x(): Value;
        set x(next: Value);
        get y(): Value;
        set y(next: Value);
        get z(): Value;
        set z(next: Value);
    }
    class $mol_vector_1d<Value> extends $mol_vector<Value, 1> {
    }
    class $mol_vector_2d<Value> extends $mol_vector<Value, 2> {
    }
    class $mol_vector_3d<Value> extends $mol_vector<Value, 3> {
    }
    class $mol_vector_range<Value> extends $mol_vector<Value, 2> {
        0: Value;
        1: Value;
        constructor(min: Value, max?: Value);
        get min(): Value;
        set min(next: Value);
        get max(): Value;
        set max(next: Value);
        get inversed(): $mol_vector_range<Value>;
        expanded0(value: Value): $mol_vector_range<Value>;
    }
    let $mol_vector_range_full: $mol_vector_range<number>;
    class $mol_vector_matrix<Width extends number, Height extends number> extends $mol_vector<readonly number[] & {
        length: Width;
    }, Height> {
        added2(diff: readonly (readonly number[] & {
            length: Width;
        })[] & {
            length: Height;
        }): this;
        multed2(diff: readonly (readonly number[] & {
            length: Width;
        })[] & {
            length: Height;
        }): this;
    }
}

declare namespace $ {

	export class $mol_svg_title extends $mol_svg {
		dom_name( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=title.view.tree.d.ts.map
declare namespace $ {

	type $mol_vector_range__mol_plot_graph_1 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_2 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_3 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_4 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_5 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_6 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_7 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_8 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_2d__mol_plot_graph_9 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['viewport_x'] >, ReturnType< $mol_plot_graph['viewport_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_graph_10 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_graph_11 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['dimensions_pane_x'] >, ReturnType< $mol_plot_graph['dimensions_pane_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_graph_12 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['dimensions_x'] >, ReturnType< $mol_plot_graph['dimensions_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_graph_13 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_graph_14 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['gap_x'] >, ReturnType< $mol_plot_graph['gap_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_svg_title__title_mol_plot_graph_15 = $mol_type_enforce<
		ReturnType< $mol_plot_graph['hint'] >
		,
		ReturnType< $mol_svg_title['title'] >
	>
	export class $mol_plot_graph extends $mol_svg_group {
		type( ): string
		color( ): string
		viewport_x( ): $mol_vector_range<number>
		viewport_y( ): $mol_vector_range<number>
		dimensions_pane_x( ): $mol_vector_range<number>
		dimensions_pane_y( ): $mol_vector_range<number>
		dimensions_x( ): $mol_vector_range<number>
		dimensions_y( ): $mol_vector_range<number>
		gap_x( ): $mol_vector_range<number>
		gap_y( ): $mol_vector_range<number>
		title( ): string
		hint( ): ReturnType< $mol_plot_graph['title'] >
		series_x( ): readonly(number)[]
		series_y( ): readonly(number)[]
		attr( ): ({ 
			'mol_plot_graph_type': ReturnType< $mol_plot_graph['type'] >,
		})  & ReturnType< $mol_svg_group['attr'] >
		style( ): ({ 
			'color': ReturnType< $mol_plot_graph['color'] >,
		})  & ReturnType< $mol_svg_group['style'] >
		viewport( ): $mol_vector_2d<$mol_vector_range<number>>
		shift( ): readonly(number)[]
		scale( ): readonly(number)[]
		cursor_position( ): $mol_vector_2d<number>
		dimensions_pane( ): $mol_vector_2d<$mol_vector_range<number>>
		dimensions( ): $mol_vector_2d<$mol_vector_range<number>>
		size_real( ): $mol_vector_2d<number>
		gap( ): $mol_vector_2d<$mol_vector_range<number>>
		repos_x( id: any): number
		repos_y( id: any): number
		indexes( ): readonly(number)[]
		points( ): readonly(readonly(number)[])[]
		front( ): readonly($mol_svg)[]
		back( ): readonly($mol_svg)[]
		Hint( ): $mol_svg_title
		hue( next?: number ): number
		Sample( ): any
	}
	
	export class $mol_plot_graph_sample extends $mol_view {
		type( ): string
		color( ): string
		attr( ): ({ 
			'mol_plot_graph_type': ReturnType< $mol_plot_graph_sample['type'] >,
		})  & ReturnType< $mol_view['attr'] >
		style( ): ({ 
			'color': ReturnType< $mol_plot_graph_sample['color'] >,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=graph.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_plot_graph extends $.$mol_plot_graph {
        viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        indexes(): readonly number[];
        repos_x(val: number): number;
        repos_y(val: number): number;
        points(): readonly (readonly number[])[];
        series_x(): readonly number[];
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        color(): string;
        front(): readonly $.$mol_svg[];
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_gallery__items_mol_chart_legend_1 = $mol_type_enforce<
		ReturnType< $mol_chart_legend['graph_legends'] >
		,
		ReturnType< $mol_gallery['items'] >
	>
	type $mol_view__sub_mol_chart_legend_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_chart_legend_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_chart_legend_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_chart_legend extends $mol_scroll {
		graph_legends( ): readonly($mol_view)[]
		Gallery( ): $mol_gallery
		Graph_sample( id: any): any
		Graph_sample_box( id: any): $mol_view
		graph_title( id: any): string
		Graph_title( id: any): $mol_view
		graphs( ): readonly($mol_plot_graph)[]
		graphs_front( ): readonly($mol_plot_graph)[]
		sub( ): readonly(any)[]
		Graph_legend( id: any): $mol_view
	}
	
}

//# sourceMappingURL=legend.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_chart_legend extends $.$mol_chart_legend {
        graphs_front(): readonly $mol_plot_graph[];
        graph_legends(): readonly $mol_view[];
        graph_title(index: number): string;
        Graph_sample(index: number): any;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_vector_2d__mol_touch_1 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_touch_2 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_touch_3 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	export class $mol_touch extends $mol_plugin {
		event_start( next?: any ): any
		event_move( next?: any ): any
		event_end( next?: any ): any
		event_leave( next?: any ): any
		event_wheel( next?: any ): any
		start_zoom( next?: number ): number
		start_distance( next?: number ): number
		zoom( next?: number ): number
		allow_draw( ): boolean
		allow_pan( ): boolean
		allow_zoom( ): boolean
		action_type( next?: string ): string
		action_point( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		start_pan( next?: readonly(any)[] ): readonly(any)[]
		pan( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		pointer_center( ): $mol_vector_2d<number>
		start_pos( next?: any ): any
		swipe_precision( ): number
		swipe_right( next?: any ): any
		swipe_bottom( next?: any ): any
		swipe_left( next?: any ): any
		swipe_top( next?: any ): any
		swipe_from_right( next?: any ): any
		swipe_from_bottom( next?: any ): any
		swipe_from_left( next?: any ): any
		swipe_from_top( next?: any ): any
		swipe_to_right( next?: any ): any
		swipe_to_bottom( next?: any ): any
		swipe_to_left( next?: any ): any
		swipe_to_top( next?: any ): any
		draw_start( next?: any ): any
		draw( next?: any ): any
		draw_end( next?: any ): any
		style( ): ({ 
			'touch-action': string,
			'overscroll-behavior': string,
		})  & ReturnType< $mol_plugin['style'] >
		event( ): ({ 
			pointerdown( next?: ReturnType< $mol_touch['event_start'] > ): ReturnType< $mol_touch['event_start'] >,
			pointermove( next?: ReturnType< $mol_touch['event_move'] > ): ReturnType< $mol_touch['event_move'] >,
			pointerup( next?: ReturnType< $mol_touch['event_end'] > ): ReturnType< $mol_touch['event_end'] >,
			pointerleave( next?: ReturnType< $mol_touch['event_leave'] > ): ReturnType< $mol_touch['event_leave'] >,
			wheel( next?: ReturnType< $mol_touch['event_wheel'] > ): ReturnType< $mol_touch['event_wheel'] >,
		})  & ReturnType< $mol_plugin['event'] >
	}
	
}

//# sourceMappingURL=touch.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Plugin for touch gestures.
     * @see [mol_plugin](../plugin/readme.md)
     */
    class $mol_touch extends $.$mol_touch {
        auto(): void;
        pointer_events(next?: readonly PointerEvent[]): readonly PointerEvent[];
        pointer_coords(): $mol_vector<$mol_vector_2d<number>, number>;
        pointer_center(): $mol_vector_2d<number>;
        event_coords(event: PointerEvent | WheelEvent): $mol_vector_2d<number>;
        action_point(): $mol_vector_2d<number>;
        event_eat(event: PointerEvent | WheelEvent): string;
        event_start(event: PointerEvent): void;
        event_move(event: PointerEvent): void;
        event_end(event: PointerEvent): void;
        event_leave(event: PointerEvent): void;
        swipe_left(event: PointerEvent): void;
        swipe_right(event: PointerEvent): void;
        swipe_top(event: PointerEvent): void;
        swipe_bottom(event: PointerEvent): void;
        event_wheel(event: WheelEvent): void;
    }
}

declare namespace $ {

	type $mol_vector_range__mol_plot_pane_1 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['gap_left'] >, ReturnType< $mol_plot_pane['gap_right'] > ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_2 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['gap_bottom'] >, ReturnType< $mol_plot_pane['gap_top'] > ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_3 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_4 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_5 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_6 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_7 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_8 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_9 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_10 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_touch__zoom_mol_plot_pane_11 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['zoom'] >
		,
		ReturnType< $mol_touch['zoom'] >
	>
	type $mol_touch__pan_mol_plot_pane_12 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['shift'] >
		,
		ReturnType< $mol_touch['pan'] >
	>
	type $mol_touch__allow_draw_mol_plot_pane_13 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['allow_draw'] >
		,
		ReturnType< $mol_touch['allow_draw'] >
	>
	type $mol_touch__allow_pan_mol_plot_pane_14 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['allow_pan'] >
		,
		ReturnType< $mol_touch['allow_pan'] >
	>
	type $mol_touch__allow_zoom_mol_plot_pane_15 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['allow_zoom'] >
		,
		ReturnType< $mol_touch['allow_zoom'] >
	>
	type $mol_touch__draw_start_mol_plot_pane_16 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['draw_start'] >
		,
		ReturnType< $mol_touch['draw_start'] >
	>
	type $mol_touch__draw_mol_plot_pane_17 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['draw'] >
		,
		ReturnType< $mol_touch['draw'] >
	>
	type $mol_touch__draw_end_mol_plot_pane_18 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['draw_end'] >
		,
		ReturnType< $mol_touch['draw_end'] >
	>
	type $mol_vector_2d__mol_plot_pane_19 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['gap_x'] >, ReturnType< $mol_plot_pane['gap_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_20 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['shift_limit_x'] >, ReturnType< $mol_plot_pane['shift_limit_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_21 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_22 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_23 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['scale_limit_x'] >, ReturnType< $mol_plot_pane['scale_limit_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_24 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_25 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_26 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_27 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_28 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['dimensions_x'] >, ReturnType< $mol_plot_pane['dimensions_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_29 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['dimensions_viewport_x'] >, ReturnType< $mol_plot_pane['dimensions_viewport_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	export class $mol_plot_pane extends $mol_svg_root {
		gap_x( ): $mol_vector_range<number>
		gap_y( ): $mol_vector_range<number>
		shift_limit_x( ): $mol_vector_range<number>
		shift_limit_y( ): $mol_vector_range<number>
		scale_limit_x( ): $mol_vector_range<number>
		scale_limit_y( ): $mol_vector_range<number>
		dimensions_x( ): $mol_vector_range<number>
		dimensions_y( ): $mol_vector_range<number>
		dimensions_viewport_x( ): $mol_vector_range<number>
		dimensions_viewport_y( ): $mol_vector_range<number>
		graphs_sorted( ): readonly($mol_svg)[]
		graphs( ): readonly($mol_plot_graph)[]
		graphs_positioned( ): ReturnType< $mol_plot_pane['graphs'] >
		graphs_visible( ): ReturnType< $mol_plot_pane['graphs_positioned'] >
		zoom( next?: number ): number
		cursor_position( ): ReturnType< ReturnType< $mol_plot_pane['Touch'] >['pointer_center'] >
		allow_draw( ): boolean
		allow_pan( ): boolean
		allow_zoom( ): boolean
		action_type( ): ReturnType< ReturnType< $mol_plot_pane['Touch'] >['action_type'] >
		action_point( ): ReturnType< ReturnType< $mol_plot_pane['Touch'] >['action_point'] >
		draw_start( next?: any ): any
		draw( next?: any ): any
		draw_end( next?: any ): any
		Touch( ): $mol_touch
		aspect( ): string
		hue_base( next?: number ): number
		hue_shift( next?: number ): number
		gap_hor( ): number
		gap_vert( ): number
		gap_left( ): ReturnType< $mol_plot_pane['gap_hor'] >
		gap_right( ): ReturnType< $mol_plot_pane['gap_hor'] >
		gap_top( ): ReturnType< $mol_plot_pane['gap_vert'] >
		gap_bottom( ): ReturnType< $mol_plot_pane['gap_vert'] >
		gap( ): $mol_vector_2d<$mol_vector_range<number>>
		shift_limit( ): $mol_vector_2d<$mol_vector_range<number>>
		shift_default( ): $mol_vector_2d<number>
		shift( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		scale_limit( ): $mol_vector_2d<$mol_vector_range<number>>
		scale_default( ): $mol_vector_2d<number>
		scale( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		scale_x( next?: number ): number
		scale_y( next?: number ): number
		size( ): $mol_vector_2d<number>
		size_real( ): $mol_vector_2d<number>
		dimensions( ): $mol_vector_2d<$mol_vector_range<number>>
		dimensions_viewport( ): $mol_vector_2d<$mol_vector_range<number>>
		sub( ): ReturnType< $mol_plot_pane['graphs_sorted'] >
		graphs_colored( ): ReturnType< $mol_plot_pane['graphs_visible'] >
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=pane.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Fastest plot lib for vector graphics.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_plot_demo
     */
    class $mol_plot_pane extends $.$mol_plot_pane {
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        size(): $mol_vector_2d<number>;
        graph_hue(index: number): number;
        graphs_colored(): $.$mol_plot_graph[];
        size_real(): $mol_vector_2d<number>;
        view_box(): string;
        scale_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        scale_default(): $mol_vector_2d<number>;
        scale(next?: $mol_vector_2d<number>): $mol_vector_2d<number>;
        scale_x(next?: number): number;
        scale_y(next?: number): number;
        shift_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        shift_default(): $mol_vector_2d<number>;
        graph_touched: boolean;
        shift(next?: $mol_vector_2d<number>): $mol_vector_2d<number>;
        reset(event?: Event): void;
        graphs_visible(): $.$mol_plot_graph[];
        graphs_positioned(): readonly $.$mol_plot_graph[];
        dimensions_viewport(): $mol_vector<$mol_vector_range<number>, 2>;
        viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        graphs_sorted(): $.$mol_svg[];
    }
}

declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	type $mol_chart_legend__graphs_mol_chart_1 = $mol_type_enforce<
		ReturnType< $mol_chart['graphs_colored'] >
		,
		ReturnType< $mol_chart_legend['graphs'] >
	>
	type __mol_chart_2 = $mol_type_enforce<
		Parameters< $mol_chart['zoom'] >[0]
		,
		Parameters< ReturnType< $mol_chart['Plot'] >['scale_x'] >[0]
	>
	type $mol_plot_pane__zoom_mol_chart_3 = $mol_type_enforce<
		ReturnType< $mol_chart['zoom'] >
		,
		ReturnType< $mol_plot_pane['zoom'] >
	>
	type $mol_plot_pane__gap_left_mol_chart_4 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_left'] >
		,
		ReturnType< $mol_plot_pane['gap_left'] >
	>
	type $mol_plot_pane__gap_right_mol_chart_5 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_right'] >
		,
		ReturnType< $mol_plot_pane['gap_right'] >
	>
	type $mol_plot_pane__gap_bottom_mol_chart_6 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_bottom'] >
		,
		ReturnType< $mol_plot_pane['gap_bottom'] >
	>
	type $mol_plot_pane__gap_top_mol_chart_7 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_top'] >
		,
		ReturnType< $mol_plot_pane['gap_top'] >
	>
	type $mol_plot_pane__graphs_mol_chart_8 = $mol_type_enforce<
		ReturnType< $mol_chart['graphs'] >
		,
		ReturnType< $mol_plot_pane['graphs'] >
	>
	type $mol_plot_pane__hue_base_mol_chart_9 = $mol_type_enforce<
		ReturnType< $mol_chart['hue_base'] >
		,
		ReturnType< $mol_plot_pane['hue_base'] >
	>
	type $mol_plot_pane__hue_shift_mol_chart_10 = $mol_type_enforce<
		ReturnType< $mol_chart['hue_shift'] >
		,
		ReturnType< $mol_plot_pane['hue_shift'] >
	>
	export class $mol_chart extends $mol_view {
		Legend( ): $mol_chart_legend
		zoom( next?: ReturnType< ReturnType< $mol_chart['Plot'] >['scale_x'] > ): ReturnType< ReturnType< $mol_chart['Plot'] >['scale_x'] >
		graphs_colored( ): ReturnType< ReturnType< $mol_chart['Plot'] >['graphs_colored'] >
		hue_base( ): number
		hue_shift( ): number
		Plot( ): $mol_plot_pane
		gap_hor( ): number
		gap_vert( ): number
		gap_left( ): ReturnType< $mol_chart['gap_hor'] >
		gap_right( ): ReturnType< $mol_chart['gap_hor'] >
		gap_bottom( ): ReturnType< $mol_chart['gap_vert'] >
		gap_top( ): ReturnType< $mol_chart['gap_vert'] >
		graphs( ): readonly($mol_plot_graph)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=chart.view.tree.d.ts.map
declare namespace $ {

	export class $bog_builderui_chart extends $mol_chart {
	}
	
}

//# sourceMappingURL=chart.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_select extends $mol_select {
	}
	
}

//# sourceMappingURL=select.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_tooltip extends $mol_pop_over {
	}
	
}

//# sourceMappingURL=tooltip.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {
    /**
     * Path-based router for BuilderUI apps.
     *
     * URL shape: `<origin><mount>k=v/k=v?search` — segments live directly in
     * `pathname`, no `#!` fallback. Drop-in for `$mol_state_arg` once installed
     * via `.activate()`. Subclass per mount with `.at('/admin/')` to host
     * several routers in one bundle (nested mounts, preview frames).
     *
     * Server contract: any unknown path under `mount` must fall back to the
     * app's `index.html` (Caddy `try_files`, nginx fallback, GH Pages 404.html,
     * etc). Without that, deep-links 404 on first hit.
     */
    class $bog_builderui_router extends $mol_state_arg {
        /** Mount prefix. Must start AND end with `/`. Override per subclass via `.at()`. */
        static mount: string;
        /** Factory: subclass anchored at the given pathname mount. */
        static at(mount: string): typeof $bog_builderui_router;
        static href(next?: string): string;
        static dict(next?: {
            [key: string]: string | null;
        }): Readonly<{
            [key: string]: string;
        }>;
        static make_link(next: {
            [key: string]: string | null;
        }): string;
        static go(next: Record<string, string | null>): void;
        /**
         * Install as the global `$mol_state_arg`, mount `<base>`, intercept
         * in-app clicks and `popstate`.
         *
         * With no arg — auto-detects `mount` from the `web.js` script src,
         * which works both for mam dev (`/.../-/web.js` → contains `/-/` →
         * guard skips activation) and for prod deploys (`/myapp/web.js` →
         * mount = `/myapp/`).
         *
         * With explicit `mount` arg — equivalent to `.at(mount).activate()`.
         *
         * No-op when: no `window`/`document`, current pathname doesn't start
         * with `mount`, pathname looks like a $mol dev artifact (`.html` or
         * `/-/`), or already installed. Idempotent.
         */
        static activate(mount?: string): typeof $bog_builderui_router;
        /**
         * Path below `mount` that a click on `anchor_path` navigates to, given the
         * current `current_path`. Both arrive decoded and already stripped of the
         * mount prefix. Pure — no DOM, no state — so an app can override it and a
         * test can call it directly.
         *
         * Default: anchor segments merge into the current ones. Positional segments
         * (no `=`) replace the current positional ones, `k=v` segments override the
         * current value of the same key, and a current `k=v` whose key the anchor
         * never mentions is kept.
         *
         * That last rule is why a key set by one screen follows you into the next.
         * Leaving `section=course/lesson=hello` through a link to
         * `section=docs/page=views` lands on `lesson=hello/section=docs/page=views`,
         * because no link in the top bar mentions `lesson`. An app that wants a link
         * to mean exactly what it says overrides this in one line:
         *
         *     static override route_target( anchor_path: string ) { return anchor_path }
         *
         * Do not flip the default here. It was switched to href-following once
         * (`2e4a474`) and reverted the same day (`73eb0d4`): four other apps ride on
         * the merge, and the revert message spells out the rule — a shared module is
         * not changed for the sake of one consumer. Anyone reopening that decision
         * has to re-check journal, sample, forge and studio, not just their own app.
         */
        static route_target(anchor_path: string, current_path: string): string;
        protected static on_click(e: MouseEvent): void;
    }
}

declare namespace $ {
    /**
     * The site's router: a link leads exactly where it points.
     *
     * `$bog_builderui_router` merges by default — segments of the current address
     * whose key the link never mentions are carried into the next one. That suits
     * apps whose screens share keys, and four of them rely on it, so the default
     * stays as it is. This site is the other kind: every screen owns its own keys,
     * and carrying them across is pure damage.
     *
     * What it fixed here. The course writes `lesson`, the comparison section writes
     * `a` and `b`, and no link in the top bar names any of the three — so leaving
     * either screen used to produce `lesson=hello/section=docs/page=views`. Three
     * consequences: the address stopped matching the link the reader had just
     * clicked; a shared link carried a stale key from wherever its author happened
     * to be standing; and crawlers were handed endless spellings of one page, which
     * is exactly what the canonical pair order in the sitemap exists to prevent.
     *
     * Nothing is lost by dropping the merge, because the link already carries the
     * full target: `$mol_state_arg.link()` folds the current address in through
     * `dict_cut()` while building the href. One caveat worth knowing — `dict_cut`
     * stops at the first key the link mentions and drops everything after it in the
     * address. Harmless here, since `section` leads every address and every link
     * sets it, so the cut always lands at the start. A link that sets a later key
     * while expecting still later ones to survive would need more care.
     *
     * @see bog/builderui/router/router.web.ts — the seam and why its default holds
     * @see bog/builderui/router/router.web.test.ts — both behaviours, pinned
     */
    class $bog_smalljs_router extends $bog_builderui_router {
        static route_target(anchor_path: string): string;
    }
}

declare namespace $ {
    interface $bog_meta_alternate {
        /** BCP-47-ish language code, or 'x-default'. */
        lang: string;
        /** Absolute URL of the localized page. */
        href: string;
    }
    interface $bog_meta_data {
        title?: string;
        description?: string;
        canonical?: string;
        og_title?: string;
        og_description?: string;
        og_image?: string;
        og_type?: string;
        /** hreflang alternates, emitted as <link rel="alternate" hreflang=…>. */
        alternates?: $bog_meta_alternate[];
    }
    const $bog_meta_attr_name = "data-bog-meta";
    function $bog_meta_compact(data: $bog_meta_data | undefined): $bog_meta_data | null;
    function $bog_meta_attr(view: {
        meta?(): $bog_meta_data;
    }): Record<string, any>;
    function $bog_meta_merge(base: $bog_meta_data, override: $bog_meta_data): $bog_meta_data;
}

declare namespace $ {
    function $mol_offline(): void;
}

declare namespace $ {
    /** Installs service worker proxy, which caches all requests and respond from cache on http errors. */
    function $mol_offline_web(): void;
}

declare namespace $ {
}

declare namespace $ {

	type $bog_theme_auto__theme_light_bog_smalljs_app_1 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_theme_auto['theme_light'] >
	>
	type $bog_theme_auto__theme_dark_bog_smalljs_app_2 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_theme_auto['theme_dark'] >
	>
	type $bog_theme_auto__themes_bog_smalljs_app_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_theme_auto['themes'] >
	>
	type $bog_smalljs_top__search_click_bog_smalljs_app_4 = $mol_type_enforce<
		ReturnType< $bog_smalljs_app['search_toggle'] >
		,
		ReturnType< $bog_smalljs_top['search_click'] >
	>
	type $bog_smalljs_top__Theme_bog_smalljs_app_5 = $mol_type_enforce<
		ReturnType< $bog_smalljs_app['Theme'] >
		,
		ReturnType< $bog_smalljs_top['Theme'] >
	>
	type $mol_view__dom_name_bog_smalljs_app_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_bog_smalljs_app_7 = $mol_type_enforce<
		ReturnType< $bog_smalljs_app['body_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_smalljs_search__open_bog_smalljs_app_8 = $mol_type_enforce<
		ReturnType< $bog_smalljs_app['search_open'] >
		,
		ReturnType< $bog_smalljs_search['open'] >
	>
	type $bog_smalljs_search__anchor_key_bog_smalljs_app_9 = $mol_type_enforce<
		ReturnType< $bog_smalljs_app['docs_anchor_key'] >
		,
		ReturnType< $bog_smalljs_search['anchor_key'] >
	>
	type $bog_smalljs_versus_pair__left_bog_smalljs_app_10 = $mol_type_enforce<
		ReturnType< $bog_smalljs_app['versus_a'] >
		,
		ReturnType< $bog_smalljs_versus_pair['left'] >
	>
	type $bog_smalljs_versus_pair__right_bog_smalljs_app_11 = $mol_type_enforce<
		ReturnType< $bog_smalljs_app['versus_b'] >
		,
		ReturnType< $bog_smalljs_versus_pair['right'] >
	>
	type $bog_smalljs_versus_pair__lights_bog_smalljs_app_12 = $mol_type_enforce<
		ReturnType< $bog_smalljs_app['lights'] >
		,
		ReturnType< $bog_smalljs_versus_pair['lights'] >
	>
	export class $bog_smalljs_app extends $bog_builderui_div {
		dir( ): string
		hotkeys( ): any
		lang_sync( ): any
		route_canonical( ): any
		Theme( ): $bog_theme_auto
		Top( ): $bog_smalljs_top
		body_content( ): readonly(any)[]
		Body( ): $mol_view
		docs_anchor_key( ): string
		Search( ): $bog_smalljs_search
		versus_a( ): string
		versus_b( ): string
		section( next?: string ): string
		search_open( next?: boolean ): boolean
		search_toggle( next?: any ): any
		lights( ): string
		attr( ): ({ 
			'dir': ReturnType< $bog_smalljs_app['dir'] >,
			'bog_builderui_lights': ReturnType< $bog_smalljs_app['lights'] >,
			'bog_builderui_base': string,
			'bog_builderui_theme': string,
			'bog_builderui_chart': string,
			'bog_builderui_radius': string,
			'bog_builderui_font_body': string,
			'bog_builderui_font_head': string,
		})  & ReturnType< $bog_builderui_div['attr'] >
		auto( ): readonly(any)[]
		sub( ): readonly(any)[]
		plugins( ): readonly(any)[]
		Landing( ): $bog_smalljs_landing
		Docs( ): $bog_smalljs_docs
		Playground( ): $bog_smalljs_playground
		Course( ): $bog_smalljs_course
		Versus( ): $bog_smalljs_versus
		Pair( ): $bog_smalljs_versus_pair
	}
	
}

//# sourceMappingURL=app.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_smalljs_app extends $.$bog_smalljs_app {
        section(next?: string): string;
        /** Browser tab title. $mol_view writes the root's title() to document.title;
         *  the default was the class name ("Root"). Mirror the per-page, per-language
         *  meta title instead ("Views — $mol", "$mol — the reactive micromodule …"). */
        title(): string;
        /** The two frameworks of a comparison, always alphabetical by id.
         *
         *  `a=react/b=vue` and `a=vue/b=react` are the same comparison, and a
         *  search engine indexing both would split one page in two. So one order
         *  is canonical, the address is corrected to it (see route_canonical),
         *  and everything downstream — the page, the title, the canonical link —
         *  reads the pair from here rather than from the raw args.
         *
         *  Null when only one side is named: `section=versus/a=react` is the
         *  section front page with React already picked, not a comparison.
         *
         *  The comparison is by code unit, not by locale: framework ids are
         *  lower-case ascii slugs, so no collation rule can reorder them and the
         *  same URL is canonical in every language. */
        versus_pair(): readonly [string, string] | null;
        versus_a(): string;
        versus_b(): string;
        /** Keeps the address honest about which page is open.
         *
         *  Two corrections, both rewrites in place rather than navigations — the
         *  user asked for this page, only its spelling changes, so there is no
         *  extra entry to press Back through:
         *
         *  - a reversed pair (`a=vue/b=react`) is put back in canonical order;
         *  - `a`/`b` are dropped outside the comparison section, where the
         *    path router would otherwise carry them from link to link (it keeps
         *    the keys a link does not mention) and leave `a=react` hanging in
         *    the address of a documentation page.
         *
         *  This cell only decides what the address should say. The writing itself
         *  happens in the action below, reached through $mol_wire_async so it
         *  lands outside this memoized body: setting $mol_state_arg from inside
         *  one is the invalidation loop $mol forbids. */
        route_canonical(): null;
        /** Rewrites `a`/`b` in place — no history entry, because this corrects
         *  the spelling of the address the reader already asked for. */
        route_rewrite(a: string | null, b: string | null): null;
        /** Ordered arg pairs describing the current screen ($mol hash-router state). */
        route_args(): [string, string][];
        /** Serialize arg pairs into a router pathname segment (`section=docs/page=views`),
         *  matching exactly what $bog_builderui_router.make_link writes to the URL on
         *  the deploy. Empty (home) → '', so `prod_base + route_path()` stays the bare
         *  site root. */
        route_path(extra?: [string, string][]): string;
        /** Per-page, per-language SEO/social metadata. Read by $bog_meta_attr →
         *  `data-bog-meta` on the root, which the SEO prerenderer injects into
         *  <head> as <title>/<meta>/<link> for bots and social unfurls. */
        meta(): $bog_meta_data;
        attr(): {
            dir: ReturnType<$.$bog_smalljs_app["dir"]>;
            bog_builderui_lights: ReturnType<$.$bog_smalljs_app["lights"]>;
            bog_builderui_base: string;
            bog_builderui_theme: string;
            bog_builderui_chart: string;
            bog_builderui_radius: string;
            bog_builderui_font_body: string;
            bog_builderui_font_head: string;
        };
        /** Keep <html lang> in step with the active UI language (a11y: screen readers
         *  announce the right language; SEO: the shell no longer hard-codes one locale).
         *  The static shell ships lang="en"; this reactively corrects it on switch. */
        lang_sync(): null;
        /** URL argument key $mol_text uses for heading anchors on the docs page.
         *  Search results deep-link to a section by writing it, exactly as the
         *  right-hand table of contents does ($bog_smalljs_docs.toc_arg). The key
         *  is derived from the text component's own id, so it has to be read off
         *  that very instance rather than spelled out here. */
        docs_anchor_key(): string;
        open_search(): null;
        search_toggle(): null;
        hotkeys(): null;
        /** Светлая тема, тёмная или «как в системе».
         *
         *  Третье значение не для красоты: пока в разметке стоял конкретный
         *  `light` или `dark`, пререндеренная страница приезжала запечённой в ту
         *  тему, в которой её сняли. Читателю с тёмной системой каждая холодная
         *  загрузка светила белым, пока не выполнится бандл. С `system` первый
         *  кадр красит один CSS: у builderui на этот случай есть
         *  `@media (prefers-color-scheme: light)`, а без него значение тёмное.
         *
         *  Явный выбор в переключателе по-прежнему приезжает сюда как `light`
         *  или `dark` и системный запрос перебивает. */
        lights(): "light" | "dark" | "system";
        /** Right-to-left layout for RTL languages (currently Persian). */
        dir(): "rtl" | "ltr";
        body_content(): $.$bog_smalljs_playground[] | $.$bog_smalljs_docs[] | $.$bog_smalljs_course[] | $.$bog_smalljs_versus_pair[] | $.$bog_smalljs_versus[] | $.$bog_smalljs_landing[];
    }
}

declare namespace $ {
}

export = $;
//# sourceMappingURL=web.d.ts.map
