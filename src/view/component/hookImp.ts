import { getCurrentInstance, onMounted } from "vue";

const hookSymbol = Symbol("hookSymbol");
interface HookState {
  states: unknown[];
  currentIndex: number;
  initial: boolean;
}
export const useState = <T>(state: T): T => {
  const instance = getCurrentInstance();

  let hookState: HookState = Reflect.get(instance, hookSymbol);

  console.log(!hookState);
  if (!hookState) {
    hookState = {
      states: [state],
      currentIndex: 0,
      initial: true,
    };
    Reflect.set(instance, hookSymbol, hookState);
    console.log("add");
    return hookState.states[hookState.currentIndex] as T;
  } else {
    console.log("return");
    hookState.currentIndex++;
    if (
      !instance.isMounted &&
      hookState.states.length === hookState.currentIndex
    ) {
      hookState.states.push(state);
    } else {
      hookState.currentIndex = 0;
    }
  }

  return hookState.states[hookState.currentIndex] as T;
};
