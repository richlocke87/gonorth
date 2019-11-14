import Item from "./item";
import { initStore } from "../redux/store";
import { getStore, unregisterStore } from "../redux/storeRegistry";
import { SequentialText } from "./text";
import { newGame } from "../redux/gameActions";
import { selectInventory } from "../utils/selectors";
import Game from "./game";
import Room from "./room";

const selectOptions = () => getStore().getState().game.interaction.options;

let game, room;

beforeEach(() => {
  unregisterStore();
  initStore();

  // Pretend we're in the browser
  game = new Game("Jolly Capers", false);
  room = new Room("red");
  getStore().dispatch(newGame(game, true, false));
});

test("items can have variable descriptions", () => {
  let looks = 0;
  const clock = new Item("clock", item => {
    looks++;
    if (looks === 1) {
      return "It's 12 o'clock";
    } else if (looks === 2) {
      return "It's 1 o'clock";
    }
  });

  expect(clock.description).toBe("It's 12 o'clock");
  expect(clock.description).toBe("It's 1 o'clock");
});

it("Doesn't render a Next button for cyclic descriptions", () => {
  const table = new Item("table", ["It's made of wood.", "It has four legs."]);
  table.try("x");
  expect(selectOptions()).toBeNull();
});

it("renders each page of sequential text then stops", async () => {
  const chair = new Item("chair", new SequentialText("a", "b"));
  chair.try("x");
  setTimeout(() => selectOptions()[0].action());
  expect(selectOptions()).toBeNull();
});

test("items can be picked up", async () => {
  const watch = new Item("watch", "posh-looking", true, 1);
  room.addItem(watch);
  await watch.try("take");
  expect(selectInventory().items.watch.name).toBe("watch");
});

test("items can't be picked up if they're bigger than the inventory", async () => {
  game.setInventoryCapacity(5);
  const medicineBall = new Item("medicine ball", "big", true, 6);
  room.addItem(medicineBall);
  await medicineBall.try("take");
  expect(selectInventory().items["medicine ball"]).toBeUndefined();
});

test("items can't be picked up if there's no room left", async () => {
  game.setInventoryCapacity(10);
  const medicineBall = new Item("medicine ball", "big", true, 6);
  const panda = new Item("panda", "black and white", true, 6);
  room.addItem(medicineBall);
  room.addItem(panda);
  await medicineBall.try("take");
  await panda.try("take");
  expect(selectInventory().items["medicine ball"]).not.toBeUndefined();
  expect(selectInventory().items.panda).toBeUndefined();
});
