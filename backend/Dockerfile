FROM maven:3.9.9-eclipse-temurin-21 AS development
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends wget && rm -rf /var/lib/apt/lists/*
COPY pom.xml .
RUN mvn -B -q -DskipTests dependency:go-offline
COPY src src
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD ["sh", "-c", "wget -qO- http://localhost:8080/actuator/health || exit 1"]
CMD ["mvn", "spring-boot:run"]

FROM development AS build
WORKDIR /app
RUN mvn -B -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends wget && rm -rf /var/lib/apt/lists/* \
    && addgroup --system spring && adduser --system --ingroup spring spring
COPY --from=build /app/target/my-fullstack-app-0.0.1-SNAPSHOT.jar app.jar
USER spring
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD ["sh", "-c", "wget -qO- http://localhost:8080/actuator/health || exit 1"]
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
