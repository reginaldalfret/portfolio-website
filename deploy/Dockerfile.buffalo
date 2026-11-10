FROM golang:alpine AS builder
WORKDIR /app
ENV GOTOOLCHAIN=auto
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux go build -o portfolio-buffalo .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/portfolio-buffalo /app/portfolio-buffalo
COPY --from=builder /app/templates /app/templates
COPY --from=builder /app/public /app/public
ENV PORT=8087
ENV GO_ENV=production
EXPOSE 8087
CMD ["/app/portfolio-buffalo"]
