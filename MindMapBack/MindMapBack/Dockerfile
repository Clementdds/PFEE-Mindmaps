FROM adoptopenjdk:14-jre-hotspot
ARG JAR_FILE=*.jar
COPY . /app
RUN cd app;./mvnw clean package -DskipTests
RUN cp /app/webapp/target/${JAR_FILE} /app/application.jar
EXPOSE 9999
ENTRYPOINT ["java", "-jar", "/app/application.jar"]
