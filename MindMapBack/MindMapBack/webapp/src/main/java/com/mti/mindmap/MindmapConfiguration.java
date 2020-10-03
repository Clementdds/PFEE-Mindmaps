package com.mti.mindmap;

import com.mti.mindmap.persistence.model.LinksModel;
import com.mti.mindmap.persistence.model.MindmapModel;
import com.mti.mindmap.persistence.model.UserMapsModel;
import com.mti.mindmap.persistence.model.UserModel;
import com.mti.mindmap.persistence.repository.LinksRepository;
import com.mti.mindmap.persistence.repository.MindmapRepository;
import com.mti.mindmap.persistence.repository.UserMapsRepository;
import com.mti.mindmap.persistence.repository.UserRepository;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * @author thomas.curti (thomas.curti@epita.fr)
 * @since 1.0
 */

@Configuration
@EnableJpaRepositories(basePackageClasses = {UserRepository.class, UserModel.class,
                                            MindmapRepository.class, MindmapModel.class,
                                            UserMapsRepository.class, UserMapsModel.class,
                                            LinksRepository.class, LinksModel.class})
public class MindmapConfiguration {
}
