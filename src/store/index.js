import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

// Cria um monitor do redux-saga para o Reactotron
const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

// Cria um middleware configurado com o sagaMonitor
const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});

// Configura o enhancer do Reactotron caso a aplicação esteja rodando em modo de desenvolvimento
const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
