'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
function identity(a) {
    return a;
}
/**
 * @since 2.0.0
 */
var unsafeCoerce = identity;
/**
 * @since 2.0.0
 */
function constant$1(a) {
    return function () { return a; };
}
/**
 * A thunk that returns always `undefined`.
 *
 * @since 2.0.0
 */
var constUndefined = 
/*#__PURE__*/
constant$1(undefined);
/**
 * A thunk that returns always `void`.
 *
 * @since 2.0.0
 */
var constVoid = constUndefined;
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
    return;
}
/**
 * @since 2.0.0
 */
function tuple() {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    return t;
}
function pipe$1(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs, st) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        case 10:
            return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));
        case 11:
            return jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))));
        case 12:
            return kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))));
        case 13:
            return lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))));
        case 14:
            return mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))));
        case 15:
            return no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))));
        case 16:
            return op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))));
        case 17:
            return pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))));
        case 18:
            return qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))));
        case 19:
            return rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))))));
        case 20:
            return st(rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))))));
    }
    return;
}

function curried(f, n, acc) {
    return function (x) {
        var combined = Array(acc.length + 1);
        for (var i = 0; i < acc.length; i++) {
            combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
    };
}
var tupleConstructors = {
    1: function (a) { return [a]; },
    2: function (a) { return function (b) { return [a, b]; }; },
    3: function (a) { return function (b) { return function (c) { return [a, b, c]; }; }; },
    4: function (a) { return function (b) { return function (c) { return function (d) { return [a, b, c, d]; }; }; }; },
    5: function (a) { return function (b) { return function (c) { return function (d) { return function (e) { return [a, b, c, d, e]; }; }; }; }; }
};
function getTupleConstructor(len) {
    if (!tupleConstructors.hasOwnProperty(len)) {
        tupleConstructors[len] = curried(tuple, len - 1, []);
    }
    return tupleConstructors[len];
}
function sequenceT(F) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
            fas = F.ap(fas, args[i]);
        }
        return fas;
    };
}

var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// -------------------------------------------------------------------------------------
// Option
// -------------------------------------------------------------------------------------
/** @internal */
var isSome$1 = function (fa) { return fa._tag === 'Some'; };
// -------------------------------------------------------------------------------------
// Either
// -------------------------------------------------------------------------------------
/** @internal */
var isLeft$1 = function (ma) { return ma._tag === 'Left'; };
// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------
/** @internal */
var has = Object.prototype.hasOwnProperty;
// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------
/** @internal */
var fromReadonlyNonEmptyArray = function (as) { return __spreadArray([as[0]], as.slice(1)); };

/**
 * ```ts
 * interface Separated<E, A> {
 *    readonly left: E
 *    readonly right: A
 * }
 * ```
 *
 * Represents a result of separating a whole into two parts.
 *
 * @since 2.10.0
 */
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.10.0
 */
var separated = function (left, right) { return ({ left: left, right: right }); };

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category guards
 * @since 2.0.0
 */
var isLeft = isLeft$1;
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 *
 * @category guards
 * @since 2.0.0
 */
var isRight = function (ma) { return ma._tag === 'Right'; };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 2.0.0
 */
var left$1 = function (e) { return ({ _tag: 'Left', left: e }); };
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 2.0.0
 */
var right$1 = function (a) { return ({ _tag: 'Right', right: a }); };
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
 */
