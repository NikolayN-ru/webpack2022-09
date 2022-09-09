import * as $ from 'jquery';

function createAnalytics() {
    let counter = 0;
    let isDestroyed = false;

    const listener = () => counter++;

    $(document).on('click', listener);

    // document.addEventListener('click', listener);

    return {
        destroy() {
            // document.removeEventListener('click', listener);
            $(document).off('click', listener);
            isDestroyed = true;
        },

        getClicks() {
            if (isDestroyed) {
                return 'Analytics is destroyed. total click = counter 2';
            }
            return counter
        }
    }
}

window.analytics = createAnalytics();