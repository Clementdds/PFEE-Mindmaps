package com.mti.mindmap;

import com.mti.mindmap.persistence.repository.MindmapRepository;
import com.mti.mindmap.persistence.repository.UserRepository;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * @author thomas.curti (thomas.curti@epita.fr)
 * @since 1.0
 */

@Configuration
@EnableJpaRepositories(basePackageClasses = {UserRepository.class, MindmapRepository.class})
public class MindmapConfiguration {
}
