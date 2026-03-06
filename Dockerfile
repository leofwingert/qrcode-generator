FROM node:22-alpine AS frontend-build
WORKDIR /frontend

COPY qrcode-frontend/package*.json ./
RUN npm ci

COPY qrcode-frontend/ ./
RUN npm run build

FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app

COPY qrcode-backend/pom.xml ./pom.xml
COPY qrcode-backend/src ./src
COPY --from=frontend-build /frontend/dist/ ./src/main/resources/static/

RUN mvn -B clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

ENV SERVER_PORT=8080
ENV AWS_REGION=us-east-2
ENV AWS_BUCKET_NAME=qr-code-storage-bucket27

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]