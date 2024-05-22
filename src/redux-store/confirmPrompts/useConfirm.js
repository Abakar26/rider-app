import { useContext, useEffect, useState } from 'react';
import { ConfirmContext } from './ConfirmContextProvider';

const useConfirm = () => {
  const [confirm, setConfirm] = useContext(ConfirmContext);
  const [needsCleanup, setNeedsCleanup] = useState(false);
  const isConfirmed = (nextTab) => {
    const promise = new Promise((resolve, reject) => {
      setConfirm({ isOpen: true, nextTab, proceed: resolve, cancel: reject });
      setNeedsCleanup(true);
    });

    const reset = () => {
      setConfirm({ proceed: null, cancel: null, isOpen: false, nextTab });
      setNeedsCleanup(false);
    };

    return promise.then(
      () => {
        reset();
        return true;
      },
      () => {
        reset();
        return false;
      }
    );
  };

  // Call cancel in a cleanup func to avoid dangling confirm dialog
  useEffect(() => {
    return () => {
      if (needsCleanup && confirm.cancel) {
        confirm.cancel();
      }
    };
  }, [confirm, needsCleanup]);

  return {
    ...confirm,
    isConfirmed
  };
};

export default useConfirm;
