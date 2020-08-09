import {
  Room,
  Npc,
  Verb,
  selectPlayer,
  OptionGraph,
  RandomText,
  SequentialText
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

let catName;
const catTalkNodes = [
  {
    id: "greeting",
    actions: new SequentialText(
      `Nervously wringing your hands, you politely address the cat.\n\n"Umm, excuse me little cat. I hope you-"`,
      `Before you can get any further the cat cuts you off mid-sentence.\n\n"Odin's whiskers, it speaks! Wonder of wonders, can it wash itself too?"`
    ),
    options: {
      "Of course": "ofCourseCanWash",
      "I'm Genevieve": "introduce",
      Leave: "leave"
    }
  },
  {
    id: "ofCourseCanWash",
    actions: new SequentialText(
      `"Of course I know how to wash myself!" You cry indignantly. "Mother makes me wash in the stream twice a week!"`,
      `"Sarcasm isn't lost on you, I see," replies the cat, rolling its eyes. "Never mind. How is it you believe I can be of assistance to you?"`
    ),
    options: {
      "Don't understand": "leave",
      "I'm Genevieve": "introduce",
      Leave: "leave"
    }
  },
  {
    id: "introduce",
    actions: new SequentialText(
      `"Umm. My name's Genevieve. I think the lady that lives here wants to eat me and I really must get home. Can you help me, pussycat?"`,
      `The cat regards you for a moment, seemingly wrestling with indecision, before replying, "Well, Genevieve, that's quite the predicament, isn't it? Quite the predicament indeed. Yes, our dear Mildred is prey to certain...predilictions. Quite unbecoming, truth be told, but we're all slaves to our vices, aren't we?"`,
      `The cat pauses, as if expecting a response. When none is forthcoming, it continues, "What am I saying? You're much too young to know what I'm talking about. Anyway, about your getting home. Locked the door, has she? Yes, she will do that, the mean old bat. Not sporting at all, that."`
    ),
    options: {
      "Your name": "yourName",
      "Find key": "findKey",
      "How to escape": "leave",
      "Need fur": "leave",
      Leave: "leave"
    }
  },
  {
    id: "yourName",
    actions: new SequentialText(
      `Before the cat can continue, you interject, "And what's your name, kitty, if you don't mind me asking?"`,
      `"My name?" The cat clears its throat and its eyes dart around, as though embarrassed. "It's...Sir Cat. That'll have to do."`
    ),
    options: {
      "Sir Cat it is": "sirCat",
      "No, really": "noReally",
      Leave: "leave"
    }
  },
  {
    id: "sirCat",
    actions: [
      () => {
        catName = "Sir Cat";
        return null;
      },
      () =>
        `"Nice to meet you, ${catName}."\n\nThe cat appears to wince, then nods for you to go on.`
    ],
    options: {
      "Find key": "findKey",
      "How to escape": "leave",
      "Need fur": "leave",
      Leave: "leave"
    }
  },
  {
    id: "noReally",
    actions: [
      () => {
        catName = "Mister Snugglesworth";
        return null;
      },
      new SequentialText(
        `"You're not fooling me, *Sir Cat*," you say with a smirk. "What's your *real* name?"`,
        `The cat sighs audibly. "Very well," it says. "It's Mister Snugglesworth."`
      )
    ],
    options: {
      Giggle: "giggle",
      "Find key": "findKey",
      "How to escape": "leave",
      "Need fur": "leave",
      Leave: "leave"
    }
  },
  {
    id: "giggle",
    actions: new SequentialText(
      `Unable to help yourself, you let out a short, delighted peel of laughter before stifling it with a hurried hand over your mouth.`,
      `"Oh, so you find my moniker amusing, do you, *Jenner Veev*? What if I told you yours sounds like something from a bad periodical?"`,
      `"Sorry!" you rescue. "It's really a very lovely name, sir."`,
      `${catName} eyes you suspiciously. "Yes. Well. Where were we?"`
    ),
    options: {
      "Find key": "findKey",
      "How to escape": "leave",
      "Need fur": "leave",
      Leave: "leave"
    }
  },
  {
    id: "findKey",
    actions: new SequentialText(
      `Do you know where...Mildred...keeps the key, ${catName}?`,
      `${catName} shakes his head emphatically, his white whiskers swishing back and forth. "You can forget that idea straight away, Jenner. She keeps the key on her all the time and there's no way you'd be able to snatch it, I'm afraid to say. Use that oversized two-legger brain of yours to find another solution."`
    ),
    options: {
      "How to escape": "leave",
      "Need fur": "leave",
      Leave: "leave"
    }
  },
  {
    id: "spokeBefore",
    actions: new SequentialText(
      `"I spoke to you before and you ignored me!" you protest.`,
      `The cat snorts. "That, my dear girl, was not speaking. That was inane two-legger babble at its most nonsensical. I'd assumed there was no hope at all for you, I must admit, but here we are, conversing for all the world like two civilised creatures. Who'd have thought you had it in you all along, eh? So no more of that absurd furless drivel, please."`
    ),
    options: {
      "Not drivel!": "notDrivel",
      "I'm Genevieve": "introduce",
      Leave: "leave"
    }
  },
  {
    id: "leave",
    actions: new RandomText(
      `"Sorry, sir. I've got to go."`,
      `"I just remembered I have to do something!"`,
      `"I'll be back later. Bye!"`
    ),
    noEndTurn: true
  }
];

const catGraph = new OptionGraph(...catTalkNodes);

const speak = new Verb(
  "speak",
  () => selectPlayer().dolittle,
  () => catGraph.commence(),
  [
    () => {
      catGraph.getNode("greeting").options["Spoke to you before"] =
        "spokeBefore";
      return null;
    },
    new SequentialText(
      `Clearing your throat, you politely address the cat.\n\n"Hello, Mr Pussycat, sir. Err... or Madam. I'm Genevieve."`,
      `The cat regards you for a long while. You'd swear it had an eyebrow raised if it had eyebrows. Then it lets out a single weary meaow, before closing its eyes and resting its chin back on its front paws. You feel as though you've been dismissed.`
    )
  ],
  ["talk", "question", "ask", "tell"]
);

cat.addVerb(speak);

// TESTING (remove)
const dolittle = new Potion("Dolittle Decoction");
// TESTING (end)

snug.addItems(cat, dolittle);
