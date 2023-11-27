FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x mvnw
RUN ./mvnw install -DskipTests

FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
EXPOSE 8080
COPY --from=build /workspace/app/target/*.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar" ]