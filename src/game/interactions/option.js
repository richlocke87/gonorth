import { getStore } from "../../redux/storeRegistry";
import { changeInteraction } from "../../redux/gameActions";
import { AppendInput } from "./interaction";
import { ActionChain } from "../../utils/actionChain";
import { handleTurnEnd } from "../../utils/lifecycle";

export class Option {
  constructor(label, action, endTurn = true) {
    this.label = label;
    this.action = action;
    this.endTurn = endTurn;
  }

  get action() {
    return this._action;
  }

  set action(action) {
    const actionArray = Array.isArray(action) ? action : [action];
    const actionChain = new ActionChain(...actionArray);

    this._action = async (...args) => {
      // Record player decision
      getStore().dispatch(changeInteraction(new AppendInput(this.label)));
      // First perform the player actions
      await actionChain.chain(...args);

      if (!getStore().getState().game.actionChainPromise && this.endTurn) {
        // Do the end of turn actions if there's no enclosing chain i.e. we came from room options
        return handleTurnEnd();
      }
    };
  }
}
