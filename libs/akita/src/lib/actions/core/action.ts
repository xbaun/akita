export interface ActionType<TType extends string> {
  type: TType;
}

export interface Action<TType extends string = string, TArgs extends (...args: any[]) => void = (...args: any[]) => void> extends ActionType<TType> {
  __ARGS__?: TArgs;
  args: Parameters<TArgs>;
}
