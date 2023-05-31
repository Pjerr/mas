export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
    Pick<T, TRequired>;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
