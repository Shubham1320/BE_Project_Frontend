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

import QueryAsset from "../queryAssetView.js";
import PutForSale from "../putForSaleView.js";
import OfferBid from "../offerBidView.js";
import QueryPrice from "../queryPriceView";
import TransferAsset from "../transferAssetView.js";



class Retailer extends Component
{

  constructor(props) {
    super(props);
        
        this.getAllAssets = this.getAllAssets.bind(this);
        this.state = {
          isModalOpen: false,
          assets:[],
          channelName: "mychannel",
          chaincodeName: "basic",
          organization: "retailer",
          orgUserId: "retailerUser1",
          msp: "RetailerMSP"
        };
  }
  
  componentDidMount() {
    this.getAllAssets();
  }

  getAllAssets() {
    axios.post(
      "http://localhost:3001/v1/get-all-assets", {
        
        channelName: this.state.channelName,
        chaincodeName:this.state.chaincodeName,
        organization:this.state.organization,
        orgUserId:this.state.orgUserId

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
          
          <CRow>
            <CCol xs="12" lg="12">
                <CCard style={{"background-color":"white"}}>
                  <CCardBody> 
                  <CTabs activeTab="query-asset">
                    
                    <CNav variant="tabs" >

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

                      <CNavItem>
                          <CNavLink data-tab="offer-bid">
                            Offer a Bid
                          </CNavLink>
                      </CNavItem>

                      <CNavItem>
                          <CNavLink data-tab="query-price">
                            Query Price
                          </CNavLink>
                      </CNavItem>

                       <CNavItem>
                          <CNavLink data-tab="transfer-asset">
                            Transfer Asset
                          </CNavLink>
                      </CNavItem>

                    </CNav>

                    <CTabContent >

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

                      <CTabPane data-tab="offer-bid">
                          <OfferBid
                            channelName={this.state.channelName}
                          chaincodeName={this.state.chaincodeName}
                          organization={this.state.organization}
                            orgUserId={this.state.orgUserId}
                            msp={this.state.msp}
                          />
                      </CTabPane>

                       <CTabPane data-tab="query-price">
                          <QueryPrice 
                            channelName={this.state.channelName}
                            chaincodeName={this.state.chaincodeName}
                            organization={this.state.organization}
                            orgUserId={this.state.orgUserId}
                          />

                      </CTabPane>  

                      <CTabPane data-tab="transfer-asset">
                          <TransferAsset 
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

export default Retailer;
