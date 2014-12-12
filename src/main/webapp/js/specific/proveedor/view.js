/* 
 * Copyright (C) 2014 raznara
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */


var proveedorView = function (strClase) {
    this.clase = strClase;
};
proveedorView.prototype = new view('proveedor');
proveedorView.prototype.getClassNameProveedor = function () {
    return this.getClassName() + "Vista";
};
var oProveedorView = new proveedorView('proveedor');


//proveedorView.prototype.loadButtons = function (id) {
//
//    var botonera = "";
//    botonera += '<div class="btn-toolbar" role="toolbar"><div class="btn-group btn-group-xs">';
//    botonera += '<a class="btn btn-default view" id="' + id + '"  href="jsp#/' + this.clase + '/view/' + id + '"><i class="glyphicon glyphicon-eye-open"></i></a>';
//    botonera += '<a class="btn btn-default edit" id="' + id + '"  href="jsp#/' + this.clase + '/edit/' + id + '"><i class="glyphicon glyphicon-pencil"></i></a>';
//    botonera += '<a class="btn btn-default remove" id="' + id + '"  href="jsp#/' + this.clase + '/remove/' + id + '"><i class="glyphicon glyphicon-remove"></i></a>';
//    botonera += '</div></div>';
//    return botonera;
//
//}
proveedorView.prototype.loadFormValues = function (valores, campos) {
//                    $('#proveedor_form #titulo').val(valores['titulo']);
//                    $('#proveedor_form #contenido').val(valores['contenido']);
//                    $('#proveedor_form #alta').val(valores['alta']);
//                    $('#proveedor_form #cambio').val(valores['cambio']);
//                    $('#proveedor_form #hits').val(valores['hits']);
//                    $('#proveedor_form #id_usuario').val(valores['id_usuario']);
//                    $('#proveedor_form #etiquetas').val(valores['etiquetas']);
//                    $('#proveedor_form #publicado').val(valores['publicado']);
//                    $('#proveedor_form #portada').val(valores['portada']);
    this.doFillForm(valores, campos);
};

proveedorView.prototype.getFormValues = function () {
    var valores = [];
//                    valores['titulo'] = $('#proveedor_form #titulo');
//                    valores['contenido'] = $('#proveedor_form #contenido');
//                    valores['alta'] = $('#proveedor_form #alta');
//                    valores['cambio'] = $('#proveedor_form #cambio');
//                    valores['hits'] = $('#proveedor_form #hits');
//                    valores['id_usuario'] = $('#proveedor_form #id_usuario');
//                    valores['etiquetas'] = $('#proveedor_form #etiquetas');
//                    valores['publicado'] = $('#proveedor_form #publicado');
//                    valores['portada'] = $('#proveedor_form #portada');

    var disabled = $('#proveedorForm').find(':input:disabled').removeAttr('disabled');
    valores = $('#proveedorForm').serializeObject();
    disabled.attr('disabled', 'disabled');
    return valores;
};

proveedorView.prototype.doEventsLoading = function () {
    var thisObject = this;



};

proveedorView.prototype.okValidation = function (f) {
    $('#proveedorForm').on('success.form.bv', f);
};


proveedorView.prototype.getEmptyCuadros = function () {
    $.when(ajax().ajaxCallSync(path + '/jsp?ob=' + this.clase + '&op=cuadros&mode=1', 'GET', '')).done(function (data) {
        form = data;
    });
    return form;
};

proveedorView.prototype.getBodyCuadros = function (page, fieldNames, visibleFields, tdbuttons) {
    var thisObject = this;
    var tabla = "";
    $.each(page, function (index, value) {
        tabla += '<div class="wrapper"><div id="cuadro">';

        var numField = 0;
        var id;
        var path;
        var cuerpo = "";
        var strClaveAjena;

        $.each(fieldNames, function (index, valor) {
            if ("id" == valor) {
                id = value[valor];
            }

            if ("path" == valor) {
                path = value[valor];
            }

            if (path) {
                tabla += "<div class=\"imageinfo\"><a id=\"" + id + "\"  href=\"jsp#/proveedor/view/" + id + "\"><img class=\"img-responsive\"src=\"" + path + "\"></a></div>";
            }

            numField++;
            var visibleFields2 = 3;
            if (numField <= visibleFields2) {
                cuerpo += '<div id="info">' + thisObject.printValue(value, valor, true) + '</div>';
            }
        });
        tabla += cuerpo;
        tabla += '<a class="btn btn-primary botonprod" href="">Añadir al carrito</a>';
        tabla += '</div></div>';
    });
    return tabla;
};




