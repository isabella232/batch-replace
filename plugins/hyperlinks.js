"use strict";

/**
 * Replaces all occurrences of url-like patterns with an hyperlink:
 *
 * "Check out example.com, bro"
 * becomes
 * "Check out <a href="http://example.com" target="_blank">http://example.com</a>, bro".
 *
 * The hyperlink()-method is called with the url and the actual match and returns an html string.
 * Override this method if you need to customize the returned <a>-tag.
 */

var protocol = /^[a-z-]+:\/\//;

function hyperlinksPlugin(replace) {
    replace.module("hyperlinks", hyperlinksPlugin);
}

/**
 * Matches actual urls and url-like patterns for instance:
 * - http://example.com
 * - example.com
 * - test.example.com
 * - test.example.com/test-path?query=param
 *
 * @type {RegExp}
 */
hyperlinksPlugin.pattern = /([a-z-]+:\/\/)?[^\s/]{2,256}\.[a-z]{2,3}(\/[^\s]*[^\s,.:;?!])?/g;

/**
 * @param {object} match
 * @returns {string}
 */
hyperlinksPlugin.replace = function (match) {
    var url = "";

    match = match[0];

    // It's common practice that urls are case-insensitive
    match = match.toLowerCase();

    if (protocol.test(match) === false) {
        url += "http://";
    }
    url += match;

    return hyperlinksPlugin.hyperlink(url, match);
};

/**
 * Generates an html string.
 *
 * @param {string} url
 * @param {string} str
 * @returns {string}
 */
hyperlinksPlugin.hyperlink = function (url, str) {
    return '<a href="' + url + '" target="_blank">' + str + "</a>";
};

module.exports = hyperlinksPlugin;