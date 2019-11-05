import { DORMANT, PENDING } from "../game/event";

export async function processEvent(event) {
  if (event.state === DORMANT && event.condition()) {
    // First look for events to commence
    await event.commence();
  } else if (event.state === PENDING) {
    // Then look for events that are counting down
    await event.tick();
  }
}
