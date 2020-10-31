package utils;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * @author thomas.curti (thomas.curti@epita.fr)
 * @since 1.0
 */
public final class IterableUtils {

    private IterableUtils() {}

    /**
     * Convert Iterable ELEM_TYPE object to List<ELEM_TYPE>.
     *
     * @param iterable value.
     */
    public static <ELEM_TYPE> List<ELEM_TYPE> toList(final Iterable<ELEM_TYPE> iterable) {
        return StreamSupport.stream(iterable.spliterator(), false)
                            .collect(Collectors.toList());
    }
}
