FROM eclipse-temurin:17-jdk-jammy as builder
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
EXPOSE 8080
COPY --from=builder /target/*.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar" ]