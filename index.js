/**
 * @param {object} container The parent object of what you want to hook (globalThis for globals)
 * @param {string} name The property/function name inside of the container
 * @param {function} preHookOrAllInOne
 * - If the next argument is undefined and the target is a function then you have to call the original function manually
 * - Otherwise this is a prehook for functions/setters
 * @param {function, undefined} postHook This becomes a posthook for functions/getters
 */
export function hook(container, name, preHookOrAllInOne, postHook = undefined) {
    let value;
    let declaredOnPrototype = false;
    if (typeof container == "function") {
        value = container[name];
        if (!value) {
            value = container["prototype"][name];
            if (value) declaredOnPrototype = true;
        }
    } else value = container[name];

    if (typeof value == "function") {
        let hook = !postHook
        ? function(...args) {
            preHookOrAllInOne(value, args);
        }
        : function(...args) {
            preHookOrAllInOne(value, args);
            value.apply(this, args);
            postHook(value, args);
        };

        (declaredOnPrototype ? container["prototype"] : container)[name] = hook;
    } else {
        Object.defineProperty(container, name, {
            get: preHookOrAllInOne ? () => { return (postHook||(val=>val))(value) } : () => value,
            set: preHookOrAllInOne ? () => { value = (preHookOrAllInOne||(()=>{}))(value) } : undefined,
        });
    }
}
