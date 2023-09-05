export default class FunctionUtils {

    public static identity<T>(value: T): () => T {

        return () => value;

    }

}
