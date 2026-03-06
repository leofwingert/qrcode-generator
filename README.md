# Gerador de QR Code

Aplicacao full-stack para gerar codigos QR e armazena-los na AWS S3.

## Estrutura de Pastas

- `qrcode-frontend/` - app React + Vite
- `qrcode-backend/` - API Spring Boot

## Funcionalidades

- Gera codigos QR a partir de texto ou URLs.
- Armazena os codigos QR gerados em um bucket S3 da AWS.
- Frontend React e API Spring Boot no mesmo deploy Docker.

## Tecnologias Utilizadas

- Java 21
- Spring Boot 3.5
- Maven
- React + Vite
- AWS SDK v2 (S3)
- ZXing (geracao de QR Code)
- Docker

## Como Comecar

### Pre-requisitos

- Java 21+
- Maven
- Node.js 22+ (apenas para dev local do frontend)
- Docker
- Conta AWS com bucket S3

### Configuracao

Defina suas credenciais AWS em um arquivo `.env` na raiz do projeto:

```dotenv
AWS_REGION=sua-regiao
AWS_ACCESS_KEY_ID=sua-access-key
AWS_SECRET_ACCESS_KEY=sua-secret-key
AWS_BUCKET_NAME=nome-do-seu-bucket
```

## Build e Execucao

### Localmente

#### Backend

```bash
cd qrcode-backend
./mvnw clean package
./mvnw spring-boot:run
```

#### Frontend

```bash
cd qrcode-frontend
npm install
npm run dev
```

### Docker (frontend + backend na mesma imagem)

A imagem empacota o frontend em `qrcode-backend/src/main/resources/static` durante o build.

```bash
docker build -t qrcode-generator:latest .
docker run --env-file .env -p 8080:8080 qrcode-generator:latest
```

Apos subir:

- UI: `http://localhost:8080`
- API: `POST http://localhost:8080/qrcode`

## Uso da API

- Endpoint: `POST /qrcode`
- Body JSON:

```json
{
  "text": "https://exemplo.com"
}
```

- Resposta JSON:

```json
{
  "url": "https://bucket.s3.region.amazonaws.com/arquivo"
}
```

## Referencias

- Spring Boot: https://spring.io/projects/spring-boot
- AWS SDK Java v2: https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/home.html
- ZXing: https://github.com/zxing/zxing
