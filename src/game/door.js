import Item from "./item";
import Verb from "./verb";

export default class Door extends Item {
  constructor(
    name,
    description,
    open = true,
    locked = false,
    openSuccessText,
    openFailureText,
    unlockSuccessText,
    unlockFailureText,
    aliases
  ) {
    super(
      name,
      description,
      false,
      -1,
      [
        new Verb(
          "open",
          door => !door.locked,
          [
            door => (door.open = true),
            openSuccessText || `The ${name} opens relatively easily.`
          ],
          openFailureText || `The ${name} is locked.`
        ),
        new Verb(
          "close",
          door => door.open,
          [door => (door.open = false), `You close the ${name}.`],
          `The ${name} is already closed.`
        ),
        new Verb(
          "unlock",
          door => door.locked,
          [
            door => (door.locked = false),
            unlockSuccessText || `The ${name} unlocks with a soft click.`
          ],
          unlockFailureText || `The ${name} is already unlocked.`
        )
      ],
      aliases
    );
    this.open = open;
    this.locked = locked;
  }
}
