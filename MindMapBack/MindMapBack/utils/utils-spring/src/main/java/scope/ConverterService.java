package scope;

import org.springframework.stereotype.Service;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * @author thomas.curti (thomas.curti@epita.fr)
 * @since 1.0
 */
@Service
@Retention(RetentionPolicy.RUNTIME)
public @interface ConverterService {
}
