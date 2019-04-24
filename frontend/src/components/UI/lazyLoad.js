import React, { lazy, Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';


const lazyLoad = (lazyComponent, fallback = <LoadingSpinner className="mt-3 mb-3" />) => (props) => {
  const Component = lazy(() => lazyComponent);
  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export default lazyLoad;
