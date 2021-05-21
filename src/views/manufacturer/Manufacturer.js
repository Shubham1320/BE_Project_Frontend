import React, { Component } from 'react';
import axios from "axios";
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable,CRow,
	CProgress,CTabContent,CTabPane,CTabs,CNav,CNavItem,CNavLink,
	CForm,CInput} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react'

import CreateAsset from "../createAssetView.js";
import QueryAsset from "../queryAssetView.js";
import PutForSale from "../putForSaleView.js";

const usersData=[];

class Manufacturer extends Component
{

  constructor(props) {
    super(props);
        
        this.toggleModal = this.toggleModal.bind(this);
        this.getAllAssets = this.getAllAssets.bind(this);
        this.state = {
          isModalOpen: false,
          assets:[],
          channelName: "mychannel",
          chaincodeName: "basic",
          organization: "manufacturer",
          orgUserId: "manufacturerUser1",
          msp: "ManufacturerMSP"
        };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  
  componentDidMount() {
  	this.getAllAssets();
  }

  getAllAssets() {
  	axios.post(
    	"http://localhost:3001/v1/get-all-assets", {
        
        channelName: "mychannel",
        chaincodeName:"basic",
        organization:"manufacturer",
        orgUserId:"manufacturerUser1"

    }).then((response) => {

        this.setState({
          assets: response.data.result,
        });
    
    }).catch((error) => console.log(error));
  }

  render()
  {
    return (
      
    	<div>
        	<CRow>
        		<CCol xs="12" lg="12">
            		<CCard>
            			<CCardHeader>
                			Assets
            			</CCardHeader>
              			
              			<CCardBody>
              			
              				<CDataTable
				                items={this.state.assets}
				                striped
				                tableFilter
				                itemsPerPage={5}
				                pagination
				                sorter
				                hover
              				/>

              			</CCardBody>
            		</CCard>
          		</CCol>
        	</CRow>
        
	        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
	        	<ModalHeader toggle={this.toggleModal}>
	        		Create Asset
	        	</ModalHeader>
	        	<ModalBody>
	          		<Form onSubmit={this.handleLogin}>
	            		
	            		<FormGroup>
	                		<Label htmlFor="asset-name">Asset name</Label>
	                		<Input type="text" id="asset_name" name="asset_name"
	                    		innerRef={(input) => this.asset_name = input} />
	            		</FormGroup>
	            
	            		<FormGroup>
	                		<Label htmlFor="asset-description">Asset Description</Label>
	                		<Input type="text" id="asset_description" name="asset_description"
	                    		innerRef={(input) => this.asset_description = input}  />
	            		</FormGroup>
	            
	            		<FormGroup>
	                		<Label htmlFor="asset-size">Asset Size</Label>
	                		<Input type="number" id="asset_size" name="asset_size"
	                    		innerRef={(input) => this.asset_size = input}  />
	            		</FormGroup>
	            
	            		<FormGroup>
	                		<Label htmlFor="manufacturing-date">Manufacturing Date</Label>
	                		<Input type="date" id="manufacturing_date" name="manufacturing_date"
	                    		innerRef={(input) => this.manufacturing_date = input}  />
	                		<Label htmlFor="expiry-date">Expiry Date</Label>
	                		<Input type="date" id="expiry_date" name="expiry_date"
	                    		innerRef={(input) => this.expiry_date = input}  />
	            		</FormGroup>

	            		<Button type="submit" value="submit" color="primary">Submit</Button>
	          		</Form>
	        	</ModalBody>
	        </Modal>
	        
	        <CRow>
        		<CCol xs="12" lg="12">
            		<CCard style={{"background-color":"white"}}>
            			<CCardBody>	
					        <CTabs activeTab="create-asset">
				      			
				      			<CNav variant="tabs" >
				        			
				        			<CNavItem>
				          				<CNavLink data-tab="create-asset">
				            				Create Asset
				          				</CNavLink>
				        			</CNavItem>

				        			<CNavItem>
				          				<CNavLink data-tab="query-asset">
				            				Query Asset
				          				</CNavLink>
				        			</CNavItem>

				        			<CNavItem>
				          				<CNavLink data-tab="put-for-sale">
				            				Put For Sale
				          				</CNavLink>
				        			</CNavItem>

				        		</CNav>

      							<CTabContent >

        							<CTabPane data-tab="create-asset" >
        								<CreateAsset
        									channelName={this.state.channelName}
        									chaincodeName={this.state.chaincodeName}
        									organization={this.state.organization}
          									orgUserId={this.state.orgUserId}
          									msp={this.state.msp}
          									getAllAssets={this.getAllAssets}
        								/>
        							</CTabPane>

        							<CTabPane data-tab="query-asset">
          								<QueryAsset
          									channelName={this.state.channelName}
        									chaincodeName={this.state.chaincodeName}
        									organization={this.state.organization}
          									orgUserId={this.state.orgUserId}
          								/>
        							</CTabPane>

        							<CTabPane data-tab="put-for-sale">
          								<PutForSale
          									channelName={this.state.channelName}
        									chaincodeName={this.state.chaincodeName}
        									organization={this.state.organization}
          									orgUserId={this.state.orgUserId}
          									msp={this.state.msp}
          									getAllAssets={this.getAllAssets}
          								/>
        							</CTabPane>



        						</CTabContent>	
        
      						</CTabs>
      					</CCardBody>
      				</CCard>
      			</CCol>
      		</CRow>	


    	</div>
       
    )
  }
}



export default Manufacturer
