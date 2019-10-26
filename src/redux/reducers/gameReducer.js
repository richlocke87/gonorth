import * as type from "../gameActionTypes";
import { Interaction, Append, AppendInput } from "../../game/interaction";

const initialState = {
  turn: 1,
  inBrowser: false,
  debugMode: false,
  interaction: new Interaction("Loading..."),
  verbNames: {},
  itemNames: new Set()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case type.NEW_GAME:
      return { ...state, ...action.payload };
    case type.CHANGE_INTERACTION:
      const interaction = action.payload;

      if (interaction instanceof Append && state.interaction.currentPage) {
        interaction.currentPage = `${state.interaction.currentPage}\n\n${interaction.currentPage}`;

        if (!interaction.options && !state.interaction.nextButtonRendered) {
          // Copy concrete options (not 'Next') from previous interaction (TODO need Next to work too)
          interaction.options = state.interaction.options;
        }

        if (
          typeof interaction.renderNextButton === "undefined" &&
          !(interaction instanceof AppendInput)
        ) {
          interaction.renderNextButton = state.interaction.renderNextButton;
        }
      }

      return { ...state, interaction };
    case type.RECEIVE_INPUT:
      return { ...state, playerInput: action.payload };
    case type.NEXT_TURN:
      return { ...state, turn: state.turn + 1 };
    case type.VERB_CREATED:
      const verbNames = { ...state.verbNames, ...action.payload };
      return {
        ...state,
        verbNames
      };
    case type.ITEMS_REVEALED:
      return {
        ...state,
        itemNames: new Set([...state.itemNames, ...action.payload])
      };
    default:
      return state;
  }
}
