package com.pfee.mindmap;

import com.pfee.mindmap.persistence.model.LinksModel;
import com.pfee.mindmap.persistence.model.MindmapModel;
import com.pfee.mindmap.persistence.model.UserMapsModel;
import com.pfee.mindmap.persistence.model.UserModel;
import com.pfee.mindmap.persistence.repository.LinksRepository;
import com.pfee.mindmap.persistence.repository.MindmapRepository;
import com.pfee.mindmap.persistence.repository.UserMapsRepository;
import com.pfee.mindmap.persistence.repository.UserRepository;
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
