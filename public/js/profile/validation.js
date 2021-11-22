//
// $(function () {
//     $("#profileForm" ).validate({
//         rules: {
//             email: {
//                 required: true,
//                 email: true,
//                 remote: {
//                     url: "check-email.php",
//                     type: "post",
//                     data: {
//                         username: function() {
//                             return $("#username").val();
//                         }
//                     }
//                 }
//             },
//             newPassword: {
//             }
//         }
//     });
// });
//
// $("#profileForm").validate({
//     rules: {
//         email: {
//             required: true,
//             email: true,
//             remote: {
//                 url: "check-email.php",
//                 type: "post",
//                 data: {
//                     username: function() {
//                         return $( "#username" ).val();
//                     }
//                 }
//             }
//         },
//         newPassword: {
//         }
//     }
// });

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

    $("#edit-form").validate({
        rules: {
            email: {
                required: true,
                email: true,

            },
            newPassword: {
                required: true,
                strongPassword: true
            },
            confirmPassword: {
                required: true,
                equalTo: '#newPassword',
                strongPassword: true
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
            mobileNum: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10
            },
            // gender:{
            //     required:true
            // }

        },
        messages: {
            email: {
                required: 'Inserta tu correo institucional',
                email: 'Correo electrónico inválido',
            },
            mobileNum: {
                required: 'Inserta tu número de teléfono',
                number: 'Número de teléfono inválido'
            },
            collegeId: {
                required: 'Inserta tu mátricla',
                number: 'Matrícula inválida, recuerda poner solo los números'
            },
            firstName: {
                required: 'Inserta tu nombre(s)'
            },
            lastName: {
                required: 'Inserta tu apellido(s)'
            },
            newPassword: {
                required: 'Inserta una contraseña'
            },

            confirmPassword: {
                required: 'Confirma tu contraseña',
                equalTo: 'Las contraseñas no coinciden'
            }
        }
    });
});