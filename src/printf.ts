export function printf<S extends string>(_string: S, ..._args: PrintfArgs<S>) {
  // implement it here...
}

type PrintfArgs<S extends string> = RecurArgs<S>;

type PrintfSpec = keyof SpecTypeBySpecChar;

type SpecTypeBySpecChar = {
  d: number;
  s: string;
};

type RecurArgs<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Head extends '%'
    ? ParseSpec<Tail>
    : RecurArgs<Tail>
  : [];

type ParseSpec<S extends string> = FirstChar<S> extends PrintfSpec
  ? [SpecTypeBySpecChar[FirstChar<S>], ...RecurArgs<TailOrEmpty<S>>]
  : never;

type TailOrEmpty<S extends string> = S extends `${infer Head}${infer Tail}` ? Tail : '';

type FirstChar<S extends string> = S extends ''
  ? never
  : S extends `${infer Head}${infer _}`
  ? Head
  : S;
