$(function () {

    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element)
                .closest('.form-group')
                .addClass('has-error');
        },
        unhighlight: function (element) {
            $(element)
                .closest('.form-group')
                .removeClass('has-error');
        },
        errorPlacement: function (error, element) {
            if (element.prop('type') === 'radio') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $.validator.addMethod('strongPassword', function (value, element) {
        return this.optional(element)
            || value.length >= 8
            && /\d/.test(value)
            && /[a-z]/i.test(value);
    }, 'Ingresa contraseña con al menos 8 caracteres y 1 dígito');

    $("#login-form").validate({
        rules: {
            email: {
                required: true,
                email: true,

            },
            password: {
                required: true
            }
        },
        messages: {
            email: {
                required: 'Ingresa un correo electrónico institucional',
                email: 'Correo electrónico institucional inválido',
            },
            password: {
                required: 'Ingresa una contraseña'
            }
        }
        // submitHandler: function (form) { // for demo
        //     alert('valid form submitted'); // for demo
        //     return false; // for demo
        // }
    });
});