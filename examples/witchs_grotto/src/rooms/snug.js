import {
  Room,
  Npc,
  Verb,
  selectPlayer,
  OptionGraph,
  RandomText,
} from "../../../../lib/gonorth";
import { Potion } from "../magic/alchemy";

export const snug = new Room(
  "Snug",
  "You find yourself in a cozy snug or cubby. The embers of a fire still glow in a small fireplace and give off a gentle warmth. There's a single large armchair with a black cat curled up in it just in front of the stone hearth. Various leather-bound books are scattered around the room or lie in small piles. There are thick cobwebs in the corners of the room, testament to the witch's aversion to housework.\n\nThe only way out is via the moon and stars bead curtain to the East."
);

const cat = new Npc(
  "Mr Snugglesworth",
  "The cat's fur is inky black, like a moonless sky. It's curled up in the richly-upholstered armchair and appears to be soundly asleep, but as you approach it slyly peers at you throught slitted eyelids. The eyes gleam like opalescent fire, a keen intelligence lurking behind them."
);
cat.aliases = ["cat"];

const leave = {
  id: "leave",
  actions: new RandomText(
    `"Sorry, sir. I've got to go."`,
    `"I just remembered I have to do something!"`,
    `"I'll be back later. Bye!"`
  ),
  noEndTurn: true,
};
const catGreeting = {
  id: "greeting",
  actions: `Nervously wringing your hands, you politely address the cat.\n\n"Umm, excuse me little cat. Could you-"\n\nBefore you can get any further the cat cuts you off mid-sentence.\n\n"Odin's whiskers, it speaks! Wonder of wonders, can it wash itself too?"`,
  options: {
    Leave: leave,
  },
};
const catGraph = new OptionGraph(catGreeting);

const speak = new Verb(
  "speak",
  () => selectPlayer().dolittle,
  () => catGraph.commence(),
  `Clearing your throat, you politely address the cat.\n\n"Hello, Mr Pussycat, sir. Err... or Madam. I'm Genevieve."\n\nThe cat regards you for a long while. You'd swear it had an eyebrow raised if it had eyebrows. Then it lets out a single weary meaow, before closing its eyes and resting its chin back on its front paws. You feel as though you've been dismissed.`,
  ["talk", "question", "ask", "tell"]
);

cat.addVerb(speak);

// TESTING (remove)
const dolittle = new Potion("Dolittle Decoction");
// TESTING (end)

snug.addItems(cat, dolittle);