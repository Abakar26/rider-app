import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import CancelSamplesPopup from './redux-store/confirmPrompts/CancelSamplesPopup';
import ConfirmContextProvider from './redux-store/confirmPrompts/ConfirmContextProvider';
import GlobalCssSlider from './LoginScreens/GlobalCssSlider';
import store, { persistor } from './redux-store/store';
import * as serviceWorker from './serviceWorkerRegistration';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConfirmContextProvider>
        <GlobalCssSlider />
        <CancelSamplesPopup />
      </ConfirmContextProvider>
    </PersistGate>
  </Provider>
);

serviceWorker.register();
