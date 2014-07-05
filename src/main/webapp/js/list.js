/* 
 * Copyright (C) 2014 rafa
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


//VISTA
var list = function(objeto) {
    //contexto privado
    var link = "#";
    var neighborhood = 2;
    return {
        //contexto público (interface)
        getName: function() {
            return objeto.getName();
        },
        getObject: function() {
            return objeto;
        },
        getLoading: function() {
            return '<img src="fonts/ajax-loading.gif" alt="cargando..." />';
        },
        getPageLinks: function(page_number, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue) {
            page_number = parseInt(page_number);
            total_pages = parseInt(objeto.getPages(rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue));
            neighborhood = parseInt(neighborhood);

            UrlFromParamsWithoutPage = this.getUrlFromParamsWithoutPage(page_number, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue);
            url = 'jsp#/' + objeto.getName() + '/list/' + UrlFromParamsWithoutPage;
            vector = "<ul class=\"pagination\">";
            if (page_number > 1)
                vector += ('<li><a class="pagination_link" id="' + (page_number - 1) + '" href="' + url + '&page=' + (page_number - 1) + '">prev</a></li>');
            if (page_number > neighborhood + 1)
                vector += ('<li><a class="pagination_link" id="1" href="' + url + '&page=1">1</a></li>');
            if (page_number > neighborhood + 2)
                vector += ('<li>' + '<a href="#">...</a>' + '</li>');
            for (i = (page_number - neighborhood); i <= (page_number + neighborhood); i++) {
                if (i >= 1 && i <= total_pages) {
                    if (page_number === i) {
                        vector += ('<li class="active"><a class="pagination_link" id="' + i + '" href="' + url + '&page=' + i + '">' + i + '</a></li>');
                    }
                    else
                        vector += ('<li><a class="pagination_link" id="' + i + '" href="' + url + '&page=' + i + '">' + i + '</a></li>');
                }
            }
            if (page_number < total_pages - (neighborhood + 1))
                vector += ('<li>' + '<a href="#">...</a>' + '</li>');
            if (page_number < total_pages - (neighborhood))
                vector += ('<li><a class="pagination_link" id="' + total_pages + '" href="' + url + '&page=' + total_pages + '">' + total_pages + '</a></li>');
            if (page_number < total_pages)
                vector += ('<li><a class="pagination_link"  id="' + (page_number + 1) + '" href="' + url + '&page=' + (page_number + 1) + '">next</a></li>');
            vector += "</ul>";
            return vector;
        },
        getObjectTable: function(id) {
            cabecera = objeto.getPrettyFieldNames();
            datos = objeto.getOne(id);
            var tabla = "<table class=\"table table table-bordered table-condensed\">";
            $.each(objeto.getFieldNames(), function(index, valor) {

                tabla += '<tr><td><strong>' + cabecera[index] + '</strong></td>';
                tabla += '<td>';
                if (/id_/.test(valor)) {
                    if (datos[valor] == 0) {
                        tabla += "nulo" + ', <strong> id:0 </strong>';
                    } else {
                        $.when(ajaxCallSync(objeto.getPath() + '/json?ob=' + valor.split("_")[1].replace(/[0-9]*$/, "") + '&op=get&id=' + datos[valor], 'GET', '')).done(function(data) {
                            contador = 0;
                            add_tabla = "";
                            for (key in data) {
                                if (contador === 0)
                                    add_tabla = data[key];
                                if (contador === 1)
                                    add_tabla = data[key] + ', <strong> id: </strong>' + datos[valor];
                                //if (contador > 1)
                                //add_tabla = ", " + data[key].substr(0, 8)  + "... ";  
                                contador++;
                            }
                            if (contador === 0) {
                                add_tabla = datos[valor] + ' #error';
                            }
                            tabla += add_tabla;
                        });
                    }
                }
                else {
                    switch (datos[valor]) {
                        case true:
                            tabla += '<i class="glyphicon glyphicon-ok"></i>';
                            break;
                        case false:
                            tabla += '<i class="glyphicon glyphicon-remove"></i>';
                            break;
                        default:
                            tabla += decodeURIComponent(datos[valor]);
                    }
                    tabla += '</td></tr>';
                }
            });
            tabla += '</table>';
            return tabla;
        },
        getEmptyForm: function() {
            $.when(ajaxCallSync(objeto.getUrlJsp() + '&op=form&mode=1', 'GET', '')).done(function(data) {
                form = data;
            });
            return form;
        },
        getEmptyList: function() {
            $.when(ajaxCallSync(objeto.getUrlJsp() + '&op=list&mode=1', 'GET', '')).done(function(data) {
                form = data;
            });
            return form;
        },

        getEmptyDiv: function() {
            return '<div id="content"></div>';
        },
        doFillForm: function(id) {
            campos = objeto.getFieldNames();
            datos = objeto.getOne(id);
            $.each(campos, function(index, valor) {
                var a = true;
                switch (datos[campos[index]]) {
                    case true:
                        $('#' + campos[index]).attr("checked", "checked");
                        break;
                    case false:
                        break;
                    default:
                        $('#' + campos[index]).val(decodeURIComponent(datos[campos[index]]));
                }

            });
        },
        getRegistersInfo: function(filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue) {
            regs = objeto.getRegisters(filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue);
            return "<p><small>Mostrando una consulta de " + regs + " registros.</small></p>";
        },
        getOrderInfo: function(order, ordervalue) {
            if (order) {
                strOrder = "<p><small>Contenido ordenado por " + order + " (" + ordervalue + ') <a href="#" id="linkQuitarOrden">(Quitar orden)</a></small></p>';
            } else {
                strOrder = "<p>Contenido no ordenado</p>";
            }
            return strOrder;
        },
        getFilterInfo: function(filter, filteroperator, filtervalue) {
            if (filter) {
                strFilter = "<p><small>Contenido filtrado (" + filter + " " + filteroperator + " " + filtervalue + ') <a href="#" id="linkQuitarFiltro">(Quitar filtro)</small></a></p>';
            } else {
                strFilter = "<p>Contenido no filtrado</p>";
            }
            return strFilter;
        },
        getUrlFromParamsWithoutOrder: function(pag, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue) {
            var url = '';
            if (pag)
                url += "page=" + pag;
            if (rpp)
                url += "&rpp=" + rpp;
            if (filter)
                url += "&filter=" + filter;
            if (filteroperator)
                url += "&filteroperator=" + filteroperator;
            if (filtervalue)
                url += "&filtervalue=" + filtervalue;
            if (systemfilter)
                url += "&systemfilter=" + systemfilter;
            if (systemfilteroperator)
                url += "&systemfilteroperator=" + systemfilteroperator;
            if (systemfiltervalue)
                url += "&systemfiltervalue=" + systemfiltervalue;
            return url;
        },
        getUrlFromParamsWithoutPage: function(pag, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue) {
            var url = '';
            if (rpp)
                url += "rpp=" + rpp;
            if (order)
                url += "&order=" + order;
            if (ordervalue)
                url += "&ordervalue=" + ordervalue;            
            if (filter)
                url += "&filter=" + filter;
            if (filteroperator)
                url += "&filteroperator=" + filteroperator;
            if (filtervalue)
                url += "&filtervalue=" + filtervalue;
            if (systemfilter)
                url += "&systemfilter=" + systemfilter;
            if (systemfilteroperator)
                url += "&systemfilteroperator=" + systemfilteroperator;
            if (systemfiltervalue)
                url += "&systemfiltervalue=" + systemfiltervalue;
            return url;
        },
        getUrlFromParamsWithoutFilter: function(pag, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue) {
            var url = '';
            if (pag)
                url += "page=" + pag;
            if (rpp)
                url += "&rpp=" + rpp;
            if (order)
                url += "&order=" + order;
            if (ordervalue)
                url += "&ordervalue=" + ordervalue;           
            if (systemfilter)
                url += "&systemfilter=" + systemfilter;
            if (systemfilteroperator)
                url += "&systemfilteroperator=" + systemfilteroperator;
            if (systemfiltervalue)
                url += "&systemfiltervalue=" + systemfiltervalue;
            return url;
        },
        getUrlFromParamsWithoutRpp: function(pag, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue) {
            var url = '';
            if (pag)
                url += "page=" + pag;
            if (order)
                url += "&order=" + order;
            if (ordervalue)
                url += "&ordervalue=" + ordervalue;
            if (filter)
                url += "&filter=" + filter;
            if (filteroperator)
                url += "&filteroperator=" + filteroperator;
            if (filtervalue)
                url += "&filtervalue=" + filtervalue;
            if (systemfilter)
                url += "&systemfilter=" + systemfilter;
            if (systemfilteroperator)
                url += "&systemfilteroperator=" + systemfilteroperator;
            if (systemfiltervalue)
                url += "&systemfiltervalue=" + systemfiltervalue;
            return url;
        },
        getRppLinks: function(pag, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue, botonera) {
            var UrlFromParamsWithoutRpp = this.getUrlFromParamsWithoutRpp(pag, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue);
            var botonera = '<div id="pagination"><ul class="pagination">';
            if (rpp == 5)
                botonera += '<li class="active">';
            else
                botonera += '<li>';
            botonera += '<a class="pagination_link" id="1" href="jsp#/' + objeto.getName() + '/list/' + UrlFromParamsWithoutRpp + '&rpp=5">5</a></li>';
            if (rpp == 10)
                botonera += '<li class="active">';
            else
                botonera += '<li>';
            botonera += '<a class="pagination_link" id="2" href="jsp#/' + objeto.getName() + '/list/' + UrlFromParamsWithoutRpp + '&rpp=10">10</a></li>';
            if (rpp == 20)
                botonera += '<li class="active">';
            else
                botonera += '<li>';
            botonera += '<a class="pagination_link" id="3" href="jsp#/' + objeto.getName() + '/list/' + UrlFromParamsWithoutRpp + '&rpp=20">20</a></li>';
            if (rpp == 50)
                botonera += '<li class="active">';
            else
                botonera += '<li>';
            botonera += '<a class="pagination_link" id="4" href="jsp#/' + objeto.getName() + '/list/' + UrlFromParamsWithoutRpp + '&rpp=50">50</a></li>';
            /* 
             if (rpp == 100)
             botonera += '<li class="active">';
             else
             botonera += '<li>';
             botonera += '<a class="pagination_link" id="4" href="jsp#/' + objeto.getName() + '/list/' + UrlFromParamsWithoutRpp + '&rpp=100">100</a></li>';
             */
            botonera += '</ul></div>';
            return botonera;
        },
        getPageTable: function(pag, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue, botonera) {
            var tabla = '';
            UrlFromParamsWithoutOrder = this.getUrlFromParamsWithoutOrder(pag, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue);
            tabla += "<table class=\"table table-responsive table-hover table-striped table-condensed\">";
            var visibleFields = 5;
            var numField = 0; //visible field counter
            if (objeto.getPrettyFieldNamesAcciones() !== null) {
                tabla += '<tr>';
                $.each(objeto.getPrettyFieldNamesAcciones(), function(index, value) {
                    numField++; //field counter
                    if (numField <= visibleFields) {
                        if (value === "acciones") {
                            tabla += '<th class="col-md-2">' + value;
                            tabla += '</th>';
                        } else {
                            if (value === "id") {
                                tabla += '<th class="col-md-1">' + value;
                            } else {
                                tabla += '<th>' + value;
                            }
                            tabla += '<br />';
                            tabla += '<a class="orderAsc' + index + '" href="jsp#/' + objeto.getName() + '/list/' + UrlFromParamsWithoutOrder + '&order=' + value + '&ordervalue=asc"><i class="glyphicon glyphicon-arrow-up"></i></a>';
                            tabla += '<a class="orderDesc' + index + '" href="jsp#/' + objeto.getName() + '/list/' + UrlFromParamsWithoutOrder + '&order=' + value + '&ordervalue=desc"><i class="glyphicon glyphicon-arrow-down"></i></a>';
                            tabla += '</th>';
                        }
                    }
                    if (numField == visibleFields + 1) {
                        tabla += '<th class="col-md-2">acciones</th>';
                    }

                });
                tabla += '</tr>';
            }

            page = objeto.getPage(pag, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue)['list'];
            if (page != 0) {
                $.each(page, function(index, value) {
                    tabla += '<tr>';
                    numField = 0;
                    $.each(objeto.getFieldNames(), function(index, valor) {
                        if ("id" == valor) {
                            id = value[valor];
                        }
                        numField++;
                        if (numField <= visibleFields) {
                            if (/id_/.test(valor)) {
                                $.when(ajaxCallSync(objeto.getPath() + '/json?ob=' + valor.split("_")[1].replace(/[0-9]*$/, "") + '&op=get&id=' + value[valor], 'GET', '')).done(function(data) {
                                    contador = 0;
                                    add_tabla = "";
                                    for (key in data) {
                                        if (contador == 0)
                                            add_tabla = '<td>id=' + data[key] + '(no existe)</td>';
                                        if (contador == 1)
                                            add_tabla = '<td>' + data[key] + '</td>';
                                        contador++;
                                    }
                                    if (contador == 0) {
                                        add_tabla = '<td>' + value[valor] + ' #error</td>';
                                    }
                                    tabla += add_tabla;
                                });
                            } else {
                                switch (value[valor]) {
                                    case true:
                                        tabla += '<td><i class="glyphicon glyphicon-ok"></i></td>';
                                        break;
                                    case false:
                                        tabla += '<td><i class="glyphicon glyphicon-remove"></i></td>';
                                        break;
                                    default:
                                        var fieldContent = decodeURIComponent(value[valor]);
                                        if (typeof fieldContent == "string") {

                                            if (value[valor].length > 50) //don't show too long fields
                                                fieldContent = decodeURIComponent(value[valor]).substr(0, 20) + " ...";

                                        }
                                        tabla += '<td>' + fieldContent + '</td>';
                                }
                            }
                        }
                    });
                    tabla += '<td><div class="btn-toolbar" role="toolbar"><div class="btn-group btn-group-xs">';
                    tabla += '<a class="btn btn-default" href="jsp#/' + objeto.getName() + '/view/' + id + '"><i class="glyphicon glyphicon-eye-open"></i></a>';
                    tabla += '<a class="btn btn-default" href="jsp#/' + objeto.getName() + '/edit/' + id + '"><i class="glyphicon glyphicon-pencil"></i></a>';
                    tabla += '<a class="btn btn-default" href="jsp#/' + objeto.getName() + '/remove/' + id + '"><i class="glyphicon glyphicon-remove"></i></a>';
                    tabla += '</div></div></td>';
                    tabla += '</tr>';
                });
                tabla += "</table>";
            } else {
                tabla = "<div class=\"alert alert-info\"><h4>Ha habido un problema con la base de datos</h4><br/>El probema puede ser:<ul><li>La tabla está vacia.</li><li>Tu busqueda no tubo resultados.</li></ul></div>";
            }

            return tabla;
        }
