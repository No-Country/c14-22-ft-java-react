package com.c14g22.stockwise.dto;

import com.c14g22.stockwise.model.Producto;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductoRequest {
    private String nombre;
    private String imagen;
    private Double costo;
    private Double impuesto;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate fechaVencimiento;
    private String categoria;
    private String proveedor;
    private String marca;

    @Override
    public String toString() {
        return "ProductoRequest{" +
            "nombre='" + nombre + '\'' +
            ", imagen='" + imagen + '\'' +
            ", costo=" + costo +
            ", impuesto=" + impuesto +
            ", fechaVencimiento=" + fechaVencimiento +
            ", categoria='" + categoria + '\'' +
            ", proveedor='" + proveedor + '\'' +
            ", marca='" + marca + '\'' +
            '}';
    }
}
