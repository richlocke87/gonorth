import { Room, Door } from "../../../../lib/gonorth";
import { bedroom } from "./bedroom";
import { upperSpiral } from "./upperSpiral";

export const southHall = new Room(
  "South Hall",
  "You find yourself in a long corridor with pretensions of grandeur. There's a worn and dusty red rug lining much of its length and a large grandfather clock stands in one corner, balefully ticking off the seconds as they pass. There are no windows, but several candles in ornate wall sconces cast a flickering yellow light. The ceiling is some way above you, lost in shadow. You get the queasy feeling something's up there, staring down at you from its hiding place in the dark.\n\nThere are four ways leading out of here. To the north is an archway leading to the main hall. On the West wall there's a white painted door, whilst to the East there's a decoratively varnished door. There's a rickety wooden door to the South."
);

const ricketyDoor = new Door(
  "rickety door",
  "A rickety looking wooden door consisting of barely held-together rotten planks. One hinge is missing - the others appear to be in working order.",
  false,
  false
);

southHall.addItems(ricketyDoor);
upperSpiral.addItems(ricketyDoor);

southHall.setEast(bedroom);
southHall.setSouth(
  upperSpiral,
  () => ricketyDoor.open,
  "You step through the doorway.",
  "Rickety as it may be, it's still a door, and it's still closed. Much as you'd like to, you can't simply pass through it."
);
