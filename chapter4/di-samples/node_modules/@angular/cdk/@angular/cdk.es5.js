import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, Inject, Injectable, InjectionToken, Input, IterableDiffers, NgModule, NgZone, Optional, Output, Renderer2, SkipSelf, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, isDevMode } from '@angular/core';
import { _finally } from 'rxjs/operator/finally';
import { _catch } from 'rxjs/operator/catch';
import { _do } from 'rxjs/operator/do';
import { map } from 'rxjs/operator/map';
import { filter } from 'rxjs/operator/filter';
import { share } from 'rxjs/operator/share';
import { first } from 'rxjs/operator/first';
import { switchMap } from 'rxjs/operator/switchMap';
import { startWith } from 'rxjs/operator/startWith';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { auditTime } from 'rxjs/operator/auditTime';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { DOCUMENT } from '@angular/platform-browser';
import { merge } from 'rxjs/observable/merge';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
 * Coerces a data-bound value (typically a string) to a boolean.
 * @param {?} value
 * @return {?}
 */
function coerceBooleanProperty(value) {
    return value != null && "" + value !== 'false';
}
// Whether the current platform supports the V8 Break Iterator. The V8 check
// is necessary to detect all Blink based browsers.
var hasV8BreakIterator = (typeof (Intl) !== 'undefined' && ((Intl)).v8BreakIterator);
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 * \@docs-private
 */
var Platform = /*@__PURE__*/(function () {
    function Platform() {
        this.isBrowser = typeof document === 'object' && !!document;
        /**
         * Layout Engines
         */
        this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
        this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
        // EdgeHTML and Trident mock Blink specific things and need to be excluded from this check.
        this.BLINK = this.isBrowser &&
            (!!(((window)).chrome || hasV8BreakIterator) && !!CSS && !this.EDGE && !this.TRIDENT);
        // Webkit is part of the userAgent in EdgeHTML, Blink and Trident. Therefore we need to
        // ensure that Webkit runs standalone and is not used as another engine's base.
        this.WEBKIT = this.isBrowser &&
            /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
        /**
         * Browsers and Platform Types
         */
        this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        // It's difficult to detect the plain Gecko engine, because most of the browsers identify
        // them self as Gecko-like browsers and modify the userAgent's according to that.
        // Since we only cover one explicit Firefox case, we can simply check for Firefox
        // instead of having an unstable check for Gecko.
        this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
        // Trident on mobile adds the android platform to the userAgent to trick detections.
        this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
        // Safari browsers will include the Safari keyword in their userAgent. Some browsers may fake
        // this and just place the Safari keyword in the userAgent. To be more safe about Safari every
        // Safari browser should also use Webkit as its layout engine.
        this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    }
    return Platform;
}());
Platform.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Platform.ctorParameters = function () { return []; };
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
var InteractivityChecker = /*@__PURE__*/(function () {
    /**
     * @param {?} _platform
     */
    function InteractivityChecker(_platform) {
        this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is disabled.
     */
    InteractivityChecker.prototype.isDisabled = function (element) {
        // This does not capture some cases, such as a non-form control with a disabled attribute or
        // a form control inside of a disabled form, but should capture the most common cases.
        return element.hasAttribute('disabled');
    };
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @param {?} element
     * @return {?} Whether the element is visible.
     */
    InteractivityChecker.prototype.isVisible = function (element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    };
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is tabbable.
     */
    InteractivityChecker.prototype.isTabbable = function (element) {
        // Nothing is tabbable on the the server 😎
        if (!this._platform.isBrowser) {
            return false;
        }
        var /** @type {?} */ frameElement = (getWindow(element).frameElement);
        if (frameElement) {
            var /** @type {?} */ frameType = frameElement && frameElement.nodeName.toLowerCase();
            // Frame elements inherit their tabindex onto all child elements.
            if (getTabIndexValue(frameElement) === -1) {
                return false;
            }
            // Webkit and Blink consider anything inside of an <object> element as non-tabbable.
            if ((this._platform.BLINK || this._platform.WEBKIT) && frameType === 'object') {
                return false;
            }
            // Webkit and Blink disable tabbing to an element inside of an invisible frame.
            if ((this._platform.BLINK || this._platform.WEBKIT) && !this.isVisible(frameElement)) {
                return false;
            }
        }
        var /** @type {?} */ nodeName = element.nodeName.toLowerCase();
        var /** @type {?} */ tabIndexValue = getTabIndexValue(element);
        if (element.hasAttribute('contenteditable')) {
            return tabIndexValue !== -1;
        }
        if (nodeName === 'iframe') {
            // The frames may be tabbable depending on content, but it's not possibly to reliably
            // investigate the content of the frames.
            return false;
        }
        if (nodeName === 'audio') {
            if (!element.hasAttribute('controls')) {
                // By default an <audio> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK) {
                // In Blink <audio controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'video') {
            if (!element.hasAttribute('controls') && this._platform.TRIDENT) {
                // In Trident a <video> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK || this._platform.FIREFOX) {
                // In Chrome and Firefox <video controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'object' && (this._platform.BLINK || this._platform.WEBKIT)) {
            // In all Blink and WebKit based browsers <object> elements are never tabbable.
            return false;
        }
        // In iOS the browser only considers some specific elements as tabbable.
        if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
            return false;
        }
        return element.tabIndex >= 0;
    };
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is focusable.
     */
    InteractivityChecker.prototype.isFocusable = function (element) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) && this.isVisible(element);
    };
    return InteractivityChecker;
}());
InteractivityChecker.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
InteractivityChecker.ctorParameters = function () { return [
    { type: Platform, },
]; };
/**
 * Checks whether the specified element has any geometry / rectangles.
 * @param {?} element
 * @return {?}
 */
function hasGeometry(element) {
    // Use logic from jQuery to check for an invisible element.
    // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}
/**
 * Gets whether an element's
 * @param {?} element
 * @return {?}
 */
function isNativeFormElement(element) {
    var /** @type {?} */ nodeName = element.nodeName.toLowerCase();
    return nodeName === 'input' ||
        nodeName === 'select' ||
        nodeName === 'button' ||
        nodeName === 'textarea';
}
/**
 * Gets whether an element is an <input type="hidden">.
 * @param {?} element
 * @return {?}
 */
function isHiddenInput(element) {
    return isInputElement(element) && element.type == 'hidden';
}
/**
 * Gets whether an element is an anchor that has an href attribute.
 * @param {?} element
 * @return {?}
 */
function isAnchorWithHref(element) {
    return isAnchorElement(element) && element.hasAttribute('href');
}
/**
 * Gets whether an element is an input element.
 * @param {?} element
 * @return {?}
 */
function isInputElement(element) {
    return element.nodeName.toLowerCase() == 'input';
}
/**
 * Gets whether an element is an anchor element.
 * @param {?} element
 * @return {?}
 */
function isAnchorElement(element) {
    return element.nodeName.toLowerCase() == 'a';
}
/**
 * Gets whether an element has a valid tabindex.
 * @param {?} element
 * @return {?}
 */
function hasValidTabIndex(element) {
    if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
        return false;
    }
    var /** @type {?} */ tabIndex = element.getAttribute('tabindex');
    // IE11 parses tabindex="" as the value "-32768"
    if (tabIndex == '-32768') {
        return false;
    }
    return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
/**
 * Returns the parsed tabindex from the element attributes instead of returning the
 * evaluated tabindex from the browsers defaults.
 * @param {?} element
 * @return {?}
 */
function getTabIndexValue(element) {
    if (!hasValidTabIndex(element)) {
        return null;
    }
    // See browser issue in Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
    var /** @type {?} */ tabIndex = parseInt(element.getAttribute('tabindex') || '', 10);
    return isNaN(tabIndex) ? -1 : tabIndex;
}
/**
 * Checks whether the specified element is potentially tabbable on iOS
 * @param {?} element
 * @return {?}
 */
function isPotentiallyTabbableIOS(element) {
    var /** @type {?} */ nodeName = element.nodeName.toLowerCase();
    var /** @type {?} */ inputType = nodeName === 'input' && ((element)).type;
    return inputType === 'text'
        || inputType === 'password'
        || nodeName === 'select'
        || nodeName === 'textarea';
}
/**
 * Gets whether an element is potentially focusable without taking current visible/disabled state
 * into account.
 * @param {?} element
 * @return {?}
 */
function isPotentiallyFocusable(element) {
    // Inputs are potentially focusable *unless* they're type="hidden".
    if (isHiddenInput(element)) {
        return false;
    }
    return isNativeFormElement(element) ||
        isAnchorWithHref(element) ||
        element.hasAttribute('contenteditable') ||
        hasValidTabIndex(element);
}
/**
 * Gets the parent window of a DOM node with regards of being inside of an iframe.
 * @param {?} node
 * @return {?}
 */
function getWindow(node) {
    return node.ownerDocument.defaultView || window;
}
/**
 * Utility class used to chain RxJS operators.
 *
 * This class is the concrete implementation, but the type used by the user when chaining
 * is StrictRxChain. The strict chain enforces types on the operators to the same level as
 * the prototype-added equivalents.
 */
var RxChain = /*@__PURE__*/(function () {
    /**
     * @param {?} _context
     */
    function RxChain(_context) {
        this._context = _context;
    }
    /**
     * Starts a new chain and specifies the initial `this` value.
     * @template T
     * @param {?} context Initial `this` value for the chain.
     * @return {?}
     */
    RxChain.from = function (context) {
        return new RxChain(context);
    };
    /**
     * Invokes an RxJS operator as a part of the chain.
     * @param {?} operator Operator to be invoked.
     * @param {...?} args Arguments to be passed to the operator.
     * @return {?}
     */
    RxChain.prototype.call = function (operator) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._context = operator.call.apply(operator, [this._context].concat(args));
        return this;
    };
    /**
     * Subscribes to the result of the chain.
     * @param {?} fn Callback to be invoked when the result emits a value.
     * @return {?}
     */
    RxChain.prototype.subscribe = function (fn) {
        return this._context.subscribe(fn);
    };
    /**
     * Returns the result of the chain.
     * @return {?}
     */
    RxChain.prototype.result = function () {
        return this._context;
    };
    return RxChain;
}());
var FinallyBrand = /*@__PURE__*/(function () {
    function FinallyBrand() {
    }
    return FinallyBrand;
}());
var CatchBrand = /*@__PURE__*/(function () {
    function CatchBrand() {
    }
    return CatchBrand;
}());
var DoBrand = /*@__PURE__*/(function () {
    function DoBrand() {
    }
    return DoBrand;
}());
var MapBrand = /*@__PURE__*/(function () {
    function MapBrand() {
    }
    return MapBrand;
}());
var FilterBrand = /*@__PURE__*/(function () {
    function FilterBrand() {
    }
    return FilterBrand;
}());
var ShareBrand = /*@__PURE__*/(function () {
    function ShareBrand() {
    }
    return ShareBrand;
}());
var FirstBrand = /*@__PURE__*/(function () {
    function FirstBrand() {
    }
    return FirstBrand;
}());
var SwitchMapBrand = /*@__PURE__*/(function () {
    function SwitchMapBrand() {
    }
    return SwitchMapBrand;
}());
var StartWithBrand = /*@__PURE__*/(function () {
    function StartWithBrand() {
    }
    return StartWithBrand;
}());
var DebounceTimeBrand = /*@__PURE__*/(function () {
    function DebounceTimeBrand() {
    }
    return DebounceTimeBrand;
}());
var AuditTimeBrand = /*@__PURE__*/(function () {
    function AuditTimeBrand() {
    }
    return AuditTimeBrand;
}());
var TakeUntilBrand = /*@__PURE__*/(function () {
    function TakeUntilBrand() {
    }
    return TakeUntilBrand;
}());
// We add `Function` to the type intersection to make this nomically different from
// `finallyOperatorType` while still being structurally the same. Without this, TypeScript tries to
// reduce `typeof _finallyOperator & FinallyBrand` to `finallyOperatorType<T>` and then fails
// because `T` isn't known.
var finallyOperator = (_finally);
var catchOperator = (_catch);
var doOperator = (_do);
var map$1 = (map);
var filter$1 = (filter);
var share$1 = (share);
var first$1 = (first);
var switchMap$1 = (switchMap);
var startWith$1 = (startWith);
var debounceTime$1 = (debounceTime);
var auditTime$1 = (auditTime);
var takeUntil$1 = (takeUntil);
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * NOTE: This class currently uses a very simple (naive) approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 * This will be replaced with a more intelligent solution before the library is considered stable.
 */
