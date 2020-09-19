package utils;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author thomas.curti (thomas.curti@epita.fr)
 * @since 1.0
 */
@FunctionalInterface
public interface Converter<FROM_TYPE, TO_TYPE> {

    /**
     * Convert object from type FROM_TYPE to type TO_TYPE.
     *
     * @param from value.
     */
    TO_TYPE convert(final FROM_TYPE from);

    /**
     * Convert List<object> from type List<FROM_TYPE> to type List<TO_TYPE>.
     *
     * @param fromList value.
     */
    default List<TO_TYPE> convertList(final Collection<FROM_TYPE> fromList) {
        return fromList.stream().map(this::convert).collect(Collectors.toList());
    }

    interface Reversible<FROM_TYPE, TO_TYPE> extends Converter<FROM_TYPE, TO_TYPE> {

        /**
         * Convert object from type TO_TYPE to type FROM_TYPE.
         *
         * @param from value.
         */
        FROM_TYPE revertConvert(final TO_TYPE from);

        /**
         * Convert List<object> from type List<TO_TYPE> to type List<FROM_TYPE>.
         *
         * @param fromList value.
         */
        default List<FROM_TYPE> revertConvertList(final Collection<TO_TYPE> fromList) {
            return fromList.stream().map(this::revertConvert).collect(Collectors.toList());
        }
    }
}
