import React, { Component } from 'react';
import axios from "axios";
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable,CRow,
	CProgress,CTabContent,CTabPane,CTabs,CNav,CNavItem,CNavLink,
	CForm,CInput,CSelect,CButton} from '@coreui/react';
import {Label} from 'reactstrap';	
let crypto = require('crypto');

class OfferBid extends Component {

	constructor(props) {
		super(props);

		this.state = {

			channelName:this.props.channelName,
        	chaincodeName:this.props.chaincodeName,
        	organization:this.props.organization,
          	orgUserId:this.props.orgUserId,
          	msp:this.props.msp,

			assedId: "",
			assetName: "",
        	assetSize: "",
        	manufacturingDate: "",
        	expiryDate: "",
        	salt: "",
			price: "",
			tradeSalt: ""

		}

		this.onInputchange = this.onInputchange.bind(this);
		this.offerBid = this.offerBid.bind(this);

	}

	onInputchange(event) {
    	this.setState({
      		[event.target.name]: event.target.value
    	});
  	}

  	offerBid() {

  		let data = {
  			channelName: this.state.channelName,
  			chaincodeName: this.state.chaincodeName,
  			organization: this.state.organization,
  			orgUserId: this.state.orgUserId,
  			msp: this.state.msp,
  			
  			assetKey: this.state.assetId.trim(),
  			assetName: this.state.assetName.trim(),
  			manufacturingDate: this.state.manufacturingDate,
  	 		expiryDate: this.state.expiryDate,
  			size: this.state.assetSize.trim(),
  			salt: this.state.salt.trim(),
  			tradeSalt: this.state.tradeSalt.trim(),
  			price: this.state.price

  		} 

  		axios.post(
    	"http://localhost:3001/v1/agree-to-buy", data).then((response) => {

	    	if(response.data.success) {
	    		alert("Success");
	    	}
	    	else 
	    		alert(response.data.error)		
    
    	}).catch((error) => console.log(error)); 

  	}


  	render() {

  		return (

  			<CForm>

  				<CRow style={{"padding-left":"20px","padding-top":"20px"}}>
					
  					<CCol sm={4} >
  						<Label htmlFor="assetId">Asset Id</Label>
						<CInput
        					id="assetId"
        					name="assetId"
        					placeholder="Enter Asset Id . . ."
        					autoComplete="off"
        					value={this.state.assetId}
        					onChange={this.onInputchange}

        				/>
        				
    				</CCol>

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

					<CCol sm={5}>
						<Label htmlFor="salt">Salt</Label>
						<CInput
        					id="salt"
        					name="salt"    
        					value={this.state.salt}
            				placeholder="Salt"
            				onChange={this.onInputchange}					
        				/>

					</CCol>		

				</CRow>	

				<hr/>

				<CRow style={{"padding-left":"20px","padding-top":"5px"}}>

					<CCol sm={5}>
    					<Label htmlFor="tradeSalt">Trade Salt</Label>
    					<CInput
	        				id="tradeSalt"
	        				name="tradeSalt"
	        				placeholder="Trade Salt"
	        				autoComplete="off"
	        				value={this.state.tradeSalt}
	        				onChange={this.onInputchange}
	        				
	        			/>
        			</CCol>

    				<CCol sm={3} >
    					<Label htmlFor="price">Price</Label>
						<CInput
        					id="price"
        					name="price"
        					placeholder="Price"
        					autoComplete="off"
        					value={this.state.price}
        					onChange={this.onInputchange}
        				/>
        				
    				</CCol>

	    		</CRow>	
    			
	    		<hr/>

    			<CRow style={{"padding-left":"20px","padding-top":"5px"}}>
  					<CCol sm={3}>
  						<CButton 
  							color="success"
  							onClick={this.offerBid}
  						>
  						Submit
  									
  						</CButton>

  					</CCol>	
  				</CRow>	

    		</CForm>	


  		)


  	}






}

export default OfferBid;