var FocusTrap = /*@__PURE__*/(function () {
    /**
     * @param {?} _element
     * @param {?} _platform
     * @param {?} _checker
     * @param {?} _ngZone
     * @param {?=} deferAnchors
     */
    function FocusTrap(_element, _platform, _checker, _ngZone, deferAnchors) {
        if (deferAnchors === void 0) { deferAnchors = false; }
        this._element = _element;
        this._platform = _platform;
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._enabled = true;
        if (!deferAnchors) {
            this.attachAnchors();
        }
    }
    Object.defineProperty(FocusTrap.prototype, "enabled", {
        /**
         * Whether the focus trap is active.
         * @return {?}
         */
        get: function () { return this._enabled; },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._enabled = val;
            if (this._startAnchor && this._endAnchor) {
                this._startAnchor.tabIndex = this._endAnchor.tabIndex = this._enabled ? 0 : -1;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Destroys the focus trap by cleaning up the anchors.
     * @return {?}
     */
    FocusTrap.prototype.destroy = function () {
        if (this._startAnchor && this._startAnchor.parentNode) {
            this._startAnchor.parentNode.removeChild(this._startAnchor);
        }
        if (this._endAnchor && this._endAnchor.parentNode) {
            this._endAnchor.parentNode.removeChild(this._endAnchor);
        }
        this._startAnchor = this._endAnchor = null;
    };
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @return {?}
     */
    FocusTrap.prototype.attachAnchors = function () {
        var _this = this;
        // If we're not on the browser, there can be no focus to trap.
        if (!this._platform.isBrowser) {
            return;
        }
        if (!this._startAnchor) {
            this._startAnchor = this._createAnchor();
        }
        if (!this._endAnchor) {
            this._endAnchor = this._createAnchor();
        }
        this._ngZone.runOutsideAngular(function () {
            ((_this._startAnchor)).addEventListener('focus', function () { return _this.focusLastTabbableElement(); }); /** @type {?} */
            ((_this._endAnchor)).addEventListener('focus', function () { return _this.focusFirstTabbableElement(); });
            if (_this._element.parentNode) {
                _this._element.parentNode.insertBefore(/** @type {?} */ ((_this._startAnchor)), _this._element);
                _this._element.parentNode.insertBefore(/** @type {?} */ ((_this._endAnchor)), _this._element.nextSibling);
            }
        });
    };
    /**
     * Waits for the zone to stabilize, then either focuses the first element that the
     * user specified, or the first tabbable element..
     * @return {?}
     */
    FocusTrap.prototype.focusInitialElementWhenReady = function () {
        var _this = this;
        this._executeOnStable(function () { return _this.focusInitialElement(); });
    };
    /**
     * Waits for the zone to stabilize, then focuses
     * the first tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusFirstTabbableElementWhenReady = function () {
        var _this = this;
        this._executeOnStable(function () { return _this.focusFirstTabbableElement(); });
    };
    /**
     * Waits for the zone to stabilize, then focuses
     * the last tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusLastTabbableElementWhenReady = function () {
        var _this = this;
        this._executeOnStable(function () { return _this.focusLastTabbableElement(); });
    };
    /**
     * Get the specified boundary element of the trapped region.
     * @param {?} bound The boundary to get (start or end of trapped region).
     * @return {?} The boundary element.
     */
    FocusTrap.prototype._getRegionBoundary = function (bound) {
        // Contains the deprecated version of selector, for temporary backwards comparability.
        var /** @type {?} */ markers = (this._element.querySelectorAll("[cdk-focus-region-" + bound + "], " +
            ("[cdk-focus-" + bound + "]")));
        for (var /** @type {?} */ i = 0; i < markers.length; i++) {
            if (markers[i].hasAttribute("cdk-focus-" + bound)) {
                console.warn("Found use of deprecated attribute 'cdk-focus-" + bound + "'," +
                    (" use 'cdk-focus-region-" + bound + "' instead."), markers[i]);
            }
        }
        if (bound == 'start') {
            return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
        }
        return markers.length ?
            markers[markers.length - 1] : this._getLastTabbableElement(this._element);
    };
    /**
     * Focuses the element that should be focused when the focus trap is initialized.
     * @return {?}
     */
    FocusTrap.prototype.focusInitialElement = function () {
        var /** @type {?} */ redirectToElement = (this._element.querySelector('[cdk-focus-initial]'));
        if (redirectToElement) {
            redirectToElement.focus();
        }
        else {
            this.focusFirstTabbableElement();
        }
    };
    /**
     * Focuses the first tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusFirstTabbableElement = function () {
        var /** @type {?} */ redirectToElement = this._getRegionBoundary('start');
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /**
     * Focuses the last tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusLastTabbableElement = function () {
        var /** @type {?} */ redirectToElement = this._getRegionBoundary('end');
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /**
     * Get the first tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    FocusTrap.prototype._getFirstTabbableElement = function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        var /** @type {?} */ children = root.children || root.childNodes;
        for (var /** @type {?} */ i = 0; i < children.length; i++) {
            var /** @type {?} */ tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getFirstTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    /**
     * Get the last tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    FocusTrap.prototype._getLastTabbableElement = function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in reverse DOM order.
        var /** @type {?} */ children = root.children || root.childNodes;
        for (var /** @type {?} */ i = children.length - 1; i >= 0; i--) {
            var /** @type {?} */ tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getLastTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    /**
     * Creates an anchor element.
     * @return {?}
     */
    FocusTrap.prototype._createAnchor = function () {
        var /** @type {?} */ anchor = document.createElement('div');
        anchor.tabIndex = this._enabled ? 0 : -1;
        anchor.classList.add('cdk-visually-hidden');
        anchor.classList.add('cdk-focus-trap-anchor');
        return anchor;
    };
    /**
     * Executes a function when the zone is stable.
     * @param {?} fn
     * @return {?}
     */
    FocusTrap.prototype._executeOnStable = function (fn) {
        if (this._ngZone.isStable) {
            fn();
        }
        else {
            first$1.call(this._ngZone.onStable).subscribe(fn);
        }
    };
    return FocusTrap;
}());
/**
 * Factory that allows easy instantiation of focus traps.
 */
var FocusTrapFactory = /*@__PURE__*/(function () {
    /**
     * @param {?} _checker
     * @param {?} _platform
     * @param {?} _ngZone
     */
    function FocusTrapFactory(_checker, _platform, _ngZone) {
        this._checker = _checker;
        this._platform = _platform;
        this._ngZone = _ngZone;
    }
    /**
     * @param {?} element
     * @param {?=} deferAnchors
     * @return {?}
     */
    FocusTrapFactory.prototype.create = function (element, deferAnchors) {
        if (deferAnchors === void 0) { deferAnchors = false; }
        return new FocusTrap(element, this._platform, this._checker, this._ngZone, deferAnchors);
    };
    return FocusTrapFactory;
}());
FocusTrapFactory.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FocusTrapFactory.ctorParameters = function () { return [
    { type: InteractivityChecker, },
    { type: Platform, },
    { type: NgZone, },
]; };
/**
 * Directive for trapping focus within a region.
 * @deprecated
 */
var FocusTrapDeprecatedDirective = /*@__PURE__*/(function () {
    /**
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     */
    function FocusTrapDeprecatedDirective(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    Object.defineProperty(FocusTrapDeprecatedDirective.prototype, "disabled", {
        /**
         * Whether the focus trap is active.
         * @return {?}
         */
        get: function () { return !this.focusTrap.enabled; },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this.focusTrap.enabled = !coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FocusTrapDeprecatedDirective.prototype.ngOnDestroy = function () {
        this.focusTrap.destroy();
    };
    /**
     * @return {?}
     */
    FocusTrapDeprecatedDirective.prototype.ngAfterContentInit = function () {
        this.focusTrap.attachAnchors();
    };
    return FocusTrapDeprecatedDirective;
}());
FocusTrapDeprecatedDirective.decorators = [
    { type: Directive, args: [{
                selector: 'cdk-focus-trap',
            },] },
];
/**
 * @nocollapse
 */
FocusTrapDeprecatedDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: FocusTrapFactory, },
]; };
FocusTrapDeprecatedDirective.propDecorators = {
    'disabled': [{ type: Input },],
};
/**
 * Directive for trapping focus within a region.
 */
var FocusTrapDirective = /*@__PURE__*/(function () {
    /**
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     */
    function FocusTrapDirective(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    Object.defineProperty(FocusTrapDirective.prototype, "enabled", {
        /**
         * Whether the focus trap is active.
         * @return {?}
         */
        get: function () { return this.focusTrap.enabled; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this.focusTrap.enabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngOnDestroy = function () {
        this.focusTrap.destroy();
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngAfterContentInit = function () {
        this.focusTrap.attachAnchors();
    };
    return FocusTrapDirective;
}());
FocusTrapDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdkTrapFocus]',
                exportAs: 'cdkTrapFocus',
            },] },
];
/**
 * @nocollapse
 */
FocusTrapDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: FocusTrapFactory, },
]; };
FocusTrapDirective.propDecorators = {
    'enabled': [{ type: Input, args: ['cdkTrapFocus',] },],
};
var LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken('liveAnnouncerElement');
var LiveAnnouncer = /*@__PURE__*/(function () {
    /**
     * @param {?} elementToken
     * @param {?} platform
     */
    function LiveAnnouncer(elementToken, platform) {
        // Only do anything if we're on the browser platform.
        if (platform.isBrowser) {
            // We inject the live element as `any` because the constructor signature cannot reference
            // browser globals (HTMLElement) on non-browser environments, since having a class decorator
            // causes TypeScript to preserve the constructor signature types.
            this._liveElement = elementToken || this._createLiveElement();
        }
    }
    /**
     * Announces a message to screenreaders.
     * @param {?} message Message to be announced to the screenreader
     * @param {?=} politeness The politeness of the announcer element
     * @return {?}
     */
    LiveAnnouncer.prototype.announce = function (message, politeness) {
        var _this = this;
        if (politeness === void 0) { politeness = 'polite'; }
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        setTimeout(function () { return _this._liveElement.textContent = message; }, 100);
    };
    /**
     * Removes the aria-live element from the DOM.
     * @return {?}
     */
    LiveAnnouncer.prototype._removeLiveElement = function () {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    };
    /**
     * @return {?}
     */
    LiveAnnouncer.prototype._createLiveElement = function () {
        var /** @type {?} */ liveEl = document.createElement('div');
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveEl);
        return liveEl;
    };
    return LiveAnnouncer;
}());
LiveAnnouncer.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
LiveAnnouncer.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIVE_ANNOUNCER_ELEMENT_TOKEN,] },] },
    { type: Platform, },
]; };
/**
 * @param {?} parentDispatcher
 * @param {?} liveElement
 * @param {?} platform
 * @return {?}
 */
