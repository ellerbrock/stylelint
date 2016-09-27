import {
  hasLessInterpolation,
  hasScssInterpolation,
} from "../utils"
/**
 * Check whether a URL is standard
 *
 * @param {string} url
 * @return {boolean} If `true`, the url is standard
 */
export default function (url) {
  if (url.length === 0) { return true }

  // Sass interpolation works anywhere
  if (hasScssInterpolation(url)) { return false }

  // Inside `'` and `"` work only LESS interpolation
  if (url[0] === "'" && url[url.length - 1] === "'"
    || url[0] === "\"" && url[url.length - 1] === "\""
  ) {
    if (hasLessInterpolation(url)) { return false }

    return true
  }

  // Less variable works only at the beginning
  // Check is less variable, allow use '@url/some/path'
  // https://github.com/less/less.js/blob/3.x/lib/less/parser/parser.js#L547
  if (url[0] === "@" && /^@@?[\w-]+$/.test(url)) { return false }

  // Sass variables works anywhere
  if (url.indexOf("$") !== -1) { return false }

  return true
}
