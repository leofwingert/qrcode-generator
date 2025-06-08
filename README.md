# Gerador de QR Code

Uma aplicação Spring Boot para gerar códigos QR e armazená-los na AWS S3.

## Funcionalidades

- Gera códigos QR a partir de texto ou URLs.
- Armazena os códigos QR gerados em um bucket S3 da AWS.
- API RESTful para geração e recuperação de códigos QR.

## Tecnologias Utilizadas

- Java 21
- Spring Boot 3.5
- Maven
- AWS SDK v2 (S3)
- ZXing (geração de QR Code)
- Docker

## Como Começar

### Pré-requisitos

- Java 21+
- Maven
- Docker (opcional, para containerização)
- Conta AWS com bucket S3

### Configuração

Defina suas credenciais AWS e bucket em um arquivo `.env`:

AWS_REGION=sua-regiao  
AWS_ACCESS_KEY_ID=sua-access-key  
AWS_SECRET_ACCESS_KEY=sua-secret-key  
AWS_BUCKET_NAME=nome-do-seu-bucket  

Ou configure como variáveis de ambiente.

### Build e Execução

#### Localmente

mvn clean package  
java -jar target/qrcode.generator-0.0.1-SNAPSHOT.jar

#### Com Docker

docker build -t qrcode-generator .  
docker run --env-file .env -p 8080:8080 qrcode-generator

### Uso da API

- POST /qrcode  
  Requisição: JSON com text:"URL"  
  Resposta: URL da imagem do QR code (armazenada no S3)

## Referências

- Documentação Spring Boot: https://spring.io/projects/spring-boot
- AWS SDK para Java v2: https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/home.html
- Biblioteca ZXing QR Code: https://github.com/zxing/zxing
