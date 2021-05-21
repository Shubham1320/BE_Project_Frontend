import React, { Component } from 'react';
import axios from "axios";
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable,CRow,
	CProgress,CTabContent,CTabPane,CTabs,CNav,CNavItem,CNavLink,
	CForm,CInput,CSelect,CButton} from '@coreui/react';
import {Label} from 'reactstrap';	
let crypto = require('crypto');


class PutForSale extends Component {

	constructor(props) {
		super(props);

		this.state = {

			channelName:this.props.channelName,
        	chaincodeName:this.props.chaincodeName,
        	organization:this.props.organization,
          	orgUserId:this.props.orgUserId,
          	msp:this.props.msp,

			assedId: "",
			price: "",
			tradeSalt: ""

		}

		this.onInputchange = this.onInputchange.bind(this);
		this.putForSale = this.putForSale.bind(this);

	}

	onInputchange(event) {
    	this.setState({
      		[event.target.name]: event.target.value
    	});
  	}

  	putForSale() {

  		let data = {
  			channelName: this.state.channelName,
  			chaincodeName: this.state.chaincodeName,
  			organization: this.state.organization,
  			orgUserId: this.state.orgUserId,
  			msp: this.state.msp,
  			
  			assetKey: this.state.assetId.trim(),
  			price: this.state.price

  		} 

  		axios.post(
    	"http://localhost:3001/v1/agree-to-sell", data).then((response) => {

	    	if(response.data.success) {
	    		alert("Success");
	    		this.props.getAllAssets();
	    		this.setState({
	    			tradeSalt: response.data.trade_id
	    		})
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
						<CInput
        					id="price"
        					name="price"
        					placeholder="Price"
        					autoComplete="off"
        					value={this.state.price}
        					onChange={this.onInputchange}
        				/>
        				
    				</CCol>

    				<CCol sm={2}>
    					<CButton onClick={this.putForSale} color="primary">Submit</CButton>	
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
	        				readonly="true"
	        			/>
        			</CCol>
    			</CRow>	

    		</CForm>	


  		)


  	}

}

export default PutForSale;