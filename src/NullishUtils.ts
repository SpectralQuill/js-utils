export default class NullishUtils {

    public static makeUndefined< T >(): T {

        return undefined as unknown as T;

    }

}
