$(function() {

    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function(element) {
            $(element)
                .closest('.form-group')
                .addClass('has-error');
        },
        unhighlight: function(element) {
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

    $.validator.addMethod('strongPassword', function(value, element) {
        return this.optional(element)
            || value.length >= 6
            && /\d/.test(value)
            && /[a-z]/i.test(value);
    }, 'Se requieren al menos 8 caracteres y 1 dígito');

    $("#register-form").validate({
        rules: {
            email: {
                required: true,
                email: true,

            },
            password: {
                required: true,
                strongPassword: true
            },
            password2: {
                required: true,
                equalTo: '#password'
            },
            firstName: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            lastName: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            collegeId:{
                required: true,
                number: true,
                minlength:8,
                maxlength:8
            },
            mobileNum:{
                required:true,
                number:true,
                minlength:10,
                maxlength:10
            },
            // gender:{
            //     required:true
            // }

        },
        messages: {
            email: {
                required: 'Ingresa un correo electrónico institucional',
                email: 'Correo electrónico institucional inválido',
            },
            mobileNum: {
                required: 'Ingresa un número celular a 10 dígitos',
                number: 'Solo se permiten valores numéricos'
            },
            collegeId: {
                required: 'Ingresa tu matricula sin A',
                number: 'Solo se permiten valores numéricos'
            },
            firstName: {
                required: 'Ingresa tu nombre'
            },
            lastName: {
                required: 'Ingresa tu apellido'
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