# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Copy project files
COPY . .

# Ensure mvnw is executable
RUN chmod +x mvnw

# Package the application (skip tests for faster builds)
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built jar from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 (Spring Boot default)
EXPOSE 8080

# Start the app
ENTRYPOINT ["java", "-jar", "app.jar"]
