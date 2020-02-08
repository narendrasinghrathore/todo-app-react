import React, { useEffect } from 'react';
/**
 * Infinite Scroller using IntersectionObservor API
 */
const InfiniteScollingContainer = React.memo(function InfiniteScroller(props: { root: null | HTMLElement, threshold: number | number[], emit: (obj: any) => void, rootMargin: string }) {
    const { root, threshold, rootMargin } = { ...props };
    const elementId = 'infinite-scroller';
    let observer = new IntersectionObserver((obs) => {
        props.emit(obs);
    }, { root, threshold, rootMargin });

    useEffect(() => {
        let target = document.querySelector(`#${elementId}`);
        observer.observe(target as HTMLElement);
        return () => {
            observer.unobserve(target as HTMLElement);
            target = null;
            observer.disconnect();
        }
    }, [observer]);

    return <div style={{ height: '20px' }} id={elementId}></div>;
});

export default InfiniteScollingContainer;