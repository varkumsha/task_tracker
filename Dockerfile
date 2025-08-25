# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Copy project files
COPY . .

# Fix permissions for mvnw
RUN chmod +x ./mvnw

# Build the app
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose Spring Boot default port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