function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher, liveElement, platform) {
    return parentDispatcher || new LiveAnnouncer(liveElement, platform);
}
var LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new Optional(), new SkipSelf(), LiveAnnouncer],
        [new Optional(), new Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)],
        Platform,
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};
/**
 * Cached result Set of input types support by the current browser.
 */
var supportedInputTypes;
/**
 * Types of <input> that *might* be supported.
 */
var candidateInputTypes = [
    // `color` must come first. Chrome 56 shows a warning if we change the type to `color` after
    // first changing it to something else:
    // The specified value "" does not conform to the required format.
    // The format is "#rrggbb" where rr, gg, bb are two-digit hexadecimal numbers.
    'color',
    'button',
    'checkbox',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
];
/**
 * @return {?} The input types supported by this browser.
 */
function getSupportedInputTypes() {
    // Result is cached.
    if (supportedInputTypes) {
        return supportedInputTypes;
    }
    // We can't check if an input type is not supported until we're on the browser, so say that
    // everything is supported when not on the browser. We don't use `Platform` here since it's
    // just a helper function and can't inject it.
    if (typeof document !== 'object' || !document) {
        supportedInputTypes = new Set(candidateInputTypes);
        return supportedInputTypes;
    }
    var /** @type {?} */ featureTestInput = document.createElement('input');
    supportedInputTypes = new Set(candidateInputTypes.filter(function (value) {
        featureTestInput.setAttribute('type', value);
        return featureTestInput.type === value;
    }));
    return supportedInputTypes;
}
var PlatformModule = /*@__PURE__*/(function () {
    function PlatformModule() {
    }
    return PlatformModule;
}());
PlatformModule.decorators = [
    { type: NgModule, args: [{
                providers: [Platform]
            },] },
];
/**
 * @nocollapse
 */
PlatformModule.ctorParameters = function () { return []; };
/**
 * Screenreaders will often fire fake mousedown events when a focusable element
 * is activated using the keyboard. We can typically distinguish between these faked
 * mousedown events and real mousedown events using the "buttons" property. While
 * real mousedowns will indicate the mouse button that was pressed (e.g. "1" for
 * the left mouse button), faked mousedowns will usually set the property value to 0.
 * @param {?} event
 * @return {?}
 */
