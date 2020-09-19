package utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author dumeig_a (antoine.dumeige@epita.fr)
 * @since 1.0-SNAPSHOT
 */
public interface CanLog {

    default Logger logger() {
        return LoggerFactory.getLogger(getClass());
    }

}
