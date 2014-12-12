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


function fProveedorRoutes() {

//    Path.map("#/proveedor").to(function () {
//        $('#indexContenidoJsp').spinner();
//        control('proveedor').list($('#indexContenido'), param().defaultizeUrlObjectParameters({}), null);
//        //proveedorControl.modalListEventsLoading(proveedorObject, proveedorView, $('#indexContenido'), param().defaultizeUrlObjectParameters({}), null);        
//        $('#indexContenidoJsp').empty();
//        return false;
//    });

    Path.map("#/proveedor").to(function () {
        $('#indexContenidoJsp').spinner();
        oProveedorControl.listCuadros($('#indexContenido'), param().defaultizeUrlObjectParameters({}), null, oProveedorModel, oProveedorView);
        //proveedorControl.modalListEventsLoading(proveedorObject, proveedorView, $('#indexContenido'), param().defaultizeUrlObjectParameters({}), null);        
        $('#indexContenidoJsp').empty();
        $('#indexContenidoJsp').append(oProveedorControl.getClassNameProveedor());
        return false;
    });

    Path.map("#/proveedor/list/:url").to(function () {
        $('#indexContenidoJsp').spinner();
        var paramsObject = param().defaultizeUrlObjectParameters(param().getUrlObjectFromUrlString(this.params['url']));
        oProveedorControl.listCuadros($('#indexContenido'), paramsObject, null, oProveedorModel, oProveedorView);
        $('#indexContenidoJsp').empty();
        return false;
    });

    Path.map("#/proveedor/view/:id").to(function () {
        $('#indexContenidoJsp').spinner();
        var paramsObject = param().defaultizeUrlObjectParameters(param().getUrlObjectFromUrlString(this.params['url']));
        oProveedorControl.view($('#indexContenido'), paramsObject['id'], oProveedorModel, oProveedorView);
        $('#indexContenidoJsp').empty();

        return false;
    });

    Path.map("#/proveedor/edit/:id").to(function () {
        $('#indexContenidoJsp').spinner();
        var paramsObject = param().defaultizeUrlObjectParameters(param().getUrlObjectFromUrlString(this.params['url']));
        oProveedorControl.edit($('#indexContenido'), paramsObject['id'], oProveedorModel, oProveedorView);
        $('#indexContenidoJsp').empty();
    });
    Path.map("#/proveedor/new").to(function () {
        $('#indexContenidoJsp').spinner();
        //var paramsObject = param().defaultizeUrlObjectParameters(param().getUrlObjectFromUrlString(this.params['url']));
        oProveedorControl.new($('#indexContenido'), null, oProveedorModel, oProveedorView);
        $('#indexContenidoJsp').empty();
        return false;
    });
    Path.map("#/proveedor/new/:url").to(function () {
        $('#indexContenidoJsp').spinner();
        var paramsObject = param().defaultizeUrlObjectParameters(param().getUrlObjectFromUrlString(this.params['url']));
        oProveedorControl.new($('#indexContenido'), paramsObject, oProveedorModel, oProveedorView);
        $('#indexContenidoJsp').empty();
        return false;
    });

    Path.map("#/proveedor/remove/:id").to(function () {
        $('#indexContenidoJsp').spinner();
        var paramsObject = param().defaultizeUrlObjectParameters(param().getUrlObjectFromUrlString(this.params['url']));
        oProveedorControl.remove($('#indexContenido'), paramsObject['id'], oProveedorModel, oProveedorView);
        $('#indexContenidoJsp').empty();
        return false;
    });

    Path.map("#/proveedor/duplicate/:id").to(function () {
        $('#indexContenidoJsp').spinner();
        var paramsObject = param().defaultizeUrlObjectParameters(param().getUrlObjectFromUrlString(this.params['url']));
        oProveedorControl.duplicate($('#indexContenido'), paramsObject['id'], oProveedorModel, oProveedorView);
        $('#indexContenidoJsp').empty();
        return false;
    });
}