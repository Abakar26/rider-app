/* eslint-disable consistent-return */
import { useCallback, useContext, useEffect } from 'react';

import { UNSAFE_NavigationContext as NavigationContext, useNavigate } from 'react-router-dom';

export function useBlocker(blocker, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;
    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        }
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}

export default function usePrompt(message, when, openCancelPopUp) {
  const navigate = useNavigate();
  const blocker = useCallback(
    async (tx) => {
      if (
        await ((tx.location?.state?.from === 'bottomNavigation' &&
          openCancelPopUp(tx.location?.state?.to)) ||
          (tx.action === 'POP' && openCancelPopUp('Logistics Home Screen')))
      ) {
        if (tx.location?.state?.from === 'bottomNavigation') {
          navigate(tx.location.pathname);
        } else {
          navigate('/logistics');
        }
      } else if (tx.location?.state?.from !== 'bottomNavigation' && tx.action === 'PUSH') {
        tx.retry();
      }
    },
    [message]
  );
  useBlocker(blocker, when);
}
