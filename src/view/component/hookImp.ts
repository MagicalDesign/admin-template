import {
  getCurrentInstance,
  onMounted,
  watch,
  WatchStopHandle,
  WatchSource,
  WatchCallback,
  WatchOptions,
} from "vue";
type MultiWatchSources = (WatchSource<unknown> | object)[];
type MapSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V>
    ? Immediate extends true
      ? V | undefined
      : V
    : T[K] extends object
    ? Immediate extends true
      ? T[K] | undefined
      : T[K]
    : never;
};
const hookSymbol = Symbol("hookSymbol");
interface HookState {
  states: unknown[];
  currentIndex: number;
  initial: boolean;
}

export const useState = <T>(state: T): T => {
  const instance = getCurrentInstance();

  let hookState: HookState = Reflect.get(instance, hookSymbol);

  if (!hookState) {
    hookState = {
      states: [state],
      currentIndex: 0,
      initial: true,
    };
    Reflect.set(instance, hookSymbol, hookState);
    return hookState.states[hookState.currentIndex] as T;
  } else {
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
export interface UseEffect {
  <T extends MultiWatchSources, Immediate extends Readonly<boolean> = false>(
    sources: [...T],
    cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
    options?: WatchOptions<Immediate>
  ): WatchStopHandle;
  <
    T extends Readonly<MultiWatchSources>,
    Immediate extends Readonly<boolean> = false
  >(
    source: T,
    cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
    options?: WatchOptions<Immediate>
  ): WatchStopHandle;

  <T, Immediate extends Readonly<boolean> = false>(
    source: WatchSource<T>,
    cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
    options?: WatchOptions<Immediate>
  ): WatchStopHandle;

  <T extends object, Immediate extends Readonly<boolean> = false>(
    source: T,
    cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
    options?: WatchOptions<Immediate>
  ): WatchStopHandle;
}

export const useEffect = ((source, watchCallback, option) => {
  const instance = getCurrentInstance();
  let watchStopHandle: WatchStopHandle;
  if (!instance.isMounted) {
    watchStopHandle = watch(source, watchCallback, option);
  }
  return useState(watchStopHandle);
}) as unknown as UseEffect;
