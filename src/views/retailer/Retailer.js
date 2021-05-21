import React, { Component } from 'react';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label } from 'reactstrap';

import { Link } from 'react-router-dom';
import usersData from '../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['name','registered', 'role', 'status']

class Manufacturer extends Component
{
    constructor(props) {
        super(props);
    }

  render()
  {
    return (
      <div>
        <CRow>
          <CCol xs="12" lg="6">
            <CCard>
              <CCardHeader>
                Assets
              </CCardHeader>
              <CCardBody>
              <CDataTable
                items={usersData}
                fields={fields}
                striped
                itemsPerPage={5}
                pagination
                scopedSlots = {{
                  'status':
                    (item)=>(
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    )
  
                }}
              />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        
      </div>
       
    )
  }
}



export default Manufacturer