function isFakeMousedownFromScreenReader(event) {
    return event.buttons === 0;
}
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;
var PAGE_UP = 33;
var PAGE_DOWN = 34;
var HOME = 36;
var END = 35;
var ENTER = 13;
var SPACE = 32;
var TAB = 9;
var ESCAPE = 27;
var BACKSPACE = 8;
var DELETE = 46;
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
var ListKeyManager = /*@__PURE__*/(function () {
    /**
     * @param {?} _items
     */
    function ListKeyManager(_items) {
        this._items = _items;
        this._activeItemIndex = -1;
        this._tabOut = new Subject();
        this._wrap = false;
    }
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     *
     * @return {?} The ListKeyManager that the method was called on.
     */
    ListKeyManager.prototype.withWrap = function () {
        this._wrap = true;
        return this;
    };
    /**
     * Sets the active item to the item at the index specified.
     *
     * @param {?} index The index of the item to be set as active.
     * @return {?}
     */
    ListKeyManager.prototype.setActiveItem = function (index) {
        this._activeItemIndex = index;
        this._activeItem = this._items.toArray()[index];
    };
    /**
     * Sets the active item depending on the key event passed in.
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    ListKeyManager.prototype.onKeydown = function (event) {
        switch (event.keyCode) {
            case DOWN_ARROW:
                this.setNextItemActive();
                break;
            case UP_ARROW:
                this.setPreviousItemActive();
                break;
            case TAB:
                // Note that we shouldn't prevent the default action on tab.
                this._tabOut.next();
                return;
            default:
                return;
        }
        event.preventDefault();
    };
    Object.defineProperty(ListKeyManager.prototype, "activeItemIndex", {
        /**
         * Index of the currently active item.
         * @return {?}
         */
        get: function () {
            return this._activeItemIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListKeyManager.prototype, "activeItem", {
        /**
         * The active item.
         * @return {?}
         */
        get: function () {
            return this._activeItem;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the active item to the first enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setFirstItemActive = function () {
        this._setActiveItemByIndex(0, 1);
    };
    /**
     * Sets the active item to the last enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setLastItemActive = function () {
        this._setActiveItemByIndex(this._items.length - 1, -1);
    };
    /**
     * Sets the active item to the next enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setNextItemActive = function () {
        this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    };
    /**
     * Sets the active item to a previous enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setPreviousItemActive = function () {
        this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
    };
    /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param {?} index The new activeItemIndex.
     * @return {?}
     */
    ListKeyManager.prototype.updateActiveItemIndex = function (index) {
        this._activeItemIndex = index;
    };
    Object.defineProperty(ListKeyManager.prototype, "tabOut", {
        /**
         * Observable that emits any time the TAB key is pressed, so components can react
         * when focus is shifted off of the list.
         * @return {?}
         */
        get: function () {
            return this._tabOut.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     * @param {?} delta
     * @param {?=} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveItemByDelta = function (delta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        this._wrap ? this._setActiveInWrapMode(delta, items)
            : this._setActiveInDefaultMode(delta, items);
    };
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveInWrapMode = function (delta, items) {
        // when active item would leave menu, wrap to beginning or end
        this._activeItemIndex =
            (this._activeItemIndex + delta + items.length) % items.length;
        // skip all disabled menu items recursively until an enabled one is reached
        if (items[this._activeItemIndex].disabled) {
            this._setActiveInWrapMode(delta, items);
        }
        else {
            this.setActiveItem(this._activeItemIndex);
        }
    };
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveInDefaultMode = function (delta, items) {
        this._setActiveItemByIndex(this._activeItemIndex + delta, delta, items);
    };
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     * @param {?} index
     * @param {?} fallbackDelta
     * @param {?=} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveItemByIndex = function (index, fallbackDelta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        if (!items[index]) {
            return;
        }
        while (items[index].disabled) {
            index += fallbackDelta;
            if (!items[index]) {
                return;
            }
        }
        this.setActiveItem(index);
    };
    return ListKeyManager;
}());
var ActiveDescendantKeyManager = /*@__PURE__*/(function (_super) {
    tslib_1.__extends(ActiveDescendantKeyManager, _super);
    function ActiveDescendantKeyManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     * @param {?} index
     * @return {?}
     */
    ActiveDescendantKeyManager.prototype.setActiveItem = function (index) {
        var _this = this;
        Promise.resolve().then(function () {
            if (_this.activeItem) {
                _this.activeItem.setInactiveStyles();
            }
            _super.prototype.setActiveItem.call(_this, index);
            if (_this.activeItem) {
                _this.activeItem.setActiveStyles();
            }
        });
    };
    return ActiveDescendantKeyManager;
}(ListKeyManager));
var FocusKeyManager = /*@__PURE__*/(function (_super) {
    tslib_1.__extends(FocusKeyManager, _super);
    /**
     * @param {?} items
     */
    function FocusKeyManager(items) {
        return _super.call(this, items) || this;
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     * @param {?} index
     * @return {?}
     */
    FocusKeyManager.prototype.setActiveItem = function (index) {
        _super.prototype.setActiveItem.call(this, index);
        if (this.activeItem) {
            this.activeItem.focus();
        }
    };
    return FocusKeyManager;
}(ListKeyManager));
var A11yModule = /*@__PURE__*/(function () {
    function A11yModule() {
    }
    return A11yModule;
}());
A11yModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PlatformModule],
                declarations: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                exports: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                providers: [InteractivityChecker, FocusTrapFactory, LIVE_ANNOUNCER_PROVIDER]
            },] },
];
/**
 * @nocollapse
 */
A11yModule.ctorParameters = function () { return []; };
/**
 * Injection token used to inject the document into Directionality.
 * This is used so that the value can be faked in tests.
 *
 * We can't use the real document in tests because changing the real `dir` causes geometry-based
 * tests in Safari to fail.
 *
 * We also can't re-provide the DOCUMENT token from platform-brower because the unit tests
 * themselves use things like `querySelector` in test code.
 */
var DIR_DOCUMENT = new InjectionToken('md-dir-doc');
/**
 * The directionality (LTR / RTL) context for the application (or a subtree of it).
 * Exposes the current direction and a stream of direction changes.
 */
var Directionality = /*@__PURE__*/(function () {
    /**
     * @param {?=} _document
     */
    function Directionality(_document) {
        this.value = 'ltr';
        this.change = new EventEmitter();
        if (_document) {
            // TODO: handle 'auto' value -
            // We still need to account for dir="auto".
            // It looks like HTMLElemenet.dir is also "auto" when that's set to the attribute,
            // but getComputedStyle return either "ltr" or "rtl". avoiding getComputedStyle for now
            var bodyDir = _document.body ? _document.body.dir : null;
            var htmlDir = _document.documentElement ? _document.documentElement.dir : null;
            this.value = (bodyDir || htmlDir || 'ltr');
        }
    }
    return Directionality;
}());
Directionality.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Directionality.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DIR_DOCUMENT,] },] },
]; };
/**
 * @param {?} parentDirectionality
 * @param {?} _document
 * @return {?}
 */
function DIRECTIONALITY_PROVIDER_FACTORY(parentDirectionality, _document) {
    return parentDirectionality || new Directionality(_document);
}
var DIRECTIONALITY_PROVIDER = {
    // If there is already a Directionality available, use that. Otherwise, provide a new one.
    provide: Directionality,
    deps: [[new Optional(), new SkipSelf(), Directionality], [new Optional(), DOCUMENT]],
    useFactory: DIRECTIONALITY_PROVIDER_FACTORY
};
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Would provide itself in case a component looks for the Directionality service
 */
