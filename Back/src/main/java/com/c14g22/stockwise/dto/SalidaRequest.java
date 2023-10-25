package com.c14g22.stockwise.dto;

import com.c14g22.stockwise.model.Producto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SalidaRequest {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate fecha;
    private String motivo;
    private Producto producto;

    @Override
    public String toString() {
        return "SalidaRequest{" +
                "fecha='" + fecha + '\'' +
                "motivo='" + motivo + '\'' +
                "producto='" + producto + '\'' +
                '}';
    }
}
