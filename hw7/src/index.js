var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function filterArray(array, condition) {
    return array.filter(condition);
}
filterArray([
    {
        isValid: true,
    },
    {
        isValid: false,
    }
], function (_a) {
    var isValid = _a.isValid;
    return isValid;
});
var Stack = /** @class */ (function () {
    function Stack() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.stack = args.reverse();
    }
    Stack.prototype.push = function (item) {
        this.stack.push(item);
    };
    Stack.prototype.pop = function () {
        this.stack.pop();
    };
    Stack.prototype.peek = function () {
        return this.stack[0];
    };
    return Stack;
}());
var stack = new Stack(1, 2);
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.data = args.reduce(function (acc, item) {
            return __assign(__assign({}, acc), item);
        }, {});
    }
    Dictionary.prototype.get = function (key) {
        return this.data[key];
    };
    Dictionary.prototype.set = function (item) {
        this.data = __assign(__assign({}, this.data), item);
    };
    Dictionary.prototype.has = function (key) {
        return key in this.data;
    };
    return Dictionary;
}());
var dictionary = new Dictionary();