var Dir = /*@__PURE__*/(function () {
    function Dir() {
        /**
         * Layout direction of the element.
         */
        this._dir = 'ltr';
        /**
         * Whether the `value` has been set to its initial value.
         */
        this._isInitialized = false;
        /**
         * Event emitted when the direction changes.
         */
        this.change = new EventEmitter();
    }
    Object.defineProperty(Dir.prototype, "dir", {
        /**
         * \@docs-private
         * @return {?}
         */
        get: function () {
            return this._dir;
        },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            var /** @type {?} */ old = this._dir;
            this._dir = v;
            if (old !== this._dir && this._isInitialized) {
                this.change.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /**
         * Current layout direction of the element.
         * @return {?}
         */
        get: function () { return this.dir; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) { this.dir = v; },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize once default value has been set.
     * @return {?}
     */
    Dir.prototype.ngAfterContentInit = function () {
        this._isInitialized = true;
    };
    return Dir;
}());
Dir.decorators = [
    { type: Directive, args: [{
                selector: '[dir]',
                // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
                exportAs: '$implicit',
                providers: [
                    { provide: Directionality, useExisting: Dir }
                ]
            },] },
];
/**
 * @nocollapse
 */
Dir.ctorParameters = function () { return []; };
Dir.propDecorators = {
    'change': [{ type: Output, args: ['dirChange',] },],
    'dir': [{ type: HostBinding, args: ['attr.dir',] }, { type: Input, args: ['dir',] },],
};
var BidiModule = /*@__PURE__*/(function () {
    function BidiModule() {
    }
    return BidiModule;
}());
BidiModule.decorators = [
    { type: NgModule, args: [{
                exports: [Dir],
                declarations: [Dir],
                providers: [
                    { provide: DIR_DOCUMENT, useExisting: DOCUMENT },
                    Directionality,
                ]
            },] },
];
/**
 * @nocollapse
 */
BidiModule.ctorParameters = function () { return []; };
/**
 * Coerces a data-bound value (typically a string) to a number.
 * @param {?} value
 * @param {?=} fallbackValue
 * @return {?}
 */
function coerceNumberProperty(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return isNaN(parseFloat(/** @type {?} */ (value))) || isNaN(Number(value)) ? fallbackValue : Number(value);
}
/**
 * The row template that can be used by the md-table. Should not be used outside of the
 * material library.
 */
var CDK_ROW_TEMPLATE = "<ng-container cdkCellOutlet></ng-container>";
/**
 * Base class for the CdkHeaderRowDef and CdkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 * @abstract
 */
var BaseRowDef = /*@__PURE__*/(function () {
    /**
     * @param {?} template
     * @param {?} _differs
     */
    function BaseRowDef(template, _differs) {
        this.template = template;
        this._differs = _differs;
        /**
         * Event stream that emits when changes are made to the columns.
         */
        this.columnsChange = new Subject();
        this.viewInitialized = false;
    }
    /**
     * @return {?}
     */
    BaseRowDef.prototype.ngAfterViewInit = function () {
        this.viewInitialized = true;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    BaseRowDef.prototype.ngOnChanges = function (changes) {
        // Create a new columns differ if one does not yet exist. Initialize it based on initial value
        // of the columns property.
        if (!this._columnsDiffer && changes['columns'].currentValue) {
            this._columnsDiffer = this._differs.find(changes['columns'].currentValue).create();
        }
    };
    /**
     * @return {?}
     */
    BaseRowDef.prototype.ngDoCheck = function () {
        if (!this.viewInitialized || !this._columnsDiffer || !this.columns) {
            return;
        }
        // Notify the table if there are any changes to the columns.
        var /** @type {?} */ changes = this._columnsDiffer.diff(this.columns);
        if (changes) {
            this.columnsChange.next();
        }
    };
    return BaseRowDef;
}());
/**
 * Header row definition for the CDK table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
var CdkHeaderRowDef = /*@__PURE__*/(function (_super) {
    tslib_1.__extends(CdkHeaderRowDef, _super);
    /**
     * @param {?} template
     * @param {?} _differs
     */
    function CdkHeaderRowDef(template, _differs) {
        return _super.call(this, template, _differs) || this;
    }
    return CdkHeaderRowDef;
}(BaseRowDef));
CdkHeaderRowDef.decorators = [
    { type: Directive, args: [{
                selector: '[cdkHeaderRowDef]',
                inputs: ['columns: cdkHeaderRowDef'],
            },] },
];
/**
 * @nocollapse
 */
CdkHeaderRowDef.ctorParameters = function () { return [
    { type: TemplateRef, },
    { type: IterableDiffers, },
]; };
/**
 * Data row definition for the CDK table.
 * Captures the header row's template and other row properties such as the columns to display.
 */
var CdkRowDef = /*@__PURE__*/(function (_super) {
    tslib_1.__extends(CdkRowDef, _super);
    /**
     * @param {?} template
     * @param {?} _differs
     */
    function CdkRowDef(template, _differs) {
        return _super.call(this, template, _differs) || this;
    }
    return CdkRowDef;
}(BaseRowDef));
CdkRowDef.decorators = [
    { type: Directive, args: [{
                selector: '[cdkRowDef]',
                inputs: ['columns: cdkRowDefColumns'],
            },] },
];
/**
 * @nocollapse
 */
CdkRowDef.ctorParameters = function () { return [
    { type: TemplateRef, },
    { type: IterableDiffers, },
]; };
/**
 * Outlet for rendering cells inside of a row or header row.
 * \@docs-private
 */
var CdkCellOutlet = /*@__PURE__*/(function () {
    /**
     * @param {?} _viewContainer
     */
    function CdkCellOutlet(_viewContainer) {
        this._viewContainer = _viewContainer;
        CdkCellOutlet.mostRecentCellOutlet = this;
    }
    return CdkCellOutlet;
}());
CdkCellOutlet.decorators = [
    { type: Directive, args: [{ selector: '[cdkCellOutlet]' },] },
];
/**
 * @nocollapse
 */
CdkCellOutlet.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 */
var CdkHeaderRow = /*@__PURE__*/(function () {
    function CdkHeaderRow() {
    }
    return CdkHeaderRow;
}());
CdkHeaderRow.decorators = [
    { type: Component, args: [{
                selector: 'cdk-header-row',
                template: CDK_ROW_TEMPLATE,
                host: {
                    'class': 'cdk-header-row',
                    'role': 'row',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/**
 * @nocollapse
 */
CdkHeaderRow.ctorParameters = function () { return []; };
/**
 * Data row template container that contains the cell outlet. Adds the right class and role.
 */
var CdkRow = /*@__PURE__*/(function () {
    function CdkRow() {
    }
    return CdkRow;
}());
CdkRow.decorators = [
    { type: Component, args: [{
                selector: 'cdk-row',
                template: CDK_ROW_TEMPLATE,
                host: {
                    'class': 'cdk-row',
                    'role': 'row',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/**
 * @nocollapse
 */
CdkRow.ctorParameters = function () { return []; };
/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
var CdkCellDef = /*@__PURE__*/(function () {
    /**
     * @param {?} template
     */
    function CdkCellDef(template) {
        this.template = template;
    }
    return CdkCellDef;
}());
CdkCellDef.decorators = [
    { type: Directive, args: [{ selector: '[cdkCellDef]' },] },
];
/**
 * @nocollapse
 */
CdkCellDef.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
/**
 * Header cell definition for a CDK table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
var CdkHeaderCellDef = /*@__PURE__*/(function () {
    /**
     * @param {?} template
     */
    function CdkHeaderCellDef(template) {
        this.template = template;
    }
    return CdkHeaderCellDef;
}());
CdkHeaderCellDef.decorators = [
    { type: Directive, args: [{ selector: '[cdkHeaderCellDef]' },] },
];
/**
 * @nocollapse
 */
CdkHeaderCellDef.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
/**
 * Column definition for the CDK table.
 * Defines a set of cells available for a table column.
 */
var CdkColumnDef = /*@__PURE__*/(function () {
    function CdkColumnDef() {
    }
    return CdkColumnDef;
}());
CdkColumnDef.decorators = [
    { type: Directive, args: [{ selector: '[cdkColumnDef]' },] },
];
/**
 * @nocollapse
 */
CdkColumnDef.ctorParameters = function () { return []; };
CdkColumnDef.propDecorators = {
    'name': [{ type: Input, args: ['cdkColumnDef',] },],
    'cell': [{ type: ContentChild, args: [CdkCellDef,] },],
    'headerCell': [{ type: ContentChild, args: [CdkHeaderCellDef,] },],
};
/**
 * Header cell template container that adds the right classes and role.
 */
var CdkHeaderCell = /*@__PURE__*/(function () {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     * @param {?} renderer
     */
    function CdkHeaderCell(columnDef, elementRef, renderer) {
        this.columnDef = columnDef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(elementRef.nativeElement, "cdk-column-" + columnDef.name);
    }
    return CdkHeaderCell;
}());
CdkHeaderCell.decorators = [
    { type: Directive, args: [{
                selector: 'cdk-header-cell',
                host: {
                    'class': 'cdk-header-cell',
                    'role': 'columnheader',
                },
            },] },
];
/**
 * @nocollapse
 */
CdkHeaderCell.ctorParameters = function () { return [
    { type: CdkColumnDef, },
    { type: ElementRef, },
    { type: Renderer2, },
]; };
/**
 * Cell template container that adds the right classes and role.
 */
var CdkCell = /*@__PURE__*/(function () {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     * @param {?} renderer
     */
    function CdkCell(columnDef, elementRef, renderer) {
        this.columnDef = columnDef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(elementRef.nativeElement, "cdk-column-" + columnDef.name);
    }
    return CdkCell;
}());
CdkCell.decorators = [
    { type: Directive, args: [{
                selector: 'cdk-cell',
                host: {
                    'class': 'cdk-cell',
                    'role': 'gridcell',
                },
            },] },
];
/**
 * @nocollapse
 */
CdkCell.ctorParameters = function () { return [
    { type: CdkColumnDef, },
    { type: ElementRef, },
    { type: Renderer2, },
]; };
/**
 * Returns an error to be thrown when attempting to find an unexisting column.
 * \@docs-private
 * @param {?} id Id whose lookup failed.
 * @return {?}
 */
function getTableUnknownColumnError(id) {
    return new Error("cdk-table: Could not find column with id \"" + id + "\".");
}
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * \@docs-private
 */
var RowPlaceholder = /*@__PURE__*/(function () {
    /**
     * @param {?} viewContainer
     */
    function RowPlaceholder(viewContainer) {
        this.viewContainer = viewContainer;
    }
    return RowPlaceholder;
}());
RowPlaceholder.decorators = [
    { type: Directive, args: [{ selector: '[rowPlaceholder]' },] },
];
/**
 * @nocollapse
 */
RowPlaceholder.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 * \@docs-private
 */
var HeaderRowPlaceholder = /*@__PURE__*/(function () {
    /**
     * @param {?} viewContainer
     */
    function HeaderRowPlaceholder(viewContainer) {
        this.viewContainer = viewContainer;
    }
    return HeaderRowPlaceholder;
}());
HeaderRowPlaceholder.decorators = [
    { type: Directive, args: [{ selector: '[headerRowPlaceholder]' },] },
];
/**
 * @nocollapse
 */
HeaderRowPlaceholder.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
/**
 * The table template that can be used by the md-table. Should not be used outside of the
 * material library.
 */
var CDK_TABLE_TEMPLATE = "\n  <ng-container headerRowPlaceholder></ng-container>\n  <ng-container rowPlaceholder></ng-container>";
/**
 * A data table that connects with a data source to retrieve data of type T and renders
 * a header row and data rows. Updates the rows when new data is provided by the data source.
 */
var CdkTable = /*@__PURE__*/(function () {
    /**
     * @param {?} _differs
     * @param {?} _changeDetectorRef
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} role
     */
    function CdkTable(_differs, _changeDetectorRef, elementRef, renderer, role) {
        this._differs = _differs;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._onDestroy = new Subject();
        /**
         * Flag set to true after the component has been initialized.
         */
        this._isViewInitialized = false;
        /**
         * Latest data provided by the data source through the connect interface.
         */
        this._data = [];
        /**
         * Map of all the user's defined columns identified by name.
         * Contains the header and data-cell templates.
         */
        this._columnDefinitionsByName = new Map();
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         */
        this.viewChange = new BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
        if (!role) {
            renderer.setAttribute(elementRef.nativeElement, 'role', 'grid');
        }
    }
    Object.defineProperty(CdkTable.prototype, "trackBy", {
        /**
         * @return {?}
         */
        get: function () { return this._trackByFn; },
        /**
         * Tracking function that will be used to check the differences in data changes. Used similarly
         * to ngFor trackBy function. Optimize row operations by identifying a row based on its data
         * relative to the function to know if a row should be added/removed/moved.
         * Accepts a function that takes two parameters, `index` and `item`.
         * @param {?} fn
         * @return {?}
         */
        set: function (fn) {
            if (isDevMode() &&
                fn != null && typeof fn !== 'function' && (console) && (console.warn)) {
                console.warn("trackBy must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._trackByFn = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTable.prototype, "dataSource", {
        /**
         * Provides a stream containing the latest data array to render. Influenced by the table's
         * stream of view window (what rows are currently on screen).
         * @return {?}
         */
        get: function () { return this._dataSource; },
        /**
         * @param {?} dataSource
         * @return {?}
         */
        set: function (dataSource) {
            if (this._dataSource !== dataSource) {
                this._switchDataSource(dataSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkTable.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
        if (this.dataSource) {
            this.dataSource.disconnect(this);
        }
    };
    /**
     * @return {?}
     */
    CdkTable.prototype.ngOnInit = function () {
        // TODO(andrewseguin): Setup a listener for scroll events
        //   and emit the calculated view to this.viewChange
    };
    /**
     * @return {?}
     */
    CdkTable.prototype.ngAfterContentInit = function () {
        var _this = this;
        // TODO(andrewseguin): Throw an error if two columns share the same name
        this._columnDefinitions.forEach(function (columnDef) {
            _this._columnDefinitionsByName.set(columnDef.name, columnDef);
        });
        // Re-render the rows if any of their columns change.
        // TODO(andrewseguin): Determine how to only re-render the rows that have their columns changed.
        var /** @type {?} */ columnChangeEvents = this._rowDefinitions.map(function (rowDef) { return rowDef.columnsChange; });
        takeUntil.call(merge.apply(void 0, columnChangeEvents), this._onDestroy).subscribe(function () {
            // Reset the data to an empty array so that renderRowChanges will re-render all new rows.
            _this._rowPlaceholder.viewContainer.clear();
            _this._dataDiffer.diff([]);
            _this._renderRowChanges();
        });
        // Re-render the header row if the columns change
        takeUntil.call(this._headerDefinition.columnsChange, this._onDestroy).subscribe(function () {
            _this._headerRowPlaceholder.viewContainer.clear();
            _this._renderHeaderRow();
        });
    };
    /**
     * @return {?}
     */
    CdkTable.prototype.ngAfterViewInit = function () {
        // Find and construct an iterable differ that can be used to find the diff in an array.
        this._dataDiffer = this._differs.find([]).create(this._trackByFn);
        this._isViewInitialized = true;
    };
    /**
     * @return {?}
     */
    CdkTable.prototype.ngDoCheck = function () {
        if (this._isViewInitialized && this.dataSource && !this._renderChangeSubscription) {
            this._renderHeaderRow();
            if (this.dataSource && !this._renderChangeSubscription) {
                this._observeRenderChanges();
            }
        }
    };
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row placeholder. Otherwise start listening for new data.
     * @param {?} dataSource
     * @return {?}
     */
    CdkTable.prototype._switchDataSource = function (dataSource) {
        this._data = [];
        if (this._dataSource) {
            this.dataSource.disconnect(this);
        }
        this._dataSource = dataSource;
        if (this._isViewInitialized) {
            if (this._renderChangeSubscription) {
                this._renderChangeSubscription.unsubscribe();
            }
            if (this._dataSource) {
                this._observeRenderChanges();
            }
            else {
                this._rowPlaceholder.viewContainer.clear();
            }
        }
    };
    /**
     * Set up a subscription for the data provided by the data source.
     * @return {?}
     */
    CdkTable.prototype._observeRenderChanges = function () {
        var _this = this;
        this._renderChangeSubscription = takeUntil.call(this.dataSource.connect(this), this._onDestroy)
            .subscribe(function (data) {
            _this._data = data;
            _this._renderRowChanges();
        });
    };
    /**
     * Create the embedded view for the header template and place it in the header row view container.
     * @return {?}
     */
    CdkTable.prototype._renderHeaderRow = function () {
        var /** @type {?} */ cells = this._getHeaderCellTemplatesForRow(this._headerDefinition);
        if (!cells.length) {
            return;
        }
        // TODO(andrewseguin): add some code to enforce that exactly
        //   one CdkCellOutlet was instantiated as a result
        //   of `createEmbeddedView`.
        this._headerRowPlaceholder.viewContainer
            .createEmbeddedView(this._headerDefinition.template, { cells: cells });
        cells.forEach(function (cell) {
            CdkCellOutlet.mostRecentCellOutlet._viewContainer.createEmbeddedView(cell.template, {});
        });
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Check for changes made in the data and render each change (row added/removed/moved).
     * @return {?}
     */
    CdkTable.prototype._renderRowChanges = function () {
        var _this = this;
        var /** @type {?} */ changes = this._dataDiffer.diff(this._data);
        if (!changes) {
            return;
        }
        var /** @type {?} */ viewContainer = this._rowPlaceholder.viewContainer;
        changes.forEachOperation(function (item, adjustedPreviousIndex, currentIndex) {
            if (item.previousIndex == null) {
                _this._insertRow(_this._data[currentIndex], currentIndex);
            }
            else if (currentIndex == null) {
                viewContainer.remove(adjustedPreviousIndex);
            }
            else {
                var /** @type {?} */ view = viewContainer.get(adjustedPreviousIndex);
                viewContainer.move(/** @type {?} */ ((view)), currentIndex);
            }
        });
        this._updateRowContext();
    };
    /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     * @param {?} rowData
     * @param {?} index
     * @return {?}
     */
    CdkTable.prototype._insertRow = function (rowData, index) {
        // TODO(andrewseguin): Add when predicates to the row definitions
        //   to find the right template to used based on
        //   the data rather than choosing the first row definition.
        var /** @type {?} */ row = this._rowDefinitions.first;
        // Row context that will be provided to both the created embedded row view and its cells.
        var /** @type {?} */ context = { $implicit: rowData };
        // TODO(andrewseguin): add some code to enforce that exactly one
        //   CdkCellOutlet was instantiated as a result  of `createEmbeddedView`.
        this._rowPlaceholder.viewContainer.createEmbeddedView(row.template, context, index);
        // Insert empty cells if there is no data to improve rendering time.
        var /** @type {?} */ cells = rowData ? this._getCellTemplatesForRow(row) : [];
        cells.forEach(function (cell) {
            CdkCellOutlet.mostRecentCellOutlet._viewContainer.createEmbeddedView(cell.template, context);
        });
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Updates the context for each row to reflect any data changes that may have caused
     * rows to be added, removed, or moved. The view container contains the same context
     * that was provided to each of its cells.
     * @return {?}
     */
    CdkTable.prototype._updateRowContext = function () {
        var /** @type {?} */ viewContainer = this._rowPlaceholder.viewContainer;
        for (var /** @type {?} */ index = 0, /** @type {?} */ count = viewContainer.length; index < count; index++) {
            var /** @type {?} */ viewRef = (viewContainer.get(index));
            viewRef.context.index = index;
            viewRef.context.count = count;
            viewRef.context.first = index === 0;
            viewRef.context.last = index === count - 1;
            viewRef.context.even = index % 2 === 0;
            viewRef.context.odd = index % 2 !== 0;
        }
    };
    /**
     * Returns the cell template definitions to insert into the header
     * as defined by its list of columns to display.
     * @param {?} headerDef
     * @return {?}
     */
    CdkTable.prototype._getHeaderCellTemplatesForRow = function (headerDef) {
        var _this = this;
        if (!headerDef.columns) {
            return [];
        }
        return headerDef.columns.map(function (columnId) {
            var /** @type {?} */ column = _this._columnDefinitionsByName.get(columnId);
            if (!column) {
                throw getTableUnknownColumnError(columnId);
            }
            return column.headerCell;
        });
    };
    /**
     * Returns the cell template definitions to insert in the provided row
     * as defined by its list of columns to display.
     * @param {?} rowDef
     * @return {?}
     */
    CdkTable.prototype._getCellTemplatesForRow = function (rowDef) {
        var _this = this;
        if (!rowDef.columns) {
            return [];
        }
        return rowDef.columns.map(function (columnId) {
            var /** @type {?} */ column = _this._columnDefinitionsByName.get(columnId);
            if (!column) {
                throw getTableUnknownColumnError(columnId);
            }
            return column.cell;
        });
    };
    return CdkTable;
}());
CdkTable.decorators = [
    { type: Component, args: [{
                selector: 'cdk-table',
                template: CDK_TABLE_TEMPLATE,
                host: {
                    'class': 'cdk-table',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/**
 * @nocollapse
 */
CdkTable.ctorParameters = function () { return [
    { type: IterableDiffers, },
    { type: ChangeDetectorRef, },
    { type: ElementRef, },
    { type: Renderer2, },
    { type: undefined, decorators: [{ type: Attribute, args: ['role',] },] },
]; };
CdkTable.propDecorators = {
    'trackBy': [{ type: Input },],
    'dataSource': [{ type: Input },],
    '_rowPlaceholder': [{ type: ViewChild, args: [RowPlaceholder,] },],
    '_headerRowPlaceholder': [{ type: ViewChild, args: [HeaderRowPlaceholder,] },],
    '_columnDefinitions': [{ type: ContentChildren, args: [CdkColumnDef,] },],
    '_headerDefinition': [{ type: ContentChild, args: [CdkHeaderRowDef,] },],
    '_rowDefinitions': [{ type: ContentChildren, args: [CdkRowDef,] },],
};
/**
 * @abstract
 */
var DataSource = /*@__PURE__*/(function () {
    function DataSource() {
    }
    /**
     * Connects a collection viewer (such as a data-table) to this data source.
     * @abstract
     * @param {?} collectionViewer The component that exposes a view over the data provided by this
     *     data source.
     * @return {?} Observable that emits a new value when the data changes.
     */
    DataSource.prototype.connect = function (collectionViewer) { };
    /**
     * Disconnects a collection viewer (such as a data-table) from this data source. Can be used
     * to perform any clean-up or tear-down operations when a view is being destroyed.
     *
     * @abstract
     * @param {?} collectionViewer The component that exposes a view over the data provided by this
     *     data source.
     * @return {?}
     */
    DataSource.prototype.disconnect = function (collectionViewer) { };
    return DataSource;
}());
var EXPORTED_DECLARATIONS = [
    CdkTable,
    CdkRowDef,
    CdkCellDef,
    CdkCellOutlet,
    CdkHeaderCellDef,
    CdkColumnDef,
    CdkCell,
    CdkRow,
    CdkHeaderCell,
    CdkHeaderRow,
    CdkHeaderRowDef,
    RowPlaceholder,
    HeaderRowPlaceholder,
];
var CdkTableModule = /*@__PURE__*/(function () {
    function CdkTableModule() {
    }
    return CdkTableModule;
}());
CdkTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [EXPORTED_DECLARATIONS],
                declarations: [EXPORTED_DECLARATIONS]
            },] },
];
/**
 * @nocollapse
 */
CdkTableModule.ctorParameters = function () { return []; };
/**
 * Throws an exception when attempting to attach a null portal to a host.
 * \@docs-private
 * @return {?}
 */
function throwNullPortalError() {
    throw Error('Must provide a portal to attach');
}
/**
 * Throws an exception when attempting to attach a portal to a host that is already attached.
 * \@docs-private
 * @return {?}
 */
function throwPortalAlreadyAttachedError() {
    throw Error('Host already has a portal attached');
}
/**
 * Throws an exception when attempting to attach a portal to an already-disposed host.
 * \@docs-private
 * @return {?}
 */
function throwPortalHostAlreadyDisposedError() {
    throw Error('This PortalHost has already been disposed');
}
/**
 * Throws an exception when attempting to attach an unknown portal type.
 * \@docs-private
 * @return {?}
 */
function throwUnknownPortalTypeError() {
    throw Error('Attempting to attach an unknown Portal type. BasePortalHost accepts either' +
        'a ComponentPortal or a TemplatePortal.');
}
/**
 * Throws an exception when attempting to attach a portal to a null host.
 * \@docs-private
 * @return {?}
 */
function throwNullPortalHostError() {
    throw Error('Attempting to attach a portal to a null PortalHost');
}
/**
 * Throws an exception when attempting to detach a portal that is not attached.
 * \@docs-privatew
 * @return {?}
 */
function throwNoPortalAttachedError() {
    throw Error('Attempting to detach a portal that is not attached to a host');
}
/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 * @abstract
 */
var Portal = /*@__PURE__*/(function () {
    function Portal() {
    }
    /**
     * Attach this portal to a host.
     * @param {?} host
     * @return {?}
     */
    Portal.prototype.attach = function (host) {
        if (host == null) {
            throwNullPortalHostError();
        }
        if (host.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return (host.attach(this));
    };
    /**
     * Detach this portal from its host
     * @return {?}
     */
    Portal.prototype.detach = function () {
        var /** @type {?} */ host = this._attachedHost;
        if (host == null) {
            throwNoPortalAttachedError();
        }
        else {
            this._attachedHost = null;
            host.detach();
        }
    };
    Object.defineProperty(Portal.prototype, "isAttached", {
        /**
         * Whether this portal is attached to a host.
         * @return {?}
         */
        get: function () {
            return this._attachedHost != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     * @param {?} host
     * @return {?}
     */
    Portal.prototype.setAttachedHost = function (host) {
        this._attachedHost = host;
    };
    return Portal;
}());
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
var ComponentPortal = /*@__PURE__*/(function (_super) {
    tslib_1.__extends(ComponentPortal, _super);
    /**
     * @param {?} component
     * @param {?=} viewContainerRef
     * @param {?=} injector
     */
    function ComponentPortal(component, viewContainerRef, injector) {
        var _this = _super.call(this) || this;
        _this.component = component;
        _this.viewContainerRef = viewContainerRef;
        _this.injector = injector;
        return _this;
    }
    return ComponentPortal;
}(Portal));
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
var TemplatePortal = /*@__PURE__*/(function (_super) {
    tslib_1.__extends(TemplatePortal, _super);
    /**
     * @param {?} template
     * @param {?} viewContainerRef
     */
    function TemplatePortal(template, viewContainerRef) {
        var _this = _super.call(this) || this;
        /**
         * Additional locals for the instantiated embedded view.
         * These locals can be seen as "exports" for the template, such as how ngFor has
         * index / event / odd.
         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
         */
        _this.locals = new Map();
        _this.templateRef = template;
        _this.viewContainerRef = viewContainerRef;
        return _this;
    }
    Object.defineProperty(TemplatePortal.prototype, "origin", {
        /**
         * @return {?}
         */
        get: function () {
            return this.templateRef.elementRef;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} host
     * @param {?=} locals
     * @return {?}
     */
    TemplatePortal.prototype.attach = function (host, locals) {
        this.locals = locals == null ? new Map() : locals;
        return _super.prototype.attach.call(this, host);
    };
    /**
     * @return {?}
     */
    TemplatePortal.prototype.detach = function () {
        this.locals = new Map();
        return _super.prototype.detach.call(this);
    };
    return TemplatePortal;
}(Portal));
/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 * @abstract
 */
var BasePortalHost = /*@__PURE__*/(function () {
    function BasePortalHost() {
        /**
         * Whether this host has already been permanently disposed.
         */
        this._isDisposed = false;
    }
    /**
     * Whether this host has an attached portal.
     * @return {?}
     */
    BasePortalHost.prototype.hasAttached = function () {
        return !!this._attachedPortal;
    };
    /**
     * @param {?} portal
     * @return {?}
     */
    BasePortalHost.prototype.attach = function (portal) {
        if (!portal) {
            throwNullPortalError();
        }
        if (this.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            throwPortalHostAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        throwUnknownPortalTypeError();
    };
    /**
     * @abstract
     * @template T
     * @param {?} portal
     * @return {?}
     */
    BasePortalHost.prototype.attachComponentPortal = function (portal) { };
    /**
     * @abstract
     * @param {?} portal
     * @return {?}
     */
    BasePortalHost.prototype.attachTemplatePortal = function (portal) { };
    /**
     * @return {?}
     */
    BasePortalHost.prototype.detach = function () {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }
        this._invokeDisposeFn();
    };
    /**
     * @return {?}
     */
    BasePortalHost.prototype.dispose = function () {
        if (this.hasAttached()) {
            this.detach();
        }
        this._invokeDisposeFn();
        this._isDisposed = true;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    BasePortalHost.prototype.setDisposeFn = function (fn) {
        this._disposeFn = fn;
    };
    /**
     * @return {?}
     */
    BasePortalHost.prototype._invokeDisposeFn = function () {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    };
    return BasePortalHost;
}());
/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
var DomPortalHost = /*@__PURE__*/(function (_super) {
    tslib_1.__extends(DomPortalHost, _super);
    /**
     * @param {?} _hostDomElement
     * @param {?} _componentFactoryResolver
     * @param {?} _appRef
     * @param {?} _defaultInjector
     */
    function DomPortalHost(_hostDomElement, _componentFactoryResolver, _appRef, _defaultInjector) {
        var _this = _super.call(this) || this;
        _this._hostDomElement = _hostDomElement;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._appRef = _appRef;
        _this._defaultInjector = _defaultInjector;
        return _this;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @template T
     * @param {?} portal Portal to be attached
     * @return {?}
     */
    DomPortalHost.prototype.attachComponentPortal = function (portal) {
        var _this = this;
        var /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var /** @type {?} */ componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
            this.setDisposeFn(function () { return componentRef.destroy(); });
        }
        else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(function () {
                _this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    };
    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    DomPortalHost.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        var /** @type {?} */ viewContainer = portal.viewContainerRef;
        var /** @type {?} */ viewRef = viewContainer.createEmbeddedView(portal.templateRef);
        viewRef.detectChanges();
        // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalHost the view can be added everywhere in the DOM (e.g Overlay Container)
        // To move the view to the specified host element. We just re-append the existing root nodes.
        viewRef.rootNodes.forEach(function (rootNode) { return _this._hostDomElement.appendChild(rootNode); });
        this.setDisposeFn((function () {
            var /** @type {?} */ index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        // TODO(jelbourn): Return locals from view.
        return new Map();
    };
    /**
     * Clears out a portal from the DOM.
     * @return {?}
     */
    DomPortalHost.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._hostDomElement.parentNode != null) {
            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
        }
    };
    /**
     * Gets the root HTMLElement for an instantiated component.
     * @param {?} componentRef
     * @return {?}
     */
    DomPortalHost.prototype._getComponentRootNode = function (componentRef) {
        return (((componentRef.hostView)).rootNodes[0]);
    };
    return DomPortalHost;
}(BasePortalHost));
/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <ng-template portal #greeting>
 *   <p> Hello {{name}} </p>
 * </ng-template>
 */
var TemplatePortalDirective = /*@__PURE__*/(function (_super) {
    tslib_1.__extends(TemplatePortalDirective, _super);
    /**
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    function TemplatePortalDirective(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    return TemplatePortalDirective;
}(TemplatePortal));
TemplatePortalDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-portal], [cdkPortal], [portal]',
                exportAs: 'cdkPortal',
            },] },
];
/**
 * @nocollapse
 */
TemplatePortalDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
]; };
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <ng-template [cdkPortalHost]="greeting"></ng-template>
 */
var PortalHostDirective = /*@__PURE__*/(function (_super) {
    tslib_1.__extends(PortalHostDirective, _super);
    /**
     * @param {?} _componentFactoryResolver
     * @param {?} _viewContainerRef
     */
    function PortalHostDirective(_componentFactoryResolver, _viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._viewContainerRef = _viewContainerRef;
        /**
         * The attached portal.
         */
        _this._portal = null;
        return _this;
    }
    Object.defineProperty(PortalHostDirective.prototype, "_deprecatedPortal", {
        /**
         * @deprecated
         * @return {?}
         */
        get: function () { return this.portal; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) { this.portal = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalHostDirective.prototype, "portal", {
        /**
         * Portal associated with the Portal host.
         * @return {?}
         */
        get: function () {
            return this._portal;
        },
        /**
         * @param {?} portal
         * @return {?}
         */
        set: function (portal) {
            if (this.hasAttached()) {
                _super.prototype.detach.call(this);
            }
            if (portal) {
                _super.prototype.attach.call(this, portal);
            }
            this._portal = portal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PortalHostDirective.prototype.ngOnDestroy = function () {
        _super.prototype.dispose.call(this);
        this._portal = null;
    };
    /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @template T
     * @param {?} portal Portal to be attached to the portal host.
     * @return {?}
     */
    PortalHostDirective.prototype.attachComponentPortal = function (portal) {
        portal.setAttachedHost(this);
        // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalHost.
        var /** @type {?} */ viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        var /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var /** @type {?} */ ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        _super.prototype.setDisposeFn.call(this, function () { return ref.destroy(); });
        this._portal = portal;
        return ref;
    };
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    PortalHostDirective.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        portal.setAttachedHost(this);
        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        _super.prototype.setDisposeFn.call(this, function () { return _this._viewContainerRef.clear(); });
        this._portal = portal;
        // TODO(jelbourn): return locals from view
        return new Map();
    };
    return PortalHostDirective;
}(BasePortalHost));
PortalHostDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdkPortalHost], [portalHost]',
                inputs: ['portal: cdkPortalHost']
            },] },
];
/**
 * @nocollapse
 */
PortalHostDirective.ctorParameters = function () { return [
    { type: ComponentFactoryResolver, },
    { type: ViewContainerRef, },
]; };
PortalHostDirective.propDecorators = {
    '_deprecatedPortal': [{ type: Input, args: ['portalHost',] },],
};
var PortalModule = /*@__PURE__*/(function () {
    function PortalModule() {
    }
    return PortalModule;
}());
PortalModule.decorators = [
    { type: NgModule, args: [{
                exports: [TemplatePortalDirective, PortalHostDirective],
                declarations: [TemplatePortalDirective, PortalHostDirective],
            },] },
];
/**
 * @nocollapse
 */
PortalModule.ctorParameters = function () { return []; };
/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * \@docs-private
 */
var MdMutationObserverFactory = /*@__PURE__*/(function () {
    function MdMutationObserverFactory() {
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    MdMutationObserverFactory.prototype.create = function (callback) {
        return typeof MutationObserver === 'undefined' ? null : new MutationObserver(callback);
    };
    return MdMutationObserverFactory;
}());
MdMutationObserverFactory.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
MdMutationObserverFactory.ctorParameters = function () { return []; };
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
var ObserveContent = /*@__PURE__*/(function () {
    /**
     * @param {?} _mutationObserverFactory
     * @param {?} _elementRef
     */
    function ObserveContent(_mutationObserverFactory, _elementRef) {
        this._mutationObserverFactory = _mutationObserverFactory;
        this._elementRef = _elementRef;
        /**
         * Event emitted for each change in the element's content.
         */
        this.event = new EventEmitter();
        /**
         * Used for debouncing the emitted values to the observeContent event.
         */
        this._debouncer = new Subject();
    }
    /**
     * @return {?}
     */
    ObserveContent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.debounce > 0) {
            RxChain.from(this._debouncer)
                .call(debounceTime$1, this.debounce)
                .subscribe(function (mutations) { return _this.event.emit(mutations); });
        }
        else {
            this._debouncer.subscribe(function (mutations) { return _this.event.emit(mutations); });
        }
        this._observer = this._mutationObserverFactory.create(function (mutations) {
            _this._debouncer.next(mutations);
        });
        if (this._observer) {
            this._observer.observe(this._elementRef.nativeElement, {
                characterData: true,
                childList: true,
                subtree: true
            });
        }
    };
    /**
     * @return {?}
     */
    ObserveContent.prototype.ngOnDestroy = function () {
        if (this._observer) {
            this._observer.disconnect();
            this._debouncer.complete();
        }
    };
    return ObserveContent;
}());
ObserveContent.decorators = [
    { type: Directive, args: [{
                selector: '[cdkObserveContent]'
            },] },
];
/**
 * @nocollapse
 */
ObserveContent.ctorParameters = function () { return [
    { type: MdMutationObserverFactory, },
    { type: ElementRef, },
]; };
ObserveContent.propDecorators = {
    'event': [{ type: Output, args: ['cdkObserveContent',] },],
    'debounce': [{ type: Input },],
};
var ObserveContentModule = /*@__PURE__*/(function () {
    function ObserveContentModule() {
    }
    return ObserveContentModule;
}());
ObserveContentModule.decorators = [
    { type: NgModule, args: [{
                exports: [ObserveContent],
                declarations: [ObserveContent],
                providers: [MdMutationObserverFactory]
            },] },
];
/**
 * @nocollapse
 */
ObserveContentModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { A11yModule, LIVE_ANNOUNCER_ELEMENT_TOKEN, LiveAnnouncer, LIVE_ANNOUNCER_PROVIDER_FACTORY, LIVE_ANNOUNCER_PROVIDER, isFakeMousedownFromScreenReader, FocusTrap, FocusTrapFactory, FocusTrapDeprecatedDirective, FocusTrapDirective, InteractivityChecker, ListKeyManager, ActiveDescendantKeyManager, FocusKeyManager, Directionality, DIRECTIONALITY_PROVIDER_FACTORY, DIRECTIONALITY_PROVIDER, DIR_DOCUMENT, Dir, BidiModule, coerceBooleanProperty, coerceNumberProperty, CdkTableModule, DataSource, getTableUnknownColumnError, RowPlaceholder, HeaderRowPlaceholder, CDK_TABLE_TEMPLATE, CdkTable, CdkCellDef, CdkHeaderCellDef, CdkColumnDef, CdkHeaderCell, CdkCell, CDK_ROW_TEMPLATE, BaseRowDef, CdkHeaderRowDef, CdkRowDef, CdkCellOutlet, CdkHeaderRow, CdkRow, PlatformModule, Platform, getSupportedInputTypes, Portal, ComponentPortal, TemplatePortal, BasePortalHost, DomPortalHost, TemplatePortalDirective, PortalHostDirective, PortalModule, RxChain, FinallyBrand, CatchBrand, DoBrand, MapBrand, FilterBrand, ShareBrand, FirstBrand, SwitchMapBrand, StartWithBrand, DebounceTimeBrand, AuditTimeBrand, TakeUntilBrand, finallyOperator, catchOperator, doOperator, map$1 as map, filter$1 as filter, share$1 as share, first$1 as first, switchMap$1 as switchMap, startWith$1 as startWith, debounceTime$1 as debounceTime, auditTime$1 as auditTime, takeUntil$1 as takeUntil, MdMutationObserverFactory, ObserveContent, ObserveContentModule, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, PAGE_UP, PAGE_DOWN, HOME, END, ENTER, SPACE, TAB, ESCAPE, BACKSPACE, DELETE };
//# sourceMappingURL=cdk.es5.js.map
