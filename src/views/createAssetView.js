import React, { Component } from 'react';
import axios from "axios";
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable,CRow,
	CProgress,CTabContent,CTabPane,CTabs,CNav,CNavItem,CNavLink,
	CForm,CInput,CSelect,CButton} from '@coreui/react';
import {Label} from 'reactstrap';	
let crypto = require('crypto');

class CreateAsset extends Component
{
	constructor(props) {
    	super(props);
       
        this.state = {
        	channelName:this.props.channelName,
        	chaincodeName:this.props.chaincodeName,
        	organization:this.props.organization,
          orgUserId:this.props.orgUserId,
          msp:this.props.msp,

        	assetName: "",
        	assetSize: "",
        	assetDescription: "",
        	manufacturingDate: "",
        	expiryDate: ""
        };

        this.onInputchange = this.onInputchange.bind(this);
        this.createAsset = this.createAsset.bind(this);

  	}

  	componentDidMount() {

  		//console.log(this.state.channelName);
  	}

  	onInputchange(event) {
    	this.setState({
      		[event.target.name]: event.target.value
    	});
  	}

  	createAsset() {

  		let assetKey = "asset_" + crypto.randomBytes(20).toString('base64');

  		let data = {
  			channelName: this.state.channelName,
  			chaincodeName: this.state.chaincodeName,
  			organization: this.state.organization,
  			orgUserId: this.state.orgUserId,
  			msp: this.state.msp,
  			
  			assetKey: assetKey,
  			assetName: this.state.assetName,
  			manufacturingDate: this.state.manufacturingDate,
  	 		expiryDate: this.state.expiryDate,
  			size: this.state.assetSize,
  			assetDescription: this.state.assetDescription

  		} 

  		axios.post(
    	"http://localhost:3001/v1/create-asset", data).then((response) => {

	    	if(response.data.success) {
	    		alert(response.data.salt);
	    		this.props.getAllAssets();
	    	}
	    	else 
	    		alert(response.data.error)		
    
    	}).catch((error) => console.log(error));

  	}
 

  	render()
  	{

  		return (
    		<CForm action="" method="post">

  				<CRow style={{"padding-left":"20px","padding-top":"20px"}}>
  					
  					<CCol sm={3} >
  						<Label htmlFor="assetName">Asset Name</Label>
  						<CInput
          					id="assetName"
          					name="assetName"
          					placeholder="Asset Name"
          					value={this.state.assetName}
          					onChange={this.onInputchange}
          					autoComplete="off"
          				/>	
      				</CCol>

      				<CCol sm={3}>
      					<Label htmlFor="assetSize">Asset Size</Label>
      					<CInput
      						
          					id="assetSize"
          					name="assetSize"
          					placeholder="Asset Size"
          					value={this.state.assetSize}
          					onChange={this.onInputchange}
          					autoComplete="off"
          				/>
          			</CCol>

          			<CCol sm={3}>
          				<Label htmlFor="assetDescription">Asset Description</Label>
          				<CSelect
          					
          					id="assetDescription"
          					name="assetDescription"
          					placeholder="Asset Description"
          					onChange={this.onInputchange}
          					>

          					<option selected value="" disabled>Asset Description</option>
          					<option value="Not for sale">Not for sale</option>
          					<option value="Up for sale">Up for sale</option> 
          					
          				</CSelect>	
          			</CCol>	
      				
  				</CRow>

  				<CRow style={{"padding-left":"20px","padding-top":"20px"}}>

  					<CCol sm={3}>
  						<Label htmlFor="manufacturingDate">Manufacturing Date</Label>
  						<CInput
  							type="date"
          					id="manufacturingDate"
          					name="manufacturingDate"
          					onChange={this.onInputchange}      						
          				/>

  					</CCol>

  					<CCol sm={3}>
  						<Label htmlFor="expiryDate">Expiry Date</Label>
  						<CInput
  							type="date"
          					id="expiryDate"
          					name="expiryDate"
          					onChange={this.onInputchange}      						
          				/>

  					</CCol>		

  				</CRow>	
  				
  				<hr/>

  				<CRow style={{"padding-left":"20px","padding-top":"5px"}}>
  					<CCol sm={3}>
  						<CButton 
  							color="success"
  							onClick={this.createAsset}
  						>
  						Create Asset
  									
  						</CButton>

  					</CCol>	
  				</CRow>	
        </CForm>	

  		)

	}
}	

export default CreateAsset;

