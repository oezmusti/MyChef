FROM eclipse-temurin:21-jre

COPY backend/target/myRezept-Backend-0.0.1-SNAPSHOT.jar myRezept-Backend-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "myRezept-Backend-0.0.1-SNAPSHOT.jar"]