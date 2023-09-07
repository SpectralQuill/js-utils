export default class FunctionUtils {

    /*
    
        To add:
            switchCondition(): use this in other switch from conditions methods
    
    */

    public static identity<T>(value: T): () => T {

        return () => value;

    }

}