//        getPageTable: function(pag, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue, botonera) {
//            urlWithoutOrder = this.getUrlFromParamsWithoutOrder(pag,rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue, botonera);
//            var tabla = "<table class=\"table table-responsive table-hover table-striped table-condensed\">";
//            var visibleFields = 5;
//            var numField = 0; //visible field counter
//            if (objeto.getPrettyFieldNamesAcciones() !== null) {
//                tabla += '<tr>';
//                $.each(objeto.getPrettyFieldNamesAcciones(), function(index, value) {
//                    numField++; //field counter
//                    if (numField <= visibleFields) {
//                        if (value === "acciones") {
//                            tabla += '<th class="col-md-2">' + value;
//                            tabla += '</th>';
//                        } else {
//                            if (value === "id") {
//                                tabla += '<th class="col-md-1">' + value;
//                                tabla += '<br /><a class="orderAsc' + index + '" href="jsp#/' + this.getName() + '/list/' + url + '&order=id&ordervalue=asc"><i class="glyphicon glyphicon-arrow-up"></i></a>';
//                                tabla += '<a class="orderDesc' + index + '" href="#"><i class="glyphicon glyphicon-arrow-down"></i></a>';
//                                tabla += '</th>';
//                            } else {
//                                tabla += '<th>' + value;
//                                tabla += '<br /><a class="orderAsc' + index + '" href="#"><i class="glyphicon glyphicon-arrow-up"></i></a>';
//                                tabla += '<a class="orderDesc' + index + '" href="#"><i class="glyphicon glyphicon-arrow-down"></i></a>';
//                                tabla += '</th>';
//                            }
//                        }
//                    }
//                    if (numField == visibleFields + 1) {
//                        tabla += '<th class="col-md-2">acciones</th>';
//                    }
//
//                });
//                tabla += '</tr>';
//            }
//
//            page = objeto.getPage(pag, order, ordervalue, rpp, filter, filteroperator, filtervalue, systemfilter, systemfilteroperator, systemfiltervalue)['list'];
//            if (page != 0) {
//                $.each(page, function(index, value) {
//                    tabla += '<tr>';
//                    numField = 0;
//                    $.each(objeto.getFieldNames(), function(index, valor) {
//                        if ("id" == valor) {
//                            id = valor;
//                        }
//                        numField++;
//                        if (numField <= visibleFields) {
//                            if (/id_/.test(valor)) {
//                                $.when(ajaxCallSync(objeto.getPath() + '/json?ob=' + valor.split("_")[1].replace(/[0-9]*$/, "") + '&op=get&id=' + value[valor], 'GET', '')).done(function(data) {
//                                    contador = 0;
//                                    add_tabla = "";
//                                    for (key in data) {
//                                        if (contador == 0)
//                                            add_tabla = '<td>id=' + data[key] + '(no existe)</td>';
//                                        if (contador == 1)
//                                            add_tabla = '<td>' + data[key] + '</td>';
//                                        contador++;
//                                    }
//                                    if (contador == 0) {
//                                        add_tabla = '<td>' + value[valor] + ' #error</td>';
//                                    }
//                                    tabla += add_tabla;
//                                });
//                            } else {
//                                switch (value[valor]) {
//                                    case true:
//                                        tabla += '<td><i class="glyphicon glyphicon-ok"></i></td>';
//                                        break;
//                                    case false:
//                                        tabla += '<td><i class="glyphicon glyphicon-remove"></i></td>';
//                                        break;
//                                    default:
//                                        var fieldContent = decodeURIComponent(value[valor]);
//                                        if (typeof fieldContent == "string") {
//
//                                            if (value[valor].length > 50) //don't show too long fields
//                                                fieldContent = decodeURIComponent(value[valor]).substr(0, 20) + " ...";
//
//                                        }
//                                        tabla += '<td>' + fieldContent + '</td>';
//                                }
//                            }
//                        }
//                    });
//
//                    tabla += '<td><div class="btn-toolbar" role="toolbar"><div class="btn-group btn-group-xs">';
//                    if (callback) {
//
//                    } else {
//                        tabla += '<a class="btn btn-default" href="jsp#/' + vista.getName() + '/view/' + id + '"><i class="glyphicon glyphicon-eye-open"></i> ' + valor.text + '</a>';
//                        tabla += '<a class="btn btn-default" href="jsp#/' + vista.getName() + '/edit/' + id + '"><i class="glyphicon glyphicon-pencil"></i> ' + valor.text + '</a>';
//                        tabla += '<a class="btn btn-default" href="jsp#/' + vista.getName() + '/remove/' + id + '"><i class="glyphicon glyphicon-remove"></i> ' + valor.text + '</a>';
//                    }
//                    tabla += '</div></div></td>';
//                    tabla += '</tr>';
//                });
//                tabla += "</table>";
//            } else {
//                tabla = "<div class=\"alert alert-info\"><h4>Ha habido un problema con la base de datos</h4><br/>El probema puede ser:<ul><li>La tabla está vacia.</li><li>Tu busqueda no tubo resultados.</li></ul></div>";
//            }
//
//            return tabla;
//
//        }
    };

};



