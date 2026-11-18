type Nil = undefined | null;
type Nillable<T> = T | undefined | null;
type Nullable<T> = T | null;
type Maybe<T> = T | undefined;

type StrOrNum = string | number;

type ID = StrOrNum;

type ValueOption<TValue extends ID = ID> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};
