import React, { Component } from 'react';
import axios from "axios";
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable,CRow,
	CProgress,CTabContent,CTabPane,CTabs,CNav,CNavItem,CNavLink,
	CForm,CInput,CSelect,CButton} from '@coreui/react';
import {Label} from 'reactstrap';

class QueryAsset extends Component
{

	constructor(props) {
		super(props);
	
		this.state={

			channelName:this.props.channelName,
        	chaincodeName:this.props.chaincodeName,
        	organization:this.props.organization,
          	orgUserId:this.props.orgUserId,

			assetId: "",
			assetName: "",
			assetSize: "",
			manufacturingDate: "",
			expiryDate: "",
			salt: ""
		}

		this.onInputchange = this.onInputchange.bind(this);
		this.queryAsset = this.queryAsset.bind(this);
	}

	onInputchange(event) {
    	this.setState({
      		[event.target.name]: event.target.value
    	});
  	}

  	queryAsset() {

  		let data = {
  			channelName: this.state.channelName,
  			chaincodeName: this.state.chaincodeName,
  			organization: this.state.organization,
  			orgUserId: this.state.orgUserId,
  			assetKey: this.state.assetId.trim()

  		} 

  		axios.post(
    	"http://localhost:3001/v1/read-asset/private-props", data).then((response) => {

	    	if(response.data.success) {
	    		let result = response.data.result;

	    		console.log(result);

	    		this.setState({

	    			assetName: result.assetName,
	    			assetSize: result.size,
	    			manufacturingDate: result.manufacturingDate,
	    			expiryDate: result.expiryDate,
	    			salt: result.salt

	    		});
	    		
	    	}
	    	else 
	    		alert(response.data.error)		
    
    	}).catch((error) => console.log(error));

  	}

	render() {

		return(
			<CForm>
				<CRow style={{"padding-left":"20px","padding-top":"20px"}}>

					<CCol sm={4} >
						<CInput
							type="search"
        					id="assetId"
        					name="assetId"
        					placeholder="Enter Asset Id . . ."
        					autoComplete="off"
        					value={this.state.assetId}
        					onChange={this.onInputchange}

        				/>
        				
    				</CCol>

    				<CCol sm={2}>
    					<CButton onClick={this.queryAsset} color="primary">Search	</CButton>	
    				</CCol>	

	    		</CRow>	
    			<hr/>

    			<CRow style={{"padding-left":"20px","padding-top":"20px"}}>
					
					<CCol sm={3} >
						<Label htmlFor="assetName">Asset Name</Label>
						<CInput
        					id="assetName"
        					name="assetName"
        					placeholder="Asset Name"
        					value={this.state.assetName}
        					autoComplete="off"
        					readonly="true"
        				/>	
    				</CCol>

    				<CCol sm={3}>
    					<Label htmlFor="assetSize">Asset Size</Label>
    					<CInput
    						readonly="true"
        					id="assetSize"
        					name="assetSize"
        					placeholder="Asset Size"
        					value={this.state.assetSize}
        					autoComplete="off"
        				/>
        			</CCol>

        			<CCol sm={3}>
						<Label htmlFor="manufacturingDate">Manufacturing Date</Label>
						<CInput
        					id="manufacturingDate"
        					name="manufacturingDate"
        					value={this.state.manufacturingDate} 
        					readonly="true"
        					placeholder="Manufacturing Date"   						
        				/>

					</CCol>
    				
				</CRow>

				<CRow style={{"padding-left":"20px","padding-top":"20px"}}>

					<CCol sm={3}>
						<Label htmlFor="expiryDate">Expiry Date</Label>
						<CInput
        					id="expiryDate"
        					name="expiryDate"    
        					value={this.state.expiryDate}
        					readonly="true"	
        					placeholder="Expiry Date"					
        				/>

					</CCol>	

					<CCol sm={5}>
						<Label htmlFor="salt">Salt</Label>
						<CInput
        					id="salt"
        					name="salt"    
        					value={this.state.salt}
        					readonly="true"	
        					placeholder="Salt"					
        				/>

					</CCol>		

				</CRow>	
    		</CForm>		

		)

	}




}

export default QueryAsset;