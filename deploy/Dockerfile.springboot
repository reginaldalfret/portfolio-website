FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/portfolio-0.0.1-SNAPSHOT.jar app.jar
ENV SERVER_PORT=8082
EXPOSE 8082
CMD ["java", "-jar", "app.jar", "--server.port=8082"]
