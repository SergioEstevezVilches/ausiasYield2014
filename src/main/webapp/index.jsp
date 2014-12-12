<%-- 
 Copyright (C) July 2014 Rafael Aznar

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
--%>


<%@page import="net.daw.helper.EstadoHelper"%>
<%@page import="net.daw.bean.generic.specific.implementation.UsuarioBeanGenSpImpl"%>
<%@page import="net.daw.helper.AppInformationHelper"%>
<%UsuarioBeanGenSpImpl user = (UsuarioBeanGenSpImpl) request.getSession().getAttribute("usuarioBean");%>

<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
    <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Ajax Yield</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/main.css">

        <!-- <link rel="stylesheet" href="css/jquery-ui.css"> -->
        <link rel="stylesheet" href="css/animate.css">
        <link rel="stylesheet" href="css/bootstrapValidator.min.css">
        <link rel="stylesheet" href="css/bootstrap-datetimepicker.min.css"  />
        <link rel="stylesheet" href="css/producto.css">
    </head>
    <body>
        <!--[if lt IE 7]>
        <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation" id="menuSuperior">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="jsp"><%=AppInformationHelper.getAppName()%></a>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <%if (user != null) {%>
                    <jsp:include page="jsp/menuSuperior.jsp" /> 
                    <% }%>
                    <ul class="nav navbar-nav navbar-right">
                        <jsp:include page="jsp/usuario/infologin.jsp" />
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container -->
        </nav>

        <% if (user != null) {%>

        <div class="container">
            <div class="row">
                <div class="col-md-2" id="menuLateral">
                    <jsp:include page="jsp/menuLateral.jsp" />
                </div>
                <div class="col-md-10">
                    <div id="indexContenido"></div>
                    <div id="indexContenidoJsp">
                        <jsp:include page='<%=(String) request.getAttribute("contenido")%>' />                
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col-md-12" id="contenidoParseado"></div>   
            </div>
            <div class="row">
                <div class="col-md-12"><hr><footer><p>&copy; <%=EstadoHelper.getAutor()%>: <%=EstadoHelper.getMailAutor()%> (<%=EstadoHelper.getAnyo()%>) - <%=EstadoHelper.getLicenciaLink()%></p></footer></div> 
            </div>
        </div>            

        <% } else {%>

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div id="indexContenidoJsp">
                        <jsp:include page='<%=(String) request.getAttribute("contenido")%>' />                
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12" id="contenidoParseado"></div>   
            </div>
            <div class="row">
                <div class="col-md-12"><hr><footer><p>&copy; <%=EstadoHelper.getAutor()%>: <%=EstadoHelper.getMailAutor()%> (<%=EstadoHelper.getAnyo()%>) - <%=EstadoHelper.getLicenciaLink()%></p></footer></div>   
            </div>
        </div>  


        <% }%>

        <!-- carga de javascript   -->

        <script type="text/javascript"  src="./js/vendor/jquery-1.11.1.min.js"></script>
        <script type="text/javascript"  src="./js/vendor/bootstrap.min.js"></script>
        <script type="text/javascript"  src="./js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>

        <script type="text/javascript"  src="./js/vendor/moment.js"></script>
        <script type="text/javascript"  src="./js/vendor/moment.locale.es.js"></script>
        <script type="text/javascript"  src="./js/vendor/bootstrap-datetimepicker.min.js"></script>

        <script type="text/javascript"  src="./js/vendor/path.min.js"></script> 
        <script type="text/javascript"  src="./js/vendor/bootstrapValidator.min.js"></script>
        <script type="text/javascript"  src="./js/vendor/language/es_ES.js"></script>
        <script type="text/javascript"  src="./js/vendor/creole-parser.js"></script>

        <!--
        <script type="text/javascript"  src="./js/vendor/jquery-ui.js"></script>
        <script src="./js/vendor/jquery.validate.min.js"></script>
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
        <script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
        -->


        <script src="js/generic/view.js" charset="UTF-8"></script>    
        <script src="js/generic/param.js" charset="UTF-8"></script>
        <script src="js/generic/ajax.js" charset="UTF-8"></script>
        <script src="js/generic/util.js" charset="UTF-8"></script>
        <script src="js/generic/model.js" charset="UTF-8"></script>        
        <script src="js/generic/control.js" charset="UTF-8"></script> 
        <script src="js/generic/initialization.js" charset="UTF-8"></script>

        <script type="text/javascript">
            var path = '<%=request.getContextPath()%>';
        </script>

        <script src="js/specific/documento/control.js" charset="UTF-8"></script>
        <script src="js/specific/documento/model.js" charset="UTF-8"></script>
        <script src="js/specific/documento/view.js" charset="UTF-8"></script>
        <script src="js/specific/documento/routes.js" charset="UTF-8"></script>

        <script src="js/specific/opcion/control.js" charset="UTF-8"></script>
        <script src="js/specific/opcion/model.js" charset="UTF-8"></script>
        <script src="js/specific/opcion/view.js" charset="UTF-8"></script>
        <script src="js/specific/opcion/routes.js" charset="UTF-8"></script>

        <script src="js/specific/publicacion/control.js" charset="UTF-8"></script>
        <script src="js/specific/publicacion/model.js" charset="UTF-8"></script>
        <script src="js/specific/publicacion/view.js" charset="UTF-8"></script>
        <script src="js/specific/publicacion/routes.js" charset="UTF-8"></script>

        <script src="js/specific/estado/control.js" charset="UTF-8"></script>
        <script src="js/specific/estado/model.js" charset="UTF-8"></script>
        <script src="js/specific/estado/view.js" charset="UTF-8"></script>
        <script src="js/specific/estado/routes.js" charset="UTF-8"></script>
        <script src="js/specific/cuestionario/control.js" charset="UTF-8"></script>
        <script src="js/specific/cuestionario/model.js" charset="UTF-8"></script>
        <script src="js/specific/cuestionario/view.js" charset="UTF-8"></script>
        <script src="js/specific/cuestionario/routes.js" charset="UTF-8"></script>
        <script src="js/specific/actividad/control.js" charset="UTF-8"></script>
        <script src="js/specific/actividad/model.js" charset="UTF-8"></script>
        <script src="js/specific/actividad/view.js" charset="UTF-8"></script>
        <script src="js/specific/actividad/routes.js" charset="UTF-8"></script>


        <script src="js/specific/usuario/control.js" charset="UTF-8"></script>
        <script src="js/specific/usuario/model.js" charset="UTF-8"></script>
        <script src="js/specific/usuario/view.js" charset="UTF-8"></script>
        <script src="js/specific/usuario/routes.js" charset="UTF-8"></script>

        <script src="js/specific/tipodocumento/model.js" charset="UTF-8"></script>

        <script src="js/specific/pregunta/control.js" charset="UTF-8"></script>
        <script src="js/specific/pregunta/model.js" charset="UTF-8"></script>
        <script src="js/specific/pregunta/view.js" charset="UTF-8"></script>
        <script src="js/specific/pregunta/routes.js" charset="UTF-8"></script>

        <script src="js/specific/publicacion/control.js" charset="UTF-8"></script>
        <script src="js/specific/publicacion/model.js" charset="UTF-8"></script>
        <script src="js/specific/publicacion/view.js" charset="UTF-8"></script>
        <script src="js/specific/publicacion/routes.js" charset="UTF-8"></script>

        <script src="js/specific/tipousuario/control.js" charset="UTF-8"></script>
        <script src="js/specific/tipousuario/model.js" charset="UTF-8"></script>
        <script src="js/specific/tipousuario/view.js" charset="UTF-8"></script>
        <script src="js/specific/tipousuario/routes.js" charset="UTF-8"></script>
        <!-- Fin Modificación Juanma Usuarios -->

        <!-- FORO -->        
        <script src="js/specific/tipotema/control.js" charset="UTF-8"></script>
        <script src="js/specific/tipotema/model.js" charset="UTF-8"></script>
        <script src="js/specific/tipotema/view.js" charset="UTF-8"></script>
        <script src="js/specific/tipotema/routes.js" charset="UTF-8"></script>

        <script src="js/specific/tema/control.js" charset="UTF-8"></script>
        <script src="js/specific/tema/model.js" charset="UTF-8"></script>
        <script src="js/specific/tema/view.js" charset="UTF-8"></script>
        <script src="js/specific/tema/routes.js" charset="UTF-8"></script>

        <script src="js/specific/post/control.js" charset="UTF-8"></script>
        <script src="js/specific/post/model.js" charset="UTF-8"></script>
        <script src="js/specific/post/view.js" charset="UTF-8"></script>
        <script src="js/specific/post/routes.js" charset="UTF-8"></script>

        <script src="js/specific/mensajeprivado/control.js" charset="UTF-8"></script>
        <script src="js/specific/mensajeprivado/model.js" charset="UTF-8"></script>
        <script src="js/specific/mensajeprivado/view.js" charset="UTF-8"></script>
        <script src="js/specific/mensajeprivado/routes.js" charset="UTF-8"></script>
        <!-- FIN FORO -->

        <script src="js/specific/proveedor/control.js" charset="UTF-8"></script>
        <script src="js/specific/proveedor/model.js" charset="UTF-8"></script>
        <script src="js/specific/proveedor/view.js" charset="UTF-8"></script>
        <script src="js/specific/proveedor/routes.js" charset="UTF-8"></script>


        <script src="js/specific/impuesto/control.js" charset="UTF-8"></script>
        <script src="js/specific/impuesto/model.js" charset="UTF-8"></script>
        <script src="js/specific/impuesto/view.js" charset="UTF-8"></script>
        <script src="js/specific/impuesto/routes.js" charset="UTF-8"></script>

        <script src="js/specific/pedido/control.js" charset="UTF-8"></script>
        <script src="js/specific/pedido/model.js" charset="UTF-8"></script>
        <script src="js/specific/pedido/view.js" charset="UTF-8"></script>
        <script src="js/specific/pedido/routes.js" charset="UTF-8"></script>

        <script src="js/specific/detalle_pedido/control.js" charset="UTF-8"></script>
        <script src="js/specific/detalle_pedido/model.js" charset="UTF-8"></script>
        <script src="js/specific/detalle_pedido/view.js" charset="UTF-8"></script>
        <script src="js/specific/detalle_pedido/routes.js" charset="UTF-8"></script>
        <script src="js/specific/respuesta/control.js" charset="UTF-8"></script>
        <script src="js/specific/respuesta/model.js" charset="UTF-8"></script>
        <script src="js/specific/respuesta/view.js" charset="UTF-8"></script>
        <script src="js/specific/respuesta/routes.js" charset="UTF-8"></script>

        <script src="js/specific/tipodocumento/model.js" charset="UTF-8"></script>

        <script type="text/javascript">

            //path = '<%=request.getContextPath()%>';

            $(document).ready(function () {

                //$('#indexContenidoJsp').addClass('animated slideInDown');
                //$('#menuSuperior').addClass('animated slideInLeft');
                //$('#menuLateral').addClass('animated slideInRight');

                inicializacion();


                fDocumentoRoutes();
                fOpcionRoutes();
                fPreguntaRoutes();
                fCuestionarioRoutes();

                fUsuarioRoutes();
                fPublicacionRoutes();
                fPostRoutes();
                fMensajeprivadoRoutes();
                fTemaRoutes();
                fTipotemaRoutes();
                fEstadoRoutes();
                fProveedorRoutes();
                fImpuestoRoutes();
                fActividadRoutes();
                fPedidoRoutes();
                fDetalle_pedidoRoutes();
                fRespuestaRoutes();


                Path.listen();

            });

        </script>
    </body>
</html>

