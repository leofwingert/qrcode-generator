FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app

COPY qrcode-backend/pom.xml ./pom.xml
COPY qrcode-backend/src ./src

RUN mvn -B clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

ENV AWS_REGION=us-east-2
ENV AWS_BUCKET_NAME=qr-code-storage-bucket27

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -Dserver.port=${PORT:-${SERVER_PORT:-8080}} -jar app.jar"]