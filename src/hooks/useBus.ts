import Vue, { onMounted, onUnmounted } from "vue";

export const $bus = new Vue();

export interface IEvent {
  name: string;
  event: () => void;
}

export const useBus = (events: IEvent[] = []) => {
  if (events.length > 0) {
    onMounted(() => {
      events.forEach((event) => $bus.$on(event.name, event.event));
    });

    onUnmounted(() => {
      events.forEach((event) => $bus.$off(event.name, event.event));
    });
  }
  return { $bus, events };
};
