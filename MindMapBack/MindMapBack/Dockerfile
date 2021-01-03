FROM adoptopenjdk:14-jre-hotspot
ARG JAR_FILE=*.jar
RUN ./mvnw spring-boot:run
COPY webapp/target/${JAR_FILE} application.jar
EXPOSE 9999
ENTRYPOINT ["java", "-jar", "application.jar"]
