/**
 * Wrapper for ajax requests with the Fetch API
 *
 * This function ASSUMES a successful response can be converted to json.  The success function
 * accepts an object with the returned data, and the error function accepts an object that will
 * at least contain a status property (AND SHOULD CONTAIN) a message property.
 *
 * @param   {object}           obj
 * @param   {string}           obj.url     First argument of the fetch api, url string
 * @param   {object}           obj.options Second argument of the fetch api, object of request options
 * @param   {function(object)} obj.success Callback function for a successful ajax request
 * @param   {function(object)} obj.error   Callback function for an unsuccessful request
 * @returns {Promise}                      Promise returned from fetch api
 *
 * @example
 * // Sample ajax fetch from our scheduler api
 * ajaxFetch({
 *   url: '/api/user/1',
 *   success: ({ data }) => console.log(data.rows),
 *   error: err => console.log(err)
 * });
 */
const ajaxFetch = ({ url, options = {}, success, error = console.error }) => (
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then((res) => {
      if (!res.ok) { throw res; }
      return res.json();
    })
    .then(success)
    .catch((err) => {
      const { status, statusText } = err;

      /**
       * First check if the error comes from the success function (e.g., it won't have a status text).
       * We simply post these to the console as usual
       */
      if (!statusText) { return console.error(err); }

      /**
       * Try converting the error object to json for the error callback, if it fails (e.g., it's
       * a 500 internal server error), return the unconverted object for the error callback
       */
      return err.json()
        .then((json) => {
          // If the json response is a string, convert it to the message property
          const errObj = typeof json === 'string' ? { message: json } : json;
          return error({ status, ...errObj });
        })
        .catch(() => error({ status, message: statusText }));
    })
);

export default ajaxFetch;
