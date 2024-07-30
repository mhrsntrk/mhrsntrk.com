import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//analytics.dev.mhrsntrk.com/matomo.js';
    document.body.appendChild(script);

    window._paq = window._paq || [];
    window._paq.push(['trackPageView']);
    window._paq.push(['enableLinkTracking']);
    window._paq.push([
      'setTrackerUrl',
      '//analytics.dev.mhrsntrk.com/matomo.php'
    ]);
    window._paq.push(['setSiteId', '1']);
  }, []);

  return null;
};

export default Analytics;
