import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "../actions";

const initialState = {
  channel: {
    _id: '',
    name: ''
  },
  thread: {
    _id: undefined
  }
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;