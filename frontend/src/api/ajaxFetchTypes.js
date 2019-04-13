import ajaxFetch from './ajaxFetch';


/**
 * Wrapper for fetch api get request
 *
 * @see ajaxFetch
 */
const getFetch = ajaxFetch;


/**
 * Wrapper for fetch api post request
 *
 * @param {object} obj
 * @param {object} body Body property of the fetch api second parameter object
 * @see ajaxFetch
 */
const postFetch = ({ url, options, body, success, error }) => {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...options
  };
  return ajaxFetch({
    url,
    options: postOptions,
    success,
    error
  });
};

export {
  getFetch,
  postFetch
};
