FROM golang:1.21.4

WORKDIR /app

COPY . .
COPY ./database/database.db /app/database/database.db

ENV IS_DOCKER=true

RUN go mod download

RUN go build -o api-server ./cmd/api-server

EXPOSE 8080

CMD ["./api-server"]
