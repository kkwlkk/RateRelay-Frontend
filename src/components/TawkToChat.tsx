import { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      onStatusChange?: (status: string) => void;
      hideWidget?: () => void;
      showWidget?: () => void;
      maximize?: () => void;
      minimize?: () => void;
      toggle?: () => void;
      popup?: () => void;
      getWindowType?: () => string;
      getStatus?: () => string;
      isChatMaximized?: () => boolean;
      isChatMinimized?: () => boolean;
      isChatHidden?: () => boolean;
      isChatOngoing?: () => boolean;
      isVisitorEngaged?: () => boolean;
      endChat?: () => void;
      setAttributes?: (attributes: Record<string, unknown>) => void;
      addEvent?: (event: string, metadata?: Record<string, unknown>) => void;
      addTags?: (tags: string[]) => void;
      removeTags?: (tags: string[]) => void;
      onError?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

type TawkStatus = 'online' | 'away' | 'offline';

interface TawkToChatProps {
  onLoad?: () => void;
  onStatusChange?: (status: TawkStatus) => void;
  unmountOnClose?: boolean;
  loadOnMount?: boolean;
  suppressErrors?: boolean;
}

interface TawkToChatReturn {
  loadChat: (autoMaximize?: boolean) => void;
  openChat: () => void;
  isLoaded: boolean;
  maximize: () => void;
  minimize: () => void;
  hideWidget: () => void;
  showWidget: () => void;
  getStatus: () => TawkStatus | null;
  isReady: boolean;
}

const TAWK_ERROR_KEYWORDS = ['tawk.to', 'ERR_BLOCKED_BY_CLIENT', 'log-performance'];
const TAWK_SELECTORS = '[id^="tawk-"], .tawk-, #tawkchat-container, [class*="tawk"]';
const CLEANUP_DELAY = 1000;
const WIDGET_HIDE_DELAY = 100;

const TawkToChat = ({
  onLoad,
  onStatusChange,
  unmountOnClose = true,
  loadOnMount = true,
  suppressErrors = true
}: TawkToChatProps): TawkToChatReturn => {
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;

  const isInitializedRef = useRef(false);
  const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const errorSuppressionCleanupRef = useRef<(() => void) | null>(null);
  const scriptLoadedRef = useRef(false);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const shouldSuppressError = useCallback((message: string): boolean => {
    return TAWK_ERROR_KEYWORDS.some(keyword => message.includes(keyword));
  }, []);

  const setupErrorSuppression = useCallback(() => {
    if (!suppressErrors || errorSuppressionCleanupRef.current) return;

    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    console.error = (...args) => {
      const message = args.join(' ');
      if (!shouldSuppressError(message)) {
        originalConsoleError.apply(console, args);
      }
    };

    console.warn = (...args) => {
      const message = args.join(' ');
      if (!shouldSuppressError(message)) {
        originalConsoleWarn.apply(console, args);
      }
    };

    const handleWindowError = (event: ErrorEvent) => {
      if (shouldSuppressError(event.message || '')) {
        event.preventDefault();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message = event.reason?.message || '';
      if (shouldSuppressError(message)) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    errorSuppressionCleanupRef.current = () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [suppressErrors, shouldSuppressError]);

  const clearCleanupTimeout = useCallback(() => {
    if (cleanupTimeoutRef.current) {
      clearTimeout(cleanupTimeoutRef.current);
      cleanupTimeoutRef.current = null;
    }
  }, []);

  const cleanupTawkTo = useCallback(() => {
    try {
      if (window.Tawk_API?.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    } catch (error) {
      if (!suppressErrors) {
        console.warn('Error hiding Tawk widget:', error);
      }
    }

    const tawkWidgets = document.querySelectorAll(TAWK_SELECTORS);
    tawkWidgets.forEach(widget => {
      try {
        widget.parentNode?.removeChild(widget);
      } catch (error) {
        if (!suppressErrors) {
          console.warn('Error removing Tawk widget:', error);
        }
      }
    });

    const tawkScripts = document.querySelectorAll('script[src*="tawk.to"]');
    tawkScripts.forEach(script => {
      try {
        script.parentNode?.removeChild(script);
      } catch (error) {
        if (!suppressErrors) {
          console.warn('Error removing Tawk script:', error);
        }
      }
    });

    delete window.Tawk_API;
    delete window.Tawk_LoadStart;
    isInitializedRef.current = false;
    scriptLoadedRef.current = false;
    setIsLoaded(false);
    setIsReady(false);
  }, [suppressErrors]);

  const loadTawkTo = useCallback((autoMaximize: boolean = false) => {
    if (!widgetId || !propertyId) {
      if (!suppressErrors) {
        console.warn('TawkToChat: Missing environment variables');
      }
      return;
    }

    if (isInitializedRef.current && window.Tawk_API) {
      if (onLoad) window.Tawk_API.onLoad = onLoad;
      if (onStatusChange) window.Tawk_API.onStatusChange = (status: string) => onStatusChange(status as TawkStatus);

      try {
        window.Tawk_API.showWidget?.();
        if (autoMaximize) {
          window.Tawk_API.maximize?.();
        }
      } catch (error) {
        if (!suppressErrors) {
          console.warn('Error showing/maximizing Tawk widget:', error);
        }
      }

      setIsLoaded(true);
      return;
    }

    if (scriptLoadedRef.current) return;

    clearCleanupTimeout();

    if (typeof window !== 'undefined') {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      if (onLoad) {
        const originalOnLoad = onLoad;
        window.Tawk_API.onLoad = () => {
          setIsReady(true);
          originalOnLoad();
        };
      } else {
        window.Tawk_API.onLoad = () => setIsReady(true);
      }

      const wrappedOnStatusChange = (status: string) => {
        onStatusChange?.(status as TawkStatus);

        if (unmountOnClose && status === 'offline') {
          cleanupTimeoutRef.current = setTimeout(() => {
            cleanupTawkTo();
          }, CLEANUP_DELAY);
        }
      };

      window.Tawk_API.onStatusChange = wrappedOnStatusChange;

      window.Tawk_API.onError = () => {
        if (!suppressErrors) {
          console.warn('TawkTo: Non-critical error occurred');
        }
      };

      if (autoMaximize) {
        const originalOnLoad = window.Tawk_API.onLoad;
        window.Tawk_API.onLoad = function () {
          try {
            window.Tawk_API?.maximize?.();
          } catch (error) {
            if (!suppressErrors) {
              console.warn('Error auto-maximizing Tawk widget:', error);
            }
          }
          if (originalOnLoad) originalOnLoad();
        };
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');

      if (suppressErrors) {
        script.onerror = (event: string | Event) => {
          if (event instanceof Event) {
            event.preventDefault();
          }
          return false;
        };
      }

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);

      scriptLoadedRef.current = true;
      isInitializedRef.current = true;
      setIsLoaded(true);
    }
  }, [onLoad, onStatusChange, propertyId, widgetId, unmountOnClose, cleanupTawkTo, suppressErrors, clearCleanupTimeout]);

  const openChat = useCallback(() => {
    if (!isInitializedRef.current) {
      loadTawkTo(true);
    } else {
      try {
        window.Tawk_API?.maximize?.();
      } catch (error) {
        if (!suppressErrors) {
          console.warn('Error opening Tawk chat:', error);
        }
      }
    }
  }, [loadTawkTo, suppressErrors]);

  const maximize = useCallback(() => {
    try {
      window.Tawk_API?.maximize?.();
    } catch (error) {
      if (!suppressErrors) {
        console.warn('Error maximizing Tawk chat:', error);
      }
    }
  }, [suppressErrors]);

  const minimize = useCallback(() => {
    try {
      window.Tawk_API?.minimize?.();
    } catch (error) {
      if (!suppressErrors) {
        console.warn('Error minimizing Tawk chat:', error);
      }
    }
  }, [suppressErrors]);

  const hideWidget = useCallback(() => {
    try {
      window.Tawk_API?.hideWidget?.();
    } catch (error) {
      if (!suppressErrors) {
        console.warn('Error hiding Tawk widget:', error);
      }
    }
  }, [suppressErrors]);

  const showWidget = useCallback(() => {
    try {
      window.Tawk_API?.showWidget?.();
    } catch (error) {
      if (!suppressErrors) {
        console.warn('Error showing Tawk widget:', error);
      }
    }
  }, [suppressErrors]);

  const getStatus = useCallback((): TawkStatus | null => {
    try {
      return (window.Tawk_API?.getStatus?.() as TawkStatus) || null;
    } catch (error) {
      if (!suppressErrors) {
        console.warn('Error getting Tawk status:', error);
      }
      return null;
    }
  }, [suppressErrors]);

  useEffect(() => {
    if (!widgetId || !propertyId) {
      if (!suppressErrors) {
        console.warn('TawkToChat: Missing NEXT_PUBLIC_TAWK_PROPERTY_ID or NEXT_PUBLIC_TAWK_WIDGET_ID');
      }
      return;
    }

    clearCleanupTimeout();
    setupErrorSuppression();

    if (loadOnMount) {
      loadTawkTo();
    }

    return () => {
      errorSuppressionCleanupRef.current?.();
      errorSuppressionCleanupRef.current = null;

      try {
        window.Tawk_API?.hideWidget?.();
      } catch (error) {
        if (!suppressErrors) {
          console.warn('Error hiding widget during cleanup:', error);
        }
      }

      cleanupTimeoutRef.current = setTimeout(() => {
        const tawkWidgets = document.querySelectorAll(TAWK_SELECTORS);
        tawkWidgets.forEach(widget => {
          try {
            widget.parentNode?.removeChild(widget);
          } catch (error) {
            if (!suppressErrors) {
              console.warn('Error removing widget during cleanup:', error);
            }
          }
        });
      }, WIDGET_HIDE_DELAY);
    };
  }, [propertyId, widgetId, loadOnMount, loadTawkTo, setupErrorSuppression, clearCleanupTimeout, suppressErrors]);

  useEffect(() => {
    return () => {
      clearCleanupTimeout();
    };
  }, [clearCleanupTimeout]);

  if (!widgetId || !propertyId) {
    return {
      loadChat: () => {},
      openChat: () => {},
      isLoaded: false,
      maximize: () => {},
      minimize: () => {},
      hideWidget: () => {},
      showWidget: () => {},
      getStatus: () => null,
      isReady: false
    };
  }

  return {
    loadChat: loadTawkTo,
    openChat,
    isLoaded,
    maximize,
    minimize,
    hideWidget,
    showWidget,
    getStatus,
    isReady
  };
};

export default TawkToChat;