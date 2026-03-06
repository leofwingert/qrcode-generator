package com.leofwingert.qrcode.generator.controller.qrcode;

import com.leofwingert.qrcode.generator.dto.QrCodeGenerateRequest;
import com.leofwingert.qrcode.generator.dto.QrCodeGenerateResponse;
import com.leofwingert.qrcode.generator.service.QrCodeGeneratorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/qrcode")
public class QRCodeController {

    private final QrCodeGeneratorService qrCodeGeneratorService;

    public QRCodeController(QrCodeGeneratorService qrCodeService) {
        this.qrCodeGeneratorService = qrCodeService;
    }

    @PostMapping
    public ResponseEntity<QrCodeGenerateResponse> generate(@RequestBody QrCodeGenerateRequest request){

        try{
            QrCodeGenerateResponse response = this.qrCodeGeneratorService.generateAndUploadQrCode(request.text());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("Error generating QR code: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
