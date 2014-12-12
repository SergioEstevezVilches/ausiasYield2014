/*
 * Copyright (C) July 2014 Rafael Aznar
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
package net.daw.dao.specific.implementation;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import net.daw.bean.generic.specific.implementation.ProveedorBeanGenSpImpl;
import net.daw.bean.generic.specific.implementation.TipoproductoBeanGenSpImpl;
import net.daw.dao.publicinterface.MetaDaoInterface;
import net.daw.dao.publicinterface.TableDaoInterface;
import net.daw.dao.publicinterface.ViewDaoInterface;
import net.daw.data.specific.implementation.MysqlDataSpImpl;
import net.daw.helper.AppConfigurationHelper;
import net.daw.helper.ExceptionBooster;
import net.daw.helper.FilterBeanHelper;

public class ProveedorDaoSpcImpl implements ViewDaoInterface<ProveedorBeanGenSpImpl>, TableDaoInterface<ProveedorBeanGenSpImpl>, MetaDaoInterface {

    private String strTableName = null;
    private MysqlDataSpImpl oMysql = null;
    private Connection oConnection = null;

    public ProveedorDaoSpcImpl(String ob, Connection oConexion) throws Exception {
        try {
            strTableName = ob;
            oConnection = oConexion;
            oMysql = new MysqlDataSpImpl(oConnection);
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":constructor ERROR: " + ex.getMessage()));
        }
    }

    @Override
    public int getPages(int intRegsPerPag, ArrayList<FilterBeanHelper> hmFilter) throws Exception {
        int pages = 0;
        try {
            pages = oMysql.getPages(strTableName, intRegsPerPag, hmFilter);
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getPages ERROR: " + ex.getMessage()));
        }
        return pages;
    }

    @Override
    public int getCount(ArrayList<FilterBeanHelper> hmFilter) throws Exception {
        int pages = 0;
        try {
            pages = oMysql.getCount(strTableName, hmFilter);
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getCount ERROR: " + ex.getMessage()));
        }
        return pages;
    }

    @Override
    public ArrayList<ProveedorBeanGenSpImpl> getPage(int intRegsPerPag, int intPage, ArrayList<FilterBeanHelper> hmFilter, HashMap<String, String> hmOrder) throws Exception {
        ArrayList<Integer> arrId;
        ArrayList<ProveedorBeanGenSpImpl> arrProveedor = new ArrayList<>();
        try {
            arrId = oMysql.getPage(strTableName, intRegsPerPag, intPage, hmFilter, hmOrder);
            Iterator<Integer> iterador = arrId.listIterator();
            while (iterador.hasNext()) {
                ProveedorBeanGenSpImpl oProveedorBean = new ProveedorBeanGenSpImpl(iterador.next());
                arrProveedor.add(this.get(oProveedorBean, AppConfigurationHelper.getJsonDepth()));
            }
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getPage ERROR: " + ex.getMessage()));
        }
        return arrProveedor;
    }

    @Override
    public ProveedorBeanGenSpImpl get(ProveedorBeanGenSpImpl oProveedorBean, Integer expand) throws Exception {
        if (oProveedorBean.getId() > 0) {
            try {
                if (!oMysql.existsOne(strTableName, oProveedorBean.getId())) {
                    oProveedorBean.setId(0);
                } else {
                    oProveedorBean.setNia(oMysql.getOne(strTableName, "nia", oProveedorBean.getId()));
                    oProveedorBean.setNombre(oMysql.getOne(strTableName, "nombre", oProveedorBean.getId()));
                    oProveedorBean.setTelefono(oMysql.getOne(strTableName, "telefono", oProveedorBean.getId()));
                    oProveedorBean.setDireccion(oMysql.getOne(strTableName, "direccion", oProveedorBean.getId()));
                    oProveedorBean.setEmail(oMysql.getOne(strTableName, "email", oProveedorBean.getId()));
                    oProveedorBean.setWeb(oMysql.getOne(strTableName, "web", oProveedorBean.getId()));
                    oProveedorBean.setFax(oMysql.getOne(strTableName, "fax", oProveedorBean.getId()));
                    oProveedorBean.setLocalidad(oMysql.getOne(strTableName, "localidad", oProveedorBean.getId()));
                    oProveedorBean.setPath(oMysql.getOne(strTableName, "path", oProveedorBean.getId()));
                }
            } catch (Exception ex) {
                ExceptionBooster.boost(new Exception(this.getClass().getName() + ":get ERROR: " + ex.getMessage()));
            }
        } else {
            oProveedorBean.setId(0);
        }
        return oProveedorBean;
    }

    @Override
    public ProveedorBeanGenSpImpl set(ProveedorBeanGenSpImpl oProveedorBean) throws Exception {
        try {
            if (oProveedorBean.getId() == 0) {
                oProveedorBean.setId(oMysql.insertOne(strTableName));
            }
            oMysql.updateOne(oProveedorBean.getId(), strTableName, "nia", oProveedorBean.getNia());
            oMysql.updateOne(oProveedorBean.getId(), strTableName, "nombre", oProveedorBean.getNombre());
            oMysql.updateOne(oProveedorBean.getId(), strTableName, "telefono", oProveedorBean.getTelefono());
            oMysql.updateOne(oProveedorBean.getId(), strTableName, "direccion", oProveedorBean.getDireccion());
            oMysql.updateOne(oProveedorBean.getId(), strTableName, "email", oProveedorBean.getEmail());
            oMysql.updateOne(oProveedorBean.getId(), strTableName, "web", oProveedorBean.getWeb());
            oMysql.updateOne(oProveedorBean.getId(), strTableName, "fax", oProveedorBean.getFax());
            oMysql.updateOne(oProveedorBean.getId(), strTableName, "localidad", oProveedorBean.getLocalidad());
            oMysql.updateOne(oProveedorBean.getId(), strTableName, "path", oProveedorBean.getPath());
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":set ERROR: " + ex.getMessage()));
        }
        return oProveedorBean;
    }

    @Override
    public int remove(ProveedorBeanGenSpImpl oProveedorBean) throws Exception {
        int result = 0;
        try {
            result = oMysql.removeOne(oProveedorBean.getId(), strTableName);
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":remove ERROR: " + ex.getMessage()));
        }
        return result;
    }

    @Override
    public ArrayList<String> getColumnsNames() throws Exception {
        ArrayList<String> alColumns = null;
        try {
            alColumns = oMysql.getColumnsName(strTableName);
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getColumnsNames ERROR: " + ex.getMessage()));
        }
        return alColumns;
    }

    @Override
    public ArrayList<String> getPrettyColumnsNames() throws Exception {
        ArrayList<String> alColumns = null;
        try {
            alColumns = oMysql.getPrettyColumns(strTableName);
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getPrettyColumnsNames ERROR: " + ex.getMessage()));
        }
        return alColumns;
    }

    @Override
    public int updateOne(int intId, String strTabla, String strCampo, String strValor) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