var matchW$1 = function (onLeft, onRight) { return function (ma) {
    return isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
}; };
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { match, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * function onLeft(errors: Array<string>): string {
 *   return `Errors: ${errors.join(', ')}`
 * }
 *
 * function onRight(value: number): string {
 *   return `Ok: ${value}`
 * }
 *
 * assert.strictEqual(
 *   pipe(
 *     right(1),
 *     match(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     left(['error 1', 'error 2']),
 *     match(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category destructors
 * @since 2.10.0
 */
var match$1 = matchW$1;
/**
 * Alias of [`match`](#match).
 *
 * @category destructors
 * @since 2.0.0
 */
var fold$1 = match$1;
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map$3 = function (f) { return function (fa) {
    return isLeft(fa) ? fa : right$1(f(fa.right));
}; };
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
var bimap = function (f, g) { return function (fa) { return (isLeft(fa) ? left$1(f(fa.left)) : right$1(g(fa.right))); }; };
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
var mapLeft = function (f) { return function (fa) {
    return isLeft(fa) ? left$1(f(fa.left)) : fa;
}; };
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
var chainW = function (f) { return function (ma) {
    return isLeft(ma) ? ma : f(ma.right);
}; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain$1 = chainW;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
var URI$3 = 'Either';

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @category guards
 * @since 2.0.0
 */
var isSome = isSome$1;
/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category guards
 * @since 2.0.0
 */
var isNone = function (fa) { return fa._tag === 'None'; };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 * @since 2.0.0
 */
var none = { _tag: 'None' };
/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 * @since 2.0.0
 */
var some$1 = function (a) { return ({ _tag: 'Some', value: a }); };
function fromPredicate$1(predicate) {
    return function (a) { return (predicate(a) ? some$1(a) : none); };
}
/**
 * Returns the `Left` value of an `Either` if possible.
 *
 * @example
 * import { getLeft, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 *
 * @category constructors
 * @since 2.0.0
 */
function getLeft(ma) {
    return ma._tag === 'Right' ? none : some$1(ma.left);
}
/**
 * Returns the `Right` value of an `Either` if possible.
 *
 * @example
 * import { getRight, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(left('a')), none)
 *
 * @category constructors
 * @since 2.0.0
 */
function getRight(ma) {
    return ma._tag === 'Left' ? none : some$1(ma.right);
}
/**
 * Transforms an `Either` to an `Option` discarding the error.
 *
 * Alias of [getRight](#getright)
 *
 * @category constructors
 * @since 2.0.0
 */
var fromEither = getRight;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
 */
var matchW = function (onNone, onSome) { return function (ma) {
    return isNone(ma) ? onNone() : onSome(ma.value);
}; };
/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, match } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category destructors
 * @since 2.10.0
 */
var match = matchW;
/**
 * Alias of [`match`](#match).
 *
 * @category destructors
 * @since 2.0.0
 */
var fold = match;
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 2.6.0
 */
var getOrElseW = function (onNone) { return function (ma) { return (isNone(ma) ? onNone() : ma.value); }; };
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
var getOrElse = getOrElseW;
// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category interop
 * @since 2.0.0
 */
var fromNullable$1 = function (a) { return (a == null ? none : some$1(a)); };
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var _map$2 = function (fa, f) { return pipe$1(fa, map$2(f)); };
var _ap = function (fab, fa) { return pipe$1(fab, ap$1(fa)); };
var _chain = function (ma, f) { return pipe$1(ma, chain(f)); };
var _reduce = function (fa, b, f) { return pipe$1(fa, reduce(b, f)); };
var _foldMap = function (M) {
    var foldMapM = foldMap(M);
    return function (fa, f) { return pipe$1(fa, foldMapM(f)); };
};
var _reduceRight = function (fa, b, f) { return pipe$1(fa, reduceRight(b, f)); };
var _traverse = function (F) {
    var traverseF = traverse$1(F);
    return function (ta, f) { return pipe$1(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _alt = function (fa, that) { return pipe$1(fa, alt(that)); };
var _filter = function (fa, predicate) { return pipe$1(fa, filter$2(predicate)); };
/* istanbul ignore next */
var _filterMap = function (fa, f) { return pipe$1(fa, filterMap(f)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return pipe$1(wa, extend(f)); };
/* istanbul ignore next */
var _partition = function (fa, predicate) {
    return pipe$1(fa, partition(predicate));
};
/* istanbul ignore next */
var _partitionMap = function (fa, f) { return pipe$1(fa, partitionMap(f)); };
/* istanbul ignore next */
var _wither = function (F) {
    var witherF = wither(F);
    return function (fa, f) { return pipe$1(fa, witherF(f)); };
};
/* istanbul ignore next */
var _wilt = function (F) {
    var wiltF = wilt(F);
    return function (fa, f) { return pipe$1(fa, wiltF(f)); };
};
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map$2 = function (f) { return function (fa) {
    return isNone(fa) ? none : some$1(f(fa.value));
}; };
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
var ap$1 = function (fa) { return function (fab) {
    return isNone(fab) ? none : isNone(fa) ? none : some$1(fab.value(fa.value));
}; };
/**
 * @category Pointed
 * @since 2.7.0
 */
var of$3 = some$1;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain = function (f) { return function (ma) {
    return isNone(ma) ? none : f(ma.value);
}; };
/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
var flatten = 
/*#__PURE__*/
chain(identity);
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) {
    return isNone(fa) ? that() : fa;
}; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 *
 * @category Alt
 * @since 2.0.0
 */
var alt = altW;
/**
 * @category Alternative
 * @since 2.7.0
 */
var zero = function () { return none; };
/**
 * @category MonadThrow
 * @since 2.7.0
 */
var throwError = function () { return none; };
/**
 * @category Extend
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) {
    return isNone(wa) ? none : some$1(f(wa));
}; };
/**
 * @category Foldable
 * @since 2.0.0
 */
var reduce = function (b, f) { return function (fa) {
    return isNone(fa) ? b : f(b, fa.value);
}; };
/**
 * @category Foldable
 * @since 2.0.0
 */
var foldMap = function (M) { return function (f) { return function (fa) {
    return isNone(fa) ? M.empty : f(fa.value);
}; }; };
/**
 * @category Foldable
 * @since 2.0.0
 */
var reduceRight = function (b, f) { return function (fa) {
    return isNone(fa) ? b : f(fa.value, b);
}; };
/**
 * @category Compactable
 * @since 2.0.0
 */
var compact = flatten;
var defaultSeparated = 
/*#__PURE__*/
separated(none, none);
/**
 * @category Compactable
 * @since 2.0.0
 */
var separate = function (ma) {
    return isNone(ma) ? defaultSeparated : separated(getLeft(ma.value), getRight(ma.value));
};
/**
 * @category Filterable
 * @since 2.0.0
 */
var filter$2 = function (predicate) { return function (fa) { return (isNone(fa) ? none : predicate(fa.value) ? fa : none); }; };
/**
 * @category Filterable
 * @since 2.0.0
 */
var filterMap = function (f) { return function (fa) {
    return isNone(fa) ? none : f(fa.value);
}; };
/**
 * @category Filterable
 * @since 2.0.0
 */
var partition = function (predicate) { return function (fa) {
    return separated(_filter(fa, function (a) { return !predicate(a); }), _filter(fa, predicate));
}; };
/**
 * @category Filterable
 * @since 2.0.0
 */
var partitionMap = function (f) { return flow(map$2(f), separate); };
/**
 * @category Traversable
 * @since 2.6.3
 */
var traverse$1 = function (F) { return function (f) { return function (ta) { return (isNone(ta) ? F.of(none) : F.map(f(ta.value), some$1)); }; }; };
/**
 * @category Traversable
 * @since 2.6.3
 */
var sequence = function (F) { return function (ta) { return (isNone(ta) ? F.of(none) : F.map(ta.value, some$1)); }; };
/**
 * @category Witherable
 * @since 2.6.5
 */
var wither = function (F) { return function (f) { return function (fa) { return (isNone(fa) ? F.of(none) : f(fa.value)); }; }; };
/**
 * @category Witherable
 * @since 2.6.5
 */
var wilt = function (F) { return function (f) { return function (fa) {
    return isNone(fa) ? F.of(defaultSeparated) : F.map(f(fa.value), function (e) { return separated(getLeft(e), getRight(e)); });
}; }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
var URI$2 = 'Option';
/**
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @category instances
 * @since 2.0.0
 */
function getFirstMonoid() {
    return {
        concat: function (x, y) { return (isNone(x) ? y : x); },
        empty: none
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI$2,
    map: _map$2,
    ap: _ap,
    of: of$3
};
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var option = {
    URI: URI$2,
    map: _map$2,
    of: of$3,
    ap: _ap,
    chain: _chain,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence,
    zero: zero,
    alt: _alt,
    extend: _extend,
    compact: compact,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    wither: _wither,
    wilt: _wilt,
    throwError: throwError
};

/**
 * @category instances
 * @since 2.5.0
 */
var eqStrict = {
    equals: function (a, b) { return a === b; }
};
/**
 * Use [`eqStrict`](#eqstrict) instead
 *
 * @since 2.0.0
 * @deprecated
 */
eqStrict.equals;
/**
 * Use [`Eq`](./boolean.ts.html#Eq) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var eqBoolean = eqStrict;
/**
 * Use [`Eq`](./string.ts.html#Eq) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var eqString = eqStrict;

/**
 * Insert or replace a key/value pair in a `Map`.
 *
 * @category combinators
 * @since 2.0.0
 */
var upsertAt$1 = function (E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, a) {
        var lookupWithKeyEk = lookupWithKeyE(k);
        return function (m) {
            var found = lookupWithKeyEk(m);
            if (isNone(found)) {
                var out = new Map(m);
                out.set(k, a);
                return out;
            }
            else if (found.value[1] !== a) {
                var out = new Map(m);
                out.set(found.value[0], a);
                return out;
            }
            return m;
        };
    };
};
function lookupWithKey(E) {
    return function (k, m) {
        if (m === undefined) {
            var lookupWithKeyE_1 = lookupWithKey(E);
            return function (m) { return lookupWithKeyE_1(k, m); };
        }
        var entries = m.entries();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = entries.next()).done) {
            var _a = e.value, ka = _a[0], a = _a[1];
            if (E.equals(ka, k)) {
                return some$1([ka, a]);
            }
        }
        return none;
    };
}
var _mapWithIndex = function (fa, f) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, key = _a[0], a = _a[1];
        m.set(key, f(key, a));
    }
    return m;
};
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var _map$1 = function (fa, f) { return _mapWithIndex(fa, function (_, a) { return f(a); }); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map$1 = function (f) { return function (fa) { return _map$1(fa, f); }; };

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------
/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
 *
 * Note: `f` should never `throw` errors, they are not caught.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @example
 * import { left, right } from 'fp-ts/Either'
 * import { tryCatch } from 'fp-ts/TaskEither'
 *
 * tryCatch(() => Promise.resolve(1), String)().then(result => {
 *   assert.deepStrictEqual(result, right(1))
 * })
 * tryCatch(() => Promise.reject('error'), String)().then(result => {
 *   assert.deepStrictEqual(result, left('error'))
 * })
 *
 * @category interop
 * @since 2.0.0
 */
var tryCatch = function (f, onRejected) { return function () {
    return f().then(right$1, function (reason) { return left$1(onRejected(reason)); });
}; };

/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly concat: (x: A, y: A) => A
 * }
 * ```
 *
 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
 *
 * ```ts
 * concat(x, concat(y, z)) = concat(concat(x, y), z)
 * ```
 *
 * A common example of a semigroup is the type `string` with the operation `+`.
 *
 * ```ts
 * import { Semigroup } from 'fp-ts/Semigroup'
 *
 * const semigroupString: Semigroup<string> = {
 *   concat: (x, y) => x + y
 * }
 *
 * const x = 'x'
 * const y = 'y'
 * const z = 'z'
 *
 * semigroupString.concat(x, y) // 'xy'
 *
 * semigroupString.concat(x, semigroupString.concat(y, z)) // 'xyz'
 *
 * semigroupString.concat(semigroupString.concat(x, y), z) // 'xyz'
 * ```
 *
 * *Adapted from https://typelevel.org/cats*
 *
 * @since 2.0.0
 */
/**
 * @category constructors
 * @since 2.10.0
 */
var constant = function (a) { return ({
    concat: function () { return a; }
}); };
/**
 * @category instances
 * @since 2.0.0
 */
var semigroupVoid = constant(undefined);
/**
 * Use [`SemigroupAll`](./boolean.ts.html#SemigroupAll) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var semigroupAll = {
    concat: function (x, y) { return x && y; }
};
/**
 * Use [`SemigroupAny`](./boolean.ts.html#SemigroupAny) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var semigroupAny = {
    concat: function (x, y) { return x || y; }
};

/**
 * @category instances
 * @since 2.0.0
 */
({
    concat: semigroupVoid.concat,
    empty: undefined
});
/**
 * Use [`MonoidAll`](./boolean.ts.html#monoidall) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var monoidAll = {
    // tslint:disable-next-line: deprecation
    concat: semigroupAll.concat,
    empty: true
};
/**
 * Use [`MonoidAny`](./boolean.ts.html#MonoidAny) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var monoidAny = {
    // tslint:disable-next-line: deprecation
    concat: semigroupAny.concat,
    empty: false
};

/**
 * @since 2.2.0
 */
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
var Eq$1 = eqBoolean;

/**
 * @since 2.10.0
 */
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
var Eq = eqString;
/**
 * Test whether a `string` is empty.
 *
 * @since 2.10.0
 */
var isEmpty = function (s) { return s.length === 0; };

/**
 * Use [`pipe`](https://gcanti.github.io/fp-ts/modules/function.ts.html#flow) from `function` module instead.
 *
 * @since 2.0.0
 * @deprecated
 */
var pipe = pipe$1;

/**
 * @category constructors
 * @since 2.2.7
 */
var of$2 = function (a) { return ({ _tag: 'Of', value: a }); };
/**
 * @category constructors
 * @since 2.2.7
 */
var concat = function (left, right) { return ({
    _tag: 'Concat',
    left: left,
    right: right
}); };
/**
 * @category instances
 * @since 2.2.7
 */
function getSemigroup$2() {
    return { concat: concat };
}

/**
 * @category constructors
 * @since 2.2.7
 */
var leaf = function (actual, error) { return ({ _tag: 'Leaf', actual: actual, error: error }); };
/**
 * @category instances
 * @since 2.2.7
 */
function getSemigroup$1() {
    return getSemigroup$2();
}

/**
 * **This module is experimental**
 *
 * Experimental features are published in order to get early feedback from the community, see these tracking
 * [issues](https://github.com/gcanti/io-ts/issues?q=label%3Av2.2+) for further discussions and enhancements.
 *
 * A feature tagged as _Experimental_ is in a high state of flux, you're at risk of it changing without notice.
 *
 * @since 2.2.0
 */
// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------
/**
 * @category primitives
 * @since 2.2.0
 */
var string$1 = {
    is: function (u) { return typeof u === 'string'; }
};
/**
 * @category primitives
 * @since 2.2.0
 */
var boolean$1 = {
    is: function (u) { return typeof u === 'boolean'; }
};

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.2.7
 */
function fromRefinement$1(M) {
    return function (refinement, onError) { return ({
        decode: function (i) { return (refinement(i) ? M.of(i) : M.throwError(onError(i))); }
    }); };
}

// -------------------------------------------------------------------------------------
// Kleisli config
// -------------------------------------------------------------------------------------
/**
 * @internal
 */
var SE = 
/*#__PURE__*/
getSemigroup$1();
/**
 * @internal
 */
var ap = function (fab, fa) {
    return isLeft(fab)
        ? isLeft(fa)
            ? left$1(SE.concat(fab.left, fa.left))
            : fab
        : isLeft(fa)
            ? fa
            : right$1(fab.right(fa.right));
};
var M = {
    URI: URI$3,
    _E: undefined,
    map: function (fa, f) { return pipe(fa, map$3(f)); },
    ap: ap,
    of: right$1,
    chain: function (ma, f) { return pipe(ma, chain$1(f)); },
    throwError: left$1,
    bimap: function (fa, f, g) { return pipe(fa, bimap(f, g)); },
    mapLeft: function (fa, f) { return pipe(fa, mapLeft(f)); },
    alt: function (me, that) {
        if (isRight(me)) {
            return me;
        }
        var ea = that();
        return isLeft(ea) ? left$1(SE.concat(me.left, ea.left)) : ea;
    }
};
/**
 * @category DecodeError
 * @since 2.2.7
 */
var error = function (actual, message) { return of$2(leaf(actual, message)); };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.2.8
 */
var fromRefinement = function (refinement, expected) {
    return fromRefinement$1(M)(refinement, function (u) { return error(u, expected); });
};
/**
 * @category constructors
 * @since 2.2.8
 */
var fromGuard = function (guard, expected) {
    return fromRefinement(guard.is, expected);
};
// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------
/**
 * @category primitives
 * @since 2.2.7
 */
var string = 
/*#__PURE__*/
fromGuard(string$1, 'string');
/**
 * @category primitives
 * @since 2.2.7
 */
var boolean = 
/*#__PURE__*/
fromGuard(boolean$1, 'boolean');

(undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
/**
 * @internal
 */
var isNonEmpty$1 = function (as) { return as.length > 0; };
/**
 * @internal
 */
var isOutOfBound$1 = function (i, as) { return i < 0 || i >= as.length; };
/**
 * @internal
 */
var unsafeUpdateAt$2 = function (i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        var xs = fromReadonlyNonEmptyArray(as);
        xs[i] = a;
        return xs;
    }
};

(undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
/**
 * @category Pointed
 * @since 2.0.0
 */
var of$1 = function (a) { return [a]; };

/**
 * Test whether a `ReadonlyArray` is non empty.
 *
 * @category guards
 * @since 2.5.0
 */
var isNonEmpty = isNonEmpty$1;
/**
 * Test whether an array contains a particular index
 *
 * @since 2.5.0
 */
var isOutOfBound = isOutOfBound$1;
function lookup$1(i, as) {
    return as === undefined ? function (as) { return lookup$1(i, as); } : isOutOfBound(i, as) ? none : some$1(as[i]);
}
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.5.0
 */
var findIndex = function (predicate) { return function (as) {
    for (var i = 0; i < as.length; i++) {
        if (predicate(as[i])) {
            return some$1(i);
        }
    }
    return none;
}; };
function findFirst$1(predicate) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return some$1(as[i]);
            }
        }
        return none;
    };
}
/**
 * @category unsafe
 * @since 2.5.0
 */
var unsafeUpdateAt$1 = function (i, a, as) {
    return isNonEmpty(as) ? unsafeUpdateAt$2(i, a, as) : as;
};

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category Pointed
 * @since 2.0.0
 */
var of = of$1;
/**
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) { return first.concat(second); }
}); };
/**
 * Returns a `Monoid` for `Array<A>`
 *
 * @example
 * import { getMonoid } from 'fp-ts/Array'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @category instances
 * @since 2.0.0
 */
var getMonoid = function () { return ({
    concat: getSemigroup().concat,
    empty: []
}); };

/**
 * @category constructors
 * @since 2.0.0
 */
var make = unsafeCoerce;
/**
 * @category instances
 * @since 2.0.0
 */
function getApply(S) {
    return {
        URI: URI$1,
        _E: undefined,
        map: _map,
        ap: function (fab, fa) { return make(S.concat(fab, fa)); }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
function getApplicative(M) {
    var A = getApply(M);
    return {
        URI: URI$1,
        _E: undefined,
        map: A.map,
        ap: A.ap,
        of: function () { return make(M.empty); }
    };
}
/* istanbul ignore next */
var _map = function (fa, f) { return pipe$1(fa, map(f)); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = function () { return unsafeCoerce; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
var URI$1 = 'Const';

/**
 * Insert or replace a key/value pair in a `ReadonlyRecord`.
 *
 * @category combinators
 * @since 2.10.0
 */
var upsertAt = function (k, a) { return function (r) {
    if (has.call(r, k) && r[k] === a) {
        return r;
    }
    var out = Object.assign({}, r);
    out[k] = a;
    return out;
}; };
function deleteAt(k) {
    return function (r) {
        if (!has.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
function lookup(k, r) {
    if (r === undefined) {
        return function (r) { return lookup(k, r); };
    }
    return has.call(r, k) ? some$1(r[k]) : none;
}
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use [`upsertAt`](#upsertat) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
var insertAt = upsertAt;

var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/** @internal */
var isoAsLens = function (sa) { return lens$2(sa.get, flow(sa.reverseGet, constant$1)); };
/** @internal */
var isoAsPrism = function (sa) { return prism(flow(sa.get, some$1), sa.reverseGet); };
/** @internal */
var isoAsOptional = function (sa) {
    return optional(flow(sa.get, some$1), flow(sa.reverseGet, constant$1));
};
/** @internal */
var isoAsTraversal = function (sa) {
    return traversal(function (F) { return function (f) { return function (s) {
        return F.map(f(sa.get(s)), function (a) { return sa.reverseGet(a); });
    }; }; });
};
// -------------------------------------------------------------------------------------
// Lens
// -------------------------------------------------------------------------------------
/** @internal */
var lens$2 = function (get, set) { return ({ get: get, set: set }); };
/** @internal */
var lensAsOptional = function (sa) { return optional(flow(sa.get, some$1), sa.set); };
/** @internal */
var lensAsTraversal = function (sa) {
    return traversal(function (F) { return function (f) { return function (s) { return F.map(f(sa.get(s)), function (a) { return sa.set(a)(s); }); }; }; });
};
/** @internal */
var lensComposeLens = function (ab) { return function (sa) {
    return lens$2(function (s) { return ab.get(sa.get(s)); }, function (b) { return function (s) { return sa.set(ab.set(b)(sa.get(s)))(s); }; });
}; };
/** @internal */
var prismComposePrism = function (ab) { return function (sa) {
    return prism(flow(sa.getOption, chain(ab.getOption)), flow(ab.reverseGet, sa.reverseGet));
}; };
/** @internal */
var lensComposePrism = function (ab) { return function (sa) {
    return optionalComposeOptional(prismAsOptional(ab))(lensAsOptional(sa));
}; };
/** @internal */
var lensId = function () { return lens$2(identity, constant$1); };
/** @internal */
var lensProp = function (prop) { return function (sa) {
    return lens$2(function (s) { return sa.get(s)[prop]; }, function (ap) { return function (s) {
        var _a;
        var oa = sa.get(s);
        if (ap === oa[prop]) {
            return s;
        }
        return sa.set(Object.assign({}, oa, (_a = {}, _a[prop] = ap, _a)))(s);
    }; });
}; };
/** @internal */
var lensProps = function () {
    var props = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        props[_i] = arguments[_i];
    }
    return function (sa) {
        return lens$2(function (s) {
            var a = sa.get(s);
            var r = {};
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var k = props_1[_i];
                r[k] = a[k];
            }
            return r;
        }, function (a) { return function (s) {
            var oa = sa.get(s);
            for (var _i = 0, props_2 = props; _i < props_2.length; _i++) {
                var k = props_2[_i];
                if (a[k] !== oa[k]) {
                    return sa.set(Object.assign({}, oa, a))(s);
                }
            }
            return s;
        }; });
    };
};
/** @internal */
var lensComponent = function (prop) { return function (sa) {
    return lens$2(function (s) { return sa.get(s)[prop]; }, function (ap) { return function (s) {
        var oa = sa.get(s);
        if (ap === oa[prop]) {
            return s;
        }
        var copy = oa.slice();
        copy[prop] = ap;
        return sa.set(copy)(s);
    }; });
}; };
/** @internal */
var lensAtKey = function (key) { return function (sa) {
    return pipe(sa, lensComposeLens(atReadonlyRecord().at(key)));
}; };
// -------------------------------------------------------------------------------------
// Prism
// -------------------------------------------------------------------------------------
/** @internal */
var prism = function (getOption, reverseGet) { return ({ getOption: getOption, reverseGet: reverseGet }); };
/** @internal */
var prismAsOptional = function (sa) { return optional(sa.getOption, function (a) { return prismSet(a)(sa); }); };
/** @internal */
var prismAsTraversal = function (sa) {
    return traversal(function (F) { return function (f) { return function (s) {
        return pipe(sa.getOption(s), fold(function () { return F.of(s); }, function (a) { return F.map(f(a), function (a) { return prismSet(a)(sa)(s); }); }));
    }; }; });
};
/** @internal */
var prismModifyOption = function (f) { return function (sa) { return function (s) {
    return pipe(sa.getOption(s), map$2(function (o) {
        var n = f(o);
        return n === o ? s : sa.reverseGet(n);
    }));
}; }; };
/** @internal */
var prismModify = function (f) { return function (sa) {
    var g = prismModifyOption(f)(sa);
    return function (s) {
        return pipe(g(s), getOrElse(function () { return s; }));
    };
}; };
/** @internal */
var prismSet = function (a) { return prismModify(function () { return a; }); };
/** @internal */
var prismComposeLens = function (ab) { return function (sa) {
    return optionalComposeOptional(lensAsOptional(ab))(prismAsOptional(sa));
}; };
/** @internal */
var prismFromNullable = function () { return prism(fromNullable$1, identity); };
/** @internal */
var prismFromPredicate = function (predicate) {
    return prism(fromPredicate$1(predicate), identity);
};
/** @internal */
var prismSome = function () { return prism(identity, some$1); };
/** @internal */
var prismRight = function () { return prism(fromEither, right$1); };
/** @internal */
var prismLeft = function () {
    return prism(function (s) { return (isLeft(s) ? some$1(s.left) : none); }, // TODO: replace with E.getLeft in v3
    left$1);
};
// -------------------------------------------------------------------------------------
// Optional
// -------------------------------------------------------------------------------------
/** @internal */
var optional = function (getOption, set) { return ({
    getOption: getOption,
    set: set
}); };
/** @internal */
var optionalAsTraversal = function (sa) {
    return traversal(function (F) { return function (f) { return function (s) {
        return pipe(sa.getOption(s), fold(function () { return F.of(s); }, function (a) { return F.map(f(a), function (a) { return sa.set(a)(s); }); }));
    }; }; });
};
/** @internal */
var optionalModifyOption = function (f) { return function (optional) { return function (s) {
    return pipe(optional.getOption(s), map$2(function (a) {
        var n = f(a);
        return n === a ? s : optional.set(n)(s);
    }));
}; }; };
/** @internal */
var optionalModify = function (f) { return function (optional) {
    var g = optionalModifyOption(f)(optional);
    return function (s) {
        return pipe(g(s), getOrElse(function () { return s; }));
    };
}; };
/** @internal */
var optionalComposeOptional = function (ab) { return function (sa) {
    return optional(flow(sa.getOption, chain(ab.getOption)), function (b) { return optionalModify(ab.set(b))(sa); });
}; };
/** @internal */
var optionalIndex = function (i) { return function (sa) {
    return pipe(sa, optionalComposeOptional(indexReadonlyArray().index(i)));
}; };
/** @internal */
var optionalIndexNonEmpty = function (i) { return function (sa) { return pipe(sa, optionalComposeOptional(indexReadonlyNonEmptyArray().index(i))); }; };
/** @internal */
var optionalKey = function (key) { return function (sa) {
    return pipe(sa, optionalComposeOptional(indexReadonlyRecord().index(key)));
}; };
/** @internal */
var optionalFindFirst = function (predicate) {
    return optional(findFirst$1(predicate), function (a) { return function (s) {
        return pipe(findIndex(predicate)(s), fold(function () { return s; }, function (i) { return unsafeUpdateAt$1(i, a, s); }));
    }; });
};
var unsafeUpdateAt = function (i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        var xs = __spreadArrays([as[0]], as.slice(1));
        xs[i] = a;
        return xs;
    }
};
/** @internal */
var optionalFindFirstNonEmpty = function (predicate) {
    return optional(findFirst$1(predicate), function (a) { return function (as) {
        return pipe(findIndex(predicate)(as), fold(function () { return as; }, function (i) { return unsafeUpdateAt(i, a, as); }));
    }; });
};
// -------------------------------------------------------------------------------------
// Traversal
// -------------------------------------------------------------------------------------
/** @internal */
var traversal = function (modifyF) { return ({
    modifyF: modifyF
}); };
/** @internal */
function traversalComposeTraversal(ab) {
    return function (sa) { return traversal(function (F) { return function (f) { return sa.modifyF(F)(ab.modifyF(F)(f)); }; }); };
}
/** @internal */
var ApplicativeIdentity = {
    URI: 'Identity',
    map: function (fa, f) { return f(fa); },
    of: identity,
    ap: 
    /* istanbul ignore next */
    function (fab, fa) { return fab(fa); }
};
var isIdentity = function (F) { return F.URI === 'Identity'; };
function fromTraversable(T) {
    return function () {
        return traversal(function (F) {
            // if `F` is `Identity` then `traverseF = map`
            var traverseF = isIdentity(F)
                ? T.map
                : T.traverse(F);
            return function (f) { return function (s) { return traverseF(s, f); }; };
        });
    };
}
/** @internal */
function traversalTraverse(T) {
    return traversalComposeTraversal(fromTraversable(T)());
}
// -------------------------------------------------------------------------------------
// Ix
// -------------------------------------------------------------------------------------
/** @internal */
var index$1 = function (index) { return ({ index: index }); };
/** @internal */
var indexReadonlyArray = function () {
    return index$1(function (i) {
        return optional(function (as) { return lookup$1(i, as); }, function (a) { return function (as) {
            return pipe(lookup$1(i, as), fold(function () { return as; }, function () { return unsafeUpdateAt$1(i, a, as); }));
        }; });
    });
};
/** @internal */
var indexReadonlyNonEmptyArray = function () {
    return index$1(function (i) {
        return optional(function (as) { return lookup$1(i, as); }, function (a) { return function (as) {
            return pipe(lookup$1(i, as), fold(function () { return as; }, function () { return unsafeUpdateAt(i, a, as); }));
        }; });
    });
};
/** @internal */
var indexReadonlyRecord = function () {
    return index$1(function (k) {
        return optional(function (r) { return lookup(k, r); }, function (a) { return function (r) {
            if (r[k] === a || isNone(lookup(k, r))) {
                return r;
            }
            return insertAt(k, a)(r);
        }; });
    });
};
// -------------------------------------------------------------------------------------
// At
// -------------------------------------------------------------------------------------
/** @internal */
var at = function (at) { return ({ at: at }); };
/** @internal */
function atReadonlyRecord() {
    return at(function (key) {
        return lens$2(function (r) { return lookup(key, r); }, fold(function () { return deleteAt(key); }, function (a) { return insertAt(key, a); }));
    });
}

// -------------------------------------------------------------------------------------
// converters
// -------------------------------------------------------------------------------------
/**
 * View an `Iso` as a `Lens`.
 *
 * @category converters
 * @since 2.3.0
 */
var asLens = isoAsLens;
/**
 * View an `Iso` as a `Prism`.
 *
 * @category converters
 * @since 2.3.0
 */
var asPrism = isoAsPrism;
/**
 * View an `Iso` as a `Optional`.
 *
 * @category converters
 * @since 2.3.0
 */
var asOptional$2 = isoAsOptional;
/**
 * View an `Iso` as a `Traversal`.
 *
 * @category converters
 * @since 2.3.0
 */
var asTraversal$3 = isoAsTraversal;

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.3.8
 */
var lens = lens$2;
/**
 * @category constructors
 * @since 2.3.0
 */
var id = lensId;
// -------------------------------------------------------------------------------------
// converters
// -------------------------------------------------------------------------------------
/**
 * View a `Lens` as a `Optional`.
 *
 * @category converters
 * @since 2.3.0
 */
var asOptional$1 = lensAsOptional;
/**
 * View a `Lens` as a `Traversal`.
 *
 * @category converters
 * @since 2.3.0
 */
var asTraversal$2 = lensAsTraversal;
// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------
/**
 * Compose a `Lens` with a `Lens`.
 *
 * @category compositions
 * @since 2.3.0
 */
var compose$3 = lensComposeLens;
/**
 * Alias of `compose`.
 *
 * @category compositions
 * @since 2.3.8
 */
var composeLens$1 = compose$3;
/**
 * Compose a `Lens` with a `Iso`.
 *
 * @category compositions
 * @since 2.3.8
 */
var composeIso = 
/*#__PURE__*/
flow(isoAsLens, compose$3);
/**
 * Compose a `Lens` with a `Prism`.
 *
 * @category compositions
 * @since 2.3.0
 */
var composePrism = lensComposePrism;
/**
 * Compose a `Lens` with an `Optional`.
 *
 * @category compositions
 * @since 2.3.0
 */
var composeOptional = function (ab) {
    return flow(asOptional$1, optionalComposeOptional(ab));
};
/**
 * Compose a `Lens` with an `Traversal`.
 *
 * @category compositions
 * @since 2.3.8
 */
var composeTraversal = function (ab) {
    return flow(asTraversal$2, traversalComposeTraversal(ab));
};
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.3.0
 */
var modify$2 = function (f) { return function (sa) { return function (s) {
    var o = sa.get(s);
    var n = f(o);
    return o === n ? s : sa.set(n)(s);
}; }; };
function modifyF(F) {
    return function (f) { return function (sa) { return function (s) { return pipe(sa.get(s), f, function (fa) { return F.map(fa, function (a) { return sa.set(a)(s); }); }); }; }; };
}
/**
 * Return a `Optional` from a `Lens` focused on a nullable value.
 *
 * @category combinators
 * @since 2.3.0
 */
var fromNullable = function (sa) {
    return composePrism(prismFromNullable())(sa);
};
function filter$1(predicate) {
    return composePrism(prismFromPredicate(predicate));
}
/**
 * Return a `Lens` from a `Lens` and a prop.
 *
 * @category combinators
 * @since 2.3.0
 */
var prop = lensProp;
/**
 * Return a `Lens` from a `Lens` and a list of props.
 *
 * @category combinators
 * @since 2.3.0
 */
var props = lensProps;
/**
 * Return a `Lens` from a `Lens` focused on a component of a tuple.
 *
 * @category combinators
 * @since 2.3.0
 */
var component = lensComponent;
/**
 * Return a `Optional` from a `Lens` focused on an index of a `ReadonlyArray`.
 *
 * @category combinators
 * @since 2.3.0
 */
var index = function (i) {
    return flow(asOptional$1, optionalIndex(i));
};
/**
 * Return a `Optional` from a `Lens` focused on an index of a `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.3.8
 */
var indexNonEmpty = function (i) {
    return flow(asOptional$1, optionalIndexNonEmpty(i));
};
/**
 * Return a `Optional` from a `Lens` focused on a key of a `ReadonlyRecord`.
 *
 * @category combinators
 * @since 2.3.0
 */
var key = function (key) {
    return flow(asOptional$1, optionalKey(key));
};
/**
 * Return a `Lens` from a `Lens` focused on a required key of a `ReadonlyRecord`.
 *
 * @category combinators
 * @since 2.3.0
 */
var atKey = lensAtKey;
/**
 * Return a `Optional` from a `Lens` focused on the `Some` of a `Option` type.
 *
 * @category combinators
 * @since 2.3.0
 */
var some = 
/*#__PURE__*/
composePrism(prismSome());
/**
 * Return a `Optional` from a `Lens` focused on the `Right` of a `Either` type.
 *
 * @category combinators
 * @since 2.3.0
 */
var right = 
/*#__PURE__*/
composePrism(prismRight());
/**
 * Return a `Optional` from a `Lens` focused on the `Left` of a `Either` type.
 *
 * @category combinators
 * @since 2.3.0
 */
var left = 
/*#__PURE__*/
composePrism(prismLeft());
/**
 * Return a `Traversal` from a `Lens` focused on a `Traversable`.
 *
 * @category combinators
 * @since 2.3.0
 */
function traverse(T) {
    return flow(asTraversal$2, traversalTraverse(T));
}
function findFirst(predicate) {
    return composeOptional(optionalFindFirst(predicate));
}
function findFirstNonEmpty(predicate) {
    return composeOptional(optionalFindFirstNonEmpty(predicate));
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Invariant
 * @since 2.3.0
 */
var imap = function (f, g) { return function (ea) {
    return imap_(ea, f, g);
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
var imap_ = function (ea, ab, ba) { return lens(flow(ea.get, ab), flow(ba, ea.set)); };
/**
 * @category instances
 * @since 2.3.0
 */
var URI = 'monocle-ts/Lens';
/**
 * @category instances
 * @since 2.3.0
 */
var Invariant = {
    URI: URI,
    imap: imap_
};
/**
 * @category instances
 * @since 2.3.8
 */
var Semigroupoid = {
    URI: URI,
    compose: function (ab, ea) { return compose$3(ab)(ea); }
};
/**
 * @category instances
 * @since 2.3.0
 */
var Category = {
    URI: URI,
    compose: Semigroupoid.compose,
    id: id
};

var lens$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    lens: lens,
    id: id,
    asOptional: asOptional$1,
    asTraversal: asTraversal$2,
    compose: compose$3,
    composeLens: composeLens$1,
    composeIso: composeIso,
    composePrism: composePrism,
    composeOptional: composeOptional,
    composeTraversal: composeTraversal,
    modify: modify$2,
    modifyF: modifyF,
    fromNullable: fromNullable,
    filter: filter$1,
    prop: prop,
    props: props,
    component: component,
    index: index,
    indexNonEmpty: indexNonEmpty,
    key: key,
    atKey: atKey,
    some: some,
    right: right,
    left: left,
    traverse: traverse,
    findFirst: findFirst,
    findFirstNonEmpty: findFirstNonEmpty,
    imap: imap,
    URI: URI,
    Invariant: Invariant,
    Semigroupoid: Semigroupoid,
    Category: Category
});

// -------------------------------------------------------------------------------------
// converters
// -------------------------------------------------------------------------------------
/**
 * View a `Optional` as a `Traversal`.
 *
 * @category converters
 * @since 2.3.0
 */
var asTraversal$1 = optionalAsTraversal;
// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------
/**
 * Compose a `Optional` with a `Optional`.
 *
 * @category compositions
 * @since 2.3.0
 */
var compose$2 = optionalComposeOptional;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.3.0
 */
var modifyOption = optionalModifyOption;
/**
 * @category combinators
 * @since 2.3.0
 */
var modify$1 = optionalModify;
/**
 * Return an `Optional` from a `Optional` focused on a nullable value.
 *
 * @category combinators
 * @since 2.3.3
 */
/*#__PURE__*/
compose$2(prismAsOptional(prismFromNullable()));
/**
 * Return a `Optional` from a `Optional` focused on the `Some` of a `Option` type.
 *
 * @category combinators
 * @since 2.3.0
 */
/*#__PURE__*/
compose$2(prismAsOptional(prismSome()));
/**
 * Return a `Optional` from a `Optional` focused on the `Right` of a `Either` type.
 *
 * @category combinators
 * @since 2.3.0
 */
/*#__PURE__*/
compose$2(prismAsOptional(prismRight()));
/**
 * Return a `Optional` from a `Optional` focused on the `Left` of a `Either` type.
 *
 * @category combinators
 * @since 2.3.0
 */
/*#__PURE__*/
compose$2(prismAsOptional(prismLeft()));

/**
 * @category constructors
 * @since 2.3.0
 */
var fromPredicate = prismFromPredicate;
// -------------------------------------------------------------------------------------
// converters
// -------------------------------------------------------------------------------------
/**
 * View a `Prism` as a `Optional`.
 *
 * @category converters
 * @since 2.3.0
 */
var asOptional = prismAsOptional;
/**
 * View a `Prism` as a `Traversal`.
 *
 * @category converters
 * @since 2.3.0
 */
var asTraversal = prismAsTraversal;
// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------
/**
 * Compose a `Prism` with a `Prism`.
 *
 * @category compositions
 * @since 2.3.0
 */
var compose$1 = prismComposePrism;
/**
 * Compose a `Prism` with a `Lens`.
 *
 * @category compositions
 * @since 2.3.0
 */
var composeLens = prismComposeLens;

// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------
/**
 * Compose a `Traversal` with a `Traversal`.
 *
 * @category compositions
 * @since 2.3.0
 */
var compose = traversalComposeTraversal;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.3.0
 */
var modify = function (f) { return function (sa) {
    return sa.modifyF(ApplicativeIdentity)(f);
}; };
/**
 * @category combinators
 * @since 2.3.0
 */
var set = function (a) { return modify(function () { return a; }); };
function filter(predicate) {
    return compose(prismAsTraversal(prismFromPredicate(predicate)));
}

/**
 * @since 1.0.0
 */
var fromLens = function (lens) { return new Lens(lens.get, lens.set); };
var fromPrism = function (prism) { return new Prism(prism.getOption, prism.reverseGet); };
var fromOptional = function (optional) {
    return new Optional(optional.getOption, optional.set);
};
var fromTraversal = function (traversal) { return new Traversal(traversal.modifyF); };
//
// old APIs
//
var update = function (o, k, a) {
    var _a;
    return a === o[k] ? o : Object.assign({}, o, (_a = {}, _a[k] = a, _a));
};
/**
 * Laws:
 * 1. `get(set(a)(s)) = a`
 * 2. `set(get(s))(s) = s`
 * 3. `set(a)(set(a)(s)) = set(a)(s)`
 *
 * @category constructor
 * @since 1.0.0
 */
var Lens = /** @class */ (function () {
    function Lens(get, set) {
        this.get = get;
        this.set = set;
        /**
         * @since 1.0.0
         */
        this._tag = 'Lens';
    }
    /**
     * @example
     * import { Lens } from 'monocle-ts'
     *
     * type Person = {
     *   name: string
     *   age: number
     *   address: {
     *     city: string
     *   }
     * }
     *
     * const city = Lens.fromPath<Person>()(['address', 'city'])
     *
     * const person: Person = { name: 'Giulio', age: 43, address: { city: 'Milan' } }
     *
     * assert.strictEqual(city.get(person), 'Milan')
     * assert.deepStrictEqual(city.set('London')(person), { name: 'Giulio', age: 43, address: { city: 'London' } })
     *
     * @since 1.0.0
     */
    Lens.fromPath = function () {
        var fromProp = Lens.fromProp();
        return function (path) {
            var lens = fromProp(path[0]);
            return path.slice(1).reduce(function (acc, prop) { return acc.compose(fromProp(prop)); }, lens);
        };
    };
    /**
     * Returns a `Lens` from a type and a prop
     *
     * @example
     * import { Lens } from 'monocle-ts'
     *
     * type Person = {
     *   name: string
     *   age: number
     * }
     *
     * const age = Lens.fromProp<Person>()('age')
     *
     * const person: Person = { name: 'Giulio', age: 43 }
     *
     * assert.strictEqual(age.get(person), 43)
     * assert.deepStrictEqual(age.set(44)(person), { name: 'Giulio', age: 44 })
     *
     * @since 1.0.0
     */
    Lens.fromProp = function () {
        return function (prop$1) { return fromLens(pipe(id(), prop(prop$1))); };
    };
    Lens.fromProps = function () {
        return function (props$1) { return fromLens(pipe(id(), props.apply(lens$1, props$1))); };
    };
    /**
     * Returns a `Lens` from a nullable (`A | null | undefined`) prop
     *
     * @example
     * import { Lens } from 'monocle-ts'
     *
     * interface Outer {
     *   inner?: Inner
     * }
     *
     * interface Inner {
     *   value: number
     *   foo: string
     * }
     *
     * const inner = Lens.fromNullableProp<Outer>()('inner', { value: 0, foo: 'foo' })
     * const value = Lens.fromProp<Inner>()('value')
     * const lens = inner.compose(value)
     *
     * assert.deepStrictEqual(lens.set(1)({}), { inner: { value: 1, foo: 'foo' } })
     * assert.strictEqual(lens.get({}), 0)
     * assert.deepStrictEqual(lens.set(1)({ inner: { value: 1, foo: 'bar' } }), { inner: { value: 1, foo: 'bar' } })
     * assert.strictEqual(lens.get({ inner: { value: 1, foo: 'bar' } }), 1)
     *
     * @since 1.0.0
     */
    Lens.fromNullableProp = function () {
        return function (k, defaultValue) {
            return new Lens(function (s) {
                var osk = fromNullable$1(s[k]);
                if (isNone(osk)) {
                    return defaultValue;
                }
                else {
                    return osk.value;
                }
            }, function (a) { return function (s) { return update(s, k, a); }; });
        };
    };
    /**
     * @since 1.0.0
     */
    Lens.prototype.modify = function (f) {
        return modify$2(f)(this);
    };
    /**
     * view a `Lens` as a Optional
     *
     * @since 1.0.0
     */
    Lens.prototype.asOptional = function () {
        return fromOptional(asOptional$1(this));
    };
    /**
     * view a `Lens` as a `Traversal`
     *
     * @since 1.0.0
     */
    Lens.prototype.asTraversal = function () {
        return fromTraversal(asTraversal$2(this));
    };
    /**
     * view a `Lens` as a `Setter`
     *
     * @since 1.0.0
     */
    Lens.prototype.asSetter = function () {
        var _this = this;
        return new Setter(function (f) { return _this.modify(f); });
    };
    /**
     * view a `Lens` as a `Getter`
     *
     * @since 1.0.0
     */
    Lens.prototype.asGetter = function () {
        var _this = this;
        return new Getter(function (s) { return _this.get(s); });
    };
    /**
     * view a `Lens` as a `Fold`
     *
     * @since 1.0.0
     */
    Lens.prototype.asFold = function () {
        var _this = this;
        return new Fold(function () { return function (f) { return function (s) { return f(_this.get(s)); }; }; });
    };
    /**
     * compose a `Lens` with a `Lens`
     *
     * @since 1.0.0
     */
    Lens.prototype.compose = function (ab) {
        return fromLens(compose$3(ab)(this));
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeLens = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Lens` with a `Getter`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeGetter = function (ab) {
        return this.asGetter().compose(ab);
    };
    /**
     * compose a `Lens` with a `Fold`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeFold = function (ab) {
        return this.asFold().compose(ab);
    };
    /**
     * compose a `Lens` with an `Optional`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeOptional = function (ab) {
        return fromOptional(pipe(this, asOptional$1, compose$2(ab)));
    };
    /**
     * compose a `Lens` with an `Traversal`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeTraversal = function (ab) {
        return fromTraversal(pipe(this, asTraversal$2, compose(ab)));
    };
    /**
     * compose a `Lens` with an `Setter`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeSetter = function (ab) {
        return this.asSetter().compose(ab);
    };
    /**
     * compose a `Lens` with an `Iso`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeIso = function (ab) {
        return fromLens(pipe(this, compose$3(pipe(ab, asLens))));
    };
    /**
     * compose a `Lens` with a `Prism`
     *
     * @since 1.0.0
     */
    Lens.prototype.composePrism = function (ab) {
        return fromOptional(composePrism(ab)(this));
    };
    return Lens;
}());
/**
 * Laws:
 * 1. `pipe(getOption(s), fold(() => s, reverseGet)) = s`
 * 2. `getOption(reverseGet(a)) = some(a)`
 *
 * @category constructor
 * @since 1.0.0
 */
var Prism = /** @class */ (function () {
    function Prism(getOption, reverseGet) {
        this.getOption = getOption;
        this.reverseGet = reverseGet;
        /**
         * @since 1.0.0
         */
        this._tag = 'Prism';
    }
    Prism.fromPredicate = function (predicate) {
        return fromPrism(fromPredicate(predicate));
    };
    /**
     * @since 1.0.0
     */
    Prism.some = function () {
        return somePrism;
    };
    /**
     * @since 1.0.0
     */
    Prism.prototype.modify = function (f) {
        var _this = this;
        return function (s) {
            var os = _this.modifyOption(f)(s);
            if (isNone(os)) {
                return s;
            }
            else {
                return os.value;
            }
        };
    };
    /**
     * @since 1.0.0
     */
    Prism.prototype.modifyOption = function (f) {
        var _this = this;
        return function (s) {
            return option.map(_this.getOption(s), function (v) {
                var n = f(v);
                return n === v ? s : _this.reverseGet(n);
            });
        };
    };
    /**
     * set the target of a `Prism` with a value
     *
     * @since 1.0.0
     */
    Prism.prototype.set = function (a) {
        return this.modify(function () { return a; });
    };
    /**
     * view a `Prism` as a `Optional`
     *
     * @since 1.0.0
     */
    Prism.prototype.asOptional = function () {
        return fromOptional(asOptional(this));
    };
    /**
     * view a `Prism` as a `Traversal`
     *
     * @since 1.0.0
     */
    Prism.prototype.asTraversal = function () {
        return fromTraversal(asTraversal(this));
    };
    /**
     * view a `Prism` as a `Setter`
     *
     * @since 1.0.0
     */
    Prism.prototype.asSetter = function () {
        var _this = this;
        return new Setter(function (f) { return _this.modify(f); });
    };
    /**
     * view a `Prism` as a `Fold`
     *
     * @since 1.0.0
     */
    Prism.prototype.asFold = function () {
        var _this = this;
        return new Fold(function (M) { return function (f) { return function (s) {
            var oa = _this.getOption(s);
            return isNone(oa) ? M.empty : f(oa.value);
        }; }; });
    };
    /**
     * compose a `Prism` with a `Prism`
     *
     * @since 1.0.0
     */
    Prism.prototype.compose = function (ab) {
        return fromPrism(compose$1(ab)(this));
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Prism.prototype.composePrism = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Prism` with a `Optional`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeOptional = function (ab) {
        return fromOptional(pipe(this, asOptional, compose$2(ab)));
    };
    /**
     * compose a `Prism` with a `Traversal`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeTraversal = function (ab) {
        return fromTraversal(pipe(this, asTraversal, compose(ab)));
    };
    /**
     * compose a `Prism` with a `Fold`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeFold = function (ab) {
        return this.asFold().compose(ab);
    };
    /**
     * compose a `Prism` with a `Setter`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeSetter = function (ab) {
        return this.asSetter().compose(ab);
    };
    /**
     * compose a `Prism` with a `Iso`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeIso = function (ab) {
        return fromPrism(pipe(this, compose$1(pipe(ab, asPrism))));
    };
    /**
     * compose a `Prism` with a `Lens`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeLens = function (ab) {
        return fromOptional(composeLens(ab)(this));
    };
    /**
     * compose a `Prism` with a `Getter`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeGetter = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    return Prism;
}());
var somePrism = new Prism(identity, some$1);
/**
 * Laws:
 * 1. `pipe(getOption(s), fold(() => s, a => set(a)(s))) = s`
 * 2. `getOption(set(a)(s)) = pipe(getOption(s), map(_ => a))`
 * 3. `set(a)(set(a)(s)) = set(a)(s)`
 *
 * @category constructor
 * @since 1.0.0
 */
var Optional = /** @class */ (function () {
    function Optional(getOption, set) {
        this.getOption = getOption;
        this.set = set;
        /**
         * @since 1.0.0
         */
        this._tag = 'Optional';
    }
    /**
     * Returns an `Optional` from a nullable (`A | null | undefined`) prop
     *
     * @example
     * import { Optional } from 'monocle-ts'
     *
     * interface Phone {
     *   number: string
     * }
     * interface Employment {
     *   phone?: Phone
     * }
     * interface Info {
     *   employment?: Employment
     * }
     * interface Response {
     *   info?: Info
     * }
     *
     * const numberFromResponse = Optional.fromPath<Response>()(['info', 'employment', 'phone', 'number'])
     *
     * const response1: Response = {
     *   info: {
     *     employment: {
     *       phone: {
     *         number: '555-1234'
     *       }
     *     }
     *   }
     * }
     * const response2: Response = {
     *   info: {
     *     employment: {}
     *   }
     * }
     *
     * numberFromResponse.getOption(response1) // some('555-1234')
     * numberFromResponse.getOption(response2) // none
     *
     * @since 2.1.0
     */
    Optional.fromPath = function () {
        var fromNullableProp = Optional.fromNullableProp();
        return function (path) {
            var optional = fromNullableProp(path[0]);
            return path.slice(1).reduce(function (acc, prop) { return acc.compose(fromNullableProp(prop)); }, optional);
        };
    };
    /**
     * @example
     * import { Optional } from 'monocle-ts'
     *
     * interface S {
     *   a: number | undefined | null
     * }
     *
     * const optional = Optional.fromNullableProp<S>()('a')
     *
     * const s1: S = { a: undefined }
     * const s2: S = { a: null }
     * const s3: S = { a: 1 }
     *
     * assert.deepStrictEqual(optional.set(2)(s1), s1)
     * assert.deepStrictEqual(optional.set(2)(s2), s2)
     * assert.deepStrictEqual(optional.set(2)(s3), { a: 2 })
     *
     * @since 1.0.0
     */
    Optional.fromNullableProp = function () {
        return function (k) {
            return new Optional(function (s) { return fromNullable$1(s[k]); }, function (a) { return function (s) { return (s[k] == null ? s : update(s, k, a)); }; });
        };
    };
    /**
     * Returns an `Optional` from an option (`Option<A>`) prop
     *
     * @example
     * import { Optional } from 'monocle-ts'
     * import * as O from 'fp-ts/es6/Option'
     *
     * interface S {
     *   a: O.Option<number>
     * }
     *
     * const optional = Optional.fromOptionProp<S>()('a')
     * const s1: S = { a: O.none }
     * const s2: S = { a: O.some(1) }
     * assert.deepStrictEqual(optional.set(2)(s1), s1)
     * assert.deepStrictEqual(optional.set(2)(s2), { a: O.some(2) })
     *
     * @since 1.0.0
     */
    Optional.fromOptionProp = function () {
        var formProp = Lens.fromProp();
        return function (prop) { return formProp(prop).composePrism(somePrism); };
    };
    /**
     * @since 1.0.0
     */
    Optional.prototype.modify = function (f) {
        return modify$1(f)(this);
    };
    /**
     * @since 1.0.0
     */
    Optional.prototype.modifyOption = function (f) {
        return modifyOption(f)(this);
    };
    /**
     * view a `Optional` as a `Traversal`
     *
     * @since 1.0.0
     */
    Optional.prototype.asTraversal = function () {
        return fromTraversal(asTraversal$1(this));
    };
    /**
     * view an `Optional` as a `Fold`
     *
     * @since 1.0.0
     */
    Optional.prototype.asFold = function () {
        var _this = this;
        return new Fold(function (M) { return function (f) { return function (s) {
            var oa = _this.getOption(s);
            return isNone(oa) ? M.empty : f(oa.value);
        }; }; });
    };
    /**
     * view an `Optional` as a `Setter`
     *
     * @since 1.0.0
     */
    Optional.prototype.asSetter = function () {
        var _this = this;
        return new Setter(function (f) { return _this.modify(f); });
    };
    /**
     * compose a `Optional` with a `Optional`
     *
     * @since 1.0.0
     */
    Optional.prototype.compose = function (ab) {
        return fromOptional(compose$2(ab)(this));
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeOptional = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose an `Optional` with a `Traversal`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeTraversal = function (ab) {
        return fromTraversal(pipe(this, asTraversal$1, compose(ab)));
    };
    /**
     * compose an `Optional` with a `Fold`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeFold = function (ab) {
        return this.asFold().compose(ab);
    };
    /**
     * compose an `Optional` with a `Setter`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeSetter = function (ab) {
        return this.asSetter().compose(ab);
    };
    /**
     * compose an `Optional` with a `Lens`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeLens = function (ab) {
        return fromOptional(pipe(this, compose$2(pipe(ab, asOptional$1))));
    };
    /**
     * compose an `Optional` with a `Prism`
     *
     * @since 1.0.0
     */
    Optional.prototype.composePrism = function (ab) {
        return fromOptional(pipe(this, compose$2(pipe(ab, asOptional))));
    };
    /**
     * compose an `Optional` with a `Iso`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeIso = function (ab) {
        return fromOptional(pipe(this, compose$2(pipe(ab, asOptional$2))));
    };
    /**
     * compose an `Optional` with a `Getter`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeGetter = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    return Optional;
}());
/**
 * @category constructor
 * @since 1.0.0
 */
var Traversal = /** @class */ (function () {
    function Traversal(
    // Van Laarhoven representation
    modifyF) {
        this.modifyF = modifyF;
        /**
         * @since 1.0.0
         */
        this._tag = 'Traversal';
    }
    /**
     * @since 1.0.0
     */
    Traversal.prototype.modify = function (f) {
        return modify(f)(this);
    };
    /**
     * @since 1.0.0
     */
    Traversal.prototype.set = function (a) {
        return set(a)(this);
    };
    Traversal.prototype.filter = function (predicate) {
        return fromTraversal(filter(predicate)(this));
    };
    /**
     * view a `Traversal` as a `Fold`
     *
     * @since 1.0.0
     */
    Traversal.prototype.asFold = function () {
        var _this = this;
        return new Fold(function (M) { return function (f) {
            return _this.modifyF(getApplicative(M))(function (a) { return make(f(a)); });
        }; });
    };
    /**
     * view a `Traversal` as a `Setter`
     *
     * @since 1.0.0
     */
    Traversal.prototype.asSetter = function () {
        var _this = this;
        return new Setter(function (f) { return _this.modify(f); });
    };
    /**
     * compose a `Traversal` with a `Traversal`
     *
     * @since 1.0.0
     */
    Traversal.prototype.compose = function (ab) {
        return fromTraversal(compose(ab)(this));
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeTraversal = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Traversal` with a `Fold`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeFold = function (ab) {
        return this.asFold().compose(ab);
    };
    /**
     * compose a `Traversal` with a `Setter`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeSetter = function (ab) {
        return this.asSetter().compose(ab);
    };
    /**
     * compose a `Traversal` with a `Optional`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeOptional = function (ab) {
        return this.compose(ab.asTraversal());
    };
    /**
     * compose a `Traversal` with a `Lens`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeLens = function (ab) {
        return fromTraversal(pipe(this, compose(pipe(ab, asTraversal$2))));
    };
    /**
     * compose a `Traversal` with a `Prism`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composePrism = function (ab) {
        return fromTraversal(pipe(this, compose(pipe(ab, asTraversal))));
    };
    /**
     * compose a `Traversal` with a `Iso`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeIso = function (ab) {
        return fromTraversal(pipe(this, compose(pipe(ab, asTraversal$3))));
    };
    /**
     * compose a `Traversal` with a `Getter`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeGetter = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    return Traversal;
}());
/**
 * @category constructor
 * @since 1.0.0
 */
var Getter = /** @class */ (function () {
    function Getter(get) {
        this.get = get;
        /**
         * @since 1.0.0
         */
        this._tag = 'Getter';
    }
    /**
     * view a `Getter` as a `Fold`
     *
     * @since 1.0.0
     */
    Getter.prototype.asFold = function () {
        var _this = this;
        return new Fold(function () { return function (f) { return function (s) { return f(_this.get(s)); }; }; });
    };
    /**
     * compose a `Getter` with a `Getter`
     *
     * @since 1.0.0
     */
    Getter.prototype.compose = function (ab) {
        var _this = this;
        return new Getter(function (s) { return ab.get(_this.get(s)); });
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeGetter = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Getter` with a `Fold`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeFold = function (ab) {
        return this.asFold().compose(ab);
    };
    /**
     * compose a `Getter` with a `Lens`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeLens = function (ab) {
        return this.compose(ab.asGetter());
    };
    /**
     * compose a `Getter` with a `Iso`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeIso = function (ab) {
        return this.compose(ab.asGetter());
    };
    /**
     * compose a `Getter` with a `Optional`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeTraversal = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    /**
     * compose a `Getter` with a `Optional`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeOptional = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    /**
     * compose a `Getter` with a `Prism`
     *
     * @since 1.0.0
     */
    Getter.prototype.composePrism = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    return Getter;
}());
/**
 * @category constructor
 * @since 1.0.0
 */
var Fold = /** @class */ (function () {
    function Fold(foldMap) {
        this.foldMap = foldMap;
        /**
         * @since 1.0.0
         */
        this._tag = 'Fold';
        this.getAll = foldMap(getMonoid())(of);
        this.exist = foldMap(monoidAny);
        this.all = foldMap(monoidAll);
        this.foldMapFirst = foldMap(getFirstMonoid());
    }
    /**
     * compose a `Fold` with a `Fold`
     *
     * @since 1.0.0
     */
    Fold.prototype.compose = function (ab) {
        var _this = this;
        return new Fold(function (M) { return function (f) { return _this.foldMap(M)(ab.foldMap(M)(f)); }; });
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeFold = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Fold` with a `Getter`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeGetter = function (ab) {
        return this.compose(ab.asFold());
    };
    /**
     * compose a `Fold` with a `Traversal`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeTraversal = function (ab) {
        return this.compose(ab.asFold());
    };
    /**
     * compose a `Fold` with a `Optional`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeOptional = function (ab) {
        return this.compose(ab.asFold());
    };
    /**
     * compose a `Fold` with a `Lens`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeLens = function (ab) {
        return this.compose(ab.asFold());
    };
    /**
     * compose a `Fold` with a `Prism`
     *
     * @since 1.0.0
     */
    Fold.prototype.composePrism = function (ab) {
        return this.compose(ab.asFold());
    };
    /**
     * compose a `Fold` with a `Iso`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeIso = function (ab) {
        return this.compose(ab.asFold());
    };
    Fold.prototype.find = function (p) {
        return this.foldMapFirst(fromPredicate$1(p));
    };
    /**
     * get the first target of a `Fold`
     *
     * @since 1.0.0
     */
    Fold.prototype.headOption = function (s) {
        return this.find(function () { return true; })(s);
    };
    return Fold;
}());
/**
 * @category constructor
 * @since 1.0.0
 */
var Setter = /** @class */ (function () {
    function Setter(modify) {
        this.modify = modify;
        /**
         * @since 1.0.0
         */
        this._tag = 'Setter';
    }
    /**
     * @since 1.0.0
     */
    Setter.prototype.set = function (a) {
        return this.modify(constant$1(a));
    };
    /**
     * compose a `Setter` with a `Setter`
     *
     * @since 1.0.0
     */
    Setter.prototype.compose = function (ab) {
        var _this = this;
        return new Setter(function (f) { return _this.modify(ab.modify(f)); });
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Setter.prototype.composeSetter = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Setter` with a `Traversal`
     *
     * @since 1.0.0
     */
    Setter.prototype.composeTraversal = function (ab) {
        return this.compose(ab.asSetter());
    };
    /**
     * compose a `Setter` with a `Optional`
     *
     * @since 1.0.0
     */
    Setter.prototype.composeOptional = function (ab) {
        return this.compose(ab.asSetter());
    };
    /**
     * compose a `Setter` with a `Lens`
     *
     * @since 1.0.0
     */
    Setter.prototype.composeLens = function (ab) {
        return this.compose(ab.asSetter());
    };
    /**
     * compose a `Setter` with a `Prism`
     *
     * @since 1.0.0
     */
    Setter.prototype.composePrism = function (ab) {
        return this.compose(ab.asSetter());
    };
    /**
     * compose a `Setter` with a `Iso`
     *
     * @since 1.0.0
     */
    Setter.prototype.composeIso = function (ab) {
        return this.compose(ab.asSetter());
    };
    return Setter;
}());

var lib = {};

var symbols = {};

/**
 * Symbols used internally within ts-pattern to construct and discriminate
 * Guard, Not, and Select, and AnonymousSelect patterns
 *
 * Symbols have the advantage of not appearing in auto-complete suggestions in
 * user defined patterns, and eliminate the admittedly unlikely risk of property
 * overlap between ts-pattern internals and user defined patterns.
 *
 * These symbols have to be visible to tsc for type inference to work, but
 * users should not import them
 * @module
 * @private
 * @internal
 */
Object.defineProperty(symbols, "__esModule", { value: true });
symbols.AnonymousSelect = symbols.NamedSelect = symbols.Not = symbols.Guard = symbols.PatternKind = void 0;
/** @internal This symbol should only be used by ts-pattern's internals. */
symbols.PatternKind = Symbol('@ts-pattern/pattern-kind');
/** @internal This symbol should only be used by ts-pattern's internals. */
symbols.Guard = Symbol('@ts-pattern/guard');
/** @internal This symbol should only be used by ts-pattern's internals. */
symbols.Not = Symbol('@ts-pattern/not');
/** @internal This symbol should only be used by ts-pattern's internals. */
symbols.NamedSelect = Symbol('@ts-pattern/named-select');
/** @internal This symbol should only be used by ts-pattern's internals. */
symbols.AnonymousSelect = Symbol('@ts-pattern/anonymous-select');

var guards = {};

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOf = exports.select = exports.ANONYMOUS_SELECT_KEY = exports.not = exports.when = void 0;
const symbols$1 = symbols;
const when = (predicate) => ({
    [symbols$1.PatternKind]: symbols$1.Guard,
    [symbols$1.Guard]: predicate,
});
exports.when = when;
const not = (pattern) => ({
    [symbols$1.PatternKind]: symbols$1.Not,
    [symbols$1.Not]: pattern,
});
exports.not = not;
exports.ANONYMOUS_SELECT_KEY = '@ts-pattern/__anonymous-select-key';
function select(key) {
    return key === undefined
        ? {
            [symbols$1.PatternKind]: symbols$1.AnonymousSelect,
        }
        : {
            [symbols$1.PatternKind]: symbols$1.NamedSelect,
            [symbols$1.NamedSelect]: key,
        };
}
exports.select = select;
function isInstanceOf(classConstructor) {
    return (val) => val instanceof classConstructor;
}
const instanceOf = (classConstructor) => exports.when(isInstanceOf(classConstructor));
exports.instanceOf = instanceOf;
}(guards));

var wildcards = {};

Object.defineProperty(wildcards, "__esModule", { value: true });
wildcards.__ = void 0;
const guards_1 = guards;
function isUnknown(x) {
    return true;
}
function isNumber(x) {
    return typeof x === 'number' && !Number.isNaN(x);
}
function isString(x) {
    return typeof x === 'string';
}
function isBoolean(x) {
    return typeof x === 'boolean';
}
function isNullish(x) {
    return x === null || x === undefined;
}
const unknownGuard = guards_1.when(isUnknown);
const stringGuard = guards_1.when(isString);
const numberGuard = guards_1.when(isNumber);
const booleanGuard = guards_1.when(isBoolean);
const nullishGuard = guards_1.when(isNullish);
/**
 * ### Catch All wildcard
 * `__` is wildcard pattern, matching **any value**.
 *
 * `__.string` is wildcard pattern matching any **string**.
 *
 * `__.number` is wildcard pattern matching any **number**.
 *
 * `__.boolean` is wildcard pattern matching any **boolean**.
 *
 * `__.nullish` is wildcard pattern matching **null** or **undefined**.
 * @example
 *  match(value)
 *   .with(__, () => 'will always match')
 *   .with(__.string, () => 'will match on strings only')
 *   .with(__.number, () => 'will match on numbers only')
 *   .with(__.boolean, () => 'will match on booleans only')
 *   .with(__.nullish, () => 'will match on null or undefined only')
 */
wildcards.__ = Object.assign(unknownGuard, {
    string: stringGuard,
    number: numberGuard,
    boolean: booleanGuard,
    nullish: nullishGuard,
});

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatching = exports.match = exports.instanceOf = exports.select = exports.not = exports.when = exports.__ = void 0;
const symbols$1 = symbols;
const guards_1 = guards;
Object.defineProperty(exports, "when", { enumerable: true, get: function () { return guards_1.when; } });
Object.defineProperty(exports, "not", { enumerable: true, get: function () { return guards_1.not; } });
Object.defineProperty(exports, "select", { enumerable: true, get: function () { return guards_1.select; } });
Object.defineProperty(exports, "instanceOf", { enumerable: true, get: function () { return guards_1.instanceOf; } });
const wildcards_1 = wildcards;
Object.defineProperty(exports, "__", { enumerable: true, get: function () { return wildcards_1.__; } });
/**
 * #### match
 *
 * Entry point to create a pattern matching expression.
 *
 * It returns a `Match` builder, on which you can chain
 * several `.with(pattern, handler)` clauses.
 */
const match = (value) => builder(value, []);
exports.match = match;
/**
 * ### builder
 * This is the implementation of our pattern matching, using the
 * builder pattern.
 */
const builder = (value, cases) => {
    const run = () => {
        const entry = cases.find(({ test }) => test(value));
        if (!entry) {
            let displayedValue;
            try {
                displayedValue = JSON.stringify(value);
            }
            catch (e) {
                displayedValue = value;
            }
            throw new Error(`Pattern matching error: no pattern matches value ${displayedValue}`);
        }
        return entry.handler(entry.select(value), value);
    };
    return {
        with(...args) {
            const handler = args[args.length - 1];
            const patterns = [];
            const predicates = [];
            for (let i = 0; i < args.length - 1; i++) {
                const arg = args[i];
                if (typeof arg === 'function') {
                    predicates.push(arg);
                }
                else {
                    patterns.push(arg);
                }
            }
            let selected = {};
            const doesMatch = (value) => Boolean(patterns.some((pattern) => matchPattern(pattern, value, (key, value) => {
                selected[key] = value;
            })) && predicates.every((predicate) => predicate(value)));
            return builder(value, cases.concat([
                {
                    test: doesMatch,
                    handler,
                    select: (value) => Object.keys(selected).length
                        ? selected[guards_1.ANONYMOUS_SELECT_KEY] !== undefined
                            ? selected[guards_1.ANONYMOUS_SELECT_KEY]
                            : selected
                        : value,
                },
            ]));
        },
        when: (predicate, handler) => builder(value, cases.concat([
            {
                test: predicate,
                handler,
                select: (value) => value,
            },
        ])),
        otherwise: (handler) => builder(value, cases.concat([
            {
                test: () => true,
                handler,
                select: (value) => value,
            },
        ])).run(),
        exhaustive: () => run(),
        run,
    };
};
const isObject = (value) => Boolean(value && typeof value === 'object');
const isGuardPattern = (x) => {
    const pattern = x;
    return pattern && pattern[symbols$1.PatternKind] === symbols$1.Guard;
};
const isNotPattern = (x) => {
    const pattern = x;
    return pattern && pattern[symbols$1.PatternKind] === symbols$1.Not;
};
const isNamedSelectPattern = (x) => {
    const pattern = x;
    return pattern && pattern[symbols$1.PatternKind] === symbols$1.NamedSelect;
};
const isAnonymousSelectPattern = (x) => {
    const pattern = x;
    return pattern && pattern[symbols$1.PatternKind] === symbols$1.AnonymousSelect;
};
// tells us if the value matches a given pattern.
const matchPattern = (pattern, value, select) => {
    if (isObject(pattern)) {
        if (isGuardPattern(pattern))
            return Boolean(pattern[symbols$1.Guard](value));
        if (isNamedSelectPattern(pattern)) {
            select(pattern[symbols$1.NamedSelect], value);
            return true;
        }
        if (isAnonymousSelectPattern(pattern)) {
            select(guards_1.ANONYMOUS_SELECT_KEY, value);
            return true;
        }
        if (isNotPattern(pattern))
            return !matchPattern(pattern[symbols$1.Not], value, select);
        if (!isObject(value))
            return false;
        if (Array.isArray(pattern)) {
            if (!Array.isArray(value))
                return false;
            // List pattern
            if (pattern.length === 1) {
                const selected = {};
                const listSelect = (key, value) => {
                    selected[key] = (selected[key] || []).concat([value]);
                };
                const doesMatch = value.every((v) => matchPattern(pattern[0], v, listSelect));
                if (doesMatch) {
                    Object.keys(selected).forEach((key) => select(key, selected[key]));
                }
                return doesMatch;
            }
            // Tuple pattern
            return pattern.length === value.length
                ? pattern.every((subPattern, i) => matchPattern(subPattern, value[i], select))
                : false;
        }
        if (pattern instanceof Map) {
            if (!(value instanceof Map))
                return false;
            return [...pattern.keys()].every((key) => matchPattern(pattern.get(key), value.get(key), select));
        }
        if (pattern instanceof Set) {
            if (!(value instanceof Set))
                return false;
            if (pattern.size === 0)
                return value.size === 0;
            if (pattern.size === 1) {
                const [subPattern] = [...pattern.values()];
                return Object.values(wildcards_1.__).includes(subPattern)
                    ? matchPattern([subPattern], [...value.values()], select)
                    : value.has(subPattern);
            }
            return [...pattern.values()].every((subPattern) => value.has(subPattern));
        }
        return Object.keys(pattern).every((k) => matchPattern(
        // @ts-ignore
        pattern[k], 
        // @ts-ignore
        value[k], select));
    }
    return value === pattern;
};
function isMatching(...args) {
    if (args.length === 1) {
        const [pattern] = args;
        return (value) => matchPattern(pattern, value, () => { });
    }
    if (args.length === 2) {
        const [pattern, value] = args;
        return matchPattern(pattern, value, () => { });
    }
    throw new Error(`isMatching wasn't given enough arguments: expected 1 or 2, receive ${args.length}.`);
}
exports.isMatching = isMatching;
}(lib));

/*
 * Types
 */
var isFalse = function (x) { return typeof x === "boolean" && !x; };
var isTrue = function (x) { return typeof x === "boolean" && x; };

/*
 * Types
 */
var ExtensionConfigKeys;
(function (ExtensionConfigKeys) {
    ExtensionConfigKeys["FormatterPath"] = "hansjhoffman.nix.config.nixFormatPath";
    ExtensionConfigKeys["FormatOnSave"] = "hansjhoffman.nix.config.formatOnSave";
    ExtensionConfigKeys["FormatDocument"] = "hansjhoffman.nix.commands.formatDocument";
})(ExtensionConfigKeys || (ExtensionConfigKeys = {}));
/*
 * Helpers
 */
var showNotification = function (body) {
    if (nova.inDevMode()) {
        var notification = new NotificationRequest("nix-nova-notification");
        notification.title = nova.localize(nova.extension.name);
        notification.body = nova.localize(body);
        nova.notifications.add(notification);
    }
};
var safeFormat = function (editor, formatterPath) {
    var documentPath = editor.document.path;
    return tryCatch(function () {
        return new Promise(function (resolve, reject) {
            var process = new Process("/usr/bin/env", {
                args: ["" + formatterPath, "" + documentPath],
            });
            process.onDidExit(function (status) { return (status === 0 ? resolve() : reject()); });
            process.start();
        });
    }, function () { return ({
        _tag: "invokeFormatterErrror",
        reason: "Failed to format the document. This is likely a bug with nixfmt.",
    }); });
};
/*
 * Main
 */
var configs = {
    workspace: {
        formatOnSave: pipe$1(fromNullable$1(nova.workspace.config.get(ExtensionConfigKeys.FormatOnSave)), chain(function (value) { return fromEither(boolean.decode(value)); }), getOrElseW(function () { return false; })),
        formatterPath: pipe$1(fromNullable$1(nova.workspace.config.get(ExtensionConfigKeys.FormatterPath)), chain(function (path) { return fromEither(string.decode(path)); }), chain(fromPredicate$1(function (path) { return isFalse(isEmpty(path)); }))),
    },
    global: {
        formatOnSave: pipe$1(fromNullable$1(nova.config.get(ExtensionConfigKeys.FormatOnSave)), chain(function (value) { return fromEither(boolean.decode(value)); }), getOrElseW(function () { return false; })),
        formatterPath: pipe$1(fromNullable$1(nova.config.get(ExtensionConfigKeys.FormatterPath)), chain(function (path) { return fromEither(string.decode(path)); }), chain(fromPredicate$1(function (path) { return isFalse(isEmpty(path)); }))),
    },
};
var workspaceConfigsLens = Lens.fromPath()(["workspace"]);
var globalConfigsLens = Lens.fromPath()(["global"]);
var saveListeners = new Map();
/**
 * Gets a value giving precedence to workspace over global extension values.
 * @param {ExtensionSettings} configs - extension settings
 */
var selectFormatOnSave = function (configs) {
    var workspace = workspaceConfigsLens.get(configs);
    var global = globalConfigsLens.get(configs);
    return workspace.formatOnSave || global.formatOnSave;
};
/**
 * Gets a value giving precedence to workspace over global extension values.
 * @param {ExtensionSettings} configs - extension settings
 */
var selectFormatterPath = function (configs) {
    var workspace = workspaceConfigsLens.get(configs);
    var global = globalConfigsLens.get(configs);
    return isSome(workspace.formatterPath)
        ? workspace.formatterPath
        : isSome(global.formatterPath)
            ? global.formatterPath
            : none;
};
var addSaveListener = function (editor) {
    pipe$1(fromNullable$1(editor.document.syntax), chain(fromPredicate$1(function (syntax) { return Eq.equals(syntax, "nix"); })), fold(constVoid, function (_) {
        saveListeners = pipe$1(saveListeners, upsertAt$1(Eq)(editor.document.uri, editor.onWillSave(formatDocument)));
    }));
};
var clearSaveListeners = function () {
    pipe$1(saveListeners, map$1(function (disposable) { return disposable.dispose(); }));
};
var formatDocument = function (editor) {
    pipe$1(selectFormatterPath(configs), fold(function () { return console.log("Skipping... No formatter set."); }, function (path) {
        safeFormat(editor, path)().then(fold$1(function (err) {
            return lib.match(err)
                .with({ _tag: "invokeFormatterErrror" }, function (_a) {
                var reason = _a.reason;
                return console.error(reason);
            })
                .exhaustive();
        }, function () { return console.log("Formatted: " + editor.document.uri); }));
    }));
};
var activate = function () {
    console.log("Activating...");
    showNotification("Starting extension...");
    nova.workspace.onDidAddTextEditor(function (editor) {
        var shouldFormatOnSave = selectFormatOnSave(configs);
        if (isTrue(shouldFormatOnSave)) {
            addSaveListener(editor);
        }
    });
    nova.commands.register(ExtensionConfigKeys.FormatDocument, formatDocument);
    nova.workspace.config.observe(ExtensionConfigKeys.FormatterPath, function (newValue, oldValue) {
        pipe$1(sequenceT(Applicative)(fromEither(string.decode(newValue)), fromEither(string.decode(oldValue))), chain(fromPredicate$1(function (_a) {
            var newValue_ = _a[0], oldValue_ = _a[1];
            return isFalse(Eq.equals(newValue_, oldValue_));
        })), chain(fromPredicate$1(function (_a) {
            var newValue_ = _a[0]; _a[1];
            return isFalse(isEmpty(newValue_));
        })), fold(constVoid, function (_a) {
            var newValue_ = _a[0]; _a[1];
            configs = workspaceConfigsLens.modify(function (workspace) { return (__assign(__assign({}, workspace), { formatterPath: some$1(newValue_) })); })(configs);
        }));
    });
    nova.config.observe(ExtensionConfigKeys.FormatterPath, function (newValue, oldValue) {
        pipe$1(sequenceT(Applicative)(fromEither(string.decode(newValue)), fromEither(string.decode(oldValue))), chain(fromPredicate$1(function (_a) {
            var newValue_ = _a[0], oldValue_ = _a[1];
            return isFalse(Eq.equals(newValue_, oldValue_));
        })), chain(fromPredicate$1(function (_a) {
            var newValue_ = _a[0]; _a[1];
            return isFalse(isEmpty(newValue_));
        })), fold(constVoid, function (_a) {
            var newValue_ = _a[0]; _a[1];
            configs = globalConfigsLens.modify(function (global) { return (__assign(__assign({}, global), { formatterPath: some$1(newValue_) })); })(configs);
        }));
    });
    nova.workspace.config.observe(ExtensionConfigKeys.FormatOnSave, function (newValue, oldValue) {
        pipe$1(sequenceT(Applicative)(fromEither(boolean.decode(newValue)), fromEither(boolean.decode(oldValue))), chain(fromPredicate$1(function (_a) {
            var newValue_ = _a[0], oldValue_ = _a[1];
            return isFalse(Eq$1.equals(newValue_, oldValue_));
        })), fold(constVoid, function (_a) {
            var newValue_ = _a[0]; _a[1];
            console.log("[workspace]: pre-update ==> ", selectFormatOnSave(configs));
            configs = workspaceConfigsLens.modify(function (workspace) { return (__assign(__assign({}, workspace), { formatOnSave: newValue_ })); })(configs);
            var shouldFormatOnSave = selectFormatOnSave(configs);
            if (isFalse(shouldFormatOnSave)) {
                console.log("[workspace]: removing listeners...");
                clearSaveListeners();
            }
            else {
                console.log("[workspace]: adding listeners...");
                nova.workspace.textEditors.forEach(addSaveListener);
            }
        }));
    });
    nova.config.observe(ExtensionConfigKeys.FormatOnSave, function (newValue, oldValue) {
        pipe$1(sequenceT(Applicative)(fromEither(boolean.decode(newValue)), fromEither(boolean.decode(oldValue))), chain(fromPredicate$1(function (_a) {
            var newValue_ = _a[0], oldValue_ = _a[1];
            return isFalse(Eq$1.equals(newValue_, oldValue_));
        })), fold(constVoid, function (_a) {
            var newValue_ = _a[0]; _a[1];
            configs = globalConfigsLens.modify(function (global) { return (__assign(__assign({}, global), { formatOnSave: newValue_ })); })(configs);
            var shouldFormatOnSave = selectFormatOnSave(configs);
            if (isFalse(shouldFormatOnSave)) {
                console.log("[global]: removing listeners...");
                clearSaveListeners();
            }
            else {
                console.log("[global]: adding listeners...");
                nova.workspace.textEditors.forEach(addSaveListener);
            }
        }));
    });
    console.log("Activated 🎉");
};
var deactivate = function () {
    console.log("Deactivating...");
    clearSaveListeners();
};

exports.activate = activate;
exports.deactivate = deactivate;
exports.safeFormat = safeFormat;
//# sourceMappingURL=main.dist.js.map
