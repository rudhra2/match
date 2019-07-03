From java:8-jre
WORKDIR usr/src
ENV MYSQL_DATABASE=matchdb
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=vasansund@3
ENV MYSQL_CI_URL=jdbc:mysql://localhost:3306/matchdb
ADD ./target/userservice.jar /usr/src/userservice.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "userservice.jar"]
