const mongoose = require("mongoose");

const publicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 40,
        validate: {
            validator: (value) => {
                const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/;
                return regex.test(value);
            },
            message: "El título no cumple con los requisitos de formato.",
        },
    },
    descripcion: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 300,
        validate: {
            validator: (value) => {
                const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/;
                return regex.test(value);
            },
            message: "La descripción no cumple con los requisitos de formato.",
        },
    },
    objetivo: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 120,
        validate: {
            validator: (value) => {
                const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/;
                return regex.test(value);
            },
            message: "El objetivo no cumple con los requisitos de formato.",
        },
    },
    fecha_inicio: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const currentDate = new Date();
                const maxDate = new Date();
                maxDate.setFullYear(maxDate.getFullYear() + 150); // 150 años desde la fecha actual

                return value >= currentDate && value <= maxDate;
            },
            message: "La fecha de inicio no cumple con los requisitos.",
        },
    },
    fecha_termino: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const currentDate = new Date();
                const maxDate = new Date(this.fecha_inicio);
                maxDate.setFullYear(maxDate.getFullYear() + 100); // 100 años desde la fecha de inicio

                return value >= currentDate && value <= maxDate;
            },
            message: "La fecha de término no cumple con los requisitos.",
        },
    },
    monto: {
        type: Number,
        required: true,
        min: 1,
        max: 999999999,
        validate: {
            validator: function (value) {
                return value > 0 && value <= 999999999;
            },
            message: "El monto no cumple con los requisitos.",
        },
    },
    cupos: {
        type: Number,
        required: true,
        min: 1,
        max: 500000,
        validate: {
            validator: function (value) {
                return value > 0 && value <= 500000;
            },
            message: "Los cupos no cumplen con los requisitos.",
        },
    },
});

const RenamedPublicacionModel = mongoose.model("RenamedPublicacion", publicacionSchema);

module.exports = RenamedPublicacionModel;
