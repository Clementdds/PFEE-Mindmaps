package com.mti.mindmap;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * @author thomas.curti (thomas.curti@epita.fr)
 * @since 1.0
 */

@Configuration
@EnableJpaRepositories(basePackageClasses = {})
public class MindmapConfiguration {
}
