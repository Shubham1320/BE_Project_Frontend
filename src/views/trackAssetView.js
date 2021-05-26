import React, { Component } from 'react';
import axios from "axios";
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable,CRow,
	CProgress,CTabContent,CTabPane,CTabs,CNav,CNavItem,CNavLink,
	CForm,CInput,CSelect,CButton} from '@coreui/react';
import {Label} from 'reactstrap';

class TrackAsset extends Component {

	constructor(props) {
		super(props);

		this.state = {

			channelName:this.props.channelName,
        	chaincodeName:this.props.chaincodeName,
        	organization:this.props.organization,
          	orgUserId:this.props.orgUserId,

			assedId: "",
			trackResult: "" 
			
		}

		this.onInputchange = this.onInputchange.bind(this);
		this.trackAsset = this.trackAsset.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}

	onInputchange(event) {
    	this.setState({
      		[event.target.name]: event.target.value
    	});
  	}

	trackAsset() {

		let data = {
  			channelName: this.state.channelName,
  			chaincodeName: this.state.chaincodeName,
  			organization: this.state.organization,
  			orgUserId: this.state.orgUserId,
  			assetKey: this.state.assetId.trim()

  		} 

  		axios.post(
    	"http://localhost:3001/v1/get-asset-history", data).then((response) => {

	    	if(response.data.success) {
	    		let result = response.data.result;

	    		console.log(result);

	    		let set = new Set();
	    		
	    		result.map((value) => {

	    			set.add(value.Record.ownerOrg);

	    		});

	    		this.setState({
	    			trackResult: set
	    		});
	    	}
	    	else 
	    		alert(response.data.error)		
    
    	}).catch((error) => console.log(error));

	}

	renderItem(index, key) {
    	return <div key={key}>{this.state.trackResult[index]}</div>;
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
    					<CButton onClick={this.trackAsset} color="primary">Track	</CButton>	
    				</CCol>	

	    		</CRow>	
    			<hr/>
    			<CRow>
    				{/* <ReactList
            			itemRenderer={this.renderItem}
            			length={this.state.trackResult.length}
            			type='uniform'
          			/> */}
    			</CRow>	

    			
    		</CForm>	
    	);		

	}




}

export default TrackAsset