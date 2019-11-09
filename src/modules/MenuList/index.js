import { Module } from 'cerebral';
import stateTree from './stateTree';

import * as signals from './sequences';

export default Module({
  state : stateTree,
  signals: signals
});
