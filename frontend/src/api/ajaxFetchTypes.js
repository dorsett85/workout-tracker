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
 * @augments ajaxFetch
 * @param {object} obj.body Body property of the fetch api second parameter object
 * @see ajaxFetch
 */
const postFetch = ({ url, options = {}, body, success, error }) => {
  const { headers, ...moreOptions } = options;
  const postOptions = {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...moreOptions
  };
  return ajaxFetch({
    url,
    options: postOptions,
    success,
    error
  });
};

/**
 * Wrapper for fetch api update request
 *
 * @see postFetch
 */
const updateFetch = ({ url, options = {}, body, success, error }) => (
  postFetch({
    url,
    options: {
      method: 'UPDATE',
      ...options
    },
    body,
    success,
    error
  })
);

/**
 * Wrapper for fetch api delete request
 *
 * @see postFetch
 */
const deleteFetch = ({ url, options = {}, body, success, error }) => (
  postFetch({
    url,
    options: {
      method: 'DELETE',
      ...options
    },
    body,
    success,
    error
  })
);

export {
  getFetch,
  postFetch,
  updateFetch,
  deleteFetch
};
