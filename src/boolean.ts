export default class BooleanUtils {

    public static trueIfUndefined(value?: boolean): boolean {

        return value ?? true;

    }

}
