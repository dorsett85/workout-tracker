let timeout;

/**
 * Debouncing function
 *
 * @param   {function()} callback Function after debouncing timeout, takes no arguments
 * @param   {number}     delay    Callback delay in milliseconds
 * @returns {void}
 */
export default function debounce(callback, delay) {
  clearTimeout(timeout);
  timeout = setTimeout(callback, delay);
}
