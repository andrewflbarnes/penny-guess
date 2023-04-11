FROM maven:3.9.1-eclipse-temurin-11 AS builder

RUN mkdir /build
WORKDIR /build

COPY . .

RUN mvn package

FROM eclipse-temurin:11-jre-alpine

ENV PORT=
ENV DATABASE_URL=
ENV JAVA_OPTS="-Djava.net.preferIPv4Stack=false -Djava.net.preferIPv4Addresses=false -Djava.net.preferIPv6Stack=true -Djava.net.preferIPv6Addresses=true"

RUN mkdir /app
WORKDIR /app

COPY --from=builder /build/penny-guess-server/target/*jar pg.jar

ENTRYPOINT ["java", "-jar", "pg.jar"]